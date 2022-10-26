import {
  preEager as litePreEager,
  postEager as litePostEager,
} from '../experimentation-lite/index.js';

export async function preEager(options, plugins) {
  return litePreEager({
    ...options,
    getRandomVariant: (config) => {
      let random = Math.random();
      let i = config.variantNames.length;
      while (random > 0 && i > 0) {
        i -= 1;
        console.debug(random, i);
        random -= +config.variants[config.variantNames[i]].percentageSplit;
      }
      return config.variantNames[i];
    },
  }, plugins);
}

export async function postEager(options, plugins) {
  return litePostEager(options, plugins);
}
