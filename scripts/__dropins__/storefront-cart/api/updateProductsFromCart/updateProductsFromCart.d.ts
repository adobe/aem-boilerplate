import { CartModel } from '../../data/models';

type UpdateProductsFromCart = Array<{
    uid: string;
    quantity: number;
}>;
export declare const updateProductsFromCart: (items: UpdateProductsFromCart) => Promise<CartModel | null>;
export {};
//# sourceMappingURL=updateProductsFromCart.d.ts.map