import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export interface RequisitionListHeaderProps {
    requisitionList: RequisitionList;
    routeRequisitionListGrid?: () => string | void;
    onUpdate?: (updatedList: RequisitionList) => void | Promise<void>;
    onAlert?: (payload: {
        action: string;
        type: string;
        context: string;
    }) => void;
    enrichConfigurableProducts?: (items: Item[]) => Promise<Item[]>;
}
export declare const RequisitionListHeader: Container<RequisitionListHeaderProps>;
//# sourceMappingURL=RequisitionListHeader.d.ts.map