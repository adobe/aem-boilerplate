/*! Copyright 2026 Adobe
All Rights Reserved. */
import{RECOMMENDATION_UNIT_FRAGMENT as w}from"../fragments.js";import{events as $}from"@dropins/tools/event-bus.js";import{merge as v}from"@dropins/tools/lib.js";import{c as H}from"./initialize.js";import{FetchGraphQL as M}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:te,setFetchGraphQlHeader:ne,removeFetchGraphQlHeader:re,setFetchGraphQlHeaders:se,fetchGraphQl:A,getConfig:oe}=new M().getMethods(),y=(t,e)=>{if(!t)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const n=t.items||[];return{unitId:t.unitId,unitName:t.unitName,typeId:t.typeId,unitType:t.typeId,totalProducts:t.totalProducts,primaryProducts:n.length,products:n.map((o,c)=>G(o,c)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},G=(t,e=0)=>{var r;return{productId:Number(e),sku:t.sku,name:t.name,url:t.urlKey,visibility:t.visibility,queryType:t.queryType,rank:Number(e),type:t.itemType,score:0,categories:[],weight:0,image:(r=t.images)==null?void 0:r[0]}};function O(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(t,e){const n=O();n.push({[t]:null}),n.push({[t]:e})}function m(t,e,n){O().push(o=>{const c=o.getState?o.getState(e):{};o.push({event:t,eventInfo:{...c,...n}})})}const p="recommendationsContext",V="recs-unit-impression-render",ie="recs-item-add-to-cart-click",q="recs-item-click",B="recs-unit-view",L="recs-api-request-sent",x="recs-api-response-received",F=t=>{const e=t.map(n=>n.message).join(" ");throw new Error(e)},Q=`
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

  ${w}
`,K=`
  query GetRecommendationsByUnitIdsWithCurrentProduct(
    $unitIds: [String!]!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
    $currentProduct: CurrentProductInput
  ) {
    recommendationsByUnitIds(
      unitIds: $unitIds
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
      currentProduct: $currentProduct
    ) {
      results {
        ...RECOMMENDATION_UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${w}
`;function Y(t,e){var o,c,i,u;if(!t||!((o=t.results)!=null&&o.length))return[];const r=t.results.map(s=>({displayOrder:s.displayOrder??0,pageType:s.pageType,title:s.storefrontLabel??"",items:W(s.productsView??[]),totalProducts:s.totalProducts??0,typeId:s.typeId??"",unitId:s.unitId??"",unitName:s.unitName??""}));return v(r,(u=(i=(c=H.getConfig().models)==null?void 0:c.RecommendationUnitModel)==null?void 0:i.transformer)==null?void 0:u.call(i,t))}function W(t){return t!=null&&t.length?t.map(e=>{var n,r,o,c,i,u,s,a,I,f,h,R,T,E,g,d,S,_,U,C,N,b,P,k;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((r=(n=e.images)==null?void 0:n[0])==null?void 0:r.url)??"").replace("http://","//")}],price:{final:{amount:{value:(i=(c=(o=e.price)==null?void 0:o.final)==null?void 0:c.amount)==null?void 0:i.value,currency:(a=(s=(u=e.price)==null?void 0:u.final)==null?void 0:s.amount)==null?void 0:a.currency}}},priceRange:{minimum:{final:{amount:{value:(R=(h=(f=(I=e.priceRange)==null?void 0:I.minimum)==null?void 0:f.final)==null?void 0:h.amount)==null?void 0:R.value,currency:(d=(g=(E=(T=e.priceRange)==null?void 0:T.minimum)==null?void 0:E.final)==null?void 0:g.amount)==null?void 0:d.currency}}},maximum:{final:{amount:{value:(C=(U=(_=(S=e.priceRange)==null?void 0:S.maximum)==null?void 0:_.final)==null?void 0:U.amount)==null?void 0:C.value,currency:(k=(P=(b=(N=e.priceRange)==null?void 0:N.maximum)==null?void 0:b.final)==null?void 0:P.amount)==null?void 0:k.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}const ce=t=>{const{recommendationUnit:e,...n}=t,r=y(e,n);l(p,{units:[r]}),m(V,void 0,{unitId:r.unitId})},ue=t=>{const{recommendationUnit:e,productId:n,...r}=t,o=y(e,r);l(p,{units:[o]}),m(q,void 0,{unitId:o.unitId,productId:n})},me=t=>{const{recommendationUnit:e,...n}=t,r=y(e,n);l(p,{units:[r]}),m(B,void 0,{unitId:r.unitId})},j=()=>{m(L)},X=t=>{const{recommendationUnit:e,...n}=t,r=y(e,n);l(p,{units:[r]}),m(x)},ae=async t=>{j();const{currentProduct:e,...n}=t,r=(e==null?void 0:e.price)!=null;return A(r?K:Q,{method:"GET",variables:r?t:n}).then(({errors:i,data:u})=>{if(i&&i.length>0)return F(i);const s=Y(u==null?void 0:u.recommendationsByUnitIds);return s&&s.length>0&&s.forEach(a=>{X({recommendationUnit:a,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),$.emit("recommendations/data",s),s})};export{ie as R,me as a,ue as b,m as c,p as d,te as e,ne as f,ae as g,se as h,A as i,oe as j,ce as p,re as r,l as s,y as t};
//# sourceMappingURL=getRecommendationsByUnitIds.js.map
