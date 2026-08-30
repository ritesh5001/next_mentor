(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/AnimatedItems.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedItems",
    ()=>AnimatedItems,
    "useAnimationCallbacks",
    ()=>useAnimationCallbacks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$JavascriptAnimate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/JavascriptAnimate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useAnimationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useAnimationId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$matchBy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/matchBy.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$useAnimationStartSnapshot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/useAnimationStartSnapshot.js [app-client] (ecmascript)");
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
;
;
;
;
;
;
function useAnimationCallbacks(onAnimationStart, onAnimationEnd) {
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), _useState2 = _slicedToArray(_useState, 2), isAnimating = _useState2[0], setIsAnimating = _useState2[1];
    var handleAnimationStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimationCallbacks.useCallback[handleAnimationStart]": ()=>{
            if (typeof onAnimationStart === 'function') {
                onAnimationStart();
            }
            setIsAnimating(true);
        }
    }["useAnimationCallbacks.useCallback[handleAnimationStart]"], [
        onAnimationStart
    ]);
    var handleAnimationEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimationCallbacks.useCallback[handleAnimationEnd]": ()=>{
            if (typeof onAnimationEnd === 'function') {
                onAnimationEnd();
            }
            setIsAnimating(false);
        }
    }["useAnimationCallbacks.useCallback[handleAnimationEnd]"], [
        onAnimationEnd
    ]);
    return {
        isAnimating,
        handleAnimationStart,
        handleAnimationEnd
    };
}
function AnimatedItems(props) {
    var _animationStartItems$;
    var animationInput = props.animationInput, animationIdPrefix = props.animationIdPrefix, items = props.items, previousItemsRef = props.previousItemsRef, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, animationInterpolateFn = props.animationInterpolateFn, animationMatchBy = props.animationMatchBy, shouldUpdatePreviousRef = props.shouldUpdatePreviousRef, children = props.children, layout = props.layout;
    var animationId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useAnimationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationId"])(animationInput, animationIdPrefix);
    var animationStartItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$useAnimationStartSnapshot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationStartSnapshot"])(animationId, previousItemsRef);
    var rawPrevItems = (_animationStartItems$ = animationStartItems.startValue) !== null && _animationStartItems$ !== void 0 ? _animationStartItems$ : null;
    var animationItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$matchBy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchAnimationItems"])(rawPrevItems, items, animationMatchBy !== null && animationMatchBy !== void 0 ? animationMatchBy : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$matchBy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchByIndex"]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$JavascriptAnimate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JavascriptAnimate"], {
        animationId: animationId,
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        onAnimationEnd: onAnimationEnd,
        onAnimationStart: onAnimationStart,
        key: animationId
    }, (animationElapsedTime)=>{
        var isEntrance = rawPrevItems == null;
        var stepData = items == null ? items : animationInterpolateFn(animationItems, animationElapsedTime, layout);
        var canUpdate = shouldUpdatePreviousRef ? shouldUpdatePreviousRef(animationElapsedTime) : animationElapsedTime > 0;
        animationStartItems.syncStepValue(stepData, animationElapsedTime, canUpdate);
        if (stepData == null) {
            return null;
        }
        return children(stepData, animationElapsedTime, isEntrance);
    });
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/AnimationControllerImpl.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * JavaScript animations require trigger and repaint as soon as possible,
 * so this class uses the timeoutController to trigger updates as quickly as the controller allows.
 *
 * JavaScript animation progress is represented as a stream of values. The exact type depends on the animationHandle type.
 * Each individual consumer is then responsible for mapping those values onto a React component.
 */ __turbopack_context__.s([
    "animationControllerImpl",
    ()=>animationControllerImpl
]);
var animationControllerImpl = (timeoutController, animationHandle, listener)=>{
    var cancellable;
    var nextUpdate = (now)=>{
        var timeRemaining = animationHandle.tick(now);
        if (animationHandle.getState() === 'active') {
            listener(animationHandle.getInterpolated());
            if (animationHandle.getProgress() === 1) {
                animationHandle.complete();
                cancellable = undefined;
                return;
            }
            cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
            return;
        }
        cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
    };
    cancellable = timeoutController.setTimeout(nextUpdate, 0);
    return ()=>{
        var _cancellable;
        return (_cancellable = cancellable) === null || _cancellable === void 0 ? void 0 : _cancellable();
    };
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/AnimationHandle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSTransitionAnimation",
    ()=>CSSTransitionAnimation,
    "JavascriptAnimation",
    ()=>JavascriptAnimation
]);
// eslint-disable-next-line max-classes-per-file
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
;
var INIT = 'init';
var PENDING = 'pending';
var ACTIVE = 'active';
var COMPLETED = 'completed';
function duration(time) {
    return Math.max(0, time);
}
class RechartsAnimation {
    /**
   * Returns the absolute time after the animationBegin delay has been completed,
   * and when the animationDuration started ticking.
   */ getAnimationStartedTime() {
        return this.animationStartedTime;
    }
    /**
   * Returns the absolute time of when the animation began - now it will wait for {animationBegin} ms before the transition starts
   */ getBeginStartedTime() {
        return this.beginStartedTime;
    }
    constructor(param){
        var _param$onAnimationSta;
        _defineProperty(this, "state", INIT);
        this.animationId = param.animationId;
        this.onAnimationEnd = param.onAnimationEnd;
        this.animationDuration = duration(param.animationDuration);
        this.animationBegin = duration(param.animationBegin);
        this.progress = 0;
        this.from = param.from;
        this.to = param.to;
        this.easing = param.easing;
        // Mimic what the previous animationManager was doing - call onAnimationStart immediately and synchronously
        (_param$onAnimationSta = param.onAnimationStart) === null || _param$onAnimationSta === void 0 || _param$onAnimationSta.call(param);
    }
    /**
   * Returns the state machine current state
   * - `init`:       animation had just been created. It immediately calls `onAnimationStart`
   * - `pending`:    animation is now paused for `animationBegin` milliseconds until the transition begins
   * - `active`:     animation is transitioning items on screen
   * - `completed`:  animation has completed its transition and executed `onAnimationEnd`.
   *                 This state is final and the animation is no longer allowed to transition to other states.
   */ getState() {
        return this.state;
    }
    /**
   * Returns the easing input or function
   */ getEasing() {
        return this.easing;
    }
    /**
   * Returns the configuration - the duration of the transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */ getAnimationDuration() {
        return this.animationDuration;
    }
    /**
   * Sets the current time of the animation. The animation sets its internal state and progress accordingly.
   * This is current, absolute time; not additive!
   * This allows you to essentially "travel back in time" based on the value you pass in here.
   *
   * Returns the (relative) time remaining until the current activity is over.
   * Meaning: if the state is in a middle of a delay, returns the time left until the delay is finished.
   * If the state is in the middle of a transition, returns time left until that transition is complete.
   * This is useful because it's the same number you can take and put into setTimeout(fn, X)
   * as that's how much time we need to wait until the next state transition happens.
   */ tick(now) {
        if (this.getState() === INIT) {
            this.state = PENDING;
            this.beginStartedTime = now;
            return this.animationBegin;
        }
        if (this.getState() === PENDING) {
            if (this.beginStartedTime == null) {
                throw new Error();
            }
            var _timeElapsed = now - this.beginStartedTime;
            if (_timeElapsed >= this.animationBegin) {
                this.state = ACTIVE;
                this.animationStartedTime = now;
                // The state flipped just now so the elapsed time is zero
                return this.nextAnimationUpdate(0);
            }
            return duration(this.animationBegin - _timeElapsed);
        }
        if (this.getState() === ACTIVE) {
            if (this.animationStartedTime == null) {
                throw new Error();
            }
            var _timeElapsed2 = now - this.animationStartedTime;
            this.setProgress(_timeElapsed2 / this.animationDuration);
            return this.nextAnimationUpdate(_timeElapsed2);
        }
        // state === COMPLETED, nothing interesting is going to happen
        return 0;
    }
    setProgress(newProgress) {
        this.progress = Math.min(1, Math.max(0, newProgress));
    }
    /**
   * Returns an abstract "progress" which is number between 0 and 1 which shows the distance of transition.
   * This progress depends on the animation state:
   * - `init`: 0
   * - `pending`: 0
   * - `active`: transitioning between [0, 1] based on the time elapsed
   * - `completed`: 1
   *
   * The progress is hard-capped to be between 0 and 1 (inclusive) to avoid overshooting caused by coarse timers.
   * For this reason, the easing function must be applied _after_ this animation state,
   * so that one has a chance to construct dynamic "overshoot" animations.
   *
   * The progress is linear with time.
   * If you wish for easing, use `getInterpolated()` instead.
   */ getProgress() {
        return this.progress;
    }
    /**
   * Completes the animation. Completed animation:
   * - cannot be manipulated anymore
   * - its progress is set to 1
   * - tick function doesn't do anything
   * - getState() always returns 'completed'
   */ complete() {
        this.progress = 1;
        if (this.state === 'active') {
            var _this$onAnimationEnd;
            // Do not call callbacks if the animation was interrupted before it even started!
            (_this$onAnimationEnd = this.onAnimationEnd) === null || _this$onAnimationEnd === void 0 || _this$onAnimationEnd.call(this);
        }
        this.state = COMPLETED;
    }
    /**
   * Returns the starting value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static starting value
   */ getFrom() {
        return this.from;
    }
    /**
   * Returns the end value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static end value
   */ getTo() {
        return this.to;
    }
    /**
   * Unique identifier of an animation
   */ getAnimationId() {
        return this.animationId;
    }
    /**
   * Returns the configuration - the duration of delay in between animation initialization, and transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */ getAnimationBegin() {
        return this.animationBegin;
    }
}
class JavascriptAnimation extends RechartsAnimation {
    // eslint-disable-next-line class-methods-use-this
    nextAnimationUpdate() {
        /*
     * JavaScript-based animations have to update as soon as possible,
     * so we return 0 here to indicate that the next update should be scheduled immediately
     * and it should trigger render on every occasion.
     */ return 0;
    }
    /**
   * Returns value of the animation after its easing function had been applied.
   * This value, unlike getProgress(), can escape the [0..1] range
   * because this is entirely within the easing function control. Spring typically does this.
   */ getInterpolated() {
        return this.easing((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(this.getFrom(), this.getTo(), this.getProgress()));
    }
}
class CSSTransitionAnimation extends RechartsAnimation {
    nextAnimationUpdate(timeElapsed) {
        /**
     * CSS transitions do not need DOM updates past the initial render
     * so here we just instruct the controller to wait until the animation duration is over.
     */ return duration(this.animationDuration - timeElapsed);
    }
    /**
   * Returns the final value of the animation (the `to`).
   *
   * CSS transitions leave both interpolation and easing to the browser,
   * so all we need to do here is return the final state
   * and let browser handle the rest.
   */ getInterpolated() {
        return this.getTo();
    }
} /**
 * Recharts animation state machine.
 *
 * Possible transitions are:
 * - `init`: starting state - `onAnimationStart` executes
 * - `init` to `pending` - `animationBegin` duration begins
 * - `pending` to `active` - `animationDuration` duration begins, timer ticks decide the progress
 * - `active` to `completed` - `onAnimationEnd` executes
 *
 * The state always moves in this direction, cannot move backwards.
 *
 * The animation queue is static and consists of four elements:
 * - `onAnimationStart`: function that is called when the animation is created
 * - `animationBegin`: delay between `onAnimationStart` and the transition
 * - the transition itself, takes `animationDuration` ms to finish
 * - `onAnimationEnd`: function that is called when the animation is moving from `active` to `completed`
 *
 * @see {@link https://recharts.github.io/en-US/guide/animations/ Animation guide}
 *
 * @since 3.9
 */ 
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/JavascriptAnimate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JavascriptAnimate",
    ()=>JavascriptAnimate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/resolveDefaultProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$easing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/easing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$useAnimationController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/useAnimationController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Global.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$usePrefersReducedMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/usePrefersReducedMotion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$AnimationHandle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/AnimationHandle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$timeoutController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/timeoutController.js [app-client] (ecmascript)");
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
;
;
;
;
;
;
;
;
;
var defaultJavascriptAnimateProps = {
    begin: 0,
    duration: 1000,
    easing: 'ease',
    isActive: true,
    canBegin: true,
    onAnimationEnd: ()=>{},
    onAnimationStart: ()=>{}
};
var from = 0;
var to = 1;
function JavascriptAnimate(outsideProps) {
    var props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDefaultProps"])(outsideProps, defaultJavascriptAnimateProps);
    var animationId = props.animationId, isActiveProp = props.isActive, canBegin = props.canBegin, duration = props.duration, easing = props.easing, begin = props.begin, onAnimationEnd = props.onAnimationEnd, onAnimationStart = props.onAnimationStart, children = props.children;
    var prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$usePrefersReducedMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefersReducedMotion"])();
    var isActive = isActiveProp === 'auto' ? !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Global"].isSsr && !prefersReducedMotion : isActiveProp;
    var animationController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$useAnimationController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationController"])(props.animationController);
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isActive ? from : to), _useState2 = _slicedToArray(_useState, 2), style = _useState2[0], setStyle = _useState2[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JavascriptAnimate.useEffect": ()=>{
            if (!isActive) {
                setStyle(to);
            }
        }
    }["JavascriptAnimate.useEffect"], [
        isActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JavascriptAnimate.useEffect": ()=>{
            var easingFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$easing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEasingFunction"])(easing);
            if (!isActive || !canBegin || easingFunction == null) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            }
            var timeoutController = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$timeoutController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestAnimationFrameTimeoutController"]();
            var animation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$AnimationHandle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JavascriptAnimation"]({
                animationId,
                easing: easingFunction,
                animationDuration: duration,
                animationBegin: begin,
                onAnimationStart,
                onAnimationEnd,
                from,
                to
            });
            return animationController(timeoutController, animation, setStyle);
        }
    }["JavascriptAnimate.useEffect"], [
        animationController,
        animationId,
        isActive,
        canBegin,
        duration,
        easing,
        begin,
        onAnimationStart,
        onAnimationEnd
    ]);
    return children(Number(style));
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/easing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACCURACY",
    ()=>ACCURACY,
    "configBezier",
    ()=>configBezier,
    "createEasingFunction",
    ()=>createEasingFunction,
    "createSpringEasing",
    ()=>createSpringEasing
]);
var ACCURACY = 1e-4;
var cubicBezierFactor = (c1, c2)=>[
        0,
        3 * c1,
        3 * c2 - 6 * c1,
        3 * c1 - 3 * c2 + 1
    ];
