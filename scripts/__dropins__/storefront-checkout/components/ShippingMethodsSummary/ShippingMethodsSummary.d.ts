import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsSummaryProps extends HTMLAttributes<HTMLDivElement> {
    shippingMethod: {
        label: string;
        description?: string;
    };
    heading?: VNode;
    onEditClick?: () => void;
}
export declare const ShippingMethodsSummary: FunctionComponent<ShippingMethodsSummaryProps>;
export default ShippingMethodsSummary;
//# sourceMappingURL=ShippingMethodsSummary.d.ts.map