import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionLists as RequisitionListsModel } from '../../data/models/requisitionLists';

export interface RequisitionListGridProps extends HTMLAttributes<HTMLDivElement> {
    requisitionLists?: RequisitionListsModel | null;
    routeRequisitionListDetails?: (uid: string) => string | void;
    slots?: {
        Header?: SlotProps;
    };
}
export declare const RequisitionListGrid: Container<RequisitionListGridProps>;
//# sourceMappingURL=RequisitionListGrid.d.ts.map