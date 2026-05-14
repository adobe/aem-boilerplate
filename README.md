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

## Updating Drop-in dependencies

You may need to update one of the drop-in components, or `@adobe/magento-storefront-event-collector` or `@adobe/magento-storefront-events-sdk` to a new version. Before applying any update, check the release notes for breaking changes and ensure the `postinstall` script runs so that the dependencies in your `scripts/__dropins__` directory are updated to the latest build.

- Drop-in components: <https://experienceleague.adobe.com/developer/commerce/storefront/release-notes/>

### Automated weekly updates

A GitHub Actions workflow runs every Monday and opens a pull request whenever newer stable versions of `@adobe/*` or `@dropins/*` packages are available. The PR includes updated `package.json`, `package-lock.json`, and regenerated dropin assets under `scripts/__dropins__/`. Pre-release packages are held without changes and surfaced in the workflow output.

You can also trigger the workflow manually from the **Actions** tab in GitHub.

### Manual updates

To update a specific package:

```bash
npm install @dropins/storefront-cart@2.0.0  # updates the package in node_modules/
npm run postinstall                         # copies scripts from node_modules into scripts/__dropins__/
```

This is a custom script which copies files out of `node_modules` and into a local directory which EDS can serve. You must manually run `postinstall` due to a design choice in `npm` which does not execute `postinstall` after you install a _specific_ package.

## Changelog

Major changes are described and documented as part of pull requests and tracked via the `changelog` tag. To keep your project up to date, please follow this list:

<https://github.com/hlxsites/aem-boilerplate-commerce/issues?q=label%3Achangelog+is%3Aclosed>
