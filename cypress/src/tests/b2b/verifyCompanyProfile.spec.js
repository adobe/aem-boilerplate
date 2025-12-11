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
 * @fileoverview Company Profile E2E Journey Tests (OPTIMIZED).
 *
 * Tests Company Profile functionality through realistic user journeys.
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 2: Company Profile
 *
 * ==========================================================================
 * OPTIMIZATION APPROACH:
 * ==========================================================================
 * BEFORE: 7 tests with separate setup/cleanup (2:43 runtime, ~23s per test)
 * AFTER: 2 journey tests (~1-2min runtime)
 * TIME SAVED: ~1 minute (40% reduction)
 *
 * KEY OPTIMIZATION:
 * - Setup/teardown overhead reduced from 7x to 2x
 * - Combined profile display + edit in single journey
 * - Combined admin and user views in single journey
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-07: Company created in Admin Panel displays on My Company page
 * TC-08: Company with ALL fields displays correctly
 * TC-11: Company info block displays on Account page
 * TC-12: Admin can edit Account Information and Legal Address
 * TC-13: Regular user can view but not edit
 *
 * NOT COVERED (Platform Limitations):
 * - TC-09: Storefront-created company (requires company activation API)
 * - TC-14: Backend changes sync (PUT /V1/company/{id} returns 404 on ACCS)
 *
 * ==========================================================================
 */

import {
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  invalidData,
} from '../../fixtures/companyManagementData';

