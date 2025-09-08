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
    graphqlEndPoint: "https://aem-stg.k24dhxxpqt72a.dummycachetest.com/graphql",
    giftCardA: "00GO12SK6WF3",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzI3OS8zOQ%3D%3D",
    stateShippingId: "TX,171",
    stateBillingId: "NY,129",
    productImageName: "/ADB150.jpg",
    productImageNameConfigurable: "/adb124.jpg",
    productWithOptionImageNameConfigurable: "/adb192.jpg",
  },
});
