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
import { companyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  InLineAlert,
  ProgressSpinner,
  provider as UI,
} from '@dropins/tools/components.js';

// Containers
import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { QuoteTemplatesListTable } from '@dropins/storefront-quote-management/containers/QuoteTemplatesListTable.js';
import { ManageNegotiableQuoteTemplate } from '@dropins/storefront-quote-management/containers/ManageNegotiableQuoteTemplate.js';

// API
import { addQuoteTemplateShippingAddress } from '@dropins/storefront-quote-management/api.js';

// Initialize
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/quote-management.js';
import '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

/**
 * Check if the user has the necessary permissions to access the block
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return false;
  }

  // Check if company functionality is enabled
  const isEnabled = await companyEnabled();
  if (!isEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  return true;
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  // Check if user has permissions to access the block
  const hasPermissions = await checkPermissions();

  // Return early if user doesn't have permissions
  if (!hasPermissions) return;

  // Get the quote id from the url
  const quoteTemplateId = new URLSearchParams(window.location.search).get('quoteTemplateId');

  if (quoteTemplateId) {
    block.classList.add('negotiable-quote-template__details');
    block.setAttribute('data-quote-view', 'details');

    // Render the quote template details view
    await negotiableQuoteRenderer.render(ManageNegotiableQuoteTemplate, {
      slots: {
        ShippingInformation: (ctx) => {
          const shippingInformation = document.createElement('div');
          shippingInformation.classList.add('negotiable-quote-template__select-shipping-information');
          ctx.appendChild(shippingInformation);

          const progressSpinner = document.createElement('div');
          progressSpinner.classList.add('negotiable-quote-template__progress-spinner-container');
          progressSpinner.setAttribute('hidden', true);
          ctx.appendChild(progressSpinner);

          UI.render(ProgressSpinner, {
            className: 'negotiable-quote-template__progress-spinner',
            size: 'large',
          })(progressSpinner);

          ctx.onChange((next) => {
            // Remove existing content from the shipping information container
            shippingInformation.innerHTML = '';

            const { templateData } = next;

            if (!templateData) return;

            if (!templateData.canSendForReview) return;

            if (templateData.canSendForReview) {
              accountRenderer.render(Addresses, {
                minifiedView: false,
                withActionsInMinifiedView: false,
                selectable: true,
                className: 'negotiable-quote-template__shipping-information-addresses',
                selectShipping: true,
                defaultSelectAddressId: 0,
                onAddressData: (params) => {
                  const { data, isDataValid: isValid } = params;
                  const addressUid = data?.uid;
                  if (!isValid) return;
                  if (!addressUid) return;

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: {
                      customerAddressUid: addressUid,
                    },
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
                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: {
                      address: {
                        ...addressInput,
                        additionalInput: additionalAddressInput,
                      },
                      customerNotes: formValues.customerNotes,
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
    // Render the quote templates list view
    block.classList.add('negotiable-quote-template__list');
    block.setAttribute('data-quote-view', 'list');

    await negotiableQuoteRenderer.render(QuoteTemplatesListTable, {
      // Append quote template id to the url to navigate to render the details view
      onViewQuoteTemplate: (id) => {
        window.location.href = `${window.location.pathname}?quoteTemplateId=${id}`;
      },
      pageSize: 10,
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }

  // Render error when quote data fails to load
  events.on('quote-management/quote-data/error', ({ error }) => {
    UI.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });
}
