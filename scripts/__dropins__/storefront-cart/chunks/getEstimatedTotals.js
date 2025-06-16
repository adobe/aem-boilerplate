/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as h,f as T,h as m}from"./resetCart.js";import{C as A,t as E}from"./refreshCart.js";import"@dropins/tools/event-bus.js";import{CART_FRAGMENT as I}from"../fragments.js";const u=`
  mutation GET_ESTIMATED_TOTALS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!,
    $shipping_method: ShippingMethodInput,
    ${A}
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

  ${I}
  `,S=async o=>{var e,a;const r=h.cartId;if(!r)throw new Error("No cart ID found");if(!o)throw new Error("No address parameter found");const{countryCode:s,postcode:n,region:t}=o,c=(e=o.shipping_method)==null?void 0:e.carrier_code,p=(a=o.shipping_method)==null?void 0:a.method_code;return T(u,{variables:{cartId:r,address:{country_code:s||"US",postcode:n,region:(t==null?void 0:t.id)!==void 0?{region_id:t.id}:{region:(t==null?void 0:t.region)??""}},shipping_method:{carrier_code:c||"",method_code:p||""}}}).then(({errors:d,data:_})=>{if(d)return m(d);const i=_.estimateTotals;return i?E(i.cart):null})};export{S as g};
//# sourceMappingURL=getEstimatedTotals.js.map
