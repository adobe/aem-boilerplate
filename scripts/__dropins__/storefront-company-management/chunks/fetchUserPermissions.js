/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as c,i as h,g as m}from"./company-permissions.js";import{h as e}from"./fetch-error.js";import{f as o,h as f}from"./network-error.js";const E=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children { 
                  id 
                  text 
                }
              }
            }
          }
        }
      }
      status
    }
  }
`;async function O(){return await o(E,{method:"GET",cache:"no-cache"}).then(t=>{var a,d,n;if((a=t.errors)!=null&&a.length)return e(t.errors);const r=(n=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:n.role,i=c((r==null?void 0:r.permissions)||[]);return h(r)&&m().forEach(s=>i.add(s)),{allowedIds:i,roleResponse:t}}).catch(f)}export{O as f};
//# sourceMappingURL=fetchUserPermissions.js.map
