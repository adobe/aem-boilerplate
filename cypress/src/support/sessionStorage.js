// Cypress.Commands.add('setSessionStorage', (key, value) => {
//   cy.window().then((window) => {
//     window.sessionStorage.setItem(key, value);
//   });
// });

// // Set session storage before each tests
// beforeEach(() => {
//   // TODO: Eventually, we should fix the tests to work against prod config/prod commerce backend, but for now we manually write the following to sessionStorage so that the tests will complete (against staging environment)
//   const config = {
//     "public": {
//       "default": {
//         "commerce-core-endpoint": "https://mcstaging.aemshop.net/graphql",
//         "commerce-endpoint": "https://catalog-service-sandbox.adobe.io/graphql",
//         "headers": {
//           "all": {
//             "Store": "default"
//           },
//           "cs": {
//             "Magento-Customer-Group": "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",
//             "Magento-Store-Code": "main_website_store",
//             "Magento-Store-View-Code": "default",
//             "Magento-Website-Code": "base",
//             "x-api-key": "9753cd30401a477e816ed850c4f77e18",
//             "Magento-Environment-Id": "1f131648-b696-4bd1-af57-2021c7080b56"
//           }
//         },
//         "analytics": {
//           "base-currency-code": "USD",
//           "environment": "Production",
//           "store-id": 1,
//           "store-name": "Main Website Store",
//           "store-url": "https://www.aemshop.net",
//           "store-view-id": 1,
//           "store-view-name": "Default Store View",
//           "website-id": 1,
//           "website-name": "Main Website"
//         }
//       }
//     },
//     ":expiry": Math.round(Date.now() / 1000) + 7200,
//   }

//   // write to dev because cypress runs against localhost.
//   cy.setSessionStorage('config', JSON.stringify(config));
// });
