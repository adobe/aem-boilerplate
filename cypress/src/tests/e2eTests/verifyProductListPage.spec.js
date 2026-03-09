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

        // Wait for PLP to finish loading before asserting images (avoids flake when run with full suite)
        cy.waitForLoadingSkeletonToDisappear();

        assertImageListDisplay('.product-discovery-product-list__grid');

        // If there is more than one sort option, change sort and assert it changed
        cy.get('select').then($select => {
            const options = $select.find('option');
            const initialSelected = options.filter(':selected').text().trim();
            const allTexts = options.toArray().map((el) => el.textContent.trim());
            const otherOptionText = allTexts.find((t) => t !== initialSelected);
            if (options.length <= 1 || !otherOptionText) {
                assertImageListDisplay('.product-discovery-product-list__grid');
                cy.percyTakeSnapshot('Product List page Category new');
                return;
            }
            cy.get('select').select(otherOptionText);
            cy.waitForLoadingSkeletonToDisappear();
            cy.get('select')
                .find('option:selected')
                .invoke('text')
                .then((selectedText) => {
                    expect(selectedText.trim()).not.to.equal(initialSelected);
                });
            assertImageListDisplay('.product-discovery-product-list__grid');
            cy.percyTakeSnapshot('Product List page Category new');
        });
    });
});
