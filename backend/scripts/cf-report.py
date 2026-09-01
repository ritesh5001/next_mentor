"""Prints one Cloudflare API result line without leaking credentials."""
import json, sys

label, raw = sys.argv[1], sys.argv[2]
try:
    r = json.loads(raw)
except Exception:
    print(f"  {label}: non-JSON response ({raw[:80]})")
    sys.exit(0)

if r.get("success"):
    res = r.get("result")
    detail = res.get("status") if isinstance(res, dict) and "status" in res else "ok"
    print(f"  {label}: OK ({detail})")
else:
    errs = r.get("errors") or [{"code": "?", "message": "unknown error"}]
    for e in errs:
        print(f"  {label}: FAIL [{e.get('code')}] {e.get('message')}")
