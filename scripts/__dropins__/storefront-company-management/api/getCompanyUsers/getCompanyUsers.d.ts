import { CompanyUsersParams, CompanyUsersResponse } from '../../types';

/**
 * Fetches the list of company users with pagination and optional filtering
 * @param params - Query parameters
 * @param params.pageSize - Number of items per page (default: 20)
 * @param params.currentPage - Current page number (default: 1)
 * @param params.filter - Optional filter to apply (e.g., { status: 'ACTIVE' })
 * @returns Promise<CompanyUsersResponse> - Object containing array of company users with base64-encoded IDs and pagination info
 */
export declare const getCompanyUsers: (params?: CompanyUsersParams) => Promise<CompanyUsersResponse>;
//# sourceMappingURL=getCompanyUsers.d.ts.map