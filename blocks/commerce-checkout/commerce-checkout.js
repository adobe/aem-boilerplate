import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const config = readBlockConfig(block);

  const content = document.createRange().createContextualFragment(`<div>
    Commerce Checkout drop-in
    <pre>${JSON.stringify(config, null, 2)}</pre>
  </div>`);

  block.textContent = '';
  block.append(content);
}
