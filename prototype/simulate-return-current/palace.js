var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  if (mod && typeof mod === "object" || typeof mod === "function") {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: __accessProp.bind(mod, key),
          enumerable: true
        });
  }
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/applyToPoint.js
var require_applyToPoint = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.applyToPoint = applyToPoint;
  exports.applyToPoints = applyToPoints;
  function applyToPoint(matrix, point) {
    return Array.isArray(point) ? [matrix.a * point[0] + matrix.c * point[1] + matrix.e, matrix.b * point[0] + matrix.d * point[1] + matrix.f] : {
      x: matrix.a * point.x + matrix.c * point.y + matrix.e,
      y: matrix.b * point.x + matrix.d * point.y + matrix.f
    };
  }
  function applyToPoints(matrix, points) {
    return points.map((point) => applyToPoint(matrix, point));
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromObject.js
var require_fromObject = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromObject = fromObject;
  function fromObject(object) {
    return {
      a: parseFloat(object.a),
      b: parseFloat(object.b),
      c: parseFloat(object.c),
      d: parseFloat(object.d),
      e: parseFloat(object.e),
      f: parseFloat(object.f)
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromString.js
var require_fromString = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromString = fromString;
  var matrixRegex = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;
  function fromString(string) {
    const parsed = string.match(matrixRegex);
    if (parsed === null || parsed.length < 7)
      throw new Error(`'${string}' is not a matrix`);
    return {
      a: parseFloat(parsed[1]),
      b: parseFloat(parsed[2]),
      c: parseFloat(parsed[3]),
      d: parseFloat(parsed[4]),
      e: parseFloat(parsed[5]),
      f: parseFloat(parsed[6])
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/identity.js
var require_identity = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.identity = identity;
  function identity() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/inverse.js
var require_inverse = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inverse = inverse;
  function inverse(matrix) {
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = matrix;
    const denom = a * d - b * c;
    return {
      a: d / denom,
      b: b / -denom,
      c: c / -denom,
      d: a / denom,
      e: (d * e - c * f) / -denom,
      f: (b * e - a * f) / denom
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/utils.js
var require_utils = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isUndefined = isUndefined;
  exports.matchesShape = matchesShape;
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isNumeric(n) {
    return typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n);
  }
  function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  }
  function matchesShape(obj, keys) {
    return keys.every((key) => (key in obj));
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/isAffineMatrix.js
var require_isAffineMatrix = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAffineMatrix = isAffineMatrix;
  var _utils = require_utils();
  function isAffineMatrix(object) {
    return (0, _utils.isObject)(object) && "a" in object && (0, _utils.isNumeric)(object.a) && "b" in object && (0, _utils.isNumeric)(object.b) && "c" in object && (0, _utils.isNumeric)(object.c) && "d" in object && (0, _utils.isNumeric)(object.d) && "e" in object && (0, _utils.isNumeric)(object.e) && "f" in object && (0, _utils.isNumeric)(object.f);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/translate.js
var require_translate = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.translate = translate;
  function translate(tx, ty = 0) {
    return {
      a: 1,
      c: 0,
      e: tx,
      b: 0,
      d: 1,
      f: ty
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/transform.js
var require_transform = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compose = compose;
  exports.transform = transform;
  function transform(...matrices) {
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
    const multiply = (m1, m2) => {
      return {
        a: m1.a * m2.a + m1.c * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        e: m1.a * m2.e + m1.c * m2.f + m1.e,
        b: m1.b * m2.a + m1.d * m2.b,
        d: m1.b * m2.c + m1.d * m2.d,
        f: m1.b * m2.e + m1.d * m2.f + m1.f
      };
    };
    switch (matrices.length) {
      case 0:
        throw new Error("no matrices provided");
      case 1:
        return matrices[0];
      case 2:
        return multiply(matrices[0], matrices[1]);
      default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest);
      }
    }
  }
  function compose(...matrices) {
    return transform(...matrices);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/rotate.js
var require_rotate = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.rotate = rotate;
  exports.rotateDEG = rotateDEG;
  var _utils = require_utils();
  var _translate = require_translate();
  var _transform = require_transform();
  var {
    cos,
    sin,
    PI
  } = Math;
  function rotate(angle, cx, cy) {
    const cosAngle = cos(angle);
    const sinAngle = sin(angle);
    const rotationMatrix = {
      a: cosAngle,
      c: -sinAngle,
      e: 0,
      b: sinAngle,
      d: cosAngle,
      f: 0
    };
    if ((0, _utils.isUndefined)(cx) || (0, _utils.isUndefined)(cy)) {
      return rotationMatrix;
    }
    return (0, _transform.transform)([(0, _translate.translate)(cx, cy), rotationMatrix, (0, _translate.translate)(-cx, -cy)]);
  }
  function rotateDEG(angle, cx = undefined, cy = undefined) {
    return rotate(angle * PI / 180, cx, cy);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/scale.js
var require_scale = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.scale = scale;
  var _utils = require_utils();
  var _translate = require_translate();
  var _transform = require_transform();
  function scale(sx, sy = undefined, cx = undefined, cy = undefined) {
    if ((0, _utils.isUndefined)(sy))
      sy = sx;
    const scaleMatrix = {
      a: sx,
      c: 0,
      e: 0,
      b: 0,
      d: sy,
      f: 0
    };
    if ((0, _utils.isUndefined)(cx) || (0, _utils.isUndefined)(cy)) {
      return scaleMatrix;
    }
    return (0, _transform.transform)([(0, _translate.translate)(cx, cy), scaleMatrix, (0, _translate.translate)(-cx, -cy)]);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/shear.js
var require_shear = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shear = shear;
  function shear(shx, shy) {
    return {
      a: 1,
      c: shx,
      e: 0,
      b: shy,
      d: 1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/skew.js
var require_skew = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.skew = skew;
  exports.skewDEG = skewDEG;
  var {
    tan
  } = Math;
  function skew(ax, ay) {
    return {
      a: 1,
      c: tan(ax),
      e: 0,
      b: tan(ay),
      d: 1,
      f: 0
    };
  }
  function skewDEG(ax, ay) {
    return skew(ax * Math.PI / 180, ay * Math.PI / 180);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/toString.js
var require_toString = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toCSS = toCSS;
  exports.toSVG = toSVG;
  exports.toString = toString;
  function toCSS(matrix) {
    return toString(matrix);
  }
  function toSVG(matrix) {
    return toString(matrix);
  }
  function toString(matrix) {
    return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`;
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/smoothMatrix.js
var require_smoothMatrix = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.smoothMatrix = smoothMatrix;
  function smoothMatrix(matrix, precision = 10000000000) {
    return {
      a: Math.round(matrix.a * precision) / precision,
      b: Math.round(matrix.b * precision) / precision,
      c: Math.round(matrix.c * precision) / precision,
      d: Math.round(matrix.d * precision) / precision,
      e: Math.round(matrix.e * precision) / precision,
      f: Math.round(matrix.f * precision) / precision
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromTriangles.js
var require_fromTriangles = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromTriangles = fromTriangles;
  var _inverse = require_inverse();
  var _transform = require_transform();
  var _smoothMatrix = require_smoothMatrix();
  function fromTriangles(t1, t2) {
    const px1 = t1[0].x != null ? t1[0].x : t1[0][0];
    const py1 = t1[0].y != null ? t1[0].y : t1[0][1];
    const px2 = t2[0].x != null ? t2[0].x : t2[0][0];
    const py2 = t2[0].y != null ? t2[0].y : t2[0][1];
    const qx1 = t1[1].x != null ? t1[1].x : t1[1][0];
    const qy1 = t1[1].y != null ? t1[1].y : t1[1][1];
    const qx2 = t2[1].x != null ? t2[1].x : t2[1][0];
    const qy2 = t2[1].y != null ? t2[1].y : t2[1][1];
    const rx1 = t1[2].x != null ? t1[2].x : t1[2][0];
    const ry1 = t1[2].y != null ? t1[2].y : t1[2][1];
    const rx2 = t2[2].x != null ? t2[2].x : t2[2][0];
    const ry2 = t2[2].y != null ? t2[2].y : t2[2][1];
    const r1 = {
      a: px1 - rx1,
      b: py1 - ry1,
      c: qx1 - rx1,
      d: qy1 - ry1,
      e: rx1,
      f: ry1
    };
    const r2 = {
      a: px2 - rx2,
      b: py2 - ry2,
      c: qx2 - rx2,
      d: qy2 - ry2,
      e: rx2,
      f: ry2
    };
    const inverseR1 = (0, _inverse.inverse)(r1);
    const affineMatrix = (0, _transform.transform)([r2, inverseR1]);
    return (0, _smoothMatrix.smoothMatrix)(affineMatrix);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromDefinition.js
var require_fromDefinition = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromDefinition = fromDefinition;
  var _fromObject = require_fromObject();
  var _translate = require_translate();
  var _scale = require_scale();
  var _rotate = require_rotate();
  var _skew = require_skew();
  var _shear = require_shear();
  function fromDefinition(definitionOrArrayOfDefinition) {
    return Array.isArray(definitionOrArrayOfDefinition) ? definitionOrArrayOfDefinition.map(mapper) : mapper(definitionOrArrayOfDefinition);
    function mapper(descriptor) {
      switch (descriptor.type) {
        case "matrix":
          if ("a" in descriptor && "b" in descriptor && "c" in descriptor && "d" in descriptor && "e" in descriptor && "f" in descriptor) {
            return (0, _fromObject.fromObject)(descriptor);
          } else {
            throw new Error("MISSING_MANDATORY_PARAM");
          }
        case "translate":
          if (!("tx" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("ty" in descriptor)
            return (0, _translate.translate)(descriptor.tx, descriptor.ty);
          return (0, _translate.translate)(descriptor.tx);
        case "scale":
          if (!("sx" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("sy" in descriptor)
            return (0, _scale.scale)(descriptor.sx, descriptor.sy);
          return (0, _scale.scale)(descriptor.sx);
        case "rotate":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("cx" in descriptor && "cy" in descriptor) {
            return (0, _rotate.rotateDEG)(descriptor.angle, descriptor.cx, descriptor.cy);
          }
          return (0, _rotate.rotateDEG)(descriptor.angle);
        case "skewX":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _skew.skewDEG)(descriptor.angle, 0);
        case "skewY":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _skew.skewDEG)(0, descriptor.angle);
        case "shear":
          if (!(("shx" in descriptor) && ("shy" in descriptor)))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _shear.shear)(descriptor.shx, descriptor.shy);
        default:
          throw new Error("UNSUPPORTED_DESCRIPTOR");
      }
    }
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromTransformAttribute.autogenerated.js
var require_fromTransformAttribute_autogenerated = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SyntaxError = peg$SyntaxError;
  exports.parse = peg$parse;
  function peg$subclass(child, parent) {
    function C() {
      this.constructor = child;
    }
    C.prototype = parent.prototype;
    child.prototype = new C;
  }
  function peg$SyntaxError(message, expected, found, location) {
    var self = Error.call(this, message);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(self, peg$SyntaxError.prototype);
    }
    self.expected = expected;
    self.found = found;
    self.location = location;
    self.name = "SyntaxError";
    return self;
  }
  peg$subclass(peg$SyntaxError, Error);
  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) {
      return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }
  peg$SyntaxError.prototype.format = function(sources) {
    var str = "Error: " + this.message;
    if (this.location) {
      var src = null;
      var k;
      for (k = 0;k < sources.length; k++) {
        if (sources[k].source === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      var s = this.location.start;
      var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
      var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
      if (src) {
        var e = this.location.end;
        var filler = peg$padEnd("", offset_s.line.toString().length, " ");
        var line = src[s.line - 1];
        var last = s.line === e.line ? e.column : line.length + 1;
        var hatLen = last - s.column || 1;
        str += `
 --> ` + loc + `
` + filler + ` |
` + offset_s.line + " | " + line + `
` + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
      } else {
        str += `
 at ` + loc;
      }
    }
    return str;
  };
  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      class: function(expectation) {
        var escapedParts = expectation.parts.map(function(part) {
          return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
        });
        return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
      },
      any: function() {
        return "any character";
      },
      end: function() {
        return "end of input";
      },
      other: function(expectation) {
        return expectation.description;
      }
    };
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected2) {
      var descriptions = expected2.map(describeExpectation);
      var i, j;
      descriptions.sort();
      if (descriptions.length > 0) {
        for (i = 1, j = 1;i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }
      switch (descriptions.length) {
        case 1:
          return descriptions[0];
        case 2:
          return descriptions[0] + " or " + descriptions[1];
        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }
    function describeFound(found2) {
      return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };
  function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$source = options.grammarSource;
    var peg$startRuleFunctions = {
      transformList: peg$parsetransformList
    };
    var peg$startRuleFunction = peg$parsetransformList;
    var peg$c0 = "matrix";
    var peg$c1 = "(";
    var peg$c2 = ")";
    var peg$c3 = "translate";
    var peg$c4 = "scale";
    var peg$c5 = "rotate";
    var peg$c6 = "skewX";
    var peg$c7 = "skewY";
    var peg$c8 = ",";
    var peg$c9 = ".";
    var peg$r0 = /^[eE]/;
    var peg$r1 = /^[+\-]/;
    var peg$r2 = /^[0-9]/;
    var peg$r3 = /^[ \t\r\n]/;
    var peg$e0 = peg$literalExpectation("matrix", false);
    var peg$e1 = peg$literalExpectation("(", false);
    var peg$e2 = peg$literalExpectation(")", false);
    var peg$e3 = peg$literalExpectation("translate", false);
    var peg$e4 = peg$literalExpectation("scale", false);
    var peg$e5 = peg$literalExpectation("rotate", false);
    var peg$e6 = peg$literalExpectation("skewX", false);
    var peg$e7 = peg$literalExpectation("skewY", false);
    var peg$e8 = peg$literalExpectation(",", false);
    var peg$e9 = peg$otherExpectation("fractionalConstant");
    var peg$e10 = peg$literalExpectation(".", false);
    var peg$e11 = peg$classExpectation(["e", "E"], false, false);
    var peg$e12 = peg$classExpectation(["+", "-"], false, false);
    var peg$e13 = peg$classExpectation([["0", "9"]], false, false);
    var peg$e14 = peg$classExpectation([" ", "\t", "\r", `
`], false, false);
    var peg$f0 = function(ts) {
      return ts;
    };
    var peg$f1 = function(t, ts) {
      return t.concat(ts);
    };
    var peg$f2 = function(a, b, c, d, e, f) {
      return [{
        type: "matrix",
        a,
        b,
        c,
        d,
        e,
        f
      }];
    };
    var peg$f3 = function(tx, ty) {
      var t = {
        type: "translate",
        tx
      };
      if (ty)
        t.ty = ty;
      return [t];
    };
    var peg$f4 = function(sx, sy) {
      var s = {
        type: "scale",
        sx
      };
      if (sy)
        s.sy = sy;
      return [s];
    };
    var peg$f5 = function(angle, c) {
      var r = {
        type: "rotate",
        angle
      };
      if (c) {
        r.cx = c[0];
        r.cy = c[1];
      }
      return [r];
    };
    var peg$f6 = function(angle) {
      return [{
        type: "skewX",
        angle
      }];
    };
    var peg$f7 = function(angle) {
      return [{
        type: "skewY",
        angle
      }];
    };
    var peg$f8 = function(f) {
      return parseFloat(f.join(""));
    };
    var peg$f9 = function(i) {
      return parseInt(i.join(""));
    };
    var peg$f10 = function(n) {
      return n;
    };
    var peg$f11 = function(n1, n2) {
      return [n1, n2];
    };
    var peg$f12 = function(ds) {
      return ds.join("");
    };
    var peg$f13 = function(f, e) {
      return [f, e || null].join("");
    };
    var peg$f14 = function(d, e) {
      return [d, e].join("");
    };
    var peg$f15 = function(d1, d2) {
      return [d1 ? d1.join("") : null, ".", d2.join("")].join("");
    };
    var peg$f16 = function(d) {
      return d.join("");
    };
    var peg$f17 = function(s, d) {
      return ["e", s, d.join("")].join("");
    };
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{
      line: 1,
      column: 1
    }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$result;
    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }
    function offset() {
      return peg$savedPos;
    }
    function range() {
      return {
        source: peg$source,
        start: peg$savedPos,
        end: peg$currPos
      };
    }
    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location2) {
      location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location2);
    }
    function error(message, location2) {
      location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildSimpleError(message, location2);
    }
    function peg$literalExpectation(text2, ignoreCase) {
      return {
        type: "literal",
        text: text2,
        ignoreCase
      };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts,
        inverted,
        ignoreCase
      };
    }
    function peg$anyExpectation() {
      return {
        type: "any"
      };
    }
    function peg$endExpectation() {
      return {
        type: "end"
      };
    }
    function peg$otherExpectation(description) {
      return {
        type: "other",
        description
      };
    }
    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos];
      var p;
      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos, offset2) {
      var startPosDetails = peg$computePosDetails(startPos);
      var endPosDetails = peg$computePosDetails(endPos);
      var res = {
        source: peg$source,
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
      if (offset2 && peg$source && typeof peg$source.offset === "function") {
        res.start = peg$source.offset(res.start);
        res.end = peg$source.offset(res.end);
      }
      return res;
    }
    function peg$fail(expected2) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected2);
    }
    function peg$buildSimpleError(message, location2) {
      return new peg$SyntaxError(message, null, null, location2);
    }
    function peg$buildStructuredError(expected2, found, location2) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected2, found), expected2, found, location2);
    }
    function peg$parsetransformList() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
      s2 = peg$parsetransforms();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = [];
      s4 = peg$parsewsp();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsewsp();
      }
      peg$savedPos = s0;
      s0 = peg$f0(s2);
      return s0;
    }
    function peg$parsetransforms() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$parsetransform();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecommaWsp();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsecommaWsp();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetransforms();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f1(s1, s3);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsetransform();
      }
      return s0;
    }
    function peg$parsetransform() {
      var s0;
      s0 = peg$parsematrix();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();
          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();
            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();
              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }
      return s0;
    }
    function peg$parsematrix() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c0) {
        s1 = peg$c0;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWsp();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsenumber();
              if (s7 !== peg$FAILED) {
                s8 = peg$parsecommaWsp();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsenumber();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parsecommaWsp();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parsenumber();
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parsecommaWsp();
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parsenumber();
                          if (s13 !== peg$FAILED) {
                            s14 = peg$parsecommaWsp();
                            if (s14 !== peg$FAILED) {
                              s15 = peg$parsenumber();
                              if (s15 !== peg$FAILED) {
                                s16 = [];
                                s17 = peg$parsewsp();
                                while (s17 !== peg$FAILED) {
                                  s16.push(s17);
                                  s17 = peg$parsewsp();
                                }
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s17 = peg$c2;
                                  peg$currPos++;
                                } else {
                                  s17 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$e2);
                                  }
                                }
                                if (s17 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s0 = peg$f2(s5, s7, s9, s11, s13, s15);
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetranslate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c3) {
        s1 = peg$c3;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspNumber();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f3(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsescale() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c4) {
        s1 = peg$c4;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e4);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspNumber();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f4(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parserotate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s1 = peg$c5;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e5);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspTwoNumbers();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f5(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewX() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c6) {
        s1 = peg$c6;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e6);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = [];
            s7 = peg$parsewsp();
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s7 = peg$c2;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s7 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f6(s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewY() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = [];
            s7 = peg$parsewsp();
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s7 = peg$c2;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s7 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f7(s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsenumber() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parsefloatingPointConstant();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f8(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = peg$parseintegerConstant();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$f9(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsecommaWspNumber() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f10(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWspTwoNumbers() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecommaWsp();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsenumber();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f11(s2, s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWsp() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = [];
        s4 = peg$parsewsp();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsewsp();
        }
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomma();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsecomma() {
      var s0;
      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c8;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e8);
        }
      }
      return s0;
    }
    function peg$parseintegerConstant() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f12(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsefloatingPointConstant() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsefractionalConstant();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexponent();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f13(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseexponent();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f14(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsefractionalConstant() {
      var s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c9;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e10);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsedigitSequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f15(s1, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c9;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e10);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f16(s1);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      return s0;
    }
    function peg$parseexponent() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      if (peg$r0.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = peg$parsedigitSequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f17(s2, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsesign() {
      var s0;
      if (peg$r1.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e12);
        }
      }
      return s0;
    }
    function peg$parsedigitSequence() {
      var s0, s1;
      s0 = [];
      s1 = peg$parsedigit();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedigit();
        }
      } else {
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsedigit() {
      var s0;
      if (peg$r2.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e13);
        }
      }
      return s0;
    }
    function peg$parsewsp() {
      var s0;
      if (peg$r3.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      return s0;
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromTransformAttribute.js
var require_fromTransformAttribute = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromTransformAttribute = fromTransformAttribute;
  var _fromTransformAttribute = require_fromTransformAttribute_autogenerated();
  function fromTransformAttribute(transformString) {
    return (0, _fromTransformAttribute.parse)(transformString);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/decompose.js
var require_decompose = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decomposeTSR = decomposeTSR;
  var _scale = require_scale();
  var _transform = require_transform();
  function decomposeTSR(matrix, flipX = false, flipY = false) {
    if (flipX) {
      if (flipY) {
        matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(-1, -1));
      } else {
        matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(1, -1));
      }
    } else if (flipY) {
      matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(-1, 1));
    }
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    let scaleX, scaleY, rotation;
    if (a !== 0 || c !== 0) {
      const hypotAc = Math.hypot(a, c);
      scaleX = hypotAc;
      scaleY = (a * d - b * c) / hypotAc;
      const acos = Math.acos(a / hypotAc);
      rotation = c > 0 ? -acos : acos;
    } else if (b !== 0 || d !== 0) {
      const hypotBd = Math.hypot(b, d);
      scaleX = (a * d - b * c) / hypotBd;
      scaleY = hypotBd;
      const acos = Math.acos(b / hypotBd);
      rotation = Math.PI / 2 + (d > 0 ? -acos : acos);
    } else {
      scaleX = 0;
      scaleY = 0;
      rotation = 0;
    }
    if (flipY) {
      scaleX = -scaleX;
    }
    if (flipX) {
      scaleY = -scaleY;
    }
    return {
      translate: {
        tx: matrix.e,
        ty: matrix.f
      },
      scale: {
        sx: scaleX,
        sy: scaleY
      },
      rotation: {
        angle: rotation
      }
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/flip.js
var require_flip = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flipOrigin = flipOrigin;
  exports.flipX = flipX;
  exports.flipY = flipY;
  function flipX() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: -1,
      f: 0
    };
  }
  function flipY() {
    return {
      a: -1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
  function flipOrigin() {
    return {
      a: -1,
      c: 0,
      e: 0,
      b: 0,
      d: -1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/fromMovingPoints.js
var require_fromMovingPoints = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromOneMovingPoint = fromOneMovingPoint;
  exports.fromTwoMovingPoints = fromTwoMovingPoints;
  var _translate = require_translate();
  var _applyToPoint = require_applyToPoint();
  var _rotate = require_rotate();
  var _scale = require_scale();
  var _transform = require_transform();
  function fromOneMovingPoint(startingPoint, endingPoint) {
    const tx = endingPoint.x - startingPoint.x;
    const ty = endingPoint.y - startingPoint.y;
    return (0, _translate.translate)(tx, ty);
  }
  function fromTwoMovingPoints(startingPoint1, startingPoint2, endingPoint1, endingPoint2) {
    const translationMatrix = fromOneMovingPoint(startingPoint1, endingPoint1);
    const pointA = (0, _applyToPoint.applyToPoint)(translationMatrix, startingPoint2);
    const center = endingPoint1;
    const pointB = endingPoint2;
    const angle = Math.atan2(pointB.y - center.y, pointB.x - center.x) - Math.atan2(pointA.y - center.y, pointA.x - center.x);
    const rotationMatrix = (0, _rotate.rotate)(angle, center.x, center.y);
    const d1 = Math.sqrt(Math.pow(pointA.x - center.x, 2) + Math.pow(pointA.y - center.y, 2));
    const d2 = Math.sqrt(Math.pow(pointB.x - center.x, 2) + Math.pow(pointB.y - center.y, 2));
    const scalingLevel = d2 / d1;
    const scalingMatrix = (0, _scale.scale)(scalingLevel, scalingLevel, center.x, center.y);
    return (0, _transform.compose)([translationMatrix, scalingMatrix, rotationMatrix]);
  }
});

// ../simulate-return-current/node_modules/transformation-matrix/build-commonjs/index.js
var require_build_commonjs = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _applyToPoint = require_applyToPoint();
  Object.keys(_applyToPoint).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _applyToPoint[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _applyToPoint[key];
      }
    });
  });
  var _fromObject = require_fromObject();
  Object.keys(_fromObject).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromObject[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromObject[key];
      }
    });
  });
  var _fromString = require_fromString();
  Object.keys(_fromString).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromString[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromString[key];
      }
    });
  });
  var _identity = require_identity();
  Object.keys(_identity).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _identity[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _identity[key];
      }
    });
  });
  var _inverse = require_inverse();
  Object.keys(_inverse).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _inverse[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _inverse[key];
      }
    });
  });
  var _isAffineMatrix = require_isAffineMatrix();
  Object.keys(_isAffineMatrix).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _isAffineMatrix[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _isAffineMatrix[key];
      }
    });
  });
  var _rotate = require_rotate();
  Object.keys(_rotate).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _rotate[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _rotate[key];
      }
    });
  });
  var _scale = require_scale();
  Object.keys(_scale).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _scale[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _scale[key];
      }
    });
  });
  var _shear = require_shear();
  Object.keys(_shear).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _shear[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _shear[key];
      }
    });
  });
  var _skew = require_skew();
  Object.keys(_skew).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _skew[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _skew[key];
      }
    });
  });
  var _toString = require_toString();
  Object.keys(_toString).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _toString[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _toString[key];
      }
    });
  });
  var _transform = require_transform();
  Object.keys(_transform).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _transform[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _transform[key];
      }
    });
  });
  var _translate = require_translate();
  Object.keys(_translate).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _translate[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _translate[key];
      }
    });
  });
  var _fromTriangles = require_fromTriangles();
  Object.keys(_fromTriangles).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromTriangles[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromTriangles[key];
      }
    });
  });
  var _smoothMatrix = require_smoothMatrix();
  Object.keys(_smoothMatrix).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _smoothMatrix[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _smoothMatrix[key];
      }
    });
  });
  var _fromDefinition = require_fromDefinition();
  Object.keys(_fromDefinition).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromDefinition[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromDefinition[key];
      }
    });
  });
  var _fromTransformAttribute = require_fromTransformAttribute();
  Object.keys(_fromTransformAttribute).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromTransformAttribute[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromTransformAttribute[key];
      }
    });
  });
  var _decompose = require_decompose();
  Object.keys(_decompose).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _decompose[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _decompose[key];
      }
    });
  });
  var _flip = require_flip();
  Object.keys(_flip).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _flip[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _flip[key];
      }
    });
  });
  var _fromMovingPoints = require_fromMovingPoints();
  Object.keys(_fromMovingPoints).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromMovingPoints[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromMovingPoints[key];
      }
    });
  });
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/applyToPoint.js
var require_applyToPoint2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.applyToPoint = applyToPoint4;
  exports.applyToPoints = applyToPoints;
  function applyToPoint4(matrix, point2) {
    return Array.isArray(point2) ? [matrix.a * point2[0] + matrix.c * point2[1] + matrix.e, matrix.b * point2[0] + matrix.d * point2[1] + matrix.f] : {
      x: matrix.a * point2.x + matrix.c * point2.y + matrix.e,
      y: matrix.b * point2.x + matrix.d * point2.y + matrix.f
    };
  }
  function applyToPoints(matrix, points) {
    return points.map((point2) => applyToPoint4(matrix, point2));
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromObject.js
var require_fromObject2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromObject = fromObject;
  function fromObject(object) {
    return {
      a: parseFloat(object.a),
      b: parseFloat(object.b),
      c: parseFloat(object.c),
      d: parseFloat(object.d),
      e: parseFloat(object.e),
      f: parseFloat(object.f)
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromString.js
var require_fromString2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromString = fromString;
  exports.fromStringLegacy = fromStringLegacy;
  var matrixRegex = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;
  function fromString(string) {
    const parseFloatOrThrow = (number) => {
      const n = parseFloat(number);
      if (Number.isFinite(n))
        return n;
      throw new Error(`'${string}' is not a matrix`);
    };
    const prefix = string.substring(0, 7).toLowerCase();
    const suffix = string.substring(string.length - 1);
    const body = string.substring(7, string.length - 1);
    const elements = body.split(",");
    if (prefix === "matrix(" && suffix === ")" && elements.length === 6) {
      return {
        a: parseFloatOrThrow(elements[0]),
        b: parseFloatOrThrow(elements[1]),
        c: parseFloatOrThrow(elements[2]),
        d: parseFloatOrThrow(elements[3]),
        e: parseFloatOrThrow(elements[4]),
        f: parseFloatOrThrow(elements[5])
      };
    }
    throw new Error(`'${string}' is not a matrix`);
  }
  function fromStringLegacy(string) {
    const parsed = string.match(matrixRegex);
    if (parsed === null || parsed.length < 7)
      throw new Error(`'${string}' is not a matrix`);
    return {
      a: parseFloat(parsed[1]),
      b: parseFloat(parsed[2]),
      c: parseFloat(parsed[3]),
      d: parseFloat(parsed[4]),
      e: parseFloat(parsed[5]),
      f: parseFloat(parsed[6])
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/identity.js
var require_identity2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.identity = identity;
  function identity() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/inverse.js
var require_inverse2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inverse = inverse;
  function inverse(matrix) {
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = matrix;
    const denom = a * d - b * c;
    return {
      a: d / denom,
      b: b / -denom,
      c: c / -denom,
      d: a / denom,
      e: (d * e - c * f) / -denom,
      f: (b * e - a * f) / denom
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/utils.js
var require_utils2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNumeric = isNumeric;
  exports.isObject = isObject;
  exports.isUndefined = isUndefined;
  exports.matchesShape = matchesShape;
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isNumeric(n) {
    return typeof n === "number" && !Number.isNaN(n) && Number.isFinite(n);
  }
  function isObject(obj) {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  }
  function matchesShape(obj, keys) {
    return keys.every((key) => (key in obj));
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/isAffineMatrix.js
var require_isAffineMatrix2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAffineMatrix = isAffineMatrix;
  var _utils = require_utils2();
  function isAffineMatrix(object) {
    return (0, _utils.isObject)(object) && "a" in object && (0, _utils.isNumeric)(object.a) && "b" in object && (0, _utils.isNumeric)(object.b) && "c" in object && (0, _utils.isNumeric)(object.c) && "d" in object && (0, _utils.isNumeric)(object.d) && "e" in object && (0, _utils.isNumeric)(object.e) && "f" in object && (0, _utils.isNumeric)(object.f);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/translate.js
var require_translate2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.translate = translate4;
  function translate4(tx, ty = 0) {
    return {
      a: 1,
      c: 0,
      e: tx,
      b: 0,
      d: 1,
      f: ty
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/transform.js
var require_transform2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compose = compose4;
  exports.transform = transform;
  function transform(...matrices) {
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;
    const multiply = (m1, m2) => {
      return {
        a: m1.a * m2.a + m1.c * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        e: m1.a * m2.e + m1.c * m2.f + m1.e,
        b: m1.b * m2.a + m1.d * m2.b,
        d: m1.b * m2.c + m1.d * m2.d,
        f: m1.b * m2.e + m1.d * m2.f + m1.f
      };
    };
    switch (matrices.length) {
      case 0:
        throw new Error("no matrices provided");
      case 1:
        return matrices[0];
      case 2:
        return multiply(matrices[0], matrices[1]);
      default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest);
      }
    }
  }
  function compose4(...matrices) {
    return transform(...matrices);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/rotate.js
var require_rotate2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.rotate = rotate;
  exports.rotateDEG = rotateDEG3;
  var _utils = require_utils2();
  var _translate = require_translate2();
  var _transform = require_transform2();
  var {
    cos,
    sin,
    PI
  } = Math;
  function rotate(angle, cx, cy) {
    const cosAngle = cos(angle);
    const sinAngle = sin(angle);
    const rotationMatrix = {
      a: cosAngle,
      c: -sinAngle,
      e: 0,
      b: sinAngle,
      d: cosAngle,
      f: 0
    };
    if ((0, _utils.isUndefined)(cx) || (0, _utils.isUndefined)(cy)) {
      return rotationMatrix;
    }
    return (0, _transform.transform)([(0, _translate.translate)(cx, cy), rotationMatrix, (0, _translate.translate)(-cx, -cy)]);
  }
  function rotateDEG3(angle, cx = undefined, cy = undefined) {
    return rotate(angle * PI / 180, cx, cy);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/scale.js
var require_scale2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.scale = scale2;
  var _utils = require_utils2();
  var _translate = require_translate2();
  var _transform = require_transform2();
  function scale2(sx, sy = undefined, cx = undefined, cy = undefined) {
    if ((0, _utils.isUndefined)(sy))
      sy = sx;
    const scaleMatrix = {
      a: sx,
      c: 0,
      e: 0,
      b: 0,
      d: sy,
      f: 0
    };
    if ((0, _utils.isUndefined)(cx) || (0, _utils.isUndefined)(cy)) {
      return scaleMatrix;
    }
    return (0, _transform.transform)([(0, _translate.translate)(cx, cy), scaleMatrix, (0, _translate.translate)(-cx, -cy)]);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/shear.js
var require_shear2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shear = shear;
  function shear(shx, shy) {
    return {
      a: 1,
      c: shx,
      e: 0,
      b: shy,
      d: 1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/skew.js
var require_skew2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.skew = skew;
  exports.skewDEG = skewDEG;
  var {
    tan
  } = Math;
  function skew(ax, ay) {
    return {
      a: 1,
      c: tan(ax),
      e: 0,
      b: tan(ay),
      d: 1,
      f: 0
    };
  }
  function skewDEG(ax, ay) {
    return skew(ax * Math.PI / 180, ay * Math.PI / 180);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/toString.js
var require_toString2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toCSS = toCSS;
  exports.toSVG = toSVG;
  exports.toString = toString;
  function toCSS(matrix) {
    return toString(matrix);
  }
  function toSVG(matrix) {
    return toString(matrix);
  }
  function toString(matrix) {
    return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`;
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/smoothMatrix.js
var require_smoothMatrix2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.smoothMatrix = smoothMatrix;
  function smoothMatrix(matrix, precision = 10000000000) {
    return {
      a: Math.round(matrix.a * precision) / precision,
      b: Math.round(matrix.b * precision) / precision,
      c: Math.round(matrix.c * precision) / precision,
      d: Math.round(matrix.d * precision) / precision,
      e: Math.round(matrix.e * precision) / precision,
      f: Math.round(matrix.f * precision) / precision
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromTriangles.js
var require_fromTriangles2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromTriangles = fromTriangles;
  var _inverse = require_inverse2();
  var _transform = require_transform2();
  var _smoothMatrix = require_smoothMatrix2();
  function fromTriangles(t1, t2) {
    const px1 = t1[0].x != null ? t1[0].x : t1[0][0];
    const py1 = t1[0].y != null ? t1[0].y : t1[0][1];
    const px2 = t2[0].x != null ? t2[0].x : t2[0][0];
    const py2 = t2[0].y != null ? t2[0].y : t2[0][1];
    const qx1 = t1[1].x != null ? t1[1].x : t1[1][0];
    const qy1 = t1[1].y != null ? t1[1].y : t1[1][1];
    const qx2 = t2[1].x != null ? t2[1].x : t2[1][0];
    const qy2 = t2[1].y != null ? t2[1].y : t2[1][1];
    const rx1 = t1[2].x != null ? t1[2].x : t1[2][0];
    const ry1 = t1[2].y != null ? t1[2].y : t1[2][1];
    const rx2 = t2[2].x != null ? t2[2].x : t2[2][0];
    const ry2 = t2[2].y != null ? t2[2].y : t2[2][1];
    const r1 = {
      a: px1 - rx1,
      b: py1 - ry1,
      c: qx1 - rx1,
      d: qy1 - ry1,
      e: rx1,
      f: ry1
    };
    const r2 = {
      a: px2 - rx2,
      b: py2 - ry2,
      c: qx2 - rx2,
      d: qy2 - ry2,
      e: rx2,
      f: ry2
    };
    const inverseR1 = (0, _inverse.inverse)(r1);
    const affineMatrix = (0, _transform.transform)([r2, inverseR1]);
    return (0, _smoothMatrix.smoothMatrix)(affineMatrix);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromDefinition.js
var require_fromDefinition2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromDefinition = fromDefinition;
  var _fromObject = require_fromObject2();
  var _translate = require_translate2();
  var _scale = require_scale2();
  var _rotate = require_rotate2();
  var _skew = require_skew2();
  var _shear = require_shear2();
  function fromDefinition(definitionOrArrayOfDefinition) {
    return Array.isArray(definitionOrArrayOfDefinition) ? definitionOrArrayOfDefinition.map(mapper) : mapper(definitionOrArrayOfDefinition);
    function mapper(descriptor) {
      switch (descriptor.type) {
        case "matrix":
          if ("a" in descriptor && "b" in descriptor && "c" in descriptor && "d" in descriptor && "e" in descriptor && "f" in descriptor) {
            return (0, _fromObject.fromObject)(descriptor);
          } else {
            throw new Error("MISSING_MANDATORY_PARAM");
          }
        case "translate":
          if (!("tx" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("ty" in descriptor)
            return (0, _translate.translate)(descriptor.tx, descriptor.ty);
          return (0, _translate.translate)(descriptor.tx);
        case "scale":
          if (!("sx" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("sy" in descriptor)
            return (0, _scale.scale)(descriptor.sx, descriptor.sy);
          return (0, _scale.scale)(descriptor.sx);
        case "rotate":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          if ("cx" in descriptor && "cy" in descriptor) {
            return (0, _rotate.rotateDEG)(descriptor.angle, descriptor.cx, descriptor.cy);
          }
          return (0, _rotate.rotateDEG)(descriptor.angle);
        case "skewX":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _skew.skewDEG)(descriptor.angle, 0);
        case "skewY":
          if (!("angle" in descriptor))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _skew.skewDEG)(0, descriptor.angle);
        case "shear":
          if (!(("shx" in descriptor) && ("shy" in descriptor)))
            throw new Error("MISSING_MANDATORY_PARAM");
          return (0, _shear.shear)(descriptor.shx, descriptor.shy);
        default:
          throw new Error("UNSUPPORTED_DESCRIPTOR");
      }
    }
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromTransformAttribute.autogenerated.js
var require_fromTransformAttribute_autogenerated2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SyntaxError = exports.StartRules = undefined;
  exports.parse = peg$parse;

  class peg$SyntaxError extends SyntaxError {
    constructor(message, expected, found, location) {
      super(message);
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
    }
    format(sources) {
      let str = "Error: " + this.message;
      if (this.location) {
        let src = null;
        const st = sources.find((s2) => s2.source === this.location.source);
        if (st) {
          src = st.text.split(/\r\n|\n|\r/g);
        }
        const s = this.location.start;
        const offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
        const loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
        if (src) {
          const e = this.location.end;
          const filler = "".padEnd(offset_s.line.toString().length, " ");
          const line = src[s.line - 1];
          const last = s.line === e.line ? e.column : line.length + 1;
          const hatLen = last - s.column || 1;
          str += `
 --> ` + loc + `
` + filler + ` |
` + offset_s.line + " | " + line + `
` + filler + " | " + "".padEnd(s.column - 1, " ") + "".padEnd(hatLen, "^");
        } else {
          str += `
 at ` + loc;
        }
      }
      return str;
    }
    static buildMessage(expected, found) {
      function hex(ch) {
        return ch.codePointAt(0).toString(16).toUpperCase();
      }
      const nonPrintable = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? new RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
      function unicodeEscape(s) {
        if (nonPrintable) {
          return s.replace(nonPrintable, (ch) => "\\u{" + hex(ch) + "}");
        }
        return s;
      }
      function literalEscape(s) {
        return unicodeEscape(s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch)));
      }
      function classEscape(s) {
        return unicodeEscape(s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch)).replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch)));
      }
      const DESCRIBE_EXPECTATION_FNS = {
        literal(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        class(expectation) {
          const escapedParts = expectation.parts.map((part) => Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part));
          return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]" + (expectation.unicode ? "u" : "");
        },
        any() {
          return "any character";
        },
        end() {
          return "end of input";
        },
        other(expectation) {
          return expectation.description;
        }
      };
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        const descriptions = expected2.map(describeExpectation);
        descriptions.sort();
        if (descriptions.length > 0) {
          let j = 1;
          for (let i = 1;i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
  }
  exports.SyntaxError = peg$SyntaxError;
  function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    const peg$FAILED = {};
    const peg$source = options.grammarSource;
    const peg$startRuleFunctions = {
      transformList: peg$parsetransformList
    };
    let peg$startRuleFunction = peg$parsetransformList;
    const peg$c0 = "matrix";
    const peg$c1 = "(";
    const peg$c2 = ")";
    const peg$c3 = "translate";
    const peg$c4 = "scale";
    const peg$c5 = "rotate";
    const peg$c6 = "skewX";
    const peg$c7 = "skewY";
    const peg$c8 = ",";
    const peg$c9 = ".";
    const peg$r0 = /^[eE]/;
    const peg$r1 = /^[+\-]/;
    const peg$r2 = /^[0-9]/;
    const peg$r3 = /^[ \t\r\n]/;
    const peg$e0 = peg$literalExpectation("matrix", false);
    const peg$e1 = peg$literalExpectation("(", false);
    const peg$e2 = peg$literalExpectation(")", false);
    const peg$e3 = peg$literalExpectation("translate", false);
    const peg$e4 = peg$literalExpectation("scale", false);
    const peg$e5 = peg$literalExpectation("rotate", false);
    const peg$e6 = peg$literalExpectation("skewX", false);
    const peg$e7 = peg$literalExpectation("skewY", false);
    const peg$e8 = peg$literalExpectation(",", false);
    const peg$e9 = peg$otherExpectation("fractionalConstant");
    const peg$e10 = peg$literalExpectation(".", false);
    const peg$e11 = peg$classExpectation(["e", "E"], false, false, false);
    const peg$e12 = peg$classExpectation(["+", "-"], false, false, false);
    const peg$e13 = peg$classExpectation([["0", "9"]], false, false, false);
    const peg$e14 = peg$classExpectation([" ", "\t", "\r", `
`], false, false, false);
    function peg$f0(ts) {
      return ts;
    }
    function peg$f1(t, ts) {
      return t.concat(ts);
    }
    function peg$f2(a, b, c, d, e, f) {
      return [{
        type: "matrix",
        a,
        b,
        c,
        d,
        e,
        f
      }];
    }
    function peg$f3(tx, ty) {
      var t = {
        type: "translate",
        tx
      };
      if (ty)
        t.ty = ty;
      return [t];
    }
    function peg$f4(sx, sy) {
      var s = {
        type: "scale",
        sx
      };
      if (sy)
        s.sy = sy;
      return [s];
    }
    function peg$f5(angle, c) {
      var r = {
        type: "rotate",
        angle
      };
      if (c) {
        r.cx = c[0];
        r.cy = c[1];
      }
      return [r];
    }
    function peg$f6(angle) {
      return [{
        type: "skewX",
        angle
      }];
    }
    function peg$f7(angle) {
      return [{
        type: "skewY",
        angle
      }];
    }
    function peg$f8(f) {
      return parseFloat(f.join(""));
    }
    function peg$f9(i) {
      return parseInt(i.join(""));
    }
    function peg$f10(n) {
      return n;
    }
    function peg$f11(n1, n2) {
      return [n1, n2];
    }
    function peg$f12(ds) {
      return ds.join("");
    }
    function peg$f13(f, e) {
      return [f, e || null].join("");
    }
    function peg$f14(d, e) {
      return [d, e].join("");
    }
    function peg$f15(d1, d2) {
      return [d1 ? d1.join("") : null, ".", d2.join("")].join("");
    }
    function peg$f16(d) {
      return d.join("");
    }
    function peg$f17(s, d) {
      return ["e", s, d.join("")].join("");
    }
    let peg$currPos = options.peg$currPos | 0;
    let peg$savedPos = peg$currPos;
    const peg$posDetailsCache = [{
      line: 1,
      column: 1
    }];
    let peg$maxFailPos = peg$currPos;
    let peg$maxFailExpected = options.peg$maxFailExpected || [];
    let peg$silentFails = options.peg$silentFails | 0;
    let peg$result;
    if (options.startRule) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }
    function offset() {
      return peg$savedPos;
    }
    function range() {
      return {
        source: peg$source,
        start: peg$savedPos,
        end: peg$currPos
      };
    }
    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location2) {
      location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location2);
    }
    function error(message, location2) {
      location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildSimpleError(message, location2);
    }
    function peg$getUnicode(pos = peg$currPos) {
      const cp = input.codePointAt(pos);
      if (cp === undefined) {
        return "";
      }
      return String.fromCodePoint(cp);
    }
    function peg$literalExpectation(text2, ignoreCase) {
      return {
        type: "literal",
        text: text2,
        ignoreCase
      };
    }
    function peg$classExpectation(parts, inverted, ignoreCase, unicode) {
      return {
        type: "class",
        parts,
        inverted,
        ignoreCase,
        unicode
      };
    }
    function peg$anyExpectation() {
      return {
        type: "any"
      };
    }
    function peg$endExpectation() {
      return {
        type: "end"
      };
    }
    function peg$otherExpectation(description) {
      return {
        type: "other",
        description
      };
    }
    function peg$computePosDetails(pos) {
      let details = peg$posDetailsCache[pos];
      let p;
      if (details) {
        return details;
      } else {
        if (pos >= peg$posDetailsCache.length) {
          p = peg$posDetailsCache.length - 1;
        } else {
          p = pos;
          while (!peg$posDetailsCache[--p]) {}
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos, offset2) {
      const startPosDetails = peg$computePosDetails(startPos);
      const endPosDetails = peg$computePosDetails(endPos);
      const res = {
        source: peg$source,
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
      if (offset2 && peg$source && typeof peg$source.offset === "function") {
        res.start = peg$source.offset(res.start);
        res.end = peg$source.offset(res.end);
      }
      return res;
    }
    function peg$fail(expected2) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected2);
    }
    function peg$buildSimpleError(message, location2) {
      return new peg$SyntaxError(message, null, null, location2);
    }
    function peg$buildStructuredError(expected2, found, location2) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected2, found), expected2, found, location2);
    }
    function peg$parsetransformList() {
      let s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
      s2 = peg$parsetransforms();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = [];
      s4 = peg$parsewsp();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parsewsp();
      }
      peg$savedPos = s0;
      s0 = peg$f0(s2);
      return s0;
    }
    function peg$parsetransforms() {
      let s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$parsetransform();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecommaWsp();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsecommaWsp();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetransforms();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f1(s1, s3);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsetransform();
      }
      return s0;
    }
    function peg$parsetransform() {
      let s0;
      s0 = peg$parsematrix();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();
          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();
            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();
              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }
      return s0;
    }
    function peg$parsematrix() {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c0) {
        s1 = peg$c0;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWsp();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsenumber();
              if (s7 !== peg$FAILED) {
                s8 = peg$parsecommaWsp();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsenumber();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parsecommaWsp();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parsenumber();
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parsecommaWsp();
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parsenumber();
                          if (s13 !== peg$FAILED) {
                            s14 = peg$parsecommaWsp();
                            if (s14 !== peg$FAILED) {
                              s15 = peg$parsenumber();
                              if (s15 !== peg$FAILED) {
                                s16 = [];
                                s17 = peg$parsewsp();
                                while (s17 !== peg$FAILED) {
                                  s16.push(s17);
                                  s17 = peg$parsewsp();
                                }
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s17 = peg$c2;
                                  peg$currPos++;
                                } else {
                                  s17 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$e2);
                                  }
                                }
                                if (s17 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s0 = peg$f2(s5, s7, s9, s11, s13, s15);
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetranslate() {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c3) {
        s1 = peg$c3;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspNumber();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f3(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsescale() {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c4) {
        s1 = peg$c4;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e4);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspNumber();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f4(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parserotate() {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s1 = peg$c5;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e5);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = peg$parsecommaWspTwoNumbers();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            s7 = [];
            s8 = peg$parsewsp();
            while (s8 !== peg$FAILED) {
              s7.push(s8);
              s8 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s8 = peg$c2;
              peg$currPos++;
            } else {
              s8 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s8 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f5(s5, s6);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewX() {
      let s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c6) {
        s1 = peg$c6;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e6);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = [];
            s7 = peg$parsewsp();
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s7 = peg$c2;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s7 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f6(s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewY() {
      let s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e1);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          s5 = peg$parsenumber();
          if (s5 !== peg$FAILED) {
            s6 = [];
            s7 = peg$parsewsp();
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = peg$parsewsp();
            }
            if (input.charCodeAt(peg$currPos) === 41) {
              s7 = peg$c2;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e2);
              }
            }
            if (s7 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f7(s5);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsenumber() {
      let s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parsefloatingPointConstant();
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f8(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = peg$parseintegerConstant();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$f9(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsecommaWspNumber() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f10(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWspTwoNumbers() {
      let s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecommaWsp();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsenumber();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f11(s2, s4);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWsp() {
      let s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = [];
        s4 = peg$parsewsp();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsewsp();
        }
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomma();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsecomma() {
      let s0;
      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c8;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e8);
        }
      }
      return s0;
    }
    function peg$parseintegerConstant() {
      let s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f12(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsefloatingPointConstant() {
      let s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsefractionalConstant();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexponent();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f13(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseexponent();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f14(s1, s2);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsefractionalConstant() {
      let s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c9;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e10);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsedigitSequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f15(s1, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c9;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e10);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s0 = peg$f16(s1);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      return s0;
    }
    function peg$parseexponent() {
      let s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = input.charAt(peg$currPos);
      if (peg$r0.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        s3 = peg$parsedigitSequence();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f17(s2, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsesign() {
      let s0;
      s0 = input.charAt(peg$currPos);
      if (peg$r1.test(s0)) {
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e12);
        }
      }
      return s0;
    }
    function peg$parsedigitSequence() {
      let s0, s1;
      s0 = [];
      s1 = peg$parsedigit();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedigit();
        }
      } else {
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsedigit() {
      let s0;
      s0 = input.charAt(peg$currPos);
      if (peg$r2.test(s0)) {
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e13);
        }
      }
      return s0;
    }
    function peg$parsewsp() {
      let s0;
      s0 = input.charAt(peg$currPos);
      if (peg$r3.test(s0)) {
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      return s0;
    }
    peg$result = peg$startRuleFunction();
    const peg$success = peg$result !== peg$FAILED && peg$currPos === input.length;
    function peg$throw() {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? peg$getUnicode(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
    if (options.peg$library) {
      return {
        peg$result,
        peg$currPos,
        peg$FAILED,
        peg$maxFailExpected,
        peg$maxFailPos,
        peg$success,
        peg$throw: peg$success ? undefined : peg$throw
      };
    }
    if (peg$success) {
      return peg$result;
    } else {
      peg$throw();
    }
  }
  var peg$allowedStartRules = exports.StartRules = ["transformList"];
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromTransformAttribute.js
var require_fromTransformAttribute2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromTransformAttribute = fromTransformAttribute;
  var _fromTransformAttribute = require_fromTransformAttribute_autogenerated2();
  function fromTransformAttribute(transformString) {
    return (0, _fromTransformAttribute.parse)(transformString);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/decompose.js
var require_decompose2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.decomposeTSR = decomposeTSR;
  var _scale = require_scale2();
  var _transform = require_transform2();
  function decomposeTSR(matrix, flipX = false, flipY = false) {
    if (flipX) {
      if (flipY) {
        matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(-1, -1));
      } else {
        matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(1, -1));
      }
    } else if (flipY) {
      matrix = (0, _transform.compose)(matrix, (0, _scale.scale)(-1, 1));
    }
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    let scaleX, scaleY, rotation;
    if (a !== 0 || c !== 0) {
      const hypotAc = Math.hypot(a, c);
      scaleX = hypotAc;
      scaleY = (a * d - b * c) / hypotAc;
      const acos = Math.acos(a / hypotAc);
      rotation = c > 0 ? -acos : acos;
    } else if (b !== 0 || d !== 0) {
      const hypotBd = Math.hypot(b, d);
      scaleX = (a * d - b * c) / hypotBd;
      scaleY = hypotBd;
      const acos = Math.acos(b / hypotBd);
      rotation = Math.PI / 2 + (d > 0 ? -acos : acos);
    } else {
      scaleX = 0;
      scaleY = 0;
      rotation = 0;
    }
    if (flipY) {
      scaleX = -scaleX;
    }
    if (flipX) {
      scaleY = -scaleY;
    }
    return {
      translate: {
        tx: matrix.e,
        ty: matrix.f
      },
      scale: {
        sx: scaleX,
        sy: scaleY
      },
      rotation: {
        angle: rotation
      }
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/flip.js
var require_flip2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flipOrigin = flipOrigin;
  exports.flipX = flipX;
  exports.flipY = flipY;
  function flipX() {
    return {
      a: 1,
      c: 0,
      e: 0,
      b: 0,
      d: -1,
      f: 0
    };
  }
  function flipY() {
    return {
      a: -1,
      c: 0,
      e: 0,
      b: 0,
      d: 1,
      f: 0
    };
  }
  function flipOrigin() {
    return {
      a: -1,
      c: 0,
      e: 0,
      b: 0,
      d: -1,
      f: 0
    };
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/fromMovingPoints.js
var require_fromMovingPoints2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fromOneMovingPoint = fromOneMovingPoint;
  exports.fromTwoMovingPoints = fromTwoMovingPoints;
  var _translate = require_translate2();
  var _applyToPoint = require_applyToPoint2();
  var _rotate = require_rotate2();
  var _scale = require_scale2();
  var _transform = require_transform2();
  function fromOneMovingPoint(startingPoint, endingPoint) {
    const tx = endingPoint.x - startingPoint.x;
    const ty = endingPoint.y - startingPoint.y;
    return (0, _translate.translate)(tx, ty);
  }
  function fromTwoMovingPoints(startingPoint1, startingPoint2, endingPoint1, endingPoint2) {
    const translationMatrix = fromOneMovingPoint(startingPoint1, endingPoint1);
    const pointA = (0, _applyToPoint.applyToPoint)(translationMatrix, startingPoint2);
    const center = endingPoint1;
    const pointB = endingPoint2;
    const angle = Math.atan2(pointB.y - center.y, pointB.x - center.x) - Math.atan2(pointA.y - center.y, pointA.x - center.x);
    const rotationMatrix = (0, _rotate.rotate)(angle, center.x, center.y);
    const d1 = Math.sqrt(Math.pow(pointA.x - center.x, 2) + Math.pow(pointA.y - center.y, 2));
    const d2 = Math.sqrt(Math.pow(pointB.x - center.x, 2) + Math.pow(pointB.y - center.y, 2));
    const scalingLevel = d2 / d1;
    const scalingMatrix = (0, _scale.scale)(scalingLevel, scalingLevel, center.x, center.y);
    return (0, _transform.compose)([translationMatrix, scalingMatrix, rotationMatrix]);
  }
});

// ../simulate-return-current/node_modules/graphics-debug/node_modules/transformation-matrix/build-commonjs/index.js
var require_build_commonjs2 = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _applyToPoint = require_applyToPoint2();
  Object.keys(_applyToPoint).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _applyToPoint[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _applyToPoint[key];
      }
    });
  });
  var _fromObject = require_fromObject2();
  Object.keys(_fromObject).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromObject[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromObject[key];
      }
    });
  });
  var _fromString = require_fromString2();
  Object.keys(_fromString).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromString[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromString[key];
      }
    });
  });
  var _identity = require_identity2();
  Object.keys(_identity).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _identity[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _identity[key];
      }
    });
  });
  var _inverse = require_inverse2();
  Object.keys(_inverse).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _inverse[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _inverse[key];
      }
    });
  });
  var _isAffineMatrix = require_isAffineMatrix2();
  Object.keys(_isAffineMatrix).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _isAffineMatrix[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _isAffineMatrix[key];
      }
    });
  });
  var _rotate = require_rotate2();
  Object.keys(_rotate).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _rotate[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _rotate[key];
      }
    });
  });
  var _scale = require_scale2();
  Object.keys(_scale).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _scale[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _scale[key];
      }
    });
  });
  var _shear = require_shear2();
  Object.keys(_shear).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _shear[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _shear[key];
      }
    });
  });
  var _skew = require_skew2();
  Object.keys(_skew).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _skew[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _skew[key];
      }
    });
  });
  var _toString = require_toString2();
  Object.keys(_toString).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _toString[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _toString[key];
      }
    });
  });
  var _transform = require_transform2();
  Object.keys(_transform).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _transform[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _transform[key];
      }
    });
  });
  var _translate = require_translate2();
  Object.keys(_translate).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _translate[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _translate[key];
      }
    });
  });
  var _fromTriangles = require_fromTriangles2();
  Object.keys(_fromTriangles).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromTriangles[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromTriangles[key];
      }
    });
  });
  var _smoothMatrix = require_smoothMatrix2();
  Object.keys(_smoothMatrix).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _smoothMatrix[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _smoothMatrix[key];
      }
    });
  });
  var _fromDefinition = require_fromDefinition2();
  Object.keys(_fromDefinition).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromDefinition[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromDefinition[key];
      }
    });
  });
  var _fromTransformAttribute = require_fromTransformAttribute2();
  Object.keys(_fromTransformAttribute).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromTransformAttribute[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromTransformAttribute[key];
      }
    });
  });
  var _decompose = require_decompose2();
  Object.keys(_decompose).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _decompose[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _decompose[key];
      }
    });
  });
  var _flip = require_flip2();
  Object.keys(_flip).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _flip[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _flip[key];
      }
    });
  });
  var _fromMovingPoints = require_fromMovingPoints2();
  Object.keys(_fromMovingPoints).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (key in exports && exports[key] === _fromMovingPoints[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _fromMovingPoints[key];
      }
    });
  });
});

