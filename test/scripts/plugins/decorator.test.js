/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

let decorator;

document.body.innerHTML = await readFile({ path: '../dummy.html' });
document.head.innerHTML = await readFile({ path: '../head.html' });

describe('Decorator plugin', () => {
  before(async () => {
    decorator = await import('../../../scripts/plugins/decorator.js');
    document.body.innerHTML = await readFile({ path: '../body.html' });
  });

  it('Decorates sections', async () => {
    decorator.decorateSections(document.querySelector('main'));
    expect(document.querySelectorAll('main .section').length).to.equal(2);
  });

  it('Decorates blocks', async () => {
    decorator.decorateBlocks(document.querySelector('main'));
    expect(document.querySelectorAll('main .block').length).to.equal(1);
  });
});
