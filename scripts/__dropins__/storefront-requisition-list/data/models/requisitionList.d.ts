import { Item } from './item';

export interface PageInfo {
    page_size: number;
    current_page: number;
    total_pages: number;
}
export interface RequisitionList {
    uid: string;
    name: string;
    description: string;
    updated_at: string;
    items_count: number;
    items: Item[];
    page_info?: PageInfo;
}
//# sourceMappingURL=requisitionList.d.ts.map