/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as u,h as i}from"./fetch-graphql.js";import{t as n}from"./transform-purchase-order-approval-rule.js";const c=`
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
`,_=async e=>u(c,{variables:{uid:e}}).then(r=>{var t,a;const o=(a=(t=r==null?void 0:r.data)==null?void 0:t.customer)==null?void 0:a.purchase_order_approval_rule;return n(o)}).catch(i);export{_ as g};
//# sourceMappingURL=getPurchaseOrderApprovalRule.js.map
