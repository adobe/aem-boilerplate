declare const _default: {
  "PaymentServices": {
    "ApplePay": {
      "errors": {
        "default": {
          "name": "Apple Pay error",
          "message": "An unexpected error occurred. Please try again or contact support."
        }
      }
    },
    "CreditCard": {
      "errors": {
        "default": {
          "name": "Credit Card error",
          "message": "An unexpected error occurred. Please try again or contact support."
        }
      },
      "formFields": {
        "cvv": {
          "invalidError": "Enter valid cvv.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "CVV*"
        },
        "expirationDate": {
          "invalidError": "Enter valid expiration date.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "MM/YY*"
        },
        "number": {
          "invalidError": "Enter valid card number.",
          "label": "",
          "missingError": "This field is required.",
          "placeholder": "Card Number*"
        }
      }
    },
    "messages": {
      "methodNotAvailable": "Payment method not available. Please contact support.",
      "methodNotLoaded": "Failed to load payment method. Please try again later.",
      "methodLoading": "Loading payment method..."
    }
  }
}
;

export default _default;
