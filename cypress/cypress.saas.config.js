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
    graphqlEndPoint: "https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql",
    giftCardA: "00419VQ5C341",
    productUrlWithOptions:
      "/products/cypress-configurable-product-latest/cypress456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz",
    stateShippingId: "TX,57",
    stateBillingId: "NY,43",
    productImageName: "/adb150.jpg",
    productImageNameConfigurable: "/adb124_1.jpg",
    productWithOptionImageNameConfigurable: "/adb192_1.jpg",

    aemAssetsConfig: {
      commerceConfig: {
        coreEndpoint: "https://na1-sandbox.api.commerce.adobe.com/QhUjcEq9dMrdCF7h8a4e5g/graphql",
        endpoint: "https://na1-sandbox.api.commerce.adobe.com/QhUjcEq9dMrdCF7h8a4e5g/graphql",
      },

      author: {
        programId: "p150710",
        environmentId: "e1553109",
        isStage: false,
      },

      credentials: {
        xPublicApiKey: "",
        magentoEnvironmentId: "",
      },

      user: {
        ...AEM_ASSETS_PRIVATE_USER,
        order: "000000001",
        returnedOrder: "000000002",
      },

      // For PREX we need a custom recommendation unit id.
      // Because AEM Assets uses a different Commerce instance
      // the hardcoded one in the default content source will not work.
      // To test PREX, we will render a custom draft page with our own recommendation unit id.
      prexDraft: "/drafts/decepticons/products/saas/adb125",
    },
  },
});
