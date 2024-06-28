import { HTMLAttributes } from 'preact/compat';
import { FunctionalComponent } from 'preact';

export interface PriceRangeProps extends HTMLAttributes<HTMLDivElement> {
    locale?: string;
    variant?: 'default' | 'strikethrough';
    currency?: string;
    amount?: number;
    sale?: boolean;
    minimumAmount?: number;
    maximumAmount?: number;
}
export declare const PriceRange: FunctionalComponent<PriceRangeProps>;
//# sourceMappingURL=PriceRange.d.ts.map