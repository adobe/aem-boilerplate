import * as fields from '../fields/index';

export const setGuestEmail = (customerEmail) => {
  cy.get(fields.shippingFormGuestEmail).clear().type(customerEmail);
};

export const setGuestShippingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.shippingFormFirstName).clear().type(customerAddress.firstName);
  cy.get(fields.shippingFormLastName).clear().type(customerAddress.lastName);
  cy.get(fields.shippingFormStreet).clear().type(customerAddress.street);
  cy.get(fields.shippingFormStreet1).clear().type(customerAddress.street1);
  if (isSelectableState) {
    cy.get(fields.shippingFormState).select(customerAddress.region);
  } else {
    cy.get(fields.shippingFormInputState).type(customerAddress.region);
  }
  cy.get(fields.shippingFormCity).clear().type(customerAddress.city);
  cy.get(fields.shippingFormPostCode).clear().type(customerAddress.postCode);
  cy.get(fields.shippingFormTelephone).clear().type(customerAddress.telephone);
};

export const setGuestBillingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.billingFormFirstName).should("not.be.disabled").clear().type(customerAddress.firstName, { force: true });
  cy.get(fields.billingFormLastName).should("not.be.disabled").clear().type(customerAddress.lastName, { force: true });
  cy.get(fields.billingFormStreet).should("not.be.disabled").clear().type(customerAddress.street, { force: true });
  cy.get(fields.billingFormStreet1).should("not.be.disabled").clear().type(customerAddress.street1, { force: true });
  if (isSelectableState) {
    cy.get(fields.billingFormState).should("not.be.disabled").select(customerAddress.region, { force: true });
  } else {
    cy.get(fields.billingFormInputState).should("not.be.disabled").type(customerAddress.region, { force: true });
  }
  cy.get(fields.billingFormCity).should("not.be.disabled").clear().type(customerAddress.city, { force: true });
  cy.get(fields.billingFormPostCode).should("not.be.disabled").clear().type(customerAddress.postCode, { force: true });
  cy.get(fields.billingFormTelephone).should("not.be.disabled").clear().type(customerAddress.telephone, { force: true });
};

export const uncheckBillToShippingAddress = () => {
  cy.get(fields.billToShippingAddress).uncheck({ force: true });
};

export const placeOrder = () => {
  cy.get(fields.placeOrderButton).should('be.visible')
  cy.get(fields.placeOrderButton).click();
};

export const createAccount = () => {
  cy.contains("Create account").click();
};

export const signUpUser = (sign_up, isValid = true) => {
  const random = Cypress._.random(0, 10000000);
  const username = `${random}${sign_up.email}`;
  cy.contains("Create account").should('be.visible');
  if (sign_up.company) {
    cy.get(fields.authFormUserCompany).clear().type(sign_up.company);
  }
  if (sign_up.email) {
    cy.get(fields.authFormUserEmail).eq(1).clear({force: true}).type(username);
  }
  cy.get(fields.authFormUserFirstName).clear().type(sign_up.firstName);
  cy.get(fields.authFormUserLastName).clear().type(sign_up.lastName);
  cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);

  if (isValid) {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);
  } else {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.shortPassword);
  }

  createAccount();
};
