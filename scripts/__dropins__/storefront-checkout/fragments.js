/*! Copyright 2026 Adobe
All Rights Reserved. */
const e=`
  fragment AVAILABLE_SHIPPING_METHOD_FRAGMENT on AvailableShippingMethod {
    amount {
      currency
      value
    }
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
`,_=`
  fragment SELECTED_SHIPPING_METHOD_FRAGMENT on SelectedShippingMethod {
    amount {
      currency
      value
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
`,a=`
  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {
    city
    company
    country {
      code
      label
    }
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    fax
    firstname
    id
    lastname
    middlename
    postcode
    prefix
    region {
      region_id
      code
      label
    }
    street
    suffix
    telephone
    uid
    vat_id
  }
`,i=`
  fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {
    available_shipping_methods {
      ...AVAILABLE_SHIPPING_METHOD_FRAGMENT
    }
    city
    company
    country {
      code
      label
    }
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    fax
    firstname
    id
    lastname
    middlename
    postcode
    prefix
    region {
      region_id
      code
      label
    }
    same_as_billing
    selected_shipping_method {
      ...SELECTED_SHIPPING_METHOD_FRAGMENT
    }
    street
    suffix
    telephone
    uid
    vat_id
  }

  ${e}
  ${_}
`,t=`
  fragment AVAILABLE_PAYMENT_METHOD_FRAGMENT on AvailablePaymentMethod {
    code
    title
  }
`,E=`
  fragment SELECTED_PAYMENT_METHOD_FRAGMENT on SelectedPaymentMethod {
    code
    title
    purchase_order_number
  }
`,A=`
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
      ...AVAILABLE_PAYMENT_METHOD_FRAGMENT
    }
    selected_payment_method {
      ...SELECTED_PAYMENT_METHOD_FRAGMENT
    }
  }

  ${a}
  ${i}
  ${t}
  ${E}
`,r=`
  fragment CUSTOMER_FRAGMENT on Customer {
    firstname
    lastname
    email
  }
`,o=`
  fragment NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT on NegotiableQuoteBillingAddress {
    city
    company
    country {
      code
      label
    }
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    customer_address_uid
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region {
      region_id
      code
      label
    }
    street
    suffix
    telephone
    uid
    vat_id
  }
`,n=`
  fragment NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT on NegotiableQuoteShippingAddress {
    available_shipping_methods {
      ...AVAILABLE_SHIPPING_METHOD_FRAGMENT
    }
    city
    company
    country {
      code
      label
    }
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    customer_address_uid
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region {
      region_id
      code
      label
    }
    selected_shipping_method {
      ...SELECTED_SHIPPING_METHOD_FRAGMENT
    }
    street
    suffix
    telephone
    uid
    vat_id
  }

  ${e}
  ${_}
`,T=`
  fragment NEGOTIABLE_QUOTE_FRAGMENT on NegotiableQuote {
    available_payment_methods {
      ...AVAILABLE_PAYMENT_METHOD_FRAGMENT
    }
    billing_address {
      ...NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT
    }
    email
    is_virtual
    name
    selected_payment_method {
      ...SELECTED_PAYMENT_METHOD_FRAGMENT
    }
    shipping_addresses {
      ...NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT
    }
    status
    total_quantity
    uid
  }

  ${o}
  ${n}
  ${t}
  ${E}
`;export{t as AVAILABLE_PAYMENT_METHOD_FRAGMENT,e as AVAILABLE_SHIPPING_METHOD_FRAGMENT,a as BILLING_CART_ADDRESS_FRAGMENT,A as CHECKOUT_DATA_FRAGMENT,r as CUSTOMER_FRAGMENT,o as NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT,T as NEGOTIABLE_QUOTE_FRAGMENT,n as NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT,E as SELECTED_PAYMENT_METHOD_FRAGMENT,_ as SELECTED_SHIPPING_METHOD_FRAGMENT,i as SHIPPING_CART_ADDRESS_FRAGMENT};
//# sourceMappingURL=fragments.js.map
