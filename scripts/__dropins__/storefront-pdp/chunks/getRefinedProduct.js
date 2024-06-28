import{c as h}from"./initialize.js";import{FetchGraphQL as Q}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:W,setFetchGraphQlHeader:Z,removeFetchGraphQlHeader:R,setFetchGraphQlHeaders:tt,fetchGraphQl:A,getConfig:et}=new Q().getMethods();function D(e){var o,u,n;const r=e?{name:e.name,sku:e.sku,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:K(e),prices:j(e),attributes:M(e),options:N(e),optionUIDs:e.optionUIDs,url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku}:null,t=(n=(u=(o=h.getConfig())==null?void 0:o.models)==null?void 0:u.ProductDetails)==null?void 0:n.transform;return t&&r?t(r):r}function K(e){var r;return(r=e.images)==null?void 0:r.map(t=>(t.url=t.url.replace(/^https?:/,""),t))}function M(e){var r,t;return(t=(r=e.attributes)==null?void 0:r.filter(({roles:o})=>(o==null?void 0:o.indexOf("visible_in_pdp"))!==-1))==null?void 0:t.map(({label:o,value:u,name:n})=>({id:n,label:o,value:u.toString().split(",").join(", ")}))}function N(e){const{options:r,optionUIDs:t}=e;return r==null?void 0:r.map(({id:o,title:u,required:n,multi:c,values:i})=>{var d,f;const l=(d=i==null?void 0:i[0])==null?void 0:d.__typename;let a=i==null?void 0:i[0].type;return((f=i==null?void 0:i[0])==null?void 0:f.__typename)==="ProductViewOptionValueProduct"?a=void 0:a?a=a.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):a="dropdown",{id:o,type:a,typename:l,label:u,required:n,multiple:c,items:i==null?void 0:i.map(({id:m,title:g,inStock:p,value:P})=>({id:m,label:g,inStock:p,value:(a==null?void 0:a.toLowerCase())==="dropdown"?m:P==null?void 0:P.replace(/^https?:/,""),selected:(t==null?void 0:t.indexOf(m))>-1}))}})}function j(e){var d,f,m,g,p;const{price:r,priceRange:t,__typename:o}=e;function u(){var k;const P=r.regular.amount.value,y=((k=r.final)==null?void 0:k.amount.value)??r.regular.amount.value,w=r.regular.amount.currency==="NONE"?"USD":r==null?void 0:r.regular.amount.currency;return[P,y,y,w]}function n(){var x,_,b,S,E,T,C,O,v,F,V,$;const P=(x=t==null?void 0:t.minimum)==null?void 0:x.final.amount.value,y=(_=t==null?void 0:t.maximum)==null?void 0:_.final.amount.value;let w;((S=(b=t==null?void 0:t.minimum)==null?void 0:b.regular)==null?void 0:S.amount.value)===((T=(E=t==null?void 0:t.maximum)==null?void 0:E.regular)==null?void 0:T.amount.value)&&(w=(O=(C=t==null?void 0:t.minimum)==null?void 0:C.regular)==null?void 0:O.amount.value);const k=((F=(v=t==null?void 0:t.minimum)==null?void 0:v.final)==null?void 0:F.amount.currency)==="NONE"?"USD":($=(V=t==null?void 0:t.minimum)==null?void 0:V.final)==null?void 0:$.amount.currency;return[w,P,y,k]}const[c,i,l,a]=o==="SimpleProductView"?u():n(),s=o==="SimpleProductView"?(d=r==null?void 0:r.roles)==null?void 0:d.includes("visible"):((m=(f=t==null?void 0:t.maximum)==null?void 0:f.roles)==null?void 0:m.includes("visible"))&&((p=(g=t==null?void 0:t.minimum)==null?void 0:g.roles)==null?void 0:p.includes("visible"));return l&&i===l?{regular:{amount:c,currency:a,variant:c&&i!==c?"strikethrough":"default"},final:{amount:l,currency:a,variant:"default"},visible:s}:{final:{minimumAmount:i,maximumAmount:l,currency:a},visible:s}}const U=`
fragment ProductOptionFragment on ProductViewOption {
    id
    title
    required
    multi
    values {
      id
      title
      inStock
      __typename
      ... on ProductViewOptionValueProduct {
        title
        quantity
        isDefault
        product {
          sku
          shortDescription
          metaDescription
          metaKeyword
          metaTitle
          name
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
            roles
          }
        }
      }
      ... on ProductViewOptionValueSwatch {
        id
        title
        type
        value
        inStock
      }
    }
  }
`,G=`
fragment ProductFragment on ProductView {
  __typename
  id
  sku
  name
  shortDescription
  metaDescription
  metaKeyword
  metaTitle
  description
  inStock
  addToCartAllowed
  url
  urlKey
  externalId

  images(roles: []) {
    url
    label
    roles
  }

  attributes(roles: []) {
    name
    label
    value
    roles
  }

... on SimpleProductView {
    price {
        roles

        regular {
            amount {
                value
                currency
            }
        }

        final {
            amount {
                value
                currency
            }
        }
    }
}


  ... on ComplexProductView {
    options {
      ...ProductOptionFragment
    }

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
        roles
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
        roles
      }
    }
  }
}

${U}
`,q=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...ProductFragment
    }
}

