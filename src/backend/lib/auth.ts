import NextAuth, { type DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { generateUniqueReferralCode } from "./referral-code";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "instructor" | "admin";
      referralCode: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: "student" | "instructor" | "admin";
    referralCode: string;
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  // JWT rather than database sessions: every page in the dashboard needs the
  // role, and a DB round-trip per request to fetch it would be the single
  // biggest tax on the speed budget.
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        // Compare against a dummy hash when the user is absent so that a
        // missing account and a wrong password take the same amount of time.
        // Skipping this leaks account existence through response timing.
        if (!user?.passwordHash) {
          await bcrypt.compare(password, "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv");
          return null;
        }

        if (user.isBlocked) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        // Unverified users are rejected here rather than at the page level so
        // there is no window in which a session exists for an unverified email.
        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * OAuth users never pass through the registration Server Action, so they
     * arrive without a referral code. Backfill it on first sign-in.
     */
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;
      if (!user.id) return true;

      const [row] = await db
        .select({ referralCode: users.referralCode, isBlocked: users.isBlocked })
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      if (row?.isBlocked) return false;

      if (row && !row.referralCode) {
        await db
          .update(users)
          .set({ referralCode: await generateUniqueReferralCode() })
          .where(eq(users.id, user.id));
      }

      return true;
    },

    async jwt({ token, user, trigger }) {
      // On sign-in, and on an explicit session.update(), re-read the role from
      // the database. Without the `trigger` branch a user promoted to admin
      // would keep a stale student token for up to 30 days.
      if (user?.id || trigger === "update") {
        const id = user?.id ?? token.id;
        if (id) {
          const [row] = await db
            .select({ id: users.id, role: users.role, referralCode: users.referralCode })
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

          if (row) {
            token.id = row.id;
            token.role = row.role;
            token.referralCode = row.referralCode;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.referralCode = token.referralCode;
      }
      return session;
    },
  },

  trustHost: true,
});
