/*! Copyright 2026 Adobe
All Rights Reserved. */
import{RECOMMENDATION_UNIT_FRAGMENT as P}from"../fragments.js";import{events as k}from"@dropins/tools/event-bus.js";import{merge as M}from"@dropins/tools/lib.js";import{c as A}from"./initialize.js";import{FetchGraphQL as H}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ee,setFetchGraphQlHeader:ne,removeFetchGraphQlHeader:te,setFetchGraphQlHeaders:se,fetchGraphQl:L,getConfig:re}=new H().getMethods(),a=(n,e)=>{if(!n)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const t=n.items||[];return{unitId:n.unitId,unitName:n.unitName,typeId:n.typeId,unitType:n.typeId,totalProducts:n.totalProducts,primaryProducts:t.length,products:t.map((r,i)=>$(r,i)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},$=(n,e=0)=>{var s;return{productId:Number(e),sku:n.sku,name:n.name,url:n.urlKey,visibility:n.visibility,queryType:n.queryType,rank:Number(e),type:n.itemType,score:0,categories:[],weight:0,image:(s=n.images)==null?void 0:s[0]}};function O(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function y(n,e){const t=O();t.push({[n]:null}),t.push({[n]:e})}function u(n,e,t){O().push(r=>{const i=r.getState?r.getState(e):{};r.push({event:n,eventInfo:{...i,...t}})})}const p="recommendationsContext",G="recs-unit-impression-render",oe="recs-item-add-to-cart-click",x="recs-item-click",q="recs-unit-view",B="recs-api-request-sent",V="recs-api-response-received",F=n=>{const e=n.map(t=>t.message).join(" ");throw new Error(e)},Q=`
  query GetRecommendationsByUnitIds(
    $unitIds: [String!]!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendationsByUnitIds(
      unitIds: $unitIds
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        ...RECOMMENDATION_UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${P}
`;function K(n,e){var r,i,m,c;if(!n||!((r=n.results)!=null&&r.length))return[];const s=n.results.map(o=>({displayOrder:o.displayOrder??0,pageType:o.pageType,title:o.storefrontLabel??"",items:j(o.productsView??[]),totalProducts:o.totalProducts??0,typeId:o.typeId??"",unitId:o.unitId??"",unitName:o.unitName??""}));return M(s,(c=(m=(i=A.getConfig().models)==null?void 0:i.RecommendationUnitModel)==null?void 0:m.transformer)==null?void 0:c.call(m,n))}function j(n){return n!=null&&n.length?n.map(e=>{var t,s,r,i,m,c,o,f,l,h,I,R,T,E,g,d,b,U,_,C,N,S,v,w;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((s=(t=e.images)==null?void 0:t[0])==null?void 0:s.url)??"").replace("http://","//")}],price:{final:{amount:{value:(m=(i=(r=e.price)==null?void 0:r.final)==null?void 0:i.amount)==null?void 0:m.value,currency:(f=(o=(c=e.price)==null?void 0:c.final)==null?void 0:o.amount)==null?void 0:f.currency}}},priceRange:{minimum:{final:{amount:{value:(R=(I=(h=(l=e.priceRange)==null?void 0:l.minimum)==null?void 0:h.final)==null?void 0:I.amount)==null?void 0:R.value,currency:(d=(g=(E=(T=e.priceRange)==null?void 0:T.minimum)==null?void 0:E.final)==null?void 0:g.amount)==null?void 0:d.currency}}},maximum:{final:{amount:{value:(C=(_=(U=(b=e.priceRange)==null?void 0:b.maximum)==null?void 0:U.final)==null?void 0:_.amount)==null?void 0:C.value,currency:(w=(v=(S=(N=e.priceRange)==null?void 0:N.maximum)==null?void 0:S.final)==null?void 0:v.amount)==null?void 0:w.currency}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const ie=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);y(p,{units:[s]}),u(G,void 0,{unitId:s.unitId})},me=n=>{const{recommendationUnit:e,productId:t,...s}=n,r=a(e,s);y(p,{units:[r]}),u(x,void 0,{unitId:r.unitId,productId:t})},ce=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);y(p,{units:[s]}),u(q,void 0,{unitId:s.unitId})},Y=()=>{u(B)},W=n=>{const{recommendationUnit:e,...t}=n,s=a(e,t);y(p,{units:[s]}),u(V)},ue=async n=>(Y(),L(Q,{method:"GET",variables:n}).then(({errors:e,data:t})=>{if(e&&e.length>0)return F(e);const s=K(t==null?void 0:t.recommendationsByUnitIds);return s&&s.length>0&&s.forEach(r=>{W({recommendationUnit:r,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),k.emit("recommendations/data",s),s}));export{oe as R,ce as a,me as b,u as c,p as d,ee as e,ne as f,ue as g,se as h,L as i,re as j,ie as p,te as r,y as s,a as t};
//# sourceMappingURL=getRecommendationsByUnitIds.js.map
