import { OrderDataModel } from '../../../data/models';
import { TaxTypes } from '../../../types';

type translationsTypes = Record<string, string>;
export declare const Shipping: ({ translations, shoppingOrdersDisplayShipping, order, totalShipping, }: {
    totalShipping: number;
    shoppingOrdersDisplayShipping: TaxTypes;
    order: OrderDataModel;
    translations: translationsTypes;
}) => import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=Shipping.d.ts.map