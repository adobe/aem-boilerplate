import { ShoppingCartContext, ShoppingCartItem } from '../models/acdl-models';
import { CartModel, Item } from '../models/cart-model';

type TransformShoppingCartParams = {
    cart: CartModel;
    locale?: string;
};
export declare function transformShoppingCart(params: TransformShoppingCartParams): ShoppingCartContext;
export declare function transformItems(items: Item[], locale: string): ShoppingCartItem[];
export {};
//# sourceMappingURL=acdl-context.d.ts.map