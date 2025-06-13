import { ShippingMethod } from '../../data/models';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsSummaryProps extends HTMLAttributes<HTMLDivElement> {
    onEditClick?: () => void;
    slots?: {
        Heading?: SlotProps;
    };
}
export interface ShippingMethodsSummaryData {
    shippingMethod: ShippingMethod | null;
}
export declare const ShippingMethodsSummary: Container<ShippingMethodsSummaryProps, ShippingMethodsSummaryData>;
//# sourceMappingURL=ShippingMethodsSummary.d.ts.map