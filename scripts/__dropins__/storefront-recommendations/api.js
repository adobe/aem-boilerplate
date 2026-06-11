/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as $}from"@dropins/tools/event-bus.js";import{RECOMMENDATION_UNIT_FRAGMENT as w}from"./fragments.js";import{Initializer as H,merge as M}from"@dropins/tools/lib.js";import{FetchGraphQL as A}from"@dropins/tools/fetch-graphql.js";const v=new H({init:async n=>{const e={};v.config.setConfig({...e,...n})},listeners:()=>[]}),G=v.config,{setEndpoint:re,setFetchGraphQlHeader:se,removeFetchGraphQlHeader:ie,setFetchGraphQlHeaders:oe,fetchGraphQl:V,getConfig:ce}=new A().getMethods(),a=(n,e)=>{if(!n)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const t=n.items||[];return{unitId:n.unitId,unitName:n.unitName,typeId:n.typeId,unitType:n.typeId,totalProducts:n.totalProducts,primaryProducts:t.length,products:t.map((s,c)=>q(s,c)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},q=(n,e=0)=>{var r;return{productId:Number(e),sku:n.sku,name:n.name,url:n.urlKey,visibility:n.visibility,queryType:n.queryType,rank:Number(e),type:n.itemType,score:0,categories:[],weight:0,image:(r=n.images)==null?void 0:r[0]}};function O(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function y(n,e){const t=O();t.push({[n]:null}),t.push({[n]:e})}function m(n,e,t){O().push(s=>{const c=s.getState?s.getState(e):{};s.push({event:n,eventInfo:{...c,...t}})})}const l="recommendationsContext",B="recs-unit-impression-render",L="recs-item-add-to-cart-click",x="recs-item-click",F="recs-unit-view",Q="recs-api-request-sent",K="recs-api-response-received",ue=n=>{const{productId:e,recommendationUnit:t,...r}=n,s=a(t,r);y(l,{units:[s]}),m(L,void 0,{unitId:s.unitId,productId:e})},Y=n=>{const e=n.map(t=>t.message).join(" ");throw new Error(e)},W=`
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
`,z=`
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
`;function j(n,e){var s,c,o,u;if(!n||!((s=n.results)!=null&&s.length))return[];const r=n.results.map(i=>({displayOrder:i.displayOrder??0,pageType:i.pageType,title:i.storefrontLabel??"",items:X(i.productsView??[]),totalProducts:i.totalProducts??0,typeId:i.typeId??"",unitId:i.unitId??"",unitName:i.unitName??"",userError:i.userError??""}));return M(r,(u=(o=(c=G.getConfig().models)==null?void 0:c.RecommendationUnitModel)==null?void 0:o.transformer)==null?void 0:u.call(o,n))}function X(n){return n!=null&&n.length?n.map(e=>{var t,r,s,c,o,u,i,I,p,f,d,h,R,T,E,g,S,C,_,U,N,b,P,k;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((r=(t=e.images)==null?void 0:t[0])==null?void 0:r.url)??"").replace("http://","//")}],price:{final:{amount:{value:(o=(c=(s=e.price)==null?void 0:s.final)==null?void 0:c.amount)==null?void 0:o.value,currency:(I=(i=(u=e.price)==null?void 0:u.final)==null?void 0:i.amount)==null?void 0:I.currency}}},priceRange:{minimum:{final:{amount:{value:(h=(d=(f=(p=e.priceRange)==null?void 0:p.minimum)==null?void 0:f.final)==null?void 0:d.amount)==null?void 0:h.value,currency:(g=(E=(T=(R=e.priceRange)==null?void 0:R.minimum)==null?void 0:T.final)==null?void 0:E.amount)==null?void 0:g.currency}}},maximum:{final:{amount:{value:(U=(_=(C=(S=e.priceRange)==null?void 0:S.maximum)==null?void 0:C.final)==null?void 0:_.amount)==null?void 0:U.value,currency:(k=(P=(b=(N=e.priceRange)==null?void 0:N.maximum)==null?void 0:b.final)==null?void 0:P.amount)==null?void 0:k.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}const me=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(B,void 0,{unitId:r.unitId})},ae=n=>{const{recommendationUnit:e,productId:t,...r}=n,s=a(e,r);y(l,{units:[s]}),m(x,void 0,{unitId:s.unitId,productId:t})},ye=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(F,void 0,{unitId:r.unitId})},J=()=>{m(Q)},Z=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(K)},le=async n=>{J();const{currentProduct:e,...t}=n,r=(e==null?void 0:e.price)!=null;return V(r?z:W,{method:"GET",variables:r?n:t}).then(({errors:o,data:u})=>{if(o&&o.length>0)return Y(o);const i=j(u==null?void 0:u.recommendationsByUnitIds);return i&&i.length>0&&i.forEach(I=>{Z({recommendationUnit:I,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),$.emit("recommendations/data",i),i})};export{ye as a,ae as b,G as config,V as fetchGraphQl,ce as getConfig,le as getRecommendationsByUnitIds,v as initialize,me as p,ue as publishRecsItemAddToCartClick,ie as removeFetchGraphQlHeader,re as setEndpoint,se as setFetchGraphQlHeader,oe as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
