/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as N}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:M,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:A,setFetchGraphQlHeaders:Q,fetchGraphQl:C,getConfig:U}=new N().getMethods(),O=r=>{const e=r.map(n=>n.message).join(" ");throw new Error(e)},L=`query GetRecommendations(
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
      displayOrder
      pageType
      productsView {
        __typename
        name
        sku
        queryType
        visibility
        images {
          url
        }
        urlKey
        ... on SimpleProductView {
          price {
            final {
              amount {
                currency
                value
              }
            }
          }
        }
        ... on ComplexProductView {
          priceRange {
            maximum {
              final {
                amount {
                  currency
                  value
                }
              }
            }
            minimum {
              final {
                amount {
                  currency
                  value
                }
              }
            }
          }
        }
      }
      storefrontLabel
      totalProducts
      typeId
      unitId
      unitName
    }
    totalResults
  }
}`;function $(r,e){var u;if(!r||!((u=r.results)!=null&&u.length))return[];const n=e?r.results.filter(s=>s.unitId===e):r.results;return e&&n.length===0&&console.warn(`ProductList: recId "${e}" does not match any recommendation units. Available unitIds: ${r.results.map(s=>s.unitId).join(", ")}`),n.map(s=>({displayOrder:s.displayOrder??0,pageType:s.pageType,title:s.storefrontLabel??"",items:H(s.productsView??[]),totalProducts:s.totalProducts??0,typeId:s.typeId??"",unitId:s.unitId??"",unitName:s.unitName??""}))}function H(r){return r!=null&&r.length?r.map(e=>{var n,t,u,s,m,i,o,c,y,l,p,a,f,g,h,T,b,I,R,v,P,w,E,k;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((t=(n=e.images)==null?void 0:n[0])==null?void 0:t.url)??"").replace("http://","//")}],price:{final:{amount:{value:((m=(s=(u=e.price)==null?void 0:u.final)==null?void 0:s.amount)==null?void 0:m.value)??null,currency:((c=(o=(i=e.price)==null?void 0:i.final)==null?void 0:o.amount)==null?void 0:c.currency)??null}}},priceRange:{minimum:{final:{amount:{value:((a=(p=(l=(y=e.priceRange)==null?void 0:y.minimum)==null?void 0:l.final)==null?void 0:p.amount)==null?void 0:a.value)??null,currency:((T=(h=(g=(f=e.priceRange)==null?void 0:f.minimum)==null?void 0:g.final)==null?void 0:h.amount)==null?void 0:T.currency)??null}}},maximum:{final:{amount:{value:((v=(R=(I=(b=e.priceRange)==null?void 0:b.maximum)==null?void 0:I.final)==null?void 0:R.amount)==null?void 0:v.value)??null,currency:((k=(E=(w=(P=e.priceRange)==null?void 0:P.maximum)==null?void 0:w.final)==null?void 0:E.amount)==null?void 0:k.currency)??null}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const F=async r=>C(L,{method:"GET",variables:r}).then(({errors:e,data:n})=>{if(e&&e.length>0)return O(e);const t=$(n==null?void 0:n.recommendations,r.recId);return _.emit("recommendations/data",t),t}),K=(r,e)=>({unitId:r.unitId,unitName:r.unitName,typeId:r.typeId,unitType:r.typeId,totalProducts:r.totalProducts,primaryProducts:r.items.length,products:r.items.map(V),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}),V=(r,e)=>{var t;return{productId:Number(r.uid),sku:r.sku,name:r.name,url:r.urlKey,visibility:r.visibility,queryType:r.queryType,rank:Number(e),type:r.itemType,score:0,categories:[],weight:0,image:(t=r.images)==null?void 0:t[0]}};function S(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function j(r,e){const n=S();n.push({[r]:null}),n.push({[r]:e})}function B(r,e,n){S().push(u=>{const s=u.getState?u.getState(e):{};u.push({event:r,eventInfo:{...s,...n}})})}const W="recommendationsContext",X="recs-unit-impression-render",Y="recs-item-add-to-cart-click",z="recs-unit-view";export{W as R,z as a,X as b,Y as c,M as d,q as e,Q as f,F as g,C as h,U as i,B as p,A as r,j as s,K as t};
//# sourceMappingURL=events.js.map
