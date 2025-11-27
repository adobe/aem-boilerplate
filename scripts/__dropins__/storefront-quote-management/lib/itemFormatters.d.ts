import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartItemModel as NegotiableQuoteItemModel, StoreConfigModel } from '../data/models';
import { SwitchableAttributes } from '../containers/QuoteSummaryList/QuoteSummaryList';

export interface ItemFormatterOptions {
    attributesToHide: SwitchableAttributes[];
    routeProduct?: (item: NegotiableQuoteItemModel) => string;
    slots?: {
        Thumbnail?: SlotProps<{
            item: NegotiableQuoteItemModel;
            defaultImageProps: ImageProps;
        }>;
        ProductAttributes?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
    };
    dictionary: Record<string, string>;
    quoteDisplaySettings?: StoreConfigModel['quoteDisplaySettings'];
}
/**
 * Get image component for an item
 */
export declare const getImage: (item: NegotiableQuoteItemModel, index: number, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
/**
 * Get title component for an item
 */
export declare const getTitle: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
/**
 * Get SKU component for an item
 */
export declare const getSku: (item: NegotiableQuoteItemModel) => import("preact").JSX.Element;
/**
 * Get product attributes slot for an item
 */
export declare const getProductAttributes: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element;
/**
 * Get configurations for an item (bundle, configurable, customizable options)
 */
export declare const getConfigurations: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => {
    [x: string]: any;
} | undefined;
/**
 * Get total excluding tax component for an item
 */
export declare const getTotalExcludingTax: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
//# sourceMappingURL=itemFormatters.d.ts.map