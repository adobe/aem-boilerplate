/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * @typedef Links
 */

/**
 * @typedef Asset
 * @property {Links} _links Rels for the asset. Is expected to have a
 *  http://ns.adobe.com/adobecloud/rel/rendition rel for retrieving the
 *  asset's renditions, and a http://ns.adobe.com/adobecloud/rel/download
 *  rel for retrieving a URL to the asset's original content, which
 *  doesn't require authentication.
 */

/**
 * @typedef Rendition
 * @property {string} type Content type of the rendition.
 * @property {number} width Width, in pixels, of the rendition.
 * @property {string} href Full URL to the rendition's binary. This URL
 *  will require authentication.
 * @property {Links} _links Rels for the rendition. Is expected to have
 *  a http://ns.adobe.com/adobecloud/rel/download rel for retrieving a
 *  URL to the rendition's content, which doesn't require authentication.
 */

/**
 * @typedef AssetSelectorConfig
 * @property {string} [imsClientId] If provided, will be used as the client ID
 *  when authenticating with IMS.
 * @property {string} [repositoryId] If provided, will be used as the selected
 *  repository in the Asset Selector.
 * @property {string} [imsOrgId] If provided, will be used as the IMS org to use
 *  when logging in through IMS.
 * @property {string} [environment] If provided, will be the IMS environment to
 *  use when logging in through IMS. Should be STAGE or PROD.
 * @property {function} [onAssetSelected] If provided, will be invoked with the
 *  repository metadata for the asset that was selected.
 * @property {function} [onAssetDeselected] If provided, will be invoked with
 *  no arguments if the currently selected asset is deselected.
 * @property {function} [onAccessTokenReceived] If provided, will be invoked
 *  when an IMS token is available for the user. May be invoked multiple times
 *  with the same token during the session.
 */

const AS_MFE = 'https://experience.adobe.com/solutions/CQ-assets-selectors/static-assets/resources/assets-selectors.js';
const IMS_ENV_STAGE = 'stg1';
const IMS_ENV_PROD = 'prod';
const API_KEY = 'franklin';
const WEB_TOOLS = 'https://master-sacred-dove.ngrok-free.app';
const REL_DOWNLOAD = 'http://ns.adobe.com/adobecloud/rel/download';
const REL_RENDITIONS = 'http://ns.adobe.com/adobecloud/rel/rendition';
// TODO: change this to Asset Link IMS client ID
const IMS_CLIENT_ID = 'p66302-franklin';
const ASSET_SELECTOR_ID = 'asset-selector';
const CLIPBOARD_SUPPORTED_BINARY_MIMETYPES = [
  'image/png',
];
const SUPPORTED_RENDITIONS_FORMATS = [
  'image/png',
  'image/jpeg',
];

let imsInstance = null;
let imsEnvironment = IMS_ENV_PROD;

/**
 * Logs a message to the console.
 * @param  {...any} theArgs Arguments to pass to the console log
 *  statement.
 */
function logMessage(...theArgs) {
  // eslint-disable-next-line no-console
  console.log.apply(null, theArgs);
}

/**
 * Retrieves the value of a rel from repository metadata.
 * @param {Asset|Rendition} repositoryMetadata Metadata whose links
 *  will be used.
 * @param {string} rel The rel to retrieve.
 */
function getRel(repositoryMetadata, rel) {
  if (!repositoryMetadata) {
    return undefined;
  }
  // eslint-disable-next-line no-underscore-dangle
  return repositoryMetadata._links[rel];
}

/**
 * Adds a new <script> tag to the documents <head>.
 * @param {string} url URL of the script to load.
 * @param {function} callback Invoked after the script has
 *  finished loading.
 * @param {string} [type] If provided, the value to use in
 *  the scripts "type" property. If unspecified the type
 *  will be left blank.
 * @returns {HTMLElement} The newly created script tag.
 */
function loadScript(url, callback, type) {
  const $head = document.querySelector('head');
  const $script = document.createElement('script');
  $script.src = url;
  if (type) {
    $script.setAttribute('type', type);
  }
  $head.append($script);
  $script.onload = callback;
  return $script;
}

/**
 * Loads the asset selector by registering the IMS auth service it
 * should use to authorize users.
 * @param {AssetSelectorConfig} cfg Configuration to use for the
 *  selector.
 */
function load(cfg) {
  const imsProps = {
    imsClientId: cfg['ims-client-id'] ? cfg['ims-client-id'] : IMS_CLIENT_ID,
    imsScope: 'additional_info.projectedProductContext,openid,read_organizations,AdobeID,ab.manage',
    redirectUrl: window.location.href,
    modalMode: true,
    imsEnvironment,
    env: imsEnvironment,
    onAccessTokenReceived: cfg.onAccessTokenReceived || (() => { }),
  };
  // eslint-disable-next-line no-undef
  const registeredTokenService = PureJSSelectors.registerAssetsSelectorsAuthService(imsProps);
  imsInstance = registeredTokenService;
}

