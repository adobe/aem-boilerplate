import {
    submitQuoteToCustomer,
} from '../../support/b2bQuoteAPICalls';
import {
    createUserAssignCompanyAndRole,
    manageCompanyRole,
} from '../../support/b2bPOAPICalls';
import {
    assertCartSummaryProduct,
    assertSignInSuccess,
} from "../../assertions";
import {
    signInUser,
} from "../../actions";

// Quote role configuration with negotiable quote permissions
const quoteRoleConfig = {
    role_name: `Quote User ${Cypress._.random(0, 999999)}`,
    company_id: 13,
    permissions: [
        { resource_id: 'Magento_Company::index', permission: 'allow' },
        { resource_id: 'Magento_Company::view', permission: 'allow' },
        { resource_id: 'Magento_Company::view_account', permission: 'allow' },
        { resource_id: 'Magento_Sales::all', permission: 'allow' },
        { resource_id: 'Magento_Sales::place_order', permission: 'allow' },
        { resource_id: 'Magento_Sales::view_orders', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::all', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::view_quotes', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::manage', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::checkout', permission: 'allow' },
        { resource_id: 'Magento_NegotiableQuote::view_quotes_sub', permission: 'allow' },
    ],
};

describe("Verify B2B Quote feature", () => {
    let customerData;
    let username;
    let quoteRoleId;

    before(() => {
        cy.logToTerminal('🚀 B2B Quote to Order test suite started');
        cy.fixture('customerinfo').then((data) => {
            customerData = data;
        });
    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.intercept('**/graphql').as('defaultGraphQL');
    });

    it("Verify B2B Quote to Order Placement", { tags: "@B2BSaas" }, () => {
        const random = Cypress._.random(0, 10000000);
        username = `${random}${customerData.customer.email}`;
        const quoteName = `${customerData.quote.quote_name} ${random}`;

        // Step 1: Create role with quote permissions
        cy.logToTerminal('========= Step 1: Create role with quote permissions =========');
        cy.visit('/');

        cy.wrap(null).then(() => {
            return manageCompanyRole(quoteRoleConfig);
        }).then((roleResult) => {
            quoteRoleId = roleResult?.role?.id;
            cy.logToTerminal(`✅ Quote role created with ID: ${quoteRoleId}`);

            // Step 2: Create customer and assign to company with quote role
            cy.logToTerminal('========= Step 2: Create customer with quote role =========');

            const testUser = {
                firstname: customerData.customer.firstname,
                lastname: customerData.customer.lastname,
                email: username,
                password: customerData.customer.password,
                isSubscribed: customerData.customer.is_subscribed,
                companyId: 13,
            };

            return createUserAssignCompanyAndRole(testUser, quoteRoleId);
        }).then((result) => {
            if (result?.success) {
                cy.logToTerminal(`✅ Customer created: ${username}`);
            } else {
                cy.logToTerminal(`❌ Customer creation failed: ${result?.error}`);
            }
        });

        cy.wait(8000);

        // Step 3: Login as company user
        cy.logToTerminal('========= Step 3: Login as company user =========');
        cy.visit('/customer/login');
        signInUser(username, customerData.customer.password);
        assertSignInSuccess(customerData.customer.firstname, customerData.customer.lastname, username);
        cy.logToTerminal('✅ User logged in');

        // Step 4: Add product to cart
        cy.logToTerminal('========= Step 4: Add product to cart =========');
        cy.visit("/products/youth-tee/adb150");
        cy.wait(3000);
        cy.get(".dropin-incrementer__input").clear().type(10);
        cy.wait(1000);
        cy.get(".dropin-incrementer__input").should("have.value", "10");
        cy.get(".product-details__buttons__add-to-cart button")
            .should("be.visible")
            .click();
        cy.wait(2000);

        // Verify product in mini cart
        cy.get(".minicart-wrapper").click();
        cy.get('.minicart-panel[data-loaded="true"]').should('exist');
        assertCartSummaryProduct("Youth tee", "ADB150", "10", "$10.00", "$100.00", "0")(".cart-mini-cart");
        cy.contains("View Cart").click();

        // Verify product in cart
        assertCartSummaryProduct("Youth tee", "ADB150", "10", "$10.00", "$100.00", "0")(".commerce-cart-wrapper");
        cy.logToTerminal('✅ Product added to cart');

        // Step 5: Request a quote
        cy.logToTerminal('========= Step 5: Request a quote =========');
        cy.contains('Request a Quote').click();
        cy.wait(3000);

        // Fill quote form
        cy.get('body').then(($body) => {
            if ($body.find('input[name="quote-name"]').length > 0) {
                cy.get('input[name="quote-name"]').clear().type(quoteName);
            } else if ($body.find('input[name="quoteName"]').length > 0) {
                cy.get('input[name="quoteName"]').clear().type(quoteName);
            } else if ($body.find('input[name="name"]').length > 0) {
                cy.get('input[name="name"]').first().clear().type(quoteName);
            }
        });

        cy.wait(1000);

        cy.get('body').then(($body) => {
            if ($body.find('textarea[name="comment"]').length > 0) {
                cy.get('textarea[name="comment"]').type(customerData.quote.comment);
            } else if ($body.find('textarea').length > 0) {
                cy.get('textarea').first().type(customerData.quote.comment);
            }
        });

        cy.wait(1000);

        // Submit quote
        cy.get('button[data-testid="form-request-button"]')
            .should('be.visible')
            .click();
        cy.wait(5000);
        cy.logToTerminal('✅ Quote submitted');

        // Step 6: Navigate to Quotes page
        cy.logToTerminal('========= Step 6: View Quote in My Account =========');
        cy.visit('/customer/account');
        cy.wait(5000);

        // Click on Quotes navigation (exact match to avoid Company Credit)
        cy.get('.commerce-account-nav__item__title').each(($el) => {
            if ($el.text().trim() === 'Quotes') {
                cy.wrap($el).click();
                return false;
            }
        });
        cy.wait(8000);
        cy.logToTerminal('✅ Navigated to quotes list');

        // Step 7: View Quote Details
        cy.logToTerminal('========= Step 7: View Quote Details =========');
        cy.wait(3000);

        cy.get('body').then(($body) => {
            if ($body.find('button:contains("View")').length > 0) {
                cy.contains('button', 'View').first().click();
            } else if ($body.find('a:contains("View")').length > 0) {
                cy.contains('a', 'View').first().click();
            } else {
                cy.contains(quoteName).click();
            }
        });
        cy.wait(8000);
        cy.logToTerminal('✅ Viewing quote details');

        // Step 8: Fill shipping address and send for review
        cy.logToTerminal('========= Step 8: Fill shipping address and send for review =========');

        cy.get('input[name="firstName"]').first().clear().type(customerData.customer.firstname);
        cy.get('input[name="lastName"]').first().clear().type(customerData.customer.lastname);
        cy.get('input[name="street"]').first().clear().type('123 Test Street');
        cy.get('input[name="city"]').first().clear().type('Austin');
        cy.get('select[name="countryCode"]').first().select('US');
        cy.wait(2000);

        cy.get('body').then(($body) => {
            if ($body.find('select[name="region"]').length > 0) {
                cy.get('select[name="region"]').first().select('Texas');
            } else if ($body.find('select[name="regionCode"]').length > 0) {
                cy.get('select[name="regionCode"]').first().select('TX');
            } else if ($body.find('input[name="region"]').length > 0) {
                cy.get('input[name="region"]').first().clear().type('Texas');
            }
        });

        cy.get('input[name="postcode"]').first().clear().type('78758');
        cy.get('input[name="telephone"]').first().clear().type('5551234567');
        cy.wait(2000);
        cy.logToTerminal('✅ Shipping address filled');

        // Save address if button exists
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Save")').length > 0) {
                cy.contains('button', 'Save').first().click();
                cy.wait(2000);
            }
        });

        // Send for review
        cy.get('button[data-testid="send-for-review-button"]')
            .should('be.visible')
            .click();
        cy.wait(5000);
        cy.logToTerminal('✅ Quote sent for review');

        // Step 9: Approve quote via admin REST API
        cy.logToTerminal('========= Step 9: Approve quote via admin REST API =========');
        cy.wait(10000);

        cy.wrap(null).then(async () => {
            try {
                const approvalResult = await submitQuoteToCustomer(
                    username,
                    'Quote approved via Cypress B2B test automation'
                );

                if (approvalResult.success) {
                    cy.logToTerminal(`✅ Quote approved. Quote ID: ${approvalResult.quote_id}`);
                    Cypress.env('approvedQuoteId', approvalResult.quote_id);
                } else {
                    cy.logToTerminal(`⚠️ Quote approval: ${approvalResult.message}`);
                }
            } catch (error) {
                cy.logToTerminal(`❌ Error approving quote: ${error.message}`);
            }
        });

        cy.wait(5000);
        cy.reload();
        cy.wait(8000);
        cy.logToTerminal('✅ Page refreshed');

        // Step 10: Click Checkout
        cy.logToTerminal('========= Step 10: Place quote order - Click Checkout =========');
        cy.wait(3000);

        cy.contains('span', 'Checkout')
            .should('be.visible')
            .click();
        cy.wait(8000);
        cy.logToTerminal('✅ On checkout page');

        // Step 11: Complete Checkout
        cy.logToTerminal('========= Step 11: Complete Checkout =========');

        // Accept terms and conditions
        cy.get('[data-testid="checkout-terms-and-conditions-agreements"] input[type="checkbox"]')
            .check({ force: true });
        cy.wait(2000);
        cy.logToTerminal('✅ Terms accepted');

        // Place Purchase Order
        cy.contains('Place Purchase Order')
            .click({ force: true });
        cy.wait(5000);
        cy.logToTerminal('✅ Order placed');

        cy.logToTerminal('🎉 B2B Quote to Order test completed successfully!');
    });
});
