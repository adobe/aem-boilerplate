/* eslint-disable no-underscore-dangle, import/no-unresolved */

import { crawl, Queue } from 'https://da.live/nx/public/utils/tree.js';
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

import { mdToDocDom, docDomToAemHtml } from 'https://da.live/nx/utils/converters.js';

const { token } = await DA_SDK;

const DA_ORIGIN = 'https://admin.da.live';
const AEM_ORIGIN = 'https://admin.hlx.page';

const IMPORT_BASE = window.location.origin;
const INDEX = `${IMPORT_BASE}/full-index.json`;

export const SITE_CREATION_STATUS = {
  COMPLETE: 0,
  NO_CODE_BUS: 1,
  NO_FSTAB: 2,
};

function getLibraryConfigJson(org, site) {
  const basePath = `https://content.da.live/${org}/${site}/.da/library`;

  const configJson = {
    data: {
      total: 1,
      limit: 1,
      offset: 0,
      data: [{}],
      ':colWidths': [],
    },
    library: {
      total: 1,
      limit: 1,
      offset: 0,
      data: [
        {
          title: 'Blocks',
          path: `${basePath}/blocks.json`,
          format: '',
        },
      ],
      ':colWidths': [75, 500, 100],
    },
    ':names': ['data', 'library'],
    ':version': 3,
    ':type': 'multi-sheet',
  };
  return JSON.stringify(configJson);
}

function getDestinationPath(siteName, org) {
  return `/${org}/${siteName}`;
}

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function fetchIndex() {
  const res = await fetch(INDEX);
  if (!res.ok) throw new Error(`Failed to fetch index: ${res.statusText}`);
  return res.json();
}

async function checkCodeBus(data) {
  const res = await fetch(`${AEM_ORIGIN}/code/${data.org}/${data.repo}/main/scripts/aem.js`);
  return res.ok;
}

async function previewOrPublishPages(data, action, setStatus) {
  const parent = getDestinationPath(data.repo, data.org);
  const daInternalPath = `${parent}/.da/`;

  const label = action === 'preview' ? 'Previewing' : 'Publishing';

  const opts = { method: 'POST', headers: { Authorization: `Bearer ${token}` } };

  const callback = async (item) => {
    if (item.path.endsWith('.svg') || item.path.endsWith('.png') || item.path.endsWith('.jpg')) return;
    // skip publishing library
    if (item.path.startsWith(daInternalPath)) return;
    setStatus({ message: `${label}: ${item.path.replace(parent, '').replace('.html', '')}` });
    const aemPath = item.path.replace(parent, `${parent}/main`).replace('.html', '');
    const resp = await fetch(`${AEM_ORIGIN}/${action}${aemPath}`, opts);
    if (!resp.ok) throw new Error(`Could not preview ${aemPath}`);
  };

  const { results, getCallbackErrors } = crawl({
    path: parent, callback, concurrent: 5, throttle: 250,
  });

  const allPages = await results;

  const errors = getCallbackErrors();

  if (allPages.length === errors.length) {
    throw new Error('No FSTAB.');
  }

  if (errors.length > 0) {
    throw new Error(`Failed while ${label.toLowerCase()} for ${errors.length} files.`);
  }
}

function replaceHtml(text) {
  const inner = text
    .replaceAll('./media', `${IMPORT_BASE}/media`)
    .replaceAll('href="/', `href="${IMPORT_BASE}/`);

  return `
    <body>
      <header></header>
      <main>${inner}</main>
      <footer></footer>
    </body>
  `;
}

async function getAemHtml(text) {
  const dom = mdToDocDom(text);
  const aemHtml = docDomToAemHtml(dom);
  return aemHtml;
}

async function copyJson(destination, path, setStatus) {
  const daDestinationPath = `${DA_ORIGIN}/source${destination}${path}`;

  setStatus({ message: `Importing ${path}` });

  const resp = await fetch(`${IMPORT_BASE}${path}`);

  const content = await resp.json();

  const blob = new Blob([JSON.stringify(content)], { type: 'application/json' });

  const formData = new FormData();
  formData.set('data', blob);
  const updateRes = await fetch(daDestinationPath, { method: 'POST', body: formData, headers: getAuthHeaders() });
  if (!updateRes.ok) { throw new Error(`Failed to write ${path}: ${updateRes.statusText}`); }
}

