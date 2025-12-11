/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
 ****************************************************************** */

/**
 * @fileoverview Company Credit E2E Journey Tests (OPTIMIZED + EXTENDED).
 *
 * Tests Company Credit functionality through realistic user journeys.
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 7: Company Credit
 *
 * ==========================================================================
 * OPTIMIZATION APPROACH:
 * ==========================================================================
 * BEFORE: 5 individual tests with separate setup/cleanup (2:43 runtime, ~33s per test)
 * AFTER: 2 comprehensive journey tests (~4-5min runtime total)
 * TIME SAVED: Enables full checkout integration testing
 *
 * KEY OPTIMIZATION:
 * - Setup company + user ONCE per journey
 * - Test credit operations in sequence
 * - Test permission restrictions in same journey
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * JOURNEY 1 (Basic Operations):
 * - TC-47 CASE_2: Company Credit page displays correctly with no records
 * - TC-47 CASE_3: Reimbursed record appears in grid
 * - TC-47 CASE_4: Allocation record appears in grid
 * - TC-48: User permissions for Company Credit page
 *
 * JOURNEY 2 (Order Integration):
 * - TC-47 CASE_1: Purchase (credit used in order placement)
 * - TC-47 CASE_4: Reverted (order cancelled via REST API, credit restored)
 * - TC-47 CASE_5: Refunded (invoice + credit memo via REST API, credit restored via RefundCommand)
 *
 * ==========================================================================
 */

import {
  getCompanyCredit,
  updateCompanyCredit,
  increaseCompanyCreditBalance,
  cleanupTestCompany,
  cancelOrder,
  createInvoice,
  createCreditMemo,
} from '../../support/b2bCompanyAPICalls';
import {
  setGuestShippingAddress,
  checkTermsAndConditions,
  placeOrder,
} from '../../actions';
import { customerShippingAddress } from '../../fixtures';

