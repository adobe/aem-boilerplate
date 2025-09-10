import { CustomerCompanyInfo } from '../../types/company';

export declare class CustomerCompanyContext {
    private static instance;
    private readonly EMPTY_CUSTOMER_COMPANY_CONTEXT;
    private cache;
    /**
     * Get singleton instance
     */
    static getInstance(): CustomerCompanyContext;
    /**
     * Transforms a company object into a company option for UI components
     */
    private transformCompanyToOption;
    /**
     * Decodes base64 string and returns SHA1 hash
     */
    private processCustomerGroupId;
    /**
     * Checks if the user is authenticated by verifying the Authorization header
     */
    private isUserAuthenticated;
    resetCache(): void;
    /**
     * Fetches and updates only the customer group information in the cache
     *
     * @returns Promise containing the updated customer group ID
     * @throws Will not throw errors - returns null on failure
     */
    updateCustomerGroup(): Promise<string | null>;
    /**
     * Fetches customer company information including the current company and all available companies
     *
     * @returns Promise containing current company and list of available companies
     * @throws Will not throw errors - returns empty data on failure
     */
    getCustomerCompanyInfo(): Promise<CustomerCompanyInfo>;
}
export declare const getCustomerCompanyInfo: () => Promise<CustomerCompanyInfo>;
export declare const updateCustomerGroup: () => Promise<string | null>;
//# sourceMappingURL=customerCompanyContext.d.ts.map