import {
  assertCartSummaryProduct,
  assertWishlistItem,
  assertWishlistTitleHasLink,
  assertWishlistProductImage,
  assertCartEmpty,
  assertWishlistItemHasOptions,
  assertProductDetailPage,
  assertAuthUser,
  assertWishlistEmptyWithWait,
  assertWishlistCountWithWait,
} from "../../assertions";
import { products } from "../../fixtures";
import { signUpUser } from "../../actions";

describe("Verify guest user can manage products across wishlist and cart", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get(".wishlist-wrapper").should('be.visible').click();
    // Wait for wishlist page to load and assert empty state
    assertWishlistEmptyWithWait();
  });

  it("Successfully add simple product to wishlist, move it to cart, return this to wishlist and remove it", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the wishlist toggle button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .click();

    // Wait for wishlist operation to complete by checking for success indicators
    cy.wait(1000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
      "Youth tee",
      "/products/youth-tee/adb150"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env("productImageName"))(".commerce-wishlist-wrapper");

    // Move item to cart with proper waiting
    cy.contains("Move To Cart").should('be.visible').and('not.be.disabled').click();

    // Wait for move operation to complete by checking wishlist becomes empty
    assertWishlistEmptyWithWait();

    // Check cart has the item
    cy.get(".minicart-wrapper").should('be.visible').click();

    // Wait for cart to load
    cy.get(".cart-mini-cart", { timeout: 10000 }).should('be.visible');
    assertCartSummaryProduct(
      "Youth tee",
      "ADB150",
      "1",
      "$10.00",
      "$10.00",
      "0",
    )(".cart-mini-cart");

    // Navigate to full cart view
    cy.contains("View Cart").should('be.visible').click();

    // Wait for cart page to load
    cy.get('.cart__action--wishlist-toggle').should('exist');

    // Wait for wishlist button to be available
    cy.get('.cart__action--wishlist-toggle [data-testid="wishlist-toggle"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for move to wishlist operation to complete by checking for empty cart
    assertCartEmpty();

    // Verify item is back in wishlist
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");

    // Remove item from wishlist with proper waiting
    cy.get('[data-testid="wishlist-product-item-remove-button"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for move operation to complete by checking wishlist becomes empty
    assertWishlistEmptyWithWait();
  });

  it("Successfully add configurable product with all required options to wishlist, move it to cart and return this to wishlist", () => {
    cy.visit(products.configurable.urlPathWithOptions);

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the wishlist toggle button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .click();

    // Wait for wishlist operation to complete by checking for success indicators
    cy.wait(1000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Configurable product",
      "$60.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
      "Configurable product",
      "/products/cypress-configurable-product-latest-red/cypress456"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env('productWithOptionImageNameConfigurable'))(".commerce-wishlist-wrapper");

    assertWishlistItemHasOptions('color', 'red')(".wishlist-wishlist__content");

    // Move item to cart with proper waiting
    cy.contains("Move To Cart").should('be.visible').and('not.be.disabled').click();

    // Wait for wishlist page to load and assert empty state
    assertWishlistEmptyWithWait();

    // Check cart has the item
    cy.get(".minicart-wrapper").should('be.visible').click();

    // Wait for cart to load
    cy.get(".cart-mini-cart", { timeout: 10000 }).should('be.visible');
    assertCartSummaryProduct(
      "Configurable product",
      "CYPRESS456",
      "1",
      "$60.00",
      "$60.00",
      "0",
    )(".cart-mini-cart");

    // Navigate to full cart view
    cy.contains("View Cart").should('be.visible').click();

    // Wait for cart page to load
    cy.get('.cart__action--wishlist-toggle').should('exist');

    // Wait for wishlist button to be available
    cy.get('.cart__action--wishlist-toggle [data-testid="wishlist-toggle"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for move to wishlist operation to complete by checking for empty cart
    assertCartEmpty();

    // Verify item is back in wishlist
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    assertWishlistItem(
      "Configurable product",
      "$60.00",
    )(".wishlist-wishlist__content");

    // Remove item from wishlist with proper waiting
    cy.get('[data-testid="wishlist-product-item-remove-button"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for wishlist page to load and assert empty state
    assertWishlistEmptyWithWait();
  });

  it("Successfully add configurable product with no required options to wishlist, redirects to PDP and remove it", () => {
    cy.visit(products.configurable.urlPath);

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the wishlist toggle button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .click();

    // Wait for wishlist operation to complete by checking for success indicators
    cy.wait(1000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Configurable product",
      "$60.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
      "Configurable product",
      "/products/cypress-configurable-product-latest/cypress456"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env('productImageNameConfigurable'))(".commerce-wishlist-wrapper");

    // Customise with proper waiting
    cy.contains("Customize").should('be.visible').and('not.be.disabled').click();

    // Verify redirect to product detail page and content
    assertProductDetailPage(
      'Configurable product',
      'CYPRESS456',
      '/products/cypress-configurable-product-latest/cypress456'
    );

    // Verify item is back in wishlist
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    assertWishlistItem(
      "Configurable product",
      "$60.00",
    )(".wishlist-wishlist__content");

    // Remove item from wishlist with proper waiting
    cy.get('[data-testid="wishlist-product-item-remove-button"]', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    // Wait for wishlist page to load and assert empty state
    assertWishlistEmptyWithWait();
  });

  it("Successfully merge wishlist", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);

    // Wait for container to exist
    cy.get('.product-details__buttons__add-to-wishlist').should('exist');

    // Wait for button to be rendered
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .should('be.visible')
      .and('not.be.disabled');

    // Click the wishlist toggle button
    cy.get('.product-details__buttons__add-to-wishlist [data-testid="wishlist-toggle"]')
      .click();

    // Wait for wishlist operation to complete by checking for success indicators
    cy.wait(1000);

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");

    assertWishlistTitleHasLink(
      "Youth tee",
      "/products/youth-tee/adb150"
    )(".commerce-wishlist-wrapper");

    assertWishlistProductImage(Cypress.env("productImageName"))(".commerce-wishlist-wrapper");

    // Create customer and login
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate back to wishlist and verify item was added
    cy.get(".wishlist-wrapper").should('be.visible').click();

    // Wait for wishlist to load with items
    assertWishlistCountWithWait(1);

    // Verify wishlist item details
    assertWishlistItem(
      "Youth tee",
      "$10.00",
    )(".wishlist-wishlist__content");
  });
});
