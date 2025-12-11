/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

// Generate unique identifiers for test data
const timestamp = Date.now();
const random = Math.random().toString(36).substring(2, 8);

/**
 * Base company data for testing
 */
export const baseCompanyData = {
  companyName: `Test Company ${timestamp}`,
  companyEmail: `company.${timestamp}.${random}@example.com`,
  legalName: `Test Company Legal ${timestamp}`,
  vatTaxId: `VAT-${random}`,
  resellerId: `RES-${random}`,
  street: '123 Test Street',
  city: 'Test City',
  countryCode: 'US',
  region: 'California',
  postcode: '90210',
  telephone: '555-0100',
  adminFirstName: 'Admin',
  adminLastName: 'User',
  adminEmail: `admin.${timestamp}.${random}@example.com`,
  adminJobTitle: 'Company Administrator',
  adminWorkPhone: '555-0101',
};

/**
 * Minimal company data (required fields only)
 */
export const minimalCompanyData = {
  companyName: `Minimal Company ${timestamp}`,
  companyEmail: `minimal.${timestamp}.${random}@example.com`,
  street: '456 Main Street',
  city: 'Main City',
  countryCode: 'US',
  region: 'Texas',
  postcode: '75001',
  telephone: '555-0200',
  adminFirstName: 'Test',
  adminLastName: 'Admin',
  adminEmail: `testadmin.${timestamp}.${random}@example.com`,
};

/**
 * Company user data templates
 */
export const companyUsers = {
  regularUser: {
    firstname: 'Regular',
    lastname: 'User',
    email: `regular.${timestamp}.${random}@example.com`,
    password: 'Test123!',
  },
  managerUser: {
    firstname: 'Manager',
    lastname: 'User',
    email: `manager.${timestamp}.${random}@example.com`,
    password: 'Test123!',
  },
  viewOnlyUser: {
    firstname: 'Viewer',
    lastname: 'User',
    email: `viewer.${timestamp}.${random}@example.com`,
    password: 'Test123!',
  },
};

/**
 * Full admin permissions - all company permissions enabled
 * Based on Magento B2B company_acl.xml files:
 * - Magento/Company/etc/company_acl.xml
 * - Magento/CompanyPayment/etc/company_acl.xml
 * - Magento/CompanyShipping/etc/company_acl.xml
 */
export const fullAdminPermissions = [
  // Root permission
  { resource_id: 'Magento_Company::index', permission: 'allow' },
  // Company Profile permissions
  { resource_id: 'Magento_Company::view', permission: 'allow' },
  { resource_id: 'Magento_Company::view_account', permission: 'allow' },
  { resource_id: 'Magento_Company::edit_account', permission: 'allow' },
  { resource_id: 'Magento_Company::view_address', permission: 'allow' },
  { resource_id: 'Magento_Company::edit_address', permission: 'allow' },
  { resource_id: 'Magento_Company::contacts', permission: 'allow' },
  { resource_id: 'Magento_Company::payment_information', permission: 'allow' },
  { resource_id: 'Magento_Company::shipping_information', permission: 'allow' },
  // User Management permissions
  { resource_id: 'Magento_Company::user_management', permission: 'allow' },
  { resource_id: 'Magento_Company::users_view', permission: 'allow' },
  { resource_id: 'Magento_Company::users_edit', permission: 'allow' },
  { resource_id: 'Magento_Company::roles_view', permission: 'allow' },
  { resource_id: 'Magento_Company::roles_edit', permission: 'allow' },
  // Sales permissions
  { resource_id: 'Magento_Sales::all', permission: 'allow' },
  { resource_id: 'Magento_Sales::place_order', permission: 'allow' },
  { resource_id: 'Magento_Sales::payment_account', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders', permission: 'allow' },
  { resource_id: 'Magento_Sales::view_orders_sub', permission: 'allow' },
];

/**
 * Role data templates
 */
export const roleData = {
  adminRole: {
    role_name: 'Company Administrator',
    permissions: fullAdminPermissions,
  },
  customRole: {
    role_name: `Custom Role ${random}`,
    permissions: [
      {
        resource_id: 'Magento_Company::view',
        permission: 'allow',
      },
      {
        resource_id: 'Magento_Company::view_account',
        permission: 'allow',
      },
    ],
  },
  managerRole: {
    role_name: `Manager Role ${random}`,
    permissions: [
      {
        resource_id: 'Magento_Company::view',
        permission: 'allow',
      },
      {
        resource_id: 'Magento_Company::view_account',
        permission: 'allow',
      },
      {
        resource_id: 'Magento_Company::edit_account',
        permission: 'allow',
      },
      {
        resource_id: 'Magento_Company::user_management',
        permission: 'allow',
      },
    ],
  },
  viewOnlyRole: {
    role_name: `View Only Role ${random}`,
    permissions: [
      {
        resource_id: 'Magento_Company::view',
        permission: 'allow',
      },
      {
        resource_id: 'Magento_Company::view_account',
        permission: 'allow',
      },
    ],
  },
};

/**
 * Team data templates
 */
export const teamData = {
  salesTeam: {
    name: `Sales Team ${random}`,
    description: 'Sales department team',
  },
  marketingTeam: {
    name: `Marketing Team ${random}`,
    description: 'Marketing department team',
  },
  engineeringTeam: {
    name: `Engineering Team ${random}`,
    description: 'Engineering department team',
  },
};

/**
 * Company profile update data
 */
export const companyProfileUpdates = {
  basicUpdate: {
    company_name: `Updated Company ${timestamp}`,
    company_email: `updated.${timestamp}.${random}@example.com`,
  },
  fullUpdate: {
    company_name: `Fully Updated Company ${timestamp}`,
    company_email: `fullyupdated.${timestamp}.${random}@example.com`,
    legal_name: `Updated Legal Name ${timestamp}`,
    vat_tax_id: `UPDATED-VAT-${random}`,
    reseller_id: `UPDATED-RES-${random}`,
  },
};

/**
 * Validation test data
 */
export const invalidData = {
  emptyCompanyName: '',
  whitespaceCompanyName: '     ',
  invalidEmail: 'not-an-email',
  specialCharsCompanyName: '<script>alert("test")</script>',
  longCompanyName: 'A'.repeat(256), // Exceeds typical max length
  emptyFirstName: '',
  emptyLastName: '',
  whitespaceFirstName: '   ',
  whitespaceLastName: '   ',
};
