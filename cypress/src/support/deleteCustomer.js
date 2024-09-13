const deleteCustomer = () => {
  let userToken = null;
  cy.getUserTokenCookie().then((token) => {
    userToken = token;

    const queryDeleteCustomer = `mutation {deleteCustomer}`;
    cy.request({
      method: 'POST',
      url: Cypress.env('graphqlEndPoint'),
      auth: {
        bearer: userToken,
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
  });
};

Cypress.Commands.add('deleteCustomer', deleteCustomer);
