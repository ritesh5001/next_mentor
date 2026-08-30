import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Backend lint config.
 *
 * The API is a plain Node service, so none of the Next.js rules apply here —
 * this package moved out of the Next app during the frontend/backend split and
 * needed its own config rather than inheriting one that no longer fits.
 */
export default tseslint.config(
  { ignores: ["node_modules/**", "dist/**", "drizzle/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        crypto: "readonly",
        fetch: "readonly",
        URL: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        btoa: "readonly",
        atob: "readonly",
      },
    },
    rules: {
      // Unused args prefixed with _ are a deliberate signal, not an oversight.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
