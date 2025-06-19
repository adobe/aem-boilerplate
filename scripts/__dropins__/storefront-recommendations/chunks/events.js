/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as N}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:M,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:Q,setFetchGraphQlHeaders:U,fetchGraphQl:C,getConfig:A}=new N().getMethods(),O=r=>{const e=r.map(s=>s.message).join(" ");throw new Error(e)},H=`query GetRecommendations(
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
}`;function L(r){var e,s,n,u,t,m,i,c;return r?{displayOrder:((e=r.results[0])==null?void 0:e.displayOrder)??0,pageType:(s=r.results[0])==null?void 0:s.pageType,title:((n=r.results[0])==null?void 0:n.storefrontLabel)??"",items:$(((u=r.results[0])==null?void 0:u.productsView)??[]),totalProducts:((t=r.results[0])==null?void 0:t.totalProducts)??0,typeId:((m=r.results[0])==null?void 0:m.typeId)??"",unitId:((i=r.results[0])==null?void 0:i.unitId)??"",unitName:((c=r.results[0])==null?void 0:c.unitName)??""}:null}function $(r){return r!=null&&r.length?r.map(e=>{var s,n,u,t,m,i,c,o,y,l,p,f,g,h,a,T,b,R,I,v,P,w,E,k;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((n=(s=e.images)==null?void 0:s[0])==null?void 0:n.url)??"").replace("http://","//")}],price:{final:{amount:{value:((m=(t=(u=e.price)==null?void 0:u.final)==null?void 0:t.amount)==null?void 0:m.value)??null,currency:((o=(c=(i=e.price)==null?void 0:i.final)==null?void 0:c.amount)==null?void 0:o.currency)??null}}},priceRange:{minimum:{final:{amount:{value:((f=(p=(l=(y=e.priceRange)==null?void 0:y.minimum)==null?void 0:l.final)==null?void 0:p.amount)==null?void 0:f.value)??null,currency:((T=(a=(h=(g=e.priceRange)==null?void 0:g.minimum)==null?void 0:h.final)==null?void 0:a.amount)==null?void 0:T.currency)??null}}},maximum:{final:{amount:{value:((v=(I=(R=(b=e.priceRange)==null?void 0:b.maximum)==null?void 0:R.final)==null?void 0:I.amount)==null?void 0:v.value)??null,currency:((k=(E=(w=(P=e.priceRange)==null?void 0:P.maximum)==null?void 0:w.final)==null?void 0:E.amount)==null?void 0:k.currency)??null}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const F=async r=>C(H,{method:"GET",variables:r}).then(({errors:e,data:s})=>{if(e&&e.length>0)return O(e);const n=L(s==null?void 0:s.recommendations);return _.emit("recommendations/data",n),n}),K=(r,e)=>({unitId:r.unitId,unitName:r.unitName,typeId:r.typeId,unitType:r.typeId,totalProducts:r.totalProducts,primaryProducts:r.items.length,products:r.items.map(V),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}),V=(r,e)=>{var n;return{productId:Number(r.uid),sku:r.sku,name:r.name,url:r.urlKey,visibility:r.visibility,queryType:r.queryType,rank:Number(e),type:r.itemType,score:0,categories:[],weight:0,image:(n=r.images)==null?void 0:n[0]}};function S(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function B(r,e){const s=S();s.push({[r]:null}),s.push({[r]:e})}function j(r,e,s){S().push(u=>{const t=u.getState?u.getState(e):{};u.push({event:r,eventInfo:{...t,...s}})})}const W="recommendationsContext",X="recs-unit-impression-render",Y="recs-item-add-to-cart-click",z="recs-unit-view";export{W as R,z as a,X as b,Y as c,M as d,q as e,U as f,F as g,C as h,A as i,j as p,Q as r,B as s,K as t};
//# sourceMappingURL=events.js.map
