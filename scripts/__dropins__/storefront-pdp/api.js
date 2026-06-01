/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as ve,Initializer as _e}from"@dropins/tools/lib.js";import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as Ee}from"@dropins/tools/fetch-graphql.js";function at(e){const r=new URLSearchParams(window.location.search);Object.entries(e).forEach(([n,t])=>{t===null?r.delete(n):r.set(n,String(t))});let i=window.location.pathname;i+=`?${r.toString()}`,i+=window.location.hash,window.history.replaceState({},"",i)}function pe(){const e=new URLSearchParams(window.location.search),r={};return e.forEach((i,n)=>{r[n]=i}),r}function Oe(e=1){const i=(pe()||{}).quantity;if(i){const n=parseInt(i,10);if(!isNaN(n)&&Number.isInteger(n)&&n>0)return n}return e}function xe(e){var r,i,n,t,u,s,o,a,c,l,m,f;return{productId:Number(e==null?void 0:e.externalId),name:e==null?void 0:e.name,sku:(e==null?void 0:e.variantSku)||(e==null?void 0:e.sku),topLevelSku:e==null?void 0:e.sku,variantName:e==null?void 0:e.variantName,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:e==null?void 0:e.productType,pricing:{regularPrice:((i=(r=e==null?void 0:e.prices)==null?void 0:r.regular)==null?void 0:i.amount)||0,minimalPrice:(t=(n=e==null?void 0:e.prices)==null?void 0:n.final)==null?void 0:t.minimumAmount,maximalPrice:(s=(u=e==null?void 0:e.prices)==null?void 0:u.final)==null?void 0:s.maximumAmount,specialPrice:(a=(o=e==null?void 0:e.prices)==null?void 0:o.final)==null?void 0:a.amount,tierPricing:void 0,currencyCode:((l=(c=e==null?void 0:e.prices)==null?void 0:c.final)==null?void 0:l.currency)||"USD"},canonicalUrl:e==null?void 0:e.url,mainImageUrl:(f=(m=e==null?void 0:e.images)==null?void 0:m[0])==null?void 0:f.url}}const Te={PRODUCT_CONTEXT:"productContext",CHANNEL_CONTEXT:"channelContext"},Se={PRODUCT_PAGE_VIEW:"product-page-view"};function we(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function Ae(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function Ce(e,r){const i=we();i.push({[e]:null}),i.push({[e]:r})}function Ne(){typeof window>"u"||Ce(Te.CHANNEL_CONTEXT,Ae())}function ke(e,r){we().push(n=>{const t=n.getState?n.getState():{};n.push({event:e,eventInfo:{...t,...r}})})}function Ue(e){const r=xe(e);Ce(Te.PRODUCT_CONTEXT,r),Ne(),ke(Se.PRODUCT_PAGE_VIEW)}var Z=(e=>(e.ComplexProduct="complex",e.SimpleProduct="simple",e))(Z||{}),De=(e=>(e.ComplexProductView="ComplexProductView",e.SimpleProductView="SimpleProductView",e))(De||{});function J(e,r){var s,o,a,c,l,m,f,C,D,E,g,V;const i=((c=(a=(o=(s=e==null?void 0:e.options)==null?void 0:s[0])==null?void 0:o.values)==null?void 0:a[0])==null?void 0:c.__typename)==="ProductViewOptionValueProduct",n=Le(e,i,r==null?void 0:r.preselectFirstOption),t=(e==null?void 0:e.__typename)===De.SimpleProductView?Z.SimpleProduct:Z.ComplexProduct,u=e?{name:e.name,sku:e.sku,isBundle:i,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:be(e),videos:Ve(e),prices:$e(e,i,n),attributes:Fe(e),options:Ie(Ge(e,i)),optionUIDs:n,url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku,variantName:e.variantName,productType:t}:null;return ve(u,((C=(f=(m=(l=I.getConfig())==null?void 0:l.models)==null?void 0:m.ProductDetails)==null?void 0:f.transformer)==null?void 0:C.call(f,e))??((V=(g=(E=(D=I.getConfig())==null?void 0:D.models)==null?void 0:E.ProductDetails)==null?void 0:g.transform)==null?void 0:V.call(g,e)))}function Ie(e){var i,n,t;if(!e)return;const r=(t=(n=(i=I.getConfig())==null?void 0:i.models)==null?void 0:n.ProductOptions)==null?void 0:t.optionsTransformer;if(!r)return e;try{return r(e)??e}catch(u){return console.error("product-transform: optionsTransformer threw an error, using original options",u),e}}function be(e){var r,i;return(i=(r=e.images)==null?void 0:r.filter(n=>{var t;return!((t=n.roles)!=null&&t.includes("hide_from_pdp"))}))==null?void 0:i.map(n=>(n.url=n.url.replace(/^https?:/,""),n))}function Ve(e){var r;return(r=e.videos)==null?void 0:r.map(i=>{var n,t;return{url:(n=i.url)==null?void 0:n.replace(/^https?:/,""),title:i.title,description:i.description,preview:i.preview?{url:(t=i.preview.url)==null?void 0:t.replace(/^https?:/,""),label:i.preview.label,roles:i.preview.roles}:void 0}})}function Fe(e){var r,i;return(i=(r=e.attributes)==null?void 0:r.filter(({roles:n})=>(n==null?void 0:n.indexOf("visible_in_pdp"))!==-1))==null?void 0:i.map(({label:n,value:t,name:u})=>{if(u!=null&&u.startsWith("ac_"))try{let s;typeof t=="string"?s=JSON.parse(t):typeof t=="object"&&(s=t);const o=ee(s);return{id:u,label:n,value:JSON.stringify(o)}}catch{return{id:u,label:n,value:t.toString().split(",").join(", ")}}return{id:u,label:n,value:t.toString().split(",").join(", ")}})}function ee(e){if(Array.isArray(e))return e.map(ee);if(e!==null&&typeof e=="object"){const r={};for(const[i,n]of Object.entries(e)){let t=i;i==="validation_rule"?t="validationRule":i==="min_length"?t="minLength":i==="max_length"?t="maxLength":i==="purchase_separately"&&(t="purchaseSeparately"),r[t]=ee(n)}return r}return e}function Ge(e,r){const{options:i,optionUIDs:n}=e;return i==null?void 0:i.map(({id:t,title:u,required:s,multi:o,values:a})=>{var m,f;const c=(m=a==null?void 0:a[0])==null?void 0:m.__typename;let l=(f=a==null?void 0:a[0])==null?void 0:f.type;return l?l=l.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):l="dropdown",{id:t,type:l,typename:c,label:u,required:s,multiple:o,items:r?Me(a,n):Re(a,n,l)}})}function Me(e,r){return e==null?void 0:e.filter(({enabled:i})=>typeof i>"u"||i).map(({id:i,title:n,inStock:t,isDefault:u,product:s})=>({id:i,inStock:t,label:n,selected:(r==null?void 0:r.indexOf(i))>-1||u,value:i,product:s}))}function Re(e,r,i){return e==null?void 0:e.map(({id:n,title:t,inStock:u,value:s})=>({id:n,inStock:u,label:t,selected:(r==null?void 0:r.indexOf(n))>-1,value:(i==null?void 0:i.toLowerCase())==="dropdown"?n:s==null?void 0:s.replace(/^https?:/,"")}))}function $e(e,r,i){var V,ie,se,ue,ae;const{price:n,priceRange:t,options:u,optionUIDs:s=i}=e;if(!n&&!t)return null;let{__typename:o}=e;function a(){var v,y,h,T,w,O,x,S,A,N;const p=(y=(v=n==null?void 0:n.regular)==null?void 0:v.amount)==null?void 0:y.value,d=((T=(h=n==null?void 0:n.final)==null?void 0:h.amount)==null?void 0:T.value)??((O=(w=n==null?void 0:n.regular)==null?void 0:w.amount)==null?void 0:O.value),P=((S=(x=n==null?void 0:n.regular)==null?void 0:x.amount)==null?void 0:S.currency)==="NONE"?"USD":(N=(A=n==null?void 0:n.regular)==null?void 0:A.amount)==null?void 0:N.currency;return[p,d,d,P]}function c(){var y,h,T,w,O,x,S,A,N,F,G,M,R,$,L,q,Q,K,H,j,X;const p=(T=(h=(y=t==null?void 0:t.minimum)==null?void 0:y.final)==null?void 0:h.amount)==null?void 0:T.value,d=(x=(O=(w=t==null?void 0:t.maximum)==null?void 0:w.final)==null?void 0:O.amount)==null?void 0:x.value;let P;((N=(A=(S=t==null?void 0:t.minimum)==null?void 0:S.regular)==null?void 0:A.amount)==null?void 0:N.value)===((M=(G=(F=t==null?void 0:t.maximum)==null?void 0:F.regular)==null?void 0:G.amount)==null?void 0:M.value)&&(P=(L=($=(R=t==null?void 0:t.minimum)==null?void 0:R.regular)==null?void 0:$.amount)==null?void 0:L.value);const v=((K=(Q=(q=t==null?void 0:t.minimum)==null?void 0:q.final)==null?void 0:Q.amount)==null?void 0:K.currency)==="NONE"?"USD":(X=(j=(H=t==null?void 0:t.minimum)==null?void 0:H.final)==null?void 0:j.amount)==null?void 0:X.currency;return[P,p,d,v]}function l(){var T,w,O,x,S,A,N,F,G,M,R,$,L,q,Q,K,H,j,X,oe,le,ce,me,fe;let p=0,d=0;u==null||u.forEach(b=>{var de;const Y=b==null?void 0:b.values;if(Y&&Array.isArray(Y)){const U=Y.map(k=>{var B,W,Pe,ye;return(ye=(Pe=(W=(B=k==null?void 0:k.product)==null?void 0:B.price)==null?void 0:W.regular)==null?void 0:Pe.amount)==null?void 0:ye.value}).filter(k=>k!==void 0),z=U.length>0?Math.max(...U):0;p+=z}(de=b==null?void 0:b.values)==null||de.forEach(U=>{var z,k,B,W;s!=null&&s.includes(U.id)&&(d+=(W=(B=(k=(z=U==null?void 0:U.product)==null?void 0:z.price)==null?void 0:k.final)==null?void 0:B.amount)==null?void 0:W.value)})});const P=(O=(w=(T=t==null?void 0:t.minimum)==null?void 0:T.final)==null?void 0:w.amount)==null?void 0:O.value,v=(A=(S=(x=t==null?void 0:t.maximum)==null?void 0:x.final)==null?void 0:S.amount)==null?void 0:A.value;let y;((G=(F=(N=t==null?void 0:t.minimum)==null?void 0:N.regular)==null?void 0:F.amount)==null?void 0:G.value)===(($=(R=(M=t==null?void 0:t.maximum)==null?void 0:M.regular)==null?void 0:R.amount)==null?void 0:$.value)&&(y=(Q=(q=(L=t==null?void 0:t.minimum)==null?void 0:L.regular)==null?void 0:q.amount)==null?void 0:Q.value);const h=((j=(H=(K=t==null?void 0:t.minimum)==null?void 0:K.final)==null?void 0:H.amount)==null?void 0:j.currency)==="NONE"?"USD":(le=(oe=(X=t==null?void 0:t.minimum)==null?void 0:X.final)==null?void 0:oe.amount)==null?void 0:le.currency;return r&&(s==null?void 0:s.length)<1?[y,P,v,h]:p===((fe=(me=(ce=t==null?void 0:t.maximum)==null?void 0:ce.regular)==null?void 0:me.amount)==null?void 0:fe.value)?[d,d,d,h]:[y,P,v,h]}const[m,f,C,D]=o==="SimpleProductView"?a():r?l():c(),E=o==="SimpleProductView"?(V=n==null?void 0:n.roles)==null?void 0:V.includes("visible"):((se=(ie=t==null?void 0:t.maximum)==null?void 0:ie.roles)==null?void 0:se.includes("visible"))&&((ae=(ue=t==null?void 0:t.minimum)==null?void 0:ue.roles)==null?void 0:ae.includes("visible"));function g(p){return!p||!Array.isArray(p)?[]:p.map(d=>{var P,v,y,h,T,w;return{tier:{amount:(v=(P=d.tier)==null?void 0:P.amount)==null?void 0:v.value,currency:((h=(y=d.tier)==null?void 0:y.amount)==null?void 0:h.currency)||D},quantity:((T=d.quantity[0])==null?void 0:T.gte)||((w=d.quantity[0])==null?void 0:w.lt)||0}}).sort((d,P)=>d.quantity-P.quantity)}return C&&f===C?{regular:{amount:m,currency:D,variant:m&&f!==m?"strikethrough":"default"},final:{amount:C,currency:D,variant:"default"},tiers:g(n==null?void 0:n.tiers),visible:E}:{final:{minimumAmount:f,maximumAmount:C,currency:D},tiers:g(n==null?void 0:n.tiers),visible:E}}function Le(e,r,i){var n;if(r){const t=Array.isArray(e==null?void 0:e.optionUIDs)?e.optionUIDs.filter(Boolean):[];if(t.length>0)return t;const u=[];return(n=e==null?void 0:e.options)==null||n.forEach(({values:s,multi:o})=>{var l;const a=s==null?void 0:s.filter(({enabled:m})=>typeof m>"u"||m),c=a==null?void 0:a.filter(({isDefault:m})=>m);if(c!=null&&c.length){o?c.forEach(m=>u.push(m.id)):u.push(c[0].id);return}i&&((l=a==null?void 0:a[0])!=null&&l.id)&&u.push(a[0].id)}),u}return e==null?void 0:e.optionUIDs}function ot(e,r){if(!(r!=null&&r.length))return Object.values(e).flatMap(n=>"values"in n?n.values:n.value?[n.value]:[]);const i=[];for(const n of r){const t=e[n.id];if(t)if("values"in t){const u=new Map(n.items.map((o,a)=>[o.id,a])),s=[...t.values].sort((o,a)=>(u.get(o)??0)-(u.get(a)??0));i.push(...s)}else"value"in t&&t.value&&i.push(t.value)}return i}function qe(e,r,i){if(!(e!=null&&e.length))return!0;const n=r??[];return i?e.every(t=>t.required?t.items.filter(s=>n.includes(s.id)).length>=1:!0):n.length===e.length}const te=new _e({init:async e=>{var o,a,c;const r=(a=(o=e==null?void 0:e.models)==null?void 0:o.ProductDetails)==null?void 0:a.initialData,n=((c=(pe()||{}).optionsUIDs)==null?void 0:c.split(","))||(r==null?void 0:r.optionsUIDs),t=Oe(1),s={...{defaultLocale:"en-US",globalLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:n},...e};if(te.config.setConfig({...s}),s!=null&&s.sku){const l=r?J(r):await ge(s.sku,{preselectFirstOption:s.preselectFirstOption});_.emit("pdp/data",l,{scope:s.scope});const m={sku:s.sku,quantity:t,optionsUIDs:l==null?void 0:l.optionUIDs};et(()=>({...m}),{scope:s.scope}),nt(()=>l!=null&&l.options?qe(l.options,l.optionUIDs,l.isBundle):!0,{scope:s.scope}),s.acdl&&l&&Ue(l)}},listeners:()=>[_.on("locale",async()=>{const{sku:e,scope:r}=te.config.getConfig();if(e){const i=await ge(e);_.emit("pdp/data",i,{scope:r})}})]}),I=te.config,{setEndpoint:lt,setFetchGraphQlHeader:ct,removeFetchGraphQlHeader:mt,setFetchGraphQlHeaders:ft,getFetchGraphQlHeader:dt,fetchGraphQl:ne,getConfig:Pt}=new Ee().getMethods(),Qe=`
fragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {
    id
    title
    required
    multi
    values {
      id
      title
      inStock
      __typename
      ... on ProductViewOptionValueProduct {
        title
        quantity
        isDefault
        __typename
        product {
          sku
          shortDescription
          metaDescription
          metaKeyword
          metaTitle
          name
          price {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
            roles
          }
        }
      }
      ... on ProductViewOptionValueSwatch {
        id
        title
        type
        value
        inStock
      }
    }
  }
`,Ke=`
  fragment PRICE_RANGE_FRAGMENT on ComplexProductView {
    priceRange {
      maximum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
        roles
      }
      minimum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
        roles
      }
    }
  }
`,re=`
fragment PRODUCT_FRAGMENT on ProductView {
  __typename
  id
  sku
  name
  shortDescription
  metaDescription
  metaKeyword
  metaTitle
  description
  inStock
  addToCartAllowed
  url
  urlKey
  externalId

  images(roles: []) {
    url
    label
    roles
  }

  videos {
		description
		url
		title
		preview {
			label
			roles
			url
		}
	}

  attributes(roles: []) {
    name
    label
    value
    roles
  }

... on SimpleProductView {
    price {
        roles

        regular {
            amount {
                value
                currency
            }
        }

        final {
            amount {
                value
                currency
            }
        }
        tiers {
          tier {
            amount {
              value
              currency
            }
          }
          quantity {
            ... on ProductViewTierRangeCondition {
              gte
              lt
            }
          }
        }
      }
    }

  ... on ComplexProductView {
    options {
      ...PRODUCT_OPTION_FRAGMENT
    }

    ...PRICE_RANGE_FRAGMENT
  }
}

${Qe}
${Ke}
`,He=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...PRODUCT_FRAGMENT
    }
}

