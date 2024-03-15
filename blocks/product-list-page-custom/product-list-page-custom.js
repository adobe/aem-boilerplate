import {
  h, Component, Fragment, render, createRef,
} from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import ProductList from './ProductList.js';
import FacetList from './FacetList.js';
import { readBlockConfig, sampleRUM } from '../../scripts/aem.js';
import { priceFieldsFragment, performCatalogServiceQuery } from '../../scripts/commerce.js';

const html = htm.bind(h);

// You can get this list via attributeMetadata query
export const ALLOWED_FILTER_PARAMETERS = ['page', 'pageSize', 'sort', 'sortDirection', 'q', 'price', 'size', 'color_family'];

export const productSearchQuery = (addCategory = false) => `query ProductSearch(
  $currentPage: Int = 1
  $pageSize: Int = 20
  $phrase: String = ""
  $sort: [ProductSearchSortInput!] = []
  $filter: [SearchClauseInput!] = []
  ${addCategory ? '$categoryId: String!' : ''}
) {
  ${addCategory ? `categories(ids: [$categoryId]) {
      name
      urlKey
      urlPath
  }` : ''}
  productSearch(
      current_page: $currentPage
      page_size: $pageSize
      phrase: $phrase
      sort: $sort
      filter: $filter
  ) {
      facets {
          title
          type
          attribute
          buckets {
              title
              __typename
              ... on RangeBucket {
                  count
                  from
                  to
              }
              ... on ScalarBucket {
                  count
                  id
              }
              ... on StatsBucket {
                  max
                  min
              }
          }
      }
      items {
          product {
            id
          }
          productView {
              name
              sku
              urlKey
              images(roles: "thumbnail") {
                url
              }
              __typename
              ... on SimpleProductView {
                  price {
                      ...priceFields
                  }
              }
              ... on ComplexProductView {
                  priceRange {
                      minimum {
                          ...priceFields
                      }
                      maximum {
                          ...priceFields
                      }
                  }
              }
          }
      }
      page_info {
          current_page
          total_pages
          page_size
      }
      total_count
  }
}
${priceFieldsFragment}`;

async function loadCategory(state) {
  try {
    // Be careful if query exceeds GET size limits, then switch to POST
    const variables = {
      pageSize: state.currentPageSize,
      currentPage: state.currentPage,
      sort: [{
        attribute: state.sort,
        direction: state.sortDirection === 'desc' ? 'DESC' : 'ASC',
      }],
    };

    variables.phrase = state.type === 'search' ? state.searchTerm : '';

    if (Object.keys(state.filters).length > 0) {
      variables.filter = [];
      Object.keys(state.filters).forEach((key) => {
        if (key === 'price') {
          const [from, to] = state.filters[key];
          if (from && to) {
            variables.filter.push({ attribute: key, range: { from, to } });
          }
        } else if (state.filters[key].length > 1) {
          variables.filter.push({ attribute: key, in: state.filters[key] });
        } else if (state.filters[key].length === 1) {
          variables.filter.push({ attribute: key, eq: state.filters[key][0] });
        }
      });
    }

    if (state.type === 'category' && state.category.id) {
      variables.categoryId = state.category.id;
      variables.filter = variables.filter || [];
      variables.filter.push({ attribute: 'categoryIds', eq: state.category.id });
    }

    window.adobeDataLayer.push((dl) => {
      const requestId = crypto.randomUUID();
      window.sessionStorage.setItem('searchRequestId', requestId);
      const searchInputContext = dl.getState('searchInputContext') ?? { units: [] };
      const searchUnitId = 'livesearch-plp';
      const unit = {
        searchUnitId,
        searchRequestId: requestId,
        queryTypes: ['products', 'suggestions'],
        ...variables,
      };
      const index = searchInputContext.units.findIndex((u) => u.searchUnitId === searchUnitId);
      if (index < 0) {
        searchInputContext.units.push(unit);
      } else {
        searchInputContext.units[index] = unit;
      }
      dl.push({ searchInputContext });
      // TODO: Remove eventInfo once collector is updated
      dl.push({ event: 'search-request-sent', eventInfo: { ...dl.getState(), searchUnitId } });
    });

    const response = await performCatalogServiceQuery(productSearchQuery(state.type === 'category'), variables);

    // Parse response into state
    return {
      pages: Math.max(response.productSearch.page_info.total_pages, 1),
      products: {
        items: response.productSearch.items
          .map((product) => ({ ...product.productView, ...product.product }))
          .filter((product) => product !== null),
        total: response.productSearch.total_count,
      },
      category: response.categories?.[0] ?? {},
      facets: response.productSearch.facets.filter((facet) => facet.attribute !== 'categories'),
    };
  } catch (e) {
    console.error('Error loading products', e);
    return {
      pages: 1,
      products: {
        items: [],
        total: 0,
      },
      facets: [],
    };
  }
}

function parseQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const newState = {
    filters: {
      inStock: ['true'],
    },
  };
  params.forEach((value, key) => {
    if (!ALLOWED_FILTER_PARAMETERS.includes(key)) {
      return;
    }

    if (key === 'page') {
      newState.currentPage = parseInt(value, 10) || 1;
    } else if (key === 'pageSize') {
      newState.currentPageSize = parseInt(value, 10) || 10;
    } else if (key === 'sort') {
      newState.sort = value;
    } else if (key === 'sortDirection') {
      newState.sortDirection = value === 'desc' ? 'desc' : 'asc';
    } else if (key === 'q') {
      newState.searchTerm = value;
    } else if (key === 'price') {
      newState.filters[key] = value.split(',').map((v) => parseInt(v, 10) || 0);
    } else {
      newState.filters[key] = value.split(',');
    }
  });
  return newState;
}

function Pagination(props) {
  if (props.loading) {
    return html`<div class="pagination shimmer"></div>`;
  }

  return html`<div class="pagination">
    <div>
      <label for="select-pagesize">Show:</label>
      <select id="select-pagesize" name="pageSize" value=${props.currentPageSize} onChange=${(e) => props.onPageSizeChange?.(parseInt(e.target.value, 10))}>
        ${props.pageSizeOptions.map((size) => html`<option value=${size}>${size} Items</option>`)}
      </select>
    </div>
    <div>
      <label for="select-page">Page:</label>
      <select id="select-page" name="page" value=${props.currentPage} onChange=${(e) => props.onPageChange?.(parseInt(e.target.value, 10))}>
        ${Array(props.pages).fill(0).map((_, i) => html`<option value=${i + 1}>${i + 1}</option>`)}
      </select>
      <span>of ${props.pages}</span>
    </div>
    <div>
      ${props.currentPage > 1 ? html`<button class="previous" onClick=${() => props.onPageChange?.(props.currentPage - 1)}>Previous</button>` : ''}
      ${props.currentPage < props.pages ? html`<button class="next" onClick=${() => props.onPageChange?.(props.currentPage + 1)}>Next</button>` : ''}
    </div>
  </div>`;
}

function Sort(props) {
  const {
    type, disabled, sortMenuRef, onSort,
  } = props;
  const options = [
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Product Name', value: 'name-asc' },
    { label: 'Relevance', value: type === 'category' ? 'position-asc' : 'relevance-desc' },
  ];

  const currentSort = options.find((option) => option.value === `${props.currentSort}-${props.sortDirection}`) || options[3];

  return html`<div class="sort" disabled=${disabled}>
    <button disabled=${disabled}>Sort By: ${currentSort.label}</button>
    <div class="overlay" ref=${sortMenuRef}>
      <button class="close" onClick=${() => sortMenuRef.current.classList.toggle('active')}>Close</button>
      <ul>
        ${options.map((option) => html`<li>
          <a href="#" class="${currentSort.value === option.value ? 'active' : ''}" onClick=${(e) => {
  sortMenuRef.current.classList.toggle('active');
  const [sort, direction = 'asc'] = option.value.split('-');
  onSort?.(sort, direction);
  e.preventDefault();
}}>${option.label}</a>
        </li>`)}
      </ul>
    </div>
  </div>`;
}

