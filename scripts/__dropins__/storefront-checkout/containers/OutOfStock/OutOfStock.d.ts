import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export type UpdateProductsFromCart = Array<{
    uid: string;
    quantity: number;
}>;
export interface OutOfStockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    onCartProductsUpdate?: (items: UpdateProductsFromCart) => void;
    routeCart?: () => string;
}
export declare const OutOfStock: Container<OutOfStockProps>;
//# sourceMappingURL=OutOfStock.d.ts.map