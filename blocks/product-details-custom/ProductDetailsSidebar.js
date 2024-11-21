import { Component, Fragment, h } from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';
import Icon from './Icon.js';
import { renderPrice } from '../../scripts/commerce.js';

const html = htm.bind(h);

function QuantitySelector({ onChange }) {
  const options = Array.from({ length: 15 }, (_, index) => index + 1);
  return html`<div class="sidebar-section quantity-select">
      <h4 class="selection">Quantity</h4>
      <select onchange=${(event) => onChange?.(Number.parseInt(event.target.value, 10))}>
        ${options.map((value) => html`<option key=${value} value=${value}>${value}</option>`)}
      </select>
    </div>`;
}

function NameAndPriceShimmer() {
  return html`
      <div class="desktop-hidden title-shimmer">
          <div class="heading-shimmer shimmer"></div>
          <div class="price-shimmer shimmer"></div>
      </div>
  `;
}

function NameAndPrice({ shimmer, product }) {
  const {
    priceRange, price, name, sku,
  } = product;

  if (shimmer || !(priceRange || price)) {
    return html`<${NameAndPriceShimmer} />`;
  }

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const priceHtml = renderPrice(product, priceFormatter.format, html, Fragment);
  return html`<${Fragment}>
    <h1 dangerouslySetInnerHTML=${{ __html: name }}></h1>
    <div class="price" >${priceHtml}</div>
    <div class="style-id">SKU: ${sku}</div>
  <//>`;
}

function Options({ product, updateSelection, selection }) {
  const options = product?.options;
  if (!options) {
    return null;
  }

  const renderSwatches = (option) => {
    const { values } = option;
    const selectedValue = selection?.[option.id]?.id;

    return values.map((value) => {
      const attr = {};
      if (value.type === 'COLOR_HEX') {
        attr.style = {
          backgroundColor: value.value,
        };
      }

      return html`<li key=${value.id} class="swatch">
          <button
            ...${attr}
            aria-selected=${value.id === selectedValue}
            disabled=${!value.inStock}
            onClick=${() => updateSelection({ [option.id]: value })}>${value.title}</button>
        </li>`;
    });
  };

  return options.map((option) => {
    const selectedTitle = selection?.[option.id]?.title;
    return html`<div class=${`sidebar-section ${option.id === 'color' ? 'color-selector' : 'sizes-selector'}`}>
      <h4>${selectedTitle ? `${option.title}: ${selectedTitle}` : option.title}</h4>
      <ul class="swatches swatches-regular">${renderSwatches(option)}</ul>
    </div>`;
  });
}

function CartSection({ onAddToCart, canAddToCart, onAddToWishlist }) {
  return html`<div class="sidebar-section cart">
    <button disabled=${!canAddToCart()} onclick=${onAddToCart} class="button primary cart-button">Add to Bag</button>
    <button onclick=${onAddToWishlist} class="button secondary secondary-action"><${Icon} name="heart" />Add to Favorites</button>
  </div>`;
}

export default class ProductDetailsSidebar extends Component {
  constructor(props) {
    super(props);

    this.updateSelection = this.updateSelection.bind(this);
    this.canAddToCart = this.canAddToCart.bind(this);
  }

  updateSelection(fragment) {
    this.props.onSelectionChanged?.(fragment);
  }

  canAddToCart() {
    return Object.keys(this.props.selection).length === (this.props.product.options?.length || 0);
  }

  render() {
    const { product, loading, selection } = this.props;
    if (loading) {
      return html`<div class="sidebar shimmer"></div>`;
    }

    return html`<${Fragment}>
      <div class="product-title desktop-hidden">
        <${NameAndPrice} shimmer=${this.props.shimmer} product=${product} />
      </div>
      <div class=${`sidebar ${this.props.shimmer ? 'shimmer' : ''}`}>
          ${this.props.shimmer || html`
          <div class="product-title sidebar-section mobile-hidden">
            <${NameAndPrice} product=${product} />
          </div>
          <${Options} product=${product} updateSelection=${this.updateSelection} selection=${selection} />
          <${QuantitySelector} onChange=${this.props.onQuantityChanged} />
          <${CartSection} onAddToWishlist=${this.props.onAddToWishlist} onAddToCart=${this.props.onAddToCart} canAddToCart=${this.canAddToCart} />
        `}
      </div>
    <//>`;
  }
}
