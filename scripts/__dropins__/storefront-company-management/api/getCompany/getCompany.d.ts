import { CompanyModel } from '../../data/models';

/**
 * Retrieves company information with permissions-aware field selection
 * Only returns fields that the current user has permission to view
 *
 * @returns Promise resolving to CompanyModel or null if no company data available
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function getCompany(): Promise<CompanyModel | null>;
//# sourceMappingURL=getCompany.d.ts.map