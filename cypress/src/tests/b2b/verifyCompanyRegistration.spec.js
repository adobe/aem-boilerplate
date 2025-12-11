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

/**
 * @fileoverview Company Registration E2E tests.
 * Tests cover:
 * - USF-2528: Company Registration feature
 * - USF-2789: Registration via navigation menu and direct URL
 * - USF-2790: Redirect behavior when registration is disabled
 * - USF-3439: Region handling for countries without required regions (UK)
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 1: USF-2528 New Company Creation
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-01 (P0): Create new company as Guest user - via nav menu and direct URL
 * TC-02 (P0): Create new company as registered non-company user (with ALL fields)
 * TC-03 (P1): Registration disabled - redirect to login/account
 * TC-05 (P2): Duplicate company email validation
 * TC-06 (P2): Required fields validation (empty form submit)
 * USF-3439:   UK company registration with optional region
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 *
 * TC-04 (P2): Create company using email of existing company user
 *   - Reason: Complex precondition setup (requires existing company with user)
 *   - Recommendation: Manual testing or separate integration test
 *
 * TC-06 subset: Whitespace-only values validation
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - The dropin has its own test suite for form validation edge cases
 *
 * TC-06 subset: Special characters validation (!@#$%^&*...)
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - E2E tests should focus on happy path and critical error scenarios
 *
 * TC-06 subset: Leading/trailing whitespace trimming
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - This is a frontend transformation, not an E2E concern
 *
 * TC-06 subset: Phone number format validation (various formats)
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - Multiple format variations are validation logic, not E2E flow
 *
 * TC-06 subset: Field maxlength constraints (41+ chars)
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - HTML maxlength is a browser-enforced constraint
 *
 * ==========================================================================
 */

