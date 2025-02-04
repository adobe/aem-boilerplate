/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import { getConfigValue } from '../../../../scripts/configs';
import { fetchGraphQl, setEndpoint } from '@dropins/tools/fetch-graphql.js';

async function executeGraphQlQuery(query, environment) {
  try {
    setEndpoint(new URL(await getConfigValue('commerce-core-endpoint', environment)).href);
    const response = await fetchGraphQl(query, {
      method: 'GET'
    });

    return response.data ? response.data : [];
  } catch (err) {
    console.error('Could not execute GraphQl query to ', environment);
  }
}

export default executeGraphQlQuery;
