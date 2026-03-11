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
import * as fields from '../../fields';

/**
 * @fileoverview B2B Quick Order E2E Tests
 *
 * Tests the Quick Order functionality through realistic user workflows,
 * covering the main features and use cases.
 *
 * ==========================================================================
 * COVERAGE:
 * ==========================================================================
 * - Component initialization and rendering
 * - Multiple SKU input workflow
 * - CSV upload workflow with validation
 * - Product search and selection
 * - Configurable products with options
 * - Mixed input methods workflow
 * - Add to cart workflow and mini cart verification
 *
 * ==========================================================================
 * TEST CONFIGURATION:
 * ==========================================================================
 * See constants below for all hardcoded test dependencies:
 * - Product SKUs, URLs, file paths, etc.
 * - All configuration is centralized for easy maintenance
 *
 * ==========================================================================
 */

// ==========================================================================
// TEST CONFIGURATION CONSTANTS
// ==========================================================================
const QUICK_ORDER_PAGE_URL = '/quick-order';
const CART_PAGE_URL = '/cart';

const TEST_SIMPLE_PRODUCT_1_SKU = 'ADB127';
const TEST_SIMPLE_PRODUCT_2_SKU = 'ADB336';
const TEST_CONFIGURABLE_PRODUCT_SKU = 'CYPRESS456';

const CSV_INVALID_FILE_PATH = 'src/fixtures/quick-order-invalid-file.txt';
const CSV_VALID_FILE_PATH = 'src/fixtures/quick-order-valid-file.csv';