import {
  assertCompanyRegistrationForm,
  assertCompanyRegistrationSuccess,
  assertHomePageLoaded,
  assertAccountSectionAccessible,
} from '../../assertions';
import { COMPANY_CREATE_PATH } from '../../fields';
import {
  fillCompanyRegistrationForm,
  submitCompanyRegistrationForm,
  navigateToCompanyRegistration,
  signUpUser,
} from '../../actions';
import {
  companyRegistrationData,
  companyRegistrationDataAllFields,
  companyRegistrationDataUKNoRegion,
  companyRegistrationDataUKWithRegion,
} from '../../fixtures/companyData';
import {
  verifyCompanyCreated,
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';

describe('USF-2528: Company Registration', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🚀 Company Registration test suite started');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Company Registration test cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  afterEach(() => {
    cy.logToTerminal('🗑️ Cleaning up test data');
    cy.then(async () => {
      try {
        await cleanupTestCompany();
        cy.logToTerminal('✅ Test data cleanup completed');
      } catch (error) {
        cy.logToTerminal(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  // ==========================================================================
  // TC-01 (P0): Create a new company as a Guest user
  // ==========================================================================

  it('TC-01: Create new company as Guest via navigation menu', () => {
    cy.logToTerminal('========= 📝 TC-01: Create new company as Guest via navigation menu =========');

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('✅ Assert homepage loaded');
    assertHomePageLoaded();
    assertAccountSectionAccessible();

    cy.logToTerminal('🔗 Navigate to company registration via menu');
    navigateToCompanyRegistration();

    testCompanyRegistrationFlow(companyRegistrationData);
    cy.logToTerminal('✅ TC-01: Company registration via navigation menu completed');
  });

  it('TC-01: Create new company as Guest via direct URL', () => {
    cy.logToTerminal('========= 📝 TC-01: Create new company as Guest via direct URL =========');

    cy.logToTerminal('📍 Navigate directly to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    testCompanyRegistrationFlow(companyRegistrationData);
    cy.logToTerminal('✅ TC-01: Company registration via direct URL completed');
  });

  // ==========================================================================
  // TC-02 (P0): Create new Company as registered but not company user
  // ==========================================================================

  it('TC-02: Create new company as authenticated non-company user', () => {
    cy.logToTerminal('========= 📝 TC-02: Create new company as authenticated non-company user =========');

    cy.logToTerminal('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.logToTerminal('✅ Verify page loaded without errors');
    cy.get('body').should('not.contain', 'Page Not Found');
    cy.get('body').should('not.contain', '404');

    cy.logToTerminal('✅ Verify registration form is accessible');
    cy.url().should('include', COMPANY_CREATE_PATH);
    assertCompanyRegistrationForm();

    cy.logToTerminal('📝 Fill and submit company registration form with ALL fields');
    testCompanyRegistrationFlow(companyRegistrationDataAllFields);

    cy.logToTerminal('✅ TC-02: Authenticated non-company user successfully created company');
  });

  // ==========================================================================
  // TC-03 (P1): User cannot create new company if registration is disabled
  // ==========================================================================

  it('TC-03: Redirect to login when registration disabled (unauthenticated, nav menu)', () => {
    cy.logToTerminal('========= 🔒 TC-03: Redirect to login (nav menu, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('✅ Verify redirect to login');
    testCompanyRegistrationRedirect('login');
    cy.logToTerminal('✅ TC-03: Redirect to login verified');
  });

  it('TC-03: Redirect to login when registration disabled (unauthenticated, direct URL)', () => {
    cy.logToTerminal('========= 🔒 TC-03: Redirect to login (direct URL, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.logToTerminal('📍 Navigate directly to company registration');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ Verify redirect to login');
    cy.url().should('include', '/customer/login');
    cy.logToTerminal('✅ TC-03: Redirect to login verified');
  });

  it('TC-03: Redirect to account when registration disabled (authenticated)', () => {
    cy.logToTerminal('========= 🔒 TC-03: Redirect to account (authenticated, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration (allow real auth)');
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query && req.body.query.includes('allow_company_registration')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              storeConfig: {
                allow_company_registration: false,
              },
            },
          },
        });
      } else {
        req.continue();
      }
    }).as('configDisabledWithRealAuth');

    cy.logToTerminal('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.logToTerminal('✅ Verify redirect to account');
    cy.url().should('include', '/customer/account');
    cy.logToTerminal('✅ TC-03: Redirect to account verified');
  });

  // ==========================================================================
  // TC-05 (P2): User cannot create company using email already associated with another company
  // ==========================================================================

  it('TC-05: Duplicate company email validation', () => {
    cy.logToTerminal('========= 📝 TC-05: Duplicate company email validation =========');

    cy.logToTerminal('📍 Step 1: Create first company');
    cy.visit(COMPANY_CREATE_PATH);

    // Create first company and capture its email
    testCompanyRegistrationFlow(companyRegistrationData);
    const firstCompanyEmail = Cypress.env('currentTestCompanyEmail');
    cy.logToTerminal(`✅ First company created with email: ${firstCompanyEmail}`);

    cy.logToTerminal('📍 Step 2: Try to create second company with same email');
    cy.visit(COMPANY_CREATE_PATH);

    // Wait for form to load
    cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
    cy.get('.company-form', { timeout: 8000 }).should('exist');

    // Fill form but use the SAME company email as first company
    cy.get('input[name="companyName"]').clear().type('Duplicate Test Company').blur();
    cy.get('input[name="companyEmail"]').clear().type(firstCompanyEmail).blur();
    cy.get('input[name="street"]').clear().type('456 Test Ave').blur();
    cy.get('input[name="city"]').clear().type('Test City').blur();
    cy.get('select[name="countryCode"]').select('US');
    cy.wait(1000);
    cy.get('select[name="region"]').select('Texas');
    cy.get('input[name="postcode"]').clear().type('54321').blur();
    cy.get('input[name="addressTelephone"]').clear().type('9876543210').blur();

    // Admin with different email
    const adminTimestamp = Date.now();
    const adminRandom = Math.random().toString(36).substring(2, 8);
    const newAdminEmail = `admin.dup.${adminTimestamp}.${adminRandom}@example.com`;
    cy.get('input[name="adminFirstname"]').clear().type('Jane').blur();
    cy.get('input[name="adminLastname"]').clear().type('Doe').blur();
    cy.get('input[name="adminEmail"]').clear().type(newAdminEmail).blur();

    cy.logToTerminal('🚀 Submit form with duplicate company email');
    submitCompanyRegistrationForm();

    cy.logToTerminal('✅ Verify error message for duplicate email');
    // Duplicate email is validated via validateCompanyEmail API before createCompany
    // The error is shown as a field-level error on the companyEmail input
    cy.get('input[name="companyEmail"]')
      .closest('.dropin-field')
      .should('satisfy', ($el) => {
        // Check for error hint or error class on the field
        const hasErrorHint = $el.find('.dropin-field__hint--error').length > 0;
        const hasErrorClass = $el.hasClass('dropin-field--error')
          || $el.find('.dropin-input--error').length > 0
          || $el.find('[class*="error"]').length > 0;
        return hasErrorHint || hasErrorClass;
      });

    // Verify error text contains indication of duplicate/already used email
    cy.get('body').should('contain.text', 'already');

    // Verify form is still visible (not hidden after error)
    cy.get('.company-form', { timeout: 2000 }).should('exist').and('be.visible');

    // Verify we're still on the registration page (not redirected)
    cy.url().should('include', COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ TC-05: Duplicate company email validation completed');
  });

  // ==========================================================================
  // TC-06 (P2): Form validation - required fields
  // ==========================================================================

  it('TC-06: Required fields validation on empty form submit', () => {
    cy.logToTerminal('========= 📝 TC-06: Required fields validation =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ Verify form loaded');
    cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
    cy.get('.company-form', { timeout: 8000 }).should('exist');

    cy.logToTerminal('🚀 Submit empty form');
    submitCompanyRegistrationForm();

    cy.logToTerminal('✅ Verify required field validation errors');

    // Helper to check field has validation error (red border or error class)
    const assertFieldHasError = (fieldName, fieldLabel) => {
      cy.logToTerminal(`  Checking ${fieldLabel}...`);
      cy.get(`input[name="${fieldName}"], select[name="${fieldName}"]`)
        .first()
        .closest('.dropin-field')
        .should('satisfy', ($el) => {
          // Check for error hint or error class
          const hasErrorHint = $el.find('.dropin-field__hint--error').length > 0;
          const hasErrorClass = $el.hasClass('dropin-field--error')
            || $el.find('.dropin-input--error').length > 0
            || $el.find('[class*="error"]').length > 0;
          return hasErrorHint || hasErrorClass;
        });
    };

    // Company Information section - required fields
    assertFieldHasError('companyName', 'Company Name');
    assertFieldHasError('companyEmail', 'Company Email');

    // Legal Address section - required fields
    assertFieldHasError('street', 'Street Address');
    assertFieldHasError('city', 'City');
    assertFieldHasError('postcode', 'Postal Code');
    assertFieldHasError('addressTelephone', 'Phone Number');

    // Company Administrator section - required fields
    assertFieldHasError('adminFirstname', 'Admin First Name');
    assertFieldHasError('adminLastname', 'Admin Last Name');
    assertFieldHasError('adminEmail', 'Admin Email');

    // Verify form was NOT submitted (still on registration page)
    cy.url().should('include', COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ TC-06: Required fields validation completed');
  });

  // ==========================================================================
  // USF-3439: Tests for countries without required regions (UK)
  // ==========================================================================

  it('USF-3439: UK company registration with empty region', () => {
    cy.logToTerminal('========= 🇬🇧 USF-3439: UK company registration with empty region =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('🇬🇧 Test UK company with empty region');
    testCompanyRegistrationFlow(companyRegistrationDataUKNoRegion);
    cy.logToTerminal('✅ USF-3439: UK company with empty region registered successfully');
  });

  it('USF-3439: UK company registration with optional region name', () => {
    cy.logToTerminal('========= 🇬🇧 USF-3439: UK company registration with optional region =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('🇬🇧 Test UK company with optional region');
    testCompanyRegistrationFlow(companyRegistrationDataUKWithRegion);
    cy.logToTerminal('✅ USF-3439: UK company with optional region registered successfully');
  });
});

/**
 * Execute the company registration flow.
 * Verifies page state, fills form, submits, and validates success.
 * @param {Object} testData - Company registration test data
 * @param {Object} testData.company - Company information
 * @param {Object} testData.legalAddress - Legal address information
 * @param {Object} testData.companyAdmin - Admin information
 */
const testCompanyRegistrationFlow = (testData) => {
  cy.logToTerminal('✅ Verify page URL and title');
  cy.url().should('include', COMPANY_CREATE_PATH);
  cy.title().should('not.be.empty');

  cy.logToTerminal('✅ Verify page loaded without errors');
  cy.get('body').should('not.contain', 'Page Not Found');
  cy.get('body').should('not.contain', '404');

  cy.logToTerminal('✅ Verify form containers exist');
  cy.get('.commerce-company-create-container', { timeout: 8000 }).should('exist');
  cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
  cy.get('.company-form', { timeout: 8000 }).should('exist');

  cy.logToTerminal('📝 Verify form fields are present');
  assertCompanyRegistrationForm();

  cy.logToTerminal(`📝 Fill company registration form: ${testData.company.companyName}`);
  fillCompanyRegistrationForm(testData);

  cy.logToTerminal('🚀 Submit registration form');
  submitCompanyRegistrationForm();

  cy.logToTerminal('✅ Verify successful registration on UI');
  assertCompanyRegistrationSuccess(testData);

  cy.logToTerminal('🔍 Verify company in backend via REST API');
  verifyCompanyInBackend(testData);
};

/**
 * Verify company was created in backend via REST API.
 * Uses the company email stored in Cypress environment.
 * This function will FAIL the test if backend verification fails.
 * @param {Object} testData - Company registration test data
 * @param {Object} testData.company - Company information
 * @param {string} testData.company.companyName - Expected company name
 */
const verifyCompanyInBackend = (testData) => {
  const companyEmail = Cypress.env('currentTestCompanyEmail');

  if (!companyEmail) {
    throw new Error('No company email found - cannot verify backend. Test data may not have been set correctly.');
  }

  cy.then(async () => {
    cy.logToTerminal(`🔍 Verifying company in backend: ${companyEmail}`);

    const result = await verifyCompanyCreated(companyEmail, {
      companyName: testData.company.companyName,
    });

    if (result.success) {
      cy.logToTerminal(`✅ Backend verified: ID=${result.company.id}, Status=${result.company.status}`);
    } else {
      // Fail the test - backend verification is required
      throw new Error(`Backend verification failed: ${result.error}`);
    }
  });
};

/**
 * Test redirect behavior based on configuration and authentication state.
 * @param {string} expectedDestination - Expected redirect destination ('form', 'login', 'account')
 * @throws {Error} If unknown destination is provided
 */
const testCompanyRegistrationRedirect = (expectedDestination) => {
  cy.logToTerminal('📍 Navigate to company registration page');
  cy.visit(COMPANY_CREATE_PATH);

  cy.url({ timeout: 3000 });

  cy.logToTerminal(`✅ Verify redirect to: ${expectedDestination}`);
  switch (expectedDestination) {
    case 'form':
      cy.logToTerminal('📝 Expecting registration form');
      cy.url().should('include', COMPANY_CREATE_PATH);
      cy.get('.company-registration-container', { timeout: 5000 }).should('exist');
      cy.get('.company-form', { timeout: 5000 }).should('exist');
      break;

    case 'login':
      cy.logToTerminal('🔐 Expecting login page');
      cy.url().should('include', '/customer/login');
      break;

    case 'account':
      cy.logToTerminal('👤 Expecting account page');
      cy.url().should('include', '/customer/account');
      break;

    default:
      throw new Error(`Unknown expected destination: ${expectedDestination}`);
  }
};

/**
 * Create and authenticate a customer for testing.
 * Navigates to customer create page, fills form, and verifies authentication.
 */
const createAuthenticatedUser = () => {
  cy.logToTerminal('📍 Navigate to customer create page');
  cy.visit('/customer/create');
  cy.fixture('userInfo').then(({ sign_up }) => {
    cy.logToTerminal('📝 Fill sign up form');
    signUpUser(sign_up);
    cy.logToTerminal('✅ Verify successful authentication');
    cy.url().should('include', '/customer/account');
  });
};

/**
 * Mock disabled company registration configuration.
 * Sets up intercepts to return allow_company_registration: false.
 */
const mockDisabledConfiguration = () => {
  cy.logToTerminal('🔧 Setting up mocks for disabled company registration');

  cy.logToTerminal('📡 Mock POST GraphQL requests');
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.query && req.body.query.includes('allow_company_registration')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              allow_company_registration: false,
            },
          },
        },
      });
    } else if (req.body.query && req.body.query.includes('storeConfig')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              store_code: 'default',
            },
          },
        },
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          data: {},
        },
      });
    }
  }).as('disabledConfigMock');

  cy.logToTerminal('📡 Mock GET GraphQL requests');
  cy.intercept('GET', '**/graphql*', {
    statusCode: 200,
    body: {
      data: {},
    },
  }).as('graphqlGetMocks');
};
