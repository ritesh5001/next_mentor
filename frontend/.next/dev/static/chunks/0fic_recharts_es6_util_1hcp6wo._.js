(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ActiveShapeUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Shape",
    ()=>Shape,
    "getPropsFromShapeOption",
    ()=>getPropsFromShapeOption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/container/Layer.js [app-client] (ecmascript)");
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
/**
 * This is an abstraction for rendering a user defined prop for a customized shape in several forms.
 *
 * <Shape /> is the root and will handle taking in:
 *  - an object of svg properties
 *  - a boolean
 *  - a render prop(inline function that returns jsx)
 *  - a React element
 *
 * The concrete default shape is supplied by the caller so this helper does not
 * import unrelated shapes and accidentally couple bundles together.
 */ function mergeShapeProps(option, props) {
    return _objectSpread(_objectSpread({}, props), option);
}
function getPropsFromShapeOption(option) {
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(option)) {
        return option.props;
    }
    return option;
}
function renderWithShapeElement(option, props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(option, mergeShapeProps(getPropsFromShapeOption(option), props));
}
function getShapeIndex(shapeProps) {
    if (!('index' in shapeProps)) {
        return undefined;
    }
    var index = shapeProps.index;
    return typeof index === 'number' || typeof index === 'string' ? index : undefined;
}
function isActiveShape(shapeProps) {
    return 'isActive' in shapeProps && shapeProps.isActive === true;
}
function Shape(_ref) {
    var option = _ref.option, DefaultShape = _ref.DefaultShape, shapeProps = _ref.shapeProps, _ref$activeClassName = _ref.activeClassName, activeClassName = _ref$activeClassName === void 0 ? 'recharts-active-shape' : _ref$activeClassName, _ref$inActiveClassNam = _ref.inActiveClassName, inActiveClassName = _ref$inActiveClassNam === void 0 ? 'recharts-shape' : _ref$inActiveClassNam;
    var index = getShapeIndex(shapeProps);
    var shape;
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(option)) {
        shape = renderWithShapeElement(option, shapeProps);
    } else if (option === DefaultShape) {
        shape = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](DefaultShape, shapeProps);
    } else if (typeof option === 'function') {
        shape = option(shapeProps, index);
    } else if (typeof option === 'object') {
        shape = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](DefaultShape, mergeShapeProps(option, shapeProps));
    } else {
        shape = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](DefaultShape, shapeProps);
    }
    if (isActiveShape(shapeProps)) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
            className: activeClassName
        }, shape);
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$container$2f$Layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
        className: inActiveClassName
    }, shape);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/CartesianUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAngledRectangleWidth",
    ()=>getAngledRectangleWidth,
    "normalizeAngle",
    ()=>normalizeAngle,
    "rectWithCoords",
    ()=>rectWithCoords,
    "rectWithPoints",
    ()=>rectWithPoints
]);
var rectWithPoints = (_ref, _ref2)=>{
    var x1 = _ref.x, y1 = _ref.y;
    var x2 = _ref2.x, y2 = _ref2.y;
    return {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1)
    };
};
var rectWithCoords = (_ref3)=>{
    var x1 = _ref3.x1, y1 = _ref3.y1, x2 = _ref3.x2, y2 = _ref3.y2;
    return rectWithPoints({
        x: x1,
        y: y1
    }, {
        x: x2,
        y: y2
    });
};
function normalizeAngle(angle) {
    return (angle % 180 + 180) % 180;
}
var getAngledRectangleWidth = function getAngledRectangleWidth(_ref4) {
    var width = _ref4.width, height = _ref4.height;
    var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Ensure angle is >= 0 && < 180
    var normalizedAngle = normalizeAngle(angle);
    var angleRadians = normalizedAngle * Math.PI / 180;
    /* Depending on the height and width of the rectangle, we may need to use different formulas to calculate the angled
   * width. This threshold defines when each formula should kick in. */ var angleThreshold = Math.atan(height / width);
    var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
    return Math.abs(angledWidth);
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ChartUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_VALUE_REG",
    ()=>MAX_VALUE_REG,
    "MIN_VALUE_REG",
    ()=>MIN_VALUE_REG,
    "appendOffsetOfLegend",
    ()=>appendOffsetOfLegend,
    "calculateCartesianTooltipPos",
    ()=>calculateCartesianTooltipPos,
    "calculatePolarTooltipPos",
    ()=>calculatePolarTooltipPos,
    "getBandSizeOfAxis",
    ()=>getBandSizeOfAxis,
    "getBaseValueOfBar",
    ()=>getBaseValueOfBar,
    "getCateCoordinateOfBar",
    ()=>getCateCoordinateOfBar,
    "getCateCoordinateOfLine",
    ()=>getCateCoordinateOfLine,
    "getCoordinatesOfGrid",
    ()=>getCoordinatesOfGrid,
    "getDomainOfStackGroups",
    ()=>getDomainOfStackGroups,
    "getNormalizedStackId",
    ()=>getNormalizedStackId,
    "getStackedData",
    ()=>getStackedData,
    "getTicksOfAxis",
    ()=>getTicksOfAxis,
    "getTooltipEntry",
    ()=>getTooltipEntry,
    "getTooltipNameProp",
    ()=>getTooltipNameProp,
    "getValueByDataKey",
    ()=>getValueByDataKey,
    "isCategoricalAxis",
    ()=>isCategoricalAxis,
    "offsetPositive",
    ()=>offsetPositive,
    "offsetSign",
    ()=>offsetSign,
    "truncateByDomain",
    ()=>truncateByDomain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$array$2f$sortBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__sortBy__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/sortBy.mjs [app-client] (ecmascript) <export sortBy as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/get.mjs [app-client] (ecmascript) <export get as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$victory$2d$vendor$40$37$2e$3$2e$6$2f$node_modules$2f$victory$2d$vendor$2f$es$2f$d3$2d$shape$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/victory-vendor@37.3.6/node_modules/victory-vendor/es/d3-shape.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/stack.js [app-client] (ecmascript) <export default as stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$expand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetExpand$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/expand.js [app-client] (ecmascript) <export default as stackOffsetExpand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$none$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetNone$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/none.js [app-client] (ecmascript) <export default as stackOffsetNone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$silhouette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetSilhouette$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/silhouette.js [app-client] (ecmascript) <export default as stackOffsetSilhouette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$wiggle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetWiggle$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/offset/wiggle.js [app-client] (ecmascript) <export default as stackOffsetWiggle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$order$2f$none$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOrderNone$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/order/none.js [app-client] (ecmascript) <export default as stackOrderNone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$getSliced$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getSliced.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$getCartesianPosition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/cartesian/getCartesianPosition.js [app-client] (ecmascript)");
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
function getValueByDataKey(obj, dataKey, defaultValue) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(obj) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(dataKey)) {
        return defaultValue;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumOrStr"])(dataKey)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__["default"])(obj, dataKey, defaultValue);
    }
    if (typeof dataKey === 'function') {
        return dataKey(obj);
    }
    return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize)=>{
    if (legendSettings && legendSize) {
        var boxWidth = legendSize.width, boxHeight = legendSize.height;
        var align = legendSettings.align, verticalAlign = legendSettings.verticalAlign, layout = legendSettings.layout, position = legendSettings.position, _legendSettings$offse = legendSettings.offset, legendOffset = _legendSettings$offse === void 0 ? 0 : _legendSettings$offse;
        if (position != null) {
            // Position-based legends are absolutely placed. They only move the plot area if they are positioned outside.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$getCartesianPosition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOutsidePosition"])(position)) {
                if (position === 'top' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset.top)) {
                    return _objectSpread(_objectSpread({}, offset), {}, {
                        top: offset.top + (boxHeight || 0) + legendOffset
                    });
                }
                if (position === 'bottom' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset.bottom)) {
                    return _objectSpread(_objectSpread({}, offset), {}, {
                        bottom: offset.bottom + (boxHeight || 0) + legendOffset
                    });
                }
                if (position === 'left' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset.left)) {
                    return _objectSpread(_objectSpread({}, offset), {}, {
                        left: offset.left + (boxWidth || 0) + legendOffset
                    });
                }
                if (position === 'right' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset.right)) {
                    return _objectSpread(_objectSpread({}, offset), {}, {
                        right: offset.right + (boxWidth || 0) + legendOffset
                    });
                }
            }
            return offset;
        }
        if ((layout === 'vertical' || layout === 'horizontal' && verticalAlign === 'middle') && align !== 'center' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset[align])) {
            return _objectSpread(_objectSpread({}, offset), {}, {
                [align]: offset[align] + (boxWidth || 0)
            });
        }
        if ((layout === 'horizontal' || layout === 'vertical' && align === 'center') && verticalAlign !== 'middle' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(offset[verticalAlign])) {
            return _objectSpread(_objectSpread({}, offset), {}, {
                [verticalAlign]: offset[verticalAlign] + (boxHeight || 0)
            });
        }
    }
    return offset;
};
var isCategoricalAxis = (layout, axisType)=>layout === 'horizontal' && axisType === 'xAxis' || layout === 'vertical' && axisType === 'yAxis' || layout === 'centric' && axisType === 'angleAxis' || layout === 'radial' && axisType === 'radiusAxis';
var getCoordinatesOfGrid = (ticks, minValue, maxValue, syncWithTicks)=>{
    if (syncWithTicks) {
        return ticks.map((entry)=>entry.coordinate);
    }
    var hasMin, hasMax;
    var values = ticks.map((entry)=>{
        if (entry.coordinate === minValue) {
            hasMin = true;
        }
        if (entry.coordinate === maxValue) {
            hasMax = true;
        }
        return entry.coordinate;
    });
    if (!hasMin) {
        values.push(minValue);
    }
    if (!hasMax) {
        values.push(maxValue);
    }
    return values;
};
var getTicksOfAxis = (axis, isGrid, isAll)=>{
    if (!axis) {
        return null;
    }
    var duplicateDomain = axis.duplicateDomain, type = axis.type, range = axis.range, scale = axis.scale, realScaleType = axis.realScaleType, isCategorical = axis.isCategorical, categoricalDomain = axis.categoricalDomain, tickCount = axis.tickCount, ticks = axis.ticks, niceTicks = axis.niceTicks, axisType = axis.axisType;
    if (!scale) {
        return null;
    }
    var offsetForBand = realScaleType === 'scaleBand' && scale.bandwidth ? scale.bandwidth() / 2 : 2;
    var offset = (isGrid || isAll) && type === 'category' && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
    offset = axisType === 'angleAxis' && range && range.length >= 2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(range[0] - range[1]) * 2 * offset : offset;
    // The ticks set by user should only affect the ticks adjacent to axis line
    if (isGrid && (ticks || niceTicks)) {
        var result = (ticks || niceTicks || []).map((entry, index)=>{
            var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
            var scaled = scale.map(scaleContent);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(scaled)) {
                return null;
            }
            return {
                // If the scaleContent is not a number, the coordinate will be NaN.
                // That could be the case for example with a PointScale and a string as domain.
                coordinate: scaled + offset,
                value: entry,
                offset,
                index
            };
        }).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotNil"]);
        return result;
    }
    // When axis is a categorical axis, but the type of axis is number or the scale of axis is not "auto"
    // For type='number' with niceTicks available, skip this branch so ticks are evenly spaced (GitHub issue #4271)
    if (isCategorical && categoricalDomain) {
        return categoricalDomain.map((entry, index)=>{
            var scaled = scale.map(entry);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(scaled)) {
                return null;
            }
            return {
                coordinate: scaled + offset,
                value: entry,
                index,
                offset
            };
        }).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotNil"]);
    }
    if (scale.ticks && !isAll && tickCount != null) {
        return scale.ticks(tickCount).map((entry, index)=>{
            var scaled = scale.map(entry);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(scaled)) {
                return null;
            }
            return {
                coordinate: scaled + offset,
                value: entry,
                index,
                offset
            };
        }).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotNil"]);
    }
    // When axis has duplicated text, serial numbers are used to generate scale
    return scale.domain().map((entry, index)=>{
        var scaled = scale.map(entry);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(scaled)) {
            return null;
        }
        return {
            coordinate: scaled + offset,
            // @ts-expect-error can't use Date as an index
            value: duplicateDomain ? duplicateDomain[entry] : entry,
            index,
            offset
        };
    }).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotNil"]);
};
var truncateByDomain = (value, domain)=>{
    if (!domain || domain.length !== 2 || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(domain[0]) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(domain[1])) {
        return value;
    }
    var minValue = Math.min(domain[0], domain[1]);
    var maxValue = Math.max(domain[0], domain[1]);
    var result = [
        value[0],
        value[1]
    ];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(value[0]) || value[0] < minValue) {
        result[0] = minValue;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(value[1]) || value[1] > maxValue) {
        result[1] = maxValue;
    }
    if (result[0] > maxValue) {
        result[0] = maxValue;
    }
    if (result[1] < minValue) {
        result[1] = minValue;
    }
    return result;
};
var offsetSign = (series)=>{
    var _series$;
    var n = series.length;
    if (n <= 0) {
        return;
    }
    var m = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.length;
    if (m == null || m <= 0) {
        return;
    }
    for(var j = 0; j < m; ++j){
        var positive = 0;
        var negative = 0;
        for(var i = 0; i < n; ++i){
            var row = series[i];
            var col = row === null || row === void 0 ? void 0 : row[j];
            if (col == null) {
                continue;
            }
            var series1 = col[1];
            var series0 = col[0];
            var value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNan"])(series1) ? series0 : series1;
            if (value >= 0) {
                col[0] = positive;
                positive += value;
                col[1] = positive;
            } else {
                col[0] = negative;
                negative += value;
                col[1] = negative;
            }
        }
    }
};
var offsetPositive = (series)=>{
    var _series$2;
    var n = series.length;
    if (n <= 0) {
        return;
    }
    var m = (_series$2 = series[0]) === null || _series$2 === void 0 ? void 0 : _series$2.length;
    if (m == null || m <= 0) {
        return;
    }
    for(var j = 0; j < m; ++j){
        var positive = 0;
        for(var i = 0; i < n; ++i){
            var row = series[i];
            var col = row === null || row === void 0 ? void 0 : row[j];
            if (col == null) {
                continue;
            }
            var value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNan"])(col[1]) ? col[0] : col[1];
            if (value >= 0) {
                col[0] = positive;
                positive += value;
                col[1] = positive;
            } else {
                col[0] = 0;
                col[1] = 0;
            }
        }
    }
};
/**
 * Function type to compute offset for stacked data.
 *
 * d3-shape has something fishy going on with its types.
 * In @definitelytyped/d3-shape, this function (the offset accessor) is typed as Series<> => void.
 * However! When I actually open the storybook I can see that the offset accessor actually receives Array<Series<>>.
 * The same I can see in the source code itself:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
 * That one unfortunately has no types but we can tell it passes three-dimensional array.
 *
 * Which leads me to believe that definitelytyped is wrong on this one.
 * There's open discussion on this topic without much attention:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
 */ var STACK_OFFSET_MAP = {
    sign: offsetSign,
    // @ts-expect-error definitelytyped types are incorrect
    expand: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$expand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetExpand$3e$__["stackOffsetExpand"],
    // @ts-expect-error definitelytyped types are incorrect
    none: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$none$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetNone$3e$__["stackOffsetNone"],
    // @ts-expect-error definitelytyped types are incorrect
    silhouette: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$silhouette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetSilhouette$3e$__["stackOffsetSilhouette"],
    // @ts-expect-error definitelytyped types are incorrect
    wiggle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$wiggle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetWiggle$3e$__["stackOffsetWiggle"],
    positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType)=>{
    var _STACK_OFFSET_MAP$off;
    var offsetAccessor = (_STACK_OFFSET_MAP$off = STACK_OFFSET_MAP[offsetType]) !== null && _STACK_OFFSET_MAP$off !== void 0 ? _STACK_OFFSET_MAP$off : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$offset$2f$none$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOffsetNone$3e$__["stackOffsetNone"];
    var stack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stack$3e$__["stack"])().keys(dataKeys).value((d, key)=>Number(getValueByDataKey(d, key, 0))).order(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$d3$2d$shape$40$3$2e$2$2e$0$2f$node_modules$2f$d3$2d$shape$2f$src$2f$order$2f$none$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__stackOrderNone$3e$__["stackOrderNone"])// @ts-expect-error definitelytyped types are incorrect
    .offset(offsetAccessor);
    var result = stack(data);
    // Post-process ranged data: if value is an array of two numbers, use them directly without stacking
    result.forEach((series, seriesIndex)=>{
        series.forEach((point, pointIndex)=>{
            var value = getValueByDataKey(data[pointIndex], dataKeys[seriesIndex], 0);
            if (Array.isArray(value) && value.length === 2 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(value[0]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(value[1])) {
                // eslint-disable-next-line prefer-destructuring,no-param-reassign
                point[0] = value[0];
                // eslint-disable-next-line prefer-destructuring,no-param-reassign
                point[1] = value[1];
            }
        });
    });
    return result;
};
function getNormalizedStackId(publicStackId) {
    return publicStackId == null ? undefined : String(publicStackId);
}
function getCateCoordinateOfLine(_ref) {
    var axis = _ref.axis, ticks = _ref.ticks, bandSize = _ref.bandSize, entry = _ref.entry, index = _ref.index, dataKey = _ref.dataKey;
    if (axis.type === 'category') {
        // find coordinate of category axis by the value of category
        // @ts-expect-error why does this use direct object access instead of getValueByDataKey?
        if (!axis.allowDuplicatedCategory && axis.dataKey && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(entry[axis.dataKey])) {
            // @ts-expect-error why does this use direct object access instead of getValueByDataKey?
            var matchedTick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findEntryInArray"])(ticks, 'value', entry[axis.dataKey]);
            if (matchedTick) {
                return matchedTick.coordinate + bandSize / 2;
            }
        }
        return ticks !== null && ticks !== void 0 && ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
    }
    var value = getValueByDataKey(entry, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(dataKey) ? dataKey : axis.dataKey);
    var scaled = axis.scale.map(value);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(scaled)) {
        return null;
    }
    return scaled;
}
var getCateCoordinateOfBar = (_ref2)=>{
    var axis = _ref2.axis, ticks = _ref2.ticks, offset = _ref2.offset, bandSize = _ref2.bandSize, entry = _ref2.entry, index = _ref2.index;
    if (axis.type === 'category') {
        return ticks[index] ? ticks[index].coordinate + offset : null;
    }
    // getValueByDataKey does not validate the output type
    var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(value)) {
        return null;
    }
    var scaled = axis.scale.map(value);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(scaled)) {
        return null;
    }
    return scaled - bandSize / 2 + offset;
};
var getBaseValueOfBar = (_ref3)=>{
    var numericAxis = _ref3.numericAxis;
    var domain = numericAxis.scale.domain();
    if (numericAxis.type === 'number') {
        // @ts-expect-error type number means the domain has numbers in it but this relationship is not known to typescript
        var minValue = Math.min(domain[0], domain[1]);
        // @ts-expect-error type number means the domain has numbers in it but this relationship is not known to typescript
        var maxValue = Math.max(domain[0], domain[1]);
        if (minValue <= 0 && maxValue >= 0) {
            return 0;
        }
        if (maxValue < 0) {
            return maxValue;
        }
        return minValue;
    }
    return domain[0];
};
var getDomainOfSingle = (data)=>{
    var flat = data.flat(2).filter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"]);
    return [
        Math.min(...flat),
        Math.max(...flat)
    ];
};
var makeDomainFinite = (domain)=>{
    return [
        domain[0] === Infinity ? 0 : domain[0],
        domain[1] === -Infinity ? 0 : domain[1]
    ];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex)=>{
    if (stackGroups == null || Object.keys(stackGroups).length === 0) {
        return undefined;
    }
    return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId)=>{
        var group = stackGroups[stackId];
        if (!group) {
            return result;
        }
        var stackedData = group.stackedData;
        var domain = stackedData.reduce((res, entry)=>{
            var sliced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$getSliced$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSliced"])(entry, startIndex, endIndex);
            var s = getDomainOfSingle(sliced);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(s[0]) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(s[1])) {
                return res;
            }
            return [
                Math.min(res[0], s[0]),
                Math.max(res[1], s[1])
            ];
        }, [
            Infinity,
            -Infinity
        ]);
        return [
            Math.min(domain[0], result[0]),
            Math.max(domain[1], result[1])
        ];
    }, [
        Infinity,
        -Infinity
    ]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks, isBar)=>{
    if (axis && axis.scale && axis.scale.bandwidth) {
        var bandWidth = axis.scale.bandwidth();
        if (!isBar || bandWidth > 0) {
            return bandWidth;
        }
    }
    if (axis && ticks && ticks.length >= 2) {
        var orderedTicks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$array$2f$sortBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__sortBy__as__default$3e$__["default"])(ticks, (o)=>o.coordinate);
        // Collect the pixel gaps between adjacent category positions and track the
        // widest one.
        var gaps = [];
        var maxGap = 0;
        for(var i = 1, len = orderedTicks.length; i < len; i++){
            var _orderedTicks$i, _orderedTicks;
            var gap = (((_orderedTicks$i = orderedTicks[i]) === null || _orderedTicks$i === void 0 ? void 0 : _orderedTicks$i.coordinate) || 0) - (((_orderedTicks = orderedTicks[i - 1]) === null || _orderedTicks === void 0 ? void 0 : _orderedTicks.coordinate) || 0);
            gaps.push(gap);
            maxGap = Math.max(gap, maxGap);
        }
        // High-precision float values can place two ticks at (almost) the same pixel,
        // producing a spurious sub-pixel gap. Such near-coincident positions are the
        // same category slot for rendering purposes and must not define the band
        // size, otherwise every bar collapses to ~0px wide (issue #4043). Ignore gaps
        // that are a negligible fraction of the widest gap so a single near-duplicate
        // value cannot dictate the spacing.
        var minMeaningfulGap = maxGap * 1e-4;
        var bandSize = Infinity;
        for (var _gap of gaps){
            if (_gap > minMeaningfulGap) {
                bandSize = Math.min(_gap, bandSize);
            }
        }
        return bandSize === Infinity ? 0 : bandSize;
    }
    return isBar ? undefined : 0;
};
function getTooltipEntry(_ref4) {
    var tooltipEntrySettings = _ref4.tooltipEntrySettings, dataKey = _ref4.dataKey, payload = _ref4.payload, value = _ref4.value, name = _ref4.name;
    return _objectSpread(_objectSpread({}, tooltipEntrySettings), {}, {
        dataKey,
        payload,
        value,
        name
    });
}
function getTooltipNameProp(nameFromItem, dataKey) {
    if (nameFromItem != null) {
        return String(nameFromItem);
    }
    if (typeof dataKey === 'string') {
        return dataKey;
    }
    return undefined;
}
var calculateCartesianTooltipPos = (coordinate, layout)=>{
    if (layout === 'horizontal') {
        return coordinate.relativeX;
    }
    if (layout === 'vertical') {
        return coordinate.relativeY;
    }
    return undefined;
};
var calculatePolarTooltipPos = (rangeObj, layout)=>{
    if (layout === 'centric') {
        return rangeObj.angle;
    }
    return rangeObj.radius;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_PANEL",
    ()=>COLOR_PANEL,
    "DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME",
    ()=>DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME,
    "DATA_ITEM_INDEX_ATTRIBUTE_NAME",
    ()=>DATA_ITEM_INDEX_ATTRIBUTE_NAME,
    "DEFAULT_X_AXIS_HEIGHT",
    ()=>DEFAULT_X_AXIS_HEIGHT,
    "DEFAULT_Y_AXIS_WIDTH",
    ()=>DEFAULT_Y_AXIS_WIDTH
]);
var COLOR_PANEL = [
    '#1890FF',
    '#66B5FF',
    '#41D9C7',
    '#2FC25B',
    '#6EDB8F',
    '#9AE65C',
    '#FACC14',
    '#E6965C',
    '#57AD71',
    '#223273',
    '#738AE6',
    '#7564CC',
    '#8543E0',
    '#A877ED',
    '#5C8EE6',
    '#13C2C2',
    '#70E0E0',
    '#5CA3E6',
    '#3436C7',
    '#8082FF',
    '#DD81E6',
    '#F04864',
    '#FA7D92',
    '#D598D9'
];
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = 'data-recharts-item-index';
var DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME = 'data-recharts-item-id';
var DEFAULT_Y_AXIS_WIDTH = 60;
var DEFAULT_X_AXIS_HEIGHT = 30;
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DOMUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearStringCache",
    ()=>clearStringCache,
    "configureTextMeasurement",
    ()=>configureTextMeasurement,
    "getStringCacheStats",
    ()=>getStringCacheStats,
    "getStringSize",
    ()=>getStringSize,
    "getTextMeasurementConfig",
    ()=>getTextMeasurementConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Global.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$LRUCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/LRUCache.js [app-client] (ecmascript)");
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
var defaultConfig = {
    cacheSize: 2000,
    enableCache: true
};
var currentConfig = _objectSpread({}, defaultConfig);
var stringCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$LRUCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LRUCache"](currentConfig.cacheSize);
var SPAN_STYLE = {
    position: 'absolute',
    top: '-20000px',
    left: 0,
    padding: 0,
    margin: 0,
    border: 'none',
    whiteSpace: 'pre'
};
var MEASUREMENT_SPAN_ID = 'recharts_measurement_span';
function createCacheKey(text, style) {
    // Simple string concatenation for better performance than JSON.stringify
    var fontSize = style.fontSize || '';
    var fontFamily = style.fontFamily || '';
    var fontWeight = style.fontWeight || '';
    var fontStyle = style.fontStyle || '';
    var letterSpacing = style.letterSpacing || '';
    var textTransform = style.textTransform || '';
    return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
/**
 * Measure text using DOM (accurate but slower)
 * @param text - The text to measure
 * @param style - CSS style properties to apply
 * @returns The size of the text
 */ var measureTextWithDOM = (text, style)=>{
    try {
        var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
        if (!measurementSpan) {
            measurementSpan = document.createElement('span');
            measurementSpan.setAttribute('id', MEASUREMENT_SPAN_ID);
            measurementSpan.setAttribute('aria-hidden', 'true');
            document.body.appendChild(measurementSpan);
        }
        // Apply styles directly without unnecessary object creation
        Object.assign(measurementSpan.style, SPAN_STYLE, style);
        measurementSpan.textContent = "".concat(text);
        var rect = measurementSpan.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    } catch (_unused) {
        return {
            width: 0,
            height: 0
        };
    }
};
var getStringSize = function getStringSize(text) {
    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (text === undefined || text === null || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Global"].isSsr) {
        return {
            width: 0,
            height: 0
        };
    }
    // If caching is disabled, measure directly
    if (!currentConfig.enableCache) {
        return measureTextWithDOM(text, style);
    }
    var cacheKey = createCacheKey(text, style);
    var cachedResult = stringCache.get(cacheKey);
    if (cachedResult) {
        return cachedResult;
    }
    // Measure using DOM
    var result = measureTextWithDOM(text, style);
    // Store in LRU cache
    stringCache.set(cacheKey, result);
    return result;
};
var configureTextMeasurement = (config)=>{
    var newConfig = _objectSpread(_objectSpread({}, currentConfig), config);
    if (newConfig.cacheSize !== currentConfig.cacheSize) {
        stringCache = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$LRUCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LRUCache"](newConfig.cacheSize);
    }
    currentConfig = newConfig;
};
var getTextMeasurementConfig = ()=>_objectSpread({}, currentConfig);
var clearStringCache = ()=>{
    stringCache.clear();
};
var getStringCacheStats = ()=>({
        size: stringCache.size(),
        maxSize: currentConfig.cacheSize
    });
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findEntryInArray",
    ()=>findEntryInArray,
    "getLinearRegression",
    ()=>getLinearRegression,
    "getPercentValue",
    ()=>getPercentValue,
    "hasDuplicate",
    ()=>hasDuplicate,
    "interpolate",
    ()=>interpolate,
    "isNan",
    ()=>isNan,
    "isNotNil",
    ()=>isNotNil,
    "isNullish",
    ()=>isNullish,
    "isNumOrStr",
    ()=>isNumOrStr,
    "isNumber",
    ()=>isNumber,
    "isPercent",
    ()=>isPercent,
    "mathSign",
    ()=>mathSign,
    "noop",
    ()=>noop,
    "uniqueId",
    ()=>uniqueId,
    "upperFirst",
    ()=>upperFirst
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/get.mjs [app-client] (ecmascript) <export get as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/round.js [app-client] (ecmascript)");
;
;
var mathSign = (value)=>{
    if (value === 0) {
        return 0;
    }
    if (value > 0) {
        return 1;
    }
    return -1;
};
var isNan = (value)=>{
    // eslint-disable-next-line eqeqeq
    return typeof value == 'number' && value != +value;
};
var isPercent = (value)=>typeof value === 'string' && value.length > 1 && value.indexOf('%') === value.length - 1;
var isNumber = (value)=>(typeof value === 'number' || value instanceof Number) && !isNan(value);
var isNumOrStr = (value)=>isNumber(value) || typeof value === 'string';
var idCounter = 0;
var uniqueId = (prefix)=>{
    var id = ++idCounter;
    return "".concat(prefix || '').concat(id);
};
var getPercentValue = function getPercentValue(percent, totalValue) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var validate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (!isNumber(percent) && typeof percent !== 'string') {
        return defaultValue;
    }
    var value;
    if (isPercent(percent)) {
        if (totalValue == null) {
            return defaultValue;
        }
        var index = percent.indexOf('%');
        value = totalValue * parseFloat(percent.slice(0, index)) / 100;
    } else {
        value = +percent;
    }
    if (isNan(value)) {
        value = defaultValue;
    }
    if (validate && totalValue != null && value > totalValue) {
        value = totalValue;
    }
    return value;
};
var hasDuplicate = (ary)=>{
    if (!Array.isArray(ary)) {
        return false;
    }
    var len = ary.length;
    var cache = {};
    for(var i = 0; i < len; i++){
        if (!cache[String(ary[i])]) {
            cache[String(ary[i])] = true;
        } else {
            return true;
        }
    }
    return false;
};
function interpolate(start, end, animationElapsedTime) {
    if (isNumber(start) && isNumber(end)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["round"])(start + animationElapsedTime * (end - start));
    }
    return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
    if (!ary || !ary.length) {
        return undefined;
    }
    return ary.find((entry)=>entry && (typeof specifiedKey === 'function' ? specifiedKey(entry) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__["default"])(entry, specifiedKey)) === specifiedValue);
}
var getLinearRegression = (data)=>{
    var len = data.length;
    var xsum = 0;
    var ysum = 0;
    var xysum = 0;
    var xxsum = 0;
    var xmin = Infinity;
    var xmax = -Infinity;
    var xcurrent = 0;
    var ycurrent = 0;
    for(var i = 0; i < len; i++){
        var _data$i, _data$i2;
        xcurrent = ((_data$i = data[i]) === null || _data$i === void 0 ? void 0 : _data$i.cx) || 0;
        ycurrent = ((_data$i2 = data[i]) === null || _data$i2 === void 0 ? void 0 : _data$i2.cy) || 0;
        xsum += xcurrent;
        ysum += ycurrent;
        xysum += xcurrent * ycurrent;
        xxsum += xcurrent * xcurrent;
        xmin = Math.min(xmin, xcurrent);
        xmax = Math.max(xmax, xcurrent);
    }
    var a = len * xxsum !== xsum * xsum ? (len * xysum - xsum * ysum) / (len * xxsum - xsum * xsum) : 0;
    return {
        xmin,
        xmax,
        a,
        b: (ysum - a * xsum) / len
    };
};
var isNullish = (value)=>{
    return value === null || typeof value === 'undefined';
};
var upperFirst = (value)=>{
    if (isNullish(value)) {
        return value;
    }
    return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
function isNotNil(value) {
    return value != null;
}
function noop() {}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Events.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRUSH_SYNC_EVENT",
    ()=>BRUSH_SYNC_EVENT,
    "TOOLTIP_SYNC_EVENT",
    ()=>TOOLTIP_SYNC_EVENT,
    "eventCenter",
    ()=>eventCenter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$5$2e$0$2e$4$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/eventemitter3@5.0.4/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
;
var eventCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$eventemitter3$40$5$2e$0$2e$4$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]();
;
var TOOLTIP_SYNC_EVENT = 'recharts.syncEvent.tooltip';
var BRUSH_SYNC_EVENT = 'recharts.syncEvent.brush';
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Global.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Global",
    ()=>Global
]);
var parseIsSsrByDefault = ()=>!(typeof window !== 'undefined' && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
    devToolsEnabled: true,
    isSsr: parseIsSsrByDefault()
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/LRUCache.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LRUCache",
    ()=>LRUCache
]);
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
class LRUCache {
    constructor(maxSize){
        _defineProperty(this, "cache", new Map());
        this.maxSize = maxSize;
    }
    get(key) {
        var value = this.cache.get(key);
        if (value !== undefined) {
            this.cache.delete(key);
            this.cache.set(key, value);
        }
        return value;
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.maxSize) {
            var firstKey = this.cache.keys().next().value;
            if (firstKey != null) {
                this.cache.delete(firstKey);
            }
        }
        this.cache.set(key, value);
    }
    clear() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/LogUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "warn",
    ()=>warn
]);
/* eslint no-console: 0 */ var isDev = true;
var warn = function warn(condition, format) {
    for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        args[_key - 2] = arguments[_key];
    }
    if (isDev && typeof console !== 'undefined' && console.warn) {
        if (format === undefined) {
            console.warn('LogUtils requires an error message argument');
        }
        if (!condition) {
            if (format === undefined) {
                console.warn('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
            } else {
                var argIndex = 0;
                console.warn(format.replace(/%s/g, ()=>args[argIndex++]));
            }
        }
    }
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/PolarUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RADIAN",
    ()=>RADIAN,
    "degreeToRadian",
    ()=>degreeToRadian,
    "getMaxRadius",
    ()=>getMaxRadius,
    "inRangeOfSector",
    ()=>inRangeOfSector,
    "polarToCartesian",
    ()=>polarToCartesian,
    "radianToDegree",
    ()=>radianToDegree
]);
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
var RADIAN = Math.PI / 180;
var degreeToRadian = (angle)=>angle * Math.PI / 180;
var radianToDegree = (angleInRadian)=>angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle)=>({
        x: cx + Math.cos(-RADIAN * angle) * radius,
        y: cy + Math.sin(-RADIAN * angle) * radius
    });
