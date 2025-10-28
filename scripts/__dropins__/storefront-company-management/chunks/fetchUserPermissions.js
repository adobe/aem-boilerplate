/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as c,i as e,g as h}from"./company-permissions.js";import{f as m,h as o,a as f}from"./fetch-error.js";const E=`
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
`;async function I(){return await m(E,{method:"GET",cache:"no-cache"}).then(t=>{var a,d,n;if((a=t.errors)!=null&&a.length)return o(t.errors);const r=(n=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:n.role,i=c((r==null?void 0:r.permissions)||[]);return e(r)&&h().forEach(s=>i.add(s)),{allowedIds:i,roleResponse:t}}).catch(f)}export{I as f};
//# sourceMappingURL=fetchUserPermissions.js.map
