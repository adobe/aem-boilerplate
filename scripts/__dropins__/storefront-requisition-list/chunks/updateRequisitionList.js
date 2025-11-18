/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";const p=t=>{const e=t.map(o=>o.message).join(" ");throw Error(e)},{setEndpoint:R,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:L,setFetchGraphQlHeaders:S,fetchGraphQl:c,getConfig:E}=new l().getMethods(),d=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function I(t){var e,o;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:m((e=t.items)==null?void 0:e.items),page_info:(o=t.items)==null?void 0:o.page_info}:null}function m(t){return t!=null&&t.length?t.map(e=>{var n,u;const o={uid:e.uid,sku:(n=e.product)==null?void 0:n.sku,quantity:e.quantity,customizable_options:e.customizable_options?e.customizable_options.map(i=>({uid:i.customizable_option_uid,is_required:i.is_required,label:i.label,sort_order:i.sort_order,type:i.type,values:i.values.map(r=>({uid:r.customizable_option_value_uid,label:r.label,price:r.price,value:r.value}))})):[],bundle_options:e.bundle_options||[],configurable_options:e.configurable_options?e.configurable_options.map(i=>({option_uid:i.configurable_product_option_uid,option_label:i.option_label,value_uid:i.configurable_product_option_value_uid,value_label:i.value_label})):[],samples:e.samples?e.samples.map(i=>({url:i.sample_url,sort_order:i.sort_order,title:i.title})):[],gift_card_options:e.gift_card_options||{}};return(u=e.configured_product)!=null&&u.name?{...o,configured_product:e.configured_product}:o}):[]}const g=`
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
    product {
      sku
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
`,b=`
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
${d}
${g}
`,v=async(t,e,o,n,u)=>c(b,{variables:{requisitionListUid:t,name:e,description:o,pageSize:n,currentPage:u}}).then(({errors:i,data:r})=>{var a;if(i)return p(i);if(!((a=r==null?void 0:r.updateRequisitionList)!=null&&a.requisition_list))return null;const s=I(r.updateRequisitionList.requisition_list);return _.emit("requisitionList/data",s),s});export{d as R,q as a,S as b,g as c,c as f,E as g,p as h,L as r,R as s,I as t,v as u};
//# sourceMappingURL=updateRequisitionList.js.map
