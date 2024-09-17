import{k as _,M as y,d as h,l as g,x as l}from"./fixtures.js";import{t as m}from"./transform-shipping-methods.js";import"@dropins/tools/event-bus.js";const I=`
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
`,M=t=>t?!!t.id&&!!t.code&&!!t.name:!1,S=t=>{if(t)return t.filter(M).map(e=>{const{id:a,code:n,name:i}=e;return{id:a,code:n,name:i}})};var f=(t=>(t.SHIPPING="shipping_addresses",t.BILLING="billing_address",t))(f||{}),v=(t=>(t.City="city",t.Company="company",t.Country="country_id",t.FirstName="firstname",t.LastName="lastname",t.PostCode="postcode",t.Region="region",t.RegionId="region_id",t.SaveInAddressBook="save_in_address_book",t.Street="street",t.Telephone="telephone",t.Vat="vat_id",t))(v||{});const L=async t=>{const e=_.cartId,{criteria:a}=t||{},{country_code:n,region_id:i,region_name:s,zip:r}=a||{};if(!e)throw new y;if(!n)throw new h;const o=typeof i=="string"?parseInt(i,10):i,c=i||s?{...o&&{region_id:o},...s&&{region_code:s}}:void 0,u={country_code:n,...r&&{postcode:r},...c&&{region:c}};return await g({type:"mutation",query:I,options:{variables:{cartId:e,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:m})},d=`
query getRegions($countryCode: String!) {
    country(id: $countryCode) {
        id
        available_regions {
            id
            code
            name
        }
    }
}`,N=async(t,e)=>(l.value.addressType=e,g({type:"query",query:d,options:{variables:{countryCode:t}},path:"country.available_regions",signalType:"regions",transformer:S})),p="-",R=`
`,E=2e3,w=(t,e)=>Object.keys(e).filter(a=>a.startsWith(t)).sort((a,n)=>parseInt(a.replace(`${t}${p}`,""),10)-parseInt(n.replace(`${t}${p}`,""),10)).map(a=>e[a]);export{f as A,E as D,p as M,v as a,w as b,R as c,L as e,N as g};
