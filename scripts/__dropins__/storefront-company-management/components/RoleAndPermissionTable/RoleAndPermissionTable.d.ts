import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CompanyRoleModel } from '../../data/models/company-role';

export interface RoleAndPermissionTableProps extends HTMLAttributes<HTMLDivElement> {
    roles: CompanyRoleModel[];
    isLoading: boolean;
    canManageRoles?: boolean;
    onShowCreateForm: () => void;
    onShowEditForm: (roleId: string) => void;
    onDuplicateRole?: (roleId: string) => void;
    onDeleteRole?: (roleId: string) => void;
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}
export declare const RoleAndPermissionTable: FunctionComponent<RoleAndPermissionTableProps>;
//# sourceMappingURL=RoleAndPermissionTable.d.ts.map