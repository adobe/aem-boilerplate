import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export type CartTaxItem = {
    label: string;
    amount: {
        value?: number;
        currency?: string;
    };
};
export type Summary = {
    total: {
        inclTax: {
            amount: number;
            currency: string;
        };
        exclTax?: {
            amount: number;
            currency: string;
        };
    };
    subtotal: {
        amount: number;
        currency: string;
        isTaxIncl: boolean;
    };
    shipping?: {
        amount: number;
        currency: string;
        isVirtual?: boolean;
    };
    tax?: {
        amount: number;
        currency: string;
        breakdown?: CartTaxItem[];
    };
};
export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'summary'> {
    isLoading: boolean;
    summary?: Summary;
    variant?: 'primary' | 'secondary';
}
export declare const OrderSummary: FunctionComponent<OrderSummaryProps>;
//# sourceMappingURL=OrderSummary.d.ts.map