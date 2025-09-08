import {
    assertImageListDisplay
} from "../../assertions";

describe("Verify Product List Page", () => {
    it("Verify PLP page loads", { tags: "@snapPercy" }, () => {
        cy.visit("");

        // Open Catalog Menu
        cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");

        // Navaigate to Apperal category page
        cy.contains("Apparel").should('be.visible').click();

        assertImageListDisplay('.product-discovery-product-list__grid');

        // Assert Position Sort is selected
        cy.get('select')
            .find('option:selected')
            .should('have.text', 'Position');

        // Select new Sort
        cy.get('select').select('Product Name').should('have.value', 'name_DESC');
        cy.waitForLoadingSkeletonToDisappear();
        cy.contains('Youth tee: Colors outside the lines').should('be.visible');
        assertImageListDisplay('.product-discovery-product-list__grid');

        cy.percyTakeSnapshot('Product List page Category new');

    });
});

