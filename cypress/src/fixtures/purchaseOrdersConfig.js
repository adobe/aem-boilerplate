const random = Cypress._.random(0, 10000000);

export const texts = {
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
};

export const approvalRules = {
  rule1: {
    name: `Approval Rule for Orders Over 50 Dollars ${random}`,
    description:
      'This rule requires approval for purchase orders with grand total over 50 dollars',
    appliesTo: 'Specific Roles',
    role: 'PO Sales',
    ruleType: 'Grand Total',
    ruleCondition: 'is more than or equal to',
    ruleValue: '50',
    approverRole: 'PO Approver',
  },
  rule2: {
    name: `Approval Rule for Multiple Product Orders ${random}`,
    description:
      'This rule requires approval for purchase orders with more than one unique product SKU',
    appliesTo: 'All Users',
    ruleType: 'Number of SKUs',
    ruleCondition: 'is more than',
    ruleValue: '1',
    approverRole: 'PO Rules Manager',
  },
  rule3: {
    name: `New Approval Rule for Multiple Product Orders ${random}`,
    description:
      'This rule requires approval for purchase orders with more than one unique product SKU',
    appliesTo: 'All Users',
    ruleType: 'Number of SKUs',
    ruleCondition: 'is more than',
    ruleValue: '1',
    approverRole: 'PO Approver',
  },
  rule4: {
    name: `Approval Rule for Orders Over 50 Dollars ${random}`,
    description:
      'This rule requires approval for purchase orders with grand total over 50 dollars',
    appliesTo: 'Specific Roles',
    role: 'PO Sales',
    ruleType: 'Grand Total',
    ruleCondition: 'is more than or equal to',
    ruleValue: '50',
    approverRole: 'PO Rules Manager',
  },
};

export const PASSWORD = 'Qwe123456';

export const users = {
  sales_manager: {
    firstname: 'Sales',
    lastname: 'Manager',
    email: `${random}po_user_sales_manager@example.com`,
    password: PASSWORD,
  },
  po_rules_manager: {
    firstname: 'PO Rules',
    lastname: 'Manager',
    email: `${random}po_user_po_rules_manager@example.com`,
    password: PASSWORD,
  },
  approver_manager: {
    firstname: 'Approver',
    lastname: 'Manager',
    email: `${random}po_user_approver_manager@example.com`,
    password: PASSWORD,
  },
};
