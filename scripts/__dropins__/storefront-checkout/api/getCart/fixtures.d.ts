import { Cart } from '../../data/models/cart';
import { ShippingMethod } from '../../data/models/shipping-method';

declare const emptyCart: Cart;
declare const simpleCart: Cart;
declare const simpleCartWithShippingInfo: ({ methods, selection, }?: {
    methods?: ShippingMethod[] | undefined;
    selection?: ShippingMethod | undefined;
}) => Cart;
declare const virtualCart: Cart;
export { emptyCart, virtualCart, simpleCart, simpleCartWithShippingInfo };
//# sourceMappingURL=fixtures.d.ts.map