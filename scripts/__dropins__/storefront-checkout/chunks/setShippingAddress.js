import{a as s,b as p,M as u,c as _}from"./getMultilineValues.js";import{k as g,M as I,l}from"./fixtures.js";import{C,t as h}from"./getCart.graphql.js";import"@dropins/tools/event-bus.js";const A=/^\d+$/,T=t=>{if(A.test(t))return parseInt(t,10)},m=`
  mutation setShippingAddress($cartId: String!, $address: CartAddressInput!, $pickup_location_code: String) {
    setShippingAddressesOnCart(
      input: {
       cart_id: $cartId,
       shipping_addresses: [{ address: $address, pickup_location_code: $pickup_location_code }]
      }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${C}
`,y=["city","company","country_code","firstname","lastname","postcode","region","region_id","save_in_address_book","street","telephone","vat_id"],$=t=>{const a={city:t[s.City],company:t[s.Company],country_code:t[s.Country],firstname:t[s.FirstName],lastname:t[s.LastName],postcode:t[s.PostCode],save_in_address_book:!0,street:p(s.Street,t),telephone:t[s.Telephone],vat_id:t[s.Vat]},r=t[s.Region],c=T(r);c?a.region_id=c:a.region=r;const d=Object.keys(t).filter(e=>!e.startsWith("street")).filter(e=>!y.includes(e)).filter(e=>e!=="country_id").map(e=>{const[n,i]=e.split(u);if(!i)return{attribute_code:n,value:t[e]};const o=p(n,t).join(_);return{attribute_code:n,value:o}}).filter((e,n,i)=>n===i.findIndex(o=>o.attribute_code===e.attribute_code));return d.length>0&&(a.custom_attributes=d),a},k=async({signal:t,...a})=>{const r=g.cartId;if(!r)throw new I;return await l({type:"mutation",query:m,options:{signal:t,variables:{cartId:r,...a}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:h})};export{y as S,$ as p,k as s};
