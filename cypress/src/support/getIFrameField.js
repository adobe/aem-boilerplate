const getIFrameField = (iframe, field) => {
  return getIframeBody(iframe).find(field);
};

const getIframeDocument = (iframe) => {
  return (
    cy
      .get(iframe)
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its('0.contentDocument')
      .should('exist')
  );
};

const getIframeBody = (iframe) => {
  // get the document
  return (
    getIframeDocument(iframe)
      // automatically retries until body is loaded
      .its('body')
      .should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

Cypress.Commands.add('getIFrameField', getIFrameField);
