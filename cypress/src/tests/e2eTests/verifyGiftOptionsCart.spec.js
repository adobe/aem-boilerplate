/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/

import {
  assertGiftOptionsSummary,
  assertGiftOptionsEmptyForm,
  assertGiftOptionsReadOnlyFormView,
} from '../../assertions';
import {
  fillGiftOptiosForm,
  fillGiftOptiosFormEmpty,
  fillGiftOptiosMessageForm,
} from '../../actions';
import * as fields from '../../fields';

describe('Verify price summary on cart', () => {
  it('Validate GiftOptions in Summary with All Configs Enabled', () => {
    cy.visit('/products/crown-summit-backpack/24-MB03');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');

    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    fillGiftOptiosForm(orderClassName);

    cy.wait(3000);

    const itemsClassName =
      '.cart-gift-options-view.cart-gift-options-view--product';
    cy.get(itemsClassName).should('exist').should('be.visible');
    fillGiftOptiosForm(itemsClassName, 'product');

    assertGiftOptionsSummary('Printed card', 'excluding taxes', '$100.00');
    assertGiftOptionsSummary(
      'Item gift wrapping',
      'excluding taxes',
      '$100.00'
    );
    assertGiftOptionsSummary(
      'Order gift wrapping',
      'excluding taxes',
      '$30.00'
    );
  });

  it('Validate GiftOptions in Summary (No Gift Message, Fixed Giftwrap Price)', () => {
    cy.visit('/products/affirm-water-bottle/24-UG06');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');

    const itemsClassName = '.cart-gift-options-view--product';
    cy.get(itemsClassName).should('exist').should('be.visible');

    cy.get(itemsClassName)
      .contains('Gift options')
      .should('be.visible')
      .click({ force: true });
    cy.wait(2000);

    cy.get(`${itemsClassName} .dropin-checkbox`)
      .should('be.visible')
      .click({ force: true });

    cy.wait(2000);

    assertGiftOptionsSummary('Item gift wrapping', 'excluding taxes', '$33.29');
  });

  it('Validate GiftOptions in Summary (Gift Message, No Giftwrap)', () => {
    cy.visit('/products/rival-field-messenger/24-MB06');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');

    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');

    fillGiftOptiosMessageForm(orderClassName);

    cy.wait(2000);

    const itemsClassName = '.cart-gift-options-view--product';
    cy.get(itemsClassName).should('exist').should('be.visible');

    fillGiftOptiosMessageForm(itemsClassName, 'product');
  });

  it('Validate GiftOptions message if all fields is empty', () => {
    cy.visit('/products/crown-summit-backpack/24-MB03');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');

    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    fillGiftOptiosFormEmpty(orderClassName);
    assertGiftOptionsEmptyForm(orderClassName);

    cy.wait(2000);

    const itemsClassName =
      '.cart-gift-options-view.cart-gift-options-view--product';
    cy.get(itemsClassName).should('exist').should('be.visible');
    cy.get(itemsClassName).contains('Gift options').click();
    fillGiftOptiosFormEmpty(itemsClassName);
    assertGiftOptionsEmptyForm(itemsClassName);
  });

  it('Validate GiftOptions giftReceiptIncluded is checked', () => {
    cy.visit('/products/affirm-water-bottle/24-UG06');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');

    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    cy.get(`${orderClassName} ${fields.giftOptionGiftReceiptIncluded}`)
      .click({
        force: true,
      })
      .should('be.checked');
  });

  it('Validate GiftOptions giftReceiptIncluded is checked', () => {
    cy.visit('/products/affirm-water-bottle/24-UG06');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');
    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    cy.get(`${orderClassName} ${fields.giftOptionGiftReceiptIncluded}`)
      .click({
        force: true,
      })
      .should('be.checked');
  });

  it('Validate GiftOptions changed printed card price is checked (New value and new currency)', () => {
    const urlTest = 'https://mcstaging.aemshop.net/**';

    cy.visit('/products/affirm-water-bottle/24-UG06');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();

    cy.intercept('GET', urlTest, (req) => {
      let data = req.url;
      if (data && typeof data == 'string') {
        if (data.includes('STORE_CONFIG_QUERY')) {
          req.reply({
            statusCode: 200,
            fixture: 'storeConfigGiftOptions.json',
          });
          req.alias = 'getStoreConfig';
        }
      }
    });
    cy.wait(3000);
    cy.visit('/cart');

    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    cy.get(`${orderClassName} .dropin-price--normal`)
      .contains('€355.00')
      .should('be.visible');
  });

  it('Verify readonly GiftOptions', () => {
    cy.visit('/products/crown-summit-backpack/24-MB03');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');

    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    const orderClassName = '.cart-gift-options-view--order';
    cy.get(orderClassName).should('exist').should('be.visible');
    fillGiftOptiosForm(orderClassName);

    cy.wait(3000);

    const itemsClassName =
      '.cart-gift-options-view.cart-gift-options-view--product';
    cy.get(itemsClassName).should('exist').should('be.visible');
    fillGiftOptiosForm(itemsClassName, 'product');

    assertGiftOptionsSummary('Printed card', 'excluding taxes', '$100.00');
    assertGiftOptionsSummary(
      'Item gift wrapping',
      'excluding taxes',
      '$100.00'
    );
    assertGiftOptionsSummary(
      'Order gift wrapping',
      'excluding taxes',
      '$30.00'
    );

    cy.wait(3000);
    cy.get(`${orderClassName} ${fields.giftOptionGiftReceiptIncluded}`)
      .click({
        force: true,
      })
      .should('be.checked');
    cy.wait(3000);

    cy.visit('/checkout');

    cy.wait(3000);

    assertGiftOptionsReadOnlyFormView();
  });
});
