import { FunctionComponent } from 'preact';

export interface RequisitionListPickerProps {
    excludeUid?: string;
    confirmLabel: string;
    disabled?: boolean;
    onConfirm: (selectedUid: string) => void;
}
export declare const RequisitionListPicker: FunctionComponent<RequisitionListPickerProps>;
//# sourceMappingURL=RequisitionListPicker.d.ts.map