/*! Copyright 2024 Adobe
All Rights Reserved. */
const e=`
  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {
    id
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    street
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    prefix
    suffix
    middlename
    fax
  }
`,t=`
  fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {
    id
    firstname
    lastname
    company
    street
    city
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    available_shipping_methods {
      amount {
        currency
        value
      }
      available
      carrier_code
      carrier_title
      error_message
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    selected_shipping_method {
      amount {
        value
        currency
      }
      carrier_code
      carrier_title
      method_code
      method_title
      price_excl_tax {
        value
        currency
      }
      price_incl_tax {
        value
        currency
      }
    }
    same_as_billing
    prefix
    suffix
    middlename
    fax
  }
`,a=`
  fragment CHECKOUT_DATA_FRAGMENT on Cart {
    id
    is_virtual
    email
    total_quantity
    billing_address {
      ...BILLING_CART_ADDRESS_FRAGMENT
    }
    shipping_addresses {
      ...SHIPPING_CART_ADDRESS_FRAGMENT
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }

  ${e}
  ${t}
`,i=`
  fragment CUSTOMER_FRAGMENT on Customer {
    firstname
    lastname
    email
  }
`;export{a as CHECKOUT_DATA_FRAGMENT,i as CUSTOMER_FRAGMENT};
