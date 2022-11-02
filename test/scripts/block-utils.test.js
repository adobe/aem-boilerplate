/* eslint-disable no-unused-expressions */
/* global describe before beforeEach it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

let blockUtils;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Utils methods', () => {
  before(async () => {
    blockUtils = await import('../../scripts/lib-franklin.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  beforeEach(async () => {
    await blockUtils.init({ delayedDuration: 10 });
  });

  it('Sanitizes class name', async () => {
    expect(blockUtils.toClassName('Hello world')).to.equal('hello-world');
    expect(blockUtils.toClassName(null)).to.equal('');
  });

  it('Extracts metadata', async () => {
    expect(blockUtils.getMetadata('description')).to.equal('Lorem ipsum dolor sit amet.');
    expect(blockUtils.getMetadata('og:title')).to.equal('Foo');
  });

  it('Loads CSS', async () => {
    // loads a css file and calls callback
    const load = await new Promise((resolve) => {
      blockUtils.loadCSS('/test/scripts/test.css', (e) => resolve(e));
    });
    expect(load).to.equal('load');
    expect(getComputedStyle(document.body).color).to.equal('rgb(255, 0, 0)');

    // does nothing if css already loaded
    const noop = await new Promise((resolve) => {
      blockUtils.loadCSS('/test/scripts/test.css', (e) => resolve(e));
    });
    expect(noop).to.equal('noop');

    // calls callback in case of error
    const error = await new Promise((resolve) => {
      blockUtils.loadCSS('/test/scripts/nope.css', (e) => resolve(e));
    });
    expect(error).to.equal('error');
  });

  it('Creates optimized picture', async () => {
    const $picture = blockUtils.createOptimizedPicture('/test/scripts/mock.png');
    expect($picture.querySelector(':scope source[type="image/webp"]')).to.exist; // webp
    expect($picture.querySelector(':scope source:not([type="image/webp"])')).to.exist; // fallback
    expect($picture.querySelector(':scope img').src).to.include('format=png&optimize=medium'); // default
  });

  it('Normalizes headings', async () => {
    const numHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    blockUtils.normalizeHeadings(document.querySelector('main'), ['h1', 'h2', 'h3']);
    expect(document.querySelectorAll('h1, h2, h3, h4, h5, h6').length).to.equal(numHeadings);
    expect(document.querySelectorAll('h4, h5, h6').length).to.equal(0);
  });
});

describe('Sections and blocks', () => {
  before(async () => {
    blockUtils = await import('../../scripts/lib-franklin.js');
    await blockUtils.withPlugin('../../scripts/plugins/decorator.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  beforeEach(async () => {
    await blockUtils.init({ delayedDuration: 10 });
  });

  it('Loads blocks', async () => {
    await blockUtils.loadBlocks(document.querySelector('main'));
    document.querySelectorAll('main .block').forEach(($block) => {
      expect($block.dataset.blockStatus).to.equal('loaded');
    });
  });

  it('Updates section status', async () => {
    blockUtils.updateSectionsStatus(document.querySelector('main'));
    document.querySelectorAll('main .section').forEach(($section) => {
      expect($section.dataset.sectionStatus).to.equal('loaded');
    });

    // test section with block still loading
    const $section = document.querySelector('main .section');
    delete $section.dataset.sectionStatus;
    $section.querySelector(':scope .block').dataset.blockStatus = 'loading';
    blockUtils.updateSectionsStatus(document.querySelector('main'));
    expect($section.dataset.sectionStatus).to.equal('loading');
  });

  it('Reads block config', async () => {
    document.querySelector('main .section > div').innerHTML += await readFile({ path: './config.html' });
    const cfg = blockUtils.readBlockConfig(document.querySelector('main .config'));
    expect(cfg).to.deep.include({
      'prop-0': 'Plain text',
      'prop-1': 'Paragraph',
      'prop-2': ['First paragraph', 'Second paragraph'],
      'prop-3': 'https://www.adobe.com/',
      'prop-4': ['https://www.adobe.com/', 'https://www.hlx.live/'],
    });
  });
});
