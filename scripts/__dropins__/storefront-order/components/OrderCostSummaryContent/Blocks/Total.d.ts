import { OrderDataModel } from '../../../data/models';
import { TaxTypes } from '../../../types';

type translationsTypes = Record<string, string>;
export declare const Total: ({ translations, shoppingOrdersDisplaySubtotal, order, }: {
    translations: translationsTypes;
    order?: OrderDataModel;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}) => import("preact").JSX.Element;
export {};
//# sourceMappingURL=Total.d.ts.map