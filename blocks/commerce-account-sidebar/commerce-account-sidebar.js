import { Icon, provider as UI } from '@dropins/tools/components.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { loadFragment } from '../fragment/fragment.js';
import { CUSTOMER_ORDERS_PATH } from '../../scripts/commerce.js';
import { rootLink } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const fragment = await loadFragment('/customer/sidebar-fragment');
  const sidebarItemsConfig = fragment.querySelectorAll('.default-content-wrapper > ol > li');
  const sidebarItems = Array.from(sidebarItemsConfig).map((item) => {
    const itemParams = Array.from(item.querySelectorAll('ol > li'));
    const itemTitle = item.childNodes[0]?.textContent?.trim() || item.querySelector(':scope > p')?.textContent?.trim() || 'Default Title';
    const itemSubtitle = itemParams[0]?.innerText || '';
    const itemLink = itemParams[1]?.innerText || rootLink('#');
    const itemIcon = itemParams[2]?.innerText || 'Placeholder';
    const itemConfig = {
      itemTitle,
      itemSubtitle,
      itemLink,
      itemIcon,
    };

    const menuItemEl = document.createElement('a');
    menuItemEl.classList.add('commerce-account-sidebar-item');
    menuItemEl.href = rootLink(itemConfig.itemLink);

    const isItemActive = (
      itemConfig.itemLink === CUSTOMER_ORDERS_PATH
        ? window.location.href.includes(CUSTOMER_ORDERS_PATH)
        : window.location.href.includes(itemConfig.itemLink)
    );
    if (isItemActive) {
      menuItemEl.classList.add('commerce-account-sidebar-item-active');
    }

    const iconEl = createMenuItemIcon(itemConfig.itemIcon);
    const contentEl = createMenuItemContent(itemConfig.itemTitle, itemConfig.itemSubtitle);
    const arrowEl = createMenuItemArrow();

    menuItemEl.appendChild(iconEl);
    menuItemEl.appendChild(contentEl);
    menuItemEl.appendChild(arrowEl);

    return menuItemEl;
  });

  block.innerHTML = '';
  sidebarItems.forEach((el) => {
    block.appendChild(el);
  });
}

function createMenuItemIcon(iconSource) {
  const iconEl = document.createElement('div');
  iconEl.classList.add('commerce-account-sidebar-item-icon');
  accountRenderer.render(Icon, { source: iconSource, size: 32 })(iconEl);
  return iconEl;
}

function createMenuItemContent(title, subtitle) {
  const contentEl = document.createElement('div');
  contentEl.classList.add('commerce-account-sidebar-item-content');

  const titleEl = document.createElement('p');
  titleEl.classList.add('commerce-account-sidebar-item-title');
  titleEl.innerText = title;

  const subtitleEl = document.createElement('p');
  subtitleEl.classList.add('commerce-account-sidebar-item-subtitle');
  subtitleEl.innerText = subtitle;

  contentEl.appendChild(titleEl);
  contentEl.appendChild(subtitleEl);
  return contentEl;
}

function createMenuItemArrow() {
  const arrowEl = document.createElement('div');
  arrowEl.classList.add('commerce-account-sidebar-item-arrow');
  UI.render(Icon, {
    source: 'ChevronRight',
    size: 32,
  })(arrowEl);
  return arrowEl;
}
