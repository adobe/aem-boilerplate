/* eslint-disable class-methods-use-this */
import {
  Component, Fragment, h, render,
} from '../../scripts/preact.js';

import htm from '../../scripts/htm.js';
import Carousel from './ProductDetailsCarousel.js';
import Sidebar from './ProductDetailsSidebar.js';
import ProductDetailsShimmer from './ProductDetailsShimmer.js';
import {
  getProduct,
  getSkuFromUrl,
  performCatalogServiceQuery,
  refineProductQuery,
  setJsonLd,
  loadErrorPage,
  variantsQuery,
  mapProductAcdl,
} from '../../scripts/commerce.js';
import { readBlockConfig } from '../../scripts/aem.js';

const html = htm.bind(h);

async function getVariantDetails(variantIds, sku) {
  const result = await performCatalogServiceQuery(
    refineProductQuery,
    {
      sku,
      variantIds,
    },
  );
  return {
    images: result.refineProduct?.images,
    price: result.refineProduct?.price,
  };
}

async function setJsonLdProduct(product) {
  const {
    name, inStock, description, sku, urlKey, price, priceRange, images, attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes.find((attr) => attr.name === 'brand');

  // get variants
  const { variants } = (await performCatalogServiceQuery(variantsQuery, { sku }))?.variants
  || { variants: [] };

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
    url: new URL(`/products/${urlKey}/${sku}`, window.location),
    sku,
    '@id': new URL(`/products/${urlKey}/${sku}`, window.location),
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

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onQuantityChanged = this.onQuantityChanged.bind(this);
    this.onAddToWishlist = this.onAddToWishlist.bind(this);
  }

  async componentDidMount() {
    let product;
    try {
      if (!window.getProductPromise) {
        window.getProductPromise = getProduct(this.props.sku);
      }
      product = await window.getProductPromise;
      if (!product) {
        throw new Error("Couldn't get product");
      }

      this.setState({
        product,
        loading: false,
        selection: {},
      });
    } catch (e) {
      await loadErrorPage();
    } finally {
      this.props.resolve();
    }
  }

  onAddToCart = async () => {
    if (Object.keys(this.state.selection).length === (this.state.product.options?.length || 0)) {
      const optionsUIDs = Object.values(this.state.selection).map((option) => option.id);
      const { cartApi } = await import('../../scripts/minicart/api.js');
      cartApi.addToCart(this.state.product.sku, optionsUIDs, this.state.selectedQuantity ?? 1, 'product-detail');
    }
  };

  onAddToWishlist = async () => {
    console.debug('onAddToWishlist', this.state.product.sku);
  };

  onQuantityChanged = (quantity) => {
    this.setState({ selectedQuantity: quantity });
  };

  onSelectionChanged = (fragment) => {
    // update selection value
    this.setState((oldState) => ({
      selection: {
        ...oldState.selection,
        ...fragment,
      },
    }));

    // fetch new images and prices
    const variantIds = Object.values({ ...this.state.selection, ...fragment })
      .map((selection) => selection.id);
    getVariantDetails(variantIds, this.state.product.sku).then(({ images, price }) => {
      this.setState((oldState) => ({
        product: {
          ...oldState.product,
          images,
          price,
        },
      }));
    });
  };

  async componentDidUpdate() {
    const { loading, product } = this.state;
    if (!loading && product) {
      setJsonLdProduct(product);
      document.title = product.name;
      window.adobeDataLayer.push((dl) => {
        dl.push({
          productContext: mapProductAcdl(product),
        });
        // TODO: Remove eventInfo once collector is updated
        dl.push({ event: 'product-page-view', eventInfo: { ...dl.getState() } });
      });
    }
  }

  render() {
    if (this.state.loading) {
      return html`<${ProductDetailsShimmer} />`;
    }

    return html`
      <${Fragment} >
        <${Carousel} product=${this.state.product} sku=${this.props.sku} />
        <${Sidebar}
          product=${this.state.product}
          selection=${this.state.selection}
          onSelectionChanged=${this.onSelectionChanged}
          onAddToCart=${this.onAddToCart}
          onAddToWishlist=${this.onAddToWishlist}
          onQuantityChanged=${this.onQuantityChanged}
        />
        <div class="product-detail-description">
          <h3>Product Details</h3>
          <div dangerouslySetInnerHTML=${{ __html: this.state.product.description }}></div>
        </div>
      <//>
    `;
  }
}

export default async function decorate($block) {
  const blockConfig = readBlockConfig($block);
  $block.innerHTML = '<div class="full-height"></div>';

  const skuFromUrl = getSkuFromUrl() || blockConfig.sku;
  if (!skuFromUrl) {
    await loadErrorPage();
    return Promise.reject();
  }

  return new Promise((resolve) => {
    const app = html`<${ProductDetailPage} sku=${skuFromUrl} resolve=${resolve} />`;
    render(app, $block);
  });
}