var evaluatePolynomial = (params, animationElapsedTime)=>params.map((param, i)=>param * animationElapsedTime ** i).reduce((pre, curr)=>pre + curr);
var cubicBezier = (c1, c2)=>(animationElapsedTime)=>{
        var params = cubicBezierFactor(c1, c2);
        return evaluatePolynomial(params, animationElapsedTime);
    };
var derivativeCubicBezier = (c1, c2)=>(animationElapsedTime)=>{
        var params = cubicBezierFactor(c1, c2);
        var newParams = [
            ...params.map((param, i)=>param * i).slice(1),
            0
        ];
        return evaluatePolynomial(newParams, animationElapsedTime);
    };
var parseCubicBezier = (easing)=>{
    var _easingParts$;
    var easingParts = easing.split('(');
    if (easingParts.length !== 2 || easingParts[0] !== 'cubic-bezier') {
        return null;
    }
    var numbers = (_easingParts$ = easingParts[1]) === null || _easingParts$ === void 0 || (_easingParts$ = _easingParts$.split(')')[0]) === null || _easingParts$ === void 0 ? void 0 : _easingParts$.split(',');
    if (numbers == null || numbers.length !== 4) {
        return null;
    }
    var coords = numbers.map((x)=>parseFloat(x));
    return [
        coords[0],
        coords[1],
        coords[2],
        coords[3]
    ];
};
var getBezierCoordinates = function getBezierCoordinates() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    if (args.length === 1) {
        switch(args[0]){
            case 'linear':
                return [
                    0.0,
                    0.0,
                    1.0,
                    1.0
                ];
            case 'ease':
                return [
                    0.25,
                    0.1,
                    0.25,
                    1.0
                ];
            case 'ease-in':
                return [
                    0.42,
                    0.0,
                    1.0,
                    1.0
                ];
            case 'ease-out':
                return [
                    0.42,
                    0.0,
                    0.58,
                    1.0
                ];
            case 'ease-in-out':
                return [
                    0.0,
                    0.0,
                    0.58,
                    1.0
                ];
            default:
                {
                    var easing = parseCubicBezier(args[0]);
                    if (easing) {
                        return easing;
                    }
                }
        }
    }
    if (args.length === 4) {
        return args;
    }
    // Fallback for invalid inputs. The previous implementation was buggy and would lead to NaN.
    // Returning linear easing is a safe default.
    return [
        0.0,
        0.0,
        1.0,
        1.0
    ];
};
var createBezierEasing = (x1, y1, x2, y2)=>{
    var curveX = cubicBezier(x1, x2);
    var curveY = cubicBezier(y1, y2);
    var derCurveX = derivativeCubicBezier(x1, x2);
    var rangeValue = (value)=>{
        if (value > 1) {
            return 1;
        }
        if (value < 0) {
            return 0;
        }
        return value;
    };
    var bezier = (_animationElapsedTime)=>{
        var animationElapsedTime = _animationElapsedTime > 1 ? 1 : _animationElapsedTime;
        var x = animationElapsedTime;
        for(var i = 0; i < 8; ++i){
            var evalT = curveX(x) - animationElapsedTime;
            var derVal = derCurveX(x);
            if (Math.abs(evalT - animationElapsedTime) < ACCURACY || derVal < ACCURACY) {
                return curveY(x);
            }
            x = rangeValue(x - evalT / derVal);
        }
        return curveY(x);
    };
    bezier.isStepper = false;
    return bezier;
};
var configBezier = function configBezier() {
    return createBezierEasing(...getBezierCoordinates(...arguments));
};
var createSpringEasing = function createSpringEasing() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _config$stiff = config.stiff, stiff = _config$stiff === void 0 ? 100 : _config$stiff, _config$damping = config.damping, damping = _config$damping === void 0 ? 8 : _config$damping, _config$dt = config.dt, dt = _config$dt === void 0 ? 16.67 : _config$dt;
    var destX = 1;
    var positions = [
        0
    ];
    var currX = 0;
    var currV = 0;
    // Safety valve to prevent accidental infinite loops if physics config is extreme
    var maxIterations = 10000;
    var iterations = 0;
    // 1. Run the simulation until the spring completely stops moving
    while(iterations < maxIterations){
        var FSpring = -(currX - destX) * stiff;
        var FDamping = currV * damping;
        currV += (FSpring - FDamping) * dt / 1000;
        currX += currV * dt / 1000;
        positions.push(currX);
        // Stop only when position is essentially at 1.0 AND bounce velocity has died down
        if (Math.abs(currX - destX) < ACCURACY && Math.abs(currV) < ACCURACY) {
            break;
        }
        iterations++;
    }
    // Force the absolute final element to be exactly 1.0 for a perfect finish
    positions[positions.length - 1] = destX;
    var maxIndex = positions.length - 1;
    // 2. The ultra-smooth runtime function mapping your 0..1 progress
    return (t)=>{
        var _positions$index, _positions, _positions$index2;
        if (t <= 0) return 0;
        if (t >= 1) return destX;
        // Scale t (0..1) proportionally across our entire pre-calculated array
        var exactFrame = t * maxIndex;
        var index = Math.floor(exactFrame);
        var fraction = exactFrame - index;
        // Blend between the two closest frames
        return ((_positions$index = positions[index]) !== null && _positions$index !== void 0 ? _positions$index : 0) + (((_positions = positions[index + 1]) !== null && _positions !== void 0 ? _positions : 0) - ((_positions$index2 = positions[index]) !== null && _positions$index2 !== void 0 ? _positions$index2 : 0)) * fraction;
    };
};
var createEasingFunction = (easing)=>{
    if (typeof easing === 'string') {
        switch(easing){
            case 'ease':
            case 'ease-in-out':
            case 'ease-out':
            case 'ease-in':
            case 'linear':
                return configBezier(easing);
            case 'spring':
                return createSpringEasing();
            default:
                if (easing.split('(')[0] === 'cubic-bezier') {
                    return configBezier(easing);
                }
        }
    }
    if (typeof easing === 'function') {
        return easing;
    }
    return null;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/matchBy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "matchAnimationItems",
    ()=>matchAnimationItems,
    "matchAppend",
    ()=>matchAppend,
    "matchByDataKey",
    ()=>matchByDataKey,
    "matchByIndex",
    ()=>matchByIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ChartUtils.js [app-client] (ecmascript)");
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
;
var matchByIndex = 'index';
var matchAppend = 'append';
function matchByDataKey(dataKey) {
    return (item)=>{
        if (item.payload == null || typeof item.payload !== 'object') return null;
        var value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueByDataKey"])(item.payload, dataKey);
        if (value == null) return null;
        if (typeof value === 'string' || typeof value === 'number') return value;
        return JSON.stringify(value);
    };
}
function tagAlignedItems(alignedPrevItems, nextItems) {
    var removedPrevItems = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var tagged = [];
    /*
   * We put removed points at the start because we assume that a typical chart animates right-to-left
   * and the removed points will disappear from the left edge and outside the plot area.
   * If you chart behaves differently you may want to customize your matching function.
   */ for (var prev of removedPrevItems){
        tagged.push({
            status: 'removed',
            prev
        });
    }
    for(var i = 0; i < nextItems.length; i++){
        // This function intentionally pairs by array index. The strategy-specific functions above are
        // responsible for producing an alignedPrevItems array whose indices already correspond to nextItems.
        var _prev = alignedPrevItems[i];
        var next = nextItems[i];
        if (_prev != null) {
            tagged.push({
                status: 'matched',
                prev: _prev,
                next
            });
        } else {
            tagged.push({
                status: 'added',
                next
            });
        }
    }
    return tagged;
}
function matchByIndexImpl(prevItems, nextItems) {
    var factor = prevItems.length / nextItems.length;
    var alignedPrevItems = nextItems.map((_, i)=>prevItems[Math.floor(i * factor)]);
    return tagAlignedItems(alignedPrevItems, nextItems);
}
function matchAppendImpl(prevItems, nextItems) {
    var alignedPrevItems = nextItems.map((_, i)=>prevItems[i]);
    return tagAlignedItems(alignedPrevItems, nextItems);
}
function buildPrevKeyMap(prevItems, matchBy) {
    var prevMap = new Map();
    for(var i = 0; i < prevItems.length; i++){
        var _item = prevItems[i];
        if (_item == null) continue;
        var key = matchBy(_item, i);
        if (key != null && !prevMap.has(key)) {
            prevMap.set(key, _item);
        }
    }
    return prevMap;
}
/**
 * Match previous items to next items by key, and include removed items explicitly.
 *
 * @internal
 */ function matchByKey(prevItems, nextItems, matchBy) {
    var prevMap = buildPrevKeyMap(prevItems, matchBy);
    // Track which prev keys were matched
    var matchedKeys = new Set();
    var alignedPrevItems = nextItems.map((next, i)=>{
        var key = matchBy(next, i);
        if (key != null) {
            var prev = prevMap.get(key);
            if (prev !== undefined) {
                matchedKeys.add(key);
                return prev;
            }
        }
        return undefined;
    });
    // Removed = prev items whose keys were not matched to any next item
    var removedPrevItems = [];
    for (var _ref3 of prevMap){
        var _ref2 = _slicedToArray(_ref3, 2);
        var key = _ref2[0];
        var _item2 = _ref2[1];
        if (!matchedKeys.has(key)) {
            removedPrevItems.push(_item2);
        }
    }
    return tagAlignedItems(alignedPrevItems, nextItems, removedPrevItems);
}
function matchAnimationItems(prevItems, nextItems, matchBy) {
    if (nextItems == null) {
        return null;
    }
    if (prevItems == null) {
        return nextItems.map((next)=>({
                status: 'added',
                next
            }));
    }
    if (matchBy === matchByIndex) {
        return matchByIndexImpl(prevItems, nextItems);
    }
    if (matchBy === matchAppend) {
        return matchAppendImpl(prevItems, nextItems);
    }
    return matchByKey(prevItems, nextItems, matchBy);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/timeoutController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Callback type for the timeout function.
 * Receives current time as an argument.
 */ /**
 * A function that, when called, cancels the timeout.
 *
 * @since 3.9
 */ /**
 * TimeoutController is responsible for controlling the movement of time.
 * Think of it as a clock.
 *
 * Recharts default implementation uses requestAnimationFrame which works great in a browser.
 * You may choose to override this which is especially useful if you want to control animations.
 *
 * Why would you want to do this?
 * - unit tests
 * - animations based on something other than time: UI controls, page scroll, mouse movement ...
 *
 * @see {@link https://recharts.github.io/en-US/guide/animations/ Animation guide}
 *
 * @since 3.9
 */ __turbopack_context__.s([
    "RequestAnimationFrameTimeoutController",
    ()=>RequestAnimationFrameTimeoutController
]);
class RequestAnimationFrameTimeoutController {
    setTimeout(callback) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var startTime = performance.now();
        var requestId = null;
        var executeCallback = (now)=>{
            if (now - startTime >= delay) {
                callback(now);
            } else {
                requestId = requestAnimationFrame(executeCallback);
            }
        };
        requestId = requestAnimationFrame(executeCallback);
        return ()=>{
            if (requestId != null) {
                cancelAnimationFrame(requestId);
            }
        };
    }
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/useAnimationController.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimationControllerProvider",
    ()=>AnimationControllerProvider,
    "useAnimationController",
    ()=>useAnimationController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$AnimationControllerImpl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/AnimationControllerImpl.js [app-client] (ecmascript)");
;
;
var AnimationControllerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$AnimationControllerImpl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animationControllerImpl"]);
var AnimationControllerProvider = AnimationControllerContext.Provider;
function useAnimationController(animationControllerFromProps) {
    var animationControllerFromContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AnimationControllerContext);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useAnimationController.useMemo": ()=>animationControllerFromProps !== null && animationControllerFromProps !== void 0 ? animationControllerFromProps : animationControllerFromContext
    }["useAnimationController.useMemo"], [
        animationControllerFromProps,
        animationControllerFromContext
    ]);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/useAnimationStartSnapshot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimationStartSnapshot",
    ()=>useAnimationStartSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function useAnimationStartSnapshot(animationInput, previousValueRef) {
    /*
   * Stores the identity of the animation cycle we are currently serving.
   * As soon as this changes, we know we need a brand new frozen snapshot.
   */ var previousAnimationInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(animationInput);
    /*
   * Frozen start-of-cycle value used for interpolation.
   * This is the value callers should match against for the whole duration of the
   * current animation, even if the live ref is updated many times afterward.
   */ var startValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(previousValueRef.current);
    /*
   * Prevents us from writing back into the live ref until the new animation has
   * actually rendered its own animationElapsedTime=0 frame. This avoids "pre-start" renders from
   * accidentally rebasing the next animation onto already-shifted geometry.
   */ var isReadyToCommitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    if (previousAnimationInputRef.current !== animationInput) {
        // New animation cycle: capture exactly one frozen starting snapshot.
        previousAnimationInputRef.current = animationInput;
        startValueRef.current = previousValueRef.current;
        // Writes stay blocked until the new cycle acknowledges its animationElapsedTime=0 frame.
        isReadyToCommitRef.current = false;
    }
    var syncStepValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnimationStartSnapshot.useCallback[syncStepValue]": function(stepValue, animationElapsedTime) {
            var canCommit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            if (animationElapsedTime === 0) {
                /*
       * animationElapsedTime=0 is the handshake that says: "the new animation has now rendered its
       * own starting frame". We do not write anything yet; we only allow later
       * in-flight frames to be committed safely.
       */ isReadyToCommitRef.current = true;
                return;
            }
            if (animationElapsedTime === 1) {
                // Keep the frozen snapshot aligned with the fully completed geometry.
                startValueRef.current = stepValue;
            }
            if (animationElapsedTime > 0 && isReadyToCommitRef.current && canCommit) {
                /*
       * Commit the latest visible frame so a future interruption can resume from
       * exactly what the user saw on screen most recently.
       */ // eslint-disable-next-line no-param-reassign
                previousValueRef.current = stepValue;
            }
        }
    }["useAnimationStartSnapshot.useCallback[syncStepValue]"], [
        previousValueRef
    ]);
    return {
        startValue: startValueRef.current,
        syncStepValue
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/util.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * @description: convert camel case to dash case
 * string => string
 */ __turbopack_context__.s([
    "getDashCase",
    ()=>getDashCase,
    "getTransitionVal",
    ()=>getTransitionVal
]);
var getDashCase = (name)=>name.replace(/([A-Z])/g, (v)=>"-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration, easing)=>props.map((prop)=>"".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing)).join(',');
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AreaChart",
    ()=>AreaChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$optionsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/optionsSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$CartesianChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/CartesianChart.js [app-client] (ecmascript)");
;
;
;
;
var allowedTooltipTypes = [
    'axis'
];
var AreaChart = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$CartesianChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianChart"], {
        chartName: "AreaChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$optionsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayTooltipSearcher"],
        categoricalChartProps: props,
        ref: ref
    });
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/CartesianChart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartesianChart",
    ()=>CartesianChart,
    "defaultCartesianChartProps",
    ()=>defaultCartesianChartProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$RechartsStoreProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/RechartsStoreProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartDataContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartDataContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportMainChartProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/ReportMainChartProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportChartProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/ReportChartProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportEventSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/ReportEventSettings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$CategoricalChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/CategoricalChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/resolveDefaultProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$eventSettingsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/eventSettingsSlice.js [app-client] (ecmascript)");
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
;
;
;
;
;
;
;
;
;
;
var defaultMargin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
};
var defaultCartesianChartProps = _objectSpread({
    accessibilityLayer: true,
    barCategoryGap: '10%',
    barGap: 4,
    layout: 'horizontal',
    margin: defaultMargin,
    responsive: false,
    reverseStackOrder: false,
    stackOffset: 'none',
    syncMethod: 'index'
}, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$eventSettingsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialEventSettingsState"]);
var CartesianChart = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(function CartesianChart(props, ref) {
    var _categoricalChartProp;
    var rootChartProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDefaultProps"])(props.categoricalChartProps, defaultCartesianChartProps);
    var chartName = props.chartName, defaultTooltipEventType = props.defaultTooltipEventType, validateTooltipEventTypes = props.validateTooltipEventTypes, tooltipPayloadSearcher = props.tooltipPayloadSearcher, categoricalChartProps = props.categoricalChartProps;
    var options = {
        chartName,
        defaultTooltipEventType,
        validateTooltipEventTypes,
        tooltipPayloadSearcher,
        eventEmitter: undefined
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$RechartsStoreProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RechartsStoreProvider"], {
        preloadedState: {
            options
        },
        reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartDataContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartDataContextProvider"], {
        chartData: categoricalChartProps.data
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportMainChartProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportMainChartProps"], {
        layout: rootChartProps.layout,
        margin: rootChartProps.margin
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportEventSettings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportEventSettings"], {
        throttleDelay: rootChartProps.throttleDelay,
        throttledEvents: rootChartProps.throttledEvents
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$ReportChartProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartProps"], {
        baseValue: rootChartProps.baseValue,
        accessibilityLayer: rootChartProps.accessibilityLayer,
        barCategoryGap: rootChartProps.barCategoryGap,
        maxBarSize: rootChartProps.maxBarSize,
        stackOffset: rootChartProps.stackOffset,
        barGap: rootChartProps.barGap,
        barSize: rootChartProps.barSize,
        syncId: rootChartProps.syncId,
        syncMethod: rootChartProps.syncMethod,
        className: rootChartProps.className,
        reverseStackOrder: rootChartProps.reverseStackOrder
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$CategoricalChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoricalChart"], _extends({}, rootChartProps, {
        ref: ref
    })));
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/CategoricalChart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoricalChart",
    ()=>CategoricalChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$RootSurface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/RootSurface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RechartsWrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/RechartsWrapper.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$ClipPathProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/ClipPathProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
