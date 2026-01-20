/*! Copyright 2026 Adobe
All Rights Reserved. */
import{t as H,f as Y,a as j}from"./removeCustomerAddress.js";import{c as J}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as K}from"@dropins/tools/lib.js";import{ADDRESS_FRAGMENT as Q,ORDER_SUMMARY_FRAGMENT as B}from"../fragments.js";const V=(a,t="en-US",s={})=>{const d={...{day:"2-digit",month:"2-digit",year:"numeric"},...s},u=new Date(a);return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(t,d).format(u)},c={value:0,currency:"USD"},W=a=>{var t,s,_,d,u,g,l,f,p,n;return{subtotal:((t=a==null?void 0:a.total)==null?void 0:t.subtotal)??c,grandTotal:((s=a==null?void 0:a.total)==null?void 0:s.grand_total)??c,grandTotalExclTax:((_=a==null?void 0:a.total)==null?void 0:_.grand_total_excl_tax)??c,totalGiftcard:((d=a==null?void 0:a.total)==null?void 0:d.total_giftcard)??c,subtotalExclTax:((u=a==null?void 0:a.total)==null?void 0:u.subtotal_excl_tax)??c,subtotalInclTax:((g=a==null?void 0:a.total)==null?void 0:g.subtotal_incl_tax)??c,taxes:((l=a==null?void 0:a.total)==null?void 0:l.taxes)??[],totalTax:((f=a==null?void 0:a.total)==null?void 0:f.total_tax)??c,totalShipping:((p=a==null?void 0:a.total)==null?void 0:p.total_shipping)??c,discounts:((n=a==null?void 0:a.total)==null?void 0:n.discounts)??[]}},X=a=>{var d,u,g,l,f,p,n,h,S,y,T,E,R,O,D,b,A,x,M,I,k,N,q,G,$,C,v,F,i,z;if(!((u=(d=a.data)==null?void 0:d.customer)!=null&&u.orders))return null;const t=((l=(g=a==null?void 0:a.data)==null?void 0:g.customer)==null?void 0:l.returns)??[],_={items:(((n=(p=(f=a==null?void 0:a.data)==null?void 0:f.customer)==null?void 0:p.orders)==null?void 0:n.items)??[]).map(r=>{var L;return{items:r==null?void 0:r.items.map(o=>{var P,U,w;return{status:(o==null?void 0:o.status)??"",productName:(o==null?void 0:o.product_name)??"",id:o==null?void 0:o.id,quantityOrdered:(o==null?void 0:o.quantity_ordered)??0,quantityShipped:(o==null?void 0:o.quantity_shipped)??0,quantityInvoiced:(o==null?void 0:o.quantity_invoiced)??0,sku:(o==null?void 0:o.product_sku)??"",urlKey:(o==null?void 0:o.product_url_key)??"",topLevelSku:((P=o==null?void 0:o.product)==null?void 0:P.sku)??"",product:{smallImage:{url:((w=(U=o==null?void 0:o.product)==null?void 0:U.small_image)==null?void 0:w.url)??""}}}}),token:r==null?void 0:r.token,email:r==null?void 0:r.email,shippingMethod:r==null?void 0:r.shipping_method,paymentMethods:(r==null?void 0:r.payment_methods)??[],shipments:(r==null?void 0:r.shipments)??[],id:r==null?void 0:r.id,carrier:r==null?void 0:r.carrier,status:r==null?void 0:r.status,number:r==null?void 0:r.number,returns:(L=t==null?void 0:t.items)==null?void 0:L.filter(o=>o.order.id===r.id),orderDate:V(r.order_date),shippingAddress:H(r.shipping_address),billingAddress:H(r.billing_address),total:W(r)}}),pageInfo:{pageSize:((T=(y=(S=(h=a==null?void 0:a.data)==null?void 0:h.customer)==null?void 0:S.orders)==null?void 0:y.page_info)==null?void 0:T.page_size)??10,totalPages:((D=(O=(R=(E=a==null?void 0:a.data)==null?void 0:E.customer)==null?void 0:R.orders)==null?void 0:O.page_info)==null?void 0:D.total_pages)??1,currentPage:((M=(x=(A=(b=a==null?void 0:a.data)==null?void 0:b.customer)==null?void 0:A.orders)==null?void 0:x.page_info)==null?void 0:M.current_page)??1},totalCount:((N=(k=(I=a==null?void 0:a.data)==null?void 0:I.customer)==null?void 0:k.orders)==null?void 0:N.total_count)??0,dateOfFirstOrder:(($=(G=(q=a==null?void 0:a.data)==null?void 0:q.customer)==null?void 0:G.orders)==null?void 0:$.date_of_first_order)??""};return K(_,(z=(i=(F=(v=(C=J)==null?void 0:C.getConfig())==null?void 0:v.models)==null?void 0:F.OrderHistoryModel)==null?void 0:i.transformer)==null?void 0:z.call(i,a.data))},Z=`
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
            product_sku
            product_url_key
            product {
              sku
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
  ${Q}
  ${B}
`,m={sort_direction:"DESC",sort_field:"CREATED_AT"},da=async(a,t,s)=>{const _=t.includes("viewAll")?{}:{order_date:JSON.parse(t)};return await Y(Z,{method:"GET",cache:"no-cache",variables:{pageSize:a,currentPage:s,filter:_,sort:m}}).then(d=>X(d)).catch(j)};export{da as g};
//# sourceMappingURL=getOrderHistoryList.js.map
