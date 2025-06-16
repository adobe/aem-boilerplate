/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as _,f as l,h as A}from"./resetCart.js";import{C as E,t as U}from"./refreshCart.js";import{events as T}from"@dropins/tools/event-bus.js";import{g as D}from"./persisted-data.js";import{CART_FRAGMENT as P}from"../fragments.js";import{a as O}from"./acdl.js";const g=`
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
`,$=`
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
`,R=(a,c)=>{const i=[];return a.filter(t=>t.errors&&c.some(n=>n===t.uid)).forEach(t=>{var n;(n=t.errors)==null||n.forEach(e=>{i.push({message:e.message,path:[t.uid],extensions:{category:e.code}})})}),i},S=(a,c)=>{const i=[],t=[],n=[];return a.forEach(e=>{const s=c.find(r=>r.uid===e.uid);if(s)if(e.optionsUIDs){const r=Object.values((s==null?void 0:s.selectedOptionsUIDs)??{}),{sku:o,topLevelSku:m}=s,{optionsUIDs:u,enteredOptions:p,quantity:d}=e;i.push({sku:o,parentSku:m,quantity:d,optionsUIDs:u,enteredOptions:p}),e.optionsUIDs.some(C=>!r.includes(C))&&t.push(e.uid)}else n.push({uid:e.uid,quantity:e.quantity,giftOptions:e.giftOptions});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${e.uid}`)}),{itemsToAdd:i,itemsToRemove:t,itemsToUpdate:n}},M=0,G=async a=>{const c=_.cartId,i=D();if(!c)return Promise.reject(new Error("Cart ID is not set"));if(!i)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:t,itemsToRemove:n,itemsToUpdate:e}=S(a,i.items);let s=[];return t.length>0&&s.push(l(g,{variables:{cartId:c,cartItems:t.map(({parentSku:r,quantity:o,optionsUIDs:m,enteredOptions:u})=>({sku:r,quantity:o,selected_options:m,entered_options:u}))}}).then(({errors:r,data:o})=>{var p,d,C,f;const m=R(((d=(p=o==null?void 0:o.addProductsToCart)==null?void 0:p.cart)==null?void 0:d.itemsV2.items)||[],a.map(I=>I.uid)),u=[...((C=o==null?void 0:o.addProductsToCart)==null?void 0:C.user_errors)??[],...r??[],...m];return u.length>0?A(u):n.length>0?h(c,n.map(I=>({uid:I,quantity:M}))).catch(I=>Promise.reject(new Error(`Failed to update products in cart: ${I}`))):Promise.resolve(U((f=o==null?void 0:o.addProductsToCart)==null?void 0:f.cart))}).then(r=>(T.emit("cart/updated",r),T.emit("cart/data",r),O(r,a,_.locale??"en-US"),Promise.resolve(r))).catch(r=>Promise.reject(new Error(`Failed to add products to cart: ${r}`)))),e.length>0&&s.push(h(c,e).catch(r=>Promise.reject(new Error(r)))),Promise.all(s).then(r=>r[r.length-1])},h=async(a,c)=>l($,{variables:{cartId:a,cartItems:c.map(({uid:i,quantity:t,giftOptions:n})=>({cart_item_uid:i,quantity:t,...n}))}}).then(({errors:i,data:t})=>{var r,o,m;const n=R(((o=(r=t==null?void 0:t.updateCartItems)==null?void 0:r.cart)==null?void 0:o.itemsV2.items)||[],c.map(u=>u.uid)),e=[...((m=t==null?void 0:t.updateCartItems)==null?void 0:m.user_errors)??[],...i??[],...n],s=(t==null?void 0:t.updateCartItems)&&U(t.updateCartItems.cart);if(s&&T.emit("cart/data",s),e.length>0)return A(e);if(T.emit("cart/updated",s),s){const u=s.items.filter(p=>c.some(d=>d.uid===p.uid));T.emit("cart/product/updated",u)}return s&&O(s,c,_.locale??"en-US"),s});export{g as A,G as u};
//# sourceMappingURL=updateProductsFromCart.js.map
