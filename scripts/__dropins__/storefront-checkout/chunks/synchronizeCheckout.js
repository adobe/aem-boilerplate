/*! Copyright 2024 Adobe
All Rights Reserved. */
import{s as i,M as C,d as l,l as A,n as x}from"./fetch-graphql.js";import{b,d as M,c}from"./store-config.js";import"./ServerErrorSignal.js";import{events as o}from"@dropins/tools/event-bus.js";import{merge as u,Initializer as T}from"@dropins/tools/lib.js";import{CHECKOUT_DATA_FRAGMENT as a,CUSTOMER_FRAGMENT as S}from"../fragments.js";const I=async(e=!1)=>{i.authenticated=e,e?await K():b.value={pending:!1,data:null}},N=e=>e==null,E=(e,t)=>e.amount.value-t.amount.value,m=e=>!(!e||!e.method_code||!e.method_title||N(e.amount.value)||!e.amount.currency),f=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),k=e=>{if(m(e))return f(e)},w=e=>{if(e)return e.filter(m).map(t=>f(t)).sort(E)},z=e=>e?!!e.code&&!!e.label:!1,R=e=>{if(!z(e))return;const{code:t,label:r,region_id:n}=e;return n?{code:t,name:r,id:n}:{code:t,name:r}},q=e=>{const{code:t,label:r}=e;return{value:t,label:r}},P=e=>e?"code"in e&&"value"in e:!1,G=e=>e.filter(P).map(t=>{const{code:r,value:n}=t;return{code:r,value:n}}),d=e=>{const t=e.street.filter(Boolean);return{id:(e==null?void 0:e.id)||void 0,city:e.city,company:e.company||void 0,country:q(e.country),customAttributes:G(e.custom_attributes),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:R(e.region),street:t,telephone:e.telephone||void 0,vatId:e.vat_id||void 0,prefix:e.prefix||void 0,suffix:e.suffix||void 0,middleName:e.middlename||void 0,fax:e.fax||void 0}},O=e=>{if(e)return d(e)},$=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:r,selected_shipping_method:n,same_as_billing:s,...v}=t;return{...d(v),availableShippingMethods:w(r),selectedShippingMethod:k(n),sameAsBilling:s}}),te=e=>({city:e.city,company:e.company,country_code:e.countryCode,custom_attributes:e.customAttributes.map(t=>({attribute_code:t.code,value:t.value})),firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook??!0,street:e.street,telephone:e.telephone,vat_id:e.vatId,prefix:e.prefix,suffix:e.suffix,middlename:e.middleName,fax:e.fax}),U=e=>{if(e)return{code:e.code,title:e.title}},B=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:r,title:n}=t;return{code:r,title:n}})},D=e=>{var r,n,s;if(!e)return;const t={availablePaymentMethods:B(e.available_payment_methods),billingAddress:O(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:U(e.selected_payment_method),shippingAddresses:$(e.shipping_addresses),isGuest:!i.authenticated};return u(t,(s=(n=(r=_.getConfig().models)==null?void 0:r.CartModel)==null?void 0:n.transformer)==null?void 0:s.call(n,e))},F=e=>{var r,n,s;if(!e)return;const t={firstName:e.firstname||"",lastName:e.lastname||"",email:e.email||""};return u(t,(s=(n=(r=_.getConfig().models)==null?void 0:r.CustomerModel)==null?void 0:n.transformer)==null?void 0:s.call(n,e))},H=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${a}
`,Q=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${a}
`,p=async()=>{const e=i.cartId,t=i.authenticated===!1,r=t?H:Q,n=t?{cartId:e}:{};if(t&&!e)throw new C;return await l({type:"query",query:r,options:{method:"POST",cache:"no-cache",variables:n},path:"cart",signalType:"cart",transformer:D})},V=`
  query getCustomer {
    customer {
      ...CUSTOMER_FRAGMENT
    }
  }

  ${S}
`,K=async()=>{if(i.authenticated)return await l({type:"query",query:V,options:{method:"POST",cache:"no-cache"},path:"customer",signalType:"customer",transformer:F})},L=()=>[o.on("authenticated",I,{eager:!0}),o.on("cart/initialized",h,{eager:!0}),o.on("cart/reset",j),o.on("cart/updated",y)],g=new T({init:async e=>{const t=e||{};g.config.setConfig(t);const{data:r,pending:n}=M.value;!r&&!n&&await A()},listeners:L}),_=g.config;x("cartUpdate",()=>{o.emit("checkout/updated",c.value.data)});const h=async e=>{if(i.initialized)return y(e);const t=e?e.id:null;i.cartId=t;const r=t?await p():null;c.value={pending:!1,data:r},i.initialized=!0,o.emit("checkout/initialized",r||null)},j=()=>{i.cartId=null,c.value={pending:!1,data:null},o.emit("checkout/updated",null)},y=async e=>{if(!i.initialized)return h(e);const t=e?e.id:null;i.cartId=t;const r=t?await p():null;c.value={pending:!1,data:r},o.emit("checkout/updated",r||null)};export{te as a,D as b,_ as c,I as d,K as e,h as f,p as g,g as i,j as r,y as s,w as t};
