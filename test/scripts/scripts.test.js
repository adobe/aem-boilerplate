/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

let blockUtils;
let scripts;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Core Helix features', () => {
  before(async () => {
    blockUtils = await import('../../scripts/block-utils.js');
    scripts = await import('../../scripts/scripts.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Initializes window.hlx', async () => {
    // simulate code base path and turn on lighthouse
    /* needs fixing
    document.head.appendChild(document.createElement('script')).src = '/foo/scripts/scripts.js';
    window.history.pushState({}, '', `${window.location.href}&lighthouse=on`);

    expect(window.hlx.codeBasePath).to.equal('/foo');
    expect(window.hlx.lighthouse).to.equal(true);

    // test error handling
    const url = sinon.stub(window, 'URL');

    // cleanup
    url.restore();
    window.hlx.codeBasePath = '';
    window.hlx.lighthouse = false;
    Array.from(document.querySelectorAll('script')).pop().remove();
    */
  });

  it('Sanitizes class name', async () => {
    expect(blockUtils.toClassName('Hello world')).to.equal('hello-world');
    expect(blockUtils.toClassName(null)).to.equal('');
  });

  it('Extracts metadata', async () => {
    expect(blockUtils.getMetadata('description')).to.equal('Lorem ipsum dolor sit amet.');
    expect(blockUtils.getMetadata('og:title')).to.equal('Foo');
  });

  it('Adds favicon', async () => {
    scripts.addFavIcon('/foo.svg');
    const $favIcon = document.querySelector('link[rel="icon"]');
    expect($favIcon.getAttribute('href')).to.equal('/foo.svg');
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

  it('Collects RUM data', async () => {
    const sendBeacon = sinon.stub(navigator, 'sendBeacon');
    // turn on RUM
    window.history.pushState({}, '', `${window.location.href}&rum=on`);
    delete window.hlx;

    // sends checkpoint beacon
    await blockUtils.sampleRUM('test', { foo: 'bar' });
    expect(sendBeacon.called).to.be.true;
    sendBeacon.resetHistory();

    // sends cwv beacon
    await blockUtils.sampleRUM('cwv', { foo: 'bar' });
    expect(sendBeacon.called).to.be.true;

    // test error handling
    sendBeacon.throws();
    await blockUtils.sampleRUM('error', { foo: 'bar' });

    sendBeacon.restore();
  });

  it('Adds publish dependencies', async () => {
    // adds single dependency
    blockUtils.addPublishDependencies('/foo');
    expect(window.hlx.dependencies).to.include('/foo');

    // adds multiple dependencies
    blockUtils.addPublishDependencies(['/bar', '/baz']);
    expect(window.hlx.dependencies).to.deep.equal(['/foo', '/bar', '/baz']);
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
  it('Decorates sections', async () => {
    blockUtils.decorateSections(document.querySelector('main'));
    expect(document.querySelectorAll('main .section').length).to.equal(2);
  });

  it('Decorates blocks', async () => {
    blockUtils.decorateBlocks(document.querySelector('main'));
    expect(document.querySelectorAll('main .block').length).to.equal(1);
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
