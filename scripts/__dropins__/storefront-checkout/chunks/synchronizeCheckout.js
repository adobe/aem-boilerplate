/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,M as C,d as l,l as A}from"./fetch-graphql.js";import{d as x,a as b,c}from"./store-config.js";import"./ServerErrorSignal.js";import{events as s}from"@dropins/tools/event-bus.js";import{merge as u,Initializer as M}from"@dropins/tools/lib.js";import{CHECKOUT_DATA_FRAGMENT as a,CUSTOMER_FRAGMENT as T}from"../fragments.js";const S=async(e=!1)=>{i.authenticated=e,e?await K():x.value={pending:!1,data:null}},I=e=>e==null,N=(e,t)=>e.amount.value-t.amount.value,m=e=>!(!e||!e.method_code||!e.method_title||I(e.amount.value)||!e.amount.currency),f=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),E=e=>{if(m(e))return f(e)},k=e=>{if(e)return e.filter(m).map(t=>f(t)).sort(N)},w=e=>e?!!e.code&&!!e.label:!1,z=e=>{if(!w(e))return;const{code:t,label:r,region_id:n}=e;return n?{code:t,name:r,id:n}:{code:t,name:r}},R=e=>{const{code:t,label:r}=e;return{value:t,label:r}},q=e=>e?"code"in e&&"value"in e:!1,G=e=>e.filter(q).map(t=>{const{code:r,value:n}=t;return{code:r,value:n}}),p=e=>{const t=e.street.filter(Boolean);return{id:(e==null?void 0:e.id)||void 0,city:e.city,company:e.company||void 0,country:R(e.country),customAttributes:G(e.custom_attributes),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:z(e.region),street:t,telephone:e.telephone||void 0,vatId:e.vat_id||void 0,prefix:e.prefix||void 0,suffix:e.suffix||void 0,middleName:e.middlename||void 0,fax:e.fax||void 0}},O=e=>{if(e)return p(e)},P=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:r,selected_shipping_method:n,same_as_billing:o,...v}=t;return{...p(v),availableShippingMethods:k(r),selectedShippingMethod:E(n),sameAsBilling:o}}),ee=e=>({city:e.city,company:e.company,country_code:e.countryCode,custom_attributes:e.customAttributes.map(t=>({attribute_code:t.code,value:t.value})),firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook??!0,street:e.street,telephone:e.telephone,vat_id:e.vatId,prefix:e.prefix,suffix:e.suffix,middlename:e.middleName,fax:e.fax}),$=e=>{if(e)return{code:e.code,title:e.title}},B=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:r,title:n}=t;return{code:r,title:n}})},D=e=>{var r,n,o;if(!e)return;const t={availablePaymentMethods:B(e.available_payment_methods),billingAddress:O(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:$(e.selected_payment_method),shippingAddresses:P(e.shipping_addresses),isGuest:!i.authenticated};return u(t,(o=(n=(r=_.getConfig().models)==null?void 0:r.CartModel)==null?void 0:n.transformer)==null?void 0:o.call(n,e))},F=e=>{var r,n,o;if(!e)return;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return u(t,(o=(n=(r=_.getConfig().models)==null?void 0:r.CustomerModel)==null?void 0:n.transformer)==null?void 0:o.call(n,e))},U=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${a}
`,V=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${a}
`,d=async()=>{const e=i.cartId,t=i.authenticated===!1,r=t?U:V,n=t?{cartId:e}:{};if(t&&!e)throw new C;return await l({type:"query",query:r,options:{method:"POST",cache:"no-cache",variables:n},path:"cart",signalType:"cart",transformer:D})},H=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${T}
`,K=async()=>{if(i.authenticated)return await l({type:"query",query:H,options:{method:"POST",cache:"no-cache"},path:"customer",signalType:"customer",transformer:F})},Q=()=>[s.on("authenticated",S,{eager:!0}),s.on("cart/initialized",h,{eager:!0}),s.on("cart/reset",L),s.on("cart/updated",y)],g=new M({init:async e=>{const t=e||{};g.config.setConfig(t),b.value.data||await A()},listeners:Q}),_=g.config,h=async e=>{if(i.initialized)return y(e);const t=e?e.id:null;i.cartId=t;const r=t?await d():null;c.value={pending:!1,data:r},i.initialized=!0,s.emit("checkout/initialized",r||null)},L=()=>{i.cartId=null,c.value={pending:!1,data:null},s.emit("checkout/updated",null)},y=async e=>{if(!i.initialized)return h(e);const t=e?e.id:null;i.cartId=t;const r=t?await d():null;c.value={pending:!1,data:r},s.emit("checkout/updated",r||null)};export{ee as a,D as b,_ as c,S as d,K as e,h as f,d as g,g as i,L as r,y as s,k as t};
