import ffetch from '../../scripts/ffetch.js';
import { decorateIcons } from '../../scripts/aem.js';
import {
  getOrigin, checkDomain, checkBrowserDomain,
} from '../../scripts/utils.js';

function createReference(type, link) {
  const row = document.createElement('div');
  row.className = 'reference-row';
  row.innerHTML = `
      <span>${type}</span>
      <span class="status">...</span>
      <a class="edit-link">...</a>
    `;
  row.prepend(link);
  return row;
}

function confirmPrompt(str, successCallback) {
  const prompt = document.createElement('dialog');
  prompt.className = 'publish-prompt-dialog';
  prompt.innerHTML = `
    <form method="dialog" class="publish-prompt-form">
      <p class="prompt-msg">${str}</p>
      <div class="button-container">
        <button type="submit" value="true" autofocus>Confirm</button>
        <button type="button"  class="secondary" value="false">Cancel</button>
      </div>
    </div>
  `;
  prompt.querySelector('button[type="button"]').addEventListener('click', () => {
    prompt.close();
  });
  prompt.addEventListener('close', () => {
    if (prompt.returnValue === 'true') {
      successCallback();
    }
    prompt.remove();
  });
  document.querySelector('#references-dialog').append(prompt);
  prompt.showModal();
}

function closeDialog(dlg) {
  const prompt = dlg.querySelector('.publish-prompt-dialog');
  if (prompt) {
    prompt.close();
    prompt.remove();
  }

  dlg.close();
  document.body.style.overflowY = null;
}

async function updateStatus(row) {
  const link = row.querySelector('a');
  const editLink = row.querySelector('.edit-link');
  const status = row.querySelector('.status');
  const browserDomainCheck = checkBrowserDomain();
  if (browserDomainCheck.isHlx || browserDomainCheck.isLocal) {
    let ownerRepoBranch = 'shsteimer/franklin-playground/main';
    if (browserDomainCheck.isHlx) {
      const curHost = window.location.hostname.split('.');
      const repoInfo = curHost[0].split('--');
      ownerRepoBranch = `${repoInfo[2]}/${repoInfo[1]}/${repoInfo[0]}`;
    }
    const statusResp = await fetch(`https://admin.hlx.page/status/${ownerRepoBranch}${link.getAttribute('href')}?editUrl=auto`);
    if (statusResp.ok) {
      const json = await statusResp.json();
      if (json) {
        if (json.edit && json.edit.url) {
          editLink.href = json.edit.url;
          editLink.textContent = 'Edit';
          editLink.target = '_blank';
        } else {
          editLink.textContent = 'Unavailable';
        }

        if (json.live && json.live.status === 200) {
          status.textContent = 'Live';
        } else if (json.preview && json.preview.status === 200) {
          status.textContent = 'Unpublished';
          const publishBtn = document.createElement('button');
          publishBtn.setAttribute('role', 'button');
          publishBtn.setAttribute('title', 'Publish');
          publishBtn.className = 'publish-reference';
          publishBtn.innerHTML = '<span class="icon icon-publish"></span>';
          publishBtn.addEventListener('click', () => {
            confirmPrompt(`Publish ${link.getAttribute('href')}?`, () => {
              fetch(`https://admin.hlx.page/live/${ownerRepoBranch}${link.getAttribute('href')}`, {
                method: 'POST',
              }).then((pubResp) => {
                console.log(pubResp.status);
              }).catch((err) => {
                console.error(err);
              });
            });
          });
          decorateIcons(publishBtn);
          status.append(publishBtn);
        }
      }
    }
  }
}

async function updateTitle(row) {
  const link = row.querySelector('a');
  try {
    const resp = await fetch(`${link.href}`);
    if (resp.ok) {
      const html = await resp.text();
      const dp = new DOMParser();
      const doc = dp.parseFromString(html, 'text/html');
      link.textContent = doc.title;
    }
  } catch (e) {
    // no op

  }
}

