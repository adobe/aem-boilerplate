// Product Discovery Dropins
import SearchResults from '@dropins/storefront-product-discovery/containers/SearchResults.js';
import Facets from '@dropins/storefront-product-discovery/containers/Facets.js';
import SortBy from '@dropins/storefront-product-discovery/containers/SortBy.js';
import Pagination from '@dropins/storefront-product-discovery/containers/Pagination.js';
import { render as provider } from '@dropins/storefront-product-discovery/render.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
import { search } from '@dropins/storefront-product-discovery/api.js';
// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
// Event Bus
import { events } from '@dropins/tools/event-bus.js';
// AEM
import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, getProductLink } from '../../scripts/commerce.js';
import { getSearchStateFromUrl, applySearchStateToUrl } from './search-url.js';
// Numeric Range Slider
import { createNumericRangeSlider } from './numeric-range-slider.js';

// Initializers
import '../../scripts/initializers/search.js';
import '../../scripts/initializers/wishlist.js';

// filterMode 'exclude': product range must CONTAIN slider range
// filterMode 'include': product range must FIT WITHIN slider range
const NUMERIC_RANGE_FACETS = [
  {
    minAttribute: 'temperature_min',
    maxAttribute: 'temperature_max',
    label: 'Temperature (Exclude)',
    unit: '°C',
    filterMode: 'exclude',
  },
  {
    minAttribute: 'turbidity_min',
    maxAttribute: 'turbidity_max',
    label: 'Turbidity (Include)',
    unit: ' NTU',
    filterMode: 'include',
  },
];

const NUMERIC_RANGE_ALL_ATTRS = new Set(
  NUMERIC_RANGE_FACETS.flatMap((c) => [c.minAttribute, c.maxAttribute]),
);
const NUMERIC_RANGE_BY_MIN = Object.fromEntries(
  NUMERIC_RANGE_FACETS.map((c) => [c.minAttribute, c]),
);
const NUMERIC_RANGE_BY_MAX = Object.fromEntries(
  NUMERIC_RANGE_FACETS.map((c) => [c.maxAttribute, c]),
);

function getStatsBounds(facet) {
  const stats = facet.buckets.find((b) => b.__typename === 'StatsBucket');
  if (stats && stats.min != null && stats.max != null) {
    return { min: stats.min, max: stats.max };
  }
  return null;
}

// Live Search `to` is exclusive (<), so add epsilon to include boundary values
const RANGE_EPSILON = 0.01;

function getNumericRangeFilters(config, sliderMin, sliderMax) {
  if (config.filterMode === 'exclude') {
    return [
      { attribute: config.minAttribute, range: { to: sliderMin + RANGE_EPSILON } },
      { attribute: config.maxAttribute, range: { from: sliderMax } },
    ];
  }
  return [
    { attribute: config.minAttribute, range: { from: sliderMin } },
    { attribute: config.maxAttribute, range: { to: sliderMax + RANGE_EPSILON } },
  ];
}

