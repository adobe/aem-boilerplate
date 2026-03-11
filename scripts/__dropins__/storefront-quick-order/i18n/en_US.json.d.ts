declare const _default: {
  "QuickOrder": {
    "Search": {
      "placeholder": "Search by SKU...",
      "ariaLabel": "Search for products by SKU",
      "emptyState": "No results found",
      "resultsAvailable": "results available",
      "resultAvailable": "result available",
      "srInstructions": "Use arrow keys or Tab to navigate, Enter or Space to select, Escape to close."
    },
    "SkuListInput": {
      "title": "Add Products by SKU",
      "helperText": "Use commas or paragraphs to separate SKUs.",
      "textArea": {
        "label": "Enter Multiple SKUs",
        "placeholder": "Enter SKUs here..."
      },
      "button": "Add to List"
    },
    "CsvFileInput": {
      "title": "Add from File",
      "helperText": "File must be in .csv format and include \"SKU\" and \"QTY\" columns ",
      "downloadSample": "Download sample",
      "inputLabel": "Choose File",
      "selectedFile": "Selected file",
      "uploadCSVErrors": {
        "invalidFile": "Invalid CSV file",
        "emptyFile": "File is empty",
        "missingColumns": "Must contain \"SKU\" and \"QTY\" columns",
        "extraColumns": "Must contain only \"SKU\" and \"QTY\" columns",
        "maxRowsExceeded": "File exceeds maximum of {maxRows} rows",
        "skuRequired": "Row {rowNumber}: SKU is required",
        "invalidQuantity": "Row {rowNumber}: QTY must be a positive integer",
        "noValidData": "File contains no valid data rows",
        "onlyCSV": "Only CSV files are allowed",
        "failedToRead": "Failed to read file",
        "failedToParse": "Failed to parse CSV file"
      }
    },
    "QuickOrderItem": {
      "title": "Enter SKU or search by Product Name",
      "quantity": "Quantity: ",
      "price": "Price: ",
      "sku": "SKU",
      "remove": "Remove",
      "removeItem": "Remove item",
      "showOptions": "Show additional options",
      "hideOptions": "Hide additional options",
      "additionalOptions": "Additional options",
      "noAdditionalOptions": "No additional options available",
      "emptyList": "No products in the list",
      "loading": "Loading...",
      "productNotFound": "Product not found",
      "productNotFoundDescription": "The product with SKU {sku} could not be found",
      "configurableProductError": "Configuration required",
      "configurableProductErrorDescription": "Use ProductOptions Slot in QuickOrderItems container to enable configurable product options.",
      "configurableOptionsWarning": "Product configuration required",
      "configurableOptionsWarningDescription": "Please select all required product options before adding to cart",
      "productOptions": "Product Options",
      "outOfStock": "Out of Stock",
      "addAllToCart": "Add to Cart",
      "disabledMessage": "Quick Order feature disabled",
      "notification": {
        "validationError": "Product(s) require(s) your attention",
        "backendError": "An error occurred while adding products to the cart",
        "success": "{count} product(s) successfully added to the cart",
        "partialSuccess": "{count} of {total} products were added to the cart. Some products could not be added",
        "unexpectedError": "An unexpected error has occurred"
      }
    },
    "VariantsGrid": {
      "imageColumn": "Image",
      "attributesColumn": "Attributes",
      "skuColumn": "SKU",
      "availabilityColumn": "Availability",
      "priceColumn": "Price",
      "minOrderColumn": "Min Order / Pack Size",
      "quantityColumn": "Quantity",
      "subtotalColumn": "Subtotal",
      "clearButton": "Clear",
      "saveToCsvButton": "Save to CSV",
      "collectDataButton": "Collect Data",
      "inStock": "In Stock",
      "outOfStock": "Out of Stock",
      "tableCaption": "Product Variants Grid",
      "quantityLabel": "Quantity for",
      "showAll": "Show All Items",
      "showLess": "Show Less"
    }
  }
}
;

export default _default;
