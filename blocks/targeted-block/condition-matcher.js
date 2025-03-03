function rulesMatched(activeRules, rules) {
  return activeRules && rules.some((rule) => activeRules.includes(rule.trim()));
}

const groupMatched = (activeGroup, groups) => groups.includes(activeGroup);

export default function conditionsMatched(activeRules, blockConfig) {
  const {
    'customer-segments': customerSegments,
    'customer-groups': customerGroups,
    'cart-rules': cartRules,
    'catalog-price-rules': catalogPriceRules,
  } = blockConfig;

  const currentUrlParams = new URLSearchParams(window.location.search);
  const utmParamsConfig = Object.keys(blockConfig).filter(
    (key) => (key.indexOf('utm-') === 0),
  ).reduce(
    (data, key) => {
      data[key.replace('-', '_')] = blockConfig[key];
      return data;
    },
    {},
  );

  const nonMatchingUtmParams = Object.keys(utmParamsConfig).filter(
    (key) => (currentUrlParams.get(key.replace('-', '_')) !== utmParamsConfig[key]),
  );

  if (nonMatchingUtmParams.length !== 0) {
    return false;
  }

  const activeSegments = activeRules.customerSegments?.map((segment) => segment.name.trim());
  if (customerSegments !== undefined && !rulesMatched(activeSegments, customerSegments.split(','))) {
    return false;
  }

  const activeGroup = activeRules.customerGroup?.trim();
  if (customerGroups !== undefined && !groupMatched(activeGroup, customerGroups.split(','))) {
    return false;
  }

  const activeCartRules = activeRules.cart?.map((rule) => rule.name.trim());
  if (cartRules !== undefined && !rulesMatched(activeCartRules, cartRules.split(','))) {
    return false;
  }

  const activePriceRules = activeRules.catalogPriceRules?.rules?.map((rule) => rule.name.trim());
  if (catalogPriceRules !== undefined && !rulesMatched(activePriceRules, catalogPriceRules.split(','))) {
    return false;
  }

  return true;
}