// ../simulate-return-current/node_modules/is-buffer/index.js
var require_is_buffer = __commonJS(function(exports, module) {
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  module.exports = function(obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
  }
});

// ../simulate-return-current/node_modules/kind-of/index.js
var require_kind_of = __commonJS(function(exports, module) {
  var isBuffer = require_is_buffer();
  var toString = Object.prototype.toString;
  module.exports = function kindOf(val) {
    if (typeof val === "undefined") {
      return "undefined";
    }
    if (val === null) {
      return "null";
    }
    if (val === true || val === false || val instanceof Boolean) {
      return "boolean";
    }
    if (typeof val === "string" || val instanceof String) {
      return "string";
    }
    if (typeof val === "number" || val instanceof Number) {
      return "number";
    }
    if (typeof val === "function" || val instanceof Function) {
      return "function";
    }
    if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
      return "array";
    }
    if (val instanceof RegExp) {
      return "regexp";
    }
    if (val instanceof Date) {
      return "date";
    }
    var type = toString.call(val);
    if (type === "[object RegExp]") {
      return "regexp";
    }
    if (type === "[object Date]") {
      return "date";
    }
    if (type === "[object Arguments]") {
      return "arguments";
    }
    if (type === "[object Error]") {
      return "error";
    }
    if (isBuffer(val)) {
      return "buffer";
    }
    if (type === "[object Set]") {
      return "set";
    }
    if (type === "[object WeakSet]") {
      return "weakset";
    }
    if (type === "[object Map]") {
      return "map";
    }
    if (type === "[object WeakMap]") {
      return "weakmap";
    }
    if (type === "[object Symbol]") {
      return "symbol";
    }
    if (type === "[object Int8Array]") {
      return "int8array";
    }
    if (type === "[object Uint8Array]") {
      return "uint8array";
    }
    if (type === "[object Uint8ClampedArray]") {
      return "uint8clampedarray";
    }
    if (type === "[object Int16Array]") {
      return "int16array";
    }
    if (type === "[object Uint16Array]") {
      return "uint16array";
    }
    if (type === "[object Int32Array]") {
      return "int32array";
    }
    if (type === "[object Uint32Array]") {
      return "uint32array";
    }
    if (type === "[object Float32Array]") {
      return "float32array";
    }
    if (type === "[object Float64Array]") {
      return "float64array";
    }
    return "object";
  };
});

