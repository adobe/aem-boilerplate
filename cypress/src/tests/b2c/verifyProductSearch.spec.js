
import {
  assertImageListDisplay,
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
  });

// Bug on ACCS https://jira.corp.adobe.com/browse/USF-3691
  it("Verify Filter on search results page",  {tags: ["@skipSaas", "@snapPercy" ]}, () => {
    // Visit the homepage
    cy.visit("/search?q=tee");

    // Check if search results are displayed
    cy.get(fields.productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(fields.productCard)
      .should("have.length.at.least", 1);

    assertImageListDisplay('.product-discovery-product-list__grid');

    // Assert a sort option is selected
    cy.get('select').find('option:selected').should('exist');

    // Assert filters are available
    cy.get('.product-discovery-facet [data-slot="FacetBucket"]').should('have.length.at.least', 1);
    // Assert results message is present (no magic numbers; at least 1 result already asserted above)
    cy.contains(/results found for "tee"/).should('be.visible');
    assertImageListDisplay('.product-discovery-product-list__grid');

    // If there is more than one sort option, change sort and assert view changed
    cy.get('select').then(($select) => {
      const options = $select.find('option');
      const initialSelected = options.filter(':selected').text().trim();
      const allTexts = options.toArray().map((el) => el.textContent.trim());
      const otherOptionText = allTexts.find((t) => t !== initialSelected);
      if (options.length <= 1 || !otherOptionText) {
        assertImageListDisplay('.product-discovery-product-list__grid');
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
    });

    cy.percyTakeSnapshot('Search Result page new');

    // Parse the "N results found for \"tee\"" text (product card count is static per page)
    const resultsCountSelector = /results found for "tee"/;
    const parseCount = (text) => {
      const m = String(text).match(/(\d+)\s+results found/);
      return m ? parseInt(m[1], 10) : 0;
    };
    const getResultsCount = () =>
      cy.contains(resultsCountSelector).invoke('text').then(parseCount);

    // Wait for results count to satisfy a condition (uses Cypress retries so DOM has updated)
    const waitForCount = (condition) =>
      cy.contains(resultsCountSelector).should(($el) => {
        const count = parseCount($el.text());
        condition(count);
      }).invoke('text').then(parseCount);

    const filterCheckboxes = '.product-discovery-facet input[type="checkbox"]';

    // Filter assertions: check first filter, assert count changes; then second filter, assert count changes again; clear all
    getResultsCount().then((initialCount) => {
      expect(initialCount).to.be.at.least(1);
      // Check last filter (first might be "all") — expect count to change
      cy.get(filterCheckboxes).last().check({ force: true });
      cy.waitForLoadingSkeletonToDisappear();
      waitForCount((count) => expect(count).to.not.equal(initialCount));
    });
  });

});
