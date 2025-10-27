import { CompanyRoleModel, CompanyAclResourceModel, CompanyRoleCreateInputModel, CompanyRoleUpdateInputModel, GetCompanyRolesVariables } from '../api/companyRoles';

export declare const DEFAULT_PAGINATION_SIZE = 20;
export interface UseCompanyRolesReturn {
    roles: CompanyRoleModel[];
    aclResources: CompanyAclResourceModel[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    error: string | null;
    fetchRoles: (variables?: GetCompanyRolesVariables) => Promise<void>;
    fetchAclResources: () => Promise<void>;
    createRole: (input: CompanyRoleCreateInputModel) => Promise<CompanyRoleModel | null>;
    updateRole: (input: CompanyRoleUpdateInputModel) => Promise<CompanyRoleModel | null>;
    deleteRole: (id: string) => Promise<boolean>;
    checkRoleNameAvailability: (name: string) => Promise<boolean>;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    refresh: () => Promise<void>;
    clearError: () => void;
}
export declare const useCompanyRoles: (initialPageSize?: number, autoFetch?: boolean, clientSidePagination?: boolean) => UseCompanyRolesReturn;
//# sourceMappingURL=useCompanyRoles.d.ts.map