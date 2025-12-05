import * as fields from '../fields/index';
import * as selectors from '../fields';

export const setGuestEmail = (customerEmail) => {
  cy.get(fields.shippingFormGuestEmail).clear().type(customerEmail);
};

export const setGuestShippingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.shippingFormFirstName).clear().type(customerAddress.firstName);
  cy.get(fields.shippingFormLastName).clear().type(customerAddress.lastName);
  cy.get(fields.shippingFormStreet).clear().type(customerAddress.street);
  cy.get(fields.shippingFormStreet1).clear().type(customerAddress.street1);
  if (isSelectableState) {
    cy.get(fields.shippingFormState).select(customerAddress.region);
  } else {
    cy.get(fields.shippingFormInputState).type(customerAddress.region);
  }
  cy.get(fields.shippingFormCity).clear().type(customerAddress.city);
  cy.get(fields.shippingFormPostCode).clear().type(customerAddress.postCode);
  cy.get(fields.shippingFormTelephone).clear().type(customerAddress.telephone);
};

export const setGuestBillingAddress = (customerAddress, isSelectableState) => {
  cy.wait(1000);
  cy.get(fields.billingFormFirstName)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.firstName, { force: true });
  cy.wait(1000);
  cy.get(fields.billingFormLastName)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.lastName, { force: true });
  cy.wait(1000);
  cy.get(fields.billingFormStreet)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.street, { force: true });
  cy.wait(1000);
  cy.get(fields.billingFormStreet1)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.street1, { force: true });
  if (isSelectableState) {
    cy.wait(1000);
    cy.get(fields.billingFormState)
      .should('not.be.disabled')
      .select(customerAddress.region, { force: true });
  } else {
    cy.wait(1000);
    cy.get(fields.billingFormInputState)
      .should('not.be.disabled')
      .type(customerAddress.region, { force: true });
  }
  cy.wait(1000);
  cy.get(fields.billingFormCity)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.city, { force: true });
  cy.wait(1000);
  cy.get(fields.billingFormPostCode)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.postCode, { force: true });
  cy.wait(1000);
  cy.get(fields.billingFormTelephone)
    .should('not.be.disabled')
    .clear()
    .type(customerAddress.telephone, { force: true });
};

export const uncheckBillToShippingAddress = () => {
  cy.get(fields.billToShippingAddress).uncheck({ force: true });
};

export const placeOrder = () => {
  cy.get(fields.placeOrderButton).should('be.visible');
  cy.get(fields.placeOrderButton).click();
};

export const createAccount = () => {
  cy.contains('Create account').click();
};

export const signInUser = (username, password) => {
  cy.get('[name="signIn_form"]').should('be.visible');
  cy.get('[name="email"]').eq(1).should('be.visible').clear().type(username);
  cy.get('[name="password"]').eq(1).should('be.visible').clear().type(password);
  cy.get('[name="password"]').eq(1).should('have.value', password);
  // Cypress click is too quick, need to waiit for password to be actully typed and set
  cy.wait(1000);
  cy.get('.auth-sign-in-form__form__buttons button')
    .eq(3)
    .click({ force: true });
};

export const signUpUser = (sign_up, isValid = true) => {
  const random = Cypress._.random(0, 10000000);
  const username = `${random}${sign_up.email}`;
  cy.contains('Create account').should('be.visible');
  if (sign_up.email) {
    cy.get(fields.authFormUserEmail)
      .eq(1)
      .clear({ force: true })
      .type(username);
  }
  cy.get(fields.authFormUserFirstName).clear().type(sign_up.firstName);
  cy.get(fields.authFormUserLastName).clear().type(sign_up.lastName);
  cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);

  if (isValid) {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);
  } else {
    cy.get(fields.authFormUserPassword)
      .eq(1)
      .clear()
      .type(sign_up.shortPassword);
  }
  createAccount();
};

export const setPaymentMethod = (paymentMethod) => {
  cy.get(fields.paymentMethods).contains(paymentMethod.name).click();
  if (paymentMethod.name === 'Credit Card') {
    const { cc_number, cc_exp, cc_cid } = paymentMethod.params;
    cy.wait(5000);
    cy.getIFrameField(
      fields.creditCardNumberIFrame,
      fields.creditCardNumber,
    ).type(cc_number);
    cy.getIFrameField(fields.creditCardExpIFrame, fields.creditCardExp).type(
      cc_exp,
    );
    cy.getIFrameField(fields.creditCardCvvIFrame, fields.creditCardCvv).type(
      cc_cid,
    );
  }
};

