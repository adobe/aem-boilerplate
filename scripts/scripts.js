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

/* eslint-disable no-console, import/no-cycle, no-bitwise */

import { HelixApp, buildBlock } from './helix-web-library.esm.js';

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

HelixApp.init({
  rumEnabled: true,
  rumGeneration: 'project-1',
  lcpBlocks: ['hero'],
})
  .withBuildAutoBlocks((main) => {
    try {
      buildHeroBlock(main);
    } catch (error) {
      console.error('Auto Blocking failed', error);
    }
  })
  .withLoadDelayed(() => {
    window.setTimeout(() => import('./delayed.js'), 3000);
  })
  .decorate();
