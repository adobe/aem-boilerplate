/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as I,f as n,h as u,t as _}from"./transform-requisition-list.js";import{R as T}from"./RequisitionListItemsFragment.graphql.js";function l(i){var e;return{sku:i.sku,parent_sku:i.sku,name:i.name,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((e=i.images)==null?void 0:e.map(t=>({url:t.url,label:t.label||"",roles:t.roles||[]})))||[]}}function a(i){return i!=null&&i.length?i.map(l):[]}const m=`
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
${T}
${I}
`,q=async(i,e,t)=>n(m,{variables:{requisitionListUid:i,currentPage:e,pageSize:t}}).then(({errors:s,data:r})=>{var o;return s?u(s):(o=r==null?void 0:r.customer)!=null&&o.requisition_lists?_(r.customer.requisition_lists.items[0]):null}),c=`
  mutation UPDATE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [UpdateRequisitionListItemsInput!]!,
    ) {
    updateRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
      ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${I}
${T}
`,p=async(i,e)=>n(c,{variables:{requisitionListUid:i,requisitionListItems:e}}).then(({errors:t,data:s})=>t?u(t):_(s.updateRequisitionListItems.requisition_list)),R=`
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
    }
  }
`,N=async(i,e)=>n(R,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:t,data:s})=>{var r;return t?u(t):(r=s.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&r.length?s.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(o=>o.type):null}),E=`
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
`,d=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${E}
`,O=async i=>n(d,{variables:{skus:i}}).then(({errors:e,data:t})=>e?u(e):t!=null&&t.products?a(t.products):null),U=`
  mutation DELETE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!
    ) {
    deleteRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${I}
${T}
`,A=async(i,e)=>n(U,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:t,data:s})=>t?u(t):_(s.deleteRequisitionListItems.requisition_list));export{N as a,q as b,A as d,O as g,p as u};
//# sourceMappingURL=deleteRequisitionListItems.js.map