describe('B2B Quick Order - E2E Tests', { tags: '@B2BSaas' }, () => {
  before(() => {
    cy.logToTerminal('🛒 B2B Quick Order test suite started');
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit(QUICK_ORDER_PAGE_URL, {
      failOnStatusCode: false,
      timeout: 30000,
    });

    cy.wait(2000);

    cy.get(fields.quickOrderItemsContainer, { timeout: 10000 }).should(
      'be.visible',
    );
    cy.get(fields.quickOrderMultipleSkuContainer, { timeout: 10000 }).should(
      'be.visible',
    );
    cy.get(fields.quickOrderCsvUploadContainer, { timeout: 10000 }).should(
      'be.visible',
    );
  });

  after(() => {
    cy.logToTerminal('🏁 B2B Quick Order test suite completed');
  });

  it('Should render components and handle multiple SKU workflow', () => {
    cy.logToTerminal(
      '========= 🚀 TEST 1: Component Rendering and Multiple SKU Workflow =========',
    );

    // ========== STEP 1: Verify all components render ==========

    cy.get(fields.quickOrderItemsContainer)
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="quick-order-items"]').should('exist');
      });

    cy.get(fields.quickOrderMultipleSkuContainer)
      .should('be.visible')
      .within(() => {
        cy.get('.b2b-quick-order-quick-order-multiple-sku').should('exist');
        cy.get(fields.quickOrderMultipleSkuTextarea)
          .should('exist')
          .and('be.visible');
      });

    cy.get(fields.quickOrderCsvUploadContainer)
      .should('be.visible')
      .within(() => {
        cy.get('.b2b-quick-order-quick-order-upload-csv').should('exist');
        cy.get(fields.quickOrderCsvFileInput).should('exist');
      });

    // ========== STEP 2: Add items via Multiple SKU ==========

    const skuText = `${TEST_SIMPLE_PRODUCT_1_SKU} ${TEST_SIMPLE_PRODUCT_2_SKU}`;

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.quickOrderMultipleSkuTextarea).clear().type(skuText);
      cy.contains('button', 'Add to List').click();
    });

    cy.wait(2000);

    // ========== STEP 3: Verify items in list ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard).should('have.length', 2);
    });

    // ========== STEP 4: Update quantity ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard)
        .first()
        .find(fields.quickOrderItemQuantityInput)
        .clear({ force: true })
        .type('5', { force: true });
    });
    cy.wait(500);

    // ========== STEP 5: Add to cart ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderAddAllToCartButton)
        .should('not.be.disabled')
        .click();
    });
    cy.wait(2000);

    // ========== STEP 6: Verify redirect to cart ==========

    cy.url().should('include', CART_PAGE_URL);

    // Return to quick order page for next test
    cy.visit(QUICK_ORDER_PAGE_URL);
    cy.wait(2000);

    cy.logToTerminal('✅ TEST 1 PASSED: Items added to cart successfully');
  });

  it('Should handle CSV upload workflow and validation', () => {
    cy.logToTerminal(
      '========= 🚀 TEST 2: CSV Upload Workflow and Validation =========',
    );

    // Check initial state - should be empty
    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get('[data-testid="empty-items"]').should('exist');
    });

    // ========== STEP 1: Test invalid file format ==========
    cy.get(fields.quickOrderCsvUploadContainer).within(() => {
      cy.get(fields.quickOrderCsvFileInput).selectFile(CSV_INVALID_FILE_PATH, {
        force: true,
      });
    });
    cy.wait(1000);

    cy.get(fields.quickOrderCsvErrorMessage).should('exist');

    // ========== STEP 2: Upload valid CSV ==========
    cy.get(fields.quickOrderCsvUploadContainer).within(() => {
      cy.get(fields.quickOrderCsvFileInput).selectFile(CSV_VALID_FILE_PATH, {
        force: true,
      });
    });

    cy.wait(5000);

    // ========== STEP 3: Verify CSV items added ==========

    cy.get(fields.quickOrderItemsContainer, { timeout: 20000 }).within(() => {
      cy.get(fields.quickOrderItemCard, { timeout: 20000 })
        .should('have.length.greaterThan', 0)
        .and('have.length', 3);
    });

    // ========== STEP 4: Remove one item and add to cart ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard)
        .last()
        .find(fields.quickOrderItemRemoveButton)
        .click();
    });
    cy.wait(500);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard).should('have.length', 2);
      cy.get(fields.quickOrderAddAllToCartButton).click();
    });
    cy.wait(2000);

    // ========== STEP 5: Verify redirect to cart ==========

    cy.url().should('include', CART_PAGE_URL);

    // Return to quick order page for next test
    cy.visit(QUICK_ORDER_PAGE_URL);
    cy.wait(2000);

    cy.logToTerminal('✅ TEST 2 PASSED: CSV workflow successful');
  });

  it('Should handle search functionality and configurable products', () => {
    cy.logToTerminal(
      '========= 🚀 TEST 3: Search Functionality and Configurable Products =========',
    );

    // ========== STEP 1: Search for product ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderSearchInput).type(TEST_SIMPLE_PRODUCT_1_SKU);
    });
    cy.wait(1500);

    cy.get(fields.quickOrderSearchResults).should('be.visible');
    cy.get(fields.quickOrderSearchResultItem).should(
      'have.length.greaterThan',
      0,
    );

    // ========== STEP 2: Select product from search ==========

    cy.get(fields.quickOrderSearchResultItem).first().click();
    cy.wait(1500);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard).should('have.length', 1);
    });

    // ========== STEP 3: Add configurable product ==========

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.quickOrderMultipleSkuTextarea)
        .clear()
        .type(TEST_CONFIGURABLE_PRODUCT_SKU);
      cy.contains('button', 'Add to List').click();
    });

    cy.wait(2000);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard).should('have.length', 2);
    });

    // ========== STEP 4: Verify configurable product has options ==========

    cy.get(`form[data-sku="${TEST_CONFIGURABLE_PRODUCT_SKU}"]`)
      .find(fields.quickOrderProductOptionsSlot)
      .should('exist');

    // ========== STEP 5: Select option and update quantity ==========

    cy.get(`form[data-sku="${TEST_CONFIGURABLE_PRODUCT_SKU}"]`)
      .find('select[name="color"]')
      .select('red');
    cy.wait(1000);

    cy.get(fields.quickOrderItemCard)
      .first()
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type('3', { force: true });
    cy.wait(500);

    // ========== STEP 6: Add to cart ==========

    cy.get(fields.quickOrderAddAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify redirect to cart ==========

    cy.url().should('include', CART_PAGE_URL);

    // Return to quick order page for next test
    cy.visit(QUICK_ORDER_PAGE_URL);
    cy.wait(2000);

    cy.logToTerminal(
      '✅ TEST 3 PASSED: Search and configurable products workflow successful',
    );
  });

  it('Should handle complete workflow with mixed input methods', () => {
    cy.logToTerminal(
      '========= 🚀 TEST 4: Mixed Input Methods Workflow =========',
    );

    // ========== STEP 1: Add via Multiple SKU ==========

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.quickOrderMultipleSkuTextarea).type(
        TEST_SIMPLE_PRODUCT_1_SKU,
      );
      cy.contains('button', 'Add to List').click();
    });
    cy.wait(1500);

    cy.get(fields.quickOrderItemCard).should('have.length', 1);

    // ========== STEP 2: Add via Search ==========

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get('.b2b-quick-order-form-quick-order-items-list__global-search')
        .find(fields.quickOrderSearchInput)
        .type(TEST_SIMPLE_PRODUCT_2_SKU);
    });
    cy.wait(1000);
    cy.get(fields.quickOrderSearchResultItem).first().click();
    cy.wait(1500);

    cy.get(fields.quickOrderItemCard).should('have.length', 2);

    // ========== STEP 3: Add configurable product ==========

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.quickOrderMultipleSkuTextarea)
        .clear()
        .type(TEST_CONFIGURABLE_PRODUCT_SKU);
      cy.contains('button', 'Add to List').click();
    });
    cy.wait(1500);

    cy.get(fields.quickOrderItemCard).should('have.length', 3);

    // ========== STEP 4: Configure options ==========

    cy.get(`form[data-sku="${TEST_CONFIGURABLE_PRODUCT_SKU}"]`)
      .find('select[name="color"]')
      .select('green');
    cy.wait(1000);

    // ========== STEP 5: Update quantities ==========

    cy.get(fields.quickOrderItemCard)
      .eq(0)
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type('3', { force: true });

    cy.get(fields.quickOrderItemCard)
      .eq(1)
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type('2', { force: true });
    cy.wait(500);

    // ========== STEP 6: Verify total items and add to cart ==========

    cy.get(fields.quickOrderItemCard).should('have.length.greaterThan', 2);

    cy.get(fields.quickOrderAddAllToCartButton).click();
    cy.wait(2000);

    // ========== STEP 7: Verify redirect to cart ==========

    cy.url().should('include', '/cart');

    cy.logToTerminal('✅ TEST 4 PASSED: Mixed workflow successful');
  });

  it('Should add items to cart and verify in mini cart', () => {
    cy.logToTerminal(
      '========= 🚀 TEST 5: Add to Cart and Mini Cart Verification =========',
    );

    // Set up GraphQL intercept for Add to Cart mutation
    const apiMethod = 'ADD_PRODUCTS_TO_CART_MUTATION';
    const graphqlEndPoint = Cypress.env('graphqlEndPoint');

    cy.intercept('POST', graphqlEndPoint, (req) => {
      const query = req.body.query;
      if (query && typeof query === 'string' && query.includes(apiMethod)) {
        req.alias = 'addProductToCart';
      }
    });

    // Define test data: specific products with their expected quantities
    const expectedItems = [
      { sku: TEST_SIMPLE_PRODUCT_1_SKU, quantity: 3 },
      { sku: TEST_SIMPLE_PRODUCT_2_SKU, quantity: 2 },
      { sku: TEST_CONFIGURABLE_PRODUCT_SKU, quantity: 5, color: 'blue' },
    ];
    const totalQuantity = expectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    // ========== STEP 1: Add products via Multiple SKU ==========

    const skuText = `${TEST_SIMPLE_PRODUCT_1_SKU} ${TEST_SIMPLE_PRODUCT_2_SKU} ${TEST_CONFIGURABLE_PRODUCT_SKU}`;

    cy.get(fields.quickOrderMultipleSkuContainer).within(() => {
      cy.get(fields.quickOrderMultipleSkuTextarea).clear().type(skuText);
      cy.contains('button', 'Add to List').click();
    });
    cy.wait(2000);

    cy.get(fields.quickOrderItemsContainer).within(() => {
      cy.get(fields.quickOrderItemCard).should('have.length', 3);
    });

    // ========== STEP 2: Configure the configurable product ==========

    cy.get(`form[data-sku="${TEST_CONFIGURABLE_PRODUCT_SKU}"]`)
      .find('select[name="color"]')
      .select(expectedItems[2].color);
    cy.wait(1000);

    // ========== STEP 3: Set specific quantities for each product ==========

    cy.logToTerminal('📝 Setting quantities for all products...');

    cy.get(fields.quickOrderItemCard)
      .eq(0)
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type(expectedItems[0].quantity.toString(), { force: true });

    cy.get(fields.quickOrderItemCard)
      .eq(1)
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type(expectedItems[1].quantity.toString(), { force: true });

    cy.get(fields.quickOrderItemCard)
      .eq(2)
      .find(fields.quickOrderItemQuantityInput)
      .clear({ force: true })
      .type(expectedItems[2].quantity.toString(), { force: true });

    cy.wait(500);

    // ========== STEP 4: Add all items to cart ==========

    cy.logToTerminal('🛒 Adding all items to cart...');
    cy.get(fields.quickOrderAddAllToCartButton)
      .should('not.be.disabled')
      .click();

    cy.logToTerminal('⏳ Waiting for Add to Cart API call to complete...');
    cy.wait('@addProductToCart', { timeout: 15000 }).then((interception) => {
      cy.logToTerminal('✅ Add to Cart API call completed successfully');
      expect(interception.response.statusCode).to.equal(200);
    });

    // ========== STEP 5: Verify redirect to cart page ==========

    cy.url().should('include', CART_PAGE_URL);
    cy.logToTerminal('✅ Redirected to cart page');

    // ========== STEP 6: Verify cart badge shows correct item count ==========

    cy.logToTerminal(`🛒 Verifying cart badge shows ${totalQuantity} items...`);
    cy.get(fields.miniCartButton, { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'data-count')
      .then((count) => {
        const itemCount = parseInt(count, 10);
        expect(itemCount).to.be.at.least(totalQuantity);
        cy.logToTerminal(
          `✅ Cart badge shows ${itemCount} items (expected at least ${totalQuantity})`,
        );
      });

    // ========== STEP 7: Open mini cart to verify items ==========

    cy.logToTerminal('🛒 Opening mini cart to verify added items...');
    cy.get(fields.miniCartButton).click({ force: true });

    cy.logToTerminal('✅ Verifying mini cart is open...');
    cy.get(fields.miniCartContainer, { timeout: 10000 }).should('be.visible');
    cy.get(fields.miniCartHeading)
      .should('be.visible')
      .and('contain.text', 'Shopping Cart');

    // ========== STEP 8: Verify each specific SKU is in cart with correct quantity ==========

    cy.logToTerminal(
      '🔍 Verifying each specific product is in mini cart with correct quantity...',
    );
    cy.get(fields.miniCartItems).should('have.length.greaterThan', 0);

    // Main verification: each specific SKU is in cart with at least the expected quantity
    expectedItems.forEach(({ sku, quantity }) => {
      cy.get(fields.miniCartItems).then(($items) => {
        let foundItem = null;

        $items.each((index, item) => {
          const $item = Cypress.$(item);
          const itemSku = $item.find(fields.miniCartItemSku).text().trim();
          if (itemSku.includes(sku)) {
            foundItem = $item;
            return false; // break the loop
          }
        });

        expect(foundItem, `${sku} should be found in mini cart`).to.not.be.null;

        const actualQty = parseInt(
          foundItem.find(fields.miniCartQuantity).text().trim(),
          10,
        );
        expect(
          actualQty,
          `${sku} should have at least quantity ${quantity} (cart may contain items from previous tests)`,
        ).to.be.at.least(quantity);
        cy.logToTerminal(
          `   ✓ ${sku}: ${actualQty} item(s) in cart (expected at least ${quantity})`,
        );
      });
    });

    cy.logToTerminal(
      '✅ TEST 5 PASSED: All items added to cart and verified in mini cart',
    );
  });
});
