/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as l,h as u,a as h}from"./removeCustomerAddress.js";const f={VI:"Visa",MC:"Mastercard",MD:"Maestro",AE:"American Express",DI:"Discover",DN:"Diners",JCB:"JCB",UN:"UnionPay",VISA:"Visa",MASTERCARD:"Mastercard",MAESTRO:"Maestro",AMEX:"American Express",AMERICAN_EXPRESS:"American Express",DISCOVER:"Discover",DINERS:"Diners",DINERS_CLUB:"Diners",UNIONPAY:"UnionPay"};function p(t){try{return JSON.parse(t)}catch{return null}}function m(t){return t.trim().toUpperCase().replaceAll(/\s+/g,"_")}function c(t){return!(t!=null&&t.trim())||m(t)==="UNKNOWN"}function i(t){if(t!=null&&t.trim())return f[m(t)]}function _(t){return t.replaceAll("_"," ").toLowerCase().split(/\s+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}function E(t,r){var a,s;const n=(a=t==null?void 0:t.brand)==null?void 0:a.trim(),e=(s=t==null?void 0:t.type)==null?void 0:s.trim();if(!c(n)){const o=i(n);return o||_(n)}if(!c(e)){const o=i(e);return o||e}return r.payment_method_code}function T(t){if(!t)return!1;const r=/^(\d{1,2})\/(\d{4})$/.exec(t.trim());if(!r)return!1;const n=Number.parseInt(r[1],10),e=Number.parseInt(r[2],10);if(n<1||n>12)return!1;const a=new Date(e,n,0,23,59,59,999);return Date.now()>a.getTime()}function A(t,r){return r.some(n=>t.payment_method_code===n||t.payment_method_code.startsWith(`${n}_`))}function D(t,r){var e;const n=a=>{if(!a)return"";const s=a.replaceAll(/\D/g,"");return s.length>=4?s.slice(-4):""};if(t){const a=n(t.maskedCC)||n(t.lastFour)||n(t.last_four)||n(t.ccLast4)||n(t.cc_last4);if(a)return a}return((e=r.match(/\d{4}/g))==null?void 0:e.at(-1))??""}function y(t){const r=t.replaceAll(/[^a-zA-Z0-9]/g,"");return r.length>=4?r.slice(-4).toUpperCase():r.padEnd(4,"0").slice(0,4).toUpperCase()}function d(t){if(!t.public_hash)return null;const r=p(t.details),n=E(r,t),e=D(r,t.details)||y(t.public_hash);return{publicHash:t.public_hash,cardBrand:n,lastFourDigits:e,expired:T(r==null?void 0:r.expirationDate)}}function N(t,r){return(r!=null&&r.length?t.filter(e=>A(e,r)):t).map(e=>d(e)).filter(e=>e!==null)}const b=`
  query getCustomerPaymentTokens {
    customerPaymentTokens {
      items {
        details
        public_hash
        payment_method_code
        type
      }
    }
  }
`,C=async t=>await l(b,{method:"GET",cache:"no-cache"}).then(r=>{var e,a,s;if((e=r.errors)!=null&&e.length)return u(r.errors);const n=((s=(a=r.data)==null?void 0:a.customerPaymentTokens)==null?void 0:s.items)??[];return N(n,t)}).catch(h),g=`
  mutation deletePaymentToken($public_hash: String!) {
    deletePaymentToken(public_hash: $public_hash) {
      result
    }
  }
`,S=async t=>await l(g,{method:"POST",variables:{public_hash:t}}).then(r=>{var n,e,a;return(n=r.errors)!=null&&n.length?u(r.errors):!!((a=(e=r.data)==null?void 0:e.deletePaymentToken)!=null&&a.result)}).catch(h);export{S as d,C as g};
//# sourceMappingURL=deletePaymentToken.js.map
