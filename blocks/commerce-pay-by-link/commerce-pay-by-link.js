/* eslint-disable import/no-unresolved */

import { Button, provider as UI } from '@dropins/tools/components.js';
import {
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
  rootLink,
  SUPPORT_PATH,
} from '../../scripts/commerce.js';

// Token is varchar(64) secure random hash. Strict lowercase hex.
export const TOKEN_REGEX = /^[a-f0-9]{64}$/;

const QUERY = `
  query PAY_BY_LINK_ORDER($token: String!) {
    payByLinkOrder(token: $token) {
      customer_email
      expires_at
      items {
        name
        sku
        quantity
        price { value currency }
      }
      totals {
        subtotal { value currency }
        tax { value currency }
        shipping { value currency }
        grand_total { value currency }
      }
      shipping_address {
        firstname lastname street city region region_code country_code postcode telephone
      }
      billing_address {
        firstname lastname street city region region_code country_code postcode telephone
      }
    }
  }
`;

// Maps backend error extension codes to i18n kinds.
const ERROR_CODE_MAP = {
  TOKEN_NOT_FOUND: 'not-found',
  TOKEN_EXPIRED: 'expired',
  ORDER_ALREADY_PAID: 'already-paid',
  ORDER_CANCELLED: 'cancelled',
};

// Override slots.Payment to mount a gateway payment SDK.
// ctx.order = full payByLinkOrder payload; ctx.token = the raw token string.
// ctx.replaceWith(el) replaces the empty payment container with your element.
export const slots = {
  Payment: () => {},
};

export function extractToken(search) {
  const raw = new URLSearchParams(search).get('token');
  if (raw === null) return { status: 'missing' };
  const token = raw.trim();
  if (token === '') return { status: 'missing' };
  if (!TOKEN_REGEX.test(token)) return { status: 'malformed' };
  return { status: 'valid', token };
}

function formatMoney({ value, currency }) {
  return new Intl.NumberFormat(document.documentElement.lang || 'en', {
    style: 'currency',
    currency,
  }).format(value);
}

