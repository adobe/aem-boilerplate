/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql';
import queryCache from './query.cache';

const query = `
  query {
    allCustomerGroups {
      name
    }
  }
`;

const getCustomerGroups = async (environment) => {
  if (!queryCache.customerGroups.length > 0) {
    try {
      const groups = await executeGraphQlQuery(query, environment);
      groups?.allCustomerGroups?.forEach(group => {
        queryCache.customerGroups.push({
          'name': group.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer groups', err);
    }
  }
  return queryCache.customerGroups;
}

export default getCustomerGroups;
