/*! Copyright 2025 Adobe
All Rights Reserved. */
import { W as WISHLIST_ITEM_FRAGMENT, t as transformWishlist, b as WISHLIST_FRAGMENT } from "./chunks/mergeWishlists.js";
import { a, c, h, j, d, g, e, i, f, m, r } from "./chunks/mergeWishlists.js";
import { s as state, g as getPersistedWishlistData, f as fetchGraphQl, h as handleFetchError } from "./chunks/removeProductsFromWishlist.js";
import { j as j2, e as e2, k, c as c2, r as r2, a as a2, b, d as d2, i as i2 } from "./chunks/removeProductsFromWishlist.js";
import { events } from "@dropins/tools/event-bus.js";
import "@dropins/tools/lib.js";
import "@dropins/tools/fetch-graphql.js";
const GET_WISHLIST_BY_ID_QUERY = `
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
        updated_at
        sharing_code
        items_count
        items_v2 {
          items {
            ...WISHLIST_ITEM_FRAGMENT
          }
          page_info {
            page_size
            current_page
            total_pages
          }
        }
      }
    }
  }

${WISHLIST_ITEM_FRAGMENT}
`;
const getWishlistById = async (wishlistId, currentPage, pageSize) => {
  if (!state.authenticated) {
    return getPersistedWishlistData();
  }
  if (!wishlistId) {
    throw Error("Wishlist ID is not set");
  }
  return fetchGraphQl(GET_WISHLIST_BY_ID_QUERY, {
    variables: {
      wishlistId,
      currentPage,
      pageSize
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.customer) == null ? void 0 : _a.wishlist_v2)) {
      return null;
    }
    const payload = transformWishlist(data.customer.wishlist_v2);
    events.emit("wishlist/data", payload);
    return payload;
  });
};
const UPDATE_PRODUCTS_IN_WISHLIST_MUTATION = `
  mutation UPDATE_PRODUCTS_IN_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemUpdateInput!]!,
    ) {
    updateProductsInWishlist(
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
const updateProductsInWishlist = async (items) => {
  const wishlistId = state.wishlistId;
  if (!wishlistId) {
    throw Error("Wishlist ID is not set");
  }
  return fetchGraphQl(UPDATE_PRODUCTS_IN_WISHLIST_MUTATION, {
    variables: {
      wishlistId,
      wishlistItems: items.map(({
        wishlistItemId,
        quantity,
        description,
        selectedOptions: selected_options,
        enteredOptions: entered_options
      }) => ({
        wishlistItemId,
        quantity,
        description,
        selected_options,
        entered_options
      }))
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    const _errors = [...((_a = data == null ? void 0 : data.updateProductsInWishlist) == null ? void 0 : _a.user_errors) ?? [], ...errors ?? []];
    if (_errors.length > 0) return handleFetchError(_errors);
    return transformWishlist(data.updateProductsInWishlist.wishlist);
  });
};
export {
  a as addProductsToWishlist,
  j2 as clearPersistedLocalStorage,
  c as config,
  fetchGraphQl,
  e2 as getConfig,
  h as getDefaultWishlist,
  j as getGuestWishlist,
  getPersistedWishlistData,
  d as getProductBySku,
  g as getStoreConfig,
  getWishlistById,
  k as getWishlistItemFromStorage,
  e as getWishlists,
  i as initialize,
  f as initializeWishlist,
  m as mergeWishlists,
  c2 as removeFetchGraphQlHeader,
  r2 as removeProductsFromWishlist,
  r as resetWishlist,
  a2 as setEndpoint,
  b as setFetchGraphQlHeader,
  d2 as setFetchGraphQlHeaders,
  i2 as setPersistedWishlistData,
  updateProductsInWishlist
};
//# sourceMappingURL=api.js.map
