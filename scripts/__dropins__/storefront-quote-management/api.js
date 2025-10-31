/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as i,s as n,f as l,t as Q}from"./chunks/fetch-graphql.js";import{e as j,r as z,b as H,c as L,d as B}from"./chunks/fetch-graphql.js";import{events as r}from"@dropins/tools/event-bus.js";import{r as Y,u as K}from"./chunks/uploadFile.js";import{N as h}from"./chunks/NegotiableQuoteFragment.js";import{F as W,N as X,S as Z,n as ee}from"./chunks/negotiableQuotes.js";import{s as oe}from"./chunks/sendForReview.js";import{Initializer as _}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const q=`
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
`,I=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${q}
`,T="All/Quotes/View/Request, Edit, Delete",S="All/Quotes/View/Request, Edit, Delete",A="All/Quotes/View/Request, Edit, Delete",N="All/Quotes/View/Checkout with quote",U=o=>{const e=[],t=(s,u=[])=>{for(const a of s){const d=[...u,a.text];a.children&&a.children.length>0?t(a.children,d):e.push(d.join("/"))}};return t(o),e};function R(o){const{role:e}=o;if(!e)return{permissions:{canRequestQuote:i.requestQuote,canEditQuote:i.editQuote,canDeleteQuote:i.deleteQuote,canCheckoutQuote:i.checkoutQuote}};const{permissions:t}=e,s=U(t);return{permissions:{canRequestQuote:s.includes(T),canEditQuote:s.includes(S),canDeleteQuote:s.includes(A),canCheckoutQuote:s.includes(N)}}}const D=async()=>{var o;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await l(I);if(!((o=e==null?void 0:e.data)!=null&&o.customer))throw new Error("No customer data received");return R(e.data.customer)}catch(e){return Promise.reject(e)}},w=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${h}
`,C=async o=>{var e;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));if(!n.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const t=await l(w,{variables:{quoteId:o}}),s=Q((e=t==null?void 0:t.data)==null?void 0:e.negotiableQuote);if(!s)throw new Error("Failed to transform quote data");return r.emit("quote-management/quote-data",{quote:s,permissions:n.permissions}),s}catch(t){return Promise.reject(t)}},m=new _({init:async o=>{const e={};m.config.setConfig({...e,...o})},listeners:()=>[r.on("authenticated",async o=>{n.authenticated=!!o,o?D().then(e=>{n.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},r.emit("quote-management/permissions",n.permissions)}).catch(e=>{console.error(e),n.permissions=i,r.emit("quote-management/permissions",i)}):(n.permissions=i,r.emit("quote-management/permissions",i))},{eager:!0}),r.on("quote-management/permissions",async o=>{const e=m.config.getConfig().quoteId;e&&o.editQuote&&C(e).then(t=>{r.emit("quote-management/quote-data/initialized",{quote:t,permissions:o},{})}).catch(t=>{r.emit("quote-management/quote-data/error",{error:t})})},{eager:!0})]}),G=m.config,O=`
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
  ${h}
`;function F(o){const{additionalInput:e,...t}=o,s={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...e||{},...s}}const $=async o=>{const{quoteUid:e,addressId:t,addressData:s}=o;if(!e)throw new Error("Quote UID is required");if(t===void 0&&!s)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&s)throw new Error("Cannot provide both addressId and addressData");const u=s?F(s):null;return l(O,{variables:{quoteUid:e,addressId:t||null,addressData:u}}).then(a=>{var E,p;const{errors:d}=a;if(d){const f=d.map(g=>g.message).join("; ");throw new Error(`Failed to set shipping address: ${f}`)}const c=Q((p=(E=a.data)==null?void 0:E.setNegotiableQuoteShippingAddress)==null?void 0:p.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return r.emit("quote-management/shipping-address-set",{quote:c,input:{quoteUid:e,addressId:t,addressData:s}}),c})};export{W as FilterMatchTypeEnum,X as NegotiableQuoteSortableField,Z as SortEnum,G as config,l as fetchGraphQl,j as getConfig,D as getCustomerData,C as getQuoteData,m as initialize,ee as negotiableQuotes,z as removeFetchGraphQlHeader,Y as requestNegotiableQuote,oe as sendForReview,H as setEndpoint,L as setFetchGraphQlHeader,B as setFetchGraphQlHeaders,$ as setShippingAddress,K as uploadFile};
//# sourceMappingURL=api.js.map
