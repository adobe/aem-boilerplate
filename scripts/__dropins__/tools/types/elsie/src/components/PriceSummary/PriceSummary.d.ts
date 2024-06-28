import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PriceSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    heading: string;
    loading?: boolean;
    total?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
        priceWithoutTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    subTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        taxIncluded?: boolean;
        taxExcluded?: boolean;
        zeroTaxSubtotal?: boolean;
    };
    shipping?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
        taxIncluded?: boolean;
        taxExcluded?: boolean;
        priceIncludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        countryField?: VNode<HTMLAttributes<HTMLInputElement>>;
        stateField?: VNode<HTMLAttributes<HTMLInputElement>>;
        zipField?: VNode<HTMLAttributes<HTMLInputElement>>;
        destinationText?: string;
        onEstimate?: (formData: any) => void;
        estimateButton?: VNode<HTMLAttributes<HTMLButtonElement>>;
    };
    taxTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
    };
    taxesApplied?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    discounts?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        caption?: VNode<HTMLAttributes<HTMLDivElement>>;
    }[];
    primaryAction?: VNode<HTMLAttributes<HTMLButtonElement>>;
}
export declare const PriceSummary: FunctionComponent<PriceSummaryProps>;
//# sourceMappingURL=PriceSummary.d.ts.map