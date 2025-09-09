const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.base.config");

// A private user used with AEM Assets testing suite.
const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? "{}"
);

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    specPattern: 'src/tests/b2b/**/*.spec.js',
  },
  env: {
    ...baseConfig.env,
    graphqlEndPoint: "https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql",
    giftCardA: "00419VQ5C341",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz",
    stateShippingId: "TX,57",
    stateBillingId: "NY,43",
    productImageName: "/adb150.jpg",
    productImageNameConfigurable: "/adb124_1.jpg",
    productWithOptionImageNameConfigurable: "/adb192_1.jpg",
  },
});
