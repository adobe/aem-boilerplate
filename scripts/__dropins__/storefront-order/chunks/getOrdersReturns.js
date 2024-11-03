import{h}from"./network-error.js";import{f as N,h as _}from"./fetch-graphql.js";import{R as d,t as i}from"./getCustomerOrdersReturn.graphql.js";const O=`
query ORDER_RETURNS_BY_NUMBER($orderNumber: String!) {
 customer {
    orders(
      filter: { number: { eq: $orderNumber } }
    ) {
      items {
        returns {
        ...OrderReturns
        }
      }
    }
  }
}
${d}
`,T=`
query ORDER_RETURNS_BY_TOKEN($token: String!) {
 guestOrderByToken(input: { token: $token }) {
        returns {
        ...OrderReturns
      }
    }
  }
}
${d}
`,S=async(e,o)=>await N(e?O:T,{method:"GET",cache:"no-cache",variables:e?{orderNumber:o}:{token:o}}).then(t=>{var u,R,c,m,E,a;if((u=t.errors)!=null&&u.length)return _(t.errors);const{data:r}=t,n=(m=(c=(R=r==null?void 0:r.customer)==null?void 0:R.orders)==null?void 0:c.items[0])==null?void 0:m.returns,s=(E=r==null?void 0:r.guestOrderByToken)==null?void 0:E.returns;return!n&&!s?[]:((a=i({data:{customer:{returns:e?n:s}}}))==null?void 0:a.ordersReturn)??[]}).catch(h);export{S as g};
