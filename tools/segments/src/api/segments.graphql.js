/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import executeGraphQlQuery from './query.graphql';
import queryCache from './query.cache';

const query = `
  query {
    allCustomerSegments {
      name
    }
  }
`;

const getCustomerSegments = async (environment) => {
  if (!queryCache.customerSegments.length > 0) {
    try {
      const segments = await executeGraphQlQuery(query, environment);
      segments?.allCustomerSegments?.forEach(segment => {
        queryCache.customerSegments.push({
          'name': segment.name,
        });
      });
    } catch (err) {
      console.error('Could not retrieve customer segments', err);
    }
  }
  return queryCache.customerSegments;
}

export default getCustomerSegments;
