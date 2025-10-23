/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */
import { getFormValues } from '@dropins/tools/lib.js';
import { checkIsCompanyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { InLineAlert, Button, ProgressSpinner } from '@dropins/tools/components.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';

// Containers
import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { ManageNegotiableQuote } from '@dropins/storefront-quote-management/containers/ManageNegotiableQuote.js';
import { ItemsQuoted } from '@dropins/storefront-quote-management/containers/ItemsQuoted.js';
import { QuotesListTable } from '@dropins/storefront-quote-management/containers/QuotesListTable.js';

// API
import { setShippingAddress } from '@dropins/storefront-quote-management/api.js';

// Initialize
import '../../scripts/initializers/quote-management.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
  fetchPlaceholders,
} from '../../scripts/commerce.js';

/**
 * Check if the user has the necessary permissions to access the block
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  }

  // Check if company functionality is enabled
  const companyCheck = await checkIsCompanyEnabled();
  if (!companyCheck.companyEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  }
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  const placeholders = await fetchPlaceholders();

  checkPermissions();

  // Get the quote id from the url
  const quoteId = new URLSearchParams(window.location.search).get('quoteid');

  if (quoteId) {
    block.classList.add('negotiable-quote__manage');
    block.setAttribute('data-quote-view', 'manage');
    await negotiableQuoteRenderer.render(ManageNegotiableQuote, {
      slots: {
        QuoteContent: (ctx) => {
          const itemsQuoted = document.createElement('div');
          itemsQuoted.classList.add('negotiable-quote__items-quoted');

          negotiableQuoteRenderer.render(ItemsQuoted, {})(itemsQuoted);

          ctx.replaceWith(itemsQuoted);
        },
        Footer: (ctx) => {
          const checkoutButtonContainer = document.createElement('div');
          checkoutButtonContainer.classList.add('negotiable-quote__checkout-button-container');
          ctx.appendChild(checkoutButtonContainer);

          ctx.onChange((next) => {
            const enabled = next.quoteData?.canCheckout;

            negotiableQuoteRenderer.render(Button, {
              children: placeholders?.Cart?.PriceSummary?.checkout,
              disabled: !enabled,
              onClick: () => {
                window.location.href = `/b2b/quote-checkout?quoteId=${quoteId}`;
              },
            })(checkoutButtonContainer);
          });
        },
        ShippingInformation: (ctx) => {
          const shippingInformation = document.createElement('div');
          shippingInformation.classList.add('negotiable-quote__select-shipping-information');
          ctx.appendChild(shippingInformation);

          const progressSpinner = document.createElement('div');
          progressSpinner.classList.add('negotiable-quote__progress-spinner-container');
          progressSpinner.setAttribute('hidden', true);
          ctx.appendChild(progressSpinner);

          negotiableQuoteRenderer.render(ProgressSpinner, {
            className: 'negotiable-quote__progress-spinner',
            size: 'large',
          })(progressSpinner);

          ctx.onChange((next) => {
            // Remove existing content from the shipping information container
            shippingInformation.innerHTML = '';

            const { quoteData } = next;

            if (!quoteData) return;

            if (!quoteData.canSendForReview) return;

            if (quoteData.canSendForReview) {
              accountRenderer.render(Addresses, {
                minifiedView: false,
                withActionsInMinifiedView: false,
                selectable: true,
                className: 'negotiable-quote__shipping-information-addresses',
                selectShipping: true,
                defaultSelectAddressId: 0,
                onAddressData: (params) => {
                  const { data, isDataValid: isValid } = params;
                  const addressUid = data?.uid;
                  if (!isValid) return;
                  if (!addressUid) return;

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  setShippingAddress({
                    quoteUid: quoteId,
                    addressId: addressUid,
                  }).finally(() => {
                    progressSpinner.setAttribute('hidden', true);
                    shippingInformation.removeAttribute('hidden');
                  });
                },
                onSubmit: (event, formValid) => {
                  if (!formValid) return;

                  const formValues = getFormValues(event.target);

                  const [regionCode, _regionId] = formValues.region?.split(',') || [];

                  // iterate through the object entries and combine the values of keys that have
                  // a prefix of 'street' into an array
                  const streetInputValues = Object.entries(formValues)
                    .filter(([key]) => key.startsWith('street'))
                    .map(([_, value]) => value);

                  const addressInput = {
                    firstname: formValues.firstName,
                    lastname: formValues.lastName,
                    company: formValues.company,
                    street: streetInputValues,
                    city: formValues.city,
                    region: regionCode,
                    postcode: formValues.postcode,
                    countryCode: formValues.countryCode,
                    telephone: formValues.telephone,
                    saveInAddressBook: formValues.saveInAddressBook,
                  };

                  // These values are not part of the standard address input
                  const additionalAddressInput = {
                    vat_id: formValues.vatId,
                  };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);
                  setShippingAddress({
                    quoteUid: quoteId,
                    addressData: {
                      ...addressInput,
                      additionalInput: additionalAddressInput,
                    },
                  }).finally(() => {
                    progressSpinner.setAttribute('hidden', true);
                    shippingInformation.removeAttribute('hidden');
                  });
                },
              })(shippingInformation);
            }
          });
        },
      },
    })(block);
  } else {
    block.classList.add('negotiable-quote__list');
    block.setAttribute('data-quote-view', 'list');
    await negotiableQuoteRenderer.render(QuotesListTable, {
      onViewQuote: (id, _quoteName, _status) => {
        // Append quote id to the url to navigate to render the manage quote view
        window.location.href = `${window.location.pathname}?quoteid=${id}`;
      },
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }

  // Render error when quote data fails to load
  events.on('quote-management/quote-data/error', ({ error }) => {
    negotiableQuoteRenderer.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });
}
