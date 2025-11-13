import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ConfirmationModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open?: boolean;
    title?: VNode | string;
    message?: VNode | string;
    cancelLabel?: VNode | string;
    confirmLabel?: VNode | string;
    onCancel?: () => void;
    onConfirm?: () => void;
    onClose?: () => void;
    showCloseButton?: boolean;
    confirmationBanner?: VNode | null;
}
export declare const ConfirmationModal: FunctionComponent<ConfirmationModalProps>;
//# sourceMappingURL=ConfirmationModal.d.ts.map