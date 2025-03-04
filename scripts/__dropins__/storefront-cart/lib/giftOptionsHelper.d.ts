import { CartModel, Item } from '../data/models';
import { GiftWrappingConfigProps, GiftOptionsViewProps, ProductGiftOptionsConfig } from '../types';

export declare const DEFAULT_FORM_STATE: {
    recipientName: string;
    senderName: string;
    message: string;
};
export declare const DEFAULT_CHECKBOXES_STATE: {
    giftReceiptIncluded: boolean;
    printedCardIncluded: boolean;
    isGiftWrappingSelected: boolean;
};
export declare const shouldShowGiftMessage: (item: CartModel['items'][0] | ProductGiftOptionsConfig, isProductView: boolean) => boolean;
export declare const getSelectedGiftWrapping: (giftWrappingOptions: GiftWrappingConfigProps[] | [
]) => GiftWrappingConfigProps | undefined;
export declare const areGiftOptionsDisabled: (view: GiftOptionsViewProps, item: Item | ProductGiftOptionsConfig) => boolean;
//# sourceMappingURL=giftOptionsHelper.d.ts.map