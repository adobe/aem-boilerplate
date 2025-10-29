import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CompanyUserStatus } from '../../types';

export interface CompanyUsersManagementModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClose'> {
    /** The ID of the user to manage */
    userId: string;
    /** The current status of the user */
    userStatus: CompanyUserStatus;
    /** Callback function called when the modal should be closed */
    onClose: () => void;
    /** Whether the modal is currently open */
    isOpen?: boolean;
}
export declare const CompanyUsersManagementModal: FunctionComponent<CompanyUsersManagementModalProps>;
//# sourceMappingURL=CompanyUsersManagementModal.d.ts.map