/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { Icon, Button } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, g as getPersistedWishlistData, r as removeProductsFromWishlist } from "../chunks/removeProductsFromWishlist.js";
import { S as SvgHeartFilled, a as SvgHeart } from "../chunks/HeartFilled.js";
import { a as addProductsToWishlist } from "../chunks/addProductsToWishlist.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/containers/WishlistToggle/WishlistToggle.tsx";
const WishlistToggle = ({
  isGuestWishlistEnabled = false,
  product
}) => {
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const [isWishlisted, setIsWishlisted] = t(useState(false), "isWishlisted");
  const [wishlistItem, setWishlistItem] = t(useState(null), "wishlistItem");
  useEffect(() => {
    const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
    const handleWishlistAdd = (update) => {
      if (update.action === "add" && update.item.product.sku === product.sku) {
        setWishlistItem(update.item);
        setIsWishlisted(true);
      }
    };
    const handleWishlistData = () => {
      var _a;
      const updatedWishlist = getPersistedWishlistData();
      const item = (_a = updatedWishlist == null ? void 0 : updatedWishlist.items) == null ? void 0 : _a.find((item2) => item2.product.sku === product.sku);
      setWishlistItem(item || null);
      setIsWishlisted(!!item);
    };
    events.on("authenticated", handleAuthentication);
    events.on("wishlist/update", handleWishlistAdd);
    events.on("wishlist/data", handleWishlistData);
  }, [product.sku]);
  const handleClick = async () => {
    if (isWishlisted) {
      await removeProductsFromWishlist([wishlistItem]);
      setIsWishlisted(false);
    } else {
      await addProductsToWishlist([{
        sku: product.sku,
        quantity: 1
      }]);
    }
  };
  if (!isLoggedIn && !isGuestWishlistEnabled) {
    return null;
  }
  const icon = isWishlisted ? u("span", {
    "data-testid": "icon-filled",
    children: u(Icon, {
      source: SvgHeartFilled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 83,
    columnNumber: 5
  }, void 0) : u("span", {
    "data-testid": "icon-empty",
    children: u(Icon, {
      source: SvgHeart
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 87,
    columnNumber: 5
  }, void 0);
  return u(Button, {
    "data-testid": "wishlist-toggle",
    size: "medium",
    variant: "tertiary",
    icon,
    onClick: handleClick
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 93,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistToggle,
  WishlistToggle as default
};
//# sourceMappingURL=WishlistToggle.js.map
