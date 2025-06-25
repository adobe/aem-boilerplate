import * as fields from "../fields/index";

export const assertCartSummaryProduct =
  (
    productName,
    productSku,
    productQty,
    productPrice,
    totalPrice,
    productPosition,
  ) =>
  (elem = ".commerce-cart-wrapper") => {
    cy.get(`${elem} .dropin-cart-item__title`)
      .eq(productPosition)
      .should("contain", productName);
    cy.get(`${elem} .dropin-cart-item__sku`)
      .eq(productPosition)
      .should("contain", productSku);

    if (elem === ".commerce-cart-wrapper") {
      cy.get(`${elem} .dropin-incrementer__input`)
        .eq(productPosition)
        .should("have.value", productQty);
    }

    cy.get(`${elem} .dropin-cart-item__price`).should("contain", productPrice);
    cy.get(`${elem} .dropin-cart-item__total`)
      .eq(productPosition)
      .should("contain", totalPrice);
  };

export const assertCartSummaryProductsOnCheckout = (
  productName,
  productSku,
  productQty,
  productPrice,
  totalPrice,
  productPosition,
) => {
  cy.get(".dropin-cart-item__title")
    .eq(productPosition)
    .should("contain", productName);
  cy.get(".dropin-cart-item__sku")
    .eq(productPosition)
    .should("contain", productSku);
  cy.get(".dropin-cart-item__price__quantity")
    .eq(productPosition)
    .should("contain", productQty);
  cy.get(".dropin-cart-item__price")
    .eq(productPosition)
    .should("contain", productPrice);
  cy.get(".dropin-cart-item__total")
    .eq(productPosition)
    .should("contain", totalPrice);
};

export const assertCartSummaryMisc = (itemCount) => {
  cy.get(".cart-summary-list__heading-text")
    .should("contain", "Your Cart")
    .and("contain", itemCount);
  cy.contains("Edit").should("have.attr", "href", "/cart");
};

export const assertOrderSummaryMisc = (subtotal, shipping, total) => {
  cy.get(".cart-order-summary__primary")
    .find(".cart-order-summary__heading-text")
    .contains("Order Summary")
    .should("be.visible");
  cy.get(".cart-order-summary__primary")
    .find(".cart-order-summary__subTotal")
    .should("contain", "Subtotal")
    .and("contain", subtotal);
  if (shipping) {
    cy.get(".cart-order-summary__primary")
      .find('div[data-testid="estimate-shipping"]')
      .should("contain", "Shipping")
      .and("contain", shipping);
  }
  // TODO:
  // cy.get('.cart-order-summary__primary')
  //   .find('div[data-testid="total-content"]')
  //   .should('contain', 'Total')
  //   .and('contain', total);
};

export const assertTitleHasLink =
  (productName, productHref) =>
  (elem = ".cart-cart") => {
    cy.get(`${elem} .dropin-cart-item`)
      .contains(productName)
      .should("have.attr", "href", productHref);
  };

export const assertProductImage =
  (productImageSrc) =>
  (elem = ".cart-cart") => {
    cy.get(`${elem} img[src*="${productImageSrc}"]`, { matchCase: false })
      .should("be.visible")
      .and(($img) => expect($img[0].naturalWidth).to.be.gt(0));
  };

export const assertSelectedPaymentMethod = (
  selected_payment_method,
  index_number,
) => {
  cy.get(".checkout-payment-methods__methods")
    .find('[type="radio"]')
    .eq(index_number)
    .should("be.checked")
    .and("have.value", selected_payment_method);
};

