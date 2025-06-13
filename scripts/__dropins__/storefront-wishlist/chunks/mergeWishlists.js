/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as A}from"@dropins/tools/lib.js";import{events as _}from"@dropins/tools/event-bus.js";import{s as o,j as D,f as E,h as b,g as y,i as R,k as G}from"./removeProductsFromWishlist.js";const C=new A({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};C.config.setConfig(t),S().catch(console.error)},listeners:()=>[_.on("authenticated",async e=>{if(o.authenticated&&!e&&_.emit("wishlist/reset",void 0),e&&!o.authenticated){o.authenticated=e;const t=await S().catch(console.error);t&&le(t)}},{eager:!0}),_.on("wishlist/data",e=>{D(e)}),_.on("wishlist/reset",()=>{ae().catch(console.error),_.emit("wishlist/data",null)})]}),fe=C.config;function v(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function N(e){var t;return e?{type:e.__typename,name:e.name,sku:e.sku,uid:e.uid,image:M(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(i=>i.name),prices:W(e),productAttributes:F(e),options:U(e)}:null}function U(e){var t,i;return e.__typename==="ConfigurableProduct"?e.configurable_options?(t=e.configurable_options)==null?void 0:t.map(s=>{var n;return{uid:s.uid,attributeUid:s.attribute_uid,attributeCode:s.attribute_code,values:(n=s.values)==null?void 0:n.map(r=>({uid:r.uid})),required:!0}}):[]:e.__typename==="GiftCardProduct"?e.gift_card_options?(i=e.gift_card_options)==null?void 0:i.map(s=>({uid:s.uid,required:s.required,title:s.title})):[]:[]}function M(e){var t,i;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(i=e.thumbnail)==null?void 0:i.label}}function W(e){var t,i,s,n,r,a,p,u,c,l,d,m,f,I,g,h,T,P;return{regularPrice:{currency:((s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency)??"USD",value:((a=(r=(n=e.price_range)==null?void 0:n.minimum_price)==null?void 0:r.regular_price)==null?void 0:a.value)??0},finalPrice:{currency:((c=(u=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:u.final_price)==null?void 0:c.currency)??"USD",value:((m=(d=(l=e.price_range)==null?void 0:l.minimum_price)==null?void 0:d.final_price)==null?void 0:m.value)??0},discount:{amountOff:((g=(I=(f=e.price_range)==null?void 0:f.minimum_price)==null?void 0:I.discount)==null?void 0:g.amount_off)??0,percentOff:((P=(T=(h=e.price_range)==null?void 0:h.minimum_price)==null?void 0:T.discount)==null?void 0:P.percent_off)??0},fixedProductTaxes:L(e)}}function F(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const n=s.code.split("_").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");return{...s,code:n}})}function L(e){var t,i,s,n,r;return(i=(t=e.price_range)==null?void 0:t.minimum_price)!=null&&i.fixed_product_taxes?(r=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.fixed_product_taxes)==null?void 0:r.map(a=>({money:{value:a.amount.value,currency:a.amount.currency},label:a.label})):[]}function w(e,t){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:k(e,t??[])}:null}function k(e,t){var i,s;return(s=(i=e==null?void 0:e.items_v2)==null?void 0:i.items)!=null&&s.length?e.items_v2.items.map(n=>({id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:t,selectedOptions:$(n),product:N(n.product)})):[]}function $(e){return e.product.__typename==="ConfigurableProduct"?e.configurable_options?e.configurable_options.map(t=>({value:t.value_label,label:t.option_label,uid:t.configurable_product_option_value_uid})):[]:[]}const q=`
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
`,H=async()=>E(q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?b(e):v(t)),B=`
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
`,x=`
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

${B}
`,z=`
  ... on SimpleProduct {
    options {
      uid
    }
  }
`,Y=`
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
`,Q=`
  ... on DownloadableProduct {
    image {
      label
      url
    }
  }
 `,K=`
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
`,V=`
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
`,j=`
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...PRODUCT_FRAGMENT
        ${z}
        ${Y}
        ${Q}
        ${K}
        ${V}
      }
    }
  }

${x}
`,Z=async e=>{if(!e)throw Error("Product SKU is not set");return E(j,{variables:{sku:e}}).then(({errors:t,data:i})=>{var s;return t?b(t):(s=i==null?void 0:i.products)!=null&&s.items?N(i.products.items[0]):null})},X=`
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
`,J=`
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
`,ee=`
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
`,te=`
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
`,ie=`
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
`,se=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    ${J}
    ${ee}
    ${te}
    ${ie}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${x}
  ${X}
`,O=`
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

${se}
`,ne=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${O}
`,re=async()=>o.authenticated?E(ne).then(({errors:e,data:t})=>{var i;return e?b(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>w(s)):null}):y(),oe=`
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
${O}
`,ue=async e=>{var s,n,r,a,p;if(!e)return null;const t=y();let i={id:(t==null?void 0:t.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(t==null?void 0:t.items)??[]};for(const u of e){if((s=t.items)==null?void 0:s.some(d=>R(d,{sku:u.sku,optionUIDs:u.optionsUIDs})))continue;const l=await Z(u.sku);l&&(i.items=[...i.items,{quantity:u.quantity,selectedOptions:u.optionsUIDs?(n=u.optionsUIDs)==null?void 0:n.map(d=>({uid:d})):[],enteredOptions:[],product:l}])}if(i.items_count=(r=i.items)==null?void 0:r.length,_.emit("wishlist/data",i),o.authenticated){if(!o.wishlistId)throw _.emit("wishlist/data",t),Error("Wishlist ID is not set");const u={wishlistId:o.wishlistId,wishlistItems:e.map(({sku:f,parentSku:I,quantity:g,optionsUIDs:h,enteredOptions:T})=>({sku:f,parent_sku:I,quantity:g,selected_options:h,entered_options:T}))},{errors:c,data:l}=await E(oe,{variables:u}),d=[...((a=l==null?void 0:l.addProductsToWishlist)==null?void 0:a.user_errors)??[],...c??[]];if(d.length>0)return _.emit("wishlist/data",t),b(d);const m=w(l.addProductsToWishlist.wishlist,((p=e[0])==null?void 0:p.enteredOptions)??[]);_.emit("wishlist/data",m)}return null},ae=()=>(o.wishlistId=null,o.authenticated=!1,Promise.resolve(null)),S=async()=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await H());const e=o.authenticated?await ce():await _e();return _.emit("wishlist/initialized",e),_.emit("wishlist/data",e),o.initializing=!1,e};async function ce(){const e=await re(),t=e?e[0]:null;return t?(o.wishlistId=t.id,t):null}async function _e(){try{return await y()}catch(e){throw console.error(e),e}}const le=async e=>{var n;if(!e)return null;const t=y(!0),i=[];if((n=t==null?void 0:t.items)==null||n.forEach(r=>{var u;const a=((u=r.selectedOptions)==null?void 0:u.map(c=>c.uid))||[];if(!e.items.some(c=>R(c,{sku:r.product.sku,optionUIDs:a}))){const c={sku:r.product.sku,quantity:1,optionsUIDs:a,enteredOptions:r.enteredOptions||void 0};i.push(c)}}),i.length===0)return null;const s=await ue(i);return G(),s};export{se as W,ue as a,O as b,fe as c,Z as d,re as e,S as f,H as g,ce as h,C as i,_e as j,le as m,ae as r,w as t};
