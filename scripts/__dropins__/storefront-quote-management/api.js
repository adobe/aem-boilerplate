/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as i,s as n,t as h}from"./chunks/transform-quote.js";import{FetchGraphQL as _,fetchGraphQl as q}from"@dropins/tools/fetch-graphql.js";import{events as s}from"@dropins/tools/event-bus.js";import{r as K}from"./chunks/requestNegotiableQuote.js";import{N as p}from"./chunks/NegotiableQuoteFragment.js";import{F as W,N as X,S as Z,n as ee}from"./chunks/negotiableQuotes.js";import{s as oe}from"./chunks/sendForReview.js";import{Initializer as I}from"@dropins/tools/lib.js";const T=`
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
`,S=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${T}
`,A="All/Quotes/View/Request, Edit, Delete",N="All/Quotes/View/Request, Edit, Delete",U="All/Quotes/View/Request, Edit, Delete",R="All/Quotes/View/Checkout with quote",w=o=>{const e=[],t=(r,u=[])=>{for(const a of r){const d=[...u,a.text];a.children&&a.children.length>0?t(a.children,d):e.push(d.join("/"))}};return t(o),e};function D(o){const{role:e}=o;if(!e)return{permissions:{canRequestQuote:i.requestQuote,canEditQuote:i.editQuote,canDeleteQuote:i.deleteQuote,canCheckoutQuote:i.checkoutQuote}};const{permissions:t}=e,r=w(t);return{permissions:{canRequestQuote:r.includes(A),canEditQuote:r.includes(N),canDeleteQuote:r.includes(U),canCheckoutQuote:r.includes(R)}}}const C=async()=>{var o;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await Q(S);if(!((o=e==null?void 0:e.data)!=null&&o.customer))throw new Error("No customer data received");return D(e.data.customer)}catch(e){return Promise.reject(e)}},O=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${p}
`,F=async o=>{var e;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));if(!n.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const t=await Q(O,{variables:{quoteId:o}}),r=h((e=t==null?void 0:t.data)==null?void 0:e.negotiableQuote);if(!r)throw new Error("Failed to transform quote data");return s.emit("quote-management/quote-data",{quote:r,permissions:n.permissions}),r}catch(t){return Promise.reject(t)}},m=new I({init:async o=>{const e={};m.config.setConfig({...e,...o})},listeners:()=>[s.on("authenticated",async o=>{n.authenticated=!!o,o?C().then(e=>{n.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},s.emit("quote-management/permissions",n.permissions)}).catch(e=>{console.error(e),n.permissions=i,s.emit("quote-management/permissions",i)}):(n.permissions=i,s.emit("quote-management/permissions",i))},{eager:!0}),s.on("quote-management/permissions",async o=>{const e=m.config.getConfig().quoteId;e&&o.editQuote&&F(e).then(t=>{s.emit("quote-management/quote-data/initialized",{quote:t,permissions:o},{})}).catch(t=>{s.emit("quote-management/quote-data/error",{error:t})})},{eager:!0})]}),k=m.config,{setEndpoint:x,setFetchGraphQlHeader:j,removeFetchGraphQlHeader:z,setFetchGraphQlHeaders:H,fetchGraphQl:Q,getConfig:L}=new _().getMethods(),M=`
  mutation SET_NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_MUTATION(
    $quoteUid: ID!
    $addressId: ID
    $addressData: NegotiableQuoteAddressInput
  ) {
    setNegotiableQuoteShippingAddress(
      input: {
        quote_uid: $quoteUid
        shipping_addresses: {
          customer_address_uid: $addressId
          address: $addressData
        }
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${p}
`;function y(o){const{additionalInput:e,...t}=o,r={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...e||{},...r}}const B=async o=>{const{quoteUid:e,addressId:t,addressData:r}=o;if(!e)throw new Error("Quote UID is required");if(!t&&!r)throw new Error("Either addressId or addressData must be provided");if(t&&r)throw new Error("Cannot provide both addressId and addressData");const u=r?y(r):null;return q(M,{variables:{quoteUid:e,addressId:t||null,addressData:u}}).then(a=>{var l,E;const{errors:d}=a;if(d){const f=d.map(g=>g.message).join("; ");throw new Error(`Failed to set shipping address: ${f}`)}const c=h((E=(l=a.data)==null?void 0:l.setNegotiableQuoteShippingAddress)==null?void 0:E.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return s.emit("quote-management/shipping-address-set",{quote:c,input:{quoteUid:e,addressId:t,addressData:r}}),c})};export{W as FilterMatchTypeEnum,X as NegotiableQuoteSortableField,Z as SortEnum,k as config,Q as fetchGraphQl,L as getConfig,C as getCustomerData,F as getQuoteData,m as initialize,ee as negotiableQuotes,z as removeFetchGraphQlHeader,K as requestNegotiableQuote,oe as sendForReview,x as setEndpoint,j as setFetchGraphQlHeader,H as setFetchGraphQlHeaders,B as setShippingAddress};
//# sourceMappingURL=api.js.map
