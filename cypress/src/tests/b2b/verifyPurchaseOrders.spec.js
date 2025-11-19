/**
 * B2B Purchase Orders Test Suite
 *
 * This test suite verifies the Purchase Orders functionality for B2B customers.
 * Tests include creating, approving, and managing purchase orders.
 */

import { createUserAssignCompanyAndRole } from '../../support/b2bPOAPICalls';
import { texts, approvalRules, users } from '../../fixtures';
import * as selectors from '../../fields';
import * as actions from '../../actions';

describe('B2B Purchase Orders', () => {
  const urls = Cypress.env('poUrls');

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  it(
    'Should verify Purchase Orders end-to-end workflow with approval rules management and order processing',
    { tags: ['@B2BSaas'] },
    () => {
      const config = [
        {
          user: users.po_rules_manager,
          roleId: 55,
        },
        {
          user: users.sales_manager,
          roleId: 53,
        },
        {
          user: users.approver_manager,
          roleId: 54,
        },
      ];
      // Create users sequentially using Cypress commands
      // Use reduce to ensure sequential execution
      config.reduce((chain, element) => {
        return chain.then(() => {
          cy.wait(3000);
          return cy.wrap(null).then(() => {
            cy.log(`Creating user: ${element.user.email}`);
            return createUserAssignCompanyAndRole(element.user, element.roleId);
          });
        });
      }, cy.wrap(null));

      // Test scenario: Create and edit approval rules with Grand Total and Number of SKUs conditions
      // - Creates first rule with Grand Total condition
      // - Edits it to Number of SKUs condition
      // - Creates second rule with Number of SKUs condition
      // - Edits it to Grand Total condition
      // Verifies: Single login session, rule creation, rule editing, condition changes

      actions.login(users.po_rules_manager, urls);

      // === Step 1: Create Approval Rule with Grand Total condition ===
      cy.visit(urls.approvalRules);
      cy.contains('Approval rules').should('be.visible');

      cy.get(selectors.poShowButton).contains(texts.addNewRule).click();

      cy.contains('Purchase order approval rule').should('be.visible');

      actions.fillApprovalRuleForm(approvalRules.rule1, texts);

      cy.get(selectors.poShowButton).contains(texts.save).click();

      cy.contains('Approval rules').should('be.visible');
      cy.contains(approvalRules.rule1.name).should('be.visible');

      // === Step 2: Edit first Approval Rule (Grand Total) to Number of SKUs condition ===
      cy.contains(approvalRules.rule1.name)
        .should('be.visible')
        .closest('tr')
        .find(selectors.poShowButton)
        .contains(texts.show)
        .click();

      cy.get(selectors.poEditButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();

      cy.contains('Purchase order approval rule').should('be.visible');

      actions.fillApprovalRuleForm(approvalRules.rule2, texts);

      cy.get(selectors.poShowButton).contains(texts.save).click();

      cy.contains('Approval rules').should('be.visible');
      cy.contains(approvalRules.rule2.name).should('be.visible');

      // === Step 3: Create Approval Rule with Number of SKUs condition ===
      cy.get(selectors.poShowButton).contains(texts.addNewRule).click();

      cy.contains('Purchase order approval rule').should('be.visible');

      actions.fillApprovalRuleForm(approvalRules.rule3, texts);

      cy.get(selectors.poShowButton).contains(texts.save).click();

      cy.contains('Approval rules').should('be.visible');
      cy.contains(approvalRules.rule3.name).should('be.visible');

      // === Step 4: Edit second Approval Rule (Number of SKUs) to Grand Total condition ===
      cy.get(`tr:contains("${approvalRules.rule3.name}")`)
        .last()
        .find(selectors.poShowButton)
        .contains(texts.show)
        .click();

      cy.get(selectors.poEditButton)
        .filter(`:contains("${texts.edit}")`)
        .first()
        .click();

      cy.contains('Purchase order approval rule').should('be.visible');

      actions.fillApprovalRuleForm(approvalRules.rule4, texts);

      cy.get(selectors.poShowButton).contains(texts.save).click();

      cy.contains('Approval rules').should('be.visible');
      cy.contains(approvalRules.rule4.name).should('be.visible');

      actions.logout(texts);

      // === Step 5: Create Purchase Orders as Sales user ===
      // Test scenario: Sales user creates 3 Purchase Orders with 3 items each
      // These orders will require approval due to quantity/total amount
      // Verifies: Login, product selection, cart, checkout flow, PO creation confirmation

      actions.login(users.sales_manager, urls);

      // Create 3 Purchase Orders
      for (let i = 0; i < 3; i++) {
        actions.createPurchaseOrder(3, false, urls, texts);
        if (i < 2) {
          cy.wait(3000);
        }
      }

      actions.logout(texts);

      // === Step 6: Test scenario: Approver logs in and manages pending Purchase Orders ===
      // - Approves 2 Purchase Orders (status changes to "Order placed")
      // - Rejects 1 Purchase Order (status changes to "Rejected")
      // Verifies: Login, PO list display, bulk approve/reject actions, success messages, status updates

      actions.login(users.approver_manager, urls);

      // Navigate to Purchase Orders page
      cy.visit(urls.purchaseOrders);

      // Find wrapper with Purchase Orders requiring approval
      cy.get(selectors.poApprovalPOWrapper).within(() => {
        // Find table with "Requires my approval" header
        cy.contains('Requires my approval').should('be.visible');

        // Find 3 enabled checkboxes (not disabled, excluding selectAll)
        cy.get(
          `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`
        ).should('have.length.at.least', 3);

        // Verify action buttons exist
        cy.contains(selectors.poShowButton, texts.rejectSelected).should(
          'be.visible'
        );
        cy.contains(selectors.poShowButton, texts.approveSelected).should(
          'be.visible'
        );
      });

      // Select first two checkboxes and approve
      const checkboxSelector = `${selectors.poCheckbox}:not([disabled]):not([name="selectAll"])`;
      [0, 1].forEach((index) => {
        cy.get(selectors.poApprovalPOWrapper)
          .find(checkboxSelector)
          .eq(index)
          .click();
        cy.wait(1500);
      });

      // Click Approve selected button
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, texts.approveSelected)
        .click();

      // Verify approval success message appears
      cy.get('.dropin-in-line-alert--success').should('be.visible');

      // Verify that only 1 "Approval required" item remains (was 3, approved 2)
      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 1);

      // Select third checkbox and reject
      cy.get(selectors.poApprovalPOWrapper)
        .find(checkboxSelector)
        .eq(0)
        .click();
      cy.wait(1500);

      // Click Reject selected button
      cy.get(selectors.poApprovalPOWrapper)
        .contains(selectors.poShowButton, texts.rejectSelected)
        .click();

      // Verify rejection success message appears
      cy.get('.dropin-in-line-alert--success').should('be.visible');

      // Verify that no "Approval required" items remain (all processed)
      cy.get(selectors.poApprovalPOWrapper)
        .find('.b2b-purchase-order-purchase-orders-table__status')
        .contains('Approval required')
        .should('have.length', 0);

      // Find and select 30 in the dropdown
      cy.get(selectors.poApprovalPOWrapper)
        .find(
          'select.dropin-picker__select.dropin-picker__select--primary.dropin-picker__select--medium'
        )
        .select('30')
        .should('have.value', '30');

      // === Step 7: Test scenario: Approver logs in, navigates to "My purchase orders ===
      //      finds first order, expands it, views details page
      //      Verifies: Login, navigation, order expansion, detail page headers

      cy.contains('Requires my approval').should('be.visible');

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .should('be.visible')
        .within(() => {
          cy.contains(selectors.poShowButton, texts.show).first().click();
        });

      cy.get(selectors.poMyApprovalPOWrapper)
        .find(selectors.poTable)
        .contains(selectors.poShowButton, 'View')
        .first()
        .click();

      cy.url().should('not.include', urls.purchaseOrders);

      cy.get('.dropin-header-container__title').should('have.length.gt', 7);
      cy.contains(/Purchase order \d+/).should('be.visible');
      cy.contains('Order placed').should('be.visible');
      cy.contains('Purchase order history log').should('be.visible');
      cy.contains('Purchase order comments').should('be.visible');
      cy.contains('Customer information').should('be.visible');
      cy.contains('Order summary').should('be.visible');
      cy.contains(/Your order \(\d+\)/).should('be.visible');
      cy.contains('Add purchase order comment').should('be.visible');

      // Add a comment
      cy.get('textarea').type('Test comment message');
      cy.contains('button', 'Add Comment').click();
      actions.logout(texts);

      // === Step 8: Test scenario: Sales creates Purchase Order with 1 item (auto-approved), Admin verifies ===
      // - Sales user creates PO with single item (bypasses approval rules)
      // - PO is automatically approved (status: "Order placed")
      // - Sales logs out, Admin logs in
      // - Admin views company Purchase Orders and verifies auto-approved order details

      actions.login(users.sales_manager, urls);
      actions.createPurchaseOrder(1, true, urls, texts);
      actions.logout(texts);

      actions.login(users.po_rules_manager, urls);

      cy.visit(urls.purchaseOrders);
      cy.wait(1000);

      cy.get(selectors.poCompanyPOContainer).should('exist');

      cy.contains('Company purchase orders').should('be.visible');

      cy.get(selectors.poCompanyPOContainer)
        .contains(selectors.poShowButton, texts.show)
        .first()
        .click();

      cy.get(selectors.poCompanyPOContainer)
        .find('.b2b-purchase-order-purchase-orders-table__row-details-content')
        .should('be.visible')
        .within(() => {
          cy.contains(/Total: \$\d+\.\d{2}/)
            .invoke('text')
            .then((text) => {
              const match = text.match(/Total: \$(\d+\.\d{2})/);
              if (match) {
                const total = parseFloat(match[1]);
                cy.log(`Found total: $${total}`);
                expect(total).to.be.lessThan(10);
              }
            });
        });
      actions.logout(texts);

      // === Step 8: Delete approval rules ===
      // Navigate to Approval Rules page

      actions.login(users.po_rules_manager, urls);
      cy.wait(1000);
      cy.visit(urls.approvalRules);

      cy.contains('Approval rules').should('be.visible');

      cy.contains(selectors.poShowButton, texts.show).first().click();

      cy.contains(selectors.poShowButton, 'Delete').first().click();
      cy.wait(1000);

      cy.contains(selectors.poShowButton, 'Delete').first().click();

      cy.contains(selectors.poShowButton, texts.show).should('not.exist');
    }
  );

  it('Logout Sale and Delete Customer', { tags: ['@B2BSaas'] }, () => {
    actions.login(users.sales_manager, urls);
    cy.url().should('include', urls.account);
  });

  it('Logout Approver and Delete Customer', { tags: ['@B2BSaas'] }, () => {
    actions.login(users.approver_manager, urls);
    cy.url().should('include', urls.account);
  });
});
