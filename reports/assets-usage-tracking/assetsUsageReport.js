// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bK3wV":[function(require,module,exports) {
var _asyncToGenerator = require("@swc/helpers/_/_async_to_generator");
var _slicedToArray = require("@swc/helpers/_/_sliced_to_array");
var _tsGenerator = require("@swc/helpers/_/_ts_generator");
var defaultThumbnail = require("d01360fa9f62d42");
(0, _asyncToGenerator._)(function() {
    var mask, spinner, loadingText, queryParams, hlxUrl, pagePath, data, response, error;
    function init(data) {
        var response = data;
        var insightsContainer = document.getElementById("assets-insights");
        var assetsFlexContainer = document.querySelector(".assets-flex-container");
        var topUsage = 0;
        var topUsed = "";
        var insights = [];
        var expiredAssets = 0;
        var aboutToExpireAssets = 0;
        var tagsMisMatchedAssets = 0;
        // if pagePath is given then filter the response.payload.assetDetails into a new json object have filter out those entry which doesn't have pagePath in it
        if (pagePath) {
            document.querySelector(".assets-title").textContent = "Page Assets Usage Report";
            var filteredAssetDetails = {};
            Object.entries(response.payload.assetDetails).forEach(function(param) {
                var _param = (0, _slicedToArray._)(param, 2), urn = _param[0], asset = _param[1];
                if (asset.pagePath.includes(pagePath)) filteredAssetDetails[urn] = asset;
            });
            response.payload.assetDetails = filteredAssetDetails;
            // before page-filter add a div to return to all assets
            var allAssetsDiv = document.getElementById("all-asset-usage-report");
            allAssetsDiv.classList.add("all-asset-usage-report");
            allAssetsDiv.textContent = "< Back to site assets usage report";
            allAssetsDiv.addEventListener("click", function() {
                window.location.href = "/assetsUsageReport.html?hlxUrl=".concat(hlxUrl);
            });
            var pageFilter = document.querySelector(".page-filter");
            pageFilter.classList.remove("all");
            // get last part of the pagePath and replace - and _ with space
            var pagePathParts = pagePath.split("/");
            pageFilter.innerHTML = "<div class='title'> Page Details</div></div><div><div style='font-size: 14px; font-weight: 600' >Page Path</div><a href='".concat(hlxUrl).concat(pagePath, "' target='_blank'>").concat(pagePathParts[pagePathParts.length - 1].replace(/-/g, " ").replace(/_/g, " "), "</a></div>");
            //pageFilter.innerHTML = `<div><div style='font-size: 14px; font-weight: 600' >Page Path</div><a href='${hlxUrl}${pagePath}' target='_blank'>${hlxUrl}${pagePath}</a></div>`;
            var parentDiv = document.createElement("div");
            parentDiv.innerHTML = "<div style='font-size: 14px; font-weight: 600; padding-bottom: 4px;' >Tags</div>";
            var tagsDiv = document.createElement("div");
            tagsDiv.className = "list-tags";
            response.payload.pageDetails[pagePath].tags.forEach(function(tag) {
                var tagDiv = document.createElement("div");
                tagDiv.className = "tags";
                tagDiv.textContent = tag;
                tagsDiv.appendChild(tagDiv);
            });
            parentDiv.appendChild(tagsDiv);
            pageFilter.appendChild(parentDiv);
        }
        Object.entries(response.payload.assetDetails).forEach(function(param) {
            var _param = (0, _slicedToArray._)(param, 2), urn = _param[0], asset = _param[1];
            var assetRow = document.createElement("div");
            assetRow.className = "asset-row";
            // Define the keys to show in the UI
            var keysToShow = [
                "thumbnail",
                "title",
                "type",
                "usageCount",
                "actions"
            ];
            var url = new URL(asset.assetPath);
            var cleanUrl = "".concat(url.protocol, "//").concat(url.host).concat(url.pathname);
            // create actions array on the base of isExpired , isAboutExpired and tagsMisMatched
            asset.actions = [];
            if (asset.isExpired) {
                asset.actions.push("Error: Asset is expired");
                expiredAssets += 1;
            }
            if (asset.toBeExpired) {
                asset.actions.push("Warning: Asset is about to expire");
                aboutToExpireAssets += 1;
            }
            if (pagePath) {
                if (asset.tagsMisMatchedPages.includes(pagePath)) {
                    asset.actions.push("Compliance issue: Tags mismatched");
                    tagsMisMatchedAssets += 1;
                }
            } else if (asset.tagsMisMatchedPages.length > 0) {
                asset.actions.push("Compliance issue (".concat(asset.tagsMisMatchedPages.length, "): Tags mismatched"));
                tagsMisMatchedAssets += 1;
            }
            if (asset.actions.length === 0) asset.actions.push("No action item");
            var assetTitle = asset.metadata.repositoryMetadata ? asset.metadata.repositoryMetadata["repo:name"] : "NA";
            // Convert asset details into an array of [key, value] pairs
            var assetEntries = Object.entries({
                thumbnail: cleanUrl,
                title: assetTitle,
                type: asset.mimeType,
                usageCount: asset.pagePath.length,
                actions: asset.actions // Assuming actions is an array of action strings
            });
            // Iterate over each [key, value] pair
            assetEntries.forEach(function(param) {
                var _param = (0, _slicedToArray._)(param, 2), key = _param[0], value = _param[1];
                if (keysToShow.includes(key)) {
                    var assetData = document.createElement("div");
                    assetData.className = "asset-data";
                    if (key === "thumbnail") {
                        var img = document.createElement("img");
                        img.classList.add("thumbnail");
                        if (!asset.isExpired) {
                            img.src = value;
                            img.alt = "Thumbnail";
                        } else img.src = defaultThumbnail;
                        assetData.appendChild(img);
                    } else if (key === "actions") {
                        var ul = document.createElement("ul");
                        value.forEach(function(action) {
                            var li = document.createElement("li");
                            if (action.includes("Warning") || action.includes("Compliance")) li.classList.add("warning");
                            else if (action.includes("Error")) li.classList.add("error");
                            else li.classList.add("no-action-item");
                            li.textContent = action;
                            ul.appendChild(li);
                        });
                        assetData.classList.add("actions");
                        assetData.appendChild(ul);
                    } else assetData.textContent = value;
                    assetRow.appendChild(assetData);
                }
            });
            var detailLinkDiv = document.createElement("div");
            detailLinkDiv.classList.add("asset-detail-link", "asset-data");
            var detailLink = document.createElement("a");
            detailLink.textContent = "View Details";
            var jsonString = JSON.stringify(asset);
            var encodedJsonString = encodeURIComponent(jsonString);
            // Use URN in the query string to identify the asset in the details page
            detailLink.href = "/assetDetails.html?data=".concat(encodedJsonString, "&hlxUrl=").concat(hlxUrl);
            if (asset.pagePath.length > topUsage) {
                topUsage = asset.pagePath.length;
                topUsed = "/assetDetails.html?data=".concat(encodedJsonString, "&hlxUrl=").concat(hlxUrl);
            }
            detailLinkDiv.appendChild(detailLink);
            assetRow.appendChild(detailLinkDiv);
            assetsFlexContainer.appendChild(assetRow);
        });
        var toggleViewBtn = document.getElementById("toggleViewBtn");
        var cardViewContainer = document.querySelector(".card-view-container");
        var isListView = true;
        toggleViewBtn.addEventListener("click", function() {
            isListView = !isListView;
            toggleViewBtn.innerText = isListView ? "Card View" : "List View";
            if (!isListView) {
                toggleViewBtn.classList.remove("card-view");
                toggleViewBtn.classList.add("list-view");
            } else {
                toggleViewBtn.classList.remove("list-view");
                toggleViewBtn.classList.add("card-view");
            }
            assetsFlexContainer.style.display = isListView ? "" : "none";
            cardViewContainer.style.display = isListView ? "none" : "flex";
            if (!isListView) populateCardView();
        });
        function getActionClass(action) {
            if (action.includes("Warning") || action.includes("Compliance")) return "warning";
            else if (action.includes("Error")) return "error";
            else return "no-action-item";
        }
        function populateCardView() {
            cardViewContainer.innerHTML = ""; // Clear existing cards
            Object.entries(response.payload.assetDetails).forEach(function(param) {
                var _param = (0, _slicedToArray._)(param, 2), urn = _param[0], asset = _param[1];
                var card = document.createElement("div");
                card.className = "card";
                var jsonString = JSON.stringify(asset);
                var encodedJsonString = encodeURIComponent(jsonString);
                // Use URN in the query string to identify the asset in the details page
                var href = "/assetDetails.html?data=".concat(encodedJsonString, "&hlxUrl=").concat(hlxUrl);
                var cleanThumbnailUrl = new URL(asset.assetPath);
                var thumbnail;
                if (!asset.isExpired) thumbnail = "".concat(cleanThumbnailUrl.protocol, "//").concat(cleanThumbnailUrl.host).concat(cleanThumbnailUrl.pathname);
                else thumbnail = defaultThumbnail;
                var assetTitle = asset.metadata.repositoryMetadata ? asset.metadata.repositoryMetadata["repo:name"] : "NA";
                card.innerHTML = '\n            <img src="'.concat(thumbnail, '" alt="Thumbnail">\n            <div class="title">').concat(assetTitle, '</div>\n            <div class="usage">Usage: ').concat(asset.pagePath.length, '</div>\n            <div class="action">Actions: \n                <ul>').concat(asset.actions.map(function(action) {
                    return "<li class=".concat(getActionClass(action), ">").concat(action, "</li>");
                }).join(""), '</ul>\n            </div>\n            <div class="view-details">\n                <a href=').concat(href, ">View Details</a>\n            </div>\n        ");
                cardViewContainer.appendChild(card);
            });
        }
        // add insights to asset object
        // Create a button element
        var totalAssets = document.createElement("div");
        totalAssets.classList.add("total-assets");
        totalAssets.textContent = "Total Assets: ".concat(Object.keys(response.payload.assetDetails).length);
        insightsContainer.appendChild(totalAssets);
        Object.keys(response.payload.assetDetails).length;
        var topUsedButton = document.createElement("div");
        topUsedButton.classList.add("top-used-button", "insight-item");
        topUsedButton.textContent = "Top Used Asset";
        // Add an event listener to handle the click event
        topUsedButton.addEventListener("click", function() {
            window.location.href = topUsed; // Navigate to the top used asset page
        });
        // Append the button to the insights container or any other relevant container
        insightsContainer.appendChild(topUsedButton);
        insights.push("Expired : ".concat(expiredAssets));
        insights.push("About to Expire : ".concat(aboutToExpireAssets));
        insights.push("Non compliant : ".concat(tagsMisMatchedAssets));
        insights.forEach(function(insight) {
            var insightElement = document.createElement("div");
            insightElement.className = "insight-item";
            insightElement.innerHTML = insight;
            insightsContainer.appendChild(insightElement);
        });
        // Initialize a global object to track sorting orders
        var sortingOrders = {
            title: "ascending",
            usage: "ascending",
            expiration: "ascending"
        };
        function sortAssets(attribute) {
            console.log("Sorting by ".concat(attribute, ", current order: ").concat(sortingOrders[attribute]));
            var assetsContainer = document.querySelector(".assets-flex-container");
            var assetRows = Array.from(assetsContainer.getElementsByClassName("asset-row")).slice(1); // Exclude header row
            assetRows.sort(function(a, b) {
                var aValue, bValue;
                switch(attribute){
                    case "title":
                        aValue = a.children[1].textContent.toLowerCase();
                        bValue = b.children[1].textContent.toLowerCase();
                        break;
                    case "usage":
                        aValue = parseInt(a.children[3].textContent);
                        bValue = parseInt(b.children[3].textContent);
                        break;
                    default:
                        return 0;
                }
                return sortingOrders[attribute] === "ascending" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
            });
            sortingOrders[attribute] = sortingOrders[attribute] === "ascending" ? "descending" : "ascending";
            console.log("New order for ".concat(attribute, ": ").concat(sortingOrders[attribute]));
            // Remove existing rows and append sorted rows
            assetRows.forEach(function(row) {
                return assetsContainer.removeChild(row);
            });
            assetRows.forEach(function(row) {
                return assetsContainer.appendChild(row);
            });
        }
        // Event listeners remain the same
        document.getElementById("sortTitle").addEventListener("click", function() {
            return sortAssets("title");
        });
        document.getElementById("sortUsage").addEventListener("click", function() {
            return sortAssets("usage");
        });
    }
    return (0, _tsGenerator._)(this, function(_state) {
        switch(_state.label){
            case 0:
                // Create mask and spinner elements
                mask = document.createElement("div");
                mask.className = "mask";
                spinner = document.createElement("div");
                spinner.className = "spinner";
                mask.appendChild(spinner);
                loadingText = document.createElement("div");
                loadingText.textContent = "Generating Assets Usage Report...";
                loadingText.className = "loading-text";
                mask.appendChild(loadingText);
                document.body.appendChild(mask);
                queryParams = new URLSearchParams(window.location.search);
                hlxUrl = queryParams.get("hlxUrl");
                pagePath = queryParams.get("pagePath");
                data = {};
                _state.label = 1;
            case 1:
                _state.trys.push([
                    1,
                    4,
                    5,
                    6
                ]);
                return [
                    4,
                    fetch("https://288650-edsassettracker-stage.adobeio-static.net/api/v1/web/EDS-Asset-Tracker1/fetchList?hlxUrl=".concat(hlxUrl))
                ];
            case 2:
                response = _state.sent();
                return [
                    4,
                    response.json()
                ];
            case 3:
                data = _state.sent();
                return [
                    3,
                    6
                ];
            case 4:
                error = _state.sent();
                console.error("Failed to fetch data:", error);
                return [
                    3,
                    6
                ];
            case 5:
                // Remove the mask and spinner once data is fetched or an error occurs
                document.body.removeChild(mask);
                document.querySelector(".assets-usage-report").style.display = "block";
                return [
                    7
                ];
            case 6:
                init(data);
                return [
                    2
                ];
        }
    });
})();

},{"@swc/helpers/_/_async_to_generator":"2v77i","@swc/helpers/_/_sliced_to_array":"9i65Z","@swc/helpers/_/_ts_generator":"63w07","d01360fa9f62d42":"h0sNw"}],"9i65Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_sliced_to_array", function() {
    return _sliced_to_array;
});
parcelHelpers.export(exports, "_", function() {
    return _sliced_to_array;
});
var _arrayWithHolesJs = require("./_array_with_holes.js");
var _iterableToArrayLimitJs = require("./_iterable_to_array_limit.js");
var _nonIterableRestJs = require("./_non_iterable_rest.js");
var _unsupportedIterableToArrayJs = require("./_unsupported_iterable_to_array.js");
function _sliced_to_array(arr, i) {
    return (0, _arrayWithHolesJs._array_with_holes)(arr) || (0, _iterableToArrayLimitJs._iterable_to_array_limit)(arr, i) || (0, _unsupportedIterableToArrayJs._unsupported_iterable_to_array)(arr, i) || (0, _nonIterableRestJs._non_iterable_rest)();
}

},{"./_array_with_holes.js":"ffveC","./_iterable_to_array_limit.js":"iRn1D","./_non_iterable_rest.js":"4auKI","./_unsupported_iterable_to_array.js":"lTSlt","@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"ffveC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_array_with_holes", function() {
    return _array_with_holes;
});
parcelHelpers.export(exports, "_", function() {
    return _array_with_holes;
});
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"iRn1D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_iterable_to_array_limit", function() {
    return _iterable_to_array_limit;
});
parcelHelpers.export(exports, "_", function() {
    return _iterable_to_array_limit;
});
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"4auKI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_non_iterable_rest", function() {
    return _non_iterable_rest;
});
parcelHelpers.export(exports, "_", function() {
    return _non_iterable_rest;
});
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"lTSlt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_unsupported_iterable_to_array", function() {
    return _unsupported_iterable_to_array;
});
parcelHelpers.export(exports, "_", function() {
    return _unsupported_iterable_to_array;
});
var _arrayLikeToArrayJs = require("./_array_like_to_array.js");
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, _arrayLikeToArrayJs._array_like_to_array)(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, _arrayLikeToArrayJs._array_like_to_array)(o, minLen);
}

},{"./_array_like_to_array.js":"1bxvj","@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"1bxvj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_array_like_to_array", function() {
    return _array_like_to_array;
});
parcelHelpers.export(exports, "_", function() {
    return _array_like_to_array;
});
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"1Qt5I"}],"h0sNw":[function(require,module,exports) {
module.exports = require("c4d18a7f8563c6b").getBundleURL("1kaxW") + "no-image.b882eff5.png";

},{"c4d18a7f8563c6b":"aDiqg"}],"aDiqg":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["bK3wV"], "bK3wV", "parcelRequire189f")

//# sourceMappingURL=assetsUsageReport.js.map
