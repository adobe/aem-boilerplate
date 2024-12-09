/*! Copyright 2024 Adobe
All Rights Reserved. */
import{f as s,h as i}from"./fetch-graphql.js";function o(e){return e?{baseMediaUrl:e.base_media_url,orderCancellationEnabled:e.order_cancellation_enabled,orderCancellationReasons:e.order_cancellation_reasons,shoppingCartDisplayPrice:e.orders_invoices_credit_memos_display_price,shoppingOrdersDisplaySubtotal:e.orders_invoices_credit_memos_display_subtotal,shoppingOrdersDisplayShipping:e.orders_invoices_credit_memos_display_shipping_amount,shoppingOrdersDisplayGrandTotal:e.orders_invoices_credit_memos_display_grandtotal,shoppingOrdersDisplayFullSummary:e.orders_invoices_credit_memos_display_full_summary,shoppingOrdersDisplayZeroTax:e.orders_invoices_credit_memos_display_zero_tax}:null}const _=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      order_cancellation_enabled
      order_cancellation_reasons {
        description
      }
      base_media_url
      orders_invoices_credit_memos_display_price
      orders_invoices_credit_memos_display_shipping_amount
      orders_invoices_credit_memos_display_subtotal
      orders_invoices_credit_memos_display_grandtotal
      orders_invoices_credit_memos_display_full_summary
      orders_invoices_credit_memos_display_zero_tax
    }
  }
`,l=async()=>s(_,{method:"GET",cache:"force-cache"}).then(({errors:e,data:r})=>e?i(e):o(r.storeConfig));export{l as g};
