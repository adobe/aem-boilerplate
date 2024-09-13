import{s as _,f as m,h as T}from"./resetCart.js";import{C as E,a as I,t as u}from"./CartFragment.js";import"@dropins/tools/event-bus.js";const A=`
  mutation GET_ESTIMATED_TOTALS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!,
    $shipping_method: ShippingMethodInput,
    ${E}

  ) {
    estimateTotals(
      input: {
        cart_id: $cartId
        address: $address
        shipping_method: $shipping_method
      }
    )  {
      cart {
       ...CartFragment
      }
    }
    }
  ${I}
  `,M=async r=>{var e,a;const o=_.cartId;if(!o)throw new Error("No cart ID found");if(!r)throw new Error("No address parameter found");const{countryCode:i,postcode:n,region:t}=r,c=(e=r.shipping_method)==null?void 0:e.carrier_code,p=(a=r.shipping_method)==null?void 0:a.method_code;return m(A,{variables:{cartId:o,address:{country_code:i||"US",postcode:n,region:(t==null?void 0:t.id)!==void 0?{region_id:t.id}:{region:(t==null?void 0:t.region)??""}},shipping_method:{carrier_code:c||"",method_code:p||""}}}).then(({errors:d,data:h})=>{if(d)return T(d);const s=h.estimateTotals;return s?u(s.cart):null})};export{M as g};
