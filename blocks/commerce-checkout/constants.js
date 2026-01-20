// Form and address constants
const BILLING_FORM_NAME = 'selectedBillingAddress';
const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;
const LOGIN_FORM_NAME = 'login-form';
const PURCHASE_ORDER_FORM_NAME = 'purchase-order';
const SHIPPING_FORM_NAME = 'selectedShippingAddress';
const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
const TERMS_AND_CONDITIONS_FORM_NAME = 'checkout-terms-and-conditions__form';

// Timing constants
const DEBOUNCE_TIME = 1000;
const ADDRESS_INPUT_DEBOUNCE_TIME = 500;

// Block and styling constants
const CHECKOUT_BLOCK = 'checkout__block';
const CHECKOUT_ERROR_CLASS = 'checkout__content--error';
const CHECKOUT_HEADER_CLASS = 'checkout-header';
const ORDER_CONFIRMATION_BLOCK = 'order-confirmation__block';

export {
  ADDRESS_INPUT_DEBOUNCE_TIME,
  BILLING_ADDRESS_DATA_KEY,
  BILLING_FORM_NAME,
  LOGIN_FORM_NAME,
  PURCHASE_ORDER_FORM_NAME,
  SHIPPING_ADDRESS_DATA_KEY,
  SHIPPING_FORM_NAME,
  TERMS_AND_CONDITIONS_FORM_NAME,

  // Timing constants
  DEBOUNCE_TIME,

  // Block and styling constants
  CHECKOUT_BLOCK,
  CHECKOUT_ERROR_CLASS,
  CHECKOUT_HEADER_CLASS,
  ORDER_CONFIRMATION_BLOCK,
};
