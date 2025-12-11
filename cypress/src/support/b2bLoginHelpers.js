/**
 * Cypress custom commands for B2B login operations.
 * Provides reusable login functions for different user types.
 *
 * These commands handle:
 * - Credential retrieval from Cypress.env
 * - Navigation to login page
 * - Form filling and submission
 * - Wait for login completion
 *
 * @example
 * // Login as company admin
 * cy.loginAsCompanyAdmin();
 *
 * @example
 * // Login as regular user
 * cy.loginAsRegularUser();
 */

/**
 * Login as company admin.
 * Uses credentials stored in Cypress.env by setup commands.
 * Throws error if credentials are not set.
 */
Cypress.Commands.add('loginAsCompanyAdmin', () => {
  cy.then(() => {
    const testAdmin = Cypress.env('testAdmin');

    if (!testAdmin || !testAdmin.email || !testAdmin.password) {
      throw new Error(
        'Admin credentials not set. Did you forget to call cy.setupCompanyWithAdmin()?',
      );
    }

    cy.logToTerminal(`🔐 Logging in as admin: ${testAdmin.email}`);
    cy.visit('/customer/login');
    cy.wait(1000); // Ensure page is ready

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').type(testAdmin.email);
      cy.wait(1500);
      cy.get('input[name="password"]').type(testAdmin.password);
      cy.wait(1500);
      cy.get('button[type="submit"]').click();
    });

    cy.wait(8000); // Wait for login to complete
    cy.logToTerminal('✅ Admin logged in successfully');
  });
});

/**
 * Login as regular user.
 * Uses credentials stored in Cypress.env by setup commands.
 * Throws error if credentials are not set.
 */
Cypress.Commands.add('loginAsRegularUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');

    if (!testUsers || !testUsers.regular || !testUsers.regular.email || !testUsers.regular.password) {
      throw new Error(
        'Regular user credentials not set. Did you forget to call cy.setupCompanyWithUser()?',
      );
    }

    cy.logToTerminal(`🔐 Logging in as regular user: ${testUsers.regular.email}`);
    cy.visit('/customer/login');
    cy.wait(1000); // Ensure page is ready

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').type(testUsers.regular.email);
      cy.wait(1500);
      cy.get('input[name="password"]').type(testUsers.regular.password);
      cy.wait(1500);
      cy.get('button[type="submit"]').click();
    });

    cy.wait(8000); // Wait for login to complete
    cy.logToTerminal('✅ Regular user logged in successfully');
  });
});

/**
 * Combined command: Setup company with admin and login immediately.
 * Convenience method for common pattern in tests.
 */
Cypress.Commands.add('setupAndLoginAsAdmin', () => {
  cy.setupCompanyWithAdmin();
  cy.loginAsCompanyAdmin();
});

/**
 * Combined command: Setup company with user and login as regular user immediately.
 * Convenience method for common pattern in tests.
 */
Cypress.Commands.add('setupAndLoginAsUser', () => {
  cy.setupCompanyWithUser();
  cy.loginAsRegularUser();
});

/**
 * Login as restricted company user (for Company Credit tests).
 * Uses credentials stored in Cypress.env during setup.
 */
Cypress.Commands.add('loginAsRestrictedUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');
    
    if (!testUsers || !testUsers.restricted || !testUsers.restricted.email || !testUsers.restricted.password) {
      throw new Error(
        `Restricted user credentials not set. Did you forget to call cy.setupCompanyWithRestrictedUser()?`
      );
    }
    
    cy.logToTerminal(`🔐 Logging in as restricted user: ${testUsers.restricted.email}`);
    cy.visit('/customer/login');
    cy.wait(1000); // Ensure page is ready
    
    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').type(testUsers.restricted.email);
      cy.wait(1500);
      cy.get('input[name="password"]').type(testUsers.restricted.password);
      cy.wait(1500);
      cy.get('button[type="submit"]').click();
    });
    
    cy.wait(8000); // Wait for login to complete
    cy.logToTerminal('✅ Restricted user logged in successfully');
  });
});
