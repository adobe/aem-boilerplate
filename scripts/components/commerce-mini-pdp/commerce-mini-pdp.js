import { events } from '@dropins/tools/event-bus.js';
import { render as pdpRender } from '@dropins/storefront-pdp/render.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { initializers } from '@dropins/tools/initializer.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import {
  InLineAlert,
  Icon,
  Button,
  Image,
  provider as UI,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import * as Cart from '@dropins/storefront-cart/api.js';

// PDP Containers for Mini PDP
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';

// Initializers
import '../../initializers/cart.js';

import {
  fetchPlaceholders,
  commerceEndpointWithQueryParams,
} from '../../commerce.js';

import { loadCSS } from '../../aem.js';

// Function to get fresh cart item data by UID
async function getFreshCartItem(cartItemUid) {
  try {
    const cartData = await Cart.getCartData();
    if (!cartData?.items) {
      return null;
    }
    return cartData.items.find((item) => item.uid === cartItemUid) || null;
  } catch (error) {
    console.warn('Could not fetch fresh cart data:', error);
    return null;
  }
}

export default async function createMiniPDP(cartItem, onUpdate, onClose) {
  await loadCSS(
    `${window.hlx.codeBasePath}/scripts/components/commerce-mini-pdp/commerce-mini-pdp.css`,
  );

  const placeholders = await fetchPlaceholders();

  // Try to get fresh cart item data, fallback to the provided cartItem if unavailable
  const freshCartItem = await getFreshCartItem(cartItem.uid) || cartItem;

  const sku = freshCartItem.topLevelSku || freshCartItem.sku;

  const optionsUIDs = freshCartItem.selectedOptionsUIDs
    ? Object.values(freshCartItem.selectedOptionsUIDs).filter(Boolean)
    : undefined;

  const langDefinitions = {
    default: placeholders,
  };

  try {
    // Configure PDP API endpoint and headers (same as main PDP initializer)
    pdpApi.setEndpoint(await commerceEndpointWithQueryParams());
    pdpApi.setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));

    const product = await pdpApi.fetchProductData(sku, {
      optionsUIDs,
      skipTransform: true,
    });

    if (!product?.sku) {
      throw new Error('Product data not available');
    }

    // Initialize PDP API with pre-selected options
    await initializers.mountImmediately(pdpApi.initialize, {
      scope: 'modal',
      sku,
      optionsUIDs,
      langDefinitions,
      models: {
        ProductDetails: {
          initialData: { ...product },
          fallbackData: (parent, refinedData) => ({
            ...parent,
            ...refinedData,
            images:
              refinedData.images?.length > 0 ? refinedData.images : parent.images,
            description:
              refinedData.description && refinedData.description !== ''
                ? refinedData.description
                : parent.description,
          }),
        },
      },
      acdl: false,
      persistURLParams: false,
    });

    if (!product) {
      throw new Error('Product data not available');
    }

    // Set initial quantity using PDP API BEFORE rendering components
    pdpApi.setProductConfigurationValues((prev) => ({
      ...prev,
      quantity: freshCartItem.quantity || 1,
    }), { scope: 'modal' });

    // Create the mini PDP container
    const miniPDPContainer = document.createElement('div');
    miniPDPContainer.className = 'commerce-mini-pdp';

    // Layout structure
    const fragment = document.createRange().createContextualFragment(`
      <div class="mini-pdp__alert"></div>
      <div class="mini-pdp__wrapper">
        <div class="mini-pdp__header">
          <a href="/products/${product.urlKey}/${product.sku}" class="quick-view__close">
          ${product.name}
          </a>
        </div>
        <div class="mini-pdp__price"></div>
        <div class="mini-pdp__left-column">
          <div class="mini-pdp__gallery"></div>
        </div>
        <div class="mini-pdp__right-column">
          <div class="mini-pdp__configuration">
            <div class="mini-pdp__options"></div>
            <div class="mini-pdp__quantity-wrapper">
              <div class="mini-pdp__quantity-label">
                ${placeholders?.Global?.quantityLabel}
              </div>
              <div class="mini-pdp__quantity"></div>
            </div>
          </div>
        </div>
        <div class="mini-pdp__buttons">
          <div class="mini-pdp__update-button"></div>
          <div class="mini-pdp__cancel-button"></div>
          <div class="mini-pdp__buttons__redirect-to-pdp">
            <a href="/products/${product.urlKey}/${product.sku}">
            </a>
          </div>
        </div>
      </div>
    `);

    const $alert = fragment.querySelector('.mini-pdp__alert');
    const $header = fragment.querySelector('.mini-pdp__header');
    const $price = fragment.querySelector('.mini-pdp__price');
    const $gallery = fragment.querySelector('.mini-pdp__gallery');
    const $options = fragment.querySelector('.mini-pdp__options');
    const $quantity = fragment.querySelector('.mini-pdp__quantity');
    const $updateButton = fragment.querySelector('.mini-pdp__update-button');
    const $cancelButton = fragment.querySelector('.mini-pdp__cancel-button');

    miniPDPContainer.appendChild(fragment);

    // Get the redirect button after fragment is appended otherwise it will be null
    const $redirectButton = miniPDPContainer.querySelector(
      '.mini-pdp__buttons__redirect-to-pdp',
    );

    // State management
    let isLoading = false;
    let inlineAlert = null;

    // Render components
    const [
      _galleryInstance,
      _headerInstance,
      _priceInstance,
      _optionsInstance,
      _quantityInstance,
      updateButton,
      _cancelButton,
      _viewDetailsButton,
    ] = await Promise.all([
      // Gallery - Simple image for now
      UI.render(Image, {
        src: product.images?.[0]?.url || freshCartItem.image,
        alt: product.images?.[0]?.label || product.name,
        width: 400,
        height: 400,
        imageParams: {
          width: 400,
          height: 400,
        },
      })($gallery),

      // Header - just set the content, no special rendering needed
      Promise.resolve($header),

      pdpRender.render(ProductPrice, { scope: 'modal' })($price),

      pdpRender.render(ProductOptions, { hideSelectedValue: false, scope: 'modal' })($options),

      pdpRender.render(ProductQuantity, { scope: 'modal' })($quantity),

      // Update button
      UI.render(Button, {
        children: placeholders?.Global?.UpdateProductInCart,
        variant: 'primary',
        size: 'medium',
        onClick: async () => {
          if (isLoading) return;

          try {
            isLoading = true;
            updateButton.setProps((prev) => ({
              ...prev,
              children: placeholders?.Global?.UpdatingInCart,
              disabled: true,
            }));

            // Get current product configuration
            const values = pdpApi.getProductConfigurationValues({ scope: 'modal' });
            const valid = pdpApi.isProductConfigurationValid({ scope: 'modal' });

            if (!valid) {
              throw new Error('Please select all required options');
            }

            // Update cart item with new configuration
            const updateData = {
              uid: freshCartItem.uid,
              quantity: values.quantity || freshCartItem.quantity,
              ...(values.optionsUIDs
                && values.optionsUIDs.length > 0 && {
                optionsUIDs: values.optionsUIDs,
              }),
            };

            const updateResponse = await Cart.updateProductsFromCart([
              updateData,
            ]);

            // Trigger cart refresh to ensure UI updates
            events.emit('cart/updated', updateResponse);

            inlineAlert?.remove();

            if (onUpdate) {
              onUpdate(updateData);
            }

            onClose();
          } catch (error) {
            inlineAlert?.remove();

            inlineAlert = await UI.render(InLineAlert, {
              heading: 'Error',
              description: error.message,
              icon: h(Icon, { source: 'Warning' }),
              'aria-live': 'assertive',
              role: 'alert',
              onDismiss: () => {
                inlineAlert.remove();
              },
            })($alert);

            $alert.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          } finally {
            isLoading = false;
            updateButton.setProps((prev) => ({
              ...prev,
              children:
                placeholders?.Global?.UpdateProductInCart,
              disabled: false,
            }));
          }
        },
        disabled: isLoading,
      })($updateButton),

      // Cancel button
      UI.render(Button, {
        children: placeholders?.Global?.Cancel,
        variant: 'secondary',
        size: 'medium',
        onClick: onClose,
      })($cancelButton),

      // View all details button
      UI.render(Button, {
        children: placeholders?.Global?.ViewAllDetails,
        variant: 'tertiary',
        size: 'medium',
        onClick: () => {
          onClose();
          // Navigate to full PDP page
          window.location.href = `/products/${product.urlKey}/${product.sku}`;
        },
      })($redirectButton),
    ]);

    // Handle PDP validation events
    events.on(
      'pdp/valid',
      (valid) => {
        updateButton.setProps((prev) => ({
          ...prev,
          disabled: !valid || isLoading,
        }));
      },
      { eager: true, scope: 'modal' },
    );

    return miniPDPContainer;
  } catch (error) {
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'commerce-mini-pdp commerce-mini-pdp--error';
    errorContainer.innerHTML = `
      <div class="mini-pdp__error">
        <h3>Error</h3>
        <p>${error.message || placeholders?.Global?.ProductLoadError}</p>
        <button onclick="arguments[0]()" class="mini-pdp__close-button">Close</button>
      </div>
    `;

    const closeButton = errorContainer.querySelector('.mini-pdp__close-button');
    closeButton.onclick = onClose;

    return errorContainer;
  }
}
