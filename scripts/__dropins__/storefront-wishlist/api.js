/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as c}from"@dropins/tools/event-bus.js";import{Initializer as C}from"@dropins/tools/lib.js";import{FetchGraphQL as A}from"@dropins/tools/fetch-graphql.js";function b(t){const s=document.cookie.split(";");for(const e of s)if(e.trim().startsWith(`${t}=`))return e.trim().substring(t.length+1);return null}const f={wishlistId:null,authenticated:!1,isLoading:!0},W=()=>f.storeCode&&f.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${f.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",o=new Proxy(f,{set(t,s,e){if(t[s]=e,s==="wishlistId"){const i=W();if(e===o.wishlistId)return!0;if(e===null)return document.cookie=`${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const n=new Date;n.setDate(n.getDate()+30),document.cookie=`${i}=${e}; expires=${n.toUTCString()}; path=/`}return Reflect.set(t,s,e)},get(t,s){return s==="wishlistId"?b(W()):t[s]}});function T(t,s){var n;if(t.product.sku!==s.sku)return!1;const e=((n=t.selectedOptions)==null?void 0:n.map(r=>r.uid).filter(r=>!!r).sort())||[],i=(s.optionUIDs||[]).filter(r=>!!r).sort();return JSON.stringify(e)===JSON.stringify(i)}const E="DROPIN__WISHLIST__WISHLIST__DATA",S=()=>o.storeCode&&o.storeCode!=="default"?`${E}__${o.storeCode}`:E;function v(t){const s=o.authenticated?sessionStorage:localStorage,e=S();if(t)try{s.setItem(e,JSON.stringify(t))}catch(i){$(i)?console.error("Storage quota exceeded:",i):console.error("Error saving wishlist:",i)}else s.removeItem(e)}const $=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function h(t=!1){const s=o.authenticated&&!t?sessionStorage:localStorage,e=S();try{const i=s.getItem(e);return i?JSON.parse(i):{id:"",items:[]}}catch(i){return console.error("Error retrieving wishlist:",i),{id:"",items:[]}}}function G(){localStorage.removeItem(S())}function ut(t,s=[]){var u;const e=o.authenticated?sessionStorage:localStorage,i=S(),n=e.getItem(i),r=n?JSON.parse(n):{items:[]};return(u=r==null?void 0:r.items)==null?void 0:u.find(d=>T(d,{sku:t,optionUIDs:s}))}const D=new C({init:async t=>{const s={isGuestWishlistEnabled:!1,...t};D.config.setConfig(s),o.storeCode=t.storeCode||void 0,O().catch(console.error)},listeners:()=>[c.on("wishlist/data",t=>{v(t)},{eager:!0}),c.on("authenticated",async t=>{if(o.authenticated&&!t&&c.emit("wishlist/reset",void 0),t&&!o.authenticated){o.authenticated=t;const s=await O().catch(console.error);s&&nt(s)}},{eager:!0}),c.on("wishlist/reset",()=>{st().catch(console.error),c.emit("wishlist/data",null)})]}),ct=D.config,{setEndpoint:at,setFetchGraphQlHeader:dt,removeFetchGraphQlHeader:_t,setFetchGraphQlHeaders:It,fetchGraphQl:m,getConfig:ht}=new A().getMethods();function H(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function g(t,s){return t?{id:t.id,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:F(t,s??[])}:null}function F(t,s){var e,i;return(i=(e=t==null?void 0:t.items_v2)==null?void 0:e.items)!=null&&i.length?t.items_v2.items.map(n=>{const r=P(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:s,selectedOptions:r,product:{sku:n.product.sku}}}):[]}function P(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(s=>({uid:s.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(e=>e.values??[]).map(e=>({uid:e.uid})):[]}const p=t=>{const s=t.map(e=>e.message).join(" ");throw Error(s)},k=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,x=async()=>m(k,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>t?p(t):H(s)),q=`
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
`,Q=`
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
`,B=`
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
`,z=`
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
`,Y=`
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
`,M=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${Q}
    ${B}
    ${z}
    ${Y}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${q}
`,w=`
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

${M}
`,J=`
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
        }
      }
    }
  }

${M}
`,mt=async t=>{if(!o.authenticated)return h();if(!t)throw Error("Wishlist ID is not set");return m(J,{variables:{wishlistId:t}}).then(({errors:s,data:e})=>{var n;if(s)return p(s);if(!((n=e==null?void 0:e.customer)!=null&&n.wishlist_v2))return null;const i=g(e.customer.wishlist_v2);return c.emit("wishlist/data",i),i})},Z=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${w}
`,K=async()=>o.authenticated?m(Z).then(({errors:t,data:s})=>{var e;return t?p(t):(e=s==null?void 0:s.customer)!=null&&e.wishlists?s.customer.wishlists.map(i=>g(i)):null}):h(),V=`
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
${w}
`,j=async t=>{var i,n,r,u,d;if(!t)return null;const s=h();let e={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const l of t){if((i=e.items)==null?void 0:i.some(I=>T(I,{sku:l.sku,optionUIDs:l.optionsUIDs})))continue;const _=l.optionsUIDs?(n=l.optionsUIDs)==null?void 0:n.map(I=>({uid:I})):[];e.items=[...e.items,{id:crypto.randomUUID(),quantity:l.quantity,selectedOptions:_,enteredOptions:l.enteredOptions??[],product:{sku:l.sku}}]}if(e.items_count=(r=e.items)==null?void 0:r.length,c.emit("wishlist/data",e),o.authenticated){if(!o.wishlistId)throw c.emit("wishlist/data",s),Error("Wishlist ID is not set");const l={wishlistId:o.wishlistId,wishlistItems:t.map(({sku:N,quantity:L,optionsUIDs:R,enteredOptions:U})=>({sku:N,quantity:L,selected_options:R,entered_options:U}))},{errors:a,data:_}=await m(V,{variables:l}),I=[...((u=_==null?void 0:_.addProductsToWishlist)==null?void 0:u.user_errors)??[],...a??[]];if(I.length>0)return c.emit("wishlist/data",s),p(I);const y=g(_.addProductsToWishlist.wishlist,((d=t[0])==null?void 0:d.enteredOptions)??[]);c.emit("wishlist/data",y)}return null},X=`
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
`,pt=async t=>{var i,n,r;const s=h(),e={...s,items:(i=s.items)==null?void 0:i.filter(u=>!t.some(d=>{var l;return T(u,{sku:d.product.sku,optionUIDs:(l=d.selectedOptions)==null?void 0:l.map(a=>a.uid)})}))};if(o.authenticated){if(!o.wishlistId)throw Error("Wishlist ID is not set");const u=t.map(_=>_.id),{errors:d,data:l}=await m(X,{variables:{wishlistId:o.wishlistId,wishlistItemsIds:u}}),a=[...((n=l==null?void 0:l.removeProductsFromWishlist)==null?void 0:n.user_errors)??[],...d??[]];if(a.length>0)return c.emit("wishlist/data",s),p(a)}return e.items_count=(r=e.items)==null?void 0:r.length,c.emit("wishlist/data",e),null},tt=`
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
  
   ${w} 
`,ft=async t=>{const s=o.wishlistId;if(!s)throw Error("Wishlist ID is not set");return m(tt,{variables:{wishlistId:s,wishlistItems:t.map(({wishlistItemId:e,quantity:i,description:n,selectedOptions:r,enteredOptions:u})=>({wishlistItemId:e,quantity:i,description:n,selected_options:r,entered_options:u}))}}).then(({errors:e,data:i})=>{var r;const n=[...((r=i==null?void 0:i.updateProductsInWishlist)==null?void 0:r.user_errors)??[],...e??[]];return n.length>0?p(n):g(i.updateProductsInWishlist.wishlist)})},st=()=>(o.wishlistId=null,o.authenticated=!1,Promise.resolve(null)),O=async()=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await x());const t=o.authenticated?await et():await it();return c.emit("wishlist/initialized",t),c.emit("wishlist/data",t),o.initializing=!1,t};async function et(){const t=await K(),s=t?t[0]:null;return s?(o.wishlistId=s.id,s):null}async function it(){try{return await h()}catch(t){throw console.error(t),t}}const nt=async t=>{var n;if(!t)return null;const s=h(!0),e=[];if((n=s==null?void 0:s.items)==null||n.forEach(r=>{var l;const u=((l=r.selectedOptions)==null?void 0:l.map(a=>a.uid))||[];if(!t.items.some(a=>T(a,{sku:r.product.sku,optionUIDs:u}))){const a={sku:r.product.sku,quantity:1,optionsUIDs:u,enteredOptions:r.enteredOptions||void 0};e.push(a)}}),e.length===0)return null;const i=await j(e);return G(),i};export{j as addProductsToWishlist,G as clearPersistedLocalStorage,ct as config,m as fetchGraphQl,ht as getConfig,et as getDefaultWishlist,it as getGuestWishlist,h as getPersistedWishlistData,x as getStoreConfig,mt as getWishlistById,ut as getWishlistItemFromStorage,K as getWishlists,T as i,D as initialize,O as initializeWishlist,nt as mergeWishlists,_t as removeFetchGraphQlHeader,pt as removeProductsFromWishlist,st as resetWishlist,o as s,at as setEndpoint,dt as setFetchGraphQlHeader,It as setFetchGraphQlHeaders,v as setPersistedWishlistData,ft as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
