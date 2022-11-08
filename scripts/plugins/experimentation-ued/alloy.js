/**
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

 (function () {
  'use strict';

  if (document.documentMode && document.documentMode < 11) {
    console.warn('The Adobe Experience Cloud Web SDK does not support IE 10 and below.');
    return;
  }


  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createInstanceFunction = (function (executeCommand) {
    return function (args) {
      // Would use destructuring, but destructuring doesn't work on IE
      // without polyfilling Symbol.
      // https://github.com/babel/babel/issues/7597
      var resolve = args[0];
      var reject = args[1];
      var userProvidedArgs = args[2];
      var commandName = userProvidedArgs[0];
      var options = userProvidedArgs[1];
      executeCommand(commandName, options).then(resolve, reject);
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var CHROME = "Chrome";
  var EDGE$1 = "Edge";
  var EDGE_CHROMIUM = "EdgeChromium";
  var FIREFOX = "Firefox";
  var IE = "IE";
  var SAFARI = "Safari";
  var UNKNOWN = "Unknown";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Determines whether an array includes a certain value.
   * @param {Array} arr Array to search.
   * @param {*} item The item for which to search.
   * @returns {boolean}
   */
  var includes = (function (arr, item) {
    return arr.indexOf(item) !== -1;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // we don't know. We also assume "unknown" browsers support third-party cookies,
  // though we don't really know that either. We're making best guesses.

  var browsersSupportingThirdPartyCookie = [CHROME, EDGE$1, EDGE_CHROMIUM, IE, UNKNOWN];
  var areThirdPartyCookiesSupportedByDefault = (function (browser) {
    return includes(browsersSupportingThirdPartyCookie, browser);
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty$1.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var reactorObjectAssign = objectAssign;

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var MILLISECOND = 1;
  var SECOND = MILLISECOND * 1000;
  var MINUTE = SECOND * 60;
  var HOUR = MINUTE * 60;
  var DAY = HOUR * 24;
  var convertTimes = (function (fromUnit, toUnit, amount) {
    return fromUnit * amount / toUnit;
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var js_cookie = createCommonjsModule(function (module, exports) {

    (function (factory) {
      var registeredInModuleLoader;

      {
        module.exports = factory();
        registeredInModuleLoader = true;
      }

      if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();

        api.noConflict = function () {
          window.Cookies = OldCookies;
          return api;
        };
      }
    })(function () {
      function extend() {
        var i = 0;
        var result = {};

        for (; i < arguments.length; i++) {
          var attributes = arguments[i];

          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }

        return result;
      }

      function decode(s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }

      function init(converter) {
        function api() {}

        function set(key, value, attributes) {
          if (typeof document === 'undefined') {
            return;
          }

          attributes = extend({
            path: '/'
          }, api.defaults, attributes);

          if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
          } // We're using "expires" because "max-age" is not supported by IE


          attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

          try {
            var result = JSON.stringify(value);

            if (/^[\{\[]/.test(result)) {
              value = result;
            }
          } catch (e) {}

          value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
          key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var stringifiedAttributes = '';

          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }

            stringifiedAttributes += '; ' + attributeName;

            if (attributes[attributeName] === true) {
              continue;
            } // Considers RFC 6265 section 5.2:
            // ...
            // 3.  If the remaining unparsed-attributes contains a %x3B (";")
            //     character:
            // Consume the characters of the unparsed-attributes up to,
            // not including, the first %x3B (";") character.
            // ...


            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
          }

          return document.cookie = key + '=' + value + stringifiedAttributes;
        }

        function get(key, json) {
          if (typeof document === 'undefined') {
            return;
          }

          var jar = {}; // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all.

          var cookies = document.cookie ? document.cookie.split('; ') : [];
          var i = 0;

          for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var cookie = parts.slice(1).join('=');

            if (!json && cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }

            try {
              var name = decode(parts[0]);
              cookie = (converter.read || converter)(cookie, name) || decode(cookie);

              if (json) {
                try {
                  cookie = JSON.parse(cookie);
                } catch (e) {}
              }

              jar[name] = cookie;

              if (key === name) {
                break;
              }
            } catch (e) {}
          }

          return key ? jar[key] : jar;
        }

        api.set = set;

        api.get = function (key) {
          return get(key, false
          /* read as raw */
          );
        };

        api.getJSON = function (key) {
          return get(key, true
          /* read as json */
          );
        };

        api.remove = function (key, attributes) {
          set(key, '', extend(attributes, {
            expires: -1
          }));
        };

        api.defaults = {};
        api.withConverter = init;
        return api;
      }

      return init(function () {});
    });
  });

  // we have a little more flexibility to change the underlying implementation later. If clear
  // use cases come up for needing the other methods js-cookie exposes, we can re-evaluate whether
  // we want to expose them here.


  var reactorCookie = {
    get: js_cookie.get,
    set: js_cookie.set,
    remove: js_cookie.remove
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns true whether the value is null or undefined.
   * @param {*} value
   * @returns {boolean}
   */
  var isNil = (function (value) {
    return value == null;
  });

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * Returns whether the value is an object.
   * @param {*} value
   * @returns {boolean}
   */

  var isObject = (function (value) {
    return !isNil(value) && !Array.isArray(value) && _typeof(value) === "object";
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var deepAssignObject = function deepAssignObject(target, source) {
    Object.keys(source).forEach(function (key) {
      if (isObject(target[key]) && isObject(source[key])) {
        deepAssignObject(target[key], source[key]);
        return;
      }

      target[key] = source[key];
    });
  };
  /**
   * Recursively copy the values of all enumerable own properties from a source item to a target item if the both items are objects
   * @param {Object} target - a target object
   * @param {...Object} source - an array of source objects
   * @example
   * deepAssign({ a: 'a', b: 'b' }, { b: 'B', c: 'c' });
   * // { a: 'a', b: 'B', c: 'c' }
   */


  var deepAssign = (function (target) {
    if (isNil(target)) {
      throw new TypeError('deepAssign "target" cannot be null or undefined');
    }

    var result = Object(target);

    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
      return deepAssignObject(result, Object(source));
    });
    return result;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Creates a function that, when passed an object of updates, will merge
   * the updates onto the current value of a payload property.
   * @param {Object} content The base object to modify
   * @param {String } key The property to merge updates into. This
   * can be a dot-notation property path.
   * @returns {Function}
   */

  var createMerger = (function (content, key) {
    return function (updates) {
      var propertyPath = key.split(".");
      var hostObjectForUpdates = propertyPath.reduce(function (obj, propertyName) {
        obj[propertyName] = obj[propertyName] || {};
        return obj[propertyName];
      }, content);
      deepAssign(hostObjectForUpdates, updates);
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Allows callbacks to be registered and then later called. When the
   * callbacks are called, their responses are combined into a single promise.
   */
  var createCallbackAggregator = (function () {
    var callbacks = [];
    return {
      add: function add(callback) {
        callbacks.push(callback);
      },
      call: function call() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        // While this utility doesn't necessarily need to be doing the
        // Promise.all, it's currently useful everywhere this is used and
        // reduces repetitive code. We can factor it out later if we want
        // to make this utility more "pure".
        return Promise.all(callbacks.map(function (callback) {
          return callback.apply(void 0, args);
        }));
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Sequences tasks.
   */
  var createTaskQueue = (function () {
    var queueLength = 0;
    var lastPromiseInQueue = Promise.resolve();
    return {
      /**
       * Add a task to the queue. If no task is currenty running,
       * the task will begin immediately.
       * @param {Function} task A function that will be called when
       * the task should be run. If the task it asynchronous, it should
       * return a promise.
       * @returns {Promise} A promise that will be resolved or rejected
       * with whatever value the task resolved or rejects its promise.
       */
      addTask: function addTask(task) {
        queueLength += 1;

        var lastPromiseFulfilledHandler = function lastPromiseFulfilledHandler() {
          return task().finally(function () {
            queueLength -= 1;
          });
        };

        lastPromiseInQueue = lastPromiseInQueue.then(lastPromiseFulfilledHandler, lastPromiseFulfilledHandler);
        return lastPromiseInQueue;
      },

      /**
       * How many tasks are in the queue. This includes the task
       * that's currently running.
       * @returns {number}
       */
      get length() {
        return queueLength;
      }

    };
  });

  /* eslint-disable */

  /*
  crc32 Â· JavaScript Function to Calculate CRC32 of a String
  Description
    Below is a JavaScript function to calculate CRC32 of a string. 
    The string can be either ASCII or Unicode. 
    Unicode strings will be encoded in UTF-8. 
    The polynomial used in calculation is 0xedb88320. 
    This polynomial is used in Ethernet, Gzip, PNG, SATA and many other technologies.
  */
  var crc32 = function () {
    var table = [];

    for (var i = 0; i < 256; i++) {
      var c = i;

      for (var j = 0; j < 8; j++) {
        c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1;
      }

      table.push(c);
    }

    return function (str, crc) {
      str = unescape(encodeURIComponent(str));
      if (!crc) crc = 0;
      crc = crc ^ -1;

      for (var _i = 0; _i < str.length; _i++) {
        var y = (crc ^ str.charCodeAt(_i)) & 0xff;
        crc = crc >>> 8 ^ table[y];
      }

      crc = crc ^ -1;
      return crc >>> 0;
    };
  }();

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * A simple utility for managing a promise's state outside of
   * the promise's "executor" (the function passed into the constructor).
   */
  var defer = (function () {
    var deferred = {};
    deferred.promise = new Promise(function (resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Whether a string ends with the characters of a specified string
   * @param {String} str The string to search within.
   * @param {String} suffix The string to search for.
   * @returns {boolean}
   */
  var endsWith = (function (str, suffix) {
    return str.substr(-suffix.length) === suffix;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns the first item in the array that satisfies the provided testing function.
   * @param {Array} arr The array to search.
   * @param {Function} predicate Function that will be called for each item. Arguments
   * will be the item, the item index, then the array itself.
   * @returns {*}
   */
  var find = (function (arr, predicate) {
    for (var i = 0; i < arr.length; i += 1) {
      var item = arr[i];

      if (predicate(item, i, arr)) {
        return item;
      }
    }

    return undefined;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var appendNode = (function (parent, node) {
    return parent.appendChild(node);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var populateElementProperties = function populateElementProperties(element, props) {
    Object.keys(props).forEach(function (key) {
      // The following is to support setting style properties to avoid CSP errors.
      if (key === "style" && isObject(props[key])) {
        var styleProps = props[key];
        Object.keys(styleProps).forEach(function (styleKey) {
          element.style[styleKey] = styleProps[styleKey];
        });
      } else {
        element[key] = props[key];
      }
    });
  };

  var createNode = (function (tag) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
    var result = doc.createElement(tag);
    Object.keys(attrs).forEach(function (key) {
      // TODO: To highlight CSP problems consider throwing a descriptive error
      //       if nonce is available and key is style.
      result.setAttribute(key, attrs[key]);
    });
    populateElementProperties(result, props);
    children.forEach(function (child) {
      return appendNode(result, child);
    });
    return result;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var BODY = "BODY";
  var IFRAME = "IFRAME";
  var IMG = "IMG";
  var DIV = "DIV";
  var STYLE = "STYLE";
  var SCRIPT = "SCRIPT";
  var SRC = "src";
  var HEAD = "HEAD";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Fires an image pixel from the current document's window.
   * @param {object} currentDocument
   * @param {string} src
   * @returns {Promise}
   */

  var fireImage = (function (_ref) {
    var src = _ref.src,
        _ref$currentDocument = _ref.currentDocument,
        currentDocument = _ref$currentDocument === void 0 ? document : _ref$currentDocument;
    return new Promise(function (resolve, reject) {
      var attrs = {
        src: src
      };
      var props = {
        onload: resolve,
        onerror: reject,
        onabort: reject
      };
      createNode(IMG, attrs, props, [], currentDocument);
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns whether the value is a function.
   * @param {*} value
   * @returns {boolean}
   */
  var isFunction = (function (value) {
    return typeof value === "function";
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns whether the value is a non-empty array.
   * @param {*} value
   * @returns {boolean}
   */
  var isNonEmptyArray = (function (value) {
    return Array.isArray(value) && value.length > 0;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var toArray = (function (value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (value == null) {
      return [];
    }

    return [].slice.call(value);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns an array of matched DOM nodes.
   * @param {String} selector
   * @param {Node} [context=document] defaults to document
   * @returns {Array} an array of DOM nodes
   */

  var selectNodes = (function (selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return toArray(context.querySelectorAll(selector));
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var MUTATION_OBSERVER = "MutationObserver";
  var RAF = "requestAnimationFrame";
  var MUTATION_OBSERVER_CONFIG = {
    childList: true,
    subtree: true
  };
  var VISIBILITY_STATE = "visibilityState";
  var VISIBLE = "visible";
  var DELAY = 100;
  var MAX_POLLING_TIMEOUT = 5000;

  var createError = function createError(selector) {
    return new Error("Could not find: " + selector);
  };

  var createPromise = function createPromise(executor) {
    return new Promise(executor);
  };

  var canUseMutationObserver = function canUseMutationObserver(win) {
    return isFunction(win[MUTATION_OBSERVER]);
  };
  var awaitUsingMutationObserver = function awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc) {
    return createPromise(function (resolve, reject) {
      var mutationObserver = new win[MUTATION_OBSERVER](function () {
        var nodes = selectFunc(selector);

        if (isNonEmptyArray(nodes)) {
          mutationObserver.disconnect();
          resolve(nodes);
        }
      });
      setTimeout(function () {
        mutationObserver.disconnect();
        reject(createError(selector));
      }, timeout);
      mutationObserver.observe(doc, MUTATION_OBSERVER_CONFIG);
    });
  };
  var canUseRequestAnimationFrame = function canUseRequestAnimationFrame(doc) {
    return doc[VISIBILITY_STATE] === VISIBLE;
  };
  var awaitUsingRequestAnimation = function awaitUsingRequestAnimation(win, selector, timeout, selectFunc) {
    return createPromise(function (resolve, reject) {
      var execute = function execute() {
        var nodes = selectFunc(selector);

        if (isNonEmptyArray(nodes)) {
          resolve(nodes);
          return;
        }

        win[RAF](execute);
      };

      execute();
      setTimeout(function () {
        reject(createError(selector));
      }, timeout);
    });
  };
  var awaitUsingTimer = function awaitUsingTimer(selector, timeout, selectFunc) {
    return createPromise(function (resolve, reject) {
      var execute = function execute() {
        var nodes = selectFunc(selector);

        if (isNonEmptyArray(nodes)) {
          resolve(nodes);
          return;
        }

        setTimeout(execute, DELAY);
      };

      execute();
      setTimeout(function () {
        reject(createError(selector));
      }, timeout);
    });
  };
  var awaitSelector = (function (selector) {
    var selectFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selectNodes;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MAX_POLLING_TIMEOUT;
    var win = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
    var doc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : document;
    var nodes = selectFunc(selector);

    if (isNonEmptyArray(nodes)) {
      return Promise.resolve(nodes);
    }

    if (canUseMutationObserver(win)) {
      return awaitUsingMutationObserver(win, doc, selector, timeout, selectFunc);
    }

    if (canUseRequestAnimationFrame(doc)) {
      return awaitUsingRequestAnimation(win, selector, timeout, selectFunc);
    }

    return awaitUsingTimer(selector, timeout, selectFunc);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns true if element matches the selector.
   * @param {String} selector
   * @param {Node} [element]
   * @returns {Boolean}
   */
  var matchesSelector = (function (selector, element) {
    if (element.matches) {
      return element.matches(selector);
    } // Making IE 11 happy


    return element.msMatchesSelector(selector);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var removeNode = (function (node) {
    var parent = node.parentNode;

    if (parent) {
      return parent.removeChild(node);
    }

    return null;
  });

  var fireOnPage = fireImage;
  var IFRAME_ATTRS = {
    name: "Adobe Alloy"
  };
  var IFRAME_PROPS = {
    style: {
      display: "none",
      width: 0,
      height: 0
    }
  };
  var fireReferrerHideableImage = (function (request) {
    var createIframe = function createIframe() {
      return awaitSelector(BODY).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            body = _ref2[0];

        var iframe = createNode(IFRAME, IFRAME_ATTRS, IFRAME_PROPS);
        return appendNode(body, iframe);
      });
    };

    var fireInIframe = function fireInIframe(_ref3) {
      var src = _ref3.src;
      return createIframe().then(function (iframe) {
        var currentDocument = iframe.contentWindow.document;
        return fireImage({
          src: src,
          currentDocument: currentDocument
        }).then(function () {
          removeNode(iframe);
        });
      });
    };

    var hideReferrer = request.hideReferrer,
        url = request.url;
    return hideReferrer ? fireInIframe({
      src: url
    }) : fireOnPage({
      src: url
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var flatMap = (function (array, mapFunction) {
    return Array.prototype.concat.apply([], array.map(mapFunction));
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var baseNamespace = "com.adobe.alloy.";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns the last N number of items from an array.
   * @param {Array} arr
   * @param {number} itemCount
   * @returns {Array}
   */
  var getLastArrayItems = (function (arr, itemCount) {
    return arr.slice(-itemCount);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var cookieName = baseNamespace + "getTld";
  /**
   * Of the current web page's hostname, this is the top-most domain that is
   * not a "public suffix" as outlined in https://publicsuffix.org/. In other
   * words, this is top-most domain that is able to accept cookies.
   * @param {Object} window
   * @param {Object} cookieJar
   * @returns {string}
   */

  var getApexDomain = (function (window, cookieJar) {
    var topLevelCookieDomain = ""; // If hostParts.length === 1, we may be on localhost.

    var hostParts = window.location.hostname.toLowerCase().split(".");
    var i = 1;

    while (i < hostParts.length && !cookieJar.get(cookieName)) {
      i += 1;
      topLevelCookieDomain = getLastArrayItems(hostParts, i).join(".");
      cookieJar.set(cookieName, cookieName, {
        domain: topLevelCookieDomain
      });
    }

    cookieJar.remove(cookieName, {
      domain: topLevelCookieDomain
    });
    return topLevelCookieDomain;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // Remember to also incorporate the org ID wherever cookies are read or written.
  var COOKIE_NAME_PREFIX = "kndctr";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var sanitizeOrgIdForCookieName = (function (orgId) {
    return orgId.replace("@", "_");
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getNamespacedCookieName = (function (orgId, key) {
    return COOKIE_NAME_PREFIX + "_" + sanitizeOrgIdForCookieName(orgId) + "_" + key;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var IDENTITY = "identity";
  var CONSENT = "consent";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectDoesIdentityCookieExist = (function (_ref) {
    var orgId = _ref.orgId;
    var identityCookieName = getNamespacedCookieName(orgId, IDENTITY);
    /**
     * Returns whether the identity cookie exists.
     */

    return function () {
      return Boolean(reactorCookie.get(identityCookieName));
    };
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Whether a string starts with the characters of a specified string
   * @param {String} str The string to search within.
   * @param {String} prefix The string to search for.
   * @returns {boolean}
   */
  var startsWith = (function (str, prefix) {
    return str.substr(0, prefix.length) === prefix;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var getStorageByType = function getStorageByType(context, storageType, namespace) {
    // When storage is disabled on Safari, the mere act of referencing
    // window.localStorage or window.sessionStorage throws an error.
    // For this reason, we wrap in a try-catch.
    return {
      /**
       * Reads a value from storage.
       * @param {string} name The name of the item to be read.
       * @returns {string}
       */
      getItem: function getItem(name) {
        try {
          return context[storageType].getItem(namespace + name);
        } catch (e) {
          return null;
        }
      },

      /**
       * Saves a value to storage.
       * @param {string} name The name of the item to be saved.
       * @param {string} value The value of the item to be saved.
       * @returns {boolean} Whether the item was successfully saved to storage.
       */
      setItem: function setItem(name, value) {
        try {
          context[storageType].setItem(namespace + name, value);
          return true;
        } catch (e) {
          return false;
        }
      },

      /**
       * Clear all values in storage that match the namespace.
       */
      clear: function clear() {
        try {
          Object.keys(context[storageType]).forEach(function (key) {
            if (startsWith(key, namespace)) {
              context[storageType].removeItem(key);
            }
          });
          return true;
        } catch (e) {
          return false;
        }
      }
    };
  };

  var injectStorage = (function (context) {
    return function (additionalNamespace) {
      var finalNamespace = baseNamespace + additionalNamespace;
      return {
        session: getStorageByType(context, "sessionStorage", finalNamespace),
        persistent: getStorageByType(context, "localStorage", finalNamespace)
      };
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns items that are found within both arrays.
   * @param {Array} a
   * @param {Array} b
   * @returns {Array}
   */

  var intersection = (function (a, b) {
    return a.filter(function (x) {
      return includes(b, x);
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns whether the value is a boolean.
   * @param {*} value
   * @returns {boolean}
   */
  var isBoolean = (function (value) {
    return typeof value === "boolean";
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns whether the value is an empty object.
   * @param {*} value
   * @returns {boolean}
   */

  var isEmptyObject = (function (value) {
    return isObject(value) && Object.keys(value).length === 0;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns whether the value is a number.
   * @param {*} value
   * @returns {boolean}
   */
  // eslint-disable-next-line no-restricted-globals
  var isNumber = (function (value) {
    return typeof value === "number" && !isNaN(value);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns whether the value is an integer.
   * @param {*} value
   * @returns {boolean}
   */

  var isInteger = (function (value) {
    var parsed = parseInt(value, 10);
    return isNumber(parsed) && value === parsed;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Determines whether a cookie name is namespaced according to the contract
   * defined by the server.
   * @param {String} orgId The org ID configured for the Alloy instance.
   * @param {String} name The cookie name.
   * @returns {boolean}
   */

  var isNamespacedCookieName = (function (orgId, name) {
    return name.indexOf(COOKIE_NAME_PREFIX + "_" + sanitizeOrgIdForCookieName(orgId) + "_") === 0;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns whether the value is a string.
   * @param {*} value
   * @returns {boolean}
   */
  var isString = (function (value) {
    return typeof value === "string";
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns whether the value is a populated string.
   * @param {*} value
   * @returns {boolean}
   */

  var isNonEmptyString = (function (value) {
    return isString(value) && value.length > 0;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Creates a function that memoizes the result of `fn`. If `keyResolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key.
   *
   * @param {Function} fn The function to have its output memoized.
   * @param {Function} [keyResolver] The function to resolve the cache key.
   * @returns {Function} The new memoized function.
   */
  var memoize = (function (fn, keyResolver) {
    var map = new Map();
    return function () {
      var key = keyResolver ? keyResolver.apply(void 0, arguments) : arguments.length <= 0 ? undefined : arguments[0];

      if (map.has(key)) {
        return map.get(key);
      }

      var result = fn.apply(void 0, arguments);
      map.set(key, result);
      return result;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * A function that performs no operations.
   */
  var noop$1 = (function () {});

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  var padStart = (function (string, targetLength, padString) {
    var originalString = String(string);
    var repeatedPadString = String(padString);

    if (originalString.length >= targetLength || repeatedPadString.length === 0) {
      return originalString;
    }

    var lengthToAdd = targetLength - originalString.length;

    while (lengthToAdd > repeatedPadString.length) {
      repeatedPadString += repeatedPadString;
    }

    return repeatedPadString.slice(0, lengthToAdd) + originalString;
  });

  // Copyright Joyent, Inc. and other Node contributors.
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707

  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var decode = function decode(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1000;

    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr,
          vstr,
          k,
          v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  var stringifyPrimitive = function stringifyPrimitive(v) {
    switch (_typeof(v)) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  var encode = function encode(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';

    if (obj === null) {
      obj = undefined;
    }

    if (_typeof(obj) === 'object') {
      return Object.keys(obj).map(function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

        if (Array.isArray(obj[k])) {
          return obj[k].map(function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  };

  var querystring = createCommonjsModule(function (module, exports) {

    exports.decode = exports.parse = decode;
    exports.encode = exports.stringify = encode;
  });
  querystring.decode;
  querystring.parse;
  querystring.encode;
  querystring.stringify;

  // This allows us to more easily make changes to the underlying implementation later without
  // having to worry about breaking extensions. If extensions demand additional functionality, we
  // can make adjustments as needed.


  var reactorQueryString = {
    parse: function parse(string) {
      //
      if (typeof string === 'string') {
        // Remove leading ?, #, & for some leniency so you can pass in location.search or
        // location.hash directly.
        string = string.trim().replace(/^[?#&]/, '');
      }

      return querystring.parse(string);
    },
    stringify: function stringify(object) {
      return querystring.stringify(object);
    }
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Creates and returns a new error using the provided value as a message.
   * If the provided value is already an Error, it will be returned unmodified.
   * @param {*} value
   * @returns {Error}
   */
  var toError = (function (value) {
    return value instanceof Error ? value : new Error(value);
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var updateErrorMessage = (function (_ref) {
    var error = _ref.error,
        message = _ref.message;

    try {
      error.message = message;
    } catch (e) {// We'll set a new message when we can, but some errors, like DOMException,
      // have a read-only message property, which limits our options.
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Augments an error's message with additional context as it bubbles up the call stack.
   * @param {String} message The message to be added to the error.
   * @param {*} error Optimally, this is an instance of Error. If it is not,
   * this is used as the basis for the message of a newly created Error instance.
   * @returns {*}
   */

  var stackError = (function (_ref) {
    var error = _ref.error,
        message = _ref.message;
    var errorToStack = toError(error);
    var newMessage = message + "\nCaused by: " + errorToStack.message;
    updateErrorMessage({
      error: errorToStack,
      message: newMessage
    });
    return errorToStack;
  });

  var stringToBoolean = (function (str) {
    return isString(str) && str.toLowerCase() === "true";
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Formats the date into an ISO date-time string in the local timezone
   * @param {Date} date
   * @returns {string}
   */

  var toISOStringLocal = (function (date) {
    var YYYY = date.getFullYear();
    var MM = padStart(date.getMonth() + 1, 2, "0");
    var DD = padStart(date.getDate(), 2, "0");
    var hh = padStart(date.getHours(), 2, "0");
    var mm = padStart(date.getMinutes(), 2, "0");
    var ss = padStart(date.getSeconds(), 2, "0");
    var mmm = padStart(date.getMilliseconds(), 3, "0"); // The time-zone offset is the difference, in minutes, from local time to UTC. Note that this
    // means that the offset is positive if the local timezone is behind UTC and negative if it is
    // ahead. For example, for time zone UTC+10:00, -600 will be returned.

    var timezoneOffset = date.getTimezoneOffset();
    var ts = timezoneOffset > 0 ? "-" : "+";
    var th = padStart(Math.floor(Math.abs(timezoneOffset) / 60), 2, "0");
    var tm = padStart(Math.abs(timezoneOffset) % 60, 2, "0");
    return YYYY + "-" + MM + "-" + DD + "T" + hh + ":" + mm + ":" + ss + "." + mmm + ts + th + ":" + tm;
  });

  var rngBrowser = createCommonjsModule(function (module) {
    // Unique ID creation requires a high quality random # generator.  In the
    // browser this is a little complicated due to unknown quality of Math.random()
    // and inconsistent support for the `crypto` API.  We do the best we can via
    // feature-detection
    // getRandomValues needs to be invoked in a context where "this" is a Crypto
    // implementation. Also, find the complete implementation of crypto on IE11.
    var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (getRandomValues) {
      // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
      var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var rnds = new Array(16);

      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
          rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return rnds;
      };
    }
  });

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  }

  var bytesToUuid_1 = bytesToUuid;

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof options == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }

    options = options || {};
    var rnds = options.random || (options.rng || rngBrowser)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Chains two validators together.
   *
   * Validators are functions of two parameters (value and path) that return the computed value if
   * the input is valid, or throw an exception if the input is invalid. In most cases the returned
   * value is the same as the input value; however, reference createDefaultValidator.js
   * to see an example where the computed value is different from the input. Additionally, if we ever
   * wanted to coerce types (i.e. parse string values into integers) as part of the validation process
   * we could use the computed value to accomplish that.
   *
   * The path parameter is used to generate informative error messages. It is created by the objectOf, and
   * arrayOf validators so that any error message can describe which key within the object or array is
   * invalid.
   *
   * The validators also have methods to chain additional validation logic. For example, when you call
   * `string()` to start a validator chain, it returns a validator function but it also has methods
   * like `required` and `nonEmpty`. In index.js you can see that these methods are actually calling `chain`.
   * Specifically in this function, the leftValidator is called first and then the return value of that is
   * sent to the rightValidator. For example, when calling `string().nonEmpty().required()` the following
   * chain is built up:
   * ```
   *              *
   *            /   \
   *          *     required
   *        /   \
   *      *     nonEmpty
   *    /   \
   * base   string
   * ```
   * Where every * is a call to chain where the two are combined. The individual validators are called from
   * left to right in the above tree. The base validator is simply the identity function `value => value`,
   * representing an optional value.
   *
   * After combining the validators, the new validator function is then augmented with the methods from the
   * leftValidator and from the additionalMethods parameter. For example, when the string() function is called
   * it chains to the base validator, but also adds additional methods like (`regexp`, `domain`, `nonEmpty`,
   * and `unique`). When `nonEmpty` is called, which calls chain again, the additional methods are carried
   * forward because they are already defined on the leftValidator.
   *
   * The base validator also contains the two methods `required` and `default`, so these can be used anywhere
   * after any of the exposed validator functions are called.
   */

  var chain = (function (leftValidator, rightValidator) {
    var additionalMethods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // combine the two validators, calling left first and then right.
    // pass the return value from left into right.
    var combinedValidator = function combinedValidator(value, path) {
      return rightValidator(leftValidator(value, path), path);
    }; // add the methods already defined on the left validator, and the additionalMethods
    // to the new combined validator function.


    reactorObjectAssign(combinedValidator, leftValidator, additionalMethods);
    return combinedValidator;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * This augments `chain` with a null check done before running the rightValidator.
   * See chain for more info.
   *
   * For most validators, we want the validation to be optional (i.e. allow null or
   * undefined values). To accomplish this, the validator needs to have a check
   * at the begining of the function, short circuiting the validation logic and
   * returning value if value is null or undefined. `default` and `required` do not
   * want this null check though. Indeed, `default` should return the default value
   * if value is null, and `required` should throw an error if value is null.
   *
   * So to keep from having to have a null check in front of most validators, this
   * function allows you to chain a rightValidator that needs to have a null check.
   */

  var nullSafeChain = (function (leftValidator, rightValidator, additionalMethods) {
    var rightValidatorWithNullCheck = function rightValidatorWithNullCheck(value, path) {
      return value == null ? value : rightValidator(value, path);
    };

    return chain(leftValidator, rightValidatorWithNullCheck, additionalMethods);
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var assertValid = (function (isValid, value, path, message) {
    if (!isValid) {
      throw new Error("'" + path + "': Expected " + message + ", but got " + JSON.stringify(value) + ".");
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var booleanValidator = (function (value, path) {
    assertValid(isBoolean(value), value, path, "true or false");
    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var callbackValidator = (function (value, path) {
    assertValid(isFunction(value), value, path, "a function");
    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createArrayOfValidator = (function (elementValidator) {
    return function (value, path) {
      assertValid(Array.isArray(value), value, path, "an array");
      var errors = [];
      var validatedArray = value.map(function (subValue, i) {
        try {
          return elementValidator(subValue, path + "[" + i + "]");
        } catch (e) {
          errors.push(e.message);
          return undefined;
        }
      });

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }

      return validatedArray;
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createDefaultValidator = (function (defaultValue) {
    return function (value) {
      if (value == null) {
        return defaultValue;
      }

      return value;
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createLiteralValidator = (function (literalValue) {
    return function (value, path) {
      assertValid(value === literalValue, value, path, "" + literalValue);
      return value;
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createMapOfValuesValidator = (function (valueValidator) {
    return function (value, path) {
      assertValid(isObject(value), value, path, "an object");
      var errors = [];
      var validatedObject = {};
      Object.keys(value).forEach(function (subKey) {
        var subValue = value[subKey];
        var subPath = path ? path + "." + subKey : subKey;

        try {
          var validatedValue = valueValidator(subValue, subPath);

          if (validatedValue !== undefined) {
            validatedObject[subKey] = validatedValue;
          }
        } catch (e) {
          errors.push(e.message);
        }
      });

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }

      return validatedObject;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createMinimumValidator = (function (typeName, minimum) {
    return function (value, path) {
      assertValid(value >= minimum, value, path, typeName + " greater than or equal to " + minimum);
      return value;
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createNoUnknownFieldsValidator = (function (schema) {
    return function (value, path) {
      var errors = [];
      Object.keys(value).forEach(function (subKey) {
        if (!schema[subKey]) {
          var subPath = path ? path + "." + subKey : subKey;
          errors.push("'" + subPath + "': Unknown field.");
        }
      });

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }

      return value;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createNonEmptyValidator = (function (message) {
    return function (value, path) {
      if (isObject(value)) {
        assertValid(!isEmptyObject(value), value, path, message);
      } else {
        assertValid(value.length > 0, value, path, message);
      }

      return value;
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createObjectOfValidator = (function (schema) {
    return function (value, path) {
      assertValid(isObject(value), value, path, "an object");
      var errors = [];
      var validatedObject = {};
      Object.keys(schema).forEach(function (subKey) {
        var subValue = value[subKey];
        var subSchema = schema[subKey];
        var subPath = path ? path + "." + subKey : subKey;

        try {
          var validatedValue = subSchema(subValue, subPath);

          if (validatedValue !== undefined) {
            validatedObject[subKey] = validatedValue;
          }
        } catch (e) {
          errors.push(e.message);
        }
      }); // copy over unknown properties

      Object.keys(value).forEach(function (subKey) {
        if (!Object.prototype.hasOwnProperty.call(validatedObject, subKey)) {
          validatedObject[subKey] = value[subKey];
        }
      });

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }

      return validatedObject;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createAnyOfValidator = (function (validators, message) {
    return function (value, path) {
      var valid = find(validators, function (validator) {
        try {
          validator(value, path);
          return true;
        } catch (e) {
          return false;
        }
      });
      assertValid(valid, value, path, message);
      return value;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createUniqueValidator = (function () {
    var values = [];
    return function (value, path) {
      assertValid(values.indexOf(value) === -1, value, path, "a unique value across instances");
      values.push(value);
      return value;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var DOMAIN_REGEX = /^[a-z0-9.-]{1,}$/i;
  var domainValidator = (function (value, path) {
    assertValid(DOMAIN_REGEX.test(value), value, path, "a valid domain");
    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var integerValidator = (function (value, path) {
    assertValid(isInteger(value), value, path, "an integer");
    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var numberValidator = (function (value, path) {
    assertValid(isNumber(value), value, path, "a number");
    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Determines whether the value is a valid regular expression.
   * @param {*} value
   * @returns {boolean}
   */
  var isValidRegExp = (function (value) {
    try {
      return new RegExp(value) !== null;
    } catch (e) {
      return false;
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var regexpValidator = (function (value, path) {
    assertValid(isValidRegExp(value), value, path, "a regular expression");
    return value;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var requiredValidator = (function (value, path) {
    if (value == null) {
      throw new Error("'" + path + "' is a required option");
    }

    return value;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var stringValidator = (function (value, path) {
    assertValid(isString(value), value, path, "a string");
    return value;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var base = function base(value) {
    return value;
  }; // The 'default' and 'required' methods are available after any data-type method
  // Don't use the nullSafeChain because they need to handle the null or undefined case


  base.default = function _default(defaultValue) {
    return chain(this, createDefaultValidator(defaultValue));
  };

  base.required = function required() {
    return chain(this, requiredValidator);
  }; // helper validators


  var domain = function domain() {
    return nullSafeChain(this, domainValidator);
  };

  var minimumInteger = function minimumInteger(minValue) {
    return nullSafeChain(this, createMinimumValidator("an integer", minValue));
  };

  var minimumNumber = function minimumNumber(minValue) {
    return nullSafeChain(this, createMinimumValidator("a number", minValue));
  };

  var integer = function integer() {
    return nullSafeChain(this, integerValidator, {
      minimum: minimumInteger
    });
  };

  var nonEmptyString = function nonEmptyString() {
    return nullSafeChain(this, createNonEmptyValidator("a non-empty string"));
  };

  var nonEmptyArray = function nonEmptyArray() {
    return nullSafeChain(this, createNonEmptyValidator("a non-empty array"));
  };

  var nonEmptyObject = function nonEmptyObject() {
    return nullSafeChain(this, createNonEmptyValidator("a non-empty object"));
  };

  var regexp = function regexp() {
    return nullSafeChain(this, regexpValidator);
  };

  var unique = function createUnique() {
    return nullSafeChain(this, createUniqueValidator());
  }; // top-level validators.  These are the first functions that are called to create a validator.


  var anyOf = function anyOf(validators, message) {
    // use chain here because we don't want to accept null or undefined unless at least
    // one of the validators accept null or undefined.
    return chain(this, createAnyOfValidator(validators, message));
  };

  var anything = function anything() {
    return nullSafeChain(this, base);
  };

  var arrayOf = function arrayOf(elementValidator) {
    return nullSafeChain(this, createArrayOfValidator(elementValidator), {
      nonEmpty: nonEmptyArray
    });
  };

  var boolean = function boolean() {
    return nullSafeChain(this, booleanValidator);
  };

  var callback = function callback() {
    return nullSafeChain(this, callbackValidator);
  };

  var literal = function literal(literalValue) {
    return nullSafeChain(this, createLiteralValidator(literalValue));
  };

  var number = function number() {
    return nullSafeChain(this, numberValidator, {
      minimum: minimumNumber,
      integer: integer,
      unique: unique
    });
  };

  var mapOfValues = function mapOfValues(valuesValidator) {
    return nullSafeChain(this, createMapOfValuesValidator(valuesValidator), {
      nonEmpty: nonEmptyObject
    });
  };

  var objectOf = function objectOf(schema) {
    var noUnknownFields = function noUnknownFields() {
      return nullSafeChain(this, createNoUnknownFieldsValidator(schema));
    };

    return nullSafeChain(this, createObjectOfValidator(schema), {
      noUnknownFields: noUnknownFields,
      nonEmpty: nonEmptyObject
    });
  };

  var string = function string() {
    return nullSafeChain(this, stringValidator, {
      regexp: regexp,
      domain: domain,
      nonEmpty: nonEmptyString,
      unique: unique
    });
  };

  var boundAnyOf = anyOf.bind(base);
  var boundAnything = anything.bind(base);
  var boundArrayOf = arrayOf.bind(base);
  var boundBoolean = boolean.bind(base);
  var boundCallback = callback.bind(base);
  var boundLiteral = literal.bind(base);
  number.bind(base);
  var boundMapOfValues = mapOfValues.bind(base);
  var boundObjectOf = objectOf.bind(base);
  var boundString = string.bind(base); // compound validators

  var boundEnumOf = function boundEnumOf() {
    for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    return boundAnyOf(values.map(boundLiteral), "one of these values: [" + JSON.stringify(values) + "]");
  };

  var AMBIGUOUS = "ambiguous";
  var AUTHENTICATED = "authenticated";
  var LOGGED_OUT = "loggedOut";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var validateIdentityMap = boundMapOfValues(boundArrayOf(boundObjectOf({
    authenticatedState: boundEnumOf(AMBIGUOUS, AUTHENTICATED, LOGGED_OUT),
    id: boundString(),
    namespace: boundObjectOf({
      code: boundString()
    }).noUnknownFields(),
    primary: boundBoolean(),
    xid: boundString()
  })).required());

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns an array whose items are the provided object's own enumerable
   * property values.
   * @param {Object} obj
   * @returns {Array}
   */
  var values = (function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var debugQueryParam = "alloy_debug";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createLogController = (function (_ref) {
    var console = _ref.console,
        locationSearch = _ref.locationSearch,
        createLogger = _ref.createLogger,
        instanceName = _ref.instanceName,
        createNamespacedStorage = _ref.createNamespacedStorage,
        getMonitors = _ref.getMonitors;
    var parsedQueryString = reactorQueryString.parse(locationSearch);
    var storage = createNamespacedStorage("instance." + instanceName + ".");
    var debugSessionValue = storage.session.getItem("debug");
    var debugEnabled = debugSessionValue === "true";
    var debugEnabledWritableFromConfig = debugSessionValue === null;

    var getDebugEnabled = function getDebugEnabled() {
      return debugEnabled;
    };

    var setDebugEnabled = function setDebugEnabled(value, _ref2) {
      var fromConfig = _ref2.fromConfig;

      if (!fromConfig || debugEnabledWritableFromConfig) {
        debugEnabled = value;
      }

      if (!fromConfig) {
        // Web storage only allows strings, so we explicitly convert to string.
        storage.session.setItem("debug", value.toString());
        debugEnabledWritableFromConfig = false;
      }
    };

    if (parsedQueryString[debugQueryParam] !== undefined) {
      setDebugEnabled(stringToBoolean(parsedQueryString[debugQueryParam]), {
        fromConfig: false
      });
    }

    return {
      setDebugEnabled: setDebugEnabled,
      logger: createLogger({
        getDebugEnabled: getDebugEnabled,
        context: {
          instanceName: instanceName
        },
        getMonitors: getMonitors,
        console: console
      }),
      createComponentLogger: function createComponentLogger(componentName) {
        return createLogger({
          getDebugEnabled: getDebugEnabled,
          context: {
            instanceName: instanceName,
            componentName: componentName
          },
          getMonitors: getMonitors,
          console: console
        });
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // TO-DOCUMENT: Lifecycle hooks and their params.
  var hookNames = [// Called after all components have been registered.
  "onComponentsRegistered", // Called before an event is sent on a data collection request
  "onBeforeEvent", // Called before each request is made to the edge.
  "onBeforeRequest", // Called after each response is returned from the edge with a successful
  // status code
  "onResponse", // Called after a network request to the edge fails. Either the request
  // didn't make it to the edge, didn't make it to Konductor, or Konductor
  // failed to return a regularly-structured response. (In this case { error }
  // is passed as the parameter)
  // Also called when the respone returns a 400 or 500 error. (In this case
  // { response } is passed as the parameter)
  "onRequestFailure", // A user clicked on an element.
  "onClick"];

  var createHook = function createHook(componentRegistry, hookName) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Promise.all(componentRegistry.getLifecycleCallbacks(hookName).map(function (callback) {
        return new Promise(function (resolve) {
          resolve(callback.apply(void 0, args));
        });
      }));
    };
  };
  /**
   * This ensures that if a component's lifecycle method X
   * attempts to execute lifecycle method Y, that all X methods on all components
   * will have been called before any of their Y methods are called. It does
   * this by kicking the call to the Y method to the next JavaScript tick.
   * @returns {function}
   */


  var guardHook = function guardHook(fn) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return Promise.resolve().then(function () {
        return fn.apply(void 0, args);
      });
    };
  };

  var createLifecycle = (function (componentRegistry) {
    return hookNames.reduce(function (memo, hookName) {
      memo[hookName] = guardHook(createHook(componentRegistry, hookName));
      return memo;
    }, {});
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var wrapForErrorHandling = function wrapForErrorHandling(fn, stackMessage) {
    return function () {
      var result;

      try {
        result = fn.apply(void 0, arguments);
      } catch (error) {
        throw stackError({
          error: error,
          message: stackMessage
        });
      }

      if (result instanceof Promise) {
        result = result.catch(function (error) {
          throw stackError({
            error: error,
            message: stackMessage
          });
        });
      }

      return result;
    };
  }; // TO-DOCUMENT: All public commands and their signatures.


  var createComponentRegistry = (function () {
    var commandsByName = {};
    var lifecycleCallbacksByName = {};

    var registerComponentCommands = function registerComponentCommands(namespace) {
      var componentCommandsByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var conflictingCommandNames = intersection(Object.keys(commandsByName), Object.keys(componentCommandsByName));

      if (conflictingCommandNames.length) {
        throw new Error("[ComponentRegistry] Could not register " + namespace + " " + ("because it has existing command(s): " + conflictingCommandNames.join(",")));
      }

      Object.keys(componentCommandsByName).forEach(function (commandName) {
        var command = componentCommandsByName[commandName];
        command.commandName = commandName;
        command.run = wrapForErrorHandling(command.run, "[" + namespace + "] An error occurred while executing the " + commandName + " command.");
        commandsByName[commandName] = command;
      });
    };

    var registerLifecycleCallbacks = function registerLifecycleCallbacks(namespace) {
      var componentLifecycleCallbacksByName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.keys(componentLifecycleCallbacksByName).forEach(function (hookName) {
        lifecycleCallbacksByName[hookName] = lifecycleCallbacksByName[hookName] || [];
        lifecycleCallbacksByName[hookName].push(wrapForErrorHandling(componentLifecycleCallbacksByName[hookName], "[" + namespace + "] An error occurred while executing the " + hookName + " lifecycle hook."));
      });
    };

    return {
      register: function register(namespace, component) {
        var commands = component.commands,
            lifecycle = component.lifecycle;
        registerComponentCommands(namespace, commands);
        registerLifecycleCallbacks(namespace, lifecycle);
      },
      getCommand: function getCommand(commandName) {
        return commandsByName[commandName];
      },
      getCommandNames: function getCommandNames() {
        return Object.keys(commandsByName);
      },
      getLifecycleCallbacks: function getLifecycleCallbacks(hookName) {
        return lifecycleCallbacksByName[hookName] || [];
      }
    };
  });

  var injectSendNetworkRequest = (function (_ref) {
    var logger = _ref.logger,
        sendFetchRequest = _ref.sendFetchRequest,
        sendBeaconRequest = _ref.sendBeaconRequest,
        isRequestRetryable = _ref.isRequestRetryable,
        getRequestRetryDelay = _ref.getRequestRetryDelay;

    /**
     * Send a network request and returns details about the response.
     */
    return function (_ref2) {
      var requestId = _ref2.requestId,
          url = _ref2.url,
          payload = _ref2.payload,
          useSendBeacon = _ref2.useSendBeacon;
      // We want to log raw payload and event data rather than
      // our fancy wrapper objects. Calling payload.toJSON() is
      // insufficient to get all the nested raw data, because it's
      // not recursive (it doesn't call toJSON() on the event objects).
      // Parsing the result of JSON.stringify(), however, gives the
      // fully recursive raw data.
      var stringifiedPayload = JSON.stringify(payload);
      var parsedPayload = JSON.parse(stringifiedPayload);
      logger.logOnBeforeNetworkRequest({
        url: url,
        requestId: requestId,
        payload: parsedPayload
      });

      var executeRequest = function executeRequest() {
        var retriesAttempted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var requestMethod = useSendBeacon ? sendBeaconRequest : sendFetchRequest;
        return requestMethod(url, stringifiedPayload).then(function (response) {
          var requestIsRetryable = isRequestRetryable({
            response: response,
            retriesAttempted: retriesAttempted
          });

          if (requestIsRetryable) {
            var requestRetryDelay = getRequestRetryDelay({
              response: response,
              retriesAttempted: retriesAttempted
            });
            return new Promise(function (resolve) {
              setTimeout(function () {
                resolve(executeRequest(retriesAttempted + 1));
              }, requestRetryDelay);
            });
          }

          var parsedBody;

          try {
            parsedBody = JSON.parse(response.body);
          } catch (e) {// Non-JSON. Something went wrong.
          }

          logger.logOnNetworkResponse(_objectSpread2(_objectSpread2({
            requestId: requestId,
            url: url,
            payload: parsedPayload
          }, response), {}, {
            parsedBody: parsedBody,
            retriesAttempted: retriesAttempted
          }));
          return {
            statusCode: response.statusCode,
            body: response.body,
            parsedBody: parsedBody,
            getHeader: response.getHeader
          };
        });
      };

      return executeRequest().catch(function (error) {
        logger.logOnNetworkError({
          requestId: requestId,
          url: url,
          payload: parsedPayload,
          error: error
        });
        throw stackError({
          error: error,
          message: "Network request failed."
        });
      });
    };
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectExtractEdgeInfo = (function (_ref) {
    var logger = _ref.logger;
    return function (adobeEdgeHeader) {
      if (adobeEdgeHeader) {
        var headerParts = adobeEdgeHeader.split(";");

        if (headerParts.length >= 2 && headerParts[1].length > 0) {
          try {
            var regionId = parseInt(headerParts[1], 10); // eslint recommends using Number.isNaN instead, but this function is
            // not available in Internet Explorer. Number.isNaN is more robust to
            // non-numeric parameters. Since we already know regionId will be an
            // integer, using isNaN is okay.
            // https://github.com/airbnb/javascript#standard-library--isnan
            // eslint-disable-next-line no-restricted-globals

            if (!isNaN(regionId)) {
              return {
                regionId: regionId
              };
            }
          } catch (e) {// No need to do anything. The log statement below will log an error
          }
        }

        logger.warn("Invalid adobe edge: \"" + adobeEdgeHeader + "\"");
      }

      return {};
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var IN = "in";
  var OUT = "out";
  var PENDING = "pending";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var GENERAL = "general";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var DECLINED_CONSENT_ERROR_CODE = "declinedConsent";
  var CONSENT_SOURCE_DEFAULT = "default";
  var CONSENT_SOURCE_INITIAL = "initial";
  var CONSENT_SOURCE_NEW = "new";

  var createDeclinedConsentError = function createDeclinedConsentError(errorMessage) {
    var error = new Error(errorMessage);
    error.code = DECLINED_CONSENT_ERROR_CODE;
    error.message = errorMessage;
    return error;
  };

  var createConsentStateMachine = (function (_ref) {
    var logger = _ref.logger;
    var deferreds = [];

    var runAll = function runAll() {
      while (deferreds.length) {
        deferreds.shift().resolve();
      }
    };

    var discardAll = function discardAll() {
      while (deferreds.length) {
        deferreds.shift().reject(createDeclinedConsentError("The user declined consent."));
      }
    };

    var awaitInitial = function awaitInitial() {
      return Promise.reject(new Error("Consent has not been initialized."));
    };

    var awaitInDefault = function awaitInDefault() {
      return Promise.resolve();
    };

    var awaitIn = function awaitIn() {
      return Promise.resolve();
    };

    var awaitOutDefault = function awaitOutDefault() {
      return Promise.reject(createDeclinedConsentError("No consent preferences have been set."));
    };

    var awaitOut = function awaitOut() {
      return Promise.reject(createDeclinedConsentError("The user declined consent."));
    };

    var awaitPending = function awaitPending() {
      var deferred = defer();
      deferreds.push(deferred);
      return deferred.promise;
    };

    return {
      in: function _in(source) {
        if (source === CONSENT_SOURCE_DEFAULT) {
          this.awaitConsent = awaitInDefault;
        } else {
          if (source === CONSENT_SOURCE_INITIAL) {
            logger.info("Loaded user consent preferences. The user previously consented.");
          } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitIn) {
            logger.info("User consented.");
          }

          runAll();
          this.awaitConsent = awaitIn;
        }
      },
      out: function out(source) {
        if (source === CONSENT_SOURCE_DEFAULT) {
          logger.warn("User consent preferences not found. Default consent of out will be used.");
          this.awaitConsent = awaitOutDefault;
        } else {
          if (source === CONSENT_SOURCE_INITIAL) {
            logger.warn("Loaded user consent preferences. The user previously declined consent.");
          } else if (source === CONSENT_SOURCE_NEW && this.awaitConsent !== awaitOut) {
            logger.warn("User declined consent.");
          }

          discardAll();
          this.awaitConsent = awaitOut;
        }
      },
      pending: function pending(source) {
        if (source === CONSENT_SOURCE_DEFAULT) {
          logger.info("User consent preferences not found. Default consent of pending will be used. Some commands may be delayed.");
        }

        this.awaitConsent = awaitPending;
      },
      awaitConsent: awaitInitial
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createConsent = (function (_ref) {
    var generalConsentState = _ref.generalConsentState,
        logger = _ref.logger;

    var _setConsent = function setConsent(consentByPurpose, source) {
      switch (consentByPurpose[GENERAL]) {
        case IN:
          generalConsentState.in(source);
          break;

        case OUT:
          generalConsentState.out(source);
          break;

        case PENDING:
          generalConsentState.pending(source);
          break;

        default:
          logger.warn("Unknown consent value: " + consentByPurpose[GENERAL]);
          break;
      }
    };

    return {
      initializeConsent: function initializeConsent(defaultConsentByPurpose, storedConsentByPurpose) {
        if (storedConsentByPurpose[GENERAL]) {
          _setConsent(storedConsentByPurpose, CONSENT_SOURCE_INITIAL);
        } else {
          _setConsent(defaultConsentByPurpose, CONSENT_SOURCE_DEFAULT);
        }
      },
      setConsent: function setConsent(consentByPurpose) {
        _setConsent(consentByPurpose, CONSENT_SOURCE_NEW);
      },
      suspend: function suspend() {
        generalConsentState.pending();
      },
      awaitConsent: function awaitConsent() {
        return generalConsentState.awaitConsent();
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createEvent = (function () {
    var content = {};
    var userXdm;
    var userData;
    var _documentMayUnload = false;
    var isFinalized = false;
    var shouldSendEvent = true;

    var throwIfEventFinalized = function throwIfEventFinalized(methodName) {
      if (isFinalized) {
        throw new Error(methodName + " cannot be called after event is finalized.");
      }
    };

    var event = {
      setUserXdm: function setUserXdm(value) {
        throwIfEventFinalized("setUserXdm");
        userXdm = value;
      },
      setUserData: function setUserData(value) {
        throwIfEventFinalized("setUserData");
        userData = value;
      },
      mergeXdm: function mergeXdm(xdm) {
        throwIfEventFinalized("mergeXdm");

        if (xdm) {
          deepAssign(content, {
            xdm: xdm
          });
        }
      },
      mergeMeta: function mergeMeta(meta) {
        throwIfEventFinalized("mergeMeta");

        if (meta) {
          deepAssign(content, {
            meta: meta
          });
        }
      },
      mergeQuery: function mergeQuery(query) {
        throwIfEventFinalized("mergeQuery");

        if (query) {
          deepAssign(content, {
            query: query
          });
        }
      },
      documentMayUnload: function documentMayUnload() {
        _documentMayUnload = true;
      },
      finalize: function finalize(onBeforeEventSend) {
        if (isFinalized) {
          return;
        }

        if (userXdm) {
          event.mergeXdm(userXdm);
        }

        if (userData) {
          content.data = userData;
        } // the event should already be considered finalized in case onBeforeEventSend throws an error


        isFinalized = true;

        if (onBeforeEventSend) {
          // assume that the onBeforeEventSend callback will fail (in-case of an error)
          shouldSendEvent = false; // this allows the user to replace the xdm and data properties
          // on the object passed to the callback

          var tempContent = {
            xdm: content.xdm || {},
            data: content.data || {}
          };
          var result = onBeforeEventSend(tempContent);
          shouldSendEvent = result !== false;
          content.xdm = tempContent.xdm || {};
          content.data = tempContent.data || {};

          if (isEmptyObject(content.xdm)) {
            delete content.xdm;
          }

          if (isEmptyObject(content.data)) {
            delete content.data;
          }
        }
      },
      getDocumentMayUnload: function getDocumentMayUnload() {
        return _documentMayUnload;
      },
      isEmpty: function isEmpty() {
        return isEmptyObject(content) && (!userXdm || isEmptyObject(userXdm)) && (!userData || isEmptyObject(userData));
      },
      shouldSend: function shouldSend() {
        return shouldSendEvent;
      },
      getViewName: function getViewName() {
        if (!userXdm || !userXdm.web || !userXdm.web.webPageDetails) {
          return undefined;
        }

        return userXdm.web.webPageDetails.viewName;
      },
      toJSON: function toJSON() {
        if (!isFinalized) {
          throw new Error("toJSON called before finalize");
        }

        return content;
      }
    };
    return event;
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var RETRY_AFTER = "Retry-After";
  var ADOBE_EDGE = "x-adobe-edge";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Creates a representation of a gateway response with the addition of
   * helper methods.
   * @returns Response
   */

  var injectCreateResponse = (function (_ref) {
    var extractEdgeInfo = _ref.extractEdgeInfo;
    return function (_ref2) {
      var _ref2$content = _ref2.content,
          content = _ref2$content === void 0 ? {} : _ref2$content,
          getHeader = _ref2.getHeader;
      var _content$handle = content.handle,
          handle = _content$handle === void 0 ? [] : _content$handle,
          _content$errors = content.errors,
          errors = _content$errors === void 0 ? [] : _content$errors,
          _content$warnings = content.warnings,
          warnings = _content$warnings === void 0 ? [] : _content$warnings;
      /**
       * Response object.
       * @typedef {Object} Response
       */

      return {
        /**
         * Returns matching fragments of the response by type.
         * @param {String} type A string with the current format: <namespace:action>
         *
         * @example
         * getPayloadsByType("identity:persist")
         */
        getPayloadsByType: function getPayloadsByType(type) {
          return flatMap(handle.filter(function (fragment) {
            return fragment.type === type;
          }), function (fragment) {
            return fragment.payload;
          });
        },

        /**
         * Returns all errors.
         */
        getErrors: function getErrors() {
          return errors;
        },

        /**
         * Returns all warnings.
         */
        getWarnings: function getWarnings() {
          return warnings;
        },

        /**
         * Returns an object containing the regionId from the x-adobe-edge header
         */
        getEdge: function getEdge() {
          return extractEdgeInfo(getHeader(ADOBE_EDGE));
        },
        toJSON: function toJSON() {
          return content;
        }
      };
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var coreCommands = {
    CONFIGURE: "configure",
    SET_DEBUG: "setDebug"
  };
  var injectExecuteCommand = (function (_ref) {
    var logger = _ref.logger,
        configureCommand = _ref.configureCommand,
        setDebugCommand = _ref.setDebugCommand,
        handleError = _ref.handleError,
        validateCommandOptions = _ref.validateCommandOptions;
    var configurePromise;

    var getExecutor = function getExecutor(commandName, options) {
      var executor;

      if (commandName === coreCommands.CONFIGURE) {
        if (configurePromise) {
          throw new Error("The library has already been configured and may only be configured once.");
        }

        executor = function executor() {
          configurePromise = configureCommand(options);
          return configurePromise.then(function () {// Don't expose internals to the user.
          });
        };
      } else {
        if (!configurePromise) {
          throw new Error("The library must be configured first. Please do so by executing the configure command.");
        }

        if (commandName === coreCommands.SET_DEBUG) {
          executor = function executor() {
            return setDebugCommand(options);
          };
        } else {
          executor = function executor() {
            return configurePromise.then(function (componentRegistry) {
              var command = componentRegistry.getCommand(commandName);

              if (!command || !isFunction(command.run)) {
                var commandNames = values(coreCommands).concat(componentRegistry.getCommandNames()).join(", ");
                throw new Error("The " + commandName + " command does not exist. List of available commands: " + commandNames + ".");
              }

              var validatedOptions = validateCommandOptions({
                command: command,
                options: options
              });
              return command.run(validatedOptions);
            }, function () {
              logger.warn("An error during configuration is preventing the " + commandName + " command from executing."); // If configuration failed, we prevent the configuration
              // error from bubbling here because we don't want the
              // configuration error to be reported in the console every
              // time any command is executed. Only having it bubble
              // once when the configure command runs is sufficient.
              // Instead, for this command, we'll just return a promise
              // that never gets resolved.

              return new Promise(function () {});
            });
          };
        }
      }

      return executor;
    };

    return function (commandName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve) {
        // We have to wrap the getExecutor() call in the promise so the promise
        // will be rejected if getExecutor() throws errors.
        var executor = getExecutor(commandName, options);
        logger.logOnBeforeCommand({
          commandName: commandName,
          options: options
        });
        resolve(executor());
      }).catch(function (error) {
        return handleError(error, commandName + " command");
      }).catch(function (error) {
        logger.logOnCommandRejected({
          commandName: commandName,
          options: options,
          error: error
        });
        throw error;
      }).then(function (rawResult) {
        // We should always be returning an object from every command.
        var result = isObject(rawResult) ? rawResult : {};
        logger.logOnCommandResolved({
          commandName: commandName,
          options: options,
          result: result
        });
        return result;
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var COMMAND_DOC_URI = "https://adobe.ly/2UH0qO7";
  var validateCommandOptions = (function (_ref) {
    var command = _ref.command,
        options = _ref.options;
    var commandName = command.commandName,
        _command$documentatio = command.documentationUri,
        documentationUri = _command$documentatio === void 0 ? COMMAND_DOC_URI : _command$documentatio,
        optionsValidator = command.optionsValidator;
    var validatedOptions = options;

    if (optionsValidator) {
      try {
        validatedOptions = optionsValidator(options);
      } catch (validationError) {
        var invalidOptionsMessage = "Invalid " + commandName + " command options:\n\t - " + validationError + " For command documentation see: " + documentationUri;
        throw new Error(invalidOptionsMessage);
      }
    }

    return validatedOptions;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Verifies user provided event options.
   * @param {*} options The user event options to validate
   * @param {*} logger
   * @returns {*} Validated options
   */

  var validateUserEventOptions = (function (_ref) {
    var options = _ref.options,
        logger = _ref.logger;
    var eventOptionsValidator = boundObjectOf({
      type: boundString(),
      xdm: boundObjectOf({
        eventType: boundString(),
        identityMap: validateIdentityMap
      }),
      data: boundObjectOf({}),
      renderDecisions: boundBoolean(),
      decisionScopes: boundArrayOf(boundString()),
      datasetId: boundString()
    }).required();
    var validatedOptions = eventOptionsValidator(options);
    var type = validatedOptions.type,
        xdm = validatedOptions.xdm;

    if (xdm && !xdm.eventType && !type) {
      logger.warn("No type or xdm.eventType specified.");
    }

    return validatedOptions;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createDataCollector = function createDataCollector(_ref) {
    var eventManager = _ref.eventManager,
        logger = _ref.logger;
    return {
      commands: {
        sendEvent: {
          documentationUri: "https://adobe.ly/2r0uUjh",
          optionsValidator: function optionsValidator(options) {
            return validateUserEventOptions({
              options: options,
              logger: logger
            });
          },
          run: function run(options) {
            var xdm = options.xdm,
                data = options.data,
                _options$documentUnlo = options.documentUnloading,
                documentUnloading = _options$documentUnlo === void 0 ? false : _options$documentUnlo,
                type = options.type,
                mergeId = options.mergeId,
                _options$renderDecisi = options.renderDecisions,
                renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
                _options$decisionScop = options.decisionScopes,
                decisionScopes = _options$decisionScop === void 0 ? [] : _options$decisionScop,
                datasetId = options.datasetId;
            var event = eventManager.createEvent();

            if (documentUnloading) {
              event.documentMayUnload();
            }

            event.setUserXdm(xdm);
            event.setUserData(data);

            if (type) {
              event.mergeXdm({
                eventType: type
              });
            }

            if (mergeId) {
              event.mergeXdm({
                eventMergeId: mergeId
              });
            }

            if (datasetId) {
              event.mergeMeta({
                collect: {
                  datasetId: datasetId
                }
              });
            }

            return eventManager.sendEvent(event, {
              renderDecisions: renderDecisions,
              decisionScopes: decisionScopes
            });
          }
        }
      }
    };
  };

  createDataCollector.namespace = "DataCollector";
  createDataCollector.configValidators = {};

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createClickHandler = function createClickHandler(_ref) {
    var eventManager = _ref.eventManager,
        lifecycle = _ref.lifecycle,
        handleError = _ref.handleError;
    return function (clickEvent) {
      // TODO: Consider safeguarding from the same object being clicked multiple times in rapid succession?
      var clickedElement = clickEvent.target;
      var event = eventManager.createEvent();
      return lifecycle.onClick({
        event: event,
        clickedElement: clickedElement
      }).then(function () {
        if (event.isEmpty()) {
          return Promise.resolve();
        }

        return eventManager.sendEvent(event);
      }) // eventManager.sendEvent() will return a promise resolved to an
      // object and we want to avoid returning any value to the customer
      .then(noop$1).catch(function (error) {
        handleError(error, "click collection");
      });
    };
  };

  var attachClickActivityCollector = (function (_ref2) {
    var config = _ref2.config,
        eventManager = _ref2.eventManager,
        lifecycle = _ref2.lifecycle,
        handleError = _ref2.handleError;
    var enabled = config.clickCollectionEnabled;

    if (!enabled) {
      return;
    }

    var clickHandler = createClickHandler({
      eventManager: eventManager,
      lifecycle: lifecycle,
      handleError: handleError
    });
    document.addEventListener("click", clickHandler, true);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var configValidators$1 = {
    clickCollectionEnabled: boundBoolean().default(true),
    downloadLinkQualifier: boundString().regexp().default("\\.(exe|zip|wav|mp3|mov|mpg|avi|wmv|pdf|doc|docx|xls|xlsx|ppt|pptx)$")
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var urlStartsWithScheme = function urlStartsWithScheme(url) {
    return url && /^[a-z0-9]+:\/\//i.test(url);
  };

  var getAbsoluteUrlFromAnchorElement = function getAbsoluteUrlFromAnchorElement(window, element) {
    var loc = window.location;
    var url = element.href ? element.href : "";
    var protocol = element.protocol,
        host = element.host;

    if (!urlStartsWithScheme(url)) {
      if (!protocol) {
        protocol = loc.protocol ? loc.protocol : "";
      }

      protocol = protocol ? protocol + "//" : "";

      if (!host) {
        host = loc.host ? loc.host : "";
      }

      var path = "";

      if (url.substring(0, 1) !== "/") {
        var indx = loc.pathname.lastIndexOf("/");
        indx = indx < 0 ? 0 : indx;
        path = loc.pathname.substring(0, indx);
      }

      url = "" + protocol + host + path + "/" + url;
    }

    return url;
  };

  var isSupportedAnchorElement = function isSupportedAnchorElement(element) {
    if (element.href && (element.tagName === "A" || element.tagName === "AREA") && (!element.onclick || !element.protocol || element.protocol.toLowerCase().indexOf("javascript") < 0)) {
      return true;
    }

    return false;
  };

  var isDownloadLink = function isDownloadLink(downloadLinkQualifier, linkUrl, clickedObj) {
    var re = new RegExp(downloadLinkQualifier);
    return clickedObj.download ? true : re.test(linkUrl.toLowerCase());
  };

  var isExitLink = function isExitLink(window, linkUrl) {
    var currentHostname = window.location.hostname.toLowerCase();

    if (linkUrl.toLowerCase().indexOf(currentHostname) >= 0) {
      return false;
    }

    return true;
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var determineLinkType = function determineLinkType(window, config, linkUrl, clickedObj) {
    var linkType = "other";

    if (isDownloadLink(config.downloadLinkQualifier, linkUrl, clickedObj)) {
      linkType = "download";
    } else if (isExitLink(window, linkUrl)) {
      linkType = "exit";
    }

    return linkType;
  };

  var findSupportedAnchorElement = function findSupportedAnchorElement(targetElement) {
    var node = targetElement;

    while (node) {
      if (isSupportedAnchorElement(node)) {
        return node;
      }

      node = node.parentNode;
    }

    return null;
  };

  var createLinkClick = (function (window, config) {
    return function (event, targetElement) {
      // Search parent elements for an anchor element
      // TODO: Replace with generic DOM tool that can fetch configured properties
      var anchorElement = findSupportedAnchorElement(targetElement);

      if (!anchorElement) {
        return;
      }

      var linkUrl = getAbsoluteUrlFromAnchorElement(window, anchorElement);

      if (!linkUrl) {
        return;
      }

      var linkType = determineLinkType(window, config, linkUrl, anchorElement); // TODO: Update link name from the clicked element context

      var linkName = "Link Click";
      event.documentMayUnload();
      event.mergeXdm({
        eventType: "web.webinteraction.linkClicks",
        web: {
          webInteraction: {
            name: linkName,
            type: linkType,
            URL: linkUrl,
            linkClicks: {
              value: 1
            }
          }
        }
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createActivityCollector = function createActivityCollector(_ref) {
    var config = _ref.config,
        eventManager = _ref.eventManager,
        handleError = _ref.handleError;
    var linkClick = createLinkClick(window, config);
    return {
      lifecycle: {
        onComponentsRegistered: function onComponentsRegistered(tools) {
          var lifecycle = tools.lifecycle;
          attachClickActivityCollector({
            config: config,
            eventManager: eventManager,
            lifecycle: lifecycle,
            handleError: handleError
          }); // TODO: createScrollActivityCollector ...
        },
        onClick: function onClick(_ref2) {
          var event = _ref2.event,
              clickedElement = _ref2.clickedElement;
          linkClick(event, clickedElement);
        }
      }
    };
  };

  createActivityCollector.namespace = "ActivityCollector";
  createActivityCollector.configValidators = configValidators$1;

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createResultLogMessage$1 = function createResultLogMessage(idSync, success) {
    return "ID sync " + (success ? "succeeded" : "failed") + ": " + idSync.spec.url;
  };

  var injectProcessIdSyncs = (function (_ref) {
    var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
        logger = _ref.logger;
    return function (idSyncs) {
      var urlIdSyncs = idSyncs.filter(function (idSync) {
        return idSync.type === "url";
      });

      if (!urlIdSyncs.length) {
        return Promise.resolve();
      }

      return Promise.all(urlIdSyncs.map(function (idSync) {
        return fireReferrerHideableImage(idSync.spec).then(function () {
          logger.info(createResultLogMessage$1(idSync, true));
        }).catch(function () {
          // We intentionally do not throw an error if id syncs fail. We
          // consider it a non-critical failure and therefore do not want it to
          // reject the promise handed back to the customer.
          logger.error(createResultLogMessage$1(idSync, false));
        });
      })).then(noop$1);
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var configValidators = {
    thirdPartyCookiesEnabled: boundBoolean().default(true),
    idMigrationEnabled: boundBoolean().default(true)
  };

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Verifies user provided event options.
   * @param {*} options The user event options to validate
   * @returns {*} Validated options
   */

  var getIdentityOptionsValidator = (function (options) {
    var getIdentityOptionsValidator = boundObjectOf({
      namespaces: boundArrayOf(boundLiteral("ECID")).nonEmpty()
    }).noUnknownFields();
    getIdentityOptionsValidator(options); // Return default options for now
    // To-Do: Accept namespace from given options

    return {
      namespaces: ["ECID"]
    };
  });

  var createComponent$4 = (function (_ref) {
    var addEcidQueryToPayload = _ref.addEcidQueryToPayload,
        ensureSingleIdentity = _ref.ensureSingleIdentity,
        setLegacyEcid = _ref.setLegacyEcid,
        handleResponseForIdSyncs = _ref.handleResponseForIdSyncs,
        getEcidFromResponse = _ref.getEcidFromResponse,
        getIdentity = _ref.getIdentity,
        consent = _ref.consent;
    var ecid;
    var edge = {};
    return {
      lifecycle: {
        onBeforeRequest: function onBeforeRequest(_ref2) {
          var request = _ref2.request,
              onResponse = _ref2.onResponse,
              onRequestFailure = _ref2.onRequestFailure;
          // Querying the ECID on every request to be able to set the legacy cookie, and make it
          // available for the `getIdentity` command.
          addEcidQueryToPayload(request.getPayload());
          return ensureSingleIdentity({
            request: request,
            onResponse: onResponse,
            onRequestFailure: onRequestFailure
          });
        },
        onResponse: function onResponse(_ref3) {
          var response = _ref3.response;

          if (!ecid) {
            ecid = getEcidFromResponse(response); // Only data collection calls will have an ECID in the response.
            // https://jira.corp.adobe.com/browse/EXEG-1234

            if (ecid) {
              setLegacyEcid(ecid);
            }
          } // For sendBeacon requests, getEdge() will return {}, so we are using assign here
          // so that sendBeacon requests don't override the edge info from before.


          edge = reactorObjectAssign(edge, response.getEdge());
          return handleResponseForIdSyncs(response);
        }
      },
      commands: {
        getIdentity: {
          optionsValidator: getIdentityOptionsValidator,
          run: function run(options) {
            return consent.awaitConsent().then(function () {
              return ecid ? undefined : getIdentity(options.namespaces);
            }).then(function () {
              return {
                identity: {
                  ECID: ecid
                },
                edge: edge
              };
            });
          }
        }
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // Maybe default the domain in the cookieJar to apex while allowing overrides.

  var apexDomain$1 = getApexDomain(window, reactorCookie);
  /**
   * Handles migration of ECID to and from Visitor.js.
   */

  var createLegacyIdentity = (function (_ref) {
    var config = _ref.config,
        getEcidFromVisitor = _ref.getEcidFromVisitor;
    var idMigrationEnabled = config.idMigrationEnabled,
        orgId = config.orgId;
    var amcvCookieName = "AMCV_" + orgId;

    var getEcidFromLegacyCookies = function getEcidFromLegacyCookies() {
      var ecid = null;
      var secidCookieName = "s_ecid";
      var legacyEcidCookieValue = reactorCookie.get(secidCookieName) || reactorCookie.get(amcvCookieName);

      if (legacyEcidCookieValue) {
        var reg = /(^|\|)MCMID\|(\d+)($|\|)/;
        var matches = legacyEcidCookieValue.match(reg);

        if (matches) {
          // Destructuring arrays breaks in IE
          ecid = matches[2];
        }
      }

      return ecid;
    };

    return {
      getEcid: function getEcid() {
        if (idMigrationEnabled) {
          var ecid = getEcidFromLegacyCookies();

          if (ecid) {
            return Promise.resolve(ecid);
          }

          return getEcidFromVisitor();
        }

        return Promise.resolve();
      },
      setEcid: function setEcid(ecid) {
        if (idMigrationEnabled && !reactorCookie.get(amcvCookieName)) {
          reactorCookie.set(amcvCookieName, "MCMID|" + ecid, {
            domain: apexDomain$1,
            // Without `expires` this will be a session cookie.
            expires: 390 // days, or 13 months.

          });
        }
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var awaitVisitorOptIn = (function (_ref) {
    var logger = _ref.logger;
    return new Promise(function (resolve, reject) {
      if (isObject(window.adobe) && isObject(window.adobe.optIn)) {
        var optInOld = window.adobe.optIn;
        logger.info("Delaying request while waiting for legacy opt-in to let Visitor retrieve ECID from server.");
        optInOld.fetchPermissions(function () {
          if (optInOld.isApproved([optInOld.Categories.ECID])) {
            logger.info("Received legacy opt-in approval to let Visitor retrieve ECID from server.");
            resolve();
          } else {
            reject(new Error("Legacy opt-in was declined."));
          }
        }, true);
      } else {
        resolve();
      }
    });
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getVisitor = (function (window) {
    var Visitor = window.Visitor;
    return isFunction(Visitor) && isFunction(Visitor.getInstance) && Visitor;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectGetEcidFromVisitor = (function (_ref) {
    var logger = _ref.logger,
        orgId = _ref.orgId,
        awaitVisitorOptIn = _ref.awaitVisitorOptIn;
    var Visitor = getVisitor(window);
    return function () {
      if (Visitor) {
        // Need to explicitly wait for optIn because visitor will call callback
        // with invalid values prior to optIn being approved
        return awaitVisitorOptIn({
          logger: logger
        }).then(function () {
          logger.info("Delaying request while using Visitor to retrieve ECID from server.");
          return new Promise(function (resolve) {
            var visitor = Visitor.getInstance(orgId, {});
            visitor.getMarketingCloudVisitorID(function (ecid) {
              logger.info("Resuming previously delayed request that was waiting for ECID from Visitor.");
              resolve(ecid);
            }, true);
          });
        }).catch(function (error) {
          // If consent was denied, get the ECID from experience edge. OptIn and AEP Web SDK
          // consent should operate independently, but during id migration AEP Web SDK needs
          // to wait for optIn object consent resolution so that only one ECID is generated.
          if (error) {
            logger.info(error.message + ", retrieving ECID from experience edge");
          } else {
            logger.info("An error occurred while obtaining the ECID from Visitor.");
          }
        });
      }

      return Promise.resolve();
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectHandleResponseForIdSyncs = (function (_ref) {
    var processIdSyncs = _ref.processIdSyncs;
    return function (response) {
      return processIdSyncs(response.getPayloadsByType("identity:exchange"));
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // TO-DOCUMENT: We queue subsequent requests until we have an identity cookie.
  var injectEnsureSingleIdentity = (function (_ref) {
    var doesIdentityCookieExist = _ref.doesIdentityCookieExist,
        setDomainForInitialIdentityPayload = _ref.setDomainForInitialIdentityPayload,
        addLegacyEcidToPayload = _ref.addLegacyEcidToPayload,
        awaitIdentityCookie = _ref.awaitIdentityCookie,
        logger = _ref.logger;
    var obtainedIdentityPromise;

    var allowRequestToGoWithoutIdentity = function allowRequestToGoWithoutIdentity(request) {
      setDomainForInitialIdentityPayload(request);
      return addLegacyEcidToPayload(request.getPayload());
    };
    /**
     * Ensures that if no identity cookie exists, we only let one request at a
     * time without an identity until its response returns. In the meantime,
     * we queue all other requests, otherwise the requests could result in
     * multiple ECIDs being minted for the user. Once we get an identity
     * cookie, we can let the queued requests be sent all at once, since they
     * will have the newly minted ECID.
     *
     * Konductor should make every effort to return an identity, but in
     * certain scenarios it may not. For example, in cases where the
     * request does not match what Konductor is expecting (ie 400s).
     * In cases where Konductor does not set an identity, there should be
     * no events recorded so we don't need to worry about multiple ECIDs
     * being minted for each user.
     *
     * The reason we allow for multiple sequential requests to be sent without
     * an identity is to prevent a single malformed request causing all other
     * requests to never send.
     */


    return function (_ref2) {
      var request = _ref2.request,
          onResponse = _ref2.onResponse,
          onRequestFailure = _ref2.onRequestFailure;

      if (doesIdentityCookieExist()) {
        request.setIsIdentityEstablished();
        return Promise.resolve();
      }

      if (obtainedIdentityPromise) {
        // We don't have an identity cookie, but at least one request has
        // been sent to get it. Konductor may set the identity cookie in the
        // response. We will hold up this request until the last request
        // requiring identity returns and awaitIdentityCookie confirms the
        // identity was set.
        logger.info("Delaying request while retrieving ECID from server.");
        var previousObtainedIdentityPromise = obtainedIdentityPromise; // This promise resolves when we have an identity cookie. Additional
        // requests are chained together so that only one is sent at a time
        // until we have the identity cookie.

        obtainedIdentityPromise = previousObtainedIdentityPromise.catch(function () {
          return awaitIdentityCookie({
            onResponse: onResponse,
            onRequestFailure: onRequestFailure
          });
        }); // When this returned promise resolves, the request will go out.

        return previousObtainedIdentityPromise.then(function () {
          logger.info("Resuming previously delayed request.");
          request.setIsIdentityEstablished();
        }) // If Konductor did not set the identity cookie on the previous
        // request, then awaitIdentityCookie will reject its promise.
        // Catch the rejection here and allow this request to go out.
        .catch(function () {
          return allowRequestToGoWithoutIdentity(request);
        });
      } // For Alloy+Konductor communication to be as robust as possible and
      // to ensure we don't mint new ECIDs for requests that would otherwise
      // be sent in parallel, we'll let this request go out to fetch the
      // cookie


      obtainedIdentityPromise = awaitIdentityCookie({
        onResponse: onResponse,
        onRequestFailure: onRequestFailure
      });
      return allowRequestToGoWithoutIdentity(request);
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var ecidNamespace = "ECID";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var addEcidQueryToPayload = (function (payload) {
    payload.mergeQuery({
      identity: {
        fetch: [ecidNamespace]
      }
    });
  });

  var matchUserAgent = function matchUserAgent(regexs) {
    return function (userAgent) {
      var keys = Object.keys(regexs);

      for (var i = 0; i < keys.length; i += 1) {
        var key = keys[i];
        var regex = regexs[key];

        if (regex.test(userAgent)) {
          return key;
        }
      }

      return UNKNOWN;
    };
  };

  var getBrowser = memoize(function (window) {
    var _matchUserAgent;

    return matchUserAgent((_matchUserAgent = {}, _defineProperty(_matchUserAgent, EDGE$1, /Edge\/([0-9\._]+)/), _defineProperty(_matchUserAgent, EDGE_CHROMIUM, /Edg\/([0-9\.]+)/), _defineProperty(_matchUserAgent, CHROME, /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/), _defineProperty(_matchUserAgent, FIREFOX, /Firefox\/([0-9\.]+)(?:\s|$)/), _defineProperty(_matchUserAgent, IE, /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/), _defineProperty(_matchUserAgent, SAFARI, /Version\/([0-9\._]+).*Safari/), _matchUserAgent))(window.navigator.userAgent);
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectSetDomainForInitialIdentityPayload = (function (_ref) {
    var thirdPartyCookiesEnabled = _ref.thirdPartyCookiesEnabled,
        areThirdPartyCookiesSupportedByDefault = _ref.areThirdPartyCookiesSupportedByDefault;
    return function (request) {
      if (thirdPartyCookiesEnabled && areThirdPartyCookiesSupportedByDefault(getBrowser(window))) {
        // If third-party cookies are enabled by the customer and
        // supported by the browser, we will send the request to a
        // a third-party identification domain that allows for more accurate
        // identification of the user through use of a third-party cookie.
        // If we have an identity to migrate, we still want to hit the
        // third-party identification domain because the third-party identification
        // domain will use our ECID to set the third-party cookie if the third-party
        // cookie isn't already set, which provides for better cross-domain
        // identification for future requests.
        request.setUseIdThirdPartyDomain();
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectAddLegacyEcidToPayload = (function (_ref) {
    var getLegacyEcid = _ref.getLegacyEcid,
        addEcidToPayload = _ref.addEcidToPayload;
    return function (payload) {
      return getLegacyEcid().then(function (ecidToMigrate) {
        if (ecidToMigrate) {
          addEcidToPayload(payload, ecidToMigrate);
        }
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var addEcidToPayload = (function (payload, ecid) {
    payload.addIdentity(ecidNamespace, {
      id: ecid
    });
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectAwaitIdentityCookie = (function (_ref) {
    var orgId = _ref.orgId,
        doesIdentityCookieExist = _ref.doesIdentityCookieExist;

    /**
     * Returns a promise that will be resolved once an identity cookie exists.
     * If an identity cookie doesn't already exist, it should always exist after
     * the first response.
     */
    return function (_ref2) {
      var onResponse = _ref2.onResponse,
          onRequestFailure = _ref2.onRequestFailure;
      return new Promise(function (resolve, reject) {
        onResponse(function () {
          if (doesIdentityCookieExist()) {
            resolve();
          } else {
            // This logic assumes that the code setting the cookie is working as expected and that
            // the cookie was missing from the response.
            var noIdentityCookieError = new Error("An identity was not set properly. Please verify that the org ID " + orgId + " configured in Alloy matches the org ID specified in the edge configuration."); // Rejecting the promise will reject commands that were queued
            // by the Identity component while waiting on the response to
            // the initial request.

            reject(noIdentityCookieError); // Throwing an error will reject the event command that initiated
            // the request.

            throw noIdentityCookieError;
          }
        });
        onRequestFailure(function () {
          if (doesIdentityCookieExist()) {
            resolve();
          } else {
            // The error from the request failure will be logged separately. Rejecting this here
            // will tell ensureSingleIdentity to send the next request without identity
            reject(new Error("No identity was set on response."));
          }
        });
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getEcidFromResponse = (function (response) {
    var identityResultPayloads = response.getPayloadsByType("identity:result");
    var ecidPayload = find(identityResultPayloads, function (payload) {
      return payload.namespace && payload.namespace.code === ecidNamespace;
    });
    return ecidPayload ? ecidPayload.id : undefined;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createGetIdentity = (function (_ref) {
    var sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
        createIdentityRequestPayload = _ref.createIdentityRequestPayload,
        createIdentityRequest = _ref.createIdentityRequest;
    return function (namespaces) {
      var payload = createIdentityRequestPayload(namespaces);
      var request = createIdentityRequest(payload);
      return sendEdgeNetworkRequest({
        request: request
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createRequest = (function (options) {
    var payload = options.payload,
        _getAction = options.getAction,
        _getUseSendBeacon = options.getUseSendBeacon;
    var id = v4_1();
    var shouldUseThirdPartyDomain = false;
    var isIdentityEstablished = false;
    return {
      getId: function getId() {
        return id;
      },
      getPayload: function getPayload() {
        return payload;
      },
      getAction: function getAction() {
        return _getAction({
          isIdentityEstablished: isIdentityEstablished
        });
      },
      getUseSendBeacon: function getUseSendBeacon() {
        return _getUseSendBeacon({
          isIdentityEstablished: isIdentityEstablished
        });
      },
      getUseIdThirdPartyDomain: function getUseIdThirdPartyDomain() {
        return shouldUseThirdPartyDomain;
      },
      setUseIdThirdPartyDomain: function setUseIdThirdPartyDomain() {
        shouldUseThirdPartyDomain = true;
      },
      setIsIdentityEstablished: function setIsIdentityEstablished() {
        isIdentityEstablished = true;
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createIdentityRequest = (function (identityRequestPayload) {
    return createRequest({
      payload: identityRequestPayload,
      getAction: function getAction() {
        return "identity/acquire";
      },
      getUseSendBeacon: function getUseSendBeacon() {
        return false;
      }
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // request payloads share.

  var createRequestPayload = (function (options) {
    var content = options.content,
        addIdentity = options.addIdentity;
    return {
      mergeState: createMerger(content, "meta.state"),
      mergeQuery: createMerger(content, "query"),
      addIdentity: addIdentity,
      toJSON: function toJSON() {
        return content;
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createAddIdentity = (function (content) {
    return function (namespaceCode, identity) {
      content.xdm = content.xdm || {};
      content.xdm.identityMap = content.xdm.identityMap || {};
      content.xdm.identityMap[namespaceCode] = content.xdm.identityMap[namespaceCode] || [];
      content.xdm.identityMap[namespaceCode].push(identity);
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createIdentityRequestPayload = (function (namespaces) {
    var content = {
      query: {
        identity: {
          fetch: namespaces
        }
      }
    };
    return createRequestPayload({
      content: content,
      addIdentity: createAddIdentity(content)
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createIdentity = function createIdentity(_ref) {
    var config = _ref.config,
        logger = _ref.logger,
        consent = _ref.consent,
        sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
    var orgId = config.orgId,
        thirdPartyCookiesEnabled = config.thirdPartyCookiesEnabled;
    var getEcidFromVisitor = injectGetEcidFromVisitor({
      logger: logger,
      orgId: orgId,
      awaitVisitorOptIn: awaitVisitorOptIn
    });
    var legacyIdentity = createLegacyIdentity({
      config: config,
      getEcidFromVisitor: getEcidFromVisitor
    });
    var doesIdentityCookieExist = injectDoesIdentityCookieExist({
      orgId: orgId
    });
    var getIdentity = createGetIdentity({
      sendEdgeNetworkRequest: sendEdgeNetworkRequest,
      createIdentityRequestPayload: createIdentityRequestPayload,
      createIdentityRequest: createIdentityRequest
    });
    var setDomainForInitialIdentityPayload = injectSetDomainForInitialIdentityPayload({
      thirdPartyCookiesEnabled: thirdPartyCookiesEnabled,
      areThirdPartyCookiesSupportedByDefault: areThirdPartyCookiesSupportedByDefault
    });
    var addLegacyEcidToPayload = injectAddLegacyEcidToPayload({
      getLegacyEcid: legacyIdentity.getEcid,
      addEcidToPayload: addEcidToPayload
    });
    var awaitIdentityCookie = injectAwaitIdentityCookie({
      orgId: orgId,
      doesIdentityCookieExist: doesIdentityCookieExist
    });
    var ensureSingleIdentity = injectEnsureSingleIdentity({
      doesIdentityCookieExist: doesIdentityCookieExist,
      setDomainForInitialIdentityPayload: setDomainForInitialIdentityPayload,
      addLegacyEcidToPayload: addLegacyEcidToPayload,
      awaitIdentityCookie: awaitIdentityCookie,
      logger: logger
    });
    var processIdSyncs = injectProcessIdSyncs({
      fireReferrerHideableImage: fireReferrerHideableImage,
      logger: logger
    });
    var handleResponseForIdSyncs = injectHandleResponseForIdSyncs({
      processIdSyncs: processIdSyncs
    });
    return createComponent$4({
      ensureSingleIdentity: ensureSingleIdentity,
      addEcidQueryToPayload: addEcidQueryToPayload,
      setLegacyEcid: legacyIdentity.setEcid,
      handleResponseForIdSyncs: handleResponseForIdSyncs,
      getEcidFromResponse: getEcidFromResponse,
      getIdentity: getIdentity,
      consent: consent
    });
  };

  createIdentity.namespace = "Identity";
  createIdentity.configValidators = configValidators;

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createResultLogMessage = function createResultLogMessage(urlDestination, success) {
    return "URL destination " + (success ? "succeeded" : "failed") + ": " + urlDestination.spec.url;
  };

  var processUrls = function processUrls(fireReferrerHideableImage, logger, destinations) {
    var urlDestinations = destinations.filter(function (dest) {
      return dest.type === "url";
    });
    return Promise.all(urlDestinations.map(function (urlDestination) {
      return fireReferrerHideableImage(urlDestination.spec).then(function () {
        logger.info(createResultLogMessage(urlDestination, true));
      }).catch(function () {
        // We intentionally do not throw an error if destinations fail. We
        // consider it a non-critical failure and therefore do not want it to
        // reject the promise handed back to the customer.
        logger.error(createResultLogMessage(urlDestination, false));
      });
    })).then(noop$1);
  };

  var processCookies = function processCookies(destinations) {
    var cookieDestinations = destinations.filter(function (dest) {
      return dest.type === "cookie";
    });
    cookieDestinations.forEach(function (dest) {
      var _dest$spec = dest.spec,
          name = _dest$spec.name,
          value = _dest$spec.value,
          domain = _dest$spec.domain,
          ttlDays = _dest$spec.ttlDays;
      reactorCookie.set(name, value || "", {
        domain: domain || "",
        expires: ttlDays || 10 // days

      });
    });
  };

  var injectProcessDestinations = (function (_ref) {
    var fireReferrerHideableImage = _ref.fireReferrerHideableImage,
        logger = _ref.logger;
    return function (destinations) {
      processCookies(destinations);
      return processUrls(fireReferrerHideableImage, logger, destinations);
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createAudiences = function createAudiences(_ref) {
    var logger = _ref.logger;
    var processDestinations = injectProcessDestinations({
      fireReferrerHideableImage: fireReferrerHideableImage,
      logger: logger
    });

    var processDestinationsFromResponse = function processDestinationsFromResponse(_ref2) {
      var response = _ref2.response;
      var destinations = response.getPayloadsByType("activation:push");
      return processDestinations(destinations);
    };

    return {
      lifecycle: {
        onResponse: processDestinationsFromResponse
      },
      commands: {}
    };
  };

  createAudiences.namespace = "Audiences";
  createAudiences.configValidators = {};

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var PAGE_WIDE_SCOPE = "__view__";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var DOM_ACTION = "https://ns.adobe.com/personalization/dom-action";
  var HTML_CONTENT_ITEM = "https://ns.adobe.com/personalization/html-content-item";
  var JSON_CONTENT_ITEM = "https://ns.adobe.com/personalization/json-content-item";
  var REDIRECT_ITEM = "https://ns.adobe.com/personalization/redirect-item";

  var createPersonalizationDetails = (function (_ref) {
    var renderDecisions = _ref.renderDecisions,
        decisionScopes = _ref.decisionScopes,
        event = _ref.event,
        viewCache = _ref.viewCache;
    var viewName = event.getViewName();
    return {
      isRenderDecisions: function isRenderDecisions() {
        return renderDecisions;
      },
      getViewName: function getViewName() {
        return viewName;
      },
      hasScopes: function hasScopes() {
        return decisionScopes.length > 0;
      },
      hasViewName: function hasViewName() {
        return isNonEmptyString(viewName);
      },
      createQueryDetails: function createQueryDetails() {
        var scopes = _toConsumableArray(decisionScopes);

        if (!this.isCacheInitialized() && !includes(scopes, PAGE_WIDE_SCOPE)) {
          scopes.push(PAGE_WIDE_SCOPE);
        }

        var schemas = [HTML_CONTENT_ITEM, JSON_CONTENT_ITEM, REDIRECT_ITEM];

        if (includes(scopes, PAGE_WIDE_SCOPE)) {
          schemas.push(DOM_ACTION);
        }

        return {
          schemas: schemas,
          decisionScopes: scopes
        };
      },
      isCacheInitialized: function isCacheInitialized() {
        return viewCache.isInitialized();
      },
      shouldFetchData: function shouldFetchData() {
        return this.hasScopes() || !this.isCacheInitialized();
      },
      shouldUseCachedData: function shouldUseCachedData() {
        return this.hasViewName() && this.isCacheInitialized();
      }
    };
  });

  var AUTHORING_ENABLED = "Rendering is disabled for authoring mode.";
  var REDIRECT_EXECUTION_ERROR = "An error occurred while executing the redirect offer.";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createComponent$3 = (function (_ref) {
    var logger = _ref.logger,
        fetchDataHandler = _ref.fetchDataHandler,
        viewChangeHandler = _ref.viewChangeHandler,
        onClickHandler = _ref.onClickHandler,
        isAuthoringModeEnabled = _ref.isAuthoringModeEnabled,
        mergeQuery = _ref.mergeQuery,
        viewCache = _ref.viewCache;
    return {
      lifecycle: {
        onBeforeEvent: function onBeforeEvent(_ref2) {
          var event = _ref2.event,
              renderDecisions = _ref2.renderDecisions,
              _ref2$decisionScopes = _ref2.decisionScopes,
              decisionScopes = _ref2$decisionScopes === void 0 ? [] : _ref2$decisionScopes,
              _ref2$onResponse = _ref2.onResponse,
              onResponse = _ref2$onResponse === void 0 ? noop$1 : _ref2$onResponse,
              _ref2$onRequestFailur = _ref2.onRequestFailure,
              onRequestFailure = _ref2$onRequestFailur === void 0 ? noop$1 : _ref2$onRequestFailur;

          if (isAuthoringModeEnabled()) {
            logger.warn(AUTHORING_ENABLED); // If we are in authoring mode we disable personalization

            mergeQuery(event, {
              enabled: false
            });
            return;
          }

          var personalizationDetails = createPersonalizationDetails({
            renderDecisions: renderDecisions,
            decisionScopes: decisionScopes,
            event: event,
            viewCache: viewCache
          });

          if (personalizationDetails.shouldFetchData()) {
            var decisionsDeferred = defer();
            viewCache.storeViews(decisionsDeferred.promise);
            fetchDataHandler({
              decisionsDeferred: decisionsDeferred,
              personalizationDetails: personalizationDetails,
              event: event,
              onResponse: onResponse,
              onRequestFailure: onRequestFailure
            });
            return;
          }

          if (personalizationDetails.shouldUseCachedData()) {
            viewChangeHandler({
              personalizationDetails: personalizationDetails,
              onResponse: onResponse,
              onRequestFailure: onRequestFailure
            });
          }
        },
        onClick: function onClick(_ref3) {
          var event = _ref3.event,
              clickedElement = _ref3.clickedElement;
          onClickHandler({
            event: event,
            clickedElement: clickedElement
          });
        }
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createFragment = (function (content) {
    return createNode(DIV, {}, {
      innerHTML: content
    });
  });

  var css_escape = createCommonjsModule(function (module, exports) {

    (function (root, factory) {
      // https://github.com/umdjs/umd/blob/master/returnExports.js
      {
        // For Node.js.
        module.exports = factory(root);
      }
    })(typeof commonjsGlobal != 'undefined' ? commonjsGlobal : commonjsGlobal, function (root) {
      if (root.CSS && root.CSS.escape) {
        return root.CSS.escape;
      } // https://drafts.csswg.org/cssom/#serialize-an-identifier


      var cssEscape = function cssEscape(value) {
        if (arguments.length == 0) {
          throw new TypeError('`CSS.escape` requires an argument.');
        }

        var string = String(value);
        var length = string.length;
        var index = -1;
        var codeUnit;
        var result = '';
        var firstCodeUnit = string.charCodeAt(0);

        while (++index < length) {
          codeUnit = string.charCodeAt(index); // Note: thereâ€™s no need to special-case astral symbols, surrogate
          // pairs, or lone surrogates.
          // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
          // (U+FFFD).

          if (codeUnit == 0x0000) {
            result += "\uFFFD";
            continue;
          }

          if ( // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
          // U+007F, [â€¦]
          codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F || // If the character is the first character and is in the range [0-9]
          // (U+0030 to U+0039), [â€¦]
          index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || // If the character is the second character and is in the range [0-9]
          // (U+0030 to U+0039) and the first character is a `-` (U+002D), [â€¦]
          index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
            // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
            result += '\\' + codeUnit.toString(16) + ' ';
            continue;
          }

          if ( // If the character is the first character and is a `-` (U+002D), and
          // there is no second character, [â€¦]
          index == 0 && length == 1 && codeUnit == 0x002D) {
            result += '\\' + string.charAt(index);
            continue;
          } // If the character is not handled by one of the above rules and is
          // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
          // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
          // U+005A), or [a-z] (U+0061 to U+007A), [â€¦]


          if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
            // the character itself
            result += string.charAt(index);
            continue;
          } // Otherwise, the escaped character.
          // https://drafts.csswg.org/cssom/#escape-a-character


          result += '\\' + string.charAt(index);
        }

        return result;
      };

      if (!root.CSS) {
        root.CSS = {};
      }

      root.CSS.escape = cssEscape;
      return cssEscape;
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var EQ_START = ":eq(";
  var EQ_PATTERN = /:eq\((\d+)\)/g;
  var isNotEqSelector = function isNotEqSelector(str) {
    return str.indexOf(EQ_START) === -1;
  };
  var splitWithEq = function splitWithEq(selector) {
    return selector.split(EQ_PATTERN).filter(isNonEmptyString);
  };

  var CSS_IDENTIFIER_PATTERN = /(#|\.)(-?\w+)/g; // This is required to remove leading " > " from parsed pieces

  var SIBLING_PATTERN = /^\s*>?\s*/;

  var cleanUp = function cleanUp(str) {
    return str.replace(SIBLING_PATTERN, "").trim();
  }; // Here we use CSS.escape() to make sure we get
  // correct values for ID and CSS class
  // Please check:  https://www.w3.org/TR/css-syntax-3/#escaping
  // CSS.escape() polyfill can be found here: https://github.com/mathiasbynens/CSS.escape


  var replaceIdentifier = function replaceIdentifier(_, $1, $2) {
    return "" + $1 + css_escape($2);
  };

  var escapeIdentifiersInSelector = function escapeIdentifiersInSelector(selector) {
    return selector.replace(CSS_IDENTIFIER_PATTERN, replaceIdentifier);
  };
  var parseSelector = function parseSelector(rawSelector) {
    var result = [];
    var selector = escapeIdentifiersInSelector(rawSelector.trim());
    var parts = splitWithEq(selector);
    var length = parts.length;
    var i = 0;

    while (i < length) {
      var sel = cleanUp(parts[i]);
      var eq = parts[i + 1];

      if (eq) {
        result.push({
          sel: sel,
          eq: Number(eq)
        });
      } else {
        result.push({
          sel: sel
        });
      }

      i += 2;
    }

    return result;
  };
  /**
   * Returns an array of matched DOM nodes.
   * @param {String} selector that contains Sizzle "eq(...)" pseudo selector
   * @returns {Array} an array of DOM nodes
   */

  var selectNodesWithEq = function selectNodesWithEq(selector) {
    var doc = document;

    if (isNotEqSelector(selector)) {
      return selectNodes(selector, doc);
    }

    var parts = parseSelector(selector);
    var length = parts.length;
    var result = [];
    var context = doc;
    var i = 0;

    while (i < length) {
      var _parts$i = parts[i],
          sel = _parts$i.sel,
          eq = _parts$i.eq;
      var nodes = selectNodes(sel, context);
      var nodesCount = nodes.length;

      if (nodesCount === 0) {
        break;
      }

      if (eq != null && eq > nodesCount - 1) {
        break;
      }

      if (i < length - 1) {
        if (eq == null) {
          var _nodes = _slicedToArray(nodes, 1);

          context = _nodes[0];
        } else {
          context = nodes[eq];
        }
      }

      if (i === length - 1) {
        if (eq == null) {
          result = nodes;
        } else {
          result = [nodes[eq]];
        }
      }

      i += 1;
    }

    return result;
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Returns an array of matched DOM nodes.
   * @param {String} id
   * @param {Node} [context=document] defaults to document
   * @returns {HTMLElement} an element of null
   */
  var getElementById = (function (id) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return context.getElementById(id);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var setAttribute = (function (element, name, value) {
    element.setAttribute(name, value);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getAttribute = (function (element, name) {
    return element.getAttribute(name);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var removeAttribute = (function (element, name) {
    element.removeAttribute(name);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var setStyle = (function (element, name, value, priority) {
    var css;

    if (priority) {
      css = name + ":" + value + " !" + priority + ";";
    } else {
      css = name + ":" + value + ";";
    }

    element.style.cssText += ";" + css;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getParent = (function (element) {
    return element.parentNode;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getNextSibling = (function (element) {
    return element.nextElementSibling;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var insertAfter = (function (container, element) {
    if (!container) {
      return;
    }

    var parent = getParent(container);

    if (parent) {
      parent.insertBefore(element, getNextSibling(container));
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var insertBefore = (function (container, element) {
    if (!container) {
      return;
    }

    var parent = getParent(container);

    if (parent) {
      parent.insertBefore(element, container);
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getChildren = (function (element) {
    var children = element.children;

    if (children) {
      return toArray(children);
    }

    return [];
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getChildNodes = (function (element) {
    var childNodes = element.childNodes;

    if (childNodes) {
      return toArray(childNodes);
    }

    return [];
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var getFirstChild = (function (element) {
    return element.firstElementChild;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var nonce;
  /**
   * Returns the nonce if available.
   * @param {Node} [context=document] defaults to document
   * @returns {(String|undefined)} the nonce or undefined if not available
   */

  var getNonce = (function () {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if (nonce === undefined) {
      var n = context.querySelector("[nonce]"); // NOTE: We're keeping n.getAttribute("nonce") until it is safe to remove:
      //   ref: https://github.com/whatwg/html/issues/2369#issuecomment-280853946

      nonce = n && (n.nonce || n.getAttribute("nonce"));
    }

    return nonce;
  }); // This function is only used for testing and removed when library is built (tree-shaking)

  var PREHIDING_ID = "alloy-prehiding";
  var HIDING_STYLE_DEFINITION = "{ visibility: hidden }"; // Using global is OK since we have a single DOM
  // so storing nodes even for multiple Alloy instances is fine

  var styleNodes = {};
  var hideElements = function hideElements(prehidingSelector) {
    // if we have different events with the same
    // prehiding selector we don't want to recreate
    // the style tag
    if (styleNodes[prehidingSelector]) {
      return;
    }

    var nonce = getNonce();

    var attrs = _objectSpread2({}, nonce && {
      nonce: nonce
    });

    var props = {
      textContent: prehidingSelector + " " + HIDING_STYLE_DEFINITION
    };
    var node = createNode(STYLE, attrs, props);
    appendNode(document.head, node);
    styleNodes[prehidingSelector] = node;
  };
  var showElements = function showElements(prehidingSelector) {
    var node = styleNodes[prehidingSelector];

    if (node) {
      removeNode(node);
      delete styleNodes[prehidingSelector];
    }
  };
  var hideContainers = function hideContainers(prehidingStyle) {
    if (!prehidingStyle) {
      return;
    } // If containers prehiding style has been added
    // by customer's prehiding snippet we don't
    // want to add the same node


    var node = getElementById(PREHIDING_ID);

    if (node) {
      return;
    }

    var nonce = getNonce();

    var attrs = _objectSpread2({
      id: PREHIDING_ID
    }, nonce && {
      nonce: nonce
    });

    var props = {
      textContent: prehidingStyle
    };
    var styleNode = createNode(STYLE, attrs, props);
    appendNode(document.head, styleNode);
  };
  var showContainers = function showContainers() {
    // If containers prehiding style exists
    // we will remove it
    var node = getElementById(PREHIDING_ID);

    if (!node) {
      return;
    }

    removeNode(node);
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var setText = (function (container, text) {
    container.textContent = text;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var isImage = function isImage(element) {
    return element.tagName === IMG;
  };
  var loadImage = function loadImage(url) {
    return createNode(IMG, {
      src: url
    });
  };
  var loadImages = function loadImages(fragment) {
    var images = selectNodes(IMG, fragment);
    images.forEach(function (image) {
      var url = getAttribute(image, SRC);

      if (url) {
        loadImage(url);
      }
    });
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var is$1 = function is(element, tagName) {
    return element.tagName === tagName;
  };

  var isInlineStyleElement = function isInlineStyleElement(element) {
    return is$1(element, STYLE) && !getAttribute(element, SRC);
  };

  var addNonceToInlineStyleElements = (function (fragment) {
    var styleNodes = selectNodes(STYLE, fragment);
    var length = styleNodes.length;
    var nonce = getNonce();

    if (!nonce) {
      return;
    }
    /* eslint-disable no-continue */


    for (var i = 0; i < length; i += 1) {
      var element = styleNodes[i];

      if (!isInlineStyleElement(element)) {
        continue;
      }

      element.nonce = nonce;
    }
  });

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(function (value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function () {
        // @ts-ignore
        return constructor.reject(reason);
      });
    });
  }

  // other code modifying setTimeout (like sinon.useFakeTimers())

  var setTimeoutFunc = setTimeout;

  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {} // Polyfill for Function.prototype.bind


  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }
  /**
   * @constructor
   * @param {Function} fn
   */


  function Promise$1(fn) {
    if (!(this instanceof Promise$1)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */

    this._state = 0;
    /** @type {!boolean} */

    this._handled = false;
    /** @type {Promise|undefined} */

    this._value = undefined;
    /** @type {!Array<!Function>} */

    this._deferreds = [];
    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }

    if (self._state === 0) {
      self._deferreds.push(deferred);

      return;
    }

    self._handled = true;

    Promise$1._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }

      var ret;

      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }

      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

      if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;

        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }

      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function () {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }

    self._deferreds = null;
  }
  /**
   * @constructor
   */


  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }
  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */


  function doResolve(fn, self) {
    var done = false;

    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function (onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);
    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
            var then = val.then;

            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }

          args[i] = val;

          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function (value) {
    if (value && _typeof(value) === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function (resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function (value) {
    return new Promise$1(function (resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function (arr) {
    return new Promise$1(function (resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  }; // Use polyfill for setImmediate for performance gains


  Promise$1._immediateFn = // @ts-ignore
  typeof setImmediate === 'function' && function (fn) {
    // @ts-ignore
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  // Karma + Webpack. You need to specify the default import when using promise-polyfill`
  // with Webpack 2+. We need `require('promise-polyfill').default` for running the tests
  // and `require('promise-polyfill')` for building Turbine.


  var reactorPromise = typeof window !== 'undefined' && window.Promise || typeof commonjsGlobal !== 'undefined' && commonjsGlobal.Promise || Promise$1.default || Promise$1;

  var getPromise = function getPromise(url, script) {
    return new reactorPromise(function (resolve, reject) {
      script.onload = function () {
        resolve(script);
      };

      script.onerror = function () {
        reject(new Error('Failed to load script ' + url));
      };
    });
  };

  var reactorLoadScript = function reactorLoadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    var promise = getPromise(url, script);
    document.getElementsByTagName('head')[0].appendChild(script);
    return promise;
  };

  var is = function is(element, tagName) {
    return !!element && element.tagName === tagName;
  };

  var isInlineScript = function isInlineScript(element) {
    return is(element, SCRIPT) && !getAttribute(element, SRC);
  };

  var isRemoteScript = function isRemoteScript(element) {
    return is(element, SCRIPT) && getAttribute(element, SRC);
  };

  var getInlineScripts = function getInlineScripts(fragment) {
    var scripts = selectNodes(SCRIPT, fragment);
    var result = [];
    var length = scripts.length;
    var nonce = getNonce();

    var attributes = _objectSpread2({}, nonce && {
      nonce: nonce
    });
    /* eslint-disable no-continue */


    for (var i = 0; i < length; i += 1) {
      var element = scripts[i];

      if (!isInlineScript(element)) {
        continue;
      }

      var textContent = element.textContent;

      if (!textContent) {
        continue;
      }

      result.push(createNode(SCRIPT, attributes, {
        textContent: textContent
      }));
    }
    /* eslint-enable no-continue */


    return result;
  };
  var getRemoteScriptsUrls = function getRemoteScriptsUrls(fragment) {
    var scripts = selectNodes(SCRIPT, fragment);
    var result = [];
    var length = scripts.length;
    /* eslint-disable no-continue */

    for (var i = 0; i < length; i += 1) {
      var element = scripts[i];

      if (!isRemoteScript(element)) {
        continue;
      }

      var url = getAttribute(element, SRC);

      if (!url) {
        continue;
      }

      result.push(url);
    }
    /* eslint-enable no-continue */


    return result;
  };
  var executeInlineScripts = function executeInlineScripts(container, scripts, func) {
    scripts.forEach(function (script) {
      return func(container, script);
    });
  };
  var executeRemoteScripts = function executeRemoteScripts(urls) {
    return Promise.all(urls.map(reactorLoadScript));
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var appendHtml = (function (container, html) {
    var fragment = createFragment(html);
    addNonceToInlineStyleElements(fragment);
    var elements = getChildNodes(fragment);
    var scripts = getInlineScripts(fragment);
    var scriptsUrls = getRemoteScriptsUrls(fragment);
    loadImages(fragment);
    elements.forEach(function (element) {
      appendNode(container, element);
    });
    executeInlineScripts(container, scripts, appendNode);
    return executeRemoteScripts(scriptsUrls);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var clear = function clear(container) {
    // We want to remove ALL nodes, text, comments etc
    var childNodes = getChildNodes(container);
    childNodes.forEach(removeNode);
  };

  var setHtml = (function (container, html) {
    clear(container);
    appendHtml(container, html);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var prependHtml = (function (container, html) {
    var fragment = createFragment(html);
    addNonceToInlineStyleElements(fragment);
    var elements = getChildNodes(fragment);
    var scripts = getInlineScripts(fragment);
    var scriptsUrls = getRemoteScriptsUrls(fragment);
    var length = elements.length;
    var i = length - 1; // We have to proactively load images to avoid flicker

    loadImages(fragment); // We are inserting elements in reverse order

    while (i >= 0) {
      var element = elements[i];
      var firstChild = getFirstChild(container);

      if (firstChild) {
        insertBefore(firstChild, element);
      } else {
        appendNode(container, element);
      }

      i -= 1;
    }

    executeInlineScripts(container, scripts, appendNode);
    return executeRemoteScripts(scriptsUrls);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var insertHtmlBefore = (function (container, html) {
    var fragment = createFragment(html);
    addNonceToInlineStyleElements(fragment);
    var elements = getChildNodes(fragment);
    var scripts = getInlineScripts(fragment);
    var scriptsUrls = getRemoteScriptsUrls(fragment);
    loadImages(fragment);
    elements.forEach(function (element) {
      insertBefore(container, element);
    });
    executeInlineScripts(container, scripts, insertBefore);
    return executeRemoteScripts(scriptsUrls);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var replaceHtml = (function (container, html) {
    insertHtmlBefore(container, html);
    removeNode(container);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var insertHtmlAfter = (function (container, html) {
    var fragment = createFragment(html);
    addNonceToInlineStyleElements(fragment);
    var elements = getChildNodes(fragment);
    var scripts = getInlineScripts(fragment);
    var scriptsUrls = getRemoteScriptsUrls(fragment);
    loadImages(fragment);
    elements.forEach(function (element) {
      insertAfter(container, element);
    });
    executeInlineScripts(container, scripts, insertAfter);
    return executeRemoteScripts(scriptsUrls);
  });

  var setStyles = (function (container, styles) {
    var priority = styles.priority,
        style = _objectWithoutProperties(styles, ["priority"]);

    Object.keys(style).forEach(function (key) {
      setStyle(container, key, style[key], priority);
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var setAttributes = (function (container, attributes) {
    Object.keys(attributes).forEach(function (key) {
      setAttribute(container, key, attributes[key]);
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var swapImage = (function (container, url) {
    if (!isImage(container)) {
      return;
    } // Start downloading the image


    loadImage(url); // Remove "src" so there is no flicker

    removeAttribute(container, SRC); // Replace the image "src"

    setAttribute(container, SRC, url);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var rearrangeChildren = (function (container, _ref) {
    var from = _ref.from,
        to = _ref.to;
    var children = getChildren(container);
    var elementFrom = children[from];
    var elementTo = children[to];

    if (!elementFrom || !elementTo) {
      // TODO: We will need to add logging
      // to ease troubleshooting
      return;
    }

    if (from < to) {
      insertAfter(elementTo, elementFrom);
    } else {
      insertBefore(elementTo, elementFrom);
    }
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var _click = (function (settings, store) {
    var selector = settings.selector,
        meta = settings.meta;
    store({
      selector: selector,
      meta: meta
    });
    return Promise.resolve();
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var renderContent = function renderContent(elements, content, renderFunc) {
    var executions = elements.map(function (element) {
      return renderFunc(element, content);
    });
    return Promise.all(executions);
  };

  var createAction = function createAction(renderFunc) {
    return function (settings) {
      var selector = settings.selector,
          prehidingSelector = settings.prehidingSelector,
          content = settings.content,
          meta = settings.meta;
      hideElements(prehidingSelector);
      return awaitSelector(selector, selectNodesWithEq).then(function (elements) {
        return renderContent(elements, content, renderFunc);
      }).then(function () {
        // if everything is OK, show elements
        showElements(prehidingSelector);
        return {
          meta: meta
        };
      }, function (error) {
        // in case of awaiting timing or error, we need to remove the style tag
        // hence showing the pre-hidden elements
        showElements(prehidingSelector);
        return {
          meta: meta,
          error: error
        };
      });
    };
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var initDomActionsModules = (function (store) {
    return {
      setHtml: createAction(setHtml),
      customCode: createAction(prependHtml),
      setText: createAction(setText),
      setAttribute: createAction(setAttributes),
      setImageSource: createAction(swapImage),
      setStyle: createAction(setStyles),
      move: createAction(setStyles),
      resize: createAction(setStyles),
      rearrange: createAction(rearrangeChildren),
      remove: createAction(removeNode),
      insertAfter: createAction(insertHtmlAfter),
      insertBefore: createAction(insertHtmlBefore),
      replaceHtml: createAction(replaceHtml),
      prependHtml: createAction(prependHtml),
      appendHtml: createAction(appendHtml),
      click: function click(settings) {
        return _click(settings, store);
      }
    };
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  /**
   * Returns whether a string value is blank. Also returns true if the value is not a string.
   * @param {*} value
   * @returns {boolean}
   */

  var isBlankString = (function (value) {
    return isString(value) ? !value.trim() : true;
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var APPEND_HTML = "appendHtml";
  var HEAD_TAGS_SELECTOR = "SCRIPT,LINK,STYLE";

  var filterHeadContent = function filterHeadContent(content) {
    var container = createFragment(content);
    var headNodes = selectNodes(HEAD_TAGS_SELECTOR, container);
    return headNodes.map(function (node) {
      return node.outerHTML;
    }).join("");
  };

  var preprocess = (function (action) {
    var result = reactorObjectAssign({}, action);
    var content = result.content,
        selector = result.selector;

    if (isBlankString(content)) {
      return result;
    }

    var container = selectNodesWithEq(selector);

    if (!is(container[0], HEAD)) {
      return result;
    }

    result.type = APPEND_HTML;
    result.content = filterHeadContent(content);
    return result;
  });

  var logActionError = function logActionError(logger, action, error) {
    if (logger.enabled) {
      var details = JSON.stringify(action);
      var message = error.message,
          stack = error.stack;
      var errorMessage = "Failed to execute action " + details + ". " + message + " " + (stack ? "\n " + stack : "");
      logger.error(errorMessage);
    }
  };

  var logActionCompleted = function logActionCompleted(logger, action) {
    if (logger.enabled) {
      var details = JSON.stringify(action);
      logger.info("Action " + details + " executed.");
    }
  };

  var executeAction = function executeAction(logger, modules, type, args) {
    var execute = modules[type];

    if (!execute) {
      var error = new Error("DOM action \"" + type + "\" not found");
      logActionError(logger, args[0], error);
      throw error;
    }

    return execute.apply(void 0, _toConsumableArray(args));
  };

  var executeActions = (function (actions, modules, logger) {
    var actionPromises = actions.map(function (action) {
      var processedAction = preprocess(action);
      var type = processedAction.type;
      return executeAction(logger, modules, type, [processedAction]).then(function (result) {
        logActionCompleted(logger, processedAction);
        return result;
      }).catch(function (error) {
        logActionError(logger, processedAction, error);
        throw error;
      });
    });
    return Promise.all(actionPromises);
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createCollect = (function (_ref) {
    var eventManager = _ref.eventManager,
        mergeDecisionsMeta = _ref.mergeDecisionsMeta;
    // Called when a decision is auto-rendered for the __view__ scope (non-SPA view).
    return function (_ref2) {
      var decisionsMeta = _ref2.decisionsMeta,
          _ref2$documentMayUnlo = _ref2.documentMayUnload,
          documentMayUnload = _ref2$documentMayUnlo === void 0 ? false : _ref2$documentMayUnlo;
      var event = eventManager.createEvent();
      event.mergeXdm({
        eventType: "display"
      });
      mergeDecisionsMeta(event, decisionsMeta);

      if (documentMayUnload) {
        event.documentMayUnload();
      }

      return eventManager.sendEvent(event);
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createViewCollect = (function (_ref) {
    var eventManager = _ref.eventManager,
        mergeDecisionsMeta = _ref.mergeDecisionsMeta;
    // Called when an offer for a specific SPA view is auto-rendered.
    return function (_ref2) {
      var decisionsMeta = _ref2.decisionsMeta,
          xdm = _ref2.xdm;
      var data = {
        eventType: "display"
      };
      var event = eventManager.createEvent();

      if (isNonEmptyArray(decisionsMeta)) {
        var viewName = decisionsMeta[0].scope;
        data.web = {
          webPageDetails: {
            viewName: viewName
          }
        };
        mergeDecisionsMeta(event, decisionsMeta);
      }

      event.mergeXdm(data);
      event.mergeXdm(xdm);
      return eventManager.sendEvent(event);
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var identity = function identity(item) {
    return item;
  };

  var buildActions = function buildActions(decision) {
    var meta = {
      id: decision.id,
      scope: decision.scope,
      scopeDetails: decision.scopeDetails
    };
    return decision.items.map(function (item) {
      return reactorObjectAssign({}, item.data, {
        meta: meta
      });
    });
  };

  var processMetas = function processMetas(collect, logger, actionResults) {
    var results = flatMap(actionResults, identity);
    var finalMetas = [];
    var set = new Set();
    results.forEach(function (item) {
      // for click actions we don't return an item
      if (!item) {
        return;
      }

      if (item.error) {
        logger.warn(item);
        return;
      }

      var meta = item.meta;

      if (set.has(meta.id)) {
        return;
      }

      set.add(meta.id);
      finalMetas.push(meta);
    });

    if (isNonEmptyArray(finalMetas)) {
      // collect here can either be the function from createCollect or createViewCollect.
      collect({
        decisionsMeta: finalMetas
      });
    }
  };

  var createExecuteDecisions = (function (_ref) {
    var modules = _ref.modules,
        logger = _ref.logger,
        executeActions = _ref.executeActions,
        collect = _ref.collect;
    return function (decisions) {
      var actionResultsPromises = decisions.map(function (decision) {
        var actions = buildActions(decision);
        return executeActions(actions, modules, logger);
      });
      return Promise.all(actionResultsPromises).then(function (results) {
        return processMetas(collect, logger, results);
      }).catch(function (error) {
        logger.error(error);
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createFetchDataHandler = (function (_ref) {
    var config = _ref.config,
        responseHandler = _ref.responseHandler,
        showContainers = _ref.showContainers,
        hideContainers = _ref.hideContainers,
        mergeQuery = _ref.mergeQuery;
    return function (_ref2) {
      var decisionsDeferred = _ref2.decisionsDeferred,
          personalizationDetails = _ref2.personalizationDetails,
          event = _ref2.event,
          onResponse = _ref2.onResponse,
          onRequestFailure = _ref2.onRequestFailure;
      var prehidingStyle = config.prehidingStyle;

      if (personalizationDetails.isRenderDecisions()) {
        hideContainers(prehidingStyle);
      }

      mergeQuery(event, personalizationDetails.createQueryDetails());
      onResponse(function (_ref3) {
        var response = _ref3.response;
        return responseHandler({
          decisionsDeferred: decisionsDeferred,
          personalizationDetails: personalizationDetails,
          response: response
        });
      });
      onRequestFailure(function () {
        decisionsDeferred.reject();
        showContainers();
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var matchesSelectorWithEq = (function (selector, element) {
    if (isNotEqSelector(selector)) {
      return matchesSelector(selector, element);
    } // Using node selection vs matches selector, because of :eq()
    // Find all nodes using document as context


    var nodes = selectNodesWithEq(selector);
    var result = false; // Iterate through all the identified elements
    // and reference compare with element

    for (var i = 0; i < nodes.length; i += 1) {
      if (nodes[i] === element) {
        result = true;
        break;
      }
    }

    return result;
  });

  var getMetasIfMatches = function getMetasIfMatches(clickedElement, selector, getClickMetasBySelector) {
    var _document = document,
        documentElement = _document.documentElement;
    var element = clickedElement;

    while (element && element !== documentElement) {
      if (matchesSelectorWithEq(selector, element)) {
        return getClickMetasBySelector(selector);
      }

      element = element.parentNode;
    }

    return null;
  };

  var collectClicks = (function (clickedElement, selectors, getClickMetasBySelector) {
    var result = [];

    for (var i = 0; i < selectors.length; i += 1) {
      var metas = getMetasIfMatches(clickedElement, selectors[i], getClickMetasBySelector);

      if (metas) {
        result.push.apply(result, _toConsumableArray(metas));
      }
    }

    return result;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var isAuthoringModeEnabled = (function () {
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    return doc.location.href.indexOf("adobe_authoring_enabled") !== -1;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var mergeDecisionsMeta = function mergeDecisionsMeta(event, decisionsMeta) {
    event.mergeXdm({
      _experience: {
        decisioning: {
          propositions: decisionsMeta
        }
      }
    });
  };
  var mergeQuery = function mergeQuery(event, details) {
    event.mergeQuery({
      personalization: _objectSpread2({}, details)
    });
  };

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createOnClickHandler = (function (_ref) {
    var mergeDecisionsMeta = _ref.mergeDecisionsMeta,
        collectClicks = _ref.collectClicks,
        getClickSelectors = _ref.getClickSelectors,
        getClickMetasBySelector = _ref.getClickMetasBySelector;
    // Called when an element qualifying for conversion within an offer is clicked.
    return function (_ref2) {
      var event = _ref2.event,
          clickedElement = _ref2.clickedElement;
      var selectors = getClickSelectors();

      if (isNonEmptyArray(selectors)) {
        var decisionsMeta = collectClicks(clickedElement, selectors, getClickMetasBySelector);

        if (isNonEmptyArray(decisionsMeta)) {
          event.mergeXdm({
            eventType: "click"
          });
          mergeDecisionsMeta(event, decisionsMeta);
        }
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createExecuteCachedViewDecisions = (function (_ref) {
    var executeViewDecisions = _ref.executeViewDecisions,
        collect = _ref.collect;
    return function (_ref2) {
      var viewName = _ref2.viewName,
          viewDecisions = _ref2.viewDecisions;

      // if there are viewDecisions for current view we will execute them and then send the collect call
      if (isNonEmptyArray(viewDecisions)) {
        executeViewDecisions(viewDecisions);
        return; // return here is to avoid the following code to be executed, that one is meant for the condition when viewDecisions is empty
      } // if there are no viewDecisions for current view we will send a collect call


      var xdm = {
        web: {
          webPageDetails: {
            viewName: viewName
          }
        }
      }; // This collect function is not from createCollect. It's the function from createViewCollect.

      collect({
        decisionsMeta: [],
        xdm: xdm
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createViewCacheManager = (function () {
    var viewStorage;
    var viewStorageDeferred = defer();

    var storeViews = function storeViews(decisionsPromise) {
      decisionsPromise.then(function (decisions) {
        if (viewStorage === undefined) {
          viewStorage = {};
        }

        reactorObjectAssign(viewStorage, decisions);
        viewStorageDeferred.resolve();
      }).catch(function () {
        if (viewStorage === undefined) {
          viewStorage = {};
        }

        viewStorageDeferred.resolve();
      });
    };

    var getView = function getView(viewName) {
      return viewStorageDeferred.promise.then(function () {
        return viewStorage[viewName] || [];
      });
    };

    var isInitialized = function isInitialized() {
      return !(viewStorage === undefined);
    };

    return {
      storeViews: storeViews,
      getView: getView,
      isInitialized: isInitialized
    };
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var addRenderAttemptedToDecisions = (function (_ref) {
    var decisions = _ref.decisions,
        renderAttempted = _ref.renderAttempted;
    return decisions.map(function (decision) {
      return reactorObjectAssign({
        renderAttempted: renderAttempted
      }, decision);
    });
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createViewChangeHandler = (function (_ref) {
    var executeCachedViewDecisions = _ref.executeCachedViewDecisions,
        viewCache = _ref.viewCache,
        showContainers = _ref.showContainers;
    return function (_ref2) {
      var personalizationDetails = _ref2.personalizationDetails,
          onResponse = _ref2.onResponse,
          onRequestFailure = _ref2.onRequestFailure;
      var viewName = personalizationDetails.getViewName();
      return viewCache.getView(viewName).then(function (currentViewDecisions) {
        if (personalizationDetails.isRenderDecisions()) {
          executeCachedViewDecisions({
            viewName: viewName,
            viewDecisions: currentViewDecisions
          });
        }

        onResponse(function () {
          return personalizationDetails.isRenderDecisions() ? {
            propositions: addRenderAttemptedToDecisions({
              decisions: currentViewDecisions,
              renderAttempted: true
            })
          } : {
            decisions: currentViewDecisions,
            propositions: addRenderAttemptedToDecisions({
              decisions: currentViewDecisions,
              renderAttempted: false
            })
          };
        });
        onRequestFailure(function () {
          showContainers();
        });
      });
    };
  });

  var splitItems = function splitItems(items, schema) {
    var matched = [];
    var nonMatched = [];
    items.forEach(function (item) {
      if (item.schema === schema) {
        matched.push(item);
      } else {
        nonMatched.push(item);
      }
    });
    return [matched, nonMatched];
  };

  var createDecision = function createDecision(decision, items) {
    return {
      id: decision.id,
      scope: decision.scope,
      items: items,
      scopeDetails: decision.scopeDetails
    };
  };

  var splitDecisions = function splitDecisions(decisions, schema) {
    var matchedDecisions = [];
    var unmatchedDecisions = [];
    decisions.forEach(function (decision) {
      var _decision$items = decision.items,
          items = _decision$items === void 0 ? [] : _decision$items;

      var _splitItems = splitItems(items, schema),
          _splitItems2 = _slicedToArray(_splitItems, 2),
          matchedItems = _splitItems2[0],
          nonMatchedItems = _splitItems2[1];

      if (isNonEmptyArray(matchedItems)) {
        matchedDecisions.push(createDecision(decision, matchedItems));
      }

      if (isNonEmptyArray(nonMatchedItems)) {
        unmatchedDecisions.push(createDecision(decision, nonMatchedItems));
      }
    });
    return {
      matchedDecisions: matchedDecisions,
      unmatchedDecisions: unmatchedDecisions
    };
  };

  var extractDecisionsByScope = function extractDecisionsByScope(decisions, scope) {
    var pageWideScopeDecisions = [];
    var nonPageWideScopeDecisions = {};

    if (isNonEmptyArray(decisions)) {
      decisions.forEach(function (decision) {
        if (decision.scope === scope) {
          pageWideScopeDecisions.push(decision);
        } else {
          if (!nonPageWideScopeDecisions[decision.scope]) {
            nonPageWideScopeDecisions[decision.scope] = [];
          }

          nonPageWideScopeDecisions[decision.scope].push(decision);
        }
      });
    }

    return {
      pageWideScopeDecisions: pageWideScopeDecisions,
      nonPageWideScopeDecisions: nonPageWideScopeDecisions
    };
  };

  var groupDecisions = function groupDecisions(unprocessedDecisions) {
    var decisionsGroupedByRedirectItemSchema = splitDecisions(unprocessedDecisions, REDIRECT_ITEM);
    var decisionsGroupedByDomActionSchema = splitDecisions(decisionsGroupedByRedirectItemSchema.unmatchedDecisions, DOM_ACTION);

    var _extractDecisionsBySc = extractDecisionsByScope(decisionsGroupedByDomActionSchema.matchedDecisions, PAGE_WIDE_SCOPE),
        pageWideScopeDecisions = _extractDecisionsBySc.pageWideScopeDecisions,
        nonPageWideScopeDecisions = _extractDecisionsBySc.nonPageWideScopeDecisions;

    return {
      redirectDecisions: decisionsGroupedByRedirectItemSchema.matchedDecisions,
      pageWideScopeDecisions: pageWideScopeDecisions,
      viewDecisions: nonPageWideScopeDecisions,
      nonAutoRenderableDecisions: decisionsGroupedByDomActionSchema.unmatchedDecisions
    };
  };

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var DECISIONS_HANDLE = "personalization:decisions";
  var createOnResponseHandler = (function (_ref) {
    var autoRenderingHandler = _ref.autoRenderingHandler,
        nonRenderingHandler = _ref.nonRenderingHandler,
        groupDecisions = _ref.groupDecisions,
        handleRedirectDecisions = _ref.handleRedirectDecisions,
        showContainers = _ref.showContainers;
    return function (_ref2) {
      var decisionsDeferred = _ref2.decisionsDeferred,
          personalizationDetails = _ref2.personalizationDetails,
          response = _ref2.response;
      var unprocessedDecisions = response.getPayloadsByType(DECISIONS_HANDLE);
      var viewName = personalizationDetails.getViewName(); // if personalization payload is empty return empty decisions array

      if (unprocessedDecisions.length === 0) {
        showContainers();
        decisionsDeferred.resolve({});
        return {
          decisions: [],
          propositions: []
        };
      }

      var _groupDecisions = groupDecisions(unprocessedDecisions),
          redirectDecisions = _groupDecisions.redirectDecisions,
          pageWideScopeDecisions = _groupDecisions.pageWideScopeDecisions,
          viewDecisions = _groupDecisions.viewDecisions,
          nonAutoRenderableDecisions = _groupDecisions.nonAutoRenderableDecisions;

      if (personalizationDetails.isRenderDecisions() && isNonEmptyArray(redirectDecisions)) {
        decisionsDeferred.resolve({});
        return handleRedirectDecisions(redirectDecisions);
      } // save decisions for views in local cache


      decisionsDeferred.resolve(viewDecisions);

      if (personalizationDetails.isRenderDecisions()) {
        return autoRenderingHandler({
          viewName: viewName,
          pageWideScopeDecisions: pageWideScopeDecisions,
          nonAutoRenderableDecisions: nonAutoRenderableDecisions
        });
      }

      return nonRenderingHandler({
        viewName: viewName,
        redirectDecisions: redirectDecisions,
        pageWideScopeDecisions: pageWideScopeDecisions,
        nonAutoRenderableDecisions: nonAutoRenderableDecisions
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var metasToArray = function metasToArray(metas) {
    return Object.keys(metas).map(function (key) {
      return {
        id: key,
        scope: metas[key].scope,
        scopeDetails: metas[key].scopeDetails
      };
    });
  };

  var createClickStorage = (function () {
    var clickStorage = {};

    var storeClickMetrics = function storeClickMetrics(value) {
      if (!clickStorage[value.selector]) {
        clickStorage[value.selector] = {};
      }

      clickStorage[value.selector][value.meta.id] = {
        scope: value.meta.scope,
        scopeDetails: value.meta.scopeDetails
      };
    };

    var getClickSelectors = function getClickSelectors() {
      return Object.keys(clickStorage);
    };

    var getClickMetasBySelector = function getClickMetasBySelector(selector) {
      var metas = clickStorage[selector];

      if (!metas) {
        return {};
      }

      return metasToArray(clickStorage[selector]);
    };

    return {
      storeClickMetrics: storeClickMetrics,
      getClickSelectors: getClickSelectors,
      getClickMetasBySelector: getClickMetasBySelector
    };
  });

  /*
  Copyright 2021 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var getRedirectDetails = function getRedirectDetails(redirectDecisions) {
    var decision = redirectDecisions[0];
    var items = decision.items,
        id = decision.id,
        scope = decision.scope,
        scopeDetails = decision.scopeDetails;
    var content = items[0].data.content;
    return {
      content: content,
      decisions: [{
        id: id,
        scope: scope,
        scopeDetails: scopeDetails
      }]
    };
  };

  var createRedirectHandler = (function (_ref) {
    var collect = _ref.collect,
        window = _ref.window,
        logger = _ref.logger,
        showContainers = _ref.showContainers;
    return function (redirectDecisions) {
      var _getRedirectDetails = getRedirectDetails(redirectDecisions),
          content = _getRedirectDetails.content,
          decisions = _getRedirectDetails.decisions;

      var documentMayUnload = true;
      return collect({
        decisionsMeta: decisions,
        documentMayUnload: documentMayUnload
      }).then(function () {
        window.location.replace(content);
      }).catch(function () {
        showContainers();
        logger.warn(REDIRECT_EXECUTION_ERROR);
      });
    };
  });

  var createAutorenderingHandler = (function (_ref) {
    var viewCache = _ref.viewCache,
        executeDecisions = _ref.executeDecisions,
        executeCachedViewDecisions = _ref.executeCachedViewDecisions,
        showContainers = _ref.showContainers;
    return function (_ref2) {
      var viewName = _ref2.viewName,
          pageWideScopeDecisions = _ref2.pageWideScopeDecisions,
          nonAutoRenderableDecisions = _ref2.nonAutoRenderableDecisions;

      if (viewName) {
        return viewCache.getView(viewName).then(function (currentViewDecisions) {
          executeDecisions(pageWideScopeDecisions);
          executeCachedViewDecisions({
            viewName: viewName,
            viewDecisions: currentViewDecisions
          });
          showContainers();
          return {
            decisions: _toConsumableArray(nonAutoRenderableDecisions),
            propositions: [].concat(_toConsumableArray(addRenderAttemptedToDecisions({
              decisions: [].concat(_toConsumableArray(pageWideScopeDecisions), _toConsumableArray(currentViewDecisions)),
              renderAttempted: true
            })), _toConsumableArray(addRenderAttemptedToDecisions({
              decisions: nonAutoRenderableDecisions,
              renderAttempted: false
            })))
          };
        });
      }

      executeDecisions(pageWideScopeDecisions);
      showContainers();
      return {
        decisions: _toConsumableArray(nonAutoRenderableDecisions),
        propositions: [].concat(_toConsumableArray(addRenderAttemptedToDecisions({
          decisions: pageWideScopeDecisions,
          renderAttempted: true
        })), _toConsumableArray(addRenderAttemptedToDecisions({
          decisions: nonAutoRenderableDecisions,
          renderAttempted: false
        })))
      };
    };
  });

  var getViewPropositions = function getViewPropositions(_ref) {
    var viewCache = _ref.viewCache,
        viewName = _ref.viewName,
        propositions = _ref.propositions;

    if (!viewName) {
      return propositions;
    }

    return viewCache.getView(viewName).then(function (viewPropositions) {
      return [].concat(_toConsumableArray(viewPropositions), _toConsumableArray(propositions));
    });
  };

  var buildFinalResult = function buildFinalResult(_ref2) {
    var propositions = _ref2.propositions;
    return {
      decisions: propositions,
      propositions: addRenderAttemptedToDecisions({
        decisions: propositions,
        renderAttempted: false
      })
    };
  };

  var createNonRenderingHandler = (function (_ref3) {
    var viewCache = _ref3.viewCache;
    return function (_ref4) {
      var viewName = _ref4.viewName,
          redirectDecisions = _ref4.redirectDecisions,
          pageWideScopeDecisions = _ref4.pageWideScopeDecisions,
          nonAutoRenderableDecisions = _ref4.nonAutoRenderableDecisions;
      var propositions = [].concat(_toConsumableArray(redirectDecisions), _toConsumableArray(pageWideScopeDecisions), _toConsumableArray(nonAutoRenderableDecisions));
      return Promise.resolve(propositions).then(function (items) {
        return getViewPropositions({
          viewCache: viewCache,
          viewName: viewName,
          propositions: items
        });
      }).then(function (items) {
        return buildFinalResult({
          propositions: items
        });
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createPersonalization = function createPersonalization(_ref) {
    var config = _ref.config,
        logger = _ref.logger,
        eventManager = _ref.eventManager;
    var collect = createCollect({
      eventManager: eventManager,
      mergeDecisionsMeta: mergeDecisionsMeta
    });
    var viewCollect = createViewCollect({
      eventManager: eventManager,
      mergeDecisionsMeta: mergeDecisionsMeta
    });

    var _createClickStorage = createClickStorage(),
        getClickMetasBySelector = _createClickStorage.getClickMetasBySelector,
        getClickSelectors = _createClickStorage.getClickSelectors,
        storeClickMetrics = _createClickStorage.storeClickMetrics;

    var viewCache = createViewCacheManager();
    var modules = initDomActionsModules(storeClickMetrics);
    var executeDecisions = createExecuteDecisions({
      modules: modules,
      logger: logger,
      executeActions: executeActions,
      collect: collect
    });
    var executeViewDecisions = createExecuteDecisions({
      modules: modules,
      logger: logger,
      executeActions: executeActions,
      collect: viewCollect
    });
    var handleRedirectDecisions = createRedirectHandler({
      collect: collect,
      window: window,
      logger: logger,
      showContainers: showContainers
    });
    var executeCachedViewDecisions = createExecuteCachedViewDecisions({
      viewCache: viewCache,
      executeViewDecisions: executeViewDecisions,
      collect: viewCollect
    });
    var autoRenderingHandler = createAutorenderingHandler({
      viewCache: viewCache,
      executeDecisions: executeDecisions,
      executeCachedViewDecisions: executeCachedViewDecisions,
      showContainers: showContainers
    });
    var nonRenderingHandler = createNonRenderingHandler({
      viewCache: viewCache
    });
    var responseHandler = createOnResponseHandler({
      autoRenderingHandler: autoRenderingHandler,
      nonRenderingHandler: nonRenderingHandler,
      groupDecisions: groupDecisions,
      handleRedirectDecisions: handleRedirectDecisions,
      showContainers: showContainers
    });
    var fetchDataHandler = createFetchDataHandler({
      config: config,
      responseHandler: responseHandler,
      showContainers: showContainers,
      hideContainers: hideContainers,
      mergeQuery: mergeQuery
    });
    var onClickHandler = createOnClickHandler({
      mergeDecisionsMeta: mergeDecisionsMeta,
      collectClicks: collectClicks,
      getClickSelectors: getClickSelectors,
      getClickMetasBySelector: getClickMetasBySelector
    });
    var viewChangeHandler = createViewChangeHandler({
      executeCachedViewDecisions: executeCachedViewDecisions,
      viewCache: viewCache,
      showContainers: showContainers
    });
    return createComponent$3({
      logger: logger,
      fetchDataHandler: fetchDataHandler,
      viewChangeHandler: viewChangeHandler,
      onClickHandler: onClickHandler,
      isAuthoringModeEnabled: isAuthoringModeEnabled,
      mergeQuery: mergeQuery,
      viewCache: viewCache
    });
  };

  createPersonalization.namespace = "Personalization";
  createPersonalization.configValidators = {
    prehidingStyle: boundString().nonEmpty()
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectWeb = (function (window) {
    return function (xdm) {
      var web = {
        webPageDetails: {
          URL: window.location.href || window.location
        },
        webReferrer: {
          URL: window.document.referrer
        }
      };
      deepAssign(xdm, {
        web: web
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var getScreenOrientationViaProperty = function getScreenOrientationViaProperty(window) {
    var orientation = window.screen.orientation;

    if (orientation == null || orientation.type == null) {
      return null;
    }

    var parts = orientation.type.split("-");

    if (parts.length === 0) {
      return null;
    }

    if (parts[0] !== "portrait" && parts[0] !== "landscape") {
      return null;
    }

    return parts[0];
  };

  var getScreenOrientationViaMediaQuery = function getScreenOrientationViaMediaQuery(window) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      return "portrait";
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      return "landscape";
    }

    return null;
  };

  var injectDevice = (function (window) {
    return function (xdm) {
      var _window$screen = window.screen,
          width = _window$screen.width,
          height = _window$screen.height;
      var device = {
        screenHeight: height,
        screenWidth: width
      };
      var orientation = getScreenOrientationViaProperty(window) || getScreenOrientationViaMediaQuery(window);

      if (orientation) {
        device.screenOrientation = orientation;
      }

      deepAssign(xdm, {
        device: device
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectEnvironment = (function (window) {
    return function (xdm) {
      var _window$document$docu = window.document.documentElement;
      _window$document$docu = _window$document$docu === void 0 ? {} : _window$document$docu;
      var clientWidth = _window$document$docu.clientWidth,
          clientHeight = _window$document$docu.clientHeight;
      var environment = {
        type: "browser"
      };

      if (isNumber(clientWidth) && clientWidth >= 0 && isNumber(clientHeight) && clientHeight >= 0) {
        environment.browserDetails = {
          viewportWidth: Math.round(clientWidth),
          viewportHeight: Math.round(clientHeight)
        };
      }

      deepAssign(xdm, {
        environment: environment
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectPlaceContext = (function (dateProvider) {
    return function (xdm) {
      var date = dateProvider();
      var placeContext = {
        localTime: toISOStringLocal(date),
        localTimezoneOffset: date.getTimezoneOffset()
      };
      deepAssign(xdm, {
        placeContext: placeContext
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectTimestamp = (function (dateProvider) {
    return function (xdm) {
      var timestamp = dateProvider().toISOString();
      deepAssign(xdm, {
        timestamp: timestamp
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var libraryName = "https://ns.adobe.com/experience/alloy";

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // The __VERSION__ keyword will be replace at alloy build time with the package.json version.
  // see babel-plugin-version
  var libraryVersion = "2.6.4";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var implementationDetails = (function (xdm) {
    var implementationDetails = {
      name: libraryName,
      version: libraryVersion,
      environment: "browser"
    };
    deepAssign(xdm, {
      implementationDetails: implementationDetails
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createComponent$2 = (function (config, logger, availableContexts, requiredContexts) {
    var configuredContexts = config.context;
    var contexts = flatMap(configuredContexts, function (context, i) {
      if (availableContexts[context]) {
        return [availableContexts[context]];
      }

      logger.warn("Invalid context[" + i + "]: '" + context + "' is not available.");
      return [];
    }).concat(requiredContexts);
    return {
      namespace: "Context",
      lifecycle: {
        onBeforeEvent: function onBeforeEvent(_ref) {
          var event = _ref.event;
          var xdm = {};
          contexts.forEach(function (context) {
            return context(xdm);
          });
          event.mergeXdm(xdm);
        }
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var web = injectWeb(window);
  var device = injectDevice(window);
  var environment = injectEnvironment(window);
  var placeContext = injectPlaceContext(function () {
    return new Date();
  });
  var timestamp = injectTimestamp(function () {
    return new Date();
  });
  var optionalContexts = {
    web: web,
    device: device,
    environment: environment,
    placeContext: placeContext
  };
  var requiredContexts = [timestamp, implementationDetails];

  var createContext = function createContext(_ref) {
    var config = _ref.config,
        logger = _ref.logger;
    return createComponent$2(config, logger, optionalContexts, requiredContexts);
  };

  createContext.namespace = "Context";
  createContext.configValidators = {
    context: boundArrayOf(boundString()).default(Object.keys(optionalContexts))
  };

  var createComponent$1 = (function (_ref) {
    var storedConsent = _ref.storedConsent,
        taskQueue = _ref.taskQueue,
        defaultConsent = _ref.defaultConsent,
        consent = _ref.consent,
        sendSetConsentRequest = _ref.sendSetConsentRequest,
        validateSetConsentOptions = _ref.validateSetConsentOptions,
        consentHashStore = _ref.consentHashStore,
        doesIdentityCookieExist = _ref.doesIdentityCookieExist;

    var defaultConsentByPurpose = _defineProperty({}, GENERAL, defaultConsent);

    var storedConsentByPurpose = storedConsent.read();
    var identityCookieExists = doesIdentityCookieExist();
    var consentCookieExists = storedConsentByPurpose[GENERAL] !== undefined;

    if (!identityCookieExists || !consentCookieExists) {
      consentHashStore.clear();
    } // If the identity cookie is gone, remove the consent cookie because the
    // consent info is tied to the identity.


    if (!identityCookieExists) {
      storedConsent.clear();
      storedConsentByPurpose = {};
    }

    consent.initializeConsent(defaultConsentByPurpose, storedConsentByPurpose);

    var readCookieIfQueueEmpty = function readCookieIfQueueEmpty() {
      if (taskQueue.length === 0) {
        var storedConsentObject = storedConsent.read(); // Only read cookies when there are no outstanding setConsent
        // requests. This helps with race conditions.

        if (storedConsentObject[GENERAL] !== undefined) {
          consent.setConsent(storedConsentObject);
        }
      }
    };

    return {
      commands: {
        setConsent: {
          optionsValidator: validateSetConsentOptions,
          run: function run(_ref2) {
            var consentOptions = _ref2.consent,
                identityMap = _ref2.identityMap;
            consent.suspend();
            var consentHashes = consentHashStore.lookup(consentOptions);
            return taskQueue.addTask(function () {
              if (consentHashes.isNew()) {
                return sendSetConsentRequest({
                  consentOptions: consentOptions,
                  identityMap: identityMap
                });
              }

              return Promise.resolve();
            }).then(function () {
              return consentHashes.save();
            }).finally(readCookieIfQueueEmpty);
          }
        }
      },
      lifecycle: {
        // Read the cookie here too because the consent cookie may change on any request
        onResponse: readCookieIfQueueEmpty,
        // Even when we get a failure HTTP status code, the consent cookie can
        // still get updated. This could happen, for example, if the user is
        // opted out in AudienceManager, but no consent cookie exists on the
        // client. The request will be sent and the server will respond with a
        // 403 Forbidden and a consent cookie.
        onRequestFailure: readCookieIfQueueEmpty
      }
    };
  });

  var serialize = function serialize(obj) {
    if (Array.isArray(obj)) {
      return obj.map(function (i) {
        return serialize(i);
      });
    }

    if (_typeof(obj) === "object" && obj !== null) {
      return Object.keys(obj).sort().reduce(function (memo, key) {
        memo[key] = serialize(obj[key]);
        return memo;
      }, {});
    }

    return obj;
  };

  var computeConsentHash = (function (obj) {
    return crc32(JSON.stringify(serialize(obj)));
  });

  var getKey = function getKey(_ref) {
    var standard = _ref.standard,
        version = _ref.version;
    return standard + "." + version;
  };

  var createConsentHashStore = (function (_ref2) {
    var storage = _ref2.storage;
    return {
      clear: function clear() {
        storage.clear();
      },
      lookup: function lookup(consentObjects) {
        var currentHashes = {};

        var getCurrentHash = function getCurrentHash(consentObject) {
          var key = getKey(consentObject);

          consentObject.standard;
              consentObject.version;
              var rest = _objectWithoutProperties(consentObject, ["standard", "version"]);

          if (!currentHashes[key]) {
            currentHashes[key] = computeConsentHash(rest).toString();
          }

          return currentHashes[key];
        };

        return {
          isNew: function isNew() {
            return consentObjects.some(function (consentObject) {
              var key = getKey(consentObject);
              var previousHash = storage.getItem(key);
              return previousHash === null || previousHash !== getCurrentHash(consentObject);
            });
          },
          save: function save() {
            consentObjects.forEach(function (consentObject) {
              var key = getKey(consentObject);
              storage.setItem(key, getCurrentHash(consentObject));
            });
          }
        };
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createConsentRequestPayload = (function () {
    var content = {};
    var payload = createRequestPayload({
      content: content,
      addIdentity: function addIdentity(namespaceCode, identity) {
        content.identityMap = content.identityMap || {};
        content.identityMap[namespaceCode] = content.identityMap[namespaceCode] || [];
        content.identityMap[namespaceCode].push(identity);
      }
    });

    payload.setConsent = function (consent) {
      content.consent = consent;
    };

    return payload;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createConsentRequest = (function (consentRequestPayload) {
    return createRequest({
      payload: consentRequestPayload,
      getAction: function getAction() {
        return "privacy/set-consent";
      },
      getUseSendBeacon: function getUseSendBeacon() {
        return false;
      }
    });
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createStoredConsent = (function (_ref) {
    var parseConsentCookie = _ref.parseConsentCookie,
        orgId = _ref.orgId,
        cookieJar = _ref.cookieJar;
    var consentCookieName = getNamespacedCookieName(orgId, CONSENT);
    return {
      read: function read() {
        var cookieValue = cookieJar.get(consentCookieName);
        return cookieValue ? parseConsentCookie(cookieValue) : {};
      },
      clear: function clear() {
        cookieJar.remove(consentCookieName);
      }
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectSendSetConsentRequest = (function (_ref) {
    var createConsentRequestPayload = _ref.createConsentRequestPayload,
        createConsentRequest = _ref.createConsentRequest,
        sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
    return function (_ref2) {
      var consentOptions = _ref2.consentOptions,
          identityMap = _ref2.identityMap;
      var payload = createConsentRequestPayload();
      payload.setConsent(consentOptions);

      if (isObject(identityMap)) {
        Object.keys(identityMap).forEach(function (key) {
          identityMap[key].forEach(function (identity) {
            payload.addIdentity(key, identity);
          });
        });
      }

      var request = createConsentRequest(payload);
      return sendEdgeNetworkRequest({
        request: request
      }).then(function () {// Don't let response data disseminate beyond this
        // point unless necessary.
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  /**
   * Parses a consent cookie.
   * @param {string} cookieValue Must be in the format a=b;c=d
   * @returns {Object} An object where the keys are purpose names and the values
   * are the consent status for the purpose.
   */
  var parseConsentCookie = (function (cookieValue) {
    var categoryPairs = cookieValue.split(";");
    return categoryPairs.reduce(function (consentByPurpose, categoryPair) {
      var _categoryPair$split = categoryPair.split("="),
          _categoryPair$split2 = _slicedToArray(_categoryPair$split, 2),
          name = _categoryPair$split2[0],
          value = _categoryPair$split2[1];

      consentByPurpose[name] = value;
      return consentByPurpose;
    }, {});
  });

  var validateSetConsentOptions = boundObjectOf({
    consent: boundArrayOf(boundAnything()).required().nonEmpty(),
    identityMap: validateIdentityMap
  }).noUnknownFields().required();

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createPrivacy = function createPrivacy(_ref) {
    var config = _ref.config,
        consent = _ref.consent,
        sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest,
        createNamespacedStorage = _ref.createNamespacedStorage;
    var orgId = config.orgId,
        defaultConsent = config.defaultConsent;
    var storedConsent = createStoredConsent({
      parseConsentCookie: parseConsentCookie,
      orgId: orgId,
      cookieJar: reactorCookie
    });
    var taskQueue = createTaskQueue();
    var sendSetConsentRequest = injectSendSetConsentRequest({
      createConsentRequestPayload: createConsentRequestPayload,
      createConsentRequest: createConsentRequest,
      sendEdgeNetworkRequest: sendEdgeNetworkRequest
    });
    var storage = createNamespacedStorage(sanitizeOrgIdForCookieName(orgId) + ".consentHashes.");
    var consentHashStore = createConsentHashStore({
      storage: storage.persistent
    });
    var doesIdentityCookieExist = injectDoesIdentityCookieExist({
      orgId: orgId
    });
    return createComponent$1({
      storedConsent: storedConsent,
      taskQueue: taskQueue,
      defaultConsent: defaultConsent,
      consent: consent,
      sendSetConsentRequest: sendSetConsentRequest,
      validateSetConsentOptions: validateSetConsentOptions,
      consentHashStore: consentHashStore,
      doesIdentityCookieExist: doesIdentityCookieExist
    });
  };

  createPrivacy.namespace = "Privacy";

  /*
  Copyright 20219 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createEventMergeId = (function () {
    return {
      eventMergeId: v4_1()
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createComponent = (function (_ref) {
    var createEventMergeId = _ref.createEventMergeId;
    return {
      commands: {
        createEventMergeId: {
          run: createEventMergeId
        }
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createEventMerge = function createEventMerge() {
    return createComponent({
      createEventMergeId: createEventMergeId
    });
  };

  createEventMerge.namespace = "EventMerge";
  createEventMerge.configValidators = {};

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createLibraryInfo = function createLibraryInfo() {
    return {
      commands: {
        getLibraryInfo: {
          run: function run() {
            return {
              libraryInfo: {
                version: libraryVersion
              }
            };
          }
        }
      }
    };
  };

  createLibraryInfo.namespace = "LibraryInfo";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  // TODO: Figure out how sub-components will be made available/registered

  var componentCreators = [createDataCollector, createActivityCollector, createIdentity, createAudiences, createPersonalization, createContext, createPrivacy, createEventMerge, createLibraryInfo];

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var CONFIG_DOC_URI = "https://adobe.ly/2M4ErNE";

  var buildSchema = function buildSchema(coreConfigValidators, componentCreators) {
    var schema = {};
    reactorObjectAssign(schema, coreConfigValidators);
    componentCreators.forEach(function (createComponent) {
      var configValidators = createComponent.configValidators;
      reactorObjectAssign(schema, configValidators);
    });
    return schema;
  };

  var transformOptions = function transformOptions(schema, options) {
    try {
      var validator = boundObjectOf(schema).noUnknownFields().required();
      return validator(options);
    } catch (e) {
      throw new Error("Resolve these configuration problems:\n\t - " + e.message.split("\n").join("\n\t - ") + "\nFor configuration documentation see: " + CONFIG_DOC_URI);
    }
  };

  var buildAndValidateConfig = (function (_ref) {
    var options = _ref.options,
        componentCreators = _ref.componentCreators,
        coreConfigValidators = _ref.coreConfigValidators,
        createConfig = _ref.createConfig,
        logger = _ref.logger,
        setDebugEnabled = _ref.setDebugEnabled;
    var schema = buildSchema(coreConfigValidators, componentCreators);
    var config = createConfig(transformOptions(schema, options));
    setDebugEnabled(config.debugEnabled, {
      fromConfig: true
    });
    logger.logOnInstanceConfigured({
      config: config
    });
    return config;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var initializeComponents = (function (_ref) {
    var componentCreators = _ref.componentCreators,
        lifecycle = _ref.lifecycle,
        componentRegistry = _ref.componentRegistry,
        getImmediatelyAvailableTools = _ref.getImmediatelyAvailableTools;
    componentCreators.forEach(function (createComponent) {
      var namespace = createComponent.namespace; // TO-DOCUMENT: Helpers that we inject into factories.

      var tools = getImmediatelyAvailableTools(namespace);
      var component;

      try {
        component = createComponent(tools);
      } catch (error) {
        throw stackError({
          error: error,
          message: "[" + namespace + "] An error occurred during component creation."
        });
      }

      componentRegistry.register(namespace, component);
    });
    return lifecycle.onComponentsRegistered({
      lifecycle: lifecycle
    }).then(function () {
      return componentRegistry;
    });
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var createConfig = function createConfig(options) {
    return reactorObjectAssign({}, options);
  };

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var EDGE = "edge.adobedc.net";
  var ID_THIRD_PARTY = "adobedc.demdex.net";

  var EDGE_BASE_PATH = "ee";

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createCoreConfigs = (function () {
    return {
      debugEnabled: boundBoolean().default(false),
      defaultConsent: boundEnumOf(IN, OUT, PENDING).default(IN),
      edgeConfigId: boundString().unique().required(),
      edgeDomain: boundString().domain().default(EDGE),
      edgeBasePath: boundString().nonEmpty().default(EDGE_BASE_PATH),
      orgId: boundString().unique().required(),
      onBeforeEventSend: boundCallback().default(noop$1)
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectHandleError = (function (_ref) {
    var errorPrefix = _ref.errorPrefix,
        logger = _ref.logger;
    return function (error, operation) {
      var err = toError(error); // In the case of declined consent, we've opted to not reject the promise
      // returned to the customer, but instead resolve the promise with an
      // empty result object.

      if (err.code === DECLINED_CONSENT_ERROR_CODE) {
        logger.warn("The " + operation + " could not fully complete. " + err.message);
        return {};
      }

      updateErrorMessage({
        error: err,
        message: errorPrefix + " " + err.message
      });
      throw err;
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectSendFetchRequest = (function (_ref) {
    var fetch = _ref.fetch;
    return function (url, body) {
      return fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        // To set the cookie header in the request.
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        referrer: "client",
        body: body
      }).then(function (response) {
        return response.text().then(function (responseBody) {
          return {
            statusCode: response.status,
            // We expose headers through a function instead of creating an object
            // with all the headers up front largely because the native
            // request.getResponseHeader method is case-insensitive but also because it prevents
            // us from having to add header parsing logic when using XHR to make requests.
            getHeader: function getHeader(name) {
              return response.headers.get(name);
            },
            body: responseBody
          };
        });
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectSendXhrRequest = (function (_ref) {
    var XMLHttpRequest = _ref.XMLHttpRequest;
    return function (url, body) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 0) {
              reject(new Error("Request aborted."));
            } else {
              resolve({
                statusCode: request.status,
                // We expose headers through a function instead of creating an object
                // with all the headers up front because:
                // 1. It avoids having to add header parsing code to get all headers.
                // 2. The native request.getResponseHeader method is case-insensitive.
                getHeader: function getHeader(name) {
                  return request.getResponseHeader(name);
                },
                body: request.responseText
              });
            }
          }
        };

        request.onloadstart = function () {
          request.responseType = "text";
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
        request.withCredentials = true;
        request.onerror = reject;
        request.onabort = reject;
        request.send(body);
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var injectSendBeaconRequest = (function (_ref) {
    var sendBeacon = _ref.sendBeacon,
        sendFetchRequest = _ref.sendFetchRequest,
        logger = _ref.logger;
    return function (url, body) {
      var blob = new Blob([body], {
        type: "text/plain; charset=UTF-8"
      });

      if (!sendBeacon(url, blob)) {
        logger.info("Unable to use `sendBeacon`; falling back to `fetch`.");
        return sendFetchRequest(url, body);
      } // Using sendBeacon, we technically don't get a response back from
      // the server, but we'll resolve the promise with an object to maintain
      // consistency with other network strategies.


      return Promise.resolve({
        statusCode: 204,
        getHeader: function getHeader() {
          return null;
        },
        body: ""
      });
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createLogger = (function (_ref) {
    var getDebugEnabled = _ref.getDebugEnabled,
        console = _ref.console,
        getMonitors = _ref.getMonitors,
        context = _ref.context;
    var prefix = "[" + context.instanceName + "]";

    if (context.componentName) {
      prefix += " [" + context.componentName + "]";
    }

    var notifyMonitors = function notifyMonitors(method, data) {
      var monitors = getMonitors();

      if (monitors.length > 0) {
        var dataWithContext = reactorObjectAssign({}, context, data);
        monitors.forEach(function (monitor) {
          if (monitor[method]) {
            monitor[method](dataWithContext);
          }
        });
      }
    };

    var log = function log(level) {
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      notifyMonitors("onBeforeLog", {
        level: level,
        arguments: rest
      });

      if (getDebugEnabled()) {
        console[level].apply(console, [prefix].concat(rest));
      }
    };

    return {
      get enabled() {
        return getMonitors().length > 0 || getDebugEnabled();
      },

      logOnInstanceCreated: function logOnInstanceCreated(data) {
        notifyMonitors("onInstanceCreated", data);
        log("info", "Instance initialized.");
      },
      logOnInstanceConfigured: function logOnInstanceConfigured(data) {
        notifyMonitors("onInstanceConfigured", data);
        log("info", "Instance configured. Computed configuration:", data.config);
      },
      logOnBeforeCommand: function logOnBeforeCommand(data) {
        notifyMonitors("onBeforeCommand", data);
        log("info", "Executing " + data.commandName + " command. Options:", data.options);
      },
      logOnCommandResolved: function logOnCommandResolved(data) {
        notifyMonitors("onCommandResolved", data);
        log("info", data.commandName + " command resolved. Result:", data.result);
      },
      logOnCommandRejected: function logOnCommandRejected(data) {
        notifyMonitors("onCommandRejected", data);
        log("error", data.commandName + " command was rejected. Error:", data.error);
      },
      logOnBeforeNetworkRequest: function logOnBeforeNetworkRequest(data) {
        notifyMonitors("onBeforeNetworkRequest", data);
        log("info", "Request " + data.requestId + ": Sending request.", data.payload);
      },
      logOnNetworkResponse: function logOnNetworkResponse(data) {
        notifyMonitors("onNetworkResponse", data);
        var messagesSuffix = data.parsedBody || data.body ? "response body:" : "no response body.";
        log("info", "Request " + data.requestId + ": Received response with status code " + data.statusCode + " and " + messagesSuffix, data.parsedBody || data.body);
      },
      logOnNetworkError: function logOnNetworkError(data) {
        notifyMonitors("onNetworkError", data);
        log("error", "Request " + data.requestId + ": Network request failed.", data.error);
      },

      /**
       * Outputs informational message to the web console. In some
       * browsers a small "i" icon is displayed next to these items
       * in the web console's log.
       * @param {...*} arg Any argument to be logged.
       */
      info: log.bind(null, "info"),

      /**
       * Outputs a warning message to the web console.
       * @param {...*} arg Any argument to be logged.
       */
      warn: log.bind(null, "warn"),

      /**
       * Outputs an error message to the web console.
       * @param {...*} arg Any argument to be logged.
       */
      error: log.bind(null, "error")
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var EVENT_CANCELLATION_MESSAGE = "Event was canceled because the onBeforeEventSend callback returned false.";
  var createEventManager = (function (_ref) {
    var config = _ref.config,
        logger = _ref.logger,
        lifecycle = _ref.lifecycle,
        consent = _ref.consent,
        createEvent = _ref.createEvent,
        createDataCollectionRequestPayload = _ref.createDataCollectionRequestPayload,
        createDataCollectionRequest = _ref.createDataCollectionRequest,
        sendEdgeNetworkRequest = _ref.sendEdgeNetworkRequest;
    var onBeforeEventSend = config.onBeforeEventSend;
    return {
      createEvent: createEvent,

      /**
       * Sends an event. This includes running the event and payload through
       * the appropriate lifecycle hooks, sending the request to the server,
       * and handling the response.
       * @param {Object} event This will be JSON stringified and used inside
       * the request payload.
       * @param {Object} [options]
       * @param {boolean} [options.renderDecisions=false]
       * @param {Array} [options.decisionScopes]
       * This will be passed to components
       * so they can take appropriate action.
       * @returns {*}
       */
      sendEvent: function sendEvent(event) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _options$renderDecisi = options.renderDecisions,
            renderDecisions = _options$renderDecisi === void 0 ? false : _options$renderDecisi,
            decisionScopes = options.decisionScopes;
        var payload = createDataCollectionRequestPayload();
        var request = createDataCollectionRequest(payload);
        var onResponseCallbackAggregator = createCallbackAggregator();
        var onRequestFailureCallbackAggregator = createCallbackAggregator();
        return lifecycle.onBeforeEvent({
          event: event,
          renderDecisions: renderDecisions,
          decisionScopes: decisionScopes,
          onResponse: onResponseCallbackAggregator.add,
          onRequestFailure: onRequestFailureCallbackAggregator.add
        }).then(function () {
          payload.addEvent(event);
          return consent.awaitConsent();
        }).then(function () {
          try {
            // NOTE: this calls onBeforeEventSend callback (if configured)
            event.finalize(onBeforeEventSend);
          } catch (error) {
            var throwError = function throwError() {
              throw error;
            };

            onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
            return onRequestFailureCallbackAggregator.call({
              error: error
            }).then(throwError, throwError);
          } // if the callback returns false, the event should not be sent


          if (!event.shouldSend()) {
            onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
            logger.info(EVENT_CANCELLATION_MESSAGE);
            var error = new Error(EVENT_CANCELLATION_MESSAGE);
            return onRequestFailureCallbackAggregator.call({
              error: error
            }).then(function () {// Ensure the promise gets resolved with undefined instead
              // of an array of return values from the callbacks.
            });
          }

          return sendEdgeNetworkRequest({
            request: request,
            runOnResponseCallbacks: onResponseCallbackAggregator.call,
            runOnRequestFailureCallbacks: onRequestFailureCallbackAggregator.call
          });
        });
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var STATE_STORE_HANDLE_TYPE = "state:store";
  var createCookieTransfer = (function (_ref) {
    var cookieJar = _ref.cookieJar,
        orgId = _ref.orgId,
        apexDomain = _ref.apexDomain;
    return {
      /**
       * When sending to a third-party endpoint, the endpoint won't be able to
       * access first-party cookies, therefore we transfer cookies into
       * the request body so they can be read by the server.
       */
      cookiesToPayload: function cookiesToPayload(payload, endpointDomain) {
        var isEndpointFirstParty = endsWith(endpointDomain, apexDomain);
        var state = {
          domain: apexDomain,
          cookiesEnabled: true
        }; // If the endpoint is first-party, there's no need to transfer cookies
        // to the payload since they'll be automatically passed through cookie
        // headers.

        if (!isEndpointFirstParty) {
          var cookies = cookieJar.get();
          var entries = Object.keys(cookies).filter(function (name) {
            // We have a contract with the server that we will pass
            // all cookies whose names are namespaced according to the
            // logic in isNamespacedCookieName as well as any legacy
            // cookie names (so that the server can handle migrating
            // identities on websites previously using Visitor.js)
            return isNamespacedCookieName(orgId, name);
          }).map(function (qualifyingCookieName) {
            return {
              key: qualifyingCookieName,
              value: cookies[qualifyingCookieName]
            };
          });

          if (entries.length) {
            state.entries = entries;
          }
        }

        payload.mergeState(state);
      },

      /**
       * When receiving from a third-party endpoint, the endpoint won't be able to
       * write first-party cookies, therefore we write first-party cookies
       * as directed in the response body.
       */
      responseToCookies: function responseToCookies(response) {
        response.getPayloadsByType(STATE_STORE_HANDLE_TYPE).forEach(function (stateItem) {
          var options = {
            domain: apexDomain
          };

          if (stateItem.maxAge !== undefined) {
            // cookieJar expects "expires" in days
            options.expires = convertTimes(SECOND, DAY, stateItem.maxAge);
          }

          cookieJar.set(stateItem.key, stateItem.value, options);
        });
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createDataCollectionRequestPayload = (function () {
    var content = {};
    var payload = createRequestPayload({
      content: content,
      addIdentity: createAddIdentity(content)
    });

    payload.addEvent = function (event) {
      content.events = content.events || [];
      content.events.push(event);
    };

    payload.getDocumentMayUnload = function () {
      return (content.events || []).some(function (event) {
        return event.getDocumentMayUnload();
      });
    };

    return payload;
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createDataCollectionRequest = (function (dataCollectionRequestPayload) {
    var getUseSendBeacon = function getUseSendBeacon(_ref) {
      var isIdentityEstablished = _ref.isIdentityEstablished;
      // When the document may be unloading, we still hit the interact endpoint
      // using fetch if an identity has not been established. If we were instead
      // to hit the collect endpoint using sendBeacon in this case, one of three
      // things would occur:
      //
      // 1. The document ultimately isn't unloaded and Alloy receives an empty
      // response back from the collect endpoint, resulting in an error being
      // thrown by Alloy because we weren't able to establish an identity.
      // This is bad.
      // 2. The document is unloaded, but Alloy receives the empty
      // response back from the collect endpoint before navigation is completed,
      // resulting in an error being thrown by Alloy because we weren't able to
      // establish an identity. This is bad.
      // 3. The document is unloaded and Alloy does not receive the empty response
      // back from the collect endpoint before navigation is completed. No error
      // will be thrown, but no identity was established either. This is okay,
      // though no identity was established.
      //
      // By hitting the interact endpoint using fetch, one of the three things
      // would occur:
      //
      // 1. The document ultimately isn't unloaded and Alloy receives a
      // response with an identity back from the interact endpoint. No
      // error will be thrown and an identity is established. This is good.
      // 2. The document is unloaded and Alloy receives a response with an
      // identity back from the interact endpoint before navigation is completed.
      // No error will be thrown and an identity is established. This is good.
      // 3. The document is unloaded and Alloy does not receive the empty response
      // back from the collect endpoint before navigation is completed. In this
      // case, no error is thrown, but no identity was established and it's
      // more likely that the request never makes it to the server because we're
      // using fetch instead of sendBeacon.
      //
      // The second approach seemed preferable.
      return dataCollectionRequestPayload.getDocumentMayUnload() && isIdentityEstablished;
    };

    return createRequest({
      payload: dataCollectionRequestPayload,
      getAction: function getAction(_ref2) {
        var isIdentityEstablished = _ref2.isIdentityEstablished;
        return getUseSendBeacon({
          isIdentityEstablished: isIdentityEstablished
        }) ? "collect" : "interact";
      },
      getUseSendBeacon: getUseSendBeacon
    });
  });

  var apiVersion = "v1";

  var injectSendEdgeNetworkRequest = (function (_ref) {
    var config = _ref.config,
        lifecycle = _ref.lifecycle,
        cookieTransfer = _ref.cookieTransfer,
        sendNetworkRequest = _ref.sendNetworkRequest,
        createResponse = _ref.createResponse,
        processWarningsAndErrors = _ref.processWarningsAndErrors;
    var edgeDomain = config.edgeDomain,
        edgeBasePath = config.edgeBasePath,
        edgeConfigId = config.edgeConfigId;
    /**
     * Sends a network request that is aware of payload interfaces,
     * lifecycle methods, configured edge domains, response structures, etc.
     */

    return function (_ref2) {
      var request = _ref2.request,
          _ref2$runOnResponseCa = _ref2.runOnResponseCallbacks,
          runOnResponseCallbacks = _ref2$runOnResponseCa === void 0 ? noop$1 : _ref2$runOnResponseCa,
          _ref2$runOnRequestFai = _ref2.runOnRequestFailureCallbacks,
          runOnRequestFailureCallbacks = _ref2$runOnRequestFai === void 0 ? noop$1 : _ref2$runOnRequestFai;
      var onResponseCallbackAggregator = createCallbackAggregator();
      onResponseCallbackAggregator.add(lifecycle.onResponse);
      onResponseCallbackAggregator.add(runOnResponseCallbacks);
      var onRequestFailureCallbackAggregator = createCallbackAggregator();
      onRequestFailureCallbackAggregator.add(lifecycle.onRequestFailure);
      onRequestFailureCallbackAggregator.add(runOnRequestFailureCallbacks);
      return lifecycle.onBeforeRequest({
        request: request,
        onResponse: onResponseCallbackAggregator.add,
        onRequestFailure: onRequestFailureCallbackAggregator.add
      }).then(function () {
        var endpointDomain = request.getUseIdThirdPartyDomain() ? ID_THIRD_PARTY : edgeDomain;
        var url = "https://" + endpointDomain + "/" + edgeBasePath + "/" + apiVersion + "/" + request.getAction() + "?configId=" + edgeConfigId + "&requestId=" + request.getId();
        cookieTransfer.cookiesToPayload(request.getPayload(), endpointDomain);
        return sendNetworkRequest({
          requestId: request.getId(),
          url: url,
          payload: request.getPayload(),
          useSendBeacon: request.getUseSendBeacon()
        });
      }).then(function (networkResponse) {
        processWarningsAndErrors(networkResponse);
        return networkResponse;
      }).catch(function (error) {
        // Regardless of whether the network call failed, an unexpected status
        // code was returned, or the response body was malformed, we want to call
        // the onRequestFailure callbacks, but still throw the exception.
        var throwError = function throwError() {
          throw error;
        };

        return onRequestFailureCallbackAggregator.call({
          error: error
        }).then(throwError, throwError);
      }).then(function (_ref3) {
        var parsedBody = _ref3.parsedBody,
            getHeader = _ref3.getHeader;
        // Note that networkResponse.parsedBody may be undefined if it was a
        // 204 No Content response. That's fine.
        var response = createResponse({
          content: parsedBody,
          getHeader: getHeader
        });
        cookieTransfer.responseToCookies(response); // Notice we're calling the onResponse lifecycle method even if there are errors
        // inside the response body. This is because the full request didn't actually fail--
        // only portions of it that are considered non-fatal (a specific, non-critical
        // Konductor plugin, for example).

        return onResponseCallbackAggregator.call({
          response: response
        }).then(function (returnValues) {
          // Merges all returned objects from all `onResponse` callbacks into
          // a single object that can later be returned to the customer.
          var lifecycleOnResponseReturnValues = returnValues.shift() || [];
          var consumerOnResponseReturnValues = returnValues.shift() || [];
          var lifecycleOnBeforeRequestReturnValues = returnValues;
          return reactorObjectAssign.apply(void 0, [{}].concat(_toConsumableArray(lifecycleOnResponseReturnValues), _toConsumableArray(consumerOnResponseReturnValues), _toConsumableArray(lifecycleOnBeforeRequestReturnValues)));
        });
      });
    };
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var NO_CONTENT = 204;
  var TOO_MANY_REQUESTS = 429;
  var BAD_GATEWAY = 502;
  var SERVICE_UNAVAILABLE = 503;
  var GATEWAY_TIMEOUT = 504;

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var MESSAGE_PREFIX = "The server responded with a";
  var injectProcessWarningsAndErrors = (function (_ref) {
    var logger = _ref.logger;
    return function (networkResponse) {
      var statusCode = networkResponse.statusCode,
          body = networkResponse.body,
          parsedBody = networkResponse.parsedBody;

      if (statusCode < 200 || statusCode >= 300 || !parsedBody && statusCode !== NO_CONTENT || parsedBody && !Array.isArray(parsedBody.handle)) {
        var bodyToLog = parsedBody ? JSON.stringify(parsedBody, null, 2) : body;
        var messageSuffix = bodyToLog ? "response body:\n" + bodyToLog : "no response body.";
        throw new Error(MESSAGE_PREFIX + " status code " + statusCode + " and " + messageSuffix);
      }

      if (parsedBody) {
        var _parsedBody$warnings = parsedBody.warnings,
            warnings = _parsedBody$warnings === void 0 ? [] : _parsedBody$warnings,
            _parsedBody$errors = parsedBody.errors,
            errors = _parsedBody$errors === void 0 ? [] : _parsedBody$errors;
        warnings.forEach(function (warning) {
          logger.warn(MESSAGE_PREFIX + " warning:", warning);
        });
        errors.forEach(function (error) {
          logger.error(MESSAGE_PREFIX + " non-fatal error:", error);
        });
      }
    };
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var MAX_RETRIES = 3;
  var RETRYABLE_STATUS_CODES = [TOO_MANY_REQUESTS, SERVICE_UNAVAILABLE, BAD_GATEWAY, GATEWAY_TIMEOUT]; // These rules are in accordance with
  // https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses

  var isRequestRetryable = (function (_ref) {
    var response = _ref.response,
        retriesAttempted = _ref.retriesAttempted;
    return retriesAttempted < MAX_RETRIES && includes(RETRYABLE_STATUS_CODES, response.statusCode);
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */

  var FIRST_DELAY_MILLIS = 1000;
  var INCREMENTAL_DELAY_MILLIS = 1000; // When the target delay is randomized, make it within the range of this percentage above or below the target delay.

  var MAX_RANDOM_VARIANCE_PERCENTAGE = 0.3;

  var calculateRetryDelay = function calculateRetryDelay(retriesAttempted) {
    var targetDelay = FIRST_DELAY_MILLIS + retriesAttempted * INCREMENTAL_DELAY_MILLIS;
    var maxVariance = targetDelay * MAX_RANDOM_VARIANCE_PERCENTAGE;
    var minDelay = targetDelay - maxVariance;
    var maxDelay = targetDelay + maxVariance;
    var randomizedDelayWithinRange = Math.round(minDelay + Math.random() * (maxDelay - minDelay));
    return randomizedDelayWithinRange;
  };

  var getDelayFromHeader = function getDelayFromHeader(response) {
    // According to the HTTP spec, if the header is defined, its value will be a string that
    // represents either:
    //  * An integer indicating the number of seconds to delay.
    //  * A date after which a retry may occur. The date would be in HTTP-date
    //    format (https://tools.ietf.org/html/rfc7231#section-7.1.1.1). When debugging, it can
    //    be helpful to know that this is the same format that a JavaScript date's
    //    toGMTString() returns.
    var headerValue = response.getHeader(RETRY_AFTER);
    var delayInMillis;

    if (headerValue) {
      var headerValueInt = parseInt(headerValue, 10);

      if (isInteger(headerValueInt)) {
        delayInMillis = headerValueInt * 1000;
      } else {
        delayInMillis = Math.max(0, new Date(headerValue).getTime() - new Date().getTime());
      }
    }

    return delayInMillis;
  }; // These rules are in accordance with
  // https://git.corp.adobe.com/pages/experience-edge/konductor/#/apis/errors?id=handling-4xx-and-5xx-responses
  // For retry delays that don't come from a Retry-After response header, we try to stick with the following best
  // practices outlined in https://docs.microsoft.com/en-us/azure/architecture/best-practices/transient-faults:
  //  * Incremental retry
  //  * Random interval


  var getRequestRetryDelay = (function (_ref) {
    var response = _ref.response,
        retriesAttempted = _ref.retriesAttempted;
    // Technically, only 429 or 503 responses should have a Retry-After header, but we'll respect the
    // header if we find it on any response.
    var delayInMillis = getDelayFromHeader(response); // Note that the value of delay may be 0 at this point, which would be a valid delay we want to use
    // and not override, which is why we don't do:
    // if (!delay) { ... }

    if (delayInMillis === undefined) {
      delayInMillis = calculateRetryDelay(retriesAttempted);
    }

    return delayInMillis;
  });

  /*
  Copyright 2019 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  var createNamespacedStorage = injectStorage(window);
  var _window = window,
      console$1 = _window.console,
      fetch = _window.fetch,
      navigator = _window.navigator,
      XMLHttpRequest = _window.XMLHttpRequest; // set this up as a function so that monitors can be added at anytime
  // eslint-disable-next-line no-underscore-dangle

  var getMonitors = function getMonitors() {
    return window.__alloyMonitors || [];
  };

  var coreConfigValidators = createCoreConfigs();
  var apexDomain = getApexDomain(window, reactorCookie);
  var sendFetchRequest = isFunction(fetch) ? injectSendFetchRequest({
    fetch: fetch
  }) : injectSendXhrRequest({
    XMLHttpRequest: XMLHttpRequest
  });
  var createExecuteCommand = function createExecuteCommand(_ref) {
    var instanceName = _ref.instanceName,
        _ref$logController = _ref.logController,
        setDebugEnabled = _ref$logController.setDebugEnabled,
        logger = _ref$logController.logger,
        createComponentLogger = _ref$logController.createComponentLogger;
    var componentRegistry = createComponentRegistry();
    var lifecycle = createLifecycle(componentRegistry);

    var setDebugCommand = function setDebugCommand(options) {
      setDebugEnabled(options.enabled, {
        fromConfig: false
      });
    };

    var configureCommand = function configureCommand(options) {
      var config = buildAndValidateConfig({
        options: options,
        componentCreators: componentCreators,
        coreConfigValidators: coreConfigValidators,
        createConfig: createConfig,
        logger: logger,
        setDebugEnabled: setDebugEnabled
      });
      var cookieTransfer = createCookieTransfer({
        cookieJar: reactorCookie,
        orgId: config.orgId,
        apexDomain: apexDomain
      });
      var sendBeaconRequest = isFunction(navigator.sendBeacon) ? injectSendBeaconRequest({
        // Without the bind(), the browser will complain about an
        // illegal invocation.
        sendBeacon: navigator.sendBeacon.bind(navigator),
        sendFetchRequest: sendFetchRequest,
        logger: logger
      }) : sendFetchRequest;
      var sendNetworkRequest = injectSendNetworkRequest({
        logger: logger,
        sendFetchRequest: sendFetchRequest,
        sendBeaconRequest: sendBeaconRequest,
        isRequestRetryable: isRequestRetryable,
        getRequestRetryDelay: getRequestRetryDelay
      });
      var processWarningsAndErrors = injectProcessWarningsAndErrors({
        logger: logger
      });
      var extractEdgeInfo = injectExtractEdgeInfo({
        logger: logger
      });
      var createResponse = injectCreateResponse({
        extractEdgeInfo: extractEdgeInfo
      });
      var sendEdgeNetworkRequest = injectSendEdgeNetworkRequest({
        config: config,
        lifecycle: lifecycle,
        cookieTransfer: cookieTransfer,
        sendNetworkRequest: sendNetworkRequest,
        createResponse: createResponse,
        processWarningsAndErrors: processWarningsAndErrors
      });
      var generalConsentState = createConsentStateMachine({
        logger: logger
      });
      var consent = createConsent({
        generalConsentState: generalConsentState,
        logger: logger
      });
      var eventManager = createEventManager({
        config: config,
        logger: logger,
        lifecycle: lifecycle,
        consent: consent,
        createEvent: createEvent,
        createDataCollectionRequestPayload: createDataCollectionRequestPayload,
        createDataCollectionRequest: createDataCollectionRequest,
        sendEdgeNetworkRequest: sendEdgeNetworkRequest
      });
      return initializeComponents({
        componentCreators: componentCreators,
        lifecycle: lifecycle,
        componentRegistry: componentRegistry,
        getImmediatelyAvailableTools: function getImmediatelyAvailableTools(componentName) {
          var componentLogger = createComponentLogger(componentName);
          return {
            config: config,
            consent: consent,
            eventManager: eventManager,
            logger: componentLogger,
            lifecycle: lifecycle,
            sendEdgeNetworkRequest: sendEdgeNetworkRequest,
            handleError: injectHandleError({
              errorPrefix: "[" + instanceName + "] [" + componentName + "]",
              logger: componentLogger
            }),
            createNamespacedStorage: createNamespacedStorage
          };
        }
      });
    };

    var handleError = injectHandleError({
      errorPrefix: "[" + instanceName + "]",
      logger: logger
    });
    var executeCommand = injectExecuteCommand({
      logger: logger,
      configureCommand: configureCommand,
      setDebugCommand: setDebugCommand,
      handleError: handleError,
      validateCommandOptions: validateCommandOptions
    });
    return executeCommand;
  };
  var core = (function () {
    // eslint-disable-next-line no-underscore-dangle
    var instanceNames = window.__alloyNS;

    if (instanceNames) {
      instanceNames.forEach(function (instanceName) {
        var logController = createLogController({
          console: console$1,
          locationSearch: window.location.search,
          createLogger: createLogger,
          instanceName: instanceName,
          createNamespacedStorage: createNamespacedStorage,
          getMonitors: getMonitors
        });
        var executeCommand = createExecuteCommand({
          instanceName: instanceName,
          logController: logController
        });
        var instance = createInstanceFunction(executeCommand);
        var queue = window[instanceName].q;
        queue.push = instance;
        logController.logger.logOnInstanceCreated({
          instance: instance
        });
        queue.forEach(instance);
      });
    }
  });

  /*
  Copyright 2020 Adobe. All rights reserved.
  This file is licensed to you under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License. You may obtain a copy
  of the License at http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
  OF ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  */
  core();

}());