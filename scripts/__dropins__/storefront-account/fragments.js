/*! Copyright 2026 Adobe
All Rights Reserved. */
const e=`
  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {
    date_of_birth
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
  }
`,t=`
  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }
`,a=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    grand_total_excl_tax {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal_excl_tax {
      currency
      value
    }
    subtotal_incl_tax {
      currency
      value
    }
    taxes {
      amount {
        currency
        value
      }
      rate
      title
    }
    total_tax {
      currency
      value
    }
    total_shipping {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
  }
`;export{t as ADDRESS_FRAGMENT,e as BASIC_CUSTOMER_INFO_FRAGMENT,a as ORDER_SUMMARY_FRAGMENT};
//# sourceMappingURL=fragments.js.map
