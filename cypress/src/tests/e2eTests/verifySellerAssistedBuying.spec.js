/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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

import * as fields from "../../fields";
import * as actions from "../../actions";
import { customerShippingAddress, checkMoneyOrder } from "../../fixtures";
import {
  deleteCustomerByEmail,
  findCustomerByEmail,
  requestCustomerOtp,
} from "../../support/b2cApiClient.js";

describe("Seller Assisted Buying", () => {
  let testUserEmail;

  const completeCheckoutAndPlaceOrder = (phaseLabel) => {
    cy.log(`💳 ${phaseLabel}: Navigating to checkout`);
    cy.get(".minicart-wrapper").click();
    cy.get('.minicart-panel[data-loaded="true"]').should("exist");
    cy.contains("View Cart").click();
    cy.get(".dropin-button--primary").contains("Checkout").click();
    cy.url().should("include", "/checkout");

    // Reuse the stable checkout pattern used in b2c checkout specs.
    cy.wait(2000);
    cy.url().should("include", "/checkout");

    cy.log(`📦 ${phaseLabel}: Filling shipping address`);

    // Wait for shipping form to be ready
    cy.get('form[name="shippingAddress"], form[name="selectedShippingAddress"]', { timeout: 15000 })
      .should('be.visible');

    cy.get("body").then(($body) => {
      const isSelectableState = $body.find(`${fields.shippingFormState}:visible`).length > 0;
      actions.setGuestShippingAddress(customerShippingAddress, isSelectableState);
    });
    cy.log(`✅ ${phaseLabel}: Shipping address filled`);

    // Reload page after filling shipping address to ensure state persistence
    cy.log(`🔄 ${phaseLabel}: Reloading page after shipping address fill`);
    cy.reload();
    cy.url().should("include", "/checkout");

    // Wait for checkout form to fully reinitialize after reload
    cy.wait(2000);
    cy.get('form[name="selectedShippingAddress"]', { timeout: 12000 })
      .should('be.visible');

    // Scroll down to ensure form visibility
    cy.scrollTo(0, 300);

    cy.wait(1000);
    cy.log(`📦 ${phaseLabel}: Selecting shipping method (if shown)`);
    cy.get("body").then(($body) => {
      const shippingMethodSelector =
        'input[name="shipping_method"], input[name="shipping-method"], input[data-testid="shipping-method-radioButton"]';
      const $shippingMethods = $body.find(shippingMethodSelector);

      if ($shippingMethods.length > 0) {
        cy.wrap($shippingMethods.first()).check({ force: true });
        cy.wait(1000);
      } else {
        cy.log("ℹ️ Shipping method is not shown, continuing checkout");
      }
    });

    cy.log(`💰 Selecting payment method: ${checkMoneyOrder.name}`);
    cy.wait(2000);
    actions.setPaymentMethod(checkMoneyOrder);

    cy.log("📄 Accepting checkout terms");
    actions.checkTermsAndConditions();
    cy.wait(2000);

    cy.log(`🛒 ${phaseLabel}: Placing order...`);
    actions.placeOrder();

    // Wait for order processing
    cy.wait(3000);

    // Wait for order confirmation page and verify success
    cy.url({ timeout: 30000 }).should('match', /success|confirmation|order-details/);
    cy.log(`✅ ${phaseLabel}: Redirected to confirmation page`);

    // Verify order confirmation elements
    cy.get(".order-confirmation", { timeout: 15000 }).should("be.visible");
    cy.log(`✅ ${phaseLabel}: Order confirmation container found`);

    cy.contains("thank you for your order!", { matchCase: false, timeout: 10000 }).should("be.visible");
    cy.log(`✅ ${phaseLabel}: 'Thank you' message found`);

    cy.contains("Order placed by an administrator", { timeout: 10000 }).should("be.visible");
    cy.log(`✅ ${phaseLabel}: 'Order placed by administrator' message found`);

    cy.log(`✅ ${phaseLabel}: Order submitted successfully`);
  };

  const resetAuthStateAndOpenLogin = () => {
    cy.log("➡️ Opening login page before auth state reset");
    cy.visit("/customer/login");
    cy.url().should("include", "/customer/login");

    cy.log("🧹 Clearing cookies/storage before admin OTP login");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    cy.log("🔄 Reloading login page after auth cleanup");
    cy.reload();
    cy.url().should("include", "/customer/login");
    cy.get("main .auth-sign-in-form", { timeout: 30000 }).should("be.visible");
  };

  const signInAsAdminWithOtp = (email, otp) => {
    cy.log(`🔐 Attempting OTP login with email: ${email}, OTP: ${otp}`);

    cy.get("main .auth-sign-in-form", { timeout: 30000 })
      .should("be.visible")
      .within(() => {
        cy.get(fields.authFormUserEmail)
          .should("be.visible")
          .should("not.be.disabled")
          .clear({ force: true })
          .type(email, { delay: 50 }); // Add delay to prevent character scrambling in CI/CD

        cy.get(fields.authFormUserPassword)
          .should("be.visible")
          .should("not.be.disabled")
          .clear({ force: true })
          .type(otp, { delay: 50 }); // Add delay for password too

        // Verify values were entered correctly
        cy.get(fields.authFormUserEmail).should('have.value', email);
        cy.get(fields.authFormUserPassword).should('have.value', otp);

        // Wait for React form state to stabilize after typing
        cy.wait(2000);

        cy.get('button.auth-sign-in-form__button--submit[type="submit"]')
          .should("be.visible")
          .and("not.be.disabled")
          .click();

        cy.wait(5000);
      });

    // Guard against occasional missed submit handling on first click.
    cy.location("pathname", { timeout: 15000 }).then((pathname) => {
      if (pathname.includes("/customer/login")) {
        cy.log("ℹ️ Still on login page, retrying submit");

        // Check form state before retry
        cy.get('main .auth-sign-in-form').then($form => {
          const passValue = $form.find(fields.authFormUserPassword).val();

          // If password was cleared, refill the form
          if (!passValue || passValue.length === 0) {
            cy.get(`main .auth-sign-in-form ${fields.authFormUserEmail}`).clear().type(email, { delay: 50 });
            cy.get(`main .auth-sign-in-form ${fields.authFormUserPassword}`).clear().type(otp, { delay: 50 });
            cy.wait(2000);
          }
        });

        // Wait a bit to ensure DOM is stable before looking for button
        cy.wait(1000);

        // Click first button to avoid multiple elements error
        cy.get('main button.auth-sign-in-form__button--submit[type="submit"]', { timeout: 10000 })
          .first()
          .should("be.visible")
          .and("not.be.disabled")
          .click();

        cy.wait(8000);

        // Explicitly wait for redirect away from login page
        cy.url({ timeout: 30000 }).should("not.include", "/customer/login");
      }
    });
  };

  before(() => {
    cy.log("🚀 Seller Assisted Buying test suite started");
  });

  beforeEach(() => {
    cy.log("🧹 Seller Assisted Buying test cleanup");
    cy.clearCookies();
    cy.clearLocalStorage();

    // Handle uncaught exceptions
    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("renderCompanySwitcher") ||
        err.message.includes("User token has been revoked")
      ) {
        return false;
      }
      return true;
    });
  });

  after(() => {
    cy.log("🏁 Seller Assisted Buying test suite completed");

    // Delete through Admin REST because browser auth may have been cleared by a failed test.
    if (testUserEmail) {
      cy.log(`🗑️ Manual cleanup: Deleting test user ${testUserEmail}`);
      deleteCustomerByEmail(testUserEmail);
    } else {
      cy.log("⚠️ No test user email found to delete (test may have failed early)");
    }
  });

  it("Complete Shopping Assistance flow - register and modify settings", () => {
    cy.log("========= Complete Shopping Assistance Flow =========");

    cy.log("Step 1: Navigating to registration page");
    cy.visit("/customer/create");
    cy.contains("Create account").should("be.visible");

    cy.fixture("userInfo").then(({ sign_up }) => {
      const random = Cypress._.random(0, 10000000);
      testUserEmail = `${random}${sign_up.email}`;

      cy.log(`Test user email: ${testUserEmail}`);
      cy.get(fields.authFormUserEmail).eq(1).clear({ force: true });
      cy.get(fields.authFormUserEmail).eq(1).type(testUserEmail);
      cy.get(fields.authFormUserFirstName).clear();
      cy.get(fields.authFormUserFirstName).type(sign_up.firstName);
      cy.get(fields.authFormUserLastName).clear();
      cy.get(fields.authFormUserLastName).type(sign_up.lastName);
      cy.get(fields.authFormUserPassword).eq(1).clear();
      cy.get(fields.authFormUserPassword).eq(1).type(sign_up.password);

      cy.log("Step 3: Enabling Remote Shopping Assistance checkbox");
      cy.get('[data-testid="remoteShoppingAssistanceConsent"]', {
        timeout: 30000,
      }).should("exist");
      cy.get('[data-testid="remoteShoppingAssistanceConsent"]')
        .find('input[name="allowRemoteShoppingAssistance"]')
        .should("exist")
        .check({ force: true })
        .should("be.checked");

      cy.log("Step 4: Submitting registration form");
      actions.createAccount();
      cy.url().should("include", "/customer/account");
      cy.contains(sign_up.firstName).should("be.visible");

      cy.log("Step 5: Navigating to Seller Assisted Purchasing");
      cy.visit("/customer/seller-assisted-purchasing");
      cy.get('[data-testid="dropin-header-container"]')
        .should("be.visible")
        .contains("Seller assisted purchasing");

      cy.log("Step 6: Verifying Remote Shopping Assistance checkbox is enabled");
      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .should("exist")
        .then(($checkbox) => {
          if (!$checkbox.is(":checked")) {
            cy.wrap($checkbox).check({ force: true });
          }
        })
        .should("be.checked");

      cy.log("Step 7: Disabling Remote Shopping Assistance");
      cy.get('input[name="allowRemoteShoppingAssistance"]').uncheck({
        force: true,
      });
      cy.get('input[name="allowRemoteShoppingAssistance"]').should(
        "not.be.checked",
      );

      cy.log("Step 8: Verifying disabled message appears");
      cy.contains(
        "Seller assisted purchasing is currently disabled. New sessions cannot be started.",
      ).should("be.visible");

      cy.log("Step 9: Re-enabling Remote Shopping Assistance");
      cy.get('input[name="allowRemoteShoppingAssistance"]').check({
        force: true,
      });
      cy.get('input[name="allowRemoteShoppingAssistance"]').should(
        "be.checked",
      );

      cy.log("Step 10: Verifying disabled message is gone");
      cy.contains(
        "Seller assisted purchasing is currently disabled. New sessions cannot be started.",
      ).should("not.exist");

      cy.log("Step 14: Logging out before OTP admin login");
      cy.reload();
      cy.visit("/");
      cy.get(".nav-dropdown-button", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });
      cy.contains("button", /^logout$/i, { timeout: 60000 })
        .click({ force: true });

      resetAuthStateAndOpenLogin();

      cy.log("Step 15: Looking up customer for admin OTP login");
      findCustomerByEmail(testUserEmail).then((customer) => {
        expect(customer, `Customer should exist for email: ${testUserEmail}`)
          .to.exist;
        expect(customer.id, "Customer ID should be numeric").to.be.a("number");

        const otpReasonWithEmail = `test:${testUserEmail}`;
        cy.log(`Step 16: Requesting OTP with reason: ${otpReasonWithEmail}`);

        return requestCustomerOtp(customer.id, otpReasonWithEmail);
      }).then((otpResponse) => {
        expect(otpResponse, "OTP response should exist").to.exist;
        expect(otpResponse.otp, "OTP code should be present").to.be.a("string");

        cy.log("Step 17: Signing in as admin with OTP password");
        signInAsAdminWithOtp(testUserEmail, otpResponse.otp);
        cy.url().should("include", "/customer/account");

        cy.log("Step 17.5: Admin adding product for customer");
        cy.visit("/products/youth-tee/adb150");
        cy.reload();
        cy.wait(2000);
        cy.get(".product-details__buttons__add-to-cart button")
          .should("be.visible")
          .click();
        cy.wait(2000);

        cy.log("Step 18: Completing purchase as admin");
        completeCheckoutAndPlaceOrder("Admin session order");
      });
    });
  });

  it("Verify shopping assistance order appears in activity table", () => {
    cy.log("========= Verify Shopping Assistance Order =========");
    expect(testUserEmail, "testUserEmail should be set").to.exist;

    findCustomerByEmail(testUserEmail).then((customer) => {
      expect(customer, `Customer should exist for email: ${testUserEmail}`)
        .to.exist;
      expect(customer.id, "Customer ID should be numeric").to.be.a("number");

      const otpReasonVerify = `verify:${testUserEmail}`;
      cy.log(`Requesting verification OTP with reason: ${otpReasonVerify}`);
      return requestCustomerOtp(customer.id, otpReasonVerify);
    }).then((otpResponse) => {
      expect(otpResponse, "OTP response should exist").to.exist;
      expect(otpResponse.otp, "OTP code should be present").to.be.a("string");

      resetAuthStateAndOpenLogin();
      signInAsAdminWithOtp(testUserEmail, otpResponse.otp);
      cy.url().should("include", "/customer/account");

      cy.visit("/customer/seller-assisted-purchasing");
      cy.url().should("include", "/customer/seller-assisted-purchasing");
      cy.get('[data-testid="dropin-header-container"]')
        .should("be.visible")
        .contains("Seller assisted purchasing");

      cy.get(".account-seller-assisted-buying-activity-table__table", {
        timeout: 20000,
      }).should("be.visible");
      cy.contains(
        ".account-seller-assisted-buying-activity-table__table",
        "Order Placed",
        { timeout: 10000 },
      ).should("be.visible");
      cy.contains(
        ".account-seller-assisted-buying-activity-table__table",
        `email = ${testUserEmail}`,
        { timeout: 10000 },
      ).should("be.visible");
    });
  });
});
