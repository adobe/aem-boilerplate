import { expectsEventWithContext } from "../../../assertions";
/**
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-request-sent.md
 *   required contexts: page, storefront
 *
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-response-received.md
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-unit-render.md
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-unit-view.md
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-item-click.md
 * https://github.com/adobe/commerce-events/blob/main/examples/events/recs-item-add-to-cart.md
 *  required contexts: page, storefront, recommendations
 *
 */

const RECS_URL = '/products/play-create-repeat-crewneck/ADB388';
it('api-request-sent, api-response-received, unit-impression-render', () => {
  cy.visit(RECS_URL);
  cy.waitForResource('commerce-events-collector.js').then(() => {
    cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
      expectsEventWithContext(
        'recs-api-request-sent',
        ['pageContext', 'storefrontInstanceContext'],
        adobeDataLayer,
      );
      expectsEventWithContext(
        'recs-api-response-received',
        ['pageContext', 'storefrontInstanceContext', 'recommendationsContext'],
        adobeDataLayer,
      );
      expectsEventWithContext(
        'recs-unit-impression-render',
        ['pageContext', 'storefrontInstanceContext', 'recommendationsContext'],
        adobeDataLayer,
      );
    });
  });
});

it('recs-unit-view', () => {
  cy.viewport(1440, 600)
  cy.visit(RECS_URL);
  cy.waitForResource('commerce-events-collector.js').then(() => {
    cy.get('.product-recommendations-wrapper').scrollIntoView({ duration: 1000 });
    cy.window().its('adobeDataLayer').then((adobeDataLayer) => {
      expectsEventWithContext(
        'recs-unit-view',
        ['pageContext', 'storefrontInstanceContext', 'recommendationsContext'],
        adobeDataLayer,
      );

      return adobeDataLayer;
    }).then(adobeDataLayer => {
      // triggers a second view when scrolled again
      cy.get('.pdp-header__title').scrollIntoView({ duration: 50 }).then(() => {
        cy.get('.product-recommendations-wrapper').scrollIntoView({ duration: 50 }).then(() => {
          const eventCount = adobeDataLayer.filter(data => data?.event === 'recs-unit-view');
          expect(eventCount).to.have.lengthOf(2);
        });
      });
    });
  });
});

it('recs-item-click', () => {
  cy.visit(RECS_URL);
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      cy.get('.product-grid-item')
        .first()
        .click()
        .then(() => {
          cy.get("@adl", { timeout: 2000 }).should((adobeDataLayerPush) => {
            const targetEventIndex = adobeDataLayerPush.args.findIndex(
              (event) => event[0]?.event === "recs-item-click"
            );
            const pageContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.pageContext
            );
            const storefrontInstanceContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.storefrontInstanceContext
            );
            const recommendationsContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.recommendationsContext
            );
            expect(targetEventIndex, 'recs-item-click').to.be.greaterThan(-1);
            expect(pageContextIndex, 'pageContext').to.be.greaterThan(-1);
            expect(storefrontInstanceContextIndex, 'storefrontInstanceContext').to.be.greaterThan(-1);
            expect(recommendationsContextIndex, 'recommendationsContext').to.be.greaterThan(-1);
          });
        });
    });
  });
});

it('reqs-item-add-to-cart', () => {
  cy.visit(RECS_URL);
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window().then((win) => {
      cy.spy(win.adobeDataLayer, "push").as("adl");
      cy.get('.product-grid-item button')
        .first()
        .click()
        .then(() => {
          cy.get("@adl", { timeout: 2000 }).should((adobeDataLayerPush) => {
            const targetEventIndex = adobeDataLayerPush.args.findIndex(
              (event) => event[0]?.event === "recs-item-add-to-cart"
            );
            const pageContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.pageContext
            );
            const storefrontInstanceContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.storefrontInstanceContext
            );
            const recommendationsContextIndex = adobeDataLayerPush.args.findIndex(
              (event) => !!event[0]?.eventInfo?.recommendationsContext
            );
            expect(targetEventIndex, 'recs-item-click').to.be.greaterThan(-1);
            expect(pageContextIndex, 'pageContext').to.be.greaterThan(-1);
            expect(storefrontInstanceContextIndex, 'storefrontInstanceContext').to.be.greaterThan(-1);
            expect(recommendationsContextIndex, 'recommendationsContext').to.be.greaterThan(-1);
          });
        });
    });
  });
});
