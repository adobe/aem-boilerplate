import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/search-request-sent.md
 *
 * Required Contexts: page, storefront, searchInput
 */
it("is sent on search bar view/render", { tags: "@skipSaas" }, () => {
  cy.visit("/");
  cy.get(".nav-search-button").should("be.visible").click();
  cy.wait(2000);
  cy.get("#search-bar-input-form").type("cypress");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((adobeDataLayer) => {
        expectsEventWithContext(
          "search-request-sent",
          ["pageContext", "storefrontInstanceContext", "searchInputContext"],
          adobeDataLayer,
        );
      });
  });
});

it(
  "is sent on search results page on view/render",
  { tags: "@skipSaas" },
  () => {
    cy.visit("/search?q=cypress");
    cy.waitForResource("commerce-events-collector.js").then(() => {
      cy.window()
        .its("adobeDataLayer")
        .then((adobeDataLayer) => {
          expectsEventWithContext(
            "search-request-sent",
            ["pageContext", "storefrontInstanceContext", "searchInputContext"],
            adobeDataLayer,
          );
        });
    });
  },
);
