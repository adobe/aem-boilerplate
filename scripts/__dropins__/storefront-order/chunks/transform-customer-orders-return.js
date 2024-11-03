import{P as b,a as C,G as M,O as F,c as P}from"./transform-order-details.js";const U=`
  fragment OrderReturns on Returns {
  __typename
   items {
    number
    shipping {
      tracking {
        status {
          text
          type
        }
        carrier {
          uid
          label
        }
        tracking_number
      }
    }
    order {
      number
      token
    }
    items {
     uid
     quantity
     status
     request_quantity
      order_item {
        ...OrderItemDetails
        ... on GiftCardOrderItem {
          ...GiftCardDetails
          product {
            ...ProductDetails
          }
        }
      }
    }
   }
  }
`,m=`
query GET_CUSTOMER_ORDERS_RETURN {
 customer {
  returns {
  page_info {
    page_size
    total_pages
    current_page
  }
  ...OrderReturns
  }
 }
}
${U}
${b}
${C}
${M}
${F}
`,h=r=>{var o,R,e,d,g,i,E,T,I,O;if(!((d=(e=(R=(o=r==null?void 0:r.data)==null?void 0:o.customer)==null?void 0:R.returns)==null?void 0:e.items)!=null&&d.length))return null;const q=(E=(i=(g=r==null?void 0:r.data)==null?void 0:g.customer)==null?void 0:i.returns)==null?void 0:E.items,n=(O=(I=(T=r==null?void 0:r.data)==null?void 0:T.customer)==null?void 0:I.returns)==null?void 0:O.page_info;return{ordersReturn:q.map(u=>{var D,G;const{order:a}=u,y=((G=(D=u==null?void 0:u.shipping)==null?void 0:D.tracking)==null?void 0:G.map(t=>{const{status:s,carrier:_,tracking_number:c}=t;return{status:s,carrier:_,trackingNumber:c}}))??[],A=u.items.map(t=>{var f;const s=t==null?void 0:t.quantity,_=t==null?void 0:t.status,c=t==null?void 0:t.request_quantity,N=t==null?void 0:t.uid,S=t==null?void 0:t.order_item,k=((f=P([S]))==null?void 0:f.reduce((L,p)=>p,{}))??{};return{uid:N,quantity:s,status:_,requestQuantity:c,orderItem:k}});return{token:a==null?void 0:a.token,orderNumber:a==null?void 0:a.number,items:A,tracking:y}}),...n?{pageInfo:{pageSize:n.page_size,totalPages:n.total_pages,currentPage:n.current_page}}:{}}};export{m as G,U as R,h as t};
