import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export declare const getRequisitionList: (requisitionListID: string, currentPage?: number, pageSize?: number, enrichConfigurableProducts?: ((items: Item[]) => Promise<Item[]>) | undefined) => Promise<RequisitionList | null>;
//# sourceMappingURL=getRequisitionList.d.ts.map