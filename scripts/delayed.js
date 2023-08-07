// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
async function loadScript(src, parent, attrs) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`${parent} > script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      if (attrs) {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
      }
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    } else {
      resolve();
    }
  });
}

await loadScript('https://assets.adobedtm.com/51b39232f128/fd9ec2c2b234/launch-e97b90be17d8-development.min.js', 'body', { async: true });
