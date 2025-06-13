const deleteCustomer = () => {
  cy.getUserTokenCookie().then((token) => {
    if (token) {
      const queryDeleteCustomer = `mutation {deleteCustomer}`;
      cy.request({
        method: 'POST',
        url: Cypress.env('graphqlEndPoint'),
        auth: {
          bearer: token,
        },
        headers: {
          'content-type': 'application/json',
        },
        body: {
          query: JSON.parse(JSON.stringify(queryDeleteCustomer)),
        },
      }).then((response) => {
        expect(response).property('status').to.equal(200);
      });
    }
  });
};

Cypress.Commands.add('deleteCustomer', deleteCustomer);

// Always delete customer after every test.
afterEach(() => {
  if (Cypress.env("isAemAssetsSuite")) {
    return;
  }

  cy.deleteCustomer();
});
