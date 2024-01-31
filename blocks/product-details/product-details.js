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
} from '../../scripts/commerce.js';

const html = htm.bind(h);

export function errorGettingProduct(code = 404) {
  fetch(`/${code}.html`).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error(`Error getting ${code} page`);
  }).then((htmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
    document.head.innerHTML = doc.head.innerHTML;
  });
  document.body.innerHTML = '';
}

async function getVariantDetails(variantIds, sku) {
  const result = await performCatalogServiceQuery(
    refineProductQuery,
    {
      sku: sku.toUpperCase(),
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
    const product = await getProduct(getSkuFromUrl());

    if (!product) {
      errorGettingProduct();
    }

    this.setState({
      product,
      loading: false,
      selection: {},
    });
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
      // TODO: productId not exposed by catalog service as number
      window.adobeDataLayer.push({ productContext: { productId: 0, ...product } }, { event: 'product-page-view' });
    }
  }

  render() {
    if (this.state.loading) {
      return html`<${ProductDetailsShimmer} />`;
    }

    return html`
      <${Fragment} >
        <${Carousel} product=${this.state.product} />
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
  $block.innerHTML = '<div class="full-height"></div>';

  const skuFromUrl = getSkuFromUrl();
  if (!skuFromUrl) {
    errorGettingProduct();
  }

  const app = html`<${ProductDetailPage} sku=${skuFromUrl} />`;

  render(app, $block);
}
