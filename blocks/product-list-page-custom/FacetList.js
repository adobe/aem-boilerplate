/* eslint-disable max-classes-per-file */
import {
  h, Component, createRef,
} from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';

const html = htm.bind(h);

// TODO
const facetTypeMapping = {
  silhouette: {
    type: 'checkbox',
  },
  size: {
    type: 'swatch',
    style: 'facet-size',
  },
  bandsize: {
    type: 'swatch',
    style: 'facet-size',
  },
  cupsize: {
    type: 'swatch',
    style: 'facet-size',
  },
  color_family: {
    type: 'swatch',
    style: 'facet-color',
  },
  price: {
    type: 'price',
  },
};

class PriceFacet extends Component {
  constructor(props) {
    super();

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const { buckets, selection } = props;
    const min = Math.min(...buckets.map((bucket) => bucket.from));
    const max = Math.max(...buckets.map((bucket) => bucket.to));
    let currentMin = min;
    let currentMax = max;
    if (selection.length === 2 && selection[0] >= min && selection[1] <= max) {
      [currentMin, currentMax] = selection;
    }

    this.state = {
      min, max, currentMin, currentMax,
    };

    this.minRef = createRef();
    this.maxRef = createRef();
  }

  onChange = (notify = true) => {
    const left = this.minRef.current.value;
    const right = this.maxRef.current.value;
    let currentMin = Math.min(left, right);
    let currentMax = Math.max(left, right);
    if (currentMin === currentMax) {
      if (currentMin > this.state.min) {
        currentMin -= 1;
      } else if (currentMax < this.state.max) {
        currentMax += 1;
      }
    }
    this.setState({ currentMin, currentMax });
    if (notify) {
      this.props.onSelectionChange(this.props.attribute, [currentMin, currentMax]);
    }
  };

  render() {
    const {
      min, max, currentMin, currentMax,
    } = this.state;
    const { selection } = this.props;

    let selectionMin = min;
    let selectionMax = max;
    if (selection.length === 2 && selection[0] >= min && selection[1] <= max) {
      [selectionMin, selectionMax] = selection;
    }

    return html`<div class="price-facet">
        <div class="price-slider">
          <input type="range" ref=${this.minRef} id="price-slider-min" defaultValue=${selectionMin} min=${min} max=${max} step="1" onchange=${this.onChange} oninput=${() => this.onChange(false)} />
          <input type="range" ref=${this.maxRef} id="price-slider-max" defaultValue=${selectionMax} min=${min} max=${max} step="1" onchange=${this.onChange} oninput=${() => this.onChange(false)} />
        </div>
        <label for="price-slider-min">${this.formatter.format(currentMin)}</label>
        <label for="price-slider-max">${this.formatter.format(currentMax)}</label>
    </div>`;
  }
}

function Facet({
  title, attribute, buckets: bucketsOrg, selection, onSelectionChange,
}) {
  // Infer display type based on facetTypeMapping, fallback to default
  let displayType = 'radio';
  let displayStyle = '';
  const buckets = bucketsOrg;

  if (facetTypeMapping[attribute]) {
    displayType = facetTypeMapping[attribute].type;
    displayStyle = facetTypeMapping[attribute].style;
  }

  const renderOptions = () => {
    const handleClickSingle = (event) => {
      const { value } = event.target;
      if (attribute === 'price') {
        const [from, to] = value.split(',').map((v) => parseInt(v, 10) || 0);
        if (selection[0] === from && selection[1] === to) {
          onSelectionChange(attribute, []);
        } else {
          onSelectionChange(attribute, [from, to]);
        }
      } else if (selection.includes(value)) {
        onSelectionChange(attribute, []);
      } else {
        onSelectionChange(attribute, [value]);
      }
    };

    const handleClickMultiple = (event) => {
      const { value } = event.target;
      if (selection.includes(value)) {
        onSelectionChange(attribute, selection.filter((selected) => selected !== value));
      } else {
        onSelectionChange(attribute, [...selection, value]);
      }
    };

    if (displayType === 'swatch') {
      return buckets.map((bucket) => html`
          <li>
            <button
              title=${bucket.title}
              value=${bucket.id}
              class="${selection.includes(bucket.id) ? 'active' : ''}"
              onClick=${handleClickMultiple}>${bucket.title}</button>
          </li>
        `);
    }
    if (displayType === 'checkbox') {
      return buckets.map((bucket) => html`<li>
          <input type="checkbox" name="facet-${attribute}" id="facet-${bucket.id}" value=${bucket.id} checked=${selection.includes(bucket.id)} onClick=${handleClickMultiple} />
          <label for="facet-${bucket.id}">
            ${bucket.title} <span class="count">${bucket.count}</span>
          </label>
        </li>`);
    }
    if (displayType === 'radio') {
      return buckets.map((bucket) => html`<li>
          <input type="radio" name="facet-${attribute}" id="facet-${bucket.id}" value=${bucket.id} checked=${selection.includes(bucket.id)} onClick=${handleClickSingle} />
          <label for="facet-${bucket.id}">
            ${bucket.title} <span class="count">${bucket.count}</span>
          </label>
        </li>`);
    }
    if (displayType === 'price') {
      return html`<${PriceFacet}
        attribute=${attribute}
        buckets=${buckets}
        selection=${selection}
        onSelectionChange=${onSelectionChange}
      />`;
    }
    return null;
  };

  return html`<div class="facet ${displayType} ${displayStyle || ''}">
    <input type="checkbox" id="facet-toggle-${attribute}" checked=${selection.length > 0}  />
    <label for="facet-toggle-${attribute}">${title}</label>
    <div class="facet-content">
        <ol>${renderOptions()}</ol>
    </div>
  </div>`;
}

export default class FacetList extends Component {
  onSelectionChange = (facet, selection) => {
    const newFilters = { ...this.props.filters };
    newFilters[facet] = selection;
    this.props.onFilterChange(newFilters);
  };

  // eslint-disable-next-line class-methods-use-this
  render({
    facetMenuRef, facets, filters, loading,
  }) {
    if (loading) {
      return html`<div class="facets shimmer"></div>`;
    }

    return html`
      <div class="facets ${loading ? 'shimmer' : ''}" ref=${facetMenuRef}>
          <h2>Filters</h2>
          <button class="close" onClick=${() => facetMenuRef.current.classList.toggle('active')}>Close</button>
          <div class="facet-list">
            ${facets
    .filter((facet) => facet.buckets.length > 0)
    .map((facet) => {
      const selection = filters[facet.attribute] || [];
      return html`<${Facet} ...${facet} selection=${selection} onSelectionChange=${this.onSelectionChange} />`;
    })}
        </div>
      </div>`;
  }
}
