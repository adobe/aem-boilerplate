import {
    assertCartSummaryProduct,
    assertTitleHasLink,
    assertProductImage
} from "../../assertions";
import { products } from "../../fixtures";

describe("Verify Cart undo feature", () => {
    it("Verify Cart undo feature", () => {
        // Navigate to PDP
        cy.visit(products.simple.urlPath);

        // Alias ADD_PRODUCTS_TO_CART_MUTATION network request 
        const apiMethod = "ADD_PRODUCTS_TO_CART_MUTATION";
        const urlTest = Cypress.env("graphqlEndPoint");

        cy.intercept("POST", urlTest, (req) => {
            let data = req.body.query;
            if (data && typeof data == "string") {
                if (data.includes(apiMethod)) {
                    req.alias = "addProductToCart";
                }
            }
        });

        cy.contains("Add to Cart")
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        // Wait for Add to cart call to complete    
        cy.wait("@addProductToCart");
        
        cy.get(".minicart-wrapper").click();
        cy.get(".minicart-panel[data-loaded='true']").should('exist');
        cy.get(".minicart-panel").should("not.be.empty");
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "1",
            "$10.00",
            "$10.00",
            "0",
        )(".cart-mini-cart");
        //Navaigate to draft page 
        cy.visit("/drafts/tests/cart");

        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "1",
            "$10.00",
            "$10.00",
            "0",
        )(".commerce-cart-wrapper");
        assertTitleHasLink(
            "Youth tee",
            "/products/youth-tee/adb150",
        )(".commerce-cart-wrapper");
        assertProductImage(Cypress.env("productImageName"))(
            ".commerce-cart-wrapper",
        );

        // Remove product from cart
        cy.get('.dropin-cart-item__remove').first().click();

        // Undo message exists
        cy.contains('Changed your mind? You can undo this action.').should('be.visible');

        // Click on undo button
        cy.contains('Undo').should('be.visible').click();

        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "1",
            "$10.00",
            "$10.00",
            "0",
        )(".commerce-cart-wrapper");
        assertTitleHasLink(
            "Youth tee",
            "/products/youth-tee/adb150",
        )(".commerce-cart-wrapper");
        assertProductImage(Cypress.env("productImageName"))(
            ".commerce-cart-wrapper",
        );

    });
});

