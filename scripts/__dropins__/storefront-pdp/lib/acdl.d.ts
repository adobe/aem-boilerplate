import { ProductModel } from '../data/models';

/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts
 */
export declare const contexts: {
    PRODUCT_CONTEXT: string;
    CHANNEL_CONTEXT: string;
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    PRODUCT_PAGE_VIEW: string;
};
export declare function getAdobeDataLayer(): any;
export declare function getChannelContext(): {
    _id: string;
    _type: string;
};
export declare function setChannelContext(): void;
export declare function publishProductPageViewEvent(product: ProductModel): void;
//# sourceMappingURL=acdl.d.ts.map