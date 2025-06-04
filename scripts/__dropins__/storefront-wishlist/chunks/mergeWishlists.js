/*! Copyright 2025 Adobe
All Rights Reserved. */
import { Initializer } from "@dropins/tools/lib.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, i as setPersistedWishlistData, f as fetchGraphQl, h as handleFetchError, g as getPersistedWishlistData, j as clearPersistedLocalStorage } from "./removeProductsFromWishlist.js";
const initialize = new Initializer({
  init: async (config2) => {
    const defaultConfig = {
      isGuestWishlistEnabled: false,
      ...config2
    };
    initialize.config.setConfig(defaultConfig);
    initializeWishlist().catch(console.error);
  },
  listeners: () => [events.on("authenticated", async (authenticated) => {
    if (state.authenticated && !authenticated) {
      events.emit("wishlist/reset", void 0);
    }
    if (authenticated && !state.authenticated) {
      state.authenticated = authenticated;
      const wishlist = await initializeWishlist().catch(console.error);
      if (wishlist) {
        mergeWishlists(wishlist);
      }
    }
  }, {
    eager: true
  }), events.on("wishlist/data", (payload) => {
    setPersistedWishlistData(payload);
  }), events.on("wishlist/reset", () => {
    resetWishlist().catch(console.error);
    events.emit("wishlist/data", null);
  })]
});
const config = initialize.config;
function transformStoreConfig(data) {
  if (!data) return null;
  const transformFixedProductTaxDisplaySetting = (fptDisplaySetting) => {
    switch (fptDisplaySetting) {
      case 1:
        return "INCLUDING_FPT_AND_DESCRIPTION";
      case 2:
        return "EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";
      case 3:
        return "EXCLUDING_FPT";
      default:
        return "INCLUDING_FPT_ONLY";
    }
  };
  return {
    wishlistIsEnabled: data.storeConfig.magento_wishlist_general_is_enabled,
    wishlistMultipleListIsEnabled: data.storeConfig.enable_multiple_wishlists,
    wishlistMaxNumber: data.storeConfig.maximum_number_of_wishlists,
    fixedProductTaxesEnabled: data.storeConfig.fixed_product_taxes_enable,
    fixedProductTaxesApply: data.storeConfig.fixed_product_taxes_apply_tax_to_fpt,
    fixedProductTaxesEnabledDisplayInProductLists: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_in_product_lists),
    fixedProductTaxesEnabledDisplayInSalesModules: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),
    fixedProductTaxesEnabledDisplayInProductView: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)
  };
}
function transformProduct(data) {
  var _a, _b;
  if (!data) return null;
  return {
    type: data.__typename,
    name: data.name,
    sku: data.sku,
    uid: data.uid,
    image: getImage(data),
    stockStatus: data.stock_status,
    canonicalUrl: data.canonical_url,
    urlKey: data.url_key,
    categories: (_a = data.categories) == null ? void 0 : _a.map((category) => category.name),
    prices: getPrices(data),
    productAttributes: transformProductAttributes(data),
    options: data.gift_card_options ? (_b = data.gift_card_options) == null ? void 0 : _b.map((option) => ({
      uid: option.uid,
      required: option.required,
      title: option.title
    })) : []
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
      currency: ((_c = (_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.regular_price) == null ? void 0 : _c.currency) ?? "USD",
      value: ((_f = (_e = (_d = product.price_range) == null ? void 0 : _d.minimum_price) == null ? void 0 : _e.regular_price) == null ? void 0 : _f.value) ?? 0
    },
    finalPrice: {
      currency: ((_i = (_h = (_g = product.price_range) == null ? void 0 : _g.minimum_price) == null ? void 0 : _h.final_price) == null ? void 0 : _i.currency) ?? "USD",
      value: ((_l = (_k = (_j = product.price_range) == null ? void 0 : _j.minimum_price) == null ? void 0 : _k.final_price) == null ? void 0 : _l.value) ?? 0
    },
    discount: {
      amountOff: ((_o = (_n = (_m = product.price_range) == null ? void 0 : _m.minimum_price) == null ? void 0 : _n.discount) == null ? void 0 : _o.amount_off) ?? 0,
      percentOff: ((_r = (_q = (_p = product.price_range) == null ? void 0 : _p.minimum_price) == null ? void 0 : _q.discount) == null ? void 0 : _r.percent_off) ?? 0
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
  var _a, _b, _c, _d, _e;
  if (!((_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.fixed_product_taxes)) {
    return [];
  }
  return (_e = (_d = (_c = product.price_range) == null ? void 0 : _c.minimum_price) == null ? void 0 : _d.fixed_product_taxes) == null ? void 0 : _e.map((attribute) => {
    return {
      money: {
        value: attribute.amount.value,
        currency: attribute.amount.currency
      },
      label: attribute.label
    };
  });
}
function transformWishlist(data, enteredOptions) {
  if (!data) return null;
  return {
    id: data.id,
    updated_at: data.updated_at,
    sharing_code: data.sharing_code,
    items_count: data.items_count,
    items: transformItems(data, enteredOptions ?? [])
  };
}
function transformItems(data, enteredOptions) {
  var _a, _b;
  if (!((_b = (_a = data == null ? void 0 : data.items_v2) == null ? void 0 : _a.items) == null ? void 0 : _b.length)) return [];
  return data.items_v2.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    description: item.description,
    added_at: item.added_at,
    enteredOptions,
    selectedOptions: item.configurable_options ? item.configurable_options.map((option) => ({
      value: option.value_label,
      label: option.option_label,
      uid: option.configurable_product_option_uid
    })) : [],
    product: transformProduct(item.product)
  }));
}
const STORE_CONFIG_QUERY = `
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
    fixed_product_taxes_enable
    fixed_product_taxes_apply_tax_to_fpt
    fixed_product_taxes_display_prices_in_product_lists
    fixed_product_taxes_display_prices_in_sales_modules
    fixed_product_taxes_display_prices_on_product_view_page    
  }
}
`;
const getStoreConfig = async () => {
  return fetchGraphQl(STORE_CONFIG_QUERY, {
    method: "GET",
    cache: "force-cache"
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    return transformStoreConfig(data);
  });
};
const GET_PRODUCT_BY_SKU = `
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
        items {
          __typename
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
          ... on GiftCardProduct {
            giftcard_type
            giftcard_amounts {
              uid
              website_id
              value
              attribute_id
              website_value
            }
            gift_card_options {
              title
              required
              uid
              ... on CustomizableFieldOption {
                value: value {
                  uid
                }
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
    ... on ConfigurableWishlistItem {
      configurable_options {
        option_label
        value_label
        configurable_product_option_uid
      }
      configured_variant {
        canonical_url
      }
    }
    ... on GiftCardWishlistItem {
      added_at
      description
      gift_card_options {
        amount {
          value
          currency
        }
        custom_giftcard_amount {
          value
          currency
        }
        message
        recipient_email
        recipient_name
        sender_email
        sender_name
      }
    }
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${PRODUCT_FRAGMENT}
  ${CUSTOMIZABLE_OPTIONS_FRAGMENT}
`;
const WISHLIST_FRAGMENT = `
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2 {
      items {
        ...WISHLIST_ITEM_FRAGMENT
      }
    }
  }

${WISHLIST_ITEM_FRAGMENT}
`;
const GET_WISHLISTS_QUERY = `
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${WISHLIST_FRAGMENT}
`;
const getWishlists = async () => {
  if (!state.authenticated) {
    return getPersistedWishlistData();
  }
  return fetchGraphQl(GET_WISHLISTS_QUERY).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.customer) == null ? void 0 : _a.wishlists)) {
      return null;
    }
    return data.customer.wishlists.map((wishlist) => transformWishlist(wishlist));
  });
};
const ADD_PRODUCTS_TO_WISHLIST_MUTATION = `
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
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
  var _a, _b, _c, _d, _e, _f;
  if (!items) return null;
  const wishlist = getPersistedWishlistData();
  let updatedWishlist = {
    id: (wishlist == null ? void 0 : wishlist.id) ?? "",
    updated_at: "",
    sharing_code: "",
    items_count: 0,
    items: (wishlist == null ? void 0 : wishlist.items) ?? []
  };
  for (const item of items) {
    const skuExists = (_a = wishlist.items) == null ? void 0 : _a.some((wishlistItem) => wishlistItem.product.sku === item.sku);
    if (skuExists) {
      continue;
    }
    const product = await getProductBySku(item.sku);
    if (product) {
      updatedWishlist.items = [...updatedWishlist.items, {
        quantity: item.quantity,
        selectedOptions: item.optionsUIDs ? (_b = item.optionsUIDs) == null ? void 0 : _b.map((option) => ({
          uid: option
        })) : [],
        enteredOptions: item.enteredOptions ? (_c = item.enteredOptions) == null ? void 0 : _c.map((option) => ({
          uid: option.uid,
          value: option.value
        })) : [],
        product
      }];
    }
  }
  updatedWishlist.items_count = (_d = updatedWishlist.items) == null ? void 0 : _d.length;
  events.emit("wishlist/data", updatedWishlist);
  if (state.authenticated) {
    if (!state.wishlistId) {
      events.emit("wishlist/data", wishlist);
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
    const _errors = [...((_e = data == null ? void 0 : data.addProductsToWishlist) == null ? void 0 : _e.user_errors) ?? [], ...errors ?? []];
    if (_errors.length > 0) {
      events.emit("wishlist/data", wishlist);
      return handleFetchError(_errors);
    }
    const updatedWishlist2 = transformWishlist(data.addProductsToWishlist.wishlist, ((_f = items[0]) == null ? void 0 : _f.enteredOptions) ?? []);
    events.emit("wishlist/data", updatedWishlist2);
  }
  return null;
};
const resetWishlist = () => {
  state.wishlistId = null;
  state.authenticated = false;
  return Promise.resolve(null);
};
const initializeWishlist = async () => {
  if (state.initializing) return null;
  state.initializing = true;
  if (!state.config) {
    state.config = await getStoreConfig();
  }
  const payload = state.authenticated ? await getDefaultWishlist() : await getGuestWishlist();
  events.emit("wishlist/initialized", payload);
  events.emit("wishlist/data", payload);
  state.initializing = false;
  return payload;
};
async function getDefaultWishlist() {
  const wishlists = await getWishlists();
  const wishlist = wishlists ? wishlists[0] : null;
  if (!wishlist) return null;
  state.wishlistId = wishlist.id;
  return wishlist;
}
async function getGuestWishlist() {
  try {
    return await getPersistedWishlistData();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const mergeWishlists = async (wishlist) => {
  var _a;
  if (!wishlist) {
    return null;
  }
  const guestWishlist = getPersistedWishlistData(true);
  const itemsToMerge = [];
  (_a = guestWishlist == null ? void 0 : guestWishlist.items) == null ? void 0 : _a.forEach((item) => {
    const exists = wishlist.items.some((wishlistItem) => wishlistItem.product.sku === item.product.sku);
    if (!exists) {
      item.product.quantity = 1;
      itemsToMerge.push(item.product);
    }
  });
  if (itemsToMerge.length === 0) {
    return null;
  }
  const result = await addProductsToWishlist(itemsToMerge);
  clearPersistedLocalStorage();
  return result;
};
export {
  WISHLIST_ITEM_FRAGMENT as W,
  addProductsToWishlist as a,
  WISHLIST_FRAGMENT as b,
  config as c,
  getProductBySku as d,
  getWishlists as e,
  initializeWishlist as f,
  getStoreConfig as g,
  getDefaultWishlist as h,
  initialize as i,
  getGuestWishlist as j,
  mergeWishlists as m,
  resetWishlist as r,
  transformWishlist as t
};
//# sourceMappingURL=mergeWishlists.js.map
