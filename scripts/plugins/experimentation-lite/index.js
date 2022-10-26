import {
  getMetadata,
  toCamelCase,
  toClassName,
} from '../../lib-franklin.js';

const DEFAULT_OPTIONS = {
  basePath: '/experiments',
  configFile: 'manifest',
  metaTag: 'experiment',
  queryParameter: 'experiment',
  storeKey: 'hlx-experiments',
};

/**
 * Parses the experimentation configuration sheet and creates an internal model.
 *
 * Output model is expected to have the following structure:
 *      {
 *        label: <string>,
 *        blocks: [<string>]
 *        audience: Desktop | Mobile,
 *        status: Active | On | True | Yes,
 *        variantNames: [<string>],
 *        variants: {
 *          [variantName]: {
 *            label: <string>
 *            percentageSplit: <number 0-1>,
 *            content: <string>,
 *            code: <string>,
 *          }
 *        }
 *      };
 */
function parseExperimentConfig(json) {
  const config = {};
  try {
    json.settings.data.forEach((row) => {
      const prop = toCamelCase(row.Name);
      if (['audience', 'label', 'status'].includes(prop)) {
        config[prop] = row.Value;
      } else if (prop === 'blocks') {
        config[prop] = row.Value.split(/[,\n]/);
      }
    });

    config.variantNames = [];
    config.variants = {};
    json.variants.data.forEach((row) => {
      const {
        Name, Label, Split, Page, Block,
      } = row;
      const variantName = toCamelCase(Name);
      config.variantNames.push(variantName);
      config.variants[variantName] = {
        label: Label,
        percentageSplit: Split,
        content: Page.trim(),
        code: Block.trim(),
      };
    });
    return config;
  } catch (e) {
    console.log('error parsing experiment config:', e);
  }
  return null;
}

/**
 * Gets the experiment name, if any for the page based on env, useragent, queyr params
 * @returns {string} experimentid
 */
