# franklin-plugin-experimentation
An A/B testing plugin for Franklin that leverages the Unified Experience Decisioning engine.

It supports the following use cases:
- Full page content A/B tests via instant expriments, by setting page metadata
- Full page content A/B tests via full experiments, by configuring page metadata and an experiment manifest in a Google Sheet/Sharepoint Workbook
- Block code A/B tests via full experiments, by configuring page metadata and an experiment manifest in a Google Sheet/Sharepoint Workbook

![](./docs/screenshot.png)

## Install

### Via the boilerplate

```bash
npm run franklin:plugin:add --name=experimentation --url=git@github.com:ramboz/franklin-plugin-experimentation.git
```

You can then later update it from the source again via:
```bash
npm run franklin:plugin:update --name=experimentation
```

### Manually

```bash
git subtree add --squash --prefix plugins/experimentation git@github.com:ramboz/franklin-plugin-experimentation.git main
```

You can then later update it from the source again via:
```bash
git subtree pull --squash --prefix plugins/experimentation git@github.com:ramboz/franklin-plugin-experimentation.git main
```

## Usage

### Via the plugin system

The easiest is to load the plugin via the `withPlugin` method provided in this forked [Franklin Project Boilerplate](https://github.com/ramboz/helix-project-boilerplate).

```js
import { withPlugin } from './lib-franklin.js';

...

await withPlugin('/plugins/experimentation/index.js', options);
```

### Manually

Alternatively, you can also just directly use this as:

```js
import {
  getMetadata,
  toCamelCase,
  toClassName,
} from './lib-franklin.js';

...

const context = {
  getMetadata,
  toCamelCase,
  toClassName,
};

const experiment = getMetadata('experiment');
const instantExperiment = getMetadata('instant-experiment');
if (instantExperiment || experiment) {
  const { getConfig, isValidConfig, runExperiment } = await import('/plugins/experimentation/index.js');
  const config = await getConfig.call(context, experiment, instantExperiment, options);
  if (!config || !isValidConfig(config)) {
    return;
  }
  await runExperiment.call(context, config);
}

...

if (window.location.hostname.endsWith('hlx.page') || window.location.hostname === ('localhost')) {
  // eslint-disable-next-line import/extensions
  const preview = await import('/plugins/experimentation/preview.js');
  preview.default(options);
}
```

by making sure you place the fist block that runs the experiment as early in the eager phase as you can, and the block that loads the preview at the end of the lazy phase.

## Configuration

| Name | Default | Type | Description |
|-|-|-|-|
| `root` | `/experiments` | `string` | The root path for full experiments in your Google Drive/Sharepoint
| `configFile` | `manifest.json` | `string` | The name for the full experiment manifest endpoint
| `metaTag` | `experiment` | `string` | The name of the meta tag that contains the experiment name
| `queryParameter` | `experiment` | `string` | The name of the query parameter that is used to override the current experiment and variant

You'd use those as follows:
```js
await withPlugin('/plugins/experimentation/index.js', {
  root: '/experiments',
  configFile: 'manifest.json',
  metaTag: 'experiment',
  queryParameter: 'experiment',
});
```
