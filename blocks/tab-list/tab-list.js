export function changeTabs(e) {
  const targetTab = e.target;
  const targetTabPanelIds = targetTab.getAttribute('aria-controls').split(' ');
  const [tabGroupPrefix] = targetTabPanelIds[0].split('-panel-');
  const tabList = targetTab.parentNode;

  // Remove all current selected tabs
  tabList
    .querySelectorAll(':scope > [aria-selected="true"]')
    .forEach((t) => t.setAttribute('aria-selected', false));

  // Set this tab as selected
  targetTab.setAttribute('aria-selected', true);

  // Hide all tab panels
  document
    .querySelectorAll(`[role="tabpanel"][id^="${tabGroupPrefix}-panel-"]`)
    .forEach((p) => p.setAttribute('hidden', true));

  // Show the selected panel
  targetTabPanelIds.forEach((id) => {
    document.querySelector(`#${id}`).removeAttribute('hidden');
  });
}

export default async function decorate(block) {
  const tabList = block.querySelector('ul');

  if (!tabList) {
    block.innerHTML = '<p>No Tab Panels found</p>';
    return;
  }

  // see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tab_role#example
  // Only handle one particular tablist; if you have multiple tab
  // lists (might even be nested), you have to apply this code for each one

  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  const [tabsPrefix] = tabList.id.split('-tablist');

  if (block.classList.contains('showall')) {
    const tabId = `${tabsPrefix}-tab-all`;
    const tabPanels = [...tabs].map((t) => t.getAttribute('aria-controls')).join(' ');

    // build the tabs as buttons and append them to the tab list
    const tabItem = document.createElement('button');
    tabItem.id = tabId;
    tabItem.role = 'tab';
    tabItem.tabIndex = 0;
    tabItem.setAttribute('aria-controls', tabPanels);
    tabItem.textContent = 'All';

    const li = document.createElement('li');
    li.appendChild(tabItem);
    tabList.prepend(li);
    tabs.unshift(tabItem);

    // set tabIndex for the now second tab to -1
    tabs[1].tabIndex = -1;

    changeTabs({ target: tabItem });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener('keydown', (e) => {
    // Move right
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      tabs[tabFocus].setAttribute('tabindex', -1);
      if (e.key === 'ArrowRight') {
        tabFocus += 1;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.key === 'ArrowLeft') {
        tabFocus -= 1;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute('tabindex', 0);
      tabs[tabFocus].focus();
    }
  });
}
