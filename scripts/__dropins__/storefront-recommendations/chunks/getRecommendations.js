/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as b}from"@dropins/tools/event-bus.js";import{FetchGraphQL as E}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:N,setFetchGraphQlHeader:O,removeFetchGraphQlHeader:d,setFetchGraphQlHeaders:q,fetchGraphQl:G,getConfig:M}=new E().getMethods(),I=r=>{const e=r.map(n=>n.message).join(" ");throw new Error(e)},V=`query GetRecommendations(
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
}`;function x(r){var e,n,i,t,a,u,s,l;return r?{displayOrder:((e=r.results[0])==null?void 0:e.displayOrder)??0,pageType:(n=r.results[0])==null?void 0:n.pageType,title:((i=r.results[0])==null?void 0:i.storefrontLabel)??"",items:Q(((t=r.results[0])==null?void 0:t.productsView)??[]),totalProducts:((a=r.results[0])==null?void 0:a.totalProducts)??0,typeId:((u=r.results[0])==null?void 0:u.typeId)??"",unitId:((s=r.results[0])==null?void 0:s.unitId)??"",unitName:((l=r.results[0])==null?void 0:l.unitName)??""}:null}function Q(r){return r!=null&&r.length?r.map(e=>{var n,i,t,a,u,s,l,m,o,c,y,p,g,f,h,v,T,R,w,H,k,P,S,$;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((i=(n=e.images)==null?void 0:n[0])==null?void 0:i.url)??"").replace("http://","//")}],price:{final:{amount:{value:((u=(a=(t=e.price)==null?void 0:t.final)==null?void 0:a.amount)==null?void 0:u.value)??null,currency:((m=(l=(s=e.price)==null?void 0:s.final)==null?void 0:l.amount)==null?void 0:m.currency)??null}}},priceRange:{minimum:{final:{amount:{value:((p=(y=(c=(o=e.priceRange)==null?void 0:o.minimum)==null?void 0:c.final)==null?void 0:y.amount)==null?void 0:p.value)??null,currency:((v=(h=(f=(g=e.priceRange)==null?void 0:g.minimum)==null?void 0:f.final)==null?void 0:h.amount)==null?void 0:v.currency)??null}}},maximum:{final:{amount:{value:((H=(w=(R=(T=e.priceRange)==null?void 0:T.maximum)==null?void 0:R.final)==null?void 0:w.amount)==null?void 0:H.value)??null,currency:(($=(S=(P=(k=e.priceRange)==null?void 0:k.maximum)==null?void 0:P.final)==null?void 0:S.amount)==null?void 0:$.currency)??null}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const C=async r=>G(V,{method:"GET",variables:r}).then(({errors:e,data:n})=>{if(e&&e.length>0)return I(e);const i=x(n==null?void 0:n.recommendations);return b.emit("recommendations/data",i),i});export{O as a,q as b,C as c,G as f,M as g,d as r,N as s};
//# sourceMappingURL=getRecommendations.js.map
