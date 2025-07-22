/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as h,f as _,h as A}from"./resetCart.js";import{C as E,t as U}from"./refreshCart.js";import{events as T}from"@dropins/tools/event-bus.js";import{g as R}from"./persisted-data.js";import{CART_FRAGMENT as P}from"../fragments.js";import{b as O}from"./acdl.js";const g=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${E}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
    
  ${P}
`,S=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${E}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CART_FRAGMENT
      }

    }
  }

  ${P}
`,D=(p,c)=>{const i=[];return p.filter(t=>t.errors&&c.some(n=>n===t.uid)).forEach(t=>{var n;(n=t.errors)==null||n.forEach(e=>{i.push({message:e.message,path:[t.uid],extensions:{category:e.code}})})}),i},$=(p,c)=>{const i=[],t=[],n=[];return p.forEach(e=>{const s=c.find(r=>r.uid===e.uid);if(s)if(e.optionsUIDs){const r=Object.values((s==null?void 0:s.selectedOptionsUIDs)??{}),{sku:o,topLevelSku:m}=s,{optionsUIDs:u,enteredOptions:a,quantity:d,customFields:l}=e;i.push({sku:o,parentSku:m,quantity:d,optionsUIDs:u,enteredOptions:a,customFields:l}),e.optionsUIDs.some(f=>!r.includes(f))&&t.push(e.uid)}else if(e.customFields){const{sku:r,topLevelSku:o}=s,{optionsUIDs:m,enteredOptions:u,quantity:a,customFields:d}=e;i.push({sku:r,parentSku:o,quantity:a,optionsUIDs:m,enteredOptions:u,customFields:d}),t.push(e.uid)}else n.push({uid:e.uid,quantity:e.quantity,giftOptions:e.giftOptions,customFields:e.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${e.uid}`)}),{itemsToAdd:i,itemsToRemove:t,itemsToUpdate:n}},F=0,w=async p=>{const c=h.cartId,i=R();if(!c)return Promise.reject(new Error("Cart ID is not set"));if(!i)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:t,itemsToRemove:n,itemsToUpdate:e}=$(p,i.items);let s=[];return t.length>0&&s.push(_(g,{variables:{cartId:c,cartItems:t.map(({parentSku:r,quantity:o,optionsUIDs:m,enteredOptions:u,customFields:a})=>({sku:r,quantity:o,selected_options:m,entered_options:u,...a||{}}))}}).then(({errors:r,data:o})=>{var a,d,l,f;const m=D(((d=(a=o==null?void 0:o.addProductsToCart)==null?void 0:a.cart)==null?void 0:d.itemsV2.items)||[],p.map(I=>I.uid)),u=[...((l=o==null?void 0:o.addProductsToCart)==null?void 0:l.user_errors)??[],...r??[],...m];return u.length>0?A(u):n.length>0?C(c,n.map(I=>({uid:I,quantity:F}))).catch(I=>Promise.reject(new Error(`Failed to update products in cart: ${I}`))):Promise.resolve(U((f=o==null?void 0:o.addProductsToCart)==null?void 0:f.cart))}).then(r=>(T.emit("cart/updated",r),T.emit("cart/data",r),O(r,p,h.locale??"en-US"),Promise.resolve(r))).catch(r=>Promise.reject(new Error(`Failed to add products to cart: ${r}`)))),e.length>0&&s.push(C(c,e).catch(r=>Promise.reject(new Error(r)))),Promise.all(s).then(r=>r[r.length-1])},C=async(p,c)=>_(S,{variables:{cartId:p,cartItems:c.map(({uid:i,quantity:t,giftOptions:n})=>({cart_item_uid:i,quantity:t,...n}))}}).then(({errors:i,data:t})=>{var r,o,m;const n=D(((o=(r=t==null?void 0:t.updateCartItems)==null?void 0:r.cart)==null?void 0:o.itemsV2.items)||[],c.map(u=>u.uid)),e=[...((m=t==null?void 0:t.updateCartItems)==null?void 0:m.user_errors)??[],...i??[],...n],s=(t==null?void 0:t.updateCartItems)&&U(t.updateCartItems.cart);if(s&&T.emit("cart/data",s),e.length>0)return A(e);if(T.emit("cart/updated",s),s){const u=s.items.filter(a=>c.some(d=>d.uid===a.uid));T.emit("cart/product/updated",u)}return s&&O(s,c,h.locale??"en-US"),s});export{g as A,w as u};
//# sourceMappingURL=updateProductsFromCart.js.map
