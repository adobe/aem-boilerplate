/*! Copyright 2025 Adobe
All Rights Reserved. */
import{UNIT_FRAGMENT as k}from"../fragments.js";import{events as O}from"@dropins/tools/event-bus.js";import{merge as $}from"@dropins/tools/lib.js";import{c as L}from"./initialize.js";import{FetchGraphQL as H}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ee,setFetchGraphQlHeader:ne,removeFetchGraphQlHeader:te,setFetchGraphQlHeaders:se,fetchGraphQl:M,getConfig:re}=new H().getMethods(),A=n=>{const e=n.map(t=>t.message).join(" ");throw new Error(e)},G=`
  query GetRecommendations(
    $pageType: PageType!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendations(
      cartSkus: $cartSkus
      currentSku: $currentSku
      pageType: $pageType
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        ...UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${k}
`;function x(n,e){var r,i,m,c;if(!n||!((r=n.results)!=null&&r.length))return[];const t=e?n.results.filter(o=>o.unitId===e):n.results;e&&t.length===0&&console.warn(`ProductList: recId "${e}" does not match any recommendation units. Available unitIds: ${n.results.map(o=>o.unitId).join(", ")}`);const s=t.map(o=>({displayOrder:o.displayOrder??0,pageType:o.pageType,title:o.storefrontLabel??"",items:q(o.productsView??[]),totalProducts:o.totalProducts??0,typeId:o.typeId??"",unitId:o.unitId??"",unitName:o.unitName??""}));return $(s,(c=(m=(i=L.getConfig().models)==null?void 0:i.RecommendationUnitModel)==null?void 0:m.transformer)==null?void 0:c.call(m,n))}function q(n){return n!=null&&n.length?n.map(e=>{var t,s,r,i,m,c,o,p,f,h,g,R,T,E,I,b,d,C,v,S,U,_,w,P;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((s=(t=e.images)==null?void 0:t[0])==null?void 0:s.url)??"").replace("http://","//")}],price:{final:{amount:{value:((m=(i=(r=e.price)==null?void 0:r.final)==null?void 0:i.amount)==null?void 0:m.value)??null,currency:((p=(o=(c=e.price)==null?void 0:c.final)==null?void 0:o.amount)==null?void 0:p.currency)??null}}},priceRange:{minimum:{final:{amount:{value:((R=(g=(h=(f=e.priceRange)==null?void 0:f.minimum)==null?void 0:h.final)==null?void 0:g.amount)==null?void 0:R.value)??null,currency:((b=(I=(E=(T=e.priceRange)==null?void 0:T.minimum)==null?void 0:E.final)==null?void 0:I.amount)==null?void 0:b.currency)??null}}},maximum:{final:{amount:{value:((S=(v=(C=(d=e.priceRange)==null?void 0:d.maximum)==null?void 0:C.final)==null?void 0:v.amount)==null?void 0:S.value)??null,currency:((P=(w=(_=(U=e.priceRange)==null?void 0:U.maximum)==null?void 0:_.final)==null?void 0:w.amount)==null?void 0:P.currency)??null}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const a=(n,e)=>{if(!n)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const t=n.items||[];return{unitId:n.unitId,unitName:n.unitName,typeId:n.typeId,unitType:n.typeId,totalProducts:n.totalProducts,primaryProducts:t.length,products:t.map((r,i)=>V(r,i)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},V=(n,e=0)=>{var s;return{productId:Number(e),sku:n.sku,name:n.name,url:n.urlKey,visibility:n.visibility,queryType:n.queryType,rank:Number(e),type:n.itemType,score:0,categories:[],weight:0,image:(s=n.images)==null?void 0:s[0]}};function N(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(n,e){const t=N();t.push({[n]:null}),t.push({[n]:e})}function u(n,e,t){N().push(r=>{const i=r.getState?r.getState(e):{};r.push({event:n,eventInfo:{...i,...t}})})}const y="recommendationsContext",F="recs-unit-impression-render",oe="recs-item-add-to-cart-click",Q="recs-item-click",K="recs-unit-view",j="recs-api-request-sent",B="recs-api-response-received",ie=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);l(y,{units:[s]}),u(F,void 0,{unitId:s.unitId})},me=n=>{const{recommendationUnit:e,productId:t,...s}=n,r=a(e,s);l(y,{units:[r]}),u(Q,void 0,{unitId:r.unitId,productId:t})},ce=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);l(y,{units:[s]}),u(K,void 0,{unitId:s.unitId})},W=()=>{u(j)},X=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);l(y,{units:[s]}),u(B)},ue=async n=>(W(),M(G,{method:"GET",variables:n}).then(({errors:e,data:t})=>{if(e&&e.length>0)return A(e);const s=x(t==null?void 0:t.recommendations,n.recId);return s&&s.length>0&&s.forEach(r=>{X({recommendationUnit:r,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),O.emit("recommendations/data",s),s}));export{oe as R,ce as a,me as b,u as c,y as d,ee as e,ne as f,ue as g,se as h,M as i,re as j,ie as p,te as r,l as s,a as t};
//# sourceMappingURL=getRecommendations.js.map
