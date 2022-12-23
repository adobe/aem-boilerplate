/* eslint-disable no-unused-expressions */
/* global describe before beforeEach it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

import { api, preLazy } from '../../../scripts/plugins/normalizer.js';

describe('Plugin: normalizer', () => {
  before(async () => {
    document.body.innerHTML = await readFile({ path: '../body.html' });
  });

  beforeEach(async () => {
  });

  describe('api', async () => {
    describe('normalizeHeadings', async () => {
      it('does nothing if there are no headings', async () => {
        const el = document.createElement('div');
        api.normalizeHeadings(el);
        expect(el.innerHTML).to.eql('');
      });

      it('limits the max headings', async () => {
        const el = document.createElement('div');
        el.innerHTML = `
          <h1 id="foo">Foo</h1>
          <h2 id="bar">Bar</h2>
          <h3 id="baz">Baz</h3>`;
        api.normalizeHeadings(el, ['h1', 'h2']);
        expect(el.innerHTML).to.equal(`
          <h1 id="foo">Foo</h1>
          <h2 id="bar">Bar</h2>
          <h2 id="baz">Baz</h2>`);
      });

      it('downgrades the headings', async () => {
        const el = document.createElement('div');
        el.innerHTML = `
          <h1 id="foo">Foo</h1>
          <h2 id="bar">Bar</h2>
          <h3 id="baz">Baz</h3>`;
        api.normalizeHeadings(el, ['h2', 'h3', 'h4']);
        expect(el.innerHTML).to.equal(`
          <h2 id="foo">Foo</h2>
          <h2 id="bar">Bar</h2>
          <h3 id="baz">Baz</h3>`);
      });

      it('normalizes the headings', async () => {
        const numHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
        api.normalizeHeadings(document.querySelector('main'), ['h1', 'h2', 'h3']);
        expect(document.querySelectorAll('h1, h2, h3, h4, h5, h6').length).to.equal(numHeadings);
        expect(document.querySelectorAll('h4, h5, h6').length).to.equal(0);
      });
    });
  });

  describe('preLazy', () => {
    it('normalizes the markup', () => {
      const el = document.createElement('div');
      el.appendChild(document.createTextNode('Foo'));
      el.appendChild(document.createTextNode(''));
      el.appendChild(document.createTextNode('Bar'));
      el.appendChild(document.createElement('div'));
      el.appendChild(document.createElement('p'));
      el.appendChild(document.createElement('span'));
      el.innerHTML += '<div class="baz"><div>';
      el.innerHTML += '<p title="qux"><p>';
      el.innerHTML += '<span data-corge="grault"><p>';
      preLazy(el);
      expect(el.innerHTML).to.eql('FooBar<div class="baz"></div><p title="qux"></p><span data-corge="grault"></span>');
    });
  });
});
