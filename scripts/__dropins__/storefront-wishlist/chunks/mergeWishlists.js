/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as y}from"@dropins/tools/lib.js";import{events as r}from"@dropins/tools/event-bus.js";import{j as R,s as e,f as I,h as f,P as A,g as h,i as T,k as G}from"./removeProductsFromWishlist.js";const g=new y({init:async t=>{const s={isGuestWishlistEnabled:!1,...t};g.config.setConfig(s),p().catch(console.error)},listeners:()=>[r.on("wishlist/data",t=>{R(t)},{eager:!0}),r.on("authenticated",async t=>{if(e.authenticated&&!t&&r.emit("wishlist/reset",void 0),t&&!e.authenticated){e.authenticated=t;const s=await p().catch(console.error);s&&j(s)}},{eager:!0}),r.on("wishlist/reset",()=>{Q().catch(console.error),r.emit("wishlist/data",null)})]}),X=g.config;function N(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function w(t,s){return t?{id:t.id,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:D(t,s??[])}:null}function D(t,s){var i,a;return(a=(i=t==null?void 0:t.items_v2)==null?void 0:i.items)!=null&&a.length?t.items_v2.items.map(n=>{const l=L(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:s,selectedOptions:l,product:{sku:n.product.sku}}}):[]}function L(t){return t.product.__typename==="ConfigurableProduct"?t.configurable_options?t.configurable_options.map(s=>({uid:s.configurable_product_option_value_uid})):[]:[]}const C=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,U=async()=>I(C,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>t?f(t):N(s)),F=`
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
`,v=`
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
`,P=`
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
`,H=`
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
`,k=`
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
`,$=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    ${v}
    ${P}
    ${H}
    ${k}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${A}
  ${F}
`,S=`
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

${$}
`,q=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${S}
`,z=async()=>e.authenticated?I(q).then(({errors:t,data:s})=>{var i;return t?f(t):(i=s==null?void 0:s.customer)!=null&&i.wishlists?s.customer.wishlists.map(a=>w(a)):null}):h(),x=`
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
${S}
`,B=async t=>{var a,n,l,d,m;if(!t)return null;const s=h();let i={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const o of t){if((a=i.items)==null?void 0:a.some(_=>T(_,{sku:o.sku,optionUIDs:o.optionsUIDs})))continue;const c=o.optionsUIDs?(n=o.optionsUIDs)==null?void 0:n.map(_=>({uid:_})):[];i.items=[...i.items,{id:crypto.randomUUID(),quantity:o.quantity,selectedOptions:c,enteredOptions:o.enteredOptions??[],product:{sku:o.sku}}]}if(i.items_count=(l=i.items)==null?void 0:l.length,r.emit("wishlist/data",i),e.authenticated){if(!e.wishlistId)throw r.emit("wishlist/data",s),Error("Wishlist ID is not set");const o={wishlistId:e.wishlistId,wishlistItems:t.map(({sku:W,quantity:O,optionsUIDs:M,enteredOptions:b})=>({sku:W,quantity:O,selected_options:M,entered_options:b}))},{errors:u,data:c}=await I(x,{variables:o}),_=[...((d=c==null?void 0:c.addProductsToWishlist)==null?void 0:d.user_errors)??[],...u??[]];if(_.length>0)return r.emit("wishlist/data",s),f(_);const E=w(c.addProductsToWishlist.wishlist,((m=t[0])==null?void 0:m.enteredOptions)??[]);r.emit("wishlist/data",E)}return null},Q=()=>(e.wishlistId=null,e.authenticated=!1,Promise.resolve(null)),p=async()=>{if(e.initializing)return null;e.initializing=!0,e.config||(e.config=await U());const t=e.authenticated?await Y():await Z();return r.emit("wishlist/initialized",t),r.emit("wishlist/data",t),e.initializing=!1,t};async function Y(){const t=await z(),s=t?t[0]:null;return s?(e.wishlistId=s.id,s):null}async function Z(){try{return await h()}catch(t){throw console.error(t),t}}const j=async t=>{var n;if(!t)return null;const s=h(!0),i=[];if((n=s==null?void 0:s.items)==null||n.forEach(l=>{var o;const d=((o=l.selectedOptions)==null?void 0:o.map(u=>u.uid))||[];if(!t.items.some(u=>T(u,{sku:l.product.sku,optionUIDs:d}))){const u={sku:l.product.sku,quantity:1,optionsUIDs:d,enteredOptions:l.enteredOptions||void 0};i.push(u)}}),i.length===0)return null;const a=await B(i);return G(),a};export{$ as W,B as a,S as b,X as c,z as d,p as e,Y as f,U as g,Z as h,g as i,j as m,Q as r,w as t};
