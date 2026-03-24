import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export declare const updateRequisitionList: (requisitionListUid: string, name: string, description?: string, pageSize?: number, currentPage?: number, enrichConfigurableProducts?: ((items: Item[]) => Promise<Item[]>) | undefined) => Promise<RequisitionList | null>;
//# sourceMappingURL=updateRequisitionList.d.ts.map