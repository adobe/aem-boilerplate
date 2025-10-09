import { RequisitionList } from '../models/requisitionList';

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
    };
    quantity: number;
    customizable_options?: {
        customizable_option_uid: string;
        is_required: boolean;
        label: string;
        sort_order: number;
        type: string;
        values: {
            customizable_option_value_uid: string;
            label: string;
            price: {
                type: string;
                units: string;
                value: number;
            };
            value: string;
        }[];
    }[];
    bundle_options?: {
        uid: string;
        label: string;
        type: string;
        values: {
            uid: string;
            label: string;
            original_price: {
                value: number;
                currency: string;
            };
            priceV2: {
                value: number;
                currency: string;
            };
            quantity: number;
        }[];
    }[];
    configurable_options?: {
        configurable_product_option_uid: string;
        option_label: string;
        configurable_product_option_value_uid: string;
        value_label: string;
    }[];
    links?: {
        uid: string;
        price?: number;
        sample_url?: string;
        sort_order?: number;
        title?: string;
    }[];
    samples?: {
        sample_url?: string;
        sort_order?: number;
        title?: string;
    }[];
    gift_card_options?: {
        amount?: {
            value?: number;
            currency?: string;
        };
        custom_giftcard_amount?: {
            value?: number;
            currency?: string;
        };
        message?: string;
        recipient_email?: string;
        recipient_name?: string;
        sender_name?: string;
        sender_email?: string;
    };
}
export {};
//# sourceMappingURL=transform-requisition-list.d.ts.map