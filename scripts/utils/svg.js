import { getConfig } from '../scripts/nexter.js';

const { nxBase } = getConfig();

async function fetchIcon(path) {
  const resp = await fetch(path);
  if (!resp.ok) return null;
  const text = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  return doc.querySelector('svg');
}

export default function getSvg({ parent, paths }) {
  const svgs = paths.map(async (path) => {
    const svg = await fetchIcon(path);
    if (parent) parent.append(svg);
    return svg;
  });
  return Promise.all(svgs);
}

export async function link2svg(a) {
  const { textContent, href } = a;
  if (!(textContent.includes('.svg') || href.includes('.svg'))) return a;
  try {
    // Mine for URL and alt text
    const splitText = textContent.split('|');
    const textUrl = new URL(splitText.shift().trim());
    const altText = splitText.join('|').trim();

    let src = textUrl.hostname.includes('.hlx.') ? textUrl.pathname : textUrl;
    src = src.startsWith('/nx') ? src.replace('/nx', `${nxBase}`) : src;
    const svg = await getSvg({ paths: [src] });
    const icon = document.createElement('span');
    icon.className = 'nx-link-icon';
    icon.append(svg[0]);

    a.textContent = '';
    a.classList.add('nx-link');
    a.insertAdjacentElement('afterbegin', icon);
    a.insertAdjacentHTML('beforeend', `<span class="nx-link-text">${altText}</span>`);

    return a;
  } catch (e) {
    console.log('Failed to create SVG.', e.message);
    return a;
  }
}
