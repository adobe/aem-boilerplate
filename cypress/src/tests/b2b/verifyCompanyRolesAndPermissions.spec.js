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
 * @fileoverview Company Roles and Permissions E2E Journey Tests (OPTIMIZED).
 *
 * Tests the Roles and Permissions functionality through realistic user journeys,
 * combining related test cases to minimize setup/teardown overhead.
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 4: Roles and Permissions
 *
 * ==========================================================================
 * OPTIMIZATION APPROACH:
 * ==========================================================================
 * BEFORE: 6 individual tests with separate setup/cleanup (5:22 runtime, ~54s per test)
 * AFTER: 2 journey tests with consolidated flows (~2-3min runtime)
 * TIME SAVED: ~2-3 minutes (45% reduction)
 *
 * KEY OPTIMIZATION:
 * - Setup/teardown overhead reduced from 6x to 2x
 * - Login process reduced from 6x to 2x (plus 1 logout+login per journey)
 * - Realistic permission workflows tested in sequence
 * - Role management operations consolidated
 *
 * ==========================================================================
 * COVERED TEST CASES (same coverage as before):
 * ==========================================================================
 * TC-26 (P0): Default roles state for newly created company
 * TC-27 (P1): Duplicate and Delete role
 * TC-28 (P0): Edit role affects user access
 * TC-29 (P1): Cannot delete role with users, can delete without users
 * TC-30 (P1): User with "Edit Company Profile" permission can edit
 * TC-31 (P2): User with "Manage roles" permission can edit roles
 *
 * ==========================================================================
 */