describe('USF-2525: Company Profile (Optimized Journeys)', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🚀 Company Profile test suite started (OPTIMIZED)');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Test cleanup');
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

  /**
   * ==========================================================================
   * JOURNEY 1: Admin Profile Management
   * ==========================================================================
   * Combines: TC-07, TC-08, TC-11 (admin), TC-12
   * Tests: Profile display (all fields), company info block, edit functionality, validation
   * Setup: ONCE at journey start
   * Time: ~1-2 minutes (vs 4 tests x 23s = 1.5 minutes, but better flow)
   */
  it('JOURNEY: Admin views and manages company profile', () => {
    cy.logToTerminal('========= 🚀 JOURNEY 1: Admin Profile Management =========');

    // ========== SETUP: Create company with admin (ONCE) ==========
    cy.setupCompanyWithAdmin();

    cy.then(() => {
      // ========== LOGIN: As admin ==========
      cy.logToTerminal('🔐 Login as company admin');
      cy.loginAsCompanyAdmin();

      // ========== TC-11: Company info block on Account page ==========
      cy.logToTerminal('--- STEP 1: TC-11 - Verify company info block (admin) ---');

      // After login, user is on /customer/account
      cy.logToTerminal('✅ Verify company information block exists');
      cy.get('.customer-company-info-card', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name is displayed');
      cy.contains(Cypress.env('testCompany').name).should('be.visible');

      cy.logToTerminal('✅ Verify user role is displayed');
      cy.contains('Company Administrator').should('be.visible');

      cy.logToTerminal('✅ TC-11: Company info block verified');

      // ========== TC-07/TC-08: Company profile display with all fields ==========
      cy.logToTerminal('--- STEP 2: TC-07/TC-08 - Verify profile display (all fields) ---');

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify company information sections exist');
      cy.get('.account-company-profile', { timeout: 10000 })
        .should('exist');

      // TC-07: Required fields
      cy.logToTerminal('✅ Verify company name');
      cy.contains(Cypress.env('testCompany').name).should('be.visible');

      cy.logToTerminal('✅ Verify legal address section');
      cy.contains('Legal Address').should('be.visible');
      cy.contains(Cypress.env('testCompany').street).should('be.visible');
      cy.contains(Cypress.env('testCompany').city).should('be.visible');
      cy.contains(Cypress.env('testCompany').postcode).should('be.visible');
      cy.contains(Cypress.env('testCompany').telephone).should('be.visible');

      cy.logToTerminal('✅ Verify contacts section');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Company Administrator').should('be.visible');

      // TC-08: Optional fields (ALL fields)
      cy.logToTerminal('✅ Verify optional fields - Legal Name');
      cy.contains(Cypress.env('testCompany').legalName).should('be.visible');

      cy.logToTerminal('✅ Verify optional fields - VAT/Tax ID');
      cy.contains(Cypress.env('testCompany').vatTaxId).should('be.visible');

      cy.logToTerminal('✅ Verify optional fields - Reseller ID');
      cy.contains(Cypress.env('testCompany').resellerId).should('be.visible');

      cy.logToTerminal('✅ TC-07/TC-08: Profile displays correctly with all fields');

      // ========== TC-12: Admin can edit profile ==========
      cy.logToTerminal('--- STEP 3: TC-12 - Admin edits profile with validation ---');

      cy.logToTerminal('✏️ Click Edit button');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify edit form appears');
      cy.get('.account-edit-company-profile-form', { timeout: 5000 })
        .should('be.visible');

      // Validation: Required fields
      cy.logToTerminal('📝 Test required field validation');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .blur();

      cy.logToTerminal('💾 Try to save with empty required field');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify form validation prevents save');
      cy.get('.account-edit-company-profile-form').should('exist');

      // Validation: Special characters
      cy.logToTerminal('📝 Test special characters validation');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .type(invalidData.specialCharsCompanyName);

      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify special characters handled');
      cy.get('body').then(($body) => {
        if ($body.text().match(/invalid.*character|not.*allowed/i)) {
          cy.logToTerminal('✅ Special characters blocked by validation');
        } else {
          cy.get('body').should('not.contain', '<script>');
          cy.logToTerminal('✅ Special characters sanitized');
        }
      });

      // Successful edit
      cy.logToTerminal('📝 Update company profile with valid data');
      const updatedName = `Updated ${Cypress.env('testCompany').name}`;
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .type(updatedName);

      cy.logToTerminal('📝 Update legal name');
      cy.get('input[name="legalName"]')
        .should('be.visible')
        .clear()
        .type('Updated Legal Name LLC');

      cy.logToTerminal('📝 Update street address');
      cy.get('input[name="legalAddress_street"]')
        .should('be.visible')
        .clear()
        .type('999 Updated Street')
        .blur();

      cy.logToTerminal('💾 Save changes');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.logToTerminal('⏳ Wait for save to complete');
      cy.get('.account-edit-company-profile-form', { timeout: 15000 })
        .should('not.exist');

      cy.logToTerminal('✅ Verify updated data is displayed');
      cy.contains('999 Updated Street', { timeout: 15000 })
        .should('exist');
      cy.contains('Updated Test Company', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ TC-12: Admin successfully edited company profile');
      cy.logToTerminal('========= 🎉 JOURNEY 1 COMPLETED =========');
    });
  });

  /**
   * ==========================================================================
   * JOURNEY 2: Regular User View-Only Access
   * ==========================================================================
   * Combines: TC-11 (user), TC-13
   * Tests: Company info block for regular user, view-only access verification
   * Setup: ONCE at journey start
   * Time: ~1 minute (vs 2 tests x 23s = 46s)
   */
  it('JOURNEY: Regular user has view-only profile access', () => {
    cy.logToTerminal('========= 🚀 JOURNEY 2: Regular User View-Only Access =========');

    // ========== SETUP: Create company with regular user (ONCE) ==========
    cy.setupCompanyWithRegularUser();

    cy.then(() => {
      // ========== LOGIN: As regular user ==========
      cy.logToTerminal('🔐 Login as regular user');
      cy.loginAsRegularUser();

      // ========== TC-11: Company info block for regular user ==========
      cy.logToTerminal('--- STEP 1: TC-11 - Verify company info block (user) ---');

      // After login, user is on /customer/account
      cy.logToTerminal('✅ Verify company information block exists');
      cy.get('.customer-company-info-card', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name is displayed');
      cy.contains(Cypress.env('testCompany').name).should('be.visible');

      cy.logToTerminal('✅ TC-11: Company info block displays for regular user');

      // ========== TC-13: User cannot edit profile ==========
      cy.logToTerminal('--- STEP 2: TC-13 - Verify view-only access ---');

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify company profile is visible');
      cy.get('.account-company-profile', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company information is displayed (read-only)');
      cy.contains(Cypress.env('testCompany').name).should('be.visible');

      cy.logToTerminal('✅ Verify Edit button is NOT visible');
      cy.contains('button', 'Edit').should('not.exist');

      cy.logToTerminal('✅ TC-13: User cannot edit (controls hidden)');
      cy.logToTerminal('========= 🎉 JOURNEY 2 COMPLETED =========');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Profile test suite completed');
  });
});
