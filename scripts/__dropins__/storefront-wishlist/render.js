/*! Copyright 2025 Adobe
All Rights Reserved. */
(function injectCodeCustomRunTimeFunction(cssCode, options) {
  try {
    if (typeof document != "undefined") {
      const elem = document.createElement("style");
      const name = options.styleId;
      for (const attribute in options.attributes) {
        elem.setAttribute(attribute, options.attributes[attribute]);
      }
      elem.setAttribute("data-dropin", name);
      elem.appendChild(document.createTextNode(cssCode));
      const sdk = document.querySelector('style[data-dropin="sdk"]');
      if (sdk) {
        sdk.after(elem);
      } else {
        const base = document.querySelector(
          'link[rel="stylesheet"], style'
        );
        if (base) {
          base.before(elem);
        } else {
          document.head.append(elem);
        }
      }
    }
  } catch (e) {
    console.error("dropin-styles (injectCodeFunction)", e);
  }
})("/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-empty-wishlist {\n  container-type: inline-size;\n  container-name: wishlist;\n}\n\n.wishlist-empty-wishlist__wrapper .dropin-card--secondary {\n  display: grid;\n  grid-auto-rows: min-content;\n  justify-content: center;\n  text-align: center;\n  border: unset;\n}\n\n.wishlist-empty-wishlist .dropin-illustrated-message__heading {\n  font: var(--type-headline-1-font);\n}\n\n.wishlist-empty-wishlist .dropin-illustrated-message__message {\n  font: var(--type-body-1-default-font);\n}\n\n@container wishlist (width < 737px) {\n  .wishlist-empty-wishlist__wrapper .dropin-card {\n    border: unset;\n    border-style: hidden;\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-wishlist {\n  container-type: inline-size;\n  container-name: wishlist-grid;\n  max-width: inherit;\n}\n\n/* Container for the wishlist grid */\n.wishlist-wishlist__content {\n  display: grid;\n  gap: var(--spacing-medium);\n  margin: auto;\n  padding: var(--spacing-medium) 0;\n}\n\n/* Heading */\n.wishlist-wishlist__heading {\n  color: var(--color-neutral-800);\n  display: grid;\n  font: var(--type-headline-1-font);\n  letter-spacing: var(--type-headline-1-letter-spacing);\n  padding: var(--spacing-small) 0;\n  row-gap: var(--spacing-xsmall);\n}\n\n.wishlist-wishlist__heading-count {\n  color: #6D6D6D;\n  margin-left: var(--spacing-xxsmall);\n  letter-spacing: normal;\n  font: var(--type-details-caption-2-font);\n}\n\n/* Empty wishlist message */\n.wishlist-wishlist__content.wishlist-wishlist__content--empty {\n  border: var(--shape-border-width-2) solid var(--color-neutral-400);\n  border-radius: var(--shape-border-radius-2);\n  grid-template-columns: repeat(1, 1fr);\n  padding: var(--spacing-xxbig);\n}\n\n/* Extra small devices (phones, 480px and down) */\n@media only screen and (max-width: 480px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(1, 1fr);\n  }\n}\n\n@media only screen and (min-width: 480px) and (max-width: 600px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Small devices (portrait tablets and large phones, 600px and up) */\n@media only screen and (min-width: 600px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n@media only screen and (min-width: 768px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n/* Large (landscape tablets, 1024px and up) */\n@media only screen and (min-width: 1024px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n\n/* XLarge (laptops/desktops, 1366px and up) */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-product-item {\n  background-color: var(--color-neutral-50);\n  margin-bottom: var(--spacing-small)\n}\n\n.wishlist-product-item__content {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-small);\n}\n\n.wishlist-product-item__content .wishlist-product-item-image {\n  height: 100%;\n  padding: 0;\n  width: 100%;\n}\n\n.wishlist-product-item__content .wishlist-product-item__title {\n  color: var(--color-neutral-800);\n  font: var(--type-body-2-strong-font);\n  letter-spacing: var(--type-body-2-strong-letter-spacing);\n  margin: 0;\n  position: relative;\n}\n\n.wishlist-product-item-name {\n  display: block;\n}\n\n.wishlist-product-item__content .wishlist-product-item-button__remove {\n  position: absolute;\n  right: 0;\n  top: -10px;\n}\n\n.wishlist-product-item__content .wishlist-product-item-price {\n  display: inline;\n  font: var(--type-body-2-default-font);\n}\n\n.strikeout {\n  text-decoration: line-through;\n}\n\n.wishlist-product-item__content .wishlist-product-item-discounted-price {\n  display: inline;\n  margin-left: var(--spacing-xsmall);\n  color: var(--color-alert-800);\n}\n\n.wishlist-product-item-move-to-cart {\n  display: grid;\n  grid-area: product-add-to-cart;\n  justify-content: end;\n}\n\n.wishlist-product-item-tax {\n  color: var(--color-neutral-500);\n}\n\n.wishlist-product-item-tax span {\n  margin-right: var(--spacing-xsmall);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n.image-carousel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-medium);\n  padding: var(--spacing-medium);\n}\n\n.image-carousel .image-carousel-image {\n  object-fit: contain;\n  padding: var(--spacing-xxsmall) 0;\n  width: 100%;\n}\n\n.image-switcher-area {\n  margin-top: var(--spacing-small);\n  text-align: center;\n  width: 100%;\n}\n\n.image-switcher-area .image-switcher {\n  cursor: pointer;\n  border-radius: 50%;\n  display: inline-flex;\n  height: var(--spacing-xsmall);\n  margin: 0 var(--spacing-xxsmall);\n  width: var(--spacing-xsmall);\n}\n\n.image-switcher-area .image-switcher-active {\n  background-color: var(--color-neutral-900);\n  border: var(--shape-border-width-1) solid var(--color-brand-700);\n}\n\n.image-switcher-area .image-switcher-inactive {\n  background-color: var(--color-neutral-600);\n  border: var(--shape-border-width-1) solid var(--color-neutral-600);\n}\n\n/* Extra small devices (phones, 480px and down) */\n@media only screen and (max-width: 480px) {\n  .image-carousel {\n    gap: var(--spacing-xxsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 250px;\n  }\n}\n\n/* Small devices (portrait tablets and large phones, 600px and up) */\n@media only screen and (min-width: 480px) and (max-width: 600px) {\n  .image-carousel {\n    gap: var(--spacing-xsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 300px;\n  }\n}\n\n@media only screen and (min-width: 600px) {\n  .image-carousel {\n    gap: var(--spacing-xsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 300px;\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n@media only screen and (min-width: 768px) {\n  .image-carousel {\n    gap: var(--spacing-small);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 350px;\n  }\n}\n\n/* Large (landscape tablets, 1024px and up) */\n@media only screen and (min-width: 1024px) {\n  .image-carousel {\n    gap: var(--spacing-medium);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 400px;\n  }\n}\n\n/* XLarge (laptops/desktops, 1366px and up) */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/********************************************************************\n* ADOBE CONFIDENTIAL\n* __________________\n*\n*  Copyright 2024 Adobe\n*  All Rights Reserved.\n*\n* NOTICE:  All information contained herein is, and remains\n* the property of Adobe and its suppliers, if any. The intellectual\n* and technical concepts contained herein are proprietary to Adobe\n* and its suppliers and are protected by all applicable intellectual\n* property laws, including trade secret and copyright laws.\n* Dissemination of this information or reproduction of this material\n* is strictly forbidden unless prior written permission is obtained\n* from Adobe.\n*******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-login__sign-in {\n  grid-column-start: 2;\n  color: var(--color-neutral-800);\n  font: var(--type-body-1-default-font);\n  letter-spacing: var(--type-body-2-default-letter-spacing);\n  margin-top: var(--spacing-xxsmall);\n  text-align: center;\n}\n\na.wishlist-login__link {\n  font: var(--type-body-1-strong-font);\n  letter-spacing: var(--type-body-2-strong-letter-spacing);\n  margin-left: var(--spacing-xxsmall);\n  text-decoration: underline;\n  text-decoration-thickness: auto;\n  text-underline-offset: auto;\n  color: var(--color-neutral-800);\n}\n\na.wishlist-login__link:hover {\n  color: var(--color-neutral-800);\n  text-decoration: underline;\n  text-decoration-thickness: auto;\n  text-underline-offset: auto;\n}", { "styleId": "Wishlist" });
import { Render } from "@dropins/tools/lib.js";
import { t, u } from "./chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-hooks.js";
import { UIProvider } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import "@dropins/tools/preact.js";
const Wishlist = {
  EmptyWishlist: {
    heading: "Your wishlist is empty",
    message: "Add items by clicking on the heart icon.",
    cta: "Start shopping"
  },
  Wishlist: {
    heading: "Wishlist {count}"
  },
  Alert: {
    addProduct: {
      heading: "Added to wishlist",
      message: "{product} has been added to your wishlist"
    },
    removeProduct: {
      heading: "Removed from wishlist",
      message: "{product} has been removed from your wishlist"
    },
    moveToCart: {
      heading: "Moved to cart",
      message: "{product} has been moved to your cart"
    },
    viewWishlist: "View wishlist"
  },
  Login: {
    sync: " to sync your saved items across all your devices.",
    logIn: "Log in"
  }
};
const ProductItem = {
  CartActionButton: "Move To Cart",
  TrashActionButton: "Remove this product from wishlist"
};
const en_US = {
  Wishlist,
  ProductItem
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-wishlist/src/render/Provider.tsx";
const langDefinitions = {
  default: en_US
};
const Provider = ({
  children
}) => {
  const [lang, setLang] = t(useState("en_US"), "lang");
  useEffect(() => {
    const localeEvent = events.on("locale", (locale) => {
      setLang(locale);
    }, {
      eager: true
    });
    return () => {
      localeEvent == null ? void 0 : localeEvent.off();
    };
  }, []);
  return u(UIProvider, {
    lang,
    langDefinitions,
    children
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 38,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/render/render.tsx";
const render = new Render(u(Provider, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 4,
  columnNumber: 34
}, void 0));
export {
  render
};
//# sourceMappingURL=render.js.map
