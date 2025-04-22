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

import * as fields from '../../fields/index';

describe('Verify price summary on cart', () => {
  beforeEach(() => {
    cy.visit('/products/crown-summit-backpack/24-MB03');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.wait(3000);
    cy.visit('/cart');
  });

  it('Verify applied gift code', () => {
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains('Gift Card')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should('be.visible')
      .type('01XI83CYG8HW');

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.get(`.cart-coupons.cart-gift-cards .coupon-code-form__applied`)
      .contains(/01XI83CYG8HW/i)
      .should('be.visible');

    cy.get('.cart-order-summary__coupon__code span')
      .contains(/01XI83CYG8HW/i)
      .should('be.visible');
  });

  it('Verify applied gift codes', () => {
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains('Gift Card')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should('be.visible')
      .type('02OXAVEIIHK5');

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should('be.visible')
      .type('05KEO44BIA93');

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.get(`.cart-coupons.cart-gift-cards .coupon-code-form__applied`)
      .contains(/02OXAVEIIHK5/i)
      .should('be.visible');

    cy.get(`.cart-coupons.cart-gift-cards .coupon-code-form__applied`)
      .contains(/05KEO44BIA93/i)
      .should('be.visible');

    cy.get('.coupon-code-form__applied').children().should('have.length', 2);

    cy.get('.cart-order-summary__coupon__code span')
      .contains(/02OXAVEIIHK5/i)
      .should('be.visible');

    cy.get('.cart-order-summary__coupon__code span')
      .contains(/05KEO44BIA93/i)
      .should('be.visible');
  });

  it('Verify removed gif code', () => {
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains('Gift Card')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should('be.visible')
      .type('01XI83CYG8HW');

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.get(`.cart-coupons.cart-gift-cards .coupon-code-form__applied`)
      .contains(/01XI83CYG8HW/i)
      .should('be.visible');

    cy.get(`.dropin-tag-container.coupon-code-form__applied-item button`)
      .should('be.visible')
      .click({ multiple: true });

    cy.get('.coupon-code-form__applied').children().should('have.length', 0);

    cy.get('.cart-order-summary__coupon__code span').should('not.exist');
  });

  it('Verify apply empty code', () => {
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains('Gift Card')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.get(`.coupon-code-form__error`).contains(
      'Please enter a gift card code.'
    );
  });

  it('Verify apply broken gift code', () => {
    cy.get(fields.orderSummary).contains('Order Summary').should('be.visible');
    cy.get(`.cart-coupons.cart-gift-cards`)
      .contains('Gift Card')
      .should('be.visible')
      .click({ multiple: true });

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards ${fields.giftCardField}`)
      .should('be.visible')
      .type('101OLEF0QJQUN');

    cy.wait(2000);

    cy.get(`.cart-coupons.cart-gift-cards button`)
      .contains('Apply')
      .should('be.visible')
      .click({ multiple: true });

    cy.get(`.coupon-code-form__error`).contains(
      'No such entity'
    );
  });
});