export function checkTermsAndConditions() {
  cy.get(fields.termsAndConditionsCheckbox).check({ force: true });
  cy.get(fields.termsAndConditionsCheckbox).should('be.checked');
}

export const fillGiftOptiosForm = (className, type = 'order') => {
  if (type === 'product') {
    cy.wait(3000);
    cy.get(className).contains('Gift options').click();
  }

  if (type === 'order') {
    cy.wait(3000);

    cy.get(`${className} ${fields.giftOptionCardIncludedCheckBox}`)
      .click({
        force: true,
      })
      .should('be.checked');
  }

  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionWrapCheckBox}`)
    .click({
      force: true,
    })
    .should('be.checked');

  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionRecipientName}`)
    .type('giftOptionRecipientName')
    .should('have.value', 'giftOptionRecipientName')
    .blur();
  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionSenderName}`)
    .type('giftOptionSenderName')
    .should('have.value', 'giftOptionSenderName')
    .blur();
  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionMessage}`)
    .type('giftOptionMessage')
    .should('have.value', 'giftOptionMessage')
    .blur(); // Added .blur() here
  cy.wait(4000);

  cy.get(className).contains('Customize').click();
  cy.get(`.cart-gift-options-view__modal-grid-item img`).eq(1).click();
  cy.contains('.dropin-button--primary', 'Apply').click();
};

export const fillGiftOptiosMessageForm = (className, type = 'order') => {
  cy.wait(2000);
  if (type === 'product') {
    cy.get(className).contains('Gift options').click();
  }

  cy.wait(2000);

  cy.get(`${className} ${fields.giftOptionRecipientName}`)
    .type('giftOptionRecipientName')
    .should('have.value', 'giftOptionRecipientName')
    .blur();
  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionSenderName}`)
    .type('giftOptionSenderName')
    .should('have.value', 'giftOptionSenderName')
    .blur();
  cy.wait(2000);
  cy.get(`${className} ${fields.giftOptionMessage}`)
    .type('giftOptionMessage')
    .should('have.value', 'giftOptionMessage')
    .blur(); // Added .blur() here
};

export const fillGiftOptiosFormEmpty = (className) => {
  cy.get(`${className} ${fields.giftOptionRecipientName}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();

  cy.get(`${className} ${fields.giftOptionSenderName}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();

  cy.get(`${className} ${fields.giftOptionMessage}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();
};

export const createAddress = (address, isValid = true) => {
  cy.get(fields.fieldUserFirstName).clear().type(address.firstName);
  cy.get(fields.fieldUserLastName).clear().type(address.lastName);
  cy.get(fields.fieldUserStreet).clear().type(address.street);
  cy.get(fields.fieldUserStreet2).clear().type(address.streetMultiline_2);
  cy.get(fields.fieldUserSelectCountry).select(address.countryCode);
  cy.get(fields.fieldUserTextRegion).clear().type(address.region);
  cy.get(fields.fieldUserCity).clear().type(address.city);
  cy.get(fields.fieldUserPhone).clear().type(address.telephone);
  cy.get(fields.fieldUserPostCode).clear().type(address.postcode);
  cy.get(fields.fieldUserVatId).clear().type(address.vatId);
  cy.get(fields.authFormUserCheckBoxShipping).then(($checkbox) => {
    $checkbox.prop('checked', address.defaultShipping);
  });
};