var getMaxRadius = function getMaxRadius(width, height) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        brushBottom: 0
    };
    return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point, anotherPoint)=>{
    var x1 = point.x, y1 = point.y;
    var x2 = anotherPoint.x, y2 = anotherPoint.y;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref, _ref2)=>{
    var x = _ref.x, y = _ref.y;
    var cx = _ref2.cx, cy = _ref2.cy;
    var radius = distanceBetweenPoints({
        x,
        y
    }, {
        x: cx,
        y: cy
    });
    if (radius <= 0) {
        return {
            radius,
            angle: 0
        };
    }
    var cos = (x - cx) / radius;
    var angleInRadian = Math.acos(cos);
    if (y > cy) {
        angleInRadian = 2 * Math.PI - angleInRadian;
    }
    return {
        radius,
        angle: radianToDegree(angleInRadian),
        angleInRadian
    };
};
var formatAngleOfSector = (_ref3)=>{
    var startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
    var startCnt = Math.floor(startAngle / 360);
    var endCnt = Math.floor(endAngle / 360);
    var min = Math.min(startCnt, endCnt);
    return {
        startAngle: startAngle - min * 360,
        endAngle: endAngle - min * 360
    };
};
var reverseFormatAngleOfSector = (angle, _ref4)=>{
    var startAngle = _ref4.startAngle, endAngle = _ref4.endAngle;
    var startCnt = Math.floor(startAngle / 360);
    var endCnt = Math.floor(endAngle / 360);
    var min = Math.min(startCnt, endCnt);
    return angle + min * 360;
};
var inRangeOfSector = (_ref5, viewBox)=>{
    var x = _ref5.relativeX, y = _ref5.relativeY;
    var _getAngleOfPoint = getAngleOfPoint({
        x,
        y
    }, viewBox), radius = _getAngleOfPoint.radius, angle = _getAngleOfPoint.angle;
    var innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius;
    if (radius < innerRadius || radius > outerRadius) {
        return null;
    }
    if (radius === 0) {
        return null;
    }
    var _formatAngleOfSector = formatAngleOfSector(viewBox), startAngle = _formatAngleOfSector.startAngle, endAngle = _formatAngleOfSector.endAngle;
    var formatAngle = angle;
    var inRange;
    if (startAngle <= endAngle) {
        while(formatAngle > endAngle){
            formatAngle -= 360;
        }
        while(formatAngle < startAngle){
            formatAngle += 360;
        }
        inRange = formatAngle >= startAngle && formatAngle <= endAngle;
    } else {
        while(formatAngle > startAngle){
            formatAngle -= 360;
        }
        while(formatAngle < endAngle){
            formatAngle += 360;
        }
        inRange = formatAngle >= endAngle && formatAngle <= startAngle;
    }
    if (inRange) {
        return _objectSpread(_objectSpread({}, viewBox), {}, {
            radius,
            angle: reverseFormatAngleOfSector(formatAngle, viewBox)
        });
    }
    return null;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ReactUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCALE_TYPES",
    ()=>SCALE_TYPES,
    "findAllByType",
    ()=>findAllByType,
    "getDisplayName",
    ()=>getDisplayName,
    "isClipDot",
    ()=>isClipDot,
    "toArray",
    ()=>toArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/object/get.mjs [app-client] (ecmascript) <export get as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$is$40$16$2e$13$2e$1$2f$node_modules$2f$react$2d$is$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
;
;
;
;
var SCALE_TYPES = [
    'auto',
    'linear',
    'pow',
    'sqrt',
    'log',
    'identity',
    'time',
    'band',
    'point',
    'ordinal',
    'quantile',
    'quantize',
    'utc',
    'sequential',
    'threshold'
];
var getDisplayName = (Comp)=>{
    if (typeof Comp === 'string') {
        return Comp;
    }
    if (!Comp) {
        return '';
    }
    return Comp.displayName || Comp.name || 'Component';
};
// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
var lastChildren = null;
var lastResult = null;
var toArray = (children)=>{
    if (children === lastChildren && Array.isArray(lastResult)) {
        return lastResult;
    }
    var result = [];
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].forEach(children, (child)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(child)) return;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$is$40$16$2e$13$2e$1$2f$node_modules$2f$react$2d$is$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFragment"])(child)) {
            result = result.concat(toArray(child.props.children));
        } else {
            // @ts-expect-error this could still be Iterable<ReactNode> and TS does not like that
            result.push(child);
        }
    });
    lastResult = result;
    lastChildren = children;
    return result;
};
function findAllByType(children, type) {
    var result = [];
    var types = [];
    if (Array.isArray(type)) {
        types = type.map((t)=>getDisplayName(t));
    } else {
        types = [
            getDisplayName(type)
        ];
    }
    toArray(children).forEach((child)=>{
        // @ts-expect-error toArray and lodash.get are not compatible. Let's get rid of the whole findAllByType function
        var childType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__["default"])(child, 'type.displayName') || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$object$2f$get$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__get__as__default$3e$__["default"])(child, 'type.name');
        if (childType && types.indexOf(childType) !== -1) {
            result.push(child);
        }
    });
    return result;
}
var isClipDot = (dot)=>{
    if (dot && typeof dot === 'object' && 'clipDot' in dot) {
        return Boolean(dot.clipDot);
    }
    return true;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ReduceCSSCalc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reduceCSSCalc",
    ()=>reduceCSSCalc,
    "safeEvaluateExpression",
    ()=>safeEvaluateExpression
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var _DecimalCSS;
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
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1
};
var FIXED_CSS_LENGTH_UNITS = [
    'cm',
    'mm',
    'pt',
    'pc',
    'in',
    'Q',
    'px'
];
function isSupportedUnit(unit) {
    return FIXED_CSS_LENGTH_UNITS.includes(unit);
}
var STR_NAN = 'NaN';
function convertToPx(value, unit) {
    return value * CONVERSION_RATES[unit];
}
class DecimalCSS {
    static parse(str) {
        var _NUM_SPLIT_REGEX$exec;
        var _ref = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [], _ref2 = _slicedToArray(_ref, 3), numStr = _ref2[1], unit = _ref2[2];
        if (numStr == null) {
            return DecimalCSS.NaN;
        }
        return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : '');
    }
    constructor(num, unit){
        this.num = num;
        this.unit = unit;
        this.num = num;
        this.unit = unit;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNan"])(num)) {
            this.unit = '';
        }
        if (unit !== '' && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
            this.num = NaN;
            this.unit = '';
        }
        if (isSupportedUnit(unit)) {
            this.num = convertToPx(num, unit);
            this.unit = 'px';
        }
    }
    add(other) {
        if (this.unit !== other.unit) {
            return new DecimalCSS(NaN, '');
        }
        return new DecimalCSS(this.num + other.num, this.unit);
    }
    subtract(other) {
        if (this.unit !== other.unit) {
            return new DecimalCSS(NaN, '');
        }
        return new DecimalCSS(this.num - other.num, this.unit);
    }
    multiply(other) {
        if (this.unit !== '' && other.unit !== '' && this.unit !== other.unit) {
            return new DecimalCSS(NaN, '');
        }
        return new DecimalCSS(this.num * other.num, this.unit || other.unit);
    }
    divide(other) {
        if (this.unit !== '' && other.unit !== '' && this.unit !== other.unit) {
            return new DecimalCSS(NaN, '');
        }
        return new DecimalCSS(this.num / other.num, this.unit || other.unit);
    }
    toString() {
        return "".concat(this.num).concat(this.unit);
    }
    isNaN() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNan"])(this.num);
    }
}
_DecimalCSS = DecimalCSS;
_defineProperty(DecimalCSS, "NaN", new _DecimalCSS(NaN, ''));
function calculateArithmetic(expr) {
    if (expr == null || expr.includes(STR_NAN)) {
        return STR_NAN;
    }
    var newExpr = expr;
    while(newExpr.includes('*') || newExpr.includes('/')){
        var _MULTIPLY_OR_DIVIDE_R;
        var _ref3 = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [], _ref4 = _slicedToArray(_ref3, 4), leftOperand = _ref4[1], operator = _ref4[2], rightOperand = _ref4[3];
        var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : '');
        var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : '');
        var result = operator === '*' ? lTs.multiply(rTs) : lTs.divide(rTs);
        if (result.isNaN()) {
            return STR_NAN;
        }
        newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
    }
    while(newExpr.includes('+') || /.-\d+(?:\.\d+)?/.test(newExpr)){
        var _ADD_OR_SUBTRACT_REGE;
        var _ref5 = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [], _ref6 = _slicedToArray(_ref5, 4), _leftOperand = _ref6[1], _operator = _ref6[2], _rightOperand = _ref6[3];
        var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : '');
        var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : '');
        var _result = _operator === '+' ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
        if (_result.isNaN()) {
            return STR_NAN;
        }
        newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
    }
    return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
    var newExpr = expr;
    var match;
    // eslint-disable-next-line no-cond-assign
    while((match = PARENTHESES_REGEX.exec(newExpr)) != null){
        var _match = match, _match2 = _slicedToArray(_match, 2), parentheticalExpression = _match2[1];
        newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
    }
    return newExpr;
}
function evaluateExpression(expression) {
    var newExpr = expression.replace(/\s+/g, '');
    newExpr = calculateParentheses(newExpr);
    newExpr = calculateArithmetic(newExpr);
    return newExpr;
}
function safeEvaluateExpression(expression) {
    try {
        return evaluateExpression(expression);
    } catch (_unused) {
        return STR_NAN;
    }
}
function reduceCSSCalc(expression) {
    var result = safeEvaluateExpression(expression.slice(5, -1));
    if (result === STR_NAN) {
        return '';
    }
    return result;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/TickUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAngledTickWidth",
    ()=>getAngledTickWidth,
    "getNumberIntervalTicks",
    ()=>getNumberIntervalTicks,
    "getTickBoundaries",
    ()=>getTickBoundaries,
    "isVisible",
    ()=>isVisible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$CartesianUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/CartesianUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$getEveryNth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getEveryNth.js [app-client] (ecmascript)");
;
;
function getAngledTickWidth(contentSize, unitSize, angle) {
    var size = {
        width: contentSize.width + unitSize.width,
        height: contentSize.height + unitSize.height
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$CartesianUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAngledRectangleWidth"])(size, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
    var isWidth = sizeKey === 'width';
    var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
    if (sign === 1) {
        return {
            start: isWidth ? x : y,
            end: isWidth ? x + width : y + height
        };
    }
    return {
        start: isWidth ? x + width : y + height,
        end: isWidth ? x : y
    };
}
function isVisible(sign, tickPosition, getSize, start, end) {
    /* Since getSize() is expensive (it reads the ticks' size from the DOM), we do this check first to avoid calculating
   * the tick's size. */ if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) {
        return false;
    }
    var size = getSize();
    return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$getEveryNth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEveryNth"])(ticks, interval + 1);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/XAxisUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Calculates the height of the X-axis based on the tick labels and the axis label.
 * @param params - The parameters object.
 * @param [params.ticks] - An array-like object of tick elements, each with a `getBoundingClientRect` method.
 * @param [params.label] - The axis label element, with a `getBoundingClientRect` method.
 * @param [params.labelGapWithTick=5] - The gap between the label and the tick.
 * @param [params.tickSize=0] - The length of the tick line.
 * @param [params.tickMargin=0] - The margin between the tick line and the tick text.
 * @returns The calculated height of the X-axis.
 */ __turbopack_context__.s([
    "getCalculatedXAxisHeight",
    ()=>getCalculatedXAxisHeight
]);
var getCalculatedXAxisHeight = (_ref)=>{
    var ticks = _ref.ticks, label = _ref.label, _ref$labelGapWithTick = _ref.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick === void 0 ? 5 : _ref$labelGapWithTick, _ref$tickSize = _ref.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
    // find the max height of the tick labels
    var maxTickHeight = 0;
    if (ticks) {
        Array.from(ticks).forEach((tickNode)=>{
            if (tickNode) {
                var bbox = tickNode.getBoundingClientRect();
                if (bbox.height > maxTickHeight) {
                    maxTickHeight = bbox.height;
                }
            }
        });
        // calculate height of the axis label
        var labelHeight = label ? label.getBoundingClientRect().height : 0;
        var tickHeight = tickSize + tickMargin;
        // calculate the updated height of the x-axis
        var updatedXAxisHeight = maxTickHeight + tickHeight + labelHeight + (label ? labelGapWithTick : 0);
        return Math.round(updatedXAxisHeight);
    }
    return 0;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/YAxisUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Calculates the width of the Y-axis based on the tick labels and the axis label.
 * @param params - The parameters object.
 * @param [params.ticks] - An array-like object of tick elements, each with a `getBoundingClientRect` method.
 * @param [params.label] - The axis label element, with a `getBoundingClientRect` method.
 * @param [params.labelGapWithTick=5] - The gap between the label and the tick.
 * @param [params.tickSize=0] - The length of the tick line.
 * @param [params.tickMargin=0] - The margin between the tick line and the tick text.
 * @returns The calculated width of the Y-axis.
 */ __turbopack_context__.s([
    "getCalculatedYAxisWidth",
    ()=>getCalculatedYAxisWidth
]);
var getCalculatedYAxisWidth = (_ref)=>{
    var ticks = _ref.ticks, label = _ref.label, _ref$labelGapWithTick = _ref.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick === void 0 ? 5 : _ref$labelGapWithTick, _ref$tickSize = _ref.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
    // find the max width of the tick labels
    var maxTickWidth = 0;
    if (ticks) {
        Array.from(ticks).forEach((tickNode)=>{
            if (tickNode) {
                var bbox = tickNode.getBoundingClientRect();
                if (bbox.width > maxTickWidth) {
                    maxTickWidth = bbox.width;
                }
            }
        });
        // calculate width of the axis label
        var labelWidth = label ? label.getBoundingClientRect().width : 0;
        var tickWidth = tickSize + tickMargin;
        // calculate the updated width of the y-axis
        var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
        return Math.round(updatedYAxisWidth);
    }
    return 0;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/axisPropsAreEqual.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "axisPropsAreEqual",
    ()=>axisPropsAreEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$propsAreEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/propsAreEqual.js [app-client] (ecmascript)");
var _excluded = [
    "domain",
    "range"
], _excluded2 = [
    "domain",
    "range"
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
function shortArraysAreEqual(arr1, arr2) {
    if (arr1 === arr2) {
        return true;
    }
    if (Array.isArray(arr1) && arr1.length === 2 && Array.isArray(arr2) && arr2.length === 2) {
        return arr1[0] === arr2[0] && arr1[1] === arr2[1];
    }
    return false;
}
function axisPropsAreEqual(prevProps, nextProps) {
    if (prevProps === nextProps) {
        return true;
    }
    var prevDomain = prevProps.domain, prevRange = prevProps.range, prevRest = _objectWithoutProperties(prevProps, _excluded);
    var nextDomain = nextProps.domain, nextRange = nextProps.range, nextRest = _objectWithoutProperties(nextProps, _excluded2);
    if (!shortArraysAreEqual(prevDomain, nextDomain)) {
        return false;
    }
    if (!shortArraysAreEqual(prevRange, nextRange)) {
        return false;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$propsAreEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["propsAreEqual"])(prevRest, nextRest);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/createEventProxy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createEventProxy",
    ()=>createEventProxy
]);
function createEventProxy(reactEvent) {
    reactEvent.persist();
    var currentTarget = reactEvent.currentTarget;
    return new Proxy(reactEvent, {
        get: (target, prop)=>{
            if (prop === 'currentTarget') {
                return currentTarget;
            }
            var value = Reflect.get(target, prop);
            if (typeof value === 'function') {
                return value.bind(target);
            }
            return value;
        }
    });
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/cursor/getCursorPoints.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCursorPoints",
    ()=>getCursorPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/PolarUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$cursor$2f$getRadialCursorPoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js [app-client] (ecmascript)");
;
;
;
function getCursorPoints(layout, activeCoordinate, offset) {
    if (layout === 'horizontal') {
        return [
            {
                x: activeCoordinate.x,
                y: offset.top
            },
            {
                x: activeCoordinate.x,
                y: offset.top + offset.height
            }
        ];
    }
    if (layout === 'vertical') {
        return [
            {
                x: offset.left,
                y: activeCoordinate.y
            },
            {
                x: offset.left + offset.width,
                y: activeCoordinate.y
            }
        ];
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPolarCoordinate"])(activeCoordinate)) {
        if (layout === 'centric') {
            var cx = activeCoordinate.cx, cy = activeCoordinate.cy, innerRadius = activeCoordinate.innerRadius, outerRadius = activeCoordinate.outerRadius, angle = activeCoordinate.angle;
            var innerPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, innerRadius, angle);
            var outerPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, outerRadius, angle);
            return [
                {
                    x: innerPoint.x,
                    y: innerPoint.y
                },
                {
                    x: outerPoint.x,
                    y: outerPoint.y
                }
            ];
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$cursor$2f$getRadialCursorPoints$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRadialCursorPoints"])(activeCoordinate);
    }
    return undefined;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/cursor/getCursorRectangle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCursorRectangle",
    ()=>getCursorRectangle
]);
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
    var halfSize = tooltipAxisBandSize / 2;
    return {
        stroke: 'none',
        fill: '#ccc',
        x: layout === 'horizontal' ? activeCoordinate.x - halfSize : offset.left + 0.5,
        y: layout === 'horizontal' ? offset.top + 0.5 : activeCoordinate.y - halfSize,
        width: layout === 'horizontal' ? tooltipAxisBandSize : offset.width - 1,
        height: layout === 'horizontal' ? offset.height - 1 : tooltipAxisBandSize
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRadialCursorPoints",
    ()=>getRadialCursorPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/PolarUtils.js [app-client] (ecmascript)");
;
function getRadialCursorPoints(activeCoordinate) {
    var cx = activeCoordinate.cx, cy = activeCoordinate.cy, radius = activeCoordinate.radius, startAngle = activeCoordinate.startAngle, endAngle = activeCoordinate.endAngle;
    var startPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, radius, startAngle);
    var endPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(cx, cy, radius, endAngle);
    return {
        points: [
            startPoint,
            endPoint
        ],
        cx,
        cy,
        radius,
        startAngle,
        endAngle
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/excludeEventProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isEventKey",
    ()=>isEventKey
]);
var EventKeys = [
    'dangerouslySetInnerHTML',
    'onCopy',
    'onCopyCapture',
    'onCut',
    'onCutCapture',
    'onPaste',
    'onPasteCapture',
    'onCompositionEnd',
    'onCompositionEndCapture',
    'onCompositionStart',
    'onCompositionStartCapture',
    'onCompositionUpdate',
    'onCompositionUpdateCapture',
    'onFocus',
    'onFocusCapture',
    'onBlur',
    'onBlurCapture',
    'onChange',
    'onChangeCapture',
    'onBeforeInput',
    'onBeforeInputCapture',
    'onInput',
    'onInputCapture',
    'onReset',
    'onResetCapture',
    'onSubmit',
    'onSubmitCapture',
    'onInvalid',
    'onInvalidCapture',
    'onLoad',
    'onLoadCapture',
    'onError',
    'onErrorCapture',
    'onKeyDown',
    'onKeyDownCapture',
    'onKeyPress',
    'onKeyPressCapture',
    'onKeyUp',
    'onKeyUpCapture',
    'onAbort',
    'onAbortCapture',
    'onCanPlay',
    'onCanPlayCapture',
    'onCanPlayThrough',
    'onCanPlayThroughCapture',
    'onDurationChange',
    'onDurationChangeCapture',
    'onEmptied',
    'onEmptiedCapture',
    'onEncrypted',
    'onEncryptedCapture',
    'onEnded',
    'onEndedCapture',
    'onLoadedData',
    'onLoadedDataCapture',
    'onLoadedMetadata',
    'onLoadedMetadataCapture',
    'onLoadStart',
    'onLoadStartCapture',
    'onPause',
    'onPauseCapture',
    'onPlay',
    'onPlayCapture',
    'onPlaying',
    'onPlayingCapture',
    'onProgress',
    'onProgressCapture',
    'onRateChange',
    'onRateChangeCapture',
    'onSeeked',
    'onSeekedCapture',
    'onSeeking',
    'onSeekingCapture',
    'onStalled',
    'onStalledCapture',
    'onSuspend',
    'onSuspendCapture',
    'onTimeUpdate',
    'onTimeUpdateCapture',
    'onVolumeChange',
    'onVolumeChangeCapture',
    'onWaiting',
    'onWaitingCapture',
    'onAuxClick',
    'onAuxClickCapture',
    'onClick',
    'onClickCapture',
    'onContextMenu',
    'onContextMenuCapture',
    'onDoubleClick',
    'onDoubleClickCapture',
    'onDrag',
    'onDragCapture',
    'onDragEnd',
    'onDragEndCapture',
    'onDragEnter',
    'onDragEnterCapture',
    'onDragExit',
    'onDragExitCapture',
    'onDragLeave',
    'onDragLeaveCapture',
    'onDragOver',
    'onDragOverCapture',
    'onDragStart',
    'onDragStartCapture',
    'onDrop',
    'onDropCapture',
    'onMouseDown',
    'onMouseDownCapture',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseMoveCapture',
    'onMouseOut',
    'onMouseOutCapture',
    'onMouseOver',
    'onMouseOverCapture',
    'onMouseUp',
    'onMouseUpCapture',
    'onSelect',
    'onSelectCapture',
    'onTouchCancel',
    'onTouchCancelCapture',
    'onTouchEnd',
    'onTouchEndCapture',
    'onTouchMove',
    'onTouchMoveCapture',
    'onTouchStart',
    'onTouchStartCapture',
    'onPointerDown',
    'onPointerDownCapture',
    'onPointerMove',
    'onPointerMoveCapture',
    'onPointerUp',
    'onPointerUpCapture',
    'onPointerCancel',
    'onPointerCancelCapture',
    'onPointerEnter',
    'onPointerEnterCapture',
    'onPointerLeave',
    'onPointerLeaveCapture',
    'onPointerOver',
    'onPointerOverCapture',
    'onPointerOut',
    'onPointerOutCapture',
    'onGotPointerCapture',
    'onGotPointerCaptureCapture',
    'onLostPointerCapture',
    'onLostPointerCaptureCapture',
    'onScroll',
    'onScrollCapture',
    'onWheel',
    'onWheelCapture',
    'onAnimationStart',
    'onAnimationStartCapture',
    'onAnimationEnd',
    'onAnimationEndCapture',
    'onAnimationIteration',
    'onAnimationIterationCapture',
    'onTransitionEnd',
    'onTransitionEndCapture'
];
function isEventKey(key) {
    if (typeof key !== 'string') {
        return false;
    }
    var allowedEventKeys = EventKeys;
    return allowedEventKeys.includes(key);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getActiveCoordinate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateActiveTickIndex",
    ()=>calculateActiveTickIndex,
    "getActiveCartesianCoordinate",
    ()=>getActiveCartesianCoordinate,
    "getActivePolarCoordinate",
    ()=>getActivePolarCoordinate,
    "isInCartesianRange",
    ()=>isInCartesianRange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/PolarUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
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
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer)=>{
    var entry = tooltipTicks.find((tick)=>tick && tick.index === activeIndex);
    if (entry) {
        if (layout === 'horizontal') {
            return {
                x: entry.coordinate,
                y: pointer.relativeY
            };
        }
        if (layout === 'vertical') {
            return {
                x: pointer.relativeX,
                y: entry.coordinate
            };
        }
    }
    return {
        x: 0,
        y: 0
    };
};
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj)=>{
    var entry = tooltipTicks.find((tick)=>tick && tick.index === activeIndex);
    if (entry) {
        if (layout === 'centric') {
            var _angle = entry.coordinate;
            var _radius = rangeObj.radius;
            return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
                angle: _angle,
                radius: _radius
            });
        }
        var radius = entry.coordinate;
        var angle = rangeObj.angle;
        return _objectSpread(_objectSpread(_objectSpread({}, rangeObj), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$PolarUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polarToCartesian"])(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
            angle,
            radius
        });
    }
    return {
        angle: 0,
        clockWise: false,
        cx: 0,
        cy: 0,
        endAngle: 0,
        innerRadius: 0,
        outerRadius: 0,
        radius: 0,
        startAngle: 0,
        x: 0,
        y: 0
    };
};
function isInCartesianRange(pointer, offset) {
    var x = pointer.relativeX, y = pointer.relativeY;
    return x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks, unsortedTicks, axisType, range)=>{
    var _ticks$length;
    var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
    // if there are 1 or fewer ticks or if there is no coordinate then the active tick is at index 0
    if (len <= 1 || coordinate == null) {
        return 0;
    }
    if (axisType === 'angleAxis' && range != null && Math.abs(Math.abs(range[1] - range[0]) - 360) <= 1e-6) {
        // ticks are distributed in a circle
        var span = range[1] - range[0];
        /*
     * Tick coordinates can be shifted outside of the range (e.g. by the band offset
     * that tooltip ticks receive), so both the coordinate and the intervals live
     * modulo the full circle. Testing the coordinate shifted by a whole turn in both
     * directions closes the wrap-around gap where no interval matched
     * and the active index came back as -1.
     * https://github.com/recharts/recharts/issues/5099
     */ var isInside = (lowerLimit, upperLimit, inclusiveLower)=>[
                coordinate,
                coordinate + span,
                coordinate - span
            ].some((c)=>(inclusiveLower ? c >= lowerLimit : c > lowerLimit) && c <= upperLimit);
        for(var i = 0; i < len; i++){
            var _unsortedTicks, _unsortedTicks2, _unsortedTicks$i, _unsortedTicks$, _unsortedTicks3;
            var before = i > 0 ? (_unsortedTicks = unsortedTicks[i - 1]) === null || _unsortedTicks === void 0 ? void 0 : _unsortedTicks.coordinate : (_unsortedTicks2 = unsortedTicks[len - 1]) === null || _unsortedTicks2 === void 0 ? void 0 : _unsortedTicks2.coordinate;
            var cur = (_unsortedTicks$i = unsortedTicks[i]) === null || _unsortedTicks$i === void 0 ? void 0 : _unsortedTicks$i.coordinate;
            var after = i >= len - 1 ? (_unsortedTicks$ = unsortedTicks[0]) === null || _unsortedTicks$ === void 0 ? void 0 : _unsortedTicks$.coordinate : (_unsortedTicks3 = unsortedTicks[i + 1]) === null || _unsortedTicks3 === void 0 ? void 0 : _unsortedTicks3.coordinate;
            var sameDirectionCoord = void 0;
            if (before == null || cur == null || after == null) {
                continue;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(cur - before) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(after - cur)) {
                var diffInterval = [];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(after - cur) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mathSign"])(range[1] - range[0])) {
                    sameDirectionCoord = after;
                    var curInRange = cur + range[1] - range[0];
                    diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
                    diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
                } else {
                    sameDirectionCoord = before;
                    var afterInRange = after + range[1] - range[0];
                    diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
                    diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
                }
                var sameInterval = [
                    Math.min(cur, (sameDirectionCoord + cur) / 2),
                    Math.max(cur, (sameDirectionCoord + cur) / 2)
                ];
                if (isInside(sameInterval[0], sameInterval[1], false) || isInside(diffInterval[0], diffInterval[1], true)) {
                    var _unsortedTicks$i2;
                    return (_unsortedTicks$i2 = unsortedTicks[i]) === null || _unsortedTicks$i2 === void 0 ? void 0 : _unsortedTicks$i2.index;
                }
            } else {
                var minValue = Math.min(before, after);
                var maxValue = Math.max(before, after);
                if (isInside((minValue + cur) / 2, (maxValue + cur) / 2, false)) {
                    var _unsortedTicks$i3;
                    return (_unsortedTicks$i3 = unsortedTicks[i]) === null || _unsortedTicks$i3 === void 0 ? void 0 : _unsortedTicks$i3.index;
                }
            }
        }
    } else if (ticks) {
        // ticks are distributed in a single direction
        for(var _i = 0; _i < len; _i++){
            var curr = ticks[_i];
            if (curr == null) {
                continue;
            }
            var next = ticks[_i + 1];
            var prev = ticks[_i - 1];
            if (_i === 0 && next != null && coordinate <= (curr.coordinate + next.coordinate) / 2) {
                return curr.index;
            }
            if (_i === len - 1 && prev != null && coordinate > (curr.coordinate + prev.coordinate) / 2) {
                return curr.index;
            }
            if (_i > 0 && _i < len - 1 && prev != null && next != null && coordinate > (curr.coordinate + prev.coordinate) / 2 && coordinate <= (curr.coordinate + next.coordinate) / 2) {
                return curr.index;
            }
        }
    }
    return -1;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAxisTypeBasedOnLayout",
    ()=>getAxisTypeBasedOnLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ChartUtils.js [app-client] (ecmascript)");
