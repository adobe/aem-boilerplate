/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i,m as M,d as g,U as T,t as N,i as Q}from"./fetch-graphql.js";import{merge as z,Initializer as S,deepmerge as G}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as y,NEGOTIABLE_QUOTE_FRAGMENT as k}from"../fragments.js";import{b as L,c as D,d as O,a as P,e as U,f as x,g as B}from"./transform-shipping-methods.js";const R=async(e=!1)=>{i.authenticated=e},b=e=>{if(e)return{code:e.code,title:e.title}},C=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:s,title:r}=t;return{code:s,title:r}})},$=e=>{var s,r,o;if(!e)return;const t={availablePaymentMethods:C(e.available_payment_methods),billingAddress:D(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:b(e.selected_payment_method),shippingAddresses:L(e.shipping_addresses),isGuest:!i.authenticated};return z(t,(o=(r=(s=Z.getConfig().models)==null?void 0:s.CartModel)==null?void 0:r.transformer)==null?void 0:o.call(r,e))},_=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:B(e.country),customAttributes:x(e.custom_attributes),fax:e.fax||void 0,firstName:e.firstname,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:U(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},F=e=>{if(e)return _(e)},H=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:s,selected_shipping_method:r,...o}=t;return{..._(o),availableShippingMethods:P(s),selectedShippingMethod:O(r)}}),K=e=>e?{availablePaymentMethods:C(e.available_payment_methods),billingAddress:F(e.billing_address),email:e.email??"",isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:b(e.selected_payment_method),shippingAddresses:H(e.shipping_addresses),status:e.status,uid:e.uid}:null,V=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${y}
`,j=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${y}
`,A=async()=>{const e=i.cartId,t=i.authenticated===!1,s=t?V:j,r=t?{cartId:e}:{};if(t&&!e)throw new M;return await g({type:"query",query:s,options:{method:"POST",cache:"no-cache",variables:r},path:"cart",transformer:$})},J=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${k}
`,I=async(e={})=>{const t=e.uid??i.quoteId;if(i.authenticated===!1)throw new T;if(!t)throw new N;return await g({type:"query",query:J,options:{method:"GET",cache:"no-cache",variables:{quoteId:t}},path:"negotiableQuote",transformer:K})},d={eager:!0},W=e=>{var h,f;const t=((f=(h=e==null?void 0:e.features)==null?void 0:h.b2b)==null?void 0:f.quotes)??!1;return[["authenticated",(n=!1)=>{var u,l,p;if(R(n),!t||n)return;const a=(p=(l=(u=e==null?void 0:e.features)==null?void 0:u.b2b)==null?void 0:l.routeLogin)==null?void 0:p.call(l);a&&window.location.assign(a)},d],...t?[["quote-management/quote-data/initialized",n=>{m(n.quote)},d]]:[["cart/initialized",m,d],["cart/reset",w],["cart/updated",E]]].map(([n,a,u])=>c.on(n,a,u))},X=new URL(window.location.href),Y=X.searchParams.get("quoteId");i.quoteId=Y;const q=new S({init:async(e={})=>{q.config.setConfig(G({defaults:{isBillToShipping:!0,selectedShippingMethod:t=>t.length>0?t[0]:null},features:{b2b:{quotes:!1}}},e))},listeners:W}),Z=q.config,v=e=>"id"in e,ee=async e=>{try{return v(e)?(i.cartId=e.id,i.quoteId=null,await A()??null):(i.cartId=null,i.quoteId=e.uid,await I()??null)}catch(t){return console.error("Checkout initialization failed:",t),null}},m=async e=>{if(i.initialized){await E(e);return}i.config||(i.config=await Q());const t=e?await ee(e):null;i.initialized=!0,c.emit("checkout/initialized",t)},w=()=>{i.initialized&&(i.cartId=null,i.quoteId=null,c.emit("checkout/updated",null))},te=async e=>{try{return v(e)?(i.cartId=e.id,i.quoteId=null,await A()??null):(i.cartId=null,i.quoteId=e.uid,await I()??null)}catch(t){return console.error("Checkout synchronization failed:",t),null}},E=async e=>{if(!i.initialized)return m(e);if(e===null){w();return}const t=await te(e);c.emit("checkout/updated",t)};export{R as a,I as b,Z as c,m as d,K as e,A as g,q as i,w as r,E as s,$ as t};
//# sourceMappingURL=synchronizeCheckout.js.map
