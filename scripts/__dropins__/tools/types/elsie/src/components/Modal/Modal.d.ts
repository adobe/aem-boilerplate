import { FunctionComponent, HTMLAttributes } from 'preact/compat';
import { VNode } from 'preact';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size' | 'title'> {
    size?: 'small' | 'medium' | 'full';
    title?: VNode;
    centered?: boolean;
    onClose?: () => void;
    backgroundDim?: boolean;
    clickToDismiss?: boolean;
    escapeToDismiss?: boolean;
    showCloseButton?: boolean;
}
export declare const Modal: FunctionComponent<ModalProps>;
//# sourceMappingURL=Modal.d.ts.map