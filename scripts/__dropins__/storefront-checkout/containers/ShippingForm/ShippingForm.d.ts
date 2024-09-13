import { PreselectedAddressFields } from '..';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingFormProps extends HTMLAttributes<HTMLDivElement> {
    onCheckoutDataUpdate?: () => Promise<void>;
    preselectedFields?: PreselectedAddressFields;
}
export declare const ShippingForm: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & ShippingFormProps): import("preact/compat").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=ShippingForm.d.ts.map