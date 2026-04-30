/*! Copyright 2026 Adobe
All Rights Reserved. */
import{t as H,f as j,a as Y}from"./removeCustomerAddress.js";import{c as J}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as K}from"@dropins/tools/lib.js";import{CUSTOMER_ORDER_FRAGMENT as Q,ADDRESS_FRAGMENT as Z,ORDER_SUMMARY_FRAGMENT as B}from"../fragments.js";const V=(a,t="en-US",c={})=>{const s={day:"2-digit",month:"2-digit",year:"numeric"},d=/^\d{4}-\d{2}-\d{2}$/.test(a.trim()),u={...s,...d?{timeZone:"UTC"}:{},...c},_=new Date(a);return isNaN(_.getTime())?"Invalid Date":new Intl.DateTimeFormat(t,u).format(_)},W=(a,t="en-US",c={})=>{const d={...{hour:"2-digit",minute:"2-digit"},...c},u=new Date(a);return isNaN(u.getTime())?"Invalid Time":new Intl.DateTimeFormat(t,d).format(u)},g={value:0,currency:"USD"},X=a=>{var t,c,s,d,u,_,f,l,n,T;return{subtotal:((t=a==null?void 0:a.total)==null?void 0:t.subtotal)??g,grandTotal:((c=a==null?void 0:a.total)==null?void 0:c.grand_total)??g,grandTotalExclTax:((s=a==null?void 0:a.total)==null?void 0:s.grand_total_excl_tax)??g,totalGiftcard:((d=a==null?void 0:a.total)==null?void 0:d.total_giftcard)??g,subtotalExclTax:((u=a==null?void 0:a.total)==null?void 0:u.subtotal_excl_tax)??g,subtotalInclTax:((_=a==null?void 0:a.total)==null?void 0:_.subtotal_incl_tax)??g,taxes:((f=a==null?void 0:a.total)==null?void 0:f.taxes)??[],totalTax:((l=a==null?void 0:a.total)==null?void 0:l.total_tax)??g,totalShipping:((n=a==null?void 0:a.total)==null?void 0:n.total_shipping)??g,discounts:((T=a==null?void 0:a.total)==null?void 0:T.discounts)??[]}},m=a=>{var d,u,_,f,l,n,T,R,S,E,O,p,h,D,y,M,A,I,b,x,N,C,G,$,F,U,k,v,i,q;if(!((u=(d=a.data)==null?void 0:d.customer)!=null&&u.orders))return null;const t=((f=(_=a==null?void 0:a.data)==null?void 0:_.customer)==null?void 0:f.returns)??[],s={items:(((T=(n=(l=a==null?void 0:a.data)==null?void 0:l.customer)==null?void 0:n.orders)==null?void 0:T.items)??[]).map(r=>{var w;return{items:r==null?void 0:r.items.map(o=>{var L,z,P;return{status:(o==null?void 0:o.status)??"",productName:(o==null?void 0:o.product_name)??"",id:o==null?void 0:o.id,quantityOrdered:(o==null?void 0:o.quantity_ordered)??0,quantityShipped:(o==null?void 0:o.quantity_shipped)??0,quantityInvoiced:(o==null?void 0:o.quantity_invoiced)??0,sku:(o==null?void 0:o.product_sku)??"",urlKey:(o==null?void 0:o.product_url_key)??"",topLevelSku:((L=o==null?void 0:o.product)==null?void 0:L.sku)??"",product:{smallImage:{url:((P=(z=o==null?void 0:o.product)==null?void 0:z.small_image)==null?void 0:P.url)??""}}}}),token:r==null?void 0:r.token,email:r==null?void 0:r.email,shippingMethod:r==null?void 0:r.shipping_method,paymentMethods:(r==null?void 0:r.payment_methods)??[],shipments:(r==null?void 0:r.shipments)??[],id:r==null?void 0:r.id,carrier:r==null?void 0:r.carrier,status:r==null?void 0:r.status,number:r==null?void 0:r.number,returns:(w=t==null?void 0:t.items)==null?void 0:w.filter(o=>o.order.id===r.id),orderDate:V(r.order_date),orderTime:W(r.order_date),shippingAddress:H(r.shipping_address),billingAddress:H(r.billing_address),total:X(r)}}),pageInfo:{pageSize:((O=(E=(S=(R=a==null?void 0:a.data)==null?void 0:R.customer)==null?void 0:S.orders)==null?void 0:E.page_info)==null?void 0:O.page_size)??10,totalPages:((y=(D=(h=(p=a==null?void 0:a.data)==null?void 0:p.customer)==null?void 0:h.orders)==null?void 0:D.page_info)==null?void 0:y.total_pages)??1,currentPage:((b=(I=(A=(M=a==null?void 0:a.data)==null?void 0:M.customer)==null?void 0:A.orders)==null?void 0:I.page_info)==null?void 0:b.current_page)??1},totalCount:((C=(N=(x=a==null?void 0:a.data)==null?void 0:x.customer)==null?void 0:N.orders)==null?void 0:C.total_count)??0,dateOfFirstOrder:((F=($=(G=a==null?void 0:a.data)==null?void 0:G.customer)==null?void 0:$.orders)==null?void 0:F.date_of_first_order)??""};return K(s,(q=(i=(v=(k=(U=J)==null?void 0:U.getConfig())==null?void 0:k.models)==null?void 0:v.OrderHistoryModel)==null?void 0:i.transformer)==null?void 0:q.call(i,a.data))},e=`
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order {
            id
          }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          ...CUSTOMER_ORDER_FRAGMENT
          shipping_address {
            ...ADDRESS_FRAGMENT
          }
          billing_address {
            ...ADDRESS_FRAGMENT
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
  ${Q}
  ${Z}
  ${B}
`,aa={sort_direction:"DESC",sort_field:"CREATED_AT"},ca=async(a,t,c)=>{const s=t.includes("viewAll")?{}:{order_date:JSON.parse(t)};return await j(e,{method:"GET",cache:"no-cache",variables:{pageSize:a,currentPage:c,filter:s,sort:aa}}).then(d=>m(d)).catch(Y)};export{ca as g};
//# sourceMappingURL=getOrderHistoryList.js.map
