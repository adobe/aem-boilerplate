import { signUpUser } from '../../actions';
import { assertAuthUser } from '../../assertions';
import { products } from '../../fixtures';
import * as fields from "../../fields";

describe("Verify B2B Requisition Lists feature", { tags: "@B2BSaas" },  () => {
  it("Verify B2B Requisition is not available for guest users", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should('not.exist');

    // Open Catalog Menu
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();
    cy.get(fields.addToRequisitionListButton).should('not.exist');
  });

  it("Verify B2B Requisition is available for authenticated users", () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate to Requisition Lists from Account menu
    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get(fields.reqListGridEmptyList).should('exist')
      .within(() => {
        cy.contains('No Requisition Lists found').should('be.visible');
      });

    // Create new Requisition List
    cy.contains('Add new Requisition List').should('be.visible').click();
    cy.get(fields.requisitionListFormName).type('Newly Created Requisition List');
    cy.get(fields.requisitionListFormDescription).type('Here goes a dummy description');
    cy.contains('Cancel').should('be.visible');
    cy.contains('Save').should('be.visible').click();
    cy.contains('Newly Created Requisition List').should('be.visible');
    cy.get(fields.requisitionListItemRow).should('have.length', 1);

    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should('exist');

    // Add product to Existing Requisition List from PDP
    cy.get(fields.requisitionListNamesOnPDP).select('Newly Created Requisition List');

    // Create a new list and add product to it from PDP
    cy.get(fields.requisitionListNamesOnPDP).select('Create Requisition List');
    cy.get(fields.requisitionListFormName).type('Req list created from PDP');
    cy.get(fields.requisitionListFormDescription).type('Another dummy description');
    cy.contains('Save').should('be.visible').click();

    // Assert new Requisition List is created and can be selected
    cy.get(fields.requisitionListNamesOnPDP).select('Req list created from PDP');

    // Open Catalog Menu
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();
    cy.get(fields.requisitionListNamesOnPLP).should('exist');

    // Add product to Existing Requisition List from PLP
    cy.get(fields.requisitionListNamesOnPDP).eq(1).select('Newly Created Requisition List');

    // Create a new list and add product to it from PLP
    cy.get(fields.requisitionListNamesOnPDP).eq(1).select('Create Requisition List')
    cy.get(fields.requisitionListFormName).type('Now a Req list from PLP');
    cy.get(fields.requisitionListFormDescription).type('Yet another dummy description');
    cy.contains('Save').should('be.visible').click();

    // Assert new Requisition List is created and can be selected
    cy.get(fields.requisitionListNamesOnPDP).eq(1).select('Now a Req list from PLP');

    // Go to customer account page
    cy.visit("/customer/account");

    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get(fields.reqListGridWrapper).should('exist');
    cy.get(fields.requisitionListItemRow).should('have.length', 3);

    // Rename Requisition List
    cy.get(fields.requisitionListItemActionsRenameButton).eq(1).click();
    cy.contains('Rename Requisition List').should('be.visible');
    cy.get(fields.requisitionListFormName).clear().type('Updated Requisition List');
    cy.get(fields.requisitionListFormDescription).clear().type('Dummy description');
    cy.contains('Save').should('be.visible').click();
    cy.contains('Updated Requisition List').should('be.visible');

    // Remove Requisition List
    cy.get(fields.requisitionListItemActionsRemoveButton).eq(2).click();
    cy.get(fields.requisitionListModalConfirmButton).click();
    cy.get(fields.requisitionListItemRow).should('have.length', 2);
  });

});