export default async function decorate(block) {
  const labels = await fetchPlaceholders();

  const config = readBlockConfig(block);
  const pageSize = parseInt(config.pagesize, 10) || 9;

  const fragment = document.createRange().createContextualFragment(`
    <div class="search__wrapper">
      <div class="search__result-info"></div>
      <div class="search__view-facets"></div>
      <div class="search__facets"></div>
      <div class="search__product-sort"></div>
      <div class="search__product-list"></div>
      <div class="search__pagination"></div>
    </div>
  `);

  const $resultInfo = fragment.querySelector('.search__result-info');
  const $viewFacets = fragment.querySelector('.search__view-facets');
  const $facets = fragment.querySelector('.search__facets');
  const $productSort = fragment.querySelector('.search__product-sort');
  const $productList = fragment.querySelector('.search__product-list');
  const $pagination = fragment.querySelector('.search__pagination');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Add url path back to the block for enrichment, incase enrichment block is
  // executed after the plp block and block config is not available
  if (config.urlpath) {
    block.dataset.urlpath = config.urlpath;
  }

  const searchState = getSearchStateFromUrl(new URL(window.location.href));

  const visibilityFilter = { attribute: 'visibility', in: ['Search', 'Catalog, Search'] };
  const userFilters = searchState.filter.filter(
    (f) => f.attribute !== 'visibility' && !NUMERIC_RANGE_ALL_ATTRS.has(f.attribute),
  );

  const normalizedUrl = new URL(window.location.href);
  applySearchStateToUrl(normalizedUrl, searchState);
  window.history.replaceState({}, '', normalizedUrl.toString());

  const sliderSelections = {};
  const sliderElements = {};
  const collectedBounds = {};
  let lastSearchRequest = null;

  const urlSliders = searchState.slider;
  NUMERIC_RANGE_FACETS.forEach((cfg) => {
    const urlState = urlSliders.get(cfg.label.toLowerCase());
    if (urlState) {
      sliderSelections[cfg.minAttribute] = { min: urlState.min, max: urlState.max };
    }
  });

  function reissueSearch() {
    if (!lastSearchRequest) return;

    const baseFilters = (lastSearchRequest.filter || []).filter(
      (f) => !NUMERIC_RANGE_ALL_ATTRS.has(f.attribute),
    );

    const rangeFilters = [];
    NUMERIC_RANGE_FACETS.forEach((c) => {
      const slider = sliderElements[c.minAttribute];
      const sel = sliderSelections[c.minAttribute];
      if (slider?.isEnabled() && sel) {
        rangeFilters.push(...getNumericRangeFilters(c, sel.min, sel.max));
      }
    });

    search({
      ...lastSearchRequest,
      filter: [...baseFilters, ...rangeFilters],
      currentPage: 1,
    }).catch((e) => {
      console.error('Error searching with numeric range filters', e);
    });
  }

  function onSliderChange(cfg, newMin, newMax) {
    sliderSelections[cfg.minAttribute] = { min: newMin, max: newMax };
    updateSliderPills();
    reissueSearch();
  }

  function onSliderReset(cfg) {
    delete sliderSelections[cfg.minAttribute];
    sliderElements[cfg.minAttribute]?.reset();
    updateSliderPills();
    reissueSearch();
  }

  // --- Slider pills in Selected Facets ---
  const sliderPillsContainer = document.createElement('div');
  sliderPillsContainer.className = 'search__slider-pills';
  let dropinHasSelections = false;

  function resetAllSliders() {
    NUMERIC_RANGE_FACETS.forEach((cfg) => {
      if (sliderElements[cfg.minAttribute]?.isEnabled()) {
        onSliderReset(cfg);
      }
    });
  }

  function updateSliderPills() {
    sliderPillsContainer.innerHTML = '';
    let hasActiveSliders = false;
    NUMERIC_RANGE_FACETS.forEach((cfg) => {
      const slider = sliderElements[cfg.minAttribute];
      const sel = sliderSelections[cfg.minAttribute];
      if (slider?.isEnabled() && sel) {
        hasActiveSliders = true;
        const pill = document.createElement('div');
        pill.className = 'search__slider-pill';
        UI.render(Button, {
          variant: 'secondary',
          children: `${sel.min}${cfg.unit} ~ ${sel.max}${cfg.unit}`,
          icon: Icon({ source: 'Close', size: '16' }),
          onClick: () => onSliderReset(cfg),
        })(pill);
        sliderPillsContainer.appendChild(pill);
      }
    });

    if (hasActiveSliders && !dropinHasSelections) {
      const clearAll = document.createElement('div');
      clearAll.className = 'search__slider-pill';
      UI.render(Button, {
        variant: 'secondary',
        children: 'Clear All',
        onClick: () => resetAllSliders(),
      })(clearAll);
      sliderPillsContainer.appendChild(clearAll);
    }
  }

  function getSliderUrlMap() {
    const map = new Map();
    NUMERIC_RANGE_FACETS.forEach((cfg) => {
      const slider = sliderElements[cfg.minAttribute];
      const sel = sliderSelections[cfg.minAttribute];
      if (slider?.isEnabled() && sel) {
        map.set(cfg.label.toLowerCase(), { min: sel.min, max: sel.max });
      }
    });
    return map;
  }

  // Request search based on the page type on block load
  if (config.urlpath) {
    // If it's a category page...
    await search({
      phrase: '', // search all products in the category
      currentPage: searchState.currentPage,
      pageSize,
      sort: searchState?.sort?.length
        ? searchState.sort
        : [{ attribute: 'position', direction: 'DESC' }],
      filter: [
        { attribute: 'categoryPath', eq: config.urlpath }, // Add category filter
        // Always add visibility filter to the request
        visibilityFilter,
        ...userFilters,
      ],
    }).catch(() => {
      console.error('Error searching for products');
    });
  } else {
    // Search page: dropin uses only the request (no URL parsing).
    await search({
      phrase: searchState.phrase,
      currentPage: searchState.currentPage,
      pageSize,
      sort: searchState.sort,
      // Always add visibility filter to the request
      filter: [visibilityFilter, ...userFilters],
    }).catch((e) => {
      console.error('Error searching for products', e);
    });
  }

  const getAddToCartButton = (product) => {
    if (product.typename === 'ComplexProductView') {
      const button = document.createElement('div');
      UI.render(Button, {
        children: labels.Global?.AddProductToCart,
        icon: Icon({ source: 'Cart' }),
        href: getProductLink(product.urlKey, product.sku),
        variant: 'primary',
      })(button);
      return button;
    }
    const button = document.createElement('div');
    UI.render(Button, {
      children: labels.Global?.AddProductToCart,
      icon: Icon({ source: 'Cart' }),
      onClick: () => cartApi.addProductsToCart([{ sku: product.sku, quantity: 1 }]),
      variant: 'primary',
    })(button);
    return button;
  };

  await Promise.all([
    // Sort By
    provider.render(SortBy, {})($productSort),

    // Pagination
    provider.render(Pagination, {
      onPageChange: () => {
        // scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    })($pagination),

    // View Facets Button
    UI.render(Button, {
      children: labels.Global?.Filters,
      icon: Icon({ source: 'Burger' }),
      variant: 'secondary',
      onClick: () => {
        $facets.classList.toggle('search__facets--visible');
      },
    })($viewFacets),

    // Facets — use Facet slot to override numeric range facets with slider
    provider.render(Facets, {
      slots: {
        SelectedFacets: (ctx) => {
          ctx.appendChild(sliderPillsContainer);
          let hadSelections = false;
          ctx.onRender((next) => {
            const hasSelections = next.data && next.data.length > 0;
            dropinHasSelections = hasSelections;
            // When dropin's selected facets go from some to none, reset sliders too
            if (hadSelections && !hasSelections) {
              resetAllSliders();
            }
            hadSelections = hasSelections;
            updateSliderPills();
          });
        },
        Facet: (ctx) => {
          const facet = ctx.data;
          const stats = getStatsBounds(facet);

          const maxCfg = NUMERIC_RANGE_BY_MAX[facet.attribute];
          if (maxCfg) {
            if (stats) {
              if (!collectedBounds[maxCfg.minAttribute]) collectedBounds[maxCfg.minAttribute] = {};
              collectedBounds[maxCfg.minAttribute].max = stats.max;
              collectedBounds[maxCfg.minAttribute].rightMin = stats.min;
              const slider = sliderElements[maxCfg.minAttribute];
              const bounds = collectedBounds[maxCfg.minAttribute];
              if (slider && bounds.min != null) {
                const b = bounds;
                const clamped = slider.updateBounds(b.min, stats.max, b.leftMax, stats.min);
                if (slider.isEnabled() && sliderSelections[maxCfg.minAttribute]) {
                  const prev = sliderSelections[maxCfg.minAttribute];
                  sliderSelections[maxCfg.minAttribute] = clamped;
                  if (prev.min !== clamped.min || prev.max !== clamped.max) {
                    reissueSearch();
                  }
                }
              }
            }
            ctx.replaceWith(document.createElement('div'));
            return;
          }

          const minCfg = NUMERIC_RANGE_BY_MIN[facet.attribute];
          if (minCfg) {
            // Keep existing slider visible even when stats are empty (0 results)
            if (!stats) {
              const existing = sliderElements[minCfg.minAttribute];
              if (existing) ctx.replaceWith(existing);
              return;
            }

            if (!collectedBounds[minCfg.minAttribute]) collectedBounds[minCfg.minAttribute] = {};
            collectedBounds[minCfg.minAttribute].min = stats.min;
            collectedBounds[minCfg.minAttribute].leftMax = stats.max;

            const sliderMax = collectedBounds[minCfg.minAttribute].max ?? stats.max;
            const { rightMin } = collectedBounds[minCfg.minAttribute];

            const existing = sliderElements[minCfg.minAttribute];
            if (existing) {
              const clamped = existing.updateBounds(stats.min, sliderMax, stats.max, rightMin);
              if (existing.isEnabled() && sliderSelections[minCfg.minAttribute]) {
                const prev = sliderSelections[minCfg.minAttribute];
                sliderSelections[minCfg.minAttribute] = clamped;
                if (prev.min !== clamped.min || prev.max !== clamped.max) {
                  reissueSearch();
                }
              }
              ctx.replaceWith(existing);
              return;
            }

            const slider = createNumericRangeSlider({
              label: minCfg.label,
              min: stats.min,
              max: sliderMax,
              leftMax: stats.max,
              rightMin,
              unit: minCfg.unit,
              onChange: (newMin, newMax) => onSliderChange(minCfg, newMin, newMax),
            });

            sliderElements[minCfg.minAttribute] = slider;

            const urlSel = sliderSelections[minCfg.minAttribute];
            if (urlSel) {
              slider.setEnabled(true);
              sliderSelections[minCfg.minAttribute] = slider.setValues(urlSel.min, urlSel.max);
              updateSliderPills();
              reissueSearch();
            }

            ctx.replaceWith(slider);
          }
        },
      },
    })($facets),

    // Product List
    provider.render(SearchResults, {
      routeProduct: (product) => getProductLink(product.urlKey, product.sku),
      slots: {
        ProductImage: (ctx) => {
          const { product, defaultImageProps } = ctx;
          const anchorWrapper = document.createElement('a');
          anchorWrapper.href = getProductLink(product.urlKey, product.sku);

          tryRenderAemAssetsImage(ctx, {
            alias: product.sku,
            imageProps: defaultImageProps,
            wrapper: anchorWrapper,
            params: {
              width: defaultImageProps.width,
              height: defaultImageProps.height,
            },
          });
        },
        ProductActions: (ctx) => {
          const actionsWrapper = document.createElement('div');
          actionsWrapper.className = 'product-discovery-product-actions';
          // Add to Cart Button
          const addToCartBtn = getAddToCartButton(ctx.product);
          addToCartBtn.className = 'product-discovery-product-actions__add-to-cart';
          // Wishlist Button
          const $wishlistToggle = document.createElement('div');
          $wishlistToggle.classList.add('product-discovery-product-actions__wishlist-toggle');
          wishlistRender.render(WishlistToggle, {
            product: ctx.product,
            variant: 'tertiary',
          })($wishlistToggle);
          actionsWrapper.appendChild(addToCartBtn);
          actionsWrapper.appendChild($wishlistToggle);
          ctx.replaceWith(actionsWrapper);
        },
      },
    })($productList),
  ]);

  events.on('search/result', (payload) => {
    const totalCount = payload.result?.totalCount || 0;

    block.classList.toggle('product-list-page--empty', totalCount === 0);

    $resultInfo.innerHTML = payload.request?.phrase
      ? `${totalCount} results found for <strong>"${payload.request.phrase}"</strong>.`
      : `${totalCount} results found.`;

    if (payload.request.filter.length > 0) {
      $viewFacets.querySelector('button').setAttribute('data-count', payload.request.filter.length);
    } else {
      $viewFacets.querySelector('button').removeAttribute('data-count');
    }

    lastSearchRequest = payload.request;
    updateSliderPills();

    // Re-apply slider filters stripped by the Facets dropin
    const requestAttrs = new Set((payload.request.filter || []).map((f) => f.attribute));
    const slidersNeedReapply = NUMERIC_RANGE_FACETS.some((c) => {
      const slider = sliderElements[c.minAttribute];
      return slider?.isEnabled() && sliderSelections[c.minAttribute]
        && !requestAttrs.has(c.minAttribute);
    });
    if (slidersNeedReapply) {
      reissueSearch();
    }
  }, { eager: true });

  events.on('search/result', (payload) => {
    const url = new URL(window.location.href);
    const urlFilters = (payload.request.filter || []).filter(
      (f) => !NUMERIC_RANGE_ALL_ATTRS.has(f.attribute),
    );
    applySearchStateToUrl(url, {
      ...payload.request, filter: urlFilters, slider: getSliderUrlMap(),
    });
    window.history.pushState({}, '', url.toString());
  }, { eager: false });
}
