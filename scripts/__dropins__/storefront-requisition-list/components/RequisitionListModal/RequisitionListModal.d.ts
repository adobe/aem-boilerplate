import { FunctionComponent, VNode } from 'preact';

export interface RequisitionListModalProps {
    isOpen: boolean;
    isLoading: boolean;
    title: VNode | string;
    modalContent: VNode | string;
    closeBtnCaption?: string;
    confirmBtnCaption?: string;
    handleModalOnClose?: () => void;
    handleModalOnConfirm?: () => void;
}
export declare const RequisitionListModal: FunctionComponent<RequisitionListModalProps>;
//# sourceMappingURL=RequisitionListModal.d.ts.map