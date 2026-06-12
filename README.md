# Edge Delivery Services + Adobe Commerce Boilerplate

This project boilerplate is for Edge Delivery Services projects that integrate with Adobe Commerce.

## Documentation

Before using the boilerplate, we recommend you to go through the documentation on <https://experienceleague.adobe.com/developer/commerce/storefront/> and more specifically:

1. [Storefront Developer Tutorial](https://experienceleague.adobe.com/developer/commerce/storefront/get-started/)
1. [AEM Docs](https://www.aem.live/docs/)
1. [AEM Developer Tutorial](https://www.aem.live/developer/tutorial)
1. [The Anatomy of an AEM Project](https://www.aem.live/developer/anatomy-of-a-project)
1. [Web Performance](https://www.aem.live/developer/keeping-it-100)
1. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Getting Started

Use the [Site Creator Tool](https://da.live/app/adobe-commerce/storefront-tools/tools/site-creator/site-creator) to quickly spin up your own copy of code and content.

Alternatively, you can follow our [Guide](https://experienceleague.adobe.com/developer/commerce/storefront/get-started/) for a more detailed walkthrough.

## Staying Up to Date

Once you fork or clone this repo, the code is yours — you are not subscribed to updates.

### What a suite release is (and is not)

A suite release — for example "[b2c-march-2026](https://github.com/hlxsites/aem-boilerplate-commerce/tree/b2c-march-2026)" — is a tagged snapshot of this boilerplate at a point in time when a specific combination of drop-in package versions and boilerplate code was tested together and verified to work. That tag is useful as a **starting point** for developers who are setting up a new project. You can find the release notes for each suite release in the [releases](https://experienceleague.adobe.com/developer/commerce/storefront/releases/) page.

If you have already forked or cloned this repo, a new suite release is not an upgrade you need to apply. There is no mechanism that pushes boilerplate code changes into your fork, and nothing will break in your project because a new release tag was created upstream. Treat suite releases the same way you would treat a new major version of a project template: relevant only if you are starting fresh.

### Updating your drop-in dependencies

The only things you need to actively track after forking are your **npm dependencies** — specifically the `@dropins/*` and `@adobe/*` packages (including `@adobe/magento-storefront-event-collector` and `@adobe/magento-storefront-events-sdk`) listed in your `package.json`. Before applying any update, check the release notes for breaking changes and ensure the `postinstall` script runs so that the dependencies in your `scripts/__dropins__` directory are updated to the latest build.

These packages follow semantic versioning. Minor and patch releases are non-breaking by contract, so routine updates should be safe to apply.

To see which packages have newer versions available:

```bash
npm outdated
```

To install a specific version:

```bash
npm install @dropins/storefront-cart@2.0.0  # updates the package in node_modules/
npm run postinstall                         # copies scripts from node_modules into scripts/__dropins__/
```

To update a drop-in to its latest stable release:

```bash
npm install @dropins/storefront-cart@latest
npm run postinstall
```

Always run `postinstall` after any drop-in update — it copies the built assets from `node_modules` into `scripts/__dropins__`, which is what Edge Delivery Services serves. Note that `npm` does not run `postinstall` automatically when you install a specific package, so this step must always be done manually.

### Automated dependency PRs

This repo includes a GitHub Actions workflow that runs every Monday and opens a pull request when newer stable versions of `@adobe/*` or `@dropins/*` packages are available within the ranges declared in your `package.json` ([semver](https://semver.org/)). The PR includes updated `package.json`, `package-lock.json`, and regenerated dropin assets under `scripts/__dropins__/`. Pre-release packages are held without changes and surfaced in the workflow output. This works similarly to Dependabot or Renovate; once you fork the repo, the workflow runs in your fork so you can review and merge updates at your own pace.

You can also trigger the workflow manually from the **Actions** tab in GitHub.

### Pulling boilerplate code changes into your fork (optional)

If you want to incorporate code changes made to this upstream boilerplate after you forked — for example, a new block or a bug fix in `scripts/` — you can do so by adding this repo as a git remote and merging selectively. This is entirely optional. Upstream changes may conflict with modifications you have made to your fork, so expect to resolve conflicts manually. There is no guarantee of a clean merge, and nothing in your project depends on staying in sync with the upstream boilerplate code.

## Changelog

Major changes to this boilerplate are described and documented as part of pull requests and tracked via the `changelog` tag. This log documents changes to the canonical starting point — not upgrades that forked implementations must apply. Review it if you are considering pulling specific upstream changes into your fork:

<https://github.com/hlxsites/aem-boilerplate-commerce/issues?q=label%3Achangelog+is%3Aclosed>
