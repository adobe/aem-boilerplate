import { CompanyTeamModel } from '../models/company-team';

interface CompanyTeamResponse {
    id: string;
    name: string;
    description?: string | null;
}
export declare const transformCompanyTeam: (response: CompanyTeamResponse) => CompanyTeamModel;
export {};
//# sourceMappingURL=transform-company-team.d.ts.map