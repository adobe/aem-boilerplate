import{k as h,M as l,d as I,l as u,x as M,y as S,a as v,g as b,p as $,C as g,t as m,b as f}from"./getCart.graphql.js";import"@dropins/tools/event-bus.js";const E=`
mutation estimateShippingMethods(
	$cartId: String!
  $address: EstimateAddressInput!
) {
	estimateShippingMethods(
		input: {
			cart_id: $cartId
			address: $address
		}
	) {
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
`,w=t=>!!(t!=null&&t.is_email_available),C=t=>t?!!t.id&&!!t.code&&!!t.name:!1,T=t=>{if(t)return t.filter(C).map(a=>{const{id:e,code:i,name:o}=a;return{id:e,code:i,name:o}})};var O=(t=>(t.SHIPPING="shipping_addresses",t.BILLING="billing_address",t))(O||{}),s=(t=>(t.City="city",t.Company="company",t.Country="country_id",t.FirstName="firstname",t.LastName="lastname",t.PostCode="postcode",t.Region="region",t.RegionId="region_id",t.SaveInAddressBook="save_in_address_book",t.Street="street",t.Telephone="telephone",t.Vat="vat_id",t))(s||{});const V=async t=>{const a=h.cartId,{criteria:e}=t||{},{country_code:i,region_id:o,region_name:c,zip:n}=e||{};if(!a)throw new l;if(!i)throw new I;const r=typeof o=="string"?parseInt(o,10):o,p=o||c?{...r&&{region_id:r},...c&&{region_code:c}}:void 0,d={country_code:i,...n&&{postcode:n},...p&&{region:p}};return await u({type:"mutation",query:E,options:{variables:{cartId:a,address:d}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:M})},R=`
query getRegions($countryCode: String!) {
    country(id: $countryCode) {
        id
        available_regions {
            id
            code
            name
        }
    }
}`,Q=async(t,a)=>(S.value.addressType=a,u({type:"query",query:R,options:{variables:{countryCode:t}},path:"country.available_regions",signalType:"regions",transformer:T})),N=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,A=t=>{if(!(!t||t.length===0))throw Error(t.map(a=>a.message).join(" "))},H=async t=>{if(!t)throw new v;const{data:a,errors:e}=await b(N,{method:"GET",cache:"no-cache",variables:{email:t}}).catch($);return e&&A(e),w(a.isEmailAvailable)},k=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${g}
`,W=async t=>{const a=h.cartId;if(!a)throw new l;return await u({type:"mutation",query:k,options:{variables:{cartId:a,email:t}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:m})},G=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${g}
`,X=async t=>{const a=h.cartId;if(!a)throw new l;if(!t)throw new f;return await u({type:"mutation",query:G,options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:m})},y="-",P=`
`,z=2e3,_=(t,a)=>Object.keys(a).filter(e=>e.startsWith(t)).sort((e,i)=>parseInt(e.replace(`${t}${y}`,""),10)-parseInt(i.replace(`${t}${y}`,""),10)).map(e=>a[e]),D=/^\d+$/,q=t=>{if(D.test(t))return parseInt(t,10)},L=`
  mutation setShippingAddress($cartId: String!, $address: CartAddressInput!) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [{ address: $address }] }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${g}
`,U=["city","company","country_code","firstname","lastname","postcode","region","region_id","save_in_address_book","street","telephone","vat_id"],K=t=>{const a={city:t[s.City],company:t[s.Company],country_code:t[s.Country],firstname:t[s.FirstName],lastname:t[s.LastName],postcode:t[s.PostCode],save_in_address_book:!0,street:_(s.Street,t),telephone:t[s.Telephone],vat_id:t[s.Vat]},e=t[s.Region],i=q(e);i?a.region_id=i:a.region=e;const c=Object.keys(t).filter(n=>!n.startsWith("street")).filter(n=>!U.includes(n)).filter(n=>n!=="country_id").map(n=>{const[r,p]=n.split(y);if(!p)return{attribute_code:r,value:t[n]};const d=_(r,t).join(P);return{attribute_code:r,value:d}}).filter((n,r,p)=>r===p.findIndex(d=>d.attribute_code===n.attribute_code));return c.length>0&&(a.custom_attributes=c),a},J=async({signal:t,address:a})=>{const e=h.cartId;if(!e)throw new l;return await u({type:"mutation",query:L,options:{signal:t,variables:{cartId:e,address:a}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:m})},x=`
  mutation setShippingMethods(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${g}
`,Y=async t=>{const a=h.cartId;if(!a)throw new l;return await u({type:"mutation",query:x,options:{variables:{cartId:a,shippingMethods:t}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:m})};export{s as A,z as D,y as M,U as S,X as a,J as b,Y as c,_ as d,V as e,O as f,Q as g,P as h,H as i,K as p,W as s};