${re}
`,je=async(e,r,i)=>{var u;const{data:n}=await ne(He,{method:"GET",variables:{skus:[e]}}),t=(u=n==null?void 0:n.products)==null?void 0:u[0];return r!=null&&r.optionsUIDs&&(t.optionUIDs=r.optionsUIDs),t?i?t:J(t,{preselectFirstOption:r==null?void 0:r.preselectFirstOption}):null},Xe=`
query GET_PRODUCTS_DATA($skus: [String]) {
    products(skus: $skus) {
        ...PRODUCT_FRAGMENT
    }
}

${re}
`,yt=async(e,r)=>{if(!e||e.length===0)return null;const i=e.map(s=>s.sku),{data:n}=await ne(Xe,{method:"GET",variables:{skus:i}}),t=n==null?void 0:n.products;if(!t||t.length===0)return null;const u=e.reduce((s,o)=>(s[o.sku]=o,s),{});return r?t:t.map(s=>{const o=u[s.sku];return o!=null&&o.optionsUIDs&&(s.optionUIDs=o.optionsUIDs),J(s,{preselectFirstOption:o==null?void 0:o.preselectFirstOption})})},Be=`
query REFINE_PRODUCT_QUERY(
    $optionIds: [String!]!
    $sku: String!
) {
    # Refined Product
    refineProduct(
        optionIds: $optionIds 
        sku: $sku
    ) {
        ...PRODUCT_FRAGMENT
    }

    # Parent Product
    products(skus: [$sku]) {
        ...PRODUCT_FRAGMENT
    }

    # %extendedPlaceholder%
}

