import { OrderDataModel } from '../../../data/models';
import { TaxTypes } from '../../../types';

type translationsTypes = Record<string, string>;
export declare const Subtotal: ({ translations, order, subtotalInclTax, subtotalExclTax, shoppingOrdersDisplaySubtotal, }: {
    translations: translationsTypes;
    order?: OrderDataModel;
    subtotalInclTax: number;
    subtotalExclTax: number;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}) => import("preact").JSX.Element;
export {};
//# sourceMappingURL=Subtotal.d.ts.map