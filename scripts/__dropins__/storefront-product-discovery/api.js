/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{Initializer as fe,merge as ue}from"@dropins/tools/lib.js";import{ProductView as me,Facet as he}from"./fragments.js";import{FetchGraphQL as ye}from"@dropins/tools/fetch-graphql.js";const ie=new fe({init:async e=>{const o={};ie.config.setConfig({...o,...e})},listeners:()=>[]}),le=ie.config,{setEndpoint:Me,setFetchGraphQlHeader:Xe,removeFetchGraphQlHeader:qe,setFetchGraphQlHeaders:We,getFetchGraphQlHeader:Ye,fetchGraphQl:Ce,getConfig:je}=new ye().getMethods(),y=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,Re=e=>{var n,s,r,u,c,l,t,i,g,p,C,m,b,v,E,P,w,x,T,D,k,U,A,L,$,F,H,N,z,O,Q,G,K,M,X,q,W,Y,j,B,J,V,Z,a,d,ee,ne,re,I,oe;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],attributes:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],attributes:((n=e==null?void 0:e.attributes)==null?void 0:n.map(f=>({label:f.label||"",name:f.name||"",roles:f.roles||[],value:f.value??null})))||[],images:((s=e==null?void 0:e.images)==null?void 0:s.map(f=>{var se;return{label:f.label||"",roles:f.roles||[],url:((se=f.url)==null?void 0:se.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((c=(u=(r=e==null?void 0:e.price)==null?void 0:r.final)==null?void 0:u.amount)==null?void 0:c.value)||0,currency:y((i=(t=(l=e==null?void 0:e.price)==null?void 0:l.final)==null?void 0:t.amount)==null?void 0:i.currency)}},regular:{amount:{value:((C=(p=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:p.amount)==null?void 0:C.value)||0,currency:y((v=(b=(m=e==null?void 0:e.price)==null?void 0:m.regular)==null?void 0:b.amount)==null?void 0:v.currency)}},roles:((E=e==null?void 0:e.price)==null?void 0:E.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((T=(x=(w=(P=e==null?void 0:e.priceRange)==null?void 0:P.minimum)==null?void 0:w.final)==null?void 0:x.amount)==null?void 0:T.value)||0,currency:y((A=(U=(k=(D=e==null?void 0:e.priceRange)==null?void 0:D.minimum)==null?void 0:k.final)==null?void 0:U.amount)==null?void 0:A.currency)}},regular:{amount:{value:((H=(F=($=(L=e==null?void 0:e.priceRange)==null?void 0:L.minimum)==null?void 0:$.regular)==null?void 0:F.amount)==null?void 0:H.value)||0,currency:y((Q=(O=(z=(N=e==null?void 0:e.priceRange)==null?void 0:N.minimum)==null?void 0:z.regular)==null?void 0:O.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((X=(M=(K=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:K.final)==null?void 0:M.amount)==null?void 0:X.value)||0,currency:y((j=(Y=(W=(q=e==null?void 0:e.priceRange)==null?void 0:q.maximum)==null?void 0:W.final)==null?void 0:Y.amount)==null?void 0:j.currency)}},regular:{amount:{value:((Z=(V=(J=(B=e==null?void 0:e.priceRange)==null?void 0:B.maximum)==null?void 0:J.regular)==null?void 0:V.amount)==null?void 0:Z.value)||0,currency:y((ne=(ee=(d=(a=e==null?void 0:e.priceRange)==null?void 0:a.maximum)==null?void 0:d.regular)==null?void 0:ee.amount)==null?void 0:ne.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ue(o,(oe=(I=(re=le.getConfig().models)==null?void 0:re.Product)==null?void 0:I.transformer)==null?void 0:oe.call(I,e))};function _e(e,o){var r,u,c,l,t,i,g,p,C;const n=e==null?void 0:e.productSearch,s={facets:Se((n==null?void 0:n.facets)||[],o),items:(n==null?void 0:n.items.map(m=>Re(m==null?void 0:m.productView)))||[],pageInfo:{currentPage:((r=n==null?void 0:n.page_info)==null?void 0:r.current_page)||1,totalPages:((u=n==null?void 0:n.page_info)==null?void 0:u.total_pages)||1,totalItems:((c=n==null?void 0:n.page_info)==null?void 0:c.total_items)||0,pageSize:((l=n==null?void 0:n.page_info)==null?void 0:l.page_size)||10},totalCount:(n==null?void 0:n.total_count)||0,metadata:{filterableAttributes:((t=e==null?void 0:e.attributeMetadata)==null?void 0:t.filterableInSearch)||[],sortableAttributes:Ie(((i=e==null?void 0:e.attributeMetadata)==null?void 0:i.sortable)||[],o)}};return ue(s,(C=(p=(g=le.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:p.transformer)==null?void 0:C.call(p,e))}function Ie(e=[],o){return!e||e.length===0?[]:e.filter(n=>{var s;return n.attribute==="position"?(s=o==null?void 0:o.filter)==null?void 0:s.some(u=>u.attribute==="categoryPath"):!0}).map(n=>({...n,bidirectional:n.attribute==="price"}))}function Se(e=[],o){var s;return!e||e.length===0?[]:((s=o==null?void 0:o.filter)==null?void 0:s.some(r=>r.attribute==="categoryPath"))?e.filter(r=>r.attribute!=="categories"):e}const be=`
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
  ${me}
  ${he}
`,te="searchInputContext",ce="searchResultsContext",ve="livesearch-plp",Ee="livesearch-popover",Pe="search-product-click",we="search-request-sent",xe="search-response-received",Te="search-results-view",De="category-results-view",ke="channelContext";function R(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function pe(e){const o=R();return o.getState?o.getState(e):{}}function S(e,o){const n=R();n.push({[e]:null}),n.push({[e]:o})}function Ue(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function ge(){S(ke,Ue())}function _(e,o){R().push(s=>{const r=s.getState?s.getState():{};s.push({event:e,eventInfo:{...r,...o}})})}const Ae=e=>{ge(),_(we,{searchUnitId:e})},Le=e=>{ge(),_(xe,{searchUnitId:e})},Be=e=>{_(De,{searchUnitId:e})},Je=e=>{_(Te,{searchUnitId:e})},Ve=(e,o)=>{_(Pe,{sku:e,searchUnitId:o})},$e=(e,o,n,s,r,u,c)=>{if(!R)return;const t=pe(te)||{};t!=null&&t.units||(t.units=[]);const i={searchUnitId:e,searchRequestId:o,queryTypes:["products","suggestions"],phrase:n,pageSize:r,currentPage:u,filter:s,sort:c},g=t.units.findIndex(p=>p.searchUnitId===e);g<0?t.units.push(i):t.units[g]=i,S(te,t)},Fe=(e,o,n)=>{var l,t;if(!R)return;const r=pe(ce)||{};r!=null&&r.units||(r.units=[]);const u=r.units.findIndex(i=>i.searchUnitId===e),c={searchUnitId:e,searchRequestId:o,products:He(n.items),categories:[],suggestions:Ne(n.suggestions),page:((l=n==null?void 0:n.pageInfo)==null?void 0:l.currentPage)||1,perPage:((t=n==null?void 0:n.pageInfo)==null?void 0:t.pageSize)||20,facets:ze(n.facets)};u<0?r.units.push(c):r.units[u]=c,S(ce,r)},He=e=>e?e.map((n,s)=>{var r,u,c,l,t,i,g,p;return{name:n==null?void 0:n.name,sku:n==null?void 0:n.sku,url:(n==null?void 0:n.url)??"",imageUrl:((r=n==null?void 0:n.images[0])==null?void 0:r.url)??"",price:((l=(c=(u=n==null?void 0:n.price)==null?void 0:u.final)==null?void 0:c.amount)==null?void 0:l.value)??((p=(g=(i=(t=n==null?void 0:n.priceRange)==null?void 0:t.minimum)==null?void 0:i.regular)==null?void 0:g.amount)==null?void 0:p.value),rank:s}}):[],Ne=e=>e?e.map((n,s)=>({suggestion:n,rank:s})):[],ze=e=>e?e.map(n=>({attribute:n==null?void 0:n.attribute,title:n==null?void 0:n.title,type:(n==null?void 0:n.type)||"PINNED",buckets:n==null?void 0:n.buckets.map(s=>s)})):[],Ze=async(e,o={})=>{const n=o.scope==="search"?void 0:o.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return h.emit("search/result",s,{scope:n}),s.result;h.emit("search/loading",!0,{scope:n});try{const r=n==="popover"?Ee:ve,u=window.crypto.randomUUID(),c={...e,phrase:e.phrase??"",currentPage:e.currentPage??1,sort:e.sort??[],filter:e.filter??[]};$e(r,u,c.phrase||"",c.filter||[],c.pageSize||0,c.currentPage||0,c.sort||[]),Ae(r);const{errors:l,data:t}=await Ce(be,{method:"GET",variables:{...c}});if(l&&!t)throw new Error("Error fetching product search");const i=_e(t,c);return Fe(r,u,i),Le(r),h.emit("search/result",{request:c,result:i},{scope:n}),i}catch(r){throw h.emit("search/error",r.message,{scope:n}),h.emit("search/result",s,{scope:n}),r}finally{h.emit("search/loading",!1,{scope:n})}};export{ve as P,Ee as S,Ve as a,Be as c,le as config,Ce as fetchGraphQl,je as getConfig,Ye as getFetchGraphQlHeader,ie as initialize,qe as removeFetchGraphQlHeader,Je as s,Ze as search,Me as setEndpoint,Xe as setFetchGraphQlHeader,We as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
