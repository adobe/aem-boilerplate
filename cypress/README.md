# Running E2E tests

Note - Following commands expects local server is running at <http://127.0.0.1:3000/>.

1. Clone the repo and change directory to `cypress`
2. Run `npm install`
3. Run `npm run cypress:open`
4. Click on E2E Testing in cypress UI window.
5. Click on Start E2E Testing on Chrome button.
6. Now select respective test to Run from Cypress UI.
7. To run all tests use `npm run cypress:run`

## SaaS vs PaaS

By default, the `cypress:open` and `cypress:run` commands run tests targeting the PaaS commerce environment created for the boilerplate.

You can run tests against the SaaS environment with `cypress:saas:open` or `cypress:saas:run`.

Both sets of commands are used during the boilerplate CICD workflows to ensure that any change to the boilerplate works against either type of environment.

Both commands use a base config, defined in `cypress.base.config.js` and extend in the corresponding config, either `cypress.paas.config.js` or `cypress.saas.config.js`. This allows us to use variables for things which differ in the environments, such as gift card codes, product option uids, etc.

### Skipping Tests

For various reasons, certain tests fail against certain environments. Eventually these will issues will be fixed. But for now, if a test is _expected_ to fail on a specific environment, you can assign a tag to it.

- `{ tags: '@skipSaas' }` skips the test when run with `cypress:saas:run`
- `{ tags: '@skipPaas' }` skips the test when run with `cypress:run`.

| Skipped Tests | Backned Env | Notes |
| ------------- | ------------- | -------- |
| `verifyStoreSwitcher.spec`  | SaaS, PaaS | Story to re-configire multi store <https://jira.corp.adobe.com/browse/USF-2253> |
| `verifyUserAccount.spec` | SaaS, PaaS | Task <https://jira.corp.adobe.com/browse/USF-2310> |
| `recs.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-product-click.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-request-sent.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |
| `search-results-view.spec` | SaaS | Epic <https://jira.corp.adobe.com/browse/COMOPT-81> |

## Metadata/SKUs in Tests

The `pdp-metadata` tool can be used to generate the [bulk metadata](https://www.aem.live/docs/bulk-metadata) for a site.
This tool queries a _single endpoint_ for product data. This means that the metadata output the tool creates may not contain test product metadata.
As a workaround, you have to manually add the products to the file, and update the count.

As of 8/15/2025, these entries were added manually:

```json
{
  "URL": "/products/cypress-configurable-product-latest/cypress456",
  "title": "Cypress configurable product latest",
  "description": "Cypress configurable product latest",
  "keywords": "",
  "sku": "CYPRESS456",
  "og:type": "product",
  "og:title": "Cypress configurable product latest",
  "og:description": "Cypress configurable product latest",
  "og:url": "https://www.aemshop.net/products/cypress-configurable-product-latest/cypress456",
  "og:image": "https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg",
  "og:image:secure_url": "https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Cypress configurable product latest\",\"description\":\"Cypress configurable product latest\",\"image\":\"https://www.aemshop.net/media/catalog/product/adobestoredata/CYPRESS456.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":99.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"cypress456\",\"sku\":\"CYPRESS456\",\"url\":\"/products/cypress-configurable-product-latest/cypress456\",\"@id\":\"/products/cypress-configurable-product-latest/cypress456\"}"
},
{
  "URL": "/products/gift-packaging/adb102",
  "title": "Gift packaging",
  "description": "Gift packaging",
  "keywords": "",
  "sku": "ADB102",
  "og:type": "product",
  "og:title": "Gift packaging",
  "og:description": "Gift packaging",
  "og:url": "https://www.aemshop.net/products/gift-packaging/adb102",
  "og:image": "https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg",
  "og:image:secure_url": "https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Gift packaging\",\"description\":\"Gift packaging\",\"image\":\"https://www.aemshop.net/media/catalog/product/adobestoredata/ADB102.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":19.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"adb102\",\"sku\":\"ADB102\",\"url\":\"/products/gift-packaging/adb102\",\"@id\":\"/products/gift-packaging/adb102\"}"
},
{
  "URL": "/products/virtual-product/virtual123",
  "title": "Virtual product",
  "description": "Virtual product",
  "keywords": "",
  "sku": "VIRTUAL123",
  "og:type": "product",
  "og:title": "Virtual product",
  "og:description": "Virtual product",
  "og:url": "https://main--boilerplate-paas--adobe-commerce.aem.live/products/virtual-product/virtual123",
  "og:image": "https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg",
  "og:image:secure_url": "https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg",
  "last-modified": "2025-01-27T12:00:00.000Z",
  "json-ld": "{\"@context\":\"http://schema.org\",\"@type\":\"Product\",\"name\":\"Virtual product\",\"description\":\"Virtual product\",\"image\":\"https://main--boilerplate-paas--adobe-commerce.aem.live/media/catalog/product/adobestoredata/VIRTUAL123.jpg\",\"offers\":[{\"@type\":\"Offer\",\"price\":29.99,\"priceCurrency\":\"USD\",\"availability\":\"http://schema.org/InStock\"}],\"productID\":\"virtual123\",\"sku\":\"VIRTUAL123\",\"url\":\"/products/virtual-product/virtual123\",\"@id\":\"/products/virtual-product/virtual123\"}"
}
```

Here's the process for updating metadata:

1. Update the `metadata` file in the content folder with the new file.
2. Publish this file.
3. Use Helix Admin API to publish this file _again_ for each of the test environments, as well as the main site.

```bash
curl -X POST https://admin.hlx.page/live/hlxsites/aem-boilerplate-commerce/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-accs/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-aco/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
curl -X POST https://admin.hlx.page/live/adobe-commerce/boilerplate-paas/main/metadata.json --cookie "auth_token=YOUR_AUTH_COOKIE"
```