${re}
`;async function he(e,r){const i=ze(r),n=Je(i,e),t=Be.replace("# %extendedPlaceholder%",n),{data:u}=await ne(t,{method:"GET",variables:{optionIds:r,sku:e}});return u}const We=async(e,r,i,n)=>{var C,D,E;const t=await he(e,r);if(!t)return null;let{products:u,refineProduct:s,...o}=t;const a=u==null?void 0:u[0],c=Ye(Object.values(o),a.options,i);if(i!=null&&i.length&&s===null){r=Ze(c,r,i);const g=await he(e,r);s=g==null?void 0:g.refineProduct}const l={...s||a,sku:a.sku,name:a.name,externalParentId:a==null?void 0:a.externalId,options:c,optionUIDs:r,variantSku:(s==null?void 0:s.__typename)==="SimpleProductView"?s==null?void 0:s.sku:void 0,variantName:(s==null?void 0:s.__typename)==="SimpleProductView"?s==null?void 0:s.name:void 0},m=n?l:J(l),f=(E=(D=(C=I==null?void 0:I.getConfig())==null?void 0:C.models)==null?void 0:D.ProductDetails)==null?void 0:E.fallbackData;return f?f(a,m):m};function ze(e){if(e.length<2)return[e];const r=[];return e.forEach(i=>{const n=[];e.forEach(t=>{i!==t&&n.push(t)}),r.push(n)}),r}function Je(e,r){return e.map((i,n)=>`
          ProductOption${n}: refineProduct(
            optionIds: [
              ${i.map(t=>`"${t}"`).join(", ")}
            ]
            sku: "${r}"
          ) {
            ... on ComplexProductView {
              options {
                ...PRODUCT_OPTION_FRAGMENT
              }
            }
          }
        `).join("")}function Ye(e,r=[],i){const n=Object.values(e).filter(u=>!!u).reduce((u,s)=>s.options?[...u,...s.options]:[...u],[]),t=new Map(r.map(u=>[u.id,u]));return n.forEach(u=>{i!=null&&i.includes(u.id)||t.set(u.id,u)}),[...t.values()]}function Ze(e,r,i){const n=[];let t;return e.forEach(u=>{var s,o,a,c;i.includes(u.id)?t=((o=(s=u.values)==null?void 0:s.find(l=>r.includes(l==null?void 0:l.id)))==null?void 0:o.id)||((a=u.values[0])==null?void 0:a.id):t=(c=u.values[0])==null?void 0:c.id,n.push(t)}),n}const ge=async(e,r)=>{const{anchors:i,optionsUIDs:n}=I.getConfig(),{optionsUIDs:t=n,anchors:u=i,preselectFirstOption:s,isBundle:o,skipTransform:a}=r??{};return!o&&t&&t.length>0?await We(e,t,u,a):await je(e,{preselectFirstOption:s,optionsUIDs:t},a)},et=(e,r)=>{const i=tt({scope:r==null?void 0:r.scope}),n=e(i);_.emit("pdp/values",{...n},{scope:r==null?void 0:r.scope})},tt=({scope:e}={})=>_.lastPayload("pdp/values",{scope:e})??null,nt=(e,r)=>{const i=rt({scope:r==null?void 0:r.scope}),n=e(i);_.emit("pdp/valid",n,{scope:r==null?void 0:r.scope})},ht=async({scope:e}={})=>{const r=_.lastPayload("pdp/data",{scope:e});return r?Promise.resolve(r):new Promise(i=>{const n=_.on("pdp/data",t=>{i(t),n==null||n.off()},{eager:!0,scope:e})})},rt=({scope:e}={})=>_.lastPayload("pdp/valid",{scope:e})??null;export{Ke as P,re as a,Qe as b,at as c,I as config,ne as fetchGraphQl,ge as fetchProductData,Oe as g,Pt as getConfig,dt as getFetchGraphQlHeader,ht as getFetchedProductData,tt as getProductConfigurationValues,je as getProductData,yt as getProductsData,We as getRefinedProduct,qe as i,te as initialize,rt as isProductConfigurationValid,Ue as p,mt as removeFetchGraphQlHeader,ot as s,lt as setEndpoint,ct as setFetchGraphQlHeader,ft as setFetchGraphQlHeaders,nt as setProductConfigurationValid,et as setProductConfigurationValues,J as t};
//# sourceMappingURL=api.js.map
