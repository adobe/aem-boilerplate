# PDP Metadata Generator

## Overview
It is recommended to import product metadata into Edge Delivery so that it can be rendered server-side on product detail pages.
This is important so Google Merchant Center can reliably verify entries from your product sheet.
Also social media sites which usually do not parse JavaScript can leverage this metadata to display rich previews of your product page links.

This project is designed to fetch product data from catalog service, process it, and generate a metadata spreadsheet in XLSX format which can be used for the https://www.aem.live/docs/bulk-metadata feature in Edge Delivery. 

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

This will fetch the product data, process it, and generate a file named `metadata.xlsx` in the project directory.
