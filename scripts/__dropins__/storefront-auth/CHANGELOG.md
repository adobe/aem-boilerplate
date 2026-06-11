# @dropins/storefront-auth

## 4.0.0

### Major Changes

- 515ce05: Add support for Remote Shopping Assistance feature that enables store administrators to help customers with purchases. The implementation includes admin session management via JWT token validation, a consent UI component for customer approval, and enhanced cookie security with proper encoding and SameSite protection for all authentication cookies

### Minor Changes

- f208291: Upgraded Elsie package to use the 1.9.0-beta.0 version
- f208291: Migrate to Node.js 24 LTS

  Minimum required Node.js version is now 24. Updated engines.node from >=20 to >=24.

- 572b81a: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

### Patch Changes

- f208291: Ensure `getCustomerRolePermissions` always emits `auth/permissions` so consumers (e.g. account navigation) keep working. For non-admin customers with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so storefront checkout does not treat B2C users as denied.
- 2870239: Bump to StorefrontSDK stable version
- 1c0576b: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.5

### Patch Changes

- 2870239: Bump to StorefrontSDK stable version

## 4.0.0-beta.4

### Patch Changes

- 1c0576b: Bump @adobe-commerce/elsie to v1.9.0-beta.3

## 4.0.0-beta.3

### Major Changes

- 515ce05: Add support for Remote Shopping Assistance feature that enables store administrators to help customers with purchases. The implementation includes admin session management via JWT token validation, a consent UI component for customer approval, and enhanced cookie security with proper encoding and SameSite protection for all authentication cookies

## 3.3.0-beta.2

### Minor Changes

- 572b81a: Removed the `engines.node` constraint from `package.json`. This package targets browser environments exclusively and does not depend on a specific Node.js runtime version. The package is now built and distributed using Node.js 22 LTS.

## 3.3.0-beta.1

### Minor Changes

- 1703268: Upgraded Elsie package to use the 1.9.0-beta.0 version

## 3.3.0-beta.0

### Patch Changes

- 3cadf48: Ensure `getCustomerRolePermissions` always emits `auth/permissions` so consumers (e.g. account navigation) keep working. For non-admin customers with no granular ACL tree from GraphQL, set `Magento_Sales::place_order` so storefront checkout does not treat B2C users as denied.

## 3.2.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.1

### Patch Changes

- fc20311: Bump "@adobe-commerce/elsie" from 1.7.0 to 1.8.0

## 3.2.0-beta.0

### Minor Changes

- e880d43: Adds missing slot props to the Reset Password Container.
- 901ad98: Introduced slots for Title, Form and Buttons sections in all containers to enhance flexibility and customization

### Patch Changes

- 323dd52: Add Changesets-based release automation with branch-aware workflows (alpha/beta/stable), PR changeset validation, and contributor helper scripts.
