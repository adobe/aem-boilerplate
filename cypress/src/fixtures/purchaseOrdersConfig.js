const random = Cypress._.random(0, 10000000);

const SALES_MANAGER_ROLE_NAME = `PO Sales Manager ${random}`
const RULES_MANAGER_ROLE_NAME = `PO Rules Manager ${random}`
const APPROVER_ROLE_NAME = `PO Approver ${random}`
const USER_PASSWORD = 'Qwe123456';
const COMPANY_ID = 13;

export const poLabels = {
  addToCart: 'Add to Cart',
  checkout: 'Checkout',
  checkMoneyOrder: 'Check / Money order',
  placePO: 'Place Purchase Order',
  logout: 'Logout',
  approveSelected: 'Approve selected',
  rejectSelected: 'Reject selected',
  show: 'Show',
  hide: 'Hide',
  edit: 'Edit',
  save: 'Save',
  addNewRule: 'Add New Rule',
  approver: 'PO Approver',
  salesManager: 'PO Sales',
  specificRoles: 'Specific Roles',
  allUsers: 'All Users',
  grandTotal: 'Grand Total',
  numberOfSKUs: 'Number of SKUs',
  approvalRulesHeader: 'Approval rules',
  approvalRuleFormHeader: 'Purchase order approval rule'
};

export const poApprovalRules = {
  rule1: {
    name: `Approval Rule for Orders Over 50 Dollars ${random}`,
    description:
      'This rule requires approval for purchase orders with grand total over 50 dollars',
    appliesTo: 'Specific Roles',
    role: SALES_MANAGER_ROLE_NAME,
    ruleType: 'Grand Total',
    ruleCondition: 'is more than or equal to',
    ruleValue: '50',
    approverRole: APPROVER_ROLE_NAME,
  },
  rule1Edited: {
    name: `Approval Rule for Multiple Product Orders ${random}`,
    description:
      'This rule requires approval for purchase orders with more than one unique product SKU',
    appliesTo: 'All Users',
    role: null,
    ruleType: 'Number of SKUs',
    ruleCondition: 'is more than',
    ruleValue: '1',
    approverRole: RULES_MANAGER_ROLE_NAME,
  },
  rule2: {
    name: `New Approval Rule for Multiple Product Orders ${random}`,
    description:
      'This rule requires approval for purchase orders with more than one unique product SKU',
    appliesTo: 'All Users',
    role: null,
    ruleType: 'Number of SKUs',
    ruleCondition: 'is more than',
    ruleValue: '1',
    approverRole: APPROVER_ROLE_NAME,
  },
  rule2Edited: {
    name: `Approval Rule for Orders Over 50 Dollars ${random}`,
    description:
      'This rule requires approval for purchase orders with grand total over 50 dollars',
    appliesTo: 'Specific Roles',
    role: SALES_MANAGER_ROLE_NAME,
    ruleType: 'Grand Total',
    ruleCondition: 'is more than or equal to',
    ruleValue: '50',
    approverRole: RULES_MANAGER_ROLE_NAME,
  },
};

export const poUsers = {
  sales_manager: {
    firstname: `PO Sales Manager ${random}`,
    lastname: 'Test',
    email: `po_sales_manager_${random}@example.com`,
    password: USER_PASSWORD,
  },
  po_rules_manager: {
    firstname: `PO Rules Manager ${random}`,
    lastname: 'Test',
    email: `po_rules_manager_${random}@example.com`,
    password: USER_PASSWORD,
  },
  approver_manager: {
    firstname: 'PO Approver',
    lastname: 'Test',
    email: `po_approver_${random}@example.com`,
    password: USER_PASSWORD,
  },
};

export const poRolesConfig = {
  salesManager: {
    role_name: SALES_MANAGER_ROLE_NAME,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: "Magento_Company::index", permission: "allow" },
      { resource_id: "Magento_Company::view", permission: "allow" },
      { resource_id: "Magento_Company::view_account", permission: "allow" },
      { resource_id: "Magento_Sales::all", permission: "allow" },
      { resource_id: "Magento_Sales::place_order", permission: "allow" },
      { resource_id: "Magento_Sales::view_orders", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::all", permission: "allow" },
      { resource_id: "Magento_PurchaseOrderRule::view_approval_rules", permission: "allow" },
    ]
  },
  rulesManager: {
    role_name: RULES_MANAGER_ROLE_NAME,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: "Magento_Company::index", permission: "allow" },
      { resource_id: "Magento_Company::view", permission: "allow" },
      { resource_id: "Magento_Company::view_account", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::all", permission: "allow" },
      { resource_id: "Magento_PurchaseOrderRule::view_approval_rules", permission: "allow" },
      { resource_id: "Magento_PurchaseOrderRule::manage_approval_rules", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders_for_company", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders_for_subordinates", permission: "allow" },
    ]
  },
  approver: {
    role_name: APPROVER_ROLE_NAME,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: "Magento_Company::index", permission: "allow" },
      { resource_id: "Magento_Company::view", permission: "allow" },
      { resource_id: "Magento_Company::view_account", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::all", permission: "allow" },
      { resource_id: "Magento_PurchaseOrderRule::view_approval_rules", permission: "allow" },
      { resource_id: "Magento_PurchaseOrderRule::manage_approval_rules", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders_for_company", permission: "allow" },
      { resource_id: "Magento_PurchaseOrder::view_purchase_orders_for_subordinates", permission: "allow" },
    ]
  },
};
