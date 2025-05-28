const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.base.config')

module.exports = defineConfig({
  ...baseConfig,
  env: {
    ...baseConfig.env,
    graphqlEndPoint: 'https://mcstaging.aemshop.net/graphql',
    giftCardA: '00GO12SK6WF3',
    productUrlWithOptions: '/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzI3OS8zOQ%3D%3D',
    stateShippingId: 'TX,171',
    stateBillingId: 'NY,129',
    productImageName: '/ADB150.jpg',
    productImageNameConfigurable: '/adb124.jpg'
  }
});
