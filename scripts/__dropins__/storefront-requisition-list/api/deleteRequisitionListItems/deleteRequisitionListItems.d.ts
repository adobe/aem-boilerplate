import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export declare const deleteRequisitionListItems: (requisitionListUid: string, items: Array<string>, pageSize: number, currentPage: number, enrichConfigurableProducts?: ((items: Item[]) => Promise<Item[]>) | undefined) => Promise<RequisitionList | null>;
//# sourceMappingURL=deleteRequisitionListItems.d.ts.map