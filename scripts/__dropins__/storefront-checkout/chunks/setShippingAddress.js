/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as o,p as G,q as D,d as T,Q as E,I as l,t as Q}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import{t as F,a as O}from"./transform-shipping-estimate.js";import{a as R}from"./transform-shipping-methods.js";import{events as $}from"@dropins/tools/event-bus.js";import{g as N}from"./values.js";import{c as w,t as x,e as H}from"./synchronizeCheckout.js";import{e as V,f as K,g as L}from"./guards.js";import{CHECKOUT_DATA_FRAGMENT as y,NEGOTIABLE_QUOTE_FRAGMENT as B}from"../fragments.js";const k=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      carrier_title
      carrier_code
      method_title
      method_code
      available
      amount {
        currency
        value
      }
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
      error_message
    }
  }
`,ae=async e=>{var _,m,I,S;const s=o.cartId,t=((_=e==null?void 0:e.criteria)==null?void 0:_.country_code)??((m=o.config)==null?void 0:m.defaultCountry);if(!s)throw new G;if(!t)throw new D;const{region_id:i,region_name:a,zip:p}=(e==null?void 0:e.criteria)??{},n=i||a?{region_id:typeof i=="string"?parseInt(i,10):i,region_code:a}:void 0,h={country_code:t,...p&&{postcode:p},...n&&{region:{...n.region_id&&{region_id:n.region_id},...n.region_code&&{region_code:n.region_code}}}},A={country_id:t,region:(I=h.region)==null?void 0:I.region_code,region_id:(S=h.region)==null?void 0:S.region_id,postcode:p},b=O(A);return T({options:{variables:{cartId:s,address:h}},path:"estimateShippingMethods",query:k,queueName:E.ShippingEstimate,transformer:R,type:"mutation"}).then(r=>{const{defaults:c,shipping:u}=w.getConfig(),f=u!=null&&u.filterOptions?r.filter(u.filterOptions):r,v=f.length>0,U=O(A);let M=null;if(v){const d=N("selectedShippingMethod");let g=r.find(C=>C.code===(d==null?void 0:d.code)&&C.carrier.code===(d==null?void 0:d.carrier.code));!g&&(c!=null&&c.selectedShippingMethod)&&(g=c.selectedShippingMethod(r)??void 0),g||(g=r[0]),M=F(g)}return $.emit("shipping/estimate",{address:U,availableShippingMethods:r,shippingMethod:M,success:!0}),f}).catch(r=>{throw $.emit("shipping/estimate",{address:b,shippingMethod:null,availableShippingMethods:[],success:!1}),r})},z=`
  mutation setShippingAddressOnCartAndUseAsBilling(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        id
      }
    }

    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: { same_as_shipping: true } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,P=`
  mutation setShippingAddressOnCart(
    $cartId: String!
    $shippingAddress: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${y}
`,j=`
  mutation setShippingAddressOnQuote(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${B}
`,J=`
  mutation setShippingAddressOnQuoteAndUseAsBilling(
    $quoteId: ID!
    $shippingAddress: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: { quote_uid: $quoteId, shipping_addresses: [$shippingAddress] }
    ) {
      quote {
        uid
      }
    }

    setNegotiableQuoteBillingAddress(
      input: {
        quote_uid: $quoteId
        billing_address: { same_as_shipping: true }
      }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${B}
`,W=({address:e,customerAddressId:s,customerAddressUid:t,pickupLocationCode:i})=>{if(!s&&t)throw new l("customerAddressUid is not supported");if(!s&&!i&&!e)throw new Q},X=({address:e,customerAddressId:s,customerAddressUid:t,pickupLocationCode:i})=>{if(i)throw new l("pickup location is not supported in quotes");if(!t&&s)throw new l("customerAddressId is not supported in quotes");if(!t&&!e)throw new Q},Y=e=>{const s=!!o.cartId,t=!!o.quoteId;s?W(e):t&&X(e)},q=(e,s,t,i,a,p)=>async n=>await T({type:"mutation",query:t,options:{variables:{[s]:e,shippingAddress:a(n)}},path:p,queueName:E.Updates,transformer:i}),pe=async e=>{V(),Y(e);const{defaults:s}=w.getConfig(),t=N("isBillToShipping")??(s==null?void 0:s.isBillToShipping);return await(!!o.cartId?q(o.cartId,"cartId",t?z:P,x,K,t?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart"):q(o.quoteId,"quoteId",t?J:j,H,L,t?"setNegotiableQuoteBillingAddress.quote":"setNegotiableQuoteShippingAddress.quote"))(e)};export{ae as e,pe as s};
//# sourceMappingURL=setShippingAddress.js.map
