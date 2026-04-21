import {
  Button, Icon, InLineAlert, provider as UI,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { events } from '@dropins/tools/event-bus.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { render as pdpRendered } from '@dropins/storefront-pdp/render.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
import { render as quickOrderProvider } from '@dropins/storefront-quick-order/render.js';

// Quick Order Dropin
import QuickOrderVariantsGrid from '@dropins/storefront-quick-order/containers/QuickOrderVariantsGrid.js';

// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { WishlistAlert } from '@dropins/storefront-wishlist/containers/WishlistAlert.js';

// PDP Containers
import ProductHeader from '@dropins/storefront-pdp/containers/ProductHeader.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductShortDescription from '@dropins/storefront-pdp/containers/ProductShortDescription.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';
import ProductDescription from '@dropins/storefront-pdp/containers/ProductDescription.js';
import ProductAttributes from '@dropins/storefront-pdp/containers/ProductAttributes.js';
import ProductGallery from '@dropins/storefront-pdp/containers/ProductGallery.js';
import ProductGiftCardOptions from '@dropins/storefront-pdp/containers/ProductGiftCardOptions.js';

// Libs
import {
  checkIsAuthenticated,
  fetchPlaceholders, getProductLink, rootLink, setJsonLd,
} from '../../scripts/commerce.js';
import { readBlockConfig } from '../../scripts/aem.js';

// Initializers
import { IMAGES_SIZES } from '../../scripts/initializers/pdp.js';
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/wishlist.js';
import '../../scripts/initializers/quick-order.js';
import {
  initializeRequisitionListForProduct,
  createRequisitionListRenderer,
} from './requisition-list.js';

/**
 * Checks if the page has prerendered product JSON-LD data
 * @returns {boolean} True if product JSON-LD exists and contains @type=Product
 */
function isProductPrerendered() {
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

  if (!jsonLdScript?.textContent) {
    return false;
  }

  try {
    const jsonLd = JSON.parse(jsonLdScript.textContent);
    return jsonLd?.['@type'] === 'Product';
  } catch (error) {
    console.debug('Failed to parse JSON-LD:', error);
    return false;
  }
}

// Function to update the Add to Cart button text
function updateAddToCartButtonText(addToCartInstance, inCart, labels) {
  const buttonText = inCart
    ? labels.Global?.UpdateProductInCart
    : labels.Global?.AddProductToCart;
  if (addToCartInstance) {
    addToCartInstance.setProps((prev) => ({
      ...prev,
      children: buttonText,
    }));
  }
}

/**
 * Formats numeric attribute values for display (e.g., "10.000000" → "10").
 * Non-numeric values are returned as-is.
 */
function formatNumericAttributeValue(value) {
  const trimmed = value.trim();
  if (!/^[+-]?\d+(\.\d+)?$/.test(trimmed)) return value;
  return new Intl.NumberFormat(document.documentElement.lang).format(Number(trimmed));
}

export default async function decorate(block) {
  const eventProduct = events.lastPayload('pdp/data') ?? null;
  // bug: the pdp sends an object with event data even if product is not found.
  const product = eventProduct?.sku ? eventProduct : null;

  const { 'grid-ordering-enabled': gridOrderingEnabledString = 'false' } = readBlockConfig(block);
  const gridOrderingEnabled = gridOrderingEnabledString === 'true';

  // Grid Ordering B2B feature (Quick Order Drop-in) - enabled only for Configurable Products
  const isConfigurableProduct = (product?.productType === 'complex' || !!product?.externalParentId) && !product?.isBundle;
  const isGridOrderingView = gridOrderingEnabled && isConfigurableProduct;
  // Separate Add to Cart button used in the Grid Ordering container
  let gridOrderingAddToCartButton = null;
  let gridOrderingVariants = [];
  let gridOrderingSelectedVariants = [];

  const labels = await fetchPlaceholders();

  // Read itemUid from URL
  const urlParams = new URLSearchParams(window.location.search);
  const itemUidFromUrl = urlParams.get('itemUid');

  // State to track if we are in update mode
  let isUpdateMode = false;

  // Layout
  const fragment = document.createRange()
    .createContextualFragment(`
    <div class="product-details__alert"></div>
    <div class="product-details__wrapper">
      <div class="product-details__left-column">
        <div class="product-details__gallery"></div>
      </div>
      <div class="product-details__right-column">
        <div class="product-details__header"></div>
        <div class="product-details__price"></div>
        <div class="product-details__gallery"></div>
        <div class="product-details__short-description"></div>
        <div class="product-details__gift-card-options"></div>
        <div class="product-details__configuration">
          <div class="product-details__options"></div>
          <div class="product-details__quantity"></div>
          <div class="product-details__buttons">
            <div class="product-details__buttons__add-to-cart"></div>
            <div class="product-details__buttons__add-to-wishlist"></div>
            <div class="product-details__buttons__add-to-req-list"></div>
          </div>
        </div>
        <div class="product-details__description"></div>
        <div class="product-details__attributes"></div>
      </div>
    </div>
    <div class="product-details__grid-ordering ${isGridOrderingView ? 'product-details__grid-ordering--enabled' : 'product-details__grid-ordering--disabled'}"></div>
  `);

  const $alert = fragment.querySelector('.product-details__alert');
  const $gallery = fragment.querySelector('.product-details__gallery');
  const $header = fragment.querySelector('.product-details__header');
  const $price = fragment.querySelector('.product-details__price');
  const $galleryMobile = fragment.querySelector('.product-details__right-column .product-details__gallery');
  const $shortDescription = fragment.querySelector('.product-details__short-description');
  const $options = fragment.querySelector('.product-details__options');
  const $quantity = fragment.querySelector('.product-details__quantity');
  const $giftCardOptions = fragment.querySelector('.product-details__gift-card-options');
  const $addToCart = fragment.querySelector('.product-details__buttons__add-to-cart');
  const $wishlistToggleBtn = fragment.querySelector('.product-details__buttons__add-to-wishlist');
  const $requisitionListSelector = fragment.querySelector('.product-details__buttons__add-to-req-list');
  const $description = fragment.querySelector('.product-details__description');
  const $attributes = fragment.querySelector('.product-details__attributes');
  const $gridOrderingContainer = fragment.querySelector('.product-details__grid-ordering');

  block.replaceChildren(fragment);

  const gallerySlots = {
    CarouselThumbnail: (ctx) => {
      if (ctx.mediaType === 'image') {
        tryRenderAemAssetsImage(ctx, {
          ...imageSlotConfig(ctx),
          wrapper: document.createElement('span'),
        });
      }
    },

    CarouselMainImage: (ctx) => {
      if (ctx.mediaType === 'image') {
        tryRenderAemAssetsImage(ctx, {
          ...imageSlotConfig(ctx),
        });
      }
    },
  };

  // Alert
  let inlineAlert = null;
  const routeToWishlist = rootLink('/wishlist');

  const [
    _galleryMobile,
    _gallery,
    _header,
    _price,
    _shortDescription,
    _options,
    _quantity,
    _giftCardOptions,
    _description,
    _attributes,
    _gridOrdering,
    wishlistToggleBtn,
  ] = await Promise.all([
    // Gallery (Mobile)
    pdpRendered.render(ProductGallery, {
      controls: 'dots',
      arrows: true,
      peak: false,
      gap: 'small',
      loop: false,
      videos: true, // Display videos if available
      imageParams: {
        ...IMAGES_SIZES,
      },

      slots: gallerySlots,
    })($galleryMobile),

    // Gallery (Desktop)
    pdpRendered.render(ProductGallery, {
      controls: 'thumbnailsColumn',
      arrows: true,
      peak: true,
      gap: 'small',
      loop: false,
      videos: true, // Display videos if available
      imageParams: {
        ...IMAGES_SIZES,
      },

      slots: gallerySlots,
    })($gallery),

    // Header
    pdpRendered.render(ProductHeader, {})($header),

    // Price
    pdpRendered.render(ProductPrice, {})($price),

    // Short Description
    pdpRendered.render(ProductShortDescription, {})($shortDescription),

    // Configuration - Swatches
    pdpRendered.render(ProductOptions, {
      hideSelectedValue: false,
      slots: {
        SwatchImage: (ctx) => {
          tryRenderAemAssetsImage(ctx, {
            ...imageSlotConfig(ctx),
            wrapper: document.createElement('span'),
          });
        },
      },
    })($options),

    // Configuration - Quantity
    pdpRendered.render(ProductQuantity, {})($quantity),

    // Configuration - Gift Card Options
    pdpRendered.render(ProductGiftCardOptions, {})($giftCardOptions),

    // Description
    pdpRendered.render(ProductDescription, {})($description),

    // Attributes
    pdpRendered.render(ProductAttributes, {
      formatValue: formatNumericAttributeValue,
    })($attributes),

    // Grid Ordering
    isGridOrderingView && !isUpdateMode
      ? quickOrderProvider.render(QuickOrderVariantsGrid, {
        className: 'quick-order-variants-grid',
        columns: [
          { key: 'image', label: 'Image' },
          { key: 'variantOptionAttributes', label: 'Variant' },
          { key: 'sku', label: 'SKU' },
          { key: 'availability', label: 'Availability' },
          { key: 'price', label: 'Price' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'subtotal', label: 'Subtotal' },
          ...(checkIsAuthenticated()
            ? [{ key: 'requisitionList', label: 'Action' }]
            : []),
        ],
        slots: {
          RequisitionListCell: async (ctx) => {
            const { variant } = ctx;

            const variantAlertContainer = document.createElement('div');
            variantAlertContainer.classList.add('variant-requisition-alert');

            const variantSelectorContainer = document.createElement('div');
            variantSelectorContainer.classList.add('variant-requisition-selector');

            ctx.appendChild(variantAlertContainer);
            ctx.appendChild(variantSelectorContainer);

            const matchedVariant = gridOrderingVariants.find(
              (v) => v?.product?.sku?.toLowerCase() === variant.product.sku.toLowerCase(),
            );

            const buildProductData = (quantity) => ({
              ...variant.product,
              sku: product.sku, // Parent SKU for configurable product
              quantity,
              optionUIDs: matchedVariant?.selections || [],
              options: product.options,
            });

            const renderFunction = createRequisitionListRenderer({
              $alert: variantAlertContainer,
              labels,
            });

            let currentProductData = buildProductData(variant.product.quantity || 1);
            await renderFunction(
              variantSelectorContainer,
              currentProductData,
              currentProductData.optionUIDs,
            );

            // Handle quantity changes
            ctx.onChange(async (nextState) => {
              currentProductData = buildProductData(nextState.quantity);

              await renderFunction(
                variantSelectorContainer,
                currentProductData,
                currentProductData.optionUIDs,
              );
            });
          },
          VariantOptionAttributesCell: (ctx) => {
            const { variant } = ctx;
            const { variantOptionAttributes } = variant.product;

            const cellWrapper = document.createElement('div');

            variantOptionAttributes.forEach((attr) => {
              const attributeWrapper = document.createElement('div');
              attributeWrapper.classList.add(
                'product-details__variants-grid-attribute',
              );

              const label = document.createElement('strong');
              label.textContent = `${attr.label}:`;
              const value = document.createElement('span');
              value.textContent = attr.value;
              attributeWrapper.appendChild(label);
              attributeWrapper.appendChild(value);

              cellWrapper.appendChild(attributeWrapper);
            });

            ctx.appendChild(cellWrapper);
          },
          Actions: async (ctx) => {
            const { isDisabled } = ctx;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('product-details__variants-grid-actions');

            // Create a new Button instance for Grid Ordering
            gridOrderingAddToCartButton = await UI.render(Button, {
              children: labels.Global?.AddProductToCart,
              disabled: isDisabled,
              onClick: async () => {
                try {
                  if (gridOrderingAddToCartButton) {
                    gridOrderingAddToCartButton.setProps((prev) => ({
                      ...prev,
                      children: labels.Global?.AddingToCart,
                      disabled: true,
                    }));
                  }

                  const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');
                  await addProductsToCart(gridOrderingSelectedVariants);

                  // Reset Grid Ordering state after adding variants to cart
                  events.emit('quick-order/grid-ordering-reset-selected-variants');
                  gridOrderingSelectedVariants = [];

                  // Reset any previous alerts if successful
                  inlineAlert?.remove();
                } catch (error) {
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
                  gridOrderingAddToCartButton.setProps((prev) => ({
                    ...prev,
                    children: labels.Global?.AddProductToCart,
                    disabled: true,
                  }));
                }
              },
            })(buttonContainer);

            ctx.appendChild(buttonContainer);
          },
        },
      })($gridOrderingContainer)
      : null,

    // Wishlist button - WishlistToggle Container
    wishlistRender.render(WishlistToggle, {
      product,
    })($wishlistToggleBtn),
  ]);

  // Configuration – Button - Add to Cart
  const addToCart = await UI.render(Button, {
    children: labels.Global?.AddProductToCart,
    icon: h(Icon, { source: 'Cart' }),
    onClick: async () => {
      const buttonActionText = isUpdateMode
        ? labels.Global?.UpdatingInCart
        : labels.Global?.AddingToCart;
      try {
        addToCart.setProps((prev) => ({
          ...prev,
          children: buttonActionText,
          disabled: true,
        }));

        // get the current selection values
        const values = pdpApi.getProductConfigurationValues();
        const valid = pdpApi.isProductConfigurationValid();

        // add or update the product in the cart
        if (valid) {
          if (isUpdateMode) {
            // --- Update existing item ---
            const { updateProductsFromCart } = await import('@dropins/storefront-cart/api.js');

            await updateProductsFromCart([{
              ...values,
              uid: itemUidFromUrl,
            }]);

            // --- START REDIRECT ON UPDATE ---
            const updatedSku = values?.sku;
            if (updatedSku) {
              const cartRedirectUrl = new URL(
                rootLink('/cart'),
                window.location.origin,
              );
              cartRedirectUrl.searchParams.set('itemUid', itemUidFromUrl);
              window.location.href = cartRedirectUrl.toString();
            } else {
              // Fallback if SKU is somehow missing (shouldn't happen in normal flow)
              console.warn(
                'Could not retrieve SKU for updated item. Redirecting to cart without parameter.',
              );
              window.location.href = rootLink('/cart');
            }
            return;
          }
          // --- Add new item ---
          const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');
          await addProductsToCart([{ ...values }]);
        }

        // reset any previous alerts if successful
        inlineAlert?.remove();
      } catch (error) {
        // add alert message
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

        // Scroll the alertWrapper into view
        $alert.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } finally {
        // Reset button text using the helper function which respects the current mode
        updateAddToCartButtonText(addToCart, isUpdateMode, labels);
        // Re-enable button
        addToCart.setProps((prev) => ({
          ...prev,
          disabled: false,
        }));
      }
    },
  })($addToCart);

  // Lifecycle Events
  events.on('pdp/valid', (valid) => {
    // update add to cart button disabled state based on product selection validity
    addToCart.setProps((prev) => ({
      ...prev,
      disabled: !valid,
    }));
  }, { eager: true });

  // Grid Ordering flow - Sync state and update Add To Cart button text on variants selection change
  events.on('quick-order/grid-ordering-selected-variants', (selectedVariants) => {
    if (!isGridOrderingView) return;

    // Replace child SKU with parent SKU for configurable products
    gridOrderingSelectedVariants = selectedVariants.map((variant) => ({
      optionsUIDs: variant.optionsUIDs,
      quantity: variant.quantity,
      sku: product.sku,
    }));

    // Update grid ordering button with total quantity
    if (gridOrderingAddToCartButton) {
      const totalQuantity = selectedVariants.reduce(
        (acc, variant) => acc + (variant.quantity || 0),
        0,
      );
      const hasItems = totalQuantity > 0;

      gridOrderingAddToCartButton.setProps((prev) => ({
        ...prev,
        children: hasItems
          ? `${labels.Global?.AddProductToCart} (${totalQuantity})`
          : labels.Global?.AddProductToCart,
        disabled: !hasItems,
      }));
    }
  }, { eager: true });

  // Handle option changes
  events.on('pdp/values', async () => {
    const configValues = pdpApi.getProductConfigurationValues();

    // Check URL parameter for empty optionsUIDs
    const urlOptionsUIDs = urlParams.get('optionsUIDs');

    // Get optionsUIDs - prioritize actual selected values from configValues
    let optionUIDs = null;
    // First priority: actual selected options from configValues
    const hasConfigOptions = configValues?.optionsUIDs
      && Array.isArray(configValues.optionsUIDs)
      && configValues.optionsUIDs.length > 0;

    if (hasConfigOptions) {
      optionUIDs = configValues.optionsUIDs;
    } else if (urlOptionsUIDs === '') {
      // Second priority: URL has explicit empty optionsUIDs parameter
      optionUIDs = null;
    }

    if (wishlistToggleBtn) {
      wishlistToggleBtn.setProps((prev) => ({
        ...prev,
        product: {
          ...product,
          optionUIDs,
        },
      }));
    }
  }, { eager: true });

  events.on('wishlist/alert', ({
    action,
    item,
  }) => {
    wishlistRender.render(WishlistAlert, {
      action,
      item,
      routeToWishlist,
    })($alert);

    setTimeout(() => {
      $alert.innerHTML = '';
    }, 5000);

    setTimeout(() => {
      $alert.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  });

  // Initialize requisition list functionality for main PDP view
  await initializeRequisitionListForProduct({
    product,
    $alert,
    $requisitionListSelector,
    labels,
    urlParams,
  });

  // --- Add new event listener for cart/data ---
  events.on(
    'cart/data',
    (cartData) => {
      let itemIsInCart = false;
      if (itemUidFromUrl && cartData?.items) {
        itemIsInCart = cartData.items.some(
          (item) => item.uid === itemUidFromUrl,
        );
      }
      // Set the update mode state
      isUpdateMode = itemIsInCart;

      // Update button text based on whether the item is in the cart
      updateAddToCartButtonText(addToCart, itemIsInCart, labels);
    },
    { eager: true },
  );

  // Set JSON-LD and Meta Tags
  events.on('aem/lcp', async () => {
    if (!product) return;

    const isPrerendered = isProductPrerendered();

    if (isPrerendered) {
      if (!isGridOrderingView) return;

      const variants = await getProductVariants(product.sku);
      gridOrderingVariants = initQuickOrderGridOrdering(product, variants);
    } else {
      const variants = await getProductVariants(product.sku);

      if (isGridOrderingView) {
        gridOrderingVariants = initQuickOrderGridOrdering(product, variants);
      }

      setJsonLdProduct(product, variants);
      setMetaTags(product);
      document.title = product.name;
    }
  }, { eager: true });

  return Promise.resolve();
}

function setJsonLdProduct(product, variants) {
  const {
    name,
    inStock,
    description,
    sku,
    urlKey,
    price,
    priceRange,
    images,
    attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes?.find((attr) => attr.name === 'brand');

  const ldJson = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images[0]?.url,
    offers: [],
    productID: sku,
    brand: {
      '@type': 'Brand',
      name: brand?.value,
    },
    url: new URL(getProductLink(urlKey, sku), window.location),
    sku,
    '@id': new URL(getProductLink(urlKey, sku), window.location),
  };

  if (variants.length > 1) {
    ldJson.offers.push(...variants.map((variant) => ({
      '@type': 'Offer',
      name: variant.product.name,
      image: variant.product.images[0]?.url,
      price: variant.product.price.final.amount.value,
      priceCurrency: variant.product.price.final.amount.currency,
      availability: variant.product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
      sku: variant.product.sku,
    })));
  } else {
    ldJson.offers.push({
      '@type': 'Offer',
      price: amount?.value,
      priceCurrency: amount?.currency,
      availability: inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
    });
  }

  setJsonLd(ldJson, 'product');
}

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(product) {
  if (!product?.sku) {
    return;
  }

  const price = product.prices.final.minimumAmount ?? product.prices.final.amount;

  createMetaTag('title', product.metaTitle || product.name, 'name');
  createMetaTag('description', product.metaDescription, 'name');
  createMetaTag('keywords', product.metaKeyword, 'name');

  createMetaTag('og:type', 'product', 'property');
  createMetaTag('og:description', product.shortDescription, 'property');
  createMetaTag('og:title', product.metaTitle || product.name, 'property');
  createMetaTag('og:url', window.location.href, 'property');
  const mainImage = product?.images?.filter((image) => image.roles.includes('thumbnail'))[0];
  const metaImage = mainImage?.url || product?.images[0]?.url;
  createMetaTag('og:image', metaImage, 'property');
  createMetaTag('og:image:secure_url', metaImage, 'property');
  createMetaTag('product:price:amount', price.value, 'property');
  createMetaTag('product:price:currency', price.currency, 'property');
}

/**
 * Returns the configuration for an image slot.
 * @param ctx - The context of the slot.
 * @returns The configuration for the image slot.
 */
function imageSlotConfig(ctx) {
  const {
    data,
    defaultImageProps,
  } = ctx;
  return {
    alias: data.sku,
    imageProps: defaultImageProps,

    params: {
      width: defaultImageProps.width,
      height: defaultImageProps.height,
    },
  };
}

/**
 * Fetches product variants with their attributes
 * @param {string} sku - Product SKU
 * @param {Object} fetcherApi - API fetcher instance
 * @returns {Promise<Array>} Array of product variants
 */
async function getProductVariants(sku) {
  const { data } = await pdpApi.fetchGraphQl(
    `
      query GET_PRODUCT_VARIANTS($sku: String!) {
        variants(sku: $sku) {
          variants {
            selections
            product {
              sku
              name
              inStock
              attributes {
                name
                label
                value
                roles
              }
              images(roles: ["image"]) {
                url
              }
              ...on SimpleProductView {
                price {
                  final { amount { currency value } }
                }
              }
            }
          }
        }
      }
    `,
    {
      method: 'GET',
      variables: { sku },
    },
  );

  return data?.variants?.variants ?? [];
}

// Grid Ordering feature initialization
function initQuickOrderGridOrdering(product, variants) {
  const productOptions = product.options;

  // Example of including and displaying additional fields in the variants grid
  const extendedVariants = variants
    .filter((variant) => variant.product)
    .map((variant) => {
      const variantOptionAttributes = variant.product.attributes.filter((variantAttribute) => {
        const isVariantAttribute = productOptions.some((productOption) => {
          const productOptionId = productOption.id;
          const variantAttributeName = variantAttribute.name;

          return productOptionId === variantAttributeName;
        });

        return isVariantAttribute;
      });

      return {
        ...variant,
        product: {
          ...variant.product,
          variantOptionAttributes,
        },
      };
    });

  events.emit('quick-order/grid-ordering-variants', extendedVariants);

  return extendedVariants;
}
