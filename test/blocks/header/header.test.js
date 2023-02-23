/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile, setViewport } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: '../../scripts/dummy.html' });

const { buildBlock, decorateBlock, loadBlock } = await import('../../../scripts/lib-franklin.js');

document.body.innerHTML = await readFile({ path: '../../scripts/body.html' });

const sleep = async (time = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time);
});

const headerBlock = buildBlock('header', [[]]);
const meta = document.createElement('meta');
meta.setAttribute('name', 'nav');
meta.content = '/test/blocks/header/nav';
document.head.append(meta);
document.querySelector('header').append(headerBlock);
decorateBlock(headerBlock);
await loadBlock(headerBlock);
await sleep();

describe('Header block', () => {
  it('Hamburger shows and hides nav', async () => {
    const hamburger = document.querySelector('.header .nav-hamburger');
    const nav = document.querySelector('.header nav');
    expect(hamburger).to.exist;
    expect(nav).to.exist;
    hamburger.click();
    expect(nav.getAttribute('aria-expanded')).to.equal('true');
    hamburger.click();
    expect(nav.getAttribute('aria-expanded')).to.equal('false');
  });

  it('Section title shows and hides section on desktop', async () => {
    await setViewport({ width: 900, height: 640 });
    const sections = document.querySelector('.header .nav-sections');
    const title = sections.querySelector(':scope li');
    title.click();
    expect(title.getAttribute('aria-expanded')).to.equal('true');
    title.click();
    expect(title.getAttribute('aria-expanded')).to.equal('false');
  });
});
