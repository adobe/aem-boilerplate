import { UpdateCompanyUserStatusParams, UpdateCompanyUserStatusResponse } from '../../types';

/**
 * Updates a company user's status (Active/Inactive)
 * @param params - The parameters containing user ID and new status
 * @param params.id - The ID of the user to update (base64 encoded UID from GraphQL)
 * @param params.status - The new status for the user (ACTIVE or INACTIVE)
 * @returns Promise<UpdateCompanyUserStatusResponse> - Object containing success status and updated user data
 */
export declare const updateCompanyUserStatus: (params: UpdateCompanyUserStatusParams) => Promise<UpdateCompanyUserStatusResponse>;
//# sourceMappingURL=updateCompanyUserStatus.d.ts.map