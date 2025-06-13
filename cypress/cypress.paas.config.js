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
    graphqlEndPoint: "https://mcstaging.aemshop.net/graphql",
    giftCardA: "00GO12SK6WF3",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzI3OS8zOQ%3D%3D",
    stateShippingId: "TX,171",
    stateBillingId: "NY,129",
    productImageName: "/ADB150.jpg",
    productImageNameConfigurable: "/adb124.jpg",

    aemAssetsConfig: {
      commerceConfig: {
        endpoint: "https://catalog-service-qa.adobe.io/graphql",
        coreEndpoint: "https://eds-kkbonba-efo2rc3kezxte.eu-4.magentosite.cloud/graphql",
      },

      author: {
        programId: "p122355",
        environmentId: "e286962",
        isStage: true,
      },

      credentials: {
        xPublicApiKey: "35b6d08f7354475788201cad1762dc86",
        magentoEnvironmentId: "c1e8ca0b-994b-4e06-b107-539b5abade9f",
      },

      user: {
        order: "000000010",
        returnedOrder: "000000011",
      },
    },
  },
});
