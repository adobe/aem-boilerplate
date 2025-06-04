/*! Copyright 2025 Adobe
All Rights Reserved. */
import { classes } from "@dropins/tools/lib.js";
import { Price, Button, Icon, Image } from "@dropins/tools/components.js";
import { u } from "./jsxRuntime.module.js";
import { t } from "./devtools.module.js";
import { useState } from "@dropins/tools/preact-compat.js";
import { s as state, r as removeProductsFromWishlist } from "./removeProductsFromWishlist.js";
import { events } from "@dropins/tools/event-bus.js";
import { Fragment } from "@dropins/tools/preact.js";
import { a as SvgTrash, S as SvgCart } from "./Trash.js";
import { useText } from "@dropins/tools/i18n.js";
var _jsxFileName$3 = "/Users/svera/Documents/repos/storefront-wishlist/src/components/TaxDetails/TaxDetails.tsx";
const TaxDetails = ({
  taxes,
  displayMode
}) => u(Fragment, {
  children: taxes.map((tax, index) => u("div", {
    "data-testid": `wishlist-product-item-tax-${index}`,
    className: "wishlist-product-item-tax",
    children: [u("span", {
      className: "wishlist-product-item-tax-label",
      children: tax.label
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 38,
      columnNumber: 9
    }, void 0), u(Price, {
      className: "wishlist-product-item-tax-price",
      amount: tax.money.value,
      currency: tax.money.currency
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 39,
      columnNumber: 9
    }, void 0), u("span", {
      className: "wishlist-product-item-tax-display-mode",
      children: displayMode === "INCLUDING_FPT_AND_DESCRIPTION" ? "incl." : "excl."
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 44,
      columnNumber: 9
    }, void 0)]
  }, index, true, {
    fileName: _jsxFileName$3,
    lineNumber: 33,
    columnNumber: 7
  }, void 0))
}, void 0);
var _jsxFileName$2 = "/Users/svera/Documents/repos/storefront-wishlist/src/components/ProductItem/ProductItem.tsx";
const ProductItem = ({
  className,
  item,
  onCartActionButtonClick,
  onTrashButtonClick,
  fixedProductTaxesEnabled,
  fixedProductTaxesEnabledDisplayInProductLists,
  routeProdDetailPage,
  ...props
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const labels = useText({
    cartActionBtn: "ProductItem.CartActionButton",
    trashActionBtn: "ProductItem.TrashActionButton"
  });
  const discounted = ((_c = (_b = (_a = item.product) == null ? void 0 : _a.prices) == null ? void 0 : _b.discount) == null ? void 0 : _c.amountOff) !== 0 || ((_f = (_e = (_d = item.product) == null ? void 0 : _d.prices) == null ? void 0 : _e.discount) == null ? void 0 : _f.percentOff) !== 0;
  return u("div", {
    ...props,
    className: classes(["wishlist-product-item", className]),
    children: u("div", {
      className: "wishlist-product-item__content",
      children: [u("a", {
        className: "wishlist-product-item-image",
        "data-testid": "wishlist-product-item-image",
        href: routeProdDetailPage(item.product),
        children: u(ImageCarousel, {
          images: ((_g = item.product) == null ? void 0 : _g.image) ? [item.product.image] : []
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 70,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 65,
        columnNumber: 9
      }, void 0), u("div", {
        className: "wishlist-product-item__title",
        "data-testid": "wishlist-product-item-header",
        children: [u("a", {
          className: "wishlist-product-item-name",
          "data-testid": "wishlist-product-item-name",
          href: routeProdDetailPage(item.product),
          children: (_h = item.product) == null ? void 0 : _h.name
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 78,
          columnNumber: 11
        }, void 0), u(Button, {
          "data-testid": "wishlist-product-item-remove-button",
          className: "wishlist-product-item-button__remove",
          variant: "tertiary",
          onClick: () => onTrashButtonClick == null ? void 0 : onTrashButtonClick(),
          icon: u(Icon, {
            source: SvgTrash,
            size: "24",
            stroke: "2",
            viewBox: "0 0 24 24",
            "aria-label": labels.trashActionBtn
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 92,
            columnNumber: 15
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 86,
          columnNumber: 11
        }, void 0), u(Price, {
          className: classes(["wishlist-product-item-price", discounted ? "strikeout" : ""]),
          "data-testid": "wishlist-product-item-price",
          amount: (_j = (_i = item.product) == null ? void 0 : _i.prices) == null ? void 0 : _j.regularPrice.value,
          currency: (_l = (_k = item.product) == null ? void 0 : _k.prices) == null ? void 0 : _l.regularPrice.currency
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 102,
          columnNumber: 11
        }, void 0), discounted && u(Price, {
          className: "wishlist-product-item-discounted-price",
          "data-testid": "wishlist-product-item-discounted-price",
          amount: (_n = (_m = item.product) == null ? void 0 : _m.prices) == null ? void 0 : _n.finalPrice.value,
          currency: (_p = (_o = item.product) == null ? void 0 : _o.prices) == null ? void 0 : _p.finalPrice.currency
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 113,
          columnNumber: 13
        }, void 0), fixedProductTaxesEnabled && (fixedProductTaxesEnabledDisplayInProductLists === "INCLUDING_FPT_AND_DESCRIPTION" || fixedProductTaxesEnabledDisplayInProductLists === "EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE") && ((_r = (_q = item.product) == null ? void 0 : _q.prices) == null ? void 0 : _r.fixedProductTaxes) && u(TaxDetails, {
          taxes: item.product.prices.fixedProductTaxes,
          displayMode: fixedProductTaxesEnabledDisplayInProductLists
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 127,
          columnNumber: 15
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 74,
        columnNumber: 9
      }, void 0), u(Button, {
        "data-testid": "wishlist-product-item-move-to-cart-button",
        size: "medium",
        type: "submit",
        icon: u(Icon, {
          source: SvgCart
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 138,
          columnNumber: 17
        }, void 0),
        disabled: ((_s = item.product) == null ? void 0 : _s.stockStatus) !== "IN_STOCK",
        "aria-label": labels.cartActionBtn,
        onClick: () => onCartActionButtonClick == null ? void 0 : onCartActionButtonClick(),
        children: labels.cartActionBtn
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 134,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 64,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 63,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/svera/Documents/repos/storefront-wishlist/src/components/ImageCarousel/ImageCarousel.tsx";
const ImageCarousel = ({
  className,
  children,
  images,
  ...props
}) => {
  const [carouselIndex, setCarouselIndex] = t(useState(0), "carouselIndex");
  return u(Fragment, {
    children: [u("div", {
      ...props,
      className: classes(["image-carousel", className]),
      children: u("div", {
        className: classes(["overflow-hidden relative max-w-[200px]", className]),
        children: images == null ? void 0 : images.map((image, index) => {
          return index === carouselIndex && u(Image, {
            className: "image-carousel-image",
            alt: image.alt,
            src: image.src
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 56,
            columnNumber: 19
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 46,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 45,
      columnNumber: 7
    }, void 0), (images == null ? void 0 : images.length) > 1 && u("div", {
      className: classes(["absolute", "image-switcher-area"]),
      children: images == null ? void 0 : images.map((_image, index) => {
        return u("span", {
          className: classes(["image-switcher", carouselIndex === index ? "image-switcher-active" : "image-switcher-inactive"]),
          onClick: (event) => {
            setCarouselIndex(index);
            event.stopPropagation();
          }
        }, index, false, {
          fileName: _jsxFileName$1,
          lineNumber: 72,
          columnNumber: 17
        }, void 0);
      })
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 68,
      columnNumber: 9
    }, void 0)]
  }, void 0);
};
var _jsxFileName = "/Users/svera/Documents/repos/storefront-wishlist/src/containers/WishlistItem/WishlistItem.tsx";
const WishlistItem = ({
  initialData = null,
  moveProdToCart,
  routeProdDetailPage
}) => {
  var _a, _b, _c, _d, _e;
  if (!(initialData == null ? void 0 : initialData.product)) return null;
  const removeProductFromWishlist = async (showAlert = true) => {
    try {
      await removeProductsFromWishlist([initialData]);
      console.log(`Product ${initialData.product.sku} removed from wishlist!`);
      if (showAlert) {
        events.emit("wishlist/alert", {
          action: "remove",
          item: initialData
        });
      }
      return true;
    } catch (error) {
      console.error(`Product ${initialData.product.sku} could not be removed from wishlist`, error);
      return false;
    }
  };
  const moveProductToCart = async () => {
    try {
      await moveProdToCart([{
        sku: initialData.product.sku,
        quantity: 1,
        optionsUIDs: initialData.selectedOptions.map((option) => option.uid),
        enteredOptions: initialData.enteredOptions
      }]);
      console.log(`Product ${initialData.product.sku} successfully moved to cart 🛒`);
      events.emit("wishlist/alert", {
        action: "move",
        item: initialData
      });
      return await removeProductFromWishlist(false);
    } catch (error) {
      console.error("Cart creation/update failed: ", error);
      if (error.toString().includes("You need to choose options for your item.")) {
        sessionStorage.setItem("incompleteProduct", initialData.product.sku);
        window.location.replace(routeProdDetailPage(initialData.product));
      }
      return false;
    }
  };
  return u(ProductItem, {
    item: initialData,
    onCartActionButtonClick: moveProductToCart,
    onTrashButtonClick: removeProductFromWishlist,
    fixedProductTaxesEnabled: ((_a = state.config) == null ? void 0 : _a.fixedProductTaxesEnabled) ?? false,
    fixedProductTaxesApply: ((_b = state.config) == null ? void 0 : _b.fixedProductTaxesApply) ?? false,
    fixedProductTaxesEnabledDisplayInProductLists: (_c = state.config) == null ? void 0 : _c.fixedProductTaxesEnabledDisplayInProductLists,
    fixedProductTaxesEnabledDisplayInProductView: (_d = state.config) == null ? void 0 : _d.fixedProductTaxesEnabledDisplayInProductView,
    fixedProductTaxesEnabledDisplayInSalesModules: (_e = state.config) == null ? void 0 : _e.fixedProductTaxesEnabledDisplayInSalesModules,
    routeProdDetailPage
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 107,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistItem as W
};
//# sourceMappingURL=WishlistItem.js.map