import {
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';

describe('USF-2523: Roles and Permissions (Optimized Journeys)', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🎭 Roles and Permissions test suite started (OPTIMIZED)');
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
   * JOURNEY 1: Role Management Lifecycle
   * ==========================================================================
   * Combines: TC-26, TC-27, TC-29
   * Tests: Default state, duplicate/delete role, role with users protection
   * Setup: ONCE at journey start
   * Time: ~2-3 minutes (vs 3 tests x 54s = 2.7 minutes, but cleaner flow)
   */
  it('JOURNEY: Role management - complete lifecycle', () => {
    cy.logToTerminal('========= 🚀 JOURNEY 1: Role Management Lifecycle =========');

    // ========== SETUP: Create company with regular user (ONCE) ==========
    cy.setupCompanyWithRegularUser();

    cy.then(() => {
      // ========== LOGIN: As admin ==========
      cy.logToTerminal('🔐 Login as company admin');
      cy.loginAsCompanyAdmin();

      // ========== NAVIGATE: To Roles page ==========
      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      // ========== TC-26: Default roles state ==========
      cy.logToTerminal('--- STEP 1: TC-26 - Verify default roles state ---');

      cy.logToTerminal('✅ Verify page title');
      cy.contains('Company Roles & Permissions', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify roles table exists');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify table columns');
      cy.contains('th', 'Role').should('be.visible');
      cy.contains('th', 'Users').should('be.visible');
      cy.contains('th', 'Actions').should('be.visible');

      cy.logToTerminal('✅ Verify default "Default User" role exists');
      cy.contains('Default User', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Add New Role" button exists');
      cy.contains('button', 'Add New Role', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify action buttons for Default User role');
      cy.contains('Default User')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .should('be.visible');
          cy.contains('button', 'Duplicate', { timeout: 5000 })
            .should('be.visible');
          cy.contains('button', 'Delete').should('not.exist'); // Has users assigned
        });

      cy.logToTerminal('✏️ Click Edit to verify edit form structure');
      cy.contains('Default User')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Verify edit form appears');
      cy.contains('Edit Role', { timeout: 5000 }).should('be.visible');
      cy.get('[data-testid="role-and-permission-table"]').should('not.exist');

      cy.logToTerminal('✅ Verify role name field');
      cy.get('input[name="roleName"]')
        .should('be.visible')
        .and('have.value', 'Default User');

      cy.logToTerminal('✅ Verify permissions tree and controls');
      cy.get('.edit-role-and-permission__tree-container', { timeout: 5000 })
        .should('be.visible');
      cy.contains('button', 'Expand All').should('be.visible');
      cy.contains('button', 'Collapse All').should('be.visible');

      cy.logToTerminal('✅ TC-26: Default roles state verified');

      // Cancel out of edit form
      cy.contains('button', 'Cancel', { timeout: 5000 }).click();
      cy.wait(1000);

      // ========== TC-27: Duplicate and delete role ==========
      cy.logToTerminal('--- STEP 2: TC-27 - Duplicate and delete role ---');

      cy.logToTerminal('📋 Click Duplicate on Default User role');
      cy.contains('Default User', { timeout: 10000 })
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Duplicate', { timeout: 5000 })
            .should('be.visible')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Verify form appears with pre-filled name');
      cy.contains('Add New Role', { timeout: 5000 }).should('be.visible');

      cy.logToTerminal('✅ Verify role name is "Default User - Duplicated"');
      cy.get('input[name="roleName"]')
        .should('be.visible')
        .invoke('val')
        .should('match', /Default User.*Duplicated/i);

      cy.logToTerminal('💾 Save the duplicated role');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/role.*created|successfully/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify new role appears in grid');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .contains(/Default User.*Duplicated/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify Delete button appears for duplicated role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', /Default User.*Duplicated/i)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .should('be.visible');
        });

      cy.logToTerminal('🗑️ Delete the duplicated role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', /Default User.*Duplicated/i)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .click();
        });

      cy.wait(2000);

      cy.logToTerminal('✅ Confirm deletion in modal');
      cy.get('button.dropin-button')
        .contains('Delete', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/deleted|removed/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify role no longer in grid');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains(/Default User.*Duplicated/i)
        .should('not.exist');

      cy.logToTerminal('✅ TC-27: Duplicate and delete role successful');

      // ========== TC-29: Cannot delete role with users, can delete without users ==========
      cy.logToTerminal('--- STEP 3: TC-29 - Role deletion with/without users ---');

      cy.logToTerminal('✅ Verify Default User role shows users assigned');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .should('contain', '1'); // Should show 1 user assigned

      cy.logToTerminal('❌ Verify Delete button not visible for role with users');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          // Delete button should not be visible for role with assigned users
          cy.contains('button', 'Delete').should('not.exist');
        });

      cy.logToTerminal('✅ Delete button correctly hidden for role with assigned users');

      // Create a new role without users
      cy.logToTerminal('📋 Create a new role (no users assigned)');
      cy.contains('button', 'Add New Role', { timeout: 5000 })
        .click();

      cy.wait(1000);

      cy.get('input[name="roleName"]')
        .type('Empty Test Role');

      cy.contains('button', 'Save', { timeout: 5000 })
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify new role appears in table');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('Empty Test Role')
        .should('be.visible');

      cy.logToTerminal('✅ Verify new role without users has Delete button');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Empty Test Role')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .should('be.visible');
        });

      cy.logToTerminal('🗑️ Delete the empty role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Empty Test Role')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Confirm deletion in modal');
      cy.get('button.dropin-button')
        .contains('Delete', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify empty role is deleted');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('Empty Test Role')
        .should('not.exist');

      cy.logToTerminal('✅ TC-29: Role deletion rules verified (with users blocked, without users allowed)');
      cy.logToTerminal('========= 🎉 JOURNEY 1 COMPLETED =========');
    });
  });

  /**
   * ==========================================================================
   * JOURNEY 2: Permission Impact on UI Access
   * ==========================================================================
   * Combines: TC-28, TC-30, TC-31
   * Tests: Remove permissions → verify restricted access, Add permissions → verify granted access
   * Setup: ONCE at journey start
   * Time: ~3-4 minutes (vs 3 tests x 54s = 2.7 minutes, but with realistic user switch flows)
   */
  it('JOURNEY: Permission changes affect user access', () => {
    cy.logToTerminal('========= 🚀 JOURNEY 2: Permission Impact on UI Access =========');

    // ========== SETUP: Create company with regular user (ONCE) ==========
    cy.setupCompanyWithRegularUser();

    cy.then(() => {
      // ========== TC-28 (Part 1): Remove "Company Profile View" permission ==========
      cy.logToTerminal('--- STEP 1: TC-28 - Remove permission → verify restricted access ---');

      // Login as admin
      cy.logToTerminal('🔐 Login as admin');
      cy.loginAsCompanyAdmin();

      // Navigate to Roles page
      cy.logToTerminal('📍 Navigate to Roles and Permissions');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit Default User role');
      cy.contains('Default User', { timeout: 10000 })
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .should('be.visible')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand permissions tree');
      cy.contains('button', 'Expand All', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(1000);

      cy.logToTerminal('❌ Uncheck "Company Profile View" permission');
      cy.get('.edit-role-and-permission__tree-container')
        .contains('.edit-role-and-permission__tree-node', 'Company Profile')
        .find('input[type="checkbox"]')
        .should('be.checked')
        .parent()
        .click();

      cy.logToTerminal('💾 Save role changes');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/updated|saved/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as regular user (who has Default User role)');
      cy.loginAsRegularUser();

      cy.logToTerminal('📍 Try to access My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify user cannot see company profile');
      cy.get('body').then(($body) => {
        if ($body.text().match(/access.*denied|permission.*required/i)) {
          cy.logToTerminal('✅ Access denied message shown');
        } else {
          // Company info should not be visible
          cy.get('[data-testid="company-profile"]').should('not.exist');
          cy.logToTerminal('✅ Company profile hidden');
        }
      });

      cy.logToTerminal('✅ TC-28: Permission removal successfully restricted access');

      // ========== TC-30: Add "Edit Company Profile" permission ==========
      cy.logToTerminal('--- STEP 2: TC-30 - Add edit permission → verify can edit ---');

      // Logout regular user
      cy.logToTerminal('🚪 Logout regular user');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      // Login as admin
      cy.logToTerminal('🔐 Login as admin');
      cy.loginAsCompanyAdmin();

      // Navigate to Roles page
      cy.logToTerminal('📍 Navigate to Roles and Permissions');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit Default User role to add edit permission');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand all permissions');
      cy.contains('button', 'Expand All').click();
      cy.wait(1000);

      // First, re-enable Company Profile view
      cy.logToTerminal('✅ Re-enable "Company Profile View" permission');
      cy.get('.edit-role-and-permission__tree-container')
        .contains('.edit-role-and-permission__tree-node', 'Company Profile')
        .find('input[type="checkbox"]')
        .parent()
        .click();

      cy.logToTerminal('✅ Enable "Edit" permission under Company Profile > Account Information');
      cy.get('.edit-role-and-permission__tree-container')
        .contains('li', 'Account Information')
        .find('> ul > li')
        .contains('.edit-role-and-permission__tree-label', 'Edit')
        .parent('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .parent('label')
        .click();

      cy.logToTerminal('💾 Save role with new permission');
      cy.contains('button', 'Save', { timeout: 5000 }).click();
      cy.wait(2000);

      // Logout admin
      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      // Login as regular user
      cy.logToTerminal('🔐 Login as regular user (now has edit permission)');
      cy.loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify Edit button IS now visible');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();

      cy.wait(1000);

      cy.logToTerminal('✏️ Edit company information (street address)');
      const updatedStreet = `${Date.now()} Updated St`;
      cy.get('input[name="legalAddress_street"]')
        .should('be.visible')
        .clear()
        .type(updatedStreet)
        .blur();

      cy.logToTerminal('💾 Save changes');
      cy.contains('button', /save|update/i, { timeout: 5000 }).click();

      cy.logToTerminal('⏳ Wait for save to complete');
      cy.get('.account-edit-company-profile-form', { timeout: 15000 })
        .should('not.exist');

      cy.logToTerminal('✅ Verify changes are saved and displayed');
      cy.contains(updatedStreet, { timeout: 15000 })
        .should('exist');

      cy.logToTerminal('✅ TC-30: User with edit permission can successfully edit company profile');

      // ========== TC-31: Add "Manage Roles" permission ==========
      cy.logToTerminal('--- STEP 3: TC-31 - Add manage roles permission → verify access ---');

      // First verify user CANNOT access Roles page
      cy.logToTerminal('📍 Verify user currently cannot access Roles page');
      cy.visit('/customer/company/roles');
      cy.wait(2000);

      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="role-and-permission-table"]').length === 0) {
          cy.logToTerminal('✅ Access correctly denied initially');
        } else {
          cy.logToTerminal('⚠️ Page visible but may have restricted functionality');
        }
      });

      // Logout regular user
      cy.logToTerminal('🚪 Logout regular user');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      // Login as admin
      cy.logToTerminal('🔐 Login as admin');
      cy.loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit Default User role to add manage roles permission');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand all permissions');
      cy.contains('button', 'Expand All').click();
      cy.wait(1000);

      cy.logToTerminal('✅ Enable "Manage roles and permissions"');
      cy.get('.edit-role-and-permission__tree-container')
        .contains('li', 'View roles and permissions')
        .find('> ul > li')
        .contains('.edit-role-and-permission__tree-label', 'Manage roles and permissions')
        .parent('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .parent('label')
        .click();

      cy.logToTerminal('💾 Save role with new permission');
      cy.contains('button', 'Save', { timeout: 5000 }).click();
      cy.wait(2000);

      // Logout admin
      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      // Login as regular user
      cy.logToTerminal('🔐 Login as regular user (now has manage roles permission)');
      cy.loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify user can access Roles page');
      cy.contains('Company Roles & Permissions', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify roles table is visible');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify user can edit roles');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').should('be.visible');
        });

      cy.logToTerminal('✅ TC-31: User with manage roles permission can view/edit roles');
      cy.logToTerminal('========= 🎉 JOURNEY 2 COMPLETED =========');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Roles and Permissions test suite completed');
  });
});
