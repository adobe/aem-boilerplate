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

function wireDemos(actions) {
  $('send-text').addEventListener('click', () => onSend('text-input', (v) => demoSendText(actions, v)));
  $('send-html').addEventListener('click', () => onSend('html-input', (v) => demoSendHTML(actions, v)));
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
