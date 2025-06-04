/*! Copyright 2025 Adobe
All Rights Reserved. */
import { events } from "@dropins/tools/event-bus.js";
import { FetchGraphQL } from "@dropins/tools/fetch-graphql.js";
function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    if (cookie.trim().startsWith(`${cookieName}=`)) {
      return cookie.trim().substring(cookieName.length + 1);
    }
  }
  return null;
}
const _state = /* @__PURE__ */ (() => {
  return {
    wishlistId: null,
    authenticated: false
  };
})();
const state = new Proxy(_state, {
  set(target, key, value) {
    target[key] = value;
    if (key === "wishlistId") {
      if (value === state.wishlistId) return true;
      if (value === null) {
        document.cookie = `DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        return true;
      }
      const expires = /* @__PURE__ */ new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `DROPIN__WISHLIST__WISHLIST-ID=${value}; expires=${expires.toUTCString()}; path=/`;
    }
    return Reflect.set(target, key, value);
  },
  get(target, key) {
    if (key === "wishlistId") {
      return getCookie("DROPIN__WISHLIST__WISHLIST-ID");
    }
    return target[key];
  }
});
const WISHLIST_KEY = "DROPIN__WISHLIST__WISHLIST__DATA";
function setPersistedWishlistData(data) {
  const $storage = state.authenticated ? sessionStorage : localStorage;
  if (data) {
    try {
      $storage.setItem(WISHLIST_KEY, JSON.stringify(data));
    } catch (error) {
      if (isQuotaExceededError(error)) {
        console.error("Storage quota exceeded:", error);
      } else {
        console.error("Error saving wishlist:", error);
      }
    }
  } else {
    $storage.removeItem(WISHLIST_KEY);
  }
}
const isQuotaExceededError = (error) => {
  return error instanceof DOMException && error.name === "QuotaExceededError";
};
function getPersistedWishlistData(guest = false) {
  const $storage = state.authenticated && !guest ? sessionStorage : localStorage;
  try {
    const wishlist = $storage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : {
      id: "",
      items: []
    };
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    return {
      id: "",
      items: []
    };
  }
}
function clearPersistedLocalStorage() {
  localStorage.removeItem(WISHLIST_KEY);
}
function getWishlistItemFromStorage(productSku) {
  var _a;
  const $storage = state.authenticated ? sessionStorage : localStorage;
  const wishlist = $storage.getItem(WISHLIST_KEY) ? JSON.parse($storage.getItem(WISHLIST_KEY)) : {
    items: []
  };
  return (_a = wishlist == null ? void 0 : wishlist.items) == null ? void 0 : _a.find((i) => {
    var _a2;
    return ((_a2 = i.product) == null ? void 0 : _a2.sku) === productSku;
  });
}
const {
  setEndpoint,
  setFetchGraphQlHeader,
  removeFetchGraphQlHeader,
  setFetchGraphQlHeaders,
  fetchGraphQl,
  getConfig
} = new FetchGraphQL().getMethods();
const handleFetchError = (errors) => {
  const errorMessage = errors.map((e) => e.message).join(" ");
  throw Error(errorMessage);
};
const REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION = `
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
    ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      user_errors {
        code
        message
      }
    }
  }
`;
const removeProductsFromWishlist = async (items) => {
  var _a, _b, _c;
  const wishlist = getPersistedWishlistData();
  const updatedWishlist = {
    ...wishlist,
    items: (_a = wishlist.items) == null ? void 0 : _a.filter((item) => !items.map((i) => i.product.sku).includes(item.product.sku))
  };
  updatedWishlist.items_count = (_b = updatedWishlist.items) == null ? void 0 : _b.length;
  events.emit("wishlist/data", updatedWishlist);
  if (state.authenticated) {
    if (!state.wishlistId) {
      throw Error("Wishlist ID is not set");
    }
    const itemIds = items.map((item) => item.id);
    const {
      errors,
      data
    } = await fetchGraphQl(REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION, {
      variables: {
        wishlistId: state.wishlistId,
        wishlistItemsIds: itemIds
      }
    });
    const _errors = [...((_c = data == null ? void 0 : data.removeProductsFromWishlist) == null ? void 0 : _c.user_errors) ?? [], ...errors ?? []];
    if (_errors.length > 0) {
      events.emit("wishlist/data", wishlist);
      return handleFetchError(_errors);
    }
    return null;
  }
  return null;
};
export {
  setEndpoint as a,
  setFetchGraphQlHeader as b,
  removeFetchGraphQlHeader as c,
  setFetchGraphQlHeaders as d,
  getConfig as e,
  fetchGraphQl as f,
  getPersistedWishlistData as g,
  handleFetchError as h,
  setPersistedWishlistData as i,
  clearPersistedLocalStorage as j,
  getWishlistItemFromStorage as k,
  removeProductsFromWishlist as r,
  state as s
};
//# sourceMappingURL=removeProductsFromWishlist.js.map
