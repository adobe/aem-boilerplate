import { signUpUser } from "../../actions";
import { assertAuthUser } from "../../assertions";
import { products } from "../../fixtures";
import * as fields from "../../fields";

/**
 * Create a new Requisition List from PDP and PLP
 * @param {string} selector
 * @param {string} listName
 * @param {string} description
 * @param {number|null} index - Index if needed .eq() (for PLP use 0, for PDP use null or skip this parameter)
 */
function createRequisitionList(selector, listName, description, index = null) {
  const element =
    index !== null ? cy.get(selector).eq(index) : cy.get(selector);
  element.click();

  cy.get(fields.requisitionListActions).should("exist").click();
  cy.get(fields.requisitionListForm).should("be.visible");

  // Wait for the form to be interactable
  cy.wait(1000);
  cy.get(fields.requisitionListFormName).type(listName);
  cy.wait(1000);
  cy.get(fields.requisitionListFormDescription).type(description);
  cy.wait(1000);
  cy.contains("Save").should("be.visible").click();

  // Wait for the action to complete
  cy.wait(1000);
  cy.get(fields.requisitionListAlert)
    .should("be.visible")
    .contains("Item(s) successfully added to requisition list");

  cy.wait(2000);
}

/**
 * Verify the Requisition List exist and can be selected
 * @param {string} selector
 * @param {string} listName
 * @param {number|null} index - Index if needed .eq() (for PLP use 0, for PDP use null)
 */
function assertRequisitionListExists(selector, listName, index = null) {
  const element =
    index !== null ? cy.get(selector).eq(index) : cy.get(selector);
  element.click();

  cy.get(fields.requisitionListSelectorForm).should("exist");
  cy.get(fields.requisitionListSelectorAvailableLists).should("exist");
  cy.get(fields.requisitionListFormActionsButton)
    .should("exist")
    .should("be.disabled");
  cy.get(fields.requisitionListSelectorAvailableLists).should(
    "contain",
    listName
  );
  cy.wait(1000);
  cy.get(fields.requisitionListSelectorAvailableListFirstChild).click();
  cy.get(fields.requisitionListFormActionsButton)
    .should("not.be.disabled")
    .click();

  // Wait for the action to complete
  cy.wait(1000);
  cy.get(fields.requisitionListAlert)
    .should("be.visible")
    .contains("Item(s) successfully added to requisition list");

  cy.wait(2000);
}

