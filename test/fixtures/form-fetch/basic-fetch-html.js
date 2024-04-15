import assert from 'assert';
import { fetchForm } from '../../../blocks/form/form.js';

function escapeHTML(str) {
  return (str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[tag])));
}

const data = {
  id: 'someid',
  items: [
    {
      fieldType: 'text-input',
      id: 'text-input',
      name: 'f2',
      rules: {
        value: 'f1',
      },
    },
    {
      fieldType: 'text-input',
      id: 'text-input-2',
      name: 'f1',
    },
    {
      fieldType: 'button',
      id: 'button',
      events: {
        click: 'submitForm()',
      },
    },
  ],
};

const doc = `<html><body><main><div class="form"><div><div></div><pre><code>${escapeHTML(JSON.stringify(data))}</code></pre></div></div></main></body></html>`;

export function before() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  global.fetch.mockData['http://localhost:3000/adobe/forms/myform.html'] = {
    headers,
    data: {},
  };
  global.fetch.mockData['http://localhost:3000/adobe/forms/myform.md.html'] = {
    headers,
    data: doc,
  };
}

export const formPath = 'http://localhost:3000/adobe/forms/myform.html';

export async function expect() {
  assert.equal(await fetchForm(formPath), escapeHTML(JSON.stringify(data)));
}

export function after() {
  global.fetch.mockData = {};
}

export function op() {}

export const opDelay = 100;
