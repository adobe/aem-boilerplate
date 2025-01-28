# AEM Edge Delivery Services Experimentation

The AEM Experimentation plugin helps you quickly set up experimentation and segmentation on your AEM project. 
It is currently available to customers in collaboration with AEM Engineering via co-innovation VIP Projects. 
To implement experimentation or personalization use-cases, please reach out to the AEM Engineering team in the Slack channel dedicated to your project.

## Features

The AEM Experimentation plugin supports:
- :lock: privacy-first, as it doesn't use any, nor persists any, end-user data that could lead to their identification. No end-user opt-in nor cookie consent is required when using the default configuration that uses [AEM Edge Delivery Services Real User Monitoring](https://github.com/adobe/helix-rum-js/).*
- :busts_in_silhouette: serving different content variations to different audiences, including custom audience definitions for your project that can be either resolved directly in-browser or against a trusted backend API.
- :money_with_wings: serving different content variations based on marketing campaigns you are running, so that you can easily track email and/or social campaigns.
- :chart_with_upwards_trend: running A/B test experiments on a set of variants to measure and improve the conversion on your site. This works particularly with our :chart: [RUM conversion tracking plugin](https://github.com/adobe/franklin-rum-conversion).
- :rocket: easy simulation of each experience and basic reporting leveraging in-page overlays.

\* Bringing additional marketing technology such as visitor-based analytics or personalization to a project will cancel this privacy-first principle.

## Installation

Add the plugin to your AEM project by running:
```sh
git subtree add --squash --prefix plugins/experimentation git@github.com:adobe/aem-experimentation.git main
```

If you later want to pull the latest changes and update your local copy of the plugin
```sh
git subtree pull --squash --prefix plugins/experimentation git@github.com:adobe/aem-experimentation.git main
```

If you prefer using `https` links you'd replace `git@github.com:adobe/aem-experimentation.git` in the above commands by `https://github.com/adobe/aem-experimentation.git`.

If the `subtree pull` command is failing with an error like:
```
fatal: can't squash-merge: 'plugins/experimentation' was never added
```
you can just delete the folder and re-add the plugin via the `git subtree add` command above.

## Project instrumentation

### On top of a regular boilerplate project

Typically, you'd know you don't have the plugin system if you don't see a reference to `window.hlx.plugins` in your `scripts.js`. In that case, you can still manually instrument this plugin in your project by falling back to a more manual instrumentation. To properly connect and configure the plugin for your project, you'll need to edit your `scripts.js` in your AEM project and add the following:

1. at the start of the file:
    ```js
    const AUDIENCES = {
      mobile: () => window.innerWidth < 600,
      desktop: () => window.innerWidth >= 600,
      // define your custom audiences here as needed
    };

    /**
     * Gets all the metadata elements that are in the given scope.
     * @param {String} scope The scope/prefix for the metadata
     * @returns an array of HTMLElement nodes that match the given scope
     */
    export function getAllMetadata(scope) {
      return [...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)]
        .reduce((res, meta) => {
          const id = toClassName(meta.name
            ? meta.name.substring(scope.length + 1)
            : meta.getAttribute('property').split(':')[1]);
          res[id] = meta.getAttribute('content');
          return res;
        }, {});
    }
    ```
2. if this is the first plugin you add to your project, you'll also need to add:
    ```js
    // Define an execution context
    const pluginContext = {
      getAllMetadata,
      getMetadata,
      loadCSS,
      loadScript,
      sampleRUM,
      toCamelCase,
      toClassName,
    };
    ```
    And make sure to import any missing/undefined methods from `aem.js`/`lib-franklin.js` at the very top of the file:
    ```js
    import {
      ...
      getMetadata,
      loadScript,
      toCamelCase,
      toClassName,
    } from './aem.js';
    ```
3. Early in the `loadEager` method you'll need to add:
    ```js
    async function loadEager(doc) {
      …
      // Add below snippet early in the eager phase
      if (getMetadata('experiment')
        || Object.keys(getAllMetadata('campaign')).length
        || Object.keys(getAllMetadata('audience')).length) {
        // eslint-disable-next-line import/no-relative-packages
        const { loadEager: runEager } = await import('../plugins/experimentation/src/index.js');
        await runEager(document, { audiences: AUDIENCES }, pluginContext);
      }
      …
    }
    ```
    This needs to be done as early as possible since this will be blocking the eager phase and impacting your LCP, so we want this to execute as soon as possible.
4. Finally at the end of the `loadLazy` method you'll have to add:
    ```js
    async function loadLazy(doc) {
      …
      // Add below snippet at the end of the lazy phase
      if ((getMetadata('experiment')
        || Object.keys(getAllMetadata('campaign')).length
        || Object.keys(getAllMetadata('audience')).length)) {
        // eslint-disable-next-line import/no-relative-packages
        const { loadLazy: runLazy } = await import('../plugins/experimentation/src/index.js');
        await runLazy(document, { audiences: AUDIENCES }, pluginContext);
      }
    }
    ```
    This is mostly used for the authoring overlay, and as such isn't essential to the page rendering, so having it at the end of the lazy phase is good enough.

### On top of the plugin system

The easiest way to add the plugin is if your project is set up with the plugin system extension in the boilerplate.
You'll know you have it if `window.hlx.plugins` is defined on your page.

If you don't have it, you can follow the proposal in https://github.com/adobe/aem-lib/pull/23 and https://github.com/adobe/aem-boilerplate/pull/275 and apply the changes to your `aem.js`/`lib-franklin.js` and `scripts.js`.

Once you have confirmed this, you'll need to edit your `scripts.js` in your AEM project and add the following at the start of the file:
```js
const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
  // define your custom audiences here as needed
};

window.hlx.plugins.add('experimentation', {
  condition: () => getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length,
  options: { audiences: AUDIENCES },
  url: '/plugins/experimentation/src/index.js',
});
```

### Custom options

There are various aspects of the plugin that you can configure via options you are passing to the 2 main methods above (`runEager`/`runLazy`).
You have already seen the `audiences` option in the examples above, but here is the full list we support:

```js
runEager.call(document, {
  // Overrides the base path if the plugin was installed in a sub-directory
  basePath: '',

  // Lets you configure the prod environment.
  // (prod environments do not get the pill overlay)
  prodHost: 'www.my-website.com',
  // if you have several, or need more complex logic to toggle pill overlay, you can use
  isProd: () => window.location.hostname.endsWith('hlx.page')
    || window.location.hostname === ('localhost'),

  /* Generic properties */
  // RUM sampling rate on regular AEM pages is 1 out of 100 page views
  // but we increase this by default for audiences, campaigns and experiments
  // to 1 out of 10 page views so we can collect metrics faster of the relative
  // short durations of those campaigns/experiments
  rumSamplingRate: 10,

  // these metadata fields will be updated when replacing content
  overrideMetadataFields: [],

  // the storage type used to persist data between page views
  // (for instance to remember what variant in an experiment the user was served)
  storage: window.SessionStorage,

  /* Audiences related properties */
  // See more details on the dedicated Audiences page linked below
  audiences: {},
  audiencesMetaTagPrefix: 'audience',
  audiencesQueryParameter: 'audience',

  /* Campaigns related properties */
  // See more details on the dedicated Campaigns page linked below
  campaignsMetaTagPrefix: 'campaign',
  campaignsQueryParameter: 'campaign',

  /* Experimentation related properties */
  // See more details on the dedicated Experiments page linked below
  experimentsMetaTag: 'experiment',
  experimentsQueryParameter: 'experiment',
}, pluginContext);
```

For detailed implementation instructions on the different features, please read the dedicated pages we have on those topics:
- [Audiences](/documentation/audiences.md)
- [Campaigns](/documentation/campaigns.md)
- [Experiments](/documentation/experiments.md)
