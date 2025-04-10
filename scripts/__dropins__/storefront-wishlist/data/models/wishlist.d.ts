import { SelectedCustomizableOption } from './selected-customizable-option';
import { Product } from './product';

export interface Wishlist {
    id: string;
    updated_at: string;
    sharing_code: string;
    items_count: number;
    total_pages: number;
    items: Item[];
}
export interface Item {
    id: string;
    quantity: number;
    description: string;
    added_at: string;
    product: Product;
    customizableOptions: SelectedCustomizableOption[];
}
//# sourceMappingURL=wishlist.d.ts.map