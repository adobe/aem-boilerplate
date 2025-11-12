/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as a,R as _,f as l,h as I,t as T}from"./updateRequisitionList.js";import{events as m}from"@dropins/tools/event-bus.js";function c(i){var t;return{sku:i.sku,parent_sku:i.sku,name:i.name,price:i.price,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((t=i.images)==null?void 0:t.map(e=>({url:e.url,label:e.label||"",roles:e.roles||[]})))||[]}}function R(i){return i!=null&&i.length?i.map(c):[]}const E=`
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
${a}
${_}
`;function q(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}const O=async(i,t,e)=>q(i)?l(E,{variables:{requisitionListUid:i,currentPage:t,pageSize:e}}).then(({errors:n,data:r})=>{var u;if(n)return I(n);if(!((u=r==null?void 0:r.customer)!=null&&u.requisition_lists))return null;const s=T(r.customer.requisition_lists.items[0]);return m.emit("requisitionList/data",s),s}):(console.error("Invalid requisition list UID format:",i),null),S=`
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
${_}
${a}
`,f=async(i,t,e,n)=>l(S,{variables:{requisitionListUid:i,requisitionListItems:t,pageSize:e,currentPage:n}}).then(({errors:r,data:s})=>{var o;if(r)return I(r);if(!((o=s==null?void 0:s.updateRequisitionListItems)!=null&&o.requisition_list))return null;const u=T(s.updateRequisitionListItems.requisition_list);return m.emit("requisitionList/data",u),u}),L=`
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
${_}
${a}
`,A=async(i,t,e,n)=>l(L,{variables:{requisitionListUid:i,requisitionListItemUids:t,pageSize:e,currentPage:n}}).then(({errors:r,data:s})=>{var o;if(r)return I(r);if(!((o=s==null?void 0:s.deleteRequisitionListItems)!=null&&o.requisition_list))return null;const u=T(s.deleteRequisitionListItems.requisition_list);return m.emit("requisitionList/data",u),u}),U=`
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
`,p=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${U}
`,$=async i=>l(p,{variables:{skus:i}}).then(({errors:t,data:e})=>t?I(t):e!=null&&e.products?R(e.products):null),d=`
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
`,y=async(i,t)=>l(d,{variables:{requisitionListUid:i,requisitionListItemUids:t}}).then(({errors:e,data:n})=>{var r;return e?I(e):(r=n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&r.length?n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(s=>s.type):null});export{y as a,$ as b,A as d,O as g,q as i,f as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
