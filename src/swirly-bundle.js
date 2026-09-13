(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };

  // ../swirly/node_modules/rusha/dist/rusha.js
  var require_rusha = __commonJS({
    "../swirly/node_modules/rusha/dist/rusha.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["Rusha"] = factory();
        else
          root["Rusha"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return (
          /******/
          function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module2 = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
              };
              modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
              module2.l = true;
              return module2.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports2, name, getter) {
              if (!__webpack_require__.o(exports2, name)) {
                Object.defineProperty(exports2, name, {
                  /******/
                  configurable: false,
                  /******/
                  enumerable: true,
                  /******/
                  get: getter
                  /******/
                });
              }
            };
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                /******/
                function getDefault() {
                  return module2["default"];
                }
              ) : (
                /******/
                function getModuleExports() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 3);
          }([
            /* 0 */
            /***/
            function(module2, exports2, __webpack_require__) {
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              var RushaCore = __webpack_require__(5);
              var _require = __webpack_require__(1), toHex = _require.toHex, ceilHeapSize = _require.ceilHeapSize;
              var conv = __webpack_require__(6);
              var padlen = function(len) {
                for (len += 9; len % 64 > 0; len += 1) {
                }
                return len;
              };
              var padZeroes = function(bin, len) {
                var h8 = new Uint8Array(bin.buffer);
                var om = len % 4, align = len - om;
                switch (om) {
                  case 0:
                    h8[align + 3] = 0;
                  case 1:
                    h8[align + 2] = 0;
                  case 2:
                    h8[align + 1] = 0;
                  case 3:
                    h8[align + 0] = 0;
                }
                for (var i = (len >> 2) + 1; i < bin.length; i++) {
                  bin[i] = 0;
                }
              };
              var padData = function(bin, chunkLen, msgLen) {
                bin[chunkLen >> 2] |= 128 << 24 - (chunkLen % 4 << 3);
                bin[((chunkLen >> 2) + 2 & ~15) + 14] = msgLen / (1 << 29) | 0;
                bin[((chunkLen >> 2) + 2 & ~15) + 15] = msgLen << 3;
              };
              var getRawDigest = function(heap, padMaxChunkLen) {
                var io = new Int32Array(heap, padMaxChunkLen + 320, 5);
                var out = new Int32Array(5);
                var arr = new DataView(out.buffer);
                arr.setInt32(0, io[0], false);
                arr.setInt32(4, io[1], false);
                arr.setInt32(8, io[2], false);
                arr.setInt32(12, io[3], false);
                arr.setInt32(16, io[4], false);
                return out;
              };
              var Rusha = function() {
                function Rusha2(chunkSize) {
                  _classCallCheck(this, Rusha2);
                  chunkSize = chunkSize || 64 * 1024;
                  if (chunkSize % 64 > 0) {
                    throw new Error("Chunk size must be a multiple of 128 bit");
                  }
                  this._offset = 0;
                  this._maxChunkLen = chunkSize;
                  this._padMaxChunkLen = padlen(chunkSize);
                  this._heap = new ArrayBuffer(ceilHeapSize(this._padMaxChunkLen + 320 + 20));
                  this._h32 = new Int32Array(this._heap);
                  this._h8 = new Int8Array(this._heap);
                  this._core = new RushaCore({ Int32Array }, {}, this._heap);
                }
                Rusha2.prototype._initState = function _initState(heap, padMsgLen) {
                  this._offset = 0;
                  var io = new Int32Array(heap, padMsgLen + 320, 5);
                  io[0] = 1732584193;
                  io[1] = -271733879;
                  io[2] = -1732584194;
                  io[3] = 271733878;
                  io[4] = -1009589776;
                };
                Rusha2.prototype._padChunk = function _padChunk(chunkLen, msgLen) {
                  var padChunkLen = padlen(chunkLen);
                  var view = new Int32Array(this._heap, 0, padChunkLen >> 2);
                  padZeroes(view, chunkLen);
                  padData(view, chunkLen, msgLen);
                  return padChunkLen;
                };
                Rusha2.prototype._write = function _write(data, chunkOffset, chunkLen, off) {
                  conv(data, this._h8, this._h32, chunkOffset, chunkLen, off || 0);
                };
                Rusha2.prototype._coreCall = function _coreCall(data, chunkOffset, chunkLen, msgLen, finalize) {
                  var padChunkLen = chunkLen;
                  this._write(data, chunkOffset, chunkLen);
                  if (finalize) {
                    padChunkLen = this._padChunk(chunkLen, msgLen);
                  }
                  this._core.hash(padChunkLen, this._padMaxChunkLen);
                };
                Rusha2.prototype.rawDigest = function rawDigest(str) {
                  var msgLen = str.byteLength || str.length || str.size || 0;
                  this._initState(this._heap, this._padMaxChunkLen);
                  var chunkOffset = 0, chunkLen = this._maxChunkLen;
                  for (chunkOffset = 0; msgLen > chunkOffset + chunkLen; chunkOffset += chunkLen) {
                    this._coreCall(str, chunkOffset, chunkLen, msgLen, false);
                  }
                  this._coreCall(str, chunkOffset, msgLen - chunkOffset, msgLen, true);
                  return getRawDigest(this._heap, this._padMaxChunkLen);
                };
                Rusha2.prototype.digest = function digest(str) {
                  return toHex(this.rawDigest(str).buffer);
                };
                Rusha2.prototype.digestFromString = function digestFromString(str) {
                  return this.digest(str);
                };
                Rusha2.prototype.digestFromBuffer = function digestFromBuffer(str) {
                  return this.digest(str);
                };
                Rusha2.prototype.digestFromArrayBuffer = function digestFromArrayBuffer(str) {
                  return this.digest(str);
                };
                Rusha2.prototype.resetState = function resetState() {
                  this._initState(this._heap, this._padMaxChunkLen);
                  return this;
                };
                Rusha2.prototype.append = function append(chunk) {
                  var chunkOffset = 0;
                  var chunkLen = chunk.byteLength || chunk.length || chunk.size || 0;
                  var turnOffset = this._offset % this._maxChunkLen;
                  var inputLen = void 0;
                  this._offset += chunkLen;
                  while (chunkOffset < chunkLen) {
                    inputLen = Math.min(chunkLen - chunkOffset, this._maxChunkLen - turnOffset);
                    this._write(chunk, chunkOffset, inputLen, turnOffset);
                    turnOffset += inputLen;
                    chunkOffset += inputLen;
                    if (turnOffset === this._maxChunkLen) {
                      this._core.hash(this._maxChunkLen, this._padMaxChunkLen);
                      turnOffset = 0;
                    }
                  }
                  return this;
                };
                Rusha2.prototype.getState = function getState() {
                  var turnOffset = this._offset % this._maxChunkLen;
                  var heap = void 0;
                  if (!turnOffset) {
                    var io = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
                    heap = io.buffer.slice(io.byteOffset, io.byteOffset + io.byteLength);
                  } else {
                    heap = this._heap.slice(0);
                  }
                  return {
                    offset: this._offset,
                    heap
                  };
                };
                Rusha2.prototype.setState = function setState(state) {
                  this._offset = state.offset;
                  if (state.heap.byteLength === 20) {
                    var io = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
                    io.set(new Int32Array(state.heap));
                  } else {
                    this._h32.set(new Int32Array(state.heap));
                  }
                  return this;
                };
                Rusha2.prototype.rawEnd = function rawEnd() {
                  var msgLen = this._offset;
                  var chunkLen = msgLen % this._maxChunkLen;
                  var padChunkLen = this._padChunk(chunkLen, msgLen);
                  this._core.hash(padChunkLen, this._padMaxChunkLen);
                  var result = getRawDigest(this._heap, this._padMaxChunkLen);
                  this._initState(this._heap, this._padMaxChunkLen);
                  return result;
                };
                Rusha2.prototype.end = function end() {
                  return toHex(this.rawEnd().buffer);
                };
                return Rusha2;
              }();
              module2.exports = Rusha;
              module2.exports._core = RushaCore;
            },
            /* 1 */
            /***/
            function(module2, exports2) {
              var precomputedHex = new Array(256);
              for (var i = 0; i < 256; i++) {
                precomputedHex[i] = (i < 16 ? "0" : "") + i.toString(16);
              }
              module2.exports.toHex = function(arrayBuffer) {
                var binarray = new Uint8Array(arrayBuffer);
                var res = new Array(arrayBuffer.byteLength);
                for (var _i = 0; _i < res.length; _i++) {
                  res[_i] = precomputedHex[binarray[_i]];
                }
                return res.join("");
              };
              module2.exports.ceilHeapSize = function(v) {
                var p = 0;
                if (v <= 65536)
                  return 65536;
                if (v < 16777216) {
                  for (p = 1; p < v; p = p << 1) {
                  }
                } else {
                  for (p = 16777216; p < v; p += 16777216) {
                  }
                }
                return p;
              };
              module2.exports.isDedicatedWorkerScope = function(self2) {
                var isRunningInWorker = "WorkerGlobalScope" in self2 && self2 instanceof self2.WorkerGlobalScope;
                var isRunningInSharedWorker = "SharedWorkerGlobalScope" in self2 && self2 instanceof self2.SharedWorkerGlobalScope;
                var isRunningInServiceWorker = "ServiceWorkerGlobalScope" in self2 && self2 instanceof self2.ServiceWorkerGlobalScope;
                return isRunningInWorker && !isRunningInSharedWorker && !isRunningInServiceWorker;
              };
            },
            /* 2 */
            /***/
            function(module2, exports2, __webpack_require__) {
              module2.exports = function() {
                var Rusha = __webpack_require__(0);
                var hashData = function(hasher, data, cb) {
                  try {
                    return cb(null, hasher.digest(data));
                  } catch (e) {
                    return cb(e);
                  }
                };
                var hashFile = function(hasher, readTotal, blockSize, file, cb) {
                  var reader = new self.FileReader();
                  reader.onloadend = function onloadend() {
                    if (reader.error) {
                      return cb(reader.error);
                    }
                    var buffer = reader.result;
                    readTotal += reader.result.byteLength;
                    try {
                      hasher.append(buffer);
                    } catch (e) {
                      cb(e);
                      return;
                    }
                    if (readTotal < file.size) {
                      hashFile(hasher, readTotal, blockSize, file, cb);
                    } else {
                      cb(null, hasher.end());
                    }
                  };
                  reader.readAsArrayBuffer(file.slice(readTotal, readTotal + blockSize));
                };
                var workerBehaviourEnabled = true;
                self.onmessage = function(event) {
                  if (!workerBehaviourEnabled) {
                    return;
                  }
                  var data = event.data.data, file = event.data.file, id = event.data.id;
                  if (typeof id === "undefined")
                    return;
                  if (!file && !data)
                    return;
                  var blockSize = event.data.blockSize || 4 * 1024 * 1024;
                  var hasher = new Rusha(blockSize);
                  hasher.resetState();
                  var done = function(err, hash) {
                    if (!err) {
                      self.postMessage({ id, hash });
                    } else {
                      self.postMessage({ id, error: err.name });
                    }
                  };
                  if (data)
                    hashData(hasher, data, done);
                  if (file)
                    hashFile(hasher, 0, blockSize, file, done);
                };
                return function() {
                  workerBehaviourEnabled = false;
                };
              };
            },
            /* 3 */
            /***/
            function(module2, exports2, __webpack_require__) {
              var work = __webpack_require__(4);
              var Rusha = __webpack_require__(0);
              var createHash = __webpack_require__(7);
              var runWorker = __webpack_require__(2);
              var _require = __webpack_require__(1), isDedicatedWorkerScope = _require.isDedicatedWorkerScope;
              var isRunningInDedicatedWorker = typeof self !== "undefined" && isDedicatedWorkerScope(self);
              Rusha.disableWorkerBehaviour = isRunningInDedicatedWorker ? runWorker() : function() {
              };
              Rusha.createWorker = function() {
                var worker = work(
                  /*require.resolve*/
                  2
                );
                var terminate = worker.terminate;
                worker.terminate = function() {
                  URL.revokeObjectURL(worker.objectURL);
                  terminate.call(worker);
                };
                return worker;
              };
              Rusha.createHash = createHash;
              module2.exports = Rusha;
            },
            /* 4 */
            /***/
            function(module2, exports2, __webpack_require__) {
              function webpackBootstrapFunc(modules) {
                var installedModules = {};
                function __webpack_require__2(moduleId) {
                  if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                  var module3 = installedModules[moduleId] = {
                    /******/
                    i: moduleId,
                    /******/
                    l: false,
                    /******/
                    exports: {}
                    /******/
                  };
                  modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__2);
                  module3.l = true;
                  return module3.exports;
                }
                __webpack_require__2.m = modules;
                __webpack_require__2.c = installedModules;
                __webpack_require__2.i = function(value) {
                  return value;
                };
                __webpack_require__2.d = function(exports3, name, getter) {
                  if (!__webpack_require__2.o(exports3, name)) {
                    Object.defineProperty(exports3, name, {
                      /******/
                      configurable: false,
                      /******/
                      enumerable: true,
                      /******/
                      get: getter
                      /******/
                    });
                  }
                };
                __webpack_require__2.r = function(exports3) {
                  Object.defineProperty(exports3, "__esModule", { value: true });
                };
                __webpack_require__2.n = function(module3) {
                  var getter = module3 && module3.__esModule ? (
                    /******/
                    function getDefault() {
                      return module3["default"];
                    }
                  ) : (
                    /******/
                    function getModuleExports() {
                      return module3;
                    }
                  );
                  __webpack_require__2.d(getter, "a", getter);
                  return getter;
                };
                __webpack_require__2.o = function(object, property) {
                  return Object.prototype.hasOwnProperty.call(object, property);
                };
                __webpack_require__2.p = "/";
                __webpack_require__2.oe = function(err) {
                  console.error(err);
                  throw err;
                };
                var f = __webpack_require__2(__webpack_require__2.s = ENTRY_MODULE);
                return f.default || f;
              }
              var moduleNameReqExp = "[\\.|\\-|\\+|\\w|/|@]+";
              var dependencyRegExp = "\\((/\\*.*?\\*/)?s?.*?(" + moduleNameReqExp + ").*?\\)";
              function quoteRegExp(str) {
                return (str + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
              }
              function getModuleDependencies(sources, module3, queueName) {
                var retval = {};
                retval[queueName] = [];
                var fnString = module3.toString();
                var wrapperSignature = fnString.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
                if (!wrapperSignature)
                  return retval;
                var webpackRequireName = wrapperSignature[1];
                var re2 = new RegExp("(\\\\n|\\W)" + quoteRegExp(webpackRequireName) + dependencyRegExp, "g");
                var match7;
                while (match7 = re2.exec(fnString)) {
                  if (match7[3] === "dll-reference")
                    continue;
                  retval[queueName].push(match7[3]);
                }
                re2 = new RegExp("\\(" + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, "g");
                while (match7 = re2.exec(fnString)) {
                  if (!sources[match7[2]]) {
                    retval[queueName].push(match7[1]);
                    sources[match7[2]] = __webpack_require__(match7[1]).m;
                  }
                  retval[match7[2]] = retval[match7[2]] || [];
                  retval[match7[2]].push(match7[4]);
                }
                return retval;
              }
              function hasValuesInQueues(queues) {
                var keys = Object.keys(queues);
                return keys.reduce(function(hasValues, key) {
                  return hasValues || queues[key].length > 0;
                }, false);
              }
              function getRequiredModules(sources, moduleId) {
                var modulesQueue = {
                  main: [moduleId]
                };
                var requiredModules = {
                  main: []
                };
                var seenModules = {
                  main: {}
                };
                while (hasValuesInQueues(modulesQueue)) {
                  var queues = Object.keys(modulesQueue);
                  for (var i = 0; i < queues.length; i++) {
                    var queueName = queues[i];
                    var queue = modulesQueue[queueName];
                    var moduleToCheck = queue.pop();
                    seenModules[queueName] = seenModules[queueName] || {};
                    if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck])
                      continue;
                    seenModules[queueName][moduleToCheck] = true;
                    requiredModules[queueName] = requiredModules[queueName] || [];
                    requiredModules[queueName].push(moduleToCheck);
                    var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName);
                    var newModulesKeys = Object.keys(newModules);
                    for (var j = 0; j < newModulesKeys.length; j++) {
                      modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || [];
                      modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]]);
                    }
                  }
                }
                return requiredModules;
              }
              module2.exports = function(moduleId, options) {
                options = options || {};
                var sources = {
                  main: __webpack_require__.m
                };
                var requiredModules = options.all ? { main: Object.keys(sources) } : getRequiredModules(sources, moduleId);
                var src = "";
                Object.keys(requiredModules).filter(function(m) {
                  return m !== "main";
                }).forEach(function(module3) {
                  var entryModule = 0;
                  while (requiredModules[module3][entryModule]) {
                    entryModule++;
                  }
                  requiredModules[module3].push(entryModule);
                  sources[module3][entryModule] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })";
                  src = src + "var " + module3 + " = (" + webpackBootstrapFunc.toString().replace("ENTRY_MODULE", JSON.stringify(entryModule)) + ")({" + requiredModules[module3].map(function(id) {
                    return "" + JSON.stringify(id) + ": " + sources[module3][id].toString();
                  }).join(",") + "});\n";
                });
                src = src + "(" + webpackBootstrapFunc.toString().replace("ENTRY_MODULE", JSON.stringify(moduleId)) + ")({" + requiredModules.main.map(function(id) {
                  return "" + JSON.stringify(id) + ": " + sources.main[id].toString();
                }).join(",") + "})(self);";
                var blob = new window.Blob([src], { type: "text/javascript" });
                if (options.bare) {
                  return blob;
                }
                var URL2 = window.URL || window.webkitURL || window.mozURL || window.msURL;
                var workerUrl = URL2.createObjectURL(blob);
                var worker = new window.Worker(workerUrl);
                worker.objectURL = workerUrl;
                return worker;
              };
            },
            /* 5 */
            /***/
            function(module2, exports2) {
              module2.exports = function RushaCore(stdlib$840, foreign$841, heap$842) {
                ;
                var H$843 = new stdlib$840.Int32Array(heap$842);
                function hash$844(k$845, x$846) {
                  k$845 = k$845 | 0;
                  x$846 = x$846 | 0;
                  var i$847 = 0, j$848 = 0, y0$849 = 0, z0$850 = 0, y1$851 = 0, z1$852 = 0, y2$853 = 0, z2$854 = 0, y3$855 = 0, z3$856 = 0, y4$857 = 0, z4$858 = 0, t0$859 = 0, t1$860 = 0;
                  y0$849 = H$843[x$846 + 320 >> 2] | 0;
                  y1$851 = H$843[x$846 + 324 >> 2] | 0;
                  y2$853 = H$843[x$846 + 328 >> 2] | 0;
                  y3$855 = H$843[x$846 + 332 >> 2] | 0;
                  y4$857 = H$843[x$846 + 336 >> 2] | 0;
                  for (i$847 = 0; (i$847 | 0) < (k$845 | 0); i$847 = i$847 + 64 | 0) {
                    z0$850 = y0$849;
                    z1$852 = y1$851;
                    z2$854 = y2$853;
                    z3$856 = y3$855;
                    z4$858 = y4$857;
                    for (j$848 = 0; (j$848 | 0) < 64; j$848 = j$848 + 4 | 0) {
                      t1$860 = H$843[i$847 + j$848 >> 2] | 0;
                      t0$859 = ((y0$849 << 5 | y0$849 >>> 27) + (y1$851 & y2$853 | ~y1$851 & y3$855) | 0) + ((t1$860 + y4$857 | 0) + 1518500249 | 0) | 0;
                      y4$857 = y3$855;
                      y3$855 = y2$853;
                      y2$853 = y1$851 << 30 | y1$851 >>> 2;
                      y1$851 = y0$849;
                      y0$849 = t0$859;
                      H$843[k$845 + j$848 >> 2] = t1$860;
                    }
                    for (j$848 = k$845 + 64 | 0; (j$848 | 0) < (k$845 + 80 | 0); j$848 = j$848 + 4 | 0) {
                      t1$860 = (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) << 1 | (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) >>> 31;
                      t0$859 = ((y0$849 << 5 | y0$849 >>> 27) + (y1$851 & y2$853 | ~y1$851 & y3$855) | 0) + ((t1$860 + y4$857 | 0) + 1518500249 | 0) | 0;
                      y4$857 = y3$855;
                      y3$855 = y2$853;
                      y2$853 = y1$851 << 30 | y1$851 >>> 2;
                      y1$851 = y0$849;
                      y0$849 = t0$859;
                      H$843[j$848 >> 2] = t1$860;
                    }
                    for (j$848 = k$845 + 80 | 0; (j$848 | 0) < (k$845 + 160 | 0); j$848 = j$848 + 4 | 0) {
                      t1$860 = (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) << 1 | (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) >>> 31;
                      t0$859 = ((y0$849 << 5 | y0$849 >>> 27) + (y1$851 ^ y2$853 ^ y3$855) | 0) + ((t1$860 + y4$857 | 0) + 1859775393 | 0) | 0;
                      y4$857 = y3$855;
                      y3$855 = y2$853;
                      y2$853 = y1$851 << 30 | y1$851 >>> 2;
                      y1$851 = y0$849;
                      y0$849 = t0$859;
                      H$843[j$848 >> 2] = t1$860;
                    }
                    for (j$848 = k$845 + 160 | 0; (j$848 | 0) < (k$845 + 240 | 0); j$848 = j$848 + 4 | 0) {
                      t1$860 = (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) << 1 | (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) >>> 31;
                      t0$859 = ((y0$849 << 5 | y0$849 >>> 27) + (y1$851 & y2$853 | y1$851 & y3$855 | y2$853 & y3$855) | 0) + ((t1$860 + y4$857 | 0) - 1894007588 | 0) | 0;
                      y4$857 = y3$855;
                      y3$855 = y2$853;
                      y2$853 = y1$851 << 30 | y1$851 >>> 2;
                      y1$851 = y0$849;
                      y0$849 = t0$859;
                      H$843[j$848 >> 2] = t1$860;
                    }
                    for (j$848 = k$845 + 240 | 0; (j$848 | 0) < (k$845 + 320 | 0); j$848 = j$848 + 4 | 0) {
                      t1$860 = (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) << 1 | (H$843[j$848 - 12 >> 2] ^ H$843[j$848 - 32 >> 2] ^ H$843[j$848 - 56 >> 2] ^ H$843[j$848 - 64 >> 2]) >>> 31;
                      t0$859 = ((y0$849 << 5 | y0$849 >>> 27) + (y1$851 ^ y2$853 ^ y3$855) | 0) + ((t1$860 + y4$857 | 0) - 899497514 | 0) | 0;
                      y4$857 = y3$855;
                      y3$855 = y2$853;
                      y2$853 = y1$851 << 30 | y1$851 >>> 2;
                      y1$851 = y0$849;
                      y0$849 = t0$859;
                      H$843[j$848 >> 2] = t1$860;
                    }
                    y0$849 = y0$849 + z0$850 | 0;
                    y1$851 = y1$851 + z1$852 | 0;
                    y2$853 = y2$853 + z2$854 | 0;
                    y3$855 = y3$855 + z3$856 | 0;
                    y4$857 = y4$857 + z4$858 | 0;
                  }
                  H$843[x$846 + 320 >> 2] = y0$849;
                  H$843[x$846 + 324 >> 2] = y1$851;
                  H$843[x$846 + 328 >> 2] = y2$853;
                  H$843[x$846 + 332 >> 2] = y3$855;
                  H$843[x$846 + 336 >> 2] = y4$857;
                }
                return { hash: hash$844 };
              };
            },
            /* 6 */
            /***/
            function(module2, exports2) {
              var _this = this;
              var reader = void 0;
              if (typeof self !== "undefined" && typeof self.FileReaderSync !== "undefined") {
                reader = new self.FileReaderSync();
              }
              var convStr = function(str, H8, H32, start, len, off) {
                var i = void 0, om = off % 4, lm = (len + om) % 4, j = len - lm;
                switch (om) {
                  case 0:
                    H8[off] = str.charCodeAt(start + 3);
                  case 1:
                    H8[off + 1 - (om << 1) | 0] = str.charCodeAt(start + 2);
                  case 2:
                    H8[off + 2 - (om << 1) | 0] = str.charCodeAt(start + 1);
                  case 3:
                    H8[off + 3 - (om << 1) | 0] = str.charCodeAt(start);
                }
                if (len < lm + (4 - om)) {
                  return;
                }
                for (i = 4 - om; i < j; i = i + 4 | 0) {
                  H32[off + i >> 2] = str.charCodeAt(start + i) << 24 | str.charCodeAt(start + i + 1) << 16 | str.charCodeAt(start + i + 2) << 8 | str.charCodeAt(start + i + 3);
                }
                switch (lm) {
                  case 3:
                    H8[off + j + 1 | 0] = str.charCodeAt(start + j + 2);
                  case 2:
                    H8[off + j + 2 | 0] = str.charCodeAt(start + j + 1);
                  case 1:
                    H8[off + j + 3 | 0] = str.charCodeAt(start + j);
                }
              };
              var convBuf = function(buf, H8, H32, start, len, off) {
                var i = void 0, om = off % 4, lm = (len + om) % 4, j = len - lm;
                switch (om) {
                  case 0:
                    H8[off] = buf[start + 3];
                  case 1:
                    H8[off + 1 - (om << 1) | 0] = buf[start + 2];
                  case 2:
                    H8[off + 2 - (om << 1) | 0] = buf[start + 1];
                  case 3:
                    H8[off + 3 - (om << 1) | 0] = buf[start];
                }
                if (len < lm + (4 - om)) {
                  return;
                }
                for (i = 4 - om; i < j; i = i + 4 | 0) {
                  H32[off + i >> 2 | 0] = buf[start + i] << 24 | buf[start + i + 1] << 16 | buf[start + i + 2] << 8 | buf[start + i + 3];
                }
                switch (lm) {
                  case 3:
                    H8[off + j + 1 | 0] = buf[start + j + 2];
                  case 2:
                    H8[off + j + 2 | 0] = buf[start + j + 1];
                  case 1:
                    H8[off + j + 3 | 0] = buf[start + j];
                }
              };
              var convBlob = function(blob, H8, H32, start, len, off) {
                var i = void 0, om = off % 4, lm = (len + om) % 4, j = len - lm;
                var buf = new Uint8Array(reader.readAsArrayBuffer(blob.slice(start, start + len)));
                switch (om) {
                  case 0:
                    H8[off] = buf[3];
                  case 1:
                    H8[off + 1 - (om << 1) | 0] = buf[2];
                  case 2:
                    H8[off + 2 - (om << 1) | 0] = buf[1];
                  case 3:
                    H8[off + 3 - (om << 1) | 0] = buf[0];
                }
                if (len < lm + (4 - om)) {
                  return;
                }
                for (i = 4 - om; i < j; i = i + 4 | 0) {
                  H32[off + i >> 2 | 0] = buf[i] << 24 | buf[i + 1] << 16 | buf[i + 2] << 8 | buf[i + 3];
                }
                switch (lm) {
                  case 3:
                    H8[off + j + 1 | 0] = buf[j + 2];
                  case 2:
                    H8[off + j + 2 | 0] = buf[j + 1];
                  case 1:
                    H8[off + j + 3 | 0] = buf[j];
                }
              };
              module2.exports = function(data, H8, H32, start, len, off) {
                if (typeof data === "string") {
                  return convStr(data, H8, H32, start, len, off);
                }
                if (data instanceof Array) {
                  return convBuf(data, H8, H32, start, len, off);
                }
                if (_this && _this.Buffer && _this.Buffer.isBuffer(data)) {
                  return convBuf(data, H8, H32, start, len, off);
                }
                if (data instanceof ArrayBuffer) {
                  return convBuf(new Uint8Array(data), H8, H32, start, len, off);
                }
                if (data.buffer instanceof ArrayBuffer) {
                  return convBuf(new Uint8Array(data.buffer, data.byteOffset, data.byteLength), H8, H32, start, len, off);
                }
                if (data instanceof Blob) {
                  return convBlob(data, H8, H32, start, len, off);
                }
                throw new Error("Unsupported data type.");
              };
            },
            /* 7 */
            /***/
            function(module2, exports2, __webpack_require__) {
              var _createClass = function() {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor)
                      descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }
                return function(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                  if (staticProps)
                    defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              }();
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              var Rusha = __webpack_require__(0);
              var _require = __webpack_require__(1), toHex = _require.toHex;
              var Hash = function() {
                function Hash2() {
                  _classCallCheck(this, Hash2);
                  this._rusha = new Rusha();
                  this._rusha.resetState();
                }
                Hash2.prototype.update = function update(data) {
                  this._rusha.append(data);
                  return this;
                };
                Hash2.prototype.digest = function digest(encoding) {
                  var digest2 = this._rusha.rawEnd().buffer;
                  if (!encoding) {
                    return digest2;
                  }
                  if (encoding === "hex") {
                    return toHex(digest2);
                  }
                  throw new Error("unsupported digest encoding");
                };
                _createClass(Hash2, [{
                  key: "state",
                  get: function() {
                    return this._rusha.getState();
                  },
                  set: function(state) {
                    this._rusha.setState(state);
                  }
                }]);
                return Hash2;
              }();
              module2.exports = function() {
                return new Hash();
              };
            }
            /******/
          ])
        );
      });
    }
  });

  // ../swirly/node_modules/simple-sha1/rusha-worker-sha1.js
  var require_rusha_worker_sha1 = __commonJS({
    "../swirly/node_modules/simple-sha1/rusha-worker-sha1.js"(exports, module) {
      var Rusha = require_rusha();
      var worker;
      var nextTaskId;
      var cbs;
      function init() {
        worker = Rusha.createWorker();
        nextTaskId = 1;
        cbs = {};
        worker.onmessage = function onRushaMessage(e) {
          const taskId = e.data.id;
          const cb = cbs[taskId];
          delete cbs[taskId];
          if (e.data.error != null) {
            cb(new Error("Rusha worker error: " + e.data.error));
          } else {
            cb(null, e.data.hash);
          }
        };
      }
      function sha12(buf, cb) {
        if (!worker)
          init();
        cbs[nextTaskId] = cb;
        worker.postMessage({ id: nextTaskId, data: buf });
        nextTaskId += 1;
      }
      module.exports = sha12;
    }
  });

  // ../swirly/node_modules/simple-sha1/browser.js
  var require_browser = __commonJS({
    "../swirly/node_modules/simple-sha1/browser.js"(exports, module) {
      var Rusha = require_rusha();
      var rushaWorkerSha1 = require_rusha_worker_sha1();
      var rusha = new Rusha();
      var scope = typeof window !== "undefined" ? window : self;
      var crypto = scope.crypto || scope.msCrypto || {};
      var subtle = crypto.subtle || crypto.webkitSubtle;
      function sha1sync(buf) {
        return rusha.digest(buf);
      }
      try {
        subtle.digest({ name: "sha-1" }, new Uint8Array()).catch(function() {
          subtle = false;
        });
      } catch (err) {
        subtle = false;
      }
      function sha12(buf, cb) {
        if (!subtle) {
          if (typeof window !== "undefined") {
            rushaWorkerSha1(buf, function onRushaWorkerSha1(err, hash) {
              if (err) {
                cb(sha1sync(buf));
                return;
              }
              cb(hash);
            });
          } else {
            queueMicrotask(() => cb(sha1sync(buf)));
          }
          return;
        }
        if (typeof buf === "string") {
          buf = uint8array(buf);
        }
        subtle.digest({ name: "sha-1" }, buf).then(
          function succeed(result) {
            cb(hex(new Uint8Array(result)));
          },
          function fail() {
            cb(sha1sync(buf));
          }
        );
      }
      function uint8array(s) {
        const l = s.length;
        const array = new Uint8Array(l);
        for (let i = 0; i < l; i++) {
          array[i] = s.charCodeAt(i);
        }
        return array;
      }
      function hex(buf) {
        const l = buf.length;
        const chars = [];
        for (let i = 0; i < l; i++) {
          const bite = buf[i];
          chars.push((bite >>> 4).toString(16));
          chars.push((bite & 15).toString(16));
        }
        return chars.join("");
      }
      module.exports = sha12;
      module.exports.sync = sha1sync;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/conventions.js
  var require_conventions = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
      "use strict";
      function find(list, predicate, ac) {
        if (ac === void 0) {
          ac = Array.prototype;
        }
        if (list && typeof ac.find === "function") {
          return ac.find.call(list, predicate);
        }
        for (var i = 0; i < list.length; i++) {
          if (Object.prototype.hasOwnProperty.call(list, i)) {
            var item = list[i];
            if (predicate.call(void 0, item, i, list)) {
              return item;
            }
          }
        }
      }
      function freeze(object, oc) {
        if (oc === void 0) {
          oc = Object;
        }
        return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
      }
      function assign(target, source) {
        if (target === null || typeof target !== "object") {
          throw new TypeError("target is not an object");
        }
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
        return target;
      }
      var MIME_TYPE = freeze({
        /**
         * `text/html`, the only mime type that triggers treating an XML document as HTML.
         *
         * @see DOMParser.SupportedType.isHTML
         * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/HTML Wikipedia
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
         * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
         */
        HTML: "text/html",
        /**
         * Helper method to check a mime type if it indicates an HTML document
         *
         * @param {string} [value]
         * @returns {boolean}
         *
         * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/HTML Wikipedia
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
         * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
        isHTML: function(value) {
          return value === MIME_TYPE.HTML;
        },
        /**
         * `application/xml`, the standard mime type for XML documents.
         *
         * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
         * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_APPLICATION: "application/xml",
        /**
         * `text/html`, an alias for `application/xml`.
         *
         * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
         * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_TEXT: "text/xml",
        /**
         * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
         * but is parsed as an XML document.
         *
         * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
         * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
         */
        XML_XHTML_APPLICATION: "application/xhtml+xml",
        /**
         * `image/svg+xml`,
         *
         * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
         * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
         * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
         */
        XML_SVG_IMAGE: "image/svg+xml"
      });
      var NAMESPACE = freeze({
        /**
         * The XHTML namespace.
         *
         * @see http://www.w3.org/1999/xhtml
         */
        HTML: "http://www.w3.org/1999/xhtml",
        /**
         * Checks if `uri` equals `NAMESPACE.HTML`.
         *
         * @param {string} [uri]
         *
         * @see NAMESPACE.HTML
         */
        isHTML: function(uri) {
          return uri === NAMESPACE.HTML;
        },
        /**
         * The SVG namespace.
         *
         * @see http://www.w3.org/2000/svg
         */
        SVG: "http://www.w3.org/2000/svg",
        /**
         * The `xml:` namespace.
         *
         * @see http://www.w3.org/XML/1998/namespace
         */
        XML: "http://www.w3.org/XML/1998/namespace",
        /**
         * The `xmlns:` namespace
         *
         * @see https://www.w3.org/2000/xmlns/
         */
        XMLNS: "http://www.w3.org/2000/xmlns/"
      });
      exports.assign = assign;
      exports.find = find;
      exports.freeze = freeze;
      exports.MIME_TYPE = MIME_TYPE;
      exports.NAMESPACE = NAMESPACE;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/dom.js
  var require_dom = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
      var conventions = require_conventions();
      var find = conventions.find;
      var NAMESPACE = conventions.NAMESPACE;
      function notEmptyString(input) {
        return input !== "";
      }
      function splitOnASCIIWhitespace(input) {
        return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
      }
      function orderedSetReducer(current, element) {
        if (!current.hasOwnProperty(element)) {
          current[element] = true;
        }
        return current;
      }
      function toOrderedSet(input) {
        if (!input)
          return [];
        var list = splitOnASCIIWhitespace(input);
        return Object.keys(list.reduce(orderedSetReducer, {}));
      }
      function arrayIncludes(list) {
        return function(element) {
          return list && list.indexOf(element) !== -1;
        };
      }
      function copy(src, dest) {
        for (var p in src) {
          if (Object.prototype.hasOwnProperty.call(src, p)) {
            dest[p] = src[p];
          }
        }
      }
      function _extends(Class, Super) {
        var pt = Class.prototype;
        if (!(pt instanceof Super)) {
          let t2 = function() {
          };
          var t = t2;
          ;
          t2.prototype = Super.prototype;
          t2 = new t2();
          copy(pt, t2);
          Class.prototype = pt = t2;
        }
        if (pt.constructor != Class) {
          if (typeof Class != "function") {
            console.error("unknown Class:" + Class);
          }
          pt.constructor = Class;
        }
      }
      var NodeType = {};
      var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
      var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
      var TEXT_NODE = NodeType.TEXT_NODE = 3;
      var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
      var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
      var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
      var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
      var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
      var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
      var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
      var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
      var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
      var ExceptionCode = {};
      var ExceptionMessage = {};
      var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
      var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
      var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
      var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
      var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
      var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
      var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
      var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
      var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
      var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
      var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
      var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
      var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
      var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
      var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
      function DOMException(code, message) {
        if (message instanceof Error) {
          var error = message;
        } else {
          error = this;
          Error.call(this, ExceptionMessage[code]);
          this.message = ExceptionMessage[code];
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, DOMException);
        }
        error.code = code;
        if (message)
          this.message = this.message + ": " + message;
        return error;
      }
      DOMException.prototype = Error.prototype;
      copy(ExceptionCode, DOMException);
      function NodeList() {
      }
      NodeList.prototype = {
        /**
         * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
         * @standard level1
         */
        length: 0,
        /**
         * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
         * @standard level1
         * @param index  unsigned long
         *   Index into the collection.
         * @return Node
         * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
         */
        item: function(index) {
          return this[index] || null;
        },
        toString: function(isHTML, nodeFilter) {
          for (var buf = [], i = 0; i < this.length; i++) {
            serializeToString(this[i], buf, isHTML, nodeFilter);
          }
          return buf.join("");
        },
        /**
         * @private
         * @param {function (Node):boolean} predicate
         * @returns {Node[]}
         */
        filter: function(predicate) {
          return Array.prototype.filter.call(this, predicate);
        },
        /**
         * @private
         * @param {Node} item
         * @returns {number}
         */
        indexOf: function(item) {
          return Array.prototype.indexOf.call(this, item);
        }
      };
      function LiveNodeList(node, refresh) {
        this._node = node;
        this._refresh = refresh;
        _updateLiveList(this);
      }
      function _updateLiveList(list) {
        var inc = list._node._inc || list._node.ownerDocument._inc;
        if (list._inc != inc) {
          var ls = list._refresh(list._node);
          __set__(list, "length", ls.length);
          copy(ls, list);
          list._inc = inc;
        }
      }
      LiveNodeList.prototype.item = function(i) {
        _updateLiveList(this);
        return this[i];
      };
      _extends(LiveNodeList, NodeList);
      function NamedNodeMap() {
      }
      function _findNodeIndex(list, node) {
        var i = list.length;
        while (i--) {
          if (list[i] === node) {
            return i;
          }
        }
      }
      function _addNamedNode(el, list, newAttr, oldAttr) {
        if (oldAttr) {
          list[_findNodeIndex(list, oldAttr)] = newAttr;
        } else {
          list[list.length++] = newAttr;
        }
        if (el) {
          newAttr.ownerElement = el;
          var doc = el.ownerDocument;
          if (doc) {
            oldAttr && _onRemoveAttribute(doc, el, oldAttr);
            _onAddAttribute(doc, el, newAttr);
          }
        }
      }
      function _removeNamedNode(el, list, attr) {
        var i = _findNodeIndex(list, attr);
        if (i >= 0) {
          var lastIndex = list.length - 1;
          while (i < lastIndex) {
            list[i] = list[++i];
          }
          list.length = lastIndex;
          if (el) {
            var doc = el.ownerDocument;
            if (doc) {
              _onRemoveAttribute(doc, el, attr);
              attr.ownerElement = null;
            }
          }
        } else {
          throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
        }
      }
      NamedNodeMap.prototype = {
        length: 0,
        item: NodeList.prototype.item,
        getNamedItem: function(key) {
          var i = this.length;
          while (i--) {
            var attr = this[i];
            if (attr.nodeName == key) {
              return attr;
            }
          }
        },
        setNamedItem: function(attr) {
          var el = attr.ownerElement;
          if (el && el != this._ownerElement) {
            throw new DOMException(INUSE_ATTRIBUTE_ERR);
          }
          var oldAttr = this.getNamedItem(attr.nodeName);
          _addNamedNode(this._ownerElement, this, attr, oldAttr);
          return oldAttr;
        },
        /* returns Node */
        setNamedItemNS: function(attr) {
          var el = attr.ownerElement, oldAttr;
          if (el && el != this._ownerElement) {
            throw new DOMException(INUSE_ATTRIBUTE_ERR);
          }
          oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
          _addNamedNode(this._ownerElement, this, attr, oldAttr);
          return oldAttr;
        },
        /* returns Node */
        removeNamedItem: function(key) {
          var attr = this.getNamedItem(key);
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
        },
        // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
        //for level2
        removeNamedItemNS: function(namespaceURI, localName) {
          var attr = this.getNamedItemNS(namespaceURI, localName);
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
        },
        getNamedItemNS: function(namespaceURI, localName) {
          var i = this.length;
          while (i--) {
            var node = this[i];
            if (node.localName == localName && node.namespaceURI == namespaceURI) {
              return node;
            }
          }
          return null;
        }
      };
      function DOMImplementation() {
      }
      DOMImplementation.prototype = {
        /**
         * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
         * The different implementations fairly diverged in what kind of features were reported.
         * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
         *
         * @deprecated It is deprecated and modern browsers return true in all cases.
         *
         * @param {string} feature
         * @param {string} [version]
         * @returns {boolean} always true
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
         * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
         */
        hasFeature: function(feature, version) {
          return true;
        },
        /**
         * Creates an XML Document object of the specified type with its document element.
         *
         * __It behaves slightly different from the description in the living standard__:
         * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
         * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
         * - this implementation is not validating names or qualified names
         *   (when parsing XML strings, the SAX parser takes care of that)
         *
         * @param {string|null} namespaceURI
         * @param {string} qualifiedName
         * @param {DocumentType=null} doctype
         * @returns {Document}
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
         *
         * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
         * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
         * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
         */
        createDocument: function(namespaceURI, qualifiedName, doctype) {
          var doc = new Document();
          doc.implementation = this;
          doc.childNodes = new NodeList();
          doc.doctype = doctype || null;
          if (doctype) {
            doc.appendChild(doctype);
          }
          if (qualifiedName) {
            var root = doc.createElementNS(namespaceURI, qualifiedName);
            doc.appendChild(root);
          }
          return doc;
        },
        /**
         * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
         *
         * __This behavior is slightly different from the in the specs__:
         * - this implementation is not validating names or qualified names
         *   (when parsing XML strings, the SAX parser takes care of that)
         *
         * @param {string} qualifiedName
         * @param {string} [publicId]
         * @param {string} [systemId]
         * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
         * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
         *
         * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
         * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
         * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
         */
        createDocumentType: function(qualifiedName, publicId, systemId) {
          var node = new DocumentType();
          node.name = qualifiedName;
          node.nodeName = qualifiedName;
          node.publicId = publicId || "";
          node.systemId = systemId || "";
          return node;
        }
      };
      function Node() {
      }
      Node.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        // Modified in DOM Level 2:
        insertBefore: function(newChild, refChild) {
          return _insertBefore(this, newChild, refChild);
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          if (oldChild) {
            this.removeChild(oldChild);
          }
        },
        removeChild: function(oldChild) {
          return _removeChild(this, oldChild);
        },
        appendChild: function(newChild) {
          return this.insertBefore(newChild, null);
        },
        hasChildNodes: function() {
          return this.firstChild != null;
        },
        cloneNode: function(deep) {
          return cloneNode(this.ownerDocument || this, this, deep);
        },
        // Modified in DOM Level 2:
        normalize: function() {
          var child = this.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
              this.removeChild(next);
              child.appendData(next.data);
            } else {
              child.normalize();
              child = next;
            }
          }
        },
        // Introduced in DOM Level 2:
        isSupported: function(feature, version) {
          return this.ownerDocument.implementation.hasFeature(feature, version);
        },
        // Introduced in DOM Level 2:
        hasAttributes: function() {
          return this.attributes.length > 0;
        },
        /**
         * Look up the prefix associated to the given namespace URI, starting from this node.
         * **The default namespace declarations are ignored by this method.**
         * See Namespace Prefix Lookup for details on the algorithm used by this method.
         *
         * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
         *
         * @param {string | null} namespaceURI
         * @returns {string | null}
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
         * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
         * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
         * @see https://github.com/xmldom/xmldom/issues/322
         */
        lookupPrefix: function(namespaceURI) {
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              for (var n in map) {
                if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                  return n;
                }
              }
            }
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        // Introduced in DOM Level 3:
        lookupNamespaceURI: function(prefix) {
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              if (Object.prototype.hasOwnProperty.call(map, prefix)) {
                return map[prefix];
              }
            }
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        // Introduced in DOM Level 3:
        isDefaultNamespace: function(namespaceURI) {
          var prefix = this.lookupPrefix(namespaceURI);
          return prefix == null;
        }
      };
      function _xmlEncoder(c) {
        return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
      }
      copy(NodeType, Node);
      copy(NodeType, Node.prototype);
      function _visitNode(node, callback) {
        if (callback(node)) {
          return true;
        }
        if (node = node.firstChild) {
          do {
            if (_visitNode(node, callback)) {
              return true;
            }
          } while (node = node.nextSibling);
        }
      }
      function Document() {
        this.ownerDocument = this;
      }
      function _onAddAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        if (ns === NAMESPACE.XMLNS) {
          el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
        }
      }
      function _onRemoveAttribute(doc, el, newAttr, remove) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        if (ns === NAMESPACE.XMLNS) {
          delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
        }
      }
      function _onUpdateChild(doc, el, newChild) {
        if (doc && doc._inc) {
          doc._inc++;
          var cs = el.childNodes;
          if (newChild) {
            cs[cs.length++] = newChild;
          } else {
            var child = el.firstChild;
            var i = 0;
            while (child) {
              cs[i++] = child;
              child = child.nextSibling;
            }
            cs.length = i;
            delete cs[cs.length];
          }
        }
      }
      function _removeChild(parentNode, child) {
        var previous = child.previousSibling;
        var next = child.nextSibling;
        if (previous) {
          previous.nextSibling = next;
        } else {
          parentNode.firstChild = next;
        }
        if (next) {
          next.previousSibling = previous;
        } else {
          parentNode.lastChild = previous;
        }
        child.parentNode = null;
        child.previousSibling = null;
        child.nextSibling = null;
        _onUpdateChild(parentNode.ownerDocument, parentNode);
        return child;
      }
      function hasValidParentNodeType(node) {
        return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
      }
      function hasInsertableNodeType(node) {
        return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
      }
      function isDocTypeNode(node) {
        return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
      }
      function isElementNode(node) {
        return node && node.nodeType === Node.ELEMENT_NODE;
      }
      function isTextNode(node) {
        return node && node.nodeType === Node.TEXT_NODE;
      }
      function isElementInsertionPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function isElementReplacementPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        function hasElementChildThatIsNotChild(node) {
          return isElementNode(node) && node !== child;
        }
        if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function assertPreInsertionValidity1to5(parent, node, child) {
        if (!hasValidParentNodeType(parent)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
        }
        if (child && child.parentNode !== parent) {
          throw new DOMException(NOT_FOUND_ERR, "child not in parent");
        }
        if (
          // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
          !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
          // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
          // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
          // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
          isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
        ) {
          throw new DOMException(
            HIERARCHY_REQUEST_ERR,
            "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
          );
        }
      }
      function assertPreInsertionValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementInsertionPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          if (find(parentChildNodes, isDocTypeNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
          if (!child && parentElementChild) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
          }
        }
      }
      function assertPreReplacementValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementReplacementPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          let hasDoctypeChildThatIsNotChild2 = function(node2) {
            return isDocTypeNode(node2) && node2 !== child;
          };
          var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
          if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
        }
      }
      function _insertBefore(parent, node, child, _inDocumentAssertion) {
        assertPreInsertionValidity1to5(parent, node, child);
        if (parent.nodeType === Node.DOCUMENT_NODE) {
          (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
        }
        var cp = node.parentNode;
        if (cp) {
          cp.removeChild(node);
        }
        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var newFirst = node.firstChild;
          if (newFirst == null) {
            return node;
          }
          var newLast = node.lastChild;
        } else {
          newFirst = newLast = node;
        }
        var pre = child ? child.previousSibling : parent.lastChild;
        newFirst.previousSibling = pre;
        newLast.nextSibling = child;
        if (pre) {
          pre.nextSibling = newFirst;
        } else {
          parent.firstChild = newFirst;
        }
        if (child == null) {
          parent.lastChild = newLast;
        } else {
          child.previousSibling = newLast;
        }
        do {
          newFirst.parentNode = parent;
        } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
        _onUpdateChild(parent.ownerDocument || parent, parent);
        if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
          node.firstChild = node.lastChild = null;
        }
        return node;
      }
      function _appendSingleChild(parentNode, newChild) {
        if (newChild.parentNode) {
          newChild.parentNode.removeChild(newChild);
        }
        newChild.parentNode = parentNode;
        newChild.previousSibling = parentNode.lastChild;
        newChild.nextSibling = null;
        if (newChild.previousSibling) {
          newChild.previousSibling.nextSibling = newChild;
        } else {
          parentNode.firstChild = newChild;
        }
        parentNode.lastChild = newChild;
        _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
        return newChild;
      }
      Document.prototype = {
        //implementation : null,
        nodeName: "#document",
        nodeType: DOCUMENT_NODE,
        /**
         * The DocumentType node of the document.
         *
         * @readonly
         * @type DocumentType
         */
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function(newChild, refChild) {
          if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
            var child = newChild.firstChild;
            while (child) {
              var next = child.nextSibling;
              this.insertBefore(child, refChild);
              child = next;
            }
            return newChild;
          }
          _insertBefore(this, newChild, refChild);
          newChild.ownerDocument = this;
          if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
            this.documentElement = newChild;
          }
          return newChild;
        },
        removeChild: function(oldChild) {
          if (this.documentElement == oldChild) {
            this.documentElement = null;
          }
          return _removeChild(this, oldChild);
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          newChild.ownerDocument = this;
          if (oldChild) {
            this.removeChild(oldChild);
          }
          if (isElementNode(newChild)) {
            this.documentElement = newChild;
          }
        },
        // Introduced in DOM Level 2:
        importNode: function(importedNode, deep) {
          return importNode(this, importedNode, deep);
        },
        // Introduced in DOM Level 2:
        getElementById: function(id) {
          var rtv = null;
          _visitNode(this.documentElement, function(node) {
            if (node.nodeType == ELEMENT_NODE) {
              if (node.getAttribute("id") == id) {
                rtv = node;
                return true;
              }
            }
          });
          return rtv;
        },
        /**
         * The `getElementsByClassName` method of `Document` interface returns an array-like object
         * of all child elements which have **all** of the given class name(s).
         *
         * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
         *
         *
         * Warning: This is a live LiveNodeList.
         * Changes in the DOM will reflect in the array as the changes occur.
         * If an element selected by this array no longer qualifies for the selector,
         * it will automatically be removed. Be aware of this for iteration purposes.
         *
         * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
         * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
         */
        getElementsByClassName: function(classNames) {
          var classNamesSet = toOrderedSet(classNames);
          return new LiveNodeList(this, function(base) {
            var ls = [];
            if (classNamesSet.length > 0) {
              _visitNode(base.documentElement, function(node) {
                if (node !== base && node.nodeType === ELEMENT_NODE) {
                  var nodeClassNames = node.getAttribute("class");
                  if (nodeClassNames) {
                    var matches = classNames === nodeClassNames;
                    if (!matches) {
                      var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                      matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                    }
                    if (matches) {
                      ls.push(node);
                    }
                  }
                }
              });
            }
            return ls;
          });
        },
        //document factory method:
        createElement: function(tagName) {
          var node = new Element();
          node.ownerDocument = this;
          node.nodeName = tagName;
          node.tagName = tagName;
          node.localName = tagName;
          node.childNodes = new NodeList();
          var attrs = node.attributes = new NamedNodeMap();
          attrs._ownerElement = node;
          return node;
        },
        createDocumentFragment: function() {
          var node = new DocumentFragment();
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          return node;
        },
        createTextNode: function(data) {
          var node = new Text();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createComment: function(data) {
          var node = new Comment();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createCDATASection: function(data) {
          var node = new CDATASection();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createProcessingInstruction: function(target, data) {
          var node = new ProcessingInstruction();
          node.ownerDocument = this;
          node.tagName = node.target = target;
          node.nodeValue = node.data = data;
          return node;
        },
        createAttribute: function(name) {
          var node = new Attr();
          node.ownerDocument = this;
          node.name = name;
          node.nodeName = name;
          node.localName = name;
          node.specified = true;
          return node;
        },
        createEntityReference: function(name) {
          var node = new EntityReference();
          node.ownerDocument = this;
          node.nodeName = name;
          return node;
        },
        // Introduced in DOM Level 2:
        createElementNS: function(namespaceURI, qualifiedName) {
          var node = new Element();
          var pl = qualifiedName.split(":");
          var attrs = node.attributes = new NamedNodeMap();
          node.childNodes = new NodeList();
          node.ownerDocument = this;
          node.nodeName = qualifiedName;
          node.tagName = qualifiedName;
          node.namespaceURI = namespaceURI;
          if (pl.length == 2) {
            node.prefix = pl[0];
            node.localName = pl[1];
          } else {
            node.localName = qualifiedName;
          }
          attrs._ownerElement = node;
          return node;
        },
        // Introduced in DOM Level 2:
        createAttributeNS: function(namespaceURI, qualifiedName) {
          var node = new Attr();
          var pl = qualifiedName.split(":");
          node.ownerDocument = this;
          node.nodeName = qualifiedName;
          node.name = qualifiedName;
          node.namespaceURI = namespaceURI;
          node.specified = true;
          if (pl.length == 2) {
            node.prefix = pl[0];
            node.localName = pl[1];
          } else {
            node.localName = qualifiedName;
          }
          return node;
        }
      };
      _extends(Document, Node);
      function Element() {
        this._nsMap = {};
      }
      Element.prototype = {
        nodeType: ELEMENT_NODE,
        hasAttribute: function(name) {
          return this.getAttributeNode(name) != null;
        },
        getAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          return attr && attr.value || "";
        },
        getAttributeNode: function(name) {
          return this.attributes.getNamedItem(name);
        },
        setAttribute: function(name, value) {
          var attr = this.ownerDocument.createAttribute(name);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        },
        removeAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          attr && this.removeAttributeNode(attr);
        },
        //four real opeartion method
        appendChild: function(newChild) {
          if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
            return this.insertBefore(newChild, null);
          } else {
            return _appendSingleChild(this, newChild);
          }
        },
        setAttributeNode: function(newAttr) {
          return this.attributes.setNamedItem(newAttr);
        },
        setAttributeNodeNS: function(newAttr) {
          return this.attributes.setNamedItemNS(newAttr);
        },
        removeAttributeNode: function(oldAttr) {
          return this.attributes.removeNamedItem(oldAttr.nodeName);
        },
        //get real attribute name,and remove it by removeAttributeNode
        removeAttributeNS: function(namespaceURI, localName) {
          var old = this.getAttributeNodeNS(namespaceURI, localName);
          old && this.removeAttributeNode(old);
        },
        hasAttributeNS: function(namespaceURI, localName) {
          return this.getAttributeNodeNS(namespaceURI, localName) != null;
        },
        getAttributeNS: function(namespaceURI, localName) {
          var attr = this.getAttributeNodeNS(namespaceURI, localName);
          return attr && attr.value || "";
        },
        setAttributeNS: function(namespaceURI, qualifiedName, value) {
          var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        },
        getAttributeNodeNS: function(namespaceURI, localName) {
          return this.attributes.getNamedItemNS(namespaceURI, localName);
        },
        getElementsByTagName: function(tagName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
                ls.push(node);
              }
            });
            return ls;
          });
        },
        getElementsByTagNameNS: function(namespaceURI, localName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
                ls.push(node);
              }
            });
            return ls;
          });
        }
      };
      Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
      Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
      _extends(Element, Node);
      function Attr() {
      }
      Attr.prototype.nodeType = ATTRIBUTE_NODE;
      _extends(Attr, Node);
      function CharacterData() {
      }
      CharacterData.prototype = {
        data: "",
        substringData: function(offset, count) {
          return this.data.substring(offset, offset + count);
        },
        appendData: function(text) {
          text = this.data + text;
          this.nodeValue = this.data = text;
          this.length = text.length;
        },
        insertData: function(offset, text) {
          this.replaceData(offset, 0, text);
        },
        appendChild: function(newChild) {
          throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
        },
        deleteData: function(offset, count) {
          this.replaceData(offset, count, "");
        },
        replaceData: function(offset, count, text) {
          var start = this.data.substring(0, offset);
          var end = this.data.substring(offset + count);
          text = start + text + end;
          this.nodeValue = this.data = text;
          this.length = text.length;
        }
      };
      _extends(CharacterData, Node);
      function Text() {
      }
      Text.prototype = {
        nodeName: "#text",
        nodeType: TEXT_NODE,
        splitText: function(offset) {
          var text = this.data;
          var newText = text.substring(offset);
          text = text.substring(0, offset);
          this.data = this.nodeValue = text;
          this.length = text.length;
          var newNode = this.ownerDocument.createTextNode(newText);
          if (this.parentNode) {
            this.parentNode.insertBefore(newNode, this.nextSibling);
          }
          return newNode;
        }
      };
      _extends(Text, CharacterData);
      function Comment() {
      }
      Comment.prototype = {
        nodeName: "#comment",
        nodeType: COMMENT_NODE
      };
      _extends(Comment, CharacterData);
      function CDATASection() {
      }
      CDATASection.prototype = {
        nodeName: "#cdata-section",
        nodeType: CDATA_SECTION_NODE
      };
      _extends(CDATASection, CharacterData);
      function DocumentType() {
      }
      DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
      _extends(DocumentType, Node);
      function Notation() {
      }
      Notation.prototype.nodeType = NOTATION_NODE;
      _extends(Notation, Node);
      function Entity() {
      }
      Entity.prototype.nodeType = ENTITY_NODE;
      _extends(Entity, Node);
      function EntityReference() {
      }
      EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
      _extends(EntityReference, Node);
      function DocumentFragment() {
      }
      DocumentFragment.prototype.nodeName = "#document-fragment";
      DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
      _extends(DocumentFragment, Node);
      function ProcessingInstruction() {
      }
      ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
      _extends(ProcessingInstruction, Node);
      function XMLSerializer2() {
      }
      XMLSerializer2.prototype.serializeToString = function(node, isHtml, nodeFilter) {
        return nodeSerializeToString.call(node, isHtml, nodeFilter);
      };
      Node.prototype.toString = nodeSerializeToString;
      function nodeSerializeToString(isHtml, nodeFilter) {
        var buf = [];
        var refNode = this.nodeType == 9 && this.documentElement || this;
        var prefix = refNode.prefix;
        var uri = refNode.namespaceURI;
        if (uri && prefix == null) {
          var prefix = refNode.lookupPrefix(uri);
          if (prefix == null) {
            var visibleNamespaces = [
              { namespace: uri, prefix: null }
              //{namespace:uri,prefix:''}
            ];
          }
        }
        serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
        return buf.join("");
      }
      function needNamespaceDefine(node, isHTML, visibleNamespaces) {
        var prefix = node.prefix || "";
        var uri = node.namespaceURI;
        if (!uri) {
          return false;
        }
        if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
          return false;
        }
        var i = visibleNamespaces.length;
        while (i--) {
          var ns = visibleNamespaces[i];
          if (ns.prefix === prefix) {
            return ns.namespace !== uri;
          }
        }
        return true;
      }
      function addSerializedAttribute(buf, qualifiedName, value) {
        buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
      }
      function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
        if (!visibleNamespaces) {
          visibleNamespaces = [];
        }
        if (nodeFilter) {
          node = nodeFilter(node);
          if (node) {
            if (typeof node == "string") {
              buf.push(node);
              return;
            }
          } else {
            return;
          }
        }
        switch (node.nodeType) {
          case ELEMENT_NODE:
            var attrs = node.attributes;
            var len = attrs.length;
            var child = node.firstChild;
            var nodeName = node.tagName;
            isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
            var prefixedNodeName = nodeName;
            if (!isHTML && !node.prefix && node.namespaceURI) {
              var defaultNS;
              for (var ai = 0; ai < attrs.length; ai++) {
                if (attrs.item(ai).name === "xmlns") {
                  defaultNS = attrs.item(ai).value;
                  break;
                }
              }
              if (!defaultNS) {
                for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                  var namespace = visibleNamespaces[nsi];
                  if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                    defaultNS = namespace.namespace;
                    break;
                  }
                }
              }
              if (defaultNS !== node.namespaceURI) {
                for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                  var namespace = visibleNamespaces[nsi];
                  if (namespace.namespace === node.namespaceURI) {
                    if (namespace.prefix) {
                      prefixedNodeName = namespace.prefix + ":" + nodeName;
                    }
                    break;
                  }
                }
              }
            }
            buf.push("<", prefixedNodeName);
            for (var i = 0; i < len; i++) {
              var attr = attrs.item(i);
              if (attr.prefix == "xmlns") {
                visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
              } else if (attr.nodeName == "xmlns") {
                visibleNamespaces.push({ prefix: "", namespace: attr.value });
              }
            }
            for (var i = 0; i < len; i++) {
              var attr = attrs.item(i);
              if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
                var prefix = attr.prefix || "";
                var uri = attr.namespaceURI;
                addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
                visibleNamespaces.push({ prefix, namespace: uri });
              }
              serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
            }
            if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
              var prefix = node.prefix || "";
              var uri = node.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
              buf.push(">");
              if (isHTML && /^script$/i.test(nodeName)) {
                while (child) {
                  if (child.data) {
                    buf.push(child.data);
                  } else {
                    serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                  }
                  child = child.nextSibling;
                }
              } else {
                while (child) {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                  child = child.nextSibling;
                }
              }
              buf.push("</", prefixedNodeName, ">");
            } else {
              buf.push("/>");
            }
            return;
          case DOCUMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var child = node.firstChild;
            while (child) {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
              child = child.nextSibling;
            }
            return;
          case ATTRIBUTE_NODE:
            return addSerializedAttribute(buf, node.name, node.value);
          case TEXT_NODE:
            return buf.push(
              node.data.replace(/[<&>]/g, _xmlEncoder)
            );
          case CDATA_SECTION_NODE:
            return buf.push("<![CDATA[", node.data, "]]>");
          case COMMENT_NODE:
            return buf.push("<!--", node.data, "-->");
          case DOCUMENT_TYPE_NODE:
            var pubid = node.publicId;
            var sysid = node.systemId;
            buf.push("<!DOCTYPE ", node.name);
            if (pubid) {
              buf.push(" PUBLIC ", pubid);
              if (sysid && sysid != ".") {
                buf.push(" ", sysid);
              }
              buf.push(">");
            } else if (sysid && sysid != ".") {
              buf.push(" SYSTEM ", sysid, ">");
            } else {
              var sub = node.internalSubset;
              if (sub) {
                buf.push(" [", sub, "]");
              }
              buf.push(">");
            }
            return;
          case PROCESSING_INSTRUCTION_NODE:
            return buf.push("<?", node.target, " ", node.data, "?>");
          case ENTITY_REFERENCE_NODE:
            return buf.push("&", node.nodeName, ";");
          default:
            buf.push("??", node.nodeName);
        }
      }
      function importNode(doc, node, deep) {
        var node2;
        switch (node.nodeType) {
          case ELEMENT_NODE:
            node2 = node.cloneNode(false);
            node2.ownerDocument = doc;
          case DOCUMENT_FRAGMENT_NODE:
            break;
          case ATTRIBUTE_NODE:
            deep = true;
            break;
        }
        if (!node2) {
          node2 = node.cloneNode(false);
        }
        node2.ownerDocument = doc;
        node2.parentNode = null;
        if (deep) {
          var child = node.firstChild;
          while (child) {
            node2.appendChild(importNode(doc, child, deep));
            child = child.nextSibling;
          }
        }
        return node2;
      }
      function cloneNode(doc, node, deep) {
        var node2 = new node.constructor();
        for (var n in node) {
          if (Object.prototype.hasOwnProperty.call(node, n)) {
            var v = node[n];
            if (typeof v != "object") {
              if (v != node2[n]) {
                node2[n] = v;
              }
            }
          }
        }
        if (node.childNodes) {
          node2.childNodes = new NodeList();
        }
        node2.ownerDocument = doc;
        switch (node2.nodeType) {
          case ELEMENT_NODE:
            var attrs = node.attributes;
            var attrs2 = node2.attributes = new NamedNodeMap();
            var len = attrs.length;
            attrs2._ownerElement = node2;
            for (var i = 0; i < len; i++) {
              node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
            }
            break;
            ;
          case ATTRIBUTE_NODE:
            deep = true;
        }
        if (deep) {
          var child = node.firstChild;
          while (child) {
            node2.appendChild(cloneNode(doc, child, deep));
            child = child.nextSibling;
          }
        }
        return node2;
      }
      function __set__(object, key, value) {
        object[key] = value;
      }
      try {
        if (Object.defineProperty) {
          let getTextContent2 = function(node) {
            switch (node.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                var buf = [];
                node = node.firstChild;
                while (node) {
                  if (node.nodeType !== 7 && node.nodeType !== 8) {
                    buf.push(getTextContent2(node));
                  }
                  node = node.nextSibling;
                }
                return buf.join("");
              default:
                return node.nodeValue;
            }
          };
          getTextContent = getTextContent2;
          Object.defineProperty(LiveNodeList.prototype, "length", {
            get: function() {
              _updateLiveList(this);
              return this.$$length;
            }
          });
          Object.defineProperty(Node.prototype, "textContent", {
            get: function() {
              return getTextContent2(this);
            },
            set: function(data) {
              switch (this.nodeType) {
                case ELEMENT_NODE:
                case DOCUMENT_FRAGMENT_NODE:
                  while (this.firstChild) {
                    this.removeChild(this.firstChild);
                  }
                  if (data || String(data)) {
                    this.appendChild(this.ownerDocument.createTextNode(data));
                  }
                  break;
                default:
                  this.data = data;
                  this.value = data;
                  this.nodeValue = data;
              }
            }
          });
          __set__ = function(object, key, value) {
            object["$$" + key] = value;
          };
        }
      } catch (e) {
      }
      var getTextContent;
      exports.DocumentType = DocumentType;
      exports.DOMException = DOMException;
      exports.DOMImplementation = DOMImplementation;
      exports.Element = Element;
      exports.Node = Node;
      exports.NodeList = NodeList;
      exports.XMLSerializer = XMLSerializer2;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/entities.js
  var require_entities = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
      var freeze = require_conventions().freeze;
      exports.XML_ENTITIES = freeze({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' });
      exports.HTML_ENTITIES = freeze({
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'",
        Agrave: "\xC0",
        Aacute: "\xC1",
        Acirc: "\xC2",
        Atilde: "\xC3",
        Auml: "\xC4",
        Aring: "\xC5",
        AElig: "\xC6",
        Ccedil: "\xC7",
        Egrave: "\xC8",
        Eacute: "\xC9",
        Ecirc: "\xCA",
        Euml: "\xCB",
        Igrave: "\xCC",
        Iacute: "\xCD",
        Icirc: "\xCE",
        Iuml: "\xCF",
        ETH: "\xD0",
        Ntilde: "\xD1",
        Ograve: "\xD2",
        Oacute: "\xD3",
        Ocirc: "\xD4",
        Otilde: "\xD5",
        Ouml: "\xD6",
        Oslash: "\xD8",
        Ugrave: "\xD9",
        Uacute: "\xDA",
        Ucirc: "\xDB",
        Uuml: "\xDC",
        Yacute: "\xDD",
        THORN: "\xDE",
        szlig: "\xDF",
        agrave: "\xE0",
        aacute: "\xE1",
        acirc: "\xE2",
        atilde: "\xE3",
        auml: "\xE4",
        aring: "\xE5",
        aelig: "\xE6",
        ccedil: "\xE7",
        egrave: "\xE8",
        eacute: "\xE9",
        ecirc: "\xEA",
        euml: "\xEB",
        igrave: "\xEC",
        iacute: "\xED",
        icirc: "\xEE",
        iuml: "\xEF",
        eth: "\xF0",
        ntilde: "\xF1",
        ograve: "\xF2",
        oacute: "\xF3",
        ocirc: "\xF4",
        otilde: "\xF5",
        ouml: "\xF6",
        oslash: "\xF8",
        ugrave: "\xF9",
        uacute: "\xFA",
        ucirc: "\xFB",
        uuml: "\xFC",
        yacute: "\xFD",
        thorn: "\xFE",
        yuml: "\xFF",
        nbsp: "\xA0",
        iexcl: "\xA1",
        cent: "\xA2",
        pound: "\xA3",
        curren: "\xA4",
        yen: "\xA5",
        brvbar: "\xA6",
        sect: "\xA7",
        uml: "\xA8",
        copy: "\xA9",
        ordf: "\xAA",
        laquo: "\xAB",
        not: "\xAC",
        shy: "\xAD\xAD",
        reg: "\xAE",
        macr: "\xAF",
        deg: "\xB0",
        plusmn: "\xB1",
        sup2: "\xB2",
        sup3: "\xB3",
        acute: "\xB4",
        micro: "\xB5",
        para: "\xB6",
        middot: "\xB7",
        cedil: "\xB8",
        sup1: "\xB9",
        ordm: "\xBA",
        raquo: "\xBB",
        frac14: "\xBC",
        frac12: "\xBD",
        frac34: "\xBE",
        iquest: "\xBF",
        times: "\xD7",
        divide: "\xF7",
        forall: "\u2200",
        part: "\u2202",
        exist: "\u2203",
        empty: "\u2205",
        nabla: "\u2207",
        isin: "\u2208",
        notin: "\u2209",
        ni: "\u220B",
        prod: "\u220F",
        sum: "\u2211",
        minus: "\u2212",
        lowast: "\u2217",
        radic: "\u221A",
        prop: "\u221D",
        infin: "\u221E",
        ang: "\u2220",
        and: "\u2227",
        or: "\u2228",
        cap: "\u2229",
        cup: "\u222A",
        "int": "\u222B",
        there4: "\u2234",
        sim: "\u223C",
        cong: "\u2245",
        asymp: "\u2248",
        ne: "\u2260",
        equiv: "\u2261",
        le: "\u2264",
        ge: "\u2265",
        sub: "\u2282",
        sup: "\u2283",
        nsub: "\u2284",
        sube: "\u2286",
        supe: "\u2287",
        oplus: "\u2295",
        otimes: "\u2297",
        perp: "\u22A5",
        sdot: "\u22C5",
        Alpha: "\u0391",
        Beta: "\u0392",
        Gamma: "\u0393",
        Delta: "\u0394",
        Epsilon: "\u0395",
        Zeta: "\u0396",
        Eta: "\u0397",
        Theta: "\u0398",
        Iota: "\u0399",
        Kappa: "\u039A",
        Lambda: "\u039B",
        Mu: "\u039C",
        Nu: "\u039D",
        Xi: "\u039E",
        Omicron: "\u039F",
        Pi: "\u03A0",
        Rho: "\u03A1",
        Sigma: "\u03A3",
        Tau: "\u03A4",
        Upsilon: "\u03A5",
        Phi: "\u03A6",
        Chi: "\u03A7",
        Psi: "\u03A8",
        Omega: "\u03A9",
        alpha: "\u03B1",
        beta: "\u03B2",
        gamma: "\u03B3",
        delta: "\u03B4",
        epsilon: "\u03B5",
        zeta: "\u03B6",
        eta: "\u03B7",
        theta: "\u03B8",
        iota: "\u03B9",
        kappa: "\u03BA",
        lambda: "\u03BB",
        mu: "\u03BC",
        nu: "\u03BD",
        xi: "\u03BE",
        omicron: "\u03BF",
        pi: "\u03C0",
        rho: "\u03C1",
        sigmaf: "\u03C2",
        sigma: "\u03C3",
        tau: "\u03C4",
        upsilon: "\u03C5",
        phi: "\u03C6",
        chi: "\u03C7",
        psi: "\u03C8",
        omega: "\u03C9",
        thetasym: "\u03D1",
        upsih: "\u03D2",
        piv: "\u03D6",
        OElig: "\u0152",
        oelig: "\u0153",
        Scaron: "\u0160",
        scaron: "\u0161",
        Yuml: "\u0178",
        fnof: "\u0192",
        circ: "\u02C6",
        tilde: "\u02DC",
        ensp: "\u2002",
        emsp: "\u2003",
        thinsp: "\u2009",
        zwnj: "\u200C",
        zwj: "\u200D",
        lrm: "\u200E",
        rlm: "\u200F",
        ndash: "\u2013",
        mdash: "\u2014",
        lsquo: "\u2018",
        rsquo: "\u2019",
        sbquo: "\u201A",
        ldquo: "\u201C",
        rdquo: "\u201D",
        bdquo: "\u201E",
        dagger: "\u2020",
        Dagger: "\u2021",
        bull: "\u2022",
        hellip: "\u2026",
        permil: "\u2030",
        prime: "\u2032",
        Prime: "\u2033",
        lsaquo: "\u2039",
        rsaquo: "\u203A",
        oline: "\u203E",
        euro: "\u20AC",
        trade: "\u2122",
        larr: "\u2190",
        uarr: "\u2191",
        rarr: "\u2192",
        darr: "\u2193",
        harr: "\u2194",
        crarr: "\u21B5",
        lceil: "\u2308",
        rceil: "\u2309",
        lfloor: "\u230A",
        rfloor: "\u230B",
        loz: "\u25CA",
        spades: "\u2660",
        clubs: "\u2663",
        hearts: "\u2665",
        diams: "\u2666"
      });
      exports.entityMap = exports.HTML_ENTITIES;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/sax.js
  var require_sax = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
      var NAMESPACE = require_conventions().NAMESPACE;
      var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
      var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
      var S_TAG = 0;
      var S_ATTR = 1;
      var S_ATTR_SPACE = 2;
      var S_EQ = 3;
      var S_ATTR_NOQUOT_VALUE = 4;
      var S_ATTR_END = 5;
      var S_TAG_SPACE = 6;
      var S_TAG_CLOSE = 7;
      function ParseError(message, locator) {
        this.message = message;
        this.locator = locator;
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, ParseError);
      }
      ParseError.prototype = new Error();
      ParseError.prototype.name = ParseError.name;
      function XMLReader() {
      }
      XMLReader.prototype = {
        parse: function(source, defaultNSMap, entityMap) {
          var domBuilder = this.domBuilder;
          domBuilder.startDocument();
          _copy(defaultNSMap, defaultNSMap = {});
          parse(
            source,
            defaultNSMap,
            entityMap,
            domBuilder,
            this.errorHandler
          );
          domBuilder.endDocument();
        }
      };
      function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
        function fixedFromCharCode(code) {
          if (code > 65535) {
            code -= 65536;
            var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
            return String.fromCharCode(surrogate1, surrogate2);
          } else {
            return String.fromCharCode(code);
          }
        }
        function entityReplacer(a2) {
          var k = a2.slice(1, -1);
          if (Object.hasOwnProperty.call(entityMap, k)) {
            return entityMap[k];
          } else if (k.charAt(0) === "#") {
            return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
          } else {
            errorHandler.error("entity not found:" + a2);
            return a2;
          }
        }
        function appendText(end2) {
          if (end2 > start) {
            var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
            locator && position(start);
            domBuilder.characters(xt, 0, end2 - start);
            start = end2;
          }
        }
        function position(p, m) {
          while (p >= lineEnd && (m = linePattern.exec(source))) {
            lineStart = m.index;
            lineEnd = lineStart + m[0].length;
            locator.lineNumber++;
          }
          locator.columnNumber = p - lineStart + 1;
        }
        var lineStart = 0;
        var lineEnd = 0;
        var linePattern = /.*(?:\r\n?|\n)|.*$/g;
        var locator = domBuilder.locator;
        var parseStack = [{ currentNSMap: defaultNSMapCopy }];
        var closeMap = {};
        var start = 0;
        while (true) {
          try {
            var tagStart = source.indexOf("<", start);
            if (tagStart < 0) {
              if (!source.substr(start).match(/^\s*$/)) {
                var doc = domBuilder.doc;
                var text = doc.createTextNode(source.substr(start));
                doc.appendChild(text);
                domBuilder.currentElement = text;
              }
              return;
            }
            if (tagStart > start) {
              appendText(tagStart);
            }
            switch (source.charAt(tagStart + 1)) {
              case "/":
                var end = source.indexOf(">", tagStart + 3);
                var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
                var config2 = parseStack.pop();
                if (end < 0) {
                  tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                  errorHandler.error("end tag name: " + tagName + " is not complete:" + config2.tagName);
                  end = tagStart + 1 + tagName.length;
                } else if (tagName.match(/\s</)) {
                  tagName = tagName.replace(/[\s<].*/, "");
                  errorHandler.error("end tag name: " + tagName + " maybe not complete");
                  end = tagStart + 1 + tagName.length;
                }
                var localNSMap = config2.localNSMap;
                var endMatch = config2.tagName == tagName;
                var endIgnoreCaseMach = endMatch || config2.tagName && config2.tagName.toLowerCase() == tagName.toLowerCase();
                if (endIgnoreCaseMach) {
                  domBuilder.endElement(config2.uri, config2.localName, tagName);
                  if (localNSMap) {
                    for (var prefix in localNSMap) {
                      if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                        domBuilder.endPrefixMapping(prefix);
                      }
                    }
                  }
                  if (!endMatch) {
                    errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config2.tagName);
                  }
                } else {
                  parseStack.push(config2);
                }
                end++;
                break;
              case "?":
                locator && position(tagStart);
                end = parseInstruction(source, tagStart, domBuilder);
                break;
              case "!":
                locator && position(tagStart);
                end = parseDCC(source, tagStart, domBuilder, errorHandler);
                break;
              default:
                locator && position(tagStart);
                var el = new ElementAttributes();
                var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
                var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
                var len = el.length;
                if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                  el.closed = true;
                  if (!entityMap.nbsp) {
                    errorHandler.warning("unclosed xml attribute");
                  }
                }
                if (locator && len) {
                  var locator2 = copyLocator(locator, {});
                  for (var i = 0; i < len; i++) {
                    var a = el[i];
                    position(a.offset);
                    a.locator = copyLocator(locator, {});
                  }
                  domBuilder.locator = locator2;
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                  domBuilder.locator = locator;
                } else {
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                }
                if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                  end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
                } else {
                  end++;
                }
            }
          } catch (e) {
            if (e instanceof ParseError) {
              throw e;
            }
            errorHandler.error("element parse error: " + e);
            end = -1;
          }
          if (end > start) {
            start = end;
          } else {
            appendText(Math.max(tagStart, start) + 1);
          }
        }
      }
      function copyLocator(f, t) {
        t.lineNumber = f.lineNumber;
        t.columnNumber = f.columnNumber;
        return t;
      }
      function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
        function addAttribute(qname, value2, startIndex) {
          if (el.attributeNames.hasOwnProperty(qname)) {
            errorHandler.fatalError("Attribute " + qname + " redefined");
          }
          el.addValue(
            qname,
            // @see https://www.w3.org/TR/xml/#AVNormalize
            // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
            // - recursive replacement of (DTD) entity references
            // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
            value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
            startIndex
          );
        }
        var attrName;
        var value;
        var p = ++start;
        var s = S_TAG;
        while (true) {
          var c = source.charAt(p);
          switch (c) {
            case "=":
              if (s === S_ATTR) {
                attrName = source.slice(start, p);
                s = S_EQ;
              } else if (s === S_ATTR_SPACE) {
                s = S_EQ;
              } else {
                throw new Error("attribute equal must after attrName");
              }
              break;
            case "'":
            case '"':
              if (s === S_EQ || s === S_ATTR) {
                if (s === S_ATTR) {
                  errorHandler.warning('attribute value must after "="');
                  attrName = source.slice(start, p);
                }
                start = p + 1;
                p = source.indexOf(c, start);
                if (p > 0) {
                  value = source.slice(start, p);
                  addAttribute(attrName, value, start - 1);
                  s = S_ATTR_END;
                } else {
                  throw new Error("attribute value no end '" + c + "' match");
                }
              } else if (s == S_ATTR_NOQUOT_VALUE) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start);
                errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
                start = p + 1;
                s = S_ATTR_END;
              } else {
                throw new Error('attribute value must after "="');
              }
              break;
            case "/":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  s = S_TAG_CLOSE;
                  el.closed = true;
                case S_ATTR_NOQUOT_VALUE:
                case S_ATTR:
                case S_ATTR_SPACE:
                  break;
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              errorHandler.error("unexpected end of input");
              if (s == S_TAG) {
                el.setTagName(source.slice(start, p));
              }
              return p;
            case ">":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  break;
                case S_ATTR_NOQUOT_VALUE:
                case S_ATTR:
                  value = source.slice(start, p);
                  if (value.slice(-1) === "/") {
                    el.closed = true;
                    value = value.slice(0, -1);
                  }
                case S_ATTR_SPACE:
                  if (s === S_ATTR_SPACE) {
                    value = attrName;
                  }
                  if (s == S_ATTR_NOQUOT_VALUE) {
                    errorHandler.warning('attribute "' + value + '" missed quot(")!');
                    addAttribute(attrName, value, start);
                  } else {
                    if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                      errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                    }
                    addAttribute(value, value, start);
                  }
                  break;
                case S_EQ:
                  throw new Error("attribute value missed!!");
              }
              return p;
            case "\x80":
              c = " ";
            default:
              if (c <= " ") {
                switch (s) {
                  case S_TAG:
                    el.setTagName(source.slice(start, p));
                    s = S_TAG_SPACE;
                    break;
                  case S_ATTR:
                    attrName = source.slice(start, p);
                    s = S_ATTR_SPACE;
                    break;
                  case S_ATTR_NOQUOT_VALUE:
                    var value = source.slice(start, p);
                    errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                    addAttribute(attrName, value, start);
                  case S_ATTR_END:
                    s = S_TAG_SPACE;
                    break;
                }
              } else {
                switch (s) {
                  case S_ATTR_SPACE:
                    var tagName = el.tagName;
                    if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                      errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                    }
                    addAttribute(attrName, attrName, start);
                    start = p;
                    s = S_ATTR;
                    break;
                  case S_ATTR_END:
                    errorHandler.warning('attribute space is required"' + attrName + '"!!');
                  case S_TAG_SPACE:
                    s = S_ATTR;
                    start = p;
                    break;
                  case S_EQ:
                    s = S_ATTR_NOQUOT_VALUE;
                    start = p;
                    break;
                  case S_TAG_CLOSE:
                    throw new Error("elements closed character '/' and '>' must be connected to");
                }
              }
          }
          p++;
        }
      }
      function appendElement(el, domBuilder, currentNSMap) {
        var tagName = el.tagName;
        var localNSMap = null;
        var i = el.length;
        while (i--) {
          var a = el[i];
          var qName = a.qName;
          var value = a.value;
          var nsp = qName.indexOf(":");
          if (nsp > 0) {
            var prefix = a.prefix = qName.slice(0, nsp);
            var localName = qName.slice(nsp + 1);
            var nsPrefix = prefix === "xmlns" && localName;
          } else {
            localName = qName;
            prefix = null;
            nsPrefix = qName === "xmlns" && "";
          }
          a.localName = localName;
          if (nsPrefix !== false) {
            if (localNSMap == null) {
              localNSMap = {};
              _copy(currentNSMap, currentNSMap = {});
            }
            currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
            a.uri = NAMESPACE.XMLNS;
            domBuilder.startPrefixMapping(nsPrefix, value);
          }
        }
        var i = el.length;
        while (i--) {
          a = el[i];
          var prefix = a.prefix;
          if (prefix) {
            if (prefix === "xml") {
              a.uri = NAMESPACE.XML;
            }
            if (prefix !== "xmlns") {
              a.uri = currentNSMap[prefix || ""];
            }
          }
        }
        var nsp = tagName.indexOf(":");
        if (nsp > 0) {
          prefix = el.prefix = tagName.slice(0, nsp);
          localName = el.localName = tagName.slice(nsp + 1);
        } else {
          prefix = null;
          localName = el.localName = tagName;
        }
        var ns = el.uri = currentNSMap[prefix || ""];
        domBuilder.startElement(ns, localName, tagName, el);
        if (el.closed) {
          domBuilder.endElement(ns, localName, tagName);
          if (localNSMap) {
            for (prefix in localNSMap) {
              if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                domBuilder.endPrefixMapping(prefix);
              }
            }
          }
        } else {
          el.currentNSMap = currentNSMap;
          el.localNSMap = localNSMap;
          return true;
        }
      }
      function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
        if (/^(?:script|textarea)$/i.test(tagName)) {
          var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
          var text = source.substring(elStartEnd + 1, elEndStart);
          if (/[&<]/.test(text)) {
            if (/^script$/i.test(tagName)) {
              domBuilder.characters(text, 0, text.length);
              return elEndStart;
            }
            text = text.replace(/&#?\w+;/g, entityReplacer);
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
        }
        return elStartEnd + 1;
      }
      function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
        var pos = closeMap[tagName];
        if (pos == null) {
          pos = source.lastIndexOf("</" + tagName + ">");
          if (pos < elStartEnd) {
            pos = source.lastIndexOf("</" + tagName);
          }
          closeMap[tagName] = pos;
        }
        return pos < elStartEnd;
      }
      function _copy(source, target) {
        for (var n in source) {
          if (Object.prototype.hasOwnProperty.call(source, n)) {
            target[n] = source[n];
          }
        }
      }
      function parseDCC(source, start, domBuilder, errorHandler) {
        var next = source.charAt(start + 2);
        switch (next) {
          case "-":
            if (source.charAt(start + 3) === "-") {
              var end = source.indexOf("-->", start + 4);
              if (end > start) {
                domBuilder.comment(source, start + 4, end - start - 4);
                return end + 3;
              } else {
                errorHandler.error("Unclosed comment");
                return -1;
              }
            } else {
              return -1;
            }
          default:
            if (source.substr(start + 3, 6) == "CDATA[") {
              var end = source.indexOf("]]>", start + 9);
              domBuilder.startCDATA();
              domBuilder.characters(source, start + 9, end - start - 9);
              domBuilder.endCDATA();
              return end + 3;
            }
            var matchs = split(source, start);
            var len = matchs.length;
            if (len > 1 && /!doctype/i.test(matchs[0][0])) {
              var name = matchs[1][0];
              var pubid = false;
              var sysid = false;
              if (len > 3) {
                if (/^public$/i.test(matchs[2][0])) {
                  pubid = matchs[3][0];
                  sysid = len > 4 && matchs[4][0];
                } else if (/^system$/i.test(matchs[2][0])) {
                  sysid = matchs[3][0];
                }
              }
              var lastMatch = matchs[len - 1];
              domBuilder.startDTD(name, pubid, sysid);
              domBuilder.endDTD();
              return lastMatch.index + lastMatch[0].length;
            }
        }
        return -1;
      }
      function parseInstruction(source, start, domBuilder) {
        var end = source.indexOf("?>", start);
        if (end) {
          var match7 = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
          if (match7) {
            var len = match7[0].length;
            domBuilder.processingInstruction(match7[1], match7[2]);
            return end + 2;
          } else {
            return -1;
          }
        }
        return -1;
      }
      function ElementAttributes() {
        this.attributeNames = {};
      }
      ElementAttributes.prototype = {
        setTagName: function(tagName) {
          if (!tagNamePattern.test(tagName)) {
            throw new Error("invalid tagName:" + tagName);
          }
          this.tagName = tagName;
        },
        addValue: function(qName, value, offset) {
          if (!tagNamePattern.test(qName)) {
            throw new Error("invalid attribute:" + qName);
          }
          this.attributeNames[qName] = this.length;
          this[this.length++] = { qName, value, offset };
        },
        length: 0,
        getLocalName: function(i) {
          return this[i].localName;
        },
        getLocator: function(i) {
          return this[i].locator;
        },
        getQName: function(i) {
          return this[i].qName;
        },
        getURI: function(i) {
          return this[i].uri;
        },
        getValue: function(i) {
          return this[i].value;
        }
        //	,getIndex:function(uri, localName)){
        //		if(localName){
        //
        //		}else{
        //			var qName = uri
        //		}
        //	},
        //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
        //	getType:function(uri,localName){}
        //	getType:function(i){},
      };
      function split(source, start) {
        var match7;
        var buf = [];
        var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
        reg.lastIndex = start;
        reg.exec(source);
        while (match7 = reg.exec(source)) {
          buf.push(match7);
          if (match7[1])
            return buf;
        }
      }
      exports.XMLReader = XMLReader;
      exports.ParseError = ParseError;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/dom-parser.js
  var require_dom_parser = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
      var conventions = require_conventions();
      var dom = require_dom();
      var entities = require_entities();
      var sax = require_sax();
      var DOMImplementation = dom.DOMImplementation;
      var NAMESPACE = conventions.NAMESPACE;
      var ParseError = sax.ParseError;
      var XMLReader = sax.XMLReader;
      function normalizeLineEndings(input) {
        return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
      }
      function DOMParser3(options) {
        this.options = options || { locator: {} };
      }
      DOMParser3.prototype.parseFromString = function(source, mimeType) {
        var options = this.options;
        var sax2 = new XMLReader();
        var domBuilder = options.domBuilder || new DOMHandler();
        var errorHandler = options.errorHandler;
        var locator = options.locator;
        var defaultNSMap = options.xmlns || {};
        var isHTML = /\/x?html?$/.test(mimeType);
        var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
        if (locator) {
          domBuilder.setDocumentLocator(locator);
        }
        sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
        sax2.domBuilder = options.domBuilder || domBuilder;
        if (isHTML) {
          defaultNSMap[""] = NAMESPACE.HTML;
        }
        defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
        var normalize = options.normalizeLineEndings || normalizeLineEndings;
        if (source && typeof source === "string") {
          sax2.parse(
            normalize(source),
            defaultNSMap,
            entityMap
          );
        } else {
          sax2.errorHandler.error("invalid doc source");
        }
        return domBuilder.doc;
      };
      function buildErrorHandler(errorImpl, domBuilder, locator) {
        if (!errorImpl) {
          if (domBuilder instanceof DOMHandler) {
            return domBuilder;
          }
          errorImpl = domBuilder;
        }
        var errorHandler = {};
        var isCallback = errorImpl instanceof Function;
        locator = locator || {};
        function build(key) {
          var fn = errorImpl[key];
          if (!fn && isCallback) {
            fn = errorImpl.length == 2 ? function(msg) {
              errorImpl(key, msg);
            } : errorImpl;
          }
          errorHandler[key] = fn && function(msg) {
            fn("[xmldom " + key + "]	" + msg + _locator(locator));
          } || function() {
          };
        }
        build("warning");
        build("error");
        build("fatalError");
        return errorHandler;
      }
      function DOMHandler() {
        this.cdata = false;
      }
      function position(locator, node) {
        node.lineNumber = locator.lineNumber;
        node.columnNumber = locator.columnNumber;
      }
      DOMHandler.prototype = {
        startDocument: function() {
          this.doc = new DOMImplementation().createDocument(null, null, null);
          if (this.locator) {
            this.doc.documentURI = this.locator.systemId;
          }
        },
        startElement: function(namespaceURI, localName, qName, attrs) {
          var doc = this.doc;
          var el = doc.createElementNS(namespaceURI, qName || localName);
          var len = attrs.length;
          appendElement(this, el);
          this.currentElement = el;
          this.locator && position(this.locator, el);
          for (var i = 0; i < len; i++) {
            var namespaceURI = attrs.getURI(i);
            var value = attrs.getValue(i);
            var qName = attrs.getQName(i);
            var attr = doc.createAttributeNS(namespaceURI, qName);
            this.locator && position(attrs.getLocator(i), attr);
            attr.value = attr.nodeValue = value;
            el.setAttributeNode(attr);
          }
        },
        endElement: function(namespaceURI, localName, qName) {
          var current = this.currentElement;
          var tagName = current.tagName;
          this.currentElement = current.parentNode;
        },
        startPrefixMapping: function(prefix, uri) {
        },
        endPrefixMapping: function(prefix) {
        },
        processingInstruction: function(target, data) {
          var ins = this.doc.createProcessingInstruction(target, data);
          this.locator && position(this.locator, ins);
          appendElement(this, ins);
        },
        ignorableWhitespace: function(ch, start, length) {
        },
        characters: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          if (chars) {
            if (this.cdata) {
              var charNode = this.doc.createCDATASection(chars);
            } else {
              var charNode = this.doc.createTextNode(chars);
            }
            if (this.currentElement) {
              this.currentElement.appendChild(charNode);
            } else if (/^\s*$/.test(chars)) {
              this.doc.appendChild(charNode);
            }
            this.locator && position(this.locator, charNode);
          }
        },
        skippedEntity: function(name) {
        },
        endDocument: function() {
          this.doc.normalize();
        },
        setDocumentLocator: function(locator) {
          if (this.locator = locator) {
            locator.lineNumber = 0;
          }
        },
        //LexicalHandler
        comment: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          var comm = this.doc.createComment(chars);
          this.locator && position(this.locator, comm);
          appendElement(this, comm);
        },
        startCDATA: function() {
          this.cdata = true;
        },
        endCDATA: function() {
          this.cdata = false;
        },
        startDTD: function(name, publicId, systemId) {
          var impl = this.doc.implementation;
          if (impl && impl.createDocumentType) {
            var dt = impl.createDocumentType(name, publicId, systemId);
            this.locator && position(this.locator, dt);
            appendElement(this, dt);
            this.doc.doctype = dt;
          }
        },
        /**
         * @see org.xml.sax.ErrorHandler
         * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
         */
        warning: function(error) {
          console.warn("[xmldom warning]	" + error, _locator(this.locator));
        },
        error: function(error) {
          console.error("[xmldom error]	" + error, _locator(this.locator));
        },
        fatalError: function(error) {
          throw new ParseError(error, this.locator);
        }
      };
      function _locator(l) {
        if (l) {
          return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
        }
      }
      function _toString(chars, start, length) {
        if (typeof chars == "string") {
          return chars.substr(start, length);
        } else {
          if (chars.length >= start + length || start) {
            return new java.lang.String(chars, start, length) + "";
          }
          return chars;
        }
      }
      "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
        DOMHandler.prototype[key] = function() {
          return null;
        };
      });
      function appendElement(hander, node) {
        if (!hander.currentElement) {
          hander.doc.appendChild(node);
        } else {
          hander.currentElement.appendChild(node);
        }
      }
      exports.__DOMHandler = DOMHandler;
      exports.normalizeLineEndings = normalizeLineEndings;
      exports.DOMParser = DOMParser3;
    }
  });

  // ../swirly/node_modules/@xmldom/xmldom/lib/index.js
  var require_lib = __commonJS({
    "../swirly/node_modules/@xmldom/xmldom/lib/index.js"(exports) {
      var dom = require_dom();
      exports.DOMImplementation = dom.DOMImplementation;
      exports.XMLSerializer = dom.XMLSerializer;
      exports.DOMParser = require_dom_parser().DOMParser;
    }
  });

  // ../swirly/packages/swirly-parser/dist/util/is-numeric.js
  var re = /^[-+]?(?:\d+|\d*(?:\.\d+))$/;
  var isNumeric = (str) => re.test(str);

  // ../swirly/packages/swirly-parser/dist/parsers/config.js
  var reLine = /^(.*?)(?:\s*(:?)=\s*(.*))?$/;
  var parseValue = (value) => {
    if (value == null) {
      return true;
    }
    if (isNumeric(value)) {
      return parseFloat(value);
    }
    return value;
  };
  var parseConfig = (lines, allowAssignment) => {
    const config2 = {};
    if (allowAssignment) {
      config2.values = {};
    }
    for (const line of lines) {
      const match7 = reLine.exec(line.trim());
      if (match7 != null) {
        const [, name, isAssignment, value] = match7;
        if (isAssignment) {
          config2.values[name] = value;
        } else {
          config2[name] = parseValue(value);
        }
      }
    }
    return config2;
  };

  // ../swirly/packages/swirly-parser/dist/parsers/diagram-styles.js
  var match = (line) => line === "[styles]";
  var run = (lines, ctx) => {
    const extraStyles = parseConfig(lines.slice(1), false);
    Object.assign(ctx.diagramStyles, extraStyles);
  };
  var diagramStylesParser = {
    match,
    run
  };

  // ../swirly/packages/swirly-parser/dist/spec/grid-row.js
  var createGridStreamRowSpecification = (title, slots) => ({
    kind: "R",
    rowKind: "stream",
    title: title !== "" ? title : null,
    slots
  });
  var createGridCellRowSpecification = (title, slots, from2 = null, to = null) => ({
    kind: "R",
    rowKind: "cell",
    title: title !== "" ? title : null,
    slots,
    from: from2,
    to
  });
  var createGridAnnotationRowSpecification = (title, slots) => ({
    kind: "R",
    rowKind: "annotation",
    title: title !== "" ? title : null,
    slots
  });

  // ../swirly/packages/swirly-parser/dist/parsers/grid-row.js
  var reSigil = /^[>=.]\s+/;
  var reMatch = /^[>=.]\s+[^\s|]+\s*\|/;
  var match2 = (line) => reMatch.test(line);
  var parseSlot = (raw) => {
    const value = raw.trim();
    return value === "" ? { kind: "empty" } : { kind: "text", value };
  };
  var asLabel = (value) => typeof value === "string" || typeof value === "number" ? String(value) : null;
  var run2 = (lines, ctx) => {
    if (ctx.gridMode !== true) {
      throw new Error("A grid row is only meaningful in a diagram with a time axis; declare one with an `@` block.");
    }
    const [header, ...configLines] = lines;
    const config2 = parseConfig(configLines, false);
    const sigil = header[0];
    const segments = header.replace(reSigil, "").split("|");
    if (segments.length > 1 && segments[segments.length - 1].trim() === "") {
      segments.pop();
    }
    const [titleSegment, ...slotSegments] = segments;
    const title = typeof config2.title === "string" ? config2.title : titleSegment.trim();
    if (slotSegments.length === 0) {
      throw new Error("A grid row must declare at least one slot, as in `> s1 | 5 | 10 | 12`");
    }
    const slots = slotSegments.map(parseSlot);
    switch (sigil) {
      case "=":
        ctx.content.push(createGridCellRowSpecification(title, slots, asLabel(config2.from), asLabel(config2.to)));
        break;
      case ".":
        ctx.content.push(createGridAnnotationRowSpecification(title, slots));
        break;
      default:
        ctx.content.push(createGridStreamRowSpecification(title, slots));
    }
  };
  var gridRowParser = {
    match: match2,
    run: run2
  };

  // ../swirly/packages/swirly-parser/dist/parsers/message-styles.js
  var reHeader = /^\[styles\.(.)\]$/;
  var match3 = (line) => reHeader.test(line);
  var run3 = (lines, ctx) => {
    const [headerLine, ...configLines] = lines;
    const [, message] = reHeader.exec(headerLine);
    ctx.messageStyles[message] = parseConfig(configLines, false);
  };
  var messageStylesParser = {
    match: match3,
    run: run3
  };

  // ../swirly/packages/swirly-parser/dist/spec/operator.js
  var createOperatorSpecification = (title) => ({
    kind: "O",
    title
  });

  // ../swirly/node_modules/tslib/tslib.es6.js
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x) {
    return x;
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/testing/SubscriptionLog.js
  var SubscriptionLog = function() {
    function SubscriptionLog2(subscribedFrame, unsubscribedFrame) {
      if (unsubscribedFrame === void 0) {
        unsubscribedFrame = Infinity;
      }
      this.subscribedFrame = subscribedFrame;
      this.unsubscribedFrame = unsubscribedFrame;
    }
    return SubscriptionLog2;
  }();

  // ../swirly/node_modules/rxjs/dist/esm5/internal/testing/SubscriptionLoggable.js
  var SubscriptionLoggable = function() {
    function SubscriptionLoggable2() {
      this.subscriptions = [];
    }
    SubscriptionLoggable2.prototype.logSubscribedFrame = function() {
      this.subscriptions.push(new SubscriptionLog(this.scheduler.now()));
      return this.subscriptions.length - 1;
    };
    SubscriptionLoggable2.prototype.logUnsubscribedFrame = function(index) {
      var subscriptionLogs = this.subscriptions;
      var oldSubscriptionLog = subscriptionLogs[index];
      subscriptionLogs[index] = new SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    };
    return SubscriptionLoggable2;
  }();

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/applyMixins.js
  function applyMixins(derivedCtor, baseCtors) {
    for (var i = 0, len = baseCtors.length; i < len; i++) {
      var baseCtor = baseCtors[i];
      var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
      for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
        var name_1 = propertyKeys[j];
        derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
      }
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/observable/empty.js
  var EMPTY = new Observable(function(subscriber) {
    return subscriber.complete();
  });

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
  function isScheduler(value) {
    return value && isFunction(value.schedule);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/args.js
  function last(arr) {
    return arr[arr.length - 1];
  }
  function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : void 0;
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false)
              return [3, 8];
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/lift.js
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay);
      }, function() {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay);
      }, function(err) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay);
      }));
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
  function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay));
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
  function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
  function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
  function scheduleArray(input, scheduler) {
    return new Observable(function(subscriber) {
      var i = 0;
      return scheduler.schedule(function() {
        if (i === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
  function scheduleIterable(input, scheduler) {
    return new Observable(function(subscriber) {
      var iterator2;
      executeSchedule(subscriber, scheduler, function() {
        iterator2 = input[iterator]();
        executeSchedule(subscriber, scheduler, function() {
          var _a;
          var value;
          var done;
          try {
            _a = iterator2.next(), value = _a.value, done = _a.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
      };
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable(function(subscriber) {
      executeSchedule(subscriber, scheduler, function() {
        var iterator2 = input[Symbol.asyncIterator]();
        executeSchedule(subscriber, scheduler, function() {
          iterator2.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable(input)) {
        return scheduleObservable(input, scheduler);
      }
      if (isArrayLike(input)) {
        return scheduleArray(input, scheduler);
      }
      if (isPromise(input)) {
        return schedulePromise(input, scheduler);
      }
      if (isAsyncIterable(input)) {
        return scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable(input)) {
        return scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike(input)) {
        return scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw createInvalidObservableTypeError(input);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/observable/from.js
  function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/observable/of.js
  function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/observable/throwError.js
  function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
      return errorOrErrorFactory;
    };
    var init = function(subscriber) {
      return subscriber.error(errorFactory());
    };
    return new Observable(scheduler ? function(subscriber) {
      return scheduler.schedule(init, 0, subscriber);
    } : init);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Notification.js
  var NotificationKind;
  (function(NotificationKind3) {
    NotificationKind3["NEXT"] = "N";
    NotificationKind3["ERROR"] = "E";
    NotificationKind3["COMPLETE"] = "C";
  })(NotificationKind || (NotificationKind = {}));
  var Notification = function() {
    function Notification2(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === "N";
    }
    Notification2.prototype.observe = function(observer) {
      return observeNotification(this, observer);
    };
    Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
      var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
      return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification2.prototype.accept = function(nextOrObserver, error, complete) {
      var _a;
      return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
    };
    Notification2.prototype.toObservable = function() {
      var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
      var result = kind === "N" ? of(value) : kind === "E" ? throwError(function() {
        return error;
      }) : kind === "C" ? EMPTY : 0;
      if (!result) {
        throw new TypeError("Unexpected notification kind " + kind);
      }
      return result;
    };
    Notification2.createNext = function(value) {
      return new Notification2("N", value);
    };
    Notification2.createError = function(err) {
      return new Notification2("E", void 0, err);
    };
    Notification2.createComplete = function() {
      return Notification2.completeNotification;
    };
    Notification2.completeNotification = new Notification2("C");
    return Notification2;
  }();
  function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== "string") {
      throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
  }

  // ../swirly/node_modules/rxjs/dist/esm5/internal/testing/ColdObservable.js
  var ColdObservable = function(_super) {
    __extends(ColdObservable2, _super);
    function ColdObservable2(messages, scheduler) {
      var _this = _super.call(this, function(subscriber) {
        var observable2 = this;
        var index = observable2.logSubscribedFrame();
        var subscription = new Subscription();
        subscription.add(new Subscription(function() {
          observable2.logUnsubscribedFrame(index);
        }));
        observable2.scheduleMessages(subscriber);
        return subscription;
      }) || this;
      _this.messages = messages;
      _this.subscriptions = [];
      _this.scheduler = scheduler;
      return _this;
    }
    ColdObservable2.prototype.scheduleMessages = function(subscriber) {
      var messagesLength = this.messages.length;
      for (var i = 0; i < messagesLength; i++) {
        var message = this.messages[i];
        subscriber.add(this.scheduler.schedule(function(state) {
          var _a = state, notification = _a.message.notification, destination = _a.subscriber;
          observeNotification(notification, destination);
        }, message.frame, { message, subscriber }));
      }
    };
    return ColdObservable2;
  }(Observable);
  applyMixins(ColdObservable, [SubscriptionLoggable]);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/testing/HotObservable.js
  var HotObservable = function(_super) {
    __extends(HotObservable2, _super);
    function HotObservable2(messages, scheduler) {
      var _this = _super.call(this) || this;
      _this.messages = messages;
      _this.subscriptions = [];
      _this.scheduler = scheduler;
      return _this;
    }
    HotObservable2.prototype._subscribe = function(subscriber) {
      var subject = this;
      var index = subject.logSubscribedFrame();
      var subscription = new Subscription();
      subscription.add(new Subscription(function() {
        subject.logUnsubscribedFrame(index);
      }));
      subscription.add(_super.prototype._subscribe.call(this, subscriber));
      return subscription;
    };
    HotObservable2.prototype.setup = function() {
      var subject = this;
      var messagesLength = subject.messages.length;
      var _loop_1 = function(i2) {
        (function() {
          var _a = subject.messages[i2], notification = _a.notification, frame = _a.frame;
          subject.scheduler.schedule(function() {
            observeNotification(notification, subject);
          }, frame);
        })();
      };
      for (var i = 0; i < messagesLength; i++) {
        _loop_1(i);
      }
    };
    return HotObservable2;
  }(Subject);
  applyMixins(HotObservable, [SubscriptionLoggable]);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
  var Action = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this;
    };
    return Action2;
  }(Subscription);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
  var intervalProvider = {
    setInterval: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = intervalProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
        return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function(handle) {
      var delegate = intervalProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
  var AsyncAction = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay) {
      var _a;
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay != null && this.delay === delay && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
  var dateTimestampProvider = {
    now: function() {
      return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/Scheduler.js
  var Scheduler = function() {
    function Scheduler2(schedulerActionCtor, now) {
      if (now === void 0) {
        now = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    Scheduler2.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler2.now = dateTimestampProvider.now;
    return Scheduler2;
  }();

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
  var AsyncScheduler = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js
  var VirtualTimeScheduler = function(_super) {
    __extends(VirtualTimeScheduler2, _super);
    function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
      if (schedulerActionCtor === void 0) {
        schedulerActionCtor = VirtualAction;
      }
      if (maxFrames === void 0) {
        maxFrames = Infinity;
      }
      var _this = _super.call(this, schedulerActionCtor, function() {
        return _this.frame;
      }) || this;
      _this.maxFrames = maxFrames;
      _this.frame = 0;
      _this.index = -1;
      return _this;
    }
    VirtualTimeScheduler2.prototype.flush = function() {
      var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
      var error;
      var action;
      while ((action = actions[0]) && action.delay <= maxFrames) {
        actions.shift();
        this.frame = action.delay;
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      }
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    VirtualTimeScheduler2.frameTimeFactor = 10;
    return VirtualTimeScheduler2;
  }(AsyncScheduler);
  var VirtualAction = function(_super) {
    __extends(VirtualAction2, _super);
    function VirtualAction2(scheduler, work, index) {
      if (index === void 0) {
        index = scheduler.index += 1;
      }
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.index = index;
      _this.active = true;
      _this.index = scheduler.index = index;
      return _this;
    }
    VirtualAction2.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (Number.isFinite(delay)) {
        if (!this.id) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction2(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
      } else {
        return Subscription.EMPTY;
      }
    };
    VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      this.delay = scheduler.frame + delay;
      var actions = scheduler.actions;
      actions.push(this);
      actions.sort(VirtualAction2.sortActions);
      return 1;
    };
    VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return void 0;
    };
    VirtualAction2.prototype._execute = function(state, delay) {
      if (this.active === true) {
        return _super.prototype._execute.call(this, state, delay);
      }
    };
    VirtualAction2.sortActions = function(a, b) {
      if (a.delay === b.delay) {
        if (a.index === b.index) {
          return 0;
        } else if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.delay > b.delay) {
        return 1;
      } else {
        return -1;
      }
    };
    return VirtualAction2;
  }(AsyncAction);

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js
  var performanceTimestampProvider = {
    now: function() {
      return (performanceTimestampProvider.delegate || performance).now();
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js
  var animationFrameProvider = {
    schedule: function(callback) {
      var request = requestAnimationFrame;
      var cancel = cancelAnimationFrame;
      var delegate = animationFrameProvider.delegate;
      if (delegate) {
        request = delegate.requestAnimationFrame;
        cancel = delegate.cancelAnimationFrame;
      }
      var handle = request(function(timestamp) {
        cancel = void 0;
        callback(timestamp);
      });
      return new Subscription(function() {
        return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
      });
    },
    requestAnimationFrame: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = animationFrameProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/util/Immediate.js
  var nextHandle = 1;
  var resolved;
  var activeHandles = {};
  function findAndClearHandle(handle) {
    if (handle in activeHandles) {
      delete activeHandles[handle];
      return true;
    }
    return false;
  }
  var Immediate = {
    setImmediate: function(cb) {
      var handle = nextHandle++;
      activeHandles[handle] = true;
      if (!resolved) {
        resolved = Promise.resolve();
      }
      resolved.then(function() {
        return findAndClearHandle(handle) && cb();
      });
      return handle;
    },
    clearImmediate: function(handle) {
      findAndClearHandle(handle);
    }
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js
  var setImmediate = Immediate.setImmediate;
  var clearImmediate = Immediate.clearImmediate;
  var immediateProvider = {
    setImmediate: function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var delegate = immediateProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
    },
    clearImmediate: function(handle) {
      var delegate = immediateProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: void 0
  };

  // ../swirly/node_modules/rxjs/dist/esm5/internal/testing/TestScheduler.js
  var defaultMaxFrame = 750;
  var TestScheduler = function(_super) {
    __extends(TestScheduler2, _super);
    function TestScheduler2(assertDeepEqual) {
      var _this = _super.call(this, VirtualAction, defaultMaxFrame) || this;
      _this.assertDeepEqual = assertDeepEqual;
      _this.hotObservables = [];
      _this.coldObservables = [];
      _this.flushTests = [];
      _this.runMode = false;
      return _this;
    }
    TestScheduler2.prototype.createTime = function(marbles) {
      var indexOf = this.runMode ? marbles.trim().indexOf("|") : marbles.indexOf("|");
      if (indexOf === -1) {
        throw new Error('marble diagram for time should have a completion marker "|"');
      }
      return indexOf * TestScheduler2.frameTimeFactor;
    };
    TestScheduler2.prototype.createColdObservable = function(marbles, values, error) {
      if (marbles.indexOf("^") !== -1) {
        throw new Error('cold observable cannot have subscription offset "^"');
      }
      if (marbles.indexOf("!") !== -1) {
        throw new Error('cold observable cannot have unsubscription marker "!"');
      }
      var messages = TestScheduler2.parseMarbles(marbles, values, error, void 0, this.runMode);
      var cold = new ColdObservable(messages, this);
      this.coldObservables.push(cold);
      return cold;
    };
    TestScheduler2.prototype.createHotObservable = function(marbles, values, error) {
      if (marbles.indexOf("!") !== -1) {
        throw new Error('hot observable cannot have unsubscription marker "!"');
      }
      var messages = TestScheduler2.parseMarbles(marbles, values, error, void 0, this.runMode);
      var subject = new HotObservable(messages, this);
      this.hotObservables.push(subject);
      return subject;
    };
    TestScheduler2.prototype.materializeInnerObservable = function(observable2, outerFrame) {
      var _this = this;
      var messages = [];
      observable2.subscribe({
        next: function(value) {
          messages.push({ frame: _this.frame - outerFrame, notification: nextNotification(value) });
        },
        error: function(error) {
          messages.push({ frame: _this.frame - outerFrame, notification: errorNotification(error) });
        },
        complete: function() {
          messages.push({ frame: _this.frame - outerFrame, notification: COMPLETE_NOTIFICATION });
        }
      });
      return messages;
    };
    TestScheduler2.prototype.expectObservable = function(observable2, subscriptionMarbles) {
      var _this = this;
      if (subscriptionMarbles === void 0) {
        subscriptionMarbles = null;
      }
      var actual = [];
      var flushTest = { actual, ready: false };
      var subscriptionParsed = TestScheduler2.parseMarblesAsSubscriptions(subscriptionMarbles, this.runMode);
      var subscriptionFrame = subscriptionParsed.subscribedFrame === Infinity ? 0 : subscriptionParsed.subscribedFrame;
      var unsubscriptionFrame = subscriptionParsed.unsubscribedFrame;
      var subscription;
      this.schedule(function() {
        subscription = observable2.subscribe({
          next: function(x) {
            var value = x instanceof Observable ? _this.materializeInnerObservable(x, _this.frame) : x;
            actual.push({ frame: _this.frame, notification: nextNotification(value) });
          },
          error: function(error) {
            actual.push({ frame: _this.frame, notification: errorNotification(error) });
          },
          complete: function() {
            actual.push({ frame: _this.frame, notification: COMPLETE_NOTIFICATION });
          }
        });
      }, subscriptionFrame);
      if (unsubscriptionFrame !== Infinity) {
        this.schedule(function() {
          return subscription.unsubscribe();
        }, unsubscriptionFrame);
      }
      this.flushTests.push(flushTest);
      var runMode = this.runMode;
      return {
        toBe: function(marbles, values, errorValue) {
          flushTest.ready = true;
          flushTest.expected = TestScheduler2.parseMarbles(marbles, values, errorValue, true, runMode);
        },
        toEqual: function(other) {
          flushTest.ready = true;
          flushTest.expected = [];
          _this.schedule(function() {
            subscription = other.subscribe({
              next: function(x) {
                var value = x instanceof Observable ? _this.materializeInnerObservable(x, _this.frame) : x;
                flushTest.expected.push({ frame: _this.frame, notification: nextNotification(value) });
              },
              error: function(error) {
                flushTest.expected.push({ frame: _this.frame, notification: errorNotification(error) });
              },
              complete: function() {
                flushTest.expected.push({ frame: _this.frame, notification: COMPLETE_NOTIFICATION });
              }
            });
          }, subscriptionFrame);
        }
      };
    };
    TestScheduler2.prototype.expectSubscriptions = function(actualSubscriptionLogs) {
      var flushTest = { actual: actualSubscriptionLogs, ready: false };
      this.flushTests.push(flushTest);
      var runMode = this.runMode;
      return {
        toBe: function(marblesOrMarblesArray) {
          var marblesArray = typeof marblesOrMarblesArray === "string" ? [marblesOrMarblesArray] : marblesOrMarblesArray;
          flushTest.ready = true;
          flushTest.expected = marblesArray.map(function(marbles) {
            return TestScheduler2.parseMarblesAsSubscriptions(marbles, runMode);
          }).filter(function(marbles) {
            return marbles.subscribedFrame !== Infinity;
          });
        }
      };
    };
    TestScheduler2.prototype.flush = function() {
      var _this = this;
      var hotObservables = this.hotObservables;
      while (hotObservables.length > 0) {
        hotObservables.shift().setup();
      }
      _super.prototype.flush.call(this);
      this.flushTests = this.flushTests.filter(function(test) {
        if (test.ready) {
          _this.assertDeepEqual(test.actual, test.expected);
          return false;
        }
        return true;
      });
    };
    TestScheduler2.parseMarblesAsSubscriptions = function(marbles, runMode) {
      var _this = this;
      if (runMode === void 0) {
        runMode = false;
      }
      if (typeof marbles !== "string") {
        return new SubscriptionLog(Infinity);
      }
      var characters = __spreadArray([], __read(marbles));
      var len = characters.length;
      var groupStart = -1;
      var subscriptionFrame = Infinity;
      var unsubscriptionFrame = Infinity;
      var frame = 0;
      var _loop_1 = function(i2) {
        var nextFrame = frame;
        var advanceFrameBy = function(count) {
          nextFrame += count * _this.frameTimeFactor;
        };
        var c = characters[i2];
        switch (c) {
          case " ":
            if (!runMode) {
              advanceFrameBy(1);
            }
            break;
          case "-":
            advanceFrameBy(1);
            break;
          case "(":
            groupStart = frame;
            advanceFrameBy(1);
            break;
          case ")":
            groupStart = -1;
            advanceFrameBy(1);
            break;
          case "^":
            if (subscriptionFrame !== Infinity) {
              throw new Error("found a second subscription point '^' in a subscription marble diagram. There can only be one.");
            }
            subscriptionFrame = groupStart > -1 ? groupStart : frame;
            advanceFrameBy(1);
            break;
          case "!":
            if (unsubscriptionFrame !== Infinity) {
              throw new Error("found a second unsubscription point '!' in a subscription marble diagram. There can only be one.");
            }
            unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
            break;
          default:
            if (runMode && c.match(/^[0-9]$/)) {
              if (i2 === 0 || characters[i2 - 1] === " ") {
                var buffer = characters.slice(i2).join("");
                var match7 = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
                if (match7) {
                  i2 += match7[0].length - 1;
                  var duration = parseFloat(match7[1]);
                  var unit = match7[2];
                  var durationInMs = void 0;
                  switch (unit) {
                    case "ms":
                      durationInMs = duration;
                      break;
                    case "s":
                      durationInMs = duration * 1e3;
                      break;
                    case "m":
                      durationInMs = duration * 1e3 * 60;
                      break;
                    default:
                      break;
                  }
                  advanceFrameBy(durationInMs / this_1.frameTimeFactor);
                  break;
                }
              }
            }
            throw new Error("there can only be '^' and '!' markers in a subscription marble diagram. Found instead '" + c + "'.");
        }
        frame = nextFrame;
        out_i_1 = i2;
      };
      var this_1 = this, out_i_1;
      for (var i = 0; i < len; i++) {
        _loop_1(i);
        i = out_i_1;
      }
      if (unsubscriptionFrame < 0) {
        return new SubscriptionLog(subscriptionFrame);
      } else {
        return new SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
      }
    };
    TestScheduler2.parseMarbles = function(marbles, values, errorValue, materializeInnerObservables, runMode) {
      var _this = this;
      if (materializeInnerObservables === void 0) {
        materializeInnerObservables = false;
      }
      if (runMode === void 0) {
        runMode = false;
      }
      if (marbles.indexOf("!") !== -1) {
        throw new Error('conventional marble diagrams cannot have the unsubscription marker "!"');
      }
      var characters = __spreadArray([], __read(marbles));
      var len = characters.length;
      var testMessages = [];
      var subIndex = runMode ? marbles.replace(/^[ ]+/, "").indexOf("^") : marbles.indexOf("^");
      var frame = subIndex === -1 ? 0 : subIndex * -this.frameTimeFactor;
      var getValue = typeof values !== "object" ? function(x) {
        return x;
      } : function(x) {
        if (materializeInnerObservables && values[x] instanceof ColdObservable) {
          return values[x].messages;
        }
        return values[x];
      };
      var groupStart = -1;
      var _loop_2 = function(i2) {
        var nextFrame = frame;
        var advanceFrameBy = function(count) {
          nextFrame += count * _this.frameTimeFactor;
        };
        var notification = void 0;
        var c = characters[i2];
        switch (c) {
          case " ":
            if (!runMode) {
              advanceFrameBy(1);
            }
            break;
          case "-":
            advanceFrameBy(1);
            break;
          case "(":
            groupStart = frame;
            advanceFrameBy(1);
            break;
          case ")":
            groupStart = -1;
            advanceFrameBy(1);
            break;
          case "|":
            notification = COMPLETE_NOTIFICATION;
            advanceFrameBy(1);
            break;
          case "^":
            advanceFrameBy(1);
            break;
          case "#":
            notification = errorNotification(errorValue || "error");
            advanceFrameBy(1);
            break;
          default:
            if (runMode && c.match(/^[0-9]$/)) {
              if (i2 === 0 || characters[i2 - 1] === " ") {
                var buffer = characters.slice(i2).join("");
                var match7 = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
                if (match7) {
                  i2 += match7[0].length - 1;
                  var duration = parseFloat(match7[1]);
                  var unit = match7[2];
                  var durationInMs = void 0;
                  switch (unit) {
                    case "ms":
                      durationInMs = duration;
                      break;
                    case "s":
                      durationInMs = duration * 1e3;
                      break;
                    case "m":
                      durationInMs = duration * 1e3 * 60;
                      break;
                    default:
                      break;
                  }
                  advanceFrameBy(durationInMs / this_2.frameTimeFactor);
                  break;
                }
              }
            }
            notification = nextNotification(getValue(c));
            advanceFrameBy(1);
            break;
        }
        if (notification) {
          testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification });
        }
        frame = nextFrame;
        out_i_2 = i2;
      };
      var this_2 = this, out_i_2;
      for (var i = 0; i < len; i++) {
        _loop_2(i);
        i = out_i_2;
      }
      return testMessages;
    };
    TestScheduler2.prototype.createAnimator = function() {
      var _this = this;
      if (!this.runMode) {
        throw new Error("animate() must only be used in run mode");
      }
      var lastHandle = 0;
      var map;
      var delegate = {
        requestAnimationFrame: function(callback) {
          if (!map) {
            throw new Error("animate() was not called within run()");
          }
          var handle = ++lastHandle;
          map.set(handle, callback);
          return handle;
        },
        cancelAnimationFrame: function(handle) {
          if (!map) {
            throw new Error("animate() was not called within run()");
          }
          map.delete(handle);
        }
      };
      var animate = function(marbles) {
        var e_1, _a;
        if (map) {
          throw new Error("animate() must not be called more than once within run()");
        }
        if (/[|#]/.test(marbles)) {
          throw new Error("animate() must not complete or error");
        }
        map = /* @__PURE__ */ new Map();
        var messages = TestScheduler2.parseMarbles(marbles, void 0, void 0, void 0, true);
        try {
          for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
            var message = messages_1_1.value;
            _this.schedule(function() {
              var e_2, _a2;
              var now = _this.now();
              var callbacks = Array.from(map.values());
              map.clear();
              try {
                for (var callbacks_1 = (e_2 = void 0, __values(callbacks)), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                  var callback = callbacks_1_1.value;
                  callback(now);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (callbacks_1_1 && !callbacks_1_1.done && (_a2 = callbacks_1.return))
                    _a2.call(callbacks_1);
                } finally {
                  if (e_2)
                    throw e_2.error;
                }
              }
            }, message.frame);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return))
              _a.call(messages_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      };
      return { animate, delegate };
    };
    TestScheduler2.prototype.createDelegates = function() {
      var _this = this;
      var lastHandle = 0;
      var scheduleLookup = /* @__PURE__ */ new Map();
      var run7 = function() {
        var now = _this.now();
        var scheduledRecords = Array.from(scheduleLookup.values());
        var scheduledRecordsDue = scheduledRecords.filter(function(_a2) {
          var due = _a2.due;
          return due <= now;
        });
        var dueImmediates = scheduledRecordsDue.filter(function(_a2) {
          var type = _a2.type;
          return type === "immediate";
        });
        if (dueImmediates.length > 0) {
          var _a = dueImmediates[0], handle = _a.handle, handler = _a.handler;
          scheduleLookup.delete(handle);
          handler();
          return;
        }
        var dueIntervals = scheduledRecordsDue.filter(function(_a2) {
          var type = _a2.type;
          return type === "interval";
        });
        if (dueIntervals.length > 0) {
          var firstDueInterval = dueIntervals[0];
          var duration = firstDueInterval.duration, handler = firstDueInterval.handler;
          firstDueInterval.due = now + duration;
          firstDueInterval.subscription = _this.schedule(run7, duration);
          handler();
          return;
        }
        var dueTimeouts = scheduledRecordsDue.filter(function(_a2) {
          var type = _a2.type;
          return type === "timeout";
        });
        if (dueTimeouts.length > 0) {
          var _b = dueTimeouts[0], handle = _b.handle, handler = _b.handler;
          scheduleLookup.delete(handle);
          handler();
          return;
        }
        throw new Error("Expected a due immediate or interval");
      };
      var immediate = {
        setImmediate: function(handler) {
          var handle = ++lastHandle;
          scheduleLookup.set(handle, {
            due: _this.now(),
            duration: 0,
            handle,
            handler,
            subscription: _this.schedule(run7, 0),
            type: "immediate"
          });
          return handle;
        },
        clearImmediate: function(handle) {
          var value = scheduleLookup.get(handle);
          if (value) {
            value.subscription.unsubscribe();
            scheduleLookup.delete(handle);
          }
        }
      };
      var interval = {
        setInterval: function(handler, duration) {
          if (duration === void 0) {
            duration = 0;
          }
          var handle = ++lastHandle;
          scheduleLookup.set(handle, {
            due: _this.now() + duration,
            duration,
            handle,
            handler,
            subscription: _this.schedule(run7, duration),
            type: "interval"
          });
          return handle;
        },
        clearInterval: function(handle) {
          var value = scheduleLookup.get(handle);
          if (value) {
            value.subscription.unsubscribe();
            scheduleLookup.delete(handle);
          }
        }
      };
      var timeout = {
        setTimeout: function(handler, duration) {
          if (duration === void 0) {
            duration = 0;
          }
          var handle = ++lastHandle;
          scheduleLookup.set(handle, {
            due: _this.now() + duration,
            duration,
            handle,
            handler,
            subscription: _this.schedule(run7, duration),
            type: "timeout"
          });
          return handle;
        },
        clearTimeout: function(handle) {
          var value = scheduleLookup.get(handle);
          if (value) {
            value.subscription.unsubscribe();
            scheduleLookup.delete(handle);
          }
        }
      };
      return { immediate, interval, timeout };
    };
    TestScheduler2.prototype.run = function(callback) {
      var prevFrameTimeFactor = TestScheduler2.frameTimeFactor;
      var prevMaxFrames = this.maxFrames;
      TestScheduler2.frameTimeFactor = 1;
      this.maxFrames = Infinity;
      this.runMode = true;
      var animator = this.createAnimator();
      var delegates = this.createDelegates();
      animationFrameProvider.delegate = animator.delegate;
      dateTimestampProvider.delegate = this;
      immediateProvider.delegate = delegates.immediate;
      intervalProvider.delegate = delegates.interval;
      timeoutProvider.delegate = delegates.timeout;
      performanceTimestampProvider.delegate = this;
      var helpers = {
        cold: this.createColdObservable.bind(this),
        hot: this.createHotObservable.bind(this),
        flush: this.flush.bind(this),
        time: this.createTime.bind(this),
        expectObservable: this.expectObservable.bind(this),
        expectSubscriptions: this.expectSubscriptions.bind(this),
        animate: animator.animate
      };
      try {
        var ret = callback(helpers);
        this.flush();
        return ret;
      } finally {
        TestScheduler2.frameTimeFactor = prevFrameTimeFactor;
        this.maxFrames = prevMaxFrames;
        this.runMode = false;
        animationFrameProvider.delegate = void 0;
        dateTimestampProvider.delegate = void 0;
        immediateProvider.delegate = void 0;
        intervalProvider.delegate = void 0;
        timeoutProvider.delegate = void 0;
        performanceTimestampProvider.delegate = void 0;
      }
    };
    TestScheduler2.frameTimeFactor = 10;
    return TestScheduler2;
  }(VirtualTimeScheduler);

  // ../swirly/packages/swirly-parser-rxjs/src/index.ts
  var parseMarbles = TestScheduler.parseMarbles.bind(TestScheduler);

  // ../swirly/packages/swirly-parser/dist/spec/stream.js
  var getDuration = (messages) => {
    let maxFrame = 0;
    const walk = (messages2, delta) => {
      for (const { frame, notification } of messages2) {
        const frameAbs = delta + frame;
        if ("value" in notification && Array.isArray(notification.value)) {
          walk(notification.value, frameAbs);
        } else if (frameAbs > maxFrame) {
          maxFrame = frameAbs;
        }
      }
    };
    walk(messages, 0);
    return maxFrame;
  };
  var createStreamSpecification = (messages, title = null, frame = 0) => ({
    kind: "S",
    title,
    frame,
    duration: getDuration(messages),
    messages
  });

  // ../swirly/packages/swirly-parser/dist/symbols.js
  var kIsGhost = Symbol("isGhost");

  // ../swirly/packages/swirly-parser/dist/util/first-non-null.js
  var firstNonNull = (...candidates) => {
    for (const candidate of candidates) {
      if (candidate != null) {
        return candidate;
      }
    }
    return null;
  };

  // ../swirly/packages/swirly-parser/dist/util/invert-object.js
  var invertObject = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));

  // ../swirly/packages/swirly-parser/dist/parsers/stream.js
  var reName = /([A-Za-z0-9])/g;
  var reNameAndMarbles = /^([A-Za-z0-9])\s*=\s*(\S+)\s*$/;
  var reLeadingWhitespace = /^(\s+)/;
  var reGhostNameSeparator = /\s*,\s*/;
  function* extractNames(marbles) {
    let match7;
    while ((match7 = reName.exec(marbles)) != null) {
      yield match7[1];
    }
  }
  var parseNameAndMarbles = (nameAndMarbles) => {
    const match7 = reNameAndMarbles.exec(nameAndMarbles);
    if (match7 != null) {
      const [, name, marbles] = match7;
      return [name, marbles];
    }
    return [null, nameAndMarbles];
  };
  var buildLocalValues = (marbles, configValues, allValues, ghostNames) => {
    const localValues = {};
    for (const name of extractNames(marbles)) {
      let value = firstNonNull(configValues[name], allValues[name], name);
      if (Array.isArray(value) && ghostNames.includes(name)) {
        value = value.slice();
        value[kIsGhost] = true;
      }
      localValues[name] = value;
    }
    return localValues;
  };
  var testMessageToMessageSpecification = ({ frame, notification }) => {
    const { kind, value } = notification;
    switch (true) {
      case kind === "C":
        return {
          frame,
          notification: { kind }
        };
      case kind === "E":
        return { frame, notification: { kind } };
      case Array.isArray(value):
        return {
          frame,
          notification: {
            kind: "N",
            value: createStreamSpecification(value),
            isGhost: !!value[kIsGhost]
          }
        };
      default:
        return {
          frame,
          notification: {
            kind: "N",
            value: value != null ? String(value) : ""
          }
        };
    }
  };
  var testMessagesToMessageSpecifications = (testMessages, frame, messageStyles, valueToLocal) => {
    const messageSpecs = testMessages.map(testMessageToMessageSpecification);
    for (const message of messageSpecs) {
      message.frame -= frame;
      if (message.notification.kind === "N") {
        const { value } = message.notification;
        message.styles = messageStyles[valueToLocal[value] ?? value];
      }
    }
    return messageSpecs;
  };
  var match4 = () => true;
  var run4 = (lines, ctx) => {
    const [nameAndMarbles, ...configLines] = lines;
    const [name, marbles] = parseNameAndMarbles(nameAndMarbles);
    const config2 = parseConfig(configLines, true);
    const ghostNames = typeof config2.ghosts === "string" ? config2.ghosts.split(reGhostNameSeparator) : [];
    const localValues = buildLocalValues(marbles, config2.values, ctx.allValues, ghostNames);
    const testMessages = parseMarbles(marbles, localValues);
    for (const message of testMessages) {
      message.frame = message.frame / 10;
    }
    const match7 = reLeadingWhitespace.exec(marbles);
    const frame = match7 != null ? match7[0].length : 0;
    if (name != null) {
      ctx.allValues[name] = testMessages;
    } else if (ctx.gridMode === true) {
      throw new Error(`Marble row \`${marbles}\` is not valid in a diagram that declares a time axis. Grid rows start with a sigil: \`>\` for a stream, \`=\` for a cell, \`.\` for an annotation.`);
    } else {
      const valueToLocal = invertObject(localValues);
      const messageSpecs = testMessagesToMessageSpecifications(testMessages, frame, ctx.messageStyles, valueToLocal);
      const streamSpec = createStreamSpecification(messageSpecs, config2.title, frame);
      ctx.content.push(streamSpec);
    }
  };
  var streamParser = {
    match: match4,
    run: run4
  };

  // ../swirly/packages/swirly-parser/dist/parsers/operator.js
  var reInnerStream = /`(.+?)`/g;
  var match5 = (line) => line.startsWith(">");
  var parseInnerStream = (text, values) => {
    const content = [];
    streamParser.run([text], {
      content,
      diagramStyles: {},
      messageStyles: {},
      allValues: values
    });
    return content[0];
  };
  var parseTitle = (text, values) => {
    const segments = [];
    let index = 0;
    let match7;
    while ((match7 = reInnerStream.exec(text)) != null) {
      if (index !== match7.index) {
        segments.push({
          type: "text",
          value: text.substring(index, match7.index)
        });
      }
      segments.push({
        type: "stream",
        value: parseInnerStream(match7[1], values)
      });
      index = match7.index + match7[0].length;
    }
    segments.push({
      type: "text",
      value: text.substring(index)
    });
    return segments;
  };
  var run5 = (lines, ctx) => {
    const config2 = parseConfig(lines.slice(1), true);
    const titleStr = lines[0].substring(1).trim();
    const titleSegments = parseTitle(titleStr, config2.values);
    const spec = createOperatorSpecification(titleSegments);
    ctx.content.push(spec);
  };
  var operatorParser = {
    match: match5,
    run: run5
  };

  // ../swirly/packages/swirly-parser/dist/spec/time-axis.js
  var createTimeAxisSpecification = (columns, title = null) => ({
    kind: "T",
    title: title !== "" ? title : null,
    columns
  });

  // ../swirly/packages/swirly-parser/dist/parsers/time-axis.js
  var reSigil2 = /^@(?:\s+|$)/;
  var reColumn = /^(>*)\s*(.*)$/;
  var match6 = (line) => reSigil2.test(line);
  var parseColumn = (raw) => {
    const [, markers, label] = reColumn.exec(raw.trim());
    return {
      label: label.trim(),
      depth: markers.length
    };
  };
  var run6 = (lines, ctx) => {
    const [header, ...configLines] = lines;
    const config2 = parseConfig(configLines, false);
    const body = header.replace(reSigil2, "").trim();
    const segments = body.split("|");
    if (segments.length > 1 && segments[segments.length - 1].trim() === "") {
      segments.pop();
    }
    const [titleSegment, ...columnSegments] = segments;
    const title = titleSegment.trim();
    if (columnSegments.length === 0) {
      throw new Error("A time axis must declare at least one column, as in `@ t | 0 | 1 | 2`");
    }
    ctx.content.push(createTimeAxisSpecification(columnSegments.map(parseColumn), typeof config2.title === "string" ? config2.title : title));
  };
  var timeAxisParser = {
    match: match6,
    run: run6
  };

  // ../swirly/packages/swirly-parser/dist/parsers/index.js
  var parsers = [
    diagramStylesParser,
    messageStylesParser,
    timeAxisParser,
    gridRowParser,
    operatorParser,
    streamParser
  ];

  // ../swirly/packages/swirly-parser/dist/spec/diagram.js
  var createDiagramSpecification = (content, styles) => ({
    content,
    styles
  });

  // ../swirly/packages/swirly-parser/dist/spec/references.js
  var resolveReferences = (content) => {
    const rows = content.filter((item) => item.kind === "R");
    const titles = new Set(rows.map(({ title }) => title).filter((title) => title != null && title !== ""));
    if (titles.size === 0) {
      return;
    }
    for (const row of rows) {
      row.slots = row.slots.map((slot) => (
        // A row naming itself is a literal, not a reference to itself.
        slot.kind === "text" && slot.value !== row.title && titles.has(slot.value) ? { kind: "ref", value: slot.value } : slot
      ));
    }
  };

  // ../swirly/packages/swirly-parser/dist/util/by-line.js
  var removeCr = (str) => str.endsWith("\r") ? str.substring(0, str.length - 1) : str;
  function* byLine(str) {
    let prevIdx = -1;
    let idx = str.indexOf("\n");
    while (idx >= 0) {
      yield removeCr(str.substring(prevIdx + 1, idx));
      prevIdx = idx;
      idx = str.indexOf("\n", idx + 1);
    }
    const lastLine = removeCr(str.substring(prevIdx + 1));
    if (lastLine !== "") {
      yield lastLine;
    }
  }

  // ../swirly/packages/swirly-parser/dist/util/by-block.js
  var reComment = /^\s*%/;
  var isComment = (line) => reComment.test(line);
  function* byBlock(str) {
    const acc = [];
    for (const line of byLine(str)) {
      if (isComment(line)) {
        continue;
      }
      if (line.trim() === "") {
        if (acc.length > 0) {
          yield acc.slice();
          acc.length = 0;
        }
      } else {
        acc.push(line);
      }
    }
    if (acc.length > 0) {
      yield acc;
    }
  }

  // ../swirly/packages/swirly-parser/dist/index.js
  var parseMarbleDiagramSpecification = (str) => {
    const blocks = [...byBlock(str)];
    const gridMode = blocks.some((lines) => timeAxisParser.match(lines[0]));
    const ctx = {
      content: [],
      diagramStyles: {},
      messageStyles: {},
      allValues: {},
      gridMode
    };
    for (const lines of blocks) {
      const parser = parsers.find((parser2) => parser2.match(lines[0]));
      parser.run(lines, ctx);
    }
    resolveReferences(ctx.content);
    return createDiagramSpecification(ctx.content, ctx.diagramStyles);
  };

  // ../swirly/packages/swirly-theme-default-base/src/index.ts
  var baseStyles = {
    arrow_fill_color: "",
    arrow_stroke_width: 2,
    arrow_width: 10,
    arrowhead_angle: 60,
    axis_column_min_width: 60,
    axis_column_padding: 48,
    axis_column_sizing: "uniform",
    axis_column_width: 120,
    axis_header_height: 30,
    axis_label_font_family: "Arial, Helvetica, sans-serif",
    axis_label_font_size: 18,
    axis_label_font_style: "italic",
    axis_label_font_weight: "normal",
    barrier_stroke_dash_width: 4,
    barrier_stroke_width: 2,
    canvas_padding: 25,
    completion_height: 50,
    completion_stroke_width: 2,
    error_size: 30,
    error_stroke_width: 2,
    event_radius: 20,
    event_stroke_width: 2,
    event_value_font_family: "Arial, Helvetica, sans-serif",
    event_value_font_size: 18,
    event_value_font_style: "normal",
    event_value_font_weight: "normal",
    frame_width: 30,
    ghost_opacity: 50,
    grid_annotation_height: 40,
    grid_annotation_value_font_family: "Arial, Helvetica, sans-serif",
    grid_annotation_value_font_size: 18,
    grid_annotation_value_font_style: "normal",
    grid_annotation_value_font_weight: "normal",
    grid_cell_divider_stroke_width: 2,
    grid_cell_height: 48,
    grid_cell_overhang: 20,
    grid_cell_stroke_width: 2,
    grid_cell_value_font_family: "Arial, Helvetica, sans-serif",
    grid_cell_value_font_size: 18,
    grid_cell_value_font_style: "normal",
    grid_cell_value_font_weight: "normal",
    grid_cell_value_padding: 22,
    grid_line_bleed: 10,
    grid_line_dash_width: 4,
    grid_line_depth_stroke_width_step: 0.5,
    grid_line_stroke_width: 2,
    grid_row_height: 40,
    grid_row_lead: 10,
    grid_row_tail: 60,
    grid_row_value_font_family: "Arial, Helvetica, sans-serif",
    grid_row_value_font_size: 18,
    grid_row_value_font_style: "normal",
    grid_row_value_font_weight: "normal",
    higher_order_angle: 18,
    higher_order_event_value_angle: 0,
    minimum_height: 0,
    minimum_width: 0,
    operator_corner_radius: 0,
    operator_stroke_width: 2,
    operator_title_font_family: "Arial, Helvetica, sans-serif",
    operator_title_font_size: 24,
    operator_title_font_style: "normal",
    operator_title_font_weight: "normal",
    operator_height: 50,
    operator_spacing: 10,
    operator_stream_scale: 75,
    range_height: 15,
    range_stroke_width: 0,
    row_label_font_family: "Arial, Helvetica, sans-serif",
    row_label_font_size: 18,
    row_label_font_style: "italic",
    row_label_font_weight: "normal",
    row_label_gap: 20,
    row_label_width: 60,
    stacking_height: 50,
    stream_spacing: 20,
    stream_title_font_family: "Arial, Helvetica, sans-serif",
    stream_title_font_size: 18,
    stream_title_font_style: "normal",
    stream_title_font_weight: "normal",
    stream_title_width: 100
  };

  // ../swirly/packages/swirly-theme-default-light/src/index.ts
  var lightStyles = {
    ...baseStyles,
    arrow_stroke_color: "black",
    axis_label_color: "black",
    background_color: "white",
    barrier_color: "rgba(0, 0, 0, 0.5)",
    completion_stroke_color: "black",
    error_color: "black",
    event_fill_color: "auto_light",
    event_stroke_color: "black",
    event_value_color: "black",
    grid_annotation_value_color: "black",
    grid_cell_fill_color: "white",
    grid_cell_stroke_color: "black",
    grid_cell_value_color: "black",
    grid_line_color: "rgba(0, 0, 0, 0.5)",
    grid_row_value_color: "black",
    operator_fill_color: "white",
    operator_stroke_color: "black",
    operator_title_color: "black",
    range_fill_color: "rgba(95, 95, 95, 0.25)",
    range_stroke_color: "black",
    row_label_color: "black",
    stream_title_color: "black"
  };

  // ../swirly/packages/swirly-renderer/dist/util/merge-styles.js
  var mergeStyles = (globalStyles, localStyles, globalPrefix, localStylesPrefixed = false) => {
    const result = {};
    const globalKeys = Object.keys(globalStyles).filter((key) => key.startsWith(globalPrefix));
    for (const globalKey of globalKeys) {
      const simpleKey = globalKey.substring(globalPrefix.length);
      const localKey = localStylesPrefixed ? globalKey : simpleKey;
      result[simpleKey] = localStyles != null && localStyles[localKey] != null ? localStyles[localKey] : globalStyles[globalKey];
    }
    return result;
  };

  // ../swirly/packages/swirly-renderer/dist/util/svg-xml.js
  var SVG_NS = "http://www.w3.org/2000/svg";
  var SVG_MIME_TYPE = "image/svg+xml";
  var XHTML_NS = "http://www.w3.org/1999/xhtml";
  var EMPTY_SVG_XML = `<svg xmlns="${SVG_NS}"/>`;
  var parseXml = (xml, mimeType, DOMParserImpl = DOMParser) => new DOMParserImpl().parseFromString(xml, mimeType);
  var createSvgDocument = (DOMParserImpl) => parseXml(EMPTY_SVG_XML, SVG_MIME_TYPE, DOMParserImpl);
  var createSvgElement = (document, name, attrs = {}, text = "") => {
    const $el = document.createElementNS(SVG_NS, name);
    for (const [name2, value] of Object.entries(attrs)) {
      $el.setAttribute(name2, String(value));
    }
    if (text !== "") {
      $el.textContent = text;
    }
    return $el;
  };
  var setSvgDimensions = ($svg, width, height, scale = 1) => {
    $svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    $svg.setAttribute("width", String(width * scale));
    $svg.setAttribute("height", String(height * scale));
  };

  // ../swirly/packages/swirly-renderer/dist/axis/grid.js
  var renderTimeGrid = (ctx, axis) => {
    const { document, styles } = ctx;
    const s = mergeStyles(styles, null, "grid_");
    const $group = createSvgElement(document, "g");
    const $lines = [];
    for (const { x, depth } of axis.boundaries) {
      const strokeWidth = Math.max(0, s.line_stroke_width - depth * s.line_depth_stroke_width_step);
      const $line = createSvgElement(document, "line", {
        x1: x,
        y1: 0,
        x2: x,
        y2: 0,
        stroke: s.line_color,
        "stroke-width": strokeWidth,
        "stroke-dasharray": s.line_dash_width
      });
      $group.appendChild($line);
      $lines.push($line);
    }
    const update = ({ height }) => {
      const bleed = s.line_bleed;
      for (const $line of $lines) {
        $line.setAttribute("y1", String(-bleed));
        $line.setAttribute("y2", String(height + bleed));
      }
    };
    return {
      element: $group,
      // The grid is not part of the vertical flow, so it contributes no extent.
      bbox: { x1: 0, y1: 0, x2: 0, y2: 0 },
      update
    };
  };

  // ../swirly/packages/swirly-renderer/dist/row/label.js
  var renderRowLabel = (ctx, title, gutterWidth, rowHeight) => {
    if (title == null || title === "") {
      return null;
    }
    const s = mergeStyles(ctx.styles, null, "row_label_");
    return createSvgElement(ctx.document, "text", {
      x: Math.max(0, gutterWidth - s.gap),
      y: rowHeight / 2,
      fill: s.color,
      "font-family": s.font_family,
      "font-size": s.font_size + "px",
      "font-weight": s.font_weight,
      "font-style": s.font_style,
      "dominant-baseline": "middle",
      "text-anchor": "end"
    }, title);
  };

  // ../swirly/packages/swirly-renderer/dist/axis/header.js
  var renderAxisHeader = (ctx, axisSpec) => {
    const { document, styles, axis } = ctx;
    const s = mergeStyles(styles, axisSpec.styles, "axis_");
    const height = s.header_height;
    const $group = createSvgElement(document, "g");
    const $label = renderRowLabel(ctx, axisSpec.title, axis.gutterWidth, height);
    if ($label != null) {
      $group.appendChild($label);
    }
    for (let i = 0; i < axis.columns.length; ++i) {
      const { label } = axis.columns[i];
      if (label === "") {
        continue;
      }
      $group.appendChild(createSvgElement(document, "text", {
        x: axis.center(i),
        y: height / 2,
        fill: s.label_color,
        "font-family": s.label_font_family,
        "font-size": s.label_font_size + "px",
        "font-weight": s.label_font_weight,
        "font-style": s.label_font_style,
        "dominant-baseline": "middle",
        "text-anchor": "middle"
      }, label));
    }
    return {
      element: $group,
      bbox: {
        x1: 0,
        y1: 0,
        x2: axis.gutterWidth + axis.contentWidth,
        y2: height
      }
    };
  };

  // ../swirly/packages/swirly-renderer/dist/axis/measure.js
  var ROW_STYLE_PREFIX = {
    stream: "grid_row_",
    cell: "grid_cell_",
    annotation: "grid_annotation_"
  };
  var valueFont = (styles, row) => {
    const s = mergeStyles(styles, row.styles, ROW_STYLE_PREFIX[row.rowKind]);
    return {
      family: s.value_font_family,
      size: s.value_font_size,
      weight: s.value_font_weight,
      style: s.value_font_style
    };
  };
  var gridRows = (content) => content.filter((item) => item.kind === "R");
  var measureColumnContents = (content, axisSpec, styles, measureText) => {
    const widths = axisSpec.columns.map(() => 0);
    const headerFont = {
      family: styles.axis_label_font_family,
      size: styles.axis_label_font_size,
      weight: styles.axis_label_font_weight,
      style: styles.axis_label_font_style
    };
    for (let i = 0; i < axisSpec.columns.length; ++i) {
      const { label } = axisSpec.columns[i];
      if (label !== "") {
        widths[i] = Math.max(widths[i], measureText(label, headerFont));
      }
    }
    for (const row of gridRows(content)) {
      const font = valueFont(styles, row);
      const limit = Math.min(row.slots.length, widths.length);
      for (let i = 0; i < limit; ++i) {
        const slot = row.slots[i];
        if (slot.kind === "empty") {
          continue;
        }
        widths[i] = Math.max(widths[i], measureText(slot.value, font));
      }
    }
    return widths;
  };
  var measureGutter = (content, axisSpec, styles, measureText) => {
    const font = {
      family: styles.row_label_font_family,
      size: styles.row_label_font_size,
      weight: styles.row_label_font_weight,
      style: styles.row_label_font_style
    };
    const titles = [
      axisSpec.title,
      ...gridRows(content).map(({ title }) => title)
    ].filter((title) => title != null && title !== "");
    const widest = titles.reduce((widest2, title) => Math.max(widest2, measureText(title, font)), 0);
    return Math.max(styles.row_label_width, Math.ceil(widest + styles.row_label_gap * 2));
  };

  // ../swirly/packages/swirly-renderer/dist/axis/resolve.js
  var createFrameAxis = (styles) => {
    const scale = (time) => time * styles.frame_width;
    return {
      mode: "frame",
      columns: [],
      boundaries: [],
      gutterWidth: 0,
      contentWidth: 0,
      scale,
      center: scale,
      end: (index) => scale(index + 1),
      indexOf: () => -1
    };
  };
  var resolveColumnWidths = (axis, styles, contentWidths) => {
    const sizing = styles.axis_column_sizing;
    const padding = styles.axis_column_padding;
    const minWidth = styles.axis_column_min_width;
    if (sizing === "fixed") {
      return axis.columns.map((column) => column.width ?? styles.axis_column_width);
    }
    const intrinsic = axis.columns.map((column, i) => Math.max(minWidth, Math.ceil((contentWidths[i] ?? 0) + padding)));
    const measured = sizing === "uniform" ? intrinsic.reduce((widest, width, i) => axis.columns[i].width != null ? widest : Math.max(widest, width), minWidth) : null;
    return axis.columns.map((column, i) => column.width ?? measured ?? intrinsic[i]);
  };
  var resolveTimeAxis = (axis, styles, gutterWidth, contentWidths = []) => {
    const widths = resolveColumnWidths(axis, styles, contentWidths);
    const columns = [];
    let x = gutterWidth;
    for (let i = 0; i < axis.columns.length; ++i) {
      const column = axis.columns[i];
      const width = widths[i];
      columns.push({
        label: column.label,
        depth: column.depth ?? 0,
        x,
        width
      });
      x += width;
    }
    const contentWidth = x - gutterWidth;
    const boundaries = columns.map(({ x: x2, depth }) => ({
      x: x2,
      depth
    }));
    boundaries.push({ x, depth: 0 });
    const clamp = (index) => Math.max(0, Math.min(index, columns.length - 1));
    const start = (index) => {
      if (columns.length === 0) {
        return gutterWidth;
      }
      if (index >= columns.length) {
        return gutterWidth + contentWidth;
      }
      return columns[clamp(index)].x;
    };
    return {
      mode: "grid",
      columns,
      boundaries,
      gutterWidth,
      contentWidth,
      scale: start,
      center: (index) => {
        if (columns.length === 0) {
          return gutterWidth;
        }
        const column = columns[clamp(index)];
        return column.x + column.width / 2;
      },
      end: (index) => start(index + 1),
      indexOf: (label) => columns.findIndex((column) => column.label === label)
    };
  };

  // ../swirly/packages/swirly-renderer/dist/util/notification-kind.js
  var _char;
  var _NotificationKind = class {
    constructor(char) {
      __privateAdd(this, _char, void 0);
      __privateSet(this, _char, char);
    }
    equals(x) {
      return typeof x === "string" && x.charAt(0).toUpperCase() === __privateGet(this, _char);
    }
  };
  var NotificationKind2 = _NotificationKind;
  _char = new WeakMap();
  __publicField(NotificationKind2, "NEXT", new _NotificationKind("N"));
  __publicField(NotificationKind2, "COMPLETE", new _NotificationKind("C"));
  __publicField(NotificationKind2, "ERROR", new _NotificationKind("E"));

  // ../swirly/packages/swirly-renderer/dist/util/transform.js
  var transform = ($element, value) => {
    const existing = $element.getAttribute("transform");
    const updated = (existing != null && existing !== "" ? existing + " " : "") + value;
    $element.setAttribute("transform", updated);
  };
  var translate = ($element, x, y) => {
    if (x === 0 && y === 0) {
      return;
    }
    transform($element, `translate(${x} ${y})`);
  };
  var rotate = ($element, angle, x = 0, y = 0) => {
    if (angle === 0) {
      return;
    }
    transform($element, `rotate(${angle} ${x} ${y})`);
  };

  // ../swirly/packages/swirly-renderer/dist/message/complete.js
  var supports = ({ notification: { kind } }) => NotificationKind2.COMPLETE.equals(kind);
  var render = ({ document, styles, streamHeight, axis }, message) => {
    const s = mergeStyles(styles, message.styles, "completion_");
    const x = axis.scale(message.frame) - s.stroke_width / 2;
    const y1 = (streamHeight - s.height) / 2;
    const y2 = y1 + s.height;
    const $group = createSvgElement(document, "g");
    translate($group, x, 0);
    $group.appendChild(createSvgElement(document, "line", {
      x1: 0,
      y1,
      x2: 0,
      y2,
      stroke: s.stroke_color,
      "stroke-width": s.stroke_width
    }));
    const bbox = {
      x1: x - s.stroke_width / 2,
      y1,
      x2: x + s.stroke_width / 2,
      y2
    };
    return {
      element: $group,
      bbox
    };
  };
  var completeMessageRenderer = { supports, render };

  // ../swirly/packages/swirly-renderer/dist/message/error.js
  var supports2 = ({ notification: { kind } }) => NotificationKind2.ERROR.equals(kind);
  var render2 = ({ document, styles, streamHeight, axis }, message) => {
    const s = mergeStyles(styles, message.styles, "error_");
    const x = axis.scale(message.frame) - s.size / 2;
    const y = (streamHeight - s.size) / 2;
    const $group = createSvgElement(document, "g");
    translate($group, x, y);
    $group.appendChild(createSvgElement(document, "line", {
      x1: 0,
      y1: 0,
      x2: s.size,
      y2: s.size,
      stroke: s.color,
      "stroke-width": s.stroke_width
    }));
    $group.appendChild(createSvgElement(document, "line", {
      x1: s.size,
      y1: 0,
      x2: 0,
      y2: s.size,
      stroke: s.color,
      "stroke-width": s.stroke_width
    }));
    const bbox = {
      x1: x,
      y1: y,
      x2: x + s.size,
      y2: y + s.size
    };
    return {
      element: $group,
      bbox
    };
  };
  var errorMessageRenderer = { supports: supports2, render: render2 };

  // ../swirly/packages/swirly-renderer/dist/util/string-to-color.js
  var import_simple_sha1 = __toESM(require_browser(), 1);

  // ../swirly/packages/swirly-renderer/dist/util/hex-to-dec.js
  var A = "A".charCodeAt(0);
  var ZERO = "0".charCodeAt(0);
  var hexToDec = (hex) => {
    let dec = 0;
    hex = hex.toUpperCase();
    for (let i = 0; i < hex.length; ++i) {
      const c = hex.charCodeAt(i);
      dec = (dec << 4) + (c >= A ? c - A + 10 : c - ZERO);
    }
    return dec;
  };

  // ../swirly/packages/swirly-renderer/dist/util/string-to-color.js
  var stringToColor = (str, mode) => {
    const hashHex = (0, import_simple_sha1.sync)(str);
    const hash = hexToDec(hashHex.substring(4, 8));
    const hue = Math.round(hash / (1 << 16) * 360);
    const saturation = 60;
    const lightness = mode === "dark" ? 20 : 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // ../swirly/packages/swirly-renderer/dist/message/scalar.js
  var COLOR_TO_MODE = {
    auto: "light",
    auto_light: "light",
    auto_dark: "dark"
  };
  var supports3 = () => true;
  var render3 = ({ document, styles, streamHeight, axis }, message, { valueAngle }) => {
    const s = mergeStyles(styles, message.styles, "event_");
    const { value } = message.notification;
    const x = axis.scale(message.frame) - styles.event_radius;
    const $group = createSvgElement(document, "g");
    translate($group, x, 0);
    const fillColorMode = COLOR_TO_MODE[s.fill_color];
    const finalFillColor = fillColorMode != null ? stringToColor(value, fillColorMode) : s.fill_color;
    $group.appendChild(createSvgElement(document, "ellipse", {
      cx: styles.event_radius,
      cy: streamHeight / 2,
      rx: styles.event_radius - s.stroke_width / 2,
      ry: styles.event_radius - s.stroke_width / 2,
      fill: finalFillColor,
      stroke: s.stroke_color,
      "stroke-width": s.stroke_width
    }));
    const $label = createSvgElement(document, "text", {
      x: 0,
      y: 0,
      fill: s.value_color,
      "font-family": s.value_font_family,
      "font-size": s.value_font_size + "px",
      "font-weight": s.value_font_weight,
      "font-style": s.value_font_style,
      "dominant-baseline": "middle",
      "text-anchor": "middle"
    }, value);
    translate($label, styles.event_radius, streamHeight / 2);
    rotate($label, valueAngle, 0, 0);
    $group.appendChild($label);
    const bbox = {
      x1: x,
      y1: 0,
      x2: x + styles.event_radius * 2,
      y2: streamHeight
    };
    return {
      element: $group,
      bbox
    };
  };
  var scalarMessageRenderer = {
    supports: supports3,
    render: render3
  };

  // ../swirly/packages/swirly-renderer/dist/message/non-stream.js
  var strategies = [
    completeMessageRenderer,
    errorMessageRenderer,
    scalarMessageRenderer
  ];
  var supports4 = ({ notification }) => !("value" in notification) || typeof notification.value !== "object";
  var render4 = (ctx, message, options) => {
    const renderer = strategies.find((renderer2) => renderer2.supports(message));
    return renderer.render(ctx, message, options);
  };
  var nonStreamMessageRenderer = { supports: supports4, render: render4 };

  // ../swirly/packages/swirly-renderer/dist/util/degrees-to-radians.js
  var degreesToRadians = (degrees) => degrees / 180 * Math.PI;

  // ../swirly/packages/swirly-renderer/dist/arrow.js
  var renderArrow = ({ document, streamHeight, axis }, arrowStyles, arrowheadAngle, duration) => {
    const centerY = streamHeight / 2;
    const lineWidth = axis.scale(duration) + streamHeight;
    const arrowheadWidth = arrowStyles.width;
    const arrowheadHeight = arrowheadWidth * Math.tan(degreesToRadians(arrowheadAngle / 2));
    const arrowHeadProtrusion = arrowStyles.stroke_width / Math.sin(degreesToRadians(arrowheadAngle));
    const strokeWidth = arrowStyles.stroke_width;
    const strokeColor = arrowStyles.stroke_color;
    const fillColor = arrowStyles.fill_color;
    const filled = typeof fillColor === "string" && fillColor !== "";
    const $group = createSvgElement(document, "g");
    $group.appendChild(createSvgElement(document, "line", {
      x1: 0,
      y1: centerY,
      x2: lineWidth - (filled ? arrowheadWidth : 0),
      y2: centerY,
      stroke: strokeColor,
      "stroke-width": strokeWidth
    }));
    const arrowheadTopY = centerY - arrowheadHeight;
    const arrowheadBottomY = centerY + arrowheadHeight;
    const points = [
      `${lineWidth - arrowheadWidth},${arrowheadTopY}`,
      `${lineWidth},${centerY}`,
      `${lineWidth - arrowheadWidth},${arrowheadBottomY}`
    ];
    $group.appendChild(createSvgElement(document, filled ? "polygon" : "polyline", {
      points: points.join(" "),
      fill: filled ? fillColor : "none",
      stroke: strokeColor,
      "stroke-width": strokeWidth,
      "stroke-linecap": "square"
    }));
    const bbox = {
      x1: 0,
      y1: 0,
      x2: lineWidth + arrowHeadProtrusion,
      y2: streamHeight
    };
    return {
      element: $group,
      bbox
    };
  };

  // ../swirly/packages/swirly-renderer/dist/decoration/barrier.js
  var renderBarrierDecoration = ({ document, styles, bbox, scaleTime, axis }, decoration) => {
    const { frame, styles: ownStyles } = decoration;
    const s = mergeStyles(styles, ownStyles, "barrier_");
    const x = axis.scale(scaleTime(frame)) - s.stroke_width / 2;
    const y = bbox.y1;
    const height = bbox.y2 - bbox.y1;
    const $line = createSvgElement(document, "line", {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: height,
      stroke: s.color,
      "stroke-width": s.stroke_width,
      "stroke-dasharray": s.stroke_dash_width
    });
    translate($line, x, y);
    return {
      element: $line
    };
  };

  // ../swirly/packages/swirly-renderer/dist/decoration/range.js
  var renderRangeDecoration = ({ document, styles, streamHeight, scaleTime, axis }, decoration) => {
    const { frame, duration, styles: ownStyles } = decoration;
    const s = mergeStyles(styles, ownStyles, "range_");
    const x = axis.scale(scaleTime(frame));
    const y = (streamHeight - s.height) / 2;
    const width = axis.scale(scaleTime(duration));
    const height = s.height;
    const $rect = createSvgElement(document, "rect", {
      x: 0,
      y: 0,
      width,
      height,
      fill: s.fill_color,
      stroke: s.stroke_color,
      "stroke-width": s.stroke_width
    });
    translate($rect, x, y);
    return {
      element: $rect
    };
  };

  // ../swirly/packages/swirly-renderer/dist/decoration/index.js
  var strategies2 = {
    barrier: renderBarrierDecoration,
    range: renderRangeDecoration
  };
  var renderDecoration = (ctx, decoration) => {
    const render6 = strategies2[decoration.kind];
    return render6(ctx, decoration);
  };

  // ../swirly/packages/swirly-renderer/dist/util/geometry.js
  var translatePoint = (x, y, dx, dy) => ({
    x: x + dx,
    y: y + dy
  });
  var translateRectangle = ({ x1, y1, x2, y2 }, dx, dy) => {
    const p1 = translatePoint(x1, y1, dx, dy);
    const p2 = translatePoint(x2, y2, dx, dy);
    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y
    };
  };
  var rotatePoint = (x, y, angle, x0, y0) => {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    x -= x0;
    y -= y0;
    return {
      x: x * c - y * s + x0,
      y: x * s + y * c + y0
    };
  };
  var rotateRectangle = ({ x1, y1, x2, y2 }, angle, x0, y0) => {
    const p1 = rotatePoint(x1, y1, angle, x0, y0);
    const p2 = rotatePoint(x2, y2, angle, x0, y0);
    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y
    };
  };
  var rectangleUnion = (rects) => {
    const nonEmptyRects = rects.filter(({ x1, y1, x2, y2 }) => x2 - x1 !== 0 && y2 - y1 !== 0);
    if (nonEmptyRects.length === 0) {
      throw new Error("All rectangles empty");
    }
    return {
      x1: Math.min(...nonEmptyRects.map((rect) => rect.x1)),
      y1: Math.min(...nonEmptyRects.map((rect) => rect.y1)),
      x2: Math.max(...nonEmptyRects.map((rect) => rect.x2)),
      y2: Math.max(...nonEmptyRects.map((rect) => rect.y2))
    };
  };

  // ../swirly/packages/swirly-renderer/dist/stream/factory.js
  var nullScaleTime = (time) => time;
  var createScaleTime = (higherOrderAngleDegrees) => {
    const scale = 1 / Math.cos(degreesToRadians(higherOrderAngleDegrees));
    return (time) => time * scale;
  };
  var isNotification = ({ notification: { kind } }) => NotificationKind2.NEXT.equals(kind);
  var countPriors = (message, index, messages) => {
    let count = 0;
    for (let i = 0; i < index; ++i) {
      if (isNotification(messages[i]) && messages[i].frame === message.frame) {
        ++count;
      }
    }
    return count;
  };
  var createRenderStream = (renderMessage2) => (ctx, stream, isHigherOrder, isGhost) => {
    const { document, styles } = ctx;
    const scaleTime = isHigherOrder ? createScaleTime(styles.higher_order_angle) : nullScaleTime;
    const $group = createSvgElement(document, "g", isGhost ? {
      style: `filter: opacity(${styles.ghost_opacity}%)`
    } : void 0);
    const bboxes = [];
    const add = ({ element, bbox }) => {
      $group.appendChild(element);
      bboxes.push(bbox);
    };
    const arrowStyles = mergeStyles(styles, stream.styles, "arrow_", true);
    const scaledDuration = scaleTime(stream.duration);
    add(renderArrow(ctx, arrowStyles, styles.arrowhead_angle, scaledDuration));
    for (let i = stream.messages.length - 1; i >= 0; --i) {
      const message = stream.messages[i];
      const scaledMessage = {
        ...message,
        frame: scaleTime(message.frame)
      };
      const priorCount = isNotification(message) ? countPriors(message, i, stream.messages) : 0;
      const dy = priorCount * styles.stacking_height;
      const valueAngle = isHigherOrder ? styles.higher_order_event_value_angle : 0;
      const options = {
        verticalOffset: dy,
        valueAngle
      };
      const { element, bbox } = renderMessage2(ctx, scaledMessage, options);
      translate(element, 0, dy);
      bbox.y2 += dy;
      add({ element, bbox });
    }
    const innerCtx = {
      ...ctx,
      scaleTime,
      bbox: rectangleUnion(bboxes)
    };
    if (stream.decorations != null) {
      for (const decoration of stream.decorations) {
        const { element, bbox } = renderDecoration(innerCtx, decoration);
        $group.appendChild(element);
        if (bbox != null) {
          innerCtx.bbox = rectangleUnion([innerCtx.bbox, bbox]);
        }
      }
    }
    return {
      element: $group,
      bbox: innerCtx.bbox
    };
  };

  // ../swirly/packages/swirly-renderer/dist/message/stream.js
  var supports5 = (message) => !nonStreamMessageRenderer.supports(message);
  var renderStreamImpl = createRenderStream(nonStreamMessageRenderer.render);
  var render5 = (ctx, { frame, notification }, { verticalOffset }) => {
    const { styles, streamHeight, axis } = ctx;
    const { value, isGhost } = notification;
    const x = axis.scale(frame);
    const y = streamHeight / 2 + verticalOffset;
    const { element: $group, bbox } = renderStreamImpl(ctx, value, true, isGhost);
    rotate($group, styles.higher_order_angle, x, y);
    translate($group, x, 0);
    const rotatedBBox = rotateRectangle(bbox, degreesToRadians(styles.higher_order_angle), 0, y);
    const translatedBBox = translateRectangle(rotatedBBox, x, 0);
    return {
      element: $group,
      bbox: translatedBBox
    };
  };
  var streamMessageRenderer = {
    supports: supports5,
    render: render5
  };

  // ../swirly/packages/swirly-renderer/dist/message/index.js
  var renderMessage = (ctx, message, options) => {
    const renderer = streamMessageRenderer.supports(message) ? streamMessageRenderer : nonStreamMessageRenderer;
    return renderer.render(ctx, message, options);
  };

  // ../swirly/packages/swirly-renderer/dist/stream/core.js
  var renderStreamBase = createRenderStream(renderMessage);

  // ../swirly/packages/swirly-renderer/dist/operator.js
  var NON_BREAKING_SPACE = "\xA0";
  var reSpace = / /g;
  var createRootDiv = (document, styles) => {
    const $div = document.createElementNS(XHTML_NS, "div");
    $div.setAttribute("style", Object.entries(styles).map(([name, value]) => `${name}: ${value};`).join(" "));
    return $div;
  };
  var renderStream = (spec, ctx) => {
    const { element: $group, bbox: { x1, x2, y2 } } = renderStreamBase(ctx, spec, false, false);
    let width;
    if (x1 < 0) {
      translate($group, -x1, 0);
      width = x2 - x1;
    } else {
      width = x2;
    }
    return {
      $group,
      width,
      height: y2
    };
  };
  var renderStreamTitleSegment = (segment, ctx, styles) => {
    const { documentElement: $svg } = createSvgDocument(ctx.DOMParser);
    const { $group, width, height } = renderStream(segment.value, ctx);
    setSvgDimensions($svg, width, height, (styles.stream_scale ?? 100) / 100);
    $svg.appendChild($group);
    return $svg;
  };
  var renderTextTitleSegment = (segment, ctx) => {
    const $div = ctx.document.createElement("div");
    $div.textContent = segment.value.replace(reSpace, NON_BREAKING_SPACE);
    return $div;
  };
  var renderTitleSegment = (segment, ctx, styles) => {
    switch (segment.type) {
      case "stream":
        return renderStreamTitleSegment(segment, ctx, styles);
      case "text":
        return renderTextTitleSegment(segment, ctx);
      default:
        return null;
    }
  };
  var renderRichTitle = (segments, ctx, color, styles, fontStyles) => {
    const $foreignObject = createSvgElement(ctx.document, "foreignObject", {
      y: styles.spacing,
      height: styles.height
    });
    const $container = createRootDiv(ctx.document, {
      width: "100%",
      height: "100%",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      color,
      ...fontStyles
    });
    $foreignObject.appendChild($container);
    for (const segment of segments) {
      const $element = renderTitleSegment(segment, ctx, styles);
      $container.appendChild($element);
    }
    return $foreignObject;
  };
  var renderTextTitle = (text, ctx, color, styles, fontStyles) => createSvgElement(ctx.document, "text", {
    x: styles.spacing,
    y: styles.spacing + styles.height / 2,
    fill: color,
    "dominant-baseline": "middle",
    "text-anchor": "middle",
    ...fontStyles
  }, text);
  var renderTitle = (segments, ctx, styles) => {
    const color = styles.title_color;
    const fontStyles = {
      "font-family": styles.title_font_family,
      "font-size": styles.title_font_size + "px",
      "font-weight": styles.title_font_weight,
      "font-style": styles.title_font_style
    };
    const isText = segments.length === 1 && segments[0].type === "text";
    const $title = isText ? renderTextTitle(segments[0].value, ctx, color, styles, fontStyles) : renderRichTitle(segments, ctx, color, styles, fontStyles);
    return { $title, shouldCenter: isText };
  };
  var renderOperator = (ctx, operator) => {
    const s = mergeStyles(ctx.styles, operator.styles, "operator_");
    const $group = createSvgElement(ctx.document, "g");
    const $rect = createSvgElement(ctx.document, "rect", {
      x: s.stroke_width / 2,
      y: s.spacing + s.stroke_width / 2,
      width: 1,
      height: s.height - s.stroke_width,
      fill: s.fill_color,
      stroke: s.stroke_color,
      "stroke-width": s.stroke_width,
      rx: s.corner_radius
    });
    $group.appendChild($rect);
    const { $title, shouldCenter } = renderTitle(operator.title, ctx, s);
    $group.appendChild($title);
    const bbox = {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: s.height + 2 * s.spacing
    };
    const update = ({ width, dx }) => {
      $rect.setAttribute("width", String(width - s.stroke_width));
      $title.setAttribute("width", String(width));
      translate($group, -dx, 0);
      if (shouldCenter) {
        $title.setAttribute("x", String(width / 2));
      }
    };
    return {
      element: $group,
      bbox,
      update
    };
  };

  // ../swirly/packages/swirly-renderer/dist/row/slots.js
  var rowLabel = (row) => row.title != null ? `\`${row.title}\` ` : "";
  var assertSlotsMatchAxis = (row, axis) => {
    if (row.slots.length === axis.columns.length) {
      return;
    }
    throw new Error(`Grid row ${rowLabel(row)}has ${row.slots.length} slot(s) but the axis has ${axis.columns.length} column(s); they must correspond one to one.`);
  };

  // ../swirly/packages/swirly-renderer/dist/row/values.js
  var renderSlotValues = ({ document, axis }, slots, s, centerY) => {
    const $texts = [];
    for (let i = 0; i < slots.length; ++i) {
      const slot = slots[i];
      if (slot.kind === "empty") {
        continue;
      }
      $texts.push(createSvgElement(document, "text", {
        x: axis.center(i),
        y: centerY,
        fill: s.value_color,
        "font-family": s.value_font_family,
        "font-size": s.value_font_size + "px",
        "font-weight": s.value_font_weight,
        "font-style": s.value_font_style,
        "dominant-baseline": "middle",
        "text-anchor": "middle"
      }, slot.value));
    }
    return $texts;
  };

  // ../swirly/packages/swirly-renderer/dist/row/annotation.js
  var renderGridAnnotationRow = (ctx, row) => {
    const { document, styles, axis } = ctx;
    const s = mergeStyles(styles, row.styles, "grid_annotation_");
    assertSlotsMatchAxis(row, axis);
    const height = s.height;
    const $group = createSvgElement(document, "g");
    for (const $text of renderSlotValues(ctx, row.slots, s, height / 2)) {
      $group.appendChild($text);
    }
    const $label = renderRowLabel(ctx, row.title, axis.gutterWidth, height);
    if ($label != null) {
      $group.appendChild($label);
    }
    return {
      element: $group,
      bbox: {
        x1: 0,
        y1: 0,
        x2: axis.gutterWidth + axis.contentWidth,
        y2: height
      }
    };
  };

  // ../swirly/packages/swirly-renderer/dist/row/arrow.js
  var arrowheadProtrusion = (styles) => styles.arrow_stroke_width / Math.sin(degreesToRadians(styles.arrowhead_angle));
  var renderGridArrow = (document, styles, x1, x2, y) => {
    const headWidth = styles.arrow_width;
    const strokeColor = styles.arrow_stroke_color;
    const strokeWidth = styles.arrow_stroke_width;
    const headHalfHeight = headWidth * Math.tan(degreesToRadians(styles.arrowhead_angle / 2));
    return [
      createSvgElement(document, "line", {
        x1,
        y1: y,
        x2,
        y2: y,
        stroke: strokeColor,
        "stroke-width": strokeWidth
      }),
      createSvgElement(document, "polyline", {
        points: [
          `${x2 - headWidth},${y - headHalfHeight}`,
          `${x2},${y}`,
          `${x2 - headWidth},${y + headHalfHeight}`
        ].join(" "),
        fill: "none",
        stroke: strokeColor,
        "stroke-width": strokeWidth,
        "stroke-linecap": "square"
      })
    ];
  };

  // ../swirly/packages/swirly-renderer/dist/row/runs.js
  var foldRuns = (slots) => {
    const runs = [];
    for (let i = 0; i < slots.length; ++i) {
      const slot = slots[i];
      if (i === 0 || slot.kind !== "empty") {
        runs.push({
          value: slot.kind === "empty" ? null : slot,
          startIndex: i,
          endIndex: i
        });
      } else {
        runs[runs.length - 1].endIndex = i;
      }
    }
    return runs;
  };

  // ../swirly/packages/swirly-renderer/dist/row/cell.js
  var renderGridCellRow = (ctx, row) => {
    const { document, styles, axis } = ctx;
    const s = mergeStyles(styles, row.styles, "grid_cell_");
    const label = rowLabel(row);
    assertSlotsMatchAxis(row, axis);
    const boundaryOf = (columnLabel, key) => {
      const index = axis.indexOf(columnLabel);
      if (index < 0) {
        throw new Error(`Grid row ${label}declares \`${key} = ${columnLabel}\`, but the axis has no column with that label.`);
      }
      return axis.scale(index);
    };
    const height = s.height;
    const centerY = height / 2;
    const strokeWidth = s.stroke_width;
    const rowStart = axis.gutterWidth - styles.grid_row_lead;
    const rowEnd = axis.gutterWidth + axis.contentWidth + styles.grid_row_tail;
    const boxLeft = row.from != null ? boundaryOf(row.from, "from") : rowStart;
    const boxRight = row.to != null ? boundaryOf(row.to, "to") : axis.gutterWidth + axis.contentWidth + s.overhang;
    if (boxRight <= boxLeft) {
      throw new Error(`Grid row ${label}closes at or before it opens; \`from\` must name an earlier column than \`to\`.`);
    }
    const $group = createSvgElement(document, "g");
    if (boxLeft > rowStart) {
      $group.appendChild(createSvgElement(document, "line", {
        x1: rowStart,
        y1: centerY,
        x2: boxLeft,
        y2: centerY,
        stroke: styles.arrow_stroke_color,
        "stroke-width": styles.arrow_stroke_width
      }));
    }
    $group.appendChild(createSvgElement(document, "rect", {
      x: boxLeft,
      y: strokeWidth / 2,
      width: boxRight - boxLeft,
      height: height - strokeWidth,
      fill: s.fill_color,
      stroke: s.stroke_color,
      "stroke-width": strokeWidth
    }));
    const runs = foldRuns(row.slots);
    for (let i = 1; i < runs.length; ++i) {
      const x = axis.scale(runs[i].startIndex);
      if (x <= boxLeft || x >= boxRight) {
        continue;
      }
      $group.appendChild(createSvgElement(document, "line", {
        x1: x,
        y1: strokeWidth / 2,
        x2: x,
        y2: height - strokeWidth / 2,
        stroke: s.stroke_color,
        "stroke-width": s.divider_stroke_width
      }));
    }
    for (let i = 0; i < runs.length; ++i) {
      const run7 = runs[i];
      if (run7.value == null) {
        continue;
      }
      const runLeft = i === 0 ? boxLeft : Math.max(boxLeft, axis.scale(run7.startIndex));
      if (runLeft >= boxRight) {
        continue;
      }
      $group.appendChild(createSvgElement(document, "text", {
        x: runLeft + s.value_padding,
        y: centerY,
        fill: s.value_color,
        "font-family": s.value_font_family,
        "font-size": s.value_font_size + "px",
        "font-weight": s.value_font_weight,
        "font-style": s.value_font_style,
        "dominant-baseline": "middle"
      }, run7.value.value));
    }
    for (const $el of renderGridArrow(document, styles, boxRight, rowEnd, centerY)) {
      $group.appendChild($el);
    }
    const $label = renderRowLabel(ctx, row.title, axis.gutterWidth, height);
    if ($label != null) {
      $group.appendChild($label);
    }
    return {
      element: $group,
      bbox: {
        x1: 0,
        y1: 0,
        x2: rowEnd + arrowheadProtrusion(styles),
        y2: height
      }
    };
  };

  // ../swirly/packages/swirly-renderer/dist/row/stream.js
  var renderGridStreamRow = (ctx, row) => {
    const { document, styles, axis } = ctx;
    const s = mergeStyles(styles, row.styles, "grid_row_");
    assertSlotsMatchAxis(row, axis);
    const height = s.height;
    const centerY = height / 2;
    const $group = createSvgElement(document, "g");
    for (const $text of renderSlotValues(ctx, row.slots, s, centerY)) {
      $group.appendChild($text);
    }
    const lineStart = axis.gutterWidth - s.lead;
    const lineEnd = axis.gutterWidth + axis.contentWidth + s.tail;
    for (const $el of renderGridArrow(document, styles, lineStart, lineEnd, centerY)) {
      $group.appendChild($el);
    }
    const $label = renderRowLabel(ctx, row.title, axis.gutterWidth, height);
    if ($label != null) {
      $group.appendChild($label);
    }
    return {
      element: $group,
      bbox: {
        x1: 0,
        y1: 0,
        x2: lineEnd + arrowheadProtrusion(styles),
        y2: height
      }
    };
  };

  // ../swirly/packages/swirly-renderer/dist/stream/full.js
  var renderStream2 = (ctx, stream) => {
    const { document, styles, streamHeight, streamTitleEnabled, axis } = ctx;
    const s = mergeStyles(styles, stream.styles, "stream_");
    const renderStreamResult = renderStreamBase(ctx, stream, false, false);
    const { element: $streamGroup, bbox } = renderStreamResult;
    if (stream.frame != null && stream.frame > 0) {
      const dx = axis.scale(stream.frame);
      translate($streamGroup, dx, 0);
      bbox.x1 += dx;
      bbox.x2 += dx;
    }
    if (!streamTitleEnabled) {
      return renderStreamResult;
    }
    const $outerGroup = createSvgElement(document, "g");
    const title = typeof stream.title === "string" ? stream.title : "";
    $outerGroup.appendChild(createSvgElement(document, "text", {
      x: 0,
      y: streamHeight / 2,
      fill: s.title_color,
      "font-family": s.title_font_family,
      "font-size": s.title_font_size + "px",
      "font-weight": s.title_font_weight,
      "font-style": s.title_font_style,
      "dominant-baseline": "middle"
    }, title));
    $outerGroup.appendChild($streamGroup);
    translate($streamGroup, s.title_width, 0);
    bbox.x1 = 0;
    bbox.x2 += s.title_width;
    return {
      element: $outerGroup,
      bbox
    };
  };

  // ../swirly/packages/swirly-renderer/dist/util/text-metrics.js
  var ADVANCES_EM = [
    0.278,
    0.278,
    0.355,
    0.556,
    0.556,
    0.889,
    0.667,
    0.191,
    0.333,
    0.333,
    0.389,
    0.584,
    0.278,
    0.333,
    0.278,
    0.278,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.556,
    0.278,
    0.278,
    0.584,
    0.584,
    0.584,
    0.556,
    1.015,
    0.667,
    0.667,
    0.722,
    0.722,
    0.667,
    0.611,
    0.778,
    0.722,
    0.278,
    0.5,
    0.667,
    0.556,
    0.833,
    0.722,
    0.778,
    0.667,
    0.778,
    0.722,
    0.667,
    0.611,
    0.722,
    0.667,
    0.944,
    0.667,
    0.667,
    0.611,
    0.278,
    0.278,
    0.278,
    0.469,
    0.556,
    0.333,
    0.556,
    0.556,
    0.5,
    0.556,
    0.556,
    0.278,
    0.556,
    0.556,
    0.222,
    0.222,
    0.5,
    0.222,
    0.833,
    0.556,
    0.556,
    0.556,
    0.556,
    0.333,
    0.5,
    0.278,
    0.556,
    0.5,
    0.722,
    0.5,
    0.5,
    0.5,
    0.334,
    0.26,
    0.334,
    0.584
  ];
  var FIRST_CODE_POINT = 32;
  var FALLBACK_EM = 0.556;
  var BOLD_FACTOR = 1.06;
  var isBold = (weight) => weight === "bold" || weight === "bolder" || typeof weight === "number" && weight >= 600 || typeof weight === "string" && Number(weight) >= 600;
  var estimateTextWidth = (text, font) => {
    let em = 0;
    for (const character of text) {
      const index = character.codePointAt(0) - FIRST_CODE_POINT;
      em += ADVANCES_EM[index] ?? FALLBACK_EM;
    }
    if (isBold(font.weight)) {
      em *= BOLD_FACTOR;
    }
    return em * font.size;
  };

  // ../swirly/packages/swirly-renderer/dist/index.js
  var hasTitle = (item) => item.kind !== "O" && item.title != null && item.title !== "";
  var renderContentItem = (ctx, item) => {
    switch (item.kind) {
      case "S":
        return renderStream2(ctx, item);
      case "O":
        return renderOperator(ctx, item);
      case "T":
        return renderAxisHeader(ctx, item);
      case "R":
        switch (item.rowKind) {
          case "stream":
            return renderGridStreamRow(ctx, item);
          case "cell":
            return renderGridCellRow(ctx, item);
          case "annotation":
            return renderGridAnnotationRow(ctx, item);
          default:
            throw new Error(`Unsupported grid row kind: ${String(item.rowKind)}`);
        }
      default:
        throw new Error(`Unsupported diagram content kind: ${String(item.kind)}`);
    }
  };
  var renderMarbleDiagram = (spec, options = {}) => {
    const styles = {
      ...lightStyles,
      ...options.styles,
      ...spec.styles
    };
    const document = createSvgDocument(options.DOMParser);
    const $svg = document.documentElement;
    const $group = createSvgElement(document, "g");
    translate($group, styles.canvas_padding, styles.canvas_padding);
    $svg.appendChild($group);
    const streamHeight = Math.max(styles.event_radius * 2, styles.completion_height, styles.error_size);
    const streamTitleEnabled = spec.content.some((item) => item.kind === "S" && hasTitle(item));
    const axisSpecs = spec.content.filter((item) => item.kind === "T");
    if (axisSpecs.length > 1) {
      throw new Error(`A diagram can define at most one time axis, found ${axisSpecs.length}`);
    }
    const axisSpec = axisSpecs.length > 0 ? axisSpecs[0] : null;
    const measureText = options.measureText ?? estimateTextWidth;
    const gutterWidth = axisSpec != null && spec.content.some(hasTitle) ? measureGutter(spec.content, axisSpec, styles, measureText) : 0;
    const axis = axisSpec != null ? resolveTimeAxis(axisSpec, styles, gutterWidth, measureColumnContents(spec.content, axisSpec, styles, measureText)) : createFrameAxis(styles);
    const ctx = {
      DOMParser: options.DOMParser,
      document,
      styles,
      streamHeight,
      streamTitleEnabled,
      axis,
      measureText
    };
    const updaters = [];
    if (axisSpec != null) {
      const grid = renderTimeGrid(ctx, axis);
      $group.appendChild(grid.element);
      updaters.push(grid.update);
    }
    let minX = 0;
    let maxX = 0;
    let y = 0;
    for (const item of spec.content) {
      const rendererResult = renderContentItem(ctx, item);
      const { element, bbox, update } = rendererResult;
      translate(element, 0, y - bbox.y1);
      $group.appendChild(element);
      minX = Math.min(minX, bbox.x1);
      maxX = Math.max(maxX, bbox.x2);
      const height2 = bbox.y2 - bbox.y1;
      y += height2 + styles.stream_spacing;
      if (update != null) {
        updaters.push(update);
      }
    }
    const dx = minX < 0 ? -minX : 0;
    translate($group, dx, 0);
    const innerWidth = Math.max(maxX - minX, styles.minimum_width);
    const innerHeight = Math.max(y - styles.stream_spacing, styles.minimum_height);
    const width = styles.canvas_padding + innerWidth + styles.canvas_padding;
    const height = styles.canvas_padding + innerHeight + styles.canvas_padding;
    setSvgDimensions($svg, width, height);
    const bgColor = styles.background_color;
    if (bgColor !== "" && bgColor !== "transparent") {
      const $bg = createSvgElement(document, "rect", {
        x: 0,
        y: 0,
        width,
        height,
        fill: bgColor
      });
      $svg.insertBefore($bg, $svg.firstChild);
    }
    for (const update of updaters) {
      update({
        width: innerWidth,
        height: innerHeight,
        dx
      });
    }
    return {
      document,
      width,
      height
    };
  };

  // ../swirly/packages/swirly-theme-default-dark/dist/index.js
  var darkStyles = {
    ...baseStyles,
    arrow_stroke_color: "white",
    axis_label_color: "white",
    background_color: "black",
    barrier_color: "rgba(255, 255, 255, 0.5)",
    completion_stroke_color: "white",
    error_color: "white",
    event_fill_color: "auto_dark",
    event_stroke_color: "white",
    event_value_color: "white",
    grid_annotation_value_color: "white",
    grid_cell_fill_color: "black",
    grid_cell_stroke_color: "white",
    grid_cell_value_color: "white",
    grid_line_color: "rgba(255, 255, 255, 0.5)",
    grid_row_value_color: "white",
    operator_fill_color: "black",
    operator_stroke_color: "white",
    operator_title_color: "white",
    range_fill_color: "rgba(159, 159, 159, 0.25)",
    range_stroke_color: "white",
    row_label_color: "white",
    stream_title_color: "white"
  };

  // ../swirly/packages/swirly-theme-default-light/dist/index.js
  var lightStyles2 = {
    ...baseStyles,
    arrow_stroke_color: "black",
    axis_label_color: "black",
    background_color: "white",
    barrier_color: "rgba(0, 0, 0, 0.5)",
    completion_stroke_color: "black",
    error_color: "black",
    event_fill_color: "auto_light",
    event_stroke_color: "black",
    event_value_color: "black",
    grid_annotation_value_color: "black",
    grid_cell_fill_color: "white",
    grid_cell_stroke_color: "black",
    grid_cell_value_color: "black",
    grid_line_color: "rgba(0, 0, 0, 0.5)",
    grid_row_value_color: "black",
    operator_fill_color: "white",
    operator_stroke_color: "black",
    operator_title_color: "black",
    range_fill_color: "rgba(95, 95, 95, 0.25)",
    range_stroke_color: "black",
    row_label_color: "black",
    stream_title_color: "black"
  };

  // ../swirly/packages/swirly-theme-sodium/dist/index.js
  var sodiumStyles = {
    ...baseStyles,
    arrow_fill_color: "",
    arrow_stroke_color: "black",
    axis_column_sizing: "content",
    axis_label_color: "black",
    axis_label_font_style: "italic",
    background_color: "white",
    barrier_color: "black",
    completion_stroke_color: "black",
    error_color: "black",
    // The book draws no knockout fills; a marble is an outline with its value
    // inside, the same black on the same white as everything else.
    event_fill_color: "white",
    event_stroke_color: "black",
    event_value_color: "black",
    event_value_font_style: "italic",
    grid_annotation_value_color: "black",
    grid_annotation_value_font_style: "italic",
    grid_cell_fill_color: "white",
    grid_cell_stroke_color: "black",
    grid_cell_value_color: "black",
    grid_cell_value_font_style: "italic",
    grid_line_color: "black",
    grid_row_value_color: "black",
    grid_row_value_font_style: "italic",
    operator_fill_color: "white",
    operator_stroke_color: "black",
    operator_title_color: "black",
    range_fill_color: "white",
    range_stroke_color: "black",
    row_label_color: "black",
    row_label_font_style: "italic",
    stream_title_color: "black",
    stream_title_font_style: "italic"
  };

  // js/entry.js
  var import_xmldom = __toESM(require_lib());
  var adaptive = (base) => {
    const ink = Object.fromEntries(
      Object.keys(base).filter((key) => /_color$/.test(key) && key !== "background_color").map((key) => [key, "currentColor"])
    );
    return {
      ...base,
      ...ink,
      background_color: "",
      grid_cell_fill_color: "#fff"
    };
  };
  var THEMES = {
    adaptive: adaptive(sodiumStyles),
    sodium: sodiumStyles,
    light: lightStyles2,
    dark: darkStyles
  };
  globalThis.swirlyThemes = () => Object.keys(THEMES).join(", ");
  globalThis.swirlyRender = (source, themeName) => {
    const styles = THEMES[themeName];
    if (styles == null) {
      throw new Error(
        `unknown theme "${themeName}" (expected one of ${globalThis.swirlyThemes()})`
      );
    }
    const spec = parseMarbleDiagramSpecification(source);
    const { document } = renderMarbleDiagram(spec, { DOMParser: import_xmldom.DOMParser, styles });
    const $svg = document.documentElement;
    $svg.setAttribute("class", "swirly");
    $svg.setAttribute("role", "img");
    return new import_xmldom.XMLSerializer().serializeToString($svg);
  };
})();
