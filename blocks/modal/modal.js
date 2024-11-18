/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

import { loadCSS, buildBlock } from '../../scripts/aem.js';

export default async function createModal(contentNodes) {
  await loadCSS('./blocks/modal/modal.css');
  const dialog = document.createElement('dialog');
  dialog.setAttribute('tabindex', 1);
  dialog.setAttribute('role', 'dialog');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.setAttribute('data-dismiss', 'modal');
  closeButton.type = 'button';
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener('click', () => dialog.close());
  dialog.append(closeButton);

  // close dialog on clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
  dialog.addEventListener('click', (event) => {
    if (event.pointerType !== 'mouse') return;

    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left
      || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top
      || event.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
  });

  block.append(dialog);

  return {
    block,
    removeModal: () => dialog.close(),
    showModal: () => {
      dialog.showModal();
      // Google Chrome restores the scroll position when the dialog is reopened,
      // so we need to reset it.
      setTimeout(() => {
        dialogContent.scrollTop = 0;
      }, 0);

      // Focus the first input when content is fully loaded using MutationObserver.
      const observer = new MutationObserver(() => {
        const firstInput = dialogContent.querySelector('input');
        if (firstInput) {
          firstInput.focus();
          observer.disconnect();
        }
      });

      observer.observe(dialogContent, { childList: true, subtree: true });

      document.body.classList.add('modal-open');
    },
  };
}
