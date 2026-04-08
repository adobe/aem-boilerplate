/*! Copyright 2026 Adobe
All Rights Reserved. */
import{i as U,G as d}from"./getRequisitionLists.js";import{t as T,R as q,a as E}from"./updateRequisitionList.js";import{f as L,h as m}from"./fetch-graphql.js";import{events as R}from"@dropins/tools/event-bus.js";const Q=async(o,_,I,r)=>{var i,u,a,S;if(!U(o))return console.error("Invalid requisition list UID format:",o),null;const{errors:s,data:e}=await L(d,{variables:{requisitionListUid:o,currentPage:_,pageSize:I}});if(s)return m(s);if(!((a=(u=(i=e==null?void 0:e.customer)==null?void 0:i.requisition_lists)==null?void 0:u.items)!=null&&a[0]))return null;const t=e.customer.requisition_lists.items[0];let n=T(t);return(S=n==null?void 0:n.items)!=null&&S.length&&r&&(n={...n,items:await r(n.items)}),R.emit("requisitionList/data",n),n},l=`
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
${E}
`,f=async(o,_,I,r,s)=>{var u,a;const{errors:e,data:t}=await L(l,{variables:{requisitionListUid:o,requisitionListItems:_,pageSize:I,currentPage:r}});if(e)return m(e);if(!((u=t==null?void 0:t.updateRequisitionListItems)!=null&&u.requisition_list))return null;const n=t.updateRequisitionListItems.requisition_list;let i=T(n);return(a=i==null?void 0:i.items)!=null&&a.length&&s&&(i={...i,items:await s(i.items)}),R.emit("requisitionList/data",i),i},c=`
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
${E}
`,w=async(o,_,I,r,s)=>{var u,a;const{errors:e,data:t}=await L(c,{variables:{requisitionListUid:o,requisitionListItemUids:_,pageSize:I,currentPage:r}});if(e)return m(e);if(!((u=t==null?void 0:t.deleteRequisitionListItems)!=null&&u.requisition_list))return null;const n=t.deleteRequisitionListItems.requisition_list;let i=T(n);return(a=i==null?void 0:i.items)!=null&&a.length&&s&&(i={...i,items:await s(i.items)}),R.emit("requisitionList/data",i),i},N=`
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
`,D=async(o,_)=>L(N,{variables:{requisitionListUid:o,requisitionListItemUids:_}}).then(({errors:I,data:r})=>{var s;return I?m(I):(s=r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(e=>({type:e.type,message:e.message||""})):null}),$=`
  mutation MOVE_ITEMS_BETWEEN_REQUISITION_LISTS_MUTATION(
      $sourceRequisitionListUid: ID!,
      $destinationRequisitionListUid: ID!,
      $requisitionListItem: MoveItemsBetweenRequisitionListsInput,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    moveItemsBetweenRequisitionLists(
      sourceRequisitionListUid: $sourceRequisitionListUid
      destinationRequisitionListUid: $destinationRequisitionListUid
      requisitionListItem: $requisitionListItem
    ) {
      source_requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
      destination_requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${q}
${E}
`,v=async(o,_,I,r,s)=>{const{errors:e,data:t}=await L($,{variables:{sourceRequisitionListUid:o,destinationRequisitionListUid:_,requisitionListItem:{requisitionListItemUids:I},pageSize:r,currentPage:s}});if(e)return m(e);if(!(t!=null&&t.moveItemsBetweenRequisitionLists))return null;const{source_requisition_list:n,destination_requisition_list:i}=t.moveItemsBetweenRequisitionLists,u=n?T(n):null,a=i?T(i):null;return u&&R.emit("requisitionList/data",u),{sourceList:u,destinationList:a}},M=`
  mutation COPY_ITEMS_BETWEEN_REQUISITION_LISTS_MUTATION(
      $sourceRequisitionListUid: ID!,
      $destinationRequisitionListUid: ID!,
      $requisitionListItem: CopyItemsBetweenRequisitionListsInput
    ) {
    copyItemsBetweenRequisitionLists(
      sourceRequisitionListUid: $sourceRequisitionListUid
      destinationRequisitionListUid: $destinationRequisitionListUid
      requisitionListItem: $requisitionListItem
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${q}
`,B=async(o,_,I)=>{var t;const{errors:r,data:s}=await L(M,{variables:{sourceRequisitionListUid:o,destinationRequisitionListUid:_,requisitionListItem:{requisitionListItemUids:I}}});return r?m(r):(t=s==null?void 0:s.copyItemsBetweenRequisitionLists)!=null&&t.requisition_list?{destinationList:T(s.copyItemsBetweenRequisitionLists.requisition_list)}:null};export{D as a,B as c,w as d,Q as g,v as m,f as u};
//# sourceMappingURL=copyItemsBetweenRequisitionLists.js.map
