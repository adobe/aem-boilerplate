/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as n,h as l,a as i}from"./fetch-graphql.js";import{t as R}from"./transform-purchase-order-approval-rule.js";const p=a=>{var d,_;const t=(_=(d=a==null?void 0:a.data)==null?void 0:d.customer)==null?void 0:_.purchase_order_approval_rule_metadata,u=r=>{var s;return{id:(r==null?void 0:r.id)||"",sortOrder:(r==null?void 0:r.sort_order)||0,text:(r==null?void 0:r.text)||"",children:((s=r==null?void 0:r.children)==null?void 0:s.map(u))||void 0}},e=r=>({id:(r==null?void 0:r.id)||"",name:(r==null?void 0:r.name)||"",usersCount:(r==null?void 0:r.users_count)||0,permissions:((r==null?void 0:r.permissions)||[]).map(u)}),c=((t==null?void 0:t.available_applies_to)||[]).map(e),o=((t==null?void 0:t.available_requires_approval_from)||[]).map(e);return{availableAppliesTo:c,availableRequiresApprovalFrom:o}},A=`
  mutation CREATE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: PurchaseOrderApprovalRuleInput!
  ) {
    createPurchaseOrderApprovalRule(input: $input) {
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
        permissions {
          id
          sort_order
          text
        }
      }
      condition {
        attribute
        operator
      }
      approver_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
    }
  }
`,m=async a=>{if(!a.name||a.name.trim()==="")throw new Error("Rule name is required");return n(A,{variables:{input:a}}).then(t=>{var e,c;if((e=t.errors)!=null&&e.length&&l(t.errors),!((c=t.data)==null?void 0:c.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return R(t.data.createPurchaseOrderApprovalRule)}).catch(i)},h=`
  mutation UPDATE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: UpdatePurchaseOrderApprovalRuleInput!
  ) {
    updatePurchaseOrderApprovalRule(input: $input) {
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
        permissions {
          id
          sort_order
          text
        }
      }
      condition {
        attribute
        operator
      }
      approver_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
    }
  }
`,C=async a=>{if(!a.uid||a.uid.trim()==="")throw new Error("Approval Rule UID is required");return n(h,{variables:{input:a}}).then(t=>{var u,e;return(u=t.errors)!=null&&u.length&&l(t.errors),R(((e=t.data)==null?void 0:e.updatePurchaseOrderApprovalRule)||{})}).catch(i)},E=`
  query GET_PURCHASE_ORDER_APPROVAL_RULE_METADATA {
    customer {
      purchase_order_approval_rule_metadata {
        available_applies_to {
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
        available_requires_approval_from {
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
      }
    }
  }
`,y=async()=>n(E,{variables:{}}).then(a=>{var t;return(t=a.errors)!=null&&t.length&&l(a.errors),p(a)}).catch(i),v=`
  query GET_CURRENCY_INFO {
    currency {
      base_currency_code
      available_currency_codes
    }
  }
`,b=async()=>n(v,{}).then(a=>{var e,c,o,d,_;if(!a)return{baseCurrencyCode:"USD",availableCurrencyCodes:[]};(e=a.errors)!=null&&e.length&&l(a.errors);const t=((o=(c=a==null?void 0:a.data)==null?void 0:c.currency)==null?void 0:o.available_currency_codes)??[];return{baseCurrencyCode:((_=(d=a==null?void 0:a.data)==null?void 0:d.currency)==null?void 0:_.base_currency_code)||"USD",availableCurrencyCodes:t.length?t.map(r=>({text:String(r),value:String(r)})):[]}}).catch(i);export{m as a,b as c,y as g,C as u};
//# sourceMappingURL=currencyInfo.js.map