function renderError(block, kind, labels) {
  const ns = labels?.PayByLink || {};
  const errorLabels = {
    missing: { title: ns.ErrorMissingTokenTitle, body: ns.ErrorMissingTokenBody },
    malformed: { title: ns.ErrorMalformedTokenTitle, body: ns.ErrorMalformedTokenBody },
    'not-found': { title: ns.ErrorNotFoundTitle, body: ns.ErrorNotFoundBody },
    expired: { title: ns.ErrorExpiredTitle, body: ns.ErrorExpiredBody },
    'already-paid': { title: ns.ErrorAlreadyPaidTitle, body: ns.ErrorAlreadyPaidBody },
    cancelled: { title: ns.ErrorCancelledTitle, body: ns.ErrorCancelledBody },
  };

  const { title = '', body = '' } = errorLabels[kind] || errorLabels['not-found'];

  block.innerHTML = `
    <div class="pay-by-link pay-by-link--error">
      <div class="pay-by-link__error-card" role="alert" aria-live="assertive">
        <h1 class="pay-by-link__error-title" tabindex="-1"></h1>
        <p class="pay-by-link__error-body"></p>
        <div class="pay-by-link__error-cta"></div>
      </div>
    </div>
  `;

  block.querySelector('.pay-by-link__error-title').textContent = title;
  block.querySelector('.pay-by-link__error-body').textContent = body;

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

function setSkeleton(block, on) {
  block.querySelectorAll(
    '.pay-by-link__order-header, .pay-by-link__order-summary, .pay-by-link__addresses, .pay-by-link__order-totals',
  ).forEach((slot) => {
    slot.classList.toggle('pay-by-link__skeleton', on);
    slot.setAttribute('aria-busy', String(on));
  });
}

function buildSection(headingId, headingText) {
  const section = document.createElement('section');
  section.setAttribute('aria-labelledby', headingId);
  const h2 = document.createElement('h2');
  h2.id = headingId;
  h2.className = 'pay-by-link__section-heading';
  h2.textContent = headingText;
  section.append(h2);
  return section;
}

function buildAddress(addr) {
  const el = document.createElement('address');
  el.className = 'pay-by-link__address';

  const name = document.createElement('span');
  name.className = 'pay-by-link__address-name';
  name.textContent = `${addr.firstname} ${addr.lastname}`;
  el.append(name);

  (addr.street || []).forEach((line) => {
    const span = document.createElement('span');
    span.className = 'pay-by-link__address-street';
    span.textContent = line;
    el.append(span);
  });

  const cityLine = document.createElement('span');
  cityLine.className = 'pay-by-link__address-city';
  const region = addr.region || addr.region_code || '';
  cityLine.textContent = [addr.city, region, addr.postcode].filter(Boolean).join(', ');
  el.append(cityLine);

  const country = document.createElement('span');
  country.className = 'pay-by-link__address-country';
  country.textContent = addr.country_code;
  el.append(country);

  if (addr.telephone) {
    const phone = document.createElement('span');
    phone.className = 'pay-by-link__address-phone';
    phone.textContent = addr.telephone;
    el.append(phone);
  }

  return el;
}

function populateSlots(block, data, ns) {
  // Customer email
  const header = block.querySelector('.pay-by-link__order-header');
  const emailPara = document.createElement('p');
  emailPara.className = 'pay-by-link__customer-email';
  const emailLabel = document.createElement('span');
  emailLabel.className = 'pay-by-link__customer-email-label';
  emailLabel.textContent = ns.CustomerEmailLabel || '';
  const emailLink = document.createElement('a');
  emailLink.className = 'pay-by-link__customer-email-value';
  emailLink.href = `mailto:${data.customer_email}`;
  emailLink.textContent = data.customer_email;
  emailPara.append(emailLabel, ' ', emailLink);
  header.append(emailPara);

  // Line items
  const summary = block.querySelector('.pay-by-link__order-summary');
  const itemsSection = buildSection('pay-by-link-items-heading', ns.OrderItemsHeading || '');
  const table = document.createElement('table');
  table.className = 'pay-by-link__items';
  const tbody = document.createElement('tbody');
  data.items.forEach(({
    name, sku, quantity, price,
  }) => {
    const tr = document.createElement('tr');
    tr.className = 'pay-by-link__item';

    const tdName = document.createElement('td');
    tdName.className = 'pay-by-link__item-name';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    const skuSpan = document.createElement('span');
    skuSpan.className = 'pay-by-link__item-sku';
    skuSpan.textContent = sku;
    tdName.append(nameSpan, skuSpan);

    const tdQty = document.createElement('td');
    tdQty.className = 'pay-by-link__item-qty';
    tdQty.textContent = `${ns.QtyLabel || 'Qty'}: ${quantity}`;

    const tdPrice = document.createElement('td');
    tdPrice.className = 'pay-by-link__item-price';
    tdPrice.textContent = formatMoney(price);

    tr.append(tdName, tdQty, tdPrice);
    tbody.append(tr);
  });
  table.append(tbody);
  itemsSection.append(table);
  summary.append(itemsSection);

  // Addresses
  const addresses = block.querySelector('.pay-by-link__addresses');
  if (data.shipping_address) {
    const section = buildSection('pay-by-link-shipping-heading', ns.ShippingAddressHeading || '');
    section.append(buildAddress(data.shipping_address));
    addresses.append(section);
  }
  if (data.billing_address) {
    const section = buildSection('pay-by-link-billing-heading', ns.BillingAddressHeading || '');
    section.append(buildAddress(data.billing_address));
    addresses.append(section);
  }

  // Totals
  const totalsSlot = block.querySelector('.pay-by-link__order-totals');
  const totalsSection = buildSection('pay-by-link-totals-heading', ns.OrderTotalsHeading || '');
  const dl = document.createElement('dl');
  dl.className = 'pay-by-link__totals';
  [
    [ns.SubtotalLabel, data.totals.subtotal],
    [ns.TaxLabel, data.totals.tax],
    [ns.ShippingLabel, data.totals.shipping],
    [ns.GrandTotalLabel, data.totals.grand_total, true],
  ].forEach(([rowLabel, money, grand = false]) => {
    const div = document.createElement('div');
    div.className = `pay-by-link__totals-row${grand ? ' pay-by-link__totals-row--grand' : ''}`;
    const dt = document.createElement('dt');
    dt.textContent = rowLabel || '';
    const dd = document.createElement('dd');
    dd.textContent = formatMoney(money);
    div.append(dt, dd);
    dl.append(div);
  });
  totalsSection.append(dl);
  totalsSlot.append(totalsSection);
}

function createCtx(element, order, token) {
  return {
    order,
    token,
    replaceWith(el) { element.replaceChildren(el); },
    appendChild(el) { element.append(el); },
    prependChild(el) { element.prepend(el); },
  };
}

async function invokeSlots(block, order, token) {
  const el = block.querySelector('.pay-by-link__payment');
  if (el) await slots.Payment(createCtx(el, order, token));
}

export default async function decorate(block) {
  const result = extractToken(window.location.search);

  if (result.status !== 'valid') {
    const labels = await fetchPlaceholders();
    renderError(block, result.status, labels);
    return;
  }

  renderShell(block);
  setSkeleton(block, true);

  const [labels, response] = await Promise.all([
    fetchPlaceholders(),
    CORE_FETCH_GRAPHQL.fetchGraphQl(QUERY, { variables: { token: result.token } }),
  ]);

  setSkeleton(block, false);

  if (response.errors?.length || !response.data?.payByLinkOrder) {
    const code = response.errors?.[0]?.extensions?.code;
    renderError(block, ERROR_CODE_MAP[code] || 'not-found', labels);
    return;
  }

  const order = response.data.payByLinkOrder;
  populateSlots(block, order, labels?.PayByLink || {});
  await invokeSlots(block, order, result.token);
}
