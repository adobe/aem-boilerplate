/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as R}from"@dropins/tools/lib.js";import{events as n}from"@dropins/tools/event-bus.js";import{s as r,i as A,f as I,h as g,g as T}from"./removeProductsFromWishlist.js";const S=new R({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};S.config.setConfig(t),w().catch(console.error)},listeners:()=>[n.on("authenticated",e=>{r.authenticated&&!e&&n.emit("wishlist/reset",void 0),e&&!r.authenticated&&(r.authenticated=e,w().catch(console.error))},{eager:!0}),n.on("wishlist/data",e=>{A(e)}),n.on("wishlist/reset",()=>{K().catch(console.error),n.emit("wishlist/data",null)})]}),ee=S.config;function G(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function b(e){var t;return e?{name:e.name,sku:e.sku,uid:e.uid,image:v(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(i=>i.name),prices:O(e),productAttributes:W(e)}:null}function v(e){var t,i;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(i=e.thumbnail)==null?void 0:i.label}}function O(e){var t,i,s,u,o,a,c,l,_,d,m,f,p,h,y,E,P,x;return{regularPrice:{currency:(s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency,value:(a=(o=(u=e.price_range)==null?void 0:u.minimum_price)==null?void 0:o.regular_price)==null?void 0:a.value},finalPrice:{currency:(_=(l=(c=e.price_range)==null?void 0:c.minimum_price)==null?void 0:l.final_price)==null?void 0:_.currency,value:(f=(m=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:m.final_price)==null?void 0:f.value},discount:{amountOff:(y=(h=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:h.discount)==null?void 0:y.amount_off,percentOff:(x=(P=(E=e.price_range)==null?void 0:E.minimum_price)==null?void 0:P.discount)==null?void 0:x.percent_off},fixedProductTaxes:D(e)}}function W(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const u=s.code.split("_").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ");return{...s,code:u}})}function D(e){var t,i,s;return(s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.fixed_product_taxes)==null?void 0:s.map(u=>({money:{value:u.amount.value,currency:u.amount.currency},label:u.label}))}function C(e){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:M(e)}:null}function M(e){var t,i;return(i=(t=e==null?void 0:e.items_v2)==null?void 0:t.items)!=null&&i.length?e.items_v2.items.map(s=>({id:s.id,quantity:s.quantity,description:s.description,added_at:s.added_at,product:b(s.product)})):[]}const F=`
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
`,U=async()=>I(F,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?g(e):G(t)),k=`
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
`,L=async e=>{if(!e)throw Error("Product SKU is not set");return I(k,{variables:{sku:e}}).then(({errors:t,data:i})=>{var s;return t?g(t):(s=i==null?void 0:i.products)!=null&&s.items?b(i.products.items[0]):null})},$=`
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
`,H=`
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

${$}
`,z=`
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
`,q=`
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
  
  ${H}
  ${z}
`,N=`
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

${q}
`,B=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${N}
`,Y=async()=>r.authenticated?I(B).then(({errors:e,data:t})=>{var i;return e?g(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>C(s)):null}):T(),Q=`
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
${N}
`,te=async e=>{var s,u;const t=T();let i={id:(t==null?void 0:t.id)??"",items:(t==null?void 0:t.items)??[],updated_at:"",sharing_code:"",items_count:0};if(!e)return null;for(const o of e){let a;(s=t.items)!=null&&s.some(l=>l.product.sku===o.sku)||(n.lastPayload("pdp/data")&&n.lastPayload("pdp/data").sku===o.sku?a=n.lastPayload("pdp/data"):a=await L(o.sku),i.items=[...i.items,{product:a}])}if(n.emit("wishlist/data",i),r.authenticated){if(!r.wishlistId)throw n.emit("wishlist/data",t),Error("Wishlist ID is not set");const o={wishlistId:r.wishlistId,wishlistItems:e.map(({sku:d,parentSku:m,quantity:f,optionsUIDs:p,enteredOptions:h})=>({sku:d,parent_sku:m,quantity:f,selected_options:p,entered_options:h}))},{errors:a,data:c}=await I(Q,{variables:o}),l=[...((u=c==null?void 0:c.addProductsToWishlist)==null?void 0:u.user_errors)??[],...a??[]];if(l.length>0)return n.emit("wishlist/data",t),g(l);const _=C(c.addProductsToWishlist.wishlist);n.emit("wishlist/data",_)}return null},K=()=>(r.wishlistId=null,r.authenticated=!1,Promise.resolve(null)),w=async()=>{if(r.initializing)return null;r.initializing=!0,r.config||(r.config=await U());const e=r.authenticated?await V():await Z();return n.emit("wishlist/initialized",e),n.emit("wishlist/data",e),r.initializing=!1,e};async function V(){const e=await Y(),t=e?e[0]:null;return t?(r.wishlistId=t.id,t):null}async function Z(){try{return await T()}catch(e){throw console.error(e),e}}export{q as W,te as a,N as b,ee as c,L as d,Y as e,w as f,U as g,V as h,S as i,Z as j,K as r,C as t};