var _excluded = [
    "width",
    "height",
    "responsive",
    "children",
    "className",
    "style",
    "compact",
    "title",
    "desc"
];
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
;
;
;
;
var CategoricalChart = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var width = props.width, height = props.height, responsive = props.responsive, children = props.children, className = props.className, style = props.style, compact = props.compact, title = props.title, desc = props.desc, others = _objectWithoutProperties(props, _excluded);
    var attrs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesNoEvents"])(others);
    /*
   * The "compact" mode is used as the panorama within Brush.
   * However because `compact` is a public prop, let's assume that it can render outside of Brush too.
   */ if (compact) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartSize"], {
            width: width,
            height: height
        }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$RootSurface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootSurface"], {
            otherAttributes: attrs,
            title: title,
            desc: desc
        }, children));
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RechartsWrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RechartsWrapper"], {
        className: className,
        style: style,
        width: width,
        height: height,
        responsive: responsive !== null && responsive !== void 0 ? responsive : false,
        onClick: props.onClick,
        onMouseLeave: props.onMouseLeave,
        onMouseEnter: props.onMouseEnter,
        onMouseMove: props.onMouseMove,
        onMouseDown: props.onMouseDown,
        onMouseUp: props.onMouseUp,
        onContextMenu: props.onContextMenu,
        onDoubleClick: props.onDoubleClick,
        onTouchStart: props.onTouchStart,
        onTouchMove: props.onTouchMove,
        onTouchEnd: props.onTouchEnd
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$RootSurface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootSurface"], {
        otherAttributes: attrs,
        title: title,
        desc: desc,
        ref: ref
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$ClipPathProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClipPathProvider"], null, children)));
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/chart/RechartsWrapper.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RechartsWrapper",
    ()=>RechartsWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/tooltipSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$mouseEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/mouseEventsMiddleware.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$synchronisation$2f$useChartSynchronisation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/synchronisation/useChartSynchronisation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$keyboardEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/keyboardEventsMiddleware.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useReportScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useReportScale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/externalEventsMiddleware.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$touchEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/touchEventsMiddleware.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$tooltipPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/tooltipPortalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$legendPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/legendPortalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
var EventSynchronizer = ()=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$synchronisation$2f$useChartSynchronisation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSynchronisedEventsFromOtherCharts"])();
    return null;
};
function getNumberOrZero(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        var parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }
    return 0;
}
var ResponsiveDiv = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var _props$style, _props$style2;
    var observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
        containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
    }), _useState2 = _slicedToArray(_useState, 2), sizes = _useState2[0], setSizes = _useState2[1];
    var setContainerSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ResponsiveDiv.useCallback[setContainerSize]": (newWidth, newHeight)=>{
            setSizes({
                "ResponsiveDiv.useCallback[setContainerSize]": (prevState)=>{
                    var roundedWidth = Math.round(newWidth);
                    var roundedHeight = Math.round(newHeight);
                    if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
                        return prevState;
                    }
                    return {
                        containerWidth: roundedWidth,
                        containerHeight: roundedHeight
                    };
                }
            }["ResponsiveDiv.useCallback[setContainerSize]"]);
        }
    }["ResponsiveDiv.useCallback[setContainerSize]"], []);
    var innerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ResponsiveDiv.useCallback[innerRef]": (node)=>{
            // 1. First, call the external ref if it was provided
            if (typeof ref === 'function') {
                ref(node);
            }
            // 2. Disconnect any previously active ResizeObserver instance to prevent memory leaks
            if (observerRef.current != null) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            // 3. Initiate a new ResizeObserver on the valid DOM node
            if (node != null && typeof ResizeObserver !== 'undefined') {
                var _node$getBoundingClie = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie.width, containerHeight = _node$getBoundingClie.height;
                setContainerSize(containerWidth, containerHeight);
                var callback = {
                    "ResponsiveDiv.useCallback[innerRef].callback": (entries)=>{
                        var entry = entries[0];
                        if (entry == null) {
                            return;
                        }
                        var _entry$contentRect = entry.contentRect, width = _entry$contentRect.width, height = _entry$contentRect.height;
                        setContainerSize(width, height);
                    }
                }["ResponsiveDiv.useCallback[innerRef].callback"];
                var observer = new ResizeObserver(callback);
                observer.observe(node);
                observerRef.current = observer;
            }
        }
    }["ResponsiveDiv.useCallback[innerRef]"], [
        ref,
        setContainerSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ResponsiveDiv.useEffect": ()=>{
            return ({
                "ResponsiveDiv.useEffect": ()=>{
                    var observer = observerRef.current;
                    if (observer != null) {
                        observer.disconnect();
                    }
                }
            })["ResponsiveDiv.useEffect"];
        }
    }["ResponsiveDiv.useEffect"], [
        setContainerSize
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartSize"], {
        width: sizes.containerWidth,
        height: sizes.containerHeight
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", _extends({
        ref: innerRef
    }, props)));
});
var ReadSizeOnceDiv = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var width = props.width, height = props.height;
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        containerWidth: getNumberOrZero(width),
        containerHeight: getNumberOrZero(height)
    }), _useState4 = _slicedToArray(_useState3, 2), sizes = _useState4[0], setSizes = _useState4[1];
    var setContainerSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReadSizeOnceDiv.useCallback[setContainerSize]": (newWidth, newHeight)=>{
            setSizes({
                "ReadSizeOnceDiv.useCallback[setContainerSize]": (prevState)=>{
                    var roundedWidth = Math.round(newWidth);
                    var roundedHeight = Math.round(newHeight);
                    if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
                        return prevState;
                    }
                    return {
                        containerWidth: roundedWidth,
                        containerHeight: roundedHeight
                    };
                }
            }["ReadSizeOnceDiv.useCallback[setContainerSize]"]);
        }
    }["ReadSizeOnceDiv.useCallback[setContainerSize]"], []);
    var innerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReadSizeOnceDiv.useCallback[innerRef]": (node)=>{
            if (typeof ref === 'function') {
                ref(node);
            }
            if (node != null) {
                var _node$getBoundingClie2 = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie2.width, containerHeight = _node$getBoundingClie2.height;
                setContainerSize(containerWidth, containerHeight);
            }
        }
    }["ReadSizeOnceDiv.useCallback[innerRef]"], [
        ref,
        setContainerSize
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartSize"], {
        width: sizes.containerWidth,
        height: sizes.containerHeight
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", _extends({
        ref: innerRef
    }, props)));
});
var StaticDiv = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var width = props.width, height = props.height;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartSize"], {
        width: width,
        height: height
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", _extends({
        ref: ref
    }, props)));
});
var NonResponsiveDiv = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var width = props.width, height = props.height;
    // When width or height are percentages or CSS short names, read size from DOM once
    if (typeof width === 'string' || typeof height === 'string') {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](ReadSizeOnceDiv, _extends({}, props, {
            ref: ref
        }));
    }
    // When both are numbers, use them directly
    if (typeof width === 'number' && typeof height === 'number') {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](StaticDiv, _extends({}, props, {
            width: width,
            height: height,
            ref: ref
        }));
    }
    // When width/height are undefined, render wrapper div without reporting size
    // This results in no SVG being rendered (intentional for backwards compatibility)
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportChartSize"], {
        width: width,
        height: height
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", _extends({
        ref: ref
    }, props)));
});
function getWrapperDivComponent(responsive) {
    return responsive ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var children = props.children, className = props.className, heightFromProps = props.height, onClick = props.onClick, onContextMenu = props.onContextMenu, onDoubleClick = props.onDoubleClick, onMouseDown = props.onMouseDown, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onMouseMove = props.onMouseMove, onMouseUp = props.onMouseUp, onTouchEnd = props.onTouchEnd, onTouchMove = props.onTouchMove, onTouchStart = props.onTouchStart, style = props.style, widthFromProps = props.width, responsive = props.responsive, _props$dispatchTouchE = props.dispatchTouchEvents, dispatchTouchEvents = _props$dispatchTouchE === void 0 ? true : _props$dispatchTouchE;
    var containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), _useState6 = _slicedToArray(_useState5, 2), tooltipPortal = _useState6[0], setTooltipPortal = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), _useState8 = _slicedToArray(_useState7, 2), legendPortal = _useState8[0], setLegendPortal = _useState8[1];
    var setScaleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useReportScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReportScale"])();
    var responsiveContainerCalculations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResponsiveContainerContext"])();
    var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
    var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
    var innerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[innerRef]": (node)=>{
            setScaleRef(node);
            if (typeof ref === 'function') {
                ref(node);
            }
            setTooltipPortal(node);
            setLegendPortal(node);
            if (node != null) {
                containerRef.current = node;
            }
        }
    }["RechartsWrapper.useCallback[innerRef]"], [
        setScaleRef,
        ref,
        setTooltipPortal,
        setLegendPortal
    ]);
    var myOnClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnClick]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$mouseEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mouseClickAction"])(e));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onClick,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnClick]"], [
        dispatch,
        onClick
    ]);
    var myOnMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnMouseEnter]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$mouseEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mouseMoveAction"])(e));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onMouseEnter,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnMouseEnter]"], [
        dispatch,
        onMouseEnter
    ]);
    var myOnMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnMouseLeave]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mouseLeaveChart"])());
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onMouseLeave,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnMouseLeave]"], [
        dispatch,
        onMouseLeave
    ]);
    var myOnMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnMouseMove]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$mouseEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mouseMoveAction"])(e));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onMouseMove,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnMouseMove]"], [
        dispatch,
        onMouseMove
    ]);
    var onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[onFocus]": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$keyboardEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusAction"])());
        }
    }["RechartsWrapper.useCallback[onFocus]"], [
        dispatch
    ]);
    var onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[onBlur]": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$keyboardEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blurAction"])());
        }
    }["RechartsWrapper.useCallback[onBlur]"], [
        dispatch
    ]);
    var onKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[onKeyDown]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$keyboardEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyDownAction"])(e.key));
        }
    }["RechartsWrapper.useCallback[onKeyDown]"], [
        dispatch
    ]);
    var myOnContextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnContextMenu]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onContextMenu,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnContextMenu]"], [
        dispatch,
        onContextMenu
    ]);
    var myOnDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnDoubleClick]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onDoubleClick,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnDoubleClick]"], [
        dispatch,
        onDoubleClick
    ]);
    var myOnMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnMouseDown]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onMouseDown,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnMouseDown]"], [
        dispatch,
        onMouseDown
    ]);
    var myOnMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnMouseUp]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onMouseUp,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnMouseUp]"], [
        dispatch,
        onMouseUp
    ]);
    var myOnTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnTouchStart]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onTouchStart,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnTouchStart]"], [
        dispatch,
        onTouchStart
    ]);
    /*
   * onTouchMove is special because it behaves different from mouse events.
   * Mouse events have 'enter' + 'leave' combo that notify us when the mouse is over
   * a certain element. Touch events don't have that; touch only gives us
   * start (finger down), end (finger up) and move (finger moving).
   * So we need to figure out which element the user is touching
   * ourselves. Fortunately, there's a convenient method for that:
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint
   */ var myOnTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnTouchMove]": (e)=>{
            if (dispatchTouchEvents) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$touchEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["touchEventAction"])(e));
            }
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onTouchMove,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnTouchMove]"], [
        dispatch,
        dispatchTouchEvents,
        onTouchMove
    ]);
    var myOnTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RechartsWrapper.useCallback[myOnTouchEnd]": (e)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$externalEventsMiddleware$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["externalEventAction"])({
                handler: onTouchEnd,
                reactEvent: e
            }));
        }
    }["RechartsWrapper.useCallback[myOnTouchEnd]"], [
        dispatch,
        onTouchEnd
    ]);
    var WrapperDiv = getWrapperDivComponent(responsive);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$tooltipPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipPortalContext"].Provider, {
        value: tooltipPortal
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$legendPortalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LegendPortalContext"].Provider, {
        value: legendPortal
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](WrapperDiv, {
        width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
        height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-wrapper', className),
        style: _objectSpread({
            position: 'relative',
            cursor: 'default',
            width,
            height
        }, style),
        onClick: myOnClick,
        onContextMenu: myOnContextMenu,
        onDoubleClick: myOnDoubleClick,
        onFocus: onFocus,
        onBlur: onBlur,
        onKeyDown: onKeyDown,
        onMouseDown: myOnMouseDown,
        onMouseEnter: myOnMouseEnter,
        onMouseLeave: myOnMouseLeave,
        onMouseMove: myOnMouseMove,
        onMouseUp: myOnMouseUp,
        onTouchEnd: myOnTouchEnd,
        onTouchMove: myOnTouchMove,
        onTouchStart: myOnTouchStart,
        ref: innerRef
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](EventSynchronizer, null), children)));
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/ClipPathProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClipPathProvider",
    ()=>ClipPathProvider,
    "useClipPathId",
    ()=>useClipPathId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/hooks.js [app-client] (ecmascript)");
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
;
;
;
;
var ClipPathIdContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
var ClipPathProvider = (_ref)=>{
    var children = _ref.children;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uniqueId"])('recharts'), "-clip")), _useState2 = _slicedToArray(_useState, 1), clipPathId = _useState2[0];
    var plotArea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlotArea"])();
    if (plotArea == null) {
        return null;
    }
    var x = plotArea.x, y = plotArea.y, width = plotArea.width, height = plotArea.height;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](ClipPathIdContext.Provider, {
        value: clipPathId
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("defs", null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("clipPath", {
        id: clipPathId
    }, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("rect", {
        x: x,
        y: y,
        height: height,
        width: width
    }))), children);
};
var useClipPathId = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClipPathIdContext);
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/Layer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layer",
    ()=>Layer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)");
