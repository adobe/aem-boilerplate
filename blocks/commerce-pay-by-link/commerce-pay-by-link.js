/* eslint-disable import/no-unresolved */

import { Button, provider as UI } from '@dropins/tools/components.js';

import { fetchPlaceholders, rootLink, SUPPORT_PATH } from '../../scripts/commerce.js';

// token is varchar(64) secure random hash. Strict lowercase hex.
export const TOKEN_REGEX = /^[a-f0-9]{64}$/;

export function extractToken(search) {
  const raw = new URLSearchParams(search).get('token');
  if (raw === null) return { status: 'missing' };
  const token = raw.trim();
  if (token === '') return { status: 'missing' };
  if (!TOKEN_REGEX.test(token)) return { status: 'malformed' };
  return { status: 'valid', token };
}

function renderError(block, kind, labels) {
  const ns = labels?.PayByLink || {};
  const isMissing = kind === 'missing';
  const title = isMissing ? ns.ErrorMissingTokenTitle : ns.ErrorMalformedTokenTitle;
  const body = isMissing ? ns.ErrorMissingTokenBody : ns.ErrorMalformedTokenBody;

  block.innerHTML = `
    <div class="pay-by-link pay-by-link--error">
      <div class="pay-by-link__error-card" role="alert" aria-live="assertive">
        <h1 class="pay-by-link__error-title" tabindex="-1"></h1>
        <p class="pay-by-link__error-body"></p>
        <div class="pay-by-link__error-cta"></div>
      </div>
    </div>
  `;

  block.querySelector('.pay-by-link__error-title').textContent = title || '';
  block.querySelector('.pay-by-link__error-body').textContent = body || '';

  UI.render(Button, {
    children: ns.ErrorContactSupportLabel || '',
    variant: 'primary',
    size: 'medium',
    href: rootLink(SUPPORT_PATH),
    'data-testid': 'pay-by-link-error-cta',
  })(block.querySelector('.pay-by-link__error-cta'));

  block.querySelector('.pay-by-link__error-title').focus();
}

function renderShell(block) {
  block.innerHTML = `
    <div class="pay-by-link">
      <div class="pay-by-link__main">
        <div class="pay-by-link__order-header"></div>
        <div class="pay-by-link__order-summary"></div>
        <div class="pay-by-link__addresses"></div>
      </div>
      <aside class="pay-by-link__aside">
        <div class="pay-by-link__order-totals"></div>
        <div class="pay-by-link__payment"></div>
        <div class="pay-by-link__footer"></div>
      </aside>
    </div>
  `;
}

export default async function decorate(block) {
  const result = extractToken(window.location.search);

  if (result.status === 'valid') {
    renderShell(block);
    return;
  }

  const labels = await fetchPlaceholders();
  renderError(block, result.status, labels);
}
