# Running E2E tests

Note - Following commands expects local server is running at http://127.0.0.1:3000/.

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
| `verifyStoreSwitcher.spec`  | SaaS, PaaS | Story to re-configire multi store https://jira.corp.adobe.com/browse/USF-2253 |
| `verifyUserAccount.spec` | SaaS, PaaS | Task https://jira.corp.adobe.com/browse/USF-2310 |
|  `verifyAuthUserCheckout.spec`  Cancel Flow | Saas  | Bug https://jira.corp.adobe.com/browse/LYNX-856 |
| `recs.spec` | SaaS | Epic https://jira.corp.adobe.com/browse/COMOPT-81 |
| `search-product-click.spec` | SaaS | Epic https://jira.corp.adobe.com/browse/COMOPT-81 |
| `search-request-sent.spec` | SaaS | Epic https://jira.corp.adobe.com/browse/COMOPT-81 |
| `search-results-view.spec` | SaaS | Epic https://jira.corp.adobe.com/browse/COMOPT-81 |
