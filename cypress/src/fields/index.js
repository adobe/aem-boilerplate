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

// Requisition Lists
export const addToRequisitionListButton =
  '.product-details__buttons__add-to-req-list';
export const reqListGridWrapper = '.requisition-list-grid-wrapper';
export const reqListGridEmptyList = '.empty-list';
export const requisitionListFormName = '#requisition-list-form-name';
export const requisitionListFormDescription =
  '#requisition-list-form-description';
export const navDrop = '.nav-drop';
export const requisitionListItemRow = '.dropin-table__body__row';
export const requisitionListSelector = '.requisition-list-selector button';
export const requisitionListActions = '.requisition-list-actions';
export const requisitionListForm = '.requisition-list-form';
export const requisitionListAlert = '.requisition-list-selector__alert';
export const requisitionListSelectorForm = '.requisition-list-selector__form';
export const requisitionListSelectorAvailableLists =
  '.requisition-list-selector__available-lists';
export const requisitionListSelectorAvailableListFirstChild =
  '.requisition-list-selector__available-lists .dropin-card:first-child';
export const requisitionListFormActionsButton =
  '.requisition-list-form__actions button';

export const requisitionListItemActionsRenameButton =
  '.requisition-list-grid-wrapper__actions button[data-testid="rename-button"]';
export const requisitionListItemActionsDeleteButton =
  '.requisition-list-grid-wrapper__actions button[data-testid="delete-button"]';
export const requisitionListModalConfirmButton =
  '.requisition-list-modal__buttons button[data-testid="rl-modal-confirm-button"]';

// Requisition List View
export const requisitionListGridNameLink =
  ".dropin-table__body__row .requisition-list-grid-wrapper__name a";
export const requisitionListViewRenameButton =
  '[data-testid="rename-list-btn"]';
export const requisitionListViewQuantityInput =
  ".requisition-list-view-product-list-table__quantity input";
export const requisitionListViewBatchActionsToggle =
  ".requisition-list-view__batch-actions-select-toggle";
export const requisitionListViewBatchActionsCountBadge =
  ".requisition-list-view__batch-actions-count-badge";
export const requisitionListViewBulkActionsAddToCartButton =
  '[data-testid="bulk-actions-add-to-cart-btn"]';
export const requisitionListViewBulkActionsDeleteButton =
  '[data-testid="bulk-actions-delete-btn"]';
export const requisitionListViewDeleteButton =
  '[data-testid="delete-list-btn"]';
export const miniCartButton = ".minicart-wrapper .nav-cart-button";
export const productDetailsAlert = ".product-details__alert";

export const COMPANY_CREATE_PATH = "/customer/company/create";


// Navigation Fields
export const navAccountDropdown = '.nav-dropdown-button';
export const navAccountMenu = '.nav-auth-menu-panel';
export const navAccountMenuVisible = '.nav-tools-panel--show';
export const navAccountLink = 'a[href*="/customer/account"]';
export const navCompanyRegistrationLink =
  'a[href*="' + COMPANY_CREATE_PATH + '"]';
export const navLogoutButton = 'button:contains("Logout")';

// Main Navigation Fields
export const navAccountSection = 'li.nav-drop:contains("Account")';
export const navAccountSubmenu =
  'li.nav-drop:contains("Account") .submenu-wrapper';
export const navCompanyRegistrationLinkMain = `a[href*="${COMPANY_CREATE_PATH}"]`;

// Company Registration Form Fields
export const companyFormCompanyName = 'input[name="companyName"]';
export const companyFormLegalName = 'input[name="legalName"]';
export const companyFormCompanyEmail = 'input[name="companyEmail"]';
export const companyFormVatTaxId = 'input[name="vatTaxId"]';
export const companyFormResellerId = 'input[name="resellerId"]';
export const companyFormStreet = 'input[name="street"]';
export const companyFormStreetLine2 = 'input[name="streetLine2"]';
export const companyFormCity = 'input[name="city"]';
export const companyFormPostcode = 'input[name="postcode"]';
export const companyFormTelephone = 'input[name="addressTelephone"]';
export const companyFormCountryCode = 'select[name="countryCode"]';
export const companyFormRegion = 'select[name="region"]';
export const companyFormFirstName = 'input[name="adminFirstname"]';
export const companyFormLastName = 'input[name="adminLastname"]';
export const companyFormAdminEmail = 'input[name="adminEmail"]';
export const companyFormJobTitle = 'input[name="adminJobTitle"]';
export const companyFormWorkTelephone = 'input[name="adminWorkTelephone"]';
export const companyFormAdminGender = 'select[name="adminGender"]';
export const companyFormSubmitButton = 'button';

// Purchase Orders selectors
export const poLoginForm = 'main .auth-sign-in-form';
export const poEmailInput = 'input[name="email"]';
export const poPasswordInput = 'input[name="password"]';
export const poSubmitButton = 'button[type="submit"]';
export const poAddToCartButton = 'button';
export const poNavCartButton = '.nav-cart-button';
export const poCheckoutLink = 'a[href="/checkout"]';
export const poCheckMoneyOrderLabel = 'label';
export const poTermsCheckbox = 'input[type="checkbox"]';
export const poPlacePOButton = 'button[type="button"]';
export const poNavDropdownButton = '.nav-dropdown-button';
export const poLogoutButton = 'button';
export const poCheckbox = 'input[type="checkbox"]';
export const poCompanyPOContainer =
  '[data-testid="company-purchase-orders-container"]';
export const poApprovalPOWrapper =
  '.commerce-b2b-po-require-approval-purchase-orders-wrapper';
export const poMyApprovalPOWrapper =
  '.commerce-b2b-po-require-approval-purchase-orders';
export const poTable = '.b2b-purchase-order-purchase-orders-table';
export const poShowButton = 'button';
export const poEditButton = 'button.dropin-action-button';
export const poNameInput = 'input[name="name"]';
export const poStatusCheckbox = 'input[type="checkbox"][name="status"]';
export const poTextarea = 'textarea';
export const poRuleTypeSelect = 'select[name="ruleType"]';
export const poRuleConditionSelect = 'select[name="ruleCondition"]';
export const poRuleValueInput = 'input[name="ruleValue"]';
export const poMultiSelect = '.dropin-multi-select';
export const poTableRow = '.b2b-purchase-order-purchase-orders-table tr.dropin-table__body__row';
