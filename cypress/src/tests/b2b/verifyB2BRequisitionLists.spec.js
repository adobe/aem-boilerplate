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

    // PDP Workflow

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

    // PLP Workflow

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

    // Go to customer account page
    cy.visit("/customer/account");

    cy.contains("Requisition Lists").should("be.visible").click();
    cy.get(fields.reqListGridWrapper).should("exist");
    cy.get(fields.requisitionListItemRow).should("have.length", 3);

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

    // Remove Requisition List
    cy.get(fields.requisitionListItemActionsRemoveButton).eq(2).click();
    cy.get(fields.requisitionListModalConfirmButton).click();
    cy.get(fields.requisitionListItemRow).should("have.length", 2);
  });
});
