/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as L,f as H,a as Y}from"./removeCustomerAddress.js";import{c as j}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as J}from"@dropins/tools/lib.js";import{ADDRESS_FRAGMENT as K,ORDER_SUMMARY_FRAGMENT as Q}from"../fragments.js";const B=(a,o="en-US",c={})=>{const d={...{day:"2-digit",month:"2-digit",year:"numeric"},...c},u=new Date(a);return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(o,d).format(u)},s={value:0,currency:"USD"},V=a=>{var o,c,_,d,u,g,l,f,n,i;return{subtotal:((o=a==null?void 0:a.total)==null?void 0:o.subtotal)??s,grandTotal:((c=a==null?void 0:a.total)==null?void 0:c.grand_total)??s,grandTotalExclTax:((_=a==null?void 0:a.total)==null?void 0:_.grand_total_excl_tax)??s,totalGiftcard:((d=a==null?void 0:a.total)==null?void 0:d.total_giftcard)??s,subtotalExclTax:((u=a==null?void 0:a.total)==null?void 0:u.subtotal_excl_tax)??s,subtotalInclTax:((g=a==null?void 0:a.total)==null?void 0:g.subtotal_incl_tax)??s,taxes:((l=a==null?void 0:a.total)==null?void 0:l.taxes)??[],totalTax:((f=a==null?void 0:a.total)==null?void 0:f.total_tax)??s,totalShipping:((n=a==null?void 0:a.total)==null?void 0:n.total_shipping)??s,discounts:((i=a==null?void 0:a.total)==null?void 0:i.discounts)??[]}},W=a=>{var d,u,g,l,f,n,i,h,S,y,T,E,R,O,D,b,A,x,M,I,N,k,q,G,$,C,F,v,p,z;if(!((u=(d=a.data)==null?void 0:d.customer)!=null&&u.orders))return null;const o=((l=(g=a==null?void 0:a.data)==null?void 0:g.customer)==null?void 0:l.returns)??[],_={items:(((i=(n=(f=a==null?void 0:a.data)==null?void 0:f.customer)==null?void 0:n.orders)==null?void 0:i.items)??[]).map(r=>{var P;return{items:r==null?void 0:r.items.map(t=>{var U,w;return{status:(t==null?void 0:t.status)??"",productName:(t==null?void 0:t.product_name)??"",id:t==null?void 0:t.id,quantityOrdered:(t==null?void 0:t.quantity_ordered)??0,quantityShipped:(t==null?void 0:t.quantity_shipped)??0,quantityInvoiced:(t==null?void 0:t.quantity_invoiced)??0,sku:(t==null?void 0:t.sku)??"",urlKey:(t==null?void 0:t.url_key)??"",product:{smallImage:{url:((w=(U=t==null?void 0:t.product)==null?void 0:U.small_image)==null?void 0:w.url)??""}}}}),token:r==null?void 0:r.token,email:r==null?void 0:r.email,shippingMethod:r==null?void 0:r.shipping_method,paymentMethods:(r==null?void 0:r.payment_methods)??[],shipments:(r==null?void 0:r.shipments)??[],id:r==null?void 0:r.id,carrier:r==null?void 0:r.carrier,status:r==null?void 0:r.status,number:r==null?void 0:r.number,returns:(P=o==null?void 0:o.items)==null?void 0:P.filter(t=>t.order.id===r.id),orderDate:B(r.order_date),shippingAddress:L(r.shipping_address),billingAddress:L(r.billing_address),total:V(r)}}),pageInfo:{pageSize:((T=(y=(S=(h=a==null?void 0:a.data)==null?void 0:h.customer)==null?void 0:S.orders)==null?void 0:y.page_info)==null?void 0:T.page_size)??10,totalPages:((D=(O=(R=(E=a==null?void 0:a.data)==null?void 0:E.customer)==null?void 0:R.orders)==null?void 0:O.page_info)==null?void 0:D.total_pages)??1,currentPage:((M=(x=(A=(b=a==null?void 0:a.data)==null?void 0:b.customer)==null?void 0:A.orders)==null?void 0:x.page_info)==null?void 0:M.current_page)??1},totalCount:((k=(N=(I=a==null?void 0:a.data)==null?void 0:I.customer)==null?void 0:N.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:(($=(G=(q=a==null?void 0:a.data)==null?void 0:q.customer)==null?void 0:G.orders)==null?void 0:$.date_of_first_order)??""};return J(_,(z=(p=(v=(F=(C=j)==null?void 0:C.getConfig())==null?void 0:F.models)==null?void 0:v.OrderHistoryModel)==null?void 0:p.transformer)==null?void 0:z.call(p,a.data))},X=`
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
          token
          email
          shipping_method
          payment_methods {
            name
            type
          }
          shipping_address {
            ...ADDRESS_FRAGMENT
          }
          billing_address {
            ...ADDRESS_FRAGMENT
          }
          shipments {
            id
            number
            tracking {
              title
              number
              carrier
            }
          }
          number
          id
          order_date
          carrier
          status
          items {
            status
            product_name
            id
            quantity_ordered
            quantity_shipped
            quantity_invoiced
            product {
              sku
              url_key
              small_image {
                url
              }
            }
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
  ${K}
  ${Q}
`,Z={sort_direction:"DESC",sort_field:"CREATED_AT"},oa=async(a,o,c)=>{const _=o.includes("viewAll")?{}:{order_date:JSON.parse(o)};return await H(X,{method:"GET",cache:"no-cache",variables:{pageSize:a,currentPage:c,filter:_,sort:Z}}).then(d=>W(d)).catch(Y)};export{oa as g};
//# sourceMappingURL=getOrderHistoryList.js.map
