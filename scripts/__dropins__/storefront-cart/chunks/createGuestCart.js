/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as l,f as T,h as I}from"./resetCart.js";import{t as _,c as A}from"./refreshCart.js";import{events as f}from"@dropins/tools/event-bus.js";import{g as E}from"./persisted-data.js";import{A as U}from"./updateProductsFromCart.js";import{c as g,b as G}from"./acdl.js";const D=async c=>{let i=!1;const u=l.cartId||await S().then(s=>(i=!0,s));return T(U,{variables:{cartId:u,cartItems:c.map(({sku:s,parentSku:r,quantity:d,optionsUIDs:t,enteredOptions:a,customFields:o})=>({sku:s,parent_sku:r,quantity:d,selected_options:t,entered_options:a,...o||{}}))}}).then(({errors:s,data:r})=>{var C;const d=[...((C=r==null?void 0:r.addProductsToCart)==null?void 0:C.user_errors)??[],...s??[]];if(d.length>0)return I(d);const t=_(r.addProductsToCart.cart),a=E(),o=(a==null?void 0:a.items)||[];if(f.emit("cart/updated",t),f.emit("cart/data",t),t){const n=t.items.filter(e=>!o.some(p=>p.sku===e.sku)),m=t.items.filter(e=>{const p=o.find(h=>h.sku===e.sku);return p&&e.quantity!==p.quantity});n.length>0&&f.emit("cart/product/added",n),m.length>0&&f.emit("cart/product/updated",m)}if(t){const n=t.items.filter(m=>c.some(({sku:e})=>e===m.topLevelSku));i?g(t,n,l.locale??"en-US"):G(t,n,l.locale??"en-US")}return t})},O=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,S=async()=>{const{disableGuestCart:c}=A.getConfig();if(c)throw new Error("Guest cart is disabled");return await T(O).then(({data:i})=>{const u=i.createGuestCart.cart.id;return l.cartId=u,u})};export{D as a,S as c};
//# sourceMappingURL=createGuestCart.js.map
