/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as s,s as o}from"./chunks/requestNegotiableQuote.js";import{r as F}from"./chunks/requestNegotiableQuote.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";import{events as c}from"@dropins/tools/event-bus.js";import{Initializer as d}from"@dropins/tools/lib.js";const E=`
    fragment CUSTOMER_FRAGMENT on Customer {
        role {
            permissions {
                text
                children {
                    text
                    children {
                        text
                        children {
                            text
                        }
                    }
                }
            }
        }
    }
`,Q=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${E}
`,h="All/Quotes/View/Request, Edit, Delete",p="All/Quotes/View/Request, Edit, Delete",f="All/Quotes/View/Request, Edit, Delete",R=t=>{const e=[],r=(n,m=[])=>{for(const i of n){const a=[...m,i.text];i.children&&i.children.length>0?r(i.children,a):e.push(a.join("/"))}};return r(t),e};function g(t){const{role:e}=t;if(!e)return{permissions:{canRequestQuote:s.requestQuote,canEditQuote:s.editQuote,canDeleteQuote:s.deleteQuote}};const{permissions:r}=e,n=R(r);return{permissions:{canRequestQuote:n.includes(h),canEditQuote:n.includes(p),canDeleteQuote:n.includes(f)}}}const S=async()=>{var t;if(!o.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await T(Q);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return g(e.data.customer)}catch(e){return Promise.reject(e)}},u=new d({init:async t=>{const e={};u.config.setConfig({...e,...t})},listeners:()=>[c.on("authenticated",async t=>{o.authenticated=!!t,t?S().then(e=>{o.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote},c.emit("quote-management/permissions",o.permissions)}).catch(e=>{console.error(e),o.permissions=s,c.emit("quote-management/permissions",s)}):(o.permissions=s,c.emit("quote-management/permissions",s))},{eager:!0})]}),U=u.config,{setEndpoint:N,setFetchGraphQlHeader:O,removeFetchGraphQlHeader:A,setFetchGraphQlHeaders:I,fetchGraphQl:T,getConfig:w}=new l().getMethods();export{U as config,T as fetchGraphQl,w as getConfig,S as getCustomerData,u as initialize,A as removeFetchGraphQlHeader,F as requestNegotiableQuote,N as setEndpoint,O as setFetchGraphQlHeader,I as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
