/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{Initializer as fe,merge as ce}from"@dropins/tools/lib.js";import{FetchGraphQL as me}from"@dropins/tools/fetch-graphql.js";const ie=new fe({init:async e=>{const o={};ie.config.setConfig({...o,...e})},listeners:()=>[]}),le=ie.config,{setEndpoint:Ge,setFetchGraphQlHeader:Ke,removeFetchGraphQlHeader:Ve,setFetchGraphQlHeaders:Me,getFetchGraphQlHeader:Be,fetchGraphQl:he,getConfig:Xe}=new me().getMethods(),y=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,ye=e=>{var n,t,r,c,u,l,s,i,g,p,C,m,b,w,I,P,E,x,k,T,D,U,A,a,F,L,$,H,N,O,z,Q,G,K,V,M,B,X,q,W,Y,j,J,Z,d,ee,ne,re,_,oe;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],attributes:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],attributes:((n=e==null?void 0:e.attributes)==null?void 0:n.map(f=>({label:f.label||"",name:f.name||"",roles:f.roles||[],value:f.value??null})))||[],images:((t=e==null?void 0:e.images)==null?void 0:t.map(f=>{var te;return{label:f.label||"",roles:f.roles||[],url:((te=f.url)==null?void 0:te.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((u=(c=(r=e==null?void 0:e.price)==null?void 0:r.final)==null?void 0:c.amount)==null?void 0:u.value)||0,currency:y((i=(s=(l=e==null?void 0:e.price)==null?void 0:l.final)==null?void 0:s.amount)==null?void 0:i.currency)}},regular:{amount:{value:((C=(p=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:p.amount)==null?void 0:C.value)||0,currency:y((w=(b=(m=e==null?void 0:e.price)==null?void 0:m.regular)==null?void 0:b.amount)==null?void 0:w.currency)}},roles:((I=e==null?void 0:e.price)==null?void 0:I.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((k=(x=(E=(P=e==null?void 0:e.priceRange)==null?void 0:P.minimum)==null?void 0:E.final)==null?void 0:x.amount)==null?void 0:k.value)||0,currency:y((A=(U=(D=(T=e==null?void 0:e.priceRange)==null?void 0:T.minimum)==null?void 0:D.final)==null?void 0:U.amount)==null?void 0:A.currency)}},regular:{amount:{value:(($=(L=(F=(a=e==null?void 0:e.priceRange)==null?void 0:a.minimum)==null?void 0:F.regular)==null?void 0:L.amount)==null?void 0:$.value)||0,currency:y((z=(O=(N=(H=e==null?void 0:e.priceRange)==null?void 0:H.minimum)==null?void 0:N.regular)==null?void 0:O.amount)==null?void 0:z.currency)}}},maximum:{final:{amount:{value:((V=(K=(G=(Q=e==null?void 0:e.priceRange)==null?void 0:Q.maximum)==null?void 0:G.final)==null?void 0:K.amount)==null?void 0:V.value)||0,currency:y((q=(X=(B=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:B.final)==null?void 0:X.amount)==null?void 0:q.currency)}},regular:{amount:{value:((J=(j=(Y=(W=e==null?void 0:e.priceRange)==null?void 0:W.maximum)==null?void 0:Y.regular)==null?void 0:j.amount)==null?void 0:J.value)||0,currency:y((ne=(ee=(d=(Z=e==null?void 0:e.priceRange)==null?void 0:Z.maximum)==null?void 0:d.regular)==null?void 0:ee.amount)==null?void 0:ne.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ce(o,(oe=(_=(re=le.getConfig().models)==null?void 0:re.Product)==null?void 0:_.transformer)==null?void 0:oe.call(_,e))};function Ce(e,o){var r,c,u,l,s,i,g,p,C;const n=e==null?void 0:e.productSearch,t={facets:Se((n==null?void 0:n.facets)||[],o),items:(n==null?void 0:n.items.map(m=>ye(m==null?void 0:m.productView)))||[],pageInfo:{currentPage:((r=n==null?void 0:n.page_info)==null?void 0:r.current_page)||1,totalPages:((c=n==null?void 0:n.page_info)==null?void 0:c.total_pages)||1,totalItems:((u=n==null?void 0:n.page_info)==null?void 0:u.total_items)||0,pageSize:((l=n==null?void 0:n.page_info)==null?void 0:l.page_size)||10},totalCount:(n==null?void 0:n.total_count)||0,metadata:{filterableAttributes:((s=e==null?void 0:e.attributeMetadata)==null?void 0:s.filterableInSearch)||[],sortableAttributes:Re(((i=e==null?void 0:e.attributeMetadata)==null?void 0:i.sortable)||[],o)}};return ce(t,(C=(p=(g=le.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:p.transformer)==null?void 0:C.call(p,e))}function Re(e=[],o){return!e||e.length===0?[]:e.filter(n=>{var t;return n.attribute==="position"?(t=o==null?void 0:o.filter)==null?void 0:t.some(c=>c.attribute==="categoryPath"):!0}).map(n=>({...n,bidirectional:n.attribute==="price"}))}function Se(e=[],o){var t;return!e||e.length===0?[]:((t=o==null?void 0:o.filter)==null?void 0:t.some(r=>r.attribute==="categoryPath"))?e.filter(r=>r.attribute!=="categories"):e}const _e=`
  fragment Facet on Aggregation {
    title
    attribute
    buckets {
      title
      __typename
      ... on CategoryView {
        name
        count
        path
      }
      ... on ScalarBucket {
        count
      }
      ... on RangeBucket {
        from
        to
        count
      }
      ... on StatsBucket {
        min
        max
      }
    }
  }
`,ve=`
  fragment ProductView on ProductSearchItem {
    productView {
      __typename
      sku
      name
      inStock
      url
      urlKey
      attributes(roles: []) {
        name
        label
        value
        roles
      }
      images {
        label
        url
        roles
      }
      ... on ComplexProductView {
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
          }
        }
        options {
          id
          title
          values {
            title
            ... on ProductViewOptionValueSwatch {
              id
              inStock
              type
              value
            }
          }
        }
      }
      ... on SimpleProductView {
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
        }
      }
    }
    highlights {
      attribute
      value
      matched_words
    }
  }
`,be=`
  query productSearch(
    $phrase: String!
    $pageSize: Int
    $currentPage: Int = 1
    $filter: [SearchClauseInput!]
    $sort: [ProductSearchSortInput!]
    $context: QueryContextInput
  ) {
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
      filterableInSearch {
        label
        attribute
        numeric
      }
    }

    productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
      filter: $filter
      sort: $sort
      context: $context
    ) {
      total_count
      items {
        ...ProductView
      }
      facets {
        ...Facet
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
  ${ve}
  ${_e}
`,se="searchInputContext",ue="searchResultsContext",we="livesearch-plp",Ie="livesearch-popover",Pe="search-product-click",Ee="search-request-sent",xe="search-response-received",ke="search-results-view",Te="category-results-view",De="channelContext";function R(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function pe(e){const o=R();return o.getState?o.getState(e):{}}function v(e,o){const n=R();n.push({[e]:null}),n.push({[e]:o})}function Ue(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function ge(){v(De,Ue())}function S(e,o){R().push(t=>{const r=t.getState?t.getState():{};t.push({event:e,eventInfo:{...r,...o}})})}const Ae=e=>{ge(),S(Ee,{searchUnitId:e})},ae=e=>{ge(),S(xe,{searchUnitId:e})},qe=e=>{S(Te,{searchUnitId:e})},We=e=>{S(ke,{searchUnitId:e})},Ye=(e,o)=>{S(Pe,{sku:e,searchUnitId:o})},Fe=(e,o,n,t,r,c,u)=>{if(!R)return;const s=pe(se)||{};s!=null&&s.units||(s.units=[]);const i={searchUnitId:e,searchRequestId:o,queryTypes:["products","suggestions"],phrase:n,pageSize:r,currentPage:c,filter:t,sort:u},g=s.units.findIndex(p=>p.searchUnitId===e);g<0?s.units.push(i):s.units[g]=i,v(se,s)},Le=(e,o,n)=>{var l,s;if(!R)return;const r=pe(ue)||{};r!=null&&r.units||(r.units=[]);const c=r.units.findIndex(i=>i.searchUnitId===e),u={searchUnitId:e,searchRequestId:o,products:$e(n.items),categories:[],suggestions:He(n.suggestions),page:((l=n==null?void 0:n.pageInfo)==null?void 0:l.currentPage)||1,perPage:((s=n==null?void 0:n.pageInfo)==null?void 0:s.pageSize)||20,facets:Ne(n.facets)};c<0?r.units.push(u):r.units[c]=u,v(ue,r)},$e=e=>e?e.map((n,t)=>{var r,c,u,l,s,i,g,p;return{name:n==null?void 0:n.name,sku:n==null?void 0:n.sku,url:(n==null?void 0:n.url)??"",imageUrl:((r=n==null?void 0:n.images[0])==null?void 0:r.url)??"",price:((l=(u=(c=n==null?void 0:n.price)==null?void 0:c.final)==null?void 0:u.amount)==null?void 0:l.value)??((p=(g=(i=(s=n==null?void 0:n.priceRange)==null?void 0:s.minimum)==null?void 0:i.regular)==null?void 0:g.amount)==null?void 0:p.value),rank:t}}):[],He=e=>e?e.map((n,t)=>({suggestion:n,rank:t})):[],Ne=e=>e?e.map(n=>({attribute:n==null?void 0:n.attribute,title:n==null?void 0:n.title,type:(n==null?void 0:n.type)||"PINNED",buckets:n==null?void 0:n.buckets.map(t=>t)})):[],je=async(e,o={})=>{const n=o.scope==="search"?void 0:o.scope,t={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return h.emit("search/result",t,{scope:n}),t.result;h.emit("search/loading",!0,{scope:n});try{const r=n==="popover"?Ie:we,c=window.crypto.randomUUID(),u={...e,phrase:e.phrase??"",currentPage:e.currentPage??1,sort:e.sort??[],filter:e.filter??[]};Fe(r,c,u.phrase||"",u.filter||[],u.pageSize||0,u.currentPage||0,u.sort||[]),Ae(r);const{errors:l,data:s}=await he(be,{method:"GET",variables:{...u}});if(l&&!s)throw new Error("Error fetching product search");const i=Ce(s,u);return Le(r,c,i),ae(r),h.emit("search/result",{request:u,result:i},{scope:n}),i}catch(r){throw h.emit("search/error",r.message,{scope:n}),h.emit("search/result",t,{scope:n}),r}finally{h.emit("search/loading",!1,{scope:n})}};export{_e as F,ve as P,Ie as S,Ye as a,we as b,qe as c,le as config,he as fetchGraphQl,Xe as getConfig,Be as getFetchGraphQlHeader,ie as initialize,Ve as removeFetchGraphQlHeader,We as s,je as search,Ge as setEndpoint,Ke as setFetchGraphQlHeader,Me as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