;
function getAxisTypeBasedOnLayout(layout, axisType, axisDomainType) {
    if (axisDomainType !== 'auto') {
        return axisDomainType;
    }
    if (layout == null) {
        return undefined;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCategoricalAxis"])(layout, axisType) ? 'category' : 'number';
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getClassNameFromUnknown.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClassNameFromUnknown",
    ()=>getClassNameFromUnknown
]);
function getClassNameFromUnknown(u) {
    if (u && typeof u === 'object' && 'className' in u && typeof u.className === 'string') {
        return u.className;
    }
    return '';
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getEveryNth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Given an array and a number N, return a new array which contains every nTh
 * element of the input array. For n below 1, an empty array is returned.
 * For n equal to 1, the input array is returned as is.
 * For n greater than the length of the array, an array containing the first element
 * and every nTh element after that (if any) is returned.
 *
 * @param array An input array.
 * @param n A number specifying which elements to take.
 * @returns The result array of the same type as the input array.
 */ __turbopack_context__.s([
    "getEveryNth",
    ()=>getEveryNth
]);
function getEveryNth(array, n) {
    if (n < 1) {
        return [];
    }
    if (n === 1) {
        return array;
    }
    var result = [];
    for(var i = 0; i < array.length; i += n){
        var item = array[i];
        if (item !== undefined) {
            result.push(item);
        }
    }
    return result;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRadiusAndStrokeWidthFromDot",
    ()=>getRadiusAndStrokeWidthFromDot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)");
;
function getRadiusAndStrokeWidthFromDot(dot) {
    var props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["svgPropertiesNoEventsFromUnknown"])(dot);
    var defaultR = 3;
    var defaultStrokeWidth = 2;
    if (props != null) {
        var r = props.r, strokeWidth = props.strokeWidth;
        var realR = Number(r);
        var realStrokeWidth = Number(strokeWidth);
        if (Number.isNaN(realR) || realR < 0) {
            realR = defaultR;
        }
        if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) {
            realStrokeWidth = defaultStrokeWidth;
        }
        return {
            r: realR,
            strokeWidth: realStrokeWidth
        };
    }
    return {
        r: defaultR,
        strokeWidth: defaultStrokeWidth
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getRelativeCoordinate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRelativeCoordinate",
    ()=>getRelativeCoordinate
]);
/**
 * Type guard to check if the pointer event is from an SVG element.
 */ function isSvgPointer(pointer) {
    return 'getBBox' in pointer.currentTarget && typeof pointer.currentTarget.getBBox === 'function';
}
function getRelativeCoordinate(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var scaleX, scaleY;
    if (isSvgPointer(event)) {
        // For SVG elements, use getBBox() to get the intrinsic size in SVG coordinates
        var bbox = event.currentTarget.getBBox();
        scaleX = bbox.width > 0 ? rect.width / bbox.width : 1;
        scaleY = bbox.height > 0 ? rect.height / bbox.height : 1;
    } else {
        // For HTML elements, use offsetWidth/offsetHeight
        var element = event.currentTarget;
        scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
        scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : 1;
    }
    var getCoordinates = (clientX, clientY)=>({
            /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */ relativeX: Math.round((clientX - rect.left) / scaleX),
            relativeY: Math.round((clientY - rect.top) / scaleY)
        });
    if ('touches' in event) {
        return Array.from(event.touches).map((touch)=>getCoordinates(touch.clientX, touch.clientY));
    }
    return getCoordinates(event.clientX, event.clientY);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/getSliced.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSliced",
    ()=>getSliced
]);
function getSliced(arr, startIndex, endIndex) {
    if (!Array.isArray(arr)) {
        return arr;
    }
    if (arr && startIndex + endIndex !== 0) {
        return arr.slice(startIndex, endIndex + 1);
    }
    return arr;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isDomainSpecifiedByUser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extendDomain",
    ()=>extendDomain,
    "isWellFormedNumberDomain",
    ()=>isWellFormedNumberDomain,
    "numericalDomainSpecifiedWithoutRequiringData",
    ()=>numericalDomainSpecifiedWithoutRequiringData,
    "parseNumericalUserDomain",
    ()=>parseNumericalUserDomain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/ChartUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
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
function isWellFormedNumberDomain(v) {
    if (Array.isArray(v) && v.length === 2) {
        var _v = _slicedToArray(v, 2), min = _v[0], max = _v[1];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(min) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(max)) {
            return true;
        }
    }
    return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
    if (allowDataOverflow) {
        // If the data are allowed to overflow - we're fine with whatever user provided
        return providedDomain;
    }
    /*
   * If the data are not allowed to overflow - we need to extend the domain.
   * Means that effectively the user is allowed to make the domain larger
   * but not smaller.
   */ return [
        Math.min(providedDomain[0], boundaryDomain[0]),
        Math.max(providedDomain[1], boundaryDomain[1])
    ];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
    if (!allowDataOverflow) {
        // Cannot compute data overflow if the data is not provided
        return undefined;
    }
    if (typeof userDomain === 'function') {
        // The user function expects the data to be provided as an argument
        return undefined;
    }
    if (Array.isArray(userDomain) && userDomain.length === 2) {
        var _userDomain = _slicedToArray(userDomain, 2), providedMin = _userDomain[0], providedMax = _userDomain[1];
        var finalMin, finalMax;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(providedMin)) {
            finalMin = providedMin;
        } else if (typeof providedMin === 'function') {
            // The user function expects the data to be provided as an argument
            return undefined;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(providedMax)) {
            finalMax = providedMax;
        } else if (typeof providedMax === 'function') {
            // The user function expects the data to be provided as an argument
            return undefined;
        }
        var candidate = [
            finalMin,
            finalMax
        ];
        if (isWellFormedNumberDomain(candidate)) {
            return candidate;
        }
    }
    return undefined;
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
    if (!allowDataOverflow && dataDomain == null) {
        // Cannot compute data overflow if the data is not provided
        return undefined;
    }
    if (typeof userDomain === 'function' && dataDomain != null) {
        try {
            var result = userDomain(dataDomain, allowDataOverflow);
            if (isWellFormedNumberDomain(result)) {
                return extendDomain(result, dataDomain, allowDataOverflow);
            }
        } catch (_unused) {
        /* ignore the exception and compute domain from data later */ }
    }
    if (Array.isArray(userDomain) && userDomain.length === 2) {
        var _userDomain2 = _slicedToArray(userDomain, 2), providedMin = _userDomain2[0], providedMax = _userDomain2[1];
        var finalMin, finalMax;
        if (providedMin === 'auto') {
            if (dataDomain != null) {
                finalMin = Math.min(...dataDomain);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(providedMin)) {
            finalMin = providedMin;
        } else if (typeof providedMin === 'function') {
            try {
                if (dataDomain != null) {
                    finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
                }
            } catch (_unused2) {
            /* ignore the exception and compute domain from data later */ }
        } else if (typeof providedMin === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_VALUE_REG"].test(providedMin)) {
            var match = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_VALUE_REG"].exec(providedMin);
            if (match == null || match[1] == null || dataDomain == null) {
                finalMin = undefined;
            } else {
                var value = +match[1];
                finalMin = dataDomain[0] - value;
            }
        } else {
            finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
        }
        if (providedMax === 'auto') {
            if (dataDomain != null) {
                finalMax = Math.max(...dataDomain);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(providedMax)) {
            finalMax = providedMax;
        } else if (typeof providedMax === 'function') {
            try {
                if (dataDomain != null) {
                    finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
                }
            } catch (_unused3) {
            /* ignore the exception and compute domain from data later */ }
        } else if (typeof providedMax === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_VALUE_REG"].test(providedMax)) {
            var _match = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$ChartUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_VALUE_REG"].exec(providedMax);
            if (_match == null || _match[1] == null || dataDomain == null) {
                finalMax = undefined;
            } else {
                var _value = +_match[1];
                finalMax = dataDomain[1] + _value;
            }
        } else {
            finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
        }
        var candidate = [
            finalMin,
            finalMax
        ];
        if (isWellFormedNumberDomain(candidate)) {
            if (dataDomain == null) {
                return candidate;
            }
            return extendDomain(candidate, dataDomain, allowDataOverflow);
        }
    }
    return undefined;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPositiveNumber",
    ()=>isPositiveNumber,
    "isWellBehavedNumber",
    ()=>isWellBehavedNumber
]);
function isWellBehavedNumber(n) {
    return Number.isFinite(n);
}
function isPositiveNumber(n) {
    return typeof n === 'number' && n > 0 && Number.isFinite(n);
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/payload/getUniqPayload.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUniqPayload",
    ()=>getUniqPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$array$2f$uniqBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__uniqBy__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/es-toolkit@1.52.0/node_modules/es-toolkit/dist/compat/array/uniqBy.mjs [app-client] (ecmascript) <export uniqBy as default>");
;
function getUniqPayload(payload, option, defaultUniqBy) {
    if (option === true) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$array$2f$uniqBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__uniqBy__as__default$3e$__["default"])(payload, defaultUniqBy);
    }
    if (typeof option === 'function') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$es$2d$toolkit$40$1$2e$52$2e$0$2f$node_modules$2f$es$2d$toolkit$2f$dist$2f$compat$2f$array$2f$uniqBy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__uniqBy__as__default$3e$__["default"])(payload, option);
    }
    return payload;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/propsAreEqual.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "propsAreEqual",
    ()=>propsAreEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$3$2e$0_$40$types$2b$react$40$19$2e$2$2e$18_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-redux@9.3.0_@types+react@19.2.18_react@19.2.8_redux@5.0.1/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