/**
 * Initializes the asset selector by loading its script file, and registering
 * the IMS auth service it should use to authenticate with IMS.
 * @param {AssetSelectorConfig} cfg Configuration for the selector.
 * @param {function} [callback] If provided, will be invoked after
 *  all intialization steps are complete.
 */
export function init(cfg, callback) {
  if (cfg.environment) {
    if (cfg.environment.toUpperCase() === 'STAGE') {
      imsEnvironment = IMS_ENV_STAGE;
    } else if (cfg.environment.toUpperCase() === 'PROD') {
      imsEnvironment = IMS_ENV_PROD;
    } else {
      throw new Error('Invalid environment setting!');
    }
  }
  loadScript(AS_MFE, () => {
    load(cfg);
    if (callback) {
      callback();
    }
  });
}

/**
 * Generates a URL that can be used to retrieve an asset's binary
 * without authentication.
 * @param {string} url URL to the asset in AEM.
 * @returns {Promise} Resolves with the public asset URL.
 */
async function getAssetPublicUrl(url) {
  const response = await fetch(`${WEB_TOOLS}/asset-bin?src=${url}`, {
    headers: {
      Authorization: `Bearer ${imsInstance.getImsToken()}`,
      'x-api-key': API_KEY,
    },
  });
  if (!response) {
    throw new Error('No response from request');
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
  }
  const json = await response.json();
  return json['asset-url'];
}

/**
 * Retrieves the rendition that should be copied into the clipboard for
 * the given asset.
 * @param {Asset} asset Asset whose copy rendition should be retrieved.
 * @returns {Rendition} Rendition whose content should be copied to
 *  the clipboard. Will return a falsy value if no suitable rendition
 *  could be found.
 */
function getCopyRendition(asset) {
  let maxRendition = null;
  const renditions = getRel(asset, REL_RENDITIONS);
  if (!renditions) {
    return maxRendition;
  }
  renditions
    // TODO: the clipboard API only supports using PNGs as the blob, so
    // only using PNG renditions. Will be fixed to allow altnernate
    // formats in a follow-up ticket
    .forEach((rendition) => {
      if (SUPPORTED_RENDITIONS_FORMATS.includes(rendition.type)
        && (!maxRendition || maxRendition.width < rendition.width)) {
        maxRendition = rendition;
      }
    });
  return maxRendition;
}

/**
 * Uses the navigator global object to write a clipboard item to the clipboard.
 * The clipboard item's content will be an <img /> tag with the given URL as
 * its src property.
 * @param {string} assetPublicUrl URL to use as the image's src.
 * @returns {Promise} Resolves when the item has been written to the clipboard.
 */
async function copyToClipboardWithHtml(assetPublicUrl) {
  const assetMarkup = `<img src="${assetPublicUrl}"  />`;

  const data = [
    // eslint-disable-next-line no-undef
    new ClipboardItem({ 'text/html': new Blob([assetMarkup], { type: 'text/html' }) }),
  ];
  // Write the new clipboard contents
  return navigator.clipboard.write(data);
}

async function loadImageIntoHtmlElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    /*
    crossorigin needs to be anonymous to allow the future canvas export,
    otherwise the canvas will be considered tainted and the export will fail
    */
    img.setAttribute('crossorigin', 'anonymous');
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
  });
}

/**
 * Convert an image using an URL to a another image format
 * @param {*} assetPublicUrl Public asset URL
 * @param {*} targetMimeType Target mimetype (target format)
 * @returns A conversion promise resolving to a blob of the target mimetype
 */
async function convertImage(assetPublicUrl, targetMimeType='image/png', asset) {
  const imageElement = await loadImageIntoHtmlElement(assetPublicUrl);

  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = asset['tiff:imageWidth'];
    canvas.height = asset['tiff:imageLength'];

    const context = canvas.getContext('2d');
    context.drawImage(imageElement, 0, 0);
    canvas.toBlob(resolve, targetMimeType);
  });
}

/**
 * Uses the navigator global object to write a clipboard item to the clipboard.
 * The clipboard item's content will be a Blob containing the image binary from
 * the given URL, which the method will retrieve.
 * @param {string} assetPublicUrl URL of the image to retrieve.
 * @param {string} mimeType Content type of the image being retrieved.
 * @returns {Promise} Resolves when the item has been written to the clipboard.
 */
async function copyToClipboardWithBinary(assetPublicUrl, mimeType, asset) {
  let data;

  if (!CLIPBOARD_SUPPORTED_BINARY_MIMETYPES.includes(mimeType)) {
    const copiedBlob = await convertImage(assetPublicUrl, 'image/png', asset);

    const clipboardOptions = {};
    clipboardOptions['image/png'] = copiedBlob;
    data = [
      new ClipboardItem(clipboardOptions),
    ];
  } else {
    const binary = await fetch(assetPublicUrl);

    if (!binary || !binary.ok) {
      throw new Error(`Unexpected status code ${binary.status} retrieving asset binary`);
    }

    const blob = await binary.blob();
    if (!blob) {
      throw new Error('No blob provided in asset response');
    }

    const clipboardOptions = {};
    clipboardOptions[mimeType] = blob;
    data = [
      new ClipboardItem(clipboardOptions),
    ];
  }

  return navigator.clipboard.write(data);
}

