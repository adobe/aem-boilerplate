/*! Copyright 2025 Adobe
All Rights Reserved. */
import{R as I,f as n,h as u,t as a}from"./transform-requisition-list.js";import{R as _}from"./RequisitionListItemsFragment.graphql.js";import{events as l}from"@dropins/tools/event-bus.js";function m(i){var e;return{sku:i.sku,parent_sku:i.sku,name:i.name,price:i.price,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((e=i.images)==null?void 0:e.map(t=>({url:t.url,label:t.label||"",roles:t.roles||[]})))||[]}}function c(i){return i!=null&&i.length?i.map(m):[]}const R=`
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
${I}
`,O=async(i,e,t)=>n(R,{variables:{requisitionListUid:i,currentPage:e,pageSize:t}}).then(({errors:r,data:s})=>{var T;if(r)return u(r);if(!((T=s==null?void 0:s.customer)!=null&&T.requisition_lists))return null;const o=a(s.customer.requisition_lists.items[0]);return l.emit("requisitionList/data",o),o}),d=`
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
${_}
`,A=async(i,e)=>n(d,{variables:{requisitionListUid:i,requisitionListItems:e}}).then(({errors:t,data:r})=>{if(t)return u(t);const s=a(r.updateRequisitionListItems.requisition_list);return l.emit("requisitionList/data",s),s}),E=`
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
${_}
`,y=async(i,e)=>n(E,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:t,data:r})=>{if(t)return u(t);const s=a(r.deleteRequisitionListItems.requisition_list);return l.emit("requisitionList/data",s),s}),L=`
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
`,q=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${L}
`,D=async i=>n(q,{variables:{skus:i}}).then(({errors:e,data:t})=>e?u(e):t!=null&&t.products?c(t.products):null),U=`
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
`,M=async(i,e)=>n(U,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:t,data:r})=>{var s;return t?u(t):(s=r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(o=>o.type):null});export{M as a,D as b,y as d,O as g,A as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
