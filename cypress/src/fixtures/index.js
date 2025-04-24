export const customerShippingAddress = {
  firstName: 'John',
  lastName: 'Doe',
  street: '11501 Domain Dr',
  street1: 'Suite 110',
  city: 'Austin',
  postCode: '78758',
  telephone: '1234567890',
  email: 'test@example.com',
  region: 'TX,171',
  regionFull: 'Texas',
  countryFull: 'United States',
  countryCode: 'US',
  shippingMethod: 'Flat Rate - Fixed',
};

export const customerBillingAddress = {
  firstName: 'Jane',
  lastName: 'Smith',
  street: '5th Ave',
  street1: 'Suite 20',
  // Intentional string to distinguish between state and city during assertion
  city: 'NewYork City',
  postCode: '12345',
  telephone: '0987654321',
  email: 'test_cypresstest@example.com',
  region: 'NY,129',
  regionFull: 'New York',
  countryFull: 'United States',
  countryCode: 'US',
};

export const paymentServicesCreditCard = {
  name: 'Credit Card',
  code: 'payment_services_paypal_hosted_fields',
  params: {
    cc_number: '4111111111111111',
    cc_exp: '12/2030',
    cc_cid: '123',
  }
};

export const checkMoneyOrder = {
  name: 'Check / Money order',
  code: 'checkmo',
};

export const products = {
  configurable: {
    urlPath: "/products/cypress-configurable-product-latest/CYPRESS456",
    urlPathWithOptions: "/products/cypress-configurable-product-latest/CYPRESS456?optionsUIDs=Y29uZmlndXJhYmxlLzI3OS8zOQ%3D%3D"
  },
};
