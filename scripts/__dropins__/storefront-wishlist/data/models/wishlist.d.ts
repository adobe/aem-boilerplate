import { SelectedCustomizableOption } from './selected-customizable-option';

export interface Wishlist {
    id: string;
    updated_at: string;
    sharing_code: string;
    items_count: number;
    items: Item[];
}
export interface Item {
    id: string;
    quantity: number;
    description: string;
    added_at: string;
    selectedOptions: {
        uid: string;
    }[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    product: {
        sku: string;
    };
    customizableOptions: SelectedCustomizableOption[];
}
//# sourceMappingURL=wishlist.d.ts.map