/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

import example from '../../../blocks/example/example.js';

document.body.innerHTML = await readFile({ path: './block.html' });

describe('Example block', () => {
  it('Turns links into buttons', async () => {
    const block = document.querySelector('.example');
    expect(block.querySelector('a')).to.exist;
    expect(block.querySelector('button')).to.not.exist;

    await example(block);

    expect(block.querySelector('a')).to.not.exist;
    expect(block.querySelector('button')).to.exist;

    block.querySelector('button').click();
    expect(block.dataset.buttonClicked).to.equal('about:blank');
  });
});
