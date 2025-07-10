const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.base.config");

// A private user used with AEM Assets testing suite.
const AEM_ASSETS_PRIVATE_USER = JSON.parse(
  process.env.AEM_ASSETS_PRIVATE_USER ?? "{}"
);

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
        magentoEnvironmentId: "b3e6be41-a1ba-42b1-89c6-bda102752ba0",
      },

      user: {
        ...AEM_ASSETS_PRIVATE_USER,
        order: "000000010",
        returnedOrder: "000000011",
      },

      // For PREX we need a custom recommendation unit id.
      // Because AEM Assets uses a different Commerce instance
      // the hardcoded one in the default content source will not work.
      // To test PREX, we will render a custom draft page with our own recommendation unit id.
      prexDraft: "/drafts/decepticons/prex-discovery-paas",
    },
  },
});
