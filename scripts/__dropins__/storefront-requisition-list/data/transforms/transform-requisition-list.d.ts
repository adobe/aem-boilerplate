import { RequisitionList } from '../models/requisitionList';
import { ConfiguredProduct, Link, Sample, BundleOption, ConfigurableOption, RawCustomizableOption, GiftCardOption } from '../models/item';

export interface RawRequisitionListData {
    name: string;
    description: string;
    uid: string;
    updated_at: string;
    items_count: number;
    items: {
        items: RawItemData[];
        page_info: {
            total_pages: number;
            current_page: number;
            page_size: number;
        };
    };
}
export declare function transformRequisitionList(data: RawRequisitionListData): RequisitionList | null;
interface RawItemData {
    uid: string;
    product: {
        sku: string;
        stock_status?: string;
        only_x_left_in_stock?: number | null;
    };
    quantity: number;
    customizable_options?: RawCustomizableOption[];
    bundle_options?: BundleOption[];
    configurable_options?: ConfigurableOption[];
    configured_product?: ConfiguredProduct;
    links?: Link[];
    samples?: Sample[];
    gift_card_options?: GiftCardOption;
}
export {};
//# sourceMappingURL=transform-requisition-list.d.ts.map