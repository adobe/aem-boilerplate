/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import * as productApi from '@dropins/storefront-pdp/api.js';
import { render as productRenderer } from '@dropins/storefront-pdp/render.js';
import ProductDetails from '@dropins/storefront-pdp/containers/ProductDetails.js';

// Libs
import { getProduct, getSkuFromUrl, setJsonLd } from '../../scripts/commerce.js';
import { getConfigValue } from '../../scripts/configs.js';

// Error Handling (404)
async function errorGettingProduct(code = 404) {
  const htmlText = await fetch(`/${code}.html`).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error(`Error getting ${code} page`);
  });
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  document.body.innerHTML = doc.body.innerHTML;
  document.head.innerHTML = doc.head.innerHTML;
}

async function addToCart({
  sku, quantity, optionsUIDs, product,
}) {
  const { cartApi } = await import('../../../scripts/minicart/api.js');

  return cartApi.addToCart(sku, optionsUIDs, quantity, product);
}

async function setJsonLdProduct(product) {
  const {
    name, inStock, description, sku, urlKey, price, priceRange, images, attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes.find((attr) => attr.name === 'brand');

  setJsonLd({
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images[0]?.url,
    offers: [{
      '@type': 'http://schema.org/Offer',
      price: amount?.value,
      priceCurrency: amount?.currency,
      availability: inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
    }],
    productID: sku,
    brand: {
      '@type': 'Brand',
      name: brand?.value,
    },
    url: new URL(`/products/${urlKey}/${sku.toLowerCase()}`, window.location),
    sku,
    '@id': new URL(`/products/${urlKey}/${sku.toLowerCase()}`, window.location),
  }, 'product');
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
  if (!product) {
    return;
  }

  const price = product.priceRange
    ? product.priceRange.minimum.final.amount : product.price.final.amount;

  createMetaTag('title', product.metaTitle, 'name');
  createMetaTag('description', product.metaDescription, 'name');
  createMetaTag('keywords', product.metaKeyword, 'name');

  createMetaTag('og:type', 'og:product', 'property');
  createMetaTag('og:description', product.shortDescription, 'property');
  createMetaTag('og:title', product.metaTitle, 'property');
  createMetaTag('og:url', window.location.href, 'property');
  const mainImage = product?.images?.filter((image) => image.roles.includes('thumbnail'))[0];
  const metaImage = mainImage?.url || product?.images[0]?.url;
  createMetaTag('og:image', metaImage, 'property');
  createMetaTag('og:image:secure_url', metaImage, 'property');
  createMetaTag('og:product:price:amount', price.value, 'property');
  createMetaTag('og:product:price:currency', price.currency, 'property');

  createMetaTag('twitter:card', product.shortDescription, 'name');
  createMetaTag('twitter:title', product.metaTitle, 'name');
  createMetaTag('twitter:image', metaImage, 'name');
}

export default async function decorate(block) {
  if (!window.getProductPromise) {
    window.getProductPromise = getProduct(this.props.sku);
  }
  const product = await window.getProductPromise;

  if (!product) {
    await errorGettingProduct();
    return Promise.reject();
  }

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  initializers.register(productApi.initialize, {
    models,
  });

  // Set Fetch Endpoint (Service)
  productApi.setEndpoint(await getConfigValue('commerce-endpoint'));

  // Set Fetch Headers (Service)
  productApi.setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  events.on('eds/lcp', () => {
    if (!product) {
      return;
    }

    setJsonLdProduct(product);
    setMetaTags(product);
    document.title = product.name;

    window.adobeDataLayer.push((dl) => {
      dl.push({
        productContext: {
          productId: parseInt(product.externalId, 10) || 0,
          ...product,
        },
      });
      // TODO: Remove eventInfo once collector is updated
      dl.push({ event: 'product-page-view', eventInfo: { ...dl.getState() } });
    });
  }, { eager: true });

  // Render Containers
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        await productRenderer.render(ProductDetails, {
          sku: getSkuFromUrl(),
          carousel: {
            controls: 'thumbnailsColumn',
            arrowsOnMainImage: true,
            mobile: true,
            peak: {
              mobile: true,
              desktop: false,
            },
            gap: 'small',
          },
          slots: {
            Actions: (ctx) => {
              // Add to Cart Button
              ctx.appendButton((next, state) => {
                const adding = state.get('adding');
                return {
                  text: adding ? 'Adding to Cart' : 'Add to Cart',
                  icon: 'Cart',
                  variant: 'primary',
                  disabled: adding || !next.data?.inStock || !next.valid,
                  onClick: async () => {
                    try {
                      state.set('adding', true);
                      await addToCart({
                        sku: next.values?.sku,
                        quantity: next.values?.quantity,
                        optionsUIDs: next.values?.optionsUIDs,
                        product: next.data,
                      });
                    } catch (error) {
                      console.error('Could not add to cart: ', error);
                    } finally {
                      state.set('adding', false);
                    }
                  },
                };
              });
            },
          },
        })(block);
      } catch (e) {
        console.error(e);
        await errorGettingProduct();
      } finally {
        resolve();
      }
    }, 0);
  });
}
