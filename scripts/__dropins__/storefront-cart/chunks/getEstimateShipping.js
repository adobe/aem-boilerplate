/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as a,f as u,h as l}from"./resetCart.js";import{events as p}from"@dropins/tools/event-bus.js";const h=e=>{var r,t;return{countryCode:e.country_code||"US",postCode:e.postcode||"",region:((r=e.region)==null?void 0:r.region)||"",regionId:(t=e.region)==null?void 0:t.id}},m=e=>e?{carrierCode:e.carrier_code||"",methodCode:e.method_code||"",amount:e.amount,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}:null,g=`
query COUNTRIES_QUERY {
  countries {
    label: full_name_locale
    id
  }
  storeConfig {
    defaultCountry: default_country
  }
}
`,f=`
query REGIONS_QUERY($id: String) {
  country(id: $id) {
    available_regions {
      code
			name
    }
  }
}
`,E=`
  mutation ESTIMATE_SHIPPING_METHODS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(
      input: {
        cart_id: $cartId
        address: $address
      }
    ) {
      amount {
        currency
        value
      }
      carrier_code
      method_code
      error_message
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
    }
  }
`,x=async e=>{const r=a.cartId;if(!r)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:t,postcode:c,region:n}=e,i={country_code:t||"US",postcode:c||"",region:{region:(n==null?void 0:n.region)||"",region_id:n==null?void 0:n.id}};return u(E,{variables:{cartId:r,address:i}}).then(({errors:o,data:s})=>{if(o)return l(o);const d=s.estimateShippingMethods.find(_=>!_.error_message)||null;return p.emit("shipping/estimate",{address:h(i),shippingMethod:m(d)}),d})},C=async()=>u(g,{method:"GET"}).then(({errors:e,data:r})=>{var n,i;if(e)return l(e);const t=((n=r==null?void 0:r.countries)==null?void 0:n.sort((o,s)=>o.label.localeCompare(s.label)))||[],c=((i=r==null?void 0:r.storeConfig)==null?void 0:i.defaultCountry)||"US";return t.forEach(o=>{o.isDefaultCountry=o.id===c}),t}),T=async e=>u(f,{method:"GET",variables:{id:e}}).then(({errors:r,data:t})=>{var c;return r?l(r):((c=t==null?void 0:t.country)==null?void 0:c.available_regions)||[]});export{C as a,T as b,x as g};
//# sourceMappingURL=getEstimateShipping.js.map
