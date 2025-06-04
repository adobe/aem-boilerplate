/*! Copyright 2025 Adobe
All Rights Reserved. */
import { Icon, InLineAlert } from "@dropins/tools/components.js";
import { u } from "./jsxRuntime.module.js";
import { S as SvgCart, a as SvgTrash } from "./Trash.js";
import { S as SvgHeartFilled } from "./HeartFilled.js";
import { useText } from "@dropins/tools/i18n.js";
var _jsxFileName = "/Users/svera/Documents/repos/storefront-wishlist/src/containers/WishlistAlert/WishlistAlert.tsx";
const WishlistAlert = ({
  action,
  item,
  routeToWishlist
}) => {
  const dictionary = useText({
    addHeading: "Wishlist.Alert.addProduct.heading",
    addMessage: "Wishlist.Alert.addProduct.message",
    removeHeading: "Wishlist.Alert.removeProduct.heading",
    removeMessage: "Wishlist.Alert.removeProduct.message",
    moveHeading: "Wishlist.Alert.moveToCart.heading",
    moveMessage: "Wishlist.Alert.moveToCart.message",
    viewWishlist: "Wishlist.Alert.viewWishlist"
  });
  if (!action || !item) {
    return null;
  }
  const heading = dictionary[`${action}Heading`];
  const message = dictionary[`${action}Message`];
  const iconMap = {
    add: SvgHeartFilled,
    remove: SvgTrash,
    move: SvgCart
  };
  const isWishlistPage = routeToWishlist ? location.href.includes(routeToWishlist) : false;
  return u(InLineAlert, {
    "data-testid": "wishlist-alert",
    heading,
    description: message.replace("{product}", item.product.name),
    type: "success",
    icon: u(Icon, {
      source: iconMap[action],
      size: "16"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 13
    }, void 0),
    actionButtonPosition: "top",
    additionalActions: !isWishlistPage && routeToWishlist ? [{
      label: dictionary.viewWishlist,
      onClick: () => {
        location.href = routeToWishlist;
      }
    }] : void 0
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistAlert as W
};
//# sourceMappingURL=WishlistAlert.js.map
