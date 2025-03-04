import { WrappingImage, Price } from '../data/models';

export type GiftOptionsReadOnlyViewProps = 'primary' | 'secondary';
export type GiftOptionsViewProps = 'product' | 'order';
export type GiftOptionsDataSourcesProps = 'cart' | 'order';
export type GiftWrappingConfigProps = {
    uid: string;
    design: string;
    selected: boolean;
    image: WrappingImage;
    price: Price;
};
export type GiftFormDataType = {
    giftReceiptIncluded?: boolean;
    printedCardIncluded?: boolean;
    isGiftWrappingSelected?: boolean;
    recipientName?: string;
    senderName?: string;
    message?: string;
    giftWrappingId?: string;
    itemId?: string;
    giftWrappingOptions?: GiftWrappingConfigProps[];
};
export type ProductGiftOptionsConfig = {
    giftWrappingAvailable: boolean;
    giftMessageAvailable: boolean;
    giftWrappingPrice?: Price;
    giftMessage?: {
        recipientName?: string;
        senderName?: string;
        message?: string;
    };
    productGiftWrapping: GiftWrappingConfigProps[];
};
//# sourceMappingURL=giftOptions.types.d.ts.map