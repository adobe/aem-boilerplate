declare const _default: {
  "NegotiableQuote": {
    "Request": {
      "title": "Request a Quote",
      "comment": "Comment",
      "commentError": "Please add your comment",
      "quoteName": "Quote name",
      "quoteNameError": "Please add a quote name",
      "attachmentsError": "Error uploading attachments",
      "requestCta": "Request a Quote",
      "saveDraftCta": "Save as draft",
      "error": {
        "header": "Error",
        "unauthenticated": "Please sign in to request a quote.",
        "unauthorized": "You are not authorized to request a quote.",
        "missingCart": "Could not find a valid cart."
      },
      "success": {
        "header": "Success",
        "submitted": "Quote request submitted successfully!",
        "draftSaved": "Quote saved as draft successfully!"
      }
    },
    "Manage": {
      "createdLabel": "Created:",
      "salesRepLabel": "Sales Rep:",
      "expiresLabel": "Expires:",
      "actionsLabel": "Actions",
      "actions": {
        "remove": "Remove"
      },
      "bannerTitle": "Alert",
      "bannerStatusMessages": {
        "submitted": "This quote is currently locked for editing. It will become available once released by the Merchant.",
        "pending": "This quote is currently locked for editing. It will become available once released by the Merchant.",
        "expired": "Your quote has expired and the product prices have been updated as per the latest prices in your catalog. You can either re-submit the quote to seller for further negotiation or go to checkout."
      },
      "actionButtons": {
        "close": "Close quote",
        "delete": "Delete quote",
        "print": "Print quote",
        "createTemplate": "Create quote template",
        "createCopy": "Create copy",
        "sendForReview": "Send for review"
      },
      "shippingInformation": {
        "title": "Shipping Information"
      },
      "shippingAddress": {
        "noAddress": "No shipping address has been set for this quote."
      },
      "quoteComments": {
        "title": "Quote Comments",
        "placeholder": "Add your comment",
        "emptyState": "No comments yet",
        "by": "by"
      },
      "productListTable": {
        "headers": {
          "productName": "Product name",
          "sku": "SKU",
          "price": "Price",
          "quantity": "Quantity",
          "discount": "Discount",
          "subtotal": "Subtotal",
          "actions": "Actions"
        },
        "submitButton": "Update",
        "actions": {
          "editNoteToSeller": "Edit note to seller",
          "remove": "Remove"
        }
      },
      "tabbedContent": {
        "itemsQuoted": "Items quoted",
        "comments": "Comments",
        "historyLog": "History log"
      },
      "quotePricesSummary": {
        "subtotal": {
          "excludingTax": "Quote Subtotal (excluding tax)"
        },
        "appliedTaxes": "Applied Taxes",
        "grandTotal": {
          "includingTax": "Quote Grand Total (including tax)"
        }
      }
    },
    "PriceSummary": {
      "giftOptionsTax": {
        "printedCard": {
          "title": "Printed card",
          "inclTax": "Including taxes",
          "exclTax": "excluding taxes"
        },
        "itemGiftWrapping": {
          "title": "Item gift wrapping",
          "inclTax": "Including taxes",
          "exclTax": "excluding taxes"
        },
        "orderGiftWrapping": {
          "title": "Order gift wrapping",
          "inclTax": "Including taxes",
          "exclTax": "excluding taxes"
        }
      },
      "subTotal": {
        "label": "Subtotal",
        "withTaxes": "Including taxes",
        "withoutTaxes": "excluding taxes"
      },
      "taxes": {
        "total": "Tax Total",
        "totalOnly": "Tax",
        "breakdown": "Taxes",
        "showBreakdown": "Show Tax Breakdown",
        "hideBreakdown": "Hide Tax Breakdown"
      },
      "total": {
        "label": "Total",
        "withoutTax": "Total excluding taxes",
        "saved": "Total saved"
      }
    }
  },
  "historyLog": {
    "changeTypes": {
      "created": "Quote Created",
      "updated": "Quote Updated",
      "statusChanged": "Status Changed",
      "commentAdded": "Comment Added",
      "expirationChanged": "Expiration Changed"
    },
    "noteTypes": {
      "buyerNoteAdded": "Buyer Note Added",
      "sellerNoteAdded": "Seller Note Added"
    },
    "authorLabels": {
      "buyer": "(Buyer)",
      "seller": "(Seller)"
    },
    "changeDetails": {
      "comment": "Comment: \"{comment}\"",
      "statusChangedFromTo": "Status changed from {oldStatus} to {newStatus}",
      "statusSetTo": "Status set to {newStatus}",
      "expirationChangedFromTo": "Expiration changed from {oldExpiration} to {newExpiration}",
      "expirationSetTo": "Expiration set to {newExpiration}",
      "totalChangedFromTo": "Total changed from {oldTotal} to {newTotal}",
      "customChange": "{title}: changed from \"{oldValue}\" to \"{newValue}\"",
      "productsRemovedFromCatalog": "Products removed from catalog: {products}",
      "productsRemovedFromQuote": "Products removed from quote: {products}",
      "noDetailsAvailable": "No details available"
    },
    "emptyState": "No history available for this quote."
  },
  "dateUtils": {
    "never": "Never"
  },
  "QuoteManagement": {
    "QuotesListTable": {
      "quoteName": "Quote Name",
      "created": "Created",
      "createdBy": "Created By",
      "status": "Status",
      "lastUpdated": "Last Updated",
      "quoteTemplate": "Quote Template",
      "quoteTotal": "Quote Total",
      "actions": "Action"
    }
  }
}
;

export default _default;
