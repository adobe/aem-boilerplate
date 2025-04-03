# Edge Delivery Services + Adobe Commerce Boilerplate
This project boilerplate is for Edge Delivery Services projects that integrate with Adobe Commerce.

## Documentation
https://experienceleague.adobe.com/developer/commerce/storefront/

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Pre-requisites

Out of the box, this project template uses a pre-configured Adobe Commerce environment. If you want to use your own Adobe Commerce environment, you'll need to update the `configs.xlsx` file in your content repository to have values that match your environment.

Additionally, you need to have the following modules and customizations installed on your environment:

1. adobe-commerce/storefront-compatibility: Contains changes to the Adobe Commerce GraphQL API that enable drop-ins functionality.
1. magento/module-data-services-graphql: Commerce module with the functionality necessary for adding context to events.
1. magento/module-page-builder-product-recommendations: Commerce module required for PRex Widget
1. magento/module-visual-product-recommendations: Commerce module required for PRex Widget
<!-- 1. TODO: Add further prereqs.  -->

## Documentation

Before using the boilerplate, we recommend you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Initial Setup

The boilerplate assumes you already have an `aem.live` org and will onboard a new site via config service. If you do not have an `aem.live` org, you will need to [contact Adobe](https://discord.gg/aem-live) to have one created, or you can do the following:

1. Upload the [starter content](https://github.com/hlxsites/aem-boilerplate-commerce/releases/tag/starter-content) somewhere (https://da.live, sharepoint, google drive, etc).
1. Update the mountpoint in the `default-fstab.yaml` to point to your content.
1. Rename the file to `fstab.yaml` and commit/push the change.
1. Install the [AEM Code Sync Bot](https://github.com/apps/aem-code-sync)
1. Verify the site is working at https://main--{site}--{org}.aem.page
1. Add a `/.helix/config.xlsx` to your content, and add a `admin.role.admin` row with your email address.
1. Preview/save this file. This should update the site config with the permissions.
1. Delete the `/.helix/config.xlsx` and the `fstab.yaml` again and use the site config from here on.

### Config Service

Before running the command, replace the following variables to match your project values:

* `{ORG}` - Name of your organistation in GitHub.
* `{SITE}` - Name of your site in the org. For the first site in your org, it must be equal to the GitHub repository name.
* `{REPO}` - Name of your GitHub repository.
* `{ADMIN_USER_EMAIL}` - Email address of your config admin user.
* `{ADMIN_USER_ID}` - User ID of your authoring admin (click user icon in top right, then click "share" icon in da.live to copy).
* `{DOMAIN}` - Public facing domain of your site (e.g. `www.your-shop.com`).
* `{YOUR_TOKEN}` - Your personal access token. You can retrieve one from login via one of the methods from https://admin.hlx.page/login and copy the token from the `auth_token` cookie in the response.

Please use HTTP [PUT](https://www.aem.live/docs/admin.html#tag/siteConfig/operation/createSiteSite) for the initial creation of the configuration and [POST](https://www.aem.live/docs/admin.html#tag/siteConfig/operation/updateConfigSite) for subsequent updates.

```bash
curl -X PUT 'https://admin.hlx.page/config/{org}/sites/{site}.json' \
  -H 'content-type: application/json' \
  -H 'x-auth-token: {YOUR_TOKEN}' \
  --data-binary '@default-config.json'
```

### Apply Index Configuration
```bash
curl -X POST 'https://admin.hlx.page/config/{org}/sites/{site}/content/query.yaml' \
  -H 'content-type: text/yaml' \
  -H 'x-auth-token: {YOUR_TOKEN}' \
  --data-binary '@default-query.yaml'
```

### Apply Sitemap Configuration
```bash
curl -X POST 'https://admin.hlx.page/config/{org}/sites/{site}/content/sitemap.yaml' \
  -H 'content-type: text/yaml' \
  -H 'x-auth-token: {YOUR_TOKEN}' \
  --data-binary '@default-sitemap.yaml'
```

After you onboard to config service you can delete fstab.yaml and [other files](https://www.aem.live/docs/config-service-setup#remove-unused-configuration-files) that are no longer necessary.

## Installation

```sh
npm i
```

## Updating Drop-in dependencies

You may need to update one of the drop-in components, or `@adobe/magento-storefront-event-collector` or `@adobe/magento-storefront-events-sdk` to a new version. Besides checking the release notes for any breaking changes, ensure you also execute the `postinstall` script so that the dependenices in your `scripts/__dropins__` directory are updated to the latest build. This should be run immediately after you update the component, for example:

```
npm install @dropins/storefront-cart@2.0. # Updates the storefront-cart dependency in node_modules/
npm run postinstall # Copies scripts from node_modules into scripts/__dropins__
```

This is a custom script which copies files out of `node_modules` and into a local directory which EDS can serve. You must manually run `postinstall` due to a design choice in `npm` which does not execute `postinstall` after you install a _specific_ package.

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate-commerce` template, rename `default-fstab.yaml` to `fstab.yaml` and add a mountpoint for your site content.
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Add your Adobe Commerce configuration in the `configs-dev.xlsx` sheet in your content repository.
1. Install all dependencies using `npm i`.
1. Start AEM Proxy: `npm run start` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favourite IDE and start coding :)

## Changelog

Major changes are described and documented as part of pull requests and tracked via the `changelog` tag. To keep your project up to date, please follow this list:

https://github.com/hlxsites/aem-boilerplate-commerce/issues?q=label%3Achangelog+is%3Aclosed
