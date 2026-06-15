// Path of the authored Pay By Link page. Lives under /drafts/aries/ during
// the demo phase; update to /pay when the document graduates out of drafts.
const PAY_PATH = '/drafts/aries/pay';

// Structurally-valid 64-char hex token used across all tests.
const VALID_TOKEN = '4d6b20e9f8ed98dcb4287ad80b2e82206c71e4abe0bc3e04015c9ca5ec629d59';

describe('Pay By Link — Order Summary (ACCS-873)', () => {
  function stubPayByLinkOrder(body) {
    cy.intercept('POST', '**/graphql*', (req) => {
      const query = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
      if (query.includes('PAY_BY_LINK_ORDER')) {
        req.reply({ body });
      }
    }).as('payByLinkOrder');
  }

  it('renders the order summary for a valid token (happy path)', () => {
    cy.fixture('payByLinkOrder').then((fixture) => {
      stubPayByLinkOrder(fixture);
      cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
      cy.wait('@payByLinkOrder');

      // Customer email
      cy.get('.pay-by-link__customer-email').should('be.visible');
      cy.get('.pay-by-link__customer-email-value')
        .should('contain.text', 'jane.doe@example.com');

      // Line items
      cy.get('.pay-by-link__items tbody tr').should('have.length', 2);
      cy.get('.pay-by-link__items tbody tr').first()
        .find('.pay-by-link__item-name')
        .should('contain.text', 'Joust Duffle Bag');

      // Addresses
      cy.get('.pay-by-link__address').should('have.length', 2);
      cy.get('.pay-by-link__address').first()
        .should('contain.text', 'Jane Doe');

      // Totals
      cy.get('.pay-by-link__totals').should('be.visible');
      cy.get('.pay-by-link__totals-row--grand').should('be.visible');

      // No error state
      cy.get('.pay-by-link--error').should('not.exist');
    });
  });

  it('renders the expired-token error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Pay By Link token has expired.',
        extensions: { code: 'TOKEN_EXPIRED', category: 'graphql-input' },
      }],
    });
    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    cy.get('.pay-by-link.pay-by-link--error').should('be.visible');
    cy.get('.pay-by-link__error-card[role="alert"]')
      .should('be.visible')
      .should('have.attr', 'aria-live', 'assertive');
    cy.get('.pay-by-link__error-title')
      .should('have.attr', 'tabindex', '-1')
      .invoke('text')
      .should('match', /\S/);
    cy.get('.pay-by-link__error-body').invoke('text').should('match', /\S/);
  });

  it('renders the already-paid error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Order has already been paid.',
        extensions: { code: 'ORDER_ALREADY_PAID', category: 'graphql-input' },
      }],
    });
    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    cy.get('.pay-by-link.pay-by-link--error').should('be.visible');
    cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
    cy.get('.pay-by-link__error-title').invoke('text').should('match', /\S/);
  });

  it('renders the cancelled-order error state', () => {
    stubPayByLinkOrder({
      data: { payByLinkOrder: null },
      errors: [{
        message: 'Order has been cancelled.',
        extensions: { code: 'ORDER_CANCELLED', category: 'graphql-input' },
      }],
    });
    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    cy.get('.pay-by-link.pay-by-link--error').should('be.visible');
    cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
    cy.get('.pay-by-link__error-title').invoke('text').should('match', /\S/);
  });

  it('shows the loading skeleton while the query is in flight and removes it after', () => {
    cy.fixture('payByLinkOrder').then((fixture) => {
      let resolveQuery;

      cy.intercept('POST', '**/graphql*', (req) => {
        const query = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
        if (query.includes('PAY_BY_LINK_ORDER')) {
          return new Promise((resolve) => {
            resolveQuery = () => {
              req.reply({ body: fixture });
              resolve();
            };
          });
        }
      }).as('payByLinkOrder');

      cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
      cy.get('.pay-by-link__skeleton').should('exist');
      cy.then(() => resolveQuery?.());
      cy.wait('@payByLinkOrder');
      cy.get('.pay-by-link__skeleton').should('not.exist');
    });
  });
});
