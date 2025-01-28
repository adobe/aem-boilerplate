/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const MAX_SAMPLING_RATE = 10; // At a maximum we sample 1 in 10 requests

export const DEFAULT_OPTIONS = {
  // Generic properties
  rumSamplingRate: MAX_SAMPLING_RATE, // 1 in 10 requests
  overrideMetadataFields: [],

  // Audiences related properties
  audiences: {},
  audiencesMetaTagPrefix: 'audience',
  audiencesQueryParameter: 'audience',

  // Campaigns related properties
  campaignsMetaTagPrefix: 'campaign',
  campaignsQueryParameter: 'campaign',

  // Experimentation related properties
  experimentsRoot: '/experiments',
  experimentsConfigFile: 'manifest.json',
  experimentsMetaTag: 'experiment',
  experimentsQueryParameter: 'experiment',
};

/**
 * Triggers the callback when the page is actually activated,
 * This is to properly handle speculative page prerendering and marketing events.
 * @param {Function} cb The callback to run
 */
async function onPageActivation(cb) {
  // Speculative prerender-aware execution.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prerendering
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', cb, { once: true });
  } else {
    cb();
  }
}

/**
 * Checks if the current engine is detected as being a bot.
 * @returns `true` if the current engine is detected as being, `false` otherwise
 */
function isBot() {
  return navigator.userAgent.match(/bot|crawl|spider/i);
}

/**
 * Checks if any of the configured audiences on the page can be resolved.
 * @param {string[]} applicableAudiences a list of configured audiences for the page
 * @param {object} options the plugin options
 * @returns Returns the names of the resolved audiences, or `null` if no audience is configured
 */
export async function getResolvedAudiences(applicableAudiences, options, context) {
  if (!applicableAudiences.length || !Object.keys(options.audiences).length) {
    return null;
  }
  // If we have a forced audience set in the query parameters (typically for simulation purposes)
  // we check if it is applicable
  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(options.audiencesQueryParameter)
    ? context.toClassName(usp.get(options.audiencesQueryParameter))
    : null;
  if (forcedAudience) {
    return applicableAudiences.includes(forcedAudience) ? [forcedAudience] : [];
  }

  // Otherwise, return the list of audiences that are resolved on the page
  const results = await Promise.all(
    applicableAudiences
      .map((key) => {
        if (options.audiences[key] && typeof options.audiences[key] === 'function') {
          return options.audiences[key]();
        }
        return false;
      }),
  );
  return applicableAudiences.filter((_, i) => results[i]);
}

/**
 * Replaces main content from path
 * @param {string} path
 * @param {Document} doc
 * @param {string[]} overrideMetadataFields
 * @return Returns the path that was loaded or null if the loading failed
 */
