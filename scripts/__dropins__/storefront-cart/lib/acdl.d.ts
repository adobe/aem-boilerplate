import { CartModel, Item } from '../data/models/cart-model';

/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts
 */
export declare const contexts: {
    SHOPPING_CART_CONTEXT: string;
    PRODUCT_CONTEXT: string;
    CHANGED_PRODUCTS_CONTEXT: string;
    CHANNEL_CONTEXT: string;
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    OPEN_CART: string;
    ADD_TO_CART: string;
    REMOVE_FROM_CART: string;
    SHOPPING_CART_VIEW: string;
    INITIATE_CHECKOUT: string;
};
export declare function getAdobeDataLayer(): any;
export declare function publishOpenCartEvent(cart: CartModel, addedItems: Item[], locale: string): void;
export declare function publishShoppingCartViewEvent(cart: CartModel, locale: string): void;
export declare function publishCartUpdateEvents(cart: CartModel, updatedItems: {
    uid: string;
}[], locale: string): void;
export declare function publishInitiateCheckoutEvent(cart: CartModel, locale?: string): void;
//# sourceMappingURL=acdl.d.ts.map