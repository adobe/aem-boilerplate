import { DeleteCompanyUserParams, DeleteCompanyUserResponse } from '../../types';

/**
 * Deletes a company user by their ID
 * @param params - The parameters containing user ID
 * @param params.id - The ID of the user to delete (base64 encoded UID from GraphQL)
 * @returns Promise<DeleteCompanyUserResponse> - Object containing success status
 */
export declare const deleteCompanyUser: (params: DeleteCompanyUserParams) => Promise<DeleteCompanyUserResponse>;
//# sourceMappingURL=deleteCompanyUser.d.ts.map