/**
 * Copies the given asset to the clipboard, without using the Repository API,
 * and therefore avoiding calls directly to AEM. The primary case for using
 * this method would be if AEM's CORS policies would deny requests from the
 * asset selector.
 * @param {Asset} asset Asset repository metadata, as provided by the asset
 *  selector.
 * @returns {Promise<boolean>} Resolves with true if the asset was
 *  copied successfully, otherwise resolves with false.
 */
export async function copyAssetWithoutRapi(asset) {
  const maxRendition = getCopyRendition(asset);
  if (!maxRendition) {
    logMessage('No rendition to copy found');
    return false;
  }
  try {
    const assetPublicUrl = await getAssetPublicUrl(maxRendition.href.substring(0, maxRendition.href.indexOf('?')));
    if (!assetPublicUrl) {
      logMessage('Unable to generate public url for copy');
      return false;
    }
    await copyToClipboardWithHtml(assetPublicUrl);
  } catch (e) {
    logMessage('Error copying asset to clipboard', e);
    return false;
  }
  return true;
}

/**
 * Copies the given asset to the clipboard, using the Repository API to
 * generate a download URL for the asset, then using the generated URL
 * to copy the asset's content to the clipboard.
 * @param {Asset} asset Asset repository metadata, as provided by the
 *  asset selector.
 * @returns {Promise<boolean>} Resolves with true if the asset was
 *  copied successfully, otherwise resolves with false.
 */
export async function copyAssetWithRapi(asset) {
  // eslint-disable-next-line no-underscore-dangle
  if (!asset) {
    logMessage('Asset metadata does not contain sufficient information');
    return false;
  }
  const rendition = getCopyRendition(asset);
  if (!rendition) {
    logMessage('No rendition to copy found');
    return false;
  }
  const download = getRel(rendition, REL_DOWNLOAD);
  if (!download || !download.href) {
    logMessage('Rendition does not contain sufficient information');
    return false;
  }
  try {
    const url = download.href;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${imsInstance.getImsToken()}`,
      },
    });
    if (!res.ok) {
      logMessage(`Download request for rendition binary failed with status code ${res.status}: ${res.statusText}`);
      return false;
    }
    const downloadJson = await res.json();
    if (!downloadJson) {
      logMessage('Rendition download JSON not provided');
      return false;
    }
    await copyToClipboardWithBinary(downloadJson.href, downloadJson.type, asset);
  } catch (e) {
    logMessage('Error copying asset using R-API to clipboard', e);
    return false;
  }

  return true;
}

/**
 * Retrieves the asset selector's containing element.
 * @returns {HTMLElement} The asset selector.
 */
function getAssetSelector() {
  return document.getElementById(ASSET_SELECTOR_ID);
}

/**
 * Invoked when the currently selected asset in the asset selector has
 * changed. Will invoke either onAssetSelected() or onAssetDeselected()
 * depending on the new selection state.
 * @param {Array<Asset>} selection The new selection in the selector.
 * @param {AssetSelectorConfig} cfg Configuration for the asset selector.
 */
function handleAssetSelection(selection, cfg) {
  if (cfg) {
    if (selection.length && cfg.onAssetSelected) {
      if (selection.length > 1) {
        logMessage('Multiple items received in selection, but only the first will be used');
      }
      cfg.onAssetSelected(selection[0]);
    } else if (!selection.length && cfg.onAssetDeselected) {
      cfg.onAssetDeselected();
    }
  }
}

/**
 * Renders the asset selector according to a given configuration. The
 * selector will use its IMS flow to ensure that the user has logged
 * in.
 * @param {AssetSelectorConfig} cfg Configuration to use for the
 *  asset selector.
 * @returns {Promise} Resolves when the IMS flow has been initiated.
 */
export async function renderAssetSelectorWithImsFlow(cfg) {
  const assetSelectorProps = {
    handleAssetSelection: (e) => handleAssetSelection(e, cfg),
    env: cfg.environment ? cfg.environment.toUpperCase() : 'PROD',
    apiKey: API_KEY,
    hideTreeNav: true,
    runningInUnifiedShell: false,
    noWrap: true,
  };

  if (cfg['repository-id']) {
    assetSelectorProps.repositoryId = cfg['repository-id'];
  }
  if (cfg['ims-org-id']) {
    assetSelectorProps.imsOrg = cfg['ims-org-id'];
  }

  // eslint-disable-next-line no-undef
  PureJSSelectors.renderAssetSelectorWithAuthFlow(getAssetSelector(), assetSelectorProps);
}

/**
 * Does the work of logging out of IMS.
 * @returns {Promise} Resolves when logout has finished.
 */
export async function logoutImsFlow() {
  return imsInstance.signOut();
}
