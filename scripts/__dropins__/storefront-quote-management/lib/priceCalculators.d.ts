import { PriceProps } from '@dropins/tools/types/elsie/src/components';
import { NegotiableQuoteCartItem as NegotiableQuoteItemModel, StoreConfigModel } from '../data/models';

export interface PriceCalculatorOptions {
    dictionary: Record<string, string>;
    quoteDisplaySettings?: StoreConfigModel['quoteDisplaySettings'];
}
/**
 * Get price props for an item
 */
export declare const getPriceProps: (item: NegotiableQuoteItemModel, options: PriceCalculatorOptions) => {
    amount: number;
    currency: string;
    style: {
        font: string;
    };
    'data-testid': string;
};
/**
 * Get savings amount props for an item
 */
export declare const getSavingsAmount: (item: NegotiableQuoteItemModel) => {
    amount: number | undefined;
    currency: string | undefined;
    style: {
        font: string;
    };
    'data-testid': string;
};
/**
 * Calculate total price props and discount props for an item
 */
export declare const getTotalPriceProps: (item: NegotiableQuoteItemModel, options: PriceCalculatorOptions) => {
    totalProps: PriceProps & {
        'data-testid'?: string | undefined;
    };
    discountProps: (PriceProps & {
        'data-testid'?: string | undefined;
    }) | null;
};
//# sourceMappingURL=priceCalculators.d.ts.map