export const inputSearchString = (searchString) => {
  cy.get(fields.searchIcon).click();
  cy.get(fields.searchField).should('be.visible').type(searchString);
};
// Company Registration Actions
export const fillCompanyRegistrationForm = (companyData) => {
  cy.log(`📝 Fill company registration form: ${companyData.company.companyName}`);

  // Company Information
  cy.get(fields.companyFormCompanyName)
    .clear()
    .type(companyData.company.companyName)
    .blur();
  if (companyData.company.legalName) {
    cy.get(fields.companyFormLegalName)
      .clear()
      .type(companyData.company.legalName)
      .blur();
  }

  // Generate dynamic company email
  const companyTimestamp = Date.now();
  const companyRandom = Math.random().toString(36).substring(2, 8);
  const dynamicCompanyEmail = `company.${companyTimestamp}.${companyRandom}@example.com`;
  Cypress.env('currentTestCompanyEmail', dynamicCompanyEmail);
  cy.log(`📧 Company email: ${dynamicCompanyEmail}`);
  cy.get(fields.companyFormCompanyEmail)
    .clear()
    .type(dynamicCompanyEmail)
    .blur();

  if (companyData.company.vatTaxId) {
    cy.get(fields.companyFormVatTaxId)
      .clear()
      .type(companyData.company.vatTaxId)
      .blur();
  }
  if (companyData.company.resellerId) {
    cy.get(fields.companyFormResellerId)
      .clear()
      .type(companyData.company.resellerId)
      .blur();
  }

  // Legal Address
  // Select country FIRST so region field is properly configured (dropdown vs text input)
  cy.log(`🌍 Selecting country: ${companyData.legalAddress.countryCode}`);
  cy.get(fields.companyFormCountryCode).select(companyData.legalAddress.countryCode);
  cy.wait(1000); // Wait for region field to update based on country

  cy.get(fields.companyFormStreet)
    .clear()
    .type(companyData.legalAddress.street)
    .blur();
  if (companyData.legalAddress.streetLine2) {
    cy.get('body').then(($body) => {
      if ($body.find(fields.companyFormStreetLine2).length > 0) {
        cy.get(fields.companyFormStreetLine2)
          .clear()
          .type(companyData.legalAddress.streetLine2)
          .blur();
      }
    });
  }
  cy.get(fields.companyFormCity)
    .clear()
    .type(companyData.legalAddress.city)
    .blur();
  cy.get(fields.companyFormPostcode)
    .clear()
    .type(companyData.legalAddress.postcode)
    .blur();
  cy.get(fields.companyFormTelephone)
    .clear()
    .type(companyData.legalAddress.telephone)
    .blur();

  // USF-3439: Handle region field - dropdown for US, text input for UK
  // Only interact with region if a value is provided
  if (companyData.legalAddress.region) {
    cy.log(`📍 Setting region: ${companyData.legalAddress.region}`);
    cy.get('body').then(($body) => {
      if ($body.find(fields.companyFormRegion).length > 0) {
        // Region dropdown exists (e.g., US)
        cy.get(fields.companyFormRegion).select(companyData.legalAddress.region);
      } else if ($body.find(fields.companyFormRegionInput).length > 0) {
        // Region text input exists (e.g., UK)
        cy.get(fields.companyFormRegionInput)
          .clear()
          .type(companyData.legalAddress.region)
          .blur();
      }
    });
  } else {
    cy.log('📍 No region provided (optional for this country)');
  }

  // Company Administrator
  cy.get(fields.companyFormFirstName)
    .clear()
    .type(companyData.companyAdmin.firstName)
    .blur();
  cy.get(fields.companyFormLastName)
    .clear()
    .type(companyData.companyAdmin.lastName)
    .blur();

  // Generate dynamic admin email
  const adminTimestamp = Date.now();
  const adminRandom = Math.random().toString(36).substring(2, 8);
  const dynamicAdminEmail = `admin.${adminTimestamp}.${adminRandom}@example.com`;
  const adminName = `${companyData.companyAdmin.firstName} ${companyData.companyAdmin.lastName}`;
  Cypress.env('currentTestAdminEmail', dynamicAdminEmail);
  Cypress.env('currentTestAdminName', adminName);
  cy.log(`📧 Admin email: ${dynamicAdminEmail}`);
  cy.get(fields.companyFormAdminEmail)
    .clear()
    .type(dynamicAdminEmail)
    .blur();

  if (companyData.companyAdmin.jobTitle) {
    cy.get(fields.companyFormJobTitle)
      .clear()
      .type(companyData.companyAdmin.jobTitle)
      .blur();
  }
  if (companyData.companyAdmin.workTelephone) {
    cy.get(fields.companyFormWorkTelephone)
      .clear()
      .type(companyData.companyAdmin.workTelephone)
      .blur();
  }
  if (companyData.companyAdmin.gender) {
    cy.get(fields.companyFormAdminGender).select(companyData.companyAdmin.gender);
  }
  cy.log('✅ Form filled successfully');
};

export const submitCompanyRegistrationForm = () => {
  cy.get('button').contains('Register Company').click();
};

