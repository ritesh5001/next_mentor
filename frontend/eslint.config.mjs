import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  /**
   * Architectural boundary between src/frontend and src/backend.
   *
   * Without this the split is just folder names: nothing stops someone
   * importing the database client into a component, shipping credentials and
   * query code into the browser bundle. The lint rule is what makes the
   * separation real.
   *
   * Allowed:   app/ -> backend, app/ -> frontend, frontend -> shared,
   *            backend -> shared
   * Forbidden: frontend -> backend, backend -> frontend, shared -> either
   *
   * Route files in src/app/ are deliberately exempt: a Server Component
   * querying Postgres directly is the whole reason this is one Next.js app
   * rather than two servers.
   */
  {
    files: ["src/frontend/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/backend/*", "@/backend/**", "**/backend/*", "**/backend/**"],
              message:
                "frontend/ must not import from backend/. It would pull the database client and server secrets into the browser bundle. Pass data in as props from a Server Component, or move the shared value to src/shared/.",
            },
            {
              group: ["server-only"],
              message:
                "server-only marks a module as server-side. A file under frontend/ that needs it belongs in backend/.",
            },
          ],
        },
      ],
    },
  },

  {
    files: ["src/backend/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/frontend/*", "@/frontend/**", "**/frontend/*", "**/frontend/**"],
              message:
                "backend/ must not import from frontend/. Business logic should not depend on presentation — move anything genuinely shared to src/shared/.",
            },
          ],
        },
      ],
    },
  },

  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/backend/*",
                "@/backend/**",
                "@/frontend/*",
                "@/frontend/**",
                "**/backend/**",
                "**/frontend/**",
              ],
              message:
                "shared/ is imported by both sides, so it must depend on neither. Keep it to types, constants, and public env.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
