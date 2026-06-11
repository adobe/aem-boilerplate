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

  // If a suite shares one customer between its two tests - automatic afterEach cleanup should be skipped
  const currentTestTitle = Cypress.currentTest?.title || '';
  const currentSuiteName = Cypress.currentTest?.titlePath?.[0] || '';

  const skipDeleteSuites = ['Seller Assisted Buying'];

  const shouldSkip = skipDeleteSuites.some(
    (suiteName) =>
      currentTestTitle.includes(suiteName) || currentSuiteName.includes(suiteName)
  );

  if (shouldSkip) {
    cy.log(`Skipping automatic customer deletion for ${currentSuiteName} suite`);
    return;
  }

  cy.deleteCustomer();
});
