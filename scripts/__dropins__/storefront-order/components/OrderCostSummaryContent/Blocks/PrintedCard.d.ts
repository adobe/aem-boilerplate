import { OrderDataModel } from '../../../data/models';
import { TaxTypes } from '../../../types';

type translationsTypes = Record<string, string>;
export declare const PrintedCard: ({ translations, order, salesPrintedCard, }: {
    translations: translationsTypes;
    order?: OrderDataModel;
    salesPrintedCard?: TaxTypes;
}) => import("preact").JSX.Element | null;
export {};
//# sourceMappingURL=PrintedCard.d.ts.map