import { 
  assertCompanyRegistrationForm, 
  assertCompanyRegistrationSuccess,
  assertHomePageLoaded,
  assertAccountSectionAccessible
} from "../../assertions";
import { 
  fillCompanyRegistrationForm, 
  submitCompanyRegistrationForm,
  navigateToCompanyRegistration
} from "../../actions";
import {
  companyRegistrationData,
  companyRegistrationSuccessMessages
} from "../../fixtures/companyData";

describe("Company Registration Tests", () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Clear any existing intercepts
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  describe("Create Company from Home Page Navigation", () => {
    it("should create company by navigating through Account menu", () => {
      cy.visit("/");
      
      assertHomePageLoaded();
      assertAccountSectionAccessible();
      
      navigateToCompanyRegistration();
      
      // Test company registration flow
      testCompanyRegistrationFlow();
    });
  });

  describe("Create Company via Direct Link", () => {
    it("should create company by accessing registration link directly", () => {
      // Navigate directly to company registration link
      cy.visit("/customer/company/create");
      
      // Test company registration flow
      testCompanyRegistrationFlow();
    });
  });

  describe("Company Registration Link Visible when B2B is Enabled", () => {
    it("should show company registration link when B2B is enabled", () => {
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
      
      // Test that company registration link is available
      testCompanyRegistrationLinkVisibility(true);
    });
  });

  describe("Company Registration Link Not Visible when B2B is Disabled", () => {
    it("should not show company registration link when B2B is disabled", () => {
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
      
      // Test that company registration link is not available
      testCompanyRegistrationLinkVisibility(false);
    });
  });

  describe("Company Registration Link Redirect When B2B Disabled", () => {
    it("should redirect to home page when accessing company registration directly with B2B disabled", () => {
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
      cy.visit("/customer/company/create");
      
      // Should redirect to home page
      cy.url().should('eq', Cypress.config().baseUrl);
      assertHomePageLoaded();
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

  cy.contains(companyRegistrationSuccessMessages.message).should('be.visible');
  cy.contains(companyRegistrationSuccessMessages.message2).should('be.visible');

  assertCompanyRegistrationSuccess(companyRegistrationData);
};

// Company registration link visibility
const testCompanyRegistrationLinkVisibility = (expectedB2BEnabled) => {
  assertHomePageLoaded();
  assertAccountSectionAccessible();
  
  cy.get('li.nav-drop:contains("Account")').click();
  cy.get('li.nav-drop:contains("Account") .submenu-wrapper').should('be.visible');
  
  if (expectedB2BEnabled) {
    cy.get('li.company-registration-enabled').should('exist');
    cy.get('a[href*="/customer/company/create"]').should('be.visible');
  } else {
    cy.get('li.company-registration-enabled').should('not.exist');
    cy.get('a[href*="/customer/company/create"]').should('not.be.visible');
  }
};