// Navigation Actions
export const openAccountDropdown = () => {
  cy.get('body').then(($body) => {
    if ($body.find(fields.navAccountDropdown).length > 0) {
      cy.get(fields.navAccountDropdown).click();
      cy.get(fields.navAccountMenu).should(
        'have.class',
        'nav-tools-panel--show',
      );
    } else {
      cy.logToTerminal(
        'Account dropdown button not found, skipping dropdown interaction',
      );
    }
  });
};

export const openAccountSection = () => {
  // Open the Account section in main navigation
  cy.get(fields.navAccountSection).click();
  cy.get(fields.navAccountSubmenu).should('be.visible');
};

export const navigateToCompanyRegistration = () => {
  openAccountSection();
  cy.get(fields.navAccountSubmenu)
    .find(fields.navCompanyRegistrationLinkMain)
    .click();
};

export const editProductOptions = (selectedOption, updateProductOptionTo) => {
  cy.contains('Edit').click();
  cy.get('.modal-content').should('be.visible');
  cy.get('select')
    .eq(1)
    .find('option:selected')
    .should('have.text', selectedOption);
  cy.get('.dropin-incrementer__increase-button').eq(1).click();
  cy.get('.dropin-incrementer__input').eq(1).should('have.value', '2');
  cy.get('select').eq(1).select(updateProductOptionTo);
  cy.get('select')
    .eq(1)
    .find('option:selected')
    .should('have.text', updateProductOptionTo);
  cy.contains('Update in Cart').should('be.visible').click();
};

export const typeInFieldBasedOnText = (textToSearch, enterInput) => {
  cy.contains(textToSearch).parent().find('input').type(enterInput);
};

// B2B Purchase Orders Actions
export const login = (user, urls) => {
  cy.visit(urls.login);
  cy.get(fields.poLoginForm).within(() => {
    cy.get(fields.poEmailInput).type(user.email);
    cy.wait(1500);
    cy.get(fields.poPasswordInput).type(user.password);
    cy.wait(1500);
    cy.get(fields.poSubmitButton).click();
    cy.wait(8000);
  });
  cy.url().should('include', urls.account);
  // Waiting for session and permissions to initialize
  cy.wait(3000);
};

export const logout = (texts) => {
  cy.get(fields.poNavDropdownButton).click();
  cy.contains(fields.poLogoutButton, texts.logout).click();
};

export const addProductToCart = (times = 1, isCheap = false, urls, texts) => {
  const productUrl = isCheap ? urls.cheapProduct : urls.product;
  cy.logToTerminal(`🔗 Navigating to product page: ${productUrl}`);
  cy.visit(productUrl);
  cy.wait(4000);
  for (let i = 0; i < times; i++) {
    cy.logToTerminal(`➕ Adding item ${i + 1}/${times} to cart`);
    cy.wait(4000);
    cy.contains(fields.poAddToCartButton, texts.addToCart).click();
    cy.wait(4000);
  }
};

export const proceedToCheckout = (texts, urls) => {
  cy.logToTerminal('🔗 Navigating to checkout page');
  cy.visit(urls.checkout);
  cy.wait(5000); // Increased wait for checkout page to initialize

  // Verify we're actually on checkout page
  cy.url().should('include', urls.checkout);
};

