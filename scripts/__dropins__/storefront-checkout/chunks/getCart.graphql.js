import{t as a,a as l}from"./transform-shipping-methods.js";const c=e=>{if(e)return{code:e.code,title:e.title}},d=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:r,title:i}=t;return{code:r,title:i}})},u=e=>e?!!e.code&&!!e.label:!1,m=e=>{if(!u(e))return;const{code:t,label:r,region_id:i}=e;return i?{code:t,name:r,id:i}:{code:t,name:r}},_=e=>{const{code:t,label:r}=e;return{value:t,label:r}},p=e=>e?"code"in e&&"value"in e:!1,h=e=>e.filter(p).map(t=>{const{code:r,value:i}=t;return{code:r,value:i}}),o=e=>{const t=e.street.filter(Boolean);return{firstName:e.firstname,lastName:e.lastname,company:e.company||void 0,city:e.city,street:t,postCode:e.postcode||void 0,vatId:e.vat_id||void 0,telephone:e.telephone||void 0,region:m(e.region),country:_(e.country),customAttributes:h(e.custom_attributes)}},y=e=>{if(e)return o(e)},g=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:r,selected_shipping_method:i,...n}=t;return{...o(n),availableShippingMethods:a(r),selectedShippingMethod:l(i)}}),f=e=>({availablePaymentMethods:d(e.available_payment_methods),billingAddress:y(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:c(e.selected_payment_method),shippingAddresses:g(e.shipping_addresses)}),s=`
  fragment CheckoutData on Cart {
    is_virtual
    email
    total_quantity
    billing_address {
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
    }
    shipping_addresses {
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
`,b=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...CheckoutData
    }
  }
  ${s}
`,C=`
  query getCustomerCart {
    cart: customerCart {
      id
      ...CheckoutData
    }
  }
  ${s}
`;export{s as C,C as a,b as g,f as t};
