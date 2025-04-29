/*! Copyright 2025 Adobe
All Rights Reserved. */
import{j as a,k as n,l as o,s as h,g as l,f as T,h as u,t as S}from"./removeProductsFromWishlist.js";import{events as c}from"@dropins/tools/event-bus.js";const m=`
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
    ${a}
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
        updated_at
        sharing_code
        items_count
        items_v2(
            ${n}
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
    }
  }

${o}
`,p=async(t,_,I)=>{if(!h.authenticated)return l();if(!t)throw Error("Wishlist ID is not set");return T(m,{variables:{wishlistId:t,currentPage:_,pageSize:I}}).then(({errors:i,data:s})=>{var r;if(i)return u(i);if(!((r=s==null?void 0:s.customer)!=null&&r.wishlist_v2))return null;const e=S(s.customer.wishlist_v2);return c.emit("wishlist/data",e),e})};export{p as g};
