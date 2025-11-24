/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as c}from"@dropins/tools/event-bus.js";import{FetchGraphQL as p}from"@dropins/tools/fetch-graphql.js";const d=e=>{const i=e.map(r=>r.message).join(" ");throw Error(i)},{setEndpoint:E,setFetchGraphQlHeader:v,removeFetchGraphQlHeader:y,setFetchGraphQlHeaders:h,fetchGraphQl:l,getConfig:N}=new p().getMethods(),f=`
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
`,g=e=>e.configurable_options.map(i=>btoa(`configurable/${atob(i.configurable_product_option_uid)}/${atob(i.configurable_product_option_value_uid)}`)),I=async e=>Promise.all(e.map(async i=>{if(!i.product||!i.configurable_options||i.configurable_options.length===0)return i;const r=g(i),{errors:u,data:n}=await l(f,{variables:{optionIds:r,sku:i.product.sku}});return u?(console.error("Failed to refine product:",u),i):n!=null&&n.refineProduct?{...i,configured_product:n.refineProduct}:i})),m=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function b(e){var i,r;return e?{uid:e.uid,name:e.name,description:e.description,updated_at:e.updated_at,items_count:e.items_count,items:R((i=e.items)==null?void 0:i.items),page_info:(r=e.items)==null?void 0:r.page_info}:null}function R(e){return e!=null&&e.length?e.map(i=>{var u,n;const r={uid:i.uid,sku:(u=i.product)==null?void 0:u.sku,quantity:i.quantity,customizable_options:i.customizable_options?i.customizable_options.map(t=>({uid:t.customizable_option_uid,is_required:t.is_required,label:t.label,sort_order:t.sort_order,type:t.type,values:t.values.map(o=>({uid:o.customizable_option_value_uid,label:o.label,price:o.price,value:o.value}))})):[],bundle_options:i.bundle_options||[],configurable_options:i.configurable_options?i.configurable_options.map(t=>({option_uid:t.configurable_product_option_uid,option_label:t.option_label,value_uid:t.configurable_product_option_value_uid,value_label:t.value_label})):[],samples:i.samples?i.samples.map(t=>({url:t.sample_url,sort_order:t.sort_order,title:t.title})):[],gift_card_options:i.gift_card_options||{}};return(n=i.configured_product)!=null&&n.name?{...r,configured_product:i.configured_product}:r}):[]}const T=`
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
${T}
`,U=async(e,i,r,u,n)=>l(q,{variables:{requisitionListUid:e,name:i,description:r,pageSize:u,currentPage:n}}).then(async({errors:t,data:o})=>{var a,_;if(t)return d(t);if(!((a=o==null?void 0:o.updateRequisitionList)!=null&&a.requisition_list))return null;(_=o.updateRequisitionList.requisition_list.items)!=null&&_.items&&(o.updateRequisitionList.requisition_list.items.items=await I(o.updateRequisitionList.requisition_list.items.items));const s=b(o.updateRequisitionList.requisition_list);return c.emit("requisitionList/data",s),s});export{m as R,v as a,h as b,T as c,I as e,l as f,N as g,d as h,y as r,E as s,b as t,U as u};
//# sourceMappingURL=updateRequisitionList.js.map
