import { SelectedCustomizableOption } from './selected-customizable-option';
import { Product } from './product';

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
    selectedOptions: ConfigurableOption[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    product: Product;
    customizableOptions: SelectedCustomizableOption[];
}
export interface ConfigurableOption {
    value: string;
    label: string;
    uid: string;
}
//# sourceMappingURL=wishlist.d.ts.map