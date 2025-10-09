import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PurchaseOrderProps extends HTMLAttributes<HTMLFormElement> {
    initialReferenceNumber?: string;
    onReferenceNumberChange?: (referenceNumber: string) => void;
    onReferenceNumberBlur?: (referenceNumber: string) => void;
}
export declare const PurchaseOrder: Container<PurchaseOrderProps>;
//# sourceMappingURL=PurchaseOrder.d.ts.map