class ProductListPage extends Component {
  constructor(props) {
    const {
      type = 'category',
      category,
    } = props;
    super();

    this.facetMenuRef = createRef();
    this.sortMenuRef = createRef();

    const queryParams = parseQueryParams();

    let headline = 'Search Results';
    let sort = 'relevance';
    let sortDirection = 'desc';
    const defaultPageSize = 12;
    if (type === 'category') {
      // Get from H1
      headline = document.querySelector('.default-content-wrapper > h1')?.innerText;
      sort = 'position';
      sortDirection = 'asc';
    }

    if (type === 'search') {
      sampleRUM('search', { source: '.search-input', target: queryParams.searchTerm });
    }

    this.state = {
      loading: true,
      pages: 1,
      currentPage: 1,
      basePageSize: defaultPageSize,
      currentPageSize: defaultPageSize,
      type,
      category: {
        name: headline,
        id: category || null,
      },
      sort,
      sortDirection,
      products: {
        items: [],
        total: 0,
      },
      filters: {},
      facets: [],
      ...queryParams,
    };

    this.filterChange = false;
    this.paginationClick = false;
  }

  setStatePromise(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  static updateQueryParams = (params) => {
    const newParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (!ALLOWED_FILTER_PARAMETERS.includes(key)) {
        return;
      }

      if (Array.isArray(params[key]) && params[key].length > 0) {
        newParams.set(key, params[key].join(','));
      } else if (!Array.isArray(params[key]) && params[key]) {
        newParams.set(key, params[key]);
      }
    });

    // Keep existing params that do not interfere with the search
    const curentParams = new URLSearchParams(window.location.search);
    curentParams.forEach((value, key) => {
      if (!ALLOWED_FILTER_PARAMETERS.includes(key)) {
        newParams.set(key, value);
      }
    });

