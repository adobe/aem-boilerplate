import { RequisitionList } from './requisitionList';

export interface RequisitionLists {
    page_info: {
        page_size: number;
        current_page: number;
        total_pages: number;
    };
    total_count: number;
    items: RequisitionList[];
}
//# sourceMappingURL=requisitionLists.d.ts.map