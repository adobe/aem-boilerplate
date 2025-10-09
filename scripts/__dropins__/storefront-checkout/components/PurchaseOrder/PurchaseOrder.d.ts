import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PurchaseOrderProps extends HTMLAttributes<HTMLFormElement> {
    referenceNumber?: string;
    onReferenceNumberChange?: (event: Event) => void;
    onReferenceNumberBlur?: (event: Event) => void;
}
export declare const PurchaseOrder: FunctionComponent<PurchaseOrderProps>;
//# sourceMappingURL=PurchaseOrder.d.ts.map