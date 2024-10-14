import{jsx as r,jsxs as p,Fragment as A}from"@dropins/tools/preact-jsx-runtime.js";import{Card as U,Header as F,Button as h,Modal as k,InLineAlert as q,Picker as G}from"@dropins/tools/components.js";import{F as V}from"../chunks/CustomerDetailsContent.js";import{Slot as D,classes as v}from"@dropins/tools/lib.js";import{useMemo as W}from"@dropins/tools/preact-compat.js";import{O as j,a as J,A as P,t as z}from"../chunks/transform-order-details.js";import{f as B,h as Q}from"../chunks/fetch-graphql.js";import{useState as u,useEffect as y}from"@dropins/tools/preact-hooks.js";import{g as Y}from"../chunks/getStoreConfig.js";import{events as N}from"@dropins/tools/event-bus.js";import{useText as O,Text as S}from"@dropins/tools/i18n.js";import{C as K}from"../chunks/OrderLoaders.js";import"@dropins/tools/fetch-graphql.js";const E={pending:"orderPending",shiping:"orderShipped",complete:"orderComplete",processing:"orderProcessing","on hold":"orderOnHold",canceled:"orderCanceled","suspected fraud":"orderSuspectedFraud","payment Review":"orderPaymentReview","order received":"orderReceived","guest order cancellation requested":"guestOrderCancellationRequested"},X=({slots:t,title:d,status:n,orderData:e})=>{const s=String(n).toLocaleLowerCase(),o=O(`Order.OrderStatusContent.${E[s]}.title`),a=O(`Order.OrderStatusContent.${E[s]}.message`),i=O(`Order.OrderStatusContent.${E[s]}.messageWithoutDate`);if(!n)return r("div",{});const m=e!=null&&e.orderStatusChangeDate?a==null?void 0:a.message.replace("{DATE}",e==null?void 0:e.orderStatusChangeDate):i.messageWithoutDate;return p(U,{className:"order-order-status-content",variant:"secondary",children:[r(F,{title:d??o.title}),p("div",{className:"order-order-status-content__wrapper",children:[r("div",{className:"order-order-status-content__wrapper-description",children:r("p",{children:m})}),r(ne,{orderData:e,slots:t})]})]})};var f=(t=>(t.CANCEL="CANCEL",t.RETURN="RETURN",t.REORDER="REORDER",t))(f||{});const Z=`
mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
  cancelOrder(input: { order_id: $orderId, reason: $reason }) {
    error
    order {
      email
      available_actions
      status
      number
      id
      order_date
      carrier
      shipping_method
      is_virtual
      applied_coupons {
        code
      }
      shipments {
        id
        number
        tracking {
          title
          number
          carrier
        }
        comments {
          message
          timestamp
        }
        items {
          id
          product_sku
          product_name
          order_item {
            ...OrderItems
            ... on GiftCardOrderItem {
              gift_card {
                recipient_name
                recipient_email
                sender_name
                sender_email
                message
              }
            }
          }
        }
      }
      payment_methods {
        name
        type
      }
      shipping_address {
        ...AddressesList
      }
      billing_address {
        ...AddressesList
      }
      items {
        ...OrderItems
        ... on GiftCardOrderItem {
          __typename
          gift_card {
            recipient_name
            recipient_email
            sender_name
            sender_email
            message
          }
        }
      }
      total {
        ...OrderSummary
      }
    }
  }
}
${j}
${J}
${P}  
`,ee=async(t,d,n,e)=>{if(!t)throw new Error("No order ID found");if(!d)throw new Error("No reason found");return B(Z,{variables:{orderId:t,reason:d}}).then(({errors:s,data:o})=>{if(s)return Q(s);if(o.cancelOrder.error!=null){e();return}const a=z(o.cancelOrder.order);n(a)})},re=()=>{const[t,d]=u(null);return y(()=>{const n=sessionStorage.getItem("orderStoreConfig"),e=n?JSON.parse(n):null;e?d(e):Y().then(s=>{s&&(sessionStorage.setItem("orderStoreConfig",JSON.stringify(s)),d(s))})},[]),t},te=({cancelButtonProps:t,modalProps:d,pickerProps:n,submitButtonProps:e,orderId:s})=>{const o=O({buttonText:"Order.OrderCancel.buttonText",ErrorHeading:"Order.OrderCancellationReasonsModal.errorHeading",ErrorDescription:"Order.OrderCancellationReasonsModal.errorDescription",orderCancellationLabel:"Order.OrderCancellationReasonsModal.label"}),[a,i]=u(!1),[m,g]=u(0),[C,M]=u(!1),[I,T]=u(!1),w=()=>{i(!0)},L=()=>{i(!1)},x=c=>{c.preventDefault();const l=Number(c.target.value);g(l)},R=re(),_=(R==null?void 0:R.orderCancellationReasons)??[];N.on("authenticated",c=>{c&&T(!0)},{eager:!0});const b=c=>c.map((l,H)=>({text:l==null?void 0:l.description,value:H.toString()})),$=async c=>(c.preventDefault(),ee(s,_[m].description,l=>{i(!1),I||(l.status="guest order cancellation requested"),N.emit("order/data",l)},()=>{M(!0)}));return p(A,{children:[r(h,{onClick:w,type:"button",variant:"secondary",...t,children:o.buttonText}),a&&p(k,{size:"medium",onClose:L,className:"order-order-cancel__modal",title:r("h2",{className:"order-order-cancel__title",children:r(S,{id:"Order.OrderCancellationReasonsModal.title"})}),"data-testid":"order-cancellation-reasons-modal",...d,children:[C&&r(q,{heading:o.ErrorHeading,description:o.ErrorDescription}),p(V,{onSubmit:$,children:[r("div",{className:"order-order-cancel__text",children:r(S,{id:"Order.OrderCancellationReasonsModal.description"})}),r(G,{name:"cancellationReasons",floatingLabel:o.orderCancellationLabel,defaultOption:b(_)[0],variant:"primary",options:b(_),value:String(m),handleSelect:x,required:!0,"data-testid":"order-cancellation-reasons-selector",...n}),r("div",{className:"order-order-cancel__button-container",children:r(h,{variant:"primary",...e,children:r(S,{id:"Order.OrderCancellationReasonsModal.button"})})})]})]})]})},ne=({className:t,children:d,orderData:n,slots:e,...s})=>{const o=O({cancel:"Order.OrderStatusContent.actions.cancel",return:"Order.OrderStatusContent.actions.return",reorder:"Order.OrderStatusContent.actions.reorder"}),a=W(()=>{const i=n==null?void 0:n.availableActions,m=!!(i!=null&&i.length);return r(A,{children:e!=null&&e.OrderActions?r(D,{"data-testid":"OrderActionsSlot",name:"OrderCanceledActions",slot:e==null?void 0:e.OrderActions,context:n}):r("div",{"data-testid":"availableActionsList",className:v(["order-order-actions__wrapper",["order-order-actions__wrapper--empty",!m]]),children:i==null?void 0:i.map((g,C)=>{switch(g){case f.CANCEL:return r(te,{orderId:atob(n.id)});case f.RETURN:return r(h,{variant:"secondary",children:o.return},C);case f.REORDER:return r(h,{variant:"secondary",children:o.reorder},C)}})})})},[n,e==null?void 0:e.OrderActions,o]);return r("div",{...s,className:v(["order-order-actions",t]),children:a})},oe=({orderData:t})=>{const[d,n]=u(t),[e,s]=u(t==null?void 0:t.status);return y(()=>{const o=N.on("order/data",a=>{n(a),s(a.status)},{eager:!0});return()=>{o==null||o.off()}},[]),{orderStatus:e,order:d}},ge=({slots:t,orderData:d,className:n,statusTitle:e,status:s})=>{const{orderStatus:o,order:a}=oe({orderData:d});return r("div",{className:v(["order-order-status",n]),children:a?r(X,{title:e,status:s||o,slots:t,orderData:a}):r(K,{withCard:!1})})};export{ge as OrderStatus,ge as default};
