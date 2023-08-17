import { readBlockConfig } from '../../scripts/lib-franklin.js';
import {
  init, renderAssetSelectorWithImsFlow, logoutImsFlow,
} from './aem-asset-selector-util.js';

export default function decorate(block) {
  let rendered = false;
  const cfg = readBlockConfig(block);
  block.textContent = '';
  block.innerHTML = `
    <div class="asset-overlay">
      <div id="login">
        <p>Welcome to the Asset Selector! After signing in you'll have the option to select which assets to use.</p>
        <button id="as-login">Sign In</button>
      </div>
    </div>
    <div class="action-container">
        <button id="as-cancel">Sign Out</button>
    </div>
    <dialog id="asset-selector-dialog">
        <div id="asset-selector" style="height: calc(100vh - 80px); width: calc(100vw - 60px); margin: -20px;">
        </div>
    </dialog>
    `;
  block.querySelector('#as-login').addEventListener('click', (e) => {
    e.preventDefault();
    renderAssetSelectorWithImsFlow(cfg);
  });

  block.querySelector('#as-cancel').addEventListener('click', (e) => {
    e.preventDefault();
    logoutImsFlow();
  });

  // this will be sent by the auth service if the user has a token, meaning
  // they're logged in. if that happens, hide the login overlay and show
  // the asset selector
  cfg.onAccessTokenReceived = () => {
    block.querySelector('.asset-overlay').style.display = 'none';
    if (!rendered) {
      rendered = true;
      // calling this shouldn't prompt the user to log in, since they're logged
      // in already
      renderAssetSelectorWithImsFlow(cfg);
    }
  };
  init(cfg);
}
