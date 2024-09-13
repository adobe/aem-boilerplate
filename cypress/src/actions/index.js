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
  cy.get(fields.billingFormFirstName).clear().type(customerAddress.firstName);
  cy.get(fields.billingFormLastName).clear().type(customerAddress.lastName);
  cy.get(fields.billingFormStreet).clear().type(customerAddress.street);
  cy.get(fields.billingFormStreet1).clear().type(customerAddress.street1);
  if (isSelectableState) {
    cy.get(fields.billingFormState).select(customerAddress.region);
  } else {
    cy.get(fields.billingFormInputState).type(customerAddress.region);
  }
  cy.get(fields.billingFormCity).clear().type(customerAddress.city);
  cy.get(fields.billingFormPostCode).clear().type(customerAddress.postCode);
  cy.get(fields.billingFormTelephone).clear().type(customerAddress.telephone);
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