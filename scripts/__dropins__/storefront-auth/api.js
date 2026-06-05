/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as R}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as et}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as rt}from"@dropins/tools/fetch-graphql.js";import{Initializer as at,Config as ot,merge as K}from"@dropins/tools/lib.js";const l={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_lastname:"auth_dropin_lastname",auth_dropin_admin_session:"auth_dropin_admin_session"},nt=["localhost","127.0.0.1","::1"],k=3600,V=t=>{const e=document.cookie.split(";");let r;return e.forEach(a=>{const[o,c]=a.trim().split("=");o===t&&(r=decodeURIComponent(c))}),r},w=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},it=async()=>{try{const t=sessionStorage.getItem("storeConfig");let e={};try{e=t?JSON.parse(t):{}}catch{e={}}let r=e.customerAccessTokenLifetime;if(!r){const a=await Pt();sessionStorage.setItem("storeConfig",JSON.stringify(a)),r=(a==null?void 0:a.customerAccessTokenLifetime)||k}return`Max-Age=${r}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${k}`}},p=new ot(void 0),P=new at({init:async t=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...t};P.config.setConfig(r);const a=V(l.auth_dropin_user_token),[o]=await Promise.all([tt(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&a?z():Promise.resolve(),r.adobeCommerceOptimizer?B():Promise.resolve()]);p.setConfig(o)},listeners:()=>[R.on("authenticated",t=>{const e=p.getConfig();if(e!==void 0&&t!==e){p.setConfig(t);const{customerPermissionRoles:r,adobeCommerceOptimizer:a}=P.config.getConfig();r&&z(),a&&B()}})]}),N=P.config,{setEndpoint:ee,setFetchGraphQlHeader:v,removeFetchGraphQlHeader:J,setFetchGraphQlHeaders:re,fetchGraphQl:h,getConfig:ae}=new rt().getMethods(),D=`
  fragment CUSTOMER_INFORMATION_FRAGMENT on Customer {
    __typename
    firstname
    lastname
    email
    allow_remote_shopping_assistance
    group {
      uid
    }
  }
`,ct=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${D}
`,st=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${D}
`,S=t=>{throw t instanceof DOMException&&t.name==="AbortError"||R.emit("auth/error",{source:"auth",type:"network",error:t}),t},$=async()=>{const t=await et();t&&v("X-ReCaptcha",t)},j=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),ut=t=>{var e,r,a,o,c,n,u,i,m,_,f,d,g,T,C,O,A,E;return{autocompleteOnStorefront:((r=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((o=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:o.minimum_password_length)||3,requiredCharacterClasses:+((n=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((i=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:i.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:_.customer_access_token_lifetime)*k||k,websiteName:((d=(f=t==null?void 0:t.data)==null?void 0:f.storeConfig)==null?void 0:d.website_name)||"",shoppingAssistanceEnabled:((T=(g=t==null?void 0:t.data)==null?void 0:g.storeConfig)==null?void 0:T.shopping_assistance_enabled)||!1,shoppingAssistanceCheckboxTitle:((O=(C=t==null?void 0:t.data)==null?void 0:C.storeConfig)==null?void 0:O.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((E=(A=t==null?void 0:t.data)==null?void 0:A.storeConfig)==null?void 0:E.shopping_assistance_checkbox_tooltip)||""}},mt=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(a=t==null?void 0:t.errors[0])==null?void 0:a.message),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.requestPasswordResetEmail)}},_t=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((a=t==null?void 0:t.errors[0])==null?void 0:a.message)||"Unknown error"),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.revokeCustomerToken)}},dt=t=>{var r,a,o,c,n,u,i,m,_,f,d,g,T,C,O;const e={email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)??"",firstName:((c=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:c.firstname)??"",lastName:((u=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:u.lastname)??"",groupUid:((_=(m=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:m.group)==null?void 0:_.uid)??"",allowRemoteShoppingAssistance:(d=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:d.allow_remote_shopping_assistance};return K(e,(O=(C=(T=(g=N==null?void 0:N.getConfig())==null?void 0:g.models)==null?void 0:T.CustomerModel)==null?void 0:C.transformer)==null?void 0:O.call(C,t.data))},Q=t=>t.replace(/_([a-z])/g,(e,r)=>r.toUpperCase()),lt=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),U=(t,e,r)=>{const a=["string","boolean","number"],o=e==="camelCase"?Q:lt;return Array.isArray(t)?t.map(c=>a.includes(typeof c)||c===null?c:typeof c=="object"?U(c,e,r):c):t!==null&&typeof t=="object"?Object.entries(t).reduce((c,[n,u])=>{const i=r&&r[n]?r[n]:o(n);return c[i]=a.includes(typeof u)||u===null?u:U(u,e,r),c},{}):t},ft=t=>{let e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let a=2;a<=r.multiline_count;a++){const o={...r,is_required:!1,name:`${r.code}_multiline_${a}`,code:`${r.code}_multiline_${a}`,id:`${r.code}_multiline_${a}`};e.push(o)}return e},ht=t=>{var c,n,u;const e=((n=(c=t==null?void 0:t.data)==null?void 0:c.attributesForm)==null?void 0:n.items)||[];if(!e.length)return[];const r=(u=e.filter(i=>{var m;return!((m=i.frontend_input)!=null&&m.includes("HIDDEN"))}))==null?void 0:u.map(({code:i,...m})=>{const _=i!=="country_id"?i:"country_code";return{...m,name:_,id:_,code:_}}),a=ft(r);return r.concat(a).map(i=>{var f;const m=i.code==="firstname"?"firstName":i.code==="lastname"?"lastName":Q(i.code),_=(f=i.options)==null?void 0:f.map(d=>({isDefault:d.is_default,text:d.label,value:d.value}));return U({...i,options:_,customUpperCode:m},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((i,m)=>i.orderNumber-m.orderNumber)},gt=(t,e)=>{var a,o,c,n,u,i,m,_,f,d,g,T,C,O,A,E;let r;if(e){const{data:s}=t;r={firstName:((o=(a=s==null?void 0:s.createCustomerV2)==null?void 0:a.customer)==null?void 0:o.firstname)??"",lastName:((n=(c=s==null?void 0:s.createCustomerV2)==null?void 0:c.customer)==null?void 0:n.lastname)??"",email:((i=(u=s==null?void 0:s.createCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)??"",customAttributes:((m=s==null?void 0:s.createCustomerV2)==null?void 0:m.custom_attributes)??[],errors:(t==null?void 0:t.errors)??[]}}else{const{data:s}=t;r={firstName:((f=(_=s==null?void 0:s.createCustomer)==null?void 0:_.customer)==null?void 0:f.firstname)??"",lastName:((g=(d=s==null?void 0:s.createCustomer)==null?void 0:d.customer)==null?void 0:g.lastname)??"",email:((C=(T=s==null?void 0:s.createCustomer)==null?void 0:T.customer)==null?void 0:C.email)??"",errors:(t==null?void 0:t.errors)??[]}}return K(r,(E=(A=(O=N.getConfig().models)==null?void 0:O.CustomerModel)==null?void 0:A.transformer)==null?void 0:E.call(A,t))},Ct=t=>{var e,r;return{priceBookId:((r=(e=t==null?void 0:t.data)==null?void 0:e.commerceOptimizer)==null?void 0:r.priceBookId)||""}},Et=t=>{if(!t.dob)return t;const{dob:e,...r}=t;return{...r,date_of_birth:e}},oe=async(t,e)=>{await $();const r=await h(e?st:ct,{method:"POST",variables:{input:{...Et(t)}}}).catch(S);return gt(r,e)},Tt=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,x=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},ne=async t=>await h(Tt,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?x(e.errors):ht(e)}).catch(S),Ot=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${D}
`,Rt=async t=>{if(t){const{authHeaderConfig:e}=N.getConfig();v(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(Ot,{method:"GET",cache:"force-cache"}).then(e=>dt(e)).catch(S)},St=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,W="accountContext",At="channelContext";var y=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(y||{});const G={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function X(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function F(t,e){const r=X();r.push({[t]:null}),r.push({[t]:e})}function wt(){F(At,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function L(t,e){X().push(a=>{const o=a.getState?a.getState():{};a.push({event:t,eventInfo:{...o,...e}})})}function Nt(t){const e=j(t);F(W,e),L(G.CREATE_ACCOUNT)}function Mt(t){const e=j(t);F(W,e),L(G.SIGN_IN)}function yt(){L(G.SIGN_OUT)}const Z=(t,e)=>{const r=sessionStorage.getItem("storeConfig");let a={};try{a=r?JSON.parse(r):{}}catch{a={}}const o={...a,...e};switch(wt(),t){case"create-account":Nt(o);break;case"sign-in":Mt(o);break;case"sign-out":yt();break;default:return null}},bt=async t=>{if(!t||t.trim()==="")return"";try{const e=atob(t),r=new Uint8Array(e.length);for(let n=0;n<e.length;n++)r[n]=e.charCodeAt(n);const a=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(a)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(e){return console.error(`Failed to convert base64 to SHA1: ${e instanceof Error?e.message:"Unknown error"}`),""}},It="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",b=async t=>{const e=t?await bt(t):It;R.emit("auth/group-uid",e)},Y=t=>{if(!t||typeof t!="string")return null;try{const e=t.split(".");if(e.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const a=e[1].replace(/-/g,"+").replace(/_/g,"/"),o=a.padEnd(a.length+(4-a.length%4)%4,"="),c=atob(o);return JSON.parse(c)}catch(e){return console.error("[decodeJwtToken] Failed to decode JWT:",e),null}},kt=t=>{const e=Y(t);return e?typeof e.admin_id=="number"&&e.admin_id>0:!1},$t=(t,e)=>{const r=Y(t);if(r&&typeof r.exp=="number"&&r.exp>0){const a=Math.floor(Date.now()/1e3);return`Max-Age=${Math.max(0,r.exp-a)}`}return e},ie=async({email:t,password:e,translations:r,onErrorCallback:a,handleSetInLineAlertProps:o,apiErrorMessageOverride:c})=>{var T,C,O,A;await $();const n=await h(St,{method:"POST",variables:{email:t,password:e}}).catch(S);if(!((C=(T=n==null?void 0:n.data)==null?void 0:T.generateCustomerToken)!=null&&C.token)){const E=r.customerTokenErrorMessage,s=n!=null&&n.errors?n.errors[0].message:E,q=c??s;return a==null||a(s),o==null||o({type:"error",text:q}),{errorMessage:s,displayErrorMessage:q,userName:"",userEmail:""}}const u=(A=(O=n==null?void 0:n.data)==null?void 0:O.generateCustomerToken)==null?void 0:A.token,i=await Rt(u),m=i==null?void 0:i.firstName,_=(i==null?void 0:i.lastName)??"",f=i==null?void 0:i.email;if(!m||!f){const E=r.customerTokenErrorMessage,s=c??E;return a==null||a(E),o==null||o({type:"error",text:s}),{errorMessage:E,displayErrorMessage:s,userName:"",userEmail:""}}const d=await it(),g=nt.includes(window.location.hostname)?"":"Secure";if(document.cookie=`${l.auth_dropin_firstname}=${encodeURIComponent(m)}; path=/; ${d}; SameSite=Lax; ${g};`,document.cookie=`${l.auth_dropin_lastname}=${encodeURIComponent(_)}; path=/; ${d}; SameSite=Lax; ${g};`,document.cookie=`${l.auth_dropin_user_token}=${encodeURIComponent(u)}; path=/; ${d}; SameSite=Lax; ${g};`,kt(u)){const E=$t(u,d);document.cookie=`${l.auth_dropin_admin_session}=true; path=/; ${E}; SameSite=Lax; ${g};`}else w(l.auth_dropin_admin_session);return await b(u?i==null?void 0:i.groupUid:void 0),R.emit("authenticated",!!u),Z(y==null?void 0:y.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:m,userEmail:f}},pt=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
      website_name
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,Pt=async()=>await h(pt,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?x(t.errors):ut(t)}).catch(S),Ut=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,ce=async t=>(await $(),await h(Ut,{method:"POST",variables:{email:t}}).then(e=>mt(e)).catch(S)),vt=`
  mutation RESET_PASSWORD(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }
`,Dt=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(a=t==null?void 0:t.errors[0])==null?void 0:a.message),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.resetPassword)}},se=async(t,e,r)=>(await $(),await h(vt,{method:"POST",variables:{email:t,resetPasswordToken:e,newPassword:r}}).then(a=>Dt(a)).catch(S)),xt=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,Gt=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,tt=async(t="Authorization",e="Bearer")=>{const r=V(l.auth_dropin_user_token);return r?(v(t,`${e} ${r}`),h(Gt).then(async a=>{var c,n,u,i;return!((c=a.errors)!=null&&c.find(m=>{var _;return((_=m.extensions)==null?void 0:_.category)==="graphql-authentication"}))?(await b((i=(u=(n=a.data)==null?void 0:n.customer)==null?void 0:u.group)==null?void 0:i.uid),R.emit("authenticated",!0),!0):(w(l.auth_dropin_user_token),w(l.auth_dropin_firstname),w(l.auth_dropin_lastname),w(l.auth_dropin_admin_session),J(t),await b(),R.emit("authenticated",!1),!1)})):(await b(),R.emit("authenticated",!1),!1)},ue=async()=>{const{authHeaderConfig:t}=N.getConfig();return await h(xt,{method:"POST"}).then(async e=>{const r=_t(e);if(r!=null&&r.success)[l.auth_dropin_user_token,l.auth_dropin_firstname,l.auth_dropin_lastname,l.auth_dropin_admin_session].forEach(a=>{w(a)}),J(t.header),await b(),R.emit("authenticated",!1),Z(y.SIGN_OUT,{});else{const a=`
          ERROR revokeCustomerToken: ${r.message}`;console.error(a),tt()}return r}).catch(S)},Ft=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,me=async({customerEmail:t,customerConfirmationKey:e})=>await h(Ft,{method:"POST",variables:{email:t,confirmation_key:e}}).catch(S),Lt=`
  mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
    resendConfirmationEmail(email: $email)
  }
`,_e=async t=>await h(Lt,{method:"POST",variables:{email:t}}).catch(S),qt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,de=async t=>await h(qt,{method:"POST",variables:{input:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?x(e.errors):e.data.createCustomerAddress.firstname||""}).catch(S),Ht=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      purchase_orders_enabled
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children {
                  id
                  text
                  children {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;let I=null,M=null;const zt=t=>{const e={},r=a=>{a.forEach(o=>{var c;e[o.id]=!0,(c=o.children)!=null&&c.length&&r(o.children)})};return r(t),e},Bt=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],H="Magento_Sales::place_order",Kt=t=>(t==null?void 0:t.id)==="MA=="&&Array.isArray(t.permissions)&&t.permissions.length===0,Vt=t=>{var e;return(e=t==null?void 0:t.permissions)!=null&&e.length?zt(t.permissions):{}},Jt=(t,e)=>{if(e===!0)return t;const r={...t};return Bt.forEach(a=>{r[a]=!1}),r},jt=(t,e)=>{const r=Kt(t),a=Vt(t),o=Jt(a,e),n={...{all:!0,...r&&{admin:!0}},...o};return!r&&n[H]===void 0&&Object.keys(a).length===0&&(n[H]=!0),n},Qt=async()=>{var t,e,r,a;try{const o=await h(Ht,{method:"GET"}),c=jt((e=(t=o.data)==null?void 0:t.customer)==null?void 0:e.role,(a=(r=o.data)==null?void 0:r.customer)==null?void 0:a.purchase_orders_enabled);return I=c,M=null,c}catch(o){throw M=null,o}},z=()=>I?(R.emit("auth/permissions",I),Promise.resolve(I)):(M||(M=Qt().then(t=>(R.emit("auth/permissions",t),t))),M),le=()=>{I=null,M=null},Wt=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,B=async()=>{const t=await h(Wt,{method:"GET"}),e=Ct(t);return R.emit("auth/adobe-commerce-optimizer",e),e};export{D as C,y as E,le as _resetCache,U as c,N as config,me as confirmEmail,oe as createCustomer,de as createCustomerAddress,h as fetchGraphQl,B as getAdobeCommerceOptimizerData,ne as getAttributesForm,ae as getConfig,Rt as getCustomerData,z as getCustomerRolePermissions,ie as getCustomerToken,Pt as getStoreConfig,P as initialize,Z as p,J as removeFetchGraphQlHeader,ce as requestPasswordResetEmail,_e as resendConfirmationEmail,se as resetPassword,ue as revokeCustomerToken,ee as setEndpoint,v as setFetchGraphQlHeader,re as setFetchGraphQlHeaders,ht as t,tt as verifyToken};
//# sourceMappingURL=api.js.map
