import { CustomerCompanyInfo } from '../../data/models';

/**
 * Gets customer company information for display on account information page
 * This is a simplified API that only returns the essential company info needed
 * for the customer account page, without requiring full company permissions
 *
 * @returns Promise resolving to CustomerCompanyInfo or null if company functionality is disabled
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function getCustomerCompany(): Promise<CustomerCompanyInfo | null>;
//# sourceMappingURL=getCustomerCompany.d.ts.map