export const customerShippingAddress = {
  firstName: 'John',
  lastName: 'Doe',
  street: '11501 Domain Dr',
  street1: 'Suite 110',
  city: 'Austin',
  postCode: '78758',
  telephone: '1234567890',
  email: 'test@example.com',
  region: '169',
  regionFull: 'Texas',
  countryFull: 'United States',
  countryCode: 'US',
  shippingMethod: 'Flat Rate - Fixed',
  paymentMethod: 'Check / Money order',
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
  region: '43',
  regionFull: 'New York',
  countryFull: 'United States',
  countryCode: 'US',
  paymentMethod: 'Check / Money order',
}

export const products = {
  configurable: {
    urlPath: "/products/frankie-sweatshirt/MH04",
    urlPathWithOptions: "/products/frankie-sweatshirt/MH04?optionsUIDs=Y29uZmlndXJhYmxlLzU1Ni81Mjk%3D%2CY29uZmlndXJhYmxlLzI3Ny8yMDI%3D"
  },
}
