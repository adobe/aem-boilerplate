/**
 * Cypress custom commands for B2B company setup.
 * Provides reusable setup functions for creating test companies with different configurations.
 *
 * These commands handle:
 * - Company creation with unique identifiers
 * - Admin and user account creation
 * - Credential storage in Cypress.env for use in tests
 *
 * @example
 * // Setup company with just admin
 * cy.setupCompanyWithAdmin();
 *
 * @example
 * // Setup company with admin + regular user
 * cy.setupCompanyWithUser();
 *
 * @example
 * // Setup company with admin + 2 additional users
 * cy.setupCompanyWith2Users();
 */

const {
  createCompany,
  createCompanyUser,
  createCompanyRole,
  assignRoleToUser,
} = require('./b2bCompanyAPICalls');

const { baseCompanyData, companyUsers } = require('../fixtures/companyManagementData');

/**
 * Setup test company with admin only.
 * Creates a company with a single admin user.
 * Stores credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWithAdmin', () => {
  cy.logToTerminal('🏢 Setting up test company with admin...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Store for cleanup and login
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
  });
});

/**
 * Setup test company with admin + regular user.
 * Creates a company with admin and one additional user with default role.
 * Stores credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWithUser', () => {
  cy.logToTerminal('🏢 Setting up test company with regular user...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueRegularUserEmail = `regular.${timestamp}.${randomStr}@example.com`;

    // Create company with admin
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Create regular user
    const regularUser = await createCompanyUser({
      email: uniqueRegularUserEmail,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email} (ID: ${regularUser.id})`);

    // Store for cleanup and login
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
    Cypress.env('testUsers', {
      regular: {
        email: uniqueRegularUserEmail,
        password: companyUsers.regularUser.password,
        id: regularUser.id,
      },
    });
  });
});

/**
 * Setup test company with restricted user (no credit history access).
 * Used for Company Credit permission testing.
 */
Cypress.Commands.add('setupCompanyWithRestrictedUser', () => {
  cy.then(async () => {
    const {
      createCompany, createCompanyUser, createCompanyRole, assignRoleToUser,
    } = await import('./b2bCompanyAPICalls.js');
    const fixturesModule = await import('../fixtures/companyManagementData.js');
    const baseCompanyData = fixturesModule.baseCompanyData;
    const companyUsers = fixturesModule.companyUsers;

    cy.logToTerminal('🏢 Setting up test company with restricted user...');
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueRestrictedUserEmail = `restricted.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    // Create restricted role (no credit history access)
    const restrictedRole = await createCompanyRole({
      company_id: testCompany.id,
      role_name: 'Restricted User',
      permissions: [], // No permissions
    });

    // Create restricted user
    const restrictedUser = await createCompanyUser({
      email: uniqueRestrictedUserEmail,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    // Assign restricted role
    await assignRoleToUser(restrictedUser.id, restrictedRole);

    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
    Cypress.env('testUsers', {
      restricted: {
        email: uniqueRestrictedUserEmail,
        password: companyUsers.regularUser.password,
      },
    });
    Cypress.env('testRole', {
      restrictedId: restrictedRole.id,
    });

    cy.logToTerminal(`✅ Company with restricted user created: ${testCompany.name}`);
  });
});

/**
 * Setup test company with allocated credit and Payment on Account permission.
 * Used for Company Credit order lifecycle testing.
 */
Cypress.Commands.add('setupCompanyWithCredit', () => {
  cy.then(async () => {
    const { createCompany, getCompanyCredit, updateCompanyCredit, createCompanyRole, assignRoleToUser } = await import('../support/b2bCompanyAPICalls.js');
    const fixturesModule = await import('../fixtures/companyManagementData.js');
    const baseCompanyData = fixturesModule.baseCompanyData;
    const fullAdminPermissions = fixturesModule.fullAdminPermissions;

    cy.logToTerminal('🏢 Setting up test company with allocated credit and Payment on Account permission...');
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    // Company admin automatically has full permissions including Payment on Account
    // No need to create/assign additional role
    cy.logToTerminal('✅ Company admin created with full permissions (including Payment on Account)');

    // Allocate company credit for order placement
    const creditInfo = await getCompanyCredit(testCompany.id);
    await updateCompanyCredit(creditInfo.id, {
      company_id: testCompany.id,
      credit_limit: 500.00, // $500 credit limit
      currency_code: 'USD',
    });
    cy.logToTerminal('✅ Company credit allocated: $500.00');

    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
    Cypress.env('testCredit', {
      id: creditInfo.id,
      limit: 500.00,
    });

    cy.logToTerminal(`✅ Company with credit created: ${testCompany.name}`);
  });
});

/**
 * Setup test company with admin + 2 additional users.
 * Creates a company with admin and two additional users.
 * Stores all credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWith2Users', () => {
  cy.logToTerminal('🏢 Setting up test company with 2 additional users...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueUser1Email = `user1.${timestamp}.${randomStr}@example.com`;
    const uniqueUser2Email = `user2.${timestamp}.${randomStr}@example.com`;

    // Create company with admin
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    cy.logToTerminal(`✅ Company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Create first user
    const user1 = await createCompanyUser({
      email: uniqueUser1Email,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ User 1 created: ${user1.email} (ID: ${user1.id})`);

    // Create second user
    const user2 = await createCompanyUser({
      email: uniqueUser2Email,
      firstname: companyUsers.managerUser.firstname,
      lastname: companyUsers.managerUser.lastname,
      password: companyUsers.managerUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ User 2 created: ${user2.email} (ID: ${user2.id})`);

    // Store for cleanup and tests
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
    Cypress.env('testUsers', {
      user1: {
        email: uniqueUser1Email,
        id: user1.id,
      },
      user2: {
        email: uniqueUser2Email,
        id: user2.id,
      },
    });
  });
});

/**
 * Alias for setupCompanyWithUser.
 * Setup test company with admin + regular user.
 */
Cypress.Commands.add('setupCompanyWithRegularUser', () => {
  cy.setupCompanyWithUser();
});
