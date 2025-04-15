/*! Copyright 2025 Adobe
All Rights Reserved. */
import { f as fetchGraphQl, h as handleFetchError, t as transformProduct, W as WISHLIST_PAGINATION_ARGUMENTS, a as WISHLIST_FRAGMENT, s as state, g as getPersistedWishlistData, b as setPersistedWishlistData, c as transformWishlist } from "./removeProductsFromWishlist.js";
import { events } from "@dropins/tools/event-bus.js";
const GET_PRODUCT_BY_SKU = `
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
        items {
          sku
          name
          thumbnail {
            label
            url
          }
          price_range {
            minimum_price {
              regular_price {
                currency
                value
              }
              final_price {
                currency
                value
              }
              discount {
                amount_off
                percent_off
              }
            }
          }
          stock_status
          ... on SimpleProduct {
            stock_status
            options {
              uid
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              uid
              attribute_uid
              attribute_code
              values {
                uid
              }
            }
            variants {
              product {
                sku
                stock_status
              }
            }
          }
          ... on BundleProduct {
            items {
              uid
              title
              options {
                uid
                label
                quantity
              }
            }
          }
        }
      }
    }
`;
const getProductBySku = async (sku) => {
  if (!sku) {
    throw Error("Product SKU is not set");
  }
  return fetchGraphQl(GET_PRODUCT_BY_SKU, {
    variables: {
      sku
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.products) == null ? void 0 : _a.items)) {
      return null;
    }
    return transformProduct(data.products.items[0]);
  });
};
const ADD_PRODUCTS_TO_WISHLIST_MUTATION = `
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
      ${WISHLIST_PAGINATION_ARGUMENTS}
    ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
  
${WISHLIST_FRAGMENT}
`;
const addProductsToWishlist = async (items) => {
  var _a, _b;
  if (!state.authenticated) {
    const wishlist = getPersistedWishlistData();
    for (const item of items) {
      const product = await getProductBySku(item.sku);
      const skuExists = (_a = wishlist.items) == null ? void 0 : _a.some((wishlistItem) => wishlistItem.product.sku === item.sku);
      if (!skuExists) {
        let updatedWishlist = {
          id: wishlist.id,
          items: wishlist.items
        };
        updatedWishlist.items = [...updatedWishlist.items, {
          product
        }];
        setPersistedWishlistData(updatedWishlist);
        events.emit("wishlist/data", updatedWishlist);
        events.emit("wishlist/update", {
          action: "add",
          item: updatedWishlist.items[updatedWishlist.items.length - 1]
        });
      }
    }
    return null;
  }
  if (!state.wishlistId) {
    throw Error("Wishlist ID is not set");
  }
  const variables = {
    wishlistId: state.wishlistId,
    wishlistItems: items.map(({
      sku,
      parentSku,
      quantity,
      optionsUIDs,
      enteredOptions
    }) => ({
      sku,
      parent_sku: parentSku,
      quantity,
      selected_options: optionsUIDs,
      entered_options: enteredOptions
    }))
  };
  const {
    errors,
    data
  } = await fetchGraphQl(ADD_PRODUCTS_TO_WISHLIST_MUTATION, {
    variables
  });
  const _errors = [...((_b = data == null ? void 0 : data.addProductsToWishlist) == null ? void 0 : _b.user_errors) ?? [], ...errors ?? []];
  if (_errors.length > 0) return handleFetchError(_errors);
  const payload = transformWishlist(data.addProductsToWishlist.wishlist);
  events.emit("wishlist/data", payload);
  events.emit("wishlist/update", {
    action: "add",
    item: payload.items[payload.items.length - 1]
  });
  return payload;
};
export {
  addProductsToWishlist as a,
  getProductBySku as g
};
//# sourceMappingURL=addProductsToWishlist.js.map