async function copyHtml(destination, path, setStatus) {
  const suffix = path.endsWith('/') ? 'index' : '';
  const daDestinationPath = `${DA_ORIGIN}/source${destination}${path}${suffix}.html`;

  setStatus({ message: `Importing ${path}` });

  const resp = await fetch(`${IMPORT_BASE}${path}${suffix}.md`);

  let content = await resp.text();
  const aemHtml = await getAemHtml(content);
  const html = replaceHtml(aemHtml);

  content = new Blob([html], { type: 'text/html' });

  const formData = new FormData();
  formData.set('data', content);
  const updateRes = await fetch(daDestinationPath, { method: 'POST', body: formData, headers: getAuthHeaders() });
  if (!updateRes.ok) { throw new Error(`Failed to write ${path}: ${updateRes.statusText}`); }
}

async function importUrl({ path, destination, setStatus }) {
  const isJson = path.endsWith('.json');
  if (isJson) {
    await copyJson(destination, path, setStatus);
  } else {
    await copyHtml(destination, path, setStatus);
  }
}

async function copyContent(data, setStatus) {
  const destination = getDestinationPath(data.repo, data.org);

  const index = await fetchIndex();

  const failedUrls = [];
  const queue = new Queue(importUrl, 5, (item) => failedUrls.push(item.path));

  const promises = index.data.map(({ path, title }) => queue.push({
    path, title, destination, setStatus,
  }));

  await Promise.all(promises);

  if (failedUrls.length > 0) {
    throw new Error(`Failed to copy ${failedUrls.length} files.`);
  }
}

export async function checkDestinationAccess(data) {
  const destination = getDestinationPath(data.repo, data.org);

  // First try without auth to see if we can access the org
  const res = await fetch(`${DA_ORIGIN}/list${destination}`);

  // 404 is good, means the org doesn't exist and is safe to create
  if (res.status === 404) {
    return { exists: false, requiresAuth: false };
  }

  // If we get a 401/403, the org exists but requires auth
  if (res.status === 401 || res.status === 403) {
    return { exists: true, requiresAuth: true };
  }

  if (!res.ok) {
    throw new Error(`Failed to check if site exists: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.length > 0) {
    throw new Error(`Site already exists. Please delete the content at https://da.live/#${destination} before creating a new site.`);
  }

  // If we get here, the org exists but has no content and doesn't require auth
  return { exists: true, requiresAuth: false };
}

async function updateDaConfig(data) {
  const url = `${DA_ORIGIN}/config/${data.org}/${data.repo}/`;

  const jsonString = getLibraryConfigJson(data.org, data.repo);

  const formData = new FormData();
  formData.set('config', jsonString);
  const updateRes = await fetch(url, { method: 'PUT', body: formData, headers: getAuthHeaders() });
  if (!updateRes.ok) { throw new Error(`Failed to update config: ${updateRes.statusText}`); }
}

function verifyAuthentication() {
  if (!token || token === 'undefined') {
    throw new Error('Please sign in.');
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function createSite(data, setStatus) {
  const { exists, requiresAuth } = await checkDestinationAccess(data);

  // Only require auth if the org exists AND requires authentication
  if (exists && requiresAuth) {
    verifyAuthentication();
  }

  setStatus({ message: 'Copying content.' });
  await copyContent(data, setStatus);
  setStatus({ message: 'Checking code bus.' });
  const codeBusSynced = await checkCodeBus(data);

  if (!codeBusSynced) {
    return SITE_CREATION_STATUS.NO_CODE_BUS;
  }

  setStatus({ message: 'Previewing pages.' });
  try {
    await previewOrPublishPages(data, 'preview', setStatus);
  } catch (e) {
    if (e.message === 'No FSTAB.') { return SITE_CREATION_STATUS.NO_FSTAB; }
    throw e;
  }
  setStatus({ message: 'Publishing pages.' });
  await previewOrPublishPages(data, 'live', setStatus);
  setStatus({ message: 'Updating DA config.' });
  await updateDaConfig(data);

  return SITE_CREATION_STATUS.COMPLETE;
}
