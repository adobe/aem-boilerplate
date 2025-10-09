/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as _}from"@dropins/tools/fetch-graphql.js";import{events as p}from"@dropins/tools/event-bus.js";const g={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1},f={authenticated:!1,permissions:g},l=new Proxy(f,{get:(t,e)=>t[e],set:(t,e,r)=>(t[e]=r,!0)});function y(t){return t?{uid:t.uid,name:t.name,createdAt:t.created_at,status:t.status,salesRepName:t.sales_rep_name,expirationDate:t.expiration_date,buyer:t.buyer,comments:t.comments.map(e=>({uid:e.uid,createdAt:e.created_at,author:e.author})),items:t.items.map(e=>{var r,u;return{product:{uid:e.product.uid,sku:e.product.sku,name:e.product.name},catalogDiscount:{amountOff:e.prices.catalog_discount.amount_off,percentOff:e.prices.catalog_discount.percent_off},discounts:((u=(r=e.prices)==null?void 0:r.discounts)==null?void 0:u.map(a=>({label:a.label,value:a.value,amount:{value:a.amount.value,currency:a.amount.currency}})))??[],stockStatus:e.product.stock_status,quantity:e.quantity,prices:{originalItemPrice:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency},rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency}}}}),prices:{grandTotal:{value:t.prices.grand_total.value,currency:t.prices.grand_total.currency},subtotalExcludingTax:{value:t.prices.subtotal_excluding_tax.value,currency:t.prices.subtotal_excluding_tax.currency},appliedTaxes:t.prices.applied_taxes.map(e=>({amount:{value:e.amount.value,currency:e.amount.currency},label:e.label}))},canCheckout:["UPDATED","DECLINED"].includes(t.status)&&l.permissions.checkoutQuote,canSendForReview:["SUBMITTED","DRAFT","UPDATED","DECLINED","EXPIRED"].includes(t.status)&&l.permissions.editQuote}:null}const E=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
		name
		created_at
    status
    sales_rep_name
    expiration_date
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
      text
    }
		items {
      product {
        name
        sku
        uid
				stock_status
				quantity
        price_range {
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
			prices {
				price {
					currency
					value
				}
				original_item_price {
					currency
					value
				}
				original_row_total {
					currency
					value
				}
				row_total {
					currency
					value
				}
        catalog_discount {
					amount_off
					percent_off
				}
				discounts {
					label
					value
					amount {
						currency
						value
					}
				}
			}
      quantity
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
      }
	  }
    prices {
      subtotal_excluding_tax {
				currency
				value
			}
			applied_taxes {
				amount {
					currency
					value
				}
				label
			}
			grand_total {
				currency
				value
			}
    }
  }
`,v=`
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
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${E}
`,N=async t=>{const{cartId:e,quoteName:r,comment:u,isDraft:a}=t;if(!e)throw new Error("Cart ID is required");if(!r)throw new Error("Quote name is required");if(!u)throw new Error("Comment is required");return _(v,{variables:{cartId:e,quoteName:r,comment:{comment:u},isDraft:a}}).then(o=>{var c,i;const{errors:s}=o;if(s){const m=s.map(d=>d.message).join("; ");throw new Error(`Failed to request negotiable quote: ${m}`)}const n=y((i=(c=o.data)==null?void 0:c.requestNegotiableQuote)==null?void 0:i.quote);if(!n)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/negotiable-quote-requested",{quote:n,input:{cartId:e,quoteName:r,comment:u,isDraft:a}}),n})};export{g as D,E as N,N as r,l as s,y as t};
//# sourceMappingURL=requestNegotiableQuote.js.map