async function replaceContent(path, doc, overrideMetadataFields) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.log('error loading content:', resp);
      return null;
    }
    const html = await resp.text();
    // parse with DOMParser to guarantee valid HTML, and no script execution(s)
    const dom = new DOMParser().parseFromString(html, 'text/html');
    // do not use replaceWith API here since this would replace the main reference
    // in scripts.js as well and prevent proper decoration of the sections/blocks
    doc.querySelector('main').innerHTML = dom.querySelector('main').innerHTML;

    // replace metadata fields
    overrideMetadataFields.forEach((metadataPropName) => {
      const attr = metadataPropName && metadataPropName.includes(':') ? 'property' : 'name';
      const newMetas = dom.head.querySelectorAll(`meta[${attr}="${metadataPropName}"]`);
      const oldMetas = doc.head.querySelectorAll(`meta[${attr}="${metadataPropName}"]`);
      oldMetas.forEach((m) => m.remove());
      newMetas.forEach((m) => doc.head.append(m));
    });

    return path;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error loading content: ${path}`, e);
  }
  return null;
}

/**
 * Parses the experimentation configuration sheet and creates an internal model.
 *
 * Output model is expected to have the following structure:
 *      {
 *        id: <string>,
 *        label: <string>,
 *        blocks: <string>,
 *        audiences: [<string>],
 *        status: Active | Inactive,
 *        variantNames: [<string>],
 *        variants: {
 *          [variantName]: {
 *            label: <string>
 *            percentageSplit: <number 0-1>,
 *            pages: <string>,
 *            blocks: <string>,
 *          }
 *        }
 *      };
 */
function parseExperimentConfig(json, context) {
  const config = {};
  try {
    json.settings.data.forEach((line) => {
      const key = context.toCamelCase(line.Name);
      if (key === 'audience' || key === 'audiences') {
        config.audiences = line.Value ? line.Value.split(',').map((str) => str.trim()) : [];
      } else if (key === 'experimentName') {
        config.label = line.Value;
      } else {
        config[key] = line.Value;
      }
    });
    const variants = {};
    let variantNames = Object.keys(json.experiences.data[0]);
    variantNames.shift();
    variantNames = variantNames.map((vn) => context.toCamelCase(vn));
    variantNames.forEach((variantName) => {
      variants[variantName] = {};
    });
    let lastKey = 'default';
    json.experiences.data.forEach((line) => {
      let key = context.toCamelCase(line.Name);
      if (!key) key = lastKey;
      lastKey = key;
      const vns = Object.keys(line);
      vns.shift();
      vns.forEach((vn) => {
        const camelVN = context.toCamelCase(vn);
        if (key === 'pages' || key === 'blocks') {
          variants[camelVN][key] = variants[camelVN][key] || [];
          if (key === 'pages') variants[camelVN][key].push(new URL(line[vn]).pathname);
          else variants[camelVN][key].push(line[vn]);
        } else {
          variants[camelVN][key] = line[vn];
        }
      });
    });
    config.variants = variants;
    config.variantNames = variantNames;
    return config;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error parsing experiment config:', e, json);
  }
  return null;
}

/**
 * Checks if the given config is a valid experimentation configuration.
 * @param {object} config the config to check
 * @returns `true` if it is valid, `false` otherwise
 */
export function isValidExperimentationConfig(config) {
  if (!config.variantNames
    || !config.variantNames.length
    || !config.variants
    || !Object.values(config.variants).length
    || !Object.values(config.variants).every((v) => (
      typeof v === 'object'
      && !!v.blocks
      && !!v.pages
      && (v.percentageSplit === '' || !!v.percentageSplit)
    ))) {
    return false;
  }
  return true;
}

/**
 * Calculates percentage split for variants where the percentage split is not
 * explicitly configured.
 * Substracts from 100 the explicitly configured percentage splits,
 * and divides the remaining percentage, among the variants without explicit
 * percentage split configured
 * @param {Array} variant objects
 */
function inferEmptyPercentageSplits(variants) {
  const variantsWithoutPercentage = [];

  const remainingPercentage = variants.reduce((result, variant) => {
    if (!variant.percentageSplit) {
      variantsWithoutPercentage.push(variant);
    }
    const newResult = result - parseFloat(variant.percentageSplit || 0);
    return newResult;
  }, 1);
  if (variantsWithoutPercentage.length) {
    const missingPercentage = remainingPercentage / variantsWithoutPercentage.length;
    variantsWithoutPercentage.forEach((v) => {
      v.percentageSplit = missingPercentage.toFixed(4);
    });
  }
}

/**
 * Gets experiment config from the metadata.
 *
 * @param {string} experimentId The experiment identifier
 * @param {string} instantExperiment The list of varaints
 * @returns {object} the experiment manifest
 */
function getConfigForInstantExperiment(
  experimentId,
  instantExperiment,
  pluginOptions,
  context,
) {
  const audience = context.getMetadata(`${pluginOptions.experimentsMetaTag}-audience`);
  const config = {
    label: `Instant Experiment: ${experimentId}`,
    audiences: audience ? audience.split(',').map(context.toClassName) : [],
    status: context.getMetadata(`${pluginOptions.experimentsMetaTag}-status`) || 'Active',
    startDate: context.getMetadata(`${pluginOptions.experimentsMetaTag}-start-date`),
    endDate: context.getMetadata(`${pluginOptions.experimentsMetaTag}-end-date`),
    id: experimentId,
    variants: {},
    variantNames: [],
  };

  const nbOfVariants = Number(instantExperiment);
  const pages = Number.isNaN(nbOfVariants)
    ? instantExperiment.split(',').map((p) => new URL(p.trim(), window.location).pathname)
    : new Array(nbOfVariants).fill(window.location.pathname);

  const splitString = context.getMetadata(`${pluginOptions.experimentsMetaTag}-split`);
  const splits = splitString
    // custom split
    ? splitString.split(',').map((i) => parseFloat(i) / 100)
    // even split fallback
    : [...new Array(pages.length)].map(() => 1 / (pages.length + 1));

  config.variantNames.push('control');
  config.variants.control = {
    percentageSplit: '',
    pages: [window.location.pathname],
    blocks: [],
    label: 'Control',
  };

  pages.forEach((page, i) => {
    const vname = `challenger-${i + 1}`;
    config.variantNames.push(vname);
    config.variants[vname] = {
      percentageSplit: `${splits[i].toFixed(4)}`,
      pages: [page],
      blocks: [],
      label: `Challenger ${i + 1}`,
    };
  });
  inferEmptyPercentageSplits(Object.values(config.variants));
  return (config);
}

/**
 * Gets experiment config from the manifest and transforms it to more easily
 * consumable structure.
 *
 * the manifest consists of two sheets "settings" and "experiences", by default
 *
 * "settings" is applicable to the entire test and contains information
 * like "Audience", "Status" or "Blocks".
 *
 * "experience" hosts the experiences in rows, consisting of:
 * a "Percentage Split", "Label" and a set of "Links".
 *
 *
 * @param {string} experimentId The experiment identifier
 * @param {object} pluginOptions The plugin options
 * @returns {object} containing the experiment manifest
 */
async function getConfigForFullExperiment(experimentId, pluginOptions, context) {
  let path;
  if (experimentId.includes(`/${pluginOptions.experimentsConfigFile}`)) {
    path = new URL(experimentId, window.location.origin).href;
    // eslint-disable-next-line no-param-reassign
    [experimentId] = path.split('/').splice(-2, 1);
  } else {
    path = `${pluginOptions.experimentsRoot}/${experimentId}/${pluginOptions.experimentsConfigFile}`;
  }
  try {
    const resp = await fetch(path);
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.log('error loading experiment config:', resp);
      return null;
    }
    const json = await resp.json();
    const config = pluginOptions.parser
      ? pluginOptions.parser(json, context)
      : parseExperimentConfig(json, context);
    if (!config) {
      return null;
    }
    config.id = experimentId;
    config.manifest = path;
    config.basePath = `${pluginOptions.experimentsRoot}/${experimentId}`;
    inferEmptyPercentageSplits(Object.values(config.variants));
    config.status = context.getMetadata(`${pluginOptions.experimentsMetaTag}-status`) || config.status;
    return config;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error loading experiment manifest: ${path}`, e);
  }
  return null;
}

