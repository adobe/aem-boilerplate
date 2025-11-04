import { UpdateCompanyTeamInput } from '../../types/api/updateCompanyTeam.types';

/**
 * Updates an existing company team with the provided information
 *
 * @param input - Team information including ID (base64 encoded UID) and fields to update
 * @returns Promise resolving to boolean indicating success
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function updateCompanyTeam(input: UpdateCompanyTeamInput): Promise<boolean>;
//# sourceMappingURL=updateCompanyTeam.d.ts.map