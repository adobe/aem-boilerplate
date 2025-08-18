import { expectAemAssetsImage } from '../../assertions/assets.js';

// The overridden config keys.
const MAGENTO_ENVIRONMENT_ID_KEY = 'public.default.headers.cs.Magento-Environment-Id';
const MAGENTO_API_KEY_KEY = 'public.default.headers.cs.x-api-key';
const ASSETS_ENABLED_KEY = 'public.default.commerce-assets-enabled';
const COMMERCE_CORE_ENDPOINT_KEY = 'public.default.commerce-core-endpoint';
const COMMERCE_ENDPOINT_KEY = 'public.default.commerce-endpoint';

describe('AEM Assets enabled', { tags: ["@skipSaas", "@skipPaas"] }, () => {
  let aemAssetsEnvironment;
  let envConfig;

  before(() => {
    Cypress.env("isAemAssetsSuite", true);
    envConfig = Cypress.env('aemAssetsConfig');

    const envId = envConfig.author.environmentId;
    const programId = envConfig.author.programId;
    const isStage = envConfig.author.isStage;

    aemAssetsEnvironment = isStage ? `${programId}-${envId}-cmstg` : `${programId}-${envId}`;
  })

  beforeEach(() => {
    cy.interceptConfig((config) => {
      Cypress._.set(config, MAGENTO_ENVIRONMENT_ID_KEY, envConfig.credentials.magentoEnvironmentId)
      Cypress._.set(config, MAGENTO_API_KEY_KEY, envConfig.credentials.xPublicApiKey)
      Cypress._.set(config, COMMERCE_CORE_ENDPOINT_KEY, envConfig.commerceConfig.coreEndpoint)
      Cypress._.set(config, COMMERCE_ENDPOINT_KEY, envConfig.commerceConfig.endpoint)
      Cypress._.set(config, ASSETS_ENABLED_KEY, 'true')

      return config
    })
  });

  after(() => {
    Cypress.env("isAemAssetsSuite", false);
  })

  it('[Product Discovery Dropin]: should load and show AEM Assets optimized images', () => {
    visitWithEagerImages('/');
    cy.get('.nav-search-button').click();
    cy.get('.nav-search-panel').should('be.visible');
    cy.get('#search').type('gift');
    cy.wait(2000);
    const expectedOptions = {
      protocol: '//',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
    }

    const srcSetExpectedOptions = {
      ...expectedOptions,
      protocol: '//',
    };

    waitForAemAssetImages('.search-bar-result img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 400,
          height: 450,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (400 * screenWidth) / 1920,
            height: 450,
          });
        }
      }
    });

    visitWithEagerImages('/apparel');
    cy.wait(2000);

    waitForAemAssetImages('.search__product-list img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 400,
          height: 450,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (400 * screenWidth) / 1920,
            height: 450,
          });
        }
      }
    });
  });

  it('[PDP Dropin]: should load and show AEM Assets optimized images', () => {
    visitWithEagerImages('/products/gift-packaging/ADB102');
    const expectedOptions = {
      protocol: 'http://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
    }

    const srcSetExpectedOptions = {
      ...expectedOptions,
      protocol: '//',
    }

    // Normal gallery images.
    waitForAemAssetImages('.pdp-carousel__wrapper img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 960,
          height: 1191,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...srcSetExpectedOptions,
            width: screenWidth / 2,
            height: 1191,
          });
        }
      }
    });

    visitWithEagerImages('products/denim-apron/ADB119');
    waitForAemAssetImages('.pdp-carousel__wrapper ~ div img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 200,
          height: 248,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...srcSetExpectedOptions,

            width: (200 * screenWidth) / 1920,
            height: 248,
          });
        }
      }
    });

    // TODO: Once Swatch Images are supported by AEM Assets, add tests for them.
  });

  it('[Cart Dropin]: should load and show AEM Assets optimized images', () => {
    const expectedOptions = {
      protocol: 'https://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
      width: 300,
      height: 300,
    }

    visitWithEagerImages('/products/gift-packaging/ADB102');
    cy.wait(3000);
    cy.get('.product-details__buttons__add-to-cart button').click();

    // Assert mini cart.
    waitForAemAssetImages('.cart-mini-cart img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (expectedOptions.width * screenWidth) / 1920,
          })
        }
      }
    })

    visitWithEagerImages('/cart');

    // Assert cart.
    waitForAemAssetImages('.cart-mini-cart img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (expectedOptions.width * screenWidth) / 1920,
          })
        }
      }
    })

    // TODO: Once gift options are supported by AEM Assets, add tests for them.
  });

  it('[My Account Dropin]: should load and show AEM Assets optimized images', () => {
    if (!envConfig.user.email || !envConfig.user.password) {
      cy.log('No email or password provided, skipping test');
      return;
    }

    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(envConfig.user.email);
    cy.get('input[name="password"]').eq(1).clear().type(envConfig.user.password);

    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click( { force: true } );
    cy.wait(6000);

    visitWithEagerImages("/customer/account");
    const expectedOptions = {
      protocol: 'https://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.account-orders-list-card__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 65,
          height: 65,

        });
      }
    });
  });

  it('[Order Dropin]: should load and show AEM Assets optimized images', () => {
    if (!envConfig.user.email || !envConfig.user.password) {
      cy.log('No email or password provided, skipping test');
      return;
    }

    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(envConfig.user.email);
    cy.get('input[name="password"]').eq(1).clear().type(envConfig.user.password);

    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(6000);

    const expectedOptions = {
      protocol: 'https://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
    }

    // 1. Test Order List
    visitWithEagerImages("/customer/orders");
    waitForAemAssetImages('.account-orders-list-card__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 65,
          height: 65,
        });
      }
    });

    // 2. Test Order Details page
    visitWithEagerImages(`/customer/order-details?orderRef=${envConfig.user.order}`);
    waitForAemAssetImages('.dropin-cart-item img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 90,
          height: 120,
        });
      }
    });

    // 3. Test Returns List
    visitWithEagerImages("customer/returns");
    waitForAemAssetImages('.order-returns-list-content__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 85,
          height: 114,
        });
      }
    });

    // 4. Test Order Returns in a specific order
    visitWithEagerImages(`/customer/order-details?orderRef=${envConfig.user.returnedOrder}`);
    cy.wait(3000);
    waitForAemAssetImages('.order-returns-list-content__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 85,
          height: 114,
        });
      }
    });

    // 5. Test Create Return flow
    visitWithEagerImages(`/customer/order-details?orderRef=${envConfig.user.order}`);
    cy.get('.order-order-actions__wrapper button').contains('Return').click();

    waitForAemAssetImages('.order-return-order-product-list img', () => {
      cy.get(".dropin-checkbox__checkbox").each(($checkbox) => {
        cy.wrap($checkbox).click({ force: true });
      });

      cy.get(".order-create-return button").contains("Continue").click({ force: true });
    });

    waitForAemAssetImages('.order-return-reason-form img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 90,
          height: 120,
        });
      }
    });
  });

  it('[Checkout Dropin]: should load and show AEM Assets optimized images', () => {
    visitWithEagerImages('/products/gift-packaging/ADB102');

    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();

    cy.wait(3000);
    visitWithEagerImages('/checkout');

    const expectedOptions = {
      protocol: 'https://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
      width: 300,
      height: 300,
    };

    waitForAemAssetImages('.checkout__cart-summary img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (expectedOptions.width * screenWidth) / 1920,
          })
        }
      }
    })
  });

  it('[Recommendations Dropin]: should load and show AEM Assets optimized images', () => {
    // Visit products to populate "Recently Viewed" recommendations.
    // Wait a bit to ensure data is collected by Adobe Analytics.
    visitWithEagerImages('/products/gift-packaging/ADB102');
    cy.wait(3000);

    visitWithEagerImages('/products/denim-apron/ADB119');
    cy.wait(3000);

    visitWithEagerImages(envConfig.prexDraft);
    const expectedOptions = {
      protocol: 'https://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
      width: 300,
      height: 300,
    };

    waitForAemAssetImages('.recommendations-product-list img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...expectedOptions,
            width: (expectedOptions.width * screenWidth) / 1920,
          })
        }
      }
    });
  });

  it('[Wishlist Dropin]: should load and show AEM Assets optimized images', { tags: "@skipSaas" }, () => {
    visitWithEagerImages('/products/denim-apron/ADB119');
    cy.get('.product-details__buttons__add-to-wishlist button')
      .should('be.visible')
      .click();
    cy.wait(2000);

    visitWithEagerImages('/wishlist');
    cy.wait(3000);

    const expectedOptions = {
      protocol: 'http://',
      environment: aemAssetsEnvironment,
      format: 'webp',
      quality: 80,
      width: 288,
      height: 288,
    };

    const srcSetExpectedOptions = {
      ...expectedOptions,
      protocol: '//',
    };

    waitForAemAssetImages('.wishlist-wishlist img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...srcSetExpectedOptions,
            width: (expectedOptions.width * screenWidth) / 1920,
          })
        }
      }
    });
  });
});

/**
 * Wait for an AEM Asset image to be loaded.
 * @param {string} selector - The selector of the images to wait for.
 * @param {(images: import('../../support/index.d.ts').ImageData[]) => void} callback - The callback to call with the images.
 */
function waitForAemAssetImages(selector, callback) {
  cy.waitForImages(selector, (images) => {
    expect(images.length).to.be.greaterThan(0);
    callback(images);
  }, (image) => {
    expect(image.src).to.include("adobeaemcloud.com");
  });
}

/**
 * Visit a page with eager loading for all images.
 * @param {string} url - The URL to visit.
 * @returns {Cypress.Chainable} - The chainable object.
 */
function visitWithEagerImages(url) {
  // We do this because otherwise we need to go and interact with different elements to find images that are not loaded eagerly.
  return cy.visit(url, {
    onBeforeLoad(win) {
      // Force eager loading for all images
      Object.defineProperty(win.HTMLImageElement.prototype, 'loading', {
        configurable: true,
        get() { return 'eager'; },
        set() {}
      });
    }
  });
}
