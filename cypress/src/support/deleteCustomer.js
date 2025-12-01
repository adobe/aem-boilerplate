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
  if (Cypress.env('isAemAssetsSuite')) {
    return;
  }

  // Skip automatic customer deletion for B2B Purchase Orders test suite
  const currentTestTitle = Cypress.currentTest?.title || '';
  const currentSuiteName = Cypress.currentTest?.titlePath?.[0] || '';

  const skipDeleteTests = [
    'Purchase Orders end-to-end workflow',
    'B2B Purchase Orders',
    'Cleanup - Delete approval rules, users and roles',
  ];

  const shouldSkip = skipDeleteTests.some(
    (testName) =>
      currentTestTitle.includes(testName) || currentSuiteName.includes(testName)
  );

  if (shouldSkip) {
    cy.log('Skipping automatic customer deletion for B2B Purchase Orders test');
    return;
  }

  cy.deleteCustomer();
});
