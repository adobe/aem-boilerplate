import { CreateCompanyTeamInput, CreateCompanyTeamResult } from '../../types/api/createCompanyTeam.types';

/**
 * Creates a new company team with the provided information
 *
 * @param input - Team information including name, description, and target location
 * @returns Promise resolving to created team result or null if creation failed
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function createCompanyTeam(input: CreateCompanyTeamInput): Promise<CreateCompanyTeamResult | null>;
//# sourceMappingURL=createCompanyTeam.d.ts.map