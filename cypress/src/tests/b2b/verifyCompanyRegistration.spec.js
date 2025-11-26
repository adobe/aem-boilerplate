import {
  assertCompanyRegistrationForm,
  assertCompanyRegistrationSuccess,
  assertHomePageLoaded,
  assertAccountSectionAccessible
} from "../../assertions";
import { COMPANY_CREATE_PATH } from "../../fields";
import {
  fillCompanyRegistrationForm,
  submitCompanyRegistrationForm,
  navigateToCompanyRegistration,
  signUpUser
} from "../../actions";
import {
  companyRegistrationData
} from "../../fixtures/companyData";

describe("USF-2528: Company Registration", () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    // Clear any existing intercepts
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  it("USF-2789: Verify company registration via navigation menu", () => {
    cy.visit("/");

    assertHomePageLoaded();
    assertAccountSectionAccessible();

    navigateToCompanyRegistration();

    testCompanyRegistrationFlow();
  });

  it("USF-2789: Verify company registration via direct URL", () => {
    cy.visit(COMPANY_CREATE_PATH);

    testCompanyRegistrationFlow();
  });

  it("USF-2789: Verify company registration for authenticated non-company user", () => {
    createAuthenticatedUser();

    cy.visit("/");
    navigateToCompanyRegistration();

    cy.get('body').should('not.contain', 'Page Not Found');
    cy.get('body').should('not.contain', '404');

    cy.url().should('include', COMPANY_CREATE_PATH);
    assertCompanyRegistrationForm();
  });

  it("USF-2790: Verify redirect to login from navigation menu for unauthenticated users when configuration disabled", () => {
    mockDisabledConfiguration();

    cy.visit("/");

    testCompanyRegistrationRedirect('login');
  });

  it("USF-2790: Verify redirect to login from direct url for unauthenticated users when configuration disabled", () => {
    mockDisabledConfiguration();

    cy.visit(COMPANY_CREATE_PATH);

    cy.url().should('include', '/customer/login');
  });

  it("USF-2790: Verify redirect to account for authenticated users when configuration disabled", () => {
    // Mock only configuration disabled, allow real authentication
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query && req.body.query.includes('allow_company_registration')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              storeConfig: {
                allow_company_registration: false
              }
            }
          }
        });
      }
      else {
        req.continue();
      }
    }).as('configDisabledWithRealAuth');

    createAuthenticatedUser();

    cy.visit("/");
    navigateToCompanyRegistration();

    cy.url().should('include', '/customer/account');
  });

});

// Company registration form and submission flow
const testCompanyRegistrationFlow = () => {

  cy.url().should('include', COMPANY_CREATE_PATH);
  cy.title().should('not.be.empty');

  // Ensure page loaded correctly (no 404 errors)
  cy.get('body').should('not.contain', 'Page Not Found');
  cy.get('body').should('not.contain', '404');

  cy.get('.commerce-company-create-container', { timeout: 8000 }).should('exist');
  cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
  cy.get('.company-form', { timeout: 8000 }).should('exist');

  // Verify form fields are present and fill out the form
  assertCompanyRegistrationForm();
  fillCompanyRegistrationForm(companyRegistrationData);
  submitCompanyRegistrationForm();

  // Verify successful registration
  assertCompanyRegistrationSuccess(companyRegistrationData);
};

// Test redirect behavior based on configuration and authentication state
const testCompanyRegistrationRedirect = (expectedDestination) => {

  cy.visit(COMPANY_CREATE_PATH);

  cy.url({ timeout: 3000 });

  // Verify the expected redirect destination
  switch (expectedDestination) {
    case 'form':
      cy.url().should('include', COMPANY_CREATE_PATH);
      cy.get('.company-registration-container', { timeout: 5000 }).should('exist');
      cy.get('.company-form', { timeout: 5000 }).should('exist');
      break;

    case 'login':
      cy.url().should('include', '/customer/login');
      break;

    case 'account':
      cy.url().should('include', '/customer/account');
      break;

    default:
      throw new Error(`Unknown expected destination: ${expectedDestination}`);
  }
};

// Create and authenticate a customer
const createAuthenticatedUser = () => {
  cy.visit("/customer/create");
  cy.fixture("userInfo").then(({ sign_up }) => {
    signUpUser(sign_up);
    // Verify successful authentication
    cy.url().should('include', '/customer/account');
  });
};

// Mock disabled configuration
const mockDisabledConfiguration = () => {
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.query && req.body.query.includes('allow_company_registration')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              allow_company_registration: false
            }
          }
        }
      });
    }
    else if (req.body.query && req.body.query.includes('storeConfig')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              store_code: "default"
            }
          }
        }
      });
    }
    else {
      req.reply({
        statusCode: 200,
        body: {
          data: {}
        }
      });
    }
  }).as('disabledConfigMock');

  cy.intercept('GET', '**/graphql*', {
    statusCode: 200,
    body: {
      data: {}
    }
  }).as('graphqlGetMocks');
};
