import CustomerInformation from '@dropins/storefront-account/containers/CustomerInformation.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { checkIsCompanyEnabled, fetchGraphQl } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/account.js';
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await accountRenderer.render(CustomerInformation, { withHeader: true })(block);

    try {
      const { companyEnabled } = await checkIsCompanyEnabled();
      // eslint-disable-next-line no-console
      console.log('[CompanyUserInfo:block] companyEnabled =', companyEnabled);
      if (!companyEnabled) return;

      const SELECTOR = '.account-customer-information-card__content';
      const MOUNT_CLASS = 'account-company-user-info-mount';

      const ensureMount = (host) => {
        if (!host) return;
        if (host.querySelector(`.${MOUNT_CLASS}`)) return;
        const mount = document.createElement('div');
        mount.className = MOUNT_CLASS;
        host.appendChild(mount);

        // Direct render approach (no React container)
        (async () => {
          try {
            const q = `query { company { name } customer { job_title telephone } }`;
            const r = await fetchGraphQl(q, { method: 'GET', cache: 'no-cache' });
            const d = r?.data || {};
            const name = (d?.company?.name || '').trim();
            if (!name) return; // not a company user
            const job = (d?.customer?.job_title || '').trim();
            const phone = (d?.customer?.telephone || '').trim();
            const addGroup = (label, value) => {
              const group = document.createElement('div');
              group.className = 'account-company-user-info-group';

              const labelEl = document.createElement('p');
              labelEl.className = 'account-company-user-info-label';
              const strongEl = document.createElement('strong');
              strongEl.textContent = label;
              labelEl.appendChild(strongEl);

              const valueEl = document.createElement('p');
              valueEl.className = 'account-company-user-info-value';
              valueEl.textContent = (value && value.trim()) ? value : '\u00A0';

              group.appendChild(labelEl);
              group.appendChild(valueEl);
              mount.appendChild(group);
            };

            addGroup('Company', name);
            addGroup('Job Title', job);
            addGroup('Work Phone Number', phone);
          } catch (e) {
          }
        })();
      };

      let tries = 0;
      const maxTries = 60;
      const tryMount = () => {
        const host = block.querySelector(SELECTOR);
        if (!host) {
          if (tries++ < maxTries) setTimeout(tryMount, 250);
          return;
        }
        ensureMount(host);
        const observer = new MutationObserver(() => ensureMount(host));
        observer.observe(host, { childList: true });
      };
      tryMount();
    } catch (e) {
    }
  }
}

