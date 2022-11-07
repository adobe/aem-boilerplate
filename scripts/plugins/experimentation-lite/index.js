import {
  getMetadata,
  toCamelCase,
  toClassName,
} from '../../lib-franklin.js';

const DEFAULT_OPTIONS = {
  basePath: '/experiments',
  configFile: 'manifest.json',
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
      if (['audience', 'status'].includes(prop)) {
        config[prop] = row.Value;
      } else if (prop === 'experimentName') {
        config.label = row.Value;
      } else if (prop === 'blocks') {
        config[prop] = row.Value.split(/[,\n]/);
      }
    });

    config.variantNames = [];
    config.variants = {};
    json.variants.data.forEach((row) => {
      const {
        Name, Label, Split, Pages, Blocks,
      } = row;
      const variantName = toCamelCase(Name);
      config.variantNames.push(variantName);
      config.variants[variantName] = {
        label: Label,
        percentageSplit: Split,
        content: Pages ? Pages.trim().split(',') : [],
        code: Blocks ? Blocks.trim().split(',') : [],
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

function validateConfig(config) {
  if (!config.variantNames
    || !config.variants
    || !Object.values(config.variants).every((v) => (
      typeof v === 'object'
      && !!v.code
      && !!v.content
      && (v.percentageSplit === '' || !!v.percentageSplit)
    ))) {
    throw new Error('Invalid experiment config. Please review your sheet and parser.');
  }
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
  const path = `${cfg.basePath}/${experimentId}/${cfg.configFile}`;
  try {
    const resp = await fetch(path);
    if (!resp.ok) {
      console.log('error loading experiment config:', resp);
      return null;
    }
    const json = await resp.json();
    const config = cfg.parser ? cfg.parser(json) : parseExperimentConfig(json);
    validateConfig(config);
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
  if (!experimentConfig || (toCamelCase(experimentConfig.status) !== 'active' && !forcedExperiment)) {
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
  if (!content.length) {
    return;
  }

  const control = experimentConfig.variants[experimentConfig.variantNames[0]];
  const index = control.content.indexOf(currentPath);
  if (index < 0 || content[index] === currentPath) {
    return;
  }

  // Fullpage content experiment
  await replaceInner(content[0], document.querySelector('main'));
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

  // The current experiment does not modify the block code
  const variant = experiment.variants[experiment.selectedVariant];
  if (!variant.code.length) {
    return config;
  }

  const index = experiment.variants[experiment.variantNames[0]].code.indexOf(config.blockName);
  if (index < 0) {
    return config;
  }

  let origin;
  let path;
  if (/^https?:\/\//.test(variant.code[index])) {
    const url = new URL(variant.code[index]);
    // Experimenting from a different branch
    if (url.origin !== window.location.origin) {
      origin = url.origin;
    }
    // Experimenting from a block path
    if (url.pathname !== '/') {
      path = url.pathname;
    }
  } else { // Experimenting from a different branch on the same branch
    path = variant.code[index];
  }
  if (!origin && !path) {
    return config;
  }

  return {
    ...config,
    cssPath: `${origin}${path}/${config.blockName}.css`,
    jsPath: `${origin}${path}/${config.blockName}.js`,
  };
}

export async function preEager(customOptions, plugins) {
  const options = {
    ...DEFAULT_OPTIONS,
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