function getDecisionPolicy(config) {
  const decisionPolicy = {
    id: 'content-experimentation-policy',
    rootDecisionNodeId: 'n1',
    decisionNodes: [{
      id: 'n1',
      type: 'EXPERIMENTATION',
      experiment: {
        id: config.id,
        identityNamespace: 'ECID',
        randomizationUnit: 'DEVICE',
        treatments: Object.entries(config.variants).map(([key, props]) => ({
          id: key,
          allocationPercentage: Number(props.percentageSplit) * 100,
        })),
      },
    }],
  };
  return decisionPolicy;
}

async function getConfig(experiment, instantExperiment, pluginOptions, context) {
  const usp = new URLSearchParams(window.location.search);
  const [forcedExperiment, forcedVariant] = usp.has(pluginOptions.experimentsQueryParameter)
    ? usp.get(pluginOptions.experimentsQueryParameter).split('/')
    : [];

  const experimentConfig = instantExperiment
    ? await getConfigForInstantExperiment(experiment, instantExperiment, pluginOptions, context)
    : await getConfigForFullExperiment(experiment, pluginOptions, context);

  // eslint-disable-next-line no-console
  console.debug(experimentConfig);
  if (!experimentConfig) {
    return null;
  }

  const forcedAudience = usp.has(pluginOptions.audiencesQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.audiencesQueryParameter))
    : null;

  experimentConfig.resolvedAudiences = await getResolvedAudiences(
    experimentConfig.audiences.map(context.toClassName),
    pluginOptions,
    context,
  );
  experimentConfig.run = (
    // experiment is active or forced
    (['active', 'on', 'true'].includes(context.toClassName(experimentConfig.status)) || forcedExperiment)
    // experiment has resolved audiences if configured
    && (!experimentConfig.resolvedAudiences || experimentConfig.resolvedAudiences.length)
    // forced audience resolves if defined
    && (!forcedAudience || experimentConfig.audiences.includes(forcedAudience))
    && (!experimentConfig.startDate || new Date(experimentConfig.startDate) <= Date.now())
    && (!experimentConfig.endDate || new Date(experimentConfig.endDate) > Date.now())
  );

  window.hlx = window.hlx || {};
  window.hlx.experiment = experimentConfig;

  // eslint-disable-next-line no-console
  console.debug('run', experimentConfig.run, experimentConfig.audiences);
  if (forcedVariant && experimentConfig.variantNames.includes(forcedVariant)) {
    experimentConfig.selectedVariant = forcedVariant;
  } else {
    // eslint-disable-next-line import/extensions
    const { ued } = await import('./ued.js');
    const decision = ued.evaluateDecisionPolicy(getDecisionPolicy(experimentConfig), {});
    experimentConfig.selectedVariant = decision.items[0].id;
  }
  return experimentConfig;
}

