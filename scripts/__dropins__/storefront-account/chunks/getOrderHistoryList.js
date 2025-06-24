/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as H,f as Y,a as j}from"./removeCustomerAddress.js";import{c as J}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as K}from"@dropins/tools/lib.js";import{ADDRESS_FRAGMENT as Q,ORDER_SUMMARY_FRAGMENT as B}from"../fragments.js";const V=(a,o="en-US",s={})=>{const d={...{day:"2-digit",month:"2-digit",year:"numeric"},...s},u=new Date(a);return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(o,d).format(u)},_={value:0,currency:"USD"},W=a=>{var o,s,c,d,u,g,f,n,l;return{subtotal:((o=a==null?void 0:a.total)==null?void 0:o.subtotal)??_,grandTotal:((s=a==null?void 0:a.total)==null?void 0:s.grand_total)??_,totalGiftcard:((c=a==null?void 0:a.total)==null?void 0:c.total_giftcard)??_,subtotalExclTax:((d=a==null?void 0:a.total)==null?void 0:d.subtotal_excl_tax)??_,subtotalInclTax:((u=a==null?void 0:a.total)==null?void 0:u.subtotal_incl_tax)??_,taxes:((g=a==null?void 0:a.total)==null?void 0:g.taxes)??[],totalTax:((f=a==null?void 0:a.total)==null?void 0:f.total_tax)??_,totalShipping:((n=a==null?void 0:a.total)==null?void 0:n.total_shipping)??_,discounts:((l=a==null?void 0:a.total)==null?void 0:l.discounts)??[]}},X=a=>{var d,u,g,f,n,l,p,h,S,y,T,E,R,O,D,b,A,I,M,x,N,k,q,G,$,C,F,v,i,z;if(!((u=(d=a.data)==null?void 0:d.customer)!=null&&u.orders))return null;const o=((f=(g=a==null?void 0:a.data)==null?void 0:g.customer)==null?void 0:f.returns)??[],c={items:(((p=(l=(n=a==null?void 0:a.data)==null?void 0:n.customer)==null?void 0:l.orders)==null?void 0:p.items)??[]).map(r=>{var P;return{items:r==null?void 0:r.items.map(t=>{var U,w,L;return{status:(t==null?void 0:t.status)??"",productName:(t==null?void 0:t.product_name)??"",id:t==null?void 0:t.id,quantityOrdered:(t==null?void 0:t.quantity_ordered)??0,quantityShipped:(t==null?void 0:t.quantity_shipped)??0,quantityInvoiced:(t==null?void 0:t.quantity_invoiced)??0,product:{sku:((U=t==null?void 0:t.product)==null?void 0:U.sku)??"",urlKey:(t==null?void 0:t.product.url_key)??"",smallImage:{url:((L=(w=t==null?void 0:t.product)==null?void 0:w.small_image)==null?void 0:L.url)??""}}}}),token:r==null?void 0:r.token,email:r==null?void 0:r.email,shippingMethod:r==null?void 0:r.shipping_method,paymentMethods:(r==null?void 0:r.payment_methods)??[],shipments:(r==null?void 0:r.shipments)??[],id:r==null?void 0:r.id,carrier:r==null?void 0:r.carrier,status:r==null?void 0:r.status,number:r==null?void 0:r.number,returns:(P=o==null?void 0:o.items)==null?void 0:P.filter(t=>t.order.id===r.id),orderDate:V(r.order_date),shippingAddress:H(r.shipping_address),billingAddress:H(r.billing_address),total:W(r)}}),pageInfo:{pageSize:((T=(y=(S=(h=a==null?void 0:a.data)==null?void 0:h.customer)==null?void 0:S.orders)==null?void 0:y.page_info)==null?void 0:T.page_size)??10,totalPages:((D=(O=(R=(E=a==null?void 0:a.data)==null?void 0:E.customer)==null?void 0:R.orders)==null?void 0:O.page_info)==null?void 0:D.total_pages)??1,currentPage:((M=(I=(A=(b=a==null?void 0:a.data)==null?void 0:b.customer)==null?void 0:A.orders)==null?void 0:I.page_info)==null?void 0:M.current_page)??1},totalCount:((k=(N=(x=a==null?void 0:a.data)==null?void 0:x.customer)==null?void 0:N.orders)==null?void 0:k.total_count)??0,dateOfFirstOrder:(($=(G=(q=a==null?void 0:a.data)==null?void 0:q.customer)==null?void 0:G.orders)==null?void 0:$.date_of_first_order)??""};return K(c,(z=(i=(v=(F=(C=J)==null?void 0:C.getConfig())==null?void 0:F.models)==null?void 0:v.OrderHistoryModel)==null?void 0:i.transformer)==null?void 0:z.call(i,a.data))},Z=`
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
  ${Q}
  ${B}
`,m={sort_direction:"DESC",sort_field:"CREATED_AT"},ua=async(a,o,s)=>{const c=o.includes("viewAll")?{}:{order_date:JSON.parse(o)};return await Y(Z,{method:"GET",cache:"no-cache",variables:{pageSize:a,currentPage:s,filter:c,sort:m}}).then(d=>X(d)).catch(j)};export{ua as g};
