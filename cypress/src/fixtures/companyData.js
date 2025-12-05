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
 * @fileoverview Test fixtures for company registration E2E tests.
 * Contains test data for US (with required region) and UK (optional region) scenarios.
 */

/**
 * Default company registration test data (US).
 * Region is required for US addresses.
 * @type {Object}
 */
export const companyRegistrationData = {
  company: {
    companyName: 'Test Company',
    legalName: 'Test Company Legal',
    companyEmail: 'test@example.com', // Will be overridden with dynamic email in actions
    vatTaxId: 'VAT123456',
    resellerId: 'RES123456',
  },
  legalAddress: {
    street: '123 Test St',
    streetLine2: 'Suite 100',
    city: 'Test City',
    postcode: '12345',
    telephone: '1234567890',
    countryCode: 'US',
    region: 'Texas',
  },
  companyAdmin: {
    firstName: 'Mike',
    lastName: 'Williams',
    email: 'mike.williams@example.com', // Will be overridden with dynamic email in actions
    jobTitle: 'Manager',
    workTelephone: '1234567890',
    gender: 'Male',
  },
};

/**
 * Success message displayed after company registration.
 * @type {string}
 */
export const companyRegistrationSuccessMessage =
  "Thank you! We're reviewing your request and will contact you soon.";

/**
 * TC-02: Test data with ALL fields filled (required + optional).
 * Used for authenticated user company creation test.
 * @type {Object}
 */
export const companyRegistrationDataAllFields = {
  company: {
    companyName: 'Full Test Company',
    legalName: 'Full Test Company Legal Inc.',
    companyEmail: 'fulltest@example.com', // Will be overridden with dynamic email
    vatTaxId: 'VAT-FULL-123456',
    resellerId: 'RES-FULL-789012',
  },
  legalAddress: {
    street: '789 Complete Avenue',
    streetLine2: 'Building B, Floor 5',
    city: 'Full City',
    postcode: '54321',
    telephone: '9876543210',
    countryCode: 'US',
    region: 'California',
  },
  companyAdmin: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com', // Will be overridden with dynamic email
    jobTitle: 'Chief Executive Officer',
    workTelephone: '5551234567',
    gender: 'Female',
  },
};

/**
 * USF-3439: Test data for UK company with empty region.
 * UK does not require region/state field.
 * @type {Object}
 */
export const companyRegistrationDataUKNoRegion = {
  company: {
    companyName: 'UK Test Company',
    legalName: 'UK Test Company Ltd',
    companyEmail: 'uk-test@example.com',
    vatTaxId: 'GB123456789',
    resellerId: '',
  },
  legalAddress: {
    street: '10 Downing Street',
    streetLine2: '',
    city: 'London',
    postcode: 'SW1A 2AA',
    telephone: '02012345678',
    countryCode: 'GB',
    region: '', // Empty - UK doesn't require region
  },
  companyAdmin: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    jobTitle: 'Director',
    workTelephone: '02012345679',
    gender: 'Male',
  },
};

/**
 * USF-3439: Test data for UK company with optional region name.
 * Demonstrates that region can be provided even when not required.
 * @type {Object}
 */
export const companyRegistrationDataUKWithRegion = {
  company: {
    companyName: 'UK Test Company',
    legalName: 'UK Test Company Ltd',
    companyEmail: 'uk-test@example.com',
    vatTaxId: 'GB123456789',
    resellerId: '',
  },
  legalAddress: {
    street: '10 Downing Street',
    streetLine2: '',
    city: 'London',
    postcode: 'SW1A 2AA',
    telephone: '02012345678',
    countryCode: 'GB',
    region: 'Greater London', // Optional region name
  },
  companyAdmin: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    jobTitle: 'Director',
    workTelephone: '02012345679',
    gender: 'Male',
  },
};
