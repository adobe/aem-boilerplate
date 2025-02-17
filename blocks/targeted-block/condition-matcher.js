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

  const activeSegments = activeRules.customerSegments?.map(
    (segment) => segment.name.trim(),
  );
  const activeGroup = activeRules.customerGroup?.name.trim();
  const activeCartRules = activeRules.cart?.map(
    (rule) => rule.name.trim(),
  );
  const activePriceRules = activeRules.catalogPriceRules?.rules?.map(
    (rule) => rule.name.trim(),
  );

  if (customerSegments !== undefined && !rulesMatched(activeSegments, customerSegments.split(','))) {
    return false;
  }

  if (customerGroups !== undefined && !groupMatched(activeGroup, customerGroups.split(','))) {
    return false;
  }

  if (cartRules !== undefined && !rulesMatched(activeCartRules, cartRules.split(','))) {
    return false;
  }

  if (catalogPriceRules !== undefined && !rulesMatched(activePriceRules, catalogPriceRules.split(','))) {
    return false;
  }

  return true;
}