;
var propsToShallowCompare = new Set([
    'axisLine',
    'tickLine',
    'activeBar',
    'activeDot',
    'activeLabel',
    'activeShape',
    'allowEscapeViewBox',
    'background',
    'cursor',
    'dot',
    'label',
    'line',
    'margin',
    'padding',
    'position',
    'shape',
    'style',
    'tick',
    'wrapperStyle',
    // radius can be an array of 4 numbers, easy to compare shallowly
    'radius',
    'throttledEvents'
]);
/**
 * When comparing two values, returns true if they are the same value or
 * are both NaN.
 *
 * If we used just a simple triple equals, we would get false negatives for two NaNs
 * which could cause extra re-renders so let's have this instead.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#same-value-zero_equality
 *
 * @param x first value to compare
 * @param y second value to compare
 * return true if the same, false if different
 */ function sameValueZero(x, y) {
    if (x == null && y == null) {
        /*
     * treat null and undefined as equal. Internally in Recharts we make no difference between these two
     * so there is no need to re-render.
     */ return true;
    }
    if (typeof x === 'number' && typeof y === 'number') {
        // x and y are equal (this is true for -0 and 0) or they are both NaN
        // eslint-disable-next-line no-self-compare
        return x === y || x !== x && y !== y;
    }
    return x === y;
}
function propsAreEqual(prevProps, nextProps) {
    var allKeys = new Set([
        ...Object.keys(prevProps),
        ...Object.keys(nextProps)
    ]);
    for (var key of allKeys){
        /*
     * If a key is on a special allowlist, go one level deeper
     * and do a shallow comparison of the values.
     */ if (propsToShallowCompare.has(key)) {
            if (prevProps[key] == null && nextProps[key] == null) {
                continue;
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$3$2e$0_$40$types$2b$react$40$19$2e$2$2e$18_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqual"])(prevProps[key], nextProps[key])) {
                return false;
            }
        /*
       * Otherwise do a simple same-value comparison (with NaN support).
       */ } else if (!sameValueZero(prevProps[key], nextProps[key])) {
            return false;
        }
    }
    return true;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/resolveDefaultProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveDefaultProps",
    ()=>resolveDefaultProps
]);
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
function resolveDefaultProps(realProps, defaultProps) {
    /*
   * To avoid mutating the original `realProps` object passed to the function, create a shallow copy of it.
   * `resolvedProps` will be modified directly with the defaults.
   */ var resolvedProps = _objectSpread({}, realProps);
    /*
   * Since the function guarantees `D extends Partial<T>`, this assignment is safe.
   * It allows TypeScript to work with the well-defined `Partial<T>` type inside the loop,
   * making subsequent type inference (especially for `dp[key]`) much more straightforward for the compiler.
   * This is a key step to improve type safety *without* value assertions later.
   */ var dp = defaultProps;
    /*
   * `Object.keys` doesn't preserve strong key types - it always returns Array<string>.
   * However, due to the `D extends Partial<T>` constraint,
   * we know these keys *must* also be valid keys of `T`.
   * This assertion informs TypeScript of this relationship, avoiding type errors when using `key` to index `acc` (type T).
   *
   * Type assertions are not sound but in this case it's necessary
   * as `Object.keys` does not do what we want it to do.
   */ var keys = Object.keys(defaultProps);
    var withDefaults = keys.reduce((acc, key)=>{
        if (acc[key] === undefined && dp[key] !== undefined) {
            acc[key] = dp[key];
        }
        return acc;
    }, resolvedProps);
    /*
   * And again type assertions are not safe but here we have done the runtime work
   * so let's bypass the lack of static type safety and tell the compiler what happened.
   */ return withDefaults;
} /**
 * Helper type to extract the keys of T that are required.
 * It iterates through each key K in T. If Pick<T, K> cannot be assigned an empty object {},
 * it means K is required, so we keep K; otherwise, we discard it (never).
 * [keyof T] at the end creates a union of the kept keys.
 */  /**
 * Helper type to extract the keys of T that are optional.
 * It iterates through each key K in T. If Pick<T, K> can be assigned an empty object {},
 * it means K is optional (or potentially missing), so we keep K; otherwise, we discard it (never).
 * [keyof T] at the end creates a union of the kept keys.
 */  /**
 * Helper type to ensure keys of D exist in T.
 * For each key K in D, if K is also a key of T, keep the type D[K].
 * If K is NOT a key of T, map it to type `never`.
 * An object cannot have a property of type `never`, effectively disallowing extra keys.
 */  /**
 * This type will take a source type `Props` and a default type `Defaults` and will return a new type
 * where all properties that are optional in `Props` but required in `Defaults` are made required in the result.
 * Properties that are required in `Props` and optional in `Defaults` will remain required.
 * Properties that are optional in both `Props` and `Defaults` will remain optional.
 *
 * This is useful for creating a type that represents the resolved props of a component with default props.
 */ 
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/round.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "round",
    ()=>round,
    "roundTemplateLiteral",
    ()=>roundTemplateLiteral
]);
// if you go lower than 3, wild wild things happen during rendering
var defaultRoundPrecision = 4;
function round(num) {
    var roundPrecision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRoundPrecision;
    var factor = 10 ** roundPrecision;
    var rounded = Math.round(num * factor) / factor;
    if (Object.is(rounded, -0)) {
        return 0;
    }
    return rounded;
}
function roundTemplateLiteral(strings) {
    for(var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        values[_key - 1] = arguments[_key];
    }
    return strings.reduce((result, string, i)=>{
        var value = values[i - 1];
        if (typeof value === 'string') {
            return result + value + string;
        }
        if (value !== undefined) {
            return result + round(value) + string;
        }
        return result + string;
    }, '');
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/scale/RechartsScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * This is internal representation of scale used in Recharts.
 * Users will provide CustomScaleDefinition or a string, which we will parse into RechartsScale.
 * Most importantly, RechartsScale is fully immutable - there are no setters that mutate the scale in place.
 * This is important for React integration - if the scale changes, we want to trigger re-renders.
 * Mutating the scale in place would not trigger re-renders, leading to stale UI.
 */ /**
 * Position within a band for banded scales.
 * In scales that are not banded, this parameter is ignored.
 *
 * @inline
 */ __turbopack_context__.s([
    "rechartsScaleFactory",
    ()=>rechartsScaleFactory
]);
function rechartsScaleFactory(d3Scale) {
    if (d3Scale == null) {
        return undefined;
    }
    var ticksFn = d3Scale.ticks;
    var bandwidthFn = d3Scale.bandwidth;
    var d3Range = d3Scale.range();
    var range = [
        Math.min(...d3Range),
        Math.max(...d3Range)
    ];
    return {
        domain: ()=>d3Scale.domain(),
        range: function(_range) {
            function range() {
                return _range.apply(this, arguments);
            }
            range.toString = function() {
                return _range.toString();
            };
            return range;
        }(()=>range),
        rangeMin: ()=>range[0],
        rangeMax: ()=>range[1],
        isInRange (value) {
            var first = range[0];
            var last = range[1];
            return first <= last ? value >= first && value <= last : value >= last && value <= first;
        },
        bandwidth: bandwidthFn ? ()=>bandwidthFn.call(d3Scale) : undefined,
        ticks: ticksFn ? (count)=>ticksFn.call(d3Scale, count) : undefined,
        map: (input, options)=>{
            var baseValue = d3Scale(input);
            if (baseValue == null) {
                return undefined;
            }
            if (d3Scale.bandwidth && options !== null && options !== void 0 && options.position) {
                var bandWidth = d3Scale.bandwidth();
                switch(options.position){
                    case 'middle':
                        baseValue += bandWidth / 2;
                        break;
                    case 'end':
                        baseValue += bandWidth;
                        break;
                    default:
                        break;
                }
            }
            return baseValue;
        }
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/scale/createCategoricalInverse.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Binary search to find the index where x would fit in array a.
 * Works for arrays that are sorted both ascending and descending.
 *
 * Unlike d3.bisect, this implementation handles both ascending and descending arrays.
 *
 * @param haystack Sorted array of numbers
 * @param needle Number to find the insertion index for
 * @returns Index where x would fit in array a
 */ __turbopack_context__.s([
    "bisect",
    ()=>bisect,
    "createCategoricalInverse",
    ()=>createCategoricalInverse
]);
function bisect(haystack, needle) {
    var lo = 0;
    var hi = haystack.length;
    var ascending = haystack[0] < haystack[haystack.length - 1];
    while(lo < hi){
        var mid = Math.floor((lo + hi) / 2);
        if (ascending ? haystack[mid] < needle : haystack[mid] > needle) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}
function createCategoricalInverse(scale, allDataPointsOnAxis) {
    if (!scale) {
        return undefined;
    }
    var domain = allDataPointsOnAxis !== null && allDataPointsOnAxis !== void 0 ? allDataPointsOnAxis : scale.domain();
    // Build an array of pixel positions for each domain value
    // @ts-expect-error we're attempting to scale unknown without having guarantee that it is a Domain type
    var pixelPositions = domain.map((d)=>{
        var _scale;
        return (_scale = scale(d)) !== null && _scale !== void 0 ? _scale : 0;
    });
    var range = scale.range();
    if (domain.length === 0 || range.length < 2) {
        return undefined;
    }
    return (pixelValue)=>{
        var _pixelPositions, _pixelPositions$index;
        // Find the closest domain value using bisect
        var index = bisect(pixelPositions, pixelValue);
        // Clamp to valid range
        if (index <= 0) {
            return domain[0];
        }
        if (index >= domain.length) {
            return domain[domain.length - 1];
        }
        // Check which neighbor is closer
        var leftPixel = (_pixelPositions = pixelPositions[index - 1]) !== null && _pixelPositions !== void 0 ? _pixelPositions : 0;
        var rightPixel = (_pixelPositions$index = pixelPositions[index]) !== null && _pixelPositions$index !== void 0 ? _pixelPositions$index : 0;
        if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) {
            return domain[index - 1];
        }
        return domain[index];
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/scale/getNiceTickValues.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateStep",
    ()=>_calculateStep,
    "getAdaptiveStep",
    ()=>getAdaptiveStep,
    "getNiceTickValues",
    ()=>getNiceTickValues,
    "getSnap125Step",
    ()=>getSnap125Step,
    "getTickOfSingleValue",
    ()=>getTickOfSingleValue,
    "getTickValuesFixedDomain",
    ()=>getTickValuesFixedDomain,
    "getValidInterval",
    ()=>getValidInterval
]);
/**
 * @fileOverview calculate tick values of scale
 * @author xile611, arcthur
 * @date 2015-09-17
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/decimal.js-light@2.5.1/node_modules/decimal.js-light/decimal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$scale$2f$util$2f$arithmetic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/scale/util/arithmetic.js [app-client] (ecmascript)");
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
var getValidInterval = (_ref)=>{
    var _ref2 = _slicedToArray(_ref, 2), min = _ref2[0], max = _ref2[1];
    var validMin = min, validMax = max;
    // exchange
    if (min > max) {
        validMin = max;
        validMax = min;
    }
    return [
        validMin,
        validMax
    ];
};
var getAdaptiveStep = (roughStep, allowDecimals, correctionFactor)=>{
    if (roughStep.lte(0)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0);
    }
    var digitCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$scale$2f$util$2f$arithmetic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDigitCount"])(roughStep.toNumber());
    // The ratio between the rough step and the smallest number which has a bigger
    // order of magnitudes than the rough step
    var digitCountValue = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](10).pow(digitCount);
    var stepRatio = roughStep.div(digitCountValue);
    // When an integer and a float multiplied, the accuracy of result may be wrong
    var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
    var amendStepRatio = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
    var formatStep = amendStepRatio.mul(digitCountValue);
    return allowDecimals ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](formatStep.toNumber()) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.ceil(formatStep.toNumber()));
};
var getSnap125Step = (roughStep, allowDecimals, correctionFactor)=>{
    var _NICE_STEPS$niceIdx;
    if (roughStep.lte(0)) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0);
    }
    var NICE_STEPS = [
        1,
        2,
        2.5,
        5
    ];
    var roughNum = roughStep.toNumber();
    var exponent = Math.floor(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](roughNum).abs().log(10).toNumber());
    var magnitude = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](10).pow(exponent);
    // normalized is in the range [1, 10)
    var normalized = roughStep.div(magnitude).toNumber();
    // Find the smallest nice step >= normalized (ceiling)
    var niceIdx = NICE_STEPS.findIndex((s)=>s >= normalized - 1e-10);
    if (niceIdx === -1) {
        // normalized > 5 (e.g. 7.3), move to next order of magnitude
        magnitude = magnitude.mul(10);
        niceIdx = 0;
    }
    // Apply correction factor by stepping through the nice number sequence
    niceIdx += correctionFactor;
    if (niceIdx >= NICE_STEPS.length) {
        var extraMag = Math.floor(niceIdx / NICE_STEPS.length);
        niceIdx %= NICE_STEPS.length;
        magnitude = magnitude.mul(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](10).pow(extraMag));
    }
    var niceStep = (_NICE_STEPS$niceIdx = NICE_STEPS[niceIdx]) !== null && _NICE_STEPS$niceIdx !== void 0 ? _NICE_STEPS$niceIdx : 1;
    var formatStep = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](niceStep).mul(magnitude);
    return allowDecimals ? formatStep : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals)=>{
    var step = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](1);
    // calculate the middle value of ticks
    var middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](value);
    if (!middle.isint() && allowDecimals) {
        var absVal = Math.abs(value);
        if (absVal < 1) {
            // The step should be a float number when the difference is smaller than 1
            step = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](10).pow((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$scale$2f$util$2f$arithmetic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDigitCount"])(value) - 1);
            middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.floor(middle.div(step).toNumber())).mul(step);
        } else if (absVal > 1) {
            // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
            middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.floor(value));
        }
    } else if (value === 0) {
        middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.floor((tickCount - 1) / 2));
    } else if (!allowDecimals) {
        middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Math.floor(value));
    }
    var middleIndex = Math.floor((tickCount - 1) / 2);
    var ticks = [];
    for(var i = 0; i < tickCount; i++){
        ticks.push(middle.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i - middleIndex).mul(step)).toNumber());
    }
    return ticks;
};
/**
 * Calculate the step
 *
 * @param  min              The minimum value of an interval
 * @param  max              The maximum value of an interval
 * @param  tickCount        The count of ticks
 * @param  allowDecimals    Allow the ticks to be decimals or not
 * @param  correctionFactor A correction factor
 * @return The step, minimum value of ticks, maximum value of ticks
 */ var _calculateStep = function calculateStep(min, max, tickCount, allowDecimals) {
    var correctionFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var stepFn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : getAdaptiveStep;
    // dirty hack (for recharts' test)
    if (!Number.isFinite((max - min) / (tickCount - 1))) {
        return {
            step: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0),
            tickMin: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0),
            tickMax: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0)
        };
    }
    // The step which is easy to understand between two ticks
    var step = stepFn(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
    // A medial value of ticks
    var middle;
    // When 0 is inside the interval, 0 should be a tick
    if (min <= 0 && max >= 0) {
        middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0);
    } else {
        // calculate the middle value
        middle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](min).add(max).div(2);
        // minus modulo value
        middle = middle.sub(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](middle).mod(step));
    }
    var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
    var upCount = Math.ceil(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](max).sub(middle).div(step).toNumber());
    var scaleCount = belowCount + upCount + 1;
    if (scaleCount > tickCount) {
        // When more ticks need to cover the interval, step should be bigger.
        return _calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1, stepFn);
    }
    if (scaleCount < tickCount) {
        // When less ticks can cover the interval, we should add some additional ticks
        upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
        belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
    }
    return {
        step,
        tickMin: middle.sub(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](belowCount).mul(step)),
        tickMax: middle.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](upCount).mul(step))
    };
};
;
var getNiceTickValues = function getNiceTickValues(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), min = _ref4[0], max = _ref4[1];
    var tickCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
    var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var niceTicksMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
    // More than two ticks should be return
    var count = Math.max(tickCount, 2);
    var _getValidInterval = getValidInterval([
        min,
        max
    ]), _getValidInterval2 = _slicedToArray(_getValidInterval, 2), cormin = _getValidInterval2[0], cormax = _getValidInterval2[1];
    if (cormin === -Infinity || cormax === Infinity) {
        var _values = cormax === Infinity ? [
            cormin,
            ...Array(tickCount - 1).fill(Infinity)
        ] : [
            ...Array(tickCount - 1).fill(-Infinity),
            cormax
        ];
        return min > max ? _values.reverse() : _values;
    }
    if (cormin === cormax) {
        return getTickOfSingleValue(cormin, tickCount, allowDecimals);
    }
    var stepFn = niceTicksMode === 'snap125' ? getSnap125Step : getAdaptiveStep;
    // Get the step between two ticks
    var _calculateStep2 = _calculateStep(cormin, cormax, count, allowDecimals, 0, stepFn), step = _calculateStep2.step, tickMin = _calculateStep2.tickMin, tickMax = _calculateStep2.tickMax;
    var values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$scale$2f$util$2f$arithmetic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rangeStep"])(tickMin, tickMax.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](0.1).mul(step)), step);
    return min > max ? values.reverse() : values;
};
var getTickValuesFixedDomain = function getTickValuesFixedDomain(_ref5, tickCount) {
    var _ref6 = _slicedToArray(_ref5, 2), min = _ref6[0], max = _ref6[1];
    var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var niceTicksMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
    // More than two ticks should be return
    var _getValidInterval3 = getValidInterval([
        min,
        max
    ]), _getValidInterval4 = _slicedToArray(_getValidInterval3, 2), cormin = _getValidInterval4[0], cormax = _getValidInterval4[1];
    if (cormin === -Infinity || cormax === Infinity) {
        return [
            min,
            max
        ];
    }
    if (cormin === cormax) {
        return [
            cormin
        ];
    }
    var stepFn = niceTicksMode === 'snap125' ? getSnap125Step : getAdaptiveStep;
    var count = Math.max(tickCount, 2);
    var step = stepFn(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](cormax).sub(cormin).div(count - 1), allowDecimals, 0);
    var values = [
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$scale$2f$util$2f$arithmetic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rangeStep"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](cormin), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](cormax), step),
        cormax
    ];
    if (allowDecimals === false) {
        /*
     * allowDecimals is false means that we want to have integer ticks.
     * The step is guaranteed to be an integer in the code above which is great start
     * but when the first step is not an integer, it will start stepping from a decimal value anyway.
     * So we need to round all the values to integers after the fact.
     * The domain boundary (cormax) is appended after the rangeStep values. When
     * cormax rounds down to the same integer as the last rangeStep value, we end up
     * with a duplicate trailing tick. Remove it.
     */ values = values.map((value)=>Math.round(value));
        var last = values.length - 1;
        if (last > 0 && values[last] === values[last - 1]) {
            values = values.slice(0, last);
        }
    }
    return min > max ? values.reverse() : values;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/scale/util/arithmetic.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDigitCount",
    ()=>getDigitCount,
    "rangeStep",
    ()=>rangeStep
]);
/**
 * @fileOverview Some common arithmetic methods
 * @author xile611
 * @date 2015-09-17
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/decimal.js-light@2.5.1/node_modules/decimal.js-light/decimal.js [app-client] (ecmascript)");
;
/**
 * Get the digit count of a number.
 * If the absolute value is in the interval [0.1, 1), the result is 0.
 * If the absolute value is in the interval [0.01, 0.1), the digit count is -1.
 * If the absolute value is in the interval [0.001, 0.01), the digit count is -2.
 *
 * @param  {Number} value The number
 * @return {Integer}      Digit count
 */ function getDigitCount(value) {
    var result;
    if (value === 0) {
        result = 1;
    } else {
        result = Math.floor(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](value).abs().log(10).toNumber()) + 1;
    }
    return result;
}
/**
 * Get the data in the interval [start, end) with a fixed step.
 * Also handles JS calculation precision issues.
 *
 * @param  {Decimal} start Start point
 * @param  {Decimal} end   End point, not included
 * @param  {Decimal} step  Step size
 * @return {Array}         Array of numbers
 */ function rangeStep(start, end, step) {
    var num = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$decimal$2e$js$2d$light$40$2$2e$5$2e$1$2f$node_modules$2f$decimal$2e$js$2d$light$2f$decimal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](start);
    var i = 0;
    var result = [];
    // magic number to prevent infinite loop
    while(num.lt(end) && i < 100000){
        result.push(num.toNumber());
        num = num.add(step);
        i++;
    }
    return result;
}
;
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Returns identifier for stack series which is one individual graphical item in the stack.
 * @param graphicalItem - The graphical item representing the series in the stack.
 * @return The identifier for the series in the stack
 */ __turbopack_context__.s([
    "getStackSeriesIdentifier",
    ()=>getStackSeriesIdentifier
]);
function getStackSeriesIdentifier(graphicalItem) {
    return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesAndEvents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "svgPropertiesAndEvents",
    ()=>svgPropertiesAndEvents,
    "svgPropertiesAndEventsFromUnknown",
    ()=>svgPropertiesAndEventsFromUnknown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$excludeEventProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/excludeEventProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)");
