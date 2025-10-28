import { CompanyUserStatus } from './companyUsers';

export interface UpdateCompanyUserStatusMutation {
    updateCompanyUser: {
        user: {
            id: string;
            status: CompanyUserStatus;
        };
    };
}
export interface UpdateCompanyUserStatusParams {
    id: string;
    status: CompanyUserStatus;
}
export interface UpdateCompanyUserStatusResponse {
    success: boolean;
    user?: {
        id: string;
        status: CompanyUserStatus;
    };
}
//# sourceMappingURL=updateCompanyUserStatus.types.d.ts.map