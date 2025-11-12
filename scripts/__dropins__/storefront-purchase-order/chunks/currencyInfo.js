/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as n,h as l}from"./fetch-graphql.js";import{h as i}from"./fetch-error.js";import{t as R}from"./transform-purchase-order-approval-rule.js";const p=a=>{var d,o;const t=(o=(d=a==null?void 0:a.data)==null?void 0:d.customer)==null?void 0:o.purchase_order_approval_rule_metadata,u=r=>{var s;return{id:(r==null?void 0:r.id)||"",sortOrder:(r==null?void 0:r.sort_order)||0,text:(r==null?void 0:r.text)||"",children:((s=r==null?void 0:r.children)==null?void 0:s.map(u))||void 0}},e=r=>({id:(r==null?void 0:r.id)||"",name:(r==null?void 0:r.name)||"",usersCount:(r==null?void 0:r.users_count)||0,permissions:((r==null?void 0:r.permissions)||[]).map(u)}),c=((t==null?void 0:t.available_applies_to)||[]).map(e),_=((t==null?void 0:t.available_requires_approval_from)||[]).map(e);return{availableAppliesTo:c,availableRequiresApprovalFrom:_}},A=`
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
`,C=async a=>{if(!a.name||a.name.trim()==="")throw new Error("Rule name is required");return n(A,{variables:{input:a}}).then(t=>{var e,c;if((e=t.errors)!=null&&e.length&&i(t.errors),!((c=t.data)==null?void 0:c.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return R(t.data.createPurchaseOrderApprovalRule)}).catch(l)},h=`
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
`,y=async a=>{if(!a.uid||a.uid.trim()==="")throw new Error("Approval Rule UID is required");return n(h,{variables:{input:a}}).then(t=>{var u,e;return(u=t.errors)!=null&&u.length&&i(t.errors),R(((e=t.data)==null?void 0:e.updatePurchaseOrderApprovalRule)||{})}).catch(l)},E=`
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
`,b=async()=>n(E,{variables:{}}).then(a=>{var t;return(t=a.errors)!=null&&t.length&&i(a.errors),p(a)}).catch(l),v=`
  query GET_CURRENCY_INFO {
    currency {
      base_currency_code
      available_currency_codes
    }
  }
`,f=async()=>n(v,{}).then(a=>{var e,c,_,d,o;if(!a)return{baseCurrencyCode:"USD",availableCurrencyCodes:[]};(e=a.errors)!=null&&e.length&&i(a.errors);const t=((_=(c=a==null?void 0:a.data)==null?void 0:c.currency)==null?void 0:_.available_currency_codes)??[];return{baseCurrencyCode:((o=(d=a==null?void 0:a.data)==null?void 0:d.currency)==null?void 0:o.base_currency_code)||"USD",availableCurrencyCodes:t.length?t.map(r=>({text:String(r),value:String(r)})):[]}}).catch(l);export{C as a,f as c,b as g,y as u};
//# sourceMappingURL=currencyInfo.js.map
