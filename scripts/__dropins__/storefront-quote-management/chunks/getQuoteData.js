/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as i}from"@dropins/tools/event-bus.js";import{f as n,t as s}from"./transform-quote.js";import{N as m}from"./NegotiableQuoteFragment.js";import{s as r}from"./state.js";const u=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${m}
`,E=async a=>{var o;if(!r.authenticated)return Promise.reject(new Error("Unauthorized"));if(!r.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const t=await n(u,{variables:{quoteId:a}}),e=s((o=t==null?void 0:t.data)==null?void 0:o.negotiableQuote);if(!e)throw new Error("Failed to transform quote data");return i.emit("quote-management/quote-data",{quote:e,permissions:r.permissions}),e}catch(t){return Promise.reject(t)}};export{E as g};
//# sourceMappingURL=getQuoteData.js.map
