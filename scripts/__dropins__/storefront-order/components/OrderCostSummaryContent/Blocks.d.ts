import { OrderDataModel } from '../../data/models';
import { TaxTypes } from '../../types';

type translationsTypes = Record<string, string>;
export declare const Subtotal: ({ translations, order, subTotalValue, shoppingOrdersDisplaySubtotal, }: {
    translations: translationsTypes;
    order?: OrderDataModel | undefined;
    subTotalValue: number;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}) => import("preact").JSX.Element;
export declare const Shipping: ({ translations, shoppingOrdersDisplayShipping, order, totalShipping, }: {
    totalShipping: number;
    shoppingOrdersDisplayShipping: TaxTypes;
    order: OrderDataModel;
    translations: translationsTypes;
}) => import("preact").JSX.Element;
export declare const Discounts: ({ translations, order, totalGiftcardValue, totalGiftcardCurrency, }: {
    totalGiftcardValue: number;
    totalGiftcardCurrency: string;
    order: OrderDataModel;
    translations: translationsTypes;
}) => import("preact").JSX.Element | null;
export declare const Coupons: ({ order }: {
    order: OrderDataModel;
}) => import("preact").JSX.Element;
export declare const AccordionTax: ({ translations, renderTaxAccordion, totalAccordionTaxValue, order, }: {
    translations: translationsTypes;
    order: OrderDataModel;
    renderTaxAccordion: boolean;
    totalAccordionTaxValue: number;
}) => import("preact").JSX.Element;
export declare const Total: ({ translations, shoppingOrdersDisplaySubtotal, order, }: {
    translations: translationsTypes;
    order?: OrderDataModel | undefined;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}) => import("preact").JSX.Element;
export {};
//# sourceMappingURL=Blocks.d.ts.map