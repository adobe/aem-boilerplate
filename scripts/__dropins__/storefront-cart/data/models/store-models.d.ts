import { Price } from './cart-model';

export interface StoreConfigModel {
    displayMiniCart: boolean;
    miniCartMaxItemsDisplay: number;
    cartExpiresInDays: number;
    cartSummaryDisplayTotal: number;
    cartSummaryMaxItems: number;
    defaultCountry: string;
    categoryFixedProductTaxDisplaySetting: string;
    productFixedProductTaxDisplaySetting: string;
    salesFixedProductTaxDisplaySetting: string;
    shoppingCartDisplaySetting: {
        fullSummary: boolean;
        grandTotal: boolean;
        price: number | string;
        shipping: number | string;
        subtotal: number | string;
        taxGiftWrapping: number | string;
        zeroTax: boolean;
    };
    useConfigurableParentThumbnail: boolean;
    allowGiftWrappingOnOrder: boolean | null;
    allowGiftWrappingOnOrderItems: boolean | null;
    allowGiftMessageOnOrder: boolean | null;
    allowGiftMessageOnOrderItems: boolean | null;
    allowGiftReceipt: boolean;
    allowPrintedCard: boolean;
    printedCardPrice: Price;
    cartGiftWrapping: string;
    cartPrintedCard: string;
}
//# sourceMappingURL=store-models.d.ts.map