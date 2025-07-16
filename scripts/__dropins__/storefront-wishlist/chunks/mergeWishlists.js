/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as D}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import{j as v,s as l,f as h,h as b,g as E,i as C,k as G}from"./removeProductsFromWishlist.js";const R=new D({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};R.config.setConfig(t),S().catch(console.error)},listeners:()=>[c.on("wishlist/data",e=>{v(e)},{eager:!0}),c.on("authenticated",async e=>{if(l.authenticated&&!e&&c.emit("wishlist/reset",void 0),e&&!l.authenticated){l.authenticated=e;const t=await S().catch(console.error);t&&ce(t)}},{eager:!0}),c.on("wishlist/reset",()=>{ae().catch(console.error),c.emit("wishlist/data",null)})]}),pe=R.config;function O(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function N(e,t=[]){var i;return e?{type:e.__typename,name:e.name,sku:e.sku,uid:e.uid,image:M(e,t),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(i=e.categories)==null?void 0:i.map(s=>s.name),prices:W(e),productAttributes:F(e),options:U(e)}:null}function U(e){var t,i;return e.__typename==="ConfigurableProduct"?e.configurable_options?(t=e.configurable_options)==null?void 0:t.map(s=>{var n;return{uid:s.uid,attributeUid:s.attribute_uid,attributeCode:s.attribute_code,values:(n=s.values)==null?void 0:n.map(r=>({uid:r.uid,label:r.label})),required:!0}}):[]:e.__typename==="GiftCardProduct"?e.gift_card_options?(i=e.gift_card_options)==null?void 0:i.map(s=>({uid:s.uid,required:s.required,title:s.title})):[]:[]}function M(e,t=[]){var s;let i=e.thumbnail;if(e.__typename==="ConfigurableProduct"&&e.variants&&(t==null?void 0:t.length)>0){const n=t.map(o=>o.uid);let r=e.variants.find(o=>{var u;const _=((u=o.attributes)==null?void 0:u.map(a=>a.uid))||[];return n.every(a=>_.includes(a))});r||(r=e.variants.find(o=>{var _;return(_=o.attributes)==null?void 0:_.some(u=>t.some(a=>a.uid===u.uid))})),(s=r==null?void 0:r.product)!=null&&s.image&&(i=r.product.image)}return{src:i==null?void 0:i.url,alt:i==null?void 0:i.label}}function W(e){var t,i,s,n,r,o,_,u,a,d,m,f,p,I,g,T,y,P;return{regularPrice:{currency:((s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency)??"USD",value:((o=(r=(n=e.price_range)==null?void 0:n.minimum_price)==null?void 0:r.regular_price)==null?void 0:o.value)??0},finalPrice:{currency:((a=(u=(_=e.price_range)==null?void 0:_.minimum_price)==null?void 0:u.final_price)==null?void 0:a.currency)??"USD",value:((f=(m=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:m.final_price)==null?void 0:f.value)??0},discount:{amountOff:((g=(I=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:I.discount)==null?void 0:g.amount_off)??0,percentOff:((P=(y=(T=e.price_range)==null?void 0:T.minimum_price)==null?void 0:y.discount)==null?void 0:P.percent_off)??0},fixedProductTaxes:L(e)}}function F(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const n=s.code.split("_").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");return{...s,code:n}})}function L(e){var t,i,s,n,r;return(i=(t=e.price_range)==null?void 0:t.minimum_price)!=null&&i.fixed_product_taxes?(r=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.fixed_product_taxes)==null?void 0:r.map(o=>({money:{value:o.amount.value,currency:o.amount.currency},label:o.label})):[]}function w(e,t){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:k(e,t??[])}:null}function k(e,t){var i,s;return(s=(i=e==null?void 0:e.items_v2)==null?void 0:i.items)!=null&&s.length?e.items_v2.items.map(n=>{const r=$(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:t,selectedOptions:r,product:N(n.product,r)}}):[]}function $(e){return e.product.__typename==="ConfigurableProduct"?e.configurable_options?e.configurable_options.map(t=>({value:t.value_label,label:t.option_label,uid:t.configurable_product_option_value_uid})):[]:[]}const q=`
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
`,H=async()=>h(q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?b(e):O(t)),B=`
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
        label
      }
    }
    variants {
      attributes {
        code
        uid
        label
      }
      product {
        sku
        stock_status
        image {
          label
          url
        }
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
`,j=`
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
    ${z}
    ${Y}
    ${Q}
    ${K}
    ${j}
  }

${B}
`,V=`
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...PRODUCT_FRAGMENT
      }
    }
  }

${x}
`,Z=async(e,t)=>{if(!e)throw Error("Product SKU is not set");return h(V,{variables:{sku:e}}).then(({errors:i,data:s})=>{var n;return i?b(i):(n=s==null?void 0:s.products)!=null&&n.items?N(s.products.items[0],t??[]):null})},X=`
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

${se}
`,re=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${A}
`,ne=async()=>l.authenticated?h(re).then(({errors:e,data:t})=>{var i;return e?b(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>w(s)):null}):E(),ue=`
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
`,oe=async e=>{var s,n,r,o,_;if(!e)return null;const t=E();let i={id:(t==null?void 0:t.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(t==null?void 0:t.items)??[]};for(const u of e){if((s=t.items)==null?void 0:s.some(f=>C(f,{sku:u.sku,optionUIDs:u.optionsUIDs})))continue;const d=u.optionsUIDs?(n=u.optionsUIDs)==null?void 0:n.map(f=>({uid:f})):[],m=await Z(u.sku,d);m&&(i.items=[...i.items,{quantity:u.quantity,selectedOptions:d,enteredOptions:[],product:m}])}if(i.items_count=(r=i.items)==null?void 0:r.length,c.emit("wishlist/data",i),l.authenticated){if(!l.wishlistId)throw c.emit("wishlist/data",t),Error("Wishlist ID is not set");const u={wishlistId:l.wishlistId,wishlistItems:e.map(({sku:p,quantity:I,optionsUIDs:g,enteredOptions:T})=>({sku:p,quantity:I,selected_options:g,entered_options:T}))},{errors:a,data:d}=await h(ue,{variables:u}),m=[...((o=d==null?void 0:d.addProductsToWishlist)==null?void 0:o.user_errors)??[],...a??[]];if(m.length>0)return c.emit("wishlist/data",t),b(m);const f=w(d.addProductsToWishlist.wishlist,((_=e[0])==null?void 0:_.enteredOptions)??[]);c.emit("wishlist/data",f)}return null},ae=()=>(l.wishlistId=null,l.authenticated=!1,Promise.resolve(null)),S=async()=>{if(l.initializing)return null;l.initializing=!0,l.config||(l.config=await H());const e=l.authenticated?await le():await _e();return c.emit("wishlist/initialized",e),c.emit("wishlist/data",e),l.initializing=!1,e};async function le(){const e=await ne(),t=e?e[0]:null;return t?(l.wishlistId=t.id,t):null}async function _e(){try{return await E()}catch(e){throw console.error(e),e}}const ce=async e=>{var n;if(!e)return null;const t=E(!0),i=[];if((n=t==null?void 0:t.items)==null||n.forEach(r=>{var u;const o=((u=r.selectedOptions)==null?void 0:u.map(a=>a.uid))||[];if(!e.items.some(a=>C(a,{sku:r.product.sku,optionUIDs:o}))){const a={sku:r.product.sku,quantity:1,optionsUIDs:o,enteredOptions:r.enteredOptions||void 0};i.push(a)}}),i.length===0)return null;const s=await oe(i);return G(),s};export{se as W,oe as a,A as b,pe as c,Z as d,ne as e,S as f,H as g,le as h,R as i,_e as j,ce as m,ae as r,w as t};
