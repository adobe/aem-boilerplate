/* eslint-disable no-unused-expressions */
/* global describe before beforeEach it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

let blockUtils;
let rum;

document.body.innerHTML = await readFile({ path: '../dummy.html' });
document.head.innerHTML = await readFile({ path: '../head.html' });

describe('Utils methods', () => {
  before(async () => {
    blockUtils = await import('../../../scripts/lib-franklin.js');
    rum = blockUtils.RumPlugin().api;
    document.body.innerHTML = await readFile({ path: '../body.html' });
  });

  beforeEach(async () => {
    await blockUtils.init({ delayedDuration: 10 });
  });

  it('Collects RUM data', async () => {
    const sendBeacon = sinon.stub(navigator, 'sendBeacon');
    // turn on RUM
    window.history.pushState({}, '', `${window.location.href}&rum=on`);
    delete window.hlx;

    // sends checkpoint beacon
    await rum.sampleRUM('test', { foo: 'bar' });
    expect(sendBeacon.called).to.be.true;
    sendBeacon.resetHistory();

    // sends cwv beacon
    await rum.sampleRUM('cwv', { foo: 'bar' });
    expect(sendBeacon.called).to.be.true;

    // test error handling
    sendBeacon.throws();
    await rum.sampleRUM('error', { foo: 'bar' });

    sendBeacon.restore();
  });

  // it('Reports errors as RUM metrics', async () => {
  //   const sendBeacon = sinon.stub(navigator, 'sendBeacon');
  //   window.history.pushState({}, '', `${window.location.href}&rum=on`);
  //   window.dispatchEvent('error', );
  // });
});