// ../simulate-return-current/node_modules/rename-keys/index.js
var require_rename_keys = __commonJS(function(exports, module) {
  (function() {
    function rename(obj, fn) {
      if (typeof fn !== "function") {
        return obj;
      }
      var res = {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          res[fn(key, obj[key]) || key] = obj[key];
        }
      }
      return res;
    }
    if (typeof module !== "undefined" && module.exports) {
      module.exports = rename;
    } else {
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return rename;
        });
      } else {
        window.rename = rename;
      }
    }
  })();
});

// ../simulate-return-current/node_modules/deep-rename-keys/index.js
var require_deep_rename_keys = __commonJS(function(exports, module) {
  /*!
   * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
   *
   * Copyright (c) 2015 Jon Schlinkert, contributors.
   * Licensed under the MIT license.
   */
  var typeOf = require_kind_of();
  var rename = require_rename_keys();
  module.exports = function renameDeep(obj, cb) {
    var type = typeOf(obj);
    if (type !== "object" && type !== "array") {
      throw new Error("expected an object");
    }
    var res = [];
    if (type === "object") {
      obj = rename(obj, cb);
      res = {};
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (typeOf(val) === "object" || typeOf(val) === "array") {
          res[key] = renameDeep(val, cb);
        } else {
          res[key] = val;
        }
      }
    }
    return res;
  };
});

// ../simulate-return-current/node_modules/xml-reader/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS(function(exports, module) {
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {}
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function EventEmitter() {
    this._events = new Events;
    this._eventsCount = 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event, exists) {
    var evt = prefix ? prefix + event : event, available = this._events[evt];
    if (exists)
      return !!available;
    if (!available)
      return [];
    if (available.fn)
      return [available.fn];
    for (var i = 0, l = available.length, ee = new Array(l);i < l; i++) {
      ee[i] = available[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      this._events[evt] = listener, this._eventsCount++;
    else if (!this._events[evt].fn)
      this._events[evt].push(listener);
    else
      this._events[evt] = [this._events[evt], listener];
    return this;
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    var listener = new EE(fn, context || this, true), evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      this._events[evt] = listener, this._eventsCount++;
    else if (!this._events[evt].fn)
      this._events[evt].push(listener);
    else
      this._events[evt] = [this._events[evt], listener];
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      if (--this._eventsCount === 0)
        this._events = new Events;
      else
        delete this._events[evt];
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        if (--this._eventsCount === 0)
          this._events = new Events;
        else
          delete this._events[evt];
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else if (--this._eventsCount === 0)
        this._events = new Events;
      else
        delete this._events[evt];
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) {
        if (--this._eventsCount === 0)
          this._events = new Events;
        else
          delete this._events[evt];
      }
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
    return this;
  };
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// ../simulate-return-current/node_modules/xml-lexer/node_modules/eventemitter3/index.js
var require_eventemitter32 = __commonJS(function(exports, module) {
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  function Events() {}
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function EventEmitter() {
    this._events = new Events;
    this._eventsCount = 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event, exists) {
    var evt = prefix ? prefix + event : event, available = this._events[evt];
    if (exists)
      return !!available;
    if (!available)
      return [];
    if (available.fn)
      return [available.fn];
    for (var i = 0, l = available.length, ee = new Array(l);i < l; i++) {
      ee[i] = available[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      this._events[evt] = listener, this._eventsCount++;
    else if (!this._events[evt].fn)
      this._events[evt].push(listener);
    else
      this._events[evt] = [this._events[evt], listener];
    return this;
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    var listener = new EE(fn, context || this, true), evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      this._events[evt] = listener, this._eventsCount++;
    else if (!this._events[evt].fn)
      this._events[evt].push(listener);
    else
      this._events[evt] = [this._events[evt], listener];
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      if (--this._eventsCount === 0)
        this._events = new Events;
      else
        delete this._events[evt];
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        if (--this._eventsCount === 0)
          this._events = new Events;
        else
          delete this._events[evt];
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else if (--this._eventsCount === 0)
        this._events = new Events;
      else
        delete this._events[evt];
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) {
        if (--this._eventsCount === 0)
          this._events = new Events;
        else
          delete this._events[evt];
      }
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
    return this;
  };
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// ../simulate-return-current/node_modules/xml-lexer/dist/lexer.js
var require_lexer = __commonJS(function(exports, module) {
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var EventEmitter = require_eventemitter32();
  var noop = function noop2() {};
  var State = {
    data: "state-data",
    cdata: "state-cdata",
    tagBegin: "state-tag-begin",
    tagName: "state-tag-name",
    tagEnd: "state-tag-end",
    attributeNameStart: "state-attribute-name-start",
    attributeName: "state-attribute-name",
    attributeNameEnd: "state-attribute-name-end",
    attributeValueBegin: "state-attribute-value-begin",
    attributeValue: "state-attribute-value"
  };
  var Action = {
    lt: "action-lt",
    gt: "action-gt",
    space: "action-space",
    equal: "action-equal",
    quote: "action-quote",
    slash: "action-slash",
    char: "action-char",
    error: "action-error"
  };
  var Type = {
    text: "text",
    openTag: "open-tag",
    closeTag: "close-tag",
    attributeName: "attribute-name",
    attributeValue: "attribute-value"
  };
  var charToAction = {
    " ": Action.space,
    "\t": Action.space,
    "\n": Action.space,
    "\r": Action.space,
    "<": Action.lt,
    ">": Action.gt,
    '"': Action.quote,
    "'": Action.quote,
    "=": Action.equal,
    "/": Action.slash
  };
  var getAction = function getAction2(char) {
    return charToAction[char] || Action.char;
  };
  var create = function create2(options) {
    var _State$data, _State$tagBegin, _State$tagName, _State$tagEnd, _State$attributeNameS, _State$attributeName, _State$attributeNameE, _State$attributeValue, _State$attributeValue2, _lexer$stateMachine;
    options = Object.assign({ debug: false }, options);
    var lexer = new EventEmitter;
    var state = State.data;
    var data = "";
    var tagName = "";
    var attrName = "";
    var attrValue = "";
    var isClosing = "";
    var openingQuote = "";
    var emit = function emit2(type, value) {
      if (tagName[0] === "?" || tagName[0] === "!") {
        return;
      }
      var event = { type, value };
      if (options.debug) {
        console.log("emit:", event);
      }
      lexer.emit("data", event);
    };
    lexer.stateMachine = (_lexer$stateMachine = {}, _defineProperty(_lexer$stateMachine, State.data, (_State$data = {}, _defineProperty(_State$data, Action.lt, function() {
      if (data.trim()) {
        emit(Type.text, data);
      }
      tagName = "";
      isClosing = false;
      state = State.tagBegin;
    }), _defineProperty(_State$data, Action.char, function(char) {
      data += char;
    }), _State$data)), _defineProperty(_lexer$stateMachine, State.cdata, _defineProperty({}, Action.char, function(char) {
      data += char;
      if (data.substr(-3) === "]]>") {
        emit(Type.text, data.slice(0, -3));
        data = "";
        state = State.data;
      }
    })), _defineProperty(_lexer$stateMachine, State.tagBegin, (_State$tagBegin = {}, _defineProperty(_State$tagBegin, Action.space, noop), _defineProperty(_State$tagBegin, Action.char, function(char) {
      tagName = char;
      state = State.tagName;
    }), _defineProperty(_State$tagBegin, Action.slash, function() {
      tagName = "";
      isClosing = true;
    }), _State$tagBegin)), _defineProperty(_lexer$stateMachine, State.tagName, (_State$tagName = {}, _defineProperty(_State$tagName, Action.space, function() {
      if (isClosing) {
        state = State.tagEnd;
      } else {
        state = State.attributeNameStart;
        emit(Type.openTag, tagName);
      }
    }), _defineProperty(_State$tagName, Action.gt, function() {
      if (isClosing) {
        emit(Type.closeTag, tagName);
      } else {
        emit(Type.openTag, tagName);
      }
      data = "";
      state = State.data;
    }), _defineProperty(_State$tagName, Action.slash, function() {
      state = State.tagEnd;
      emit(Type.openTag, tagName);
    }), _defineProperty(_State$tagName, Action.char, function(char) {
      tagName += char;
      if (tagName === "![CDATA[") {
        state = State.cdata;
        data = "";
        tagName = "";
      }
    }), _State$tagName)), _defineProperty(_lexer$stateMachine, State.tagEnd, (_State$tagEnd = {}, _defineProperty(_State$tagEnd, Action.gt, function() {
      emit(Type.closeTag, tagName);
      data = "";
      state = State.data;
    }), _defineProperty(_State$tagEnd, Action.char, noop), _State$tagEnd)), _defineProperty(_lexer$stateMachine, State.attributeNameStart, (_State$attributeNameS = {}, _defineProperty(_State$attributeNameS, Action.char, function(char) {
      attrName = char;
      state = State.attributeName;
    }), _defineProperty(_State$attributeNameS, Action.gt, function() {
      data = "";
      state = State.data;
    }), _defineProperty(_State$attributeNameS, Action.space, noop), _defineProperty(_State$attributeNameS, Action.slash, function() {
      isClosing = true;
      state = State.tagEnd;
    }), _State$attributeNameS)), _defineProperty(_lexer$stateMachine, State.attributeName, (_State$attributeName = {}, _defineProperty(_State$attributeName, Action.space, function() {
      state = State.attributeNameEnd;
    }), _defineProperty(_State$attributeName, Action.equal, function() {
      emit(Type.attributeName, attrName);
      state = State.attributeValueBegin;
    }), _defineProperty(_State$attributeName, Action.gt, function() {
      attrValue = "";
      emit(Type.attributeName, attrName);
      emit(Type.attributeValue, attrValue);
      data = "";
      state = State.data;
    }), _defineProperty(_State$attributeName, Action.slash, function() {
      isClosing = true;
      attrValue = "";
      emit(Type.attributeName, attrName);
      emit(Type.attributeValue, attrValue);
      state = State.tagEnd;
    }), _defineProperty(_State$attributeName, Action.char, function(char) {
      attrName += char;
    }), _State$attributeName)), _defineProperty(_lexer$stateMachine, State.attributeNameEnd, (_State$attributeNameE = {}, _defineProperty(_State$attributeNameE, Action.space, noop), _defineProperty(_State$attributeNameE, Action.equal, function() {
      emit(Type.attributeName, attrName);
      state = State.attributeValueBegin;
    }), _defineProperty(_State$attributeNameE, Action.gt, function() {
      attrValue = "";
      emit(Type.attributeName, attrName);
      emit(Type.attributeValue, attrValue);
      data = "";
      state = State.data;
    }), _defineProperty(_State$attributeNameE, Action.char, function(char) {
      attrValue = "";
      emit(Type.attributeName, attrName);
      emit(Type.attributeValue, attrValue);
      attrName = char;
      state = State.attributeName;
    }), _State$attributeNameE)), _defineProperty(_lexer$stateMachine, State.attributeValueBegin, (_State$attributeValue = {}, _defineProperty(_State$attributeValue, Action.space, noop), _defineProperty(_State$attributeValue, Action.quote, function(char) {
      openingQuote = char;
      attrValue = "";
      state = State.attributeValue;
    }), _defineProperty(_State$attributeValue, Action.gt, function() {
      attrValue = "";
      emit(Type.attributeValue, attrValue);
      data = "";
      state = State.data;
    }), _defineProperty(_State$attributeValue, Action.char, function(char) {
      openingQuote = "";
      attrValue = char;
      state = State.attributeValue;
    }), _State$attributeValue)), _defineProperty(_lexer$stateMachine, State.attributeValue, (_State$attributeValue2 = {}, _defineProperty(_State$attributeValue2, Action.space, function(char) {
      if (openingQuote) {
        attrValue += char;
      } else {
        emit(Type.attributeValue, attrValue);
        state = State.attributeNameStart;
      }
    }), _defineProperty(_State$attributeValue2, Action.quote, function(char) {
      if (openingQuote === char) {
        emit(Type.attributeValue, attrValue);
        state = State.attributeNameStart;
      } else {
        attrValue += char;
      }
    }), _defineProperty(_State$attributeValue2, Action.gt, function(char) {
      if (openingQuote) {
        attrValue += char;
      } else {
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }
    }), _defineProperty(_State$attributeValue2, Action.slash, function(char) {
      if (openingQuote) {
        attrValue += char;
      } else {
        emit(Type.attributeValue, attrValue);
        isClosing = true;
        state = State.tagEnd;
      }
    }), _defineProperty(_State$attributeValue2, Action.char, function(char) {
      attrValue += char;
    }), _State$attributeValue2)), _lexer$stateMachine);
    var step = function step2(char) {
      if (options.debug) {
        console.log(state, char);
      }
      var actions = lexer.stateMachine[state];
      var action = actions[getAction(char)] || actions[Action.error] || actions[Action.char];
      action(char);
    };
    lexer.write = function(str) {
      var len = str.length;
      for (var i = 0;i < len; i++) {
        step(str[i]);
      }
    };
    return lexer;
  };
  module.exports = {
    State,
    Action,
    Type,
    create
  };
});

// ../simulate-return-current/node_modules/xml-reader/dist/reader.js
var require_reader = __commonJS(function(exports, module) {
  var EventEmitter = require_eventemitter3();
  var Lexer = require_lexer();
  var Type = Lexer.Type;
  var NodeType = {
    element: "element",
    text: "text"
  };
  var createNode = function createNode2(params) {
    return Object.assign({
      name: "",
      type: NodeType.element,
      value: "",
      parent: null,
      attributes: {},
      children: []
    }, params);
  };
  var create = function create2(options) {
    options = Object.assign({
      stream: false,
      parentNodes: true,
      doneEvent: "done",
      tagPrefix: "tag:",
      emitTopLevelOnly: false,
      debug: false
    }, options);
    var lexer = undefined, rootNode = undefined, current = undefined, attrName = undefined;
    var reader = new EventEmitter;
    var handleLexerData = function handleLexerData2(data) {
      switch (data.type) {
        case Type.openTag:
          if (current === null) {
            current = rootNode;
            current.name = data.value;
          } else {
            var node = createNode({
              name: data.value,
              parent: current
            });
            current.children.push(node);
            current = node;
          }
          break;
        case Type.closeTag:
          var parent = current.parent;
          if (!options.parentNodes) {
            current.parent = null;
          }
          if (current.name !== data.value) {
            break;
          }
          if (options.stream && parent === rootNode) {
            rootNode.children = [];
            current.parent = null;
          }
          if (!options.emitTopLevelOnly || parent === rootNode) {
            reader.emit(options.tagPrefix + current.name, current);
            reader.emit("tag", current.name, current);
          }
          if (current === rootNode) {
            lexer.removeAllListeners("data");
            reader.emit(options.doneEvent, current);
            rootNode = null;
          }
          current = parent;
          break;
        case Type.text:
          if (current) {
            current.children.push(createNode({
              type: NodeType.text,
              value: data.value,
              parent: options.parentNodes ? current : null
            }));
          }
          break;
        case Type.attributeName:
          attrName = data.value;
          current.attributes[attrName] = "";
          break;
        case Type.attributeValue:
          current.attributes[attrName] = data.value;
          break;
      }
    };
    reader.reset = function() {
      lexer = Lexer.create({ debug: options.debug });
      lexer.on("data", handleLexerData);
      rootNode = createNode();
      current = null;
      attrName = "";
      reader.parse = lexer.write;
    };
    reader.reset();
    return reader;
  };
  var parseSync = function parseSync2(xml, options) {
    options = Object.assign({}, options, { stream: false, tagPrefix: ":" });
    var reader = create(options);
    var res = undefined;
    reader.on("done", function(ast) {
      res = ast;
    });
    reader.parse(xml);
    return res;
  };
  module.exports = {
    parseSync,
    create,
    NodeType
  };
});

// ../simulate-return-current/node_modules/svgson/dist/svgson.cjs.js
var require_svgson_cjs = __commonJS(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var rename = require_deep_rename_keys();
  var xmlReader = require_reader();
  var parseInput = function parseInput2(input) {
    var parsed = xmlReader.parseSync("<root>".concat(input, "</root>"), {
      parentNodes: false
    });
    var isValid2 = parsed.children && parsed.children.length > 0 && parsed.children.every(function(node) {
      return node.name === "svg";
    });
    if (isValid2) {
      return parsed.children.length === 1 ? parsed.children[0] : parsed.children;
    } else {
      throw Error("nothing to parse");
    }
  };
  var camelize = function camelize2(node) {
    return rename(node, function(key) {
      if (!notCamelcase(key)) {
        return toCamelCase(key);
      }
      return key;
    });
  };
  var toCamelCase = function toCamelCase2(prop) {
    return prop.replace(/[-|:]([a-z])/gi, function(all, letter) {
      return letter.toUpperCase();
    });
  };
  var notCamelcase = function notCamelcase2(prop) {
    return /^(data|aria)(-\w+)/.test(prop);
  };
  var escapeText = function escapeText2(text) {
    if (text) {
      var str = String(text);
      return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, "]]]]><![CDATA[>"), "]]>") : str;
    }
    return "";
  };
  var escapeAttr = function escapeAttr2(attr) {
    return String(attr).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  var svgsonSync = function svgsonSync2(input) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === undefined ? function(node) {
      return node;
    } : _ref$transformNode, _ref$camelcase = _ref.camelcase, camelcase = _ref$camelcase === undefined ? false : _ref$camelcase;
    var applyFilters = function applyFilters2(input2) {
      var n;
      n = transformNode(input2);
      if (camelcase) {
        n = camelize(n);
      }
      return n;
    };
    return applyFilters(parseInput(input));
  };
  function svgson() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0;_key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function(resolve4, reject) {
      try {
        var res = svgsonSync.apply(undefined, args);
        resolve4(res);
      } catch (e) {
        reject(e);
      }
    });
  }
  var stringify = function stringify2(_ast) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$transformAttr = _ref.transformAttr, transformAttr = _ref$transformAttr === undefined ? function(key, value, escape) {
      return "".concat(key, '="').concat(escape(value), '"');
    } : _ref$transformAttr, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === undefined ? function(node) {
      return node;
    } : _ref$transformNode, _ref$selfClose = _ref.selfClose, selfClose = _ref$selfClose === undefined ? true : _ref$selfClose;
    if (Array.isArray(_ast)) {
      return _ast.map(function(ast2) {
        return stringify2(ast2, {
          transformAttr,
          selfClose,
          transformNode
        });
      }).join("");
    }
    var ast = transformNode(_ast);
    if (ast.type === "text") {
      return escapeText(ast.value);
    }
    var attributes = "";
    for (var attr in ast.attributes) {
      var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
      attributes += attrStr ? " ".concat(attrStr) : "";
    }
    return ast.children && ast.children.length > 0 || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify2(ast.children, {
      transformAttr,
      transformNode,
      selfClose
    }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
  };
  exports.default = svgson;
  exports.parse = svgson;
  exports.parseSync = svgsonSync;
  exports.stringify = stringify;
});

