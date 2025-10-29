import { CompanyStructureNode } from '../models/company-structure';

interface CompanyStructureResponse {
    items: CompanyStructureItemResponse[];
}
interface CompanyStructureItemResponse {
    id: string;
    parent_id: string | null;
    entity: {
        __typename: 'CompanyTeam' | 'Customer';
        companyTeamId?: string;
        customerId?: string;
        structure_id: string;
        firstname?: string;
        lastname?: string;
        name?: string;
        description?: string | null;
    };
}
export declare function transformCompanyStructure(response: CompanyStructureResponse): CompanyStructureNode[];
export {};
//# sourceMappingURL=transform-company-structure.d.ts.map