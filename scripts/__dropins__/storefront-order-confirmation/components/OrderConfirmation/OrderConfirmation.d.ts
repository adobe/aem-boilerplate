import { OrderSearchFields } from '..';
import { State } from '../../reducers/orderConfirmation';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OrderConfirmationProps extends HTMLAttributes<HTMLDivElement> {
    state: State;
    dismissAlert: () => void;
    onOrderSearch: (fields: OrderSearchFields) => void;
    routeHome?: () => string;
    routeSupport?: () => string;
    onSignUpClick?: () => void;
}
export declare const OrderConfirmation: FunctionComponent<OrderConfirmationProps>;
//# sourceMappingURL=OrderConfirmation.d.ts.map