// ../simulate-return-current/lib/palace/run-simulation.ts
import { writeFile as writeFile4 } from "node:fs/promises";
import { resolve as resolve3, join as join2 } from "node:path";

// ../simulate-return-current/lib/palace/normalize-layered-route.ts
function normalizeLayeredRoute(trace) {
  const route = [];
  for (const [index, point] of trace.route.entries()) {
    if (point.route_type === "wire") {
      route.push(point);
      continue;
    }
    if (point.route_type !== "via")
      throw new Error("Through-pad route points are not supported");
    const previous = route.at(-1);
    const next = trace.route[index + 1];
    if (!previous || previous.route_type !== "wire" || !next)
      throw new Error("Via needs signal route endpoints on both sides");
    if (previous.layer !== point.from_layer)
      throw new Error("Via from_layer does not match preceding wire layer");
    if (previous.x !== point.x || previous.y !== point.y)
      route.push({
        route_type: "wire",
        x: point.x,
        y: point.y,
        width: previous.width,
        layer: point.from_layer
      });
    route.push(point);
    if (next.route_type !== "wire" || next.x !== point.x || next.y !== point.y)
      route.push({
        route_type: "wire",
        x: point.x,
        y: point.y,
        width: next.route_type === "wire" ? next.width : previous.width,
        layer: point.to_layer
      });
  }
  return { ...trace, route };
}

// ../simulate-return-current/lib/electrical-units.ts
function parseCurrentAmps(value) {
  return parseQuantity(value, { A: 1, mA: 0.001, uA: 0.000001, µA: 0.000001, μA: 0.000001, nA: 0.000000001 }, "current", false);
}
function parseResistanceOhms(value) {
  return parseQuantity(value, {
    ohm: 1,
    ohms: 1,
    Ohm: 1,
    Ω: 1,
    kohm: 1000,
    kOhm: 1000,
    kΩ: 1000,
    Mohm: 1e6,
    MOhm: 1e6,
    MΩ: 1e6
  }, "resistance", true);
}
function parseQuantity(value, units, label, positive) {
  let result;
  if (typeof value === "number")
    result = value;
  else if (typeof value === "string") {
    const match = /^\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*([^\s]*)\s*$/.exec(value);
    const scale = match ? match[2] === "" ? 1 : units[match[2]] : undefined;
    if (!match || scale === undefined)
      throw new Error(`Invalid ${label} "${value}"; supported units: ${Object.keys(units).join(", ")}`);
    result = Number(match[1]) * scale;
  } else
    throw new Error(`${label} must be a number or a value with units`);
  if (!Number.isFinite(result) || positive && result <= 0)
    throw new Error(`${label} must be finite${positive ? " and greater than zero" : ""}`);
  return result;
}

// ../simulate-return-current/lib/port-connectivity.ts
function portNetIds(circuitJson, sourcePortId) {
  const ports = new Set([sourcePortId]);
  const nets = new Set;
  const pending = circuitJson.filter((element) => element.type === "source_trace");
  let changed = true;
  while (changed) {
    changed = false;
    for (const trace of pending) {
      if (!trace.connected_source_port_ids.some((id) => ports.has(id)) && !trace.connected_source_net_ids.some((id) => nets.has(id)))
        continue;
      for (const id of trace.connected_source_port_ids)
        if (!ports.has(id)) {
          ports.add(id);
          changed = true;
        }
      for (const id of trace.connected_source_net_ids)
        if (!nets.has(id)) {
          nets.add(id);
          changed = true;
        }
    }
  }
  return [...nets];
}

// ../simulate-return-current/lib/named-ports.ts
function aliases(port) {
  return [
    ...new Set([
      port.name,
      ...port.port_hints ?? [],
      ...port.pin_number === undefined ? [] : [`pin${port.pin_number}`, String(port.pin_number)]
    ])
  ];
}
function resolvePort(circuitJson, selector) {
  const match = /^([^\.\s]+)\.([^\.\s]+)$/.exec(selector);
  if (!match)
    throw new Error(`Port "${selector}" must use refdes.pin syntax, e.g. R1.pin1 or U1.VDDIO1`);
  const components = circuitJson.filter((element) => element.type === "source_component" && element.name === match[1]);
  if (components.length !== 1 || components[0].type !== "source_component")
    throw new Error(`Component "${match[1]}" is ${components.length ? "ambiguous" : "missing"}`);
  const componentId = components[0].source_component_id;
  const ports = circuitJson.filter((element) => element.type === "source_port" && element.source_component_id === componentId && aliases(element).includes(match[2]));
  if (ports.length !== 1)
    throw new Error(`Port "${selector}" is ${ports.length ? "ambiguous" : "missing"}; use the ports command to inspect selectors`);
  const pcbPorts = circuitJson.filter((element) => element.type === "pcb_port" && element.source_port_id === ports[0].source_port_id);
  if (pcbPorts.length !== 1)
    throw new Error(`Port "${selector}" needs exactly one PCB port location`);
  return { source: ports[0], pcb: pcbPorts[0] };
}
function endpointMatches(circuitJson, trace, endpoint, port) {
  if (endpoint.route_type !== "wire" || !port.pcb.layers.includes(endpoint.layer) || Math.hypot(endpoint.x - port.pcb.x, endpoint.y - port.pcb.y) > 0.000001)
    return false;
  const ids = [endpoint.start_pcb_port_id, endpoint.end_pcb_port_id].filter(Boolean);
  if (ids.length)
    return ids.includes(port.pcb.pcb_port_id);
  const sourceTrace = circuitJson.find((element) => element.type === "source_trace" && element.source_trace_id === trace.source_trace_id);
  return sourceTrace?.type === "source_trace" && sourceTrace.connected_source_port_ids.includes(port.source.source_port_id);
}
function withNamedExcitations(options) {
  options = {
    ...options,
    circuitJson: options.circuitJson.map((e) => e.type === "pcb_trace" ? normalizeLayeredRoute(e) : e)
  };
  if (!options.ports.length)
    throw new Error("Specify at least one source/load/current excitation");
  const nets = options.circuitJson.filter((element) => element.type === "source_net" && (element.name === options.groundNet || element.source_net_id === options.groundNet));
  if (nets.length !== 1 || nets[0].type !== "source_net")
    throw new Error(`Ground net "${options.groundNet}" is ${nets.length ? "ambiguous" : "missing"}`);
  const groundId = nets[0].source_net_id;
  const oriented = new Map;
  const excitations = [];
  for (const [index, excitation] of options.ports.entries()) {
    const current = parseCurrentAmps(excitation.current);
    const source = resolvePort(options.circuitJson, excitation.source);
    const load = resolvePort(options.circuitJson, excitation.load);
    const reference = (selector, signal) => {
      if (!selector)
        return {
          point: { x: signal.pcb.x, y: signal.pcb.y },
          layer: options.referenceLayer ?? "bottom",
          pcbPortId: undefined
        };
      const port = resolvePort(options.circuitJson, selector);
      if (!portNetIds(options.circuitJson, port.source.source_port_id).includes(groundId))
        throw new Error(`Reference "${selector}" is not connected to the selected ground net; connect it explicitly in TSX`);
      if (port.pcb.pcb_port_id === signal.pcb.pcb_port_id)
        throw new Error("Signal and reference terminals must be different ports");
      const layer = port.pcb.layers.includes("top") ? "top" : port.pcb.layers.includes("bottom") ? "bottom" : port.pcb.layers[0];
      if (!port.pcb.layers.includes(layer))
        throw new Error(`Reference "${selector}" needs a physical copper layer`);
      return {
        point: { x: port.pcb.x, y: port.pcb.y },
        layer,
        pcbPortId: port.pcb.pcb_port_id
      };
    };
    const sourceReference = reference(excitation.sourceReference, source);
    const loadReference = reference(excitation.loadReference, load);
    if (source.pcb.pcb_port_id === load.pcb.pcb_port_id)
      throw new Error("Source and load must be different ports");
    const candidates = options.circuitJson.flatMap((element) => {
      if (element.type !== "pcb_trace" || element.route.length < 2)
        return [];
      const first = element.route[0];
      const last = element.route[element.route.length - 1];
      const forward = endpointMatches(options.circuitJson, element, first, source) && endpointMatches(options.circuitJson, element, last, load);
      const reverse2 = endpointMatches(options.circuitJson, element, last, source) && endpointMatches(options.circuitJson, element, first, load);
      return forward || reverse2 ? [{ trace: element, reverse: reverse2 }] : [];
    });
    if (candidates.length !== 1)
      throw new Error(`"${excitation.source}" → "${excitation.load}" needs exactly one continuous PCB trace; found ${candidates.length}. Branched nets and component-spanning paths are not supported`);
    const { trace, reverse } = candidates[0];
    if (oriented.has(trace.pcb_trace_id))
      throw new Error(`Trace ${trace.pcb_trace_id} is selected more than once`);
    const route = reverse ? trace.route.map((point, routeIndex) => {
      if (point.route_type === "via")
        return {
          ...point,
          from_layer: point.to_layer,
          to_layer: point.from_layer
        };
      if (point.route_type !== "wire")
        return point;
      const previous = trace.route[Math.max(0, routeIndex - 1)];
      return {
        ...point,
        width: previous.route_type === "wire" ? previous.width : point.width,
        start_pcb_port_id: point.end_pcb_port_id,
        end_pcb_port_id: point.start_pcb_port_id
      };
    }).reverse() : trace.route;
    oriented.set(trace.pcb_trace_id, { ...trace, route });
    excitations.push({
      type: "simulation_return_current_excitation",
      simulation_return_current_excitation_id: `simulation_return_current_excitation_${index}`,
      pcb_trace_id: trace.pcb_trace_id,
      ground_source_net_id: groundId,
      current,
      return_source: loadReference.point,
      return_sink: sourceReference.point,
      source_port: {
        signal_pcb_port_id: source.pcb.pcb_port_id,
        reference_pcb_port_id: sourceReference.pcbPortId,
        reference_layer: sourceReference.layer,
        resistance: parseResistanceOhms(excitation.sourceImpedance ?? 50)
      },
      load_port: {
        signal_pcb_port_id: load.pcb.pcb_port_id,
        reference_pcb_port_id: loadReference.pcbPortId,
        reference_layer: loadReference.layer,
        resistance: parseResistanceOhms(excitation.loadImpedance ?? 50)
      }
    });
  }
  return [
    ...options.circuitJson.filter((element) => element.type !== "simulation_return_current_excitation").map((element) => element.type === "pcb_trace" ? oriented.get(element.pcb_trace_id) ?? element : element),
    ...excitations
  ];
}

// ../simulate-return-current/lib/palace/python-runtime.ts
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

// ../simulate-return-current/lib/palace/run-command.ts
import { spawn } from "node:child_process";
import { open } from "node:fs/promises";
async function runCommand(options) {
  const log = await open(options.logPath, "w");
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(options.command[0], options.command.slice(1), {
        cwd: options.cwd,
        stdio: ["ignore", log.fd, log.fd]
      });
      child.once("error", (error) => reject(new Error(`Could not start ${options.command[0]}: ${error.message}; see ${options.logPath}`)));
      child.once("close", (status, signal) => status === 0 ? resolve() : reject(new Error(`${options.command[0]} exited with ${status ?? signal}; see ${options.logPath}`)));
    });
  } finally {
    await log.close();
  }
}

