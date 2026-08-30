module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/frontend/src/app/api/session/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    const body = await request.json().catch(()=>null);
    if (!body) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: "Bad request"
        }, {
            status: 400
        });
    }
    const upstream = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_BASE"]}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        cache: "no-store"
    });
    const payload = await upstream.json();
    if (!payload.ok) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: payload.error,
            code: payload.code
        }, {
            status: upstream.status
        });
    }
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        user: payload.data.user
    });
    response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], payload.data.token, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionCookieOptions"])(payload.data.expiresIn));
    return response;
}
async function DELETE() {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
    response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], "", (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionCookieOptions"])(0));
    return response;
}
}),
"[project]/frontend/src/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE",
    ()=>BASE,
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api,
    "apiOrNull",
    ()=>apiOrNull
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/session.ts [app-route] (ecmascript)");
;
;
/**
 * The only way this app reaches its data.
 *
 * The frontend holds no database credentials. Everything goes through the
 * Render API over HTTP, with the caller's JWT forwarded as a Bearer token.
 *
 * Two variants exist because they read the token from different places:
 *   - `api()`       — Server Components and route handlers, reads the cookie
 *   - `clientApi()` — browser code, goes through /api/proxy so the httpOnly
 *                     cookie is attached by the server rather than by JS
 */ const BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
class ApiError extends Error {
    status;
    code;
    fields;
    constructor(message, status, code, fields){
        super(message), this.status = status, this.code = code, this.fields = fields;
        this.name = "ApiError";
    }
}
async function api(path, options = {}) {
    const headers = {
        "Content-Type": "application/json"
    };
    if (!options.anonymous) {
        const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE"])?.value;
        if (token) headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE}${path}`, {
        method: options.method ?? "GET",
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        // Next 15+ does not cache by default, so every call states its intent.
        cache: options.cache ?? (options.revalidate ? undefined : "no-store"),
        next: options.revalidate ? {
            revalidate: options.revalidate,
            tags: options.tags
        } : undefined
    });
    let payload;
    try {
        payload = await res.json();
    } catch  {
        throw new ApiError(// A non-JSON body here almost always means the API is down or a proxy
        // returned an HTML error page — say that rather than "unexpected token".
        `The API returned an unreadable response (${res.status}). Is it running at ${BASE}?`, res.status, "server_error");
    }
    if (!payload.ok) {
        throw new ApiError(payload.error, res.status, payload.code, payload.fields);
    }
    return payload.data;
}
async function apiOrNull(path, options = {}) {
    try {
        return await api(path, options);
    } catch (err) {
        if (err instanceof ApiError && [
            401,
            403,
            404
        ].includes(err.status)) return null;
        throw err;
    }
}
;
}),
"[project]/frontend/src/lib/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE",
    ()=>SESSION_COOKIE,
    "getSession",
    ()=>getSession,
    "getSessionToken",
    ()=>getSessionToken,
    "sessionCookieOptions",
    ()=>sessionCookieOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/headers.js [app-route] (ecmascript)");
;
const SESSION_COOKIE = "nm_session";
/**
 * Decodes the JWT payload WITHOUT verifying it.
 *
 * That is safe only because it is never trusted for authorisation: the API
 * verifies the signature on every request, and this is used purely to render
 * the right nav without a network round-trip on every page. Any real decision
 * — can this person see this? — happens on the backend.
 */ function decodeUnverified(token) {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;
        const json = JSON.parse(Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
        // An expired token is treated as no session so the UI does not render a
        // logged-in shell the API will then reject.
        if (typeof json.exp === "number" && json.exp * 1000 < Date.now()) return null;
        if (typeof json.sub !== "string") return null;
        return {
            id: json.sub,
            email: String(json.email ?? ""),
            name: null,
            role: json.role ?? "student",
            referralCode: String(json.referralCode ?? ""),
            image: null
        };
    } catch  {
        return null;
    }
}
async function getSession() {
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(SESSION_COOKIE)?.value;
    return token ? decodeUnverified(token) : null;
}
async function getSessionToken() {
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(SESSION_COOKIE)?.value ?? null;
}
function sessionCookieOptions(maxAgeSeconds) {
    return {
        httpOnly: true,
        sameSite: "lax",
        secure: ("TURBOPACK compile-time value", "development") === "production",
        path: "/",
        maxAge: maxAgeSeconds
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02alkbi._.js.map