import { render as provider } from '@dropins/storefront-company-management/render.js';
import { RolesAndPermissions } from '@dropins/storefront-company-management/containers/RolesAndPermissions.js';
import {
  checkIsAuthenticated,
  rootLink,
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
} from '../../scripts/commerce.js';
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-company-roles-permissions-container');

  const isAuthenticated = checkIsAuthenticated();
  
  try {
    await provider.render(RolesAndPermissions, {
      isAuthenticated,
      onRedirectLogin: () => {
        window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
      },
      onRedirectAccount: () => {
        window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
      },
      // Role management event handlers
      onAddRole: () => {
        console.log('Add new role clicked - would open role creation form');
        // TODO: Implement role creation form/modal
        alert('Role creation form would open here');
      },
      onEditRole: (roleId) => {
        console.log('Edit role clicked:', roleId);
        // TODO: Implement role editing form/modal
        alert(`Edit role ${roleId} form would open here`);
      },
      onDuplicateRole: (roleId) => {
        console.log('Duplicate role clicked:', roleId);
        // TODO: Implement role duplication logic
        alert(`Role ${roleId} would be duplicated`);
      },
    })(block);
    
  } catch (error) {
    console.error('Error rendering RolesAndPermissions component:', error);
    block.innerHTML = `<div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px;">
      <h3>Error Loading Roles and Permissions</h3>
      <p>There was an error loading the component: ${error.message}</p>
      <p>Please check the browser console for more details.</p>
    </div>`;
  }
}
