/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{FetchGraphQL as d}from"@dropins/tools/fetch-graphql.js";const I=t=>{const e=t.map(o=>o.message).join(" ");throw Error(e)},{setEndpoint:S,setFetchGraphQlHeader:E,removeFetchGraphQlHeader:v,setFetchGraphQlHeaders:N,fetchGraphQl:m,getConfig:h}=new d().getMethods(),g=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function f(t){var e,o;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:b((e=t.items)==null?void 0:e.items),page_info:(o=t.items)==null?void 0:o.page_info}:null}function b(t){return t!=null&&t.length?t.map(e=>{var a,_,n,u;const o={uid:e.uid,sku:(a=e.product)==null?void 0:a.sku,quantity:e.quantity,stock_status:((_=e.product)==null?void 0:_.stock_status)||"IN_STOCK",only_x_left_in_stock:((n=e.product)==null?void 0:n.only_x_left_in_stock)??null,customizable_options:e.customizable_options?e.customizable_options.map(i=>({uid:i.customizable_option_uid,is_required:i.is_required,label:i.label,sort_order:i.sort_order,type:i.type,values:i.values.map(r=>({uid:r.customizable_option_value_uid,label:r.label,price:r.price,value:r.value}))})):[],bundle_options:e.bundle_options||[],configurable_options:e.configurable_options?e.configurable_options.map(i=>({option_uid:i.configurable_product_option_uid,option_label:i.option_label,value_uid:i.configurable_product_option_value_uid,value_label:i.value_label})):[],samples:e.samples?e.samples.map(i=>({url:i.sample_url,sort_order:i.sort_order,title:i.title})):[],gift_card_options:e.gift_card_options||{}};return(u=e.configured_product)!=null&&u.name?{...o,configured_product:e.configured_product}:o}):[]}const T=`
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
`,R=`
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
${g}
${T}
`,y=async(t,e,o,a,_,n)=>{var l,c;const{errors:u,data:i}=await m(R,{variables:{requisitionListUid:t,name:e,description:o,pageSize:a,currentPage:_}});if(u)return I(u);if(!((l=i==null?void 0:i.updateRequisitionList)!=null&&l.requisition_list))return null;const r=i.updateRequisitionList.requisition_list;let s=f(r);return(c=s==null?void 0:s.items)!=null&&c.length&&n&&(s={...s,items:await n(s.items)}),p.emit("requisitionList/data",s),s};export{g as R,E as a,N as b,T as c,m as f,h as g,I as h,v as r,S as s,f as t,y as u};
//# sourceMappingURL=updateRequisitionList.js.map
