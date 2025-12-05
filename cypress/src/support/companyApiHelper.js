/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * @fileoverview REST API helper for company registration verification and cleanup.
 * Provides functions to find, verify, and delete companies and customers via REST API.
 * Used by Cypress tests to validate backend state after company registration.
 */

const ACCSApiClient = require('./accsClient');

/**
 * Safe logging function that handles missing TTY.
 * Prevents errors in environments without proper console support.
 * @param {...*} args - Arguments to log
 * @returns {void}
 */
function safeLog(...args) {
  try {
    if (typeof console !== 'undefined' && console.log
      && typeof process !== 'undefined' && process && process.stdout) {
      console.log(...args);
    }
  } catch (error) {
    // Silently ignore logging errors in environments without proper TTY support
  }
}

/**
 * Safe error logging function that handles missing TTY.
 * Prevents errors in environments without proper console support.
 * @param {...*} args - Arguments to log as error
 * @returns {void}
 */
function safeError(...args) {
  try {
    if (typeof console !== 'undefined' && console.error
      && typeof process !== 'undefined' && process && process.stderr) {
      console.error(...args);
    }
  } catch (error) {
    // Silently ignore logging errors in environments without proper TTY support
  }
}

/**
 * Find a company by email using REST API.
 * Companies in "pending" status (not yet approved) are also returned.
 * @param {string} companyEmail - The company email to search for
 * @returns {Promise<Object|null>} The company object if found, null otherwise
 * @example
 * const company = await findCompanyByEmail('company@example.com');
 * if (company) {
 *   console.log(`Found: ${company.company_name} (ID: ${company.id})`);
 * }
 */
async function findCompanyByEmail(companyEmail) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🔍 Searching for company with email: ${companyEmail}`);

    // Use flat query params like b2bPOAPICalls.js does
    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'company_email',
      'searchCriteria[filterGroups][0][filters][0][value]': companyEmail,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    };

    const response = await client.get('/V1/company', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found company: ${response.items[0].company_name} (ID: ${response.items[0].id})`);
      return response.items[0];
    }

    safeLog('❌ Company not found');
    return null;
  } catch (error) {
    safeError('❌ Company search failed:', error.message);
    return null;
  }
}

/**
 * Find companies by name using REST API.
 * Uses LIKE search to find partial matches.
 * @param {string} companyName - The company name to search for (partial match)
 * @returns {Promise<Array<Object>>} Array of matching company objects, empty array if none found
 * @example
 * const companies = await findCompanyByName('Test Company');
 * console.log(`Found ${companies.length} companies`);
 */
async function findCompanyByName(companyName) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🔍 Searching for company with name: ${companyName}`);

    // Use flat query params like b2bPOAPICalls.js does
    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'company_name',
      'searchCriteria[filterGroups][0][filters][0][value]': `%${companyName}%`,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'like',
    };

    const response = await client.get('/V1/company', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found ${response.items.length} company(ies)`);
      return response.items;
    }

    safeLog('❌ No companies found');
    return [];
  } catch (error) {
    safeError('❌ Company search failed:', error.message);
    return [];
  }
}

/**
 * Verify a company was created with expected data.
 * Searches for the company by email and validates against expected values.
 * @param {string} companyEmail - The company email to verify
 * @param {Object} [expectedData={}] - Expected data to validate
 * @param {string} [expectedData.companyName] - Expected company name
 * @returns {Promise<Object>} Verification result
 * @returns {boolean} result.success - Whether verification passed
 * @returns {Object} [result.company] - Company data if found
 * @returns {number} result.company.id - Company ID
 * @returns {string} result.company.name - Company name
 * @returns {string} result.company.email - Company email
 * @returns {number} result.company.status - Status (0=pending, 1=approved, 2=rejected)
 * @returns {string} [result.error] - Error message if verification failed
 * @example
 * const result = await verifyCompanyCreated('company@example.com', { companyName: 'Test Co' });
 * if (result.success) {
 *   console.log(`Company ID: ${result.company.id}`);
 * }
 */
async function verifyCompanyCreated(companyEmail, expectedData = {}) {
  safeLog(`🔍 Verifying company creation: ${companyEmail}`);

  const company = await findCompanyByEmail(companyEmail);

  if (!company) {
    safeLog('❌ Verification failed: Company not found');
    return {
      success: false,
      error: `Company with email ${companyEmail} not found in backend`,
    };
  }

  const result = {
    success: true,
    company: {
      id: company.id,
      name: company.company_name,
      email: company.company_email,
      status: company.status,
      legalName: company.legal_name,
      vatTaxId: company.vat_tax_id,
      resellerId: company.reseller_id,
    },
  };

  if (expectedData.companyName && company.company_name !== expectedData.companyName) {
    result.success = false;
    result.error = `Company name mismatch: expected "${expectedData.companyName}", got "${company.company_name}"`;
    safeLog(`❌ Verification failed: ${result.error}`);
    return result;
  }

  safeLog(`✅ Company verified: ID=${result.company.id}, Status=${result.company.status}`);
  return result;
}

/**
 * Delete a company by ID using REST API.
 * @param {number} companyId - The company ID to delete
 * @returns {Promise<Object>} Deletion result
 * @returns {boolean} result.success - Whether deletion succeeded
 * @returns {string} [result.error] - Error message if deletion failed
 * @example
 * const result = await deleteCompanyById(123);
 * if (result.success) {
 *   console.log('Company deleted');
 * }
 */
