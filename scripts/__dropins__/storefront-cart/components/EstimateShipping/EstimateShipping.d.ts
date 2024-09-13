import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface EstimateShippingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    countryField?: VNode<HTMLAttributes<HTMLInputElement>>;
    destinationText?: string;
    estimateButton?: VNode<HTMLAttributes<HTMLButtonElement>>;
    estimated?: boolean;
    loading: boolean;
    onEstimate?: (formData: any) => void;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceIncludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    stateField?: VNode<HTMLAttributes<HTMLInputElement>>;
    taxExcluded?: boolean;
    taxIncluded?: boolean;
    zipField?: VNode<HTMLAttributes<HTMLInputElement>>;
}
export declare const EstimateShipping: FunctionComponent<EstimateShippingProps>;
//# sourceMappingURL=EstimateShipping.d.ts.map