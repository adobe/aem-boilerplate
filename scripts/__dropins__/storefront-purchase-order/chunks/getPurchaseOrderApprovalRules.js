/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as d,h as g,a as P}from"./fetch-graphql.js";import{t as R}from"./transform-purchase-order-approval-rule.js";const h=`
  mutation DELETE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: DeletePurchaseOrderApprovalRuleInput!
  ) {
    deletePurchaseOrderApprovalRule(input: $input) {
      errors {
        message
        type
      }
    }
  }
`,v=async o=>{const t=Array.isArray(o)?o:[o];if(!t||t.length===0)throw new Error("Approval Rule UID(s) are required");if(t.some(e=>!e||e.trim()===""))throw new Error("All Approval Rule UIDs must be valid");return d(h,{variables:{input:{approval_rule_uids:t}}}).then(e=>{var i,l,n;if((i=e.errors)!=null&&i.length&&g(e.errors),!((l=e.data)==null?void 0:l.deletePurchaseOrderApprovalRule))throw new Error("Failed to delete purchase order approval rule");const p=(n=e==null?void 0:e.data)==null?void 0:n.deletePurchaseOrderApprovalRule;return{deletePurchaseOrderApprovalRule:{errors:((p==null?void 0:p.errors)??[]).map(r=>({message:r==null?void 0:r.message,type:r==null?void 0:r.type}))}}}).catch(P)},A=`
  query GET_PURCHASE_ORDER_APPROVAL_RULES($currentPage: Int!, $pageSize: Int!) {
    customer {
      email
      purchase_order_approval_rules(
        currentPage: $currentPage
        pageSize: $pageSize
      ) {
        items {
          applies_to_roles {
            id
            name
            users_count
            permissions {
              id
              sort_order
              text
              children {
                id
                sort_order
                text
              }
            }
          }
          approver_roles {
            id
            name
            users_count
            permissions {
              id
              sort_order
              text
              children {
                id
                sort_order
                text
              }
            }
          }
          condition {
            attribute
            operator
          }
          created_at
          created_by
          description
          name
          status
          uid
          updated_at
        }
        total_count
        page_info {
          page_size
          current_page
          total_pages
        }
      }
    }
  }
`,s={currentPage:1,pageSize:20,totalPages:1},O=async(o=s.currentPage,t=s.pageSize)=>d(A,{variables:{currentPage:o,pageSize:t}}).then(a=>{var i,l,n,r,c,_;(i=a.errors)!=null&&i.length&&g(a.errors);const e=(n=(l=a==null?void 0:a.data)==null?void 0:l.customer)==null?void 0:n.purchase_order_approval_rules,u=(e==null?void 0:e.total_count)??0,p={currentPage:((r=e==null?void 0:e.page_info)==null?void 0:r.current_page)??s.currentPage,pageSize:((c=e==null?void 0:e.page_info)==null?void 0:c.page_size)??s.pageSize,totalPages:((_=e==null?void 0:e.page_info)==null?void 0:_.total_pages)??s.totalPages};return{totalCount:u,pageInfo:p,items:((e==null?void 0:e.items)||[]).map(R)}}).catch(P);export{v as d,O as g};
//# sourceMappingURL=getPurchaseOrderApprovalRules.js.map
