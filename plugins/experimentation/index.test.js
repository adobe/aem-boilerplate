/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console, object-curly-newline */
import { assert, expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import sinon from 'sinon';
import {
  DEFAULT_OPTIONS,
  getConfig,
  getConfigForFullExperiment,
  getConfigForInstantExperiment,
  getExperimentName,
  isValidConfig,
  patchBlockConfig,
  preEager,
  postLazy,
  runExperiment,
} from './index';
import { ued } from './ued';

sinon.stub(ued, 'evaluateDecisionPolicy');

function toClassName(val) {
  return val.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const context = {
  getMetadata: sinon.stub().callsFake((val) => document.querySelector(`head>meta[name=${val}]`)?.content || ''),
  toClassName: sinon.stub().callsFake(toClassName),
  toCamelCase: sinon.stub().callsFake((val = '') => toClassName(val).replace(/-([a-z])/g, (g) => g[1].toUpperCase())),
  plugins: {
    rum: {
      sampleRUM: sinon.stub(),
    },
  },
};

describe('Experimentation Plugin', () => {
  describe('#DEFAULT_OPTIONS', () => {
    it('set default options for the plugin', () => {
      expect(DEFAULT_OPTIONS).to.eql({
        root: '/experiments',
        configFile: 'manifest.json',
        metaTag: 'experiment',
        queryParameter: 'experiment',
      });
    });
  });

  describe('#getExperimentName', () => {
    it('returns the experiment name if there is one', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.experiment.html' });
      expect(getExperimentName.call(context, 'experiment')).to.eql('foo');
    });

    it('returns null if there is no experiment', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.html' });
      expect(getExperimentName.call(context, 'experiment')).to.eql(null);
    });

    it('returns null if client is a bot', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.experiment.html' });
      const ua = window.navigator.userAgent;
      Object.defineProperty(window.navigator, 'userAgent', { value: 'bot', configurable: true });
      expect(getExperimentName.call(context, 'experiment')).to.eql(null);
      Object.defineProperty(window.navigator, 'userAgent', { value: 'crawl', configurable: true });
      expect(getExperimentName.call(context, 'experiment')).to.eql(null);
      Object.defineProperty(window.navigator, 'userAgent', { value: 'spider', configurable: true });
      expect(getExperimentName.call(context, 'experiment')).to.eql(null);
      Object.defineProperty(window.navigator, 'userAgent', { value: ua, configurable: true });
    });
  });

  describe('#getConfigForFullExperiment', () => {
    let fetch;

    beforeEach(() => {
      fetch = sinon.stub(window, 'fetch');
    });

    afterEach(() => {
      fetch.restore();
    });

    it('returns null if the fetching the config failed', async () => {
      fetch.callsFake(() => Promise.resolve({ ok: false }));
      expect(await getConfigForFullExperiment.call(context, 'foo', DEFAULT_OPTIONS)).to.eql(null);
    });

    it('returns null if the response is not valid json', async () => {
      fetch.callsFake(() => Promise.resolve({ ok: true, json: () => Promise.reject() }));
      expect(await getConfigForFullExperiment.call(context, 'foo', DEFAULT_OPTIONS)).to.eql(null);
    });

    it('returns null if parsing the config failed', async () => {
      fetch.callsFake(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
      expect(await getConfigForFullExperiment.call(context, 'foo', DEFAULT_OPTIONS)).to.eql(null);
    });

    it('returns the config if it was available', async () => {
      const config = await readFile({ path: './tests/experiment.manifest.mobile.active.json' });
      fetch.callsFake(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(JSON.parse(config)),
      }));
      expect(await getConfigForFullExperiment.call(context, 'foo', DEFAULT_OPTIONS)).to.eql({
        audience: 'Mobile',
        basePath: '/experiments/foo',
        experimentName: 'CCX 0074 Table of Contents',
        id: 'foo',
        manifest: '/experiments/foo/manifest.json',
        status: 'Active',
        variantNames: ['control', 'challenger-1', 'challenger-2'],
        variants: {
          'challenger-1': {
            blocks: ['blocks/toc1'],
            label: 'Downward arrow ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch1',
              '/express/experiments/ccx0074/flyer-create-ch1',
            ],
            percentageSplit: '0.33',
          },
          'challenger-2': {
            blocks: ['blocks/toc2'],
            label: 'Dynamic pill ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch2',
              '/express/experiments/ccx0074/flyer-create-ch2',
            ],
            percentageSplit: '0.33',
          },
          control: {
            blocks: ['toc'],
            label: 'Control',
            pages: [
              '/express/experiments/ccx0074/test',
              '/express/create/flyer',
            ],
            percentageSplit: '',
          },
        },
      });
    });
  });

  describe('#getConfigForInstantExperiment', () => {
    it('returns the config for the specified single instant experiment', () => {
      expect(getConfigForInstantExperiment('foo', 'https://bar.baz/qux')).to.eql({
        label: 'Instant Experiment: foo',
        audience: '',
        status: 'Active',
        id: 'foo',
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: {
            percentageSplit: '',
            pages: [window.location.pathname],
            blocks: [],
            label: 'Control',
          },
          'challenger-1': {
            percentageSplit: '0.50',
            pages: ['/qux'],
            label: 'Challenger 1',
          },
        },
      });
    });

    it('returns the config for the specified multi-page instant experiment', () => {
      expect(getConfigForInstantExperiment('foo', 'https://bar.baz/qux, https://corge.grault/waldo')).to.eql({
        label: 'Instant Experiment: foo',
        audience: '',
        status: 'Active',
        id: 'foo',
        variantNames: ['control', 'challenger-1', 'challenger-2'],
        variants: {
          control: {
            percentageSplit: '',
            pages: [window.location.pathname],
            blocks: [],
            label: 'Control',
          },
          'challenger-1': {
            percentageSplit: '0.33',
            pages: ['/qux'],
            label: 'Challenger 1',
          },
          'challenger-2': {
            percentageSplit: '0.33',
            pages: ['/waldo'],
            label: 'Challenger 2',
          },
        },
      });
    });
  });

  describe('#patchBlockConfig', () => {
    beforeEach(() => {
      window.hlx = { codeBasePath: '' };
    });

    it('returns the unchanged config if there is no experiment', () => {
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current experiment is not running', () => {
      window.hlx.experiment = { run: false };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current experiment is the control group', () => {
      window.hlx.experiment = { run: true, selectedVariant: 'control', variantNames: ['control'] };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current experiment does not modify blocks', () => {
      window.hlx.experiment = { run: true, selectedVariant: 'challenger-1', variantNames: ['control', 'challenger-1'] };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current experiment does not modify this block', () => {
      window.hlx.experiment = { run: true, selectedVariant: 'challenger-1', variantNames: ['control', 'challenger-1'], blocks: ['bar'] };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current experiment does not modify this block', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: { 'challenger-1': { blocks: [] } },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current variant does not modify this block', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['bar'] },
          'challenger-1': { blocks: ['bar'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current variant does not modify the experiment\'s block', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['bar'] },
          'challenger-1': { blocks: ['bar'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the unchanged config if the current variant does not modify a valid block', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['bar', 'foo'] },
          'challenger-1': { blocks: ['baz'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({ blockName: 'foo' });
    });

    it('returns the config for the targeted relative block', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['foo'] },
          'challenger-1': { blocks: ['bar'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({
        blockName: 'foo',
        cssPath: 'bar/foo.css',
        jsPath: 'bar/foo.js',
      });
    });

    it('returns the config for the targeted absolute block on the same origin', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['foo'] },
          'challenger-1': { blocks: [`${window.location.origin}/experiments/foo/blocks/bar`] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({
        blockName: 'foo',
        cssPath: '/experiments/foo/blocks/bar/foo.css',
        jsPath: '/experiments/foo/blocks/bar/foo.js',
      });
    });

    it('returns the config for the targeted absolute block on a different origin', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['foo'] },
          'challenger-1': { blocks: ['https://bar.hlx.live/blocks/foo'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({
        blockName: 'foo',
        cssPath: 'https://bar.hlx.live/blocks/foo/foo.css',
        jsPath: 'https://bar.hlx.live/blocks/foo/foo.js',
      });
    });

    it('returns the config for the targeted block on a different origin', () => {
      window.hlx.experiment = {
        run: true,
        selectedVariant: 'challenger-1',
        blocks: ['foo'],
        variantNames: ['control', 'challenger-1'],
        variants: {
          control: { blocks: ['foo'] },
          'challenger-1': { blocks: ['https://bar.hlx.live'] },
        },
      };
      expect(patchBlockConfig({ blockName: 'foo' })).to.eql({
        blockName: 'foo',
        cssPath: 'https://bar.hlx.live/blocks/foo/foo.css',
        jsPath: 'https://bar.hlx.live/blocks/foo/foo.js',
      });
    });
  });

  describe('#getConfig', () => {
    let fetch;
    let manifest;

    beforeEach(async () => {
      manifest = JSON.parse(await readFile({ path: './tests/experiment.manifest.desktop.active.json' }));
      fetch = sinon.stub(window, 'fetch').callsFake(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(manifest),
      }));
    });

    afterEach(() => {
      fetch.restore();
    });

    it('returns null if there is no valid experiment config', async () => {
      fetch.callsFake(() => Promise.resolve({ ok: false }));
      expect(await getConfig.call(context, 'foo', null, DEFAULT_OPTIONS)).to.eq(null);
    });

    it('returns null if the experiment is not active', async () => {
      manifest = JSON.parse(await readFile({ path: './tests/experiment.manifest.inactive.json' }));
      expect(await getConfig.call(context, 'foo', null, DEFAULT_OPTIONS)).to.eq(null);
    });

    it('returns null if the target audience is not valid', async () => {
      manifest = JSON.parse(await readFile({ path: './tests/experiment.manifest.mobile.active.json' }));
      expect(await getConfig.call(context, 'foo', null, DEFAULT_OPTIONS)).to.eq(null);
    });

    it('returns the experiment config with the selected variant from UED engine', async () => {
      ued.evaluateDecisionPolicy.callsFake(() => ({ items: [{ id: 'challenger-1' }] }));
      expect(await getConfig.call(context, 'foo', null, DEFAULT_OPTIONS)).to.eql({
        audience: 'Desktop',
        basePath: '/experiments/foo',
        experimentName: 'CCX 0074 Table of Contents',
        id: 'foo',
        manifest: '/experiments/foo/manifest.json',
        run: true,
        selectedVariant: 'challenger-1',
        status: 'Active',
        variantNames: ['control', 'challenger-1', 'challenger-2'],
        variants: {
          'challenger-1': {
            blocks: ['blocks/toc1'],
            label: 'Downward arrow ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch1',
              '/express/experiments/ccx0074/flyer-create-ch1',
            ],
            percentageSplit: '0.33',
          },
          'challenger-2': {
            blocks: ['blocks/toc2'],
            label: 'Dynamic pill ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch2',
              '/express/experiments/ccx0074/flyer-create-ch2',
            ],
            percentageSplit: '0.33',
          },
          control: {
            blocks: ['toc'],
            label: 'Control',
            pages: [
              '/express/experiments/ccx0074/test',
              '/express/create/flyer',
            ],
            percentageSplit: '',
          },
        },
      });
    });

    it('returns the experiment config for instant experiments', async () => {
      ued.evaluateDecisionPolicy.callsFake(() => ({ items: [{ id: 'challenger-1' }] }));
      expect(await getConfig.call(context, 'foo', 'https://foo.bar/express/experiments/ccx0074/flyer-ch1,https://foo.bar/express/experiments/ccx0074/flyer-ch2', DEFAULT_OPTIONS)).to.eql({
        id: 'foo',
        label: 'Instant Experiment: foo',
        run: true,
        audience: '',
        selectedVariant: 'challenger-1',
        status: 'Active',
        variantNames: ['control', 'challenger-1', 'challenger-2'],
        variants: {
          'challenger-1': {
            label: 'Challenger 1',
            pages: ['/express/experiments/ccx0074/flyer-ch1'],
            percentageSplit: '0.33',
          },
          'challenger-2': {
            label: 'Challenger 2',
            pages: ['/express/experiments/ccx0074/flyer-ch2'],
            percentageSplit: '0.33',
          },
          control: {
            blocks: [],
            label: 'Control',
            pages: ['/'],
            percentageSplit: '',
          },
        },
      });
    });

    it('returns the experiment config with the forced variant if specified', async () => {
      const url = new URL(window.location.href);
      url.searchParams.append('experiment', 'foo/challenger-1');
      window.history.replaceState(null, '', url.href);

      expect(await getConfig.call(context, 'foo', null, DEFAULT_OPTIONS)).to.eql({
        audience: 'Desktop',
        basePath: '/experiments/foo',
        experimentName: 'CCX 0074 Table of Contents',
        id: 'foo',
        manifest: '/experiments/foo/manifest.json',
        run: true,
        selectedVariant: 'challenger-1',
        status: 'Active',
        variantNames: ['control', 'challenger-1', 'challenger-2'],
        variants: {
          'challenger-1': {
            blocks: ['blocks/toc1'],
            label: 'Downward arrow ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch1',
              '/express/experiments/ccx0074/flyer-create-ch1',
            ],
            percentageSplit: '0.33',
          },
          'challenger-2': {
            blocks: ['blocks/toc2'],
            label: 'Dynamic pill ToC',
            pages: [
              '/express/experiments/ccx0074/flyer-ch2',
              '/express/experiments/ccx0074/flyer-create-ch2',
            ],
            percentageSplit: '0.33',
          },
          control: {
            blocks: ['toc'],
            label: 'Control',
            pages: [
              '/express/experiments/ccx0074/test',
              '/express/create/flyer',
            ],
            percentageSplit: '',
          },
        },
      });

      url.searchParams.delete('experiment');
      window.history.replaceState(null, '', url.href);
    });
  });

  describe('#isValidConfig', () => {
    it('returns false if the config has no variants defined', async () => {
      expect(isValidConfig({})).to.eql(false);
    });

    it('returns false if the variants list is empty', async () => {
      expect(isValidConfig({ variantNames: [], variants: {} })).to.eql(false);
    });

    it('returns false if the variants don\'t have the required properties', async () => {
      expect(isValidConfig({ variantNames: ['control'], variants: { control: {} } })).to.eql(false);
    });

    it('returns true if config is properly formatted', async () => {
      expect(isValidConfig({
        variantNames: ['control', 'variant'],
        variants: {
          control: { blocks: [], pages: ['https://foo.bar/baz'], percentageSplit: '' },
          variant: { blocks: [], pages: ['https://foo.bar/qux'], percentageSplit: '0.50' },
        } })).to.eql(true);
    });
  });

  describe('runExperiment', () => {
    afterEach(() => {
      document.body.className = '';
    });

    it('returns false if the selected variant is the control group', async () => {
      expect(await runExperiment.call(context, {
        selectedVariant: 'foo',
        variantNames: ['foo', 'bar'],
      })).to.eq(false);
    });

    it('returns false if the selected variant has not pages targeted', async () => {
      expect(await runExperiment.call(context, {
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/baz'] },
          bar: { pages: [] },
        },
      })).to.eq(false);
    });

    it('returns false if the current path is not a targeted page', async () => {
      expect(await runExperiment.call(context, {
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/baz'] },
          bar: { pages: ['/qux'] },
        },
      })).to.eq(false);
    });

    it('returns false if the targeted path is the same as the current path', async () => {
      expect(await runExperiment.call(context, {
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/'] },
          bar: { pages: ['/'] },
        },
      })).to.eq(false);
    });

    it('returns false if the fetching the variant failed', async () => {
      const fetch = sinon.stub(window, 'fetch');
      fetch.callsFake(() => Promise.resolve({ ok: false }));
      expect(await runExperiment.call(context, {
        id: 'foo',
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/'] },
          bar: { pages: ['/bar'] },
        },
      })).to.eq(false);
      expect(document.body.classList.contains('experiment-foo')).to.eq(true);
      expect(document.body.classList.contains('variant-foo')).to.eq(true);
      assert(context.plugins.rum.sampleRUM.calledWith('experiment', {
        source: 'foo',
        target: 'foo',
      }));
      fetch.restore();
    });

    it('returns false if the fetching the variant threw an exception', async () => {
      const fetch = sinon.stub(window, 'fetch');
      fetch.callsFake(() => { throw Error('baz'); });
      expect(await runExperiment.call(context, {
        id: 'foo',
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/'] },
          bar: { pages: ['/bar'] },
        },
      })).to.eq(false);
      expect(document.body.classList.contains('experiment-foo')).to.eq(true);
      expect(document.body.classList.contains('variant-foo')).to.eq(true);
      assert(context.plugins.rum.sampleRUM.calledWith('experiment', {
        source: 'foo',
        target: 'foo',
      }));
      fetch.restore();
    });

    it('returns true if the variant was retrieved successfully', async () => {
      const main = document.createElement('main');
      document.body.append(main);
      const fetch = sinon.stub(window, 'fetch');
      fetch.callsFake(() => Promise.resolve({ ok: true, text: () => Promise.resolve('BAZ') }));
      expect(await runExperiment.call(context, {
        id: 'foo',
        selectedVariant: 'bar',
        variantNames: ['foo', 'bar'],
        variants: {
          foo: { pages: ['/'] },
          bar: { pages: ['/bar'] },
        },
      })).to.eq(true);
      expect(main.innerHTML).to.eql('BAZ');
      expect(document.body.classList.contains('experiment-foo')).to.eq(true);
      expect(document.body.classList.contains('variant-bar')).to.eq(true);
      assert(context.plugins.rum.sampleRUM.calledWith('experiment', {
        source: 'foo',
        target: 'bar',
      }));
      fetch.restore();
    });
  });

  describe('#preEager', () => {
    let fetch;

    beforeEach(() => {
      fetch = sinon.stub(window, 'fetch');
      fetch.callsFake(() => Promise.resolve({ ok: false }));
    });

    afterEach(() => {
      fetch.restore();
    });

    it('does nothing if there is no experiment', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.html' });
      await preEager.call(context);
      assert(!fetch.called);
    });

    it('does nothing if the experiment config cannot be retrieved', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.experiment.html' });
      await preEager.call(context);
      assert(fetch.called);
      expect(document.body.classList.contains('experiment-foo')).to.eql(false);
    });

    it('adds the experiment classes to the body', async () => {
      document.head.innerHTML = await readFile({ path: './tests/head.experiment.html' });
      const manifest = JSON.parse(await readFile({ path: './tests/experiment.manifest.desktop.active.json' }));
      const url = new URL(window.location.href);
      url.pathname = '/express/experiments/ccx0074/test';
      window.history.replaceState(null, '', url.href);

      fetch
        .onCall(0).returns(Promise.resolve({ ok: true, json: () => Promise.resolve(manifest) }))
        .onCall(1).returns(Promise.resolve({ ok: true, text: () => 'BAZ' }));
      await preEager.call(context);
      expect(document.body.classList.contains('experiment-foo')).to.eql(true);
      expect(document.body.classList.contains('variant-challenger-1')).to.eql(true);
    });
  });

  describe('#postLazy', () => {

  });
});
