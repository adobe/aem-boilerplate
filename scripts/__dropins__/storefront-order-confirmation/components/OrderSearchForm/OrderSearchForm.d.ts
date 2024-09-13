import { InLineAlertProps } from '@dropins/tools/types/elsie/src/components/InLineAlert/InLineAlert';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OrderSearchFields {
    email: string;
    number: string;
    postcode?: string;
}
export interface OrderSearchFormProps extends HTMLAttributes<HTMLDivElement> {
    alert?: InLineAlertProps;
    onOrderSearch?: (fields: OrderSearchFields) => void;
}
export declare const OrderSearchForm: FunctionComponent<OrderSearchFormProps>;
//# sourceMappingURL=OrderSearchForm.d.ts.map