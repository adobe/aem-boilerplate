/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,d as v,a as A,c as l}from"./store-config.js";import"./ServerErrorSignal.js";import{events as s}from"@dropins/tools/event-bus.js";import{merge as a,Initializer as b}from"@dropins/tools/lib.js";import{M,d as u,k as T}from"./fetch-graphql.js";import{CHECKOUT_DATA_FRAGMENT as m,CUSTOMER_FRAGMENT as I}from"../fragments.js";const S=async(e=!1)=>{i.authenticated=e,e?await K():v.value={pending:!1,data:null}},x=e=>e==null,E=(e,t)=>e.amount.value-t.amount.value,f=e=>!(!e||!e.method_code||!e.method_title||x(e.amount.value)||!e.amount.currency),d=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),N=e=>{if(f(e))return d(e)},w=e=>{if(e)return e.filter(f).map(t=>d(t)).sort(E)},k=e=>e?!!e.code&&!!e.label:!1,z=e=>{if(!k(e))return;const{code:t,label:n,region_id:r}=e;return r?{code:t,name:n,id:r}:{code:t,name:n}},R=e=>{const{code:t,label:n}=e;return{value:t,label:n}},q=e=>e?"code"in e&&"value"in e:!1,G=e=>e.filter(q).map(t=>{const{code:n,value:r}=t;return{code:n,value:r}}),p=e=>{const t=e.street.filter(Boolean);return{id:(e==null?void 0:e.id)||void 0,city:e.city,company:e.company||void 0,country:R(e.country),customAttributes:G(e.custom_attributes),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:z(e.region),street:t,telephone:e.telephone||void 0,vatId:e.vat_id||void 0}},O=e=>{if(e)return p(e)},P=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:n,selected_shipping_method:r,same_as_billing:o,...C}=t;return{...p(C),availableShippingMethods:w(n),selectedShippingMethod:N(r),sameAsBilling:o}}),ee=e=>({city:e.city,company:e.company,country_code:e.countryCode,custom_attributes:e.customAttributes.map(t=>({attribute_code:t.code,value:t.value})),firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook??!0,street:e.street,telephone:e.telephone,vat_id:e.vatId}),$=e=>{if(e)return{code:e.code,title:e.title}},B=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:n,title:r}=t;return{code:n,title:r}})},F=e=>{var n,r,o;if(!e)return;const t={availablePaymentMethods:B(e.available_payment_methods),billingAddress:O(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:$(e.selected_payment_method),shippingAddresses:P(e.shipping_addresses),isGuest:!i.authenticated};return a(t,(o=(r=(n=_.getConfig().models)==null?void 0:n.CartModel)==null?void 0:r.transformer)==null?void 0:o.call(r,e))},U=e=>{var n,r,o;if(!e)return;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return a(t,(o=(r=(n=_.getConfig().models)==null?void 0:n.CustomerModel)==null?void 0:r.transformer)==null?void 0:o.call(r,e))},D=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${m}
`,V=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${m}
`,c=async()=>{const e=i.cartId,t=i.authenticated===!1,n=t?D:V,r=t?{cartId:e}:{};if(t&&!e)throw new M;return await u({type:"query",query:n,options:{method:"POST",cache:"no-cache",variables:r},path:"cart",signalType:"cart",transformer:F})},H=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${I}
`,K=async()=>{if(i.authenticated)return await u({type:"query",query:H,options:{method:"POST",cache:"no-cache"},path:"customer",signalType:"customer",transformer:U})},Q=()=>[s.on("authenticated",S,{eager:!0}),s.on("cart/initialized",h,{eager:!0}),s.on("cart/reset",y),s.on("cart/updated",L),s.on("checkout/initialized",()=>{i.initialized=!0})],g=new b({init:async e=>{const t=e||{};g.config.setConfig(t),A.value.data||await T()},listeners:Q}),_=g.config,h=async e=>{if(!e)i.cartId=null,l.value={pending:!1,data:null},s.emit("checkout/initialized",null);else{i.cartId=e.id;const t=await c();s.emit("checkout/initialized",t||null)}},y=()=>{i.cartId=null,l.value={pending:!1,data:null}},L=async e=>{if(!i.initialized){await h(e);return}if(e===null){y();return}i.cartId===null?(i.cartId=e.id,await c()):i.cartId===e.id&&await c()};export{ee as a,w as b,S as c,K as d,_ as e,h as f,c as g,g as i,y as r,L as s,F as t};
