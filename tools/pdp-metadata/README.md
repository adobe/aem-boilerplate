# PDP Metadata Generator

## Overview

It is recommended to import product metadata into Edge Delivery so that it can be rendered server-side on product detail pages.
This is important so Google Merchant Center can reliably verify entries from your product sheet.
Also social media sites which usually do not parse JavaScript can leverage this metadata to display rich previews of your product page links.

This project is designed to fetch product data from catalog service, process it, and generate both a metadata spreadsheet in XLSX format and a JSON file which can be used for the <https://www.aem.live/docs/bulk-metadata> feature in Edge Delivery.

## Prerequisites

- Node.js installed on your machine.
- Access to the catalog service with the necessary API keys and configuration.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Configuration

Before running the application, you need to ensure the `configFile` variable in `pdp-metadata.js` points to the correct configuration JSON file URL. This file contains the required parameters to access Catalog Service and should have been setup as part of your project onboarding.

## Running the Application

To start the application, run the following command in the terminal:

```bash
npm start
```

This will fetch the product data, process it, and generate two files in the project directory:

- `metadata.xlsx` - Excel spreadsheet with product metadata
- `metadata.json` - JSON file with the same data in a structured format

## Output Files

### metadata.xlsx

An Excel spreadsheet containing product metadata with columns for URL, title, description, keywords, SKU, Open Graph tags, and JSON-LD schema.

### metadata.json

A JSON file with the same product data structured in the expected format:

```json
{
  "data": {
    "total": 1,
    "limit": 1,
    "offset": 0,
    "data": [
      {
        "URL": "/products/{urlKey}/{sku}",
        "title": "Product Name",
        "description": "Product Description",
        "keywords": "...",
        "sku": "SKU123",
        "og:type": "product",
        "og:title": "Product Name",
        "og:description": "Product Description",
        "og:url": "https://www.aemshop.net/products/{urlKey}/{sku}",
        "og:image": "image_url",
        "og:image:secure_url": "image_url",
        "last-modified": "timestamp",
        "json-ld": "JSON-LD schema string"
      }
    ],
    ":colWidths": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
  },
  ":names": ["data"],
  ":version": 3,
  ":type": "multi-sheet"
}
```

## Uploading to DA.live

After generating the metadata files, you can manually upload the `metadata.json` file to <https://da.live> using the API, or you can drag and drop the file into your site's DA content folder.

### CURL Example

```bash
curl -X POST \
  'https://admin.da.live/source/{org}/{site}/metadata.json' \
  --header 'Authorization: Bearer <your-IMS-JWT>' \
  --form 'data=@metadata.json'
```
