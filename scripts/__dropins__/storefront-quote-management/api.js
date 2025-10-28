/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as a,s as n,t as p}from"./chunks/transform-quote.js";import{fetchGraphQl as _}from"@dropins/tools/fetch-graphql.js";import{events as r}from"@dropins/tools/event-bus.js";import{f as Q}from"./chunks/uploadFile.js";import{g as H,b as L,r as B,s as V,a as Y,c as K,u as J}from"./chunks/uploadFile.js";import{N as h}from"./chunks/NegotiableQuoteFragment.js";import{F as X,N as Z,S as ee,n as te}from"./chunks/negotiableQuotes.js";import{s as se}from"./chunks/sendForReview.js";import{Initializer as q}from"@dropins/tools/lib.js";const I=`
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
`,T=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${I}
`,S="All/Quotes/View/Request, Edit, Delete",A="All/Quotes/View/Request, Edit, Delete",N="All/Quotes/View/Request, Edit, Delete",U="All/Quotes/View/Checkout with quote",R=o=>{const e=[],t=(s,u=[])=>{for(const i of s){const d=[...u,i.text];i.children&&i.children.length>0?t(i.children,d):e.push(d.join("/"))}};return t(o),e};function D(o){const{role:e}=o;if(!e)return{permissions:{canRequestQuote:a.requestQuote,canEditQuote:a.editQuote,canDeleteQuote:a.deleteQuote,canCheckoutQuote:a.checkoutQuote}};const{permissions:t}=e,s=R(t);return{permissions:{canRequestQuote:s.includes(S),canEditQuote:s.includes(A),canDeleteQuote:s.includes(N),canCheckoutQuote:s.includes(U)}}}const w=async()=>{var o;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await Q(T);if(!((o=e==null?void 0:e.data)!=null&&o.customer))throw new Error("No customer data received");return D(e.data.customer)}catch(e){return Promise.reject(e)}},C=`
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
`,O=async o=>{var e;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));if(!n.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const t=await Q(C,{variables:{quoteId:o}}),s=p((e=t==null?void 0:t.data)==null?void 0:e.negotiableQuote);if(!s)throw new Error("Failed to transform quote data");return r.emit("quote-management/quote-data",{quote:s,permissions:n.permissions}),s}catch(t){return Promise.reject(t)}},m=new q({init:async o=>{const e={};m.config.setConfig({...e,...o})},listeners:()=>[r.on("authenticated",async o=>{n.authenticated=!!o,o?w().then(e=>{n.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},r.emit("quote-management/permissions",n.permissions)}).catch(e=>{console.error(e),n.permissions=a,r.emit("quote-management/permissions",a)}):(n.permissions=a,r.emit("quote-management/permissions",a))},{eager:!0}),r.on("quote-management/permissions",async o=>{const e=m.config.getConfig().quoteId;e&&o.editQuote&&O(e).then(t=>{r.emit("quote-management/quote-data/initialized",{quote:t,permissions:o},{})}).catch(t=>{r.emit("quote-management/quote-data/error",{error:t})})},{eager:!0})]}),k=m.config,F=`
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
`;function M(o){const{additionalInput:e,...t}=o,s={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...e||{},...s}}const x=async o=>{const{quoteUid:e,addressId:t,addressData:s}=o;if(!e)throw new Error("Quote UID is required");if(t===void 0&&!s)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&s)throw new Error("Cannot provide both addressId and addressData");const u=s?M(s):null;return _(F,{variables:{quoteUid:e,addressId:t||null,addressData:u}}).then(i=>{var l,E;const{errors:d}=i;if(d){const f=d.map(g=>g.message).join("; ");throw new Error(`Failed to set shipping address: ${f}`)}const c=p((E=(l=i.data)==null?void 0:l.setNegotiableQuoteShippingAddress)==null?void 0:E.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return r.emit("quote-management/shipping-address-set",{quote:c,input:{quoteUid:e,addressId:t,addressData:s}}),c})};export{X as FilterMatchTypeEnum,Z as NegotiableQuoteSortableField,ee as SortEnum,k as config,Q as fetchGraphQl,H as getConfig,w as getCustomerData,O as getQuoteData,m as initialize,te as negotiableQuotes,L as removeFetchGraphQlHeader,B as requestNegotiableQuote,se as sendForReview,V as setEndpoint,Y as setFetchGraphQlHeader,K as setFetchGraphQlHeaders,x as setShippingAddress,J as uploadFile};
//# sourceMappingURL=api.js.map
