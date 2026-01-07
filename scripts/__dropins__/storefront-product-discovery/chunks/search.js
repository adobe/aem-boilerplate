/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as x}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as te,P as se,u as le,s as ce,a as ue,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ve,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:Fe,setFetchGraphQlHeaders:$e,getFetchGraphQlHeader:De,fetchGraphQl:fe,getConfig:Ue}=new pe().getMethods(),F=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,ge=e=>{var r,s,i,c,u,R,p,w,f,l,m,g,I,S,_,N,A,T,E,$,v,t,n,y,P,C,z,h,b,Q,D,U,H,K,M,k,L,B,j,W,Y,J,X,Z,V,q,a,G,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(O=>{var ee;return{label:O.label||"",roles:O.roles||[],url:((ee=O.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((c=(i=(s=e==null?void 0:e.price)==null?void 0:s.final)==null?void 0:i.amount)==null?void 0:c.value)||0,currency:F((p=(R=(u=e==null?void 0:e.price)==null?void 0:u.final)==null?void 0:R.amount)==null?void 0:p.currency)}},regular:{amount:{value:((l=(f=(w=e==null?void 0:e.price)==null?void 0:w.regular)==null?void 0:f.amount)==null?void 0:l.value)||0,currency:F((I=(g=(m=e==null?void 0:e.price)==null?void 0:m.regular)==null?void 0:g.amount)==null?void 0:I.currency)}},roles:((S=e==null?void 0:e.price)==null?void 0:S.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((T=(A=(N=(_=e==null?void 0:e.priceRange)==null?void 0:_.minimum)==null?void 0:N.final)==null?void 0:A.amount)==null?void 0:T.value)||0,currency:F((t=(v=($=(E=e==null?void 0:e.priceRange)==null?void 0:E.minimum)==null?void 0:$.final)==null?void 0:v.amount)==null?void 0:t.currency)}},regular:{amount:{value:((C=(P=(y=(n=e==null?void 0:e.priceRange)==null?void 0:n.minimum)==null?void 0:y.regular)==null?void 0:P.amount)==null?void 0:C.value)||0,currency:F((Q=(b=(h=(z=e==null?void 0:e.priceRange)==null?void 0:z.minimum)==null?void 0:h.regular)==null?void 0:b.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((K=(H=(U=(D=e==null?void 0:e.priceRange)==null?void 0:D.maximum)==null?void 0:U.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:F((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((J=(Y=(W=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:W.regular)==null?void 0:Y.amount)==null?void 0:J.value)||0,currency:F((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(o,(d=(G=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:G.transformer)==null?void 0:d.call(G,e))};function he(e,o){var i,c,u,R,p,w,f,l,m;const r=e==null?void 0:e.productSearch,s={facets:Pe((r==null?void 0:r.facets)||[],o),items:(r==null?void 0:r.items.map(g=>ge(g==null?void 0:g.productView)))||[],pageInfo:{currentPage:((i=r==null?void 0:r.page_info)==null?void 0:i.current_page)||1,totalPages:((c=r==null?void 0:r.page_info)==null?void 0:c.total_pages)||1,totalItems:((u=r==null?void 0:r.page_info)==null?void 0:u.total_items)||0,pageSize:((R=r==null?void 0:r.page_info)==null?void 0:R.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((p=e==null?void 0:e.attributeMetadata)==null?void 0:p.filterableInSearch)||[],sortableAttributes:ye(((w=e==null?void 0:e.attributeMetadata)==null?void 0:w.sortable)||[],o)}};return re(s,(m=(l=(f=ne.getConfig().models)==null?void 0:f.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:m.call(l,e))}function ye(e=[],o){return!e||e.length===0?[]:e.filter(r=>{var s;return r.attribute==="position"?(s=o==null?void 0:o.filter)==null?void 0:s.some(c=>c.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],o){var s;return!e||e.length===0?[]:((s=o==null?void 0:o.filter)==null?void 0:s.some(i=>i.attribute==="categoryPath"))?e.filter(i=>i.attribute!=="categories"):e}const Ce=`
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
`,Ne=async(e,o={})=>{const r=o.scope==="search"?void 0:o.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return x.emit("search/result",s,{scope:r}),s.result;x.emit("search/loading",!0,{scope:r});try{const i=r==="popover"?te:se,c=window.crypto.randomUUID(),u=new URLSearchParams(window.location.search),R=Number(u.get("page"))||1,p=u.get("q"),w=p!==null&&p.trim().length>0?p:e==null?void 0:e.phrase,f=u.get("sort"),l=f&&f.trim().length>0?f.split(",").map(t=>{if(t=t.trim(),!t)return null;let n="",y="ASC";if(t.includes(":"))[n,y]=t.split(":");else if(t.includes("_")){const P=t.lastIndexOf("_");n=t.slice(0,P),y=t.slice(P+1).toUpperCase()==="DESC"?"DESC":"ASC"}else n=t;return n==="position"?null:{attribute:n,direction:y}}).filter(Boolean):[],m=u.get("filter"),g=m&&m.trim()?decodeURIComponent(m.replace(/\+/g,"%20")).split(";").reduce((n,y)=>{const P=y.trim();if(!P.includes(":"))return n;const[C,...z]=P.split(":"),h=z.join(":").trim();if(!C||!h)return n;if(C==="price"&&h.includes("-")){const[b,Q]=h.split("-"),D=Number(b),U=Number(Q);return!Number.isNaN(D)&&!Number.isNaN(U)&&n.push({attribute:"price",range:{from:D,to:U}}),n}if(C==="visibility"){const b=h.indexOf(",");return n.push({attribute:C,in:b===-1?[h.trim()]:["Catalog, Search"]}),n}return n.push({attribute:C,in:h.split(/[|,]/).map(b=>b.trim()).filter(Boolean)}),n},[]):e==null?void 0:e.filter,I=window.location.pathname.replace(/^\/|\/$/g,""),S=I&&!I.startsWith("search")?I.split("/").pop():null,_=g?[...g]:[];S&&(_.some(n=>n.attribute==="categoryPath")||_.unshift({attribute:"categoryPath",in:[S]}));const N=w||e.phrase,A=l!=null&&l.length?l:e.sort,T=m!==null||S?_:e.filter;e={...e,phrase:N,sort:A,filter:T,currentPage:R},le(i,c,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ce(i);const{errors:E,data:$}=await fe(Ce,{method:"GET",variables:{...e}});if(E&&!$)throw new Error("Error fetching product search");const v=he($,e);return ue(i,c,v),me(i),x.emit("search/result",{request:e,result:v},{scope:r}),v}catch(i){throw x.emit("search/error",i.message,{scope:r}),x.emit("search/result",s,{scope:r}),i}finally{x.emit("search/loading",!1,{scope:r})}};export{xe as a,$e as b,Ue as c,Ne as d,fe as f,De as g,Fe as r,ve as s};
//# sourceMappingURL=search.js.map
