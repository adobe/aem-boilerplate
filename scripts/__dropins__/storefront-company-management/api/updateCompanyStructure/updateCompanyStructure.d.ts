import { UpdateCompanyStructureInput } from '../../types/api/updateCompanyStructure.types';

/**
 * Updates the company structure by moving a node to a new parent
 *
 * @param input - Object containing the node ID and new parent ID
 * @returns Promise resolving to boolean indicating success
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function updateCompanyStructure(input: UpdateCompanyStructureInput): Promise<boolean>;
//# sourceMappingURL=updateCompanyStructure.d.ts.map