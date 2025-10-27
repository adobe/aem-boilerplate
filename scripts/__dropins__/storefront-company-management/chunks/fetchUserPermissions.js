/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as d,a as m}from"./fetch-error.js";import{f as c,i as s}from"./company-permissions.js";import{f as _}from"./fetch-graphql.js";const h=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          children {
            id
            children {
              id
              children {
                id
                children { id }
              }
            }
          }
        }
      }
      status
    }
  }
`,C=async()=>await _(h,{method:"GET",cache:"no-cache"}).then(a=>{var i,o,r;if((i=a.errors)!=null&&i.length)return d(a.errors);const t=(r=(o=a==null?void 0:a.data)==null?void 0:o.customer)==null?void 0:r.role,n=c((t==null?void 0:t.permissions)||[]);return s(t)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::roles_view","Magento_Company::roles_edit"].forEach(e=>n.add(e)),{allowedIds:n,roleResponse:a}}).catch(m);export{C as f};
//# sourceMappingURL=fetchUserPermissions.js.map
