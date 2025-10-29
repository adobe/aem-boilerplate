import { CompanyStructureNode } from '../../data/models';

/**
 * Retrieves the company organizational structure as a tree of nodes
 *
 * @returns Promise resolving to array of CompanyStructureNode representing the company hierarchy
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function getCompanyStructure(): Promise<CompanyStructureNode[]>;
//# sourceMappingURL=getCompanyStructure.d.ts.map