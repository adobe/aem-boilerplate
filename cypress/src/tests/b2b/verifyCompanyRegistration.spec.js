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
  navigateToCompanyRegistration
} from "../../actions";
import {
  companyRegistrationData,
  companyRegistrationSuccessMessage
} from "../../fixtures/companyData";

describe("USF-2528: Company Registration Tests", () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Clear any existing intercepts
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  describe("Create Company from Home Page Navigation", () => {
    it("USF-2789: should create company by navigating through Account menu", () => {
      cy.visit("/");
      
      assertHomePageLoaded();
      assertAccountSectionAccessible();
      
      navigateToCompanyRegistration();
      
      // Test company registration flow
      testCompanyRegistrationFlow();
    });
  });

  describe("Create Company via Direct Link", () => {
    it("USF-2789: should create company by accessing registration link directly", () => {
      // Navigate directly to company registration link
      cy.visit(COMPANY_CREATE_PATH);
      
      // Test company registration flow
      testCompanyRegistrationFlow();
    });
  });

  describe("Company Registration Configuration Tests", () => {
    it("USF-2790: should show registration form when configuration is enabled", () => {
      // Mock GraphQL to return allow_company_registration: true
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('allow_company_registration')) {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                storeConfig: {
                  allow_company_registration: true
                }
              }
            }
          });
        }
      }).as('companyRegistrationConfig');
      
      cy.visit("/");
      
      // Test that clicking company registration link shows the form
      testCompanyRegistrationRedirect('form');
    });

    it("USF-2790: should redirect to login page when configuration is disabled (unauthenticated)", () => {
      // Mock GraphQL to return allow_company_registration: false
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('allow_company_registration')) {
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
      }).as('companyRegistrationConfig');
      
      cy.visit("/");
      
      // Test that clicking company registration link redirects to login
      testCompanyRegistrationRedirect('login');
    });

    it("USF-2790: should redirect to account dashboard when configuration is disabled (authenticated)", () => {
      // Mock authentication state
      cy.window().then((win) => {
        win.localStorage.setItem('auth_token', 'mock_token');
      });

      // Mock GraphQL to return allow_company_registration: false
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('allow_company_registration')) {
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
      }).as('companyRegistrationConfig');
      
      cy.visit("/");
      
      // Test that clicking company registration link redirects to account
      testCompanyRegistrationRedirect('account');
    });

    it("USF-2790: should redirect to login page when accessing company registration directly with configuration disabled", () => {
      // Mock GraphQL to return allow_company_registration: false
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.query.includes('allow_company_registration')) {
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
      }).as('companyRegistrationConfig');
      
      // Try to access company registration page directly
      cy.visit(COMPANY_CREATE_PATH);
      
      // Should redirect to login page
      cy.url().should('include', '/customer/login');
    });
  });

});

// Company registration form and submission
const testCompanyRegistrationFlow = () => {
  cy.wait(3000);
  cy.get('.company-registration-container', { timeout: 10000 }).should('exist');
  cy.get('.company-form', { timeout: 10000 }).should('exist');

  assertCompanyRegistrationForm();

  fillCompanyRegistrationForm(companyRegistrationData);
  submitCompanyRegistrationForm();

  cy.wait(3000);

  cy.contains(companyRegistrationSuccessMessage).should('be.visible');

  assertCompanyRegistrationSuccess(companyRegistrationData);
};

// Company registration redirect behavior testing
const testCompanyRegistrationRedirect = (expectedDestination) => {
  assertHomePageLoaded();
  assertAccountSectionAccessible();
  
  // Open Account menu
  cy.get('li.nav-drop:contains("Account")').click();
  cy.get('li.nav-drop:contains("Account") .submenu-wrapper').should('be.visible');
  
  // Company registration link should always be visible
  cy.get(`a[href*="${COMPANY_CREATE_PATH}"]`).should('be.visible');
  
  // Click the company registration link
  cy.get(`a[href*="${COMPANY_CREATE_PATH}"]`).click();
  
  // Wait for potential redirects or form loading
  cy.wait(2000);
  
  // Assert the expected destination
  switch (expectedDestination) {
    case 'form':
      // Should show the registration form
      cy.url().should('include', COMPANY_CREATE_PATH);
      cy.get('.company-registration-container', { timeout: 10000 }).should('exist');
      cy.get('.company-form', { timeout: 10000 }).should('exist');
      break;
      
    case 'login':
      // Should redirect to login page
      cy.url().should('include', '/customer/login');
      break;
      
    case 'account':
      // Should redirect to account dashboard
      cy.url().should('include', '/customer/account');
      break;
      
    default:
      throw new Error(`Unknown expected destination: ${expectedDestination}`);
  }
};
