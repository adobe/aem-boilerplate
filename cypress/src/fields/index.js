export const checkoutButton = '[data-testid="checkout-button"]';

// Shipping Form
export const shippingFormGuestEmail = 'input[name="customer-email"]';
export const shippingFormFirstName =
  'form[name="selectedShippingAddress"] input[name="firstName"]';
export const shippingFormLastName =
  'form[name="selectedShippingAddress"] input[name="lastName"]';
export const shippingFormCompany =
  'form[name="selectedShippingAddress"] input[name="company"]';
export const shippingFormStreet =
  'form[name="selectedShippingAddress"] input[name="street"]';
export const shippingFormStreet1 =
  'form[name="selectedShippingAddress"] input[name="streetMultiline_2"]';
export const shippingFormStreet2 =
  'form[name="selectedShippingAddress"] input[name="street-2"]';
export const shippingFormCity =
  'form[name="selectedShippingAddress"] input[name="city"]';
export const shippingFormMobile =
  'form[name="selectedShippingAddress"] input[name="my_mobile"]';
export const shippingFormPostCode =
  'form[name="selectedShippingAddress"] input[name="postcode"]';
export const shippingFormTelephone =
  'form[name="selectedShippingAddress"] input[name="telephone"]';
export const shippingFormVat =
  'form[name="selectedShippingAddress"] input[name="vatId"]';
export const shippingFormCountry =
  'form[name="selectedShippingAddress"] select[name="countryCode"]';
export const shippingFormState =
  'form[name="selectedShippingAddress"] select[name="region"]';
export const shippingFormInputState =
  'form[name="selectedShippingAddress"] input[name="region"]';

// Billing Form
export const billingFormGuestEmail = 'input[name="customer-email"]';
export const billingFormFirstName =
  'form[name="selectedBillingAddress"] input[name="firstName"]';
export const billingFormLastName =
  'form[name="selectedBillingAddress"] input[name="lastName"]';
export const billingFormCompany =
  'form[name="selectedBillingAddress"] input[name="company"]';
export const billingFormStreet =
  'form[name="selectedBillingAddress"] input[name="street"]';
export const billingFormStreet1 =
  'form[name="selectedBillingAddress"] input[name="streetMultiline_2"]';
export const billingFormStreet2 =
  'form[name="selectedBillingAddress"] input[name="street-2"]';
export const billingFormCity =
  'form[name="selectedBillingAddress"] input[name="city"]';
export const billingFormMobile =
  'form[name="selectedBillingAddress"] input[name="my_mobile"]';
export const billingFormPostCode =
  'form[name="selectedBillingAddress"] input[name="postcode"]';
export const billingFormTelephone =
  'form[name="selectedBillingAddress"] input[name="telephone"]';
export const billingFormVat =
  'form[name="selectedBillingAddress"] input[name="vatId"]';
export const billingFormCountry =
  'form[name="selectedBillingAddress"] select[name="countryCode"]';
export const billingFormState =
  'form[name="selectedBillingAddress"] select[name="region"]';
export const billingFormInputState =
  'form[name="selectedBillingAddress"] input[name="region"]';

// bill to shipping address
export const billToShippingAddress =
  'input[name="checkout-bill-to-shipping-address__checkbox"]';

// Shipping Methods
export const shippingMethods = 'div[class*="checkout-shipping-methods"]';

// Payment Methods
export const paymentMethods = '.checkout-payment-methods__method';

export const creditCardNumberIFrame =
  '.payment-services-credit-card-form__card-number iframe';
export const creditCardNumber = 'input[name="credit-card-number"]';
export const creditCardExpIFrame =
  '.payment-services-credit-card-form__expiration-date iframe';
export const creditCardExp = 'input[name="expiration"]';
export const creditCardCvvIFrame =
  '.payment-services-credit-card-form__security-code iframe';
export const creditCardCvv = 'input[name="cvv"]';

// Place Order
export const placeOrderButton = 'button[class*="checkout-place-order__button"]';

/* Estimated shipping fields */
export const estimatedShippingForm = '[data-testid="shipping-estimate-form"]';

export const estimatedShippingSubmit =
  '[data-testid="estimate-shipping-apply-button"]';

export const estimatedShippingDestinationLink =
  '[data-testid="shipping-destination-link"]';

export const estimatedShippingZipField =
  '[data-testid="estimate-shipping-zip-input"]';

export const estimatedShippingStateSelector =
  '[data-testid="estimate-shipping-state-selector"]';

export const estimatedShippingStateInput =
  '[data-testid="estimate-shipping-state-input"]';

export const estimatedShippingAlternativeFieldLink =
  '[data-testid="shipping-alternate-field-link"]';

export const estimatedShippingCountrySelector =
  '[data-testid="estimate-shipping-country-selector"]';

export const estimatedTaxTotal = '[data-testid="tax-total"]';

export const authFormUserCompany = 'input[name="companyName"]';
export const authFormUserEmail = 'input[name="email"]';
export const authFormUserFirstName = 'input[name="firstName"]';
export const authFormUserLastName = 'input[name="lastName"]';
export const authFormUserPassword = 'input[name="password"]';

export const cancellationReasonsSelector =
  '[data-testid="order-cancellation-reasons-selector"]';
export const cancelButton = '[data-testid="cancel-button"]';
export const submitCancelOrderButton =
  '[data-testid="order-cancel-submit-button"]';
export const cancellationReasonsModal =
  '[data-testid="order-cancellation-reasons-modal"]';

export const termsAndConditionsCheckbox =
  'input[name="default"][type="checkbox"]';

// Gift card and options
export const orderSummary = '.cart__order-summary';
export const giftCardField = 'input[name="giftCardCode"]';
export const giftOptionCardIncludedCheckBox =
  'input[name="printedCardIncluded"]';
export const giftOptionWrapCheckBox = 'input[name*="isGiftWrappingSelected"]';
export const giftOptionRecipientName = 'input[name="recipientName"]';
export const giftOptionSenderName = 'input[name="senderName"]';
export const giftOptionMessage = 'textarea[name="message"]';
export const giftOptionGiftReceiptIncluded =
  'input[name="giftReceiptIncluded"]';
  
// Search
export const searchIcon = '.nav-search-button';
export const searchField = '#search';
export const productListGrid = '.product-discovery-product-list__grid';
export const productCard = '.dropin-product-item-card';
export const productName = '.dropin-product-item-card__title';
export const productPrice = '.dropin-product-item-card__price';
export const productImage = '.dropin-product-item-card__image';

// Customer Address

export const fieldUserFirstName = 'input[name="firstName"]';
export const fieldUserLastName = 'input[name="lastName"]';
export const fieldUserStreet = 'input[name="street"]';
export const fieldUserStreet2 = 'input[name="streetMultiline_2"]';
export const fieldUserSelectCountry = 'select[name="countryCode"]';
export const fieldUserTextRegion = 'input[name="region"]';
export const fieldUserCity = 'input[name="city"]';
export const fieldUserPhone = 'input[name="telephone"]';
export const fieldUserPostCode = 'input[name="postcode"]';
export const fieldUserVatId = 'input[name="vatId"]';
export const authFormUserCheckBoxShipping = 'input[name="defaultShipping"]';
export const authFormUserCheckBoxBilling = 'input[name="defaultBilling"]';

export const fieldUserEmail = 'input[name="email"]';
export const fieldUserNumber = 'input[name="number"]';
export const submitButton = 'button[type="submit"]';