var _excluded = [
    "children",
    "className"
];
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
var Layer = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, ref)=>{
    var children = props.children, className = props.className, others = _objectWithoutProperties(props, _excluded);
    var layerClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-layer', className);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("g", _extends({
        className: layerClass
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(others), {
        ref: ref
    }), children);
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/RootSurface.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RootSurface",
    ()=>RootSurface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$accessibilityContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/accessibilityContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Surface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/Surface.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$brushSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/brushSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$ZIndexPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/ZIndexPortal.js [app-client] (ecmascript)");
var _excluded = [
    "children"
];
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
;
;
;
;
;
;
;
;
;
var FULL_WIDTH_AND_HEIGHT = {
    width: '100%',
    height: '100%',
    /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */ display: 'block'
};
var MainChartSurface = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var width = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartWidth"])();
    var height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartHeight"])();
    var hasAccessibilityLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$accessibilityContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccessibilityLayer"])();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPositiveNumber"])(width) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPositiveNumber"])(height)) {
        return null;
    }
    var children = props.children, otherAttributes = props.otherAttributes, title = props.title, desc = props.desc;
    var tabIndex, role;
    if (otherAttributes != null) {
        if (typeof otherAttributes.tabIndex === 'number') {
            tabIndex = otherAttributes.tabIndex;
        } else {
            tabIndex = hasAccessibilityLayer ? 0 : undefined;
        }
        if (typeof otherAttributes.role === 'string') {
            role = otherAttributes.role;
        } else {
            role = hasAccessibilityLayer ? 'application' : undefined;
        }
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Surface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Surface"], _extends({}, otherAttributes, {
        title: title,
        desc: desc,
        role: role,
        tabIndex: tabIndex,
        width: width,
        height: height,
        style: FULL_WIDTH_AND_HEIGHT,
        ref: ref
    }), children);
});
var BrushPanoramaSurface = (_ref)=>{
    var children = _ref.children;
    var brushDimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$brushSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectBrushDimensions"]);
    if (!brushDimensions) {
        return null;
    }
    var width = brushDimensions.width, height = brushDimensions.height, y = brushDimensions.y, x = brushDimensions.x;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Surface$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Surface"], {
        width: width,
        height: height,
        x: x,
        y: y
    }, children);
};
var RootSurface = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((_ref2, ref)=>{
    var children = _ref2.children, rest = _objectWithoutProperties(_ref2, _excluded);
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    if (isPanorama) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](BrushPanoramaSurface, null, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$ZIndexPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllZIndexPortals"], {
            isPanorama: true
        }, children));
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](MainChartSurface, _extends({
        ref: ref
    }, rest), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$ZIndexPortal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllZIndexPortals"], {
        isPanorama: false
    }, children));
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/Surface.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Surface",
    ()=>Surface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)");
var _excluded = [
    "children",
    "width",
    "height",
    "viewBox",
    "className",
    "style",
    "title",
    "desc"
];
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
;
var Surface = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    var children = props.children, width = props.width, height = props.height, viewBox = props.viewBox, className = props.className, style = props.style, title = props.title, desc = props.desc, others = _objectWithoutProperties(props, _excluded);
    var svgView = viewBox || {
        width,
        height,
        x: 0,
        y: 0
    };
    var layerClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-surface', className);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("svg", _extends({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(others), {
        className: layerClass,
        width: width,
        height: height,
        style: style,
        viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
        ref: ref
    }), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("title", null, title), /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("desc", null, desc), children);
});
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PanoramaContextProvider",
    ()=>PanoramaContextProvider,
    "useIsPanorama",
    ()=>useIsPanorama
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
var PanoramaContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
var useIsPanorama = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PanoramaContext) != null;
var PanoramaContextProvider = (_ref)=>{
    var children = _ref.children;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](PanoramaContext.Provider, {
        value: true
    }, children);
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/RegisterGraphicalItemId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RegisterGraphicalItemId",
    ()=>RegisterGraphicalItemId,
    "useGraphicalItemId",
    ()=>useGraphicalItemId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useUniqueId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useUniqueId.js [app-client] (ecmascript)");
;
;
;
var GraphicalItemIdContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
var RegisterGraphicalItemId = (_ref)=>{
    var id = _ref.id, type = _ref.type, children = _ref.children;
    var resolvedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useUniqueId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUniqueId"])("recharts-".concat(type), id);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](GraphicalItemIdContext.Provider, {
        value: resolvedId
    }, children(resolvedId));
};
function useGraphicalItemId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GraphicalItemIdContext);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/accessibilityContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAccessibilityLayer",
    ()=>useAccessibilityLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
;
var useAccessibilityLayer = ()=>{
    var _useAppSelector;
    return (_useAppSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useAccessibilityLayer.useAppSelector": (state)=>state.rootProps.accessibilityLayer
    }["useAccessibilityLayer.useAppSelector"])) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartDataContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartDataContextProvider",
    ()=>ChartDataContextProvider,
    "SetComputedData",
    ()=>SetComputedData,
    "useChartData",
    ()=>useChartData,
    "useDataIndex",
    ()=>useDataIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/chartDataSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)");
;
;
;
;
var ChartDataContextProvider = (props)=>{
    var chartData = props.chartData;
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChartDataContextProvider.useEffect": ()=>{
            if (isPanorama) {
                // Panorama mode reuses data from the main chart, so we must not overwrite it here.
                return ({
                    "ChartDataContextProvider.useEffect": ()=>{
                    // there is nothing to clean up
                    }
                })["ChartDataContextProvider.useEffect"];
            }
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChartData"])(chartData));
            return ({
                "ChartDataContextProvider.useEffect": ()=>{
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChartData"])(undefined));
                }
            })["ChartDataContextProvider.useEffect"];
        }
    }["ChartDataContextProvider.useEffect"], [
        chartData,
        dispatch,
        isPanorama
    ]);
    return null;
};
var SetComputedData = (props)=>{
    var computedData = props.computedData;
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SetComputedData.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setComputedData"])(computedData));
            return ({
                "SetComputedData.useEffect": ()=>{
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChartData"])(undefined));
                }
            })["SetComputedData.useEffect"];
        }
    }["SetComputedData.useEffect"], [
        computedData,
        dispatch
    ]);
    return null;
};
var selectChartData = (state)=>state.chartData.chartData;
var useChartData = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(selectChartData);
var selectDataIndex = (state)=>{
    var _state$chartData = state.chartData, dataStartIndex = _state$chartData.dataStartIndex, dataEndIndex = _state$chartData.dataEndIndex;
    return {
        startIndex: dataStartIndex,
        endIndex: dataEndIndex
    };
};
var useDataIndex = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(selectDataIndex);
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportChartMargin",
    ()=>ReportChartMargin,
    "ReportChartSize",
    ()=>ReportChartSize,
    "selectChartLayout",
    ()=>selectChartLayout,
    "selectPolarChartLayout",
    ()=>selectPolarChartLayout,
    "useCartesianChartLayout",
    ()=>useCartesianChartLayout,
    "useChartHeight",
    ()=>useChartHeight,
    "useChartLayout",
    ()=>useChartLayout,
    "useChartWidth",
    ()=>useChartWidth,
    "useIsInChartContext",
    ()=>useIsInChartContext,
    "useMargin",
    ()=>useMargin,
    "useOffsetInternal",
    ()=>useOffsetInternal,
    "usePolarChartLayout",
    ()=>usePolarChartLayout,
    "useViewBox",
    ()=>useViewBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$layoutSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/layoutSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectChartOffsetInternal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$containerSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/containerSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$brushSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/brushSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
var useViewBox = ()=>{
    var _useAppSelector;
    var panorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    var rootViewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectChartOffsetInternal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectChartViewBox"]);
    var brushDimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$brushSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectBrushDimensions"]);
    var brushPadding = (_useAppSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$brushSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectBrushSettings"])) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
    if (!panorama || !brushDimensions || !brushPadding) {
        return rootViewBox;
    }
    return {
        width: brushDimensions.width - brushPadding.left - brushPadding.right,
        height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
        x: brushPadding.left,
        y: brushPadding.top
    };
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    brushBottom: 0
};
var useOffsetInternal = ()=>{
    var _useAppSelector2;
    return (_useAppSelector2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectChartOffsetInternal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectChartOffsetInternal"])) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$containerSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectChartWidth"]);
};
var useChartHeight = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$containerSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectChartHeight"]);
};
var useMargin = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useMargin.useAppSelector": (state)=>state.layout.margin
    }["useMargin.useAppSelector"]);
};
var selectChartLayout = (state)=>state.layout.layoutType;
var useChartLayout = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(selectChartLayout);
var useCartesianChartLayout = ()=>{
    var layout = useChartLayout();
    if (layout === 'horizontal' || layout === 'vertical') {
        return layout;
    }
    return undefined;
};
var selectPolarChartLayout = (state)=>{
    var layout = state.layout.layoutType;
    if (layout === 'centric' || layout === 'radial') {
        return layout;
    }
    return undefined;
};
var usePolarChartLayout = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(selectPolarChartLayout);
};
var useIsInChartContext = ()=>{
    /*
   * All charts provide a layout type in the chart context.
   * If we have a layout type, we are in a chart context.
   */ var layout = useChartLayout();
    return layout !== undefined;
};
var ReportChartSize = (props)=>{
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    /*
   * Skip dispatching properties in panorama chart for two reasons:
   * 1. The root chart should be deciding on these properties, and
   * 2. Brush reads these properties from redux store, and so they must remain stable
   *      to avoid circular dependency and infinite re-rendering.
   */ var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    var widthFromProps = props.width, heightFromProps = props.height;
    var responsiveContainerCalculations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResponsiveContainerContext"])();
    var width = widthFromProps;
    var height = heightFromProps;
    if (responsiveContainerCalculations) {
        /*
     * In case we receive width and height from ResponsiveContainer,
     * we will always prefer those.
     * Only in case ResponsiveContainer does not provide width or height,
     * we will fall back to the explicitly provided width and height.
     *
     * This to me feels backwards - we should allow override by the more specific props on individual charts, right?
     * But this is 3.x behaviour, so let's keep it for backwards compatibility.
     *
     * We can change this in 4.x if we want to.
     */ width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
        height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportChartSize.useEffect": ()=>{
            if (!isPanorama && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPositiveNumber"])(width) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPositiveNumber"])(height)) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$layoutSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setChartSize"])({
                    width,
                    height
                }));
            }
        }
    }["ReportChartSize.useEffect"], [
        dispatch,
        isPanorama,
        width,
        height
    ]);
    return null;
};
var ReportChartMargin = (_ref)=>{
    var margin = _ref.margin;
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportChartMargin.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$layoutSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMargin"])(margin));
        }
    }["ReportChartMargin.useEffect"], [
        dispatch,
        margin
    ]);
    return null;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/legendPortalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LegendPortalContext",
    ()=>LegendPortalContext,
    "useLegendPortal",
    ()=>useLegendPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var LegendPortalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
