import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface WishlistAlertProps extends HTMLAttributes<HTMLDivElement> {
    action: 'add' | 'remove' | 'move' | 'addError' | 'removeError';
    item?: {
        product: {
            name: string;
        };
    };
    routeToWishlist?: string;
}
export declare const WishlistAlert: FunctionComponent<WishlistAlertProps>;
//# sourceMappingURL=WishlistAlert.d.ts.map