;
;
;
function svgPropertiesAndEvents(obj) {
    var result = {};
    // for ... in loop is 10x faster than Object.entries + filter + Object.fromEntries in Chrome
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSvgElementPropKey"])(key) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$svgPropertiesNoEvents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDataAttribute"])(key) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$excludeEventProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventKey"])(key)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
function svgPropertiesAndEventsFromUnknown(input) {
    if (input == null) {
        return null;
    }
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(input)) {
        // @ts-expect-error we can't type this better because input can be any React element
        return svgPropertiesAndEvents(input.props);
    }
    if (typeof input === 'object' && !Array.isArray(input)) {
        return svgPropertiesAndEvents(input);
    }
    return null;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/svgPropertiesNoEvents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDataAttribute",
    ()=>isDataAttribute,
    "isSvgElementPropKey",
    ()=>isSvgElementPropKey,
    "svgPropertiesNoEvents",
    ()=>svgPropertiesNoEvents,
    "svgPropertiesNoEventsFromUnknown",
    ()=>svgPropertiesNoEventsFromUnknown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var SVGElementPropKeys = [
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-busy',
    'aria-checked',
    'aria-colcount',
    'aria-colindex',
    'aria-colspan',
    'aria-controls',
    'aria-current',
    'aria-describedby',
    'aria-details',
    'aria-disabled',
    'aria-errormessage',
    'aria-expanded',
    'aria-flowto',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-keyshortcuts',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-modal',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-placeholder',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-roledescription',
    'aria-rowcount',
    'aria-rowindex',
    'aria-rowspan',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'className',
    'color',
    'height',
    'id',
    'lang',
    'max',
    'media',
    'method',
    'min',
    'name',
    'style',
    /*
 * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
 * that can use it, and it conflicts with the recharts prop 'type'
 * https://github.com/recharts/recharts/pull/3327
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
 */ // 'type',
    'target',
    'width',
    'role',
    'tabIndex',
    'accentHeight',
    'accumulate',
    'additive',
    'alignmentBaseline',
    'allowReorder',
    'alphabetic',
    'amplitude',
    'arabicForm',
    'ascent',
    'attributeName',
    'attributeType',
    'autoReverse',
    'azimuth',
    'baseFrequency',
    'baselineShift',
    'baseProfile',
    'bbox',
    'begin',
    'bias',
    'by',
    'calcMode',
    'capHeight',
    'clip',
    'clipPath',
    'clipPathUnits',
    'clipRule',
    'colorInterpolation',
    'colorInterpolationFilters',
    'colorProfile',
    'colorRendering',
    'contentScriptType',
    'contentStyleType',
    'cursor',
    'cx',
    'cy',
    'd',
    'decelerate',
    'descent',
    'diffuseConstant',
    'direction',
    'display',
    'divisor',
    'dominantBaseline',
    'dur',
    'dx',
    'dy',
    'edgeMode',
    'elevation',
    'enableBackground',
    'end',
    'exponent',
    'externalResourcesRequired',
    'fill',
    'fillOpacity',
    'fillRule',
    'filter',
    'filterRes',
    'filterUnits',
    'floodColor',
    'floodOpacity',
    'focusable',
    'fontFamily',
    'fontSize',
    'fontSizeAdjust',
    'fontStretch',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'format',
    'from',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyphName',
    'glyphOrientationHorizontal',
    'glyphOrientationVertical',
    'glyphRef',
    'gradientTransform',
    'gradientUnits',
    'hanging',
    'horizAdvX',
    'horizOriginX',
    'href',
    'ideographic',
    'imageRendering',
    'in2',
    'in',
    'intercept',
    'k1',
    'k2',
    'k3',
    'k4',
    'k',
    'kernelMatrix',
    'kernelUnitLength',
    'kerning',
    'keyPoints',
    'keySplines',
    'keyTimes',
    'lengthAdjust',
    'letterSpacing',
    'lightingColor',
    'limitingConeAngle',
    'local',
    'markerEnd',
    'markerHeight',
    'markerMid',
    'markerStart',
    'markerUnits',
    'markerWidth',
    'mask',
    'maskContentUnits',
    'maskUnits',
    'mathematical',
    'mode',
    'numOctaves',
    'offset',
    'opacity',
    'operator',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'overlinePosition',
    'overlineThickness',
    'paintOrder',
    'panose1',
    'pathLength',
    'patternContentUnits',
    'patternTransform',
    'patternUnits',
    'pointerEvents',
    'pointsAtX',
    'pointsAtY',
    'pointsAtZ',
    'preserveAlpha',
    'preserveAspectRatio',
    'primitiveUnits',
    'r',
    'radius',
    'refX',
    'refY',
    'renderingIntent',
    'repeatCount',
    'repeatDur',
    'requiredExtensions',
    'requiredFeatures',
    'restart',
    'result',
    'rotate',
    'rx',
    'ry',
    'seed',
    'shapeRendering',
    'slope',
    'spacing',
    'specularConstant',
    'specularExponent',
    'speed',
    'spreadMethod',
    'startOffset',
    'stdDeviation',
    'stemh',
    'stemv',
    'stitchTiles',
    'stopColor',
    'stopOpacity',
    'strikethroughPosition',
    'strikethroughThickness',
    'string',
    'stroke',
    'strokeDasharray',
    'strokeDashoffset',
    'strokeLinecap',
    'strokeLinejoin',
    'strokeMiterlimit',
    'strokeOpacity',
    'strokeWidth',
    'surfaceScale',
    'systemLanguage',
    'tableValues',
    'targetX',
    'targetY',
    'textAnchor',
    'textDecoration',
    'textLength',
    'textRendering',
    'to',
    'transform',
    'u1',
    'u2',
    'underlinePosition',
    'underlineThickness',
    'unicode',
    'unicodeBidi',
    'unicodeRange',
    'unitsPerEm',
    'vAlphabetic',
    'values',
    'vectorEffect',
    'version',
    'vertAdvY',
    'vertOriginX',
    'vertOriginY',
    'vHanging',
    'vIdeographic',
    'viewTarget',
    'visibility',
    'vMathematical',
    'widths',
    'wordSpacing',
    'writingMode',
    'x1',
    'x2',
    'x',
    'xChannelSelector',
    'xHeight',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkHref',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlBase',
    'xmlLang',
    'xmlns',
    'xmlnsXlink',
    'xmlSpace',
    'y1',
    'y2',
    'y',
    'yChannelSelector',
    'z',
    'zoomAndPan',
    'ref',
    'key',
    'angle'
];
var SVGElementPropKeySet = new Set(SVGElementPropKeys);
function isSvgElementPropKey(key) {
    if (typeof key !== 'string') {
        return false;
    }
    return SVGElementPropKeySet.has(key);
}
function isDataAttribute(key) {
    return typeof key === 'string' && key.startsWith('data-');
}
function svgPropertiesNoEvents(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return {};
    }
    var result = {};
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (isSvgElementPropKey(key) || isDataAttribute(key)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
function svgPropertiesNoEventsFromUnknown(input) {
    if (input == null) {
        return null;
    }
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(input) && typeof input.props === 'object' && input.props !== null) {
        var p = input.props;
        return svgPropertiesNoEvents(p);
    }
    if (typeof input === 'object' && !Array.isArray(input)) {
        return svgPropertiesNoEvents(input);
    }
    return null;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/tooltip/translate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTooltipCSSClassName",
    ()=>getTooltipCSSClassName,
    "getTooltipTranslate",
    ()=>getTooltipTranslate,
    "getTooltipTranslateXY",
    ()=>getTooltipTranslateXY,
    "getTransformStyle",
    ()=>getTransformStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
;
;
var CSS_CLASS_PREFIX = 'recharts-tooltip-wrapper';
var TOOLTIP_HIDDEN = {
    visibility: 'hidden'
};
function getTooltipCSSClassName(_ref) {
    var coordinate = _ref.coordinate, translateX = _ref.translateX, translateY = _ref.translateY;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(CSS_CLASS_PREFIX, {
        ["".concat(CSS_CLASS_PREFIX, "-right")]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(translateX) && coordinate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(coordinate.x) && translateX >= coordinate.x,
        ["".concat(CSS_CLASS_PREFIX, "-left")]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(translateX) && coordinate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(coordinate.x) && translateX < coordinate.x,
        ["".concat(CSS_CLASS_PREFIX, "-bottom")]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(translateY) && coordinate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(coordinate.y) && translateY >= coordinate.y,
        ["".concat(CSS_CLASS_PREFIX, "-top")]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(translateY) && coordinate && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(coordinate.y) && translateY < coordinate.y
    });
}
function getTooltipTranslateXY(_ref2) {
    var allowEscapeViewBox = _ref2.allowEscapeViewBox, coordinate = _ref2.coordinate, key = _ref2.key, offset = _ref2.offset, position = _ref2.position, reverseDirection = _ref2.reverseDirection, tooltipDimension = _ref2.tooltipDimension, viewBox = _ref2.viewBox, viewBoxDimension = _ref2.viewBoxDimension;
    if (position && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumber"])(position[key])) {
        return position[key];
    }
    var negative = coordinate[key] - tooltipDimension - (offset > 0 ? offset : 0);
    var positive = coordinate[key] + offset;
    if (allowEscapeViewBox[key]) {
        return reverseDirection[key] ? negative : positive;
    }
    var viewBoxKey = viewBox[key];
    if (viewBoxKey == null) {
        return 0;
    }
    if (reverseDirection[key]) {
        var _tooltipBoundary = negative;
        var _viewBoxBoundary = viewBoxKey;
        if (_tooltipBoundary < _viewBoxBoundary) {
            return Math.max(positive, viewBoxKey);
        }
        return Math.max(negative, viewBoxKey);
    }
    if (viewBoxDimension == null) {
        return 0;
    }
    var tooltipBoundary = positive + tooltipDimension;
    var viewBoxBoundary = viewBoxKey + viewBoxDimension;
    if (tooltipBoundary > viewBoxBoundary) {
        return Math.max(negative, viewBoxKey);
    }
    return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
    var translateX = _ref3.translateX, translateY = _ref3.translateY, useTranslate3d = _ref3.useTranslate3d;
    return {
        transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
    };
}
function getTooltipTranslate(_ref4) {
    var allowEscapeViewBox = _ref4.allowEscapeViewBox, coordinate = _ref4.coordinate, offsetTop = _ref4.offsetTop, offsetLeft = _ref4.offsetLeft, position = _ref4.position, reverseDirection = _ref4.reverseDirection, tooltipBox = _ref4.tooltipBox, useTranslate3d = _ref4.useTranslate3d, viewBox = _ref4.viewBox;
    var cssProperties, translateX, translateY;
    if (tooltipBox && tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
        translateX = getTooltipTranslateXY({
            allowEscapeViewBox,
            coordinate,
            key: 'x',
            offset: offsetLeft,
            position,
            reverseDirection,
            tooltipDimension: tooltipBox.width,
            viewBox,
            viewBoxDimension: viewBox.width
        });
        translateY = getTooltipTranslateXY({
            allowEscapeViewBox,
            coordinate,
            key: 'y',
            offset: offsetTop,
            position,
            reverseDirection,
            tooltipDimension: tooltipBox.height,
            viewBox,
            viewBoxDimension: viewBox.height
        });
        cssProperties = getTransformStyle({
            translateX,
            translateY,
            useTranslate3d
        });
    } else {
        cssProperties = TOOLTIP_HIDDEN;
    }
    return {
        cssProperties,
        cssClasses: getTooltipCSSClassName({
            translateX,
            translateY,
            coordinate
        })
    };
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adaptEventHandlers",
    ()=>adaptEventHandlers,
    "adaptEventsOfChild",
    ()=>adaptEventsOfChild,
    "isNonEmptyArray",
    ()=>isNonEmptyArray,
    "isPolarCoordinate",
    ()=>isPolarCoordinate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$excludeEventProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/excludeEventProps.js [app-client] (ecmascript)");
;
;
var isPolarCoordinate = (c)=>{
    return 'radius' in c && 'startAngle' in c && 'endAngle' in c;
};
var adaptEventHandlers = (props, newHandler)=>{
    if (!props || typeof props === 'function' || typeof props === 'boolean') {
        return null;
    }
    var inputProps = props;
    if (/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(props)) {
        inputProps = props.props;
    }
    if (typeof inputProps !== 'object' && typeof inputProps !== 'function') {
        return null;
    }
    var out = {};
    Object.keys(inputProps).forEach((key)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$excludeEventProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventKey"])(key) && typeof inputProps[key] === 'function') {
            out[key] = newHandler || ((e)=>inputProps[key](inputProps, e));
        }
    });
    return out;
};
var getEventHandlerOfChild = (originalHandler, data, index)=>(e)=>{
        originalHandler(data, index, e);
        return null;
    };
