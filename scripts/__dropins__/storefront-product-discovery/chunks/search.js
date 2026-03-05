/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as g}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as se,P as ue,u as te,s as le,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:Se,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:ke,getFetchGraphQlHeader:Fe,fetchGraphQl:ge,getConfig:De}=new pe().getMethods(),f=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,fe=e=>{var r,o,n,u,s,c,l,t,h,m,y,p,_,v,I,C,w,b,S,x,$,k,F,D,T,z,A,Q,U,E,G,H,K,O,M,L,N,Y,j,q,B,J,W,X,Z,V,a,P,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const i={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(R=>{var ee;return{label:R.label||"",roles:R.roles||[],url:((ee=R.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((u=(n=(o=e==null?void 0:e.price)==null?void 0:o.final)==null?void 0:n.amount)==null?void 0:u.value)||0,currency:f((l=(c=(s=e==null?void 0:e.price)==null?void 0:s.final)==null?void 0:c.amount)==null?void 0:l.currency)}},regular:{amount:{value:((m=(h=(t=e==null?void 0:e.price)==null?void 0:t.regular)==null?void 0:h.amount)==null?void 0:m.value)||0,currency:f((_=(p=(y=e==null?void 0:e.price)==null?void 0:y.regular)==null?void 0:p.amount)==null?void 0:_.currency)}},roles:((v=e==null?void 0:e.price)==null?void 0:v.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((b=(w=(C=(I=e==null?void 0:e.priceRange)==null?void 0:I.minimum)==null?void 0:C.final)==null?void 0:w.amount)==null?void 0:b.value)||0,currency:f((k=($=(x=(S=e==null?void 0:e.priceRange)==null?void 0:S.minimum)==null?void 0:x.final)==null?void 0:$.amount)==null?void 0:k.currency)}},regular:{amount:{value:((z=(T=(D=(F=e==null?void 0:e.priceRange)==null?void 0:F.minimum)==null?void 0:D.regular)==null?void 0:T.amount)==null?void 0:z.value)||0,currency:f((E=(U=(Q=(A=e==null?void 0:e.priceRange)==null?void 0:A.minimum)==null?void 0:Q.regular)==null?void 0:U.amount)==null?void 0:E.currency)}}},maximum:{final:{amount:{value:((O=(K=(H=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:H.final)==null?void 0:K.amount)==null?void 0:O.value)||0,currency:f((Y=(N=(L=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:L.final)==null?void 0:N.amount)==null?void 0:Y.currency)}},regular:{amount:{value:((J=(B=(q=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:q.regular)==null?void 0:B.amount)==null?void 0:J.value)||0,currency:f((V=(Z=(X=(W=e==null?void 0:e.priceRange)==null?void 0:W.maximum)==null?void 0:X.regular)==null?void 0:Z.amount)==null?void 0:V.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(i,(d=(P=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:P.transformer)==null?void 0:d.call(P,e))};function he(e,i){var n,u,s,c,l,t,h,m,y;const r=e==null?void 0:e.productSearch,o={facets:Pe((r==null?void 0:r.facets)||[],i),items:(r==null?void 0:r.items.map(p=>fe(p==null?void 0:p.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((u=r==null?void 0:r.page_info)==null?void 0:u.total_pages)||1,totalItems:((s=r==null?void 0:r.page_info)==null?void 0:s.total_items)||0,pageSize:((c=r==null?void 0:r.page_info)==null?void 0:c.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((l=e==null?void 0:e.attributeMetadata)==null?void 0:l.filterableInSearch)||[],sortableAttributes:ye(((t=e==null?void 0:e.attributeMetadata)==null?void 0:t.sortable)||[],i)}};return re(o,(y=(m=(h=ne.getConfig().models)==null?void 0:h.ProductSearchResult)==null?void 0:m.transformer)==null?void 0:y.call(m,e))}function ye(e=[],i){return!e||e.length===0?[]:e.filter(r=>{var o;return r.attribute==="position"?(o=i==null?void 0:i.filter)==null?void 0:o.some(u=>u.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],i){var o;return!e||e.length===0?[]:((o=i==null?void 0:i.filter)==null?void 0:o.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Re=`
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
  ${ie}
  ${oe}
`,Te=async(e,i={})=>{const r=i.scope==="search"?void 0:i.scope,o={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return g.emit("search/result",o,{scope:r}),o.result;g.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?se:ue,u=window.crypto.randomUUID(),s={...e,phrase:e.phrase??"",currentPage:e.currentPage??1,sort:e.sort??[],filter:e.filter??[]};te(n,u,s.phrase||"",s.filter||[],s.pageSize||0,s.currentPage||0,s.sort||[]),le(n);const{errors:c,data:l}=await ge(Re,{method:"GET",variables:{...s}});if(c&&!l)throw new Error("Error fetching product search");const t=he(l,s);return ce(n,u,t),me(n),g.emit("search/result",{request:s,result:t},{scope:r}),t}catch(n){throw g.emit("search/error",n.message,{scope:r}),g.emit("search/result",o,{scope:r}),n}finally{g.emit("search/loading",!1,{scope:r})}};export{xe as a,ke as b,De as c,Te as d,ge as f,Fe as g,$e as r,Se as s};
//# sourceMappingURL=search.js.map
