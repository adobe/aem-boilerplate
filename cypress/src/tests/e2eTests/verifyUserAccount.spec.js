import {
  signUpUser,
  createAddress
} from "../../actions";
import {
  assertAuthUser
} from "../../assertions";

describe("Verify user account functionality", () => {
  it("Verify auth user can create addresses", { tags: "@snapPercy" }, () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Edit Account 
    cy.contains('Edit').should('not.be.disabled').click({ force: true });
    cy.contains('Edit details').should('be.visible');
    cy.get('#firstname').clear().type('accountname');
    cy.contains('Save').should('not.be.disabled').click({ force: true });
    cy.contains('Your account information has been updated.').should('be.visible');
    cy.contains('accountname').should('be.visible');

    // Add new address
    cy.contains('Addresses').should('not.be.disabled').click({ force: true });
    cy.contains('No saved addresses').should('be.visible');
    cy.contains('Create new').should('not.be.disabled').click({ force: true });
    cy.get('[data-testid="addressesFormTitle"]')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Add address');

    cy.fixture('addressInfo').then(({ add_new_address }) => {
      createAddress(add_new_address);
    });

    cy.contains('Save').should('be.visible').click();

    cy.contains('Remove').should('be.visible');
    cy.get('.account-address-card__description').should('be.visible');
    cy.contains("firstname").should('be.visible');
    cy.waitForLoadingSkeletonToDisappear();
    cy.percyTakeSnapshot('My Account Address');

    // Edit Address
    cy.contains('Edit').should('not.be.disabled').click({ force: true });
    cy.get('#firstname').clear().type('updatename');
    cy.contains('Save').should('not.be.disabled').click({ force: true });
    cy.contains('Edit address').should('not.exist');
    cy.contains('updatename').should('be.visible');

    // Remove Address
    cy.contains('Remove').should('not.be.disabled').click({ force: true });
    cy.contains('Are you sure you would like to remove this address?').should('be.visible');
    cy.get('.account-address-modal__buttons').find('span').contains('Remove').should('not.be.disabled').click({ force: true });
    cy.contains('No saved addresses').should('be.visible');

    // Update password
    cy.contains('My Account').should('not.be.disabled').click({ force: true });
    cy.contains('Account settings').should('be.visible');
    cy.contains('Change password')
      .should('not.be.disabled')
      .click({ force: true });
    cy.get('[data-testid="toggle-password-icon"]').first().click({ force: true });
    cy.contains('At least 8 characters long').should('be.visible');
    cy.get('input[name="currentPassword"]', { timeout: 10000 })
      .should('be.visible')
      .type('testTest123!');
    cy.get('[data-testid="toggle-password-icon"]').eq(1).click();
    cy.get('input[name="newPassword"]', { timeout: 10000 })
      .should('be.visible')
      .type('Testtttt3!');
    cy.get('[data-testid="toggle-password-icon"]').eq(2).click();
    cy.get('input[name="confirmPassword"]', { timeout: 10000 })
      .should('be.visible')
      .type('Testtttt3!');
    cy.wait(1000);
    cy.get('.dropin-input__field-icon--error').should('not.exist');
    cy.get('button').contains('Save').click({ force: true });
    cy.contains('Your password has been updated').should('be.visible');

    // Order Return tab check
    cy.contains('Manage your returns').should('not.be.disabled').click({ force: true });
    cy.contains('No returns').should('be.visible');
  });


  it("Check UI of Create account", { tags: "@snapPercy" }, () => {
    cy.visit('/customer/create');
    cy.waitForLoadingSkeletonToDisappear();
    cy.contains("Create account").should('be.visible');
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[name="lastName"]').should('be.visible');
    cy.get('[name="email"]').should('be.visible');
    cy.percyTakeSnapshot('Create Account Page');
  });

  it("Check UI of Sign In", { tags: "@snapPercy" }, () => {
    cy.visit('/customer/login');
    cy.contains("Sign in").should('be.visible');
    cy.contains("Forgot password?").should('be.visible');
    cy.get('[name="email"]').should('be.visible');
    cy.percyTakeSnapshot('Login Page');
  });

});