export async function runExperiment(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const experiment = context.getMetadata(pluginOptions.experimentsMetaTag);
  if (!experiment) {
    return false;
  }
  const variants = context.getMetadata('instant-experiment')
    || context.getMetadata(`${pluginOptions.experimentsMetaTag}-variants`);
  let experimentConfig;
  try {
    experimentConfig = await getConfig(experiment, variants, pluginOptions, context);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Invalid experiment config.', err);
  }
  if (!experimentConfig || !isValidExperimentationConfig(experimentConfig)) {
    // eslint-disable-next-line no-console
    console.warn('Invalid experiment config. Please review your metadata, sheet and parser.');
    return false;
  }

  const usp = new URLSearchParams(window.location.search);
  const forcedVariant = usp.has(pluginOptions.experimentsQueryParameter)
    ? usp.get(pluginOptions.experimentsQueryParameter).split('/')[1]
    : null;
  if (!experimentConfig.run && !forcedVariant) {
    // eslint-disable-next-line no-console
    console.warn('Experiment will not run. It is either not active or its configured audiences are not resolved.');
    return false;
  }
  // eslint-disable-next-line no-console
  console.debug(`running experiment (${window.hlx.experiment.id}) -> ${window.hlx.experiment.selectedVariant}`);

  if (experimentConfig.selectedVariant === experimentConfig.variantNames[0]) {
    document.body.classList.add(`experiment-${context.toClassName(experimentConfig.id)}`);
    document.body.classList.add(`variant-${context.toClassName(experimentConfig.selectedVariant)}`);
    onPageActivation(() => {
      context.sampleRUM('experiment', {
        source: experimentConfig.id,
        target: experimentConfig.selectedVariant,
      });
    });
    return false;
  }

  const { pages } = experimentConfig.variants[experimentConfig.selectedVariant];
  if (!pages.length) {
    return false;
  }

  const currentPath = window.location.pathname;
  const control = experimentConfig.variants[experimentConfig.variantNames[0]];
  const index = control.pages.indexOf(currentPath);
  if (index < 0) {
    return false;
  }

  // Fullpage content experiment
  document.body.classList.add(`experiment-${context.toClassName(experimentConfig.id)}`);
  let result;
  if (pages[index] !== currentPath) {
    result = await replaceContent(pages[index], document, pluginOptions.overrideMetadataFields);
  } else {
    result = currentPath;
  }
  experimentConfig.servedExperience = result || currentPath;
  if (!result) {
    // eslint-disable-next-line no-console
    console.debug(`failed to serve variant ${window.hlx.experiment.selectedVariant}. Falling back to ${experimentConfig.variantNames[0]}.`);
  }
  document.body.classList.add(`variant-${context.toClassName(result ? experimentConfig.selectedVariant : experimentConfig.variantNames[0])}`);
  onPageActivation(() => {
    context.sampleRUM('experiment', {
      source: experimentConfig.id,
      target: result ? experimentConfig.selectedVariant : experimentConfig.variantNames[0],
    });
  });
  return result;
}