// ../simulate-return-current/lib/palace/python-runtime.ts
function palacePythonAsset(filename) {
  return fileURLToPath(new URL(`./python/${filename}`, import.meta.url));
}
function venvPython(directory) {
  return join(directory, process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
}
function palacePython(explicit) {
  if (explicit || process.env.PALACE_PYTHON)
    return explicit ?? process.env.PALACE_PYTHON;
  const local = venvPython(resolve(".return-current-python"));
  return existsSync(local) ? local : "python3";
}
async function setupPalacePython(options = {}) {
  const directory = resolve(options.directory ?? ".return-current-python");
  await mkdir(directory, { recursive: true });
  await runCommand({
    command: [options.python ?? "python3", "-m", "venv", directory],
    cwd: directory,
    logPath: join(directory, "venv.log")
  });
  const python = venvPython(directory);
  await runCommand({
    command: [
      python,
      "-m",
      "pip",
      "install",
      "-r",
      palacePythonAsset("requirements.txt")
    ],
    cwd: directory,
    logPath: join(directory, "install.log")
  });
  return python;
}

// ../simulate-return-current/lib/palace/run-case.ts
import { mkdir as mkdir2, writeFile as writeFile2 } from "node:fs/promises";
import { resolve as resolve2 } from "node:path";

// ../simulate-return-current/lib/geometry.ts
var import_transformation_matrix = __toESM(require_build_commonjs(), 1);
function rectangleOutline(rect) {
  if (![
    rect.center.x,
    rect.center.y,
    rect.rotation ?? 0,
    rect.width,
    rect.height
  ].every(Number.isFinite) || rect.width <= 0 || rect.height <= 0)
    throw new Error("Rectangles need finite coordinates, rotation, and positive dimensions");
  const localToWorld = import_transformation_matrix.compose(import_transformation_matrix.translate(rect.center.x, rect.center.y), import_transformation_matrix.rotateDEG(rect.rotation ?? 0));
  return [
    { x: -rect.width / 2, y: -rect.height / 2 },
    { x: rect.width / 2, y: -rect.height / 2 },
    { x: rect.width / 2, y: rect.height / 2 },
    { x: -rect.width / 2, y: rect.height / 2 }
  ].map((corner) => import_transformation_matrix.applyToPoint(localToWorld, corner));
}
function flattenRing(vertices) {
  const outline = [];
  for (let vertexIndex = 0;vertexIndex < vertices.length; vertexIndex++) {
    const start = vertices[vertexIndex];
    const end = vertices[(vertexIndex + 1) % vertices.length];
    outline.push({ x: start.x, y: start.y });
    const bulge = start.bulge ?? 0;
    if (Math.abs(bulge) < 0.000000000001)
      continue;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const center = {
      x: (start.x + end.x) / 2 - dy * (1 - bulge * bulge) / (4 * bulge),
      y: (start.y + end.y) / 2 + dx * (1 - bulge * bulge) / (4 * bulge)
    };
    const sweep = 4 * Math.atan(bulge);
    const radius = Math.hypot(start.x - center.x, start.y - center.y);
    const startAngle = Math.atan2(start.y - center.y, start.x - center.x);
    const steps = Math.ceil(Math.abs(sweep) / (Math.PI / 60));
    for (let arcIndex = 1;arcIndex < steps; arcIndex++) {
      const angle = startAngle + sweep * arcIndex / steps;
      outline.push({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      });
    }
  }
  return outline;
}
function cutoutOutline(cutout) {
  if (cutout.shape === "polygon")
    return cutout.points;
  if (cutout.shape === "circle") {
    if (!Number.isFinite(cutout.radius) || cutout.radius <= 0)
      throw new Error("Circular cutouts need a finite positive radius");
    return Array.from({ length: 120 }, (_, circleIndex) => ({
      x: cutout.center.x + cutout.radius * Math.cos(circleIndex * Math.PI / 60),
      y: cutout.center.y + cutout.radius * Math.sin(circleIndex * Math.PI / 60)
    }));
  }
  if (cutout.shape === "rect" && !cutout.corner_radius)
    return rectangleOutline(cutout);
  throw new Error("Path and rounded rectangular PCB cutouts are not supported; use a polygon cutout");
}
function pointInPolygon(point, outline) {
  let inside = false;
  for (let cornerIndex = 0;cornerIndex < outline.length; cornerIndex++) {
    const start = outline[cornerIndex];
    const end = outline[(cornerIndex + 1) % outline.length];
    const cross = (point.x - start.x) * (end.y - start.y) - (point.y - start.y) * (end.x - start.x);
    if (Math.abs(cross) < 0.000000001 && point.x >= Math.min(start.x, end.x) - 0.000000001 && point.x <= Math.max(start.x, end.x) + 0.000000001 && point.y >= Math.min(start.y, end.y) - 0.000000001 && point.y <= Math.max(start.y, end.y) + 0.000000001)
      return true;
    if (start.y > point.y !== end.y > point.y && point.x < start.x + (point.y - start.y) * (end.x - start.x) / (end.y - start.y))
      inside = !inside;
  }
  return inside;
}
function pointInRegion(point, region) {
  return pointInPolygon(point, region.outer) && !region.holes.some((hole) => pointInPolygon(point, hole)) && !(region.maskCutouts ?? []).some((hole) => pointInPolygon(point, hole));
}
function isCopper(point, geometry) {
  return pointInPolygon(point, geometry.boardOutline) && !geometry.cutouts.some((cutout) => pointInPolygon(point, cutout)) && geometry.groundRegions.some((region) => pointInRegion(point, region));
}
function segmentInCopper(segment, geometry) {
  const outlines = [
    geometry.boardOutline,
    ...geometry.cutouts,
    ...geometry.groundRegions.flatMap((region) => [
      region.outer,
      ...region.holes
    ])
  ];
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  const crossings = [0, 1];
  for (const outline of outlines) {
    for (let cornerIndex = 0;cornerIndex < outline.length; cornerIndex++) {
      const start = outline[cornerIndex];
      const end = outline[(cornerIndex + 1) % outline.length];
      const ex = end.x - start.x;
      const ey = end.y - start.y;
      const determinant = dx * ey - dy * ex;
      if (Math.abs(determinant) < 0.000000000001)
        continue;
      const ax = start.x - segment.start.x;
      const ay = start.y - segment.start.y;
      const alongSegment = (ax * ey - ay * ex) / determinant;
      const alongBoundary = (ax * dy - ay * dx) / determinant;
      if (alongSegment > 0 && alongSegment < 1 && alongBoundary >= 0 && alongBoundary <= 1)
        crossings.push(alongSegment);
    }
  }
  crossings.sort((a, b) => a - b);
  for (let crossingIndex = 1;crossingIndex < crossings.length; crossingIndex++) {
    const fraction = (crossings[crossingIndex - 1] + crossings[crossingIndex]) / 2;
    if (!isCopper({
      x: segment.start.x + fraction * dx,
      y: segment.start.y + fraction * dy
    }, geometry))
      return false;
  }
  return true;
}

// ../simulate-return-current/lib/read-geometry.ts
function pourRegion(pour) {
  if (pour.shape === "rect")
    return { outer: rectangleOutline(pour), holes: [] };
  if (pour.shape === "polygon")
    return { outer: pour.points, holes: [] };
  return {
    outer: flattenRing(pour.brep_shape.outer_ring.vertices),
    holes: pour.brep_shape.inner_rings.map((ring) => flattenRing(ring.vertices))
  };
}
function positiveFinite(number, label) {
  if (!Number.isFinite(number) || number <= 0)
    throw new Error(`${label} must be finite and greater than zero`);
  return number;
}
function validateOutline(outline) {
  if (outline.length < 3 || outline.some((point) => !Number.isFinite(point.x) || !Number.isFinite(point.y)))
    throw new Error("Copper and board polygons need at least three finite points");
}
function readGeometry(options) {
  const boards = options.circuitJson.filter((element) => element.type === "pcb_board");
  if (boards.length !== 1)
    throw new Error("Exactly one PCB board is required");
  const board = boards[0];
  if (board.num_layers !== 2)
    throw new Error("Return-current simulation currently requires a two-layer board");
  if (options.circuitJson.some((element) => element.type === "pcb_hole" || element.type === "pcb_plated_hole" || element.type === "pcb_via"))
    throw new Error("Drilled holes and vias are not supported yet; represent voids with PCB cutouts and model return contacts explicitly");
  const boardOutline = board.outline?.length ? board.outline : rectangleOutline({
    center: board.center,
    width: positiveFinite(board.width ?? 0, "Board width"),
    height: positiveFinite(board.height ?? 0, "Board height")
  });
  const excitations = options.excitations ?? options.circuitJson.filter((element) => element.type === "simulation_return_current_excitation");
  if (!excitations.length)
    throw new Error("Specify return-current excitations with signal current and return contacts");
  const groundNetIds = new Set(excitations.map((excitation) => excitation.ground_source_net_id));
  if (groundNetIds.size !== 1)
    throw new Error("All excitations must share one ground net");
  const pours = options.circuitJson.filter((element) => element.type === "pcb_copper_pour" && element.layer === "bottom" && groundNetIds.has(element.source_net_id ?? ""));
  const groundPlanes = options.circuitJson.filter((element) => element.type === "pcb_ground_plane" && groundNetIds.has(element.source_net_id));
  const groundPlaneIds = new Set(groundPlanes.flatMap((element) => element.type === "pcb_ground_plane" ? [element.pcb_ground_plane_id] : []));
  const planeRegions = options.circuitJson.filter((element) => element.type === "pcb_ground_plane_region" && element.layer === "bottom" && groundPlaneIds.has(element.pcb_ground_plane_id));
  const groundRegions = [
    ...pours.map(pourRegion),
    ...planeRegions.flatMap((region) => region.type === "pcb_ground_plane_region" ? [{ outer: region.points, holes: [] }] : [])
  ];
  if (!groundRegions.length)
    throw new Error("The selected ground net needs a bottom-layer copper pour or ground-plane region");
  const cutouts = options.circuitJson.filter((element) => element.type === "pcb_cutout").map(cutoutOutline);
  for (const outline of [
    boardOutline,
    ...cutouts,
    ...groundRegions.flatMap((region) => [region.outer, ...region.holes])
  ])
    validateOutline(outline);
  const geometry = {
    board,
    boardOutline,
    groundRegions,
    cutouts,
    signals: [],
    segments: [],
    excitations
  };
  for (const excitation of excitations) {
    if (!Number.isFinite(excitation.current))
      throw new Error("Excitation current must be finite (amperes)");
    for (const contact of [excitation.return_source, excitation.return_sink]) {
      if (!Number.isFinite(contact.x) || !Number.isFinite(contact.y) || !isCopper(contact, geometry))
        throw new Error("Each return contact must lie on the selected ground copper");
    }
    const signal = options.circuitJson.find((element) => element.type === "pcb_trace" && element.pcb_trace_id === excitation.pcb_trace_id);
    if (!signal || signal.type !== "pcb_trace")
      throw new Error("An excitation references a missing signal trace");
    if (signal.route.length < 2)
      throw new Error("Each signal trace needs at least two route points");
    const wires = signal.route.map((routePoint) => {
      if (routePoint.route_type !== "wire" || routePoint.layer !== "top")
        throw new Error("Only continuous top-layer wire routes are supported; split routes at vias or pads");
      if (!Number.isFinite(routePoint.x) || !Number.isFinite(routePoint.y))
        throw new Error("Signal coordinates must be finite");
      positiveFinite(routePoint.width, "Signal width");
      return routePoint;
    });
    geometry.signals.push(signal);
    for (let routeIndex = 1;routeIndex < wires.length; routeIndex++) {
      const start = wires[routeIndex - 1];
      const end = wires[routeIndex];
      if (start.x === end.x && start.y === end.y)
        continue;
      const boardMaterial = {
        ...geometry,
        groundRegions: [{ outer: boardOutline, holes: [] }]
      };
      if (!segmentInCopper({ start, end }, boardMaterial))
        throw new Error("A top-layer signal leaves the board or crosses a physical PCB cutout");
      geometry.segments.push({
        start,
        end,
        width: start.width,
        current: excitation.current
      });
    }
  }
  if (!geometry.segments.length)
    throw new Error("Signal traces must contain a segment of nonzero length");
  return geometry;
}

// ../simulate-return-current/lib/palace/copper-connectivity.ts
function copperConnectivity(circuitJson) {
  const parents = new Map;
  const find = (id) => {
    const parent = parents.get(id);
    if (!parent) {
      parents.set(id, id);
      return id;
    }
    if (parent === id)
      return id;
    const root = find(parent);
    parents.set(id, root);
    return root;
  };
  for (const element of circuitJson) {
    if (element.type !== "source_trace")
      continue;
    const ids = [
      element.source_trace_id,
      ...element.connected_source_net_ids,
      ...element.connected_source_port_ids
    ];
    for (const id of ids)
      parents.set(find(id), find(ids[0]));
  }
  const netIds = new Map;
  for (const element of circuitJson)
    if (element.type === "source_net") {
      const root = find(element.source_net_id);
      const existing = netIds.get(root);
      if (existing && existing !== element.source_net_id)
        throw new Error(`Source connectivity joins distinct nets ${existing} and ${element.source_net_id}`);
      netIds.set(root, element.source_net_id);
    }
  const owner = (id) => netIds.get(find(id)) ?? find(id);
  const pcbPorts = new Map;
  const pcbTraces = new Map;
  for (const element of circuitJson) {
    if (element.type === "pcb_port")
      pcbPorts.set(element.pcb_port_id, owner(element.source_port_id));
    if (element.type === "pcb_trace")
      pcbTraces.set(element.pcb_trace_id, owner(element.source_trace_id ?? element.pcb_trace_id));
  }
  return { owner, pcbPorts, pcbTraces };
}

// ../simulate-return-current/lib/palace/copper-outlines.ts
var import_transformation_matrix2 = __toESM(require_build_commonjs(), 1);
function traceOutline(segment) {
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  const length = Math.hypot(dx, dy);
  const transform = import_transformation_matrix2.compose(import_transformation_matrix2.translate((segment.start.x + segment.end.x) / 2, (segment.start.y + segment.end.y) / 2), import_transformation_matrix2.rotateDEG(Math.atan2(dy, dx) * 180 / Math.PI));
  return [-1, 1].flatMap((end) => Array.from({ length: 17 }, (_, index) => {
    const angle = index * Math.PI / 16 + (end === 1 ? -Math.PI / 2 : Math.PI / 2);
    return import_transformation_matrix2.applyToPoint(transform, {
      x: end * length / 2 + segment.width / 2 * Math.cos(angle),
      y: segment.width / 2 * Math.sin(angle)
    });
  }));
}
function roundedOutline(options) {
  positiveFinite(options.width, "outline width");
  positiveFinite(options.height, "outline height");
  const radius = options.radius ?? Math.min(options.width, options.height) / 2;
  if (!Number.isFinite(radius) || radius <= 0 || radius > Math.min(options.width, options.height) / 2 + 0.0000001)
    throw new Error("Invalid rounded copper radius");
  const transform = import_transformation_matrix2.compose(import_transformation_matrix2.translate(options.x, options.y), import_transformation_matrix2.rotateDEG(options.ccwRotationDegrees ?? 0));
  return Array.from({ length: 32 }, (_, index) => {
    const angle = index * 2 * Math.PI / 32;
    const x = Math.cos(angle), y = Math.sin(angle);
    return import_transformation_matrix2.applyToPoint(transform, {
      x: Math.sign(x) * (options.width / 2 - radius) + radius * x,
      y: Math.sign(y) * (options.height / 2 - radius) + radius * y
    });
  });
}
function smtPadOutline(pad) {
  if (pad.shape === "polygon")
    return pad.points;
  if (pad.shape === "circle")
    return roundedOutline({
      ...pad,
      width: 2 * pad.radius,
      height: 2 * pad.radius
    });
  if (pad.shape === "rect" || pad.shape === "rotated_rect")
    return rectangleOutline({
      center: pad,
      width: pad.width,
      height: pad.height,
      rotation: pad.shape === "rotated_rect" ? pad.ccw_rotation : 0
    });
  if (pad.shape === "pill" || pad.shape === "rotated_pill")
    return roundedOutline({
      ...pad,
      radius: pad.radius,
      ccwRotationDegrees: pad.shape === "rotated_pill" ? pad.ccw_rotation : 0
    });
  throw new Error("Unsupported SMT pad shape");
}
function drillOutline(hole) {
  if ("hole_diameter" in hole)
    return roundedOutline({
      x: hole.x + ("hole_offset_x" in hole ? hole.hole_offset_x ?? 0 : 0),
      y: hole.y + ("hole_offset_y" in hole ? hole.hole_offset_y ?? 0 : 0),
      width: positiveFinite(hole.hole_diameter ?? 0, "hole diameter"),
      height: positiveFinite(hole.hole_diameter ?? 0, "hole diameter")
    });
  if ("hole_width" in hole)
    return roundedOutline({
      ...hole,
      width: positiveFinite(hole.hole_width ?? 0, "hole width"),
      height: positiveFinite(hole.hole_height ?? 0, "hole height"),
      ccwRotationDegrees: "ccw_rotation" in hole ? hole.ccw_rotation : 0
    });
  throw new Error("Unsupported drilled hole shape");
}
function platedPadOutline(hole) {
  if ("outer_diameter" in hole)
    return roundedOutline({
      ...hole,
      width: hole.outer_diameter,
      height: hole.outer_diameter
    });
  if ("outer_width" in hole)
    return roundedOutline({
      ...hole,
      width: hole.outer_width,
      height: hole.outer_height,
      ccwRotationDegrees: "ccw_rotation" in hole ? hole.ccw_rotation : 0
    });
  if (hole.shape === "circular_hole_with_rect_pad")
    return rectangleOutline({
      center: hole,
      width: hole.rect_pad_width,
      height: hole.rect_pad_height,
      rotation: hole.rect_ccw_rotation
    });
  throw new Error(`Unsupported plated hole shape: ${hole.shape}`);
}

// ../simulate-return-current/node_modules/zod/v3/external.js
var exports_external = {};
__export(exports_external, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../simulate-return-current/node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../simulate-return-current/node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../simulate-return-current/node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../simulate-return-current/node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
// ../simulate-return-current/node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === en_default ? undefined : en_default
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
// ../simulate-return-current/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../simulate-return-current/node_modules/zod/v3/types.js
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {} else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
// ../simulate-return-current/lib/palace/stackup.ts
var copperLayer = exports_external.string().regex(/^(top|bottom|inner[1-8])$/);
var fabricationStackupSchema = exports_external.object({
  nominalBoardThicknessMm: exports_external.number().finite().positive().optional(),
  layers: exports_external.array(exports_external.union([
    exports_external.object({
      name: copperLayer,
      copperThicknessMm: exports_external.number().finite().positive()
    }),
    exports_external.object({
      material: exports_external.string().min(1),
      dielectricThicknessMm: exports_external.number().finite().positive(),
      dielectricConstant: exports_external.number().finite().positive(),
      lossTangent: exports_external.number().finite().nonnegative().optional()
    })
  ]))
});
function parseFabricationStackup(input) {
  return fabricationStackupSchema.parse(input);
}
function physicalStackup(options) {
  const stackup = parseFabricationStackup(options.stackup);
  const expected = [
    "top",
    ...Array.from({ length: options.numLayers - 2 }, (_, i) => `inner${i + 1}`),
    "bottom"
  ];
  if (stackup.layers.length !== 2 * options.numLayers - 1)
    throw new Error("Stackup must alternate copper and dielectric, top to bottom");
  const copperLayers = [];
  const dielectrics = [];
  const bottom = stackup.layers.at(-1);
  if (!bottom || !("name" in bottom) || bottom.name !== "bottom")
    throw new Error("Stackup must end with bottom copper");
  let z = -bottom.copperThicknessMm;
  for (let index = stackup.layers.length - 1;index >= 0; index--) {
    const layer = stackup.layers[index];
    if (index % 2 === 0) {
      if (!("name" in layer) || layer.name !== expected[index / 2])
        throw new Error(`Stackup copper order must be ${expected.join(", ")}`);
      const thickness = positiveFinite(layer.copperThicknessMm, "copper thickness");
      copperLayers.unshift({ name: layer.name, zMin: z, zMax: z + thickness });
      z += thickness;
    } else {
      if (!("material" in layer))
        throw new Error("A dielectric is required between copper layers");
      dielectrics.push({
        material: layer.material,
        zMin: z,
        zMax: z + layer.dielectricThicknessMm,
        dielectricConstant: layer.dielectricConstant,
        lossTangent: layer.lossTangent ?? options.lossTangent,
        attribute: 100 + index
      });
      z += layer.dielectricThicknessMm;
    }
  }
  return {
    copperLayers,
    dielectrics,
    physicalThicknessMm: z + bottom.copperThicknessMm,
    nominalBoardThicknessMm: stackup.nominalBoardThicknessMm
  };
}

// ../simulate-return-current/lib/palace/create-multilayer-model.ts
function createMultilayerPalaceModel(options) {
  options = {
    ...options,
    circuitJson: options.circuitJson.map((e) => e.type === "pcb_trace" ? normalizeLayeredRoute(e) : e)
  };
  const boards = options.circuitJson.filter((e) => e.type === "pcb_board");
  if (boards.length !== 1)
    throw new Error("Exactly one PCB board is required");
  const board = boards[0];
  if (options.copperModel === "surface_impedance_copper")
    throw new Error("surface_impedance_copper currently supports the two-layer mesher only");
  if (!options.stackup)
    throw new Error("Multilayer boards require an explicit fabrication stackup (--stackup-file); layer spacing is not inferred");
  if (!Number.isInteger(board.num_layers) || board.num_layers < 2)
    throw new Error("Board must have at least two copper layers");
  if (options.layerSeparation !== undefined || options.copperThickness !== undefined)
    throw new Error("Use stackup layer thicknesses instead of layerSeparation/copperThickness");
  const substrateLossTangent = options.substrateLossTangent ?? 0.02;
  if (!Number.isFinite(substrateLossTangent) || substrateLossTangent < 0)
    throw new Error("substrateLossTangent must be finite and nonnegative");
  const stackup = physicalStackup({
    stackup: options.stackup,
    numLayers: board.num_layers,
    lossTangent: substrateLossTangent
  });
  const sampleLayer = options.sampleLayer ?? "bottom";
  const sampleFoil = stackup.copperLayers.find((layer) => layer.name === sampleLayer);
  if (!sampleFoil)
    throw new Error(`Sample layer ${sampleLayer} is absent from the stackup`);
  const frequencyHz = positiveFinite(options.frequencyHz, "frequencyHz");
  const copperConductivity = positiveFinite(options.copperConductivity ?? 58000000, "copperConductivity");
  const skinDepthMm = 1000 / Math.sqrt(Math.PI * frequencyHz * 0.0000004 * Math.PI * copperConductivity);
  if (stackup.copperLayers.some((layer) => layer.zMax - layer.zMin > skinDepthMm))
    throw new Error("The current volume mesher requires copper thickness <= skin depth; refine copper through its thickness before using higher frequencies");
  const excitations = options.excitations ?? options.circuitJson.filter((e) => e.type === "simulation_return_current_excitation");
  const groundIds = new Set(excitations.map((e) => e.ground_source_net_id));
  if (!excitations.length || groundIds.size !== 1)
    throw new Error("Specify excitations sharing one reference net");
  const referenceNetId = excitations[0].ground_source_net_id;
  const connectivity = copperConnectivity(options.circuitJson);
  const boardOutline = board.outline?.length ? board.outline : rectangleOutline({
    center: board.center,
    width: board.width ?? 0,
    height: board.height ?? 0
  });
  const boardCutouts = options.circuitJson.filter((e) => e.type === "pcb_cutout").map(cutoutOutline);
  const viaClearance = positiveFinite(options.viaClearance ?? board.min_trace_to_pad_edge_clearance ?? 0.2, "viaClearance");
  const layered = {
    stackup,
    sampleLayer,
    referenceNetId,
    viaClearance,
    copper: [],
    drills: [],
    barrels: [],
    boardCutouts,
    audit: {
      traces: 0,
      vias: 0,
      pads: 0,
      platedHoles: 0,
      unplatedHoles: 0,
      pours: 0,
      omittedCopperElements: 0,
      warnings: [
        "Component bodies, package/decoupling impedances, solder mask and silkscreen are not modeled.",
        "Circular copper/drills use 32-sided polygons. Via plating uses 0.025 mm; override support is not yet provided."
      ]
    }
  };
  const copperByKey = new Map;
  for (const layer of stackup.copperLayers)
    for (const netId of [referenceNetId]) {
      const copper = { layer: layer.name, netId, regions: [], segments: [] };
      copperByKey.set(`${layer.name}:${netId}`, copper);
      layered.copper.push(copper);
    }
  const traces = new Map;
  for (const element of options.circuitJson) {
    if (element.type === "pcb_trace")
      traces.set(element.pcb_trace_id, element);
    const additions = [];
    if (element.type === "pcb_copper_pour") {
      if (!element.source_net_id)
        throw new Error("Copper pours require a source_net_id");
      additions.push({
        layer: element.layer,
        netId: connectivity.owner(element.source_net_id),
        region: { ...pourRegion(element), isPlane: true }
      });
      layered.audit.pours++;
    }
    if (element.type === "pcb_ground_plane_region") {
      const plane = options.circuitJson.find((e) => e.type === "pcb_ground_plane" && e.pcb_ground_plane_id === element.pcb_ground_plane_id);
      if (!plane || plane.type !== "pcb_ground_plane")
        throw new Error("Missing ground-plane owner");
      additions.push({
        layer: element.layer,
        netId: connectivity.owner(plane.source_net_id),
        region: { outer: element.points, holes: [], isPlane: true }
      });
    }
    if (element.type === "pcb_smtpad") {
      const netId = element.pcb_port_id ? connectivity.pcbPorts.get(element.pcb_port_id) : undefined;
      if (!netId)
        throw new Error(`Pad ${element.pcb_smtpad_id} has no PCB port ownership`);
      additions.push({
        layer: element.layer,
        netId,
        region: { outer: smtPadOutline(element), holes: [] }
      });
      layered.audit.pads++;
    }
    if (element.type === "pcb_trace") {
      const netId = connectivity.pcbTraces.get(element.pcb_trace_id);
      validateLayeredRoute(element, stackup.copperLayers.map((l) => l.name));
      for (let index = 1;index < element.route.length; index++) {
        const start = element.route[index - 1], end = element.route[index];
        if (start.route_type !== "wire" || end.route_type !== "wire")
          continue;
        if (start.x === end.x && start.y === end.y)
          continue;
        additions.push({
          layer: start.layer,
          netId,
          segment: {
            start,
            end,
            width: positiveFinite(start.width, "trace width"),
            current: 0
          }
        });
      }
      layered.audit.traces++;
    }
    for (const addition of additions) {
      if (!stackup.copperLayers.some((l) => l.name === addition.layer))
        throw new Error(`Copper on absent layer ${addition.layer}`);
      const key = `${addition.layer}:${addition.netId}`;
      let copper = copperByKey.get(key);
      if (!copper) {
        copper = {
          layer: addition.layer,
          netId: addition.netId,
          regions: [],
          segments: []
        };
        copperByKey.set(key, copper);
        layered.copper.push(copper);
      }
      if (addition.region)
        copper.regions.push(addition.region);
      if (addition.segment)
        copper.segments.push(addition.segment);
    }
  }
  const bottom = stackup.copperLayers.at(-1), top = stackup.copperLayers[0];
  for (const element of options.circuitJson) {
    if (element.type === "pcb_hole") {
      layered.drills.push({
        hole: drillOutline(element),
        zMin: bottom.zMin,
        zMax: top.zMax
      });
      layered.audit.unplatedHoles++;
    }
    if (element.type !== "pcb_via" && element.type !== "pcb_plated_hole")
      continue;
    const netId = element.type === "pcb_via" ? element.source_net_id ? connectivity.owner(element.source_net_id) : element.pcb_trace_id ? connectivity.pcbTraces.get(element.pcb_trace_id) : undefined : element.pcb_port_id ? connectivity.pcbPorts.get(element.pcb_port_id) : undefined;
    if (!netId)
      throw new Error(`Cannot identify copper ownership for ${element.type}; supply source_net_id or pcb_trace_id`);
    const layers = element.layers.map((name) => stackup.copperLayers.find((l) => l.name === name));
    if (!layers.length || layers.some((l) => !l))
      throw new Error("Via/hole references an absent stackup layer");
    const zMin = Math.min(...layers.map((l) => l.zMin)), zMax = Math.max(...layers.map((l) => l.zMax));
    const hole = element.type === "pcb_via" ? roundedOutline({
      ...element,
      width: element.hole_diameter,
      height: element.hole_diameter
    }) : drillOutline(element);
    const pads = element.type === "pcb_via" ? roundedOutline({
      ...element,
      width: element.outer_diameter,
      height: element.outer_diameter
    }) : platedPadOutline(element);
    layered.barrels.push({
      netId,
      hole,
      outer: hole,
      pads,
      layers: element.layers,
      zMin,
      zMax,
      platingThickness: 0.025
    });
    layered.drills.push({ hole, zMin, zMax });
    if (element.type === "pcb_via")
      layered.audit.vias++;
    else
      layered.audit.platedHoles++;
  }
  for (const trace of traces.values())
    for (const route of trace.route) {
      if (route.route_type !== "via")
        continue;
      const barrel = layered.barrels.find((b) => b.netId === connectivity.pcbTraces.get(trace.pcb_trace_id) && pointInPolygon(route, b.hole) && b.layers.includes(route.from_layer) && b.layers.includes(route.to_layer));
      if (!barrel)
        throw new Error(`Trace ${trace.pcb_trace_id} changes layer without a matching physical pcb_via`);
    }
  for (const barrel of layered.barrels)
    barrel.clearance = barrelClearanceOutline(barrel, viaClearance);
  const groundCopper = copperByKey.get(`${sampleLayer}:${referenceNetId}`);
  if (!groundCopper.regions.length)
    throw new Error(`Reference net needs copper regions on sample layer ${sampleLayer}; no plane is invented`);
  const geometry = {
    board,
    boardOutline,
    groundRegions: groundCopper.regions.map((region) => ({
      ...region,
      holes: [...region.holes]
    })),
    cutouts: [...boardCutouts],
    signals: [],
    segments: [],
    excitations
  };
  for (const segment of groundCopper.segments) {
    geometry.groundRegions.push({
      outer: traceOutline(segment),
      holes: []
    });
  }
  for (const barrel of layered.barrels) {
    if (barrel.zMin > sampleFoil.zMin || barrel.zMax < sampleFoil.zMax)
      continue;
    if (barrel.netId === referenceNetId && barrel.layers.includes(sampleLayer))
      geometry.groundRegions.push({ outer: barrel.pads, holes: [barrel.hole] });
    else if (barrel.netId !== referenceNetId) {
      for (const region of geometry.groundRegions.filter((region2) => region2.isPlane))
        region.maskCutouts = [
          ...region.maskCutouts ?? [],
          barrelClearanceOutline(barrel, viaClearance)
        ];
    }
  }
  for (const drill of layered.drills)
    if (drill.zMin <= sampleFoil.zMin && drill.zMax >= sampleFoil.zMax)
      geometry.cutouts.push(drill.hole);
  const ports = [];
  for (const excitation of excitations) {
    if (!Number.isFinite(excitation.current))
      throw new Error("Excitation current must be finite");
    const trace = traces.get(excitation.pcb_trace_id);
    if (!trace)
      throw new Error("Missing excited trace");
    geometry.signals.push(trace);
    for (let index = 1;index < trace.route.length; index++) {
      const start = trace.route[index - 1], end = trace.route[index];
      if (start.route_type === "wire" && end.route_type === "wire" && (start.x !== end.x || start.y !== end.y))
        geometry.segments.push({
          start,
          end,
          width: start.width,
          current: excitation.current
        });
    }
    for (const [endpoint, reference, terminal] of [
      [trace.route[0], excitation.return_sink, excitation.source_port],
      [trace.route.at(-1), excitation.return_source, excitation.load_port]
    ]) {
      if (endpoint.route_type !== "wire")
        throw new Error("Ports require wire endpoints");
      const signalFoil = stackup.copperLayers.find((l) => l.name === endpoint.layer);
      const referenceFoil = stackup.copperLayers.find((l) => l.name === (terminal?.reference_layer ?? sampleLayer));
      if (!referenceFoil)
        throw new Error("Reference layer is absent");
      if (terminal?.reference_pcb_port_id && connectivity.pcbPorts.get(terminal.reference_pcb_port_id) !== referenceNetId)
        throw new Error("Reference pin is not on the reference net");
      for (const [id, position, layer] of [
        [terminal?.signal_pcb_port_id, endpoint, endpoint.layer],
        [terminal?.reference_pcb_port_id, reference, referenceFoil.name]
      ]) {
        if (!id)
          continue;
        const pcb = options.circuitJson.find((e) => e.type === "pcb_port" && e.pcb_port_id === id);
        if (!pcb || pcb.type !== "pcb_port" || !pcb.layers.includes(layer) || Math.hypot(pcb.x - position.x, pcb.y - position.y) > 0.000001)
          throw new Error("Terminal does not match its PCB port position/layer");
      }
      const below = referenceFoil.zMin < signalFoil.zMin;
      ports.push({
        signal: { x: endpoint.x, y: endpoint.y },
        reference: { x: reference.x, y: reference.y },
        signalLayer: signalFoil.name,
        referenceLayer: referenceFoil.name,
        signalZ: below ? signalFoil.zMin : signalFoil.zMax,
        referenceZ: below ? referenceFoil.zMax : referenceFoil.zMin === signalFoil.zMin ? signalFoil.zMax : referenceFoil.zMin,
        resistance: positiveFinite(terminal?.resistance ?? options.portResistance ?? 50, "port resistance"),
        signalPcbPortId: terminal?.signal_pcb_port_id,
        referencePcbPortId: terminal?.reference_pcb_port_id
      });
    }
  }
  if (stackup.nominalBoardThicknessMm && Math.abs(stackup.physicalThicknessMm - stackup.nominalBoardThicknessMm) > 0.0001)
    layered.audit.warnings.push(`Explicit stack sums to ${stackup.physicalThicknessMm} mm, nominal ${stackup.nominalBoardThicknessMm} mm; explicit dimensions are used without scaling.`);
  geometry.physicalModelSignature = JSON.stringify({
    ...layered,
    traceEndCaps: "round_32",
    audit: undefined
  });
  const order = options.order ?? 2;
  if (order !== 1 && order !== 2)
    throw new Error("order must be 1 or 2");
  return {
    schemaVersion: 1,
    multilayer: layered,
    geometry,
    ports,
    topPads: [],
    frequencyHz,
    layerSeparation: top.zMin - bottom.zMax,
    copperThickness: sampleFoil.zMax - sampleFoil.zMin,
    copperConductivity,
    substratePermittivity: options.substratePermittivity ?? 4.3,
    substrateLossTangent,
    portResistance: positiveFinite(options.portResistance ?? 50, "portResistance"),
    portWidth: positiveFinite(options.portWidth ?? 0.18, "portWidth"),
    meshSize: positiveFinite(options.meshSize ?? 1, "meshSize"),
    airPadding: positiveFinite(options.airPadding ?? 10, "airPadding"),
    order,
    copperModel: "volumetric_copper"
  };
}
function validateLayeredRoute(trace, layers) {
  for (const [index, route] of trace.route.entries()) {
    if (route.route_type !== "wire" && route.route_type !== "via")
      throw new Error("Unsupported route point type");
    if (![route.x, route.y].every(Number.isFinite))
      throw new Error("Trace coordinates must be finite");
    if (route.route_type === "wire") {
      positiveFinite(route.width, "trace width");
      if (!layers.includes(route.layer))
        throw new Error(`Unknown route layer ${route.layer}`);
      const previous = trace.route[index - 1];
      if (previous?.route_type === "wire" && previous.layer !== route.layer)
        throw new Error("Layer transitions require a via route point");
    } else if (route.route_type === "via") {
      const previous = trace.route[index - 1], next = trace.route[index + 1];
      if (previous?.route_type !== "wire" || next?.route_type !== "wire" || previous.layer !== route.from_layer || next.layer !== route.to_layer || Math.hypot(previous.x - route.x, previous.y - route.y) > 0.000001 || Math.hypot(next.x - route.x, next.y - route.y) > 0.000001)
        throw new Error("Via route must join matching, colocated layer endpoints");
    } else
      throw new Error("Unsupported route point type");
  }
}
function barrelClearanceOutline(barrel, clearance) {
  const xs = barrel.pads.map((p) => p.x), ys = barrel.pads.map((p) => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  return rectangleOutline({
    center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
    width: maxX - minX + 2 * clearance,
    height: maxY - minY + 2 * clearance
  });
}

// ../simulate-return-current/lib/palace/create-palace-model.ts
function createPalaceModel(options) {
  if (options.stackup || options.circuitJson.some((element) => element.type === "pcb_board" && element.num_layers > 2))
    return createMultilayerPalaceModel(options);
  if (options.sampleLayer && options.sampleLayer !== "bottom")
    throw new Error("A non-bottom sample layer requires an explicit stackup");
  const frequencyHz = positiveFinite(options.frequencyHz, "frequencyHz");
  const geometry = readGeometry({
    ...options,
    circuitJson: options.circuitJson.filter((element) => element.type !== "pcb_via")
  });
  const layerSeparation = positiveFinite(options.layerSeparation ?? geometry.board.thickness ?? 0.8, "layerSeparation");
  const copperThickness = positiveFinite(options.copperThickness ?? 0.035, "copperThickness");
  const copperConductivity = positiveFinite(options.copperConductivity ?? 58000000, "copperConductivity");
  const skinDepthMm = 1000 / Math.sqrt(Math.PI * frequencyHz * 0.0000004 * Math.PI * copperConductivity);
  const copperModel = options.copperModel ?? "volumetric_copper";
  if (copperModel !== "volumetric_copper" && copperModel !== "surface_impedance_copper")
    throw new Error("Unknown copperModel");
  if (copperModel === "surface_impedance_copper" && copperThickness < 3 * skinDepthMm)
    throw new Error("The half-space surface-impedance model requires foil and via-wall thickness >= 3 skin depths; use volumetric copper at lower frequencies");
  if (copperModel === "volumetric_copper" && copperThickness > skinDepthMm)
    throw new Error("The current volume mesher requires copper thickness <= skin depth; refine copper through its thickness before using higher frequencies");
  const ports = [];
  for (const [index, signal] of geometry.signals.entries()) {
    const first = signal.route[0];
    const last = signal.route.at(-1);
    const excitation = geometry.excitations[index];
    if (!last || first.route_type !== "wire" || last.route_type !== "wire")
      throw new Error("Palace requires wire endpoints");
    for (const [endpoint, contact, terminal] of [
      [first, excitation.return_sink, excitation.source_port],
      [last, excitation.return_source, excitation.load_port]
    ]) {
      if (!terminal && Math.hypot(endpoint.x - contact.x, endpoint.y - contact.y) > 0.000001)
        throw new Error("Legacy Palace ports require return contacts directly below signal endpoints; specify explicit terminal metadata for offset references");
      for (const [id, position, role] of [
        [terminal?.signal_pcb_port_id, endpoint, "signal"],
        [terminal?.reference_pcb_port_id, contact, "reference"]
      ]) {
        if (!id)
          continue;
        const pcb = options.circuitJson.find((element) => element.type === "pcb_port" && element.pcb_port_id === id);
        if (!pcb || pcb.type !== "pcb_port" || Math.hypot(pcb.x - position.x, pcb.y - position.y) > 0.000001)
          throw new Error(`Explicit ${role} terminal does not match its PCB port`);
        const layer = role === "signal" ? "top" : terminal.reference_layer;
        if (!pcb.layers.includes(layer))
          throw new Error(`Explicit ${role} terminal is not on ${layer}`);
        if (role === "reference" && !portNetIds(options.circuitJson, pcb.source_port_id).includes(excitation.ground_source_net_id))
          throw new Error("Explicit reference terminal is not connected to the ground net");
      }
      if (terminal?.reference_layer === "top" && !terminal.reference_pcb_port_id)
        throw new Error("Top reference requires an explicit PCB port");
      ports.push({
        signal: { x: endpoint.x, y: endpoint.y },
        reference: { x: contact.x, y: contact.y },
        referenceLayer: terminal?.reference_layer ?? "bottom",
        resistance: positiveFinite(terminal?.resistance ?? options.portResistance ?? 50, "port resistance"),
        signalPcbPortId: terminal?.signal_pcb_port_id,
        referencePcbPortId: terminal?.reference_pcb_port_id
      });
    }
  }
  const referenceIds = new Set(ports.filter((port) => port.referenceLayer === "top").map((port) => port.referencePcbPortId));
  const topGroundPads = [];
  const topPads = options.circuitJson.flatMap((element) => {
    if (element.type !== "pcb_smtpad" || element.layer !== "top")
      return [];
    if (element.shape !== "rect")
      throw new Error("Palace currently supports rectangular top SMT pads");
    const outline = rectangleOutline({
      center: { x: element.x, y: element.y },
      width: element.width,
      height: element.height
    });
    if (referenceIds.has(element.pcb_port_id)) {
      topGroundPads.push(outline);
      return [];
    }
    return [outline];
  });
  const groundVias = options.circuitJson.flatMap((element) => {
    if (element.type !== "pcb_via")
      return [];
    const pad = options.circuitJson.find((pad2) => pad2.type === "pcb_smtpad" && pad2.shape === "rect" && pad2.layer === "top" && referenceIds.has(pad2.pcb_port_id) && Math.hypot(pad2.x - element.x, pad2.y - element.y) < 0.000001);
    if (!pad || pad.type !== "pcb_smtpad" || pad.shape !== "rect" || element.source_net_id !== geometry.excitations[0].ground_source_net_id || !element.layers.includes("top") || !element.layers.includes("bottom") || element.layers.length !== 2)
      throw new Error("Only top-to-bottom ground vias centered in selected rectangular reference pads are supported");
    const holeDiameter = positiveFinite(element.hole_diameter, "via hole diameter");
    const outerDiameter = positiveFinite(element.outer_diameter, "via outer diameter");
    if (holeDiameter + 2 * copperThickness >= outerDiameter || outerDiameter > Math.min(pad.width, pad.height) || !isCopper(element, geometry))
      throw new Error("Ground via needs a plated barrel inside its pad and selected bottom copper");
    return [
      {
        x: element.x,
        y: element.y,
        holeDiameter,
        outerDiameter,
        platingThickness: copperThickness
      }
    ];
  });
  for (const port of ports.filter((port2) => port2.referenceLayer === "top")) {
    if (!groundVias.some((via) => Math.hypot(via.x - port.reference.x, via.y - port.reference.y) < 0.000001))
      throw new Error("A top reference pad needs a real concentric ground via in circuit-json; ground-pad names alone do not connect copper");
  }
  for (const via of groundVias)
    geometry.cutouts.push(Array.from({ length: 32 }, (_, index) => ({
      x: via.x + via.holeDiameter / 2 * Math.cos(index * 2 * Math.PI / 32),
      y: via.y + via.holeDiameter / 2 * Math.sin(index * 2 * Math.PI / 32)
    })));
  const substrateLossTangent = options.substrateLossTangent ?? 0.02;
  if (!Number.isFinite(substrateLossTangent) || substrateLossTangent < 0)
    throw new Error("substrateLossTangent must be finite and nonnegative");
  const order = options.order ?? 2;
  if (order !== 1 && order !== 2)
    throw new Error("order must be 1 or 2");
  return {
    schemaVersion: 1,
    geometry,
    topPads,
    topGroundPads,
    groundVias,
    ports,
    frequencyHz,
    layerSeparation,
    copperThickness,
    copperConductivity,
    substratePermittivity: positiveFinite(options.substratePermittivity ?? 4.3, "substratePermittivity"),
    substrateLossTangent,
    portResistance: positiveFinite(options.portResistance ?? 50, "portResistance"),
    portWidth: positiveFinite(options.portWidth ?? 0.18, "portWidth"),
    meshSize: positiveFinite(options.meshSize ?? 1, "meshSize"),
    airPadding: positiveFinite(options.airPadding ?? 10, "airPadding"),
    order,
    copperModel,
    ...copperModel === "surface_impedance_copper" ? {
      surfaceImpedance: {
        boundaryModel: "half_space",
        skinDepthMm,
        minimumThicknessToSkinDepth: copperThickness / skinDepthMm,
        currentSampling: "sum_foil_face_surface_currents"
      }
    } : {}
  };
}

// ../simulate-return-current/lib/palace/write-sample-grid.ts
import { writeFile } from "node:fs/promises";

// ../simulate-return-current/lib/palace/create-sample-mask.ts
function boundedPolygon(outline) {
  return {
    outline,
    minX: Math.min(...outline.map((p) => p.x)),
    maxX: Math.max(...outline.map((p) => p.x)),
    minY: Math.min(...outline.map((p) => p.y)),
    maxY: Math.max(...outline.map((p) => p.y))
  };
}
function contains(point, polygon) {
  return point.x >= polygon.minX - 0.000000001 && point.x <= polygon.maxX + 0.000000001 && point.y >= polygon.minY - 0.000000001 && point.y <= polygon.maxY + 0.000000001 && pointInPolygon(point, polygon.outline);
}
function createSampleMask(geometry) {
  const board = boundedPolygon(geometry.boardOutline);
  const cutouts = geometry.cutouts.map(boundedPolygon);
  const regions = geometry.groundRegions.map((r) => ({
    outer: boundedPolygon(r.outer),
    holes: [...r.holes, ...r.maskCutouts ?? []].map(boundedPolygon)
  }));
  return (point) => contains(point, board) && !cutouts.some((cutout) => contains(point, cutout)) && regions.some((r) => contains(point, r.outer) && !r.holes.some((hole) => contains(point, hole)));
}

// ../simulate-return-current/lib/palace/write-sample-grid.ts
async function writeSampleGrid(options) {
  const cellSize = positiveFinite(options.cellSize ?? 0.2, "cellSize");
  const outline = options.geometry.boardOutline;
  const minX = Math.min(...outline.map((point) => point.x));
  const maxX = Math.max(...outline.map((point) => point.x));
  const minY = Math.min(...outline.map((point) => point.y));
  const maxY = Math.max(...outline.map((point) => point.y));
  const columns = Math.max(2, Math.ceil((maxX - minX) / cellSize));
  const rows = Math.max(2, Math.ceil((maxY - minY) / cellSize));
  if (columns * rows > 1e6)
    throw new Error("The sample grid exceeds 1,000,000 cells; increase cellSize");
  const cellWidth = (maxX - minX) / columns;
  const cellHeight = (maxY - minY) / rows;
  const containsCopper = createSampleMask(options.geometry);
  const points = [];
  for (let row = 0;row < rows; row++)
    for (let column = 0;column < columns; column++) {
      const point = {
        x: minX + (column + 0.5) * cellWidth,
        y: minY + (row + 0.5) * cellHeight
      };
      if (containsCopper(point))
        points.push(point);
    }
  if (!points.length)
    throw new Error("The sample grid contains no ground copper");
  await writeFile(`${options.destination}/sample-grid.json`, JSON.stringify({ columns, rows, cellWidth, cellHeight, points }));
  return { columns, rows, cellWidth, cellHeight, copperSamples: points.length };
}

// ../simulate-return-current/lib/palace/run-case.ts
var palaceImage = "benvial/palace@sha256:f0f3a3cbbdf1ee2d8f856ddbe1f5bf4628a92ee8ab87d1e27dc33402ad9c8dda";
async function preparePalaceCase(options) {
  const model = createPalaceModel(options);
  const processes = options.processes ?? Number(process.env.PALACE_PROCESSES ?? 1);
  if (!Number.isInteger(processes) || processes < 1)
    throw new Error("processes must be a positive integer");
  const destination = resolve2(options.destination);
  await mkdir2(destination, { recursive: true });
  await writeFile2(`${destination}/circuit.json`, JSON.stringify(options.circuitJson));
  await writeFile2(`${destination}/model.json`, JSON.stringify(model, null, 2));
  if (model.multilayer)
    await writeFile2(`${destination}/model-audit.json`, JSON.stringify(model.multilayer.audit, null, 2));
  const grid = await writeSampleGrid({
    destination,
    geometry: model.geometry,
    cellSize: options.cellSize
  });
  return { model, destination, processes, grid };
}
async function runPalaceCase(options) {
  const { model, destination, processes } = await preparePalaceCase(options);
  const python = palacePython(options.python);
  const meshScript = palacePythonAsset("mesh.py");
  const sampleScript = palacePythonAsset("sample.py");
  console.log(`Meshing ${destination}`);
  await runCommand({
    command: [python, meshScript, `${destination}/model.json`],
    cwd: destination,
    logPath: `${destination}/mesh.log`
  });
  const palaceBin = options.palaceBin ?? process.env.PALACE_BIN;
  const command = palaceBin ? [palaceBin, "-np", String(processes), "palace.json"] : [
    "docker",
    "run",
    "--rm",
    "--network",
    "none",
    "--user",
    `${process.getuid?.() ?? 1000}:${process.getgid?.() ?? 1000}`,
    "--cap-drop",
    "ALL",
    "--security-opt",
    "no-new-privileges",
    "--mount",
    `type=bind,src=${destination},dst=/case`,
    "--workdir",
    "/case",
    palaceImage,
    "palace",
    "-np",
    String(processes),
    "palace.json"
  ];
  console.log(`Running Palace at ${model.frequencyHz} Hz`);
  await runCommand({
    command,
    cwd: destination,
    logPath: `${destination}/palace.log`
  });
  console.log("Sampling complex conduction current through ground copper");
  await runCommand({
    command: [python, sampleScript, destination],
    cwd: destination,
    logPath: `${destination}/sample.log`
  });
}

// ../simulate-return-current/lib/palace/read-json.ts
import { readFile } from "node:fs/promises";
async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

// ../simulate-return-current/lib/palace/write-palace-image.ts
import { writeFile as writeFile3 } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

// ../simulate-return-current/lib/palace/geometry-signature.ts
function coordinate(number) {
  return (number === 0 ? 0 : number).toFixed(9);
}
function point(point2) {
  return [coordinate(point2.x), coordinate(point2.y)];
}
function palaceGeometrySignature(geometry) {
  return JSON.stringify([
    geometry.boardOutline.map(point),
    geometry.groundRegions.map((region) => [
      region.outer.map(point),
      [...region.holes, ...region.maskCutouts ?? []].map((hole) => hole.map(point))
    ]),
    geometry.cutouts.map((outline) => outline.map(point)),
    geometry.signals.map((signal) => signal.route.filter((route) => route.route_type === "wire").map((route) => [
      ...point(route),
      coordinate(route.width),
      route.layer
    ])),
    ...geometry.physicalModelSignature ? [geometry.physicalModelSignature] : [],
    geometry.excitations.map((excitation) => [
      coordinate(excitation.current),
      point(excitation.return_source),
      point(excitation.return_sink),
      ...excitation.source_port || excitation.load_port ? [
        [
          excitation.source_port?.reference_layer ?? "bottom",
          coordinate(excitation.source_port?.resistance ?? 50),
          excitation.load_port?.reference_layer ?? "bottom",
          coordinate(excitation.load_port?.resistance ?? 50)
        ]
      ] : []
    ])
  ]);
}

// ../simulate-return-current/lib/render-return-current-svg.ts
var import_transformation_matrix3 = __toESM(require_build_commonjs(), 1);

// ../simulate-return-current/lib/current-color.ts
function currentColor(fraction) {
  const stops = [
    [0, 99, 235],
    [0, 180, 216],
    [19, 202, 70],
    [225, 233, 20],
    [255, 175, 0],
    [255, 60, 0]
  ];
  const position = Math.max(0, Math.min(1, fraction)) * (stops.length - 1);
  const stopIndex = Math.min(stops.length - 2, Math.floor(position));
  const blend = position - stopIndex;
  const rgb = stops[stopIndex].map((channel, channelIndex) => Math.round(channel + blend * (stops[stopIndex + 1][channelIndex] - channel)));
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

// ../simulate-return-current/lib/render-return-current-svg.ts
function escapeXml(text) {
  return text.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[character] ?? character);
}
function polygonPath(outline) {
  return `${outline.map((point2, cornerIndex) => `${cornerIndex ? "L" : "M"}${svgNumber(point2.x)},${svgNumber(point2.y)}`).join(" ")} Z`;
}
function svgNumber(number) {
  return Number(number.toFixed(5)).toString();
}
function renderCells(result, maxCurrentDensity) {
  const pathsByColor = new Map;
  for (const node of result.nodes) {
    const color = currentColor(node.currentDensity / maxCurrentDensity);
    const paths = pathsByColor.get(color) ?? [];
    paths.push(`M${svgNumber(node.x - result.cellWidth / 2)},${svgNumber(node.y - result.cellHeight / 2)}h${svgNumber(result.cellWidth)}v${svgNumber(result.cellHeight)}h${svgNumber(-result.cellWidth)}z`);
    pathsByColor.set(color, paths);
  }
  return [...pathsByColor].map(([color, paths]) => `<path fill="${color}" d="${paths.join(" ")}"/>`).join("");
}
function displayNumber(number) {
  if (number === 0)
    return "0";
  return number >= 0.01 && number < 1e4 ? Number(number.toPrecision(3)).toString() : number.toExponential(1);
}
function renderCurrentFieldSvg(result, options) {
  if (!result.diagnostics.converged)
    throw new Error("Only a converged simulation can be rendered");
  const width = options.width ?? 1100;
  const height = options.height ?? 1100;
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 300 || height < 300)
    throw new Error("Image dimensions must be finite and at least 300 pixels");
  const maxCurrentDensity = options.maxCurrentDensity ?? (result.diagnostics.maxCurrentDensity || 1);
  if (!Number.isFinite(maxCurrentDensity) || maxCurrentDensity <= 0)
    throw new Error("maxCurrentDensity must be finite and positive");
  const vectorSpacing = options.vectorSpacing ?? 5;
  if (!Number.isInteger(vectorSpacing) || vectorSpacing < 1)
    throw new Error("vectorSpacing must be a positive integer");
  const boardWidth = result.bounds.maxX - result.bounds.minX;
  const boardHeight = result.bounds.maxY - result.bounds.minY;
  const pixelsPerMm = Math.min((width - 120) / boardWidth, (height - 250) / boardHeight);
  const left = (width - boardWidth * pixelsPerMm) / 2;
  const top = 160;
  const worldToSvg = import_transformation_matrix3.compose(import_transformation_matrix3.translate(left, top), import_transformation_matrix3.scale(pixelsPerMm, -pixelsPerMm), import_transformation_matrix3.translate(-result.bounds.minX, -result.bounds.maxY));
  const groundPaths = result.geometry.groundRegions.map((region) => `<path d="${[region.outer, ...region.holes, ...region.maskCutouts ?? []].map(polygonPath).join(" ")}" clip-rule="evenodd"/>`).join("");
  const boardPath = [result.geometry.boardOutline, ...result.geometry.cutouts].map(polygonPath).join(" ");
  const cells = renderCells(result, maxCurrentDensity);
  const arrows = [];
  if (!options.hideVectors) {
    const arrowLength = Math.min(result.cellWidth, result.cellHeight) * vectorSpacing * 0.58;
    for (const node of result.nodes) {
      if (node.column % vectorSpacing !== Math.floor(vectorSpacing / 2) || node.row % vectorSpacing !== Math.floor(vectorSpacing / 2) || node.currentDensity < result.diagnostics.maxCurrentDensity * 0.003)
        continue;
      const magnitude = Math.hypot(node.sheetCurrentX, node.sheetCurrentY);
      if (magnitude === 0)
        continue;
      const dx = node.sheetCurrentX / magnitude * arrowLength / 2;
      const dy = node.sheetCurrentY / magnitude * arrowLength / 2;
      arrows.push(`<path d="M${svgNumber(node.x - dx)},${svgNumber(node.y - dy)} L${svgNumber(node.x + dx)},${svgNumber(node.y + dy)} M${svgNumber(node.x + dx * 0.25 + dy * 0.4)},${svgNumber(node.y + dy * 0.25 - dx * 0.4)} L${svgNumber(node.x + dx)},${svgNumber(node.y + dy)} L${svgNumber(node.x + dx * 0.25 - dy * 0.4)},${svgNumber(node.y + dy * 0.25 + dx * 0.4)}"/>`);
    }
  }
  const traces = options.hideTraces ? "" : result.geometry.signals.map((signal) => {
    const wires = signal.route.flatMap((routePoint) => routePoint.route_type === "wire" ? [routePoint] : []);
    return `<polyline points="${wires.map((point2) => `${point2.x},${point2.y}`).join(" ")}" fill="none" stroke="#16383b" stroke-width="${wires[0].width}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }).join("");
  const contacts = result.geometry.excitations.map((excitation, excitationIndex) => {
    const route = result.geometry.signals[excitationIndex].route;
    const explicit = [
      {
        terminal: excitation.source_port,
        endpoint: route[0],
        reference: excitation.return_sink,
        label: `S${excitationIndex + 1}`,
        color: "#19394c"
      },
      {
        terminal: excitation.load_port,
        endpoint: route.at(-1),
        reference: excitation.return_source,
        label: `L${excitationIndex + 1}`,
        color: "#ae300f"
      }
    ].filter((port) => port.terminal?.reference_pcb_port_id && port.endpoint.route_type === "wire");
    const links = explicit.map((port) => {
      if (port.endpoint.route_type !== "wire")
        return "";
      const a = import_transformation_matrix3.applyToPoint(worldToSvg, port.endpoint), b = import_transformation_matrix3.applyToPoint(worldToSvg, port.reference);
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#64748b" stroke-width="2" stroke-dasharray="4 3"/>`;
    }).join("");
    return links + [
      {
        point: excitation.return_sink,
        label: `S${excitationIndex + 1}${excitation.source_port?.reference_pcb_port_id ? "−" : ""}`,
        color: "#19394c"
      },
      {
        point: excitation.return_source,
        label: `L${excitationIndex + 1}${excitation.load_port?.reference_pcb_port_id ? "−" : ""}`,
        color: "#ae300f"
      },
      ...explicit.map((port) => ({
        point: port.endpoint,
        label: `${port.label}+`,
        color: port.color
      }))
    ].map((contact) => {
      const scenePoint = import_transformation_matrix3.applyToPoint(worldToSvg, contact.point);
      return `<circle cx="${scenePoint.x}" cy="${scenePoint.y}" r="5" fill="#fff" stroke="${contact.color}" stroke-width="2"/><text x="${scenePoint.x + 10}" y="${scenePoint.y - 8}" font-size="13" font-weight="600" fill="#122735" stroke="white" stroke-width="3" paint-order="stroke">${contact.label}</text>`;
    }).join("");
  }).join("");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => `<text x="${60 + fraction * (width - 120)}" y="136" text-anchor="middle" font-size="14" fill="#475569">${displayNumber(fraction * maxCurrentDensity)}</text>`).join("");
  const boardBottom = top + boardHeight * pixelsPerMm;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
