describe('Store Switcher', () => {
    beforeEach(() => {
      // add root meta tag to the page
      cy.on('window:before:load', (win) => {
        const meta = win.document.createElement('meta');
        meta.name = 'root';
        meta.content = '/';
        win.document.head.appendChild(meta);
      });
    });

    it('should allow the user to switch stores', () => {
        cy.intercept('GET', '/store-switcher.plain.html', (req) => {
          req.reply({
            statusCode: 200,
            body: `
              <div>
                <h3 id="select-a-store">Select a store</h3>
              </div>
              <div>
                <ul>
                  <li>United States ($)
                    <ul>
                      <li><a href="/">United States ($)</a></li>
                    </ul>
                  </li>
                  <li>Canada (CA$)
                    <ul>
                      <li><a href="/">Canada (EN)</a></li>
                      <li><a href="/">Canada (FR)</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div></div>
            `
          });
        });

        // Visit the homepage
        cy.visit('/');


        // Open storeview-switcher-button button and click
        cy.get('.storeview-switcher-button > button')
            .should('be.visible')
            .click();

        // Check if storeview-modal is visible
        cy.get('#storeview-modal')
            .should('be.visible');

        // Check if storeview-modal-storeview-title is visible and contains string "Select a store"
        cy.get('.storeview-modal-storeview-title')
            .should('be.visible')
            .contains('Select a store');

        // Check if storeview-modal-storeview-list is visible
        cy.get('.storeview-modal-storeview-list')
            .should('be.visible');

        // Check if storeview-modal-storeview-list contains at least 2 stores
        cy.get('.storeview-modal-storeview-list a')
            .should('have.length.greaterThan', 1);

        // check if storeview-single-store and storeview-multiple-stores are visible
        cy.get('.storeview-single-store, .storeview-multiple-stores')
            .should('be.visible');

        // When clicking on storeview-multiple-stores, an accordion dropdown should open with more than or equal to two links
        cy.get('.storeview-multiple-stores')
            .click()
            .get('.storeview-multiple-stores > ul')
            .should('be.visible')
            .find('li')
            .should('have.length.greaterThan', 1);

        // storeview-single-store should contain a single link
        cy.get('.storeview-single-store')
            .find('a')
            .should('have.length', 1);

        // get the text from storeview-single-store and store it in a variable, click on storeview-single-store link, and check if storeview-switcher-button button contains the storeName text
        let storeName;
        cy.get('.storeview-single-store a').then(($storeName) => {
            storeName = $storeName.text();
            // Click on the storeview-single-store link
            cy.get('.storeview-single-store a')
                .click();
            // storeview-switcher-button button should contain the storeName text
            cy.get('.storeview-switcher-button > button')
                .should('contain', storeName);
        }
        );

        // Open storeview-switcher-button button and click
        cy.get('.storeview-switcher-button > button')
            .should('be.visible')
            .click();

        // click on storeview-multiple-stores, accordion should be visble, click on the first link, and check if storeview-switcher-button button contains the storeName text
        let multiStoreName;
        cy.get('.storeview-multiple-stores')
        .click()
        .get('.storeview-multiple-stores > ul')
        .should('be.visible')
        .find('li a').then(($multiStoreName) => {
            multiStoreName = $multiStoreName.first().text();
            cy.intercept('GET', '/store-switcher.plain.html', (req) => {
              req.reply({
                statusCode: 200,
                body: `
                  <div>
                    <h3 id="choisissez-un-magasin">Choisissez un magasin</h3>
                  </div>
                  <div>
                    <ul>
                      <li>Canada (CA$)
                        <ul>
                          <li><a href="/">Canada (EN)</a></li>
                          <li><a href="/">Canada (FR)</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div></div>
                `
              });
            });
            cy.get('.storeview-multiple-stores > ul > li a').first().click()
            cy.get('.storeview-switcher-button > button')
                .should('contain', multiStoreName);
        }
        )
    });
});