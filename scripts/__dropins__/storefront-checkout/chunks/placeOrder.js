import{k as T,M as w,g as A,p as k,n as D,F as L,U as R}from"./getCart.graphql.js";import{events as f}from"@dropins/tools/event-bus.js";const V=n=>({id:T.cartId,totalQuantity:n.totalQuantity,possibleOnepageCheckout:!0,items:n.items.map(a=>{var t;return{canApplyMsrp:!0,formattedPrice:"",id:a.id,quantity:a.totalQuantity,product:{canonicalUrl:a.product.canonicalUrl||"",mainImageUrl:a.product.image||"",name:a.product.name,productId:0,productType:a.product.productType,sku:a.product.sku},prices:{price:{value:a.price.value,currency:a.price.currency}},configurableOptions:((t=a.selectedOptions)==null?void 0:t.map(i=>({optionLabel:i.label,valueLabel:i.value})))||[]}})}),q=n=>{var i,c,l;const a=n.coupons[0],t=(i=n.payments)==null?void 0:i[0];return{appliedCouponCode:(a==null?void 0:a.code)||"",email:n.email,grandTotal:n.total,orderId:n.number,orderType:"checkout",otherTax:0,salesTax:n.totalTax,shipping:{shippingMethod:((c=n.shipping)==null?void 0:c.code)||"",shippingAmount:((l=n.shipping)==null?void 0:l.amount)||0},subtotalExcludingTax:n.subtotal,subtotalIncludingTax:0,payments:t?[{paymentMethodCode:(t==null?void 0:t.code)||"",paymentMethodName:(t==null?void 0:t.name)||"",total:n.total}]:[]}},Q=n=>n||0,S=n=>{var a;return{canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||""}};function M(n){if(!n||!("selected_options"in n))return;const a={};for(const t of n.selected_options)a[t.label]=t.value;return a}const P=n=>n?n.map(a=>{var t,i,c,l,u,s,e,p,_,o,y,g,h,v;return{type:a==null?void 0:a.__typename,id:a==null?void 0:a.id,discounted:(a==null?void 0:a.product.price_range.maximum_price.regular_price.value)*(a==null?void 0:a.quantity_ordered)!==(a==null?void 0:a.product_sale_price.value)*(a==null?void 0:a.quantity_ordered),total:{value:(a==null?void 0:a.product_sale_price.value)*(a==null?void 0:a.quantity_ordered),currency:a==null?void 0:a.product_sale_price.currency},totalInclTax:{value:(a==null?void 0:a.product_sale_price.value)*(a==null?void 0:a.quantity_ordered),currency:a==null?void 0:a.product_sale_price.currency},price:{value:a==null?void 0:a.product_sale_price.value,currency:a==null?void 0:a.product_sale_price.currency},priceInclTax:{value:a==null?void 0:a.product_sale_price.value,currency:a==null?void 0:a.product_sale_price.currency},totalQuantity:Q(a==null?void 0:a.quantity_ordered),regularPrice:{value:(c=(i=(t=a==null?void 0:a.product)==null?void 0:t.price_range)==null?void 0:i.maximum_price)==null?void 0:c.regular_price.value,currency:(s=(u=(l=a==null?void 0:a.product)==null?void 0:l.price_range)==null?void 0:u.maximum_price)==null?void 0:s.regular_price.currency},product:S(a==null?void 0:a.product),thumbnail:{label:((p=(e=a==null?void 0:a.product)==null?void 0:e.thumbnail)==null?void 0:p.label)||"",url:((o=(_=a==null?void 0:a.product)==null?void 0:_.thumbnail)==null?void 0:o.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((y=a.gift_card)==null?void 0:y.sender_name)||"",senderEmail:((g=a.gift_card)==null?void 0:g.sender_email)||"",recipientEmail:((h=a.gift_card)==null?void 0:h.recipient_email)||"",recipientName:((v=a.gift_card)==null?void 0:v.recipient_name)||""}:void 0,configurableOptions:M(a)}}):[];function U(n){return n!==null&&n.value!==void 0}const C=n=>n?{city:n.city,company:n.company||"",country:n.country_code||"",firstName:n.firstname,middleName:n.middlename||"",lastName:n.lastname,postCode:n.postcode||"",regionId:n.region_id||"",region:n.region||"",street:n.street.filter(a=>a!==null),telephone:n.telephone||"",customAttributes:n.custom_attributesV2.filter(U).map(a=>({code:a.code,value:a.value}))}:null,G=n=>{var u,s,e,p,_,o,y,g,h,v;const a=(u=n.payment_methods)==null?void 0:u[0],t=(a==null?void 0:a.type)??"",i=(a==null?void 0:a.name)??"",c=P(n.items),l=c.reduce((b,N)=>b+N.totalQuantity,0);return{status:n.status,isVirtual:n.is_virtual,coupons:((s=n==null?void 0:n.applied_coupons)==null?void 0:s.map(b=>({code:(b==null?void 0:b.code)??""})))||[],email:n.email??"",items:c,number:n.number,token:n.token,grandTotal:{value:((e=n.total)==null?void 0:e.grand_total.value)??0,currency:((p=n.total)==null?void 0:p.grand_total.currency)||""},totalQuantity:l,totalTax:{value:((_=n.total)==null?void 0:_.total_tax.value)??0,currency:((o=n.total)==null?void 0:o.total_tax.currency)||""},subtotal:{value:((y=n.total)==null?void 0:y.subtotal.value)??0,currency:((g=n.total)==null?void 0:g.subtotal.currency)||""},shipping:{amount:((h=n.total)==null?void 0:h.total_shipping.value)??0,currency:((v=n.total)==null?void 0:v.total_shipping.currency)||"",code:n.shipping_method??""},payments:[{code:t,name:i}],shippingAddress:C(n.shipping_address),billingAddress:C(n.billing_address)}},F=`
  mutation placeOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      orderV2 {
        number
        status
        token
        is_virtual
        applied_coupons {
          code
        }
        email
        id
        total {
          grand_total {
            currency
            value
          }
          subtotal {
            currency
            value
          }
          total_shipping {
            currency
            value
          }
          total_tax {
            currency
            value
          }
        }
        shipping_method
        payment_methods {
          name
          type
        }
        billing_address {
          firstname
          middlename
          lastname
          street
          city
          postcode
          telephone
          country_code
          region
          region_id
          company
          custom_attributesV2 {
            code
            ... on AttributeValue {
              value
            }
          }
        }
        shipping_address {
          firstname
          middlename
          lastname
          street
          city
          postcode
          telephone
          country_code
          region
          region_id
          company
          custom_attributesV2 {
            code
            ... on AttributeValue {
              value
            }
          }
        }
        items {
          __typename
          id
          discounts {
            amount {
              value
            }
          }
          product {
            __typename
            canonical_url
            image {
              url
            }
            thumbnail {
              label
              url
            }
            name
            sku
            uid
            price_range {
              maximum_price {
                regular_price {
                  currency
                  value
                }
              }
            }
          }
          selected_options {
            label
            value
          }
          product_sale_price {
            value
            currency
          }
          quantity_ordered
          ... on GiftCardOrderItem {
            gift_card {
              recipient_name
              recipient_email
              sender_name
              sender_email
              message
            }
          }
        }
      }
    }
  }
`,x={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},X={PLACE_ORDER:"place-order"};function E(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function O(n,a){const t=E();t.push({[n]:null}),t.push({[n]:a})}function $(n,a){E().push(i=>{const c=i.getState?i.getState():{};i.push({event:n,eventInfo:{...c,...a}})})}function H(n){const a=V(n),t=q(n);console.debug({shoppingCartContext:a,orderContext:t}),O(x.SHOPPING_CART_CONTEXT,{...a}),O(x.ORDER_CONTEXT,{...t}),$(X.PLACE_ORDER)}function j(n){throw n.every(t=>{var i;return(i=t.extensions)==null?void 0:i.category})?new L(n):new R(n[0].message)}const J=async()=>{const n=T.cartId;if(!n)throw new w;const{data:a,errors:t}=await A(F,{variables:{cartId:n}}).catch(k);t&&j(t);const i=G(a.placeOrder.orderV2);return H(i),f.emit("checkout/order",i),D.value={pending:!1,data:null},f.emit("cart/reset",void 0),i};export{J as p};
