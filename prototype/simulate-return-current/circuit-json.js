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
  function applyToPoint(matrix, point2) {
    return Array.isArray(point2) ? [matrix.a * point2[0] + matrix.c * point2[1] + matrix.e, matrix.b * point2[0] + matrix.d * point2[1] + matrix.f] : {
      x: matrix.a * point2.x + matrix.c * point2.y + matrix.e,
      y: matrix.b * point2.x + matrix.d * point2.y + matrix.f
    };
  }
  function applyToPoints(matrix, points) {
    return points.map((point2) => applyToPoint(matrix, point2));
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
    let scaleX, scaleY, rotation2;
    if (a !== 0 || c !== 0) {
      const hypotAc = Math.hypot(a, c);
      scaleX = hypotAc;
      scaleY = (a * d - b * c) / hypotAc;
      const acos = Math.acos(a / hypotAc);
      rotation2 = c > 0 ? -acos : acos;
    } else if (b !== 0 || d !== 0) {
      const hypotBd = Math.hypot(b, d);
      scaleX = (a * d - b * c) / hypotBd;
      scaleY = hypotBd;
      const acos = Math.acos(b / hypotBd);
      rotation2 = Math.PI / 2 + (d > 0 ? -acos : acos);
    } else {
      scaleX = 0;
      scaleY = 0;
      rotation2 = 0;
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
        angle: rotation2
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

// ../simulate-return-current/lib/circuit-json-simulation.ts
import { randomUUID } from "node:crypto";
import { gzipSync } from "node:zlib";
import { Resvg } from "@resvg/resvg-js";

// ../simulate-return-current/node_modules/format-si-unit/dist/index.js
var SI_PREFIX_VALUES = /* @__PURE__ */ new Map([
  ["T", 1000000000000],
  ["G", 1e9],
  ["M", 1e6],
  ["K", 1000],
  ["k", 1000],
  ["", 1],
  ["m", 0.001],
  ["µ", 0.000001],
  ["μ", 0.000001],
  ["u", 0.000001],
  ["n", 0.000000001],
  ["p", 0.000000000001],
  ["f", 0.000000000000001]
]);
var SI_PREFIXES = [...SI_PREFIX_VALUES.keys()];
function getSiPrefixMultiplier(prefix) {
  return SI_PREFIX_VALUES.get(prefix);
}
var unitMappings = {
  Hz: {
    baseUnit: "Hz",
    variants: {
      MHz: 1e6,
      kHz: 1000,
      Hz: 1
    }
  },
  g: {
    baseUnit: "g",
    variants: {
      kg: 1000,
      g: 1
    }
  },
  Ω: {
    baseUnit: "Ω",
    variants: {
      mΩ: 0.001,
      mohm: 0.001,
      mOhm: 0.001,
      milliohm: 0.001,
      Ω: 1,
      ohm: 1,
      Ohm: 1,
      kΩ: 1000,
      KΩ: 1000,
      kohm: 1000,
      kOhm: 1000,
      KOhm: 1000,
      Kohm: 1000,
      MΩ: 1e6,
      Mohm: 1e6,
      MOhm: 1e6,
      megohm: 1e6,
      Megohm: 1e6,
      GΩ: 1e9,
      Gohm: 1e9,
      GOhm: 1e9,
      TΩ: 1000000000000,
      Tohm: 1000000000000,
      TOhm: 1000000000000
    }
  },
  V: {
    baseUnit: "V",
    variants: {
      mV: 0.001,
      V: 1,
      kV: 1000,
      KV: 1000,
      MV: 1e6,
      GV: 1e9,
      TV: 1000000000000
    }
  },
  A: {
    baseUnit: "A",
    variants: {
      µA: 0.000001,
      μA: 0.000001,
      mA: 0.001,
      ma: 0.001,
      A: 1,
      kA: 1000,
      MA: 1e6
    }
  },
  F: {
    baseUnit: "F",
    variants: {
      pF: 0.000000000001,
      nF: 0.000000001,
      µF: 0.000001,
      μF: 0.000001,
      uF: 0.000001,
      mF: 0.001,
      F: 1,
      kF: 1000,
      KF: 1000,
      MF: 1e6
    }
  },
  H: {
    baseUnit: "H",
    variants: {
      pH: 0.000000000001,
      nH: 0.000000001,
      µH: 0.000001,
      μH: 0.000001,
      uH: 0.000001,
      mH: 0.001,
      H: 1,
      kH: 1000,
      KH: 1000,
      MH: 1e6
    }
  },
  ml: {
    baseUnit: "ml",
    variants: {
      ml: 1,
      mL: 1,
      l: 1000,
      L: 1000
    }
  },
  deg: {
    baseUnit: "deg",
    variants: {
      rad: 180 / Math.PI
    }
  },
  ms: {
    baseUnit: "ms",
    variants: {
      fs: 0.000000000001,
      ps: 0.000000001,
      ns: 0.000001,
      us: 0.001,
      µs: 0.001,
      μs: 0.001,
      ms: 1,
      s: 1000
    }
  },
  mm: {
    baseUnit: "mm",
    variants: {
      nm: 0.000001,
      µm: 0.001,
      μm: 0.001,
      um: 0.001,
      mm: 1,
      cm: 10,
      dm: 100,
      m: 1000,
      km: 1e6,
      in: 25.4,
      ft: 304.8,
      IN: 25.4,
      FT: 304.8,
      yd: 914.4,
      mi: 1609344,
      mil: 0.0254
    }
  }
};
var unitMappingAndVariantSuffixes = /* @__PURE__ */ new Set;
for (const [baseUnit, info] of Object.entries(unitMappings)) {
  unitMappingAndVariantSuffixes.add(baseUnit);
  for (const variant of Object.keys(info.variants)) {
    unitMappingAndVariantSuffixes.add(variant);
  }
}
function getBaseTscircuitUnit(unit) {
  for (const info of Object.values(unitMappings)) {
    if (unit in info.variants) {
      return {
        baseUnit: info.baseUnit,
        conversionFactor: info.variants[unit]
      };
    }
    for (const [variant, conversionFactor] of Object.entries(info.variants)) {
      if (!unit.endsWith(variant))
        continue;
      const prefix = unit.slice(0, -variant.length);
      const prefixMultiplier = getSiPrefixMultiplier(prefix);
      if (prefixMultiplier == null)
        continue;
      return {
        baseUnit: info.baseUnit,
        conversionFactor: prefixMultiplier * conversionFactor
      };
    }
  }
  return {
    baseUnit: unit,
    conversionFactor: 1
  };
}
function parseAndConvertSiUnit(v, unitOfValue) {
  if (v === undefined || v === null)
    return { parsedUnit: null, unitOfValue: null, value: null };
  if (typeof v === "string" && v.match(/^-?[\d.]+$/))
    return {
      value: Number.parseFloat(v),
      parsedUnit: null,
      unitOfValue: null
    };
  if (typeof v === "number")
    return { value: v, parsedUnit: null, unitOfValue: null };
  if (typeof v === "object" && "x" in v && "y" in v) {
    const firstResult = parseAndConvertSiUnit(v.x, unitOfValue);
    const xResult = parseAndConvertSiUnit(v.x, unitOfValue);
    const yResult = parseAndConvertSiUnit(v.y, unitOfValue);
    if (xResult.value === null || yResult.value === null) {
      return { parsedUnit: null, unitOfValue: null, value: null };
    }
    return {
      parsedUnit: firstResult.parsedUnit,
      unitOfValue: firstResult.unitOfValue,
      value: {
        x: xResult.value,
        y: yResult.value
      }
    };
  }
  const reversedInputString = v.toString().split("").reverse().join("");
  const unitReversed = reversedInputString.match(/[^\d\s]+/)?.[0];
  if (!unitReversed) {
    throw new Error(`Could not determine unit: "${v}"`);
  }
  const unit = unitReversed.split("").reverse().join("");
  const numberPart = v.slice(0, -unit.length);
  const bareSiPrefixMultiplier = getSiPrefixMultiplier(unit);
  if (unitOfValue && bareSiPrefixMultiplier != null) {
    return {
      parsedUnit: null,
      unitOfValue,
      value: Number.parseFloat(numberPart) * bareSiPrefixMultiplier
    };
  }
  if (bareSiPrefixMultiplier != null && !unitMappingAndVariantSuffixes.has(unit)) {
    return {
      parsedUnit: null,
      unitOfValue: null,
      value: Number.parseFloat(numberPart) * bareSiPrefixMultiplier
    };
  }
  const { baseUnit, conversionFactor } = getBaseTscircuitUnit(unit);
  return {
    parsedUnit: unit,
    unitOfValue: baseUnit,
    value: conversionFactor * Number.parseFloat(numberPart)
  };
}
var SI_PREFIX_PATTERN = SI_PREFIXES.filter((prefix) => prefix !== "").sort((a, b) => b.length - a.length).map((prefix) => prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
var SI_UNIT_PATTERN = new RegExp(`^([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?)(?:(${SI_PREFIX_PATTERN}))?$`);
var SI_PREFIXES2 = [
  { value: 1000000000000, symbol: "T" },
  { value: 1e9, symbol: "G" },
  { value: 1e6, symbol: "M" },
  { value: 1000, symbol: "k" },
  { value: 1, symbol: "" },
  { value: 0.001, symbol: "m" },
  { value: 0.000001, symbol: "µ" },
  { value: 0.000000001, symbol: "n" },
  { value: 0.000000000001, symbol: "p" }
];
var FALLBACK_PREFIX = SI_PREFIXES2[SI_PREFIXES2.length - 1];

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
// ../simulate-return-current/node_modules/circuit-json/dist/index.mjs
var resistance = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "Ω").value);
var capacitance = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "F").value).transform((value) => {
  return Number.parseFloat(value.toPrecision(12));
});
var inductance = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "H").value);
var voltage = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "V").value);
var length = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v).value);
var frequency = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "Hz").value);
var distance = length;
var current = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v, "A").value);
var duration_ms = exports_external.string().or(exports_external.number()).transform((v) => parseAndConvertSiUnit(v).value);
var ms = duration_ms;
var timestamp = exports_external.string().datetime();
var rotation = exports_external.string().or(exports_external.number()).transform((arg) => {
  if (typeof arg === "number")
    return arg;
  if (arg.endsWith("deg")) {
    return Number.parseFloat(arg.split("deg")[0]);
  }
  if (arg.endsWith("rad")) {
    return Number.parseFloat(arg.split("rad")[0]) * 180 / Math.PI;
  }
  return Number.parseFloat(arg);
});
var battery_capacity = exports_external.number().or(exports_external.string().endsWith("mAh")).transform((v) => {
  if (typeof v === "string") {
    const valString = v.replace("mAh", "");
    const num = Number.parseFloat(valString);
    if (Number.isNaN(num)) {
      throw new Error("Invalid capacity");
    }
    return num;
  }
  return v;
}).describe("Battery capacity in mAh");
var expectTypesMatch = (shouldBe) => {};
expectTypesMatch("extra props b");
expectTypesMatch("missing props b");
expectTypesMatch(true);
expectTypesMatch("mismatched prop types: a");
var expectStringUnionsMatch = (shouldBe) => {};
expectStringUnionsMatch(true);
expectStringUnionsMatch('T1 has extra: "c", T2 has extra: "d"');
expectStringUnionsMatch('T1 has extra: "c"');
expectStringUnionsMatch('T2 has extra: "c"');
expectStringUnionsMatch('T1 has extra: "d", T2 has extra: "c"');
expectStringUnionsMatch(true);
var point = exports_external.object({
  x: distance,
  y: distance
});
expectTypesMatch(true);
expectTypesMatch(true);
var point3 = exports_external.object({
  x: distance,
  y: distance,
  z: distance
});
expectTypesMatch(true);
var size = exports_external.object({
  width: exports_external.number(),
  height: exports_external.number()
});
expectTypesMatch(true);
var finite_distance = distance.pipe(exports_external.number().finite());
var positive_distance = distance.pipe(exports_external.number().finite().positive());
var circle_shape = exports_external.object({
  shape: exports_external.literal("circle"),
  x: finite_distance,
  y: finite_distance,
  radius: positive_distance
}).strict();
var rect_shape = exports_external.object({
  shape: exports_external.literal("rect"),
  x: finite_distance,
  y: finite_distance,
  width: positive_distance,
  height: positive_distance
}).strict();
var rotated_rect_shape = rect_shape.extend({
  shape: exports_external.literal("rotated_rect"),
  ccw_rotation: rotation.pipe(exports_external.number().finite())
});
var polygon_shape = exports_external.object({
  shape: exports_external.literal("polygon"),
  points: exports_external.array(point.extend({ x: finite_distance, y: finite_distance })).min(3).refine((points) => {
    const twice_area = points.reduce((sum, point2, index) => {
      const next = points[(index + 1) % points.length];
      return sum + point2.x * next.y - next.x * point2.y;
    }, 0);
    return Number.isFinite(twice_area) && twice_area !== 0;
  }, "Polygon boundary must enclose a nonzero area")
}).strict();
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var standard_shape = exports_external.discriminatedUnion("shape", [
  circle_shape,
  rect_shape,
  rotated_rect_shape,
  polygon_shape
]);
expectTypesMatch(true);
var randomId = (length4) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: length4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};
var getZodPrefixedIdWithDefault = (prefix) => {
  return exports_external.string().optional().default(() => `${prefix}_${randomId(10)}`);
};
var ninePointAnchor = exports_external.enum([
  "top_left",
  "top_center",
  "top_right",
  "center_left",
  "center",
  "center_right",
  "bottom_left",
  "bottom_center",
  "bottom_right"
]);
expectTypesMatch(true);
var pcbRenderLayer = exports_external.enum([
  "top_silkscreen",
  "bottom_silkscreen",
  "top_copper",
  "bottom_copper",
  "top_soldermask",
  "bottom_soldermask",
  "top_fabrication_note",
  "bottom_fabrication_note",
  "top_user_note",
  "bottom_user_note",
  "top_courtyard",
  "bottom_courtyard",
  "inner1_copper",
  "inner2_copper",
  "inner3_copper",
  "inner4_copper",
  "inner5_copper",
  "inner6_copper",
  "inner7_copper",
  "inner8_copper",
  "edge_cuts",
  "drill"
]);
expectTypesMatch(true);
var asset = exports_external.object({
  project_relative_path: exports_external.string(),
  url: exports_external.string(),
  mimetype: exports_external.string()
});
expectTypesMatch(true);
var kicadAt = point.extend({
  rotation: rotation.optional()
});
expectTypesMatch(true);
var kicadFont = exports_external.object({
  size: point.optional(),
  thickness: distance.optional()
});
expectTypesMatch(true);
var kicadEffects = exports_external.object({
  font: kicadFont.optional()
});
expectTypesMatch(true);
var kicadProperty = exports_external.object({
  value: exports_external.string(),
  at: kicadAt.optional(),
  layer: exports_external.string().optional(),
  uuid: exports_external.string().optional(),
  hide: exports_external.boolean().optional(),
  effects: kicadEffects.optional()
});
expectTypesMatch(true);
var kicadFootprintProperties = exports_external.object({
  Reference: kicadProperty.optional(),
  Value: kicadProperty.optional(),
  Datasheet: kicadProperty.optional(),
  Description: kicadProperty.optional()
});
expectTypesMatch(true);
var kicadFootprintAttributes = exports_external.object({
  through_hole: exports_external.boolean().optional(),
  smd: exports_external.boolean().optional(),
  exclude_from_pos_files: exports_external.boolean().optional(),
  exclude_from_bom: exports_external.boolean().optional()
});
expectTypesMatch(true);
var kicadFootprintPad = exports_external.object({
  name: exports_external.string(),
  type: exports_external.string(),
  shape: exports_external.string().optional(),
  at: kicadAt.optional(),
  size: point.optional(),
  drill: distance.optional(),
  layers: exports_external.array(exports_external.string()).optional(),
  removeUnusedLayers: exports_external.boolean().optional(),
  uuid: exports_external.string().optional()
});
expectTypesMatch(true);
var kicadFootprintModel = exports_external.object({
  path: exports_external.string(),
  offset: point3.optional(),
  scale: point3.optional(),
  rotate: point3.optional()
});
expectTypesMatch(true);
var kicadFootprintMetadata = exports_external.object({
  footprintName: exports_external.string().optional(),
  version: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  generator: exports_external.string().optional(),
  generatorVersion: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  layer: exports_external.string().optional(),
  properties: kicadFootprintProperties.optional(),
  attributes: kicadFootprintAttributes.optional(),
  pads: exports_external.array(kicadFootprintPad).optional(),
  embeddedFonts: exports_external.boolean().optional(),
  model: kicadFootprintModel.optional()
});
expectTypesMatch(true);
var kicadSymbolPinNumbers = exports_external.object({
  hide: exports_external.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolPinNames = exports_external.object({
  offset: distance.optional(),
  hide: exports_external.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolEffects = exports_external.object({
  font: kicadFont.optional(),
  justify: exports_external.union([exports_external.string(), exports_external.array(exports_external.string())]).optional(),
  hide: exports_external.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolProperty = exports_external.object({
  value: exports_external.string(),
  id: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  at: kicadAt.optional(),
  effects: kicadSymbolEffects.optional()
});
expectTypesMatch(true);
var kicadSymbolProperties = exports_external.object({
  Reference: kicadSymbolProperty.optional(),
  Value: kicadSymbolProperty.optional(),
  Footprint: kicadSymbolProperty.optional(),
  Datasheet: kicadSymbolProperty.optional(),
  Description: kicadSymbolProperty.optional(),
  ki_keywords: kicadSymbolProperty.optional(),
  ki_fp_filters: kicadSymbolProperty.optional()
});
expectTypesMatch(true);
var kicadSymbolMetadata = exports_external.object({
  symbolName: exports_external.string().optional(),
  extends: exports_external.string().optional(),
  pinNumbers: kicadSymbolPinNumbers.optional(),
  pinNames: kicadSymbolPinNames.optional(),
  excludeFromSim: exports_external.boolean().optional(),
  inBom: exports_external.boolean().optional(),
  onBoard: exports_external.boolean().optional(),
  properties: kicadSymbolProperties.optional(),
  embeddedFonts: exports_external.boolean().optional()
});
expectTypesMatch(true);
var base_circuit_json_error = exports_external.object({
  error_type: exports_external.string(),
  message: exports_external.string(),
  is_fatal: exports_external.boolean().optional()
});
expectTypesMatch(true);
var supplier_name = exports_external.enum([
  "jlcpcb",
  "macrofab",
  "pcbway",
  "digikey",
  "mouser",
  "lcsc"
]);
expectTypesMatch(true);
var source_component_base = exports_external.object({
  type: exports_external.literal("source_component"),
  ftype: exports_external.string().optional(),
  source_component_id: exports_external.string(),
  name: exports_external.string(),
  manufacturer_part_number: exports_external.string().optional(),
  supplier_part_numbers: exports_external.record(supplier_name, exports_external.array(exports_external.string())).optional(),
  display_value: exports_external.string().optional(),
  display_name: exports_external.string().optional(),
  are_pins_interchangeable: exports_external.boolean().optional(),
  internally_connected_source_port_ids: exports_external.array(exports_external.array(exports_external.string())).optional(),
  source_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var source_simple_capacitor = source_component_base.extend({
  ftype: exports_external.literal("simple_capacitor"),
  capacitance,
  max_voltage_rating: voltage.optional(),
  display_capacitance: exports_external.string().optional(),
  max_decoupling_trace_length: distance.optional()
});
expectTypesMatch(true);
var source_simple_resistor = source_component_base.extend({
  ftype: exports_external.literal("simple_resistor"),
  resistance,
  display_resistance: exports_external.string().optional()
});
expectTypesMatch(true);
var source_simple_diode = source_component_base.extend({
  ftype: exports_external.literal("simple_diode")
});
expectTypesMatch(true);
var source_simple_fiducial = source_component_base.extend({
  ftype: exports_external.literal("simple_fiducial")
});
expectTypesMatch(true);
var source_simple_led = source_simple_diode.extend({
  ftype: exports_external.literal("simple_led"),
  color: exports_external.string().optional(),
  wavelength: exports_external.string().optional()
});
expectTypesMatch(true);
var source_simple_ground = source_component_base.extend({
  ftype: exports_external.literal("simple_ground")
});
expectTypesMatch(true);
var source_simple_chip = source_component_base.extend({
  ftype: exports_external.literal("simple_chip")
});
expectTypesMatch(true);
var source_printed_part = source_component_base.extend({
  ftype: exports_external.literal("printedpart")
});
expectTypesMatch(true);
var source_subassembly = source_component_base.extend({
  ftype: exports_external.literal("subassembly")
});
expectTypesMatch(true);
var source_motor = source_component_base.extend({
  ftype: exports_external.literal("motor")
});
expectTypesMatch(true);
var source_simple_power_source = source_component_base.extend({
  ftype: exports_external.literal("simple_power_source"),
  voltage
});
expectTypesMatch(true);
var source_simple_current_source = source_component_base.extend({
  ftype: exports_external.literal("simple_current_source"),
  current,
  frequency: frequency.optional(),
  peak_to_peak_current: current.optional(),
  wave_shape: exports_external.enum(["sine", "square", "triangle", "sawtooth", "dc"]).optional().default("dc"),
  phase: exports_external.number().optional(),
  duty_cycle: exports_external.number().min(0).max(1).optional()
});
expectTypesMatch(true);
var source_simple_fuse = source_component_base.extend({
  ftype: exports_external.literal("simple_fuse"),
  current_rating_amps: exports_external.number().describe("Nominal current in amps the fuse is rated for"),
  voltage_rating_volts: exports_external.number().describe("Voltage rating in volts, e.g. ±5V would be 5")
});
expectTypesMatch(true);
var source_simple_ammeter = source_component_base.extend({
  ftype: exports_external.literal("simple_ammeter")
});
expectTypesMatch(true);
var pin_voltage = exports_external.union([
  exports_external.number(),
  exports_external.string().trim().regex(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?\s*(?:[fpnumkKMGTµμ]?V?|V)?$/, "Expected a scalar voltage, optionally with SI units")
]).pipe(voltage).pipe(exports_external.number().finite());
var source_pin_attributes = exports_external.object({
  is_input: exports_external.boolean().optional(),
  is_output: exports_external.boolean().optional(),
  is_bidirectional: exports_external.boolean().optional(),
  is_passive: exports_external.boolean().optional(),
  can_use_tri_state: exports_external.boolean().optional(),
  is_using_tri_state: exports_external.boolean().optional(),
  can_use_open_collector: exports_external.boolean().optional(),
  is_using_open_collector: exports_external.boolean().optional(),
  can_use_open_emitter: exports_external.boolean().optional(),
  is_using_open_emitter: exports_external.boolean().optional(),
  is_gpio: exports_external.boolean().optional(),
  highlight_color: exports_external.string().optional(),
  must_be_connected: exports_external.boolean().optional(),
  provides_power: exports_external.boolean().optional(),
  requires_power: exports_external.boolean().optional(),
  provides_ground: exports_external.boolean().optional(),
  requires_ground: exports_external.boolean().optional(),
  provides_voltage: pin_voltage.optional(),
  requires_voltage: pin_voltage.optional(),
  required_voltage_tolerance: exports_external.number().finite().min(0).max(1).optional(),
  do_not_connect: exports_external.boolean().optional(),
  include_in_board_pinout: exports_external.boolean().optional(),
  can_use_internal_pullup: exports_external.boolean().optional(),
  is_using_internal_pullup: exports_external.boolean().optional(),
  needs_external_pullup: exports_external.boolean().optional(),
  can_use_internal_pulldown: exports_external.boolean().optional(),
  is_using_internal_pulldown: exports_external.boolean().optional(),
  needs_external_pulldown: exports_external.boolean().optional(),
  can_use_open_drain: exports_external.boolean().optional(),
  is_using_open_drain: exports_external.boolean().optional(),
  can_use_push_pull: exports_external.boolean().optional(),
  is_using_push_pull: exports_external.boolean().optional(),
  should_have_decoupling_capacitor: exports_external.boolean().optional(),
  recommended_decoupling_capacitor_capacitance: exports_external.union([exports_external.string(), exports_external.number()]).optional(),
  is_configured_for_i2c_sda: exports_external.boolean().optional(),
  is_configured_for_i2c_scl: exports_external.boolean().optional(),
  is_configured_for_spi_mosi: exports_external.boolean().optional(),
  is_configured_for_spi_miso: exports_external.boolean().optional(),
  is_configured_for_spi_sck: exports_external.boolean().optional(),
  is_configured_for_spi_cs: exports_external.boolean().optional(),
  is_configured_for_uart_tx: exports_external.boolean().optional(),
  is_configured_for_uart_rx: exports_external.boolean().optional(),
  supports_i2c_sda: exports_external.boolean().optional(),
  supports_i2c_scl: exports_external.boolean().optional(),
  supports_spi_mosi: exports_external.boolean().optional(),
  supports_spi_miso: exports_external.boolean().optional(),
  supports_spi_sck: exports_external.boolean().optional(),
  supports_spi_cs: exports_external.boolean().optional(),
  supports_uart_tx: exports_external.boolean().optional(),
  supports_uart_rx: exports_external.boolean().optional()
});
expectTypesMatch(true);
var source_simple_battery = source_component_base.extend({
  ftype: exports_external.literal("simple_battery"),
  capacity: battery_capacity
});
expectTypesMatch(true);
var source_simple_inductor = source_component_base.extend({
  ftype: exports_external.literal("simple_inductor"),
  inductance,
  display_inductance: exports_external.string().optional(),
  max_current_rating: exports_external.number().optional()
});
expectTypesMatch(true);
var source_simple_push_button = source_component_base.extend({
  ftype: exports_external.literal("simple_push_button")
});
expectTypesMatch(true);
var source_simple_potentiometer = source_component_base.extend({
  ftype: exports_external.literal("simple_potentiometer"),
  max_resistance: resistance,
  display_max_resistance: exports_external.string().optional()
});
expectTypesMatch(true);
var source_simple_crystal = source_component_base.extend({
  ftype: exports_external.literal("simple_crystal"),
  frequency: exports_external.number().describe("Frequency in Hz"),
  load_capacitance: exports_external.number().optional().describe("Load capacitance in pF"),
  pin_variant: exports_external.enum(["two_pin", "four_pin"]).optional()
});
expectTypesMatch(true);
var source_simple_pin_header = source_component_base.extend({
  ftype: exports_external.literal("simple_pin_header"),
  pin_count: exports_external.number(),
  gender: exports_external.enum(["male", "female"]).optional().default("male")
});
expectTypesMatch(true);
var source_simple_connector_standards = [
  "usb_c",
  "m2",
  "jst_sh",
  "jst_gh",
  "jst_zh",
  "jst_ph",
  "jst_xh",
  "jst_vh"
];
var source_simple_connector = source_component_base.extend({
  ftype: exports_external.literal("simple_connector"),
  standard: exports_external.enum(source_simple_connector_standards).optional(),
  pin_count: exports_external.number().int().positive().optional()
});
expectTypesMatch(true);
var source_simple_pinout = source_component_base.extend({
  ftype: exports_external.literal("simple_pinout")
});
expectTypesMatch(true);
var source_simple_resonator = source_component_base.extend({
  ftype: exports_external.literal("simple_resonator"),
  load_capacitance: capacitance,
  equivalent_series_resistance: resistance.optional(),
  frequency
});
expectTypesMatch(true);
var source_simple_transistor = source_component_base.extend({
  ftype: exports_external.literal("simple_transistor"),
  transistor_type: exports_external.enum(["npn", "pnp"])
});
expectTypesMatch(true);
var source_simple_test_point = source_component_base.extend({
  ftype: exports_external.literal("simple_test_point"),
  footprint_variant: exports_external.enum(["pad", "through_hole"]).optional(),
  pad_shape: exports_external.enum(["rect", "circle"]).optional(),
  pad_diameter: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  hole_diameter: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  width: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  height: exports_external.union([exports_external.number(), exports_external.string()]).optional()
});
expectTypesMatch(true);
var source_simple_mosfet = source_component_base.extend({
  ftype: exports_external.literal("simple_mosfet"),
  channel_type: exports_external.enum(["n", "p"]),
  mosfet_mode: exports_external.enum(["enhancement", "depletion"])
});
expectTypesMatch(true);
var source_simple_op_amp = source_component_base.extend({
  ftype: exports_external.literal("simple_op_amp")
});
expectTypesMatch(true);
var source_simple_switch = source_component_base.extend({
  ftype: exports_external.literal("simple_switch")
});
expectTypesMatch(true);
var source_project_metadata = exports_external.object({
  type: exports_external.literal("source_project_metadata"),
  name: exports_external.string().optional(),
  software_used_string: exports_external.string().optional(),
  project_url: exports_external.string().optional(),
  source_filesystem_md5_hash: exports_external.string().optional(),
  created_at: timestamp.optional()
});
expectTypesMatch(true);
var source_missing_property_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_missing_property_error"),
  source_missing_property_error_id: getZodPrefixedIdWithDefault("source_missing_property_error"),
  source_component_id: exports_external.string(),
  property_name: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  error_type: exports_external.literal("source_missing_property_error").default("source_missing_property_error")
}).describe("The source code is missing a property");
expectTypesMatch(true);
var source_failed_to_create_component_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_failed_to_create_component_error"),
  source_failed_to_create_component_error_id: getZodPrefixedIdWithDefault("source_failed_to_create_component_error"),
  error_type: exports_external.literal("source_failed_to_create_component_error").default("source_failed_to_create_component_error"),
  component_name: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  parent_source_component_id: exports_external.string().optional(),
  pcb_center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional(),
  schematic_center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional()
}).describe("Error emitted when a component fails to be constructed");
expectTypesMatch(true);
var source_invalid_component_property_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_invalid_component_property_error"),
  source_invalid_component_property_error_id: getZodPrefixedIdWithDefault("source_invalid_component_property_error"),
  source_component_id: exports_external.string(),
  property_name: exports_external.string(),
  property_value: exports_external.unknown().optional(),
  expected_format: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  error_type: exports_external.literal("source_invalid_component_property_error").default("source_invalid_component_property_error")
}).describe("The source component property is invalid");
expectTypesMatch(true);
var source_trace_not_connected_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_trace_not_connected_error"),
  source_trace_not_connected_error_id: getZodPrefixedIdWithDefault("source_trace_not_connected_error"),
  error_type: exports_external.literal("source_trace_not_connected_error").default("source_trace_not_connected_error"),
  subcircuit_id: exports_external.string().optional(),
  source_group_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  connected_source_port_ids: exports_external.array(exports_external.string()).optional(),
  selectors_not_found: exports_external.array(exports_external.string()).optional()
}).describe("Occurs when a source trace selector does not match any ports");
expectTypesMatch(true);
var source_property_ignored_warning = exports_external.object({
  type: exports_external.literal("source_property_ignored_warning"),
  source_property_ignored_warning_id: getZodPrefixedIdWithDefault("source_property_ignored_warning"),
  source_component_id: exports_external.string(),
  property_name: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  error_type: exports_external.literal("source_property_ignored_warning").default("source_property_ignored_warning"),
  message: exports_external.string()
}).describe("The source property was ignored");
expectTypesMatch(true);
var source_pin_missing_trace_warning = exports_external.object({
  type: exports_external.literal("source_pin_missing_trace_warning"),
  source_pin_missing_trace_warning_id: getZodPrefixedIdWithDefault("source_pin_missing_trace_warning"),
  warning_type: exports_external.literal("source_pin_missing_trace_warning").default("source_pin_missing_trace_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  source_port_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a source component pin is missing a trace connection");
expectTypesMatch(true);
var source_missing_manufacturer_part_number_warning = exports_external.object({
  type: exports_external.literal("source_missing_manufacturer_part_number_warning"),
  source_missing_manufacturer_part_number_warning_id: getZodPrefixedIdWithDefault("source_missing_manufacturer_part_number_warning"),
  warning_type: exports_external.literal("source_missing_manufacturer_part_number_warning").default("source_missing_manufacturer_part_number_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  standard: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a source component is missing its manufacturer part number");
expectTypesMatch(true);
var source_refdes_convention_warning = exports_external.object({
  type: exports_external.literal("source_refdes_convention_warning"),
  source_refdes_convention_warning_id: getZodPrefixedIdWithDefault("source_refdes_convention_warning"),
  warning_type: exports_external.literal("source_refdes_convention_warning").default("source_refdes_convention_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  refdes: exports_external.string(),
  source_component_ftype: exports_external.string(),
  expected_prefixes: exports_external.array(exports_external.string()),
  actual_prefix: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a source component reference designator does not match the component type convention");
expectTypesMatch(true);
var source_component_availability_warning = exports_external.object({
  type: exports_external.literal("source_component_availability_warning"),
  source_component_availability_warning_id: getZodPrefixedIdWithDefault("source_component_availability_warning"),
  warning_type: exports_external.literal("source_component_availability_warning").default("source_component_availability_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  supplier_name,
  supplier_part_numbers: exports_external.array(exports_external.string()).nonempty()
}).describe("Warning emitted when no supplier alternative can be confirmed in stock. Availability may be unknown or change over time.");
expectTypesMatch(true);
var source_simple_voltage_probe = source_component_base.extend({
  ftype: exports_external.literal("simple_voltage_probe")
});
expectTypesMatch(true);
var source_interconnect = source_component_base.extend({
  ftype: exports_external.literal("interconnect")
});
expectTypesMatch(true);
var source_i2c_misconfigured_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_i2c_misconfigured_error"),
  source_i2c_misconfigured_error_id: getZodPrefixedIdWithDefault("source_i2c_misconfigured_error"),
  error_type: exports_external.literal("source_i2c_misconfigured_error").default("source_i2c_misconfigured_error"),
  source_port_ids: exports_external.array(exports_external.string())
}).describe("Error emitted when incompatible I2C pins (e.g. SDA and SCL) are connected to the same net");
expectTypesMatch(true);
var source_component_misconfigured_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_component_misconfigured_error"),
  source_component_misconfigured_error_id: getZodPrefixedIdWithDefault("source_component_misconfigured_error"),
  error_type: exports_external.literal("source_component_misconfigured_error").default("source_component_misconfigured_error"),
  source_component_ids: exports_external.array(exports_external.string()),
  source_port_ids: exports_external.array(exports_external.string()).optional()
}).describe("Error emitted when one or more source components have an invalid or conflicting configuration");
expectTypesMatch(true);
var source_simple_voltage_source = source_component_base.extend({
  ftype: exports_external.literal("simple_voltage_source"),
  voltage,
  frequency: frequency.optional(),
  peak_to_peak_voltage: voltage.optional(),
  wave_shape: exports_external.enum(["sinewave", "square", "triangle", "sawtooth"]).optional(),
  phase: rotation.optional(),
  duty_cycle: exports_external.number().optional().describe("Duty cycle as a fraction (0 to 1)"),
  pulse_delay: ms.optional(),
  rise_time: ms.optional(),
  fall_time: ms.optional(),
  pulse_width: ms.optional(),
  period: ms.optional()
});
expectTypesMatch(true);
var any_source_component = exports_external.union([
  source_simple_resistor,
  source_simple_capacitor,
  source_simple_diode,
  source_simple_fiducial,
  source_simple_led,
  source_simple_ground,
  source_simple_chip,
  source_printed_part,
  source_subassembly,
  source_motor,
  source_simple_power_source,
  source_simple_current_source,
  source_simple_ammeter,
  source_simple_battery,
  source_simple_inductor,
  source_simple_push_button,
  source_simple_potentiometer,
  source_simple_crystal,
  source_simple_pin_header,
  source_simple_connector,
  source_simple_pinout,
  source_simple_resonator,
  source_simple_switch,
  source_simple_transistor,
  source_simple_test_point,
  source_simple_mosfet,
  source_simple_op_amp,
  source_simple_fuse,
  source_simple_voltage_probe,
  source_interconnect,
  source_simple_voltage_source,
  source_project_metadata,
  source_missing_property_error,
  source_invalid_component_property_error,
  source_failed_to_create_component_error,
  source_trace_not_connected_error,
  source_property_ignored_warning,
  source_pin_missing_trace_warning,
  source_missing_manufacturer_part_number_warning,
  source_refdes_convention_warning,
  source_component_availability_warning,
  source_i2c_misconfigured_error,
  source_component_misconfigured_error
]);
expectTypesMatch(true);
var source_port = exports_external.object({
  type: exports_external.literal("source_port"),
  pin_number: exports_external.number().optional(),
  port_hints: exports_external.array(exports_external.string()).optional(),
  name: exports_external.string(),
  source_port_id: exports_external.string(),
  source_component_id: exports_external.string().optional(),
  source_group_id: exports_external.string().optional(),
  most_frequently_referenced_by_name: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional()
}).merge(source_pin_attributes);
expectTypesMatch(true);
var source_component_internal_connection = exports_external.object({
  type: exports_external.literal("source_component_internal_connection"),
  source_component_internal_connection_id: exports_external.string(),
  source_component_id: exports_external.string(),
  source_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var source_trace = exports_external.object({
  type: exports_external.literal("source_trace"),
  source_trace_id: exports_external.string(),
  connected_source_port_ids: exports_external.array(exports_external.string()),
  connected_source_net_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional(),
  max_length: exports_external.number().optional(),
  max_via_count: exports_external.number().int().nonnegative().optional(),
  name: exports_external.string().optional(),
  min_trace_thickness: exports_external.number().optional(),
  display_name: exports_external.string().optional()
});
expectTypesMatch(true);
var source_group = exports_external.object({
  type: exports_external.literal("source_group"),
  source_group_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  parent_subcircuit_id: exports_external.string().optional(),
  parent_source_group_id: exports_external.string().optional(),
  is_subcircuit: exports_external.boolean().optional(),
  show_as_schematic_box: exports_external.boolean().optional(),
  name: exports_external.string().optional(),
  was_automatically_named: exports_external.boolean().optional()
});
expectTypesMatch(true);
var source_net = exports_external.object({
  type: exports_external.literal("source_net"),
  source_net_id: exports_external.string(),
  name: exports_external.string(),
  member_source_group_ids: exports_external.array(exports_external.string()),
  is_power: exports_external.boolean().optional(),
  is_ground: exports_external.boolean().optional(),
  is_digital_signal: exports_external.boolean().optional(),
  is_analog_signal: exports_external.boolean().optional(),
  is_positive_voltage_source: exports_external.boolean().optional(),
  trace_width: exports_external.number().optional(),
  subcircuit_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional()
});
expectTypesMatch(true);
var source_board = exports_external.object({
  type: exports_external.literal("source_board"),
  source_board_id: exports_external.string(),
  source_group_id: exports_external.string(),
  title: exports_external.string().optional()
}).describe("Defines a board in the source domain");
expectTypesMatch(true);
var source_ambiguous_port_reference = base_circuit_json_error.extend({
  type: exports_external.literal("source_ambiguous_port_reference"),
  source_ambiguous_port_reference_id: getZodPrefixedIdWithDefault("source_ambiguous_port_reference"),
  error_type: exports_external.literal("source_ambiguous_port_reference").default("source_ambiguous_port_reference"),
  source_port_id: exports_external.string().optional(),
  source_component_id: exports_external.string().optional()
}).describe("Error emitted when a port hint matches multiple non-overlapping pads, making the port reference ambiguous");
expectTypesMatch(true);
var source_pcb_ground_plane = exports_external.object({
  type: exports_external.literal("source_pcb_ground_plane"),
  source_pcb_ground_plane_id: exports_external.string(),
  source_group_id: exports_external.string(),
  source_net_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a ground plane in the source domain");
expectTypesMatch(true);
var all_layers = [
  "top",
  "bottom",
  "inner1",
  "inner2",
  "inner3",
  "inner4",
  "inner5",
  "inner6",
  "inner7",
  "inner8"
];
var layer_string = exports_external.enum(all_layers);
var layer_ref = layer_string.or(exports_external.object({
  name: layer_string
})).transform((layer) => {
  if (typeof layer === "string") {
    return layer;
  }
  return layer.name;
});
expectTypesMatch(true);
var visible_layer = exports_external.enum(["top", "bottom"]);
var source_manually_placed_via = exports_external.object({
  type: exports_external.literal("source_manually_placed_via"),
  source_manually_placed_via_id: exports_external.string(),
  source_group_id: exports_external.string(),
  source_net_id: exports_external.string().min(1).optional(),
  subcircuit_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional()
}).describe("Defines a via that is manually placed in the source domain");
expectTypesMatch(true);
var source_unnamed_trace_warning = exports_external.object({
  type: exports_external.literal("source_unnamed_trace_warning"),
  source_unnamed_trace_warning_id: getZodPrefixedIdWithDefault("source_unnamed_trace_warning"),
  warning_type: exports_external.literal("source_unnamed_trace_warning").default("source_unnamed_trace_warning"),
  message: exports_external.string(),
  source_trace_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a source trace is missing a name");
expectTypesMatch(true);
var source_no_power_pin_defined_warning = exports_external.object({
  type: exports_external.literal("source_no_power_pin_defined_warning"),
  source_no_power_pin_defined_warning_id: getZodPrefixedIdWithDefault("source_no_power_pin_defined_warning"),
  warning_type: exports_external.literal("source_no_power_pin_defined_warning").default("source_no_power_pin_defined_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  source_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a chip has no source ports with requires_power=true");
expectTypesMatch(true);
var source_no_ground_pin_defined_warning = exports_external.object({
  type: exports_external.literal("source_no_ground_pin_defined_warning"),
  source_no_ground_pin_defined_warning_id: getZodPrefixedIdWithDefault("source_no_ground_pin_defined_warning"),
  warning_type: exports_external.literal("source_no_ground_pin_defined_warning").default("source_no_ground_pin_defined_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  source_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a chip has no source ports marked as ground pins");
expectTypesMatch(true);
var source_component_pins_underspecified_warning = exports_external.object({
  type: exports_external.literal("source_component_pins_underspecified_warning"),
  source_component_pins_underspecified_warning_id: getZodPrefixedIdWithDefault("source_component_pins_underspecified_warning"),
  warning_type: exports_external.literal("source_component_pins_underspecified_warning").default("source_component_pins_underspecified_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  source_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when all ports on a source component are underspecified");
expectTypesMatch(true);
var source_pin_must_be_connected_error = base_circuit_json_error.extend({
  type: exports_external.literal("source_pin_must_be_connected_error"),
  source_pin_must_be_connected_error_id: getZodPrefixedIdWithDefault("source_pin_must_be_connected_error"),
  error_type: exports_external.literal("source_pin_must_be_connected_error").default("source_pin_must_be_connected_error"),
  source_component_id: exports_external.string(),
  source_port_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a pin with mustBeConnected attribute is not connected to any trace");
expectTypesMatch(true);
var unknown_error_finding_part = base_circuit_json_error.extend({
  type: exports_external.literal("unknown_error_finding_part"),
  unknown_error_finding_part_id: getZodPrefixedIdWithDefault("unknown_error_finding_part"),
  error_type: exports_external.literal("unknown_error_finding_part").default("unknown_error_finding_part"),
  source_component_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when an unexpected error occurs while finding a part");
expectTypesMatch(true);
var source_part_not_found_warning = exports_external.object({
  type: exports_external.literal("source_part_not_found_warning"),
  source_part_not_found_warning_id: getZodPrefixedIdWithDefault("source_part_not_found_warning"),
  warning_type: exports_external.literal("source_part_not_found_warning").default("source_part_not_found_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  supplier_name: supplier_name.optional(),
  manufacturer_part_number: exports_external.string().optional(),
  supplier_part_number: exports_external.string().optional(),
  part_name: exports_external.string().optional()
}).describe("Warning emitted when a requested part can not be found");
expectTypesMatch(true);
var source_confusing_net_name_warning = exports_external.object({
  type: exports_external.literal("source_confusing_net_name_warning"),
  source_confusing_net_name_warning_id: getZodPrefixedIdWithDefault("source_confusing_net_name_warning"),
  warning_type: exports_external.literal("source_confusing_net_name_warning").default("source_confusing_net_name_warning"),
  message: exports_external.string(),
  source_net_ids: exports_external.array(exports_external.string()).min(2),
  net_name: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when electrically disconnected source nets share a name");
expectTypesMatch(true);
var route_length = exports_external.union([
  exports_external.number().nonnegative().finite(),
  exports_external.object({
    reference: exports_external.literal("longest_manhattan"),
    source_trace_ids: exports_external.array(exports_external.string()).min(1).optional(),
    offset: exports_external.number().finite().optional()
  })
]);
var trace_spacing = exports_external.union([
  exports_external.number().positive().finite(),
  exports_external.object({ width_multiplier: exports_external.number().positive().finite() })
]);
var source_bus = exports_external.object({
  type: exports_external.literal("source_bus"),
  source_bus_id: exports_external.string(),
  name: exports_external.string().optional(),
  source_trace_ids: exports_external.array(exports_external.string()).min(1),
  max_length_skew: exports_external.number().nonnegative().finite().optional(),
  target_impedance: exports_external.number().positive().finite().optional(),
  target_differential_impedance: exports_external.number().positive().finite().optional(),
  differential_pair: exports_external.object({
    positive_source_trace_id: exports_external.string(),
    negative_source_trace_id: exports_external.string(),
    trace_gap: exports_external.number().positive().finite().optional(),
    max_uncoupled_length: exports_external.number().nonnegative().finite().optional()
  }).optional(),
  length_match_source_trace_ids: exports_external.array(exports_external.string()).min(1).optional(),
  min_length: route_length.optional(),
  max_length: route_length.optional(),
  target_length: route_length.optional(),
  length_tolerance: exports_external.number().nonnegative().finite().optional(),
  pcb_trace_spacing: trace_spacing.optional(),
  pcb_spacing_to_other_signals: trace_spacing.optional(),
  target_impedance_min: exports_external.number().positive().finite().optional(),
  target_impedance_max: exports_external.number().positive().finite().optional(),
  target_differential_impedance_min: exports_external.number().positive().finite().optional(),
  target_differential_impedance_max: exports_external.number().positive().finite().optional(),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var source_runtime_error = base_circuit_json_error.pick({ message: true, error_type: true }).extend({
  type: exports_external.literal("source_runtime_error"),
  source_runtime_error_id: getZodPrefixedIdWithDefault("source_runtime_error"),
  error_type: exports_external.literal("source_runtime_error").default("source_runtime_error"),
  phase_name: exports_external.string().optional()
}).describe("An unexpected runtime failure while generating or validating a circuit");
expectTypesMatch(true);
var schematic_box = exports_external.object({
  type: exports_external.literal("schematic_box"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  width: distance,
  height: distance,
  is_dashed: exports_external.boolean().default(false),
  x: distance,
  y: distance,
  subcircuit_id: exports_external.string().optional()
}).describe("Draws a box on the schematic");
expectTypesMatch(true);
var schematic_path = exports_external.object({
  type: exports_external.literal("schematic_path"),
  schematic_path_id: getZodPrefixedIdWithDefault("schematic_path"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  fill_color: exports_external.string().optional(),
  is_filled: exports_external.boolean().optional(),
  is_dashed: exports_external.boolean().default(false),
  stroke_width: distance.nullable().optional(),
  stroke_color: exports_external.string().optional(),
  dash_length: distance.optional(),
  dash_gap: distance.optional(),
  points: exports_external.array(point),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var schematic_pin_styles = exports_external.record(exports_external.object({
  left_margin: length.optional(),
  right_margin: length.optional(),
  top_margin: length.optional(),
  bottom_margin: length.optional()
}));
var schematic_component_port_arrangement_by_size = exports_external.object({
  left_size: exports_external.number(),
  right_size: exports_external.number(),
  top_size: exports_external.number().optional(),
  bottom_size: exports_external.number().optional()
});
expectTypesMatch(true);
var schematic_component_port_arrangement_by_sides = exports_external.object({
  left_side: exports_external.object({
    pins: exports_external.array(exports_external.number()),
    direction: exports_external.enum(["top-to-bottom", "bottom-to-top"]).optional()
  }).optional(),
  right_side: exports_external.object({
    pins: exports_external.array(exports_external.number()),
    direction: exports_external.enum(["top-to-bottom", "bottom-to-top"]).optional()
  }).optional(),
  top_side: exports_external.object({
    pins: exports_external.array(exports_external.number()),
    direction: exports_external.enum(["left-to-right", "right-to-left"]).optional()
  }).optional(),
  bottom_side: exports_external.object({
    pins: exports_external.array(exports_external.number()),
    direction: exports_external.enum(["left-to-right", "right-to-left"]).optional()
  }).optional()
});
expectTypesMatch(true);
var port_arrangement = exports_external.union([
  schematic_component_port_arrangement_by_size,
  schematic_component_port_arrangement_by_sides
]);
var schematic_component = exports_external.object({
  type: exports_external.literal("schematic_component"),
  size,
  center: point,
  source_component_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string(),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  pin_spacing: length.optional(),
  pin_styles: schematic_pin_styles.optional(),
  box_width: length.optional(),
  symbol_name: exports_external.string().optional(),
  port_arrangement: port_arrangement.optional(),
  port_labels: exports_external.record(exports_external.string()).optional(),
  symbol_display_value: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  schematic_group_id: exports_external.string().optional(),
  is_schematic_group: exports_external.boolean().optional(),
  source_group_id: exports_external.string().optional(),
  is_box_with_pins: exports_external.boolean().optional().default(true)
});
expectTypesMatch(true);
var schematicSymbolMetadata = exports_external.object({
  kicad_symbol: kicadSymbolMetadata.optional()
}).catchall(exports_external.unknown());
var schematic_symbol = exports_external.object({
  type: exports_external.literal("schematic_symbol"),
  schematic_symbol_id: exports_external.string(),
  name: exports_external.string().optional(),
  metadata: schematicSymbolMetadata.optional()
}).describe("Defines a named schematic symbol that can be referenced by components.");
expectTypesMatch(true);
var schematic_line = exports_external.object({
  type: exports_external.literal("schematic_line"),
  schematic_line_id: getZodPrefixedIdWithDefault("schematic_line"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  stroke_width: distance.nullable().optional(),
  color: exports_external.string().default("#000000"),
  is_dashed: exports_external.boolean().default(false),
  dash_length: distance.optional(),
  dash_gap: distance.optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Draws a styled line on the schematic");
expectTypesMatch(true);
var schematic_rect = exports_external.object({
  type: exports_external.literal("schematic_rect"),
  schematic_rect_id: getZodPrefixedIdWithDefault("schematic_rect"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  center: point,
  width: distance,
  height: distance,
  rotation: rotation.default(0),
  stroke_width: distance.nullable().optional(),
  color: exports_external.string().default("#000000"),
  is_filled: exports_external.boolean().default(false),
  fill_color: exports_external.string().optional(),
  is_dashed: exports_external.boolean().default(false),
  subcircuit_id: exports_external.string().optional()
}).describe("Draws a styled rectangle on the schematic");
expectTypesMatch(true);
var schematic_circle = exports_external.object({
  type: exports_external.literal("schematic_circle"),
  schematic_circle_id: getZodPrefixedIdWithDefault("schematic_circle"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  center: point,
  radius: distance,
  stroke_width: distance.nullable().optional(),
  color: exports_external.string().default("#000000"),
  is_filled: exports_external.boolean().default(false),
  fill_color: exports_external.string().optional(),
  is_dashed: exports_external.boolean().default(false),
  subcircuit_id: exports_external.string().optional()
}).describe("Draws a styled circle on the schematic");
expectTypesMatch(true);
var schematic_arc = exports_external.object({
  type: exports_external.literal("schematic_arc"),
  schematic_arc_id: getZodPrefixedIdWithDefault("schematic_arc"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  center: point,
  radius: distance,
  start_angle_degrees: rotation,
  end_angle_degrees: rotation,
  direction: exports_external.enum(["clockwise", "counterclockwise"]).default("counterclockwise"),
  stroke_width: distance.nullable().optional(),
  color: exports_external.string().default("#000000"),
  is_dashed: exports_external.boolean().default(false),
  subcircuit_id: exports_external.string().optional()
}).describe("Draws a styled arc on the schematic");
expectTypesMatch(true);
var schematic_trace = exports_external.object({
  type: exports_external.literal("schematic_trace"),
  schematic_trace_id: exports_external.string(),
  schematic_sheet_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  junctions: exports_external.array(exports_external.object({
    x: exports_external.number(),
    y: exports_external.number()
  })),
  edges: exports_external.array(exports_external.object({
    from: exports_external.object({
      x: exports_external.number(),
      y: exports_external.number()
    }),
    to: exports_external.object({
      x: exports_external.number(),
      y: exports_external.number()
    }),
    is_crossing: exports_external.boolean().optional(),
    from_schematic_port_id: exports_external.string().optional(),
    to_schematic_port_id: exports_external.string().optional()
  })),
  subcircuit_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional()
});
expectTypesMatch(true);
var fivePointAnchor = exports_external.enum([
  "center",
  "left",
  "right",
  "top",
  "bottom"
]);
expectTypesMatch(true);
var schematic_text_part = exports_external.object({
  text: exports_external.string(),
  is_overlined: exports_external.boolean().optional()
});
var schematic_text = exports_external.object({
  type: exports_external.literal("schematic_text"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  schematic_symbol_id: exports_external.string().optional(),
  schematic_text_id: exports_external.string(),
  source_trace_id: exports_external.string().optional(),
  text: exports_external.string(),
  text_parts: exports_external.array(schematic_text_part).min(1).optional(),
  display_superscript: exports_external.string().optional(),
  font_size: exports_external.number().default(0.18),
  position: exports_external.object({
    x: distance,
    y: distance
  }),
  rotation: exports_external.number().default(0),
  anchor: exports_external.union([fivePointAnchor.describe("legacy"), ninePointAnchor]).default("center"),
  color: exports_external.string().default("#000000"),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var schematic_port = exports_external.object({
  type: exports_external.literal("schematic_port"),
  schematic_port_id: exports_external.string(),
  source_port_id: exports_external.string(),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  center: point,
  facing_direction: exports_external.enum(["up", "down", "left", "right"]).optional(),
  distance_from_component_edge: exports_external.number().optional(),
  side_of_component: exports_external.enum(["top", "bottom", "left", "right"]).optional(),
  true_ccw_index: exports_external.number().optional(),
  pin_number: exports_external.number().optional(),
  display_pin_label: exports_external.string().optional(),
  display_pin_label_text_parts: exports_external.array(schematic_text_part).min(1).optional(),
  display_pin_label_font_size: exports_external.number().positive().finite().optional(),
  subcircuit_id: exports_external.string().optional(),
  is_connected: exports_external.boolean().optional(),
  is_internal_circuit_port: exports_external.boolean().optional(),
  is_overlapping_internal_circuit_port: exports_external.boolean().optional(),
  has_input_arrow: exports_external.boolean().optional(),
  has_output_arrow: exports_external.boolean().optional(),
  is_drawn_with_inversion_circle: exports_external.boolean().optional()
}).describe("Defines a port on a schematic component");
expectTypesMatch(true);
var schematic_net_label = exports_external.object({
  type: exports_external.literal("schematic_net_label"),
  schematic_net_label_id: getZodPrefixedIdWithDefault("schematic_net_label"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_trace_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  source_net_id: exports_external.string(),
  center: point,
  anchor_position: point.optional(),
  anchor_side: exports_external.enum(["top", "bottom", "left", "right"]),
  text: exports_external.string(),
  display_superscript: exports_external.string().optional(),
  symbol_name: exports_external.string().optional(),
  is_movable: exports_external.boolean().optional(),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var schematic_error = base_circuit_json_error.extend({
  type: exports_external.literal("schematic_error"),
  schematic_error_id: exports_external.string(),
  error_type: exports_external.literal("schematic_port_not_found").default("schematic_port_not_found"),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a schematic error on the schematic");
expectTypesMatch(true);
var schematic_layout_error = base_circuit_json_error.extend({
  type: exports_external.literal("schematic_layout_error"),
  schematic_layout_error_id: getZodPrefixedIdWithDefault("schematic_layout_error"),
  error_type: exports_external.literal("schematic_layout_error").default("schematic_layout_error"),
  source_group_id: exports_external.string(),
  schematic_group_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when schematic layout fails for a group");
expectTypesMatch(true);
var schematic_debug_object_base = exports_external.object({
  type: exports_external.literal("schematic_debug_object"),
  label: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
});
var schematic_debug_rect = schematic_debug_object_base.extend({
  shape: exports_external.literal("rect"),
  center: point,
  size
});
var schematic_debug_line = schematic_debug_object_base.extend({
  shape: exports_external.literal("line"),
  start: point,
  end: point
});
var schematic_debug_point = schematic_debug_object_base.extend({
  shape: exports_external.literal("point"),
  center: point
});
var schematic_debug_object = exports_external.discriminatedUnion("shape", [
  schematic_debug_rect,
  schematic_debug_line,
  schematic_debug_point
]);
expectTypesMatch(true);
var schematic_voltage_probe = exports_external.object({
  type: exports_external.literal("schematic_voltage_probe"),
  schematic_voltage_probe_id: exports_external.string(),
  schematic_sheet_id: exports_external.string().optional(),
  source_component_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  position: point,
  schematic_trace_id: exports_external.string(),
  voltage: voltage.optional(),
  subcircuit_id: exports_external.string().optional(),
  color: exports_external.string().optional(),
  label_alignment: ninePointAnchor.optional()
}).describe("Defines a voltage probe measurement point on a schematic trace");
expectTypesMatch(true);
var schematic_manual_edit_conflict_warning = exports_external.object({
  type: exports_external.literal("schematic_manual_edit_conflict_warning"),
  schematic_manual_edit_conflict_warning_id: getZodPrefixedIdWithDefault("schematic_manual_edit_conflict_warning"),
  warning_type: exports_external.literal("schematic_manual_edit_conflict_warning").default("schematic_manual_edit_conflict_warning"),
  message: exports_external.string(),
  schematic_component_id: exports_external.string(),
  schematic_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  source_component_id: exports_external.string()
}).describe("Warning emitted when a component has both manual placement and explicit schX/schY coordinates");
expectTypesMatch(true);
var schematic_component_overlap_warning = exports_external.object({
  type: exports_external.literal("schematic_component_overlap_warning"),
  schematic_component_overlap_warning_id: getZodPrefixedIdWithDefault("schematic_component_overlap_warning"),
  warning_type: exports_external.literal("schematic_component_overlap_warning").default("schematic_component_overlap_warning"),
  message: exports_external.string(),
  schematic_component_ids: exports_external.tuple([exports_external.string(), exports_external.string()]),
  schematic_sheet_id: exports_external.string().optional()
}).describe("Warning emitted when the rendered bounds of two schematic components overlap");
expectTypesMatch(true);
var schematic_component_styling_warning = exports_external.object({
  type: exports_external.literal("schematic_component_styling_warning"),
  schematic_component_styling_warning_id: getZodPrefixedIdWithDefault("schematic_component_styling_warning"),
  warning_type: exports_external.literal("schematic_component_styling_warning").default("schematic_component_styling_warning"),
  message: exports_external.string(),
  schematic_component_id: exports_external.string(),
  styling_issue_type: exports_external.string(),
  schematic_port_ids: exports_external.array(exports_external.string()).optional(),
  source_component_id: exports_external.string().optional(),
  schematic_sheet_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a schematic component has a visual styling issue");
expectTypesMatch(true);
var schematic_sheet_styling_warning = exports_external.object({
  type: exports_external.literal("schematic_sheet_styling_warning"),
  schematic_sheet_styling_warning_id: getZodPrefixedIdWithDefault("schematic_sheet_styling_warning"),
  warning_type: exports_external.literal("schematic_sheet_styling_warning").default("schematic_sheet_styling_warning"),
  message: exports_external.string(),
  schematic_sheet_id: exports_external.string(),
  styling_issue_type: exports_external.literal("non_default_sheet_size"),
  subcircuit_id: exports_external.string().optional()
}).describe("Style warning emitted when a schematic sheet uses a non-default size");
expectTypesMatch(true);
var schematic_element_outside_sheet_warning = exports_external.object({
  type: exports_external.literal("schematic_element_outside_sheet_warning"),
  schematic_element_outside_sheet_warning_id: getZodPrefixedIdWithDefault("schematic_element_outside_sheet_warning"),
  warning_type: exports_external.literal("schematic_element_outside_sheet_warning").default("schematic_element_outside_sheet_warning"),
  message: exports_external.string(),
  schematic_sheet_id: exports_external.string(),
  schematic_element_type: exports_external.enum([
    "schematic_component",
    "schematic_net_label",
    "schematic_trace"
  ]),
  schematic_element_id: exports_external.string()
}).describe("Warning emitted when a schematic component, net label, or trace extends outside its schematic sheet");
expectTypesMatch(true);
var positiveFiniteDistance = distance.pipe(exports_external.number().positive().finite());
var schematic_graphic = exports_external.object({
  type: exports_external.literal("schematic_graphic"),
  schematic_graphic_id: getZodPrefixedIdWithDefault("schematic_graphic"),
  schematic_sheet_id: exports_external.string().optional(),
  asset: asset.optional(),
  svg_content: exports_external.string().optional(),
  width: positiveFiniteDistance.optional(),
  height: positiveFiniteDistance.optional()
}).describe("References a graphic asset or inline SVG content with optional centered layout bounds on a schematic sheet").superRefine(({ asset: asset2, svg_content }, ctx) => {
  if (asset2 === undefined && svg_content === undefined) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "At least one of asset or svg_content is required"
    });
  }
});
expectTypesMatch(true);
var schematic_group = exports_external.object({
  type: exports_external.literal("schematic_group"),
  schematic_group_id: getZodPrefixedIdWithDefault("schematic_group"),
  schematic_sheet_id: exports_external.string().optional(),
  source_group_id: exports_external.string(),
  is_subcircuit: exports_external.boolean().optional(),
  subcircuit_id: exports_external.string().optional(),
  width: length,
  height: length,
  center: point,
  schematic_component_ids: exports_external.array(exports_external.string()),
  show_as_schematic_box: exports_external.boolean().optional(),
  name: exports_external.string().optional(),
  description: exports_external.string().optional()
}).describe("Defines a group of components on the schematic");
expectTypesMatch(true);
var schematic_table = exports_external.object({
  type: exports_external.literal("schematic_table"),
  schematic_table_id: getZodPrefixedIdWithDefault("schematic_table"),
  schematic_sheet_id: exports_external.string().optional(),
  anchor_position: point,
  column_widths: exports_external.array(distance),
  row_heights: exports_external.array(distance),
  cell_padding: distance.optional(),
  border_width: distance.optional(),
  subcircuit_id: exports_external.string().optional(),
  schematic_component_id: exports_external.string().optional(),
  anchor: ninePointAnchor.optional()
}).describe("Defines a table on the schematic");
expectTypesMatch(true);
var schematic_table_cell = exports_external.object({
  type: exports_external.literal("schematic_table_cell"),
  schematic_table_cell_id: getZodPrefixedIdWithDefault("schematic_table_cell"),
  schematic_sheet_id: exports_external.string().optional(),
  schematic_table_id: exports_external.string(),
  start_row_index: exports_external.number(),
  end_row_index: exports_external.number(),
  start_column_index: exports_external.number(),
  end_column_index: exports_external.number(),
  text: exports_external.string().optional(),
  center: point,
  width: distance,
  height: distance,
  horizontal_align: exports_external.enum(["left", "center", "right"]).optional(),
  vertical_align: exports_external.enum(["top", "middle", "bottom"]).optional(),
  font_size: distance.optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a cell within a schematic_table");
expectTypesMatch(true);
var schematic_sheet_size = exports_external.enum(["a4", "ansi_b"]);
var schematic_sheet = exports_external.object({
  type: exports_external.literal("schematic_sheet"),
  schematic_sheet_id: getZodPrefixedIdWithDefault("schematic_sheet"),
  name: exports_external.string().optional(),
  sheet_index: exports_external.number().optional(),
  sheet_size: schematic_sheet_size.optional(),
  sheet_width: exports_external.number().positive().optional(),
  sheet_height: exports_external.number().positive().optional(),
  subcircuit_id: exports_external.string().optional(),
  outline_color: exports_external.string().optional()
}).describe("Defines a schematic sheet or page that components can be placed on");
expectTypesMatch(true);
var schematic_missing_sheet_warning = exports_external.object({
  type: exports_external.literal("schematic_missing_sheet_warning"),
  schematic_missing_sheet_warning_id: getZodPrefixedIdWithDefault("schematic_missing_sheet_warning"),
  warning_type: exports_external.literal("schematic_missing_sheet_warning").default("schematic_missing_sheet_warning"),
  message: exports_external.string()
}).describe("Circuit-wide warning emitted when a schematic has no schematic sheet. Display as a banner without attaching it to a component or drawing a target outline or leader line.");
expectTypesMatch(true);
var point_with_bulge = exports_external.object({
  x: distance,
  y: distance,
  bulge: exports_external.number().optional()
});
expectTypesMatch(true);
var ring = exports_external.object({
  vertices: exports_external.array(point_with_bulge)
});
expectTypesMatch(true);
var brep_shape = exports_external.object({
  outer_ring: ring,
  inner_rings: exports_external.array(ring).default([])
});
expectTypesMatch(true);
var insertionDirectionToCanonical = {
  from_left: "from_left",
  from_right: "from_right",
  from_top: "from_top",
  from_bottom: "from_bottom",
  from_above: "from_above",
  from_below: "from_below",
  from_x_neg: "from_left",
  from_x_pos: "from_right",
  from_y_pos: "from_top",
  from_y_neg: "from_bottom",
  from_z_pos: "from_above",
  from_z_neg: "from_below",
  from_front: "from_top",
  from_back: "from_bottom"
};
var insertion_direction = exports_external.enum([
  "from_left",
  "from_right",
  "from_top",
  "from_bottom",
  "from_above",
  "from_below",
  "from_x_neg",
  "from_x_pos",
  "from_y_pos",
  "from_y_neg",
  "from_z_pos",
  "from_z_neg",
  "from_front",
  "from_back"
]).transform((value) => insertionDirectionToCanonical[value]).describe('The side exposing the receptacle where the cable or mating part is attached, following the 2D PCB diagram convention, not a 3D viewport frame. In project coordinate space, "from_top" is +Y, "from_bottom" -Y, "from_left" -X, "from_right" +X, "from_above" +Z and "from_below" -Z. A receptacle on the +Y edge is "from_top" even though the plug moves in -Y as it seats. Cartesian spellings such as "from_y_pos" are accepted and normalized to the named values, as are the deprecated "from_front" (now "from_top") and "from_back" (now "from_bottom").');
expectTypesMatch(true);
expectTypesMatch(true);
var pcb_pin1_location = exports_external.enum([
  "leftside_top",
  "leftside_bottom",
  "rightside_top",
  "rightside_bottom",
  "topside_left",
  "topside_right",
  "bottomside_left",
  "bottomside_right"
]);
expectTypesMatch(true);
var pcb_route_hint = exports_external.object({
  x: distance,
  y: distance,
  via: exports_external.boolean().optional(),
  via_to_layer: layer_ref.optional()
});
var pcb_route_hints = exports_external.array(pcb_route_hint);
expectTypesMatch(true);
expectTypesMatch(true);
var route_hint_point = exports_external.object({
  x: distance,
  y: distance,
  via: exports_external.boolean().optional(),
  to_layer: layer_ref.optional(),
  trace_width: distance.optional()
});
expectTypesMatch(true);
var manufacturing_drc_properties = exports_external.object({
  min_trace_width: length.optional(),
  min_board_edge_clearance: length.optional(),
  min_via_hole_edge_to_via_hole_edge_clearance: length.optional(),
  min_plated_hole_drill_edge_to_drill_edge_clearance: length.optional(),
  min_trace_to_pad_edge_clearance: length.optional(),
  min_trace_to_hole_edge_clearance: length.optional().describe("Minimum distance from a trace copper edge to a non-plated hole edge, in mm. No default is applied when omitted."),
  min_pad_edge_to_pad_edge_clearance: length.optional(),
  min_same_net_trace_edge_to_trace_edge_clearance: length.optional(),
  min_different_net_trace_edge_to_trace_edge_clearance: length.optional(),
  min_via_edge_to_pad_edge_clearance: length.optional(),
  min_via_hole_diameter: length.optional(),
  min_via_pad_diameter: length.optional()
});
var pcb_component = exports_external.object({
  type: exports_external.literal("pcb_component"),
  pcb_component_id: getZodPrefixedIdWithDefault("pcb_component"),
  source_component_id: exports_external.string(),
  center: point,
  layer: layer_ref,
  rotation,
  display_offset_x: exports_external.string().optional().describe("How to display the x offset for this part, usually corresponding with how the user specified it"),
  display_offset_y: exports_external.string().optional().describe("How to display the y offset for this part, usually corresponding with how the user specified it"),
  width: length,
  height: length,
  do_not_place: exports_external.boolean().optional(),
  is_allowed_to_be_off_board: exports_external.boolean().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  position_mode: exports_external.enum([
    "packed",
    "relative_to_group_anchor",
    "relative_to_another_component",
    "none"
  ]).optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.optional(),
  positioned_relative_to_pcb_group_id: exports_external.string().optional(),
  positioned_relative_to_pcb_board_id: exports_external.string().optional(),
  cable_insertion_center: point.optional(),
  insertion_direction: insertion_direction.optional(),
  pin1_location: pcb_pin1_location.optional().describe("Location of pin 1 on the unrotated, top-view component footprint"),
  supplier_pin1_location_map: exports_external.record(supplier_name, pcb_pin1_location).optional().describe("Pin 1 location for each supplier's unrotated, top-view footprint"),
  metadata: exports_external.object({
    kicad_footprint: kicadFootprintMetadata.optional()
  }).optional(),
  obstructs_within_bounds: exports_external.boolean().default(true).describe("Does this component take up all the space within its bounds on a layer. This is generally true except for when separated pin headers are being represented by a single component (in which case, chips can be placed between the pin headers) or for tall modules where chips fit underneath")
}).describe("Defines a component on the PCB");
expectTypesMatch(true);
var pcb_debug_object_base = exports_external.object({
  type: exports_external.literal("pcb_debug_object"),
  pcb_debug_object_id: getZodPrefixedIdWithDefault("pcb_debug_object"),
  label: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
});
var pcb_debug_rect = pcb_debug_object_base.extend({
  shape: exports_external.literal("rect"),
  center: point,
  size
});
var pcb_debug_line = pcb_debug_object_base.extend({
  shape: exports_external.literal("line"),
  start: point,
  end: point
});
var pcb_debug_point = pcb_debug_object_base.extend({
  shape: exports_external.literal("point"),
  center: point
});
var pcb_debug_object = exports_external.discriminatedUnion("shape", [
  pcb_debug_rect,
  pcb_debug_line,
  pcb_debug_point
]);
expectTypesMatch(true);
var pcb_hole_circle = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("circle"),
  hole_diameter: exports_external.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_circle_shape = pcb_hole_circle.describe("Defines a circular hole on the PCB");
expectTypesMatch(true);
var pcb_hole_rect = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("rect"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_rect_shape = pcb_hole_rect.describe("Defines a rectangular (square-capable) hole on the PCB. Use equal width/height for square.");
expectTypesMatch(true);
var pcb_hole_circle_or_square = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.enum(["circle", "square"]),
  hole_diameter: exports_external.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_circle_or_square_shape = pcb_hole_circle_or_square.describe("Defines a circular or square hole on the PCB");
expectTypesMatch(true);
var pcb_hole_oval = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("oval"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_oval_shape = pcb_hole_oval.describe("Defines an oval hole on the PCB");
expectTypesMatch(true);
var pcb_hole_pill = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("pill"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_pill_shape = pcb_hole_pill.describe("Defines a pill-shaped hole on the PCB");
expectTypesMatch(true);
var pcb_hole_rotated_pill = exports_external.object({
  type: exports_external.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("rotated_pill"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  x: distance,
  y: distance,
  ccw_rotation: rotation,
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_rotated_pill_shape = pcb_hole_rotated_pill.describe("Defines a rotated pill-shaped hole on the PCB");
expectTypesMatch(true);
var pcb_hole = pcb_hole_circle_or_square.or(pcb_hole_oval).or(pcb_hole_pill).or(pcb_hole_rotated_pill).or(pcb_hole_circle).or(pcb_hole_rect);
var pcb_plated_hole_circle = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.literal("circle"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  outer_diameter: exports_external.number(),
  hole_diameter: exports_external.number(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional()
});
var pcb_plated_hole_oval = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.enum(["oval", "pill"]),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  outer_width: exports_external.number(),
  outer_height: exports_external.number(),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  ccw_rotation: rotation,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional()
});
var pcb_circular_hole_with_rect_pad = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.literal("circular_hole_with_rect_pad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("circle"),
  pad_shape: exports_external.literal("rect"),
  hole_diameter: exports_external.number(),
  rect_pad_width: exports_external.number(),
  rect_pad_height: exports_external.number(),
  rect_border_radius: exports_external.number().optional(),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional(),
  rect_ccw_rotation: rotation.optional()
});
var pcb_pill_hole_with_rect_pad = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.literal("pill_hole_with_rect_pad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("pill"),
  pad_shape: exports_external.literal("rect"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  rect_pad_width: exports_external.number(),
  rect_pad_height: exports_external.number(),
  rect_border_radius: exports_external.number().optional(),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional()
});
var pcb_rotated_pill_hole_with_rect_pad = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.literal("rotated_pill_hole_with_rect_pad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  hole_shape: exports_external.literal("rotated_pill"),
  pad_shape: exports_external.literal("rect"),
  hole_width: exports_external.number(),
  hole_height: exports_external.number(),
  hole_ccw_rotation: rotation,
  rect_pad_width: exports_external.number(),
  rect_pad_height: exports_external.number(),
  rect_border_radius: exports_external.number().optional(),
  rect_ccw_rotation: rotation,
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional()
});
var pcb_hole_with_polygon_pad = exports_external.object({
  type: exports_external.literal("pcb_plated_hole"),
  shape: exports_external.literal("hole_with_polygon_pad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  hole_shape: exports_external.enum(["circle", "oval", "pill", "rotated_pill"]),
  hole_diameter: exports_external.number().optional(),
  hole_width: exports_external.number().optional(),
  hole_height: exports_external.number().optional(),
  pad_outline: exports_external.array(exports_external.object({
    x: distance,
    y: distance
  })).min(3),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: exports_external.number().optional(),
  ccw_rotation: rotation.optional()
});
var pcb_plated_hole = exports_external.union([
  pcb_plated_hole_circle,
  pcb_plated_hole_oval,
  pcb_circular_hole_with_rect_pad,
  pcb_pill_hole_with_rect_pad,
  pcb_rotated_pill_hole_with_rect_pad,
  pcb_hole_with_polygon_pad
]);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var pcb_port = exports_external.object({
  type: exports_external.literal("pcb_port"),
  pcb_port_id: getZodPrefixedIdWithDefault("pcb_port"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  source_port_id: exports_external.string(),
  pcb_component_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  layers: exports_external.array(layer_ref),
  is_board_pinout: exports_external.boolean().optional()
}).describe("Defines a port on the PCB");
expectTypesMatch(true);
var pcb_smtpad_circle = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("circle"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  radius: exports_external.number(),
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad_rect = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("rect"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  rect_border_radius: exports_external.number().optional(),
  corner_radius: exports_external.number().optional(),
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  soldermask_margin_left: exports_external.number().optional(),
  soldermask_margin_top: exports_external.number().optional(),
  soldermask_margin_right: exports_external.number().optional(),
  soldermask_margin_bottom: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad_rotated_rect = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("rotated_rect"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  rect_border_radius: exports_external.number().optional(),
  corner_radius: exports_external.number().optional(),
  ccw_rotation: rotation,
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  soldermask_margin_left: exports_external.number().optional(),
  soldermask_margin_top: exports_external.number().optional(),
  soldermask_margin_right: exports_external.number().optional(),
  soldermask_margin_bottom: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad_pill = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("pill"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  radius: exports_external.number(),
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad_rotated_pill = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("rotated_pill"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  radius: exports_external.number(),
  ccw_rotation: rotation,
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad_polygon = exports_external.object({
  type: exports_external.literal("pcb_smtpad"),
  shape: exports_external.literal("polygon"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  points: exports_external.array(point),
  layer: layer_ref,
  port_hints: exports_external.array(exports_external.string()).optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_port_id: exports_external.string().optional(),
  is_covered_with_solder_mask: exports_external.boolean().optional(),
  soldermask_margin: exports_external.number().optional(),
  solderpaste_margin: exports_external.number().optional()
});
var pcb_smtpad = exports_external.discriminatedUnion("shape", [
  pcb_smtpad_circle,
  pcb_smtpad_rect,
  pcb_smtpad_rotated_rect,
  pcb_smtpad_rotated_pill,
  pcb_smtpad_pill,
  pcb_smtpad_polygon
]).describe("Defines an SMT pad on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var pcb_solder_paste_circle = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("circle"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  radius: exports_external.number(),
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_rect = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("rect"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_pill = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("pill"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  radius: exports_external.number(),
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_rotated_rect = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("rotated_rect"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  ccw_rotation: distance,
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_rotated_pill = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("rotated_pill"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  radius: exports_external.number(),
  ccw_rotation: rotation,
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_oval = exports_external.object({
  type: exports_external.literal("pcb_solder_paste"),
  shape: exports_external.literal("oval"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  x: distance,
  y: distance,
  width: exports_external.number(),
  height: exports_external.number(),
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste_polygon = polygon_shape.extend({
  type: exports_external.literal("pcb_solder_paste"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  holes: exports_external.array(polygon_shape.shape.points).optional(),
  layer: layer_ref,
  pcb_component_id: exports_external.string().optional(),
  pcb_smtpad_id: exports_external.string().optional()
});
var pcb_solder_paste = exports_external.union([
  pcb_solder_paste_circle,
  pcb_solder_paste_rect,
  pcb_solder_paste_pill,
  pcb_solder_paste_rotated_rect,
  pcb_solder_paste_rotated_pill,
  pcb_solder_paste_oval,
  pcb_solder_paste_polygon
]).describe("Defines solderpaste on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var opening_base = exports_external.object({
  type: exports_external.literal("pcb_soldermask_opening"),
  pcb_soldermask_opening_id: getZodPrefixedIdWithDefault("pcb_soldermask_opening"),
  layer: layer_ref.pipe(visible_layer),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
});
var pcb_soldermask_opening = exports_external.discriminatedUnion("shape", [
  circle_shape.extend(opening_base.shape),
  rect_shape.extend(opening_base.shape),
  rotated_rect_shape.extend(opening_base.shape),
  polygon_shape.extend(opening_base.shape)
]).describe("An explicit opening in top or bottom solder mask or flex coverlay, independent of pads. Removes mask without adding copper or solder paste.");
expectTypesMatch(true);
var pcb_text = exports_external.object({
  type: exports_external.literal("pcb_text"),
  pcb_text_id: getZodPrefixedIdWithDefault("pcb_text"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  text: exports_external.string(),
  center: point,
  layer: layer_ref,
  width: length,
  height: length,
  lines: exports_external.number(),
  align: exports_external.enum(["bottom-left"])
}).describe("Defines text on the PCB");
expectTypesMatch(true);
var positive_width = distance.pipe(exports_external.number().finite().positive());
var pcb_trace_route_point_wire = exports_external.object({
  route_type: exports_external.literal("wire"),
  x: distance,
  y: distance,
  width: distance,
  start_width: positive_width.optional(),
  end_width: positive_width.optional(),
  width_interpolation_mode: exports_external.enum(["linear", "quadratic"]).optional(),
  copper_pour_id: exports_external.string().optional(),
  is_inside_copper_pour: exports_external.boolean().optional(),
  start_pcb_port_id: exports_external.string().optional(),
  end_pcb_port_id: exports_external.string().optional(),
  layer: layer_ref
}).superRefine((wire, ctx) => {
  const present = [
    wire.start_width,
    wire.end_width,
    wire.width_interpolation_mode
  ].filter((v) => v !== undefined).length;
  if (present === 0)
    return;
  if (present !== 3) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Wire taper requires start_width, end_width and width_interpolation_mode together"
    });
  }
  if (wire.width !== wire.start_width) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["start_width"],
      message: "start_width must equal width"
    });
  }
  if (!Number.isFinite(wire.x) || !Number.isFinite(wire.y)) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Tapered wire coordinates must be finite"
    });
  }
});
var pcb_trace_route_point_via = exports_external.object({
  route_type: exports_external.literal("via"),
  x: distance,
  y: distance,
  copper_pour_id: exports_external.string().optional(),
  is_inside_copper_pour: exports_external.boolean().optional(),
  hole_diameter: distance.optional(),
  outer_diameter: distance.optional(),
  tented_on_top: exports_external.boolean().optional(),
  tented_on_bottom: exports_external.boolean().optional(),
  from_layer: layer_ref,
  to_layer: layer_ref
});
var pcb_trace_route_point_through_pad = exports_external.object({
  route_type: exports_external.literal("through_pad"),
  start: point,
  end: point,
  width: distance,
  start_layer: layer_ref,
  end_layer: layer_ref,
  pcb_smtpad_id: exports_external.string().optional(),
  pcb_plated_hole_id: exports_external.string().optional()
});
var pcb_trace_route_point = exports_external.union([
  pcb_trace_route_point_wire,
  pcb_trace_route_point_via,
  pcb_trace_route_point_through_pad
]);
var pcb_trace = exports_external.object({
  type: exports_external.literal("pcb_trace"),
  source_trace_id: exports_external.string().optional(),
  pcb_component_id: exports_external.string().optional(),
  pcb_trace_id: getZodPrefixedIdWithDefault("pcb_trace"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  route_thickness_mode: exports_external.enum(["constant", "interpolated"]).default("constant").optional(),
  route_order_index: exports_external.number().optional(),
  should_round_corners: exports_external.boolean().optional(),
  trace_length: exports_external.number().optional(),
  is_antenna_trace: exports_external.boolean().optional(),
  highlight_color: exports_external.string().optional(),
  route: exports_external.array(pcb_trace_route_point).superRefine((route, ctx) => {
    for (const [i, wire] of route.entries()) {
      if (wire.route_type !== "wire" || wire.width_interpolation_mode === undefined)
        continue;
      const next = route[i + 1];
      const end = next?.route_type === "through_pad" ? next.start : next;
      const layer = next?.route_type === "wire" ? next.layer : next?.route_type === "via" ? next.from_layer : next?.start_layer;
      const length4 = end ? Math.hypot(end.x - wire.x, end.y - wire.y) : NaN;
      if (!Number.isFinite(length4) || length4 <= 0 || layer !== wire.layer) {
        ctx.addIssue({
          code: exports_external.ZodIssueCode.custom,
          path: [i],
          message: "Tapered wire must lead to a distinct finite next point on the same layer"
        });
      }
    }
  })
}).describe("Defines a trace on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);
var pcb_trace_warning = exports_external.object({
  type: exports_external.literal("pcb_trace_warning"),
  pcb_trace_warning_id: getZodPrefixedIdWithDefault("pcb_trace_warning"),
  warning_type: exports_external.literal("pcb_trace_warning").default("pcb_trace_warning"),
  message: exports_external.string(),
  center: point.optional(),
  pcb_trace_id: exports_external.string(),
  source_trace_id: exports_external.string(),
  pcb_component_ids: exports_external.array(exports_external.string()),
  pcb_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a trace warning on the PCB");
expectTypesMatch(true);
var pcb_trace_too_long_error = exports_external.object({
  type: exports_external.literal("pcb_trace_too_long_error"),
  pcb_trace_too_long_error_id: getZodPrefixedIdWithDefault("pcb_trace_too_long_error"),
  error_type: exports_external.literal("pcb_trace_too_long_error").default("pcb_trace_too_long_error"),
  message: exports_external.string(),
  pcb_trace_id: exports_external.string(),
  source_net_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  actual_trace_length: distance,
  maximum_trace_length: distance,
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a PCB trace is longer than its maximum allowed length");
expectTypesMatch(true);
var pcb_bus_length_skew_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_bus_length_skew_error"),
  pcb_bus_length_skew_error_id: getZodPrefixedIdWithDefault("pcb_bus_length_skew_error"),
  error_type: exports_external.literal("pcb_bus_length_skew_error").default("pcb_bus_length_skew_error"),
  source_bus_id: exports_external.string(),
  source_trace_ids: exports_external.array(exports_external.string()),
  pcb_trace_ids: exports_external.array(exports_external.string()),
  actual_length_skew: exports_external.number().nonnegative().finite(),
  maximum_length_skew: exports_external.number().nonnegative().finite(),
  subcircuit_id: exports_external.string().optional()
});
expectTypesMatch(true);
var pcb_trace_too_long_warning = exports_external.object({
  type: exports_external.literal("pcb_trace_too_long_warning"),
  pcb_trace_too_long_warning_id: getZodPrefixedIdWithDefault("pcb_trace_too_long_warning"),
  warning_type: exports_external.literal("pcb_trace_too_long_warning").default("pcb_trace_too_long_warning"),
  message: exports_external.string(),
  pcb_trace_id: exports_external.string(),
  source_net_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  actual_trace_length: distance,
  maximum_trace_length: distance,
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a PCB trace is longer than its maximum allowed length");
expectTypesMatch(true);
var pcb_trace_too_many_vias_warning = exports_external.object({
  type: exports_external.literal("pcb_trace_too_many_vias_warning"),
  pcb_trace_too_many_vias_warning_id: getZodPrefixedIdWithDefault("pcb_trace_too_many_vias_warning"),
  warning_type: exports_external.literal("pcb_trace_too_many_vias_warning").default("pcb_trace_too_many_vias_warning"),
  message: exports_external.string(),
  pcb_trace_id: exports_external.string(),
  source_net_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  actual_via_count: exports_external.number().int().nonnegative(),
  maximum_via_count: exports_external.number().int().nonnegative(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a PCB trace has more vias than its maximum allowed count");
expectTypesMatch(true);
var error_base = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_bus_routing_constraint_error"),
  pcb_bus_routing_constraint_error_id: getZodPrefixedIdWithDefault("pcb_bus_routing_constraint_error"),
  error_type: exports_external.literal("pcb_bus_routing_constraint_error").default("pcb_bus_routing_constraint_error"),
  source_bus_id: exports_external.string(),
  source_trace_ids: exports_external.array(exports_external.string()).min(1),
  pcb_trace_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
});
var pcb_bus_routing_constraint_error = exports_external.discriminatedUnion("routing_rule", [
  error_base.extend({
    routing_rule: exports_external.literal("length_skew"),
    actual_length_skew: exports_external.number().nonnegative().finite(),
    maximum_length_skew: exports_external.number().nonnegative().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("min_length"),
    actual_trace_length: exports_external.number().nonnegative().finite(),
    minimum_trace_length: exports_external.number().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("max_length"),
    actual_trace_length: exports_external.number().nonnegative().finite(),
    maximum_trace_length: exports_external.number().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("target_length"),
    actual_trace_length: exports_external.number().nonnegative().finite(),
    target_trace_length: exports_external.number().finite(),
    length_tolerance: exports_external.number().nonnegative().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("pcb_trace_spacing"),
    other_pcb_trace_id: exports_external.string(),
    other_source_trace_id: exports_external.string().optional(),
    actual_centerline_spacing: exports_external.number().nonnegative().finite(),
    minimum_centerline_spacing: exports_external.number().positive().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("pcb_spacing_to_other_signals"),
    other_pcb_trace_id: exports_external.string(),
    other_source_trace_id: exports_external.string().optional(),
    actual_centerline_spacing: exports_external.number().nonnegative().finite(),
    minimum_centerline_spacing: exports_external.number().positive().finite()
  }),
  error_base.extend({
    routing_rule: exports_external.literal("impedance_target"),
    target_impedance: exports_external.number().positive().finite(),
    minimum_impedance: exports_external.number().positive().finite().optional(),
    maximum_impedance: exports_external.number().positive().finite().optional()
  })
]).superRefine((error, ctx) => {
  if (error.routing_rule !== "impedance_target")
    return;
  if (error.minimum_impedance === undefined && error.maximum_impedance === undefined)
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["minimum_impedance"],
      message: "Provide an impedance bound"
    });
  if (error.minimum_impedance !== undefined && error.maximum_impedance !== undefined && error.minimum_impedance > error.maximum_impedance)
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["maximum_impedance"],
      message: "Impedance bounds must be ordered"
    });
}).describe("A declared bus or differential-pair routing constraint is violated.");
expectTypesMatch(true);
var warning_base = exports_external.object({
  type: exports_external.literal("pcb_bus_routing_constraint_warning"),
  pcb_bus_routing_constraint_warning_id: getZodPrefixedIdWithDefault("pcb_bus_routing_constraint_warning"),
  warning_type: exports_external.literal("pcb_bus_routing_constraint_warning").default("pcb_bus_routing_constraint_warning"),
  source_bus_id: exports_external.string(),
  source_trace_ids: exports_external.array(exports_external.string()).min(1),
  pcb_trace_ids: exports_external.array(exports_external.string()),
  message: exports_external.string(),
  subcircuit_id: exports_external.string().optional()
}).describe("A declared bus or pair constraint could not be verified; this is not a pass.");
var pcb_bus_routing_constraint_warning = exports_external.discriminatedUnion("routing_rule", [
  warning_base.extend({ routing_rule: exports_external.literal("route_geometry") }),
  warning_base.extend({ routing_rule: exports_external.literal("reference_geometry") }),
  warning_base.extend({ routing_rule: exports_external.literal("spacing_geometry") }),
  warning_base.extend({ routing_rule: exports_external.literal("target_length") }),
  warning_base.extend({ routing_rule: exports_external.literal("physical_impedance") })
]);
expectTypesMatch(true);
var pcb_trace_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_trace_error"),
  pcb_trace_error_id: getZodPrefixedIdWithDefault("pcb_trace_error"),
  error_type: exports_external.literal("pcb_trace_error").default("pcb_trace_error"),
  center: point.optional(),
  pcb_trace_id: exports_external.string(),
  source_trace_id: exports_external.string(),
  pcb_component_ids: exports_external.array(exports_external.string()),
  pcb_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a trace error on the PCB");
expectTypesMatch(true);
var pcb_trace_missing_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_trace_missing_error"),
  pcb_trace_missing_error_id: getZodPrefixedIdWithDefault("pcb_trace_missing_error"),
  error_type: exports_external.literal("pcb_trace_missing_error").default("pcb_trace_missing_error"),
  center: point.optional(),
  source_trace_id: exports_external.string(),
  pcb_component_ids: exports_external.array(exports_external.string()),
  pcb_port_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines an error when a source trace has no corresponding PCB trace");
expectTypesMatch(true);
var pcb_port_not_matched_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_port_not_matched_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: exports_external.literal("pcb_port_not_matched_error").default("pcb_port_not_matched_error"),
  pcb_component_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a trace error on the PCB where a port is not matched");
expectTypesMatch(true);
var pcb_port_not_connected_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_port_not_connected_error"),
  pcb_port_not_connected_error_id: getZodPrefixedIdWithDefault("pcb_port_not_connected_error"),
  error_type: exports_external.literal("pcb_port_not_connected_error").default("pcb_port_not_connected_error"),
  pcb_port_ids: exports_external.array(exports_external.string()),
  pcb_component_ids: exports_external.array(exports_external.string()),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines an error when a pcb port is not connected to any trace");
expectTypesMatch(true);
var pcb_net = exports_external.object({
  type: exports_external.literal("pcb_net"),
  pcb_net_id: getZodPrefixedIdWithDefault("pcb_net"),
  source_net_id: exports_external.string().optional(),
  highlight_color: exports_external.string().optional()
}).describe("Defines a net on the PCB");
expectTypesMatch(true);
var pcb_via = exports_external.object({
  type: exports_external.literal("pcb_via"),
  pcb_via_id: getZodPrefixedIdWithDefault("pcb_via"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional(),
  x: distance,
  y: distance,
  outer_diameter: distance.default("0.6mm"),
  hole_diameter: distance.default("0.25mm"),
  topmost_drill_layer: layer_ref.optional(),
  bottommost_drill_layer: layer_ref.optional(),
  through_hole: exports_external.boolean().optional(),
  from_layer: layer_ref.optional(),
  to_layer: layer_ref.optional(),
  layers: exports_external.array(layer_ref),
  pcb_port_ids: exports_external.array(exports_external.string()).optional(),
  pcb_trace_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  source_net_id: exports_external.string().min(1).optional(),
  net_is_assignable: exports_external.boolean().optional(),
  net_assigned: exports_external.boolean().optional(),
  is_tented: exports_external.boolean().optional(),
  tented_on_top: exports_external.boolean().optional(),
  tented_on_bottom: exports_external.boolean().optional()
}).transform(({ is_tented, ...via }) => {
  if (is_tented !== undefined) {
    via.tented_on_top ??= is_tented;
    via.tented_on_bottom ??= is_tented;
  }
  return via;
}).describe("Defines a via on the PCB");
expectTypesMatch(true);
var pcb_board = exports_external.object({
  type: exports_external.literal("pcb_board"),
  pcb_board_id: getZodPrefixedIdWithDefault("pcb_board"),
  pcb_panel_id: exports_external.string().optional(),
  carrier_pcb_board_id: exports_external.string().optional(),
  is_subcircuit: exports_external.boolean().optional(),
  subcircuit_id: exports_external.string().optional(),
  is_mounted_to_carrier_board: exports_external.boolean().optional(),
  is_via_in_pad_allowed: exports_external.boolean().optional(),
  default_via_tented_on_top: exports_external.boolean().optional(),
  default_via_tented_on_bottom: exports_external.boolean().optional(),
  default_via_plugged: exports_external.boolean().optional(),
  width: length.optional(),
  height: length.optional(),
  center: point,
  display_offset_x: exports_external.string().optional().describe("How to display the x offset for this board, usually corresponding with how the user specified it"),
  display_offset_y: exports_external.string().optional().describe("How to display the y offset for this board, usually corresponding with how the user specified it"),
  thickness: length.optional().default(1.4),
  num_layers: exports_external.number().optional().default(4),
  allow_blind_and_buried_vias: exports_external.boolean().optional().describe("Whether autorouters may generate blind and buried vias. False restricts newly generated vias to the full board stack."),
  outline: exports_external.array(point).optional(),
  shape: exports_external.enum(["rect", "polygon"]).optional(),
  material: exports_external.enum(["fr4", "fr1", "flex"]).default("fr4"),
  solder_mask_color: exports_external.string().optional(),
  silkscreen_color: exports_external.string().optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.optional(),
  position_mode: exports_external.enum(["relative_to_panel_anchor", "none"]).optional()
}).merge(manufacturing_drc_properties).describe("Defines the board outline of the PCB");
expectTypesMatch(true);
var finite_point = point.extend({
  x: length.pipe(exports_external.number().finite()),
  y: length.pipe(exports_external.number().finite())
});
var pcb_bend = exports_external.object({
  type: exports_external.literal("pcb_bend"),
  pcb_bend_id: getZodPrefixedIdWithDefault("pcb_bend"),
  pcb_board_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  start: finite_point,
  end: finite_point,
  bend_angle: rotation.pipe(exports_external.number().finite()),
  bend_radius: length.pipe(exports_external.number().finite().positive()),
  bend_side: exports_external.enum(["left", "right"])
}).refine(({ start, end }) => start.x !== end.x || start.y !== end.y, {
  message: "Bend centerline endpoints must be distinct",
  path: ["end"]
}).describe("Defines a finite-radius bend on a flat PCB for runtime CAD folding");
expectTypesMatch(true);
var positive_length = length.pipe(exports_external.number().finite().positive());
var finite_point2 = point.extend({
  x: length.pipe(exports_external.number().finite()),
  y: length.pipe(exports_external.number().finite())
});
var pcb_stiffener_base = exports_external.object({
  type: exports_external.literal("pcb_stiffener"),
  pcb_stiffener_id: getZodPrefixedIdWithDefault("pcb_stiffener"),
  pcb_board_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  layer: exports_external.enum(["top", "bottom"]),
  material: exports_external.enum(["fr4", "polyimide", "stainless_steel", "aluminum"]),
  thickness: positive_length,
  adhesive_thickness: length.pipe(exports_external.number().finite().nonnegative()).optional()
});
var pcb_stiffener_rect = pcb_stiffener_base.extend({
  shape: exports_external.literal("rect"),
  center: finite_point2,
  rotation: rotation.pipe(exports_external.number().finite()).optional(),
  width: positive_length,
  height: positive_length,
  outline: exports_external.never().optional()
});
expectTypesMatch(true);
var pcb_stiffener_polygon = pcb_stiffener_base.extend({
  shape: exports_external.literal("polygon"),
  outline: exports_external.array(finite_point2).min(3).refine((points) => {
    const twice_area = points.reduce((sum, p, i) => {
      const next = points[(i + 1) % points.length];
      return sum + p.x * next.y - next.x * p.y;
    }, 0);
    return Number.isFinite(twice_area) && twice_area !== 0;
  }, "Stiffener outline must enclose a nonzero area"),
  center: exports_external.never().optional(),
  rotation: exports_external.never().optional(),
  width: exports_external.never().optional(),
  height: exports_external.never().optional()
});
expectTypesMatch(true);
var pcb_stiffener = exports_external.discriminatedUnion("shape", [pcb_stiffener_rect, pcb_stiffener_polygon]).describe("Defines bonded mechanical PCB reinforcement without adding copper layers");
expectTypesMatch(true);
var pcb_panel = exports_external.object({
  type: exports_external.literal("pcb_panel"),
  pcb_panel_id: getZodPrefixedIdWithDefault("pcb_panel"),
  width: length,
  height: length,
  center: point,
  thickness: length.optional().default(1.4),
  covered_with_solder_mask: exports_external.boolean().optional().default(true)
}).describe("Defines a PCB panel that can contain multiple boards");
expectTypesMatch(true);
var pcb_placement_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_placement_error"),
  pcb_placement_error_id: getZodPrefixedIdWithDefault("pcb_placement_error"),
  error_type: exports_external.literal("pcb_placement_error").default("pcb_placement_error"),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a placement error on the PCB");
expectTypesMatch(true);
var pcb_packing_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_packing_error"),
  pcb_packing_error_id: getZodPrefixedIdWithDefault("pcb_packing_error"),
  error_type: exports_external.literal("pcb_packing_error").default("pcb_packing_error"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a failure to pack PCB components within layout bounds");
expectTypesMatch(true);
var pcb_panelization_placement_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_panelization_placement_error"),
  pcb_panelization_placement_error_id: getZodPrefixedIdWithDefault("pcb_panelization_placement_error"),
  error_type: exports_external.literal("pcb_panelization_placement_error").default("pcb_panelization_placement_error"),
  pcb_panel_id: exports_external.string().optional(),
  pcb_board_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a panelization placement error on the PCB");
expectTypesMatch(true);
var pcb_trace_hint = exports_external.object({
  type: exports_external.literal("pcb_trace_hint"),
  pcb_trace_hint_id: getZodPrefixedIdWithDefault("pcb_trace_hint"),
  pcb_port_id: exports_external.string(),
  pcb_component_id: exports_external.string(),
  route: exports_external.array(route_hint_point),
  subcircuit_id: exports_external.string().optional()
}).describe("A hint that can be used during generation of a PCB trace");
expectTypesMatch(true);
var pcb_silkscreen_line = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_line"),
  pcb_silkscreen_line_id: getZodPrefixedIdWithDefault("pcb_silkscreen_line"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  stroke_width: distance.default("0.1mm"),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  layer: visible_layer
}).describe("Defines a silkscreen line on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_path = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_path"),
  pcb_silkscreen_path_id: getZodPrefixedIdWithDefault("pcb_silkscreen_path"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: visible_layer,
  route: exports_external.array(point),
  stroke_width: length
}).describe("Defines a silkscreen path on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_text = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_text"),
  pcb_silkscreen_text_id: getZodPrefixedIdWithDefault("pcb_silkscreen_text"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("0.2mm"),
  pcb_component_id: exports_external.string(),
  text: exports_external.string(),
  is_knockout: exports_external.boolean().default(false).optional(),
  knockout_padding: exports_external.object({
    left: length,
    top: length,
    bottom: length,
    right: length
  }).default({
    left: "0.2mm",
    top: "0.2mm",
    bottom: "0.2mm",
    right: "0.2mm"
  }).optional(),
  ccw_rotation: exports_external.number().optional(),
  layer: layer_ref,
  is_mirrored: exports_external.boolean().default(false).optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: ninePointAnchor.default("center")
}).describe("Defines silkscreen text on the PCB");
expectTypesMatch(true);
var pcb_copper_text = exports_external.object({
  type: exports_external.literal("pcb_copper_text"),
  pcb_copper_text_id: getZodPrefixedIdWithDefault("pcb_copper_text"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("0.2mm"),
  pcb_component_id: exports_external.string(),
  text: exports_external.string(),
  is_knockout: exports_external.boolean().default(false).optional(),
  knockout_padding: exports_external.object({
    left: length,
    top: length,
    bottom: length,
    right: length
  }).default({
    left: "0.2mm",
    top: "0.2mm",
    bottom: "0.2mm",
    right: "0.2mm"
  }).optional(),
  ccw_rotation: exports_external.number().optional(),
  layer: layer_ref,
  is_mirrored: exports_external.boolean().default(false).optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: ninePointAnchor.default("center")
}).describe("Defines copper text on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_rect = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_rect"),
  pcb_silkscreen_rect_id: getZodPrefixedIdWithDefault("pcb_silkscreen_rect"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: layer_ref,
  stroke_width: length.default("1mm"),
  corner_radius: length.optional(),
  is_filled: exports_external.boolean().default(true).optional(),
  has_stroke: exports_external.boolean().optional(),
  is_stroke_dashed: exports_external.boolean().optional(),
  ccw_rotation: exports_external.number().optional()
}).describe("Defines a silkscreen rect on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_circle = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_circle"),
  pcb_silkscreen_circle_id: getZodPrefixedIdWithDefault("pcb_silkscreen_circle"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  radius: length,
  layer: visible_layer,
  stroke_width: length.default("1mm"),
  is_filled: exports_external.boolean().optional()
}).describe("Defines a silkscreen circle on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_oval = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_oval"),
  pcb_silkscreen_oval_id: getZodPrefixedIdWithDefault("pcb_silkscreen_oval"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  radius_x: distance,
  radius_y: distance,
  layer: visible_layer,
  ccw_rotation: rotation.optional()
}).describe("Defines a silkscreen oval on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_graphic_base = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_graphic"),
  pcb_silkscreen_graphic_id: getZodPrefixedIdWithDefault("pcb_silkscreen_graphic"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: visible_layer,
  image_asset: asset.optional()
});
var pcb_silkscreen_graphic_brep = pcb_silkscreen_graphic_base.extend({
  shape: exports_external.literal("brep"),
  brep_shape
}).describe("Defines a BRep silkscreen graphic on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_graphic = exports_external.discriminatedUnion("shape", [pcb_silkscreen_graphic_brep]).describe("Defines a silkscreen graphic on the PCB");
expectTypesMatch(true);
var pcb_silkscreen_pill = exports_external.object({
  type: exports_external.literal("pcb_silkscreen_pill"),
  pcb_silkscreen_pill_id: getZodPrefixedIdWithDefault("pcb_silkscreen_pill"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: layer_ref,
  ccw_rotation: exports_external.number().optional()
}).describe("Defines a silkscreen pill on the PCB");
expectTypesMatch(true);
var pcb_fabrication_note_text = exports_external.object({
  type: exports_external.literal("pcb_fabrication_note_text"),
  pcb_fabrication_note_text_id: getZodPrefixedIdWithDefault("pcb_fabrication_note_text"),
  subcircuit_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("1mm"),
  pcb_component_id: exports_external.string(),
  text: exports_external.string(),
  ccw_rotation: exports_external.number().optional(),
  layer: visible_layer,
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: exports_external.enum(["center", "top_left", "top_right", "bottom_left", "bottom_right"]).default("center"),
  color: exports_external.string().optional()
}).describe("Defines a fabrication note in text on the PCB, useful for leaving notes for assemblers or fabricators");
expectTypesMatch(true);
var pcb_fabrication_note_path = exports_external.object({
  type: exports_external.literal("pcb_fabrication_note_path"),
  pcb_fabrication_note_path_id: getZodPrefixedIdWithDefault("pcb_fabrication_note_path"),
  pcb_component_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  layer: layer_ref,
  route: exports_external.array(point),
  stroke_width: length,
  color: exports_external.string().optional(),
  is_filled: exports_external.boolean().optional(),
  has_stroke: exports_external.boolean().optional()
}).describe("Defines a fabrication path on the PCB for fabricators or assemblers");
expectTypesMatch(true);
var pcb_fabrication_note_rect = exports_external.object({
  type: exports_external.literal("pcb_fabrication_note_rect"),
  pcb_fabrication_note_rect_id: getZodPrefixedIdWithDefault("pcb_fabrication_note_rect"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer,
  stroke_width: length.default("0.1mm"),
  corner_radius: length.optional(),
  is_filled: exports_external.boolean().optional(),
  has_stroke: exports_external.boolean().optional(),
  is_stroke_dashed: exports_external.boolean().optional(),
  color: exports_external.string().optional()
}).describe("Defines a fabrication note rectangle on the PCB");
expectTypesMatch(true);
var pcb_fabrication_note_dimension = exports_external.object({
  type: exports_external.literal("pcb_fabrication_note_dimension"),
  pcb_fabrication_note_dimension_id: getZodPrefixedIdWithDefault("pcb_fabrication_note_dimension"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: visible_layer,
  from: point,
  to: point,
  text: exports_external.string().optional(),
  text_ccw_rotation: exports_external.number().optional(),
  offset: length.optional(),
  offset_distance: length.optional(),
  offset_direction: exports_external.object({
    x: exports_external.number(),
    y: exports_external.number()
  }).optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: length.default("1mm"),
  color: exports_external.string().optional(),
  arrow_size: length.default("1mm")
}).describe("Defines a measurement annotation within PCB fabrication notes");
expectTypesMatch(true);
var pcb_note_text = exports_external.object({
  type: exports_external.literal("pcb_note_text"),
  pcb_note_text_id: getZodPrefixedIdWithDefault("pcb_note_text"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("1mm"),
  text: exports_external.string().optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: exports_external.enum(["center", "top_left", "top_right", "bottom_left", "bottom_right"]).default("center"),
  layer: visible_layer.default("top"),
  is_mirrored_from_top_view: exports_external.boolean().optional(),
  color: exports_external.string().optional()
}).describe("Defines a documentation note in text on the PCB");
expectTypesMatch(true);
var pcb_note_rect = exports_external.object({
  type: exports_external.literal("pcb_note_rect"),
  pcb_note_rect_id: getZodPrefixedIdWithDefault("pcb_note_rect"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  text: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer.default("top"),
  stroke_width: length.default("0.1mm"),
  corner_radius: length.optional(),
  is_filled: exports_external.boolean().optional(),
  has_stroke: exports_external.boolean().optional(),
  is_stroke_dashed: exports_external.boolean().optional(),
  color: exports_external.string().optional()
}).describe("Defines a rectangular documentation note on the PCB");
expectTypesMatch(true);
var pcb_note_path = exports_external.object({
  type: exports_external.literal("pcb_note_path"),
  pcb_note_path_id: getZodPrefixedIdWithDefault("pcb_note_path"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  text: exports_external.string().optional(),
  route: exports_external.array(point),
  layer: visible_layer.default("top"),
  stroke_width: length.default("0.1mm"),
  color: exports_external.string().optional()
}).describe("Defines a polyline documentation note on the PCB");
expectTypesMatch(true);
var pcb_note_line = exports_external.object({
  type: exports_external.literal("pcb_note_line"),
  pcb_note_line_id: getZodPrefixedIdWithDefault("pcb_note_line"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  text: exports_external.string().optional(),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  layer: visible_layer.default("top"),
  stroke_width: distance.default("0.1mm"),
  color: exports_external.string().optional(),
  is_dashed: exports_external.boolean().optional()
}).describe("Defines a straight documentation note line on the PCB");
expectTypesMatch(true);
var pcb_note_dimension = exports_external.object({
  type: exports_external.literal("pcb_note_dimension"),
  pcb_note_dimension_id: getZodPrefixedIdWithDefault("pcb_note_dimension"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  from: point,
  to: point,
  text: exports_external.string().optional(),
  text_ccw_rotation: exports_external.number().optional(),
  offset_distance: length.optional(),
  offset_direction: exports_external.object({
    x: exports_external.number(),
    y: exports_external.number()
  }).optional(),
  font: exports_external.literal("tscircuit2024").default("tscircuit2024"),
  font_size: length.default("1mm"),
  layer: visible_layer.default("top"),
  color: exports_external.string().optional(),
  arrow_size: length.default("1mm")
}).describe("Defines a measurement annotation within PCB documentation notes");
expectTypesMatch(true);
var pcb_footprint_overlap_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_footprint_overlap_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: exports_external.literal("pcb_footprint_overlap_error").default("pcb_footprint_overlap_error"),
  pcb_smtpad_ids: exports_external.array(exports_external.string()).optional(),
  pcb_plated_hole_ids: exports_external.array(exports_external.string()).optional(),
  pcb_hole_ids: exports_external.array(exports_external.string()).optional(),
  pcb_keepout_ids: exports_external.array(exports_external.string()).optional()
}).describe("Error emitted when a pcb footprint overlaps with another element");
expectTypesMatch(true);
var pcb_courtyard_overlap_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_courtyard_overlap_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: exports_external.literal("pcb_courtyard_overlap_error").default("pcb_courtyard_overlap_error"),
  pcb_component_ids: exports_external.tuple([exports_external.string(), exports_external.string()])
}).describe("Error emitted when the courtyard (CrtYd) of one PCB component overlaps with the courtyard of another");
expectTypesMatch(true);
var pcb_keepout_outline = exports_external.object({
  type: exports_external.literal("pcb_keepout"),
  shape: exports_external.literal("outline"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  outline: exports_external.array(point).min(2),
  stroke_width: length,
  pcb_keepout_id: exports_external.string(),
  layers: exports_external.array(exports_external.string()),
  description: exports_external.string().optional(),
  excluded_pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  warning_only: exports_external.boolean().optional(),
  allow_traces: exports_external.boolean().optional(),
  allow_placements: exports_external.boolean().optional()
});
var pcb_keepout = exports_external.object({
  type: exports_external.literal("pcb_keepout"),
  shape: exports_external.literal("rect"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: distance,
  height: distance,
  pcb_keepout_id: exports_external.string(),
  layers: exports_external.array(exports_external.string()),
  description: exports_external.string().optional(),
  excluded_pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  warning_only: exports_external.boolean().optional(),
  allow_traces: exports_external.boolean().optional(),
  allow_placements: exports_external.boolean().optional()
}).or(exports_external.object({
  type: exports_external.literal("pcb_keepout"),
  shape: exports_external.literal("circle"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  radius: distance,
  pcb_keepout_id: exports_external.string(),
  layers: exports_external.array(exports_external.string()),
  description: exports_external.string().optional(),
  excluded_pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  warning_only: exports_external.boolean().optional(),
  allow_traces: exports_external.boolean().optional(),
  allow_placements: exports_external.boolean().optional()
})).or(pcb_keepout_outline);
expectTypesMatch(true);
expectTypesMatch(true);
var pcb_keepout_overlap_warning = exports_external.object({
  type: exports_external.literal("pcb_keepout_overlap_warning"),
  pcb_keepout_overlap_warning_id: getZodPrefixedIdWithDefault("pcb_keepout_overlap_warning"),
  warning_type: exports_external.literal("pcb_keepout_overlap_warning").default("pcb_keepout_overlap_warning"),
  message: exports_external.string(),
  pcb_keepout_id: exports_external.string(),
  pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  pcb_trace_ids: exports_external.array(exports_external.string()).optional(),
  pcb_smtpad_ids: exports_external.array(exports_external.string()).optional(),
  pcb_plated_hole_ids: exports_external.array(exports_external.string()).optional(),
  pcb_via_ids: exports_external.array(exports_external.string()).optional(),
  center: point.optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when copper overlaps a PCB keepout with warning_only enabled");
expectTypesMatch(true);
var pcb_cutout_base = exports_external.object({
  type: exports_external.literal("pcb_cutout"),
  pcb_cutout_id: getZodPrefixedIdWithDefault("pcb_cutout"),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  pcb_board_id: exports_external.string().optional(),
  pcb_panel_id: exports_external.string().optional()
});
var pcb_cutout_rect = pcb_cutout_base.extend({
  shape: exports_external.literal("rect"),
  center: point,
  width: length,
  height: length,
  rotation: rotation.optional(),
  corner_radius: length.optional()
});
expectTypesMatch(true);
var pcb_cutout_circle = pcb_cutout_base.extend({
  shape: exports_external.literal("circle"),
  center: point,
  radius: length
});
expectTypesMatch(true);
var pcb_cutout_polygon = pcb_cutout_base.extend({
  shape: exports_external.literal("polygon"),
  points: exports_external.array(point)
});
expectTypesMatch(true);
var pcb_cutout_path = pcb_cutout_base.extend({
  shape: exports_external.literal("path"),
  route: exports_external.array(point),
  slot_width: length,
  slot_length: length.optional(),
  space_between_slots: length.optional(),
  slot_corner_radius: length.optional()
});
expectTypesMatch(true);
var pcb_cutout = exports_external.discriminatedUnion("shape", [
  pcb_cutout_rect,
  pcb_cutout_circle,
  pcb_cutout_polygon,
  pcb_cutout_path
]).describe("Defines a cutout on the PCB, removing board material.");
expectTypesMatch(true);
var pcb_missing_footprint_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_missing_footprint_error"),
  pcb_missing_footprint_error_id: getZodPrefixedIdWithDefault("pcb_missing_footprint_error"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  error_type: exports_external.literal("pcb_missing_footprint_error").default("pcb_missing_footprint_error"),
  source_component_id: exports_external.string()
}).describe("Defines a missing footprint error on the PCB");
expectTypesMatch(true);
var external_footprint_load_error = base_circuit_json_error.extend({
  type: exports_external.literal("external_footprint_load_error"),
  external_footprint_load_error_id: getZodPrefixedIdWithDefault("external_footprint_load_error"),
  pcb_component_id: exports_external.string(),
  source_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  footprinter_string: exports_external.string().optional(),
  error_type: exports_external.literal("external_footprint_load_error").default("external_footprint_load_error")
}).describe("Defines an error when an external footprint fails to load");
expectTypesMatch(true);
var circuit_json_footprint_load_error = base_circuit_json_error.extend({
  type: exports_external.literal("circuit_json_footprint_load_error"),
  circuit_json_footprint_load_error_id: getZodPrefixedIdWithDefault("circuit_json_footprint_load_error"),
  pcb_component_id: exports_external.string(),
  source_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  error_type: exports_external.literal("circuit_json_footprint_load_error").default("circuit_json_footprint_load_error"),
  circuit_json: exports_external.array(exports_external.any()).optional()
}).describe("Defines an error when a circuit JSON footprint fails to load");
expectTypesMatch(true);
var pcb_group = exports_external.object({
  type: exports_external.literal("pcb_group"),
  pcb_group_id: getZodPrefixedIdWithDefault("pcb_group"),
  source_group_id: exports_external.string(),
  is_subcircuit: exports_external.boolean().optional(),
  subcircuit_id: exports_external.string().optional(),
  width: length.optional(),
  height: length.optional(),
  center: point,
  display_offset_x: exports_external.string().optional().describe("How to display the x offset for this group, usually corresponding with how the user specified it"),
  display_offset_y: exports_external.string().optional().describe("How to display the y offset for this group, usually corresponding with how the user specified it"),
  outline: exports_external.array(point).optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.default("center"),
  position_mode: exports_external.enum(["packed", "relative_to_group_anchor", "none"]).optional(),
  positioned_relative_to_pcb_group_id: exports_external.string().optional(),
  positioned_relative_to_pcb_board_id: exports_external.string().optional(),
  pcb_component_ids: exports_external.array(exports_external.string()),
  child_layout_mode: exports_external.enum(["packed", "none"]).optional(),
  name: exports_external.string().optional(),
  description: exports_external.string().optional(),
  layout_mode: exports_external.string().optional(),
  autorouter_configuration: exports_external.object({
    trace_clearance: length
  }).optional(),
  autorouter_used_string: exports_external.string().optional()
}).describe("Defines a group of components on the PCB");
expectTypesMatch(true);
var pcb_autorouting_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_autorouting_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_autorouting_error"),
  error_type: exports_external.literal("pcb_autorouting_error").default("pcb_autorouting_error"),
  subcircuit_id: exports_external.string().optional()
}).describe("The autorouting has failed to route a portion of the board");
expectTypesMatch(true);
var pcb_preflight_routing_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_preflight_routing_error"),
  pcb_preflight_routing_error_id: getZodPrefixedIdWithDefault("pcb_preflight_routing_error"),
  error_type: exports_external.literal("pcb_preflight_routing_error").default("pcb_preflight_routing_error"),
  error_code: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  routing_phase_index: exports_external.number().int().optional(),
  phase_name: exports_external.string().optional(),
  source_trace_ids: exports_external.array(exports_external.string()).optional(),
  pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  pcb_port_ids: exports_external.array(exports_external.string()).optional(),
  related_error_ids: exports_external.array(exports_external.string()).optional(),
  measurements: exports_external.record(exports_external.number().finite()).optional()
});
expectTypesMatch(true);
var pcb_manual_edit_conflict_warning = exports_external.object({
  type: exports_external.literal("pcb_manual_edit_conflict_warning"),
  pcb_manual_edit_conflict_warning_id: getZodPrefixedIdWithDefault("pcb_manual_edit_conflict_warning"),
  warning_type: exports_external.literal("pcb_manual_edit_conflict_warning").default("pcb_manual_edit_conflict_warning"),
  message: exports_external.string(),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  source_component_id: exports_external.string()
}).describe("Warning emitted when a component has both manual placement and explicit pcbX/pcbY coordinates");
expectTypesMatch(true);
var connectorOrientationDirection = exports_external.enum(["x-", "x+", "y+", "y-"]);
var pcb_connector_not_in_accessible_orientation_warning = exports_external.object({
  type: exports_external.literal("pcb_connector_not_in_accessible_orientation_warning"),
  pcb_connector_not_in_accessible_orientation_warning_id: getZodPrefixedIdWithDefault("pcb_connector_not_in_accessible_orientation_warning"),
  warning_type: exports_external.literal("pcb_connector_not_in_accessible_orientation_warning").default("pcb_connector_not_in_accessible_orientation_warning"),
  message: exports_external.string(),
  pcb_component_id: exports_external.string(),
  source_component_id: exports_external.string().optional(),
  pcb_board_id: exports_external.string().optional(),
  facing_direction: connectorOrientationDirection,
  recommended_facing_direction: connectorOrientationDirection,
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a connector PCB component is facing inward toward the board and should be reoriented to an outward-facing direction");
expectTypesMatch(true);
var pcb_component_missing_courtyard_warning = exports_external.object({
  type: exports_external.literal("pcb_component_missing_courtyard_warning"),
  pcb_component_missing_courtyard_warning_id: getZodPrefixedIdWithDefault("pcb_component_missing_courtyard_warning"),
  warning_type: exports_external.literal("pcb_component_missing_courtyard_warning").default("pcb_component_missing_courtyard_warning"),
  message: exports_external.string(),
  pcb_component_id: exports_external.string(),
  source_component_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning emitted when a PCB component has no courtyard geometry");
expectTypesMatch(true);
var supplier_footprint_mismatch_warning = exports_external.object({
  type: exports_external.literal("supplier_footprint_mismatch_warning"),
  supplier_footprint_mismatch_warning_id: getZodPrefixedIdWithDefault("supplier_footprint_mismatch_warning"),
  warning_type: exports_external.literal("supplier_footprint_mismatch_warning").default("supplier_footprint_mismatch_warning"),
  message: exports_external.string(),
  source_component_id: exports_external.string(),
  pcb_component_id: exports_external.string().optional(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  supplier_name: supplier_name.optional(),
  supplier_part_number: exports_external.string().optional(),
  supplier_footprint_url: exports_external.string().optional(),
  footprint_copper_intersection_over_union: exports_external.number()
}).describe("Warning emitted when a supplier part footprint does not match the expected footprint");
expectTypesMatch(true);
var pcb_fabricator_extra_charge_warning = exports_external.object({
  type: exports_external.literal("pcb_fabricator_extra_charge_warning"),
  pcb_fabricator_extra_charge_warning_id: getZodPrefixedIdWithDefault("pcb_fabricator_extra_charge_warning"),
  warning_type: exports_external.literal("pcb_fabricator_extra_charge_warning").default("pcb_fabricator_extra_charge_warning"),
  message: exports_external.string(),
  fabricator_preset: exports_external.string(),
  pcb_board_id: exports_external.string().optional(),
  pcb_via_ids: exports_external.array(exports_external.string()).optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Warning that a design feature incurs an extra charge for the selected fabricator preset, such as via hole diameters below 0.3 mm with JLCPCB economy or standard presets.");
expectTypesMatch(true);
var pcb_breakout_point = exports_external.object({
  type: exports_external.literal("pcb_breakout_point"),
  pcb_breakout_point_id: getZodPrefixedIdWithDefault("pcb_breakout_point"),
  pcb_group_id: exports_external.string(),
  subcircuit_id: exports_external.string().optional(),
  source_trace_id: exports_external.string().optional(),
  source_port_id: exports_external.string().optional(),
  source_net_id: exports_external.string().optional(),
  layer: layer_ref.optional(),
  x: distance,
  y: distance
}).describe("Defines a routing target within a pcb_group for a source_trace or source_net");
expectTypesMatch(true);
var pcb_ground_plane = exports_external.object({
  type: exports_external.literal("pcb_ground_plane"),
  pcb_ground_plane_id: getZodPrefixedIdWithDefault("pcb_ground_plane"),
  source_pcb_ground_plane_id: exports_external.string(),
  source_net_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Defines a ground plane on the PCB");
expectTypesMatch(true);
var pcb_ground_plane_region = exports_external.object({
  type: exports_external.literal("pcb_ground_plane_region"),
  pcb_ground_plane_region_id: getZodPrefixedIdWithDefault("pcb_ground_plane_region"),
  pcb_ground_plane_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: layer_ref,
  points: exports_external.array(point)
}).describe("Defines a polygon region of a ground plane");
expectTypesMatch(true);
var pcb_thermal_spoke = exports_external.object({
  type: exports_external.literal("pcb_thermal_spoke"),
  pcb_thermal_spoke_id: getZodPrefixedIdWithDefault("pcb_thermal_spoke"),
  pcb_ground_plane_id: exports_external.string(),
  shape: exports_external.string(),
  spoke_count: exports_external.number(),
  spoke_thickness: distance,
  spoke_inner_diameter: distance,
  spoke_outer_diameter: distance,
  pcb_plated_hole_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Pattern for connecting a ground plane to a plated hole");
expectTypesMatch(true);
var pcb_copper_pour_base = exports_external.object({
  type: exports_external.literal("pcb_copper_pour"),
  pcb_copper_pour_id: getZodPrefixedIdWithDefault("pcb_copper_pour"),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: layer_ref,
  source_net_id: exports_external.string().optional(),
  covered_with_solder_mask: exports_external.boolean().optional().default(true)
});
var pcb_copper_pour_rect = pcb_copper_pour_base.extend({
  shape: exports_external.literal("rect"),
  center: point,
  width: length,
  height: length,
  rotation: rotation.optional()
});
expectTypesMatch(true);
var pcb_copper_pour_brep = pcb_copper_pour_base.extend({
  shape: exports_external.literal("brep"),
  brep_shape
});
expectTypesMatch(true);
var pcb_copper_pour_polygon = pcb_copper_pour_base.extend({
  shape: exports_external.literal("polygon"),
  points: exports_external.array(point)
});
expectTypesMatch(true);
var pcb_copper_pour = exports_external.discriminatedUnion("shape", [
  pcb_copper_pour_rect,
  pcb_copper_pour_brep,
  pcb_copper_pour_polygon
]).describe("Defines a copper pour on the PCB.");
expectTypesMatch(true);
var pcb_component_outside_board_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_component_outside_board_error"),
  pcb_component_outside_board_error_id: getZodPrefixedIdWithDefault("pcb_component_outside_board_error"),
  error_type: exports_external.literal("pcb_component_outside_board_error").default("pcb_component_outside_board_error"),
  pcb_component_id: exports_external.string(),
  pcb_board_id: exports_external.string(),
  component_center: point,
  component_bounds: exports_external.object({
    min_x: exports_external.number(),
    max_x: exports_external.number(),
    min_y: exports_external.number(),
    max_y: exports_external.number()
  }),
  subcircuit_id: exports_external.string().optional(),
  source_component_id: exports_external.string().optional()
}).describe("Error emitted when a PCB component is placed outside the board boundaries");
expectTypesMatch(true);
var pcb_component_not_on_board_edge_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_component_not_on_board_edge_error"),
  pcb_component_not_on_board_edge_error_id: getZodPrefixedIdWithDefault("pcb_component_not_on_board_edge_error"),
  error_type: exports_external.literal("pcb_component_not_on_board_edge_error").default("pcb_component_not_on_board_edge_error"),
  pcb_component_id: exports_external.string(),
  pcb_board_id: exports_external.string(),
  component_center: point,
  pad_to_nearest_board_edge_distance: exports_external.number(),
  source_component_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a component that must be placed on the board edge is centered away from the edge");
expectTypesMatch(true);
var pcb_component_invalid_layer_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_component_invalid_layer_error"),
  pcb_component_invalid_layer_error_id: getZodPrefixedIdWithDefault("pcb_component_invalid_layer_error"),
  error_type: exports_external.literal("pcb_component_invalid_layer_error").default("pcb_component_invalid_layer_error"),
  pcb_component_id: exports_external.string().optional(),
  source_component_id: exports_external.string(),
  layer: layer_ref,
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a component is placed on an invalid layer (components can only be on 'top' or 'bottom' layers)");
expectTypesMatch(true);
var pcb_via_clearance_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_via_clearance_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: exports_external.literal("pcb_via_clearance_error").default("pcb_via_clearance_error"),
  pcb_via_ids: exports_external.array(exports_external.string()).min(2),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  pcb_center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when vias are closer than the allowed clearance");
expectTypesMatch(true);
var pcb_via_trace_clearance_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_via_trace_clearance_error"),
  pcb_via_trace_clearance_error_id: getZodPrefixedIdWithDefault("pcb_via_trace_clearance_error"),
  error_type: exports_external.literal("pcb_via_trace_clearance_error").default("pcb_via_trace_clearance_error"),
  pcb_via_id: exports_external.string(),
  pcb_trace_id: exports_external.string(),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a via and trace are closer than the allowed clearance");
expectTypesMatch(true);
var pcb_pad_pad_clearance_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_pad_pad_clearance_error"),
  pcb_pad_pad_clearance_error_id: getZodPrefixedIdWithDefault("pcb_pad_pad_clearance_error"),
  error_type: exports_external.literal("pcb_pad_pad_clearance_error").default("pcb_pad_pad_clearance_error"),
  pcb_pad_ids: exports_external.array(exports_external.string()).min(2),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when pads are closer than the allowed clearance");
expectTypesMatch(true);
var pcb_pad_trace_clearance_error = base_circuit_json_error.extend({
  type: exports_external.literal("pcb_pad_trace_clearance_error"),
  pcb_pad_trace_clearance_error_id: getZodPrefixedIdWithDefault("pcb_pad_trace_clearance_error"),
  error_type: exports_external.literal("pcb_pad_trace_clearance_error").default("pcb_pad_trace_clearance_error"),
  pcb_pad_id: exports_external.string(),
  pcb_trace_id: exports_external.string(),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: exports_external.object({
    x: exports_external.number().optional(),
    y: exports_external.number().optional()
  }).optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("Error emitted when a pad and trace are closer than allowed clearance");
expectTypesMatch(true);
var pcb_courtyard_rect = exports_external.object({
  type: exports_external.literal("pcb_courtyard_rect"),
  pcb_courtyard_rect_id: getZodPrefixedIdWithDefault("pcb_courtyard_rect"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer,
  ccw_rotation: rotation.optional(),
  color: exports_external.string().optional()
}).describe("Defines a courtyard rectangle on the PCB");
expectTypesMatch(true);
var pcb_courtyard_outline = exports_external.object({
  type: exports_external.literal("pcb_courtyard_outline"),
  pcb_courtyard_outline_id: getZodPrefixedIdWithDefault("pcb_courtyard_outline"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: visible_layer,
  outline: exports_external.array(point).min(2)
}).describe("Defines a courtyard outline on the PCB");
expectTypesMatch(true);
var pcb_courtyard_polygon = exports_external.object({
  type: exports_external.literal("pcb_courtyard_polygon"),
  pcb_courtyard_polygon_id: getZodPrefixedIdWithDefault("pcb_courtyard_polygon"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  layer: visible_layer,
  points: exports_external.array(point).min(3),
  color: exports_external.string().optional()
}).describe("Defines a courtyard polygon on the PCB");
expectTypesMatch(true);
var pcb_courtyard_circle = exports_external.object({
  type: exports_external.literal("pcb_courtyard_circle"),
  pcb_courtyard_circle_id: getZodPrefixedIdWithDefault("pcb_courtyard_circle"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  radius: length,
  layer: visible_layer,
  color: exports_external.string().optional()
}).describe("Defines a courtyard circle on the PCB");
expectTypesMatch(true);
var pcb_courtyard_pill = exports_external.object({
  type: exports_external.literal("pcb_courtyard_pill"),
  pcb_courtyard_pill_id: getZodPrefixedIdWithDefault("pcb_courtyard_pill"),
  pcb_component_id: exports_external.string(),
  pcb_group_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  center: point,
  width: length,
  height: length,
  radius: length,
  layer: visible_layer,
  color: exports_external.string().optional()
}).describe("Defines a courtyard pill on the PCB");
expectTypesMatch(true);
var cad_model_axis_directions = [
  "x+",
  "x-",
  "y+",
  "y-",
  "z+",
  "z-"
];
var cad_component = exports_external.object({
  type: exports_external.literal("cad_component"),
  cad_component_id: exports_external.string(),
  pcb_component_id: exports_external.string().optional().describe("Optional PCB component reference; omit for CAD geometry without a PCB component"),
  source_component_id: exports_external.string(),
  position: point3,
  rotation: point3.optional(),
  is_on_folded_board: exports_external.boolean().optional().describe("True when position and rotation describe the assembled folded board pose. False or omitted means the flat board pose. PCB records remain flat; pcb_component_id identifies the flat mount and owning board for reversible transforms."),
  size: point3.optional(),
  layer: layer_ref.optional(),
  subcircuit_id: exports_external.string().optional(),
  footprinter_string: exports_external.string().optional(),
  model_obj_url: exports_external.string().optional(),
  model_stl_url: exports_external.string().optional(),
  model_3mf_url: exports_external.string().optional(),
  model_gltf_url: exports_external.string().optional(),
  model_glb_url: exports_external.string().optional(),
  model_step_url: exports_external.string().optional(),
  model_wrl_url: exports_external.string().optional(),
  model_asset: asset.optional(),
  model_unit_to_mm_scale_factor: exports_external.number().optional(),
  model_board_normal_direction: exports_external.enum(cad_model_axis_directions).optional().describe(`The direction in the model's coordinate space that is considered "up" or "coming out of the board surface"`),
  model_origin_position: point3.optional(),
  model_origin_alignment: exports_external.enum([
    "unknown",
    "center",
    "center_of_component_on_board_surface",
    "bottom_center_of_component"
  ]).optional(),
  model_object_fit: exports_external.enum(["contain_within_bounds", "fill_bounds"]).optional().default("contain_within_bounds"),
  model_jscad: exports_external.any().optional(),
  show_as_translucent_model: exports_external.boolean().optional(),
  show_as_bounding_box: exports_external.boolean().optional(),
  show_hidden_edges: exports_external.boolean().optional(),
  anchor_alignment: exports_external.enum(["center", "center_of_component_on_board_surface"]).optional().default("center")
}).describe("Defines CAD geometry, optionally associated with a PCB component");
expectTypesMatch(true);
var cad_collision_error = base_circuit_json_error.extend({
  type: exports_external.literal("cad_collision_error"),
  cad_collision_error_id: getZodPrefixedIdWithDefault("cad_collision_error"),
  error_type: exports_external.literal("cad_collision_error").default("cad_collision_error"),
  cad_component_ids: exports_external.array(exports_external.string()).min(1),
  pcb_component_ids: exports_external.array(exports_external.string()).optional(),
  source_component_ids: exports_external.array(exports_external.string()).min(1),
  intersection_area_mm2: exports_external.number().finite().nonnegative(),
  threshold_area_mm2: exports_external.number().finite().nonnegative()
}).describe("An aperture-bearing part intersects the finished enclosure. The intersection_area_mm2 is the union silhouette area of the solid intersection projected along the aperture face normal, in the right-handed Circuit JSON world frame (+X right, +Y top, +Z above). It is an area in square millimetres, not intersection volume or surface area. This indicates possible aperture misplacement, insufficient size/depth, or body clearance problems; it does not prove which cause applies.");
expectTypesMatch(true);
var connectorPin1Position = point3.refine((point2) => [point2.x, point2.y, point2.z].every(Number.isFinite), "Connector pin 1 positions must be finite").describe("Resolved pin 1 position at the connector mating face, in right-handed circuit world, millimeters: +X right, +Y top, +Z above. An absolute point, not a direction. Computed by the circuit producer from endpoint geometry. Together with the endpoint path tangent, fixes connector roll and identifies its pin 1 side; renderers must not infer it from footprints.");
var cad_cable = exports_external.object({
  type: exports_external.literal("cad_cable"),
  cad_cable_id: exports_external.string(),
  name: exports_external.string().min(1),
  from_source_component_id: exports_external.string(),
  to_source_component_id: exports_external.string(),
  from_connector_pin1_position: connectorPin1Position.optional(),
  to_connector_pin1_position: connectorPin1Position.optional(),
  cableprinter_string: exports_external.string().min(1).describe('Physical cable definition, e.g. "usb_c" or "jst_ph_pins6". Independent of the route.'),
  path: exports_external.array(point3).min(2).refine((path) => path.every((point2, i) => [point2.x, point2.y, point2.z].every(Number.isFinite) && (i === 0 || Math.hypot(point2.x - path[i - 1].x, point2.y - path[i - 1].y, point2.z - path[i - 1].z) > 0.00000001)), "Cable paths require finite, distinct consecutive points").describe("Resolved cable centerline points in right-handed circuit world, millimeters: +X right, +Y top, +Z above. First/last samples are connector wire exits; their tangents point into/out of the cable. Includes routing/slack; renderers must not recompute the path.")
}).describe("A physical assembly cable with a resolved 3D route. Several cables are independent cad_cable records, each with its own endpoints, definition and path. Does not imply electrical pin mapping.");
expectTypesMatch(true);
var wave_shape = exports_external.enum(["sinewave", "square", "triangle", "sawtooth"]);
var percentage = exports_external.union([exports_external.string(), exports_external.number()]).transform((val) => {
  if (typeof val === "string") {
    if (val.endsWith("%")) {
      return parseFloat(val.slice(0, -1)) / 100;
    }
    return parseFloat(val);
  }
  return val;
}).pipe(exports_external.number().min(0, "Duty cycle must be non-negative").max(1, "Duty cycle cannot be greater than 100%"));
var simulation_dc_voltage_source = exports_external.object({
  type: exports_external.literal("simulation_voltage_source"),
  simulation_voltage_source_id: getZodPrefixedIdWithDefault("simulation_voltage_source"),
  is_dc_source: exports_external.literal(true).optional().default(true),
  positive_source_port_id: exports_external.string().optional(),
  negative_source_port_id: exports_external.string().optional(),
  positive_source_net_id: exports_external.string().optional(),
  negative_source_net_id: exports_external.string().optional(),
  voltage,
  ac_magnitude: voltage.optional(),
  ac_phase: rotation.optional()
}).describe("Defines a DC voltage source for simulation");
var simulation_ac_voltage_source = exports_external.object({
  type: exports_external.literal("simulation_voltage_source"),
  simulation_voltage_source_id: getZodPrefixedIdWithDefault("simulation_voltage_source"),
  is_dc_source: exports_external.literal(false),
  terminal1_source_port_id: exports_external.string().optional(),
  terminal2_source_port_id: exports_external.string().optional(),
  terminal1_source_net_id: exports_external.string().optional(),
  terminal2_source_net_id: exports_external.string().optional(),
  voltage: voltage.optional(),
  frequency: frequency.optional(),
  peak_to_peak_voltage: voltage.optional(),
  wave_shape: wave_shape.optional(),
  phase: rotation.optional(),
  duty_cycle: percentage.optional(),
  pulse_delay: ms.optional(),
  rise_time: ms.optional(),
  fall_time: ms.optional(),
  pulse_width: ms.optional(),
  period: ms.optional(),
  ac_magnitude: voltage.optional(),
  ac_phase: rotation.optional()
}).describe("Defines an AC voltage source for simulation");
var simulation_voltage_source = exports_external.union([simulation_dc_voltage_source, simulation_ac_voltage_source]).describe("Defines a voltage source for simulation");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var percentage2 = exports_external.union([exports_external.string(), exports_external.number()]).transform((val) => {
  if (typeof val === "string") {
    if (val.endsWith("%")) {
      return parseFloat(val.slice(0, -1)) / 100;
    }
    return parseFloat(val);
  }
  return val;
}).pipe(exports_external.number().min(0, "Duty cycle must be non-negative").max(1, "Duty cycle cannot be greater than 100%"));
var simulation_dc_current_source = exports_external.object({
  type: exports_external.literal("simulation_current_source"),
  simulation_current_source_id: getZodPrefixedIdWithDefault("simulation_current_source"),
  is_dc_source: exports_external.literal(true).optional().default(true),
  positive_source_port_id: exports_external.string().optional(),
  negative_source_port_id: exports_external.string().optional(),
  positive_source_net_id: exports_external.string().optional(),
  negative_source_net_id: exports_external.string().optional(),
  current,
  ac_magnitude: current.optional(),
  ac_phase: rotation.optional()
}).describe("Defines a DC current source for simulation");
var simulation_ac_current_source = exports_external.object({
  type: exports_external.literal("simulation_current_source"),
  simulation_current_source_id: getZodPrefixedIdWithDefault("simulation_current_source"),
  is_dc_source: exports_external.literal(false),
  terminal1_source_port_id: exports_external.string().optional(),
  terminal2_source_port_id: exports_external.string().optional(),
  terminal1_source_net_id: exports_external.string().optional(),
  terminal2_source_net_id: exports_external.string().optional(),
  current: current.optional(),
  frequency: frequency.optional(),
  peak_to_peak_current: current.optional(),
  wave_shape: wave_shape.optional(),
  phase: rotation.optional(),
  duty_cycle: percentage2.optional(),
  ac_magnitude: current.optional(),
  ac_phase: rotation.optional()
}).describe("Defines an AC current source for simulation");
var simulation_current_source = exports_external.union([simulation_dc_current_source, simulation_ac_current_source]).describe("Defines a current source for simulation");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
var simulation_dc_sweep_unit = exports_external.custom((dcSweepUnit) => dcSweepUnit === "V" || dcSweepUnit === "A");
var simulation_parameter_unit = exports_external.custom((parameterUnit) => parameterUnit === "Ω" || parameterUnit === "F" || parameterUnit === "H" || parameterUnit === "V" || parameterUnit === "A");
var experiment_type = exports_external.union([
  exports_external.literal("spice_dc_sweep"),
  exports_external.literal("spice_dc_operating_point"),
  exports_external.literal("spice_transient_analysis"),
  exports_external.literal("spice_ac_analysis"),
  exports_external.literal("pcb_return_current")
]);
var spice_simulation_options = exports_external.object({
  method: exports_external.enum(["trap", "gear"]).optional(),
  reltol: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  abstol: exports_external.union([exports_external.number(), exports_external.string()]).optional(),
  vntol: exports_external.union([exports_external.number(), exports_external.string()]).optional()
}).describe("SPICE solver options for a simulation experiment");
var simulation_experiment = exports_external.object({
  type: exports_external.literal("simulation_experiment"),
  simulation_experiment_id: getZodPrefixedIdWithDefault("simulation_experiment"),
  name: exports_external.string(),
  experiment_type,
  time_per_step: duration_ms.optional(),
  start_time_ms: ms.optional(),
  end_time_ms: ms.optional(),
  spice_options: spice_simulation_options.optional(),
  dc_sweep_voltage_source_id: exports_external.string().optional(),
  dc_sweep_current_source_id: exports_external.string().optional(),
  dc_sweep_start: exports_external.number().optional(),
  dc_sweep_stop: exports_external.number().optional(),
  dc_sweep_step: exports_external.number().refine((dcSweepStep) => dcSweepStep !== 0).optional(),
  dc_sweep_unit: simulation_dc_sweep_unit.optional(),
  ac_sweep_type: exports_external.enum(["linear", "decade", "octave"]).optional(),
  ac_samples_per_interval: exports_external.number().int().positive().optional(),
  ac_sample_count: exports_external.number().int().positive().optional(),
  ac_start_frequency_hz: exports_external.number().positive().optional(),
  ac_stop_frequency_hz: exports_external.number().positive().optional()
}).superRefine((experiment, context) => {
  if (experiment.experiment_type === "spice_dc_sweep") {
    const requiredFields = [
      "dc_sweep_start",
      "dc_sweep_stop",
      "dc_sweep_step",
      "dc_sweep_unit"
    ];
    for (const field of requiredFields) {
      if (experiment[field] === undefined) {
        context.addIssue({
          code: exports_external.ZodIssueCode.custom,
          path: [field],
          message: `${field} is required for a DC sweep`
        });
      }
    }
    const hasVoltageSource = experiment.dc_sweep_voltage_source_id !== undefined;
    const hasCurrentSource = experiment.dc_sweep_current_source_id !== undefined;
    if (hasVoltageSource === hasCurrentSource) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["dc_sweep_voltage_source_id"],
        message: "Exactly one DC sweep voltage or current source ID is required"
      });
    }
  }
  if (experiment.experiment_type === "spice_ac_analysis") {
    if (experiment.ac_sweep_type === undefined) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["ac_sweep_type"],
        message: "ac_sweep_type is required for an AC analysis"
      });
    }
    if (experiment.ac_start_frequency_hz === undefined) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["ac_start_frequency_hz"],
        message: "ac_start_frequency_hz is required for an AC analysis"
      });
    }
    if (experiment.ac_stop_frequency_hz === undefined) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["ac_stop_frequency_hz"],
        message: "ac_stop_frequency_hz is required for an AC analysis"
      });
    }
    if (experiment.ac_sweep_type === "linear" && experiment.ac_sample_count === undefined) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["ac_sample_count"],
        message: "ac_sample_count is required for a linear AC analysis"
      });
    }
    if ((experiment.ac_sweep_type === "decade" || experiment.ac_sweep_type === "octave") && experiment.ac_samples_per_interval === undefined) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["ac_samples_per_interval"],
        message: "ac_samples_per_interval is required for decade and octave AC analyses"
      });
    }
  }
}).describe("Defines a simulation experiment configuration");
expectTypesMatch(true);
var simulation_parameter_sweep_coordinate = exports_external.object({
  simulation_parameter_sweep_id: exports_external.string(),
  sweep_index: exports_external.number().int().nonnegative(),
  parameter_value: exports_external.number(),
  parameter_unit: simulation_parameter_unit
});
expectTypesMatch(true);
var simulation_transient_voltage_graph = exports_external.object({
  type: exports_external.literal("simulation_transient_voltage_graph"),
  simulation_transient_voltage_graph_id: getZodPrefixedIdWithDefault("simulation_transient_voltage_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  timestamps_ms: exports_external.array(exports_external.number()).optional(),
  voltage_levels: exports_external.array(exports_external.number()),
  source_component_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional(),
  time_per_step: duration_ms,
  start_time_ms: ms,
  end_time_ms: ms,
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).describe("Stores voltage measurements over time for a simulation");
expectTypesMatch(true);
var simulation_transient_current_graph = exports_external.object({
  type: exports_external.literal("simulation_transient_current_graph"),
  simulation_transient_current_graph_id: getZodPrefixedIdWithDefault("simulation_transient_current_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  timestamps_ms: exports_external.array(exports_external.number()).optional(),
  current_levels: exports_external.array(exports_external.number()),
  source_component_id: exports_external.string().optional(),
  subcircuit_connectivity_map_key: exports_external.string().optional(),
  time_per_step: duration_ms,
  start_time_ms: ms,
  end_time_ms: ms,
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).describe("Stores current measurements over time for a simulation");
expectTypesMatch(true);
var simulation_switch = exports_external.object({
  type: exports_external.literal("simulation_switch"),
  simulation_switch_id: getZodPrefixedIdWithDefault("simulation_switch"),
  source_component_id: exports_external.string().optional(),
  closes_at: ms.optional(),
  opens_at: ms.optional(),
  starts_closed: exports_external.boolean().optional(),
  switching_frequency: frequency.optional()
}).describe("Defines a switch for simulation timing control");
expectTypesMatch(true);
var simulation_voltage_probe = exports_external.object({
  type: exports_external.literal("simulation_voltage_probe"),
  simulation_voltage_probe_id: getZodPrefixedIdWithDefault("simulation_voltage_probe"),
  source_component_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  signal_input_source_port_id: exports_external.string().optional(),
  signal_input_source_net_id: exports_external.string().optional(),
  reference_input_source_port_id: exports_external.string().optional(),
  reference_input_source_net_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  color: exports_external.string().optional()
}).describe("Defines a voltage probe for simulation. If a reference input is not provided, it measures against ground. If a reference input is provided, it measures the differential voltage between two points.").superRefine((data, ctx) => {
  const is_differential = data.reference_input_source_port_id || data.reference_input_source_net_id;
  if (is_differential) {
    const has_ports = !!data.signal_input_source_port_id || !!data.reference_input_source_port_id;
    const has_nets = !!data.signal_input_source_net_id || !!data.reference_input_source_net_id;
    if (has_ports && has_nets) {
      ctx.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: "Cannot mix port and net connections in a differential probe."
      });
    } else if (has_ports) {
      if (!data.signal_input_source_port_id || !data.reference_input_source_port_id) {
        ctx.addIssue({
          code: exports_external.ZodIssueCode.custom,
          message: "Differential port probe requires both signal_input_source_port_id and reference_input_source_port_id."
        });
      }
    } else if (has_nets) {
      if (!data.signal_input_source_net_id || !data.reference_input_source_net_id) {
        ctx.addIssue({
          code: exports_external.ZodIssueCode.custom,
          message: "Differential net probe requires both signal_input_source_net_id and reference_input_source_net_id."
        });
      }
    }
  } else {
    if (!!data.signal_input_source_port_id === !!data.signal_input_source_net_id) {
      ctx.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: "A voltage probe must have exactly one of signal_input_source_port_id or signal_input_source_net_id."
      });
    }
  }
});
expectTypesMatch(true);
var simulation_current_probe = exports_external.object({
  type: exports_external.literal("simulation_current_probe"),
  simulation_current_probe_id: getZodPrefixedIdWithDefault("simulation_current_probe"),
  source_component_id: exports_external.string().optional(),
  name: exports_external.string().optional(),
  positive_source_port_id: exports_external.string().optional(),
  negative_source_port_id: exports_external.string().optional(),
  positive_source_net_id: exports_external.string().optional(),
  negative_source_net_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional(),
  color: exports_external.string().optional()
}).describe("Defines a current probe for simulation. It measures current flowing from the positive endpoint to the negative endpoint.").superRefine((data, ctx) => {
  const hasPositivePort = !!data.positive_source_port_id;
  const hasNegativePort = !!data.negative_source_port_id;
  const hasPositiveNet = !!data.positive_source_net_id;
  const hasNegativeNet = !!data.negative_source_net_id;
  const hasPorts = hasPositivePort || hasNegativePort;
  const hasNets = hasPositiveNet || hasNegativeNet;
  if (hasPorts && hasNets) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Cannot mix port and net connections in a current probe."
    });
    return;
  }
  if (hasPorts) {
    if (!hasPositivePort || !hasNegativePort) {
      ctx.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: "Current probe using source ports requires both positive_source_port_id and negative_source_port_id."
      });
    }
    return;
  }
  if (hasNets) {
    if (!hasPositiveNet || !hasNegativeNet) {
      ctx.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: "Current probe using source nets requires both positive_source_net_id and negative_source_net_id."
      });
    }
    return;
  }
  ctx.addIssue({
    code: exports_external.ZodIssueCode.custom,
    message: "A current probe must have either positive/negative source port ids or positive/negative source net ids."
  });
});
expectTypesMatch(true);
var simulation_unknown_experiment_error = base_circuit_json_error.extend({
  type: exports_external.literal("simulation_unknown_experiment_error"),
  simulation_unknown_experiment_error_id: getZodPrefixedIdWithDefault("simulation_unknown_experiment_error"),
  error_type: exports_external.literal("simulation_unknown_experiment_error").default("simulation_unknown_experiment_error"),
  simulation_experiment_id: exports_external.string().optional(),
  subcircuit_id: exports_external.string().optional()
}).describe("An unknown error occurred during the simulation experiment.");
expectTypesMatch(true);
var simulation_parameter_type = exports_external.enum([
  "resistance",
  "capacitance",
  "inductance",
  "voltage",
  "current"
]);
var simulation_parameter_sweep_base = exports_external.object({
  type: exports_external.literal("simulation_parameter_sweep"),
  simulation_parameter_sweep_id: getZodPrefixedIdWithDefault("simulation_parameter_sweep"),
  simulation_experiment_id: exports_external.string(),
  name: exports_external.string().optional(),
  parameter_values: exports_external.array(exports_external.number()).min(1),
  parameter_unit: simulation_parameter_unit
});
var simulation_parameter_sweep = exports_external.discriminatedUnion("parameter_type", [
  simulation_parameter_sweep_base.extend({
    parameter_type: exports_external.literal("resistance"),
    resistor_source_component_id: exports_external.string()
  }),
  simulation_parameter_sweep_base.extend({
    parameter_type: exports_external.literal("capacitance"),
    capacitor_source_component_id: exports_external.string()
  }),
  simulation_parameter_sweep_base.extend({
    parameter_type: exports_external.literal("inductance"),
    inductor_source_component_id: exports_external.string()
  }),
  simulation_parameter_sweep_base.extend({
    parameter_type: exports_external.literal("voltage"),
    source_net_id: exports_external.string()
  }),
  simulation_parameter_sweep_base.extend({
    parameter_type: exports_external.literal("current"),
    current_source_component_id: exports_external.string()
  })
]).describe("Repeats a simulation experiment over component parameter values");
expectTypesMatch(true);
var simulation_dc_operating_point_voltage = exports_external.object({
  type: exports_external.literal("simulation_dc_operating_point_voltage"),
  simulation_dc_operating_point_voltage_id: getZodPrefixedIdWithDefault("simulation_dc_operating_point_voltage"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_voltage_probe_id: exports_external.string(),
  voltage: exports_external.number(),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
});
expectTypesMatch(true);
var simulation_dc_operating_point_current = exports_external.object({
  type: exports_external.literal("simulation_dc_operating_point_current"),
  simulation_dc_operating_point_current_id: getZodPrefixedIdWithDefault("simulation_dc_operating_point_current"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_current_probe_id: exports_external.string(),
  current: exports_external.number(),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
});
expectTypesMatch(true);
var simulation_dc_sweep_voltage_graph = exports_external.object({
  type: exports_external.literal("simulation_dc_sweep_voltage_graph"),
  simulation_dc_sweep_voltage_graph_id: getZodPrefixedIdWithDefault("simulation_dc_sweep_voltage_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_voltage_probe_id: exports_external.string(),
  sweep_values: exports_external.array(exports_external.number()),
  sweep_unit: simulation_dc_sweep_unit,
  voltage_levels: exports_external.array(exports_external.number()),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).refine((graph) => graph.sweep_values.length === graph.voltage_levels.length, {
  message: "sweep_values and voltage_levels must have the same length"
});
expectTypesMatch(true);
var simulation_dc_sweep_current_graph = exports_external.object({
  type: exports_external.literal("simulation_dc_sweep_current_graph"),
  simulation_dc_sweep_current_graph_id: getZodPrefixedIdWithDefault("simulation_dc_sweep_current_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_current_probe_id: exports_external.string(),
  sweep_values: exports_external.array(exports_external.number()),
  sweep_unit: simulation_dc_sweep_unit,
  current_levels: exports_external.array(exports_external.number()),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).refine((graph) => graph.sweep_values.length === graph.current_levels.length, {
  message: "sweep_values and current_levels must have the same length"
});
expectTypesMatch(true);
var simulation_complex_sample = exports_external.object({
  re: exports_external.number(),
  im: exports_external.number()
});
expectTypesMatch(true);
var simulation_ac_sweep_voltage_graph = exports_external.object({
  type: exports_external.literal("simulation_ac_sweep_voltage_graph"),
  simulation_ac_sweep_voltage_graph_id: getZodPrefixedIdWithDefault("simulation_ac_sweep_voltage_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_voltage_probe_id: exports_external.string(),
  frequencies_hz: exports_external.array(exports_external.number()),
  complex_voltages: exports_external.array(simulation_complex_sample),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).refine((graph) => graph.frequencies_hz.length === graph.complex_voltages.length, {
  message: "frequencies_hz and complex_voltages must have the same length"
});
expectTypesMatch(true);
var simulation_ac_sweep_current_graph = exports_external.object({
  type: exports_external.literal("simulation_ac_sweep_current_graph"),
  simulation_ac_sweep_current_graph_id: getZodPrefixedIdWithDefault("simulation_ac_sweep_current_graph"),
  simulation_experiment_id: exports_external.string(),
  simulation_parameter_sweep_coordinate: simulation_parameter_sweep_coordinate.optional(),
  simulation_current_probe_id: exports_external.string(),
  frequencies_hz: exports_external.array(exports_external.number()),
  complex_currents: exports_external.array(simulation_complex_sample),
  name: exports_external.string().optional(),
  color: exports_external.string().optional()
}).refine((graph) => graph.frequencies_hz.length === graph.complex_currents.length, {
  message: "frequencies_hz and complex_currents must have the same length"
});
expectTypesMatch(true);
var simulation_op_amp = exports_external.object({
  type: exports_external.literal("simulation_op_amp"),
  simulation_op_amp_id: getZodPrefixedIdWithDefault("simulation_op_amp"),
  source_component_id: exports_external.string().optional(),
  inverting_input_source_port_id: exports_external.string(),
  non_inverting_input_source_port_id: exports_external.string(),
  output_source_port_id: exports_external.string(),
  positive_supply_source_port_id: exports_external.string(),
  negative_supply_source_port_id: exports_external.string()
}).describe("Defines a simple ideal operational amplifier for simulation");
expectTypesMatch(true);
var simulation_spice_subcircuit = exports_external.object({
  type: exports_external.literal("simulation_spice_subcircuit"),
  simulation_spice_subcircuit_id: getZodPrefixedIdWithDefault("simulation_spice_subcircuit"),
  source_component_id: exports_external.string(),
  spice_pin_to_source_port_map: exports_external.record(exports_external.string(), exports_external.string()),
  subcircuit_source: exports_external.string()
}).describe("Defines a custom SPICE subcircuit model for simulation");
expectTypesMatch(true);
var hasValue = (value) => value !== undefined;
var simulation_oscilloscope_trace = exports_external.object({
  type: exports_external.literal("simulation_oscilloscope_trace"),
  simulation_oscilloscope_trace_id: getZodPrefixedIdWithDefault("simulation_oscilloscope_trace"),
  simulation_transient_voltage_graph_id: exports_external.string().optional(),
  simulation_transient_current_graph_id: exports_external.string().optional(),
  simulation_voltage_probe_id: exports_external.string().optional(),
  simulation_current_probe_id: exports_external.string().optional(),
  display_name: exports_external.string().optional(),
  color: exports_external.string().optional(),
  display_center_value: exports_external.number().optional(),
  display_center_offset_divs: exports_external.number().optional(),
  volts_per_div: exports_external.number().positive().optional(),
  amps_per_div: exports_external.number().positive().optional()
}).describe("Defines how a simulation measurement is rendered as an oscilloscope-style trace.").superRefine((data, ctx) => {
  const voltageReferences = [
    data.simulation_transient_voltage_graph_id,
    data.simulation_voltage_probe_id
  ].filter(hasValue).length;
  const currentReferences = [
    data.simulation_transient_current_graph_id,
    data.simulation_current_probe_id
  ].filter(hasValue).length;
  if (voltageReferences + currentReferences !== 1) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "An oscilloscope trace must reference exactly one voltage graph, current graph, voltage probe, or current probe."
    });
  }
  if (voltageReferences > 0 && data.amps_per_div !== undefined) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Voltage oscilloscope traces must use volts_per_div, not amps_per_div."
    });
  }
  if (currentReferences > 0 && data.volts_per_div !== undefined) {
    ctx.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Current oscilloscope traces must use amps_per_div, not volts_per_div."
    });
  }
});
expectTypesMatch(true);
var contact_position = exports_external.object({
  x: exports_external.number().finite(),
  y: exports_external.number().finite(),
  layer: layer_ref
});
var simulation_return_current_contact = exports_external.discriminatedUnion("contact_type", [
  contact_position.extend({
    contact_type: exports_external.literal("pcb_port"),
    pcb_port_id: exports_external.string().min(1)
  }),
  contact_position.extend({
    contact_type: exports_external.literal("pcb_via"),
    pcb_via_id: exports_external.string().min(1)
  }),
  contact_position.extend({
    contact_type: exports_external.literal("pcb_copper_pour"),
    pcb_copper_pour_id: exports_external.string().min(1)
  })
]).describe("Identifies the reference conductor at a return-current contact");
expectTypesMatch(true);
var simulation_terminal_port = exports_external.object({
  signal_pcb_port_id: exports_external.string().min(1),
  reference_pcb_port_id: exports_external.string().min(1).optional(),
  reference_layer: layer_ref,
  resistance: exports_external.number().finite().positive()
}).describe("A two-terminal return-current excitation port with resistance in ohms");
expectTypesMatch(true);
var simulation_return_current_excitation = exports_external.object({
  type: exports_external.literal("simulation_return_current_excitation"),
  simulation_return_current_excitation_id: getZodPrefixedIdWithDefault("simulation_return_current_excitation"),
  simulation_experiment_id: exports_external.string().min(1),
  pcb_trace_id: exports_external.string().min(1),
  ground_source_net_id: exports_external.string().min(1),
  current: exports_external.number().finite(),
  return_source: simulation_return_current_contact,
  return_sink: simulation_return_current_contact,
  source_port: simulation_terminal_port.optional(),
  load_port: simulation_terminal_port.optional()
}).describe("Excites a signal trace with signed current in amperes, peak for AC; return_source is near the load and return_sink near the driver for positive current");
expectTypesMatch(true);
var simulation_pcb_return_current_result = exports_external.object({
  type: exports_external.literal("simulation_pcb_return_current_result"),
  simulation_pcb_return_current_result_id: getZodPrefixedIdWithDefault("simulation_pcb_return_current_result"),
  simulation_experiment_id: exports_external.string().min(1),
  pcb_board_id: exports_external.string().min(1),
  simulation_return_current_excitation_ids: exports_external.array(exports_external.string().min(1)).min(1).refine((ids) => new Set(ids).size === ids.length, "Excitation IDs must be unique"),
  frequency_hz: exports_external.number().finite().positive().optional()
}).describe("A PCB return-current result at one frequency, or a frequency-independent result when frequency_hz is absent");
expectTypesMatch(true);
function createSimulationReturnCurrentAssetSchema(mimetypes) {
  return asset.extend({
    project_relative_path: exports_external.string().min(1),
    url: exports_external.string().url()
  }).superRefine((value, context) => {
    if (!mimetypes.includes(value.mimetype)) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["mimetype"],
        message: `Expected one of: ${mimetypes.join(", ")}`
      });
    }
    if (value.url.startsWith("data:")) {
      const mediaType = /^data:([^;,]*)(?:;[^,]*)?,/i.exec(value.url)?.[1];
      if (mediaType?.toLowerCase() !== value.mimetype) {
        context.addIssue({
          code: exports_external.ZodIssueCode.custom,
          path: ["url"],
          message: "Data URL media type must match asset.mimetype"
        });
      }
    }
  });
}
var simulation_return_current_field_asset = createSimulationReturnCurrentAssetSchema([
  "application/json",
  "application/gzip"
]);
var simulation_return_current_image_asset = createSimulationReturnCurrentAssetSchema(["image/png", "image/webp"]);
var simulation_pcb_return_current_field = exports_external.object({
  type: exports_external.literal("simulation_pcb_return_current_field"),
  simulation_pcb_return_current_field_id: getZodPrefixedIdWithDefault("simulation_pcb_return_current_field"),
  simulation_pcb_return_current_result_id: exports_external.string().min(1),
  layer: layer_ref,
  source_net_id: exports_external.string().min(1),
  field_type: exports_external.enum(["real", "complex_phasor"]),
  min_x: exports_external.number().finite(),
  min_y: exports_external.number().finite(),
  columns: exports_external.number().int().positive().safe(),
  rows: exports_external.number().int().positive().safe(),
  cell_width: exports_external.number().finite().positive(),
  cell_height: exports_external.number().finite().positive(),
  copper_thickness: exports_external.number().finite().positive(),
  data_format: exports_external.literal("simulation_return_current_grid_json_v1"),
  field_asset: simulation_return_current_field_asset
}).superRefine((field, context) => {
  if (!Number.isSafeInteger(field.columns * field.rows)) {
    context.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["columns"],
      message: "The grid cell count must be a safe integer"
    });
  }
}).describe("A sampled sheet-current field in A/mm, using plain or gzipped JSON Asset URLs; dimensions are PCB millimeters");
expectTypesMatch(true);
var channel = exports_external.array(exports_external.number().finite().nullable()).min(1);
var simulation_return_current_grid_json = exports_external.discriminatedUnion("field_type", [
  exports_external.object({
    field_type: exports_external.literal("real"),
    sheet_current_x: channel,
    sheet_current_y: channel
  }),
  exports_external.object({
    field_type: exports_external.literal("complex_phasor"),
    sheet_current_x_real: channel,
    sheet_current_x_imag: channel,
    sheet_current_y_real: channel,
    sheet_current_y_imag: channel
  })
]).superRefine((grid, context) => {
  const channels = grid.field_type === "real" ? [grid.sheet_current_x, grid.sheet_current_y] : [
    grid.sheet_current_x_real,
    grid.sheet_current_x_imag,
    grid.sheet_current_y_real,
    grid.sheet_current_y_imag
  ];
  const first = channels[0];
  if (channels.some((values) => values.length !== first.length)) {
    context.addIssue({
      code: exports_external.ZodIssueCode.custom,
      message: "Current channels must have equal lengths"
    });
    return;
  }
  for (let index = 0;index < first.length; index++) {
    const masked = first[index] === null;
    if (channels.some((values) => values[index] === null !== masked)) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: `Cell ${index} must be null in every channel or finite in every channel`
      });
      return;
    }
  }
}).describe("Decoded real or complex sheet-current arrays with a shared conductor mask");
expectTypesMatch(true);
function getSimulationReturnCurrentGridJsonSchema(field) {
  const count = field.columns * field.rows;
  if (!Number.isSafeInteger(field.columns) || field.columns <= 0 || !Number.isSafeInteger(field.rows) || field.rows <= 0 || !Number.isSafeInteger(count))
    throw new Error("Grid dimensions must be positive safe integers");
  return simulation_return_current_grid_json.superRefine((grid, context) => {
    if (grid.field_type !== field.field_type) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: ["field_type"],
        message: "Decoded field_type must match the parent field"
      });
    }
    const first = grid.field_type === "real" ? grid.sheet_current_x : grid.sheet_current_x_real;
    if (first.length !== count) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        message: `Each current channel must have ${count} entries (columns * rows)`
      });
    }
  });
}
var simulation_pcb_return_current_heatmap = exports_external.object({
  type: exports_external.literal("simulation_pcb_return_current_heatmap"),
  simulation_pcb_return_current_heatmap_id: getZodPrefixedIdWithDefault("simulation_pcb_return_current_heatmap"),
  simulation_pcb_return_current_result_id: exports_external.string().min(1),
  layer: layer_ref,
  source_net_id: exports_external.string().min(1),
  min_x: exports_external.number().finite(),
  min_y: exports_external.number().finite(),
  max_x: exports_external.number().finite(),
  max_y: exports_external.number().finite(),
  image_asset: simulation_return_current_image_asset
}).superRefine((heatmap, context) => {
  for (const axis of ["x", "y"]) {
    if (heatmap[`max_${axis}`] <= heatmap[`min_${axis}`]) {
      context.addIssue({
        code: exports_external.ZodIssueCode.custom,
        path: [`max_${axis}`],
        message: "Heatmap bounds must have positive width and height"
      });
    }
  }
}).describe("A transparent PNG/WebP current-density overlay in A/mm²; the top-left pixel maps to (min_x, max_y)");
expectTypesMatch(true);
var marker_base = exports_external.object({
  type: exports_external.literal("simulation_pcb_return_current_marker"),
  simulation_pcb_return_current_marker_id: getZodPrefixedIdWithDefault("simulation_pcb_return_current_marker"),
  simulation_pcb_return_current_result_id: exports_external.string().min(1),
  role: exports_external.enum([
    "signal_source",
    "signal_load",
    "return_source",
    "return_sink",
    "signal_transition",
    "return_transition"
  ]),
  label: exports_external.string().optional(),
  label_x: exports_external.number().finite().optional(),
  label_y: exports_external.number().finite().optional()
});
var simulation_pcb_return_current_marker = exports_external.discriminatedUnion("target_type", [
  marker_base.extend({
    target_type: exports_external.literal("pcb_port"),
    pcb_port_id: exports_external.string().min(1),
    layer: layer_ref
  }),
  marker_base.extend({
    target_type: exports_external.literal("pcb_via"),
    pcb_via_id: exports_external.string().min(1),
    from_layer: layer_ref,
    to_layer: layer_ref
  })
]).superRefine((marker, context) => {
  if (marker.label_x === undefined !== (marker.label_y === undefined)) {
    context.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["label_x"],
      message: "label_x and label_y must be provided together"
    });
  }
  if (marker.target_type === "pcb_via" && marker.from_layer === marker.to_layer) {
    context.addIssue({
      code: exports_external.ZodIssueCode.custom,
      path: ["to_layer"],
      message: "A via transition must connect distinct layers"
    });
  }
}).describe("A signal/return port or via highlight; markers do not assert measured via-transfer currents");
expectTypesMatch(true);
var any_circuit_element = exports_external.union([
  source_runtime_error,
  source_trace,
  source_bus,
  source_port,
  source_component_internal_connection,
  any_source_component,
  source_net,
  source_group,
  source_simple_chip,
  source_simple_capacitor,
  source_simple_diode,
  source_simple_led,
  source_simple_resistor,
  source_simple_power_source,
  source_simple_battery,
  source_simple_inductor,
  source_simple_pin_header,
  source_simple_pinout,
  source_simple_resonator,
  source_simple_switch,
  source_simple_transistor,
  source_simple_test_point,
  source_simple_mosfet,
  source_simple_op_amp,
  source_simple_potentiometer,
  source_simple_push_button,
  source_pcb_ground_plane,
  source_manually_placed_via,
  source_board,
  source_project_metadata,
  source_invalid_component_property_error,
  source_trace_not_connected_error,
  source_pin_missing_trace_warning,
  source_unnamed_trace_warning,
  source_confusing_net_name_warning,
  source_missing_manufacturer_part_number_warning,
  source_component_availability_warning,
  source_refdes_convention_warning,
  source_no_power_pin_defined_warning,
  source_no_ground_pin_defined_warning,
  source_component_pins_underspecified_warning,
  source_pin_must_be_connected_error,
  unknown_error_finding_part,
  source_part_not_found_warning,
  source_i2c_misconfigured_error,
  source_component_misconfigured_error,
  source_ambiguous_port_reference,
  pcb_component,
  pcb_debug_object,
  pcb_hole,
  pcb_missing_footprint_error,
  external_footprint_load_error,
  circuit_json_footprint_load_error,
  pcb_manual_edit_conflict_warning,
  pcb_connector_not_in_accessible_orientation_warning,
  pcb_component_missing_courtyard_warning,
  supplier_footprint_mismatch_warning,
  pcb_fabricator_extra_charge_warning,
  pcb_plated_hole,
  pcb_keepout,
  pcb_keepout_overlap_warning,
  pcb_port,
  pcb_net,
  pcb_text,
  pcb_trace,
  pcb_trace_warning,
  pcb_trace_too_long_warning,
  pcb_trace_too_long_error,
  pcb_bus_length_skew_error,
  pcb_trace_too_many_vias_warning,
  pcb_via,
  pcb_smtpad,
  pcb_solder_paste,
  pcb_soldermask_opening,
  pcb_board,
  pcb_bend,
  pcb_stiffener,
  pcb_panel,
  pcb_group,
  pcb_trace_hint,
  pcb_silkscreen_line,
  pcb_silkscreen_path,
  pcb_silkscreen_text,
  pcb_silkscreen_pill,
  pcb_copper_text,
  pcb_silkscreen_rect,
  pcb_silkscreen_circle,
  pcb_silkscreen_oval,
  pcb_silkscreen_graphic,
  pcb_bus_routing_constraint_error,
  pcb_bus_routing_constraint_warning,
  pcb_trace_error,
  pcb_trace_missing_error,
  pcb_placement_error,
  pcb_packing_error,
  pcb_panelization_placement_error,
  pcb_port_not_matched_error,
  pcb_port_not_connected_error,
  pcb_via_clearance_error,
  pcb_via_trace_clearance_error,
  pcb_pad_pad_clearance_error,
  pcb_pad_trace_clearance_error,
  pcb_fabrication_note_path,
  pcb_fabrication_note_text,
  pcb_fabrication_note_rect,
  pcb_fabrication_note_dimension,
  pcb_note_text,
  pcb_note_rect,
  pcb_note_path,
  pcb_note_line,
  pcb_note_dimension,
  pcb_autorouting_error,
  pcb_preflight_routing_error,
  pcb_footprint_overlap_error,
  pcb_courtyard_overlap_error,
  pcb_breakout_point,
  pcb_cutout,
  pcb_ground_plane,
  pcb_ground_plane_region,
  pcb_thermal_spoke,
  pcb_copper_pour,
  pcb_component_outside_board_error,
  pcb_component_not_on_board_edge_error,
  pcb_component_invalid_layer_error,
  pcb_courtyard_rect,
  pcb_courtyard_outline,
  pcb_courtyard_polygon,
  pcb_courtyard_circle,
  pcb_courtyard_pill,
  schematic_box,
  schematic_text,
  schematic_line,
  schematic_rect,
  schematic_circle,
  schematic_arc,
  schematic_component,
  schematic_symbol,
  schematic_port,
  schematic_trace,
  schematic_path,
  schematic_error,
  schematic_layout_error,
  schematic_net_label,
  schematic_debug_object,
  schematic_voltage_probe,
  schematic_manual_edit_conflict_warning,
  schematic_component_overlap_warning,
  schematic_component_styling_warning,
  schematic_sheet_styling_warning,
  schematic_missing_sheet_warning,
  schematic_element_outside_sheet_warning,
  schematic_graphic,
  schematic_group,
  schematic_sheet,
  schematic_table,
  schematic_table_cell,
  cad_component,
  cad_cable,
  cad_collision_error,
  simulation_voltage_source,
  simulation_current_source,
  simulation_experiment,
  simulation_return_current_excitation,
  simulation_pcb_return_current_result,
  simulation_pcb_return_current_field,
  simulation_pcb_return_current_heatmap,
  simulation_pcb_return_current_marker,
  simulation_transient_voltage_graph,
  simulation_transient_current_graph,
  simulation_dc_operating_point_voltage,
  simulation_dc_operating_point_current,
  simulation_dc_sweep_voltage_graph,
  simulation_dc_sweep_current_graph,
  simulation_ac_sweep_voltage_graph,
  simulation_ac_sweep_current_graph,
  simulation_parameter_sweep,
  simulation_switch,
  simulation_voltage_probe,
  simulation_current_probe,
  simulation_oscilloscope_trace,
  simulation_unknown_experiment_error,
  simulation_op_amp,
  simulation_spice_subcircuit
]);
expectTypesMatch(true);
expectStringUnionsMatch(true);

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
function pointInPolygon(point2, outline) {
  let inside = false;
  for (let cornerIndex = 0;cornerIndex < outline.length; cornerIndex++) {
    const start = outline[cornerIndex];
    const end = outline[(cornerIndex + 1) % outline.length];
    const cross = (point2.x - start.x) * (end.y - start.y) - (point2.y - start.y) * (end.x - start.x);
    if (Math.abs(cross) < 0.000000001 && point2.x >= Math.min(start.x, end.x) - 0.000000001 && point2.x <= Math.max(start.x, end.x) + 0.000000001 && point2.y >= Math.min(start.y, end.y) - 0.000000001 && point2.y <= Math.max(start.y, end.y) + 0.000000001)
      return true;
    if (start.y > point2.y !== end.y > point2.y && point2.x < start.x + (point2.y - start.y) * (end.x - start.x) / (end.y - start.y))
      inside = !inside;
  }
  return inside;
}
function pointInRegion(point2, region) {
  return pointInPolygon(point2, region.outer) && !region.holes.some((hole) => pointInPolygon(point2, hole)) && !(region.maskCutouts ?? []).some((hole) => pointInPolygon(point2, hole));
}
function isCopper(point2, geometry) {
  return pointInPolygon(point2, geometry.boardOutline) && !geometry.cutouts.some((cutout) => pointInPolygon(point2, cutout)) && geometry.groundRegions.some((region) => pointInRegion(point2, region));
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
    holes: pour.brep_shape.inner_rings.map((ring2) => flattenRing(ring2.vertices))
  };
}
function positiveFinite(number, label) {
  if (!Number.isFinite(number) || number <= 0)
    throw new Error(`${label} must be finite and greater than zero`);
  return number;
}
function validateOutline(outline) {
  if (outline.length < 3 || outline.some((point2) => !Number.isFinite(point2.x) || !Number.isFinite(point2.y)))
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
  for (const current2 of [
    ...reference.sourceCurrents,
    ...reference.loadCurrents
  ])
    if (![current2.real, current2.imag].every(Number.isFinite))
      throw new Error("Non-finite Palace port current");
}

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
  const rgb = stops[stopIndex].map((channel2, channelIndex) => Math.round(channel2 + blend * (stops[stopIndex + 1][channelIndex] - channel2)));
  return `#${rgb.map((channel2) => channel2.toString(16).padStart(2, "0")).join("")}`;
}

// ../simulate-return-current/lib/palace/geometry-signature.ts
function coordinate(number) {
  return (number === 0 ? 0 : number).toFixed(9);
}
function point2(point4) {
  return [coordinate(point4.x), coordinate(point4.y)];
}
function palaceGeometrySignature(geometry) {
  return JSON.stringify([
    geometry.boardOutline.map(point2),
    geometry.groundRegions.map((region) => [
      region.outer.map(point2),
      [...region.holes, ...region.maskCutouts ?? []].map((hole) => hole.map(point2))
    ]),
    geometry.cutouts.map((outline) => outline.map(point2)),
    geometry.signals.map((signal) => signal.route.filter((route) => route.route_type === "wire").map((route) => [
      ...point2(route),
      coordinate(route.width),
      route.layer
    ])),
    ...geometry.physicalModelSignature ? [geometry.physicalModelSignature] : [],
    geometry.excitations.map((excitation) => [
      coordinate(excitation.current),
      point2(excitation.return_source),
      point2(excitation.return_sink),
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

// ../simulate-return-current/lib/palace/normalize-layered-route.ts
function normalizeLayeredRoute(trace) {
  const route = [];
  for (const [index, point4] of trace.route.entries()) {
    if (point4.route_type === "wire") {
      route.push(point4);
      continue;
    }
    if (point4.route_type !== "via")
      throw new Error("Through-pad route points are not supported");
    const previous = route.at(-1);
    const next = trace.route[index + 1];
    if (!previous || previous.route_type !== "wire" || !next)
      throw new Error("Via needs signal route endpoints on both sides");
    if (previous.layer !== point4.from_layer)
      throw new Error("Via from_layer does not match preceding wire layer");
    if (previous.x !== point4.x || previous.y !== point4.y)
      route.push({
        route_type: "wire",
        x: point4.x,
        y: point4.y,
        width: previous.width,
        layer: point4.from_layer
      });
    route.push(point4);
    if (next.route_type !== "wire" || next.x !== point4.x || next.y !== point4.y)
      route.push({
        route_type: "wire",
        x: point4.x,
        y: point4.y,
        width: next.route_type === "wire" ? next.width : previous.width,
        layer: point4.to_layer
      });
  }
  return { ...trace, route };
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
  const length2 = Math.hypot(dx, dy);
  const transform = import_transformation_matrix2.compose(import_transformation_matrix2.translate((segment.start.x + segment.end.x) / 2, (segment.start.y + segment.end.y) / 2), import_transformation_matrix2.rotateDEG(Math.atan2(dy, dx) * 180 / Math.PI));
  return [-1, 1].flatMap((end) => Array.from({ length: 17 }, (_, index) => {
    const angle = index * Math.PI / 16 + (end === 1 ? -Math.PI / 2 : Math.PI / 2);
    return import_transformation_matrix2.applyToPoint(transform, {
      x: end * length2 / 2 + segment.width / 2 * Math.cos(angle),
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
function contains(point4, polygon) {
  return point4.x >= polygon.minX - 0.000000001 && point4.x <= polygon.maxX + 0.000000001 && point4.y >= polygon.minY - 0.000000001 && point4.y <= polygon.maxY + 0.000000001 && pointInPolygon(point4, polygon.outline);
}
function createSampleMask(geometry) {
  const board = boundedPolygon(geometry.boardOutline);
  const cutouts = geometry.cutouts.map(boundedPolygon);
  const regions = geometry.groundRegions.map((r) => ({
    outer: boundedPolygon(r.outer),
    holes: [...r.holes, ...r.maskCutouts ?? []].map(boundedPolygon)
  }));
  return (point4) => contains(point4, board) && !cutouts.some((cutout) => contains(point4, cutout)) && regions.some((r) => contains(point4, r.outer) && !r.holes.some((hole) => contains(point4, hole)));
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
    const current2 = parseCurrentAmps(excitation.current);
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
    const route = reverse ? trace.route.map((point4, routeIndex) => {
      if (point4.route_type === "via")
        return {
          ...point4,
          from_layer: point4.to_layer,
          to_layer: point4.from_layer
        };
      if (point4.route_type !== "wire")
        return point4;
      const previous = trace.route[Math.max(0, routeIndex - 1)];
      return {
        ...point4,
        width: previous.route_type === "wire" ? previous.width : point4.width,
        start_pcb_port_id: point4.end_pcb_port_id,
        end_pcb_port_id: point4.start_pcb_port_id
      };
    }).reverse() : trace.route;
    oriented.set(trace.pcb_trace_id, { ...trace, route });
    excitations.push({
      type: "simulation_return_current_excitation",
      simulation_return_current_excitation_id: `simulation_return_current_excitation_${index}`,
      pcb_trace_id: trace.pcb_trace_id,
      ground_source_net_id: groundId,
      current: current2,
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

// ../simulate-return-current/lib/circuit-json-experiment.ts
var id = (prefix) => `${prefix}_${globalThis.crypto.randomUUID()}`;
function assertUniqueIds(circuitJson) {
  const ids = new Set;
  for (const element of circuitJson) {
    const key = `${element.type}_id`;
    const value = element[key];
    if (typeof value !== "string")
      continue;
    if (ids.has(value))
      throw new Error(`Duplicate circuit-json ID: ${value}`);
    ids.add(value);
  }
}
function pourContact(circuitJson, point4, layer, groundNetId) {
  const pours = circuitJson.filter((e) => {
    if (e.type !== "pcb_copper_pour" || e.layer !== layer || e.source_net_id !== groundNetId)
      return false;
    const region = pourRegion(e);
    return pointInPolygon(point4, region.outer) && !region.holes.some((h) => pointInPolygon(point4, h));
  });
  if (!pours.length || pours[0].type !== "pcb_copper_pour")
    throw new Error(`Return contact at (${point4.x}, ${point4.y}) on ${layer} needs an identified ground PCB port, via, or copper pour; legacy ground-plane regions cannot identify a PR887 contact`);
  return {
    ...point4,
    layer,
    contact_type: "pcb_copper_pour",
    pcb_copper_pour_id: pours[0].pcb_copper_pour_id
  };
}
function createReturnCurrentExperiment(options) {
  assertUniqueIds(options.circuitJson);
  const experimentId = options.experimentId ?? id("simulation_experiment");
  if (options.circuitJson.some((e) => e.type === "simulation_experiment" && e.simulation_experiment_id === experimentId))
    throw new Error(`Experiment ${experimentId} already exists; select it without named flags or choose a new ID`);
  const generated = withNamedExcitations(options);
  const official = generated.filter((e) => e.type === "simulation_return_current_excitation").map((e) => {
    const contact = (point4, terminal) => terminal?.reference_pcb_port_id ? {
      ...point4,
      layer: terminal.reference_layer,
      contact_type: "pcb_port",
      pcb_port_id: terminal.reference_pcb_port_id
    } : pourContact(generated, point4, terminal?.reference_layer ?? options.referenceLayer ?? "bottom", e.ground_source_net_id);
    return simulation_return_current_excitation.parse({
      ...e,
      simulation_return_current_excitation_id: id("simulation_return_current_excitation"),
      simulation_experiment_id: experimentId,
      return_source: contact(e.return_source, e.load_port),
      return_sink: contact(e.return_sink, e.source_port)
    });
  });
  const experiment = simulation_experiment.parse({
    type: "simulation_experiment",
    simulation_experiment_id: experimentId,
    name: options.name ?? "PCB return current",
    experiment_type: "pcb_return_current"
  });
  return [...options.circuitJson, experiment, ...official];
}
function validateContact(circuitJson, contact, groundId) {
  if (contact.contact_type === "pcb_port") {
    const port = circuitJson.find((e) => e.type === "pcb_port" && e.pcb_port_id === contact.pcb_port_id);
    if (!port || port.type !== "pcb_port" || !port.layers.includes(contact.layer) || Math.hypot(port.x - contact.x, port.y - contact.y) > 0.000001)
      throw new Error(`Return PCB port ${contact.pcb_port_id} does not match contact location/layer`);
    if (!portNetIds(circuitJson, port.source_port_id).includes(groundId))
      throw new Error(`Return PCB port ${contact.pcb_port_id} is not on the selected ground net`);
  } else if (contact.contact_type === "pcb_via") {
    const via = circuitJson.find((e) => e.type === "pcb_via" && e.pcb_via_id === contact.pcb_via_id);
    if (!via || via.type !== "pcb_via" || !via.layers.includes(contact.layer) || Math.hypot(via.x - contact.x, via.y - contact.y) > 0.000001)
      throw new Error(`Return PCB via ${contact.pcb_via_id} does not match contact location/layer`);
    if (via.source_net_id !== groundId)
      throw new Error(`Return PCB via ${contact.pcb_via_id} needs explicit selected-ground ownership`);
  } else {
    const pour = circuitJson.find((e) => e.type === "pcb_copper_pour" && e.pcb_copper_pour_id === contact.pcb_copper_pour_id);
    if (!pour || pour.type !== "pcb_copper_pour" || pour.layer !== contact.layer || pour.source_net_id !== groundId)
      throw new Error(`Return copper pour ${contact.pcb_copper_pour_id} is missing or not on the selected ground/layer`);
    const region = pourRegion(pour);
    if (!pointInPolygon(contact, region.outer) || region.holes.some((h) => pointInPolygon(contact, h)))
      throw new Error(`Return contact is outside copper pour ${contact.pcb_copper_pour_id}`);
  }
}
function selectReturnCurrentExperiment(options) {
  const { circuitJson } = options;
  assertUniqueIds(circuitJson);
  if (circuitJson.filter((e) => e.type === "pcb_board").length !== 1)
    throw new Error("Exactly one PCB board is required");
  const experiments = circuitJson.filter((e) => e.type === "simulation_experiment" && e.experiment_type === "pcb_return_current" && (!options.experimentId || e.simulation_experiment_id === options.experimentId));
  if (experiments.length !== 1 || experiments[0].type !== "simulation_experiment")
    throw new Error(`Select exactly one pcb_return_current experiment with --experiment-id; found ${experiments.length}`);
  const experiment = simulation_experiment.parse(experiments[0]);
  const excitations = circuitJson.filter((e) => e.type === "simulation_return_current_excitation" && e.simulation_experiment_id === experiment.simulation_experiment_id).map((e) => simulation_return_current_excitation.parse(e));
  if (!excitations.length)
    throw new Error(`Experiment ${experiment.simulation_experiment_id} has no excitations`);
  if (new Set(excitations.map((e) => e.ground_source_net_id)).size !== 1)
    throw new Error("Selected excitations must share one ground net");
  if (new Set(excitations.map((e) => e.pcb_trace_id)).size !== excitations.length)
    throw new Error("Selected excitations must reference distinct signal traces");
  const oriented = new Map;
  for (const excitation of excitations) {
    const originalTrace = circuitJson.find((e) => e.type === "pcb_trace" && e.pcb_trace_id === excitation.pcb_trace_id);
    if (!originalTrace || originalTrace.type !== "pcb_trace")
      throw new Error(`Missing signal trace ${excitation.pcb_trace_id}`);
    let trace = normalizeLayeredRoute(originalTrace);
    if (excitation.source_port) {
      const sourcePort = circuitJson.find((e) => e.type === "pcb_port" && e.pcb_port_id === excitation.source_port.signal_pcb_port_id);
      const first = trace.route[0], last = trace.route.at(-1);
      if (sourcePort?.type === "pcb_port" && last?.route_type === "wire" && Math.hypot(sourcePort.x - last.x, sourcePort.y - last.y) < 0.000001 && !(first?.route_type === "wire" && Math.hypot(sourcePort.x - first.x, sourcePort.y - first.y) < 0.000001))
        trace = {
          ...trace,
          route: trace.route.map((point4, index) => {
            if (point4.route_type === "via")
              return {
                ...point4,
                from_layer: point4.to_layer,
                to_layer: point4.from_layer
              };
            if (point4.route_type !== "wire")
              return point4;
            const previous = trace.route[Math.max(0, index - 1)];
            return {
              ...point4,
              width: previous.route_type === "wire" ? previous.width : point4.width,
              start_pcb_port_id: point4.end_pcb_port_id,
              end_pcb_port_id: point4.start_pcb_port_id
            };
          }).reverse()
        };
    }
    oriented.set(trace.pcb_trace_id, trace);
    if (!circuitJson.some((e) => e.type === "source_net" && e.source_net_id === excitation.ground_source_net_id))
      throw new Error(`Missing ground net ${excitation.ground_source_net_id}`);
    validateContact(circuitJson, excitation.return_source, excitation.ground_source_net_id);
    validateContact(circuitJson, excitation.return_sink, excitation.ground_source_net_id);
    for (const [terminal, contact, endpoint] of [
      [excitation.source_port, excitation.return_sink, trace.route[0]],
      [excitation.load_port, excitation.return_source, trace.route.at(-1)]
    ]) {
      if (!terminal) {
        if (contact.contact_type === "pcb_port" || contact.layer !== "bottom")
          throw new Error("An identified return PCB port or non-bottom reference requires explicit source_port/load_port terminal metadata");
        continue;
      }
      if (contact.contact_type === "pcb_port" && terminal.reference_pcb_port_id !== contact.pcb_port_id)
        throw new Error("A PCB-port return contact requires its matching reference_pcb_port_id");
      if (terminal.reference_layer !== contact.layer || terminal.reference_pcb_port_id !== undefined && (contact.contact_type !== "pcb_port" || terminal.reference_pcb_port_id !== contact.pcb_port_id))
        throw new Error("Terminal reference must match the identified return contact");
      const port = circuitJson.find((e) => e.type === "pcb_port" && e.pcb_port_id === terminal.signal_pcb_port_id);
      if (!port || port.type !== "pcb_port" || endpoint?.route_type !== "wire" || !port.layers.includes(endpoint.layer) || Math.hypot(port.x - endpoint.x, port.y - endpoint.y) > 0.000001)
        throw new Error("Signal terminal must match the source/load trace endpoint");
      if (terminal.signal_pcb_port_id === terminal.reference_pcb_port_id)
        throw new Error("Signal and reference terminals must be different ports");
    }
    if ([excitation.return_source, excitation.return_sink].some((c) => c.contact_type === "pcb_via"))
      throw new Error("Via return contacts are not supported by the current solver adapter; use a PCB port or copper-pour contact");
  }
  return {
    experiment,
    excitations,
    solverCircuitJson: circuitJson.map((e) => e.type === "pcb_trace" ? oriented.get(e.pcb_trace_id) ?? e : e)
  };
}

// ../simulate-return-current/lib/circuit-json-simulation.ts
function fabricationStackup(model) {
  if (!model.multilayer)
    return;
  const stackup = model.multilayer.stackup;
  return {
    nominalBoardThicknessMm: stackup.nominalBoardThicknessMm,
    layers: [
      ...stackup.copperLayers.map((foil) => ({
        z: foil.zMax,
        value: { name: foil.name, copperThicknessMm: foil.zMax - foil.zMin }
      })),
      ...stackup.dielectrics.map((d) => ({
        z: d.zMax,
        value: {
          material: d.material,
          dielectricThicknessMm: d.zMax - d.zMin,
          dielectricConstant: d.dielectricConstant,
          lossTangent: d.lossTangent
        }
      }))
    ].sort((a, b) => b.z - a.z).map((l) => l.value)
  };
}
var id2 = (prefix) => `${prefix}_${randomUUID()}`;
function markersFor(circuitJson, excitations, resultId) {
  const markers = [];
  const portMarker = (role, portId, layer) => {
    markers.push(simulation_pcb_return_current_marker.parse({
      type: "simulation_pcb_return_current_marker",
      simulation_pcb_return_current_marker_id: id2("simulation_pcb_return_current_marker"),
      simulation_pcb_return_current_result_id: resultId,
      role,
      target_type: "pcb_port",
      pcb_port_id: portId,
      layer,
      label: role.replaceAll("_", " ")
    }));
  };
  for (const excitation of excitations) {
    const trace = circuitJson.find((e) => e.type === "pcb_trace" && e.pcb_trace_id === excitation.pcb_trace_id);
    for (const [role, terminal, endpoint] of [
      ["signal_source", excitation.source_port, trace.route[0]],
      ["signal_load", excitation.load_port, trace.route.at(-1)]
    ])
      if (terminal && endpoint?.route_type === "wire")
        portMarker(role, terminal.signal_pcb_port_id, endpoint.layer);
    for (const [role, contact] of [
      ["return_source", excitation.return_source],
      ["return_sink", excitation.return_sink]
    ])
      if (contact.contact_type === "pcb_port")
        portMarker(role, contact.pcb_port_id, contact.layer);
    for (const point4 of trace.route) {
      if (point4.route_type !== "via")
        continue;
      const via = circuitJson.find((e) => e.type === "pcb_via" && Math.hypot(e.x - point4.x, e.y - point4.y) < 0.000001 && e.pcb_trace_id === trace.pcb_trace_id && e.layers.includes(point4.from_layer) && e.layers.includes(point4.to_layer));
      if (!via || via.type !== "pcb_via")
        continue;
      markers.push(simulation_pcb_return_current_marker.parse({
        type: "simulation_pcb_return_current_marker",
        simulation_pcb_return_current_marker_id: id2("simulation_pcb_return_current_marker"),
        simulation_pcb_return_current_result_id: resultId,
        role: "signal_transition",
        target_type: "pcb_via",
        pcb_via_id: via.pcb_via_id,
        from_layer: point4.from_layer,
        to_layer: point4.to_layer,
        label: `signal via: ${point4.from_layer} ↔ ${point4.to_layer}`
      }));
    }
  }
  return markers;
}
function exportReturnCurrentCircuitJson(options) {
  const selected = selectReturnCurrentExperiment(options);
  const backendExcitations = "reference" in options.simulation ? options.simulation.model.geometry.excitations : options.simulation.geometry.excitations;
  if (backendExcitations.length !== selected.excitations.length || backendExcitations.some((e, i) => JSON.stringify(simulation_return_current_excitation.parse(e)) !== JSON.stringify(selected.excitations[i])))
    throw new Error("Result is stale: selected excitation current, contacts, or terminal metadata changed");
  const resultId = options.resultId ?? id2("simulation_pcb_return_current_result");
  const frequencyHz = "reference" in options.simulation ? options.simulation.reference.frequencyHz : undefined;
  const oldIds = new Set(options.circuitJson.flatMap((e) => e.type === "simulation_pcb_return_current_result" && e.simulation_experiment_id === options.experimentId && e.frequency_hz === frequencyHz ? [e.simulation_pcb_return_current_result_id] : []));
  if (options.circuitJson.some((e) => e.type === "simulation_pcb_return_current_result" && e.simulation_pcb_return_current_result_id === resultId && !oldIds.has(resultId)))
    throw new Error(`Result ID ${resultId} belongs to another experiment/frequency`);
  const circuitJson = options.circuitJson.filter((e) => e.type === "simulation_pcb_return_current_result" ? !oldIds.has(e.simulation_pcb_return_current_result_id) : ("simulation_pcb_return_current_result_id" in e) ? !oldIds.has(String(e.simulation_pcb_return_current_result_id)) : true);
  const board = circuitJson.find((e) => e.type === "pcb_board");
  if (board.type !== "pcb_board")
    throw new Error("Missing PCB board");
  const fieldId = id2("simulation_pcb_return_current_field");
  let grid;
  let metadata;
  if ("reference" in options.simulation) {
    const { model, reference } = options.simulation;
    validatePalaceReference(reference);
    if (reference.columns * reference.rows > 1e6)
      throw new Error("The result grid exceeds 1,000,000 cells");
    if (reference.frequencyHz !== model.frequencyHz)
      throw new Error("Palace model/reference frequencies differ");
    if (reference.copperModel !== model.copperModel)
      throw new Error("Palace model/reference copper models differ");
    if (reference.copperThickness !== model.copperThickness)
      throw new Error("Palace model/reference copper thicknesses differ");
    if (model.geometry.excitations.map((e) => e.simulation_return_current_excitation_id).join() !== selected.excitations.map((e) => e.simulation_return_current_excitation_id).join())
      throw new Error("Palace model does not contain exactly the selected experiment excitations");
    if (reference.provenance.geometrySignature !== palaceGeometrySignature(model.geometry))
      throw new Error("Palace reference provenance does not match its model geometry");
    const expected = createPalaceModel({
      circuitJson: selected.solverCircuitJson,
      excitations: selected.excitations,
      frequencyHz: model.frequencyHz,
      stackup: fabricationStackup(model),
      sampleLayer: reference.sampleLayer ?? "bottom",
      viaClearance: model.multilayer?.viaClearance,
      ...model.multilayer ? {} : {
        layerSeparation: model.layerSeparation,
        copperThickness: model.copperThickness
      },
      copperConductivity: model.copperConductivity,
      substratePermittivity: model.substratePermittivity,
      substrateLossTangent: model.substrateLossTangent,
      portResistance: model.portResistance,
      portWidth: model.portWidth,
      meshSize: model.meshSize,
      copperModel: model.copperModel,
      airPadding: model.airPadding,
      order: model.order
    });
    if (palaceGeometrySignature(expected.geometry) !== palaceGeometrySignature(model.geometry))
      throw new Error("Palace result is stale: input geometry, current, contacts, or termination changed");
    const minX = Math.min(...model.geometry.boardOutline.map((p) => p.x));
    const minY = Math.min(...model.geometry.boardOutline.map((p) => p.y));
    metadata = {
      layer: reference.sampleLayer ?? "bottom",
      source_net_id: selected.excitations[0].ground_source_net_id,
      field_type: "complex_phasor",
      min_x: minX,
      min_y: minY,
      columns: reference.columns,
      rows: reference.rows,
      cell_width: reference.cellWidth,
      cell_height: reference.cellHeight,
      copper_thickness: reference.copperThickness
    };
    const blank = () => Array(reference.columns * reference.rows).fill(null);
    grid = {
      field_type: "complex_phasor",
      sheet_current_x_real: blank(),
      sheet_current_x_imag: blank(),
      sheet_current_y_real: blank(),
      sheet_current_y_imag: blank()
    };
    const seen = new Set;
    const containsCopper = createSampleMask(model.geometry);
    for (const sample of reference.samples) {
      const column = Math.round((sample.x - minX) / reference.cellWidth - 0.5);
      const row = Math.round((sample.y - minY) / reference.cellHeight - 0.5);
      if (column < 0 || column >= reference.columns || row < 0 || row >= reference.rows || Math.abs(sample.x - (minX + (column + 0.5) * reference.cellWidth)) > 0.000001 || Math.abs(sample.y - (minY + (row + 0.5) * reference.cellHeight)) > 0.000001)
        throw new Error("Palace sample is not aligned with its declared grid");
      const index = row * reference.columns + column;
      if (!containsCopper(sample))
        throw new Error("Palace sample lies outside the reference conductor mask");
      if (seen.has(index))
        throw new Error("Duplicate Palace grid cell");
      seen.add(index);
      grid.sheet_current_x_real[index] = sample.sheetCurrentXReal;
      grid.sheet_current_x_imag[index] = sample.sheetCurrentXImag;
      grid.sheet_current_y_real[index] = sample.sheetCurrentYReal;
      grid.sheet_current_y_imag[index] = sample.sheetCurrentYImag;
    }
    for (let row = 0;row < reference.rows; row++)
      for (let column = 0;column < reference.columns; column++)
        if (containsCopper({
          x: minX + (column + 0.5) * reference.cellWidth,
          y: minY + (row + 0.5) * reference.cellHeight
        }) !== seen.has(row * reference.columns + column))
          throw new Error("Palace samples do not cover exactly the declared conductor mask");
  } else {
    const result2 = options.simulation;
    if (!result2.diagnostics.converged)
      throw new Error("Cannot export an unconverged approximation");
    if (result2.columns * result2.rows > 1e6)
      throw new Error("The result grid exceeds 1,000,000 cells");
    if (result2.geometry.excitations.map((e) => e.simulation_return_current_excitation_id).join() !== selected.excitations.map((e) => e.simulation_return_current_excitation_id).join())
      throw new Error("Approximation does not contain exactly the selected experiment excitations");
    const expected = readGeometry({
      circuitJson: selected.solverCircuitJson,
      excitations: selected.excitations
    });
    if (palaceGeometrySignature(expected) !== palaceGeometrySignature(result2.geometry))
      throw new Error("Approximation result is stale: input geometry, current, contacts, or termination changed");
    metadata = {
      layer: "bottom",
      source_net_id: selected.excitations[0].ground_source_net_id,
      field_type: "real",
      min_x: result2.bounds.minX,
      min_y: result2.bounds.minY,
      columns: result2.columns,
      rows: result2.rows,
      cell_width: result2.cellWidth,
      cell_height: result2.cellHeight,
      copper_thickness: result2.copperThickness
    };
    grid = {
      field_type: "real",
      sheet_current_x: Array(result2.columns * result2.rows).fill(null),
      sheet_current_y: Array(result2.columns * result2.rows).fill(null)
    };
    const seen = new Set;
    for (const node of result2.nodes) {
      const index = node.row * result2.columns + node.column;
      if (!Number.isInteger(node.column) || !Number.isInteger(node.row) || node.column < 0 || node.column >= result2.columns || node.row < 0 || node.row >= result2.rows || seen.has(index))
        throw new Error("Invalid approximation grid node");
      seen.add(index);
      grid.sheet_current_x[index] = node.sheetCurrentX;
      grid.sheet_current_y[index] = node.sheetCurrentY;
    }
  }
  getSimulationReturnCurrentGridJsonSchema(metadata).parse(grid);
  const format = options.fieldFormat ?? "gzip";
  if (format !== "gzip" && format !== "json")
    throw new Error("fieldFormat must be gzip or json");
  const mime = format === "gzip" ? "application/gzip" : "application/json";
  const bytes = Buffer.from(JSON.stringify(grid));
  const assetBytes = format === "gzip" ? gzipSync(bytes) : bytes;
  const field = simulation_pcb_return_current_field.parse({
    ...metadata,
    type: "simulation_pcb_return_current_field",
    simulation_pcb_return_current_field_id: fieldId,
    simulation_pcb_return_current_result_id: resultId,
    data_format: "simulation_return_current_grid_json_v1",
    field_asset: {
      project_relative_path: `simulation/${fieldId}.json${format === "gzip" ? ".gz" : ""}`,
      mimetype: mime,
      url: `data:${mime};base64,${assetBytes.toString("base64")}`
    }
  });
  const maxX = metadata.min_x + metadata.columns * metadata.cell_width;
  const maxY = metadata.min_y + metadata.rows * metadata.cell_height;
  const magnitudes = Array.from({ length: metadata.columns * metadata.rows }, (_, index) => {
    if (grid.field_type === "real")
      return grid.sheet_current_x[index] === null ? null : Math.hypot(grid.sheet_current_x[index], grid.sheet_current_y[index]) / metadata.copper_thickness;
    return grid.sheet_current_x_real[index] === null ? null : Math.hypot(grid.sheet_current_x_real[index], grid.sheet_current_x_imag[index], grid.sheet_current_y_real[index], grid.sheet_current_y_imag[index]) / metadata.copper_thickness;
  });
  const maximum = magnitudes.reduce((max, value) => Math.max(max, value ?? 0), 0);
  const rectangles = magnitudes.flatMap((magnitude, index) => magnitude === null ? [] : [
    `<rect x="${index % metadata.columns}" y="${metadata.rows - 1 - Math.floor(index / metadata.columns)}" width="1" height="1" fill="${currentColor(maximum > 0 ? magnitude / maximum : 0)}"/>`
  ]).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${metadata.columns}" height="${metadata.rows}" viewBox="0 0 ${metadata.columns} ${metadata.rows}">${rectangles}</svg>`;
  const png = new Resvg(svg).render().asPng();
  const heatmapId = id2("simulation_pcb_return_current_heatmap");
  const heatmap = simulation_pcb_return_current_heatmap.parse({
    type: "simulation_pcb_return_current_heatmap",
    simulation_pcb_return_current_heatmap_id: heatmapId,
    simulation_pcb_return_current_result_id: resultId,
    layer: metadata.layer,
    source_net_id: metadata.source_net_id,
    min_x: metadata.min_x,
    min_y: metadata.min_y,
    max_x: maxX,
    max_y: maxY,
    image_asset: {
      project_relative_path: `simulation/${heatmapId}.png`,
      mimetype: "image/png",
      url: `data:image/png;base64,${Buffer.from(png).toString("base64")}`
    }
  });
  const result = simulation_pcb_return_current_result.parse({
    type: "simulation_pcb_return_current_result",
    simulation_pcb_return_current_result_id: resultId,
    simulation_experiment_id: options.experimentId,
    pcb_board_id: board.pcb_board_id,
    simulation_return_current_excitation_ids: selected.excitations.map((e) => e.simulation_return_current_excitation_id),
    ...frequencyHz === undefined ? {} : { frequency_hz: frequencyHz }
  });
  return [
    ...circuitJson,
    result,
    field,
    heatmap,
    ...markersFor(selected.solverCircuitJson, selected.excitations, resultId)
  ];
}
export {
  createReturnCurrentExperiment,
  exportReturnCurrentCircuitJson,
  selectReturnCurrentExperiment
};