export const assertOrderConfirmationCommonDetails = (
  customerDetails,
  paymentMethod,
) => {
  cy.get(".order-confirmation")
    .should(
      "contain",
      `${customerDetails.firstName}, thank you for your order!`,
    )
    .and("contain", "Customer information")
    .and("contain", "Contact details")
    .and("contain", customerDetails.email)
    .and("contain", "Payment method")
    .and("contain", paymentMethod.name)
    .and("contain", "Order summary");
  cy.contains("p", /ORDER #\d+/).should("be.visible");
  cy.get(".order-confirmation__order-cost-summary").should("exist");
  cy.get('a[role="link"]').should("contain", "Continue shopping");
};

export const assertOrderConfirmationShippingDetails = (customerAddress) => {
  cy.get(".order-customer-details-content__container-shipping_address")
    .should("contain", "Shipping address")
    .and("contain", customerAddress.firstName)
    .and("contain", customerAddress.lastName)
    .and("contain", customerAddress.street)
    .and("contain", customerAddress.street1)
    .and("contain", customerAddress.city)
    .and("contain", customerAddress.postCode)
    .and("contain", customerAddress.regionFull)
    .and("contain", customerAddress.countryCode);
};

export const assertOrderConfirmationBillingDetails = (customerAddress) => {
  cy.get(".order-customer-details-content__container-billing_address")
    .should("contain", "Billing address")
    .and("contain", customerAddress.firstName)
    .and("contain", customerAddress.lastName)
    .and("contain", customerAddress.street)
    .and("contain", customerAddress.street1)
    .and("contain", customerAddress.city)
    .and("contain", customerAddress.postCode)
    // NewYork is displayed in app instead of New York
    // .and('contain', customerAddress.regionFull)
    .and("contain", customerAddress.countryCode);
};

export const assertOrderConfirmationShippingMethod = (
  customerDeliveryMethod,
) => {
  cy.get(".order-customer-details-content__container-shipping_methods")
    .should("contain", "Shipping method")
    .and("contain", customerDeliveryMethod.shippingMethod);
};
export const assertAuthUser = (sign_up) => {
  cy.url().should("include", "/customer/account");
  cy.contains(sign_up.firstName).should("be.visible");
  // TODO - Uncomment when https://jira.corp.adobe.com/browse/USF-1254 will be delivered to boilerplate
  // cy.contains(sign_up.lastName).should("be.visible");
  // cy.contains(sign_up.email).should("be.visible");
};

// imports and re-exports the functions from ./adobeDataLayer.js
export * from "./adobeDataLayer";

export const assertGiftOptionsSummary = (title, price) => {
  const summaryClassName = ".cart-order-summary__content";

  cy.get(summaryClassName).contains(title).should("exist").should("be.visible");
  if (price) {
    cy.get(summaryClassName)
      .contains(price)
      .should("exist")
      .should("be.visible");
  }
};

export const assertGiftOptionsEmptyForm = (className) => {
  cy.get(`${className} ${fields.giftOptionRecipientName}`).should(
    "have.class",
    "dropin-input--error",
  );
  cy.get(`${className} ${fields.giftOptionSenderName}`).should(
    "have.class",
    "dropin-input--error",
  );
  cy.get(`${className} ${fields.giftOptionMessage}`).should(
    "have.class",
    "dropin-textarea--error",
  );
};

export const assertGiftOptionsReadOnlyFormView = () => {
  const summaryClassName = ".cart-gift-options-view--readonly";
  const cartClassName =
    ".cart-cart-summary-list.cart-cart-summary-list__background--secondary";

  cy.get(summaryClassName)
    .contains("Selected gift order options")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("Use gift receipt")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("Selected gift order options")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("The receipt and order invoice will not show the price.")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("Use printed card")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("Gift wrap this order (+$30.00)")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("Foil Finish Paper")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("giftOptionRecipientName")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("giftOptionSenderName")
    .should("exist")
    .should("be.visible");
  cy.get(summaryClassName)
    .contains("giftOptionMessage")
    .should("exist")
    .should("be.visible");

  cy.get(cartClassName).contains("This item is a gift").click();
  cy.get(cartClassName)
    .contains("Foil Finish Paper")
    .should("exist")
    .should("be.visible");
  cy.get(cartClassName)
    .contains("giftOptionRecipientName")
    .should("exist")
    .should("be.visible");
  cy.get(cartClassName)
    .contains("giftOptionSenderName")
    .should("exist")
    .should("be.visible");
  cy.get(cartClassName)
    .contains("giftOptionMessage")
    .should("exist")
    .should("be.visible");
};

export const assertWishlistEmpty = () => {
  cy.get(".dropin-illustrated-message__heading")
    .should("exist")
    .and("contain", "Your wishlist is empty");
  cy.get(".dropin-illustrated-message__message")
    .should("exist")
    .and("contain", "Add items by clicking on the heart icon.");
  cy.get('[data-testid="wishlist-heading-wrapper"]')
    .should("not.exist");
}

export const assertWishlistItem = (productName, productPrice) => (elem = ".commerce-wishlist-wrapper") => {
  cy.get(elem).within(() => {
    cy.get(".wishlist-product-item-name")
      .contains(productName)
      .should("be.visible");
    cy.get(".wishlist-product-item-price")
      .contains(productPrice)
      .should("be.visible");
  });
};

export const assertWishlistItemHasOptions = (attribute, label) => (elem = ".commerce-wishlist-wrapper") => {
  cy.get(elem).within(() => {
    cy.get(".wishlist-product-item-options").within(() => {
      cy.get(".wishlist-product-item-option__attribute")
        .contains(attribute)
        .should("be.visible");
      cy.get(".wishlist-product-item-option__label")
        .contains(label)
        .should("be.visible");
    });
  });
};

export const assertWishlistTitleHasLink =
  (productName, productHref) =>
    (elem = ".commerce-wishlist-wrapper") => {
      cy.get(`${elem} .wishlist-product-item-name`)
        .contains(productName)
        .should("have.attr", "href", productHref);
    };

export const assertWishlistProductImage =
  (productImageSrc) =>
    (elem = ".commerce-wishlist-wrapper") => {
      cy.get(`${elem} img[src*="${productImageSrc}"]`, {matchCase: false})
        .should("be.visible")
        .and(($img) => expect($img[0].naturalWidth).to.be.gt(0));
    };

export const assertCartEmpty = () => {
  cy.get(".dropin-illustrated-message__heading")
    .should("be.visible")
    .and("contain", "Your cart is empty");
  cy.get(".dropin-illustrated-message__action")
    .should("be.visible")
    .and("contain", "Start shopping");
};

export const assertWishlistCount = (count) => {
  // Wait for the wrapper and its content to be fully loaded
  cy.get('[data-testid="wishlist-heading-wrapper"]')
    .should('exist');

  // Then check the inner elements directly
  cy.get('[data-testid="default-wishlist-heading"]')
    .should('be.visible')
    .and('contain', 'Wishlist');

  cy.get('[data-testid="wishlist-heading-count"]')
    .should('be.visible')
    .and('contain', `${count} products`);
};

export const assertProductDetailPage = (productName, productSku, urlPath) => {
  // Verify redirect to product detail page
  cy.url().should('include', urlPath);

  // Verify product header is displayed correctly
  cy.get('.product-details__header', { timeout: 10000 }).should('be.visible');
  cy.get('.pdp-header__title').should('be.visible').and('contain', productName);
  cy.get('.pdp-header__sku').should('be.visible').and('contain', productSku);
};

// Updated assertion functions to include the loading wait
export const assertWishlistEmptyWithWait = () => {
  cy.waitForWishlistPageLoaded();
  assertWishlistEmpty();
};

export const assertWishlistCountWithWait = (count) => {
  cy.waitForWishlistPageLoaded();
  assertWishlistCount(count);
};
