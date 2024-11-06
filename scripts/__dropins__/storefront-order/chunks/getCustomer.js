import{h}from"./network-error.js";import{f,h as i}from"./fetch-graphql.js";import{a as O}from"./getGuestOrder.graphql.js";import{b as l}from"./transform-order-details.js";const T=t=>{var r,u;if(!((r=t==null?void 0:t.data)!=null&&r.guestOrder))return null;const a=(u=t==null?void 0:t.data)==null?void 0:u.guestOrder;return l(a)},k=t=>{var r,u;if(!((r=t==null?void 0:t.data)!=null&&r.guestOrderByToken))return null;const a=(u=t==null?void 0:t.data)==null?void 0:u.guestOrderByToken;return l(a)},g=t=>{var a,r,u,c,m,d;return{email:((r=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:r.email)||"",firstname:((c=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:c.firstname)||"",lastname:((d=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:d.lastname)||""}},B=async t=>await f(O,{method:"GET",cache:"no-cache",variables:{input:t}}).then(a=>{var r;return(r=a.errors)!=null&&r.length?i(a.errors):T(a)}).catch(h),E=`
  query GET_CUSTOMER {
    customer {
     firstname
     lastname
     email
    }
  }
`,C=async()=>await f(E,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?i(t.errors):g(t)}).catch(h);export{C as a,B as g,k as t};
