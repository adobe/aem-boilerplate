/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as c}from"@dropins/tools/event-bus.js";import{FetchGraphQL as p}from"@dropins/tools/fetch-graphql.js";const d=e=>{const i=e.map(o=>o.message).join(" ");throw Error(i)},{setEndpoint:E,setFetchGraphQlHeader:v,removeFetchGraphQlHeader:y,setFetchGraphQlHeaders:h,fetchGraphQl:l,getConfig:N}=new p().getMethods(),f=`
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
`,I=e=>e.configurable_options.map(i=>btoa(`configurable/${atob(i.configurable_product_option_uid)}/${atob(i.configurable_product_option_value_uid)}`)),g=async e=>Promise.all(e.map(async i=>{if(!i.product||!i.configurable_options||i.configurable_options.length===0)return i;const o=I(i),{errors:s,data:n}=await l(f,{variables:{optionIds:o,sku:i.product.sku}});return s?(console.error("Failed to refine product:",s),i):n!=null&&n.refineProduct?{...i,configured_product:n.refineProduct}:i})),m=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function b(e){var i,o;return e?{uid:e.uid,name:e.name,description:e.description,updated_at:e.updated_at,items_count:e.items_count,items:T((i=e.items)==null?void 0:i.items),page_info:(o=e.items)==null?void 0:o.page_info}:null}function T(e){return e!=null&&e.length?e.map(i=>{var s,n,a,r;const o={uid:i.uid,sku:(s=i.product)==null?void 0:s.sku,quantity:i.quantity,stock_status:((n=i.product)==null?void 0:n.stock_status)||"IN_STOCK",only_x_left_in_stock:((a=i.product)==null?void 0:a.only_x_left_in_stock)??null,customizable_options:i.customizable_options?i.customizable_options.map(t=>({uid:t.customizable_option_uid,is_required:t.is_required,label:t.label,sort_order:t.sort_order,type:t.type,values:t.values.map(u=>({uid:u.customizable_option_value_uid,label:u.label,price:u.price,value:u.value}))})):[],bundle_options:i.bundle_options||[],configurable_options:i.configurable_options?i.configurable_options.map(t=>({option_uid:t.configurable_product_option_uid,option_label:t.option_label,value_uid:t.configurable_product_option_value_uid,value_label:t.value_label})):[],samples:i.samples?i.samples.map(t=>({url:t.sample_url,sort_order:t.sort_order,title:t.title})):[],gift_card_options:i.gift_card_options||{}};return(r=i.configured_product)!=null&&r.name?{...o,configured_product:i.configured_product}:o}):[]}const R=`
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
    product {
      sku
      stock_status
      only_x_left_in_stock
    }
    customizable_options {
      customizable_option_uid
      is_required
      label
      sort_order
      type
      values {
        customizable_option_value_uid
        label
        value
        price {
          type
          units
          value
        }
      }
    }
    ... on ConfigurableRequisitionListItem {
      configurable_options {
        configurable_product_option_uid
        configurable_product_option_value_uid
        option_label
        value_label
      }
    }
    ... on DownloadableRequisitionListItem {
      links {
        price
        sample_url
        sort_order
        title
        uid
      }
      samples {
        sample_url
        sort_order
        title
      }
    }
    ... on BundleRequisitionListItem {
      bundle_options {
        uid
        type
        label
        values {
          uid
          label
          quantity
          priceV2 {
            value
            currency
          }
          original_price {
            value
            currency
          }
        }
      }
    }
    ... on GiftCardRequisitionListItem {
      gift_card_options {
        amount {
          currency
          value
        }
        custom_giftcard_amount {
          currency
          value
        }
        message
        recipient_email
        recipient_name
        sender_name
        sender_email
      }
    }
  }
  page_info {
    page_size
    current_page
    total_pages
  }
}
`,q=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!,
      $description: String,
      $pageSize: Int,
      $currentPage: Int
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
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
${R}
`,U=async(e,i,o,s,n)=>l(q,{variables:{requisitionListUid:e,name:i,description:o,pageSize:s,currentPage:n}}).then(async({errors:a,data:r})=>{var u,_;if(a)return d(a);if(!((u=r==null?void 0:r.updateRequisitionList)!=null&&u.requisition_list))return null;(_=r.updateRequisitionList.requisition_list.items)!=null&&_.items&&(r.updateRequisitionList.requisition_list.items.items=await g(r.updateRequisitionList.requisition_list.items.items));const t=b(r.updateRequisitionList.requisition_list);return c.emit("requisitionList/data",t),t});export{m as R,v as a,h as b,R as c,g as e,l as f,N as g,d as h,y as r,E as s,b as t,U as u};
//# sourceMappingURL=updateRequisitionList.js.map
