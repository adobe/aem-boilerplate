import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CouponsProps extends HTMLAttributes<HTMLDivElement> {
    couponCodeField?: VNode<HTMLAttributes<HTMLInputElement>>;
    applyCouponsButton?: VNode<HTMLAttributes<HTMLButtonElement>>;
    appliedCoupons?: VNode<HTMLAttributes<HTMLDivElement>>;
    onApplyCoupon?: (formData: any) => void;
}
export declare const Coupons: FunctionComponent<CouponsProps>;
//# sourceMappingURL=Coupons.d.ts.map