export async function runCampaign(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...options };
  const usp = new URLSearchParams(window.location.search);
  const campaign = (usp.has(pluginOptions.campaignsQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.campaignsQueryParameter))
    : null)
    || (usp.has('utm_campaign') ? context.toClassName(usp.get('utm_campaign')) : null);
  if (!campaign) {
    return false;
  }

  let audiences = context.getMetadata(`${pluginOptions.campaignsMetaTagPrefix}-audience`);
  let resolvedAudiences = null;
  if (audiences) {
    audiences = audiences.split(',').map(context.toClassName);
    resolvedAudiences = await getResolvedAudiences(audiences, pluginOptions, context);
    if (!!resolvedAudiences && !resolvedAudiences.length) {
      return false;
    }
  }

  const allowedCampaigns = context.getAllMetadata(pluginOptions.campaignsMetaTagPrefix);
  if (!Object.keys(allowedCampaigns).includes(campaign)) {
    return false;
  }

  const urlString = allowedCampaigns[campaign];
  if (!urlString) {
    return false;
  }

  window.hlx.campaign = { selectedCampaign: campaign };
  if (resolvedAudiences) {
    window.hlx.campaign.resolvedAudiences = window.hlx.campaign;
  }

  try {
    const url = new URL(urlString);
    const result = await replaceContent(
      url.pathname,
      document,
      pluginOptions.overrideMetadataFields,
    );
    window.hlx.campaign.servedExperience = result || window.location.pathname;
    if (!result) {
      // eslint-disable-next-line no-console
      console.debug(`failed to serve campaign ${campaign}. Falling back to default content.`);
    }
    document.body.classList.add(`campaign-${campaign}`);
    onPageActivation(() => {
      context.sampleRUM('campaign', {
        source: window.location.href,
        target: result ? campaign : 'default',
      });
    });
    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
}

export async function serveAudience(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const configuredAudiences = context.getAllMetadata(pluginOptions.audiencesMetaTagPrefix);
  if (!Object.keys(configuredAudiences).length) {
    return false;
  }

  const audiences = await getResolvedAudiences(
    Object.keys(configuredAudiences).map(context.toClassName),
    pluginOptions,
    context,
  );
  if (!audiences || !audiences.length) {
    return false;
  }

  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(pluginOptions.audiencesQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.audiencesQueryParameter))
    : null;

  const selectedAudience = forcedAudience || audiences[0];
  const urlString = configuredAudiences[selectedAudience];
  if (!urlString) {
    return false;
  }

  window.hlx.audience = { selectedAudience };

  try {
    const url = new URL(urlString);
    const result = await replaceContent(
      url.pathname,
      document,
      pluginOptions.overrideMetadataFields,
    );
    window.hlx.audience.servedExperience = result || window.location.pathname;
    if (!result) {
      // eslint-disable-next-line no-console
      console.debug(`failed to serve audience ${selectedAudience}. Falling back to default content.`);
    }
    document.body.classList.add(audiences.map((audience) => `audience-${audience}`));
    onPageActivation(() => {
      context.sampleRUM('audiences', {
        source: window.location.href,
        target: result ? forcedAudience || audiences.join(',') : 'default',
      });
    });
    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
}

