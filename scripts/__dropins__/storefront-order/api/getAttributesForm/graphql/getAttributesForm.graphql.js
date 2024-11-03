"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ATTRIBUTES_FORM_SHORT = exports.GET_ATTRIBUTES_FORM = void 0;
exports.GET_ATTRIBUTES_FORM = `
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`;
exports.GET_ATTRIBUTES_FORM_SHORT = `
  query GET_ATTRIBUTES_FORM_SHORT {
      attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`;
