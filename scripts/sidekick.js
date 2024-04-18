async function getContentSourceUrl(owner, repo, ref) {
  const res = await fetch(`https://admin.hlx.page/sidekick/${owner}/${repo}/${ref}/env.json`);
  if (!res || !res.ok) {
    return null;
  }
  const env = await res.json();
  return env?.contentSourceUrl;
}
async function openWithUniversalEditor(event) {
  const { owner, repo, ref } = event.detail.data.config;
  const contentSourceUrl = await getContentSourceUrl(owner, repo, ref);
  if (!contentSourceUrl) {
    // eslint-disable-next-line no-console
    console.error('Content source URL not found');
    return;
  }
  const { pathname } = window.location;
  const editorUrl = `${contentSourceUrl}${pathname}?cmd=open`;
  // open the editor in a new tab
  window.open(editorUrl, '_blank');
}

async function getElement(sk, selector) {
  let elt = sk.shadowRoot.querySelector(selector);
  return new Promise((resolve) => {
    const check = () => {
      elt = sk.shadowRoot.querySelector(selector);
      if (elt) {
        resolve(elt);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

function shouldHidePlugin(plugin) {
  const [pluginCls] = plugin.classList;
  return ['edit', 'reload', 'publish', 'delete', 'unpublish'].indexOf(pluginCls) !== -1;
}

async function customizeButtons(sk) {
  const container = await getElement(sk, '.plugin-container');
  container.style.visibility = 'hidden';

  // hide the default buttons once
  container.querySelectorAll('.plugin').forEach((plugin) => {
    if (shouldHidePlugin(plugin)) {
      plugin.style.display = 'none';
    }
  });
  // listen for new buttons and hide them
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (shouldHidePlugin(node)) {
        node.style.display = 'none';
      }
    }));
  }).observe(container, { childList: true });

  container.style.visibility = 'visible';

  // initialize the custom edit button
  sk.addEventListener('custom:aemedit', openWithUniversalEditor);
}

// eslint-disable-next-line import/prefer-default-export
export async function initSidekick() {
  let sk = document.querySelector('helix-sidekick');
  if (sk) {
    // sidekick already loaded
    await customizeButtons(sk);
  } else {
    // wait for sidekick to be loaded
    document.addEventListener('sidekick-ready', async () => {
      sk = document.querySelector('helix-sidekick');
      await customizeButtons(sk);
    }, { once: true });
  }
}
