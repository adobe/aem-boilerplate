/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */
import React from 'react';
import * as ReactDOM from 'react-dom';

import Picker from './picker';
import getCustomerSegments from './api/segments.graphql';
import getCatalogRules from './api/catalogrules.graphql';
import getCartRules from './api/cartrules.graphql';
import getCustomerGroups from "./api/customergroups.graphql";

import './styles.css';

const personalisationCategories = [
  {
    'key': 'segments',
    'title': 'Customer Segments',
    'initializer': getCustomerSegments,
  },
  {
    'key': 'groups',
    'title': 'Customer Groups',
    'initializer': getCustomerGroups,
  },
  {
    'key': 'cartRules',
    'title': 'Cart Rules',
    'initializer': getCartRules,
  },
  {
    'key': 'catalogRules',
    'title': 'Catalog Rules',
    'initializer': getCatalogRules,
  },
];

const app = document.getElementById("app");
if (app) {
  ReactDOM.render(
    <Picker
      environments={['prod', 'stage', 'dev']}
      defaultEnvironment='stage'
      personalisationCategories={personalisationCategories}
    />, app);
}