export function getExperiment(tagName) {
  if (navigator.userAgent.match(/bot|crawl|spider/i)) {
    return null;
  }

  return toClassName(getMetadata(tagName)) || null;
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
 * @param {string} experimentId
 * @param {object} cfg
 * @returns {object} containing the experiment manifest
 */
export async function getExperimentConfig(experimentId, cfg) {
  let config;
  if (cfg.getExperimentConfig) {
    config = await cfg.getExperimentConfig(experimentId);
  }
  if (config) {
    return config;
  }

  const path = `${cfg.basePath}/${experimentId}/${cfg.configFile}.json`;
  try {
    const resp = await fetch(path);
    if (!resp.ok) {
      console.log('error loading experiment config:', resp);
      return null;
    }
    const json = await resp.json();
    config = parseExperimentConfig(json, cfg);
    config.id = experimentId;
    config.manifest = path;
    config.basePath = `${cfg.basePath}/${experimentId}`;
    return config;
  } catch (e) {
    console.log(`error loading experiment manifest: ${path}`, e);
  }
  return null;
}

/**
 * this is an extensible stub to take on audience mappings
 * @param {string} audience
 * @return {boolean} is member of this audience
 */
function isValidAudience(audience) {
  if (audience === 'mobile') {
    return window.innerWidth < 600;
  }
  if (audience === 'desktop') {
    return window.innerWidth >= 600;
  }
  return true;
}

/**
 * gets the variant id that this visitor has been assigned to if any
 * @param {string} experimentId
 * @return {string} assigned variant or empty string if none set
 */

function getSavedExperimentVariant(experimentId) {
  const experimentsStr = localStorage.getItem('hlx-experiments');
  if (!experimentsStr) {
    return null;
  }

  const experiments = JSON.parse(experimentsStr);
  return experiments[experimentId] ? experiments[experimentId].variant : null;
}

/**
 * Randomization function that returns one variant from the list based on the
 * splits that have been configured.
 */
function getRandomVariant(config) {
  let random = Math.random();
  let i = config.variantNames.length;
  while (random > 0 && i > 0) {
    i -= 1;
    console.debug(random, i);
    random -= +config.variants[config.variantNames[i]].percentageSplit;
  }
  return config.variantNames[i];
}

/**
 * sets/updates the variant id that is assigned to this visitor,
 * also cleans up old variant ids
 * @param {string} experimentId
 * @param {variant} variant
 */
function saveSelectedExperimentVariant(storeKey, experimentId, variant) {
  const experimentsStr = localStorage.getItem(storeKey);
  const experiments = experimentsStr ? JSON.parse(experimentsStr) : {};

  const now = new Date();
  const expKeys = Object.keys(experiments);
  expKeys.forEach((key) => {
    const date = new Date(experiments[key].date);
    if (now - date > (1000 * 86400 * 30)) {
      delete experiments[key];
    }
  });
  const [date] = now.toISOString().split('T');

  experiments[experimentId] = { variant, date };
  localStorage.setItem(storeKey, JSON.stringify(experiments));
}

/**
 * Replaces element with content from path
 * @param {string} path
 * @param {HTMLElement} element
 * @param {boolean} isBlock
 */
async function replaceInner(path, element, isBlock = false) {
  const plainPath = `${path}.plain.html`;
  try {
    const resp = await fetch(plainPath);
    if (!resp.ok) {
      console.log('error loading experiment content:', resp);
      return null;
    }
    const html = await resp.text();
    if (isBlock) {
      const div = document.createElement('div');
      div.innerHTML = html;
      element.replaceWith(div.children[0].children[0]);
    } else {
      element.innerHTML = html;
    }
  } catch (e) {
    console.log(`error loading experiment content: ${plainPath}`, e);
  }
  return null;
}

async function runExperiment(config, plugins) {
  const experiment = getExperiment(config.metaTag);
  if (!experiment) {
    return;
  }

  const usp = new URLSearchParams(window.location.search);
  const [forcedExperiment, forcedVariant] = usp.has(config.queryParameter) ? usp.get(config.queryParameter).split('/') : [];

  const experimentConfig = await getExperimentConfig(experiment, config);
  console.debug(experimentConfig);
  if (toCamelCase(experimentConfig.status) !== 'active' && !forcedExperiment) {
    return;
  }

  experimentConfig.run = forcedExperiment
    || isValidAudience(toClassName(experimentConfig.audience));
  window.hlx = window.hlx || {};
  window.hlx.experiment = experimentConfig;
  console.debug('run', experimentConfig.run, experimentConfig.audience);
  if (!experimentConfig.run) {
    return;
  }

  const forced = forcedVariant || getSavedExperimentVariant(config.storeKey, experimentConfig.id);
  if (forced && experimentConfig.variantNames.includes(forced)) {
    experimentConfig.selectedVariant = forced;
  } else {
    experimentConfig.selectedVariant = config.getRandomVariant
      ? config.getRandomVariant(experimentConfig)
      : getRandomVariant(experimentConfig);
  }
  saveSelectedExperimentVariant(
    config.storeKey,
    experimentConfig.id,
    experimentConfig.selectedVariant,
  );

  if (plugins.rum) {
    plugins.rum.sampleRUM('experiment', { source: experimentConfig.id, target: experimentConfig.selectedVariant });
  }
  console.debug(`running experiment (${window.hlx.experiment.id}) -> ${window.hlx.experiment.selectedVariant}`);

  if (experimentConfig.selectedVariant === experimentConfig.variantNames[0]) {
    return;
  }

  const currentPath = window.location.pathname;
  const { content } = experimentConfig.variants[experimentConfig.selectedVariant];
  if (content === currentPath || !content) {
    return;
  }

  // Fullpage content experiment
  if (!experimentConfig.blocks && content !== currentPath) {
    await replaceInner(content, document.querySelector('main'));
  } else if (experimentConfig.blocks && experimentConfig.blocks.length && content !== '/') {
    // Block content experiment
    const selector = experimentConfig.blocks.map((blockName) => `.${blockName}`).join(',');
    await Promise.all(
      [...document.querySelectorAll(selector)].map((block) => replaceInner(content, block, true)),
    );
  }
}

export function patchBlockConfig(config) {
  const { experiment } = window.hlx;

  // No experiment is running
  if (!experiment || !experiment.run) {
    return config;
  }

  // The current experiment does not modify the block
  if (experiment.selectedVariant === experiment.variantNames[0]
    || !experiment.blocks || !experiment.blocks.includes(config.blockName)) {
    return config;
  }

  const variant = experiment.variants[experiment.selectedVariant];
  if (/^https?:\/\//.test(variant.code)) {
    const { origin } = new URL(variant.code);
    if (origin !== window.location.origin) {
      return {
        ...config,
        cssPath: `${origin}${window.hlx.codeBasePath}/blocks/${config.blockName}/${config.blockName}.css`,
        jsPath: `${origin}${window.hlx.codeBasePath}/blocks/${config.blockName}/${config.blockName}.js`,
      };
    }
  } else {
    return {
      ...config,
      cssPath: `${window.hlx.codeBasePath}${experiment.basePath}/${variant.code}/${config.blockName}.css`,
      jsPath: `${window.hlx.codeBasePath}${experiment.basePath}/${variant.code}/${config.blockName}.js`,
    };
  }
  return config;
}

export async function preEager(customOptions, plugins) {
  const options = {
    ...DEFAULT_OPTIONS,
    parser: parseExperimentConfig,
    ...customOptions,
  };
  await runExperiment(options, plugins);
}

export async function postEager() {
  if (window.location.hostname.endsWith('hlx.page') || window.location.hostname === ('localhost')) {
    // eslint-disable-next-line import/no-cycle
    import('./preview.js');
  }
}
