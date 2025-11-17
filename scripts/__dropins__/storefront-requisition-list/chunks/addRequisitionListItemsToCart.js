/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c,R as m,f as a,h as I,t as T}from"./updateRequisitionList.js";import{events as p}from"@dropins/tools/event-bus.js";function S(i){var r;return{sku:i.sku,parent_sku:i.sku,name:i.name,price:i.price,shortDescription:i.shortDescription||"",metaDescription:i.metaDescription||"",metaKeyword:i.metaKeyword||"",metaTitle:i.metaTitle||"",description:i.description||"",addToCartAllowed:i.addToCartAllowed,url:i.url||"",urlKey:i.urlKey||"",externalId:i.externalId||"",images:((r=i.images)==null?void 0:r.map(t=>({url:t.url,label:t.label||"",roles:t.roles||[]})))||[]}}function U(i){return i!=null&&i.length?i.map(S):[]}const L=`
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
${c}
${m}
`,f=`
  query REFINE_PRODUCT(
    $optionIds: [String!]!,
    $sku: String!
  ) {
    refineProduct(
      optionIds: $optionIds
      sku: $sku
    ) {
      sku
      name
      images {
        url
      }
      ... on SimpleProductView {
        price {
          final {
            amount {
              value
              currency
            }
          }
        }
      }
    }
  }
`;function g(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}const M=async(i,r,t)=>{if(!g(i))return console.error("Invalid requisition list UID format:",i),null;const n=s=>s.configurable_options.map(e=>btoa(`configurable/${atob(e.configurable_product_option_uid)}/${atob(e.configurable_product_option_value_uid)}`));return a(L,{variables:{requisitionListUid:i,currentPage:r,pageSize:t}}).then(async({errors:s,data:e})=>{var d,R;if(s)return I(s);if(!((d=e==null?void 0:e.customer)!=null&&d.requisition_lists))return null;const l=await Promise.all((R=e==null?void 0:e.customer)==null?void 0:R.requisition_lists.items[0].items.items.map(async o=>{if(!o.product||!o.configurable_options)return o;const q=n(o),{errors:E,data:_}=await a(f,{variables:{optionIds:q,sku:o.product.sku}});return E?(console.error("Failed to refine product:",E),o):_!=null&&_.refineProduct?{...o,configured_product:_.refineProduct}:o}));e.customer.requisition_lists.items[0].items.items=l;const u=T(e.customer.requisition_lists.items[0]);return p.emit("requisitionList/data",u),u})},N=`
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
${m}
${c}
`,b=async(i,r,t,n)=>a(N,{variables:{requisitionListUid:i,requisitionListItems:r,pageSize:t,currentPage:n}}).then(({errors:s,data:e})=>{var u;if(s)return I(s);if(!((u=e==null?void 0:e.updateRequisitionListItems)!=null&&u.requisition_list))return null;const l=T(e.updateRequisitionListItems.requisition_list);return p.emit("requisitionList/data",l),l}),P=`
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
${m}
${c}
`,v=async(i,r,t,n)=>a(P,{variables:{requisitionListUid:i,requisitionListItemUids:r,pageSize:t,currentPage:n}}).then(({errors:s,data:e})=>{var u;if(s)return I(s);if(!((u=e==null?void 0:e.deleteRequisitionListItems)!=null&&u.requisition_list))return null;const l=T(e.deleteRequisitionListItems.requisition_list);return p.emit("requisitionList/data",l),l}),$=`
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
`,O=`
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${$}
`,C=async i=>a(O,{variables:{skus:i}}).then(({errors:r,data:t})=>r?I(r):t!=null&&t.products?U(t.products):null),y=`
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
`,G=async(i,r)=>a(y,{variables:{requisitionListUid:i,requisitionListItemUids:r}}).then(({errors:t,data:n})=>{var s;return t?I(t):(s=n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(e=>e.type):null});export{G as a,C as b,v as d,M as g,g as i,b as u};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
