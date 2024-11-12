/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as i}from"./network-error.js";import{f as E,h as I}from"./fetch-graphql.js";const s=`
mutation REORDER_ITEMS_MUTATION($orderNumber: String!) {
  reorderItems(orderNumber: $orderNumber) {
    cart {
      itemsV2 {
        items {
          uid
        }
      }
    }
    userInputErrors{
      code
      message
      path
    }
  }
}
`,l=async c=>await E(s,{method:"POST",variables:{orderNumber:c}}).then(r=>{var t,e,a,m,o,u;if((t=r.errors)!=null&&t.length)return I(r.errors);const d=!!((m=(a=(e=r==null?void 0:r.data)==null?void 0:e.reorderItems)==null?void 0:a.cart)!=null&&m.itemsV2.items.length),h=((u=(o=r==null?void 0:r.data)==null?void 0:o.reorderItems)==null?void 0:u.userInputErrors)??[];return{success:d,userInputErrors:h}}).catch(i);export{l as r};