var adaptEventsOfChild = (props, data, index)=>{
    if (props === null || typeof props !== 'object' && typeof props !== 'function') {
        return null;
    }
    var out = null;
    Object.keys(props).forEach((key)=>{
        var item = props[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$excludeEventProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEventKey"])(key) && typeof item === 'function') {
            if (!out) out = {};
            out[key] = getEventHandlerOfChild(item, data, index);
        }
    });
    return out;
};
var isNonEmptyArray = (arr)=>{
    return Array.isArray(arr) && arr.length > 0;
};
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useAnimationId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnimationId",
    ()=>useAnimationId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
;
;
function useAnimationId(input) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'animation-';
    var animationId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uniqueId"])(prefix));
    var prevProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(input);
    if (prevProps.current !== input) {
        animationId.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uniqueId"])(prefix);
        prevProps.current = input;
    }
    return animationId.current;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useElementOffset.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useElementOffset",
    ()=>useElementOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
var EPS = 1;
/**
 * Stores the dimensions and position of a DOM element as returned by `getBoundingClientRect()`.
 *
 * Values are viewport-relative and may be fractional (subpixel precision).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect}
 */ /**
 * Callback ref setter returned by {@link useElementOffset}.
 *
 * Pass this to a DOM element's `ref` prop to start observing its layout.
 *
 * @param node - the DOM element to observe, or `null` when the element unmounts
 */ /**
 * Checks whether two ElementOffset values differ by more than `EPS` (1px) in any dimension.
 *
 * @param a - the first ElementOffset to compare
 * @param b - the second ElementOffset to compare
 * @returns true if any dimension differs by more than 1px
 */ function hasSignificantChange(a, b) {
    return Math.abs(a.height - b.height) > EPS || Math.abs(a.left - b.left) > EPS || Math.abs(a.top - b.top) > EPS || Math.abs(a.width - b.width) > EPS;
}
/**
 * Reads the current bounding box of a DOM element using `getBoundingClientRect()`.
 *
 * @param node - the DOM element to measure
 * @returns an ElementOffset with the element's current dimensions and viewport-relative position
 */ function readElementOffset(node) {
    var rect = node.getBoundingClientRect();
    return {
        height: rect.height,
        left: rect.left,
        top: rect.top,
        width: rect.width
    };
}
function useElementOffset() {
    var extraDependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        height: 0,
        left: 0,
        top: 0,
        width: 0
    }), _useState2 = _slicedToArray(_useState, 2), lastBoundingBox = _useState2[0], setLastBoundingBox = _useState2[1];
    var observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var lastBoundingBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(lastBoundingBox);
    lastBoundingBoxRef.current = lastBoundingBox;
    var updateBoundingBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useElementOffset.useCallback[updateBoundingBox]": (node)=>{
            // Disconnect any previously active ResizeObserver
            if (observerRef.current != null) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            if (node != null) {
                // Measure immediately on ref attach
                var box = readElementOffset(node);
                if (hasSignificantChange(box, lastBoundingBoxRef.current)) {
                    setLastBoundingBox(box);
                }
                // Set up ResizeObserver for future size changes
                if (typeof ResizeObserver !== 'undefined') {
                    var observer = new ResizeObserver({
                        "useElementOffset.useCallback[updateBoundingBox]": ()=>{
                            var newBox = readElementOffset(node);
                            if (hasSignificantChange(newBox, lastBoundingBoxRef.current)) {
                                setLastBoundingBox(newBox);
                            }
                        }
                    }["useElementOffset.useCallback[updateBoundingBox]"]);
                    observer.observe(node);
                    observerRef.current = observer;
                }
            }
        }
    }["useElementOffset.useCallback[updateBoundingBox]"], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        ...extraDependencies
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useElementOffset.useEffect": ()=>{
            return ({
                "useElementOffset.useEffect": ()=>{
                    var _observerRef$current;
                    (_observerRef$current = observerRef.current) === null || _observerRef$current === void 0 || _observerRef$current.disconnect();
                }
            })["useElementOffset.useEffect"];
        }
    }["useElementOffset.useEffect"], []);
    return [
        lastBoundingBox,
        updateBoundingBox
    ];
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useId",
    ()=>useId,
    "useIdFallback",
    ()=>useIdFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/DataUtils.js [app-client] (ecmascript)");
