/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as L,R as q,f as T,h as m,t as S}from"./updateRequisitionList.js";import{events as l}from"@dropins/tools/event-bus.js";const E=`
  query GET_REQUISITION_LIST_QUERY(
    $requisitionListUid: String,
    $currentPage: Int = 1,
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists (
        filter: {
          uids: {
            eq: $requisitionListUid
          }
        }
      ){
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $pageSize, currentPage: $currentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
      }
    }
  }
${L}
${q}
`;function R(t){return!t||typeof t!="string"||t.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(t)?!1:t.length%4===0}const M=async(t,a,u,I)=>{var i,o,_,U;if(!R(t))return console.error("Invalid requisition list UID format:",t),null;const{errors:r,data:e}=await T(E,{variables:{requisitionListUid:t,currentPage:a,pageSize:u}});if(r)return m(r);if(!((_=(o=(i=e==null?void 0:e.customer)==null?void 0:i.requisition_lists)==null?void 0:o.items)!=null&&_[0]))return null;const n=e.customer.requisition_lists.items[0];let s=S(n);return(U=s==null?void 0:s.items)!=null&&U.length&&I&&(s={...s,items:await I(s.items)}),l.emit("requisitionList/data",s),s},d=`
  mutation UPDATE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [UpdateRequisitionListItemsInput!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    updateRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
      ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${q}
${L}
`,O=async(t,a,u,I,r)=>{var o,_;const{errors:e,data:n}=await T(d,{variables:{requisitionListUid:t,requisitionListItems:a,pageSize:u,currentPage:I}});if(e)return m(e);if(!((o=n==null?void 0:n.updateRequisitionListItems)!=null&&o.requisition_list))return null;const s=n.updateRequisitionListItems.requisition_list;let i=S(s);return(_=i==null?void 0:i.items)!=null&&_.length&&r&&(i={...i,items:await r(i.items)}),l.emit("requisitionList/data",i),i},c=`
  mutation DELETE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    deleteRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${q}
${L}
`,f=async(t,a,u,I,r)=>{var o,_;const{errors:e,data:n}=await T(c,{variables:{requisitionListUid:t,requisitionListItemUids:a,pageSize:u,currentPage:I}});if(e)return m(e);if(!((o=n==null?void 0:n.deleteRequisitionListItems)!=null&&o.requisition_list))return null;const s=n.deleteRequisitionListItems.requisition_list;let i=S(s);return(_=i==null?void 0:i.items)!=null&&_.length&&r&&(i={...i,items:await r(i.items)}),l.emit("requisitionList/data",i),i},$=`
  mutation ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!
    ) {
    addRequisitionListItemsToCart(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      status
      add_requisition_list_items_to_cart_user_errors {
        message
        type
      }
      cart {
        id
        itemsV2 {
          items {
            uid
            quantity
            is_available
          }
          total_count
        }
        email
        total_quantity
        is_virtual
      }
    }
  }
`,p=async(t,a)=>T($,{variables:{requisitionListUid:t,requisitionListItemUids:a}}).then(({errors:u,data:I})=>{var r;return u?m(u):(r=I.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&r.length?I.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(e=>({type:e.type,message:e.message||""})):null});export{p as a,f as d,M as g,R as i,O as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
