import React from 'react';
import * as ReactDOM from 'react-dom';

import Picker from './picker.js';
import customerSegmentsQuery from './queries/segments.graphql.js';

import './styles.css';

/**
 * Object containing all configuration files that should be exposed in the picker.
 */
const configFiles = {
  'prod': 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live/configs.json?sheet=prod',
  'stage': 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live/configs-stage.json',
  'dev': 'https://main--aem-boilerplate-commerce--hlxsites.hlx.live/configs-dev.json',
}
/**
 * Default configuration to be loaded.
 */
const defaultConfig = 'stage';

async function executeCustomerSegmentsQuery(query, config, variables = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config['commerce.headers.cs.x-api-key'],
    'Magento-Customer-Group': config['commerce.headers.cs.Magento-Customer-Group'],
    'Magento-Environment-Id': config['commerce.headers.cs.Magento-Environment-Id'],
    'Magento-Store-Code': config['commerce.headers.cs.Magento-Store-Code'],
    'Magento-Store-View-Code': config['commerce.headers.cs.Magento-Store-View-Code'],
    'Magento-Website-Code': config['commerce.headers.cs.Magento-Website-Code'],
  };

  const apiCall = new URL(config['commerce-core-endpoint']);
  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ')
    .replace(/\s\s+/g, ' '));
  apiCall.searchParams.append('variables', variables ? JSON.stringify(variables) : null);

  const response = await fetch(apiCall, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    return null;
  }

  const queryResponse = await response.json();
  return queryResponse.data;
}

const getCustomerSegments = async (config) => {
  let customerSegments = [];
  try {
    const segments = await executeCustomerSegmentsQuery(customerSegmentsQuery, config);
    segments?.allCustomerSegments?.forEach(segment => {
      customerSegments.push({
        'key': segment.name,
        'name': segment.name,
        'apply_to': segment.apply_to,
      });
    });
  } catch (err) {
    console.error('Could not retrieve customer segments', err);
  }
  return customerSegments;
}

const personalisationCategories = [
  {
    'key': 'segments',
    'title': 'Customer Segments',
    'initializer': getCustomerSegments,
  },
  // {
  //   'key': 'groups',
  //   'title': 'Customer Groups',
  //   'initializer': null,
  // },
  // {
  //   'key': 'cartRules',
  //   'title': 'Cart Rules',
  //   'initializer': null,
  // },
  // {
  //   'key': 'catalogRules',
  //   'title': 'Catalog Rules',
  //   'initializer': null,
  // },
  // {
  //   'key': 'utmParams',
  //   'title': 'UTM URL Parameters',
  //   'initializer': null,
  // },
];


const app = document.getElementById("app");
if (app) {
  ReactDOM.render(<Picker
    personalisationCategories={personalisationCategories}
    configFiles={configFiles}
    defaultConfig={defaultConfig}/>, app);
}