async function deleteCompanyById(companyId) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🗑️ Deleting company with ID: ${companyId}`);

    await client.delete(`/V1/company/${companyId}`);

    safeLog(`✅ Company ${companyId} deleted successfully`);
    return { success: true };
  } catch (error) {
    safeError('❌ Company deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a company by email using REST API.
 * First finds the company, then deletes it by ID.
 * @param {string} companyEmail - The company email to delete
 * @returns {Promise<Object>} Deletion result
 * @returns {boolean} result.success - Whether deletion succeeded
 * @returns {string} [result.message] - Message if company not found
 * @returns {string} [result.error] - Error message if deletion failed
 * @example
 * const result = await deleteCompanyByEmail('company@example.com');
 */
async function deleteCompanyByEmail(companyEmail) {
  safeLog(`🗑️ Deleting company by email: ${companyEmail}`);

  const company = await findCompanyByEmail(companyEmail);

  if (!company) {
    safeLog(`⚠️ Company with email ${companyEmail} not found, nothing to delete`);
    return { success: true, message: 'Company not found' };
  }

  return deleteCompanyById(company.id);
}

/**
 * Find a customer by email using REST API.
 * @param {string} customerEmail - The customer email to search for
 * @returns {Promise<Object|null>} The customer object if found, null otherwise
 * @example
 * const customer = await findCustomerByEmail('admin@example.com');
 * if (customer) {
 *   console.log(`Found: ${customer.firstname} ${customer.lastname}`);
 * }
 */
async function findCustomerByEmail(customerEmail) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🔍 Searching for customer with email: ${customerEmail}`);

    // Use flat query params like b2bPOAPICalls.js does
    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'email',
      'searchCriteria[filterGroups][0][filters][0][value]': customerEmail,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    };

    const response = await client.get('/V1/customers/search', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found customer: ${response.items[0].firstname} ${response.items[0].lastname} (ID: ${response.items[0].id})`);
      return response.items[0];
    }

    safeLog('❌ Customer not found');
    return null;
  } catch (error) {
    safeError('❌ Customer search failed:', error.message);
    return null;
  }
}

/**
 * Delete a customer by ID using REST API.
 * @param {number} customerId - The customer ID to delete
 * @returns {Promise<Object>} Deletion result
 * @returns {boolean} result.success - Whether deletion succeeded
 * @returns {string} [result.error] - Error message if deletion failed
 * @example
 * const result = await deleteCustomerById(456);
 */
async function deleteCustomerById(customerId) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🗑️ Deleting customer with ID: ${customerId}`);

    await client.delete(`/V1/customers/${customerId}`);

    safeLog(`✅ Customer ${customerId} deleted successfully`);
    return { success: true };
  } catch (error) {
    safeError('❌ Customer deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a customer by email using REST API.
 * First finds the customer, then deletes by ID.
 * @param {string} customerEmail - The customer email to delete
 * @returns {Promise<Object>} Deletion result
 * @returns {boolean} result.success - Whether deletion succeeded
 * @returns {string} [result.message] - Message if customer not found
 * @returns {string} [result.error] - Error message if deletion failed
 * @example
 * const result = await deleteCustomerByEmail('admin@example.com');
 */
async function deleteCustomerByEmail(customerEmail) {
  safeLog(`🗑️ Deleting customer by email: ${customerEmail}`);

  const customer = await findCustomerByEmail(customerEmail);

  if (!customer) {
    safeLog(`⚠️ Customer with email ${customerEmail} not found, nothing to delete`);
    return { success: true, message: 'Customer not found' };
  }

  return deleteCustomerById(customer.id);
}

/**
 * Cleanup test data: Delete company and admin created during test.
 * Uses emails stored in Cypress environment variables.
 * Should be called in afterEach hook to clean up test data.
 * @returns {Promise<Object>} Cleanup results
 * @returns {Object} result.company - Company deletion result
 * @returns {Object} result.admin - Admin customer deletion result
 * @example
 * afterEach(() => {
 *   cy.then(async () => {
 *     await cleanupTestCompany();
 *   });
 * });
 */
async function cleanupTestCompany() {
  safeLog('🧹 Starting test cleanup');

  const companyEmail = Cypress.env('currentTestCompanyEmail');
  const adminEmail = Cypress.env('currentTestAdminEmail');

  const results = {
    company: { success: true, message: 'No company to clean up' },
    admin: { success: true, message: 'No admin to clean up' },
  };

  if (companyEmail) {
    safeLog(`🧹 Cleaning up test company: ${companyEmail}`);
    results.company = await deleteCompanyByEmail(companyEmail);
    Cypress.env('currentTestCompanyEmail', null);
  } else {
    safeLog('⚠️ No company email found, skipping company cleanup');
  }

  if (adminEmail) {
    safeLog(`🧹 Cleaning up test admin: ${adminEmail}`);
    results.admin = await deleteCustomerByEmail(adminEmail);
    Cypress.env('currentTestAdminEmail', null);
  } else {
    safeLog('⚠️ No admin email found, skipping admin cleanup');
  }

  safeLog('✅ Test cleanup completed');
  return results;
}

module.exports = {
  findCompanyByEmail,
  findCompanyByName,
  verifyCompanyCreated,
  deleteCompanyById,
  deleteCompanyByEmail,
  findCustomerByEmail,
  deleteCustomerById,
  deleteCustomerByEmail,
  cleanupTestCompany,
};
