
import {
  assertImageListDisplay,
  assertSearchResultClick,
  assertSearchResults
} from "../../assertions";

import {
  inputSearchString
} from "../../actions";

import * as fields from "../../fields";

describe("Search Feature", () => {
  it("Verify quick search features", () => {
    // Visit the homepage
    cy.visit("/");

    //Input search string
    inputSearchString("tops");

    assertSearchResults();

    assertImageListDisplay('.product-discovery-product-list__grid');

    assertSearchResultClick();

  });

  it("Verify Search results page", () => {
    // Visit the homepage
    cy.visit("/");

    // Input search string and hit enter
    inputSearchString("sleeve{enter}");

    // Wait for random quick search dropdown to disappear
    cy.wait(1000);

    assertSearchResults();

    assertImageListDisplay('.product-discovery-product-list__grid');

    assertSearchResultClick();

  });

// Bug on ACCS https://jira.corp.adobe.com/browse/USF-3691
  it("Verify Filter on search results page",  {tags: ["@skipSaas", "@snapPercy" ]}, () => {
    // Visit the homepage
    cy.visit("/search?q=tee&page=1&sort=&filter=categories%3Acollections");

    // Check if search results are displayed
    cy.get(fields.productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(fields.productCard)
      .should("have.length.at.least", 1);

    assertImageListDisplay('.product-discovery-product-list__grid');

    // Assert Position Sort is selected
    cy.get('select')
      .find('option:selected')
      .should('have.text', 'Relevance');

    // Assert filter checkbox is checked
    cy.get('input[type="checkbox"][value="collections"]')
      .should('be.checked');
    cy.contains('18 results found for "tee".');
    assertImageListDisplay('.product-discovery-product-list__grid');


    // Select new Sort
    cy.get('select').select('Price: Low to High').should('have.value', 'price_ASC');
    cy.waitForLoadingSkeletonToDisappear();
    cy.contains('Beverage floatie - Confetti').should("be.visible");
    assertImageListDisplay('.product-discovery-product-list__grid');

    cy.percyTakeSnapshot('Search Result page new');

    // Uncheck Filter checkbox
    cy.get('input[type="checkbox"][value="collections"]').uncheck({ force: true });
    cy.contains('35 results found for "tee".');

    // Check Filter checkbox
    cy.get('input[type="checkbox"][value="apparel/shirts"]').check({ force: true });
    cy.contains('9 results found for "tee".');

    // Clear all filters
    cy.contains('Clear All').click();
    cy.contains('35 results found for "tee".');
  });

});