<title id="title">${escapeXml(options.title ?? "Ground-plane return current")}</title>
<desc id="description">${escapeXml(options.description)}</desc>
<defs><linearGradient id="current-scale">${Array.from({ length: 6 }, (_, stopIndex) => `<stop offset="${stopIndex * 20}%" stop-color="${currentColor(stopIndex / 5)}"/>`).join("")}</linearGradient><clipPath id="board-clip"><path d="${boardPath}" clip-rule="evenodd"/></clipPath><clipPath id="ground-clip">${groundPaths}</clipPath></defs>
<rect width="100%" height="100%" fill="white"/>
<g font-family="Arial, sans-serif"><text x="60" y="42" font-size="26" font-weight="600" fill="#172b3a">${escapeXml(options.title ?? "Ground-plane return current")}</text>
<text x="60" y="72" font-size="14" fill="#475569">${escapeXml(options.subtitle)}</text>
<rect x="60" y="90" width="${width - 120}" height="26" rx="3" fill="url(#current-scale)"/>${ticks}
<g transform="matrix(${worldToSvg.a},${worldToSvg.b},${worldToSvg.c},${worldToSvg.d},${worldToSvg.e},${worldToSvg.f})">
<g clip-path="url(#board-clip)"><g clip-path="url(#ground-clip)"><g shape-rendering="crispEdges">${cells}</g><g fill="none" stroke="white" stroke-width="${1 / pixelsPerMm}" opacity="0.75">${arrows.join("")}</g></g></g>
<path d="${polygonPath(result.geometry.boardOutline)}" fill="none" stroke="#94a3b8" stroke-width="${1 / pixelsPerMm}"/>${traces}</g>
${contacts}
<text x="60" y="${boardBottom + 30}" font-size="14" fill="#334155">${result.geometry.excitations.map((excitation, excitationIndex) => `S${excitationIndex + 1} → L${excitationIndex + 1}: ${displayNumber(excitation.current)} A`).join("   ·   ")}</text>
<text x="60" y="${boardBottom + 53}" font-size="13" fill="#64748b">${escapeXml(options.separationLabel ?? "h")} = ${displayNumber(result.layerSeparation)} mm · copper = ${displayNumber(result.copperThickness)} mm · ${escapeXml(options.gridLabel ?? "mesh")} = ${result.columns} × ${result.rows}</text>
<text x="60" y="${boardBottom + 76}" font-size="12" fill="#64748b">${escapeXml(options.footer)}</text></g>
</svg>`;
}
function renderReturnCurrentSvg(result, options = {}) {
  return renderCurrentFieldSvg(result, {
    ...options,
    description: "Image-current approximation; frequency is not modelled. Colors show |J| in A/mm². White indicates absent ground copper. Dark lines show top-layer signals. Arrows show return direction.",
    subtitle: "Top signals · Bottom ground plane · |J| (A/mm²) · frequency not modelled",
    footer: `Image-current approximation · frequency not modelled · max conservation error ${displayNumber(result.diagnostics.maxConservationError)} A`
  });
}

// ../simulate-return-current/lib/palace/validate-reference.ts
function validatePalaceReference(reference) {
  if (reference.femOrder !== 1 && reference.femOrder !== 2 || reference.schemaVersion !== 1 || reference.solver !== "palace" || !["volumetric_copper", "surface_impedance_copper"].includes(reference.copperModel) || reference.sampleLayer !== undefined && !/^(top|bottom|inner[1-8])$/.test(reference.sampleLayer))
    throw new Error("Unsupported Palace reference");
  if (reference.copperModel === "surface_impedance_copper" && (reference.samplingMethod !== "sum_foil_face_surface_currents" || !Number.isFinite(reference.surfaceCurrentScaleAmpsPerMm) || reference.surfaceCurrentScaleAmpsPerMm <= 0))
    throw new Error("Surface impedance reference must identify its face-current sampling and finite positive A/mm scale");
  if (![
    reference.frequencyHz,
    reference.copperThickness,
    reference.layerSeparation,
    reference.cellWidth,
    reference.cellHeight,
    reference.normalizationConditionNumber,
    reference.electricFieldScaleVoltsPerMeter
  ].every((number) => Number.isFinite(number) && number > 0))
    throw new Error("Palace reference needs finite positive frequency, thickness, cell sizes and normalization condition");
  if (![reference.columns, reference.rows].every((number) => Number.isInteger(number) && number > 0) || !reference.samples.length)
    throw new Error("Palace reference needs a nonempty grid");
  if (typeof reference.provenance.geometrySignature !== "string" || !reference.provenance.geometrySignature.length)
    throw new Error("Palace reference needs a physical geometry signature");
  const locations = new Set;
  for (const sample of reference.samples) {
    if (![
      sample.x,
      sample.y,
      sample.sheetCurrentXReal,
      sample.sheetCurrentYReal,
      sample.sheetCurrentXImag,
      sample.sheetCurrentYImag
    ].every(Number.isFinite))
      throw new Error("Non-finite Palace sample");
    const location = `${sample.x},${sample.y}`;
    if (locations.has(location))
      throw new Error("Duplicate Palace sample position");
    locations.add(location);
  }
  for (const current of [
    ...reference.sourceCurrents,
    ...reference.loadCurrents
  ])
    if (![current.real, current.imag].every(Number.isFinite))
      throw new Error("Non-finite Palace port current");
}

// ../simulate-return-current/lib/palace/render-palace-reference-svg.ts
function renderPalaceModelSvg(model, options) {
  const { reference } = options;
  validatePalaceReference(reference);
  if (reference.frequencyHz !== model.frequencyHz || reference.femOrder !== model.order || reference.copperModel !== model.copperModel || reference.sampleLayer !== model.multilayer?.sampleLayer)
    throw new Error("Palace model frequency, FEM order, copper model or sample layer differs from reference");
  const outline = model.geometry.boardOutline;
  const bounds = {
    minX: Math.min(...outline.map((point2) => point2.x)),
    maxX: Math.max(...outline.map((point2) => point2.x)),
    minY: Math.min(...outline.map((point2) => point2.y)),
    maxY: Math.max(...outline.map((point2) => point2.y))
  };
  if (Math.abs(reference.columns * reference.cellWidth - (bounds.maxX - bounds.minX)) > 0.00000001 || Math.abs(reference.rows * reference.cellHeight - (bounds.maxY - bounds.minY)) > 0.00000001)
    throw new Error("Palace sample grid does not fit the model bounds");
  const nodes = reference.samples.map((sample) => {
    const column = Math.round((sample.x - bounds.minX) / reference.cellWidth - 0.5);
    const row = Math.round((sample.y - bounds.minY) / reference.cellHeight - 0.5);
    if (column < 0 || column >= reference.columns || row < 0 || row >= reference.rows || Math.abs(sample.x - (bounds.minX + (column + 0.5) * reference.cellWidth)) > 0.00000001 || Math.abs(sample.y - (bounds.minY + (row + 0.5) * reference.cellHeight)) > 0.00000001)
      throw new Error("Palace sample is not at a grid cell center");
    return {
      x: sample.x,
      y: sample.y,
      column,
      row,
      injection: 0,
      sheetCurrentX: 0,
      sheetCurrentY: 0,
      currentDensity: 0
    };
  });
  return renderPalaceReferenceSvg({
    geometry: model.geometry,
    bounds,
    nodes,
    columns: reference.columns,
    rows: reference.rows,
    cellWidth: reference.cellWidth,
    cellHeight: reference.cellHeight,
    copperThickness: model.copperThickness,
    layerSeparation: model.layerSeparation
  }, options);
}
function renderPalaceReferenceSvg(result, options) {
  const { reference } = options;
  validatePalaceReference(reference);
  if (palaceGeometrySignature(result.geometry) !== reference.provenance.geometrySignature)
    throw new Error("Palace reference geometry differs from the simulation geometry");
  if (reference.layerSeparation !== result.layerSeparation || reference.samples.length !== result.nodes.length || reference.columns !== result.columns || reference.rows !== result.rows || reference.cellWidth !== result.cellWidth || reference.cellHeight !== result.cellHeight || reference.copperThickness !== result.copperThickness)
    throw new Error("Palace rendering requires the matching simulation grid");
  if (reference.sourceCurrents.length !== result.geometry.excitations.length || reference.sourceCurrents.some((current, index) => Math.abs(current.real - result.geometry.excitations[index].current) > 0.00000001 || Math.abs(current.imag) > 0.00000001))
    throw new Error("Palace rendering requires matching source currents");
  const phaseDegrees = options.phaseDegrees ?? 0;
  if (!Number.isFinite(phaseDegrees))
    throw new Error("phaseDegrees must be finite");
  const phase = phaseDegrees * Math.PI / 180;
  let maxCurrentDensity = 0;
  const nodes = reference.samples.map((sample, index) => {
    const node = result.nodes[index];
    if (Math.hypot(node.x - sample.x, node.y - sample.y) > 0.00000001)
      throw new Error("Palace sample coordinates differ from the rendering grid");
    const currentDensity = Math.hypot(sample.sheetCurrentXReal, sample.sheetCurrentYReal, sample.sheetCurrentXImag, sample.sheetCurrentYImag) / reference.copperThickness;
    maxCurrentDensity = Math.max(maxCurrentDensity, currentDensity);
    return {
      ...node,
      sheetCurrentX: sample.sheetCurrentXReal * Math.cos(phase) - sample.sheetCurrentXImag * Math.sin(phase),
      sheetCurrentY: sample.sheetCurrentYReal * Math.cos(phase) - sample.sheetCurrentYImag * Math.sin(phase),
      currentDensity
    };
  });
  return renderCurrentFieldSvg({
    ...result,
    nodes,
    diagnostics: {
      converged: true,
      maxCurrentDensity
    }
  }, {
    ...options,
    title: options.title ?? "Palace ground-plane return current",
    description: reference.copperModel === "surface_impedance_copper" ? "Palace driven Maxwell reference with finite-conductivity surface impedance. Colors show the complex sheet current summed over exposed foil faces, divided by physical foil thickness for display. Arrows show the real instantaneous field at the selected phase. Copper uses a half-space surface-impedance boundary." : "Palace driven Maxwell reference. Colors show magnitude of the complex conduction-current vector averaged through copper thickness. Arrows show the real instantaneous field at the selected phase. Copper is an explicitly meshed conductive volume.",
    subtitle: `Palace ${reference.solverVersion}${reference.sampleLayer ? ` · layer = ${reference.sampleLayer}` : ""} · f = ${reference.frequencyHz / 1e6} MHz · |K|/t (A/mm²) · peak phasors`,
    gridLabel: "sample grid",
    separationLabel: reference.sampleLayer ? "outer foil gap" : undefined,
    footer: `FEM order ${reference.femOrder} · ${reference.copperModel === "surface_impedance_copper" ? "finite-conductivity surface impedance" : "conductive copper volumes"} · arrows at ${phaseDegrees}° · air/substrate domain · source currents normalized`
  });
}

// ../simulate-return-current/lib/palace/write-palace-image.ts
async function writePalaceImage(destination, imageSize = 1100) {
  const readStarted = performance.now();
  const model = await readJson(`${destination}/model.json`);
  const reference = await readJson(`${destination}/reference.json`);
  const readSeconds = (performance.now() - readStarted) / 1000;
  const svgStarted = performance.now();
  const svg = renderPalaceModelSvg(model, {
    reference,
    title: "Palace: ground-plane return current",
    maxCurrentDensity: 50,
    vectorSpacing: Math.max(1, Math.round(1 / reference.cellWidth)),
    width: imageSize,
    height: imageSize
  });
  await writeFile3(`${destination}/palace.svg`, svg);
  const svgSeconds = (performance.now() - svgStarted) / 1000;
  const pngStarted = performance.now();
  await writeFile3(`${destination}/palace.png`, new Resvg(svg).render().asPng());
  const pngSeconds = (performance.now() - pngStarted) / 1000;
  return {
    readSeconds,
    svgSeconds,
    pngSeconds,
    imageSize,
    provenance: reference.provenance,
    solverVersion: reference.solverVersion,
    femOrder: reference.femOrder,
    sourceCurrents: reference.sourceCurrents
  };
}

// ../simulate-return-current/lib/palace/run-simulation.ts
function imageDimension(size = 1100) {
  if (!Number.isInteger(size) || size < 300 || size > 8192)
    throw new Error("imageSize must be an integer between 300 and 8192 pixels");
  return size;
}
function caseOptions(options) {
  imageDimension(options.imageSize);
  if (options.ports && !options.groundNet)
    throw new Error("Named ports require groundNet");
  if (options.groundNet && !options.ports)
    throw new Error("groundNet requires named ports");
  if (options.ports && options.excitations)
    throw new Error("Choose named ports or explicit excitation records");
  const circuitJson = options.ports ? withNamedExcitations({
    circuitJson: options.circuitJson,
    ports: options.ports.map((port) => ({
      ...port,
      sourceImpedance: port.sourceImpedance ?? options.portResistance ?? 50,
      loadImpedance: port.loadImpedance ?? options.portResistance ?? 50
    })),
    groundNet: options.groundNet,
    referenceLayer: options.sampleLayer
  }) : options.excitations ? [
    ...options.circuitJson.filter((element) => element.type !== "simulation_return_current_excitation"),
    ...options.excitations
  ] : options.circuitJson;
  return {
    ...options,
    circuitJson,
    excitations: undefined,
    destination: resolve3(options.outputDirectory)
  };
}
async function writePortSpecification(options, destination) {
  const model = await readJson(join2(destination, "model.json"));
  await writeFile4(join2(destination, "excitation-ports.json"), JSON.stringify({
    frequencyHz: options.frequencyHz,
    copperModel: model.copperModel,
    ...model.surfaceImpedance ? { surfaceImpedance: model.surfaceImpedance } : {},
    ports: options.ports?.map((port) => ({
      ...port,
      current: parseCurrentAmps(port.current),
      ...port.sourceImpedance === undefined ? {} : { sourceImpedance: parseResistanceOhms(port.sourceImpedance) },
      ...port.loadImpedance === undefined ? {} : { loadImpedance: parseResistanceOhms(port.loadImpedance) }
    })) ?? null,
    groundNet: options.groundNet ?? null,
    resolvedTerminals: model.ports,
    metadataSource: options.ports ? "named_ports" : "circuit_json",
    reference: model.ports?.some((port) => port.referencePcbPortId) ? "explicit reference pins; omitted references use plane beneath signal" : "ground plane directly beneath each signal endpoint",
    currentConvention: "signed in-phase peak amperes"
  }, null, 2));
}
async function preparePalaceSimulation(options) {
  const prepared = await preparePalaceCase(caseOptions(options));
  await writePortSpecification(options, prepared.destination);
  return prepared;
}
async function runPalaceSimulation(options) {
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const resolved = caseOptions(options);
  await runPalaceCase(resolved);
  await writePortSpecification(options, resolved.destination);
  const image = await writePalaceImage(resolved.destination, imageDimension(options.imageSize));
  const timing = {
    startedAt,
    completedAt: new Date().toISOString(),
    frequencyHz: options.frequencyHz,
    copperModel: options.copperModel ?? "volumetric_copper",
    totalSeconds: (performance.now() - started) / 1000,
    reusedCompletedFemSolve: false,
    image
  };
  await writeFile4(join2(resolved.destination, "run-timing.json"), JSON.stringify(timing, null, 2));
  return {
    outputDirectory: resolved.destination,
    referencePath: join2(resolved.destination, "reference.json"),
    svgPath: join2(resolved.destination, "palace.svg"),
    pngPath: join2(resolved.destination, "palace.png"),
    timing
  };
}
// ../simulate-return-current/lib/palace/resample.ts
import { writeFile as writeFile6 } from "node:fs/promises";
import { resolve as resolve4, join as join3 } from "node:path";
import { cpus, platform, arch } from "node:os";

// ../simulate-return-current/lib/palace/write-comparison.ts
import { writeFile as writeFile5 } from "node:fs/promises";
import { Resvg as Resvg2 } from "@resvg/resvg-js";

// ../simulate-return-current/lib/palace/compare-palace-reference.ts
function comparePalaceReference(result, options) {
  const { reference } = options;
  validatePalaceReference(reference);
  if (palaceGeometrySignature(result.geometry) !== reference.provenance.geometrySignature)
    throw new Error("Palace reference geometry differs from the simulation geometry");
  const edgeExclusionMm = options.edgeExclusionMm ?? 0.5;
  const contactExclusionMm = options.contactExclusionMm ?? 1;
  if (![edgeExclusionMm, contactExclusionMm].every((number) => Number.isFinite(number) && number >= 0))
    throw new Error("Exclusion distances must be finite and nonnegative");
  if (result.copperThickness !== reference.copperThickness || result.layerSeparation !== reference.layerSeparation || result.cellWidth !== reference.cellWidth || result.cellHeight !== reference.cellHeight || result.columns !== reference.columns || result.rows !== reference.rows || result.nodes.length !== reference.samples.length)
    throw new Error("Palace and approximation must use identical thickness and sample grids");
  if (reference.sourceCurrents.length !== result.geometry.excitations.length)
    throw new Error("Palace and approximation source counts differ");
  for (const [index, current] of reference.sourceCurrents.entries())
    if (Math.abs(current.real - result.geometry.excitations[index].current) > 0.00000001 || Math.abs(current.imag) > 0.00000001)
      throw new Error("Palace and approximation source currents differ");
  let comparedSamples = 0;
  let complexSquaredError = 0;
  let realSquaredError = 0;
  let magnitudeSquaredError = 0;
  let referenceSquaredNorm = 0;
  let maxAbsoluteDensityError = 0;
  const contacts = result.geometry.excitations.flatMap((excitation) => [
    excitation.return_source,
    excitation.return_sink
  ]);
  for (const [index, sample] of reference.samples.entries()) {
    const node = result.nodes[index];
    if (Math.hypot(node.x - sample.x, node.y - sample.y) > 0.00000001)
      throw new Error("Palace sample ordering/coordinates differ from the approximation");
    if (contacts.some((contact) => Math.hypot(contact.x - node.x, contact.y - node.y) < contactExclusionMm))
      continue;
    if ([
      { x: node.x - edgeExclusionMm, y: node.y },
      { x: node.x + edgeExclusionMm, y: node.y },
      { x: node.x, y: node.y - edgeExclusionMm },
      { x: node.x, y: node.y + edgeExclusionMm }
    ].some((end) => !segmentInCopper({ start: node, end }, result.geometry)))
      continue;
    const realError = (node.sheetCurrentX - sample.sheetCurrentXReal) ** 2 + (node.sheetCurrentY - sample.sheetCurrentYReal) ** 2;
    const imagNorm = sample.sheetCurrentXImag ** 2 + sample.sheetCurrentYImag ** 2;
    const norm = sample.sheetCurrentXReal ** 2 + sample.sheetCurrentYReal ** 2 + imagNorm;
    const magnitudeError = Math.hypot(node.sheetCurrentX, node.sheetCurrentY) - Math.sqrt(norm);
    complexSquaredError += realError + imagNorm;
    realSquaredError += realError;
    magnitudeSquaredError += magnitudeError ** 2;
    referenceSquaredNorm += norm;
    maxAbsoluteDensityError = Math.max(maxAbsoluteDensityError, Math.abs(magnitudeError) / reference.copperThickness);
    comparedSamples++;
  }
  if (!comparedSamples || !referenceSquaredNorm)
    throw new Error("Comparison needs nonzero reference fields away from excluded contacts and edges");
  return {
    referenceSolver: `Palace ${reference.solverVersion}`,
    frequencyHz: reference.frequencyHz,
    approximationFrequencyModel: "none",
    comparedSamples,
    excludedSamples: reference.samples.length - comparedSamples,
    edgeExclusionMm,
    contactExclusionMm,
    relativeComplexL2Error: Math.sqrt(complexSquaredError / referenceSquaredNorm),
    relativeRealL2Error: Math.sqrt(realSquaredError / referenceSquaredNorm),
    relativeMagnitudeL2Error: Math.sqrt(magnitudeSquaredError / referenceSquaredNorm),
    rmsSheetCurrentErrorAmpsPerMm: Math.sqrt(complexSquaredError / comparedSamples),
    maxAbsoluteEquivalentDensityErrorAmpsPerMm2: maxAbsoluteDensityError
  };
}

// ../simulate-return-current/node_modules/graphics-debug/dist/chunk-LSB2D226.js
var import_transformation_matrix4 = __toESM(require_build_commonjs2(), 1);
var import_svgson = __toESM(require_svgson_cjs(), 1);

// ../simulate-return-current/node_modules/graphics-debug/dist/chunk-T5KLVINH.js
var import_transformation_matrix5 = __toESM(require_build_commonjs2(), 1);

// ../simulate-return-current/node_modules/@tscircuit/solver-utils/dist/index.js
var BaseSolver = class {
  MAX_ITERATIONS = 1e5;
  solved = false;
  failed = false;
  iterations = 0;
  progress = 0;
  error = null;
  activeSubSolver;
  failedSubSolvers;
  timeToSolve;
  stats = {};
  _setupDone = false;
  getSolverName() {
    return this.constructor.name;
  }
  setup() {
    if (this._setupDone)
      return;
    this._setup();
    this._setupDone = true;
  }
  _setup() {}
  step() {
    if (!this._setupDone) {
      this.setup();
    }
    if (this.solved)
      return;
    if (this.failed)
      return;
    this.iterations++;
    try {
      this._step();
    } catch (e) {
      this.error = `${this.getSolverName()} error: ${e}`;
      this.failed = true;
      throw e;
    }
    if (!this.solved && this.iterations >= this.MAX_ITERATIONS) {
      this.tryFinalAcceptance();
    }
    if (!this.solved && this.iterations >= this.MAX_ITERATIONS) {
      this.error = `${this.getSolverName()} ran out of iterations`;
      this.failed = true;
    }
    if ("computeProgress" in this) {
      this.progress = this.computeProgress();
    }
  }
  _step() {}
  getConstructorParams() {
    throw new Error("getConstructorParams not implemented");
  }
  getOutput() {
    return null;
  }
  solve() {
    const startTime = Date.now();
    while (!this.solved && !this.failed) {
      this.step();
    }
    const endTime = Date.now();
    this.timeToSolve = endTime - startTime;
  }
  visualize() {
    return {
      lines: [],
      points: [],
      rects: [],
      circles: []
    };
  }
  tryFinalAcceptance() {}
  preview() {
    return {
      lines: [],
      points: [],
      rects: [],
      circles: []
    };
  }
};

// ../simulate-return-current/lib/conjugate-gradient.ts
function dot(left, right) {
  let product = 0;
  for (let nodeIndex = 0;nodeIndex < left.length; nodeIndex++)
    product += left[nodeIndex] * right[nodeIndex];
  return product;
}
function applyLaplacian(potential, system) {
  const applied = new Float64Array(potential.length);
  for (let edgeIndex = 0;edgeIndex < system.result.edges.length; edgeIndex++) {
    const edge = system.result.edges[edgeIndex];
    const difference = system.conductance[edgeIndex] * ((system.pinned[edge.startNode] ? 0 : potential[edge.startNode]) - (system.pinned[edge.endNode] ? 0 : potential[edge.endNode]));
    if (!system.pinned[edge.startNode])
      applied[edge.startNode] += difference;
    if (!system.pinned[edge.endNode])
      applied[edge.endNode] -= difference;
  }
  for (let nodeIndex = 0;nodeIndex < potential.length; nodeIndex++) {
    if (system.pinned[nodeIndex])
      applied[nodeIndex] = potential[nodeIndex];
  }
  return applied;
}
function precondition(residual, system) {
  return residual.map((error, nodeIndex) => error / system.diagonal[nodeIndex]);
}
function updateCurrentField(potential, system) {
  const divergence = new Float64Array(potential.length);
  for (const node of system.result.nodes) {
    node.sheetCurrentX = 0;
    node.sheetCurrentY = 0;
  }
  for (let edgeIndex = 0;edgeIndex < system.result.edges.length; edgeIndex++) {
    const edge = system.result.edges[edgeIndex];
    edge.current = edge.preferredCurrent + system.conductance[edgeIndex] * (potential[edge.startNode] - potential[edge.endNode]);
    divergence[edge.startNode] += edge.current;
    divergence[edge.endNode] -= edge.current;
    const sheetCurrent = edge.current / (edge.axis === "x" ? system.result.cellHeight : system.result.cellWidth);
    for (const nodeIndex of [edge.startNode, edge.endNode]) {
      const node = system.result.nodes[nodeIndex];
      if (edge.axis === "x")
        node.sheetCurrentX += sheetCurrent / 2;
      else
        node.sheetCurrentY += sheetCurrent / 2;
    }
  }
  let maxConservationError = 0;
  let maxCurrentDensity = 0;
  for (let nodeIndex = 0;nodeIndex < potential.length; nodeIndex++) {
    const node = system.result.nodes[nodeIndex];
    node.currentDensity = Math.hypot(node.sheetCurrentX, node.sheetCurrentY) / system.result.copperThickness;
    maxCurrentDensity = Math.max(maxCurrentDensity, node.currentDensity);
    maxConservationError = Math.max(maxConservationError, Math.abs(divergence[nodeIndex] - node.injection));
  }
  Object.assign(system.result.diagnostics, {
    maxConservationError,
    maxCurrentDensity
  });
}

// ../simulate-return-current/lib/image-current.ts
function imageCurrentAt(point2, context) {
  let x = 0;
  let y = 0;
  const h = context.layerSeparation;
  for (const segment of context.segments) {
    const length = Math.hypot(segment.end.x - segment.start.x, segment.end.y - segment.start.y);
    const tx = (segment.end.x - segment.start.x) / length;
    const ty = (segment.end.y - segment.start.y) / length;
    const projection = (point2.x - segment.start.x) * tx + (point2.y - segment.start.y) * ty;
    const perpendicular = (point2.y - segment.start.y) * tx - (point2.x - segment.start.x) * ty;
    const squaredDistance = h * h + perpendicular * perpendicular;
    const farEnd = length - projection;
    const integral = (farEnd / Math.sqrt(squaredDistance + farEnd * farEnd) + projection / Math.sqrt(squaredDistance + projection * projection)) / squaredDistance;
    const amplitude = -segment.current * h * integral / (2 * Math.PI);
    x += amplitude * tx;
    y += amplitude * ty;
  }
  return { x, y };
}

// ../simulate-return-current/lib/create-mesh.ts
function labelCopperRegions(nodes, edges) {
  const neighbours = nodes.map(() => []);
  for (const edge of edges) {
    neighbours[edge.startNode].push(edge.endNode);
    neighbours[edge.endNode].push(edge.startNode);
  }
  const labels = new Int32Array(nodes.length).fill(-1);
  let regionCount = 0;
  for (let nodeIndex = 0;nodeIndex < nodes.length; nodeIndex++) {
    if (labels[nodeIndex] >= 0)
      continue;
    const queue = [nodeIndex];
    labels[nodeIndex] = regionCount;
    for (let queueIndex = 0;queueIndex < queue.length; queueIndex++) {
      for (const neighbour of neighbours[queue[queueIndex]]) {
        if (labels[neighbour] >= 0)
          continue;
        labels[neighbour] = regionCount;
        queue.push(neighbour);
      }
    }
    regionCount++;
  }
  return labels;
}
function contactNodes(contact, context) {
  const candidates = [];
  let nearestNode = -1;
  let nearestDistance = Infinity;
  for (let nodeIndex = 0;nodeIndex < context.result.nodes.length; nodeIndex++) {
    const node = context.result.nodes[nodeIndex];
    const distance = Math.hypot(node.x - contact.x, node.y - contact.y);
    if (distance > context.radius || !segmentInCopper({ start: contact, end: node }, context.result.geometry))
      continue;
    candidates.push(nodeIndex);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestNode = nodeIndex;
    }
  }
  if (nearestNode < 0)
    throw new Error("A return contact has no copper mesh nodes within its radius; reduce cellSize or increase contactRadius");
  return candidates.filter((nodeIndex) => context.labels[nodeIndex] === context.labels[nearestNode]);
}
function preferredEdgeCurrent(edge, context) {
  const fractions = [-Math.sqrt(3 / 5) / 2, 0, Math.sqrt(3 / 5) / 2];
  const weights = [5 / 18, 4 / 9, 5 / 18];
  let current = 0;
  for (let sampleIndex = 0;sampleIndex < fractions.length; sampleIndex++) {
    const point2 = {
      x: (edge.start.x + edge.end.x) / 2 + (edge.axis === "y" ? fractions[sampleIndex] * edge.faceLength : 0),
      y: (edge.start.y + edge.end.y) / 2 + (edge.axis === "x" ? fractions[sampleIndex] * edge.faceLength : 0)
    };
    const sheetCurrent = imageCurrentAt(point2, {
      segments: context.result.geometry.segments,
      layerSeparation: context.result.layerSeparation
    });
    current += sheetCurrent[edge.axis] * edge.faceLength * weights[sampleIndex];
  }
  return current;
}
function createCurrentSystem(options) {
  const geometry = readGeometry(options);
  const cellSize = positiveFinite(options.cellSize ?? 0.5, "cellSize");
  const layerSeparation = positiveFinite(options.layerSeparation ?? geometry.board.thickness, "layerSeparation");
  const copperThickness = positiveFinite(options.copperThickness ?? 0.035, "copperThickness");
  const contactRadius = positiveFinite(options.contactRadius ?? cellSize, "contactRadius");
  const bounds = {
    minX: Math.min(...geometry.boardOutline.map((point2) => point2.x)),
    maxX: Math.max(...geometry.boardOutline.map((point2) => point2.x)),
    minY: Math.min(...geometry.boardOutline.map((point2) => point2.y)),
    maxY: Math.max(...geometry.boardOutline.map((point2) => point2.y))
  };
  const columns = Math.max(2, Math.ceil((bounds.maxX - bounds.minX) / cellSize));
  const rows = Math.max(2, Math.ceil((bounds.maxY - bounds.minY) / cellSize));
  if (columns * rows > 1e5)
    throw new Error("The mesh exceeds 100,000 cells; increase cellSize");
  const cellWidth = positiveFinite((bounds.maxX - bounds.minX) / columns, "Board X extent");
  const cellHeight = positiveFinite((bounds.maxY - bounds.minY) / rows, "Board Y extent");
  const nodes = [];
  const gridNodes = new Int32Array(columns * rows).fill(-1);
  for (let row = 0;row < rows; row++) {
    for (let column = 0;column < columns; column++) {
      const point2 = {
        x: bounds.minX + (column + 0.5) * cellWidth,
        y: bounds.minY + (row + 0.5) * cellHeight
      };
      if (!isCopper(point2, geometry))
        continue;
      gridNodes[row * columns + column] = nodes.length;
      nodes.push({
        ...point2,
        column,
        row,
        injection: 0,
        sheetCurrentX: 0,
        sheetCurrentY: 0,
        currentDensity: 0
      });
    }
  }
  if (!nodes.length)
    throw new Error("The mesh contains no ground copper; reduce cellSize");
  const result = {
    geometry,
    nodes,
    edges: [],
    columns,
    rows,
    cellWidth,
    cellHeight,
    bounds,
    copperThickness,
    layerSeparation,
    diagnostics: {
      converged: false,
      iterations: 0,
      relativeResidual: Infinity,
      maxConservationError: Infinity,
      maxCurrentDensity: 0,
      connectedCopperRegions: 0
    }
  };
  const conductanceList = [];
  for (let nodeIndex = 0;nodeIndex < nodes.length; nodeIndex++) {
    const node = nodes[nodeIndex];
    for (const axis of ["x", "y"]) {
      const neighbourColumn = node.column + (axis === "x" ? 1 : 0);
      const neighbourRow = node.row + (axis === "y" ? 1 : 0);
      if (neighbourColumn >= columns || neighbourRow >= rows)
        continue;
      const neighbourIndex = gridNodes[neighbourRow * columns + neighbourColumn];
      if (neighbourIndex < 0 || !segmentInCopper({ start: node, end: nodes[neighbourIndex] }, geometry))
        continue;
      const faceLength = axis === "x" ? cellHeight : cellWidth;
      const preferredCurrent = preferredEdgeCurrent({ start: node, end: nodes[neighbourIndex], axis, faceLength }, { result });
      result.edges.push({
        startNode: nodeIndex,
        endNode: neighbourIndex,
        axis,
        preferredCurrent,
        current: preferredCurrent
      });
      conductanceList.push(faceLength / (axis === "x" ? cellWidth : cellHeight));
    }
  }
  const labels = labelCopperRegions(nodes, result.edges);
  const pinned = new Uint8Array(nodes.length);
  const regionRoots = new Set;
  for (let nodeIndex = 0;nodeIndex < nodes.length; nodeIndex++) {
    if (regionRoots.has(labels[nodeIndex]))
      continue;
    pinned[nodeIndex] = 1;
    regionRoots.add(labels[nodeIndex]);
  }
  result.diagnostics.connectedCopperRegions = regionRoots.size;
  for (const excitation of geometry.excitations) {
    const sourceNodes = contactNodes(excitation.return_source, {
      result,
      labels,
      radius: contactRadius
    });
    const sinkNodes = contactNodes(excitation.return_sink, {
      result,
      labels,
      radius: contactRadius
    });
    if (excitation.current !== 0 && labels[sourceNodes[0]] !== labels[sinkNodes[0]])
      throw new Error("The return contacts are on disconnected copper; there is no return-current path");
    for (const nodeIndex of sourceNodes)
      nodes[nodeIndex].injection += excitation.current / sourceNodes.length;
    for (const nodeIndex of sinkNodes)
      nodes[nodeIndex].injection -= excitation.current / sinkNodes.length;
  }
  const diagonal = new Float64Array(nodes.length);
  const rightHandSide = Float64Array.from(nodes.map((node) => node.injection));
  const conductance = Float64Array.from(conductanceList);
  for (let edgeIndex = 0;edgeIndex < result.edges.length; edgeIndex++) {
    const edge = result.edges[edgeIndex];
    diagonal[edge.startNode] += conductance[edgeIndex];
    diagonal[edge.endNode] += conductance[edgeIndex];
    rightHandSide[edge.startNode] -= edge.preferredCurrent;
    rightHandSide[edge.endNode] += edge.preferredCurrent;
  }
  for (let nodeIndex = 0;nodeIndex < nodes.length; nodeIndex++) {
    if (!pinned[nodeIndex])
      continue;
    diagonal[nodeIndex] = 1;
    rightHandSide[nodeIndex] = 0;
  }
  return { result, diagonal, rightHandSide, pinned, conductance };
}

// ../simulate-return-current/lib/ReturnCurrentSolver.ts
class ReturnCurrentSolver extends BaseSolver {
  options;
  system;
  potential;
  tolerance;
  residual;
  direction;
  residualProduct;
  initialNorm;
  constructor(options) {
    super();
    const excitations = options.excitations ?? options.circuitJson.filter((element) => element.type === "simulation_return_current_excitation");
    if (excitations.some((excitation) => [excitation.source_port, excitation.load_port].some((port) => port && (port.reference_pcb_port_id || port.reference_layer !== "bottom" || port.resistance !== 50))))
      throw new Error("Explicit reference terminals and impedances require Palace; the approximation has no port impedance model");
    this.options = options;
    this.tolerance = positiveFinite(options.tolerance ?? 0.00000001, "tolerance");
    this.MAX_ITERATIONS = positiveFinite(options.maxIterations ?? 5000, "maxIterations");
    if (!Number.isInteger(this.MAX_ITERATIONS))
      throw new Error("maxIterations must be an integer");
    this.system = createCurrentSystem(options);
    this.potential = new Float64Array(this.system.result.nodes.length);
    this.residual = this.system.rightHandSide.slice();
    this.direction = precondition(this.residual, this.system);
    this.residualProduct = dot(this.residual, this.direction);
    this.initialNorm = Math.sqrt(dot(this.residual, this.residual));
    updateCurrentField(this.potential, this.system);
  }
  _step() {
    if (this.initialNorm === 0) {
      this.finish(0);
      return;
    }
    const appliedDirection = applyLaplacian(this.direction, this.system);
    const denominator = dot(this.direction, appliedDirection);
    if (!Number.isFinite(denominator) || denominator <= 0)
      throw new Error("The conservation solve encountered a degenerate mesh");
    const alpha = this.residualProduct / denominator;
    for (let nodeIndex = 0;nodeIndex < this.potential.length; nodeIndex++) {
      this.potential[nodeIndex] += alpha * this.direction[nodeIndex];
      this.residual[nodeIndex] -= alpha * appliedDirection[nodeIndex];
    }
    let relativeResidual = Math.sqrt(dot(this.residual, this.residual)) / this.initialNorm;
    if (relativeResidual <= this.tolerance) {
      const appliedPotential = applyLaplacian(this.potential, this.system);
      this.residual = this.system.rightHandSide.map((injection, nodeIndex) => injection - appliedPotential[nodeIndex]);
      relativeResidual = Math.sqrt(dot(this.residual, this.residual)) / this.initialNorm;
      if (relativeResidual <= this.tolerance) {
        this.finish(relativeResidual);
        return;
      }
      this.direction = precondition(this.residual, this.system);
      this.residualProduct = dot(this.residual, this.direction);
      return;
    }
    const preconditioned = precondition(this.residual, this.system);
    const residualProduct = dot(this.residual, preconditioned);
    const beta = residualProduct / this.residualProduct;
    for (let nodeIndex = 0;nodeIndex < this.direction.length; nodeIndex++)
      this.direction[nodeIndex] = preconditioned[nodeIndex] + beta * this.direction[nodeIndex];
    this.residualProduct = residualProduct;
    this.system.result.diagnostics.relativeResidual = relativeResidual;
    this.system.result.diagnostics.iterations = this.iterations;
    this.progress = Math.min(0.99, Math.max(0, Math.log10(1 / relativeResidual) / Math.log10(1 / this.tolerance)));
    this.stats = { relativeResidual, meshNodes: this.potential.length };
  }
  finish(relativeResidual) {
    updateCurrentField(this.potential, this.system);
    Object.assign(this.system.result.diagnostics, {
      converged: true,
      iterations: this.iterations,
      relativeResidual
    });
    this.solved = true;
    this.progress = 1;
    this.stats = {
      ...this.system.result.diagnostics,
      meshNodes: this.potential.length
    };
  }
  getConstructorParams() {
    return this.options;
  }
  getOutput() {
    if (!this.solved)
      throw new Error(this.error ?? "The return-current solver has not converged");
    return this.system.result;
  }
  visualize() {
    updateCurrentField(this.potential, this.system);
    const result = this.system.result;
    return {
      rects: result.nodes.map((node) => ({
        center: { x: node.x, y: node.y },
        width: result.cellWidth,
        height: result.cellHeight,
        fill: currentColor(node.currentDensity / (result.diagnostics.maxCurrentDensity || 1))
      })),
      lines: result.geometry.signals.map((signal) => ({
        points: signal.route.flatMap((routePoint) => routePoint.route_type === "wire" ? [{ x: routePoint.x, y: routePoint.y }] : []),
        strokeColor: "#102c36",
        strokeWidth: 0.15
      }))
    };
  }
}

// ../simulate-return-current/lib/simulate-return-current.ts
function simulateReturnCurrent(options) {
  const solver = new ReturnCurrentSolver(options);
  solver.solve();
  return solver.getOutput();
}

// ../simulate-return-current/lib/palace/write-comparison.ts
async function writeComparison(destination) {
  const circuitJson = await readJson(`${destination}/circuit.json`);
  const model = await readJson(`${destination}/model.json`);
  const reference = await readJson(`${destination}/reference.json`);
  const result = simulateReturnCurrent({
    circuitJson,
    layerSeparation: model.layerSeparation,
    copperThickness: model.copperThickness,
    cellSize: reference.cellWidth,
    contactRadius: 0.6
  });
  const comparison = comparePalaceReference(result, { reference });
  await writeFile5(`${destination}/comparison.json`, JSON.stringify(comparison, null, 2));
  for (const solver of ["palace", "approximation"]) {
    const options = {
      title: solver === "palace" ? "Palace: ground-plane return current" : "Approximation: ground-plane return current",
      maxCurrentDensity: 50,
      vectorSpacing: Math.max(1, Math.round(1 / reference.cellWidth)),
      width: 1100,
      height: 1100
    };
    const svg = solver === "palace" ? renderPalaceReferenceSvg(result, { ...options, reference }) : renderReturnCurrentSvg(result, options);
    await writeFile5(`${destination}/${solver}.svg`, svg);
    await writeFile5(`${destination}/${solver}.png`, new Resvg2(svg).render().asPng());
  }
  console.log(comparison);
}

// ../simulate-return-current/lib/palace/resample.ts
async function resamplePalaceCase(options) {
  const started = performance.now();
  const startedAt = new Date().toISOString();
  const imageSize = imageDimension(options.imageSize);
  if (options.compareApproximation && options.imageSize !== undefined)
    throw new Error("imageSize is configurable only for Palace-only resampling");
  const destination = resolve4(options.outputDirectory);
  const model = await readJson(join3(destination, "model.json"));
  const gridStarted = performance.now();
  const grid = await writeSampleGrid({
    destination,
    geometry: model.geometry,
    cellSize: options.cellSize
  });
  const gridSeconds = (performance.now() - gridStarted) / 1000;
  if (grid.columns * grid.rows > 1e5 && options.compareApproximation)
    throw new Error("Approximation comparison is limited to 100,000 candidate cells");
  const sampleStarted = performance.now();
  await runCommand({
    command: [
      palacePython(options.python),
      palacePythonAsset("sample.py"),
      destination
    ],
    cwd: destination,
    logPath: join3(destination, "sample.log")
  });
  const sampleSeconds = (performance.now() - sampleStarted) / 1000;
  const exportStarted = performance.now();
  if (options.compareApproximation)
    await writeComparison(destination);
  const image = options.compareApproximation ? undefined : await writePalaceImage(destination, imageSize);
  const timing = {
    startedAt,
    completedAt: new Date().toISOString(),
    frequencyHz: model.frequencyHz,
    ...grid,
    reusedCompletedFemSolve: true,
    approximationCompared: Boolean(options.compareApproximation),
    gridSeconds,
    sampleSeconds,
    exportSeconds: (performance.now() - exportStarted) / 1000,
    totalSeconds: (performance.now() - started) / 1000,
    image,
    environment: {
      platform: platform(),
      architecture: arch(),
      cpuModel: cpus()[0]?.model,
      nodeVersion: process.version
    }
  };
  await writeFile6(join3(destination, "resample-timing.json"), JSON.stringify(timing, null, 2));
  return timing;
}
export {
  preparePalaceSimulation,
  resamplePalaceCase,
  runPalaceSimulation,
  setupPalacePython
};