var useLegendPortal = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LegendPortalContext);
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/tooltipPortalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TooltipPortalContext",
    ()=>TooltipPortalContext,
    "useTooltipPortal",
    ()=>useTooltipPortal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var TooltipPortalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
var useTooltipPortal = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TooltipPortalContext);
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/useTooltipAxis.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTooltipAxis",
    ()=>useTooltipAxis,
    "useTooltipAxisBandSize",
    ()=>useTooltipAxisBandSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ChartUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/axisSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/tooltipSelectors.js [app-client] (ecmascript)");
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
;
;
;
;
var useTooltipAxis = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectTooltipAxis"]);
var useTooltipAxisBandSize = ()=>{
    var tooltipAxis = useTooltipAxis();
    var tooltipTicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectTooltipAxisTicks"]);
    var tooltipAxisScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectTooltipAxisScale"]);
    if (!tooltipAxis || !tooltipAxisScale) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBandSizeOfAxis"])(undefined, tooltipTicks);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBandSizeOfAxis"])(_objectSpread(_objectSpread({}, tooltipAxis), {}, {
        scale: tooltipAxisScale
    }), tooltipTicks);
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/hooks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveTooltipCoordinate",
    ()=>useActiveTooltipCoordinate,
    "useActiveTooltipDataPoints",
    ()=>useActiveTooltipDataPoints,
    "useActiveTooltipLabel",
    ()=>useActiveTooltipLabel,
    "useCartesianScale",
    ()=>useCartesianScale,
    "useIsTooltipActive",
    ()=>useIsTooltipActive,
    "useOffset",
    ()=>useOffset,
    "usePlotArea",
    ()=>usePlotArea,
    "useXAxis",
    ()=>useXAxis,
    "useXAxisDomain",
    ()=>useXAxisDomain,
    "useXAxisInverseDataSnapScale",
    ()=>useXAxisInverseDataSnapScale,
    "useXAxisInverseScale",
    ()=>useXAxisInverseScale,
    "useXAxisInverseTickSnapScale",
    ()=>useXAxisInverseTickSnapScale,
    "useXAxisScale",
    ()=>useXAxisScale,
    "useXAxisTicks",
    ()=>useXAxisTicks,
    "useYAxis",
    ()=>useYAxis,
    "useYAxisDomain",
    ()=>useYAxisDomain,
    "useYAxisInverseDataSnapScale",
    ()=>useYAxisInverseDataSnapScale,
    "useYAxisInverseScale",
    ()=>useYAxisInverseScale,
    "useYAxisInverseTickSnapScale",
    ()=>useYAxisInverseTickSnapScale,
    "useYAxisScale",
    ()=>useYAxisScale,
    "useYAxisTicks",
    ()=>useYAxisTicks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/cartesianAxisSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/axisSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/tooltipSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectChartOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/selectChartOffset.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectPlotArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/selectPlotArea.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
var useXAxis = (xAxisId)=>{
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxis.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisWithScale"])(state, 'xAxis', xAxisId, isPanorama)
    }["useXAxis.useAppSelector"]);
};
var useYAxis = (yAxisId)=>{
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxis.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisWithScale"])(state, 'yAxis', yAxisId, isPanorama)
    }["useYAxis.useAppSelector"]);
};
var useXAxisScale = function useXAxisScale() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    var scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisScale.useAppSelector[scale]": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisScale"])(state, 'xAxis', xAxisId, isPanorama)
    }["useXAxisScale.useAppSelector[scale]"]);
    return scale === null || scale === void 0 ? void 0 : scale.map;
};
var useYAxisScale = function useYAxisScale() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    var scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisScale.useAppSelector[scale]": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisScale"])(state, 'yAxis', yAxisId, isPanorama)
    }["useYAxisScale.useAppSelector[scale]"]);
    return scale === null || scale === void 0 ? void 0 : scale.map;
};
var useXAxisInverseScale = function useXAxisInverseScale() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisInverseScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseScale"])(state, 'xAxis', xAxisId, isPanorama)
    }["useXAxisInverseScale.useAppSelector"]);
};
var useXAxisInverseDataSnapScale = function useXAxisInverseDataSnapScale() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisInverseDataSnapScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseDataSnapScale"])(state, 'xAxis', xAxisId, isPanorama)
    }["useXAxisInverseDataSnapScale.useAppSelector"]);
};
var useXAxisInverseTickSnapScale = function useXAxisInverseTickSnapScale() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisInverseTickSnapScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseTickSnapScale"])(state, 'xAxis', xAxisId)
    }["useXAxisInverseTickSnapScale.useAppSelector"]);
};
var useYAxisInverseScale = function useYAxisInverseScale() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisInverseScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseScale"])(state, 'yAxis', yAxisId, isPanorama)
    }["useYAxisInverseScale.useAppSelector"]);
};
var useYAxisInverseDataSnapScale = function useYAxisInverseDataSnapScale() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisInverseDataSnapScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseDataSnapScale"])(state, 'yAxis', yAxisId, isPanorama)
    }["useYAxisInverseDataSnapScale.useAppSelector"]);
};
var useYAxisInverseTickSnapScale = function useYAxisInverseTickSnapScale() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisInverseTickSnapScale.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisInverseTickSnapScale"])(state, 'yAxis', yAxisId)
    }["useYAxisInverseTickSnapScale.useAppSelector"]);
};
var useXAxisTicks = function useXAxisTicks() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisTicks.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectRenderedTicksOfAxis"])(state, 'xAxis', xAxisId)
    }["useXAxisTicks.useAppSelector"]);
};
var useYAxisTicks = function useYAxisTicks() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisTicks.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectRenderedTicksOfAxis"])(state, 'yAxis', yAxisId)
    }["useYAxisTicks.useAppSelector"]);
};
var useCartesianScale = function useCartesianScale(dataPoint) {
    var xAxisId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var yAxisId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var xScale = useXAxisScale(xAxisId);
    var yScale = useYAxisScale(yAxisId);
    if (xScale == null || yScale == null) {
        return undefined;
    }
    var pixelX = xScale(dataPoint.x);
    var pixelY = yScale(dataPoint.y);
    if (pixelX == null || pixelY == null) {
        return undefined;
    }
    return {
        x: pixelX,
        y: pixelY
    };
};
var useActiveTooltipLabel = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectActiveLabel"]);
};
var useOffset = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectChartOffset$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectChartOffset"]);
};
var usePlotArea = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectPlotArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectPlotArea"]);
};
var useActiveTooltipDataPoints = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectActiveTooltipDataPoints"]);
};
var useXAxisDomain = function useXAxisDomain() {
    var xAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useXAxisDomain.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisDomain"])(state, 'xAxis', xAxisId, isPanorama)
    }["useXAxisDomain.useAppSelector"]);
};
var useYAxisDomain = function useYAxisDomain() {
    var yAxisId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$cartesianAxisSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultAxisId"];
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useYAxisDomain.useAppSelector": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$axisSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAxisDomain"])(state, 'yAxis', yAxisId, isPanorama)
    }["useYAxisDomain.useAppSelector"]);
};
var useIsTooltipActive = ()=>{
    var _useAppSelector;
    return (_useAppSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectIsTooltipActive"])) !== null && _useAppSelector !== void 0 ? _useAppSelector : false;
};
var useActiveTooltipCoordinate = ()=>{
    var coordinate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectActiveTooltipCoordinate"]);
    if (coordinate == null) {
        return undefined;
    }
    return {
        x: coordinate.x,
        y: coordinate.y
    };
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/polar/defaultPolarAngleAxisProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultPolarAngleAxisProps",
    ()=>defaultPolarAngleAxisProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/DefaultZIndexes.js [app-client] (ecmascript)");
;
var defaultPolarAngleAxisProps = {
    allowDecimals: false,
    allowDuplicatedCategory: true,
    // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
    allowDataOverflow: false,
    angle: 0,
    angleAxisId: 0,
    axisLine: true,
    axisLineType: 'polygon',
    cx: 0,
    cy: 0,
    hide: false,
    includeHidden: false,
    label: false,
    niceTicks: 'auto',
    orientation: 'outer',
    reversed: false,
    scale: 'auto',
    tick: true,
    tickLine: true,
    tickSize: 8,
    type: 'auto',
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultZIndexes"].axis
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/polar/defaultPolarRadiusAxisProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultPolarRadiusAxisProps",
    ()=>defaultPolarRadiusAxisProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/DefaultZIndexes.js [app-client] (ecmascript)");
;
var defaultPolarRadiusAxisProps = {
    allowDataOverflow: false,
    allowDecimals: false,
    allowDuplicatedCategory: true,
    angle: 0,
    axisLine: true,
    includeHidden: false,
    hide: false,
    niceTicks: 'auto',
    label: false,
    orientation: 'right',
    radiusAxisId: 0,
    reversed: false,
    scale: 'auto',
    stroke: '#ccc',
    tick: true,
    tickCount: 5,
    tickLine: true,
    type: 'auto',
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultZIndexes"].axis
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/shape/Cross.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cross",
    ()=>Cross
]);
/**
 * @fileOverview Cross
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)");
var _excluded = [
    "x",
    "y",
    "top",
    "left",
    "width",
    "height",
    "className"
];
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
;
var getPath = (x, y, width, height, top, left)=>{
    return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = (_ref)=>{
    var _ref$x = _ref.x, x = _ref$x === void 0 ? 0 : _ref$x, _ref$y = _ref.y, y = _ref$y === void 0 ? 0 : _ref$y, _ref$top = _ref.top, top = _ref$top === void 0 ? 0 : _ref$top, _ref$left = _ref.left, left = _ref$left === void 0 ? 0 : _ref$left, _ref$width = _ref.width, width = _ref$width === void 0 ? 0 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 0 : _ref$height, className = _ref.className, rest = _objectWithoutProperties(_ref, _excluded);
    var props = _objectSpread({
        x,
        y,
        top,
        left,
        width,
        height
    }, rest);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(x) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(y) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(width) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(height) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(top) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(left)) {
        return null;
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", _extends({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(props), {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-cross', className),
        d: getPath(x, y, width, height, top, left)
    }));
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/shape/Curve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Curve",
    ()=>Curve,
    "defaultCurveProps",
    ()=>defaultCurveProps,
    "getPath",
    ()=>getPath
]);
/**
 * @fileOverview Curve
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$victory$2d$vendor$40$37$2e$3$2e$6$2f$node_modules$2f$victory$2d$vendor$2f$es$2f$d3$2d$shape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/victory-vendor@37.3.6/node_modules/victory-vendor/es/d3-shape.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__area$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/area.js [app-client] (ecmascript) <export default as area>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasis$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basis.js [app-client] (ecmascript) <export default as curveBasis>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basisClosed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasisClosed$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisClosed.js [app-client] (ecmascript) <export default as curveBasisClosed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basisOpen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasisOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisOpen.js [app-client] (ecmascript) <export default as curveBasisOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$bump$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__bumpX__as__curveBumpX$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bump.js [app-client] (ecmascript) <export bumpX as curveBumpX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$bump$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__bumpY__as__curveBumpY$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bump.js [app-client] (ecmascript) <export bumpY as curveBumpY>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$linear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveLinear$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linear.js [app-client] (ecmascript) <export default as curveLinear>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$linearClosed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveLinearClosed$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linearClosed.js [app-client] (ecmascript) <export default as curveLinearClosed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$monotone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__monotoneX__as__curveMonotoneX$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/monotone.js [app-client] (ecmascript) <export monotoneX as curveMonotoneX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$monotone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__monotoneY__as__curveMonotoneY$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/monotone.js [app-client] (ecmascript) <export monotoneY as curveMonotoneY>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$natural$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveNatural$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/natural.js [app-client] (ecmascript) <export default as curveNatural>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveStep$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js [app-client] (ecmascript) <export default as curveStep>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__stepAfter__as__curveStepAfter$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js [app-client] (ecmascript) <export stepAfter as curveStepAfter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__stepBefore__as__curveStepBefore$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js [app-client] (ecmascript) <export stepBefore as curveStepBefore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__line$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/line.js [app-client] (ecmascript) <export default as line>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
;
;
;
;
;
;
;
;
var CURVE_FACTORIES = {
    curveBasisClosed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basisClosed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasisClosed$3e$__["curveBasisClosed"],
    curveBasisOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basisOpen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasisOpen$3e$__["curveBasisOpen"],
    curveBasis: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$basis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveBasis$3e$__["curveBasis"],
    curveBumpX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$bump$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__bumpX__as__curveBumpX$3e$__["curveBumpX"],
    curveBumpY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$bump$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__bumpY__as__curveBumpY$3e$__["curveBumpY"],
    curveLinearClosed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$linearClosed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveLinearClosed$3e$__["curveLinearClosed"],
    curveLinear: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$linear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveLinear$3e$__["curveLinear"],
    curveMonotoneX: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$monotone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__monotoneX__as__curveMonotoneX$3e$__["curveMonotoneX"],
    curveMonotoneY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$monotone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__monotoneY__as__curveMonotoneY$3e$__["curveMonotoneY"],
    curveNatural: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$natural$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveNatural$3e$__["curveNatural"],
    curveStep: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveStep$3e$__["curveStep"],
    curveStepAfter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__stepAfter__as__curveStepAfter$3e$__["curveStepAfter"],
    curveStepBefore: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__stepBefore__as__curveStepBefore$3e$__["curveStepBefore"]
};
/**
 * @inline
 */ /**
 * @inline
 */ var defined = (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(p.x) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(p.y);
var areaDefined = (d)=>d.base != null && defined(d.base) && defined(d);
var getX = (p)=>p.x;
var getY = (p)=>p.y;
var getCurveFactory = (type, layout)=>{
    if (typeof type === 'function') {
        return type;
    }
    var name = "curve".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["upperFirst"])(type));
    if ((name === 'curveMonotone' || name === 'curveBump') && layout) {
        var factory = CURVE_FACTORIES["".concat(name).concat(layout === 'vertical' ? 'Y' : 'X')];
        if (factory) {
            return factory;
        }
    }
    return CURVE_FACTORIES[name] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$curve$2f$linear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__curveLinear$3e$__["curveLinear"];
};
var defaultCurveProps = {
    connectNulls: false,
    type: 'linear'
};
var getPath = (_ref)=>{
    var _ref$type = _ref.type, type = _ref$type === void 0 ? defaultCurveProps.type : _ref$type, _ref$points = _ref.points, points = _ref$points === void 0 ? [] : _ref$points, baseLine = _ref.baseLine, layout = _ref.layout, _ref$connectNulls = _ref.connectNulls, connectNulls = _ref$connectNulls === void 0 ? defaultCurveProps.connectNulls : _ref$connectNulls;
    var curveFactory = getCurveFactory(type, layout);
    var formatPoints = connectNulls ? points.filter(defined) : points;
    // When dealing with an area chart (where `baseLine` is an array),
    // we need to pair points with their corresponding `baseLine` points first.
    // This is to ensure that we filter points and their baseline counterparts together,
    // preventing errors from mismatched array lengths and ensuring `defined` checks both.
    if (Array.isArray(baseLine)) {
        var _lineFunction;
        var areaPoints = points.map((entry, index)=>_objectSpread(_objectSpread({}, entry), {}, {
                base: baseLine[index]
            }));
        if (layout === 'vertical') {
            _lineFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__area$3e$__["area"])().y(getY).x1(getX).x0((d)=>d.base.x);
        } else {
            _lineFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__area$3e$__["area"])().x(getX).y1(getY).y0((d)=>d.base.y);
        }
        /*
     * What happens here is that the `.defined()` call will make it so that this function can accept
     * nullable points, and internally it will filter them out and skip when generating the path.
     * So on the input it accepts NullableCoordinate, but it never calls getX/getY on null points because of the defined() filter.
     *
     * The d3 type definition has only one generic so it doesn't allow to describe this properly.
     * However. d3 types are mutable, but we can pretend that they are not, and we can pretend
     * that calling defined() returns a new function with a different generic type.
     */ // @ts-expect-error the defined call changes the generic type internally but d3 types don't reflect that
        var _nullableLineFunction = _lineFunction.defined(areaDefined).curve(curveFactory);
        var finalPoints = connectNulls ? areaPoints.filter(areaDefined) : areaPoints;
        return _nullableLineFunction(finalPoints);
    }
    var lineFunction;
    if (layout === 'vertical' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(baseLine)) {
        lineFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__area$3e$__["area"])().y(getY).x1(getX).x0(baseLine);
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(baseLine)) {
        lineFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__area$3e$__["area"])().x(getX).y1(getY).y0(baseLine);
    } else {
        lineFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__line$3e$__["line"])().x(getX).y(getY);
    }
    // @ts-expect-error the defined call changes the generic type internally but d3 types don't reflect that
    var nullableLineFunction = lineFunction.defined(defined).curve(curveFactory);
    return nullableLineFunction(formatPoints);
};
var Curve = (props)=>{
    var className = props.className, points = props.points, path = props.path, pathRef = props.pathRef;
    var layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartLayout"])();
    if ((!points || !points.length) && !path) {
        return null;
    }
    var getPathInput = {
        type: props.type,
        points: props.points,
        baseLine: props.baseLine,
        layout: props.layout || layout,
        connectNulls: props.connectNulls
    };
    var realPath = points && points.length ? getPath(getPathInput) : path;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", _extends({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesNoEvents"])(props), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptEventHandlers"])(props), {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-curve', className),
        d: realPath === null ? undefined : realPath,
        ref: pathRef
    }));
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/shape/Dot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dot",
    ()=>Dot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
