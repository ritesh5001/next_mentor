/**
 * Create a new user account in the database
 *
 * Usage: pnpm tsx scripts/create-user.ts
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { generateUniqueReferralCode } from "@/lib/referral-code";

const USER_EMAIL = "rgiri5001@gmail.com";
const USER_PASSWORD = "Ritesh5001";

async function main() {
  // Check if user already exists
  const [existingUser] = await db
    .select({ id: users.id, name: users.name, role: users.role, referralCode: users.referralCode })
    .from(users)
    .where(eq(users.email, USER_EMAIL))
    .limit(1);

  if (existingUser) {
    console.log(`User with email ${USER_EMAIL} already exists`);
    console.log(`   Name: ${existingUser.name}`);
    console.log(`   Role: ${existingUser.role}`);
    console.log(`   Referral Code: ${existingUser.referralCode}`);
    
    // Update the password
    const passwordHash = await bcrypt.hash(USER_PASSWORD, 12);
    await db
      .update(users)
      .set({ passwordHash, emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));
    
    console.log(`\n✅ Password updated successfully!`);
    console.log(`   Email: ${USER_EMAIL}`);
    console.log(`   Password: ${USER_PASSWORD}`);
    return;
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(USER_PASSWORD, 12);

  // Generate a unique referral code
  const referralCode = await generateUniqueReferralCode();

  // Create the user
  const [newUser] = await db
    .insert(users)
    .values({
      name: "Ritesh Giri", // Default name
      email: USER_EMAIL,
      passwordHash,
      role: "student", // Default role
      emailVerified: new Date(), // Mark as verified
      referralCode,
      phone: null,
    })
    .returning({ id: users.id, email: users.email });

  console.log(`✅ User created successfully!`);
  console.log(`   Email: ${newUser.email}`);
  console.log(`   Password: ${USER_PASSWORD}`);
  console.log(`   Role: student`);
  console.log(`   Referral Code: ${referralCode}`);
}

main().catch((err) => {
  console.error("Error creating user:", err);
  process.exit(1);
});
