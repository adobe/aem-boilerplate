/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: '../../scripts/body.html' });

describe('Hero block', () => {
  it('Builds hero block from picture and h1', async () => {
    await import('../../../scripts/scripts.js');
    expect(document.querySelector('.hero')).to.exist;
  });
});
