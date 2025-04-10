/*! Copyright 2025 Adobe
All Rights Reserved. */
import{W as f,s as d,g as T,a as w,f as p,h as I,t as P,b as S}from"./removeProductsFromWishlist.js";import{events as a}from"@dropins/tools/event-bus.js";const W=`
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
  
 ${f} 
`,E=async e=>{var m,h;if(!d.authenticated){const r=T();for(const n of e){const l=await g(n.sku);if(!((m=r.items)==null?void 0:m.some(t=>t.product.sku===n.sku))){let t={id:r.id,items:r.items};t.items=[...t.items,{product:l}],w(t),a.emit("wishlist/data",t),a.emit("wishlist/update",{action:"add",item:t.items[t.items.length-1]})}}return null}if(!d.wishlistId)throw Error("Wishlist ID is not set");const o={wishlistId:d.wishlistId,wishlistItems:e.map(({sku:r,parentSku:n,quantity:l,optionsUIDs:_,enteredOptions:t})=>({sku:r,parent_sku:n,quantity:l,selected_options:_,entered_options:t}))},{errors:i,data:s}=await p(W,{variables:o}),c=[...((h=s==null?void 0:s.addProductsToWishlist)==null?void 0:h.user_errors)??[],...i??[]];if(c.length>0)return I(c);const u=P(s.addProductsToWishlist.wishlist);return a.emit("wishlist/data",u),a.emit("wishlist/update",{action:"add",item:u.items[u.items.length-1]}),u},k=`
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
`,g=async e=>{if(!e)throw Error("Product SKU is not set");return p(k,{variables:{sku:e}}).then(({errors:o,data:i})=>{var s;return o?I(o):(s=i==null?void 0:i.products)!=null&&s.items?S(i.products.items[0]):null})};export{E as a,g};
