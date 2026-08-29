/**
 * No-op stand-in for the `server-only` package.
 *
 * That package throws unless it is resolved through Next's bundler, which
 * breaks plain `tsx` scripts that import server modules. Only scripts/tsconfig.json
 * maps to this stub — the app keeps the real guard, so a client component that
 * imports a server module still fails loudly at build time.
 */
export {};
