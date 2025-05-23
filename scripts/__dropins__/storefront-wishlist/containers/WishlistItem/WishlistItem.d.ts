import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { Item } from '../../data/models';

export interface WishlistItemProps extends HTMLAttributes<HTMLDivElement> {
    initialData: Item | null;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
}
export declare const WishlistItem: Container<WishlistItemProps>;
//# sourceMappingURL=WishlistItem.d.ts.map