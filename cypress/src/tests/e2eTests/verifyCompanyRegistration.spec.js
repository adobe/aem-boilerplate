import { 
  assertCompanyRegistrationForm, 
  assertCompanyRegistrationSuccess 
} from "../../assertions";
import { 
  fillCompanyRegistrationForm, 
  submitCompanyRegistrationForm 
} from "../../actions";
import {
  companyRegistrationData,
  companyRegistrationSuccessMessages
} from "../../fixtures/companyData";

describe("Verify company registration functionality", () => {
  it("Verify company registration form and submission", () => {
    cy.visit("/customer/company/create");
    
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
  });
});
