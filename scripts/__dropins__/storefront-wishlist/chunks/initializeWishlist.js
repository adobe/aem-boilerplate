/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as R}from"@dropins/tools/lib.js";import{events as u}from"@dropins/tools/event-bus.js";import{s as r,i as A,f as g,h as T,g as E}from"./removeProductsFromWishlist.js";const S=new R({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};S.config.setConfig(t),P().catch(console.error)},listeners:()=>[u.on("authenticated",e=>{r.authenticated&&!e&&u.emit("wishlist/reset",void 0),e&&!r.authenticated&&(r.authenticated=e,P().catch(console.error))},{eager:!0}),u.on("wishlist/data",e=>{A(e)}),u.on("wishlist/reset",()=>{K().catch(console.error),u.emit("wishlist/data",null)})]}),ee=S.config;function G(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function b(e){var t;return e?{name:e.name,sku:e.sku,uid:e.uid,image:v(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(i=>i.name),prices:O(e),productAttributes:W(e)}:null}function v(e){var t,i;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(i=e.thumbnail)==null?void 0:i.label}}function O(e){var t,i,s,n,c,a,_,o,l,d,m,f,p,h,I,y,x,w;return{regularPrice:{currency:(s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency,value:(a=(c=(n=e.price_range)==null?void 0:n.minimum_price)==null?void 0:c.regular_price)==null?void 0:a.value},finalPrice:{currency:(l=(o=(_=e.price_range)==null?void 0:_.minimum_price)==null?void 0:o.final_price)==null?void 0:l.currency,value:(f=(m=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:m.final_price)==null?void 0:f.value},discount:{amountOff:(I=(h=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:h.discount)==null?void 0:I.amount_off,percentOff:(w=(x=(y=e.price_range)==null?void 0:y.minimum_price)==null?void 0:x.discount)==null?void 0:w.percent_off},fixedProductTaxes:D(e)}}function W(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const n=s.code.split("_").map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(" ");return{...s,code:n}})}function D(e){var t,i,s;return(s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.fixed_product_taxes)==null?void 0:s.map(n=>({money:{value:n.amount.value,currency:n.amount.currency},label:n.label}))}function C(e){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:M(e)}:null}function M(e){var t,i;return(i=(t=e==null?void 0:e.items_v2)==null?void 0:t.items)!=null&&i.length?e.items_v2.items.map(s=>({id:s.id,quantity:s.quantity,description:s.description,added_at:s.added_at,product:b(s.product)})):[]}const F=`
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
`,U=async()=>g(F,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?T(e):G(t)),k=`
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
`,L=async e=>{if(!e)throw Error("Product SKU is not set");return g(k,{variables:{sku:e}}).then(({errors:t,data:i})=>{var s;return t?T(t):(s=i==null?void 0:i.products)!=null&&s.items?b(i.products.items[0]):null})},$=`
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
`,Y=async()=>r.authenticated?g(B).then(({errors:e,data:t})=>{var i;return e?T(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>C(s)):null}):E(),Q=`
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
`,te=async e=>{var s,n,c;const t=E();let i={id:(t==null?void 0:t.id)??"",items:(t==null?void 0:t.items)??[],updated_at:"",sharing_code:"",items_count:0};if(!e)return null;for(const a of e){if((s=t.items)==null?void 0:s.some(l=>l.product.sku===a.sku))continue;const o=await L(a.sku);o&&(i.items=[...i.items,{product:o}])}if(i.items_count=(n=i.items)==null?void 0:n.length,u.emit("wishlist/data",i),r.authenticated){if(!r.wishlistId)throw u.emit("wishlist/data",t),Error("Wishlist ID is not set");const a={wishlistId:r.wishlistId,wishlistItems:e.map(({sku:m,parentSku:f,quantity:p,optionsUIDs:h,enteredOptions:I})=>({sku:m,parent_sku:f,quantity:p,selected_options:h,entered_options:I}))},{errors:_,data:o}=await g(Q,{variables:a}),l=[...((c=o==null?void 0:o.addProductsToWishlist)==null?void 0:c.user_errors)??[],..._??[]];if(l.length>0)return u.emit("wishlist/data",t),T(l);const d=C(o.addProductsToWishlist.wishlist);u.emit("wishlist/data",d)}return null},K=()=>(r.wishlistId=null,r.authenticated=!1,Promise.resolve(null)),P=async()=>{if(r.initializing)return null;r.initializing=!0,r.config||(r.config=await U());const e=r.authenticated?await V():await Z();return u.emit("wishlist/initialized",e),u.emit("wishlist/data",e),r.initializing=!1,e};async function V(){const e=await Y(),t=e?e[0]:null;return t?(r.wishlistId=t.id,t):null}async function Z(){try{return await E()}catch(e){throw console.error(e),e}}export{q as W,te as a,N as b,ee as c,L as d,Y as e,P as f,U as g,V as h,S as i,Z as j,K as r,C as t};
