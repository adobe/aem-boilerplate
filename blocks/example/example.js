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
/* global window */

import {
  createTag,
} from '../../scripts/scripts.js';

export default function decorate($block) {
  // turn links into buttons
  $block.querySelectorAll(':scope a').forEach(($a) => {
    const $button = createTag('button', {
      title: $a.title || $a.textContent,
    });
    $button.textContent = $a.textContent;
    $button.addEventListener('click', () => {
      window.location.href = $a.href;
    });
    $a.replaceWith($button);
  });
}
