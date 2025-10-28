export declare const RequisitionListModel: {
    description: string;
    items: ({
        bundle_options: {
            label: string;
            type: string;
            uid: string;
            values: {
                label: string;
                original_price: {
                    currency: string;
                    value: number;
                };
                priceV2: {
                    currency: string;
                    value: number;
                };
                quantity: number;
                uid: string;
            }[];
        }[];
        configurable_options: never[];
        customizable_options: never[];
        gift_card_options: {};
        quantity: number;
        samples: never[];
        sku: string;
        uid: string;
    } | {
        bundle_options: never[];
        configurable_options: {
            option_label: string;
            option_uid: string;
            value_label: string;
            value_uid: string;
        }[];
        customizable_options: never[];
        gift_card_options: {};
        quantity: number;
        samples: never[];
        sku: string;
        uid: string;
    })[];
    items_count: number;
    name: string;
    page_info: undefined;
    uid: string;
    updated_at: string;
};
//# sourceMappingURL=RequisitionListModel.d.ts.map