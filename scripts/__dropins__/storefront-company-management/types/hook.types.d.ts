import { RefObject } from 'preact';
import { CompanyPermissionFlags } from './companyPermission.types';

export interface UseCompanyStructureProps {
    handleSetInLineAlert?: (alert?: {
        type: 'success' | 'error';
        text: string;
    }) => void;
    permissions: CompanyPermissionFlags | null;
}
export interface UseCompanyProfileProps {
    handleSetInLineAlert?: (alert?: {
        type: 'success' | 'error';
        text: string;
    }) => void;
    editFormRef?: RefObject<HTMLElement>;
}
//# sourceMappingURL=hook.types.d.ts.map