import{s}from"./resetCart.js";function R(r){var n,u,e,l,c,t,a;return r?{id:r.id,totalQuantity:z(r),errors:S(r==null?void 0:r.itemsV2),items:h(r==null?void 0:r.itemsV2),miniCartMaxItems:h(r==null?void 0:r.itemsV2).slice(0,((n=s.config)==null?void 0:n.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},subtotal:{excludingTax:{value:(u=r.prices.subtotal_excluding_tax)==null?void 0:u.value,currency:(e=r.prices.subtotal_excluding_tax)==null?void 0:e.currency},includingTax:{value:(l=r.prices.subtotal_including_tax)==null?void 0:l.value,currency:(c=r.prices.subtotal_including_tax)==null?void 0:c.currency},includingDiscountOnly:{value:(t=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:t.value,currency:(a=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:a.currency}},appliedTaxes:I(r.prices.applied_taxes),totalTax:k(r.prices.applied_taxes,r.prices.grand_total.currency),appliedDiscounts:I(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&N(r)},isGuestCart:!s.authenticated,hasOutOfStockItems:$(r),hasFullyOutOfStockItems:P(r)}:null}function k(r,n){return r!=null&&r.length?r.reduce((u,e)=>({value:u.value+e.amount.value,currency:e.amount.currency}),{value:0,currency:n}):{value:0,currency:n}}function h(r){var u;if(!((u=r==null?void 0:r.items)!=null&&u.length))return[];const n=s.config;return r.items.map(e=>{var l,c,t,a,_,o,i,g,y,m,f,b,d,v,C,x;return{itemType:e.__typename,uid:e.uid,url:{urlKey:e.product.url_key,categories:e.product.categories.map(O=>O.url_key)},quantity:e.quantity,sku:e.product.sku,name:e.product.name,image:{src:n!=null&&n.useConfigurableParentThumbnail?e.product.thumbnail.url:((c=(l=e.configured_variant)==null?void 0:l.thumbnail)==null?void 0:c.url)||e.product.thumbnail.url,alt:n!=null&&n.useConfigurableParentThumbnail?e.product.thumbnail.label:((a=(t=e.configured_variant)==null?void 0:t.thumbnail)==null?void 0:a.label)||e.product.thumbnail.label},price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:G(e.links),total:e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.row_total.value,currency:e.prices.row_total.currency}:{value:(_=e.prices.original_row_total)==null?void 0:_.value,currency:(o=e.prices.original_row_total)==null?void 0:o.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency},regularPrice:e.__typename==="ConfigurableCartItem"?{value:(g=(i=e.configured_variant)==null?void 0:i.price_range)==null?void 0:g.maximum_price.regular_price.value,currency:(m=(y=e.configured_variant)==null?void 0:y.price_range)==null?void 0:m.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:(f=e.product.price_range)==null?void 0:f.maximum_price.regular_price.value,currency:(b=e.product.price_range)==null?void 0:b.maximum_price.regular_price.currency},discounted:e.__typename==="BundleCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0?!1:e.__typename==="ConfigurableCartItem"?((v=(d=e.configured_variant)==null?void 0:d.price_range)==null?void 0:v.maximum_price.discount.amount_off)>0:((C=e.product.price_range)==null?void 0:C.maximum_price.discount.amount_off)>0,bundleOptions:e.__typename==="BundleCartItem"?w(e.bundle_options):null,selectedOptions:E(e.configurable_options),customizableOptions:A(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},onlyXLeftInStock:e.__typename==="ConfigurableCartItem"?(x=e.configured_variant)==null?void 0:x.only_x_left_in_stock:e.product.only_x_left_in_stock,lowInventory:e.is_available&&e.product.only_x_left_in_stock!==null,insufficientQuantity:(e.__typename==="ConfigurableCartItem"?e.configured_variant:e.product).stock_status==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockLevel:M(e)}})}function S(r){var u;const n=(u=r==null?void 0:r.items)==null?void 0:u.reduce((e,l)=>{var c;return(c=l.errors)==null||c.forEach(t=>{e.push({uid:l.uid,text:t.message})}),e},[]);return n!=null&&n.length?n:null}function I(r){return r!=null&&r.length?r.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label})):[]}function w(r){const n=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(l=>l.label).join(", ")})),u={};return n==null||n.forEach(e=>{u[e.label]=e.value}),Object.keys(u).length>0?u:null}function E(r){const n=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),u={};return n==null||n.forEach(e=>{u[e.label]=e.value}),Object.keys(u).length>0?u:null}function A(r){const n=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(l=>({uid:l.customizable_option_value_uid,label:l.label,value:l.value}))})),u={};return n==null||n.forEach(e=>{var l;switch(e.type){case"field":case"area":case"date_time":u[e.label]=e.values[0].value;break;case"radio":case"drop_down":u[e.label]=e.values[0].label;break;case"multiple":case"checkbox":u[e.label]=e.values.reduce((o,i)=>o?`${o}, ${i.label}`:i.label,"");break;case"file":const c=new DOMParser,t=e.values[0].value,_=((l=c.parseFromString(t,"text/html").querySelector("a"))==null?void 0:l.textContent)||"";u[e.label]=_;break}}),u}function z(r){var n,u;return((n=s.config)==null?void 0:n.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((u=s.config)==null?void 0:u.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function G(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(n=>n.title).join(", ")}:null}function N(r){var n,u,e,l;return(n=r.shipping_addresses)!=null&&n.length?(u=r.shipping_addresses)==null?void 0:u.map(c=>({countryCode:c.country.code,zipCode:c.postcode,regionCode:c.region.code})):(e=r.addresses)!=null&&e.length?(l=r.addresses)==null?void 0:l.filter(c=>c.default_shipping).map(c=>{var t;return c.default_shipping&&{countryCode:c.country_id,zipCode:c.postcode,regionCode:(t=c.region)==null?void 0:t.region_code}}):null}function $(r){var n,u;return(u=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:u.some(e=>{var l;return((l=e==null?void 0:e.product)==null?void 0:l.stock_status)==="OUT_OF_STOCK"||e.product.stock_status==="IN_STOCK"&&!e.is_available})}function M(r){if(!r.not_available_message)return null;const n=r.not_available_message.match(/-?\d+/);return n?parseInt(n[0]):"noNumber"}function P(r){var n,u;return(u=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:u.some(e=>{var l;return((l=e==null?void 0:e.product)==null?void 0:l.stock_status)==="OUT_OF_STOCK"})}const p=`
  customizable_options {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price{
        type
        units
        value
      }
    }
  }
`,T=`
  price_range {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
    }
  }
`,D=`
fragment CartFragment on Cart {
  id
  total_quantity
  is_virtual
  prices {
    subtotal_with_discount_excluding_tax {
      currency
      value
    }
    subtotal_including_tax {
      currency
      value
    }
    subtotal_excluding_tax {
      currency
      value
    }
    grand_total {
      currency
      value
    }
    grand_total_excluding_tax {
      currency
      value
    }
    applied_taxes {
      label,
      amount {
        value
        currency
      }
    }
    discounts {
      amount {
        value
        currency
      }
      label
    }
  }
  itemsV2 (
      pageSize:$pageSize,
      currentPage:$currentPage,
      sort: $itemsSortInput
    ) {
    items {
      __typename
      uid
      quantity
      is_available
      not_available_message
      errors {
        code
        message
      }
      
      prices {
        price {
          value
          currency
        }
        total_item_discount {
          value
          currency
        }
        row_total {
          value
          currency
        }
        row_total_including_tax {
          value
          currency
        }
        price_including_tax {
          value
          currency
        }
        fixed_product_taxes {
          amount {
            value
            currency
          }
          label
        }
        original_row_total{
          value
          currency
        }
      }
  
      product {
        name
        sku
        thumbnail {
          url
          label
        }
        url_key
        url_suffix
        categories {
          url_path
          url_key
        }
        only_x_left_in_stock
        stock_status                  
        ${T}
      }
      ...on SimpleCartItem {
        ${p}
      }
      ... on ConfigurableCartItem {
        configurable_options {
          configurable_product_option_uid
          option_label
          value_label
        }
        configured_variant {
          uid
          sku
          only_x_left_in_stock
          stock_status
          thumbnail {
            label
            url
          }
          ${T}
        }
        ${p}
      }
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        ${p}
      }
      ... on BundleCartItem {
        bundle_options {
          uid
          label
          values {
            uid
            label
          }
        }
      }
      ... on GiftCardCartItem {
        message
        recipient_email
        recipient_name
        sender_email
        sender_name
        amount{
          currency
          value
        }
        is_available
      }
    }
  }
  shipping_addresses {
    country {
      code
    }
    region {
      code
    }
    postcode
  }
}
`,V=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,q=`
customer {
  addresses {
    default_shipping
    country_id
    postcode
    region {
      region
      region_code
      region_id
    }
  }
}`;export{V as C,D as a,q as b,R as t};
