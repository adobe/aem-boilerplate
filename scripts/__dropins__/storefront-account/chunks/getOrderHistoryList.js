import{t as l,m as i,f as m,h as _,a as p}from"./removeCustomerAddress.js";const f=(t,r="en-US",s={})=>{const e={...{day:"2-digit",month:"2-digit",year:"numeric"},...s},a=new Date(t);return isNaN(a.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,e).format(a)},g=t=>{var d,c;if(!((c=(d=t.data)==null?void 0:d.customer)!=null&&c.orders))return null;const{items:r,page_info:s,total_count:n,date_of_first_order:e}=t.data.customer.orders;return{items:r.map(o=>{const u={...o,order_date:f(o.order_date),shipping_address:l(o.shipping_address),billing_address:l(o.billing_address)};return i(u,"camelCase",{})}),pageInfo:i(s,"camelCase",{}),totalCount:i(n,"camelCase",{}),dateOfFirstOrder:i(e,"camelCase",{})}},y=`
fragment AddressesList on OrderAddress {
  city
  company
  country_code
  fax
  firstname
  lastname
  middlename
  postcode
  prefix
  region
  region_id
  street
  suffix
  telephone
  vat_id
}`,h=`
fragment OrderSummary on OrderTotal {
  __typename
  grand_total {
    value
    currency
  }
  subtotal {
    currency
    value
  }
  taxes {
    amount {
      currency
      value
    }
    rate
    title
  }
  total_tax {
    currency
    value
  }
  total_shipping {
    currency
    value
  }
  discounts {
    amount {
      currency
      value
    }
    label
  }
}`,O=`
  query GET_CUSTOMER_ORDERS_LIST($currentPage: Int, $pageSize: Int, $filter: CustomerOrdersFilterInput, $sort: CustomerOrderSortInput) {
  customer {
    orders(currentPage: $currentPage, pageSize: $pageSize, filter: $filter, sort: $sort) {
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
        ...AddressesList
        }
        billing_address {
        ...AddressesList
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
          small_image {
              url
            }
          }
        }
        total {
        ...OrderSummary
        }
      }
    }
  }
}
${y}
${h}
`,S={sort_direction:"DESC",sort_field:"CREATED_AT"},T=async(t,r,s)=>{const n=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await m(O,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:s,filter:n,sort:S}}).then(e=>{var a;return(a=e.errors)!=null&&a.length?_(e.errors):g(e)}).catch(p)};export{T as g};
