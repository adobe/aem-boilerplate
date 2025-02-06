export const SUPPORT_PATH = '/support';
export const PRIVACY_POLICY_PATH = '/privacy-policy';

// GUEST
export const ORDER_STATUS_PATH = '/order-status';
export const ORDER_DETAILS_PATH = '/order-details';
export const RETURN_DETAILS_PATH = '/return-details';
export const CREATE_RETURN_PATH = '/create-return';
export const SALES_GUEST_VIEW_PATH = '/sales/guest/view/';

// CUSTOMER
export const CUSTOMER_PATH = '/customer';
export const CUSTOMER_ORDER_DETAILS_PATH = `${CUSTOMER_PATH}${ORDER_DETAILS_PATH}`;
export const CUSTOMER_RETURN_DETAILS_PATH = `${CUSTOMER_PATH}${RETURN_DETAILS_PATH}`;
export const CUSTOMER_CREATE_RETURN_PATH = `${CUSTOMER_PATH}${CREATE_RETURN_PATH}`;
export const CUSTOMER_ORDERS_PATH = `${CUSTOMER_PATH}/orders`;
export const CUSTOMER_RETURNS_PATH = `${CUSTOMER_PATH}/returns`;
export const CUSTOMER_ADDRESS_PATH = `${CUSTOMER_PATH}/address`;
export const CUSTOMER_LOGIN_PATH = `${CUSTOMER_PATH}/login`;
export const CUSTOMER_ACCOUNT_PATH = `${CUSTOMER_PATH}/account`;
export const CUSTOMER_FORGOTPASSWORD_PATH = `${CUSTOMER_PATH}/forgotpassword`;
export const SALES_ORDER_VIEW_PATH = '/sales/order/view/';

// TRACKING
export const UPS_TRACKING_URL = 'https://www.ups.com/track';

// REUSABLE SLOTS
export const authPrivacyPolicyConsentSlot = {
  PrivacyPolicyConsent: async (ctx) => {
    const wrapper = document.createElement('span');
    Object.assign(wrapper.style, {
      color: 'var(--color-neutral-700)',
      font: 'var(--type-details-caption-2-font)',
      display: 'block',
      marginBottom: 'var(--spacing-medium)',
    });

    const link = document.createElement('a');
    link.href = PRIVACY_POLICY_PATH;
    link.target = '_blank';
    link.textContent = 'Privacy Policy';

    wrapper.append(
      'By creating an account, you acknowledge that you have read and agree to our ',
      link,
      ', which outlines how we collect, use, and protect your personal data.',
    );

    ctx.appendChild(wrapper);
  },
};
