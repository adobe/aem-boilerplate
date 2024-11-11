import{f as i,h as s}from"./fetch-graphql.js";function n(p){return p?{orderCancellationEnabled:p.order_cancellation_enabled,orderCancellationReasons:p.order_cancellation_reasons,shoppingCartDisplayPrice:p.shopping_cart_display_price,shoppingOrdersDisplaySubtotal:p.shopping_cart_display_subtotal,shoppingOrdersDisplayShipping:p.shopping_cart_display_shipping,shoppingOrdersDisplayGrandTotal:p.shopping_cart_display_grand_total,shoppingOrdersDisplayTaxGiftWrapping:p.shopping_cart_display_tax_gift_wrapping,shoppingOrdersDisplayFullSummary:p.shopping_cart_display_full_summary,shoppingOrdersDisplayZeroTax:p.shopping_cart_display_zero_tax}:null}const a=`
query STORE_CONFIG_QUERY {
  storeConfig {
    order_cancellation_enabled
    order_cancellation_reasons {
        description
    }
    shopping_cart_display_price
    shopping_cart_display_shipping
    shopping_cart_display_subtotal
    shopping_cart_display_grand_total
    shopping_cart_display_tax_gift_wrapping
    shopping_cart_display_full_summary
    shopping_cart_display_zero_tax
  }
}
`,o=async()=>i(a,{method:"GET",cache:"force-cache"}).then(({errors:p,data:r})=>p?s(p):n(r.storeConfig));export{o as g};
