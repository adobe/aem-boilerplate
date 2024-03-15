/* eslint-disable object-curly-spacing, class-methods-use-this */
import {
  h, Component, Fragment,
} from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import {
  renderPrice,
} from '../../scripts/commerce.js';

const html = htm.bind(h);

class ProductCard extends Component {
  constructor(props) {
    super();
    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    this.baseProduct = props.product;
  }

  renderImage(loading = 'lazy') {
    const { product } = this.props;

    // Placeholder as fallback
    let image;

    // Use base image if available
    if (product.images && product.images.length > 0) {
      image = product.images[0].url;
    }

    if (!image) {
      return html`<div class="no-image"></div>`;
    }

    const url = new URL(image);
    url.protocol = 'https:';
    url.search = '';

    return html`<picture>
      <source type="image/webp" srcset="${url}?width=163&bg-color=255,255,255&format=webply&optimize=medium 1x,${url}?width=326&bg-color=255,255,255&format=webply&optimize=medium 2x, ${url}?width=489&bg-color=255,255,255&format=webply&optimize=medium 3x" media="(max-width: 900px)" />
      <source type="image/webp" srcset="${url}?width=330&bg-color=255,255,255&format=webply&optimize=medium 1x, ${url}?width=660&bg-color=255,255,255&format=webply&optimize=medium 2x, ${url}?width=990&bg-color=255,255,255&format=webply&optimize=medium 3x" />
      <img class="product-image-photo" src="${url}?width=330&quality=100&bg-color=255,255,255" max-width="330" max-height="396" alt=${product.name} loading=${loading} />
    </picture>`;
  }

  onProductClick(product) {
    window.adobeDataLayer.push((dl) => {
      // TODO: Remove eventInfo once collector is updated
      dl.push({ event: 'search-product-click', eventInfo: { ...dl.getState(), searchUnitId: 'searchUnitId', sku: product.sku } });
    });
  }

  render({ product, loading, index }) {
    if (loading) {
      return html`
      <li>
        <div class="picture shimmer"></div>
        <div class="variants"></div>
        <div class="name">
          <div class="shimmer shimmer-text"></div>
          <div class="shimmer shimmer-text" style="max-width: 70%"></div>
        </div>
        <div class="price">
          <div class="shimmer shimmer-text" style="max-width: 30%"></div>
        </div>
        <div class="rating"></div>
      </li>`;
    }

    const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;
    const numberOfEagerImages = isMobile ? 2 : 4;

    return html`
      <li index=${index}>
        <div class="picture">
          <a onClick=${() => this.onProductClick(product)} href="/products/${product.urlKey}/${product.sku.toLowerCase()}">
            ${this.renderImage(index < numberOfEagerImages ? 'eager' : 'lazy')}
          </a>
        </div>
        <div class="name">
          <a onClick=${() => this.onProductClick(product)} href="/products/${product.urlKey}/${product.sku.toLowerCase()}" dangerouslySetInnerHTML=${{__html: product.name}} />
        </div>
        <div class="price">${renderPrice(product, this.formatter.format, html, Fragment)}</div>
      </li>`;
  }
}

const ProductList = ({
  products, loading, currentPageSize,
}) => {
  if (loading) {
    return html`<div class="list">
      <ol>
        ${Array(currentPageSize).fill().map(() => html`<${ProductCard} loading=${true} />`)}
      </ol>
    </div>`;
  }

  if (products.items.length === 0) {
    return html`<div class="list">
      <div class="empty">We're sorry, we couldn't find anything that matches your query.</div>
    </div>`;
  }

  const gridItems = products.items.map((product, index) => html`<${ProductCard} key=${product.sku} product=${product} index=${index} />`);
  return html`<div class="list">
    <ol>
        ${gridItems}
    </ol>
  </div>`;
};

export default ProductList;
