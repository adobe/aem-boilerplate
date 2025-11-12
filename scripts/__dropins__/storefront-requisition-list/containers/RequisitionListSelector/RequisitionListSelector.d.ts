import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface RequisitionListSelectorProps extends HTMLAttributes<HTMLDivElement> {
    canCreate?: boolean;
    sku: string;
    selectedOptions?: string[];
    quantity?: number;
    beforeAddProdToReqList?: () => Promise<void> | void;
}
export declare const RequisitionListSelector: Container<RequisitionListSelectorProps>;
//# sourceMappingURL=RequisitionListSelector.d.ts.map