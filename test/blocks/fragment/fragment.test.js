/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: './block.html' });

describe('Fragment block', () => {
  it('Replaces fragment block with fragment content', async () => {
    await import('../../../scripts/scripts.js');
    const text = await new Promise((resolve) => {
      // wait for section to finish loading
      const check = setInterval(() => {
        const section = document.querySelector('.section');
        if (section.dataset.sectionStatus === 'loaded') {
          clearInterval(check);
          resolve(section.textContent.trim());
        }
      }, 100);
    });
    expect(text).to.equal('Hello world!');
    expect(document.querySelector('.fragment')).to.not.exist;
  });
});
