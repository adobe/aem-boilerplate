import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Order as OrderModel } from '../../data/models';

export interface DetailsProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    orderDetails: OrderModel | null;
}
export declare const Details: FunctionComponent<DetailsProps>;
//# sourceMappingURL=Details.d.ts.map