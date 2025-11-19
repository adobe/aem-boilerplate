export const companyRegistrationData = {
  company: {
    companyName: 'Test Company',
    legalName: 'Test Company Legal',
    companyEmail: 'test@example.com', // Will be overridden with dynamic email in actions
    vatTaxId: 'VAT123456',
    resellerId: 'RES123456',
  },
  legalAddress: {
    street: '123 Test St',
    streetLine2: 'Suite 100',
    city: 'Test City',
    postcode: '12345',
    telephone: '1234567890',
    countryCode: 'US',
    region: 'Texas',
  },
  companyAdmin: {
    firstName: 'Mike',
    lastName: 'Williams',
    email: 'mike.williams@example.com', // Will be overridden with dynamic email in actions
    jobTitle: 'Manager',
    workTelephone: '1234567890',
    gender: 'Male',
  },
};

export const companyRegistrationSuccessMessage =
  "Thank you! We're reviewing your request and will contact you soon.";
