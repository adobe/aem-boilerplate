/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as D}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import{s as o,j as O,f as E,h as b,g as y,i as R,k as G}from"./removeProductsFromWishlist.js";const N=new D({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};N.config.setConfig(t),P().catch(console.error)},listeners:()=>[c.on("authenticated",async e=>{if(o.authenticated&&!e&&c.emit("wishlist/reset",void 0),e&&!o.authenticated){o.authenticated=e;const t=await P().catch(console.error);t&&le(t)}},{eager:!0}),c.on("wishlist/data",e=>{O(e)}),c.on("wishlist/reset",()=>{oe().catch(console.error),c.emit("wishlist/data",null)})]}),pe=N.config;function v(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function w(e){var t,i;return e?{type:e.__typename,name:e.name,sku:e.sku,uid:e.uid,image:M(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(s=>s.name),prices:U(e),productAttributes:W(e),options:e.gift_card_options?(i=e.gift_card_options)==null?void 0:i.map(s=>({uid:s.uid,required:s.required,title:s.title})):[]}:null}function M(e){var t,i;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(i=e.thumbnail)==null?void 0:i.label}}function U(e){var t,i,s,n,r,a,p,u,l,_,d,m,f,I,h,T,g,S;return{regularPrice:{currency:((s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency)??"USD",value:((a=(r=(n=e.price_range)==null?void 0:n.minimum_price)==null?void 0:r.regular_price)==null?void 0:a.value)??0},finalPrice:{currency:((l=(u=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:u.final_price)==null?void 0:l.currency)??"USD",value:((m=(d=(_=e.price_range)==null?void 0:_.minimum_price)==null?void 0:d.final_price)==null?void 0:m.value)??0},discount:{amountOff:((h=(I=(f=e.price_range)==null?void 0:f.minimum_price)==null?void 0:I.discount)==null?void 0:h.amount_off)??0,percentOff:((S=(g=(T=e.price_range)==null?void 0:T.minimum_price)==null?void 0:g.discount)==null?void 0:S.percent_off)??0},fixedProductTaxes:F(e)}}function W(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const n=s.code.split("_").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");return{...s,code:n}})}function F(e){var t,i,s,n,r;return(i=(t=e.price_range)==null?void 0:t.minimum_price)!=null&&i.fixed_product_taxes?(r=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.fixed_product_taxes)==null?void 0:r.map(a=>({money:{value:a.amount.value,currency:a.amount.currency},label:a.label})):[]}function x(e,t){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:L(e,t??[])}:null}function L(e,t){var i,s;return(s=(i=e==null?void 0:e.items_v2)==null?void 0:i.items)!=null&&s.length?e.items_v2.items.map(n=>({id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:t,selectedOptions:n.configurable_options?n.configurable_options.map(r=>({value:r.value_label,label:r.option_label,uid:r.configurable_product_option_value_uid})):[],product:w(n.product)})):[]}const k=`
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
`,$=async()=>E(k,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?b(e):v(t)),q=`
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
`,C=`
  fragment PRODUCT_FRAGMENT on ProductInterface {
    __typename
    uid
    sku
    name
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

${q}
`,H=`
  ... on SimpleProduct {
    options {
      uid
    }
  }
`,B=`
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
`,z=`
  ... on DownloadableProduct {
    image {
      label
      url
    }
  }
 `,Y=`
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
`,Q=`
  ... on BundleProduct {
    items {
      uid
      required
      title
      options {
        uid
        label
        quantity
      }
    }
  }
`,K=`
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...PRODUCT_FRAGMENT
        ${H}
        ${B}
        ${z}
        ${Y}
        ${Q}
      }
    }
  }

${C}
`,V=async e=>{if(!e)throw Error("Product SKU is not set");return E(K,{variables:{sku:e}}).then(({errors:t,data:i})=>{var s;return t?b(t):(s=i==null?void 0:i.products)!=null&&s.items?w(i.products.items[0]):null})},j=`
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
`,Z=`
  ... on ConfigurableWishlistItem {
    configurable_options {
      option_label
      value_label
      configurable_product_option_value_uid
      configurable_product_option_uid
    }
    configured_variant {
      canonical_url
    }
  }
`,X=`
  ... on DownloadableWishlistItem {
    added_at
    description
    links_v2 {
      sample_url
      sort_order
      title
      uid
    }
    quantity
  }
`,J=`
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
`,ee=`
  ... on BundleWishlistItem {
    bundle_options {
      label
      type
      uid
      values {
        uid
        label
        quantity
      }
    }
  }
`,te=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    ${Z}
    ${X}
    ${J}
    ${ee}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${C}
  ${j}
`,A=`
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

${te}
`,ie=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${A}
`,se=async()=>o.authenticated?E(ie).then(({errors:e,data:t})=>{var i;return e?b(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>x(s)):null}):y(),ne=`
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
${A}
`,re=async e=>{var s,n,r,a,p;if(!e)return null;const t=y();let i={id:(t==null?void 0:t.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(t==null?void 0:t.items)??[]};for(const u of e){if((s=t.items)==null?void 0:s.some(d=>R(d,{sku:u.sku,optionUIDs:u.optionsUIDs})))continue;const _=await V(u.sku);_&&(i.items=[...i.items,{quantity:u.quantity,selectedOptions:u.optionsUIDs?(n=u.optionsUIDs)==null?void 0:n.map(d=>({uid:d})):[],enteredOptions:[],product:_}])}if(i.items_count=(r=i.items)==null?void 0:r.length,c.emit("wishlist/data",i),o.authenticated){if(!o.wishlistId)throw c.emit("wishlist/data",t),Error("Wishlist ID is not set");const u={wishlistId:o.wishlistId,wishlistItems:e.map(({sku:f,parentSku:I,quantity:h,optionsUIDs:T,enteredOptions:g})=>({sku:f,parent_sku:I,quantity:h,selected_options:T,entered_options:g}))},{errors:l,data:_}=await E(ne,{variables:u}),d=[...((a=_==null?void 0:_.addProductsToWishlist)==null?void 0:a.user_errors)??[],...l??[]];if(d.length>0)return c.emit("wishlist/data",t),b(d);const m=x(_.addProductsToWishlist.wishlist,((p=e[0])==null?void 0:p.enteredOptions)??[]);c.emit("wishlist/data",m)}return null},oe=()=>(o.wishlistId=null,o.authenticated=!1,Promise.resolve(null)),P=async()=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await $());const e=o.authenticated?await ue():await ae();return c.emit("wishlist/initialized",e),c.emit("wishlist/data",e),o.initializing=!1,e};async function ue(){const e=await se(),t=e?e[0]:null;return t?(o.wishlistId=t.id,t):null}async function ae(){try{return await y()}catch(e){throw console.error(e),e}}const le=async e=>{var n;if(!e)return null;const t=y(!0),i=[];if((n=t==null?void 0:t.items)==null||n.forEach(r=>{var u;const a=((u=r.selectedOptions)==null?void 0:u.map(l=>l.uid))||[];if(!e.items.some(l=>R(l,{sku:r.product.sku,optionUIDs:a}))){const l={sku:r.product.sku,quantity:1,optionsUIDs:a,enteredOptions:r.enteredOptions||void 0};i.push(l)}}),i.length===0)return null;const s=await re(i);return G(),s};export{te as W,re as a,A as b,pe as c,V as d,se as e,P as f,$ as g,ue as h,N as i,ae as j,le as m,oe as r,x as t};
