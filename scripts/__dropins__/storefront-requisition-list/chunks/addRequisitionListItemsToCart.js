/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as _,R as a,f as I,h as m,e as T,t as c}from"./updateRequisitionList.js";import{events as q}from"@dropins/tools/event-bus.js";function R(i){var r;return{sku:i.sku,parent_sku:i.sku,name:i.name,price:i.price,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((r=i.images)==null?void 0:r.map(t=>({url:t.url,label:t.label||"",roles:t.roles||[]})))||[]}}function L(i){return i!=null&&i.length?i.map(R):[]}const E=`
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
${_}
${a}
`;function p(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}const O=async(i,r,t)=>p(i)?I(E,{variables:{requisitionListUid:i,currentPage:r,pageSize:t}}).then(async({errors:n,data:s})=>{var u,o;if(n)return m(n);if(!((u=s==null?void 0:s.customer)!=null&&u.requisition_lists))return null;(o=s.customer.requisition_lists.items[0].items)!=null&&o.items&&(s.customer.requisition_lists.items[0].items.items=await T(s.customer.requisition_lists.items[0].items.items));const e=c(s.customer.requisition_lists.items[0]);return q.emit("requisitionList/data",e),e}):(console.error("Invalid requisition list UID format:",i),null),S=`
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
${a}
${_}
`,A=async(i,r,t,n)=>I(S,{variables:{requisitionListUid:i,requisitionListItems:r,pageSize:t,currentPage:n}}).then(async({errors:s,data:e})=>{var o,l;if(s)return m(s);if(!((o=e==null?void 0:e.updateRequisitionListItems)!=null&&o.requisition_list))return null;(l=e.updateRequisitionListItems.requisition_list.items)!=null&&l.items&&(e.updateRequisitionListItems.requisition_list.items.items=await T(e.updateRequisitionListItems.requisition_list.items.items));const u=c(e.updateRequisitionListItems.requisition_list);return q.emit("requisitionList/data",u),u}),U=`
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
${a}
${_}
`,P=async(i,r,t,n)=>I(U,{variables:{requisitionListUid:i,requisitionListItemUids:r,pageSize:t,currentPage:n}}).then(async({errors:s,data:e})=>{var o,l;if(s)return m(s);if(!((o=e==null?void 0:e.deleteRequisitionListItems)!=null&&o.requisition_list))return null;(l=e.deleteRequisitionListItems.requisition_list.items)!=null&&l.items&&(e.deleteRequisitionListItems.requisition_list.items.items=await T(e.deleteRequisitionListItems.requisition_list.items.items));const u=c(e.deleteRequisitionListItems.requisition_list);return q.emit("requisitionList/data",u),u}),d=`
fragment PRODUCT_FRAGMENT on ProductView {
  __typename
  id
  sku
  name
  shortDescription
  metaDescription
  metaKeyword
  metaTitle
  description
  inStock
  addToCartAllowed
  url
  urlKey
  externalId
  images(roles: []) {
    url
    label
    roles
  }
  attributes(roles: []) {
    name
    label
    value
    roles
  }
  ... on SimpleProductView {
    price {
      roles
      regular {
        amount {
          value
          currency
        }
      }
      final {
        amount {
          value
          currency
        }
      }
    }
  }
  ... on ComplexProductView {
    options {
      ...PRODUCT_OPTION_FRAGMENT
    }
    ...PRICE_RANGE_FRAGMENT
  }
}
fragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {
  id
  title
  required
  multi
  values {
    id
    title
    inStock
    __typename
    ... on ProductViewOptionValueProduct {
      title
      quantity
      isDefault
      __typename
      product {
        sku
        shortDescription
        metaDescription
        metaKeyword
        metaTitle
        name
        price {
          final {
            amount {
              value
              currency
            }
          }
          regular {
            amount {
              value
              currency
            }
          }
          roles
        }
      }
    }
    ... on ProductViewOptionValueSwatch {
      id
      title
      type
      value
      inStock
    }
  }
}
fragment PRICE_RANGE_FRAGMENT on ComplexProductView {
  priceRange {
    maximum {
      final {
        amount {
          value
          currency
        }
      }
      regular {
        amount {
          value
          currency
        }
      }
      roles
    }
    minimum {
      final {
        amount {
          value
          currency
        }
      }
      regular {
        amount {
          value
          currency
        }
      }
      roles
    }
  }
}
`,f=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${d}
`,$=async i=>I(f,{variables:{skus:i}}).then(({errors:r,data:t})=>r?m(r):t!=null&&t.products?L(t.products):null),N=`
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
`,D=async(i,r)=>I(N,{variables:{requisitionListUid:i,requisitionListItemUids:r}}).then(({errors:t,data:n})=>{var s;return t?m(t):(s=n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(e=>e.type):null});export{D as a,$ as b,P as d,O as g,p as i,A as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
