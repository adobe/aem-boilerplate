import { Cart } from '../../data/models/cart';

type CartData = Cart | null;
export declare function isVirtualCart(data?: CartData): boolean;
export declare function isEmptyCart(data: CartData): boolean;
export declare function getCartShippingMethod(data: CartData): import('../../data/models/shipping-method').ShippingMethod | null | undefined;
export declare function getCartAddress(data: CartData, type?: 'shipping' | 'billing'): Record<string, any> | null;
export declare function getCartPaymentMethod(data: CartData): import('../../data/models/payment-method').PaymentMethod | null | undefined;
export {};
//# sourceMappingURL=events.d.ts.map