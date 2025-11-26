/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i,h as c,a as d}from"./fetch-graphql.js";import"@dropins/tools/lib.js";import{t as n}from"./transform-purchase-order-approval-rule.js";const l=`
  query GET_PURCHASE_ORDER_APPROVAL_RULE($uid: ID!) {
    customer {
      purchase_order_approval_rule(uid: $uid) {
        created_at
        created_by
        description
        name
        status
        uid
        updated_at
        applies_to_roles {
          id
          name
          users_count
        }
        approver_roles {
          id
          name
          users_count
        }
        condition {
          attribute
          operator
          ... on PurchaseOrderApprovalRuleConditionAmount {
            attribute
            operator
            amount {
              currency
              value
            }
          }
          ... on PurchaseOrderApprovalRuleConditionQuantity {
            attribute
            operator
            quantity
          }
        }
      }
    }
  }
`,h=async o=>i(l,{variables:{uid:o}}).then(r=>{var t,a,e;(t=r.errors)!=null&&t.length&&c(r.errors);const u=(e=(a=r==null?void 0:r.data)==null?void 0:a.customer)==null?void 0:e.purchase_order_approval_rule;return n(u)}).catch(d);export{h as g};
//# sourceMappingURL=getPurchaseOrderApprovalRule.js.map