${G}
`,rt=async e=>{var u,n,c,i,l;const r=(i=(c=(n=(u=h)==null?void 0:u.getConfig())==null?void 0:n.models)==null?void 0:c.ProductDetails)==null?void 0:i.initialData;if(r)return D(r);const{data:t}=await A(q,{method:"GET",variables:{skus:[e]}}),o=(l=t==null?void 0:t.products)==null?void 0:l[0];return D(o)},H=`
query REFINE_PRODUCT_QUERY(
    $optionIds: [String!]!
    $sku: String!
) {
    # Refined Product
    refineProduct(
        optionIds: $optionIds 
        sku: $sku
    ) {
        ...ProductFragment
    }

    # Parent Product
    products(skus: [$sku]) {
        ...ProductFragment
    }

    # %extendedPlaceholder%
}

${G}
`;async function I(e,r){const t=L(r),o=B(t,e),u=H.replace("# %extendedPlaceholder%",o),{data:n}=await A(u,{method:"GET",variables:{optionIds:r,sku:e}});return n}const nt=async(e,r,t)=>{var d,f,m,g;const o=await I(e,r);if(!o)return null;let{products:u,refineProduct:n,...c}=o;const i=u==null?void 0:u[0],l=X(Object.values(c),i.options,t);if(t!=null&&t.length&&n===null){r=Y(l,r,t);const p=await I(e,r);n=p==null?void 0:p.refineProduct}const a=D({...n||i,sku:i.sku,name:i.name,externalParentId:i==null?void 0:i.externalId,options:l,optionUIDs:r,variantSku:(n==null?void 0:n.__typename)==="SimpleProductView"?n==null?void 0:n.sku:void 0}),s=(g=(m=(f=(d=h)==null?void 0:d.getConfig())==null?void 0:f.models)==null?void 0:m.ProductDetails)==null?void 0:g.fallbackData;return s?s(i,a):a};function L(e){if(e.length<2)return[e];const r=[];return e.forEach(t=>{const o=[];e.forEach(u=>{t!==u&&o.push(u)}),r.push(o)}),r}function B(e,r){return e.map((t,o)=>`
          ProductOption${o}: refineProduct(
            optionIds: [
              ${t.map(u=>`"${u}"`).join(", ")}
            ]
            sku: "${r}"
          ) {
            ... on ComplexProductView {
              options {
                ...ProductOptionFragment
              }
            }
          }
        `).join("")}function X(e,r,t){const o=Object.values(e).filter(n=>!!n).reduce((n,c)=>c.options?[...n,...c.options]:[...n],[]),u=new Map(r.map(n=>[n.id,n]));return o.forEach(n=>{t!=null&&t.includes(n.id)||u.set(n.id,n)}),[...u.values()]}function Y(e,r,t){const o=[];let u;return e.forEach(n=>{var c,i,l,a;t.includes(n.id)?u=((i=(c=n.values)==null?void 0:c.find(s=>r.includes(s==null?void 0:s.id)))==null?void 0:i.id)||((l=n.values[0])==null?void 0:l.id):u=(a=n.values[0])==null?void 0:a.id,o.push(u)}),o}export{Z as a,tt as b,rt as c,nt as d,A as f,et as g,R as r,W as s};
