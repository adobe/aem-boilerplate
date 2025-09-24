/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as l}from"@dropins/tools/fetch-graphql.js";import{events as d}from"@dropins/tools/event-bus.js";const m={requestQuote:!1,editQuote:!1,deleteQuote:!1},_={authenticated:!1,permissions:m},E=new Proxy(_,{get:(a,t)=>a[t],set:(a,t,e)=>(a[t]=e,!0)});function g(a){if(!a||!a.data||!a.data.requestNegotiableQuote)return null;const t=a.data.requestNegotiableQuote.quote;return{uid:t.uid,createdAt:t.created_at,status:t.status,buyer:t.buyer,comments:t.comments.map(e=>({uid:e.uid,createdAt:e.created_at,author:e.author})),items:t.items.map(e=>({product:{uid:e.product.uid,sku:e.product.sku,name:e.product.name,priceRange:{maximumPrice:{regularPrice:{value:e.product.price_range.maximum_price.regular_price.value}}}},quantity:e.quantity,prices:{subtotalExcludingTax:{value:t.prices.subtotal_excluding_tax.value},subtotalIncludingTax:{value:t.prices.subtotal_including_tax.value},subtotalWithDiscountExcludingTax:{value:t.prices.subtotal_with_discount_excluding_tax.value},grandTotal:{value:t.prices.grand_total.value}}}))}}const p=`
  fragment NegotiableQuoteFragment on RequestNegotiableQuoteOutput {
    quote {
      uid
      created_at
      status
      buyer {
        firstname
        lastname
      }
      comments {
        uid
        created_at
        author {
          firstname
          lastname
        }
      }
      items {
        product {
          uid
          sku
          name
          price_range {
            maximum_price {
              regular_price {
                value
              }
            }
          }
        }
        quantity
      }
      prices {
        subtotal_excluding_tax {
          value
        }
        subtotal_including_tax {
          value
        }
        subtotal_with_discount_excluding_tax {
          value
        }
        grand_total {
          value
        }
      }
    }
  }
`,q=`
  mutation REQUEST_NEGOTIABLE_QUOTE_MUTATION(
    $cartId: ID!
    $quoteName: String!
    $comment: NegotiableQuoteCommentInput!
    $isDraft: Boolean
  ) {
    requestNegotiableQuote(
      input: {
        cart_id: $cartId
        quote_name: $quoteName
        comment: $comment
        is_draft: $isDraft
      }
    ) {
      ...NegotiableQuoteFragment
    }
  }
  ${p}
`,x=async a=>{const{cartId:t,quoteName:e,comment:u,isDraft:o}=a;if(!t)throw new Error("Cart ID is required");if(!e)throw new Error("Quote name is required");if(!u)throw new Error("Comment is required");return l(q,{variables:{cartId:t,quoteName:e,comment:{comment:u},isDraft:o}}).then(i=>{const{errors:n}=i;if(n){const s=n.map(c=>c.message).join("; ");throw new Error(`Failed to request negotiable quote: ${s}`)}const r=g(i);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/negotiable-quote-requested",{quote:r,input:{cartId:t,quoteName:e,comment:u,isDraft:o}}),r})};export{m as D,x as r,E as s};
//# sourceMappingURL=requestNegotiableQuote.js.map