;
;
;
;
var Dot = (props)=>{
    var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
    var layerClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-dot', className);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(cx) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(cy) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(r)) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("circle", _extends({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesNoEvents"])(props), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptEventHandlers"])(props), {
            className: layerClass,
            cx: cx,
            cy: cy,
            r: r
        }));
    }
    return null;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/shape/Rectangle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Rectangle",
    ()=>Rectangle,
    "defaultRectangleProps",
    ()=>defaultRectangleProps
]);
/**
 * @fileOverview Rectangle
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/resolveDefaultProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$JavascriptAnimate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/JavascriptAnimate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useAnimationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useAnimationId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/animation/util.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/round.js [app-client] (ecmascript)");
var _excluded = [
    "radius"
], _excluded2 = [
    "radius"
];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0;
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
            value: Object.freeze(t)
        }
    }));
}
;
;
;
;
;
;
;
;
;
;
/**
 * @inline
 */ var getRectanglePath = (x, y, width, height, radius)=>{
    var roundedWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(width);
    var roundedHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(height);
    var maxRadius = Math.min(Math.abs(roundedWidth) / 2, Math.abs(roundedHeight) / 2);
    var ySign = roundedHeight >= 0 ? 1 : -1;
    var xSign = roundedWidth >= 0 ? 1 : -1;
    var clockWise = roundedHeight >= 0 && roundedWidth >= 0 || roundedHeight < 0 && roundedWidth < 0 ? 1 : 0;
    var path;
    if (maxRadius > 0 && Array.isArray(radius)) {
        var newRadius = [
            0,
            0,
            0,
            0
        ];
        for(var i = 0, len = 4; i < len; i++){
            var _radius$i;
            var r = (_radius$i = radius[i]) !== null && _radius$i !== void 0 ? _radius$i : 0;
            newRadius[i] = r > maxRadius ? maxRadius : r;
        }
        path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject || (_templateObject = _taggedTemplateLiteral([
            "M",
            ",",
            ""
        ])), x, y + ySign * newRadius[0]);
        if (newRadius[0] > 0) {
            path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([
                "A ",
                ",",
                ",0,0,",
                ",",
                ",",
                ""
            ])), newRadius[0], newRadius[0], clockWise, x + xSign * newRadius[0], y);
        }
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([
            "L ",
            ",",
            ""
        ])), x + width - xSign * newRadius[1], y);
        if (newRadius[1] > 0) {
            path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([
                "A ",
                ",",
                ",0,0,",
                ",\n        ",
                ",",
                ""
            ])), newRadius[1], newRadius[1], clockWise, x + width, y + ySign * newRadius[1]);
        }
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([
            "L ",
            ",",
            ""
        ])), x + width, y + height - ySign * newRadius[2]);
        if (newRadius[2] > 0) {
            path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral([
                "A ",
                ",",
                ",0,0,",
                ",\n        ",
                ",",
                ""
            ])), newRadius[2], newRadius[2], clockWise, x + width - xSign * newRadius[2], y + height);
        }
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral([
            "L ",
            ",",
            ""
        ])), x + xSign * newRadius[3], y + height);
        if (newRadius[3] > 0) {
            path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral([
                "A ",
                ",",
                ",0,0,",
                ",\n        ",
                ",",
                ""
            ])), newRadius[3], newRadius[3], clockWise, x, y + height - ySign * newRadius[3]);
        }
        path += 'Z';
    } else if (maxRadius > 0 && radius === +radius && radius > 0) {
        var _newRadius = Math.min(maxRadius, radius);
        path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral([
            "M ",
            ",",
            "\n            A ",
            ",",
            ",0,0,",
            ",",
            ",",
            "\n            L ",
            ",",
            "\n            A ",
            ",",
            ",0,0,",
            ",",
            ",",
            "\n            L ",
            ",",
            "\n            A ",
            ",",
            ",0,0,",
            ",",
            ",",
            "\n            L ",
            ",",
            "\n            A ",
            ",",
            ",0,0,",
            ",",
            ",",
            " Z"
        ])), x, y + ySign * _newRadius, _newRadius, _newRadius, clockWise, x + xSign * _newRadius, y, x + width - xSign * _newRadius, y, _newRadius, _newRadius, clockWise, x + width, y + ySign * _newRadius, x + width, y + height - ySign * _newRadius, _newRadius, _newRadius, clockWise, x + width - xSign * _newRadius, y + height, x + xSign * _newRadius, y + height, _newRadius, _newRadius, clockWise, x, y + height - ySign * _newRadius);
    } else {
        path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral([
            "M ",
            ",",
            " h ",
            " v ",
            " h ",
            " Z"
        ])), x, y, width, height, -width);
    }
    return path;
};
var defaultRectangleProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: false,
    isUpdateAnimationActive: false,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease'
};
var Rectangle = (rectangleProps)=>{
    var props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDefaultProps"])(rectangleProps, defaultRectangleProps);
    var pathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1), _useState2 = _slicedToArray(_useState, 2), totalLength = _useState2[0], setTotalLength = _useState2[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Rectangle.useEffect": ()=>{
            if (pathRef.current && pathRef.current.getTotalLength) {
                try {
                    var pathTotalLength = pathRef.current.getTotalLength();
                    if (pathTotalLength) {
                        setTotalLength(pathTotalLength);
                    }
                } catch (_unused) {
                // calculate total length error
                }
            }
        }
    }["Rectangle.useEffect"], []);
    var x = props.x, y = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
    var animationEasing = props.animationEasing, animationDuration = props.animationDuration, animationBegin = props.animationBegin, isAnimationActive = props.isAnimationActive, isUpdateAnimationActive = props.isUpdateAnimationActive;
    var prevWidthRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(width);
    var prevHeightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(height);
    var prevXRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(x);
    var prevYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(y);
    var animationIdInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Rectangle.useMemo[animationIdInput]": ()=>({
                x,
                y,
                width,
                height,
                radius
            })
    }["Rectangle.useMemo[animationIdInput]"], [
        x,
        y,
        width,
        height,
        radius
    ]);
    var animationId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useAnimationId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnimationId"])(animationIdInput, 'rectangle-');
    if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
        return null;
    }
    var layerClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-rectangle', className);
    if (!isUpdateAnimationActive) {
        var _svgPropertiesAndEven = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(props), _ = _svgPropertiesAndEven.radius, otherPathProps = _objectWithoutProperties(_svgPropertiesAndEven, _excluded);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", _extends({}, otherPathProps, {
            x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(x),
            y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(y),
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(width),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(height),
            radius: typeof radius === 'number' ? radius : undefined,
            className: layerClass,
            d: getRectanglePath(x, y, width, height, radius)
        }));
    }
    var prevWidth = prevWidthRef.current;
    var prevHeight = prevHeightRef.current;
    var prevX = prevXRef.current;
    var prevY = prevYRef.current;
    var from = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
    var to = "".concat(totalLength, "px ").concat(totalLength, "px");
    var transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTransitionVal"])([
        'strokeDasharray'
    ], animationDuration, typeof animationEasing === 'string' ? animationEasing : defaultRectangleProps.animationEasing);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$animation$2f$JavascriptAnimate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JavascriptAnimate"], {
        animationId: animationId,
        key: animationId,
        canBegin: totalLength > 0,
        duration: animationDuration,
        easing: animationEasing,
        isActive: isUpdateAnimationActive,
        begin: animationBegin
    }, (animationElapsedTime)=>{
        var currWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(prevWidth, width, animationElapsedTime);
        var currHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(prevHeight, height, animationElapsedTime);
        var currX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(prevX, x, animationElapsedTime);
        var currY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(prevY, y, animationElapsedTime);
        if (pathRef.current) {
            prevWidthRef.current = currWidth;
            prevHeightRef.current = currHeight;
            prevXRef.current = currX;
            prevYRef.current = currY;
        }
        var animationStyle;
        if (!isAnimationActive) {
            animationStyle = {
                strokeDasharray: to
            };
        } else if (animationElapsedTime > 0) {
            animationStyle = {
                transition,
                strokeDasharray: to
            };
        } else {
            animationStyle = {
                strokeDasharray: from
            };
        }
        var _svgPropertiesAndEven2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(props), _ = _svgPropertiesAndEven2.radius, otherPathProps = _objectWithoutProperties(_svgPropertiesAndEven2, _excluded2);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", _extends({}, otherPathProps, {
            radius: typeof radius === 'number' ? radius : undefined,
            className: layerClass,
            d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
            ref: pathRef,
            style: _objectSpread(_objectSpread({}, animationStyle), props.style)
        }));
    });
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/shape/Sector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sector",
    ()=>Sector,
    "defaultSectorProps",
    ()=>defaultSectorProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/PolarUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/resolveDefaultProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/round.js [app-client] (ecmascript)");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
