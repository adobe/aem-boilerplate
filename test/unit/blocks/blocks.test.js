/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global expect */
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import {
  decorateBlock,
  decorateMain,
  loadBlock,
} from '../../../scripts/scripts.js';

const ROOT_PATH = '/blocks-test';

const getFragment = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
};

const trim = (html) => html
  .replace(/^\s*/gm, '')
  .replace(/\s*$/gm, '')
  .replace(/\n/gm, '')
  .replace(/\/>\s*</gm, '/><');

const fragmentToString = (fragment) => {
  if (fragment.outerHTML) {
    return trim(fragment.outerHTML);
  }

  let html = '';
  fragment.children.forEach((c) => {
    html += c.outerHTML;
  });
  return trim(html);
};

describe('Block tests', () => {
  [
    {
      name: 'Example block',
      input: 'input/example.doc.html',
      expected: 'expected/example.block.html',
    },
  ].forEach((test) => {
    it(test.name, async () => {
      expect(test.input, 'Missing test "input" definition').to.exist;
      expect(test.expected, 'Missing test "expected" definition').to.exist;

      let res = await fetch(`${ROOT_PATH}/${test.input}`);
      expect(res.ok, `Missing test "input" file: ${test.input}`).to.be.true;

      let html = await res.text();
      const doc = getFragment(html);

      res = await fetch(`${ROOT_PATH}/${test.expected}`);
      expect(res.ok, `Missing test "expected" file: ${test.expected}`).to.be.true;

      html = await res.text();
      const expected = getFragment(html);
      decorateMain(doc.querySelector('main'));

      let block = doc.querySelector('main > div > div');
      if (block.classList.contains('section-wrapper')) {
        // input file contains section, look for block inside it
        block = block.querySelector(':scope > div > div');
      }

      decorateBlock(block);
      await loadBlock(block);

      expect(fragmentToString(block)).to.be.equal(fragmentToString(expected));
    });
  });
});
