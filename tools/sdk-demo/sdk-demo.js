/*
 * SDK Demo — a teaching reference for the DA App SDK.
 *
 * Runs as a library plugin inside the DA document editor and demonstrates
 * actions.sendText, actions.sendHTML and actions.getSelection. Every call
 * and result is written to the on-page log.
 */
// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

const CONNECT_TIMEOUT_MS = 3000;
const SELECTION_TIMEOUT_MS = 3000;
const SELECTION_TIMEOUT_MESSAGE = 'No response — selection is probably empty (DA reports this on a channel the SDK doesn\'t listen to), or another message consumed the listener.';

let lastSelection = null;

const LOG_PREFIX = {
  out: '→',
  in: '←',
  warn: '⚠',
  error: '✕',
};

function $(id) {
  return document.getElementById(id);
}

function setStatus(text) {
  $('status').textContent = text;
}

function log(kind, message) {
  const time = new Date().toTimeString().slice(0, 8);
  const li = document.createElement('li');
  li.className = `log-${kind}`;
  li.textContent = `${time} ${LOG_PREFIX[kind]} ${message}`;
  const list = $('log');
  list.append(li);
  // Scroll the log box itself so the panel doesn't jump away from the clicked button.
  list.scrollTop = list.scrollHeight;
}

function truncate(value, max = 80) {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

// sendText: the editor inserts `text` as a plain text node, so markup characters
// appear literally. It replaces the current selection, or inserts at the cursor.
function demoSendText(actions, text) {
  actions.sendText(text);
  log('out', `sendText("${truncate(text)}")`);
}

// sendHTML: the editor parses `html` into its own document schema, so tags or
// attributes the schema doesn't support are dropped. It also replaces the selection.
function demoSendHTML(actions, html) {
  actions.sendHTML(html);
  log('out', `sendHTML("${truncate(html)}")`);
}

function onSend(inputId, send) {
  const { value } = $(inputId);
  if (!value.trim()) {
    log('warn', 'Nothing to send — the textarea is empty.');
    return;
  }
  send(value);
}

// Why a timeout: actions.getSelection() can stay pending forever.
// - With an empty selection DA replies { action: 'error' } on the MessagePort,
//   but the SDK only listens for the answer on `window`, so it never hears it.
// - The SDK's `window` listener detaches on the first message of ANY kind, so
//   an unrelated message (e.g. a token refresh) can also swallow the reply.
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error('timeout')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// DOMParser builds an inert document: no scripts run and no images load, so it is
// safe for untrusted HTML. Never put selection HTML into this page via innerHTML.
function htmlToText(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent;
}

// getSelection: resolves with the editor selection serialized as an HTML string.
async function demoGetSelection(actions) {
  const button = $('get-selection');
  button.disabled = true;
  log('out', 'getSelection()');
  try {
    const html = String(await withTimeout(actions.getSelection(), SELECTION_TIMEOUT_MS));
    const text = htmlToText(html);
    $('selection-html').textContent = html;
    $('selection-text').textContent = text;
    lastSelection = { html, text };
    $('rt-upper').disabled = false;
    $('rt-strong').disabled = false;
    log('in', `getSelection → "${truncate(html)}"`);
    return lastSelection;
  } catch (reason) {
    if (reason instanceof Error && reason.message === 'timeout') {
      log('warn', SELECTION_TIMEOUT_MESSAGE);
    } else {
      log('error', `getSelection rejected: ${reason}`);
    }
    return null;
  } finally {
    button.disabled = false;
  }
}

function wireDemos(actions) {
  $('send-text').addEventListener('click', () => onSend('text-input', (v) => demoSendText(actions, v)));
  $('send-html').addEventListener('click', () => onSend('html-input', (v) => demoSendHTML(actions, v)));
  $('get-selection').addEventListener('click', () => demoGetSelection(actions));

  // Round trip: read (getSelection) → transform → write (sendText / sendHTML).
  $('rt-upper').addEventListener('click', () => {
    // DA rejects empty text nodes, e.g. when only an image was selected.
    if (!lastSelection.text.trim()) {
      log('warn', 'The last selection has no text to uppercase.');
      return;
    }
    demoSendText(actions, lastSelection.text.toUpperCase());
  });
  $('rt-strong').addEventListener('click', () => {
    demoSendHTML(actions, `<strong>${lastSelection.html}</strong>`);
  });
}

async function init() {
  $('clear-log').addEventListener('click', () => $('log').replaceChildren());

  // DA_SDK resolves only when DA's editor posts its init message. Outside DA it
  // never resolves, so tell the user after a short wait — but keep waiting.
  const timeout = new Promise((resolve) => {
    setTimeout(resolve, CONNECT_TIMEOUT_MS, null);
  });
  let sdk = await Promise.race([DA_SDK, timeout]);
  if (!sdk) {
    setStatus('Open this plugin from the DA editor library.');
    log('warn', `DA_SDK not resolved after ${CONNECT_TIMEOUT_MS} ms — still waiting for DA.`);
    sdk = await DA_SDK;
  }

  const { context = {}, actions } = sdk;
  const { org = '', repo = '', path = '' } = context;
  setStatus(`Connected: ${org}/${repo}${path}`);
  log('in', `DA_SDK resolved — context: ${org}/${repo}${path}`);

  // Round-trip buttons stay disabled until a selection has been fetched.
  document.querySelectorAll('.sdk-action').forEach((button) => {
    if (button.id !== 'rt-upper' && button.id !== 'rt-strong') button.disabled = false;
  });

  wireDemos(actions);
}

init();