describe("Verify B2B Requisition Lists feature", { tags: "@B2BSaas" }, () => {
  it("Verify B2B Requisition is not available for guest users", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should("not.exist");

    // Open Catalog Menu
    cy.get(fields.navDrop).first().should("be.visible").trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should("be.visible").click();
    cy.get(fields.addToRequisitionListButton).should("not.exist");
  });

  it("Verify B2B Requisition is available for authenticated users", () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate to Requisition Lists from Account menu
    cy.contains("Requisition Lists").should("be.visible").click();
    cy.get(fields.reqListGridEmptyList)
      .should("exist")
      .within(() => {
        cy.contains("No Requisition Lists found").should("be.visible");
      });

    // Create new Requisition List
    cy.contains("Add new Requisition List").should("be.visible").click();
    cy.get(fields.requisitionListFormName).type(
      "Newly Created Requisition List"
    );
    cy.get(fields.requisitionListFormDescription).type(
      "Here goes a dummy description"
    );
    cy.contains("Cancel").should("be.visible");
    cy.contains("Save").should("be.visible").click();
    cy.contains("Newly Created Requisition List").should("be.visible");
    cy.get(fields.requisitionListItemRow).should("have.length", 1);

    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should("exist");

    describe("PDP Workflow", () => {
      assertRequisitionListExists(
        fields.requisitionListSelector,
        "Newly Created Requisition List"
      );
      createRequisitionList(
        fields.requisitionListSelector,
        "Req list created from PDP",
        "Another dummy description"
      );
      assertRequisitionListExists(
        fields.requisitionListSelector,
        "Req list created from PDP"
      );

      // Open Catalog Menu
      cy.get(fields.navDrop).first().should("be.visible").trigger("mouseenter");

      // Navigate to Apparel category page
      cy.contains("Apparel").should("be.visible").click();
    });

    describe("PLP Workflow", () => {
      assertRequisitionListExists(
        fields.requisitionListSelector,
        "Newly Created Requisition List",
        0
      );
      createRequisitionList(
        fields.requisitionListSelector,
        "Now Req list created from PLP",
        "Yet another dummy description",
        0
      );
      assertRequisitionListExists(
        fields.requisitionListSelector,
        "Now Req list created from PLP",
        0
      );

      // Open Catalog Menu
      cy.get(fields.navDrop).first().should("be.visible").trigger("mouseenter");

      // Navigate to Apparel category page
      cy.contains("Apparel").should("be.visible").click();
    });

    // Go to customer account page
    cy.visit("/customer/account");

    cy.contains("Requisition Lists").should("be.visible").click();
    cy.get(fields.reqListGridWrapper).should("exist");
    cy.get(fields.requisitionListItemRow).should("have.length", 3);

    describe("Requisition List Grid Workflow", () => {
      // Rename Requisition List
      cy.get(fields.requisitionListItemActionsRenameButton).eq(1).click();
      cy.contains("Update Requisition List").should("be.visible");
      cy.wait(1000);
      cy.get(fields.requisitionListFormName)
        .clear()
        .type("Updated Requisition List");
      cy.wait(1000);
      cy.get(fields.requisitionListFormDescription)
        .clear()
        .type("Dummy description");
      cy.wait(1000);
      cy.contains("Save").should("be.visible").click();
      cy.contains("Updated Requisition List").should("be.visible");

      // Delete Requisition List
      cy.get(fields.requisitionListItemActionsDeleteButton).eq(2).click();
      cy.get(fields.requisitionListModalConfirmButton).click();
      cy.get(fields.requisitionListItemRow).should("have.length", 2);
    });

    describe("Requisition List View Workflow", () => {
      // Click first link on the list
      cy.get(fields.requisitionListGridNameLink).eq(0).click();
      cy.contains("Newly Created Requisition List").should("be.visible");

      // 1. Rename Requisition List from the Requisition List view page
      cy.get(fields.requisitionListViewRenameButton).click();
      cy.contains("Update Requisition List").should("be.visible");
      cy.wait(1000);
      cy.get(fields.requisitionListFormName)
        .clear()
        .type("Now updating from RL view page");
      cy.wait(1000);
      cy.get(fields.requisitionListFormDescription)
        .clear()
        .type("Dummy description one more time");
      cy.wait(1000);
      cy.contains("Save").should("be.visible").click();
      cy.contains("Now updating from RL view page").should("be.visible");
      cy.contains("Requisition list updated successfully.").should("be.visible");

      // 2. Update quantity of the first item in the Requisition List
      cy.get(fields.requisitionListViewQuantityInput).eq(0).click();
      cy.wait(1000);
      cy.get(fields.requisitionListViewQuantityInput)
        .eq(0)
        .clear()
        .type("10")
        .blur();
      cy.wait(1000);
      cy.contains("Item quantity updated successfully.").should("be.visible");
      cy.get(fields.requisitionListViewQuantityInput)
        .eq(0)
        .should("have.value", "10");

      // 3. Move all items to cart
      cy.get(fields.requisitionListViewBatchActionsToggle).click();
      cy.get(fields.requisitionListViewBatchActionsCountBadge).should(
        "have.text",
        "2"
      );

      cy.get(fields.requisitionListViewBulkActionsAddToCartButton).click();

      // Verify success message appears (check immediately before it auto-dismisses)
      cy.contains("Item(s) successfully moved to cart.", { timeout: 5000 }).should("be.visible");

      // Wait for the cart to be refreshed and the data-count attribute to be updated
      // The cart refresh happens automatically via requisitionList/alert event
      // Cypress will retry the assertion until it passes or times out
      cy.get(fields.miniCartButton, { timeout: 30000 })
        .should("exist")
        .and("have.attr", "data-count", "12");

      // 4. Delete all items from the Requisition List
      cy.get(fields.requisitionListViewBatchActionsToggle).click();
      cy.get(fields.requisitionListViewBatchActionsCountBadge).should(
        "not.exist"
      );
      cy.wait(1000);
      cy.get(fields.requisitionListViewBatchActionsToggle).click();
      cy.get(fields.requisitionListViewBatchActionsCountBadge).should(
        "have.text",
        "2"
      );
      cy.get(fields.requisitionListViewBulkActionsDeleteButton).click();
      cy.get(fields.requisitionListModalConfirmButton).click();
      cy.contains("Item(s) deleted successfully.").should("be.visible");
      cy.get(fields.requisitionListItemRow).should("have.length", 0);

      // 5. Delete the whole Requisition List
      cy.get(fields.requisitionListViewDeleteButton).click();
      cy.get(fields.requisitionListModalConfirmButton).click();
      cy.contains("Requisition list deleted successfully.").should("be.visible");


      cy.url().should("include", "customer/requisition-lists");
      cy.get(fields.requisitionListItemRow).should(
        "not.have",
        "Now updating from RL view page"
      );
    });
  });
});
