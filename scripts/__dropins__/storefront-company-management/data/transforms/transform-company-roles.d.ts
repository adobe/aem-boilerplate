import { CompanyRoleModel } from '../models/company-role';

interface CompanyRoleResponse {
    id: string;
    name: string;
}
export declare const transformCompanyRoles: (responses: CompanyRoleResponse[]) => CompanyRoleModel[];
export {};
//# sourceMappingURL=transform-company-roles.d.ts.map