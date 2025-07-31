/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as h}from"@dropins/tools/fetch-graphql.js";function f(e){const s=document.cookie.split(";");for(const t of s)if(t.trim().startsWith(`${e}=`))return t.trim().substring(e.length+1);return null}const p={wishlistId:null,authenticated:!1,isLoading:!0},n=new Proxy(p,{set(e,s,t){if(e[s]=t,s==="wishlistId"){if(t===n.wishlistId)return!0;if(t===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${t}; expires=${r.toUTCString()}; path=/`}return Reflect.set(e,s,t)},get(e,s){return s==="wishlistId"?f("DROPIN__WISHLIST__WISHLIST-ID"):e[s]}});function m(e,s){var o;if(e.product.sku!==s.sku)return!1;const t=((o=e.selectedOptions)==null?void 0:o.map(i=>i.uid).filter(i=>!!i).sort())||[],r=(s.optionUIDs||[]).filter(i=>!!i).sort();return JSON.stringify(t)===JSON.stringify(r)}const c="DROPIN__WISHLIST__WISHLIST__DATA";function W(e){const s=n.authenticated?sessionStorage:localStorage;if(e)try{s.setItem(c,JSON.stringify(e))}catch(t){g(t)?console.error("Storage quota exceeded:",t):console.error("Error saving wishlist:",t)}else s.removeItem(c)}const g=e=>e instanceof DOMException&&e.name==="QuotaExceededError";function S(e=!1){const s=n.authenticated&&!e?sessionStorage:localStorage;try{const t=s.getItem(c);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function v(){localStorage.removeItem(c)}function C(e,s=[]){var o;const t=n.authenticated?sessionStorage:localStorage,r=t.getItem(c)?JSON.parse(t.getItem(c)):{items:[]};return(o=r==null?void 0:r.items)==null?void 0:o.find(i=>m(i,{sku:e,optionUIDs:s}))}const{setEndpoint:G,setFetchGraphQlHeader:M,removeFetchGraphQlHeader:L,setFetchGraphQlHeaders:U,fetchGraphQl:T,getConfig:y}=new h().getMethods(),R=e=>{const s=e.map(t=>t.message).join(" ");throw Error(s)},E=`
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
`,D=`
  ... on SimpleProduct {
    options {
      uid
    }
  }
`,O=`
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
`,P=`
  ... on DownloadableProduct {
    image {
      label
      url
    }
  }
 `,w=`
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
`,b=`
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
`,$=`
  fragment PRODUCT_FRAGMENT on ProductInterface {
    __typename
    uid
    sku
    name
    description {
      html
    }
    meta_description
    meta_keyword
    meta_title
    short_description {
      html
    }
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
    ${D}
    ${O}
    ${P}
    ${w}
    ${b}
  }

${E}
`,N=`
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
`,k=async e=>{var r,o,i;const s=S(),t={...s,items:(r=s.items)==null?void 0:r.filter(d=>!e.some(u=>{var a;return m(d,{sku:u.product.sku,optionUIDs:(a=u.selectedOptions)==null?void 0:a.map(l=>l.uid)})}))};if(n.authenticated){if(!n.wishlistId)throw Error("Wishlist ID is not set");const d=e.map(I=>I.id),{errors:u,data:a}=await T(N,{variables:{wishlistId:n.wishlistId,wishlistItemsIds:d}}),l=[...((o=a==null?void 0:a.removeProductsFromWishlist)==null?void 0:o.user_errors)??[],...u??[]];if(l.length>0)return _.emit("wishlist/data",s),R(l)}return t.items_count=(i=t.items)==null?void 0:i.length,_.emit("wishlist/data",t),null};export{$ as P,G as a,M as b,L as c,U as d,y as e,T as f,S as g,R as h,m as i,W as j,v as k,C as l,k as r,n as s};
