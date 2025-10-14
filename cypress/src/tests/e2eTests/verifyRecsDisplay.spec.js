import {
    assertImageListDisplay
} from "../../assertions";

describe("Verify Product Recommendation dropin display", { tags: "@skipSaas" }, () => {
    it("Verify recs dropin loads on PLP", () => {
        //Navaigate to draft page 
        cy.visit("/drafts/tests/apparel");

        cy.get('.recommendations-product-list__content').scrollIntoView();
        assertImageListDisplay('.recommendations-product-list__content', 3);
        cy.get('.recommendations-carousel__content').scrollTo('right');
        cy.get('[aria-label="Product 4 of 5"]').should('be.visible');
        cy.get('[aria-label="Product 5 of 5"]').should('be.visible');
        cy.get('[aria-label="Product 4 of 5"]').click();

        // Verify navigation to product page
        cy.url().should("include", "/products/");

        // Verify product page elements are loaded
        cy.get(".product-details")
            .should("be.visible");
    });
});

