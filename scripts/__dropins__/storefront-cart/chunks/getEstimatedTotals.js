/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as h,f as _,h as T}from"./resetCart.js";import{t as u}from"./refreshCart.js";import"@dropins/tools/event-bus.js";import{CART_FRAGMENT as E}from"../fragments.js";const I=`
  mutation GET_ESTIMATED_TOTALS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!,
    $shipping_method: ShippingMethodInput,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
    estimateTotals(
      input: {
        cart_id: $cartId
        address: $address
        shipping_method: $shipping_method
      }
    )  {
      cart {
       ...CART_FRAGMENT
      }
    }
    }

  ${E}
  `,$=async r=>{var e,a;const o=h.cartId;if(!o)throw new Error("No cart ID found");if(!r)throw new Error("No address parameter found");const{countryCode:n,postcode:s,region:t}=r,c=(e=r.shipping_method)==null?void 0:e.carrier_code,p=(a=r.shipping_method)==null?void 0:a.method_code;return _(I,{variables:{cartId:o,address:{country_code:n||"US",postcode:s,region:(t==null?void 0:t.id)!==void 0?{region_id:t.id}:{region:(t==null?void 0:t.region)??""}},shipping_method:{carrier_code:c||"",method_code:p||""}}}).then(({errors:d,data:m})=>{if(d)return T(d);const i=m.estimateTotals;return i?u(i.cart):null})};export{$ as g};
//# sourceMappingURL=getEstimatedTotals.js.map
