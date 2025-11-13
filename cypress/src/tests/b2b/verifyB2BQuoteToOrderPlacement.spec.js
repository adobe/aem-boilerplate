import {
    createCustomerAndAssignCompany,
    submitQuoteToCustomer,
} from '../../support/b2bQuoteAPICalls';
import {
    assertCartSummaryProduct,
    assertSignInSuccess,
} from "../../assertions";
import {
    signInUser,
} from "../../actions";

describe("Verify B2B Quote feature", () => {
    let customerData;
    before(() => {
        // Load customer fixture data
        cy.fixture('customerinfo').then((data) => {
            customerData = data;
        });
    });
    it("Verify B2B Quote to Order Placement", { tags: "@B2BSaas" }, () => {
        const random = Cypress._.random(0, 10000000);
        const username = `${random}${customerData.customer.email}`;
        // Visit the homepage
        cy.visit('/').then(async () => {
            // Create customer and Assign Company through Rest API
            try {
                const result = await createCustomerAndAssignCompany(
                    customerData.customer.firstname,
                    customerData.customer.lastname,
                    username,
                    customerData.customer.password,
                    customerData.customer.is_subscribed,
                );
            } catch (error) {
                console.error('Error:', error);
            }
        });

        // Login company user
        cy.visit('/customer/login');
        signInUser(username, customerData.customer.password);
        assertSignInSuccess(customerData.customer.firstname, customerData.customer.lastname, username);

        // Add product to cart
        cy.visit("/products/youth-tee/adb150");
        cy.get(".dropin-incrementer__input").clear().type(10);
        cy.wait(1000);
        cy.get(".dropin-incrementer__input").should("have.value", "10");
        cy.get(".product-details__buttons__add-to-cart button")
            .should("be.visible")
            .click();

        // assert product exists in mini cart
        cy.get(".minicart-wrapper").click();
        cy.get('.minicart-panel[data-loaded="true"]').should('exist');
        cy.get(".minicart-panel").should("not.be.empty");
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".cart-mini-cart");
        cy.contains("View Cart").click();

        // assert product exists in cart
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".commerce-cart-wrapper");

        // Request a quote
        cy.contains("Request a Quote").click();
      
        // Needs to be imlemented
        // Submit quote
        // Approve quote using admin rest api
        // Place order
    });
});
