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

// eslint-disable-next-line no-unused-vars
function wireDemos(actions) {}

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
