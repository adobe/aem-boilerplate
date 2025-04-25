describe('Verify stock notification message', () => {
    it('Verify low stock and max qty allowed notification message', () => {
        cy.visit('/products/play-create-repeat-crewneck/ADB388');
        cy.get('.dropin-incrementer__input').clear().type('1000');
        cy.wait(1000)
        cy.get('.dropin-incrementer__increase-button').click();
        cy.get('.dropin-incrementer__input').should('have.value', '1001');
        // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
        cy.wait(1000);
        cy.contains('Add to Cart').click();
        cy.contains('Error').should('be.visible')

        cy.get('.dropin-incrementer__input').clear().type('10000');
        cy.wait(1000)
        cy.get('.dropin-incrementer__increase-button').click();
        cy.get('.dropin-incrementer__input').should('have.value', '10001');
        // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
        cy.wait(1000);
        cy.contains('Add to Cart').click();
        cy.contains('The requested qty exceeds the maximum qty allowed in shopping cart').should('be.visible');
    });
});