async function checkIncomingReferences(dialog, button) {
  button.dataset.total = 0;
  button.dataset.processed = 0;
  button.dataset.found = 0;
  button.textContent = 'Loading Incoming References (0/0)...';
  const dialogBody = dialog.querySelector('.references-body');
  const res = ffetch('/references-index.json');
  let total = 1000;
  // eslint-disable-next-line no-restricted-syntax
  for await (const page of res) {
    total = res.total;
    button.dataset.total = total;

    const { path, title, links } = page;
    const linksArr = JSON.parse(links);

    // check if one of links is the current page
    const hasLinkToThisPage = linksArr.some((linkHref) => {
      const linkUrl = new URL(linkHref, getOrigin());
      const linkDomainCheck = checkDomain(linkUrl);
      return linkDomainCheck.isKnown && linkUrl.pathname === window.location.pathname;
    });

    if (path !== window.location.pathname && hasLinkToThisPage) {
      const rowLink = document.createElement('a');
      rowLink.setAttribute('href', path);
      rowLink.setAttribute('target', '_blank');
      rowLink.textContent = title;
      const row = createReference('Incoming', rowLink);
      dialogBody.append(row);
      updateStatus(row);

      const found = parseInt(button.dataset.found, 10);
      button.dataset.found = found + 1;
    }

    const { processed } = button.dataset;
    let procesedCount = parseInt(processed, 10);
    procesedCount += 1;
    button.dataset.processed = procesedCount;
    button.textContent = `Finding Incoming References (${procesedCount}/${total})...`;
  }

  button.textContent = `${button.dataset.found} Incoming References Found`;
}

async function checkReferences(dialog) {
  const dialogBody = dialog.querySelector('.references-body');

  const fragments = document.querySelectorAll('[data-fragment-path]');
  const fragmentPaths = new Set([...fragments].map((frag) => frag.dataset.fragmentPath));
  fragmentPaths.forEach((fragmentPath) => {
    const rowLink = document.createElement('a');
    rowLink.setAttribute('target', '_blank');
    rowLink.setAttribute('href', fragmentPath);
    rowLink.textContent = fragmentPath;
    const row = createReference('Fragment', rowLink);
    dialogBody.append(row);
    updateTitle(row);
    updateStatus(row);
  });

  const links = document.querySelectorAll('main a');
  const linkPaths = new Set();
  links.forEach((link) => {
    if (link.closest('.references')) return;
    if (checkDomain(link.href).isExternal) return;

    const linkPath = new URL(link.href).pathname;
    if (linkPath === window.location.pathname) return;
    if (linkPaths.has(linkPath)) return;
    linkPaths.add(linkPath);

    const rowLink = document.createElement('a');
    rowLink.setAttribute('target', '_blank');
    rowLink.setAttribute('href', linkPath);
    rowLink.textContent = link.textContent;
    const row = createReference('Link', rowLink);
    dialogBody.append(row);
    updateStatus(row);
  });

  const forms = document.querySelectorAll('[data-form-path]');
  const formPaths = new Set([...forms].map((form) => form.dataset.formPath));
  formPaths.forEach((formPath) => {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', formPath);
    link.textContent = formPath.split('/').pop();
    const row = createReference('Form', link);
    dialogBody.append(row);
    updateStatus(row);
  });
}

function init(block) {
  const dialog = block.querySelector('#references-dialog');
  const initialized = dialog.dataset.initialized === 'true';
  if (!initialized) {
    checkReferences(dialog);
    dialog.querySelector('.load-incoming').addEventListener('click', (e) => {
      e.target.disabled = true;
      checkIncomingReferences(dialog, e.target);
    });
    dialog.dataset.initialized = true;
  }

  dialog.showModal();
  document.body.style.overflowY = 'hidden';
  dialog.addEventListener('click', (event) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
      closeDialog(dialog);
    }
  });
}

export default async function decorate(block) {
  block.innerHTML = `
    <dialog id="references-dialog">
      <div class="references-dialog-wrapper">
        <div class="references-header">
          <h2>References Check</h2>
          <span class="references-close"></span>
        </div>
        <div class="references-body">
          <div class="reference-row reference-header-row">
            <span>Reference</span>
            <span>Type</span>
            <span>Status</span>
            <span>Edit</span>
          </div>
        </div>
        <div class="references-footer">
          <button class="button primary load-incoming">Find Incoming References</button>
        </div>
      </div>
    </dialog>
    `;
  init(block);
  block.querySelector('#references-dialog .references-close').addEventListener('click', () => {
    const dialog = block.querySelector('#references-dialog');
    closeDialog(dialog);
  });

  window.addEventListener('message', (msg) => {
    if (msg.origin === getOrigin() && msg.data && msg.data.sidekickInit && msg.data.block === 'references') {
      init(block);
    }
  });
}
