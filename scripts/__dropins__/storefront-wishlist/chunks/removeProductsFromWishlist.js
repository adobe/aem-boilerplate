/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{FetchGraphQL as P}from"@dropins/tools/fetch-graphql.js";function R(e){const t=document.cookie.split(";");for(const r of t)if(r.trim().startsWith(`${e}=`))return r.trim().substring(e.length+1);return null}const A={wishlistId:null,authenticated:!1,currentPage:1,pageSize:4},c=new Proxy(A,{set(e,t,r){if(e[t]=r,t==="wishlistId"){if(r===c.wishlistId)return!0;if(r===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const i=new Date;i.setDate(i.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${r}; expires=${i.toUTCString()}; path=/`}return Reflect.set(e,t,r)},get(e,t){return t==="wishlistId"?R("DROPIN__WISHLIST__WISHLIST-ID"):e[t]}}),I="DROPIN__WISHLIST__WISHLIST__DATA";function N(e){if(e)try{localStorage.setItem(I,JSON.stringify(e))}catch(t){O(t)?console.error("LocalStorage quota exceeded:",t):console.error("Error saving wishlist:",t)}else localStorage.removeItem(I)}const O=e=>e instanceof DOMException&&e.name==="QuotaExceededError";function W(){try{const e=localStorage.getItem(I);return e?JSON.parse(e):{id:"",items:[]}}catch(e){return console.error("Error retrieving wishlist:",e),{id:"",items:[]}}}const{setEndpoint:J,setFetchGraphQlHeader:Z,removeFetchGraphQlHeader:K,setFetchGraphQlHeaders:Y,fetchGraphQl:M,getConfig:X}=new P().getMethods();function v(e){var t;return e?{name:e.name,sku:e.sku,uid:e.uid,image:w(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(r=>r.name),prices:F(e),productAttributes:y(e)}:null}function w(e){var t,r;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(r=e.thumbnail)==null?void 0:r.label}}function F(e){var t,r,i,s,n,a,u,o,l,_,m,p,d,f,g,h,S,T;return{regularPrice:{currency:(i=(r=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:r.regular_price)==null?void 0:i.currency,value:(a=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.regular_price)==null?void 0:a.value},finalPrice:{currency:(l=(o=(u=e.price_range)==null?void 0:u.minimum_price)==null?void 0:o.final_price)==null?void 0:l.currency,value:(p=(m=(_=e.price_range)==null?void 0:_.minimum_price)==null?void 0:m.final_price)==null?void 0:p.value},discount:{amountOff:(g=(f=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:f.discount)==null?void 0:g.amount_off,percentOff:(T=(S=(h=e.price_range)==null?void 0:h.minimum_price)==null?void 0:S.discount)==null?void 0:T.percent_off},fixedProductTaxes:G(e)}}function y(e){var t,r;return(r=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:r.map(i=>{const s=i.code.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ");return{...i,code:s}})}function G(e){var t,r,i;return(i=(r=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:r.fixed_product_taxes)==null?void 0:i.map(s=>({money:{value:s.amount.value,currency:s.amount.currency},label:s.label}))}function L(e){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,total_pages:e.items_v2.page_info.total_pages,items:b(e)}:null}function b(e){var t,r;return(r=(t=e==null?void 0:e.items_v2)==null?void 0:t.items)!=null&&r.length?e.items_v2.items.map(i=>({id:i.id,quantity:i.quantity,description:i.description,added_at:i.added_at,product:v(i.product)})):[]}const D=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},H=`
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

${H}
`,$=`
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
`,C=`
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
  
  ${x}
  ${$}
`,{pageSize:U,currentPage:k}=c,z=`
    $pageSize: Int! = ${U},
    $currentPage: Int! = ${k},
`,Q=`
    pageSize: $pageSize,
    currentPage: $currentPage,
`,V=`
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2(
      ${Q}
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

${C}
`,q=`
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
      ${z}
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

${V}
`,ee=async e=>{var a,u;if(!c.authenticated){const o=W(),l={...o,items:(a=o.items)==null?void 0:a.filter(_=>!e.map(m=>m.product.sku).includes(_.product.sku))};return N(l),E.emit("wishlist/data",l),null}if(!c.wishlistId)throw Error("Wishlist ID is not set");const t=e.map(o=>o.id),{errors:r,data:i}=await M(q,{variables:{wishlistId:c.wishlistId,wishlistItemsIds:t}}),s=[...((u=i==null?void 0:i.removeProductsFromWishlist)==null?void 0:u.user_errors)??[],...r??[]];if(s.length>0)return D(s);const n=L(i.removeProductsFromWishlist.wishlist);return c.currentPage=1,E.emit("wishlist/data",n),n};export{V as W,J as a,Z as b,K as c,Y as d,X as e,M as f,W as g,D as h,N as i,z as j,Q as k,C as l,v as m,ee as r,c as s,L as t};
