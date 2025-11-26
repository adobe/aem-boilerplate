/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as b,h as R,a as E}from"./fetch-graphql.js";import{P as y,t as v}from"./rejectPurchaseOrders.js";const q=`
  mutation CANCEL_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    cancelPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${y}
`,M=async c=>{const u=Array.isArray(c)?c:[c];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(n=>!n||n.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return b(q,{variables:{input:{purchase_order_uids:u}}}).then(n=>{var s,_,p;(s=n.errors)!=null&&s.length&&R(n.errors);const o=(_=n.data)==null?void 0:_.cancelPurchaseOrders;if(!o)throw new Error("Failed to cancel purchase orders");return{errors:((o==null?void 0:o.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((p=o==null?void 0:o.purchase_orders)==null?void 0:p.map(l=>v(l)))??[]}}).catch(E)},w=c=>{var h,O;const u=(O=(h=c.data)==null?void 0:h.placeOrderForPurchaseOrder)==null?void 0:O.order,e=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),n=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),o=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:e(r==null?void 0:r.applied_balance),currentBalance:e(r==null?void 0:r.current_balance)}),s=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),_=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),p=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:e(r==null?void 0:r.price),total:e(r==null?void 0:r.total)}),l=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),f=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),P=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),A=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(l),comments:((r==null?void 0:r.comments)||[]).map(f),items:((r==null?void 0:r.items)||[]).map(P)}),S=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),g=r=>({label:(r==null?void 0:r.label)||"",amount:e(r==null?void 0:r.amount)}),D=r=>({baseGrandTotal:e(r==null?void 0:r.base_grand_total),grandTotal:e(r==null?void 0:r.grand_total),subtotal:e(r==null?void 0:r.subtotal),totalTax:e(r==null?void 0:r.total_tax),totalShipping:e(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(g)}),i=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(n),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(o),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?s(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customerInfo:r!=null&&r.customer_info?S(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(p),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(_),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(A),shippingAddress:r!=null&&r.shipping_address?s(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?D(r.total):{baseGrandTotal:e(null),grandTotal:e(null),subtotal:e(null),totalTax:e(null),totalShipping:e(null),discounts:[]}});return i(u||null)},F=`
  mutation PLACE_ORDER_FOR_PURCHASE_ORDER(
    $input: PlaceOrderForPurchaseOrderInput!
  ) {
    placeOrderForPurchaseOrder(input: $input) {
      order {
        available_actions
        carrier
        email
        gift_receipt_included
        id
        is_virtual
        number
        order_date
        order_status_change_date
        printed_card_included
        shipping_method
        status
        token
      }
    }
  }
`,G=async c=>{var e;if(!c||c.trim()==="")throw new Error("Purchase Order UID is required");const u={purchase_order_uid:c};try{const n=await b(F,{variables:{input:u}});return(e=n.errors)!=null&&e.length&&R(n.errors),w(n)}catch(n){throw E(n)}};export{M as c,G as p};
//# sourceMappingURL=placeOrderForPurchaseOrder.js.map
