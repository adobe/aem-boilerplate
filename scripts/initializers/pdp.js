import { initializers } from '@dropins/tools/initializer.js';
import { Image, provider as UI } from '@dropins/tools/components.js';
import { initialize, setEndpoint, fetchProductData } from '@dropins/storefront-pdp/api.js';
import { isAemAssetsEnabled, tryGenerateAemAssetsOptimizedUrl } from '@dropins/tools/lib/aem/assets.js';
import { initializeDropin } from './index.js';
import {
  CS_FETCH_GRAPHQL,
  fetchPlaceholders,
  getOptionsUIDsFromUrl,
  getProductSku,
  loadErrorPage,
  preloadFile,
} from '../commerce.js';
import { getMetadata } from '../aem.js';

export const IMAGES_SIZES = {
  width: 960,
  height: 1191,
};

/**
 * Extracts the main product image URL from JSON-LD or meta tags
 * @returns {string|null} The image URL or null if not found
 */
function extractMainImageUrl() {
  // Cache DOM query to avoid repeated lookups
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

  if (!jsonLdScript?.textContent) {
    return getMetadata('og:image') || getMetadata('image');
  }

  try {
    const jsonLd = JSON.parse(jsonLdScript.textContent);

    // Verify this is product structured data before extracting image
    if (jsonLd?.['@type'] === 'Product' && jsonLd?.image) {
      return jsonLd.image;
    }

    return getMetadata('og:image') || getMetadata('image');
  } catch (error) {
    console.debug('Failed to parse JSON-LD:', error);
    return getMetadata('og:image') || getMetadata('image');
  }
}

/**
 * Preloads PDP Dropins assets for optimal performance
 */
function preloadPDPAssets() {
  // Preload PDP Dropins assets
  preloadFile('/scripts/__dropins__/storefront-pdp/api.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/render.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductHeader.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductPrice.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductShortDescription.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductOptions.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductQuantity.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductDescription.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductAttributes.js', 'script');
  preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductGallery.js', 'script');

  // Extract and preload main product image
  const imageUrl = extractMainImageUrl();

  if (imageUrl) {
    preloadFile(imageUrl, 'image');
  } else {
    console.warn('Unable to infer main image from JSON-LD or meta tags');
  }
}

await initializeDropin(async () => {
  // Inherit Fetch GraphQL Instance (Catalog Service)
  setEndpoint(CS_FETCH_GRAPHQL);

  // Preload PDP assets immediately when this module is imported
  preloadPDPAssets();

  // Fetch product data
  const sku = getProductSku();
  const optionsUIDs = getOptionsUIDsFromUrl();

  const [product, labels] = await Promise.all([
    fetchProductData(sku, { optionsUIDs, skipTransform: true }).then(preloadImageMiddleware),
    fetchPlaceholders('placeholders/pdp.json'),
  ]);

  if (!product?.sku) {
    return loadErrorPage();
  }

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  return initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();

async function preloadImageMiddleware(data) {
  const image = data?.images?.[0]?.url?.replace(/^https?:/, '');

  if (image) {
    let url = image;
    let imageParams = {
      ...IMAGES_SIZES,
    };
    if (isAemAssetsEnabled) {
      url = tryGenerateAemAssetsOptimizedUrl(image, data.sku, {});
      imageParams = {
        ...imageParams,
        crop: undefined,
        fit: undefined,
        auto: undefined,
      };
    }
    await UI.render(Image, {
      src: url,
      ...IMAGES_SIZES.mobile,
      params: imageParams,
      loading: 'eager',
    })(document.createElement('div'));
  }
  return data;
}
