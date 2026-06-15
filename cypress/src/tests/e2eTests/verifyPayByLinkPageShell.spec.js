// Path of the authored Pay By Link page in DA. Lives under /drafts/aries/ during
// the ACCS-869 demo phase; update to /pay when the document graduates out of drafts.
const PAY_PATH = '/drafts/aries/pay';

describe('Pay By Link — /pay route & page shell (ACCS-869)', () => {
  // 64-char lowercase hex matches the HLD §5.A token spec.
  const VALID_TOKEN = '4d6b20e9f8ed98dcb4287ad80b2e82206c71e4abe0bc3e04015c9ca5ec629d59';

  // Tracks GraphQL requests whose body references the payByLinkOrder operation.
  // Other commerce dropins (cart, auth) issue unrelated GraphQL calls on every
  // page load; those are out of scope for this assertion.
  let payByLinkOrderCalls;

  beforeEach(() => {
    payByLinkOrderCalls = [];
    cy.intercept('**/graphql*', (req) => {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
      if (body.includes('payByLinkOrder')) payByLinkOrderCalls.push(req);
    });
  });

  it('renders the missing-token error state when /pay has no token', () => {
    cy.visit(PAY_PATH);

    cy.get('.pay-by-link.pay-by-link--error').should('be.visible');
    cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
    cy.get('.pay-by-link__error-card').should('have.attr', 'aria-live', 'assertive');

    cy.get('.pay-by-link__error-title')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .invoke('text')
      .should('match', /\S/);

    cy.get('.pay-by-link__error-body').invoke('text').should('match', /\S/);
    cy.get('[data-testid="pay-by-link-error-cta"]').should('be.visible');

    cy.then(() => expect(payByLinkOrderCalls).to.have.length(0));
  });

  it('renders the malformed-token error state when /pay has an invalid token', () => {
    cy.visit(`${PAY_PATH}?token=garbage`);

    cy.get('.pay-by-link.pay-by-link--error').should('be.visible');
    cy.get('.pay-by-link__error-card[role="alert"]').should('be.visible');
    cy.get('.pay-by-link__error-title').invoke('text').should('match', /\S/);
    cy.get('.pay-by-link__error-body').invoke('text').should('match', /\S/);

    cy.then(() => expect(payByLinkOrderCalls).to.have.length(0));
  });

  it('renders the shell and fires one payByLinkOrder query when /pay has a structurally valid token', () => {
    cy.intercept('POST', '**/graphql*', (req) => {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || '');
      if (body.includes('PAY_BY_LINK_ORDER')) {
        req.reply({ fixture: 'payByLinkOrder' });
      }
    }).as('payByLinkOrder');

    cy.visit(`${PAY_PATH}?token=${VALID_TOKEN}`);
    cy.wait('@payByLinkOrder');

    cy.get('.pay-by-link').should('exist').should('not.have.class', 'pay-by-link--error');
    cy.get('.pay-by-link__main').should('exist');
    cy.get('.pay-by-link__aside').should('exist');

    // Slot DOM contract — populated by ACCS-873.
    cy.get('.pay-by-link__order-header').should('exist');
    cy.get('.pay-by-link__order-summary').should('exist');
    cy.get('.pay-by-link__addresses').should('exist');
    cy.get('.pay-by-link__order-totals').should('exist');
    cy.get('.pay-by-link__payment').should('exist');
    cy.get('.pay-by-link__footer').should('exist');
  });
});
