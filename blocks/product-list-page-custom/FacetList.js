/* eslint-disable max-classes-per-file */
import {
  h, Component, createRef,
} from '@dropins/tools/preact.js';
import htm from './htm.js';

const html = htm.bind(h);

// TODO
const facetTypeMapping = {
  categories: {
    type: 'checkbox',
  },
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
      min,
      max,
      currentMin,
      currentMax,
      isDragging: false,
    };

    this.minRef = createRef();
    this.maxRef = createRef();
    this.debounceTimer = null;
  }

  onChange = (notify = true) => {
    const left = parseInt(this.minRef.current.value, 10);
    const right = parseInt(this.maxRef.current.value, 10);

    // Prevent sliders from crossing
    let currentMin = Math.min(left, right);
    let currentMax = Math.max(left, right);

    // Ensure minimum gap between sliders
    if (currentMax - currentMin < 1) {
      if (currentMin > this.state.min) {
        currentMin = currentMax - 1;
      } else if (currentMax < this.state.max) {
        currentMax = currentMin + 1;
      }
    }

    this.setState({ currentMin, currentMax });

    if (notify && !this.state.isDragging) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.props.onSelectionChange(
          this.props.attribute,
          [currentMin, currentMax],
        );
      }, 500);
    }
  };

  handleMouseDown = () => {
    this.setState({ isDragging: true });
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false });
    this.props.onSelectionChange(
      this.props.attribute,
      [this.state.currentMin, this.state.currentMax],
    );
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
          <input
            type="range"
            ref=${this.minRef}
            id="price-slider-min"
            defaultValue=${selectionMin}
            min=${min}
            max=${max}
            step="1"
            onchange=${this.onChange}
            oninput=${() => this.onChange(false)}
            onMouseDown=${this.handleMouseDown}
            onMouseUp=${this.handleMouseUp}
          />
          <input
            type="range"
            ref=${this.maxRef}
            id="price-slider-max"
            defaultValue=${selectionMax}
            min=${min}
            max=${max}
            step="1"
            onchange=${this.onChange}
            oninput=${() => this.onChange(false)}
            onMouseDown=${this.handleMouseDown}
            onMouseUp=${this.handleMouseUp}
          />
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
    if (displayType === 'swatch') {
      return buckets.map((bucket) => html`
          <li>
            <button
              title=${bucket.title}
              value=${bucket.id}
              class="${selection.includes(bucket.id) ? 'active' : ''}"
              onClick=${(event) => {
    const { value } = event.target;
    if (selection.includes(value)) {
      onSelectionChange(attribute, selection.filter((selected) => selected !== value));
    } else {
      onSelectionChange(attribute, [...selection, value]);
    }
  }}>${bucket.title}</button>
          </li>
        `);
    }
    if (displayType === 'checkbox' || displayType === 'radio') {
      return html`<ul class="${displayStyle || 'list'}">
        ${buckets
    // eslint-disable-next-line no-underscore-dangle
    .filter((bucket) => bucket?.__typename === 'ScalarBucket')
    .map((bucket) => {
      // For categories, we store IDs in selection but display titles
      const isSelected = attribute === 'categories'
        ? selection.includes(bucket.id)
        : selection.includes(bucket.title);
      return html`<li>
              <label>
                <input
                  type=${displayType === 'radio' ? 'radio' : 'checkbox'}
                  name=${attribute}
                  value=${attribute === 'categories' ? bucket.id : bucket.title}
                  checked=${isSelected}
                  onChange=${(e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const value = attribute === 'categories' ? bucket.id : bucket.title;
    if (displayType === 'radio') {
      onSelectionChange(attribute, [value]);
    } else {
      const newSelection = isSelected
        ? selection.filter((s) => s !== value)
        : [...selection, value];
      onSelectionChange(attribute, newSelection);
    }
  }}
                />
                <span>${bucket.title}${bucket.count ? ` (${bucket.count})` : ''}</span>
              </label>
            </li>`;
    })}
      </ul>`;
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
    <input type="checkbox" id="facet-toggle-${attribute}" checked=${true} />
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

  render({
    facetMenuRef, facets, filters, loading,
  }) {
    // Don't render anything if loading or no facets data
    if (loading || !facets || facets.length === 0) {
      return html`<div class="facets empty"></div>`;
    }

    // Filter out facets with empty buckets
    const nonEmptyFacets = facets.filter((facet) => facet.buckets && facet.buckets.length > 0);

    // If no non-empty facets, show empty state
    if (nonEmptyFacets.length === 0) {
      return html`<div class="facets empty"></div>`;
    }

    return html`
      <div class="facets" ref=${facetMenuRef}>
          <h2>Filters</h2>
          <button class="close" onClick=${() => facetMenuRef.current.classList.toggle('active')}>Close</button>
          <div class="facet-list">
            ${nonEmptyFacets.map((facet) => {
    const selection = filters[facet.attribute] || [];
    return html`<${Facet} ...${facet} selection=${selection} onSelectionChange=${this.onSelectionChange} />`;
  })}
          </div>
      </div>`;
  }
}
