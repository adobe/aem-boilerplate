import { OrderDataModel } from '../data/models';

/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts
 */
export declare const contexts: {
    SHOPPING_CART_CONTEXT: string;
    ORDER_CONTEXT: string;
    CHANNEL_CONTEXT: string;
    PERSONAL_EMAIL_CONTEXT: string;
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    PLACE_ORDER: string;
};
export declare function getAdobeDataLayer(): any;
export declare function setChannelContext(): void;
export declare function publishPlaceOrderEvent(cartId: string, data: OrderDataModel): void;
//# sourceMappingURL=acdl.d.ts.map