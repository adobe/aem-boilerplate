import { CompanyUserModel } from '../../data/models';

/**
 * Retrieves a specific company user by their ID
 * @param id - The ID of the company user to retrieve (will be base64 encoded)
 * @returns Promise resolving to CompanyUserModel or null if user not found
 */
export declare function getCompanyUser(id: string): Promise<CompanyUserModel | null>;
//# sourceMappingURL=getCompanyUser.d.ts.map