import{h as n}from"./network-error.js";import{f as c,h as u}from"./fetch-graphql.js";import{t as _,O as l,A as O,a as o}from"./transform-order-details.js";const g=t=>{var a,e;if(!((a=t==null?void 0:t.data)!=null&&a.guestOrder))return null;const r=(e=t==null?void 0:t.data)==null?void 0:e.guestOrder;return _(r)},y=t=>{var a,e;if(!((a=t==null?void 0:t.data)!=null&&a.guestOrderByToken))return null;const r=(e=t==null?void 0:t.data)==null?void 0:e.guestOrderByToken;return _(r)},h=t=>{var r,a,e,d,i,m;return{email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)||"",firstname:((d=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:d.firstname)||"",lastname:((m=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:m.lastname)||""}},s=`
  fragment guestOrderData on CustomerOrder {
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
    id
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
${l}
${O}
${o}
`,f=`
  query GET_GUEST_ORDER($input: OrderInformationInput!) {
  guestOrder(input:$input) {
    ...guestOrderData
    }
  }
${s}
`,D=async t=>await c(f,{method:"GET",cache:"no-cache",variables:{input:t}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?u(r.errors):g(r)}).catch(n),E=`
  query GET_CUSTOMER {
    customer {
     firstname
     lastname
     email
    }
  }
`,S=async()=>await c(E,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?u(t.errors):h(t)}).catch(n);export{D as a,S as g,y as t};
