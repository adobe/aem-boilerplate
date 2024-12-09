/*! Copyright 2024 Adobe
All Rights Reserved. */
import{t as h,k as d,f as A,l as C}from"./removeCustomerAddress.js";import{c as I}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as M}from"@dropins/tools/lib.js";import{ADDRESS_FRAGMENT as N,ORDER_SUMMARY_FRAGMENT as $}from"../fragments.js";const b=(t,e="en-US",a={})=>{const r={...{day:"2-digit",month:"2-digit",year:"numeric"},...a},n=new Date(t);return isNaN(n.getTime())?"Invalid Date":new Intl.DateTimeFormat(e,r).format(n)},G=t=>{var c,_,l,u,f,g,p,R,S,E,s,O;if(!((_=(c=t.data)==null?void 0:c.customer)!=null&&_.orders))return null;const{page_info:e,total_count:a,date_of_first_order:i}=t.data.customer.orders,r=((u=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:u.returns)??[],m={items:(((p=(g=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:g.orders)==null?void 0:p.items)??[]).map(o=>{var T;const D={...o,returns:(T=r==null?void 0:r.items)==null?void 0:T.filter(y=>y.order.id===o.id),order_date:b(o.order_date),shipping_address:h(o.shipping_address),billing_address:h(o.billing_address)};return d(D,"camelCase",{})}),pageInfo:d(e,"camelCase",{}),totalCount:d(a,"camelCase",{}),dateOfFirstOrder:d(i,"camelCase",{})};return M(m,(O=(s=(E=(S=(R=I)==null?void 0:R.getConfig())==null?void 0:S.models)==null?void 0:E.OrderHistoryModel)==null?void 0:s.transformer)==null?void 0:O.call(s,t.data))},F=`
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
  ${N}
  ${$}
`,k={sort_direction:"DESC",sort_field:"CREATED_AT"},z=async(t,e,a)=>{const i=e.includes("viewAll")?{}:{order_date:JSON.parse(e)};return await A(F,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:i,sort:k}}).then(r=>G(r)).catch(C)};export{z as g};