window.hlx.patchBlockConfig?.push((config) => {
  const { experiment } = window.hlx;

  // No experiment is running
  if (!experiment || !experiment.run) {
    return config;
  }

  // The current experiment does not modify the block
  if (experiment.selectedVariant === experiment.variantNames[0]
    || !experiment.variants[experiment.variantNames[0]].blocks
    || !experiment.variants[experiment.variantNames[0]].blocks.includes(config.blockName)) {
    return config;
  }

  // The current experiment does not modify the block code
  const variant = experiment.variants[experiment.selectedVariant];
  if (!variant.blocks.length) {
    return config;
  }

  let index = experiment.variants[experiment.variantNames[0]].blocks.indexOf('');
  if (index < 0) {
    index = experiment.variants[experiment.variantNames[0]].blocks.indexOf(config.blockName);
  }
  if (index < 0) {
    index = experiment.variants[experiment.variantNames[0]].blocks.indexOf(`/blocks/${config.blockName}`);
  }
  if (index < 0) {
    return config;
  }

  let origin = '';
  let path;
  if (/^https?:\/\//.test(variant.blocks[index])) {
    const url = new URL(variant.blocks[index]);
    // Experimenting from a different branch
    if (url.origin !== window.location.origin) {
      origin = url.origin;
    }
    // Experimenting from a block path
    if (url.pathname !== '/') {
      path = url.pathname;
    } else {
      path = `/blocks/${config.blockName}`;
    }
  } else { // Experimenting from a different branch on the same branch
    path = `/blocks/${variant.blocks[index]}`;
  }
  if (!origin && !path) {
    return config;
  }

  const { codeBasePath } = window.hlx;
  return {
    ...config,
    cssPath: `${origin}${codeBasePath}${path}/${config.blockName}.css`,
    jsPath: `${origin}${codeBasePath}${path}/${config.blockName}.js`,
  };
});

let isAdjusted = false;
function adjustedRumSamplingRate(checkpoint, options, context) {
  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  return (data) => {
    if (!window.hlx.rum.isSelected && !isAdjusted) {
      isAdjusted = true;
      // adjust sampling rate based on project config …
      window.hlx.rum.weight = Math.min(
        window.hlx.rum.weight,
        // … but limit it to the 10% sampling at max to avoid losing anonymization
        // and reduce burden on the backend
        Math.max(pluginOptions.rumSamplingRate, MAX_SAMPLING_RATE),
      );
      window.hlx.rum.isSelected = (window.hlx.rum.random * window.hlx.rum.weight < 1);
      if (window.hlx.rum.isSelected) {
        context.sampleRUM(checkpoint, data);
      }
    }
    return true;
  };
}

function adjustRumSampligRate(document, options, context) {
  const checkpoints = ['audiences', 'campaign', 'experiment'];
  if (context.sampleRUM.always) { // RUM v1.x
    checkpoints.forEach((ck) => {
      context.sampleRUM.always.on(ck, adjustedRumSamplingRate(ck, options, context));
    });
  } else { // RUM 2.x
    document.addEventListener('rum', (event) => {
      if (event.detail
        && event.detail.checkpoint
        && checkpoints.includes(event.detail.checkpoint)) {
        adjustedRumSamplingRate(event.detail.checkpoint, options, context);
      }
    });
  }
}

export async function loadEager(document, options, context) {
  onPageActivation(() => {
    adjustRumSampligRate(document, options, context);
  });
  let res = await runCampaign(document, options, context);
  if (!res) {
    res = await runExperiment(document, options, context);
  }
  if (!res) {
    res = await serveAudience(document, options, context);
  }
}

export async function loadLazy(document, options, context) {
  const pluginOptions = {
    ...DEFAULT_OPTIONS,
    ...(options || {}),
  };
  // do not show the experimentation pill on prod domains
  if (window.location.hostname.endsWith('.live')
    || (typeof options.isProd === 'function' && options.isProd())
    || (options.prodHost
      && (options.prodHost === window.location.host
        || options.prodHost === window.location.hostname
        || options.prodHost === window.location.origin))) {
    return;
  }
  // eslint-disable-next-line import/no-cycle
  const preview = await import('./preview.js');
  preview.default(document, pluginOptions, { ...context, getResolvedAudiences });
}
