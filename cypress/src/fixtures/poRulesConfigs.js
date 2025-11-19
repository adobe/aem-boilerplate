const PO_RULES_MANAGER = [
  {
    resource_id: 'Magento_Company::index',
    permission: 'allow',
  },
];

const PO_APPROVER_MANAGER = [
  { resource_id: 'Magento_Company::index', permission: 'allow' },
  { resource_id: 'Magento_Company::view', permission: 'allow' },
  { resource_id: 'Magento_Company::view_account', permission: 'allow' },
  { resource_id: 'Magento_Sales::place_order', permission: 'allow' },
  { resource_id: 'Magento_Sales::payment_account', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders_sub', permission: 'allow' },
  {
    resource_id: 'Magento_PurchaseOrder::view_purchase_orders',
    permission: 'allow',
  },
  {
    resource_id: 'Magento_PurchaseOrder::view_purchase_orders_for_subordinates',
    permission: 'allow',
  },
  {
    resource_id: 'Magento_PurchaseOrder::autoapprove_purchase_order',
    permission: 'allow',
  },
  {
    resource_id: 'Magento_PurchaseOrderRule::view_approval_rules',
    permission: 'allow',
  },
];

const PO_SALES_MANAGER = [
  { resource_id: 'Magento_Company::index', permission: 'allow' },
  { resource_id: 'Magento_Company::view', permission: 'allow' },
  { resource_id: 'Magento_Company::view_account', permission: 'allow' },
  { resource_id: 'Magento_Sales::place_order', permission: 'allow' },
  { resource_id: 'Magento_Sales::payment_account', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders_sub', permission: 'deny' },
  {
    resource_id: 'Magento_PurchaseOrder::view_purchase_orders',
    permission: 'allow',
  },
];

export { PO_RULES_MANAGER, PO_APPROVER_MANAGER, PO_SALES_MANAGER };
