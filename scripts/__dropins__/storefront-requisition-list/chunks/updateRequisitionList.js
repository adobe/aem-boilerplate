/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as p,h as d}from"./fetch-graphql.js";import{events as I}from"@dropins/tools/event-bus.js";const m=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function f(t){var i,u;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:b((i=t.items)==null?void 0:i.items),page_info:(u=t.items)==null?void 0:u.page_info}:null}function b(t){return t!=null&&t.length?t.map(i=>{var _,a,s,r;const u={uid:i.uid,sku:(_=i.product)==null?void 0:_.sku,quantity:i.quantity,stock_status:((a=i.product)==null?void 0:a.stock_status)||"IN_STOCK",only_x_left_in_stock:((s=i.product)==null?void 0:s.only_x_left_in_stock)??null,customizable_options:i.customizable_options?i.customizable_options.map(e=>({uid:e.customizable_option_uid,is_required:e.is_required,label:e.label,sort_order:e.sort_order,type:e.type,values:e.values.map(n=>({uid:n.customizable_option_value_uid,label:n.label,price:n.price,value:n.value}))})):[],bundle_options:i.bundle_options||[],configurable_options:i.configurable_options?i.configurable_options.map(e=>({option_uid:e.configurable_product_option_uid,option_label:e.option_label,value_uid:e.configurable_product_option_value_uid,value_label:e.value_label})):[],samples:i.samples?i.samples.map(e=>({url:e.sample_url,sort_order:e.sort_order,title:e.title})):[],gift_card_options:i.gift_card_options||{}};return(r=i.configured_product)!=null&&r.name?{...u,configured_product:i.configured_product}:u}):[]}const g=`
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
`,T=`
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
${g}
`,S=async(t,i,u,_,a,s)=>{var l,c;const{errors:r,data:e}=await p(T,{variables:{requisitionListUid:t,name:i,description:u,pageSize:_,currentPage:a}});if(r)return d(r);if(!((l=e==null?void 0:e.updateRequisitionList)!=null&&l.requisition_list))return null;const n=e.updateRequisitionList.requisition_list;let o=f(n);return(c=o==null?void 0:o.items)!=null&&c.length&&s&&(o={...o,items:await s(o.items)}),I.emit("requisitionList/data",o),o};export{m as R,g as a,f as t,S as u};
//# sourceMappingURL=updateRequisitionList.js.map
