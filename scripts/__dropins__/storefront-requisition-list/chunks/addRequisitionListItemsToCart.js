/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as I,f as o,h as a,t as _}from"./transform-requisition-list.js";import{R as l}from"./RequisitionListItemsFragment.graphql.js";import{events as T}from"@dropins/tools/event-bus.js";function m(i){var e;return{sku:i.sku,parent_sku:i.sku,name:i.name,price:i.price,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((e=i.images)==null?void 0:e.map(t=>({url:t.url,label:t.label||"",roles:t.roles||[]})))||[]}}function c(i){return i!=null&&i.length?i.map(m):[]}const R=`
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
${l}
${I}
`,O=async(i,e,t)=>o(R,{variables:{requisitionListUid:i,currentPage:e,pageSize:t}}).then(({errors:r,data:s})=>{var u;if(r)return a(r);if(!((u=s==null?void 0:s.customer)!=null&&u.requisition_lists))return null;const n=_(s.customer.requisition_lists.items[0]);return T.emit("requisitionList/data",n),n}),d=`
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
${I}
${l}
`,A=async(i,e,t,r)=>o(d,{variables:{requisitionListUid:i,requisitionListItems:e,pageSize:t,currentPage:r}}).then(({errors:s,data:n})=>{if(s)return a(s);const u=_(n.updateRequisitionListItems.requisition_list);return T.emit("requisitionList/data",u),u}),E=`
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
${I}
${l}
`,g=async(i,e,t,r)=>o(E,{variables:{requisitionListUid:i,requisitionListItemUids:e,pageSize:t,currentPage:r}}).then(({errors:s,data:n})=>{if(s)return a(s);const u=_(n.deleteRequisitionListItems.requisition_list);return T.emit("requisitionList/data",u),u}),S=`
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
`,L=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${S}
`,$=async i=>o(L,{variables:{skus:i}}).then(({errors:e,data:t})=>e?a(e):t!=null&&t.products?c(t.products):null),q=`
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
`,y=async(i,e)=>o(q,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:t,data:r})=>{var s;return t?a(t):(s=r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(n=>n.type):null});export{y as a,$ as b,g as d,O as g,A as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
