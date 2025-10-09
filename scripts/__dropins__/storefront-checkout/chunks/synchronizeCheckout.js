/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as r,n as Q,d as y,U as N,t as D,e as S}from"./fetch-graphql.js";import{merge as k,Initializer as z,deepmerge as G}from"@dropins/tools/lib.js";import{events as d}from"@dropins/tools/event-bus.js";import{CHECKOUT_DATA_FRAGMENT as C,NEGOTIABLE_QUOTE_FRAGMENT as O}from"../fragments.js";import{b as R,c as P,d as U,a as L,e as x,f as B,g as $}from"./transform-shipping-methods.js";import{E as g}from"./classifiers.js";const F=async(e=!1)=>{r.authenticated=e},_=e=>{if(!e)return;const{code:t,title:i,...s}=e;return{code:t,title:i,additionalData:s}},b=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:i,title:s,...c}=t;return{code:i,title:s,additionalData:c}})},H=e=>{var i,s,c;if(!e)return;const t={availablePaymentMethods:b(e.available_payment_methods),billingAddress:P(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:_(e.selected_payment_method),shippingAddresses:R(e.shipping_addresses),isGuest:!r.authenticated};return k(t,(c=(s=(i=te.getConfig().models)==null?void 0:i.CartModel)==null?void 0:s.transformer)==null?void 0:c.call(s,e))},q=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:$(e.country),customAttributes:B(e.custom_attributes),fax:e.fax||void 0,firstName:e.firstname,lastName:e.lastname,middleName:e.middlename||void 0,postCode:e.postcode||void 0,prefix:e.prefix||void 0,region:x(e.region),street:t,suffix:e.suffix||void 0,telephone:e.telephone||void 0,uid:e.uid,vatId:e.vat_id||void 0}},K=e=>{if(e)return q(e)},V=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:i,selected_shipping_method:s,...c}=t;return{...q(c),availableShippingMethods:L(i),selectedShippingMethod:U(s)}}),W=e=>e?{availablePaymentMethods:b(e.available_payment_methods),billingAddress:K(e.billing_address),email:e.email??"",isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:_(e.selected_payment_method),shippingAddresses:V(e.shipping_addresses),status:e.status,uid:e.uid}:null,Y=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${C}
`,j=`
  query getCustomerCart {
    cart: customerCart {
      ...CHECKOUT_DATA_FRAGMENT
    }
  }

  ${C}
`,I=async()=>{const e=r.cartId,t=r.authenticated===!1,i=t?Y:j,s=t?{cartId:e}:{};if(t&&!e)throw new Q;return await y({type:"query",query:i,options:{method:"POST",cache:"no-cache",variables:s},path:"cart",transformer:H})},J=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${O}
`,A=async(e={})=>{const t=e.uid??r.quoteId;if(r.authenticated===!1)throw new N;if(!t)throw new D;return await y({type:"query",query:J,options:{method:"GET",cache:"no-cache",variables:{quoteId:t}},path:"negotiableQuote",transformer:W})},m={eager:!0},X=e=>{var f,p;const t=((p=(f=e==null?void 0:e.features)==null?void 0:f.b2b)==null?void 0:p.quotes)??!1;return[["authenticated",(u=!1)=>{var o,a,l;if(F(u),!t||u)return;const n=(l=(a=(o=e==null?void 0:e.features)==null?void 0:o.b2b)==null?void 0:a.routeLogin)==null?void 0:l.call(a);n&&window.location.assign(n)},m],...t?[["quote-management/quote-data/initialized",u=>{var n,o,a,l;if(!u.quote.canCheckout){const M=((l=(a=(o=(n=e==null?void 0:e.langDefinitions)==null?void 0:n.default)==null?void 0:o.Checkout)==null?void 0:a.Quote)==null?void 0:l.permissionDenied)||"You do not have permission to checkout with this quote.";d.emit("checkout/error",{message:M,code:g.QUOTE_PERMISSION_DENIED});return}h(u.quote)},m],["quote-management/quote-data/error",()=>{var n,o,a,l;const u=((l=(a=(o=(n=e==null?void 0:e.langDefinitions)==null?void 0:n.default)==null?void 0:o.Checkout)==null?void 0:a.Quote)==null?void 0:l.dataError)||"We were unable to retrieve the quote data. Please try again later.";d.emit("checkout/error",{message:u,code:g.QUOTE_DATA_ERROR})}]]:[["cart/initialized",h,m],["cart/reset",w],["cart/updated",T]]].map(([u,n,o])=>d.on(u,n,o))},Z=new URL(window.location.href),ee=Z.searchParams.get("quoteId");r.quoteId=ee;const E=new z({init:async(e={})=>{E.config.setConfig(G({defaults:{isBillToShipping:!0,selectedShippingMethod:t=>t.length>0?t[0]:null},features:{b2b:{quotes:!1}}},e))},listeners:X}),te=E.config,v=e=>"id"in e,re=async e=>{try{return v(e)?(r.cartId=e.id,r.quoteId=null,await I()??null):(r.cartId=null,r.quoteId=e.uid,await A()??null)}catch(t){return console.error("Checkout initialization failed:",t),null}},h=async e=>{if(r.initialized){await T(e);return}r.config||(r.config=await S());const t=e?await re(e):null;r.initialized=!0,d.emit("checkout/initialized",t)},w=()=>{r.initialized&&(r.cartId=null,r.quoteId=null,d.emit("checkout/updated",null))},se=async e=>{try{return v(e)?(r.cartId=e.id,r.quoteId=null,await I()??null):(r.cartId=null,r.quoteId=e.uid,await A()??null)}catch(t){return console.error("Checkout synchronization failed:",t),null}},T=async e=>{if(!r.initialized)return h(e);if(e===null){w();return}const t=await se(e);d.emit("checkout/updated",t)};export{F as a,A as b,te as c,h as d,W as e,I as g,E as i,w as r,T as s,H as t};
//# sourceMappingURL=synchronizeCheckout.js.map
