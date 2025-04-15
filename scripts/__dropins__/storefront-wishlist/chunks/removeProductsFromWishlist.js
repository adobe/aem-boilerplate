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
    authenticated: false,
    currentPage: 1,
    pageSize: 12
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
  if (data) {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
    } catch (error) {
      if (isQuotaExceededError(error)) {
        console.error("LocalStorage quota exceeded:", error);
      } else {
        console.error("Error saving wishlist:", error);
      }
    }
  } else {
    localStorage.removeItem(WISHLIST_KEY);
  }
}
const isQuotaExceededError = (error) => {
  return error instanceof DOMException && error.name === "QuotaExceededError";
};
function getPersistedWishlistData() {
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
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
const {
  setEndpoint,
  setFetchGraphQlHeader,
  removeFetchGraphQlHeader,
  setFetchGraphQlHeaders,
  fetchGraphQl,
  getConfig
} = new FetchGraphQL().getMethods();
function transformProduct(data) {
  var _a;
  if (!data) return null;
  return {
    name: data.name,
    sku: data.sku,
    uid: data.uid,
    image: getImage(data),
    stockStatus: data.stock_status,
    canonicalUrl: data.canonical_url,
    urlKey: data.url_key,
    categories: (_a = data.categories) == null ? void 0 : _a.map((category) => category.name),
    prices: getPrices(data),
    productAttributes: transformProductAttributes(data)
  };
}
function getImage(product) {
  var _a, _b;
  return {
    // TODO: Check if we need to use the config as is done in cart, use parent thumbnail if configured, otherwise use own variant. use the parent thumbnail as a fallback
    src: (_a = product.thumbnail) == null ? void 0 : _a.url,
    alt: (_b = product.thumbnail) == null ? void 0 : _b.label
  };
}
function getPrices(product) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  return {
    regularPrice: {
      currency: (_c = (_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.regular_price) == null ? void 0 : _c.currency,
      value: (_f = (_e = (_d = product.price_range) == null ? void 0 : _d.minimum_price) == null ? void 0 : _e.regular_price) == null ? void 0 : _f.value
    },
    finalPrice: {
      currency: (_i = (_h = (_g = product.price_range) == null ? void 0 : _g.minimum_price) == null ? void 0 : _h.final_price) == null ? void 0 : _i.currency,
      value: (_l = (_k = (_j = product.price_range) == null ? void 0 : _j.minimum_price) == null ? void 0 : _k.final_price) == null ? void 0 : _l.value
    },
    discount: {
      amountOff: (_o = (_n = (_m = product.price_range) == null ? void 0 : _m.minimum_price) == null ? void 0 : _n.discount) == null ? void 0 : _o.amount_off,
      percentOff: (_r = (_q = (_p = product.price_range) == null ? void 0 : _p.minimum_price) == null ? void 0 : _q.discount) == null ? void 0 : _r.percent_off
    },
    fixedProductTaxes: transformFixedProductTaxes(product)
  };
}
function transformProductAttributes(product) {
  var _a, _b;
  return (_b = (_a = product.custom_attributesV2) == null ? void 0 : _a.items) == null ? void 0 : _b.map((attribute) => {
    const transformedCode = attribute.code.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return {
      ...attribute,
      code: transformedCode
    };
  });
}
function transformFixedProductTaxes(product) {
  var _a, _b, _c;
  return (_c = (_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.fixed_product_taxes) == null ? void 0 : _c.map((attribute) => {
    return {
      money: {
        value: attribute.amount.value,
        currency: attribute.amount.currency
      },
      label: attribute.label
    };
  });
}
function transformWishlist(data) {
  if (!data) return null;
  return {
    id: data.id,
    updated_at: data.updated_at,
    sharing_code: data.sharing_code,
    items_count: data.items_count,
    total_pages: data.items_v2.page_info.total_pages,
    items: transformItems(data)
  };
}
function transformItems(data) {
  var _a, _b;
  if (!((_b = (_a = data == null ? void 0 : data.items_v2) == null ? void 0 : _a.items) == null ? void 0 : _b.length)) return [];
  return data.items_v2.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    description: item.description,
    added_at: item.added_at,
    product: transformProduct(item.product)
  }));
}
const handleFetchError = (errors) => {
  const errorMessage = errors.map((e) => e.message).join(" ");
  throw Error(errorMessage);
};
const PRICE_RANGE_FRAGMENT = `
  fragment PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
  }
`;
const PRODUCT_FRAGMENT = `
  fragment PRODUCT_FRAGMENT on ProductInterface {
    name
    sku
    uid
    thumbnail {
      url
      label
    }
    url_key
    categories {
      url_path
      url_key
      name
    }
    stock_status
    canonical_url
    custom_attributesV2(filters: {is_visible_on_front: true}){
      items {
        code
        ...on AttributeValue {
          value
        }
        ...on AttributeSelectedOptions {
          selected_options {
            value
            label
          }
        }
      }
    }
    price_range {
        ...PRICE_RANGE_FRAGMENT
    }
  }

${PRICE_RANGE_FRAGMENT}
`;
const CUSTOMIZABLE_OPTIONS_FRAGMENT = `
  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price{
        type
        units
        value
      }
    }
  }
`;
const WISHLIST_ITEM_FRAGMENT = `
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${PRODUCT_FRAGMENT}
  ${CUSTOMIZABLE_OPTIONS_FRAGMENT}
`;
const WISHLIST_PAGINATION_ARGUMENTS = `
    $pageSize: Int! = 4,
    $currentPage: Int! = 0,
`;
const WISHLIST_PAGINATION_VARIABLES = `
    pageSize: $pageSize,
    currentPage: $currentPage,
`;
const WISHLIST_FRAGMENT = `
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2(
      ${WISHLIST_PAGINATION_VARIABLES}
      ) {
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

${WISHLIST_ITEM_FRAGMENT}
`;
const REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION = `
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
      ${WISHLIST_PAGINATION_ARGUMENTS}
    ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
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
const removeProductsFromWishlist = async (items) => {
  var _a, _b;
  if (!state.authenticated) {
    const wishlist = getPersistedWishlistData();
    const updatedWishlist = {
      ...wishlist,
      items: (_a = wishlist.items) == null ? void 0 : _a.filter((item) => !items.map((i) => i.product.sku).includes(item.product.sku))
    };
    setPersistedWishlistData(updatedWishlist);
    events.emit("wishlist/data", updatedWishlist);
    return null;
  }
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
  const _errors = [...((_b = data == null ? void 0 : data.removeProductsFromWishlist) == null ? void 0 : _b.user_errors) ?? [], ...errors ?? []];
  if (_errors.length > 0) return handleFetchError(_errors);
  const payload = transformWishlist(data.removeProductsFromWishlist.wishlist);
  events.emit("wishlist/data", payload);
  return payload;
};
export {
  WISHLIST_PAGINATION_ARGUMENTS as W,
  WISHLIST_FRAGMENT as a,
  setPersistedWishlistData as b,
  transformWishlist as c,
  WISHLIST_PAGINATION_VARIABLES as d,
  WISHLIST_ITEM_FRAGMENT as e,
  fetchGraphQl as f,
  getPersistedWishlistData as g,
  handleFetchError as h,
  setEndpoint as i,
  setFetchGraphQlHeader as j,
  removeFetchGraphQlHeader as k,
  setFetchGraphQlHeaders as l,
  getConfig as m,
  removeProductsFromWishlist as r,
  state as s,
  transformProduct as t
};
//# sourceMappingURL=removeProductsFromWishlist.js.map
