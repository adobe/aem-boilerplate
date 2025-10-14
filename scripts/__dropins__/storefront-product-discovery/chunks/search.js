/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as ee}from"@dropins/tools/lib.js";import{c as re}from"./initialize.js";import{events as p}from"@dropins/tools/event-bus.js";import{ProductView as ne,Facet as ie}from"../fragments.js";import{S as oe,P as se,u as ue,b as le,d as te,e as ce}from"./acdlEvents.js";import{FetchGraphQL as me}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:be,setFetchGraphQlHeader:Se,removeFetchGraphQlHeader:xe,setFetchGraphQlHeaders:$e,getFetchGraphQlHeader:ke,fetchGraphQl:pe,getConfig:Fe}=new me().getMethods(),ge=e=>{var r,o,n,s,t,l,u,g,f,c,h,m,_,P,v,I,w,C,b,S,x,$,k,F,D,T,z,A,Q,E,G,U,H,K,M,O,L,N,Y,j,B,J,W,X,Z,q,V,y,a;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const i={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(R=>{var d;return{label:R.label||"",roles:R.roles||[],url:((d=R.url)==null?void 0:d.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((s=(n=(o=e==null?void 0:e.price)==null?void 0:o.final)==null?void 0:n.amount)==null?void 0:s.value)||0,currency:((u=(l=(t=e==null?void 0:e.price)==null?void 0:t.final)==null?void 0:l.amount)==null?void 0:u.currency)||""}},regular:{amount:{value:((c=(f=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:f.amount)==null?void 0:c.value)||0,currency:((_=(m=(h=e==null?void 0:e.price)==null?void 0:h.regular)==null?void 0:m.amount)==null?void 0:_.currency)||""}},roles:((P=e==null?void 0:e.price)==null?void 0:P.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((C=(w=(I=(v=e==null?void 0:e.priceRange)==null?void 0:v.minimum)==null?void 0:I.final)==null?void 0:w.amount)==null?void 0:C.value)||0,currency:(($=(x=(S=(b=e==null?void 0:e.priceRange)==null?void 0:b.minimum)==null?void 0:S.final)==null?void 0:x.amount)==null?void 0:$.currency)||""}},regular:{amount:{value:((T=(D=(F=(k=e==null?void 0:e.priceRange)==null?void 0:k.minimum)==null?void 0:F.regular)==null?void 0:D.amount)==null?void 0:T.value)||0,currency:((E=(Q=(A=(z=e==null?void 0:e.priceRange)==null?void 0:z.minimum)==null?void 0:A.regular)==null?void 0:Q.amount)==null?void 0:E.currency)||""}}},maximum:{final:{amount:{value:((K=(H=(U=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:U.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:((N=(L=(O=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:O.final)==null?void 0:L.amount)==null?void 0:N.currency)||""}},regular:{amount:{value:((J=(B=(j=(Y=e==null?void 0:e.priceRange)==null?void 0:Y.maximum)==null?void 0:j.regular)==null?void 0:B.amount)==null?void 0:J.value)||0,currency:((q=(Z=(X=(W=e==null?void 0:e.priceRange)==null?void 0:W.maximum)==null?void 0:X.regular)==null?void 0:Z.amount)==null?void 0:q.currency)||""}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ee(i,(a=(y=(V=re.getConfig().models)==null?void 0:V.Product)==null?void 0:y.transformer)==null?void 0:a.call(y,e))};function fe(e,i){var n,s,t,l,u,g,f,c,h;const r=e==null?void 0:e.productSearch,o={facets:ye((r==null?void 0:r.facets)||[],i),items:(r==null?void 0:r.items.map(m=>ge(m==null?void 0:m.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((s=r==null?void 0:r.page_info)==null?void 0:s.total_pages)||1,totalItems:((t=r==null?void 0:r.page_info)==null?void 0:t.total_items)||0,pageSize:((l=r==null?void 0:r.page_info)==null?void 0:l.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((u=e==null?void 0:e.attributeMetadata)==null?void 0:u.filterableInSearch)||[],sortableAttributes:he(((g=e==null?void 0:e.attributeMetadata)==null?void 0:g.sortable)||[],i)}};return ee(o,(h=(c=(f=re.getConfig().models)==null?void 0:f.ProductSearchResult)==null?void 0:c.transformer)==null?void 0:h.call(c,e))}function he(e=[],i){return!e||e.length===0?[]:e.filter(r=>{var o;return r.attribute==="position"?(o=i==null?void 0:i.filter)==null?void 0:o.some(s=>s.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function ye(e=[],i){var o;return!e||e.length===0?[]:((o=i==null?void 0:i.filter)==null?void 0:o.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Re=`
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
  ${ne}
  ${ie}
`,De=async(e,i={})=>{const r=i.scope==="search"?void 0:i.scope,o={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return p.emit("search/result",o,{scope:r}),o.result;p.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?oe:se,s=window.crypto.randomUUID();ue(n,s,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),le(n);const{errors:t,data:l}=await pe(Re,{method:"GET",variables:{...e}});if(t&&!l)throw new Error("Error fetching product search");const u=fe(l,e);return te(n,s,u),ce(n),p.emit("search/result",{request:e,result:u},{scope:r}),u}catch(n){throw p.emit("search/error",n.message,{scope:r}),p.emit("search/result",o,{scope:r}),n}finally{p.emit("search/loading",!1,{scope:r})}};export{Se as a,$e as b,Fe as c,De as d,pe as f,ke as g,xe as r,be as s};
//# sourceMappingURL=search.js.map
