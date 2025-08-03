/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as C,f as _,h as E}from"./resetCart.js";import{t as A}from"./refreshCart.js";import{events as T}from"@dropins/tools/event-bus.js";import{g}from"./persisted-data.js";import{CART_FRAGMENT as D}from"../fragments.js";import{b as U}from"./acdl.js";const S=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
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
    
  ${D}
`,O=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
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

  ${D}
`,P=(m,c)=>{const u=[];return m.filter(t=>t.errors&&c.some(n=>n===t.uid)).forEach(t=>{var n;(n=t.errors)==null||n.forEach(e=>{u.push({message:e.message,path:[t.uid],extensions:{category:e.code}})})}),u},R=(m,c)=>{const u=[],t=[],n=[];return m.forEach(e=>{const s=c.find(r=>r.uid===e.uid);if(s)if(e.optionsUIDs){const r=Object.values((s==null?void 0:s.selectedOptionsUIDs)??{}),{sku:o,topLevelSku:p}=s,{optionsUIDs:i,enteredOptions:a,quantity:d,customFields:l}=e;u.push({sku:o,parentSku:p,quantity:d,optionsUIDs:i,enteredOptions:a,customFields:l}),e.optionsUIDs.some(f=>!r.includes(f))&&t.push(e.uid)}else if(e.customFields){const{sku:r,topLevelSku:o}=s,{optionsUIDs:p,enteredOptions:i,quantity:a,customFields:d}=e;u.push({sku:r,parentSku:o,quantity:a,optionsUIDs:p,enteredOptions:i,customFields:d}),t.push(e.uid)}else n.push({uid:e.uid,quantity:e.quantity,giftOptions:e.giftOptions,customFields:e.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${e.uid}`)}),{itemsToAdd:u,itemsToRemove:t,itemsToUpdate:n}},$=0,j=async m=>{const c=C.cartId,u=g();if(!c)return Promise.reject(new Error("Cart ID is not set"));if(!u)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:t,itemsToRemove:n,itemsToUpdate:e}=R(m,u.items);let s=[];return t.length>0&&s.push(_(S,{variables:{cartId:c,cartItems:t.map(({parentSku:r,quantity:o,optionsUIDs:p,enteredOptions:i,customFields:a})=>({sku:r,quantity:o,selected_options:p,entered_options:i,...a||{}}))}}).then(({errors:r,data:o})=>{var a,d,l,f;const p=P(((d=(a=o==null?void 0:o.addProductsToCart)==null?void 0:a.cart)==null?void 0:d.itemsV2.items)||[],m.map(I=>I.uid)),i=[...((l=o==null?void 0:o.addProductsToCart)==null?void 0:l.user_errors)??[],...r??[],...p];return i.length>0?E(i):n.length>0?h(c,n.map(I=>({uid:I,quantity:$}))).catch(I=>Promise.reject(new Error(`Failed to update products in cart: ${I}`))):Promise.resolve(A((f=o==null?void 0:o.addProductsToCart)==null?void 0:f.cart))}).then(r=>(T.emit("cart/updated",r),T.emit("cart/data",r),U(r,m,C.locale??"en-US"),Promise.resolve(r))).catch(r=>Promise.reject(new Error(`Failed to add products to cart: ${r}`)))),e.length>0&&s.push(h(c,e).catch(r=>Promise.reject(new Error(r)))),Promise.all(s).then(r=>r[r.length-1])},h=async(m,c)=>_(O,{variables:{cartId:m,cartItems:c.map(({uid:u,quantity:t,giftOptions:n})=>({cart_item_uid:u,quantity:t,...n}))}}).then(({errors:u,data:t})=>{var r,o,p;const n=P(((o=(r=t==null?void 0:t.updateCartItems)==null?void 0:r.cart)==null?void 0:o.itemsV2.items)||[],c.map(i=>i.uid)),e=[...((p=t==null?void 0:t.updateCartItems)==null?void 0:p.user_errors)??[],...u??[],...n],s=(t==null?void 0:t.updateCartItems)&&A(t.updateCartItems.cart);if(s&&T.emit("cart/data",s),e.length>0)return E(e);if(T.emit("cart/updated",s),s){const i=s.items.filter(a=>c.some(d=>d.uid===a.uid));T.emit("cart/product/updated",i)}return s&&U(s,c,C.locale??"en-US"),s});export{S as A,j as u};
//# sourceMappingURL=updateProductsFromCart.js.map
