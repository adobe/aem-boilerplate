/*! Copyright 2026 Adobe
All Rights Reserved. */
import{s as p,f as T,h}from"./resetCart.js";import{t as I,c as _}from"./refreshCart.js";import{events as m}from"@dropins/tools/event-bus.js";import{g as E}from"./persisted-data.js";import{A}from"./updateProductsFromCart.js";import{c as U,b as g}from"./acdl.js";const R=async i=>{const f=p.cartId||await G().then(r=>r);return T(A,{variables:{cartId:f,cartItems:i.map(({sku:r,parentSku:s,quantity:u,optionsUIDs:t,enteredOptions:e,customFields:n})=>({sku:r,parent_sku:s,quantity:u,selected_options:t,entered_options:e,...n||{}}))}}).then(({errors:r,data:s})=>{var C;const u=[...((C=s==null?void 0:s.addProductsToCart)==null?void 0:C.user_errors)??[],...r??[]];if(u.length>0)return h(u);const t=I(s.addProductsToCart.cart),e=E(),n=(e==null?void 0:e.items)||[];if(m.emit("cart/updated",t),m.emit("cart/data",t),t){const c=t.items.filter(a=>!n.some(o=>o.sku===a.sku)),d=t.items.filter(a=>{const o=n.find(l=>l.sku===a.sku);return o&&a.quantity!==o.quantity});c.length>0&&m.emit("cart/product/added",c),d.length>0&&m.emit("cart/product/updated",d)}if(t){const c=t.items.filter(o=>i.some(({sku:l})=>l===o.topLevelSku)),d=!e||(e.totalQuantity??0)===0,a=(t.totalQuantity??0)>0;d&&a?U(t,c,p.locale??"en-US"):g(t,c,p.locale??"en-US")}return t})},y=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,G=async()=>{const{disableGuestCart:i}=_.getConfig();if(i)throw new Error("Guest cart is disabled");return await T(y).then(({data:f})=>{const r=f.createGuestCart.cart.id;return p.cartId=r,r})};export{R as a,G as c};
//# sourceMappingURL=createGuestCart.js.map