export const completeCheckout = (urls, texts) => {
  // Wait for checkout page to fully load
  cy.reload();
  cy.url().should('include', urls.checkout);
  cy.logToTerminal('⏳ Waiting for checkout data to load...');

  // Wait for checkout forms to be ready
  cy.wait(15000);

  const shippingFirstNameSelectors = [
    'input[name="firstName"]',
    'input[name="firstname"]',
    'input[name="shippingAddress.firstName"]',
  ];

  const shippingLastNameSelectors = [
    'input[name="lastName"]',
    'input[name="lastname"]',
    'input[name="shippingAddress.lastName"]',
  ];

  const shippingStreetSelectors = [
    'input[name="street"]',
    'input[name="street[0]"]',
    'input[name="shippingAddress.street"]',
    'input[name="shippingAddress.street[0]"]',
  ];

  const shippingCitySelectors = [
    'input[name="city"]',
    'input[name="shippingAddress.city"]',
  ];

  const shippingPostcodeSelectors = [
    'input[name="postcode"]',
    'input[name="postalCode"]',
    'input[name="shippingAddress.postcode"]',
    'input[name="shippingAddress.postalCode"]',
  ];

  const shippingTelephoneSelectors = [
    'input[name="telephone"]',
    'input[name="phone"]',
    'input[name="shippingAddress.telephone"]',
    'input[name="shippingAddress.phone"]',
  ];

  const shippingRegionSelectSelectors = [
    'select[name="region"]',
    'select[name="regionId"]',
    'select[name="region_id"]',
    'select[name="shippingAddress.regionId"]',
  ];

  const shippingRegionInputSelectors = [
    'input[name="region"]',
    'input[name="regionId"]',
    'input[name="shippingAddress.region"]',
    'input[name="shippingAddress.regionId"]',
  ];

  const paymentSectionSelectors = [
    '#checkout-payment-method-load',
    '.checkout-payment-method',
    '.payment-methods',
    '.checkout-payment-methods__method',
    '.dropin-toggle-button__actionButton',
    '.dropin-toggle-button__content',
    '.dropin-radio-button__input',
  ];

  const findFirstAvailableSelector = ($root, selectors) =>
    selectors.find((selector) => $root.find(selector).length);

  const typeIntoField = (selectors, value) => {
    const selectorQuery = selectors.join(', ');
    if (!selectorQuery) {
      return;
    }

    // Recursively wait for field to appear with retry logic
    const waitForField = (attempt = 0) => {
      cy.get('body').then(($body) => {
        const hasVisibleField = selectors.some(
          (selector) => $body.find(selector + ':visible').length > 0,
        );

        if (!hasVisibleField && attempt < 120) {
          cy.wait(500);
          return waitForField(attempt + 1);
        }

        if (!hasVisibleField) {
          throw new Error(
            `Timeout: Field not found after 60s - ${selectors[0]}`,
          );
        }
      });
    };

    waitForField();

    cy.get(selectorQuery, { timeout: 10000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .should('not.be.disabled')
      .clear({ force: true })
      .type(value, { force: true });
  };

  const ensurePaymentSectionVisible = () => {
    cy.get('body', { timeout: 60000 }).then(($body) => {
      const availableSelector = findFirstAvailableSelector(
        $body,
        paymentSectionSelectors,
      );

      if (availableSelector) {
        cy.get(availableSelector, { timeout: 60000 }).should(($elements) => {
          const visibleCount = $elements.filter(':visible').length;
          expect(
            visibleCount,
            `visible payment section for selector ${availableSelector}`,
          ).to.be.greaterThan(0);
        });
        return;
      }

      cy.contains(fields.poCheckMoneyOrderLabel, texts.checkMoneyOrder, {
        timeout: 60000,
      }).should('be.visible');
    });
  };

  const ensureShippingMethodSelected = () => {
    cy.document().then((doc) => {
      const $doc = Cypress.$(doc);
      const $shippingMethods = $doc
        .find('input[name="shipping_method"]')
        .filter(':visible');

      if ($shippingMethods.length) {
        const hasChecked = $shippingMethods.is(':checked');
        if (!hasChecked) {
          cy.wrap($shippingMethods.first()).check({ force: true });
        }
      }
    });
  };

  cy.logToTerminal('⏳ Waiting for shipping form to be ready...');

  // Wait until at least one shipping field is visible before proceeding
  const checkFormReady = (attempt = 0) => {
    cy.get('body').then(($body) => {
      const hasAnyField = shippingFirstNameSelectors.some(
        (selector) => $body.find(selector + ':visible').length > 0,
      );

      if (!hasAnyField && attempt < 60) {
        cy.wait(1000);
        return checkFormReady(attempt + 1);
      }

      if (!hasAnyField) {
        throw new Error('Checkout form did not load after 60 seconds');
      }

      cy.logToTerminal('✅ Shipping form is ready');
    });
  };

  checkFormReady();

  cy.logToTerminal('📝 Filling shipping address form');

  typeIntoField(shippingFirstNameSelectors, 'Test');
  typeIntoField(shippingLastNameSelectors, 'Test');
  typeIntoField(shippingStreetSelectors, 'Test');

  cy.get('body', { timeout: 60000 }).then(($body) => {
    const regionSelect = findFirstAvailableSelector(
      $body,
      shippingRegionSelectSelectors,
    );

    if (regionSelect) {
      cy.get(regionSelect, { timeout: 60000 })
        .filter(':visible')
        .first()
        .should('not.be.disabled')
        .select('Alabama', { force: true });
    } else {
      typeIntoField(shippingRegionInputSelectors, 'Alabama');
    }
  });

  typeIntoField(shippingCitySelectors, 'Test');
  typeIntoField(shippingPostcodeSelectors, '1235');
  typeIntoField(shippingTelephoneSelectors, '123456789');

  cy.wait(2000);
  ensureShippingMethodSelected();
  ensurePaymentSectionVisible();

  cy.contains(fields.poCheckMoneyOrderLabel, texts.checkMoneyOrder, {
    timeout: 60000,
  })
    .should('be.visible')
    .click();
  cy.wait(1500);
  cy.get('.checkout-terms-and-conditions__form')
    .find(fields.poTermsCheckbox)
    .check({ force: true });
  cy.wait(1500);

  cy.logToTerminal('🔘 Clicking Place Order button...');
  cy.get(fields.poPlacePOButton, { timeout: 60000 })
    .should('be.visible')
    .should('not.be.disabled')
    .click();
  cy.wait(3000);
  cy.logToTerminal('✅ Place Order button clicked');
};

export const verifyPOConfirmation = () => {
  cy.contains('Your Purchase Order request number is').should('be.visible');
  cy.get('.purchase-orders-confirmation-content__link')
    .should('exist')
    .and('be.visible');
  cy.contains('Continue shopping').should('exist').and('be.visible');
};

export const createPurchaseOrder = (
  itemCount = 2,
  isCheap = false,
  urls,
  texts,
) => {
  cy.logToTerminal('📦 Adding products to cart...');
  addProductToCart(itemCount, isCheap, urls, texts);
  cy.logToTerminal('✅ Products added to cart');

  cy.logToTerminal('🛒 Proceeding to checkout...');
  proceedToCheckout(texts, urls);
  cy.logToTerminal('✅ On checkout page');

  cy.logToTerminal('📝 Completing checkout...');
  completeCheckout(urls, texts);
  cy.logToTerminal('✅ Checkout completed');

  cy.logToTerminal('🔍 Verifying PO confirmation...');
  verifyPOConfirmation();
  cy.logToTerminal('✅ PO confirmed');
};

export const fillApprovalRuleForm = (rule, texts) => {
  cy.wait(3000);
  cy.get(fields.poStatusCheckbox).click({ force: true });
  cy.wait(1500);
  cy.get(fields.poNameInput).clear().type(rule.name);
  cy.wait(1500);
  cy.get(fields.poTextarea).clear().type(rule.description);
  cy.wait(1500);
  cy.contains(rule.appliesTo).click();
  cy.wait(1500);

  if (rule.appliesTo === texts.specificRoles && rule.role) {
    cy.get(fields.poMultiSelect).first().click();
    cy.wait(1500);
    cy.get(fields.poMultiSelect).first().contains(rule.role).click();
    cy.wait(1500);
    cy.get('body').type('{esc}');
    cy.wait(2500);
  }

  cy.get(fields.poRuleTypeSelect).select(rule.ruleType);
  cy.wait(1500);
  cy.get(fields.poRuleConditionSelect).select(rule.ruleCondition);
  cy.wait(1500);
  cy.get(fields.poRuleValueInput).clear().type(rule.ruleValue);
  cy.wait(1500);

  const multiSelectIndex = rule.appliesTo === texts.specificRoles ? 1 : 0;
  cy.get(fields.poMultiSelect).eq(multiSelectIndex).click();
  cy.wait(2500);
  cy.get(fields.poMultiSelect)
    .eq(multiSelectIndex)
    .contains(rule.approverRole)
    .click();
  cy.wait(2500);
  cy.get('body').type('{esc}');
  cy.wait(2500);
};

export const deleteApprovalRule = (ruleName) => {
  const getRowByName = (name) => {
    return cy.get(selectors.poTableRow).filter(`:has(:contains("${name}"))`);
  };

  getRowByName(ruleName).then(($row) => {
    cy.wrap($row).within(() => {
      cy.contains('button', 'Show').click();
    });
  });

  cy.wait(2000);

  cy.contains('button', 'Delete').click();

  cy.wait(10000);

  getRowByName(ruleName).should('not.exist');

  cy.wait(5000);
};
