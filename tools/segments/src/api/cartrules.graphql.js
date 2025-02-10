/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql';
import queryCache from './query.cache';

const query = `
  query {
    allCartRules {
      name
    }
  }
`;

const getCartRules = async (environment) => {
  if (!queryCache.cartRules.length > 0) {
    try {
      const rules = await executeGraphQlQuery(query, environment);
      rules?.allCartRules?.forEach(rule => {
        queryCache.cartRules.push({
          'name': rule.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve cart rules', err);
    }
  }
  return queryCache.cartRules;
}

export default getCartRules;
