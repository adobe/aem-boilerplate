/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t } from "../chunks/devtools.module.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { Icon, Button } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, g as getPersistedWishlistData, r as removeProductsFromWishlist } from "../chunks/removeProductsFromWishlist.js";
import { u } from "../chunks/jsxRuntime.module.js";
import { c as config, a as addProductsToWishlist } from "../chunks/mergeWishlists.js";
import { S as SvgHeartFilled } from "../chunks/HeartFilled.js";
import { S as SvgHeart } from "../chunks/Heart.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
import "@dropins/tools/lib.js";
var _jsxFileName = "/Users/svera/Documents/repos/storefront-wishlist/src/containers/WishlistToggle/WishlistToggle.tsx";
const WishlistToggle = ({
  product,
  iconWishlisted,
  iconToWishlist,
  size,
  variant,
  disabled,
  labelToWishlist,
  labelWishlisted,
  onClick
}) => {
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const [isWishlisted, setIsWishlisted] = t(useState(false), "isWishlisted");
  const [wishlistItem, setWishlistItem] = t(useState(null), "wishlistItem");
  const {
    isGuestWishlistEnabled
  } = config.getConfig();
  useEffect(() => {
    const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
    const handleWishlistData = () => {
      var _a;
      const updatedWishlist = getPersistedWishlistData();
      const item = (_a = updatedWishlist == null ? void 0 : updatedWishlist.items) == null ? void 0 : _a.find((item2) => item2.product.sku === product.sku);
      setWishlistItem(item ?? null);
      setIsWishlisted(!!item);
    };
    events.on("authenticated", handleAuthentication);
    events.on("wishlist/data", handleWishlistData);
  }, [product.sku]);
  const handleClick = async () => {
    if (isWishlisted) {
      await removeProductsFromWishlist([wishlistItem]);
      setIsWishlisted(false);
      events.emit("wishlist/alert", {
        action: "remove",
        item: wishlistItem
      });
    } else {
      await addProductsToWishlist([{
        sku: product.sku,
        quantity: 1
      }]);
      setIsWishlisted(true);
      events.emit("wishlist/alert", {
        action: "add",
        item: {
          product
        }
      });
    }
  };
  if (!isLoggedIn && !isGuestWishlistEnabled) {
    return null;
  }
  return u(Button, {
    active: isWishlisted,
    "data-testid": "wishlist-toggle",
    size: size ?? "medium",
    variant: variant ?? "tertiary",
    disabled,
    icon: u(Icon, {
      source: iconToWishlist ?? SvgHeart
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }, void 0),
    activeIcon: u(Icon, {
      source: iconWishlisted ?? SvgHeartFilled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 19
    }, void 0),
    onClick: onClick ?? handleClick,
    children: labelToWishlist,
    activeChildren: labelWishlisted
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 102,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistToggle,
  WishlistToggle as default
};
//# sourceMappingURL=WishlistToggle.js.map
