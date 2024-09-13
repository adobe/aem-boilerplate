import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { State } from '../../reducers';

export interface CartSummaryProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    details: State['details'];
}
export declare const CartSummary: FunctionComponent<CartSummaryProps>;
//# sourceMappingURL=CartSummary.d.ts.map