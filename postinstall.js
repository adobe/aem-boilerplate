const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.resolve(__dirname, './node_modules/@adobe/magento-storefront-event-collector/dist/index.js'), path.resolve(__dirname, './scripts/commerce-events-collector.js'));
fs.copyFileSync(path.resolve(__dirname, './node_modules/@adobe/magento-storefront-events-sdk/dist/index.js'), path.resolve(__dirname, './scripts/commerce-events-sdk.js'));