function _taggedTemplateLiteral(e, t) {
    return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
        raw: {
            value: Object.freeze(t)
        }
    }));
}
;
;
;
;
;
;
;
var getDeltaAngle = (startAngle, endAngle)=>{
    var sign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(endAngle - startAngle);
    var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
    return sign * deltaAngle;
};
var getTangentCircle = (_ref)=>{
    var cx = _ref.cx, cy = _ref.cy, radius = _ref.radius, angle = _ref.angle, sign = _ref.sign, isExternal = _ref.isExternal, cornerRadius = _ref.cornerRadius, cornerIsExternal = _ref.cornerIsExternal;
    var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
    var theta = Math.asin(cornerRadius / centerRadius) / __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RADIAN"];
    var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
    var center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, centerRadius, centerAngle);
    // The coordinate of point which is tangent to the circle
    var circleTangency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, radius, centerAngle);
    // The coordinate of point which is tangent to the radius line
    var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
    var lineTangency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, centerRadius * Math.cos(theta * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RADIAN"]), lineTangencyAngle);
    return {
        center,
        circleTangency,
        lineTangency,
        theta
    };
};
var getSectorPath = (_ref2)=>{
    var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle;
    var angle = getDeltaAngle(startAngle, endAngle);
    // When the angle of sector equals to 360, star point and end point coincide
    var tempEndAngle = startAngle + angle;
    var outerStartPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, outerRadius, startAngle);
    var outerEndPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, outerRadius, tempEndAngle);
    var path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject || (_templateObject = _taggedTemplateLiteral([
        "M ",
        ",",
        "\n    A ",
        ",",
        ",0,\n    ",
        ",",
        ",\n    ",
        ",",
        "\n  "
    ])), outerStartPoint.x, outerStartPoint.y, outerRadius, outerRadius, +(Math.abs(angle) > 180), +(startAngle > tempEndAngle), outerEndPoint.x, outerEndPoint.y);
    if (innerRadius > 0) {
        var innerStartPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, innerRadius, startAngle);
        var innerEndPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, innerRadius, tempEndAngle);
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([
            "L ",
            ",",
            "\n            A ",
            ",",
            ",0,\n            ",
            ",",
            ",\n            ",
            ",",
            " Z"
        ])), innerEndPoint.x, innerEndPoint.y, innerRadius, innerRadius, +(Math.abs(angle) > 180), +(startAngle <= tempEndAngle), innerStartPoint.x, innerStartPoint.y);
    } else {
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([
            "L ",
            ",",
            " Z"
        ])), cx, cy);
    }
    return path;
};
var getSectorWithCorner = (_ref3)=>{
    var cx = _ref3.cx, cy = _ref3.cy, innerRadius = _ref3.innerRadius, outerRadius = _ref3.outerRadius, cornerRadius = _ref3.cornerRadius, forceCornerRadius = _ref3.forceCornerRadius, cornerIsExternal = _ref3.cornerIsExternal, startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
    var sign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(endAngle - startAngle);
    var _getTangentCircle = getTangentCircle({
        cx,
        cy,
        radius: outerRadius,
        angle: startAngle,
        sign,
        cornerRadius,
        cornerIsExternal
    }), soct = _getTangentCircle.circleTangency, solt = _getTangentCircle.lineTangency, sot = _getTangentCircle.theta;
    var _getTangentCircle2 = getTangentCircle({
        cx,
        cy,
        radius: outerRadius,
        angle: endAngle,
        sign: -sign,
        cornerRadius,
        cornerIsExternal
    }), eoct = _getTangentCircle2.circleTangency, eolt = _getTangentCircle2.lineTangency, eot = _getTangentCircle2.theta;
    var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
    if (outerArcAngle < 0) {
        if (forceCornerRadius) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([
                "M ",
                ",",
                "\n        a",
                ",",
                ",0,0,1,",
                ",0\n        a",
                ",",
                ",0,0,1,",
                ",0\n      "
            ])), solt.x, solt.y, cornerRadius, cornerRadius, cornerRadius * 2, cornerRadius, cornerRadius, -cornerRadius * 2);
        }
        return getSectorPath({
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle
        });
    }
    var path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([
        "M ",
        ",",
        "\n    A",
        ",",
        ",0,0,",
        ",",
        ",",
        "\n    A",
        ",",
        ",0,",
        ",",
        ",",
        ",",
        "\n    A",
        ",",
        ",0,0,",
        ",",
        ",",
        "\n  "
    ])), solt.x, solt.y, cornerRadius, cornerRadius, +(sign < 0), soct.x, soct.y, outerRadius, outerRadius, +(outerArcAngle > 180), +(sign < 0), eoct.x, eoct.y, cornerRadius, cornerRadius, +(sign < 0), eolt.x, eolt.y);
    if (innerRadius > 0) {
        var _getTangentCircle3 = getTangentCircle({
            cx,
            cy,
            radius: innerRadius,
            angle: startAngle,
            sign,
            isExternal: true,
            cornerRadius,
            cornerIsExternal
        }), sict = _getTangentCircle3.circleTangency, silt = _getTangentCircle3.lineTangency, sit = _getTangentCircle3.theta;
        var _getTangentCircle4 = getTangentCircle({
            cx,
            cy,
            radius: innerRadius,
            angle: endAngle,
            sign: -sign,
            isExternal: true,
            cornerRadius,
            cornerIsExternal
        }), eict = _getTangentCircle4.circleTangency, eilt = _getTangentCircle4.lineTangency, eit = _getTangentCircle4.theta;
        var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
        if (innerArcAngle < 0 && cornerRadius === 0) {
            return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
        }
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral([
            "L",
            ",",
            "\n      A",
            ",",
            ",0,0,",
            ",",
            ",",
            "\n      A",
            ",",
            ",0,",
            ",",
            ",",
            ",",
            "\n      A",
            ",",
            ",0,0,",
            ",",
            ",",
            "Z"
        ])), eilt.x, eilt.y, cornerRadius, cornerRadius, +(sign < 0), eict.x, eict.y, innerRadius, innerRadius, +(innerArcAngle > 180), +(sign > 0), sict.x, sict.y, cornerRadius, cornerRadius, +(sign < 0), silt.x, silt.y);
    } else {
        path += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundTemplateLiteral"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral([
            "L",
            ",",
            "Z"
        ])), cx, cy);
    }
    return path;
};
var defaultSectorProps = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: false,
    cornerIsExternal: false
};
var Sector = (sectorProps)=>{
    var props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$resolveDefaultProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDefaultProps"])(sectorProps, defaultSectorProps);
    var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, cornerRadius = props.cornerRadius, forceCornerRadius = props.forceCornerRadius, cornerIsExternal = props.cornerIsExternal, startAngle = props.startAngle, endAngle = props.endAngle, className = props.className;
    if (outerRadius < innerRadius || startAngle === endAngle) {
        return null;
    }
    var layerClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])('recharts-sector', className);
    var deltaRadius = outerRadius - innerRadius;
    var cr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPercentValue"])(cornerRadius, deltaRadius, 0, true);
    var path;
    if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
        path = getSectorWithCorner({
            cx,
            cy,
            innerRadius,
            outerRadius,
            cornerRadius: Math.min(cr, deltaRadius / 2),
            forceCornerRadius,
            cornerIsExternal,
            startAngle,
            endAngle
        });
    } else {
        path = getSectorPath({
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle
        });
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("path", _extends({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesAndEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesAndEvents"])(props), {
        className: layerClass,
        d: path
    }));
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/synchronisation/syncSelectors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "selectSynchronisedTooltipState",
    ()=>selectSynchronisedTooltipState
]);
function selectSynchronisedTooltipState(state) {
    return state.tooltip.syncInteraction;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/synchronisation/useChartSynchronisation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBrushChartSynchronisation",
    ()=>useBrushChartSynchronisation,
    "useSynchronisedEventsFromOtherCharts",
    ()=>useSynchronisedEventsFromOtherCharts,
    "useTooltipChartSynchronisation",
    ()=>useTooltipChartSynchronisation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/rootPropsSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$optionsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/optionsSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/tooltipSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/selectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/tooltipSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$synchronisation$2f$syncSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/synchronisation/syncSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/chartDataSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var _excluded = [
    "x",
    "y"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Listens for tooltip sync events from other charts and dispatches the appropriate
 * sync interaction state based on the current chart's syncMethod.
 *
 * Handles three sync methods:
 * - 'index': passes through the tooltip index with coordinate scaling between chart viewBoxes
 * - 'value': matches the incoming label against this chart's axis ticks by string comparison
 * - function: delegates tick resolution to a user-provided callback
 *
 * When a synced label has no matching tick (e.g. sparse chart), the tooltip is hidden
 * but sourceViewBox is preserved to prevent counter-emission cascades.
 */ function useTooltipSyncEventsListener() {
    var mySyncId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncId"]);
    var myEventEmitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectEventEmitter"]);
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    var syncMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncMethod"]);
    var tooltipTicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectTooltipAxisTicks"]);
    var layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChartLayout"])();
    var viewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewBox"])();
    var className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useTooltipSyncEventsListener.useAppSelector[className]": (state)=>state.rootProps.className
    }["useTooltipSyncEventsListener.useAppSelector[className]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTooltipSyncEventsListener.useEffect": ()=>{
            if (mySyncId == null) {
                // This chart is not synchronised with any other chart so we don't need to listen for any events.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            }
            var listener = {
                "useTooltipSyncEventsListener.useEffect.listener": (incomingSyncId, action, emitter)=>{
                    if (myEventEmitter === emitter) {
                        // We don't want to dispatch actions that we sent ourselves.
                        return;
                    }
                    if (mySyncId !== incomingSyncId) {
                        // This event is not for this chart
                        return;
                    }
                    /*
       * Handle source chart deactivation (mouseLeave) for ALL sync methods.
       * This must be checked before any syncMethod-specific logic to ensure
       * sourceViewBox is cleared, which allows isReceivingSynchronisation
       * to become false and lets the normal emission flow resume.
       */ if (action.payload.active === false) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSyncInteraction"])({
                            active: false,
                            coordinate: undefined,
                            dataKey: undefined,
                            index: null,
                            label: undefined,
                            sourceViewBox: undefined,
                            graphicalItemId: undefined
                        }));
                        return;
                    }
                    if (syncMethod === 'index') {
                        var _action$payload;
                        if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
                            var _action$payload$coord = action.payload.coordinate, _x = _action$payload$coord.x, _y = _action$payload$coord.y, otherCoordinateProps = _objectWithoutProperties(_action$payload$coord, _excluded);
                            var _action$payload$sourc = action.payload.sourceViewBox, sourceX = _action$payload$sourc.x, sourceY = _action$payload$sourc.y, sourceWidth = _action$payload$sourc.width, sourceHeight = _action$payload$sourc.height;
                            var scaledCoordinate = _objectSpread(_objectSpread({}, otherCoordinateProps), {}, {
                                x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
                                y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
                            });
                            dispatch(_objectSpread(_objectSpread({}, action), {}, {
                                payload: _objectSpread(_objectSpread({}, action.payload), {}, {
                                    coordinate: scaledCoordinate
                                })
                            }));
                        } else {
                            dispatch(action);
                        }
                        return;
                    }
                    if (tooltipTicks == null) {
                        // for the other two sync methods, we need the ticks to be available
                        return;
                    }
                    var activeTick;
                    if (typeof syncMethod === 'function') {
                        /*
         * This is what the data shape in 2.x CategoricalChartState used to look like.
         * In 3.x we store things differently but let's try to keep the old shape for compatibility.
         */ var syncMethodParam = {
                            activeTooltipIndex: action.payload.index == null ? undefined : Number(action.payload.index),
                            isTooltipActive: action.payload.active,
                            activeIndex: action.payload.index == null ? undefined : Number(action.payload.index),
                            activeLabel: action.payload.label,
                            activeDataKey: action.payload.dataKey,
                            activeCoordinate: action.payload.coordinate
                        };
                        // Call a callback function. If there is an application specific algorithm
                        var activeTooltipIndex = syncMethod(tooltipTicks, syncMethodParam);
                        activeTick = tooltipTicks[activeTooltipIndex];
                    } else if (syncMethod === 'value') {
                        // labels are always strings, tick.value might be a string or a number, depending on axis type
                        activeTick = tooltipTicks.find({
                            "useTooltipSyncEventsListener.useEffect.listener": (tick)=>String(tick.value) === action.payload.label
                        }["useTooltipSyncEventsListener.useEffect.listener"]);
                    }
                    var coordinate = action.payload.coordinate;
                    if (coordinate == null || viewBox == null) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSyncInteraction"])({
                            active: false,
                            coordinate: undefined,
                            dataKey: undefined,
                            index: null,
                            label: undefined,
                            sourceViewBox: undefined,
                            graphicalItemId: undefined
                        }));
                        return;
                    }
                    if (activeTick == null) {
                        /*
         * The label from the source chart doesn't match any tick in this chart.
         * This happens when synced charts have different data arrays
         * (e.g., one chart has 3 data points while another has 252).
         *
         * We set active: false so the tooltip hides (correct — no data for this date),
         * but we keep sourceViewBox set to signal that we're still receiving sync events.
         * The emission guard in useTooltipChartSynchronisation checks sourceViewBox
         * (not active) to decide whether to suppress outgoing sync events.
         * Without this, the chart would emit a counter-sync event with active: false,
         * cascading to clear tooltips on ALL other synced charts.
         */ dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSyncInteraction"])({
                            active: false,
                            coordinate: undefined,
                            dataKey: undefined,
                            index: null,
                            label: undefined,
                            sourceViewBox: action.payload.sourceViewBox,
                            graphicalItemId: undefined
                        }));
                        return;
                    }
                    var x = coordinate.x, y = coordinate.y;
                    var validateChartX = Math.min(x, viewBox.x + viewBox.width);
                    var validateChartY = Math.min(y, viewBox.y + viewBox.height);
                    var activeCoordinate = {
                        x: layout === 'horizontal' ? activeTick.coordinate : validateChartX,
                        y: layout === 'horizontal' ? validateChartY : activeTick.coordinate
                    };
                    var syncAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSyncInteraction"])({
                        active: action.payload.active,
                        coordinate: activeCoordinate,
                        dataKey: action.payload.dataKey,
                        index: String(activeTick.index),
                        label: action.payload.label,
                        sourceViewBox: action.payload.sourceViewBox,
                        graphicalItemId: action.payload.graphicalItemId
                    });
                    dispatch(syncAction);
                }
            }["useTooltipSyncEventsListener.useEffect.listener"];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOOLTIP_SYNC_EVENT"], listener);
            return ({
                "useTooltipSyncEventsListener.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOOLTIP_SYNC_EVENT"], listener);
                }
            })["useTooltipSyncEventsListener.useEffect"];
        }
    }["useTooltipSyncEventsListener.useEffect"], [
        className,
        dispatch,
        myEventEmitter,
        mySyncId,
        syncMethod,
        tooltipTicks,
        layout,
        viewBox
    ]);
}
/**
 * Listens for brush sync events from other charts and updates this chart's
 * data start/end indexes to match, keeping brush positions synchronised.
 */ function useBrushSyncEventsListener() {
    var mySyncId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncId"]);
    var myEventEmitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectEventEmitter"]);
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBrushSyncEventsListener.useEffect": ()=>{
            if (mySyncId == null) {
                // This chart is not synchronised with any other chart so we don't need to listen for any events.
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            }
            var listener = {
                "useBrushSyncEventsListener.useEffect.listener": (incomingSyncId, action, emitter)=>{
                    if (myEventEmitter === emitter) {
                        // We don't want to dispatch actions that we sent ourselves.
                        return;
                    }
                    if (mySyncId === incomingSyncId) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$chartDataSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDataStartEndIndexes"])(action));
                    }
                }
            }["useBrushSyncEventsListener.useEffect.listener"];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRUSH_SYNC_EVENT"], listener);
            return ({
                "useBrushSyncEventsListener.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].off(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRUSH_SYNC_EVENT"], listener);
                }
            })["useBrushSyncEventsListener.useEffect"];
        }
    }["useBrushSyncEventsListener.useEffect"], [
        dispatch,
        myEventEmitter,
        mySyncId
    ]);
}
function useSynchronisedEventsFromOtherCharts() {
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSynchronisedEventsFromOtherCharts.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$optionsSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEventEmitter"])());
        }
    }["useSynchronisedEventsFromOtherCharts.useEffect"], [
        dispatch
    ]);
    useTooltipSyncEventsListener();
    useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
    var activeDataKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useTooltipChartSynchronisation.useAppSelector[activeDataKey]": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$selectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectTooltipDataKey"])(state, tooltipEventType, trigger)
    }["useTooltipChartSynchronisation.useAppSelector[activeDataKey]"]);
    var activeGraphicalItemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$tooltipSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectActiveTooltipGraphicalItemId"]);
    var eventEmitterSymbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectEventEmitter"]);
    var syncId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncId"]);
    var syncMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncMethod"]);
    var tooltipState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$synchronisation$2f$syncSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSynchronisedTooltipState"]);
    /*
   * Use sourceViewBox (not active) to determine if we're receiving sync events.
   * sourceViewBox is set whenever another chart sends a sync event to us — even when
   * our own tooltip is inactive (because the label didn't match our data).
   * This prevents charts with sparse data from emitting counter-sync events
   * that would clear tooltips on all other synced charts.
   */ var isReceivingSynchronisation = (tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.sourceViewBox) != null;
    var viewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useViewBox"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTooltipChartSynchronisation.useEffect": ()=>{
            if (isReceivingSynchronisation) {
                /*
       * This chart is currently receiving synchronisation events from another chart.
       * Let's not send any outgoing synchronisation events while that's happening
       * to avoid infinite loops and cascading tooltip clears.
       */ return;
            }
            if (syncId == null) {
                /*
       * syncId is not set, means that this chart is not synchronised with any other chart,
       * means we don't need to send synchronisation events
       */ return;
            }
            if (eventEmitterSymbol == null) {
                /*
       * When using Recharts internal hooks and selectors outside charts context,
       * these properties will be undefined. Let's return silently instead of throwing an error.
       */ return;
            }
            var syncAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$tooltipSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSyncInteraction"])({
                active: isTooltipActive,
                coordinate: activeCoordinate,
                dataKey: activeDataKey,
                index: activeIndex,
                label: typeof activeLabel === 'number' ? String(activeLabel) : activeLabel,
                sourceViewBox: viewBox,
                graphicalItemId: activeGraphicalItemId
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].emit(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOOLTIP_SYNC_EVENT"], syncId, syncAction, eventEmitterSymbol);
        }
    }["useTooltipChartSynchronisation.useEffect"], [
        isReceivingSynchronisation,
        activeCoordinate,
        activeDataKey,
        activeGraphicalItemId,
        activeIndex,
        activeLabel,
        eventEmitterSymbol,
        syncId,
        syncMethod,
        isTooltipActive,
        viewBox
    ]);
}
function useBrushChartSynchronisation() {
    var syncId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectSyncId"]);
    var eventEmitterSymbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$rootPropsSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectEventEmitter"]);
    var brushStartIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useBrushChartSynchronisation.useAppSelector[brushStartIndex]": (state)=>state.chartData.dataStartIndex
    }["useBrushChartSynchronisation.useAppSelector[brushStartIndex]"]);
    var brushEndIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useBrushChartSynchronisation.useAppSelector[brushEndIndex]": (state)=>state.chartData.dataEndIndex
    }["useBrushChartSynchronisation.useAppSelector[brushEndIndex]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBrushChartSynchronisation.useEffect": ()=>{
            if (syncId == null || brushStartIndex == null || brushEndIndex == null || eventEmitterSymbol == null) {
                return;
            }
            var syncAction = {
                startIndex: brushStartIndex,
                endIndex: brushEndIndex
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventCenter"].emit(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRUSH_SYNC_EVENT"], syncId, syncAction, eventEmitterSymbol);
        }
    }["useBrushChartSynchronisation.useEffect"], [
        brushEndIndex,
        brushStartIndex,
        eventEmitterSymbol,
        syncId
    ]);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/theme/RechartsThemeContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RechartsThemeProvider",
    ()=>RechartsThemeProvider,
    "useRechartsTheme",
    ()=>useRechartsTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$theme$2f$legacyTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/theme/legacyTheme.js [app-client] (ecmascript)");