    window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`);
  };

  loadState = async (state) => {
    await this.setStatePromise({ ...state, loading: false });
    if (this.state && this.state.products) {
      this.filterChange = false;
      this.paginationClick = false;
    }
    this.props.resolve();

    if (this.props.type === 'search' && this.state.loading === false && this.state.products.total === 0) {
      sampleRUM('nullsearch', { source: '.search-input', target: this.state.searchTerm });
    }

    if (this.state.loading === false) {
      window.adobeDataLayer.push((dl) => {
        const searchResultsContext = dl.getState('searchResultsContext') ?? { units: [] };
        const searchRequestId = window.sessionStorage.getItem('searchRequestId');
        const searchUnitId = 'livesearch-plp';
        const searchResultUnit = {
          searchUnitId,
          searchRequestId,
          products: this.state.products.items.map((p, index) => ({
            name: p.name,
            sku: p.sku,
            url: new URL(`/products/${p.url_key}/${p.sku.toLowerCase()}`, window.location).toString(),
            imageUrl: p.images?.length ? p.images[0].url : '',
            price: p.price?.final?.amount?.value ?? p.priceRange?.minimum?.final?.amount?.value,
            rank: index,
          })),
          categories: [],
          suggestions: [],
          page: this.state.currentPage,
          perPage: this.state.currentPageSize,
          facets: this.state.facets,
        };
        const index = searchResultsContext.units.findIndex((u) => u.searchUnitId === searchUnitId);
        if (index < 0) {
          searchResultsContext.units.push(searchResultUnit);
        } else {
          searchResultsContext.units[index] = searchResultUnit;
        }
        dl.push({ searchResultsContext });
        // TODO: Remove eventInfo once collector is updated
        dl.push({ event: 'search-response-received', eventInfo: { ...dl.getState(), searchUnitId } });
        if (this.props.type === 'search') {
          // TODO: Remove eventInfo once collector is updated
          dl.push({ event: 'search-results-view', eventInfo: { ...dl.getState(), searchUnitId } });
        } else {
          dl.push({
            categoryContext: {
              name: this.state.category.name,
              urlKey: this.state.category.urlKey,
              urlPath: this.state.category.urlPath,
            },
          });
          // TODO: Remove eventInfo once collector is updated
          dl.push({ event: 'category-results-view', eventInfo: { ...dl.getState(), searchUnitId } });
        }
        dl.push({ event: 'page-view', eventInfo: { ...dl.getState() } });
      });
    }
  };

  loadProducts = async () => {
    this.setState({ loading: true });

    const state = await loadCategory(this.state);
    await this.loadState(state);
  };

  async componentDidMount() {
    if (window.loadCategoryPromise) {
      const state = await window.loadCategoryPromise;
      await this.loadState(state);
    } else {
      await this.loadProducts();
    }
  }

  componentDidUpdate(_, prevState) {
    // Update URL
    ProductListPage.updateQueryParams({
      page: this.state.currentPage,
      basePageSize: this.state.basePageSize,
      pageSize: this.state.currentPageSize,
      sort: this.state.sort,
      sortDirection: this.state.sortDirection,
      q: this.state.searchTerm,
      ...this.state.filters,
    });

    // Load new products if filters, pagination or sort have changed
    const diff = Object.keys(Object.keys(prevState).reduce((acc, key) => {
      if (prevState[key] !== this.state[key]) {
        acc[key] = this.state[key];
      }
      return acc;
    }, {}));

    const keysToCheck = ['filters', 'sort', 'sortDirection', 'searchTerm', 'currentPageSize', 'currentPage'];
    if (keysToCheck.some((key) => diff.includes(key))) {
      this.loadProducts();
    }
  }

  onPageChange(page) {
    this.setState({ currentPage: page });
    this.paginationClick = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleFilterChange(filters) {
    this.setState({ filters, currentPage: 1 });
    this.filterChange = true;
  }

  render(props, state) {
    const { type = 'category' } = props;

    return html`<${Fragment}>
    <${FacetList} 
      facets=${state.facets}
      filters=${state.filters}
      facetMenuRef=${this.facetMenuRef}
      onFilterChange=${this.handleFilterChange.bind(this)}
      loading=${state.loading} />
    <div class="products">
      <div class="title">
        <h1>${state.category.name}</h1>
        ${!state.loading && html`<span>(${state.products.total} ${state.products.total === 1 ? 'Product' : 'Products'})</span>`}
        <${Sort}
          disabled=${state.loading}
          currentSort=${state.sort}
          sortDirection=${state.sortDirection}
          type=${type}
          onSort=${(sort, direction) => this.setState({ sort, sortDirection: direction })}
          sortMenuRef=${this.sortMenuRef} />
      </div>
      <div class="mobile-menu">
        <button disabled=${state.loading} id="toggle-filters" onClick=${() => this.facetMenuRef.current.classList.toggle('active')}>Filters</button>
        <button disabled=${state.loading} id="toggle-sortby" onClick=${() => this.sortMenuRef.current.classList.toggle('active')}>Sort By</button>
      </div>
      <${ProductList} products=${state.products} disruptors=${state.disruptors} loading=${state.loading} currentPageSize=${state.currentPageSize} />
      <${Pagination}
        pages=${state.pages}
        currentPage=${state.currentPage}
        pageSizeOptions=${[state.basePageSize, 24, 36]}
        currentPageSize=${state.currentPageSize}
        loading=${state.loading}
        onPageChange=${this.onPageChange.bind(this)}
        onPageSizeChange=${(pageSize) => this.setState({ currentPageSize: pageSize, currentPage: 1 })} />
    </div>
  </>`;
  }
}

export default async function decorate(block) {
  const config = readBlockConfig(block);

  block.textContent = '';
  block.dataset.category = config.category;

  return new Promise((resolve) => {
    const app = html`<${ProductListPage} ...${config} block=${block} resolve=${resolve} />`;
    render(app, block);
  });
}
