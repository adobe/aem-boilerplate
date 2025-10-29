import { FunctionComponent } from 'preact';
import { CompanyRoleModel, CompanyAclResourceModel } from '../../data/models/company-role';

export interface EditRoleAndPermissionProps {
    mode: 'create' | 'edit';
    role?: CompanyRoleModel;
    aclResources: CompanyAclResourceModel[];
    existingRoleNames?: string[];
    loading?: boolean;
    onSubmit: (data: {
        name: string;
        permissions: string[];
    }) => void;
    onCancel: () => void;
    inLineAlertProps?: {
        type: 'success' | 'error' | 'warning';
        text: string;
        icon?: string;
    };
    prefillName?: string;
    prefillPermissions?: CompanyAclResourceModel[] | any[];
}
export declare const EditRoleAndPermission: FunctionComponent<EditRoleAndPermissionProps>;
//# sourceMappingURL=EditRoleAndPermission.d.ts.map