var _ref;
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
var useIdFallback = ()=>{
    var _React$useState = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState({
        "useIdFallback.useState[_React$useState]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$DataUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uniqueId"])('uid-')
    }["useIdFallback.useState[_React$useState]"]), _React$useState2 = _slicedToArray(_React$useState, 1), id = _React$useState2[0];
    return id;
};
var useId = (_ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__['useId'.toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/usePrefersReducedMotion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefersReducedMotion",
    ()=>usePrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/Global.js [app-client] (ecmascript)");
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
function usePrefersReducedMotion() {
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePrefersReducedMotion.useState[_useState]": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$Global$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Global"].isSsr) {
                return false;
            }
            if (!window.matchMedia) {
                return false;
            }
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    }["usePrefersReducedMotion.useState[_useState]"]), _useState2 = _slicedToArray(_useState, 2), prefersReducedMotion = _useState2[0], setPrefersReducedMotion = _useState2[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePrefersReducedMotion.useEffect": ()=>{
            if (!window.matchMedia) {
                return;
            }
            var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            var handleChange = {
                "usePrefersReducedMotion.useEffect.handleChange": ()=>{
                    setPrefersReducedMotion(mediaQuery.matches);
                }
            }["usePrefersReducedMotion.useEffect.handleChange"];
            mediaQuery.addEventListener('change', handleChange);
            // eslint-disable-next-line consistent-return
            return ({
                "usePrefersReducedMotion.useEffect": ()=>{
                    mediaQuery.removeEventListener('change', handleChange);
                }
            })["usePrefersReducedMotion.useEffect"];
        }
    }["usePrefersReducedMotion.useEffect"], []);
    return prefersReducedMotion;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useReportScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReportScale",
    ()=>useReportScale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.3_@babel+core@7.29.7_@types+node@20.19.43_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$containerSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/selectors/containerSelectors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$layoutSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/state/layoutSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/isWellBehavedNumber.js [app-client] (ecmascript)");
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
function useReportScale() {
    var dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), _useState2 = _slicedToArray(_useState, 2), ref = _useState2[0], setRef = _useState2[1];
    var scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$selectors$2f$containerSelectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectContainerScale"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$3_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$40$19$2e$2$2e$8$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useReportScale.useEffect": ()=>{
            if (ref == null) {
                return;
            }
            var rect = ref.getBoundingClientRect();
            var newScale = rect.width / ref.offsetWidth;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$isWellBehavedNumber$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWellBehavedNumber"])(newScale) && newScale !== scale) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$state$2f$layoutSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setScale"])(newScale));
            }
        }
    }["useReportScale.useEffect"], [
        ref,
        dispatch,
        scale
    ]);
    return setRef;
}
}),
"[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useUniqueId.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUniqueId",
    ()=>useUniqueId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/recharts@3.10.1_@types+react@19.2.18_react-dom@19.2.8_react@19.2.8__react-is@16.13.1_react@19.2.8_redux@5.0.1/node_modules/recharts/es6/util/useId.js [app-client] (ecmascript)");
;
function useUniqueId(prefix, customId) {
    /*
   * We have to call this hook here even if we don't use the result because
   * rules of hooks demand that hooks are never called conditionally.
   */ var generatedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$recharts$40$3$2e$10$2e$1_$40$types$2b$react$40$19$2e$2$2e$18_react$2d$dom$40$19$2e$2$2e$8_react$40$19$2e$2$2e$8_$5f$react$2d$is$40$16$2e$13$2e$1_react$40$19$2e$2$2e$8_redux$40$5$2e$0$2e$1$2f$node_modules$2f$recharts$2f$es6$2f$util$2f$useId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    // If a custom ID is provided, it always takes precedence.
    if (customId) {
        return customId;
    }
    // Apply the prefix if one was provided.
    return prefix ? "".concat(prefix, "-").concat(generatedId) : generatedId;
} /**
 * The useUniqueId hook returns a unique ID that is either reused from external props or generated internally.
 * Either way the ID is now guaranteed to be present so no more nulls or undefined.
 */ 
}),
]);

//# sourceMappingURL=0fic_recharts_es6_util_1hcp6wo._.js.map