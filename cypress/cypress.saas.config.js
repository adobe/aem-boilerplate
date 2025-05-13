const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.base.config')

module.exports = defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    graphqlEndPoint: 'https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz/graphql',
    giftCardA: '00419VQ5C341',
    giftCardB: '00DUNP2VRHWZ',
    giftCardC: '01D2NJ8LEJWT',
    productUrlWithOptions: '/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzkzLzEz',
    stateShippingId: 'TX,57',
    stateBillingId: 'NY,43',
    productImageName: '/adb150.jpg',
  }
});
