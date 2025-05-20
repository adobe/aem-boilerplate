import { Cart } from '../../data/models/cart';
import { ShippingMethod } from '../../data/models/shipping-method';

declare const emptyCart: Cart;
declare const simpleCart: Cart;
declare const guestCart: Cart;
declare const cartWithShippingInfo: ({ methods, selection, }?: {
    methods?: ShippingMethod[] | undefined;
    selection?: ShippingMethod | undefined;
}) => Cart;
declare const virtualCart: Cart;
export { cartWithShippingInfo, emptyCart, guestCart, simpleCart, virtualCart };
//# sourceMappingURL=cart.d.ts.map