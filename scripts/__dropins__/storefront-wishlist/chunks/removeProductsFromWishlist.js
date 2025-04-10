/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{FetchGraphQL as R}from"@dropins/tools/fetch-graphql.js";function P(e){const t=document.cookie.split(";");for(const r of t)if(r.trim().startsWith(`${e}=`))return r.trim().substring(e.length+1);return null}const O={wishlistId:null,authenticated:!1,currentPage:1,pageSize:12},m=new Proxy(O,{set(e,t,r){if(e[t]=r,t==="wishlistId"){if(r===m.wishlistId)return!0;if(r===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const i=new Date;i.setDate(i.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${r}; expires=${i.toUTCString()}; path=/`}return Reflect.set(e,t,r)},get(e,t){return t==="wishlistId"?P("DROPIN__WISHLIST__WISHLIST-ID"):e[t]}}),p="DROPIN__WISHLIST__WISHLIST__DATA";function A(e){if(e)try{localStorage.setItem(p,JSON.stringify(e))}catch(t){M(t)?console.error("LocalStorage quota exceeded:",t):console.error("Error saving wishlist:",t)}else localStorage.removeItem(p)}const M=e=>e instanceof DOMException&&e.name==="QuotaExceededError";function W(){try{const e=localStorage.getItem(p);return e?JSON.parse(e):{id:"",items:[]}}catch(e){return console.error("Error retrieving wishlist:",e),{id:"",items:[]}}}const{setEndpoint:q,setFetchGraphQlHeader:V,removeFetchGraphQlHeader:j,setFetchGraphQlHeaders:B,fetchGraphQl:v,getConfig:J}=new R().getMethods();function N(e){var t;return e?{name:e.name,sku:e.sku,uid:e.uid,image:w(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(r=>r.name),prices:F(e),productAttributes:y(e)}:null}function w(e){var t,r;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(r=e.thumbnail)==null?void 0:r.label}}function F(e){var t,r,i,s,n,c,u,o,a,l,_,I,d,f,h,g,T,S;return{regularPrice:{currency:(i=(r=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:r.regular_price)==null?void 0:i.currency,value:(c=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.regular_price)==null?void 0:c.value},finalPrice:{currency:(a=(o=(u=e.price_range)==null?void 0:u.minimum_price)==null?void 0:o.final_price)==null?void 0:a.currency,value:(I=(_=(l=e.price_range)==null?void 0:l.minimum_price)==null?void 0:_.final_price)==null?void 0:I.value},discount:{amountOff:(h=(f=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:f.discount)==null?void 0:h.amount_off,percentOff:(S=(T=(g=e.price_range)==null?void 0:g.minimum_price)==null?void 0:T.discount)==null?void 0:S.percent_off},fixedProductTaxes:G(e)}}function y(e){var t,r;return(r=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:r.map(i=>{const s=i.code.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ");return{...i,code:s}})}function G(e){var t,r,i;return(i=(r=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:r.fixed_product_taxes)==null?void 0:i.map(s=>({money:{value:s.amount.value,currency:s.amount.currency},label:s.label}))}function b(e){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,total_pages:e.items_v2.page_info.total_pages,items:D(e)}:null}function D(e){var t,r;return(r=(t=e==null?void 0:e.items_v2)==null?void 0:t.items)!=null&&r.length?e.items_v2.items.map(i=>({id:i.id,quantity:i.quantity,description:i.description,added_at:i.added_at,product:N(i.product)})):[]}const L=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},x=`
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

${x}
`,C=`
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
`,k=`
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
  ${C}
`,U=`
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2(
        currentPage: 0,
        pageSize: 0
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

${k}
`,$=`
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
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

${U}     
`,Z=async e=>{var c,u;if(!m.authenticated){const o=W(),a={...o,items:(c=o.items)==null?void 0:c.filter(l=>!e.map(_=>_.product.sku).includes(l.product.sku))};return A(a),E.emit("wishlist/data",a),null}if(!m.wishlistId)throw Error("Wishlist ID is not set");const t=e.map(o=>o.id),{errors:r,data:i}=await v($,{variables:{wishlistId:m.wishlistId,wishlistItemsIds:t}}),s=[...((u=i==null?void 0:i.removeProductsFromWishlist)==null?void 0:u.user_errors)??[],...r??[]];if(s.length>0)return L(s);const n=b(i.removeProductsFromWishlist.wishlist);return E.emit("wishlist/data",n),n};export{U as W,A as a,N as b,k as c,q as d,V as e,v as f,W as g,L as h,j as i,B as j,J as k,Z as r,m as s,b as t};
