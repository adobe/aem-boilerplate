/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-restricted-syntax,  no-await-in-loop */

async function* request(url, context) {
  const { chunkSize, sheetName, fetch } = context;
  for (let offset = 0, total = Infinity; offset < total; offset += chunkSize) {
    const params = new URLSearchParams(`offset=${offset}&limit=${chunkSize}`);
    if (sheetName) params.append('sheet', sheetName);
    const resp = await fetch(`${url}?${params.toString()}`);
    if (resp.ok) {
      const json = await resp.json();
      total = json.total;
      context.total = total;
      for (const entry of json.data) yield entry;
    } else {
      return;
    }
  }
}

// Operations:

function withFetch(upstream, context, fetch) {
  context.fetch = fetch;
  return upstream;
}

function withHtmlParser(upstream, context, parseHtml) {
  context.parseHtml = parseHtml;
  return upstream;
}

function chunks(upstream, context, chunkSize) {
  context.chunkSize = chunkSize;
  return upstream;
}

function sheet(upstream, context, sheetName) {
  context.sheetName = sheetName;
  return upstream;
}

async function* skip(upstream, context, from) {
  let skipped = 0;
  for await (const entry of upstream) {
    if (skipped < from) {
      skipped += 1;
    } else {
      yield entry;
    }
  }
}

async function* limit(upstream, context, aLimit) {
  let yielded = 0;
  for await (const entry of upstream) {
    yield entry;
    yielded += 1;
    if (yielded === aLimit) {
      return;
    }
  }
}

async function* map(upstream, context, fn, maxInFlight = 5) {
  const promises = [];
  for await (let entry of upstream) {
    promises.push(fn(entry));
    if (promises.length === maxInFlight) {
      for (entry of promises) {
        entry = await entry;
        if (entry) yield entry;
      }
      promises.splice(0, promises.length);
    }
  }
  for (let entry of promises) {
    entry = await entry;
    if (entry) yield entry;
  }
}

async function* filter(upstream, context, fn) {
  for await (const entry of upstream) {
    if (fn(entry)) {
      yield entry;
    }
  }
}

function slice(upstream, context, from, to) {
  return limit(skip(upstream, context, from), context, to - from);
}

function follow(upstream, context, name, newName, maxInFlight = 5) {
  const { fetch, parseHtml } = context;
  return map(upstream, context, async (entry) => {
    const value = entry[name];
    if (value) {
      const resp = await fetch(value);
      return { ...entry, [newName || name]: resp.ok ? parseHtml(await resp.text()) : null };
    }
    return entry;
  }, maxInFlight);
}

async function all(upstream) {
  const result = [];
  for await (const entry of upstream) {
    result.push(entry);
  }
  return result;
}

async function first(upstream) {
  /* eslint-disable-next-line no-unreachable-loop */
  for await (const entry of upstream) {
    return entry;
  }
  return null;
}

// Helper

function assignOperations(generator, context) {
  // operations that return a new generator
  function createOperation(fn) {
    return (...rest) => assignOperations(fn.apply(null, [generator, context, ...rest]), context);
  }
  const operations = {
    skip: createOperation(skip),
    limit: createOperation(limit),
    slice: createOperation(slice),
    map: createOperation(map),
    filter: createOperation(filter),
    follow: createOperation(follow),
  };

  // functions that either return the upstream generator or no generator at all
  const functions = {
    chunks: chunks.bind(null, generator, context),
    all: all.bind(null, generator, context),
    first: first.bind(null, generator, context),
    withFetch: withFetch.bind(null, generator, context),
    withHtmlParser: withHtmlParser.bind(null, generator, context),
    sheet: sheet.bind(null, generator, context),
  };

  Object.assign(generator, operations, functions);
  Object.defineProperty(generator, 'total', { get: () => context.total });
  return generator;
}

export default function ffetch(url) {
  let chunkSize = 255;
  const fetch = (...rest) => window.fetch.apply(null, rest);
  const parseHtml = (html) => new window.DOMParser().parseFromString(html, 'text/html');

  try {
    if ('connection' in window.navigator && window.navigator.connection.saveData === true) {
      // request smaller chunks in save data mode
      chunkSize = 64;
    }
  } catch (e) { /* ignore */ }

  const context = { chunkSize, fetch, parseHtml };
  const generator = request(url, context);

  return assignOperations(generator, context);
}
