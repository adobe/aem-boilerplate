/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { lazy, Suspense, useState, useCallback as useCallback$1, useEffect, useMemo as useMemo$1, Fragment } from "@dropins/tools/preact-compat.js";
import { classes as classes$1, isNumber, VComponent } from "@dropins/tools/lib.js";
import { IllustratedMessage, Icon as Icon$1, Button, InLineAlert } from "@dropins/tools/components.js";
import { S as SvgTrash, a as SvgCart, W as WishlistItem } from "../chunks/WishlistItem.js";
import { s as state } from "../chunks/removeProductsFromWishlist.js";
import { events } from "@dropins/tools/event-bus.js";
import { g as getWishlistById } from "../chunks/getWishlistById.js";
import { useText, Text } from "@dropins/tools/i18n.js";
import { Fragment as Fragment$1 } from "@dropins/tools/preact.js";
import { a as SvgHeart, S as SvgHeartFilled } from "../chunks/HeartFilled.js";
import { useCallback, useMemo } from "@dropins/tools/preact-hooks.js";
import "@dropins/tools/fetch-graphql.js";
const SvgChevronDown = (props) => /* @__PURE__ */ React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M7.74512 9.87701L12.0001 14.132L16.2551 9.87701", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "round" }));
const ChevronDown = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SvgChevronDown
}, Symbol.toStringTag, { value: "Module" }));
var _jsxFileName$3 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/EmptyWishlist/EmptyWishlist.tsx";
const EmptyWishlist = ({
  className,
  children,
  ctaLinkURL,
  ...props
}) => {
  const labels = useText({
    emptyWishlist: "Wishlist.EmptyWishlist.heading",
    message: "Wishlist.EmptyWishlist.message",
    cta: "Wishlist.EmptyWishlist.cta"
  });
  return u("div", {
    ...props,
    className: classes$1(["wishlist-empty-wishlist", className]),
    children: u(IllustratedMessage, {
      className: classes$1(["wishlist-empty-wishlist__wrapper", className]),
      "data-testid": "wishlist-empty-wishlist",
      heading: labels.emptyWishlist,
      icon: u(Icon$1, {
        className: "wishlist-empty-wishlist__icon",
        source: SvgHeart
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 49,
        columnNumber: 15
      }, void 0),
      message: u("p", {
        children: labels.message
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 50,
        columnNumber: 18
      }, void 0),
      action: ctaLinkURL ? u(Button, {
        "data-testid": "wishlist-empty-wishlist-button",
        size: "medium",
        variant: "primary",
        type: "submit",
        href: ctaLinkURL,
        children: labels.cta
      }, "routeHome", false, {
        fileName: _jsxFileName$3,
        lineNumber: 53,
        columnNumber: 13
      }, void 0) : void 0
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 45,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$3,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const classes = (classes2) => {
  const result = classes2.reduce((result2, item) => {
    if (!item) return result2;
    if (typeof item === "string") result2 += ` ${item}`;
    if (Array.isArray(item)) {
      const [className, isActive] = item;
      if (className && isActive) {
        result2 += ` ${className}`;
      }
    }
    return result2;
  }, "");
  return result.trim();
};
const lazyIcons = {
  Add: lazy(() => __vitePreload(() => import("../chunks/Add.js"), true ? [] : void 0)),
  Bulk: lazy(() => __vitePreload(() => import("../chunks/Bulk.js"), true ? [] : void 0)),
  Burger: lazy(() => __vitePreload(() => import("../chunks/Burger.js"), true ? [] : void 0)),
  Cart: lazy(() => __vitePreload(() => import("../chunks/WishlistItem.js").then((n) => n.C), true ? [] : void 0)),
  Check: lazy(() => __vitePreload(() => import("../chunks/Check.js"), true ? [] : void 0)),
  ChevronDown: lazy(() => __vitePreload(() => Promise.resolve().then(() => ChevronDown), true ? void 0 : void 0)),
  ChevronUp: lazy(() => __vitePreload(() => import("../chunks/ChevronUp.js"), true ? [] : void 0)),
  ChevronRight: lazy(() => __vitePreload(() => import("../chunks/ChevronRight.js"), true ? [] : void 0)),
  Close: lazy(() => __vitePreload(() => import("../chunks/Close.js"), true ? [] : void 0)),
  Heart: lazy(() => __vitePreload(() => import("../chunks/HeartFilled.js").then((n) => n.H), true ? [] : void 0)),
  Minus: lazy(() => __vitePreload(() => import("../chunks/Minus.js"), true ? [] : void 0)),
  Placeholder: lazy(() => __vitePreload(() => import("../chunks/Placeholder.js"), true ? [] : void 0)),
  PlaceholderFilled: lazy(
    () => __vitePreload(() => import("../chunks/PlaceholderFilled.js"), true ? [] : void 0)
  ),
  Search: lazy(() => __vitePreload(() => import("../chunks/Search.js"), true ? [] : void 0)),
  SearchFilled: lazy(() => __vitePreload(() => import("../chunks/SearchFilled.js"), true ? [] : void 0)),
  Sort: lazy(() => __vitePreload(() => import("../chunks/Sort.js"), true ? [] : void 0)),
  Star: lazy(() => __vitePreload(() => import("../chunks/Star.js"), true ? [] : void 0)),
  View: lazy(() => __vitePreload(() => import("../chunks/View.js"), true ? [] : void 0)),
  User: lazy(() => __vitePreload(() => import("../chunks/User.js"), true ? [] : void 0)),
  Warning: lazy(() => __vitePreload(() => import("../chunks/Warning.js"), true ? [] : void 0)),
  Locker: lazy(() => __vitePreload(() => import("../chunks/Locker.js"), true ? [] : void 0)),
  Wallet: lazy(() => __vitePreload(() => import("../chunks/Wallet.js"), true ? [] : void 0)),
  Card: lazy(() => __vitePreload(() => import("../chunks/Card.js"), true ? [] : void 0)),
  Order: lazy(() => __vitePreload(() => import("../chunks/Order.js"), true ? [] : void 0)),
  Delivery: lazy(() => __vitePreload(() => import("../chunks/Delivery.js"), true ? [] : void 0)),
  OrderError: lazy(() => __vitePreload(() => import("../chunks/OrderError.js"), true ? [] : void 0)),
  OrderSuccess: lazy(() => __vitePreload(() => import("../chunks/OrderSuccess.js"), true ? [] : void 0)),
  PaymentError: lazy(() => __vitePreload(() => import("../chunks/PaymentError.js"), true ? [] : void 0)),
  CheckWithCircle: lazy(() => __vitePreload(() => import("../chunks/CheckWithCircle.js"), true ? [] : void 0)),
  WarningWithCircle: lazy(
    () => __vitePreload(() => import("../chunks/WarningWithCircle.js"), true ? [] : void 0)
  ),
  WarningFilled: lazy(() => __vitePreload(() => import("../chunks/WarningFilled.js"), true ? [] : void 0)),
  InfoFilled: lazy(() => __vitePreload(() => import("../chunks/InfoFilled.js"), true ? [] : void 0)),
  HeartFilled: lazy(() => __vitePreload(() => import("../chunks/HeartFilled.js").then((n) => n.b), true ? [] : void 0)),
  Trash: lazy(() => __vitePreload(() => import("../chunks/WishlistItem.js").then((n) => n.T), true ? [] : void 0)),
  Eye: lazy(() => __vitePreload(() => import("../chunks/Eye.js"), true ? [] : void 0)),
  EyeClose: lazy(() => __vitePreload(() => import("../chunks/EyeClose.js"), true ? [] : void 0)),
  Date: lazy(() => __vitePreload(() => import("../chunks/Date.js"), true ? [] : void 0)),
  AddressBook: lazy(() => __vitePreload(() => import("../chunks/AddressBook.js"), true ? [] : void 0)),
  EmptyBox: lazy(() => __vitePreload(() => import("../chunks/EmptyBox.js"), true ? [] : void 0)),
  Coupon: lazy(() => __vitePreload(() => import("../chunks/Coupon.js"), true ? [] : void 0)),
  Gift: lazy(() => __vitePreload(() => import("../chunks/Gift.js"), true ? [] : void 0)),
  GiftCard: lazy(() => __vitePreload(() => import("../chunks/GiftCard.js"), true ? [] : void 0))
};
function Icon({
  source: Source,
  size = "24",
  stroke = "2",
  viewBox = "0 0 24 24",
  className,
  ...props
}) {
  const LazyIcon = typeof Source === "string" ? lazyIcons[Source] : null;
  const defaultProps = {
    className: classes([
      "dropin-icon",
      `dropin-icon--shape-stroke-${stroke}`,
      className
    ]),
    width: size,
    height: size,
    viewBox
  };
  return /* @__PURE__ */ u(Suspense, { fallback: /* @__PURE__ */ u("svg", { ...props, ...defaultProps }, void 0, false, {
    fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Icon/Icon.tsx",
    lineNumber: 94,
    columnNumber: 25
  }, this), children: LazyIcon ? /* @__PURE__ */ u(LazyIcon, { ...props, ...defaultProps }, void 0, false, {
    fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Icon/Icon.tsx",
    lineNumber: 96,
    columnNumber: 9
  }, this) : (
    // @ts-ignore
    /* @__PURE__ */ u(Source, { ...props, ...defaultProps }, void 0, false, {
      fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Icon/Icon.tsx",
      lineNumber: 99,
      columnNumber: 9
    }, this)
  ) }, void 0, false, {
    fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Icon/Icon.tsx",
    lineNumber: 94,
    columnNumber: 5
  }, this);
}
const Pagination = ({
  totalPages = 10,
  currentPage = 1,
  onChange,
  className,
  ...props
}) => {
  const translations = useText({
    backwardButton: "Dropin.Pagination.backwardButton.ariaLabel",
    forwardButton: "Dropin.Pagination.forwardButton.ariaLabel"
  });
  const handleForward = useCallback(() => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    onChange == null ? void 0 : onChange(nextPage);
  }, [currentPage, onChange, totalPages]);
  const handleBackward = useCallback(() => {
    const prevPage = Math.max(currentPage - 1, 1);
    onChange == null ? void 0 : onChange(prevPage);
  }, [currentPage, onChange]);
  const handleSetPage = useCallback(
    (currentPage2) => {
      if (isNumber(currentPage2)) {
        onChange == null ? void 0 : onChange(currentPage2);
      }
    },
    [onChange]
  );
  const createPages = useCallback(
    (currentPage2, totalPages2) => {
      let pages = [];
      const addPageRange = (start, end) => {
        for (let i = start; i <= end; i++) {
          pages.push({ page: i, isActive: i === currentPage2, label: i });
        }
      };
      if (totalPages2 <= 5) {
        addPageRange(1, totalPages2);
      } else if (currentPage2 <= 2) {
        addPageRange(1, 2);
        pages.push({ page: "ellipsis", isActive: false, label: "..." });
        addPageRange(totalPages2 - 1, totalPages2);
      } else if (currentPage2 >= totalPages2 - 3) {
        addPageRange(totalPages2 - 4, totalPages2);
      } else {
        addPageRange(currentPage2 - 1, currentPage2);
        pages.push({ page: "ellipsis", isActive: false, label: "..." });
        addPageRange(totalPages2 - 1, totalPages2);
      }
      return pages;
    },
    []
  );
  const paginationList = useMemo(
    () => createPages(currentPage, totalPages),
    [createPages, currentPage, totalPages]
  );
  return /* @__PURE__ */ u("div", { ...props, className: classes$1(["dropin-pagination", className]), children: [
    /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        "data-testid": "prev-button",
        "aria-label": translations.backwardButton,
        disabled: currentPage === 1,
        onClick: handleBackward,
        className: classes$1([
          "dropin-pagination-arrow",
          "dropin-pagination-arrow--backward"
        ]),
        children: /* @__PURE__ */ u(Icon, { size: "24", source: SvgChevronDown }, void 0, false, {
          fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
          lineNumber: 102,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
        lineNumber: 91,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ u("ul", { className: "dropin-pagination_list", children: paginationList.map((item, index) => /* @__PURE__ */ u(
      "li",
      {
        "data-testid": `dropin-pagination_list-item--${item.page}`,
        className: classes$1([
          "dropin-pagination_list-item",
          `dropin-pagination_list-item--${item.page}`,
          [`dropin-pagination_list-item--active`, item.isActive]
        ]),
        children: /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            "data-testid": `set-page-button-${item.page}`,
            onClick: () => handleSetPage(item.page),
            children: item.label
          },
          void 0,
          false,
          {
            fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
            lineNumber: 115,
            columnNumber: 13
          },
          void 0
        )
      },
      `${item.page}_${index}`,
      false,
      {
        fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
        lineNumber: 106,
        columnNumber: 11
      },
      void 0
    )) }, void 0, false, {
      fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ u(
      "button",
      {
        type: "button",
        "data-testid": "next-button",
        "aria-label": translations.forwardButton,
        disabled: currentPage === totalPages,
        onClick: handleForward,
        className: classes$1([
          "dropin-pagination-arrow",
          "dropin-pagination-arrow--forward"
        ]),
        children: /* @__PURE__ */ u(Icon, { size: "24", source: SvgChevronDown }, void 0, false, {
          fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
          lineNumber: 136,
          columnNumber: 9
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
        lineNumber: 125,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/Users/rafaljanicki/www/storefront-wishlist/node_modules/@adobe/elsie/src/components/Pagination/Pagination.tsx",
    lineNumber: 90,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-wishlist/src/containers/Wishlist/Wishlist.tsx";
const Wishlist$1 = ({
  routeEmptyWishlistCTA,
  moveProdToCart,
  ...props
}) => {
  const [wishlistData, setWishlistData] = t(useState(null), "wishlistData");
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const dictionary = useText({
    addHeading: "Wishlist.Alert.addProduct.heading",
    addMessage: "Wishlist.Alert.addProduct.message",
    removeHeading: "Wishlist.Alert.removeProduct.heading",
    removeMessage: "Wishlist.Alert.removeProduct.message",
    moveHeading: "Wishlist.Alert.moveToCart.heading",
    moveMessage: "Wishlist.Alert.moveToCart.message",
    viewWishlist: "Wishlist.Alert.viewWishlist"
  });
  const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
  const [wishlistAlert, setWishlistAlert] = t(useState(null), "wishlistAlert");
  const handleWishlistAlert = useCallback$1((payload) => {
    const {
      action,
      item
    } = payload;
    const heading = dictionary[`${action}Heading`];
    const message = dictionary[`${action}Message`];
    const iconMap = {
      add: SvgHeartFilled,
      remove: SvgTrash,
      move: SvgCart
    };
    setWishlistAlert(u(InLineAlert, {
      "data-testid": "wishlist-alert",
      heading,
      description: message.replace("{product}", item.product.name),
      type: "success",
      icon: u(Icon$1, {
        source: iconMap[action],
        size: "16"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 79,
        columnNumber: 17
      }, void 0),
      actionButtonPosition: "top",
      additionalActions: [{
        label: dictionary.viewWishlist,
        onClick: () => {
        }
      }]
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 74,
      columnNumber: 9
    }, void 0));
  }, [dictionary]);
  useEffect(() => {
    const authEvent = events.on("authenticated", handleAuthentication);
    const updateEvent = events.on("wishlist/update", (payload) => handleWishlistAlert(payload));
    const dataEvent = events.on("wishlist/data", (payload) => {
      setWishlistData(payload);
    });
    return () => {
      authEvent == null ? void 0 : authEvent.off();
      dataEvent == null ? void 0 : dataEvent.off();
      updateEvent == null ? void 0 : updateEvent.off();
    };
  }, [handleWishlistAlert]);
  return u(Wishlist, {
    ...props,
    wishlistData,
    wishlistAlert,
    routeEmptyWishlistCTA,
    moveProdToCart,
    isLoggedIn
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 109,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/Wishlist/Wishlist.tsx";
const Wishlist = ({
  className,
  wishlistData,
  wishlistAlert,
  isLoggedIn,
  moveProdToCart,
  routeEmptyWishlistCTA,
  ...props
}) => {
  const [alert, setAlert] = t(useState(wishlistAlert), "alert");
  const dictionary = useText({
    wishlistHeading: "Wishlist.Wishlist.heading"
  });
  const products = t(useMemo$1(() => {
    var _a;
    return ((_a = wishlistData == null ? void 0 : wishlistData.items) == null ? void 0 : _a.length) > 0 ? wishlistData.items.map((item) => {
      var _a2;
      return u(WishlistItem, {
        initialData: item,
        moveProdToCart
      }, (_a2 = item.product) == null ? void 0 : _a2.sku, false, {
        fileName: _jsxFileName$1,
        lineNumber: 63,
        columnNumber: 11
      }, void 0);
    }) : null;
  }, [wishlistData, moveProdToCart]), "products");
  useEffect(() => {
    if (wishlistAlert) {
      setAlert(wishlistAlert);
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [wishlistAlert]);
  const renderAlert = t(useMemo$1(() => alert ? u(VComponent, {
    node: alert,
    className: "wishlist-wishlist__alert"
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 87,
    columnNumber: 9
  }, void 0) : null, [alert]), "renderAlert");
  const renderHeading = t(useMemo$1(() => {
    var _a;
    if (!products) return null;
    const itemsCount = isLoggedIn ? wishlistData == null ? void 0 : wishlistData.items_count : wishlistData.items.length;
    return u("div", {
      className: "wishlist-wishlist__heading",
      "data-testid": "wishlist-heading-wrapper",
      children: u("div", {
        className: "wishlist-wishlist__heading-text",
        "data-testid": "default-wishlist-heading",
        children: (_a = dictionary.wishlistHeading) == null ? void 0 : _a.split(" {count}").map((title, index) => {
          var _a2;
          return u(Fragment, {
            children: [title, index === 0 && u("span", {
              className: "wishlist-wishlist__heading-count",
              "data-testid": "wishlist-heading-count",
              children: `${itemsCount} products`
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 114,
              columnNumber: 19
            }, void 0)]
          }, ((_a2 = wishlistData == null ? void 0 : wishlistData.id) == null ? void 0 : _a2.toString()) + index, true, {
            fileName: _jsxFileName$1,
            lineNumber: 111,
            columnNumber: 15
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 104,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 100,
      columnNumber: 7
    }, void 0);
  }, [dictionary, products, wishlistData]), "renderHeading");
  const renderPagination = t(useMemo$1(() => {
    if (!products || !isLoggedIn || wishlistData.total_pages === 1) {
      return null;
    }
    return u(Pagination, {
      currentPage: state.currentPage || 1,
      onChange: (selectedPage) => {
        getWishlistById(state.wishlistId, selectedPage, state.pageSize || 10).then(() => {
          state.currentPage = selectedPage;
        }).catch((error) => {
          console.error("Failed to fetch wishlist data:", error);
        });
      },
      totalPages: wishlistData.total_pages
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 134,
      columnNumber: 7
    }, void 0);
  }, [products, isLoggedIn, wishlistData]), "renderPagination");
  return u("div", {
    ...props,
    className: classes$1(["wishlist-wishlist", className]),
    children: [renderAlert, products ? u(Fragment$1, {
      children: [renderHeading, renderPagination, u("div", {
        className: "wishlist-wishlist__content",
        children: products
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 157,
        columnNumber: 11
      }, void 0)]
    }, void 0, true) : u("div", {
      className: classes$1(["wishlist-wishlist__content", "wishlist-wishlist__content--empty"]),
      children: u("div", {
        children: [u(EmptyWishlist, {
          "data-testid": "empty-wishlist",
          ctaLinkURL: routeEmptyWishlistCTA == null ? void 0 : routeEmptyWishlistCTA()
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 167,
          columnNumber: 13
        }, void 0), !isLoggedIn && u(Login, {}, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 171,
          columnNumber: 29
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 166,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 160,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 151,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/components/Login/Login.tsx";
const Login = () => {
  return u("div", {
    className: "wishlist-login__sign-in",
    children: [u("a", {
      "data-testid": "log-in-link",
      className: "wishlist-login__link",
      href: "/#",
      target: "_blank",
      rel: "noreferrer",
      children: u(Text, {
        id: "Wishlist.Login.logIn"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 33,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }, void 0), u(Text, {
      id: "Wishlist.Login.sync"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
export {
  Wishlist$1 as Wishlist,
  Wishlist$1 as default
};
//# sourceMappingURL=Wishlist.js.map
