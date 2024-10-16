import {
    setGuestShippingAddress,
    setGuestBillingAddress,
    placeOrder,
    signUpUser,
    uncheckBillToShippingAddress
} from '../../actions';
import {
    assertCartSummaryProduct,
    assertCartSummaryProductsOnCheckout,
    assertTitleHasLink,
    assertProductImage,
    assertCartSummaryMisc,
    assertOrderSummaryMisc,
    assertOrderConfirmationCommonDetails,
    assertOrderConfirmationShippingDetails,
    assertOrderConfirmationBillingDetails,
    assertOrderConfirmationShippingMethod,
    assertAuthUser
} from '../../assertions';
import {

    assertSelectedPaymentMethod,
} from '../../assertions';
import {
    customerShippingAddress,
    customerBillingAddress,
} from '../../fixtures/index';

describe('Verify auth user can place order', () => {
    it('Verify auth user can place order', () => {
        // TODO: replace with single "test" product shared between all tests (not this vs products.configurable.urlPathWithOptions).
        cy.visit('/products/hollister-backyard-sweatshirt/MH05');
        cy.get('[id="Y29uZmlndXJhYmxlLzI3Ny8yMDI="]').click({
            force: true,
          });
          cy.get('[id="Y29uZmlndXJhYmxlLzU1Ni81MjM="]').click({
            force: true,
          });
        cy.wait(5000);
        cy.contains('Add to Cart').click();
        cy.get('.minicart-wrapper').click();
        assertCartSummaryProduct(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '0'
        )('.cart-mini-cart');
        assertTitleHasLink(
            'Hollister Backyard Sweatshirt',
            '/products/hollister-backyard-sweatshirt/MH05'
        )('.cart-mini-cart');
        assertProductImage('/mh05-white_main_1.jpg')('.cart-mini-cart');
        cy.contains('View Cart').click();
        assertCartSummaryProduct(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '0'
        )('.commerce-cart-wrapper');
        assertTitleHasLink(
            'Hollister Backyard Sweatshirt',
            '/products/hollister-backyard-sweatshirt/MH05'
        )('.commerce-cart-wrapper');
        cy.visit("/customer/create");
        cy.get('.minicart-wrapper').should('be.visible')
        cy.fixture('userInfo').then(({ sign_up }) => {
            signUpUser(sign_up);
            assertAuthUser(sign_up);
            cy.wait(5000);
        });
        cy.get('.minicart-wrapper').click();
        assertCartSummaryProduct(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '0'
        )('.cart-mini-cart');
        assertTitleHasLink(
            'Hollister Backyard Sweatshirt',
            '/products/hollister-backyard-sweatshirt/MH05'
        )('.cart-mini-cart');
        assertProductImage('/mh05-white_main_1.jpg')('.cart-mini-cart');
        cy.visit("/products/crown-summit-backpack/24-MB03");
        cy.contains('Add to Cart').click();
        cy.get('.minicart-wrapper').click();
        assertCartSummaryProduct(
            'Crown Summit Backpack',
            '24-MB03',
            '1',
            '$38.00',
            '$38.00',
            '0'
        )('.cart-mini-cart');
        assertTitleHasLink(
            'Crown Summit Backpack',
            '/products/crown-summit-backpack/24-MB03'
        )('.cart-mini-cart');
        assertProductImage('/mb03-black-0.jpg')('.cart-mini-cart');

        assertCartSummaryProduct(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '1'
        )('.cart-mini-cart');
        assertTitleHasLink(
            'Hollister Backyard Sweatshirt',
            '/products/hollister-backyard-sweatshirt/MH05'
        )('.cart-mini-cart');
        assertProductImage('/mh05-white_main_1.jpg')('.cart-mini-cart');
        cy.contains('View Cart').click();
        assertCartSummaryProduct(
            'Crown Summit Backpack',
            '24-MB03',
            '1',
            '$38.00',
            '$38.00',
            '0'
        )('.commerce-cart-wrapper');
        assertTitleHasLink(
            'Crown Summit Backpack',
            '/products/crown-summit-backpack/24-MB03'
        )('.commerce-cart-wrapper');
        assertProductImage('/mb03-black-0.jpg')('.commerce-cart-wrapper');

        assertCartSummaryProduct(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '1'
        )('.commerce-cart-wrapper');
        assertTitleHasLink(
            'Hollister Backyard Sweatshirt',
            '/products/hollister-backyard-sweatshirt/MH05'
        )('.commerce-cart-wrapper');
        assertProductImage('/mh05-white_main_1.jpg')('.commerce-cart-wrapper');
        cy.contains('Estimated Shipping').should('be.visible');
        cy.get('.dropin-button--primary')
            .contains('Checkout')
            .click();
        assertCartSummaryMisc(2);
        assertCartSummaryProductsOnCheckout(
            'Crown Summit Backpack',
            '24-MB03',
            '1',
            '$38.00',
            '$38.00',
            '0'
        );
        assertCartSummaryProductsOnCheckout(
            'Hollister Backyard Sweatshirt',
            'MH05',
            '1',
            '$52.00',
            '$52.00',
            '1'
        );
        setGuestShippingAddress(customerShippingAddress, true);
        uncheckBillToShippingAddress();
        cy.wait(2000);
        setGuestBillingAddress(customerBillingAddress, true);
        assertOrderSummaryMisc('$90.00', '$10.00', '$86.50');
        assertSelectedPaymentMethod('checkmo', 0);
        cy.wait(5000);
        placeOrder();
        assertOrderConfirmationCommonDetails(customerBillingAddress);
        assertOrderConfirmationShippingDetails(customerShippingAddress);
        assertOrderConfirmationBillingDetails(customerBillingAddress);
        assertOrderConfirmationShippingMethod(customerShippingAddress);
        /**
         * TODO - when /customer/order-details page will be ready
         * Redirect to /order-details?orderRef={ORDER_TOKEN}
         * Confirm that elements similar to orderConfirmation page present (not exactly the same, separate assert needed)
         */
        /**
         * TODO - when /customer/account page will be ready
         * Redirect to /customer/account
         * Confirm that new order is visible in Recent Orders section of account dashboard
         */
        /**
         * TODO - when /customer/orders page will be ready
         * Redirect to /customer/orders
         * Confirm that new order is visible on Orders page
         */
        cy.deleteCustomer();
    });
});
