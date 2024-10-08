import React from 'react';
import * as ReactDOM from 'react-dom';

import Picker from './picker.js';
import getCategoriesInCategory from './queries/categories.graphql.js';
import getProductsInCategory from './queries/products.graphql.js';

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
const defaultConfig = 'prod';

/**
 * List of blocks to be available in the picker.
 * 
 * Format: Object with key -> block mapping. Each block is defined by the following properties:
 *   key: Unique key, must be same as the key in the object
 *   name: Displayed name of the block
 *   output: Function that receives the selected product(s) and/or category(ies) and returns the HTML to be copied into the clipboard
 *   selection: Define if single or multi selection: single or multiple
 *   type: Define what can be selected: any, item or folder
 */
const blocks = {
    'identifier': {
        'key': 'identifier',
        'name': 'Identifier only',
        'output': i => i.isFolder ? i.id : i.sku,
        'selection': 'single',
        'type': 'any',
    },
    'product-list-page': {
        'key': 'product-list-page',
        'name': 'Product List Page',
        'output': i => `<table width="100%" style="border: 1px solid black;">
            <tr>
                <th colspan="2" style="border: 1px solid black; background: lightgray;">Product List Page</th>
            </tr>
            <tr>
                <td style="border: 1px solid black">category</td>
                <td style="border: 1px solid black">${i.id}</td>
            </tr>
        </table>`,
        'selection': 'single',
        'type': 'folder',
    },
    'product-teaser': {
        'key': 'product-teaser',
        'name': 'Product Teaser',
        'output': i => `<table width="100%" style="border: 1px solid black;">
            <tr>
                <th colspan="2" style="border: 1px solid black; background: lightgray;">Product Teaser</th>
            </tr>
            <tr>
                <td style="border: 1px solid black">SKU</td>
                <td style="border: 1px solid black">${i.sku}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black">Details Button</td>
                <td style="border: 1px solid black">true</td>
            </tr>
            <tr>
                <td style="border: 1px solid black">Cart Button</td>
                <td style="border: 1px solid black">true</td>
            </tr>
        </table>`,
        'selection': 'single',
        'type': 'item',
    },
    'product-carousel': {
        'key': 'product-carousel',
        'name': 'Product Carousel',
        'output': items => `<table width="100%" style="border: 1px solid black;">
            <tr>
                <th style="border: 1px solid black; background: lightgray;">Product Carousel</th>
            </tr>
            <tr>
                <td style="border: 1px solid black">
                    <ul>
                        ${items.map(i => `<li>${i.sku}</li>`).join('')}
                    </ul>
                </td>
            </tr>
        </table>`,
        'selection': 'multiple',
        'type': 'item',
    },
    'category-carousel': {
        'key': 'category-carousel',
        'name': 'Category Carousel',
        'output': items => `<table width="100%" style="border: 1px solid black;">
            <tr>
                <th style="border: 1px solid black; background: lightgray;">Category Carousel</th>
            </tr>
            <tr>
                <td style="border: 1px solid black">
                    <ul>
                        ${items.map(i => `<li>${i.id}</li>`).join('')}
                    </ul>
                </td>
            </tr>
        </table>`,
        'selection': 'multiple',
        'type': 'folder',
    },
};

async function performCatalogServiceQuery(query, config, variables) {
    const headers = {
        'Magento-Environment-Id': config['commerce-environment-id'],
        'Magento-Store-View-Code': config['commerce-store-view-code'],
        'Magento-Website-Code': config['commerce-website-code'],
        'x-api-key': config['commerce-x-api-key'],
        'Magento-Store-Code': config['commerce-store-code'],
        'Magento-Customer-Group': config['commerce-customer-group'],
        'Content-Type': 'application/json',
    };

    const apiCall = new URL(config['commerce-endpoint']);
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

const getItems = async (folderKey, page = 1, config) => {
    let newItems = {};
    let pageInfo = {};
    try {
        const products = await performCatalogServiceQuery(getProductsInCategory, config, { id: folderKey, currentPage: page });
        products?.productSearch?.items.forEach(product => {
            const { productView } = product;

            try {
                productView.images.forEach(image => {
                    const url = new URL(image.url, window.location);
                    url.searchParams.set('width', 40);
                    image.url = url.toString();
                });
            } catch { }

            newItems[productView.sku] = {
                ...productView
            };
        });
        pageInfo = products?.productSearch?.page_info;
    } catch (err) {
        console.error('Could not retrieve products', err);
    }

    return [newItems, pageInfo];
};

const getCategories = async (folderKey, config) => {
    let categoryObject = {};

    try {
        const categories = await performCatalogServiceQuery(getCategoriesInCategory, config, { id: folderKey });
        categories?.categories.forEach(category => {
            categoryObject[category.id] = category;
        });
    } catch (err) {
        console.error('Could not retrieve categories', err);
    }

    return categoryObject;
}

const app = document.getElementById("app");
if (app) {
    ReactDOM.render(<Picker
        blocks={blocks}
        getCategories={getCategories}
        getItems={getItems}
        configFiles={configFiles}
        defaultConfig={defaultConfig} />, app);
}