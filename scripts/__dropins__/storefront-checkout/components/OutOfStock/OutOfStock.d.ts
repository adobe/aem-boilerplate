import { Item as CartItem } from '../../types/cart';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OutOfStockProps extends HTMLAttributes<HTMLDivElement> {
    items: CartItem[];
    onRemoveOutOfStock?: (event: Event) => void;
    routeCart?: string;
}
export declare const OutOfStock: FunctionComponent<OutOfStockProps>;
//# sourceMappingURL=OutOfStock.d.ts.map