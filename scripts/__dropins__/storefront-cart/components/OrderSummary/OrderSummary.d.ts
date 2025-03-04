import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { JSXInternal } from 'preact/src/jsx';

export interface OrderSummaryLineItem {
    key: string;
    title?: string;
    className?: string;
    sortOrder: number;
    content: string | JSXInternal.Element | VNode<HTMLAttributes<HTMLDivElement>> | OrderSummaryLineItem[] | undefined;
}
export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    variant?: 'primary' | 'secondary';
    heading?: VNode<HTMLAttributes<HTMLDivElement>>;
    loading?: boolean;
    subTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        taxIncluded?: boolean;
        taxExcluded?: boolean;
        zeroTaxSubtotal?: boolean;
    };
    shipping?: VNode<HTMLAttributes<HTMLDivElement>>;
    discounts?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        caption?: VNode<HTMLAttributes<HTMLDivElement>>;
        coupon?: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    taxTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
    };
    taxesApplied?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    total?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
        priceWithoutTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    printedCard?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    itemsGiftWrapping?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    orderGiftWrapping?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    primaryAction?: VNode<HTMLAttributes<HTMLButtonElement>>;
    coupons?: VNode<HTMLAttributes<HTMLDivElement>>;
    giftCards?: VNode<HTMLAttributes<HTMLDivElement>>;
    totalSaved?: VNode<HTMLAttributes<HTMLSpanElement>>;
    appliedGiftCards?: {
        label: VNode<HTMLAttributes<HTMLSpanElement>> | string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        content?: VNode[];
    };
    updateLineItems?: (lineItems: Array<OrderSummaryLineItem>) => Array<OrderSummaryLineItem>;
}
export declare const OrderSummary: FunctionComponent<OrderSummaryProps>;
//# sourceMappingURL=OrderSummary.d.ts.map