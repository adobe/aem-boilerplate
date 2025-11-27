import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CartItemModel } from '../../data/models/negotiable-quote-model';

export interface LineItemNoteModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    item: CartItemModel;
    onClose?: () => void;
    onConfirm: (note: string, quantity: number) => void;
    isSubmitting?: boolean;
    errorBanner?: VNode;
    successBanner?: VNode;
    showCloseButton?: boolean;
    readOnlyQuantity?: boolean;
}
export declare const LineItemNoteModal: FunctionComponent<LineItemNoteModalProps>;
//# sourceMappingURL=LineItemNoteModal.d.ts.map