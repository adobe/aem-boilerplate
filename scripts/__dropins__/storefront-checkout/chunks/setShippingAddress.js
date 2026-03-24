/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as o,p as v,q as D,d as $,Q as N,I as l,t as q}from"./fetch-graphql.js";import{ESTIMATE_SHIPPING_METHOD_FRAGMENT as F,CHECKOUT_DATA_FRAGMENT as Q,NEGOTIABLE_QUOTE_FRAGMENT as w}from"../fragments.js";import"@dropins/tools/lib.js";import{a as H,t as R,b as T}from"./transform-shipping-estimate.js";import{events as C}from"@dropins/tools/event-bus.js";import{g as B}from"./values.js";import{c as b,t as P,e as V}from"./synchronizeCheckout.js";import{e as K,f as L,g as k}from"./guards.js";const x=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      ...ESTIMATE_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${F}
`,ps=async s=>{var I,_,S,m;const e=o.cartId,t=((I=s==null?void 0:s.criteria)==null?void 0:I.country_code)??((_=o.config)==null?void 0:_.defaultCountry);if(!e)throw new v;if(!t)throw new D;const{region_id:i,region_name:p,zip:a}=(s==null?void 0:s.criteria)??{},r=i||p?{region_id:typeof i=="string"?parseInt(i,10):i,region_code:p}:void 0,h={country_code:t,...a&&{postcode:a},...r&&{region:{...r.region_id&&{region_id:r.region_id},...r.region_code&&{region_code:r.region_code}}}},A={country_id:t,region:(S=h.region)==null?void 0:S.region_code,region_id:(m=h.region)==null?void 0:m.region_id,postcode:a},y=T(A);return $({options:{variables:{cartId:e,address:h}},path:"estimateShippingMethods",query:x,queueName:N.ShippingEstimate,transformer:H,type:"mutation"}).then(n=>{const{defaults:u,shipping:c}=b.getConfig(),f=c!=null&&c.filterOptions?n.filter(c.filterOptions):n,G=f.length>0,U=T(A);let M=null;if(G){const d=B("selectedShippingMethod");let g=n.find(E=>E.code===(d==null?void 0:d.code)&&E.carrier.code===(d==null?void 0:d.carrier.code));!g&&(u!=null&&u.selectedShippingMethod)&&(g=u.selectedShippingMethod(n)??void 0),g||(g=n[0]),M=R(g)}return C.emit("shipping/estimate",{address:U,availableShippingMethods:n,shippingMethod:M,success:!0}),f}).catch(n=>{throw C.emit("shipping/estimate",{address:y,shippingMethod:null,availableShippingMethods:[],success:!1}),n})},z=`
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

  ${Q}
`,j=`
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

  ${Q}
`,J=`
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

  ${w}
`,W=`
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

  ${w}
`,X=({address:s,customerAddressId:e,customerAddressUid:t,pickupLocationCode:i})=>{if(!e&&t)throw new l("customerAddressUid is not supported");if(!e&&!i&&!s)throw new q},Y=({address:s,customerAddressId:e,customerAddressUid:t,pickupLocationCode:i})=>{if(i)throw new l("pickup location is not supported in quotes");if(!t&&e)throw new l("customerAddressId is not supported in quotes");if(!t&&!s)throw new q},Z=s=>{const e=!!o.cartId,t=!!o.quoteId;e?X(s):t&&Y(s)},O=(s,e,t,i,p,a)=>async r=>await $({type:"mutation",query:t,options:{variables:{[e]:s,shippingAddress:p(r)}},path:a,queueName:N.Updates,transformer:i}),as=async s=>{K(),Z(s);const{defaults:e}=b.getConfig(),t=B("isBillToShipping")??(e==null?void 0:e.isBillToShipping);return await(!!o.cartId?O(o.cartId,"cartId",t?z:j,P,L,t?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart"):O(o.quoteId,"quoteId",t?W:J,V,k,t?"setNegotiableQuoteBillingAddress.quote":"setNegotiableQuoteShippingAddress.quote"))(s)};export{ps as e,as as s};
//# sourceMappingURL=setShippingAddress.js.map
