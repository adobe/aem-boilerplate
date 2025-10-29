import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList } from '../../data/models/requisitionList.js';

export interface RequisitionListNamesProps extends HTMLAttributes<HTMLDivElement> {
    items?: RequisitionList[];
    canCreate?: boolean;
    sku: string;
    selectedOptions?: string[];
    quantity?: number;
    beforeAddProdToReqList?: () => Promise<void> | void;
}
export declare const RequisitionListNames: Container<RequisitionListNamesProps>;
//# sourceMappingURL=RequisitionListNames.d.ts.map