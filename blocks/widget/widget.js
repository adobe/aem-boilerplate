import { loadCSS } from '../../scripts/aem.js';

/**
 * Parses a widget href into folder path and name.
 * @param {string} pathname URL pathname (e.g. `/widgets/path1/name.html`)
 * @returns {{ widgetPath: string, widgetName: string }}
 */
function parseWidgetHref(pathname) {
  const pathSegments = pathname.split('/').filter((p) => p);
  const widgetName = pathSegments[pathSegments.length - 1].split('.')[0];
  const widgetPath = pathSegments.slice(1, -1).join('/');
  return { widgetPath, widgetName };
}

/**
 * Builds a widget asset URL.
 * @param {string} widgetPath Folder path under `/widgets/`
 * @param {string} widgetName Widget file name without extension
 * @param {string} extension File extension (`html`, `css`, `js`)
 */
function widgetUrl(widgetPath, widgetName, extension) {
  const prefix = widgetPath ? `${widgetPath}/` : '';
  return `${window.hlx.codeBasePath}/widgets/${prefix}${widgetName}.${extension}`;
}

/**
 * Loads and decorates a widget block.
 * @param {Element} widget The widget block element
 */
export default async function decorate(widget) {
  const source = widget.querySelector('a[href]');
  const { pathname, searchParams } = new URL(source.href);
  const { widgetPath, widgetName } = parseWidgetHref(pathname);

  try {
    const resp = await fetch(widgetUrl(widgetPath, widgetName, 'html'));
    widget.innerHTML = await resp.text();

    const cssLoaded = loadCSS(widgetUrl(widgetPath, widgetName, 'css'));
    const decorationComplete = (async () => {
      const mod = await import(widgetUrl(widgetPath, widgetName, 'js'));
      if (mod.default) await mod.default(widget);
    })();
    await Promise.all([cssLoaded, decorationComplete]);

    widget.classList.add(widgetName);
    widget.classList.remove('block');
    widget.dataset.source = source.href;
    searchParams.forEach((value, key) => {
      widget.dataset[key] = value;
    });

    const wrapper = widget.closest('.widget-wrapper');
    if (wrapper) {
      wrapper.classList.add(`${widgetName}-wrapper`);
      wrapper.classList.remove('widget-wrapper');
    }
    const container = widget.closest('.widget-container');
    if (container) {
      container.classList.add(`${widgetName}-container`);
      container.classList.remove('widget-container');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`failed to load widget ${widgetPath}/${widgetName}`, error);
  }
}
