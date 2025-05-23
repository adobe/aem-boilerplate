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
