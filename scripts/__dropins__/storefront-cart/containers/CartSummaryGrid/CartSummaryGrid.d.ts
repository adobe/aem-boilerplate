import { HTMLAttributes } from 'preact/compat';
import { CartModel } from '../../data/models';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface CartSummaryGridProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
}
export declare const CartSummaryGrid: Container<CartSummaryGridProps, CartModel | null>;
//# sourceMappingURL=CartSummaryGrid.d.ts.map