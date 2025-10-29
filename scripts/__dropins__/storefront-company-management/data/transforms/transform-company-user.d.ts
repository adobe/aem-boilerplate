import { CompanyUserModel } from '../models/company-user';

interface CompanyUserResponse {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    job_title?: string | null;
    telephone?: string | null;
    status?: string | null;
    role?: {
        id: string;
        name: string;
    } | null;
}
export declare const transformCompanyUser: (response: CompanyUserResponse) => CompanyUserModel;
export {};
//# sourceMappingURL=transform-company-user.d.ts.map