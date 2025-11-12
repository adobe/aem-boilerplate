/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:R,setFetchGraphQlHeader:S,removeFetchGraphQlHeader:q,setFetchGraphQlHeaders:L,fetchGraphQl:p,getConfig:E}=new l().getMethods(),c=t=>{const i=t.map(e=>e.message).join(" ");throw Error(i)},d=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function I(t){var i,e;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:m((i=t.items)==null?void 0:i.items),page_info:(e=t.items)==null?void 0:e.page_info}:null}function m(t){return t!=null&&t.length?t.map(i=>({uid:i.uid,sku:i.product.sku,quantity:i.quantity,customizable_options:i.customizable_options?i.customizable_options.map(e=>({uid:e.customizable_option_uid,is_required:e.is_required,label:e.label,sort_order:e.sort_order,type:e.type,values:e.values.map(o=>({uid:o.customizable_option_value_uid,label:o.label,price:o.price,value:o.value}))})):[],bundle_options:i.bundle_options||[],configurable_options:i.configurable_options?i.configurable_options.map(e=>({option_uid:e.configurable_product_option_uid,option_label:e.option_label,value_uid:e.configurable_product_option_value_uid,value_label:e.value_label})):[],samples:i.samples?i.samples.map(e=>({url:e.sample_url,sort_order:e.sort_order,title:e.title})):[],gift_card_options:i.gift_card_options||{}})):[]}const g=`
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
`,h=async(t,i,e,o,a)=>p(b,{variables:{requisitionListUid:t,name:i,description:e,pageSize:o,currentPage:a}}).then(({errors:r,data:s})=>{var u;if(r)return c(r);if(!((u=s==null?void 0:s.updateRequisitionList)!=null&&u.requisition_list))return null;const n=I(s.updateRequisitionList.requisition_list);return _.emit("requisitionList/data",n),n});export{d as R,S as a,L as b,g as c,p as f,E as g,c as h,q as r,R as s,I as t,h as u};
//# sourceMappingURL=updateRequisitionList.js.map
