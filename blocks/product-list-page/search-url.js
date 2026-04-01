function parseSort(sortParam) {
  if (!sortParam) return [];
  return sortParam.split(',').map((item) => {
    const [attribute, direction] = item.split('_');
    return { attribute, direction };
  });
}

function parseFilter(filterParam) {
  if (!filterParam) return [];

  const decodedParam = decodeURIComponent(filterParam);
  const rawFilters = decodedParam.split('|');
  const results = [];

  rawFilters.forEach((segment) => {
    const colonIdx = segment.indexOf(':');
    if (colonIdx === -1) return;
    const attribute = segment.slice(0, colonIdx).trim();
    const value = segment.slice(colonIdx + 1).trim();
    if (!attribute || !value) return;

    if (value.includes('~')) {
      const [fromStr, toStr] = value.split('~');
      const fromNum = fromStr ? Number(fromStr) : undefined;
      const toNum = toStr ? Number(toStr) : undefined;
      const hasFrom = fromNum !== undefined && Number.isFinite(fromNum);
      const hasTo = toNum !== undefined && Number.isFinite(toNum);
      if (hasFrom || hasTo) {
        const range = {};
        if (hasFrom) range.from = fromNum;
        if (hasTo) range.to = toNum;
        results.push({ attribute, range });
        return;
      }
    }

    const commaRegex = /,(?!\s)/;
    const values = commaRegex.test(value)
      ? value.split(commaRegex).map((s) => s.trim()).filter(Boolean)
      : [value];

    const existing = results.find((r) => r.attribute === attribute && r.in);
    if (existing && existing.in) {
      existing.in.push(...values);
    } else {
      results.push({ attribute, in: values });
    }
  });

  return results;
}

function serializeSort(sort) {
  return sort.map((item) => `${item.attribute}_${item.direction}`).join(',');
}

function serializeFilter(filter) {
  if (!filter || filter.length === 0) return '';

  return filter.map(({ attribute, in: inValues, range }) => {
    if (inValues) {
      return inValues.map((v) => `${attribute}:${v}`).join('|');
    }
    if (range) {
      const from = range.from != null ? range.from : '';
      const to = range.to != null ? range.to : '';
      return `${attribute}:${from}~${to}`;
    }
    return null;
  }).filter(Boolean).join('|');
}

// Format: "temperature:0~80|turbidity:25~75"
function parseSlider(sliderParam) {
  const map = new Map();
  if (!sliderParam) return map;
  sliderParam.split('|').forEach((segment) => {
    const colonIdx = segment.indexOf(':');
    if (colonIdx === -1) return;
    const label = segment.slice(0, colonIdx).trim();
    const value = segment.slice(colonIdx + 1).trim();
    if (!label || !value.includes('~')) return;
    const [minStr, maxStr] = value.split('~');
    const min = Number(minStr);
    const max = Number(maxStr);
    if (Number.isFinite(min) && Number.isFinite(max)) {
      map.set(label, { min, max });
    }
  });
  return map;
}

function serializeSlider(sliderMap) {
  if (!sliderMap || sliderMap.size === 0) return '';
  return [...sliderMap.entries()]
    .map(([label, { min, max }]) => `${label}:${min}~${max}`)
    .join('|');
}

export function getSearchStateFromUrl(url) {
  const q = url.searchParams.get('q') ?? '';
  const page = url.searchParams.get('page');
  const sort = url.searchParams.get('sort');
  const filter = url.searchParams.get('filter');
  const slider = url.searchParams.get('slider');

  return {
    phrase: q,
    currentPage: page ? Number(page) : 1,
    sort: parseSort(sort),
    filter: parseFilter(filter),
    slider: parseSlider(slider),
  };
}

export function applySearchStateToUrl(url, request) {
  if (request?.phrase) {
    url.searchParams.set('q', request.phrase);
  }
  if (request?.currentPage) {
    url.searchParams.set('page', String(request.currentPage));
  }
  if (request?.sort != null) {
    url.searchParams.set('sort', serializeSort(request.sort));
  }
  if (request?.filter != null) {
    const urlFilters = request.filter.filter((f) => f.attribute !== 'visibility');
    url.searchParams.set('filter', serializeFilter(urlFilters));
  }
  if (request?.slider != null) {
    const s = serializeSlider(request.slider);
    if (s) {
      url.searchParams.set('slider', s);
    } else {
      url.searchParams.delete('slider');
    }
  }
}
