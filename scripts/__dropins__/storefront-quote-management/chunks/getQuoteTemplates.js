/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as y}from"@dropins/tools/event-bus.js";import{t as b,f as E}from"./transform-quote.js";import{s as f}from"./state.js";function P(e){var i,n,o,a,l;return e?{uid:e.uid,name:e.name,createdAt:e.created_at,updatedAt:e.updated_at,expirationDate:e.expiration_date,status:e.status,salesRepName:e.sales_rep_name,buyer:{firstname:e.buyer.firstname,lastname:e.buyer.lastname},comments:(i=e.comments)==null?void 0:i.map(r=>{var c;return{uid:r.uid,createdAt:r.created_at,author:{firstname:r.author.firstname,lastname:r.author.lastname},text:r.text,attachments:(c=r.attachments)==null?void 0:c.map(s=>({name:s.name,url:s.url}))}}),prices:e.prices&&{subtotalExcludingTax:e.prices.subtotal_excluding_tax&&{value:e.prices.subtotal_excluding_tax.value,currency:e.prices.subtotal_excluding_tax.currency},subtotalIncludingTax:e.prices.subtotal_including_tax&&{value:e.prices.subtotal_including_tax.value,currency:e.prices.subtotal_including_tax.currency},subtotalWithDiscountExcludingTax:e.prices.subtotal_with_discount_excluding_tax&&{value:e.prices.subtotal_with_discount_excluding_tax.value,currency:e.prices.subtotal_with_discount_excluding_tax.currency},appliedTaxes:(n=e.prices.applied_taxes)==null?void 0:n.map(r=>({amount:{value:r.amount.value,currency:r.amount.currency},label:r.label})),grandTotal:e.prices.grand_total&&{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency}},history:(o=e.history)==null?void 0:o.map(r=>({uid:r.uid,createdAt:r.created_at,author:{firstname:r.author.firstname,lastname:r.author.lastname},changeType:r.change_type,changes:r.changes})),items:((a=e.items)==null?void 0:a.map(r=>{var c,s,_,d,g,p;return{uid:r.uid,product:{uid:r.product.uid,sku:r.product.sku,name:r.product.name},quantity:r.quantity,prices:{originalItemPrice:{value:r.prices.original_item_price.value,currency:r.prices.original_item_price.currency},rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency}},catalogDiscount:r.prices.catalog_discount&&{amountOff:r.prices.catalog_discount.amount_off,percentOff:r.prices.catalog_discount.percent_off},discounts:(s=(c=r.prices)==null?void 0:c.discounts)==null?void 0:s.map(t=>({label:t.label,value:t.value,amount:{value:t.amount.value,currency:t.amount.currency}})),noteFromBuyer:(_=r.note_from_buyer)==null?void 0:_.map(t=>({createdAt:t.created_at,creatorId:t.creator_id,creatorType:t.creator_type,negotiableQuoteItemUid:t.negotiable_quote_template_item_uid,note:t.note,noteUid:t.note_uid})),noteFromSeller:(d=r.note_from_seller)==null?void 0:d.map(t=>({createdAt:t.created_at,creatorId:t.creator_id,creatorType:t.creator_type,negotiableQuoteItemUid:t.negotiable_quote_template_item_uid,note:t.note,noteUid:t.note_uid})),configurableOptions:(g=r.configurable_options)==null?void 0:g.map(t=>({optionLabel:t.option_label,valueLabel:t.value_label})),bundleOptions:(p=r.bundle_options)==null?void 0:p.map(t=>({label:t.label,values:t.values.map(u=>({label:u.label,quantity:u.quantity,originalPrice:{value:u.original_price.value,currency:u.original_price.currency},price:{value:u.priceV2.value,currency:u.priceV2.currency}}))}))}}))||[],shippingAddresses:(l=e.shipping_addresses)==null?void 0:l.map(r=>({uid:r.uid,firstname:r.firstname,lastname:r.lastname,company:r.company,street:r.street,city:r.city,postcode:r.postcode,country:{code:r.country.code,label:r.country.label},telephone:r.telephone,region:r.region?{code:r.region.code,label:r.region.label,regionId:r.region.region_id}:void 0})),canAccept:["SUBMITTED","PENDING","IN_REVIEW"].includes(e.status),canDelete:["CLOSED","INACTIVE"].includes(e.status),canReopen:e.status==="CLOSED",canCancel:["ACTIVE","IN_REVIEW","SUBMITTED"].includes(e.status),canGenerateQuote:e.status==="ACTIVE"}:null}function T(e){var o;if(!e)return null;const i={items:((o=e.items)==null?void 0:o.map(a=>({id:a.template_id,uid:"TBD",name:a.name,createdAt:"0000-00-00 00:00:00",updatedAt:"0000-00-00 00:00:00",status:a.status,state:a.state,prices:{grandTotal:{value:0,currency:"USD"},minNegotiatedGrandTotal:{value:a.min_negotiated_grand_total,currency:"USD"}},lastSharedAt:a.last_shared_at,lastOrderedAt:"0000-00-00 00:00:00",expirationDate:"0000-00-00 00:00:00",ordersPlaced:a.orders_placed})))||[],pageInfo:{currentPage:e.page_info.current_page,pageSize:e.page_info.page_size,totalPages:e.page_info.total_pages},totalCount:e.total_count,sortFields:e.sort_fields?{default:e.sort_fields.default,options:e.sort_fields.options}:void 0},n=b(i);return{...i,paginationInfo:n||void 0}}const I=`
  query QUOTE_TEMPLATES_QUERY(
    $filter: NegotiableQuoteTemplateFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteTemplateSortInput
  ) {
    negotiableQuoteTemplates(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        # uid
        template_id
        name
        # created_at
        # updated_at
        # last_ordered_at
        status
        state
        min_negotiated_grand_total
        last_shared_at
        # expiration_date
        orders_placed
        # grand_total {
        #   currency
        #   value
        # }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
      sort_fields {
        default
        options {
          label
          value
        }
      }
    }
  }
`;var v=(e=>(e.ACTIVE="ACTIVE",e.IN_REVIEW="IN_REVIEW",e.INACTIVE="INACTIVE",e))(v||{}),A=(e=>(e.NAME="NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(A||{}),m=(e=>(e.ASC="ASC",e.DESC="DESC",e))(m||{});const S=async(e={})=>{var i;if(!f.authenticated)throw new Error("Unauthorized");try{const n=await E(I,{variables:{filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null}});if(!((i=n==null?void 0:n.data)!=null&&i.negotiableQuoteTemplates))throw new Error("No quote templates data received");const o=T(n.data.negotiableQuoteTemplates);if(!o)throw new Error("Failed to transform quote templates data");return y.emit("quote-management/quote-templates-data",{quoteTemplates:o,permissions:f.permissions}),o}catch(n){return Promise.reject(n)}};export{v as Q,m as S,A as a,S as g,P as t};
//# sourceMappingURL=getQuoteTemplates.js.map
