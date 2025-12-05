// Import and run specific B2C tests in B2B context
describe("B2C Tests in B2B Context", { tags: ['@B2BSaas'] }, () => {
  // Import B2C test functions
  require('../b2c/verifyUserAccount.spec');
});
