/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as f,f as _,h as g}from"./resetCart.js";import{t as E}from"./refreshCart.js";import{events as l}from"@dropins/tools/event-bus.js";import{g as A}from"./persisted-data.js";import{CART_FRAGMENT as O}from"../fragments.js";import{b as D}from"./acdl.js";const P=`
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
    
  ${O}
`,S=`
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

  ${O}
`,U=(m,u)=>{const a=[];return m.filter(r=>r.errors&&u.some(i=>i===r.uid)).forEach(r=>{var i;(i=r.errors)==null||i.forEach(t=>{a.push({message:t.message,path:[r.uid],extensions:{category:t.code}})})}),a},R=(m,u)=>{const a=[],r=[],i=[];return m.forEach(t=>{const s=u.find(e=>e.uid===t.uid);if(s)if(t.optionsUIDs){const e=Object.values((s==null?void 0:s.selectedOptionsUIDs)??{});if(t.optionsUIDs.every(c=>e.includes(c))&&t.optionsUIDs.length===e.length)i.push({uid:t.uid,quantity:t.quantity,giftOptions:t.giftOptions,customFields:t.customFields});else{const c=u.find(o=>{const p=Object.values((o==null?void 0:o.selectedOptionsUIDs)??{});return o.uid!==t.uid&&o.sku===s.sku&&t.optionsUIDs.every(d=>p.includes(d))&&t.optionsUIDs.length===p.length});if(c)i.push({uid:c.uid,quantity:c.quantity+t.quantity,giftOptions:t.giftOptions,customFields:t.customFields}),r.push(t.uid);else{const{sku:o,topLevelSku:p}=s,{optionsUIDs:d,enteredOptions:T,quantity:h,customFields:I}=t;a.push({sku:o,parentSku:p,quantity:h,optionsUIDs:d,enteredOptions:T,customFields:I}),r.push(t.uid)}}}else if(t.customFields){const{sku:e,topLevelSku:n}=s,{optionsUIDs:c,enteredOptions:o,quantity:p,customFields:d}=t;a.push({sku:e,parentSku:n,quantity:p,optionsUIDs:c,enteredOptions:o,customFields:d}),r.push(t.uid)}else i.push({uid:t.uid,quantity:t.quantity,giftOptions:t.giftOptions,customFields:t.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${t.uid}`)}),{itemsToAdd:a,itemsToRemove:r,itemsToUpdate:i}},$=0,k=async m=>{const u=f.cartId,a=A();if(!u)return Promise.reject(new Error("Cart ID is not set"));if(!a)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:r,itemsToRemove:i,itemsToUpdate:t}=R(m,a.items);let s=[];return r.length>0&&s.push(_(P,{variables:{cartId:u,cartItems:r.map(({parentSku:e,quantity:n,optionsUIDs:c,enteredOptions:o,customFields:p})=>({sku:e,quantity:n,selected_options:c,entered_options:o,...p||{}}))}}).then(({errors:e,data:n})=>{var p,d,T,h;const c=U(((d=(p=n==null?void 0:n.addProductsToCart)==null?void 0:p.cart)==null?void 0:d.itemsV2.items)||[],m.map(I=>I.uid)),o=[...((T=n==null?void 0:n.addProductsToCart)==null?void 0:T.user_errors)??[],...e??[],...c];return o.length>0?g(o):i.length>0?C(u,i.map(I=>({uid:I,quantity:$}))).catch(I=>Promise.reject(new Error(`Failed to update products in cart: ${I}`))):Promise.resolve(E((h=n==null?void 0:n.addProductsToCart)==null?void 0:h.cart))}).then(e=>(l.emit("cart/updated",e),l.emit("cart/data",e),D(e,m,f.locale??"en-US"),Promise.resolve(e))).catch(e=>Promise.reject(new Error(`Failed to add products to cart: ${e}`)))),t.length>0&&s.push(C(u,t).catch(e=>Promise.reject(new Error(e)))),Promise.all(s).then(e=>e[e.length-1])},C=async(m,u)=>_(S,{variables:{cartId:m,cartItems:u.map(({uid:a,quantity:r,giftOptions:i})=>({cart_item_uid:a,quantity:r,...i}))}}).then(({errors:a,data:r})=>{var e,n,c;const i=U(((n=(e=r==null?void 0:r.updateCartItems)==null?void 0:e.cart)==null?void 0:n.itemsV2.items)||[],u.map(o=>o.uid)),t=[...((c=r==null?void 0:r.updateCartItems)==null?void 0:c.user_errors)??[],...a??[],...i],s=(r==null?void 0:r.updateCartItems)&&E(r.updateCartItems.cart);if(s&&l.emit("cart/data",s),t.length>0)return g(t);if(l.emit("cart/updated",s),s){const o=s.items.filter(p=>u.some(d=>d.uid===p.uid));l.emit("cart/product/updated",o)}return s&&D(s,u,f.locale??"en-US"),s});export{P as A,k as u};
//# sourceMappingURL=updateProductsFromCart.js.map
