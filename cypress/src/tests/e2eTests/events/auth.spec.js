import { signUpUser } from "../../../actions";
import { assertAuthUser, expectsEventWithContext } from "../../../assertions";

it("has shopperId as logged-in when authenticated, and guest when not", () => {
  // 1. checks that shopperContext is guest on first non-authenticated page load
  cy.visit("/");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((dl) => {
        const index = dl.findLastIndex((el) => el.shopperContext);
        cy.wrap(dl)
          .its(index)
          .should("eql", { shopperContext: { shopperId: "guest" } });
      });
  });

  // 2. creates customer and checks that shopperContext is set to logged-in
  cy.visit("/customer/create");
  cy.fixture("userInfo").then(({ sign_up }) => {
    signUpUser(sign_up);
    assertAuthUser(sign_up);
  });
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((dl) => {
        const index = dl.findLastIndex((el) => el.shopperContext);
        cy.wrap(dl)
          .its(index)
          .should("eql", { shopperContext: { shopperId: "logged-in" } });
      });
  });

  // 3. Loads a new page and checks that shopperContext is still set to logged-in
  cy.visit("/");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((dl) => {
        const index = dl.findLastIndex((el) => el.shopperContext);
        cy.wrap(dl)
          .its(index)
          .should("eql", { shopperContext: { shopperId: "logged-in" } });
      });
  });

  // 4. Logs out / deletes customer and checks that shopperContext is set to guest
  cy.reload();
  cy.get(".nav-dropdown-button").contains("Hi, John").click();
  cy.get(
    "#nav > div.section.nav-tools > div.dropdown-wrapper.nav-tools-wrapper > div > ul > li:nth-child(2) > button",
  ).click();
  cy.get(".auth-sign-in-form__button--submit");
  cy.wait(1000); // TODO: find better way to wait for auth acdl push to have occurred after logout click.
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((dl) => {
        const index = dl.findLastIndex((el) => el.shopperContext);
        cy.wrap(dl)
          .its(index)
          .should("eql", { shopperContext: { shopperId: "guest" } });
      });
  });

  // 5. Loads a new page and checks that shopperContext is still set to guest
  cy.visit("/");
  cy.waitForResource("commerce-events-collector.js").then(() => {
    cy.window()
      .its("adobeDataLayer")
      .then((dl) => {
        const index = dl.findLastIndex((el) => el.shopperContext);
        cy.wrap(dl)
          .its(index)
          .should("eql", { shopperContext: { shopperId: "guest" } });
      });
  });
});
