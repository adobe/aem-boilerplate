const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.base.config");

// A private user used with AEM Assets testing suite.
/* const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? "{}"
); */

module.exports = defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    graphqlEndPoint: "https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql",
    giftCardA: "00419VQ5C341",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz",
    stateShippingId: "TX,57",
    stateBillingId: "NY,43",
    productImageName: "/adb150.jpg",
    productImageNameConfigurable: "/adb124_1.jpg",

    aemAssetsConfig: {
      commerceConfig: {
        coreEndpoint: "https://na1-qa.api.commerce.adobe.com/Dva3D9VhDoBGAwMbUHxZXe/graphql",
        endpoint: "https://na1-qa.api.commerce.adobe.com/Dva3D9VhDoBGAwMbUHxZXe/graphql",
      },

      author: {
        programId: "p122355",
        environmentId: "e286962",
        isStage: true,
      },

      credentials: {
        xPublicApiKey: "",
        magentoEnvironmentId: "",
      },

      user: {
        order: "000000008",
        returnedOrder: "000000009",
      },
    },
  },
});
