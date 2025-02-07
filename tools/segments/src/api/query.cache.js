/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */

/**
 * To avoid executing requests every time the Personalisation category is selected,
 * the result is cached.
 *
 * In order to clear the cache (eg. when new rule or segment was added to the backend), there is
 * 'Refresh' button added to the plugin.
 * Also, cache is cleared every time when the environment
 * is changed as data comes from different endpoint.
 */
const queryCache = {
  catalogRules: [],
  cartRules: [],
  customerSegments: [],
  customerGroups: [],
}

export default queryCache;
