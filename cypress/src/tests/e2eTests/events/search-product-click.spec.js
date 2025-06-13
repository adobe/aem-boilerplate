/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/search-product-click.md
 *
 * Required contexts: page, storefront, searchResult
 */
it.skip("is sent on search bar product click", { tags: "@skipSaas" }, () => {
  cy.visit("/");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        const pageContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.pageContext,
        );
        const storefrontInstanceContextIndex = adobeDataLayer.findIndex(
          (event) => !!event?.storefrontInstanceContext,
        );
        // page and storefront pushed before spy
        expect(pageContextIndex).to.be.greaterThan(-1);
        expect(storefrontInstanceContextIndex).to.be.greaterThan(-1);
      });
  });
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      cy.get(".nav-search-button").should("be.visible").click();
      cy.wait(2000);
      cy.get("#search").type("shirt");
      cy.get(".livesearch .products-container a", { timeout: 10000 })
        .first()
        .click()
        .then(() => {
          cy.get("@adl", { timeout: 1000 }).should((adobeDataLayerPush) => {
            const targetEventIndex = adobeDataLayerPush.args.findIndex(
              (event) => event[0]?.event === "search-product-click",
            );
            const searchResultsContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.searchResultsContext,
            );
            expect(targetEventIndex).to.be.greaterThan(-1);
            expect(searchResultsContextIndex).to.be.greaterThan(-1);
          });
        });
    });
  });
});
