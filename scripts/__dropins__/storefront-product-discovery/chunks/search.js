/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as ne}from"@dropins/tools/lib.js";import{c as ie}from"./initialize.js";import{events as f}from"@dropins/tools/event-bus.js";import{ProductView as oe,Facet as se}from"../fragments.js";import{S as ue,P as le,u as te,s as ce,a as me,b as pe}from"./acdlEvents.js";import{FetchGraphQL as ge}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:xe,setFetchGraphQlHeader:$e,removeFetchGraphQlHeader:ke,setFetchGraphQlHeaders:Fe,getFetchGraphQlHeader:De,fetchGraphQl:fe,getConfig:Te}=new ge().getMethods(),h=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,he=e=>{var r,o,n,u,s,m,t,l,y,p,v,g,R,_,b,I,C,w,S,x,$,k,F,D,T,z,A,Q,U,E,G,H,K,O,M,L,N,Y,j,q,B,J,W,X,Z,V,a,d,P,ee;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],attributes:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const i={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],attributes:((r=e==null?void 0:e.attributes)==null?void 0:r.map(c=>({label:c.label||"",name:c.name||"",roles:c.roles||[],value:c.value??null})))||[],images:((o=e==null?void 0:e.images)==null?void 0:o.map(c=>{var re;return{label:c.label||"",roles:c.roles||[],url:((re=c.url)==null?void 0:re.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((s=(u=(n=e==null?void 0:e.price)==null?void 0:n.final)==null?void 0:u.amount)==null?void 0:s.value)||0,currency:h((l=(t=(m=e==null?void 0:e.price)==null?void 0:m.final)==null?void 0:t.amount)==null?void 0:l.currency)}},regular:{amount:{value:((v=(p=(y=e==null?void 0:e.price)==null?void 0:y.regular)==null?void 0:p.amount)==null?void 0:v.value)||0,currency:h((_=(R=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:R.amount)==null?void 0:_.currency)}},roles:((b=e==null?void 0:e.price)==null?void 0:b.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((S=(w=(C=(I=e==null?void 0:e.priceRange)==null?void 0:I.minimum)==null?void 0:C.final)==null?void 0:w.amount)==null?void 0:S.value)||0,currency:h((F=(k=($=(x=e==null?void 0:e.priceRange)==null?void 0:x.minimum)==null?void 0:$.final)==null?void 0:k.amount)==null?void 0:F.currency)}},regular:{amount:{value:((A=(z=(T=(D=e==null?void 0:e.priceRange)==null?void 0:D.minimum)==null?void 0:T.regular)==null?void 0:z.amount)==null?void 0:A.value)||0,currency:h((G=(E=(U=(Q=e==null?void 0:e.priceRange)==null?void 0:Q.minimum)==null?void 0:U.regular)==null?void 0:E.amount)==null?void 0:G.currency)}}},maximum:{final:{amount:{value:((M=(O=(K=(H=e==null?void 0:e.priceRange)==null?void 0:H.maximum)==null?void 0:K.final)==null?void 0:O.amount)==null?void 0:M.value)||0,currency:h((j=(Y=(N=(L=e==null?void 0:e.priceRange)==null?void 0:L.maximum)==null?void 0:N.final)==null?void 0:Y.amount)==null?void 0:j.currency)}},regular:{amount:{value:((W=(J=(B=(q=e==null?void 0:e.priceRange)==null?void 0:q.maximum)==null?void 0:B.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:h((a=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:a.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ne(i,(ee=(P=(d=ie.getConfig().models)==null?void 0:d.Product)==null?void 0:P.transformer)==null?void 0:ee.call(P,e))};function ye(e,i){var n,u,s,m,t,l,y,p,v;const r=e==null?void 0:e.productSearch,o={facets:Pe((r==null?void 0:r.facets)||[],i),items:(r==null?void 0:r.items.map(g=>he(g==null?void 0:g.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((u=r==null?void 0:r.page_info)==null?void 0:u.total_pages)||1,totalItems:((s=r==null?void 0:r.page_info)==null?void 0:s.total_items)||0,pageSize:((m=r==null?void 0:r.page_info)==null?void 0:m.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((t=e==null?void 0:e.attributeMetadata)==null?void 0:t.filterableInSearch)||[],sortableAttributes:ve(((l=e==null?void 0:e.attributeMetadata)==null?void 0:l.sortable)||[],i)}};return ne(o,(v=(p=(y=ie.getConfig().models)==null?void 0:y.ProductSearchResult)==null?void 0:p.transformer)==null?void 0:v.call(p,e))}function ve(e=[],i){return!e||e.length===0?[]:e.filter(r=>{var o;return r.attribute==="position"?(o=i==null?void 0:i.filter)==null?void 0:o.some(u=>u.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],i){var o;return!e||e.length===0?[]:((o=i==null?void 0:i.filter)==null?void 0:o.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Re=`
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
  ${oe}
  ${se}
`,ze=async(e,i={})=>{const r=i.scope==="search"?void 0:i.scope,o={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return f.emit("search/result",o,{scope:r}),o.result;f.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?ue:le,u=window.crypto.randomUUID(),s={...e,phrase:e.phrase??"",currentPage:e.currentPage??1,sort:e.sort??[],filter:e.filter??[]};te(n,u,s.phrase||"",s.filter||[],s.pageSize||0,s.currentPage||0,s.sort||[]),ce(n);const{errors:m,data:t}=await fe(Re,{method:"GET",variables:{...s}});if(m&&!t)throw new Error("Error fetching product search");const l=ye(t,s);return me(n,u,l),pe(n),f.emit("search/result",{request:s,result:l},{scope:r}),l}catch(n){throw f.emit("search/error",n.message,{scope:r}),f.emit("search/result",o,{scope:r}),n}finally{f.emit("search/loading",!1,{scope:r})}};export{$e as a,Fe as b,Te as c,ze as d,fe as f,De as g,ke as r,xe as s};
//# sourceMappingURL=search.js.map
