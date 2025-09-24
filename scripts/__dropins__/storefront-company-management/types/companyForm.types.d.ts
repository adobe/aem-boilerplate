import { CompanyPermissionFlags } from './companyPermission.types';

export interface CompanyTeamFormProps {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    permissions: CompanyPermissionFlags | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'team';
    }) => void;
    onCancel: () => void;
}
export interface CompanyUserFormProps {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    permissions: CompanyPermissionFlags | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'user';
    }) => void;
    onCancel: () => void;
}
//# sourceMappingURL=companyForm.types.d.ts.map