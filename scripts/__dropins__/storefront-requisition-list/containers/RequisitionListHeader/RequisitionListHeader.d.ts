import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList } from '../../data/models/requisitionList';

export interface RequisitionListHeaderProps {
    requisitionList: RequisitionList;
    routeRequisitionListGrid?: () => string | void;
    onUpdate?: (updatedList: RequisitionList) => void | Promise<void>;
    onAlert?: (payload: {
        action: string;
        type: string;
        context: string;
    }) => void;
}
export declare const RequisitionListHeader: Container<RequisitionListHeaderProps>;
//# sourceMappingURL=RequisitionListHeader.d.ts.map