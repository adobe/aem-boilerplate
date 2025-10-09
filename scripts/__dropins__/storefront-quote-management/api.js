/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as i,s as r,N as l,t as Q}from"./chunks/requestNegotiableQuote.js";import{r as z}from"./chunks/requestNegotiableQuote.js";import{FetchGraphQL as E}from"@dropins/tools/fetch-graphql.js";import{events as s}from"@dropins/tools/event-bus.js";import{Initializer as h}from"@dropins/tools/lib.js";const f=`
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
`,p=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${f}
`,g="All/Quotes/View/Request, Edit, Delete",q="All/Quotes/View/Request, Edit, Delete",R="All/Quotes/View/Request, Edit, Delete",T="All/Quotes/View/Checkout with quote",_=t=>{const e=[],o=(n,d=[])=>{for(const a of n){const c=[...d,a.text];a.children&&a.children.length>0?o(a.children,c):e.push(c.join("/"))}};return o(t),e};function U(t){const{role:e}=t;if(!e)return{permissions:{canRequestQuote:i.requestQuote,canEditQuote:i.editQuote,canDeleteQuote:i.deleteQuote}};const{permissions:o}=e,n=_(o);return{permissions:{canRequestQuote:n.includes(g),canEditQuote:n.includes(q),canDeleteQuote:n.includes(R),canCheckoutQuote:n.includes(T)}}}const C=async()=>{var t;if(!r.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await m(p);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return U(e.data.customer)}catch(e){return Promise.reject(e)}},O=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${l}
`,A=async t=>{var e;if(!r.authenticated)return Promise.reject(new Error("Unauthorized"));if(!r.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await m(O,{variables:{quoteId:t}}),n=Q((e=o==null?void 0:o.data)==null?void 0:e.negotiableQuote);if(!n)throw new Error("Failed to transform quote data");return s.emit("quote-management/quote-data",{quote:n,permissions:r.permissions}),n}catch(o){return Promise.reject(o)}},u=new h({init:async t=>{const e={};u.config.setConfig({...e,...t})},listeners:()=>[s.on("authenticated",async t=>{r.authenticated=!!t,t?C().then(e=>{r.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},s.emit("quote-management/permissions",r.permissions)}).catch(e=>{console.error(e),r.permissions=i,s.emit("quote-management/permissions",i)}):(r.permissions=i,s.emit("quote-management/permissions",i))},{eager:!0}),s.on("quote-management/permissions",async t=>{const e=u.config.getConfig().quoteId;e&&t.editQuote&&A(e).then(o=>{s.emit("quote-management/quote-data/initialized",{quote:o,permissions:t},{})}).catch(o=>{s.emit("quote-management/quote-data/error",{error:o})})},{eager:!0})]}),M=u.config,{setEndpoint:P,setFetchGraphQlHeader:D,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:G,fetchGraphQl:m,getConfig:y}=new E().getMethods();export{M as config,m as fetchGraphQl,y as getConfig,C as getCustomerData,A as getQuoteData,u as initialize,F as removeFetchGraphQlHeader,z as requestNegotiableQuote,P as setEndpoint,D as setFetchGraphQlHeader,G as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
