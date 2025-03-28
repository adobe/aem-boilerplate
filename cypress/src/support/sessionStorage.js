Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});

// Set session storage before each tests
beforeEach(() => {
  // TODO: Eventually, we should fix the tests to work against prod config/prod commerce backend, but for now we manually write the following to sessionStorage so that the tests will complete (against staging environment)
  const config = {"total":20,"offset":0,"limit":20,"data":[{"key":"commerce.headers.all.Store","value":"default"},{"key":"commerce.headers.cs.Magento-Customer-Group","value":"b6589fc6ab0dc82cf12099d1c2d40ab994e8410c"},{"key":"commerce.headers.cs.Magento-Environment-Id","value":"1f131648-b696-4bd1-af57-2021c7080b56"},{"key":"commerce.headers.cs.Magento-Store-Code","value":"main_website_store"},{"key":"commerce.headers.cs.Magento-Store-View-Code","value":"default"},{"key":"commerce.headers.cs.Magento-Website-Code","value":"base"},{"key":"commerce.headers.cs.x-api-key","value":"9753cd30401a477e816ed850c4f77e18"},{"key":"commerce-base-currency-code","value":"USD"},{"key":"commerce-core-endpoint","value":"https://mcstaging.aemshop.net/graphql"},{"key":"commerce-endpoint","value":"https://catalog-service-sandbox.adobe.io/graphql"},{"key":"commerce-environment","value":"Testing"},{"key":"commerce-root-category-id","value":"2"},{"key":"commerce-store-id","value":"1"},{"key":"commerce-store-name","value":"Main Website Store"},{"key":"commerce-store-url","value":"https://mcstaging.aemshop.net/"},{"key":"commerce-store-view-id","value":"1"},{"key":"commerce-store-view-name","value":"Default Store View"},{"key":"commerce-website-id","value":"1"},{"key":"commerce-website-name","value":"Main Website"},{"key":"commerce.headers.cart.Store","value":"default"}],"columns":["key","value"],":type":"sheet",":expiry": Math.round(Date.now() / 1000) + 7200}

  // write to dev because cypress runs against localhost.
  cy.setSessionStorage('config:dev:/', JSON.stringify(config));
});
