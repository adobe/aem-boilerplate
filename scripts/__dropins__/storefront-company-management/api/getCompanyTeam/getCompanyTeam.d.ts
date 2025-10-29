import { CompanyTeamModel } from '../../data/models';

/**
 * Retrieves a specific company team by their ID
 *
 * @param id - The ID of the company team to retrieve
 * @returns Promise resolving to CompanyTeamModel or null if team not found
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function getCompanyTeam(id: string): Promise<CompanyTeamModel | null>;
//# sourceMappingURL=getCompanyTeam.d.ts.map