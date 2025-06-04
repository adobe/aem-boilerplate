/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t } from "../chunks/devtools.module.js";
import { useState, useCallback, useEffect, useMemo, Fragment } from "@dropins/tools/preact-compat.js";
import { classes, VComponent } from "@dropins/tools/lib.js";
import { IllustratedMessage, Button, Icon } from "@dropins/tools/components.js";
import { W as WishlistItem } from "../chunks/WishlistItem.js";
import { u } from "../chunks/jsxRuntime.module.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state } from "../chunks/removeProductsFromWishlist.js";
import { useText, Text } from "@dropins/tools/i18n.js";
import { Fragment as Fragment$1 } from "@dropins/tools/preact.js";
import { W as WishlistAlert } from "../chunks/WishlistAlert.js";
import { S as SvgHeart } from "../chunks/Heart.js";
import "../chunks/Trash.js";
import "@dropins/tools/fetch-graphql.js";
import "../chunks/HeartFilled.js";
var _jsxFileName$3 = "/Users/svera/Documents/repos/storefront-wishlist/src/components/EmptyWishlist/EmptyWishlist.tsx";
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
    className: classes(["wishlist-empty-wishlist", className]),
    children: u(IllustratedMessage, {
      className: classes(["wishlist-empty-wishlist__wrapper", className]),
      "data-testid": "wishlist-empty-wishlist",
      heading: labels.emptyWishlist,
      icon: u(Icon, {
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
var _jsxFileName$2 = "/Users/svera/Documents/repos/storefront-wishlist/src/containers/Wishlist/Wishlist.tsx";
const Wishlist$1 = ({
  routeEmptyWishlistCTA,
  routeToWishlist,
  moveProdToCart,
  routeProdDetailPage,
  ...props
}) => {
  const [wishlistData, setWishlistData] = t(useState(null), "wishlistData");
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
  const [wishlistAlert, setWishlistAlert] = t(useState(null), "wishlistAlert");
  const handleWishlistAlert = useCallback((payload) => {
    const {
      action,
      item
    } = payload;
    setWishlistAlert(u(WishlistAlert, {
      action,
      item
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 57,
      columnNumber: 24
    }, void 0));
  }, [routeToWishlist]);
  useEffect(() => {
    const authEvent = events.on("authenticated", handleAuthentication);
    const updateEvent = events.on("wishlist/alert", (payload) => handleWishlistAlert(payload));
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
    isLoggedIn,
    routeProdDetailPage
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 78,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/svera/Documents/repos/storefront-wishlist/src/components/Wishlist/Wishlist.tsx";
const Wishlist = ({
  className,
  wishlistData,
  wishlistAlert,
  isLoggedIn,
  moveProdToCart,
  routeEmptyWishlistCTA,
  onLoginClick,
  routeProdDetailPage = null,
  ...props
}) => {
  const [alert, setAlert] = t(useState(wishlistAlert), "alert");
  const dictionary = useText({
    wishlistHeading: "Wishlist.Wishlist.heading"
  });
  const products = t(useMemo(() => {
    var _a;
    return ((_a = wishlistData == null ? void 0 : wishlistData.items) == null ? void 0 : _a.length) > 0 ? wishlistData.items.map((item) => {
      var _a2;
      return u(WishlistItem, {
        initialData: item,
        moveProdToCart,
        routeProdDetailPage
      }, (_a2 = item.product) == null ? void 0 : _a2.sku, false, {
        fileName: _jsxFileName$1,
        lineNumber: 65,
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
  const renderAlert = t(useMemo(() => alert ? u(VComponent, {
    node: alert,
    className: "wishlist-wishlist__alert"
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 90,
    columnNumber: 9
  }, void 0) : null, [alert]), "renderAlert");
  const renderHeading = t(useMemo(() => {
    var _a;
    if (!products) return null;
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
              children: `${wishlistData == null ? void 0 : wishlistData.items_count} products`
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 113,
              columnNumber: 19
            }, void 0)]
          }, ((_a2 = wishlistData == null ? void 0 : wishlistData.id) == null ? void 0 : _a2.toString()) + index, true, {
            fileName: _jsxFileName$1,
            lineNumber: 110,
            columnNumber: 15
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 103,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 99,
      columnNumber: 7
    }, void 0);
  }, [dictionary, products, wishlistData]), "renderHeading");
  return u("div", {
    ...props,
    className: classes(["wishlist-wishlist", className]),
    children: [renderAlert, products ? u(Fragment$1, {
      children: [renderHeading, u("div", {
        className: "wishlist-wishlist__content",
        children: products
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 133,
        columnNumber: 11
      }, void 0)]
    }, void 0, true) : u("div", {
      className: classes(["wishlist-wishlist__content", "wishlist-wishlist__content--empty"]),
      children: u("div", {
        children: [u(EmptyWishlist, {
          "data-testid": "empty-wishlist",
          ctaLinkURL: routeEmptyWishlistCTA == null ? void 0 : routeEmptyWishlistCTA()
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 143,
          columnNumber: 13
        }, void 0), !isLoggedIn && u(Login, {
          onLoginClick
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 147,
          columnNumber: 29
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 142,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 136,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 128,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/svera/Documents/repos/storefront-wishlist/src/components/Login/Login.tsx";
const Login = ({
  onLoginClick
}) => {
  return u("div", {
    className: "wishlist-login__sign-in",
    children: [u("a", {
      "data-testid": "log-in-link",
      className: "wishlist-login__link",
      href: "",
      rel: "noreferrer",
      onClick: onLoginClick,
      role: "button",
      children: u(Text, {
        id: "Wishlist.Login.logIn"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0), u(Text, {
      id: "Wishlist.Login.sync"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
export {
  Wishlist$1 as Wishlist,
  Wishlist$1 as default
};
//# sourceMappingURL=Wishlist.js.map
