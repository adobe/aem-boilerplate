import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PurchaseOrderProps extends HTMLAttributes<HTMLFormElement> {
    error?: string;
    referenceNumber?: string;
    onReferenceNumberBlur?: (event: Event) => void;
    onReferenceNumberChange?: (event: Event) => void;
    onInvalidReferenceNumber?: (event: Event) => void;
}
export declare const PurchaseOrder: FunctionComponent<PurchaseOrderProps>;
//# sourceMappingURL=PurchaseOrder.d.ts.map