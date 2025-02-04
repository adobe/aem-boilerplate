/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql';
import queryCache from './query.cache';

const query = `
  query {
    allCatalogRules {
      name
    }
  }
`;

const getCatalogRules = async (environment) => {
  if (!queryCache.catalogRules.length > 0) {
    try {
      const rules = await executeGraphQlQuery(query, environment);
      rules?.allCatalogRules?.forEach(rule => {
        queryCache.catalogRules.push({
          'name': rule.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve catalog rules', err);
    }
  }
  return queryCache.catalogRules;
}

export default getCatalogRules;