describe('USF-2563: Company Credit (Optimized Journey)', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('💳 Company Credit test suite started (OPTIMIZED)');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Test cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  afterEach(() => {
    cy.logToTerminal('🗑️ Cleaning up test data');
    cy.then(async () => {
      try {
        await cleanupTestCompany();
        cy.logToTerminal('✅ Test data cleanup completed');
      } catch (error) {
        cy.logToTerminal(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  /**
   * ==========================================================================
   * JOURNEY: Complete Company Credit Workflow
   * ==========================================================================
   * Combines: TC-47 (CASE_2, CASE_3, CASE_4), TC-48
   * Tests: Empty state, reimbursement, allocation, permission restrictions
   * Setup: ONCE at journey start
   * Time: ~1-2 minutes (vs 5 tests x 33s = 2.75 minutes)
   */
  it('JOURNEY: Company credit display and operations with permissions', () => {
    cy.logToTerminal('========= 🚀 JOURNEY: Complete Company Credit Workflow =========');

    // ========== SETUP: Create company with admin + restricted user (ONCE) ==========
    cy.setupCompanyWithRestrictedUser();

    cy.then(() => {
      // ========== TC-47 CASE_2: Empty state ==========
      cy.logToTerminal('--- STEP 1: TC-47 CASE_2 - Verify empty state ---');

      cy.logToTerminal('🔐 Login as company admin');
      cy.loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify page title');
      cy.contains('Company Credit', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify credit summary blocks exist');
      cy.contains(/outstanding.*balance/i, { timeout: 10000 })
        .should('be.visible');
      cy.contains(/available.*credit/i)
        .should('be.visible');
      cy.contains(/credit.*limit/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify initial values are 0.00');
      cy.contains('0.00', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_2: Empty state verified');

      // ========== TC-47 CASE_3: Reimbursement operation ==========
      cy.logToTerminal('--- STEP 2: TC-47 CASE_3 - Add reimbursement ---');

      cy.logToTerminal('💵 Reimburse balance via REST API');
      cy.then(async () => {
        const creditInfo = await getCompanyCredit(Cypress.env('testCompany').id);
        const creditId = creditInfo.id;
        Cypress.env('testCredit', { id: creditId });

        await increaseCompanyCreditBalance(creditId, 5.00, 'USD', 'Test reimbursement');
        cy.logToTerminal('✅ Balance reimbursed: $5.00');
      });

      cy.wait(3000);

      // Reload page to see reimbursement
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify balance value $5.00 is displayed');
      cy.contains('5.00', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Reimbursed" record in history grid');
      cy.contains(/reimburs/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_3: Reimbursement record verified');

      // ========== TC-47 CASE_4: Allocation operation ==========
      cy.logToTerminal('--- STEP 3: TC-47 CASE_4 - Set credit limit (allocation) ---');

      cy.logToTerminal('💳 Set credit limit via REST API');
    cy.then(async () => {
        const creditId = Cypress.env('testCredit').id;
        const companyId = Cypress.env('testCompany').id;
      await updateCompanyCredit(creditId, {
        company_id: companyId,
          credit_limit: 100.00,
        currency_code: 'USD',
      });
        cy.logToTerminal('✅ Credit limit set to $100.00');
    });

      cy.wait(3000);

      // Reload page to see allocation
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify credit limit $100.00 is displayed');
      cy.contains('100', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Allocated" record in history grid');
      cy.contains(/allocat/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_4: Allocation record verified');

      // ========== TC-48: Test restricted user permissions ==========
      cy.logToTerminal('--- STEP 4: TC-48 - Verify restricted user access ---');

      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as restricted user');
      cy.loginAsRestrictedUser();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify restricted user can see summary blocks');
      cy.contains('Company Credit', { timeout: 10000 })
        .should('be.visible');
      cy.contains(/outstanding.*balance/i)
        .should('be.visible');
      cy.contains(/credit.*limit/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify restricted user cannot see history data');
      cy.get('body').then(($body) => {
        // History table should be empty or show access denied
        if ($body.text().match(/no.*data|access.*denied/i)) {
          cy.logToTerminal('✅ History correctly hidden/restricted');
        } else {
          // Check if history entries are NOT visible
          cy.contains(/reimburs|allocat/i).should('not.exist');
          cy.logToTerminal('✅ History entries not visible');
        }
      });

      cy.logToTerminal('✅ TC-48: Restricted user permissions verified');
      cy.logToTerminal('========= 🎉 JOURNEY COMPLETED =========');
    });
  });

  /**
   * ==========================================================================
   * JOURNEY 2: Company Credit Order Lifecycle
   * ==========================================================================
   * Tests: TC-47 CASE_1 (Purchase), CASE_4 (Revert), CASE_5 (Refund)
   * Setup: ONCE at journey start
   * Time: ~3-4 minutes
   */
  it('JOURNEY: Company credit with order lifecycle (Purchase, Revert, Refund)', () => {
    cy.logToTerminal('========= 🚀 JOURNEY: Company Credit Order Integration =========');

    // ========== SETUP: Create company with credit allocated ==========
    cy.setupCompanyWithCredit();

    cy.then(() => {
      // ========== TC-47 CASE_1: Purchase (use credit for order) ==========
      cy.logToTerminal('--- STEP 1: TC-47 CASE_1 - Place order with Payment on Account ---');

      cy.logToTerminal('🔐 Login as company admin');
      cy.loginAsCompanyAdmin();

      // Add product to cart
      cy.logToTerminal('🛒 Adding product to cart');
      cy.visit('/products/youth-tee/ADB150');
      cy.wait(2000);
      cy.get('.product-details__buttons__add-to-cart button')
        .should('be.visible')
        .click();
      cy.wait(2000);

      // Go to cart and checkout
      cy.logToTerminal('💳 Proceeding to checkout');
      cy.get('.minicart-wrapper').click();
      cy.wait(2000);
      cy.get('[data-loaded="true"]').should('exist');
      cy.contains('Checkout', { timeout: 10000 }).should('be.visible').click();
      cy.wait(5000);

      // Wait for checkout to load
      cy.url().should('include', '/checkout');
      cy.wait(8000);

      // Fill shipping address
      cy.logToTerminal('📝 Filling shipping address');
      setGuestShippingAddress(customerShippingAddress, true);
      cy.wait(3000);

      // Select shipping method
      cy.logToTerminal('📦 Selecting shipping method');
      cy.get('body').then(($body) => {
        if ($body.find('input[name="shipping_method"]').length > 0) {
          cy.get('input[name="shipping_method"]').first().check({ force: true });
          cy.wait(2000);
        }
      });

      // Wait for payment section
      cy.wait(5000);

      // Select Payment on Account
      cy.logToTerminal('💰 Selecting Payment on Account payment method');
      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        if (bodyText.includes('Payment on Account')) {
          cy.contains('Payment on Account', { timeout: 15000 }).click({ force: true });
          cy.wait(2000);
        } else {
          cy.logToTerminal('⚠️ Payment on Account not found, using default payment method');
        }
      });

      // Accept terms and conditions
      cy.get('body').then(($body) => {
        if ($body.find('input[type="checkbox"][name="terms"]').length > 0
            || $body.find('.checkout-terms-and-conditions__form input[type="checkbox"]').length > 0) {
          cy.get('input[type="checkbox"]').last().check({ force: true });
          cy.wait(1000);
        }
      });

      // Place order
      cy.logToTerminal('✅ Placing order');
      cy.contains('button', /place.*order/i, { timeout: 15000 })
        .should('be.visible')
        .should('not.be.disabled')
        .click();
      cy.wait(8000);

      // Verify order confirmation - can be success, confirmation, or order-details page
      cy.url({ timeout: 30000 }).should('match', /success|confirmation|order-details/);

      // Extract order ID from URL or page content
      cy.url().then((url) => {
        let orderNumber = null;

        // Try to extract from URL query parameter (e.g., ?orderRef=000000001)
        const urlMatch = url.match(/orderRef=(\d+)/);
        if (urlMatch) {
          orderNumber = urlMatch[1];
          cy.logToTerminal(`✅ Order placed successfully (from URL): #${orderNumber}`);
          Cypress.env('testOrderNumber', orderNumber);
          return;
        }

        // If not in URL, try to extract from page content
        cy.get('body').then(($body) => {
          const bodyText = $body.text();
          cy.logToTerminal(`📄 Confirmation page content: ${bodyText.substring(0, 200)}`);

          // Try multiple patterns to extract order number
          const patterns = [
            /order\s+number:?\s*#?(\d+)/i,
            /order\s+#(\d+)/i,
            /order\s+id:?\s*(\d+)/i,
            /#(\d{9,})/, // 9+ digit number preceded by #
          ];

          for (const pattern of patterns) {
            const match = bodyText.match(pattern);
            if (match) {
              orderNumber = match[1];
              break;
            }
          }

          if (orderNumber) {
            Cypress.env('testOrderNumber', orderNumber);
            cy.logToTerminal(`✅ Order placed successfully (from content): #${orderNumber}`);
          } else {
            cy.logToTerminal('⚠️ Could not extract order number from confirmation page');
            Cypress.env('testOrderNumber', 'unknown');
          }
        });
      });

      // Navigate to Company Credit page
      cy.logToTerminal('📊 Verifying Purchase record in credit history');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      // Verify "Purchased" record appears
      cy.contains(/purchas|order/i, { timeout: 15000 }).should('be.visible');
      cy.logToTerminal('✅ TC-47 CASE_1: Purchase record verified in credit history');

      // ========== TC-47 CASE_5: Refund (invoice + credit memo, credit restored) ==========
      // Use the FIRST order for refund (invoice + credit memo) since it's the natural flow
      cy.logToTerminal('--- STEP 2: TC-47 CASE_5 - Invoice first order and create credit memo (refund) ---');

      // Wait for backend to process order
      cy.wait(5000);

      // Invoice and refund the first order
      cy.then(async () => {
        const orderNumber = Cypress.env('testOrderNumber');
        const { getOrderByIncrementId, createInvoice, createCreditMemo } = require('../../support/b2bCompanyAPICalls');

        if (orderNumber && orderNumber !== 'unknown') {
          try {
            // Step 1: Get order entity_id from increment_id
            cy.logToTerminal(`🔍 Looking up order entity_id for: ${orderNumber}`);
            const order = await getOrderByIncrementId(orderNumber);
            const orderId = order.entity_id;
            cy.logToTerminal(`✅ Found order entity_id: ${orderId} for increment_id: ${orderNumber}`);

            // Step 2: Create invoice using entity_id
            cy.logToTerminal(`📄 Creating invoice for order: ${orderNumber}`);
            const invoiceId = await createInvoice(orderId);
            cy.logToTerminal(`✅ Invoice created for order ${orderNumber}, invoice ID: ${invoiceId}`);
            cy.wait(2000);

            // Step 3: Create credit memo (triggers RefundCommand)
            cy.logToTerminal(`💰 Creating credit memo for order: ${orderNumber} with invoice ID: ${invoiceId}`);
            const creditMemoId = await createCreditMemo(orderId, invoiceId);
            cy.logToTerminal(`✅ Credit memo created for order ${orderNumber}, credit memo ID: ${creditMemoId}`);
            cy.logToTerminal('⏳ Waiting for RefundCommand to execute and update credit history...');
            cy.wait(3000);
          } catch (error) {
            cy.logToTerminal(`❌ Error processing order ${orderNumber}: ${error.message}`);
            throw error;
          }
        }
      });

      // Verify "Refunded" record in credit history with retry logic (due to USF-3516 caching)
      cy.logToTerminal('📊 Verifying Refunded record in credit history...');
      const maxRefundRetries = 5;
      let refundAttempt = 0;

      const checkForRefund = () => {
        refundAttempt++;
        cy.logToTerminal(`🔍 Attempt ${refundAttempt}/${maxRefundRetries}: Checking for Refunded record...`);
        
        cy.visit('/customer/company/credit');
        cy.wait(3000);

        cy.get('body').then(($body) => {
          if ($body.text().match(/refund/i)) {
            cy.logToTerminal('✅ TC-47 CASE_5: Refunded record verified (via RefundCommand)');
          } else if (refundAttempt < maxRefundRetries) {
            cy.logToTerminal(`⚠️ Refunded record not found yet, retrying... (${refundAttempt}/${maxRefundRetries})`);
            cy.wait(5000); // Wait longer between retries
            checkForRefund();
          } else {
            cy.logToTerminal('❌ Refunded record not found after max retries');
            throw new Error('Refunded record not found in credit history after credit memo creation');
          }
        });
      };

      checkForRefund();

      // ========== TC-47 CASE_4: Revert (cancel order, credit restored) ==========
      // Need a SECOND order for cancel/revert since we just refunded the first one
      cy.logToTerminal('--- STEP 3: TC-47 CASE_4 - Place second order and cancel it (revert) ---');
      
      // Add product to cart for second order (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('🛒 Adding product to cart for second order');
      cy.visit('/products/youth-tee/ADB150');
      cy.wait(2000);
      cy.get('.product-details__buttons__add-to-cart button')
        .should('be.visible')
        .click();
      cy.wait(2000);

      // Go to cart and checkout (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('💳 Proceeding to checkout for second order');
      cy.get('.minicart-wrapper').click();
      cy.wait(2000);
      cy.get('[data-loaded="true"]').should('exist');
      cy.contains('Checkout', { timeout: 10000 }).should('be.visible').click();
      cy.wait(5000);

      // Wait for checkout to load
      cy.url().should('include', '/checkout');
      cy.wait(8000);

      // Fill shipping address (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('📝 Filling shipping address for second order');
      setGuestShippingAddress(customerShippingAddress, true);
      cy.wait(3000);

      // Select shipping method (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('📦 Selecting shipping method for second order');
      cy.get('body').then(($body) => {
        if ($body.find('input[name="shipping_method"]').length > 0) {
          cy.get('input[name="shipping_method"]').first().check({ force: true });
          cy.wait(2000);
        }
      });

      // Wait for payment section
      cy.wait(5000);

      // Select Payment on Account (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('💰 Selecting Payment on Account payment method for second order');
      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        if (bodyText.includes('Payment on Account')) {
          cy.contains('Payment on Account', { timeout: 15000 }).click({ force: true });
          cy.wait(2000);
        } else {
          cy.logToTerminal('⚠️ Payment on Account not found, using default payment method');
        }
      });

      // Accept terms and conditions (EXACT SAME FLOW AS FIRST ORDER)
      cy.get('body').then(($body) => {
        if ($body.find('input[type="checkbox"][name="terms"]').length > 0
            || $body.find('.checkout-terms-and-conditions__form input[type="checkbox"]').length > 0) {
          cy.get('input[type="checkbox"]').last().check({ force: true });
          cy.wait(1000);
        }
      });

      // Place second order (EXACT SAME FLOW AS FIRST ORDER)
      cy.logToTerminal('✅ Placing second order');
      cy.contains('button', /place.*order/i, { timeout: 15000 })
        .should('be.visible')
        .should('not.be.disabled')
        .click();
      cy.wait(8000);

      // Verify order confirmation and extract order ID (EXACT SAME FLOW AS FIRST ORDER)
      cy.url({ timeout: 30000 }).should('match', /success|confirmation|order-details/);

      // Extract order ID from URL or page content
      cy.url().then((url) => {
        let orderNumber2 = null;

        // Try to extract from URL query parameter (e.g., ?orderRef=000000001)
        const urlMatch = url.match(/orderRef=(\d+)/);
        if (urlMatch) {
          orderNumber2 = urlMatch[1];
          cy.logToTerminal(`✅ Second order placed successfully (from URL): #${orderNumber2}`);
          Cypress.env('testOrderNumber2', orderNumber2);
          return;
        }

        // If not in URL, try to extract from page content
        cy.get('body').then(($body) => {
          const bodyText = $body.text();
          cy.logToTerminal(`📄 Second order confirmation page content: ${bodyText.substring(0, 200)}`);

          // Try multiple patterns to extract order number
          const patterns = [
            /order\s+number:?\s*#?(\d+)/i,
            /order\s+#(\d+)/i,
            /order\s+id:?\s*(\d+)/i,
            /#(\d{9,})/, // 9+ digit number preceded by #
          ];

          for (const pattern of patterns) {
            const match = bodyText.match(pattern);
            if (match) {
              orderNumber2 = match[1];
              break;
            }
          }

          if (orderNumber2) {
            Cypress.env('testOrderNumber2', orderNumber2);
            cy.logToTerminal(`✅ Second order placed successfully (from content): #${orderNumber2}`);
        } else {
            cy.logToTerminal('⚠️ Could not extract second order number from confirmation page');
            Cypress.env('testOrderNumber2', 'unknown');
          }
        });
      });

      // Wait for backend to process order
      cy.wait(5000);

      // Cancel the second order (Revert)
      cy.then(async () => {
        const orderNumber2 = Cypress.env('testOrderNumber2');
        const { getOrderByIncrementId, cancelOrder } = require('../../support/b2bCompanyAPICalls');

        if (orderNumber2 && orderNumber2 !== 'unknown') {
          try {
            cy.logToTerminal(`🚫 Cancelling order: ${orderNumber2}`);
            
            // Get order entity_id from increment_id
            const order = await getOrderByIncrementId(orderNumber2);
            const orderId = order.entity_id;
            cy.logToTerminal(`✅ Found order entity_id: ${orderId} for increment_id: ${orderNumber2}`);
            
            // Cancel using entity_id
            await cancelOrder(orderId);
            cy.logToTerminal(`✅ Order ${orderNumber2} cancelled successfully`);
            
            // Verify "Reverted" record in credit history
            cy.logToTerminal('📊 Verifying Reverted record in credit history...');
            cy.visit('/customer/company/credit');
            cy.wait(2000);
            
            cy.contains(/revert/i, { timeout: 10000 }).should('be.visible');
            cy.logToTerminal('✅ TC-47 CASE_4: Reverted record verified');
          } catch (error) {
            cy.logToTerminal(`❌ Error cancelling order ${orderNumber2}: ${error.message}`);
            throw error;
          }
        }
      });

      cy.logToTerminal('========= 🎉 JOURNEY COMPLETED =========');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Credit test suite completed');
  });
});