;
;
var RechartsThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$theme$2f$legacyTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["legacyTheme"]);
var RechartsThemeProvider = RechartsThemeContext.Provider;
var useRechartsTheme = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(RechartsThemeContext);
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/theme/legacyTheme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This is the theme as was the default in 2.x and 3.x branches.
 *
 * It's not very consistent, colors are all over the place and overall exists only for backwards compatibility.
 * Prefer to use either {@link lightTheme} or {@link darkTheme} instead.
 *
 * @deprecated
 * @experimental
 */ __turbopack_context__.s([
    "legacyTheme",
    ()=>legacyTheme
]);
var legacyTheme = {
    grid: {
        stroke: '#ccc',
        fill: 'none'
    }
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/DefaultZIndexes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A collection of all default zIndex values used by Recharts.
 *
 * You can reuse these, or you can define your own.
 */ __turbopack_context__.s([
    "DefaultZIndexes",
    ()=>DefaultZIndexes
]);
var DefaultZIndexes = {
    /**
   * CartesianGrid and PolarGrid
   */ grid: -100,
    /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */ barBackground: -50,
    /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */ /**
   * Area, Pie, Radar, and ReferenceArea
   */ area: 100,
    /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */ cursorRectangle: 200,
    /**
   * Bar and RadialBar
   */ bar: 300,
    /**
   * Line and ReferenceLine, and ErrorBor
   */ line: 400,
    /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */ axis: 500,
    /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */ scatter: 600,
    /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */ activeBar: 1000,
    /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */ cursorLine: 1100,
    /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */ activeDot: 1200,
    /**
   * LabelList and Label, including Axis labels
   */ label: 2000
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/ZIndexLayer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZIndexLayer",
    ()=>ZIndexLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$zIndexSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/zIndexSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/zIndexSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/chartLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/context/PanoramaContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
function ZIndexLayer(_ref) {
    var zIndex = _ref.zIndex, children = _ref.children;
    /*
   * If we are outside of chart, then we can't rely on the zIndex portal state,
   * so we just render normally.
   */ var isInChartContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$chartLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsInChartContext"])();
    /*
   * If zIndex is undefined then we render normally without portals.
   * Also, if zIndex is 0, we render normally without portals,
   * because 0 is the default layer that does not need a portal.
   */ var shouldRenderInPortal = isInChartContext && zIndex !== undefined && zIndex !== 0;
    var isPanorama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$context$2f$PanoramaContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsPanorama"])();
    /**
   * When zIndex changes, the new portal element is not immediately available because
   * it requires a full render cycle through AllZIndexPortals → ZIndexSvgPortal.
   * During this transition we keep rendering into the previous portal element
   * to avoid an unmount/remount cycle that would cause children to briefly disappear.
   *
   * `registeredZIndexesRef` tracks every zIndex we have registered so that
   * we can defer unregistration of old values until the new portal is ready.
   * `lastPortalElementRef` caches the most recent valid portal DOM node.
   */ var lastPortalElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    var registeredZIndexesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    var portalElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "ZIndexLayer.useAppSelector[portalElement]": (state)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$zIndexSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectZIndexPortalElement"])(state, zIndex, isPanorama)
    }["ZIndexLayer.useAppSelector[portalElement]"]);
    /*
   * Lifecycle effect — handles both registration and deferred cleanup.
   *
   * Registration: when zIndex changes we register the new value WITHOUT
   * immediately unregistering the old one. This keeps the old <g> element
   * alive in the DOM so `lastPortalElementRef` remains a valid render target.
   *
   * Deferred cleanup: once `portalElement` for the *new* zIndex becomes
   * available we unregister every stale zIndex that is no longer needed.
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ZIndexLayer.useLayoutEffect": ()=>{
            if (!shouldRenderInPortal) {
                // Portal rendering was disabled — clean up any stale registrations
                var registered = registeredZIndexesRef.current;
                registered.forEach({
                    "ZIndexLayer.useLayoutEffect": (z)=>{
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unregisterZIndexPortal"])({
                            zIndex: z
                        }));
                    }
                }["ZIndexLayer.useLayoutEffect"]);
                registered.clear();
                lastPortalElementRef.current = undefined;
                return;
            }
            /*
     * Because zIndexes are dynamic (meaning, we're not working with a predefined set of layers,
     * but we allow users to define any zIndex at any time), we need to register
     * the requested zIndex in the global store. This way, the ZIndexPortals component
     * can render the corresponding portals and only the requested ones.
     */ // Register the current zIndex (idempotent — skips if already registered)
            if (!registeredZIndexesRef.current.has(zIndex)) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerZIndexPortal"])({
                    zIndex
                }));
                registeredZIndexesRef.current.add(zIndex);
            }
            // When the new portal element is ready, retire old zIndex registrations
            if (portalElement) {
                lastPortalElementRef.current = portalElement;
                var _registered = registeredZIndexesRef.current;
                _registered.forEach({
                    "ZIndexLayer.useLayoutEffect": (z)=>{
                        if (z !== zIndex) {
                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unregisterZIndexPortal"])({
                                zIndex: z
                            }));
                            _registered.delete(z);
                        }
                    }
                }["ZIndexLayer.useLayoutEffect"]);
            }
        }
    }["ZIndexLayer.useLayoutEffect"], [
        dispatch,
        zIndex,
        shouldRenderInPortal,
        portalElement
    ]);
    // Unmount-only cleanup — unregister everything when the component is removed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ZIndexLayer.useLayoutEffect": ()=>{
            var registered = registeredZIndexesRef.current;
            return ({
                "ZIndexLayer.useLayoutEffect": ()=>{
                    registered.forEach({
                        "ZIndexLayer.useLayoutEffect": (z)=>{
                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unregisterZIndexPortal"])({
                                zIndex: z
                            }));
                        }
                    }["ZIndexLayer.useLayoutEffect"]);
                    registered.clear();
                }
            })["ZIndexLayer.useLayoutEffect"];
        }
    }["ZIndexLayer.useLayoutEffect"], [
        dispatch
    ]);
    if (!shouldRenderInPortal) {
        return children;
    }
    // Prefer the current portal; fall back to the cached one during transitions
    var targetElement = portalElement !== null && portalElement !== void 0 ? portalElement : lastPortalElementRef.current;
    if (!targetElement) {
        // Very first render — no portal has ever been registered yet
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(children, targetElement);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/ZIndexPortal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AllZIndexPortals",
    ()=>AllZIndexPortals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/zIndexSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$zIndexSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/zIndexSelectors.js [app-client] (ecmascript)");
;
;
;
;
;
function ZIndexSvgPortal(_ref) {
    var zIndex = _ref.zIndex, isPanorama = _ref.isPanorama;
    var ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ZIndexSvgPortal.useLayoutEffect": ()=>{
            if (ref.current) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerZIndexPortalElement"])({
                    zIndex,
                    element: ref.current,
                    isPanorama
                }));
            }
            return ({
                "ZIndexSvgPortal.useLayoutEffect": ()=>{
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$zIndexSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unregisterZIndexPortalElement"])({
                        zIndex,
                        isPanorama
                    }));
                }
            })["ZIndexSvgPortal.useLayoutEffect"];
        }
    }["ZIndexSvgPortal.useLayoutEffect"], [
        dispatch,
        zIndex,
        isPanorama
    ]);
    // these g elements should not be tabbable
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("g", {
        tabIndex: -1,
        ref: ref,
        className: "recharts-zIndex-layer_".concat(zIndex)
    });
}
function AllZIndexPortals(_ref2) {
    var children = _ref2.children, isPanorama = _ref2.isPanorama;
    var allRegisteredZIndexes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$zIndexSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectAllRegisteredZIndexes"]);
    if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) {
        return children;
    }
    var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex)=>zIndex < 0);
    // We exclude zero on purpose - that is the default layer, and it doesn't need a portal.
    var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex)=>zIndex > 0);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, allNegativeZIndexes.map((zIndex)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](ZIndexSvgPortal, {
            key: zIndex,
            zIndex: zIndex,
            isPanorama: isPanorama
        })), children, allPositiveZIndexes.map((zIndex)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](ZIndexSvgPortal, {
            key: zIndex,
            zIndex: zIndex,
            isPanorama: isPanorama
        })));
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/zIndexSelectors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "selectAllRegisteredZIndexes",
    ()=>selectAllRegisteredZIndexes,
    "selectZIndexPortalElement",
    ()=>selectZIndexPortalElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reselect$40$5$2e$2$2e$0$2f$node_modules$2f$reselect$2f$dist$2f$reselect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/reselect@5.2.0/node_modules/reselect/dist/reselect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$arrayEqualityCheck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/zIndex/DefaultZIndexes.js [app-client] (ecmascript)");
;
;
;
var selectZIndexPortalElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reselect$40$5$2e$2$2e$0$2f$node_modules$2f$reselect$2f$dist$2f$reselect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.zIndex.zIndexMap, (_, zIndex)=>zIndex, (_, _zIndex, isPanorama)=>isPanorama, (zIndexMap, zIndex, isPanorama)=>{
    if (zIndex == null) {
        return undefined;
    }
    var entry = zIndexMap[zIndex];
    if (entry == null) {
        return undefined;
    }
    if (isPanorama) {
        return entry.panoramaElement;
    }
    return entry.element;
});
var selectAllRegisteredZIndexes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$reselect$40$5$2e$2$2e$0$2f$node_modules$2f$reselect$2f$dist$2f$reselect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.zIndex.zIndexMap, (zIndexMap)=>{
    var allNumbers = Object.keys(zIndexMap).map((zIndexStr)=>parseInt(zIndexStr, 10)).concat(Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$zIndex$2f$DefaultZIndexes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultZIndexes"]));
    var uniqueNumbers = Array.from(new Set(allNumbers));
    return uniqueNumbers.sort((a, b)=>a - b);
}, {
    memoizeOptions: {
        resultEqualityCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$arrayEqualityCheck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayContentsAreEqualCheck"]
    }
});
}),
]);

//# sourceMappingURL=0fic_recharts_es6_184sn3r._.js.map