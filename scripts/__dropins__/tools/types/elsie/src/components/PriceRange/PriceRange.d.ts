import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PriceRangeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    locale?: string;
    currency?: string;
    amount?: number;
    variant?: 'default' | 'strikethrough';
    minimumAmount?: number;
    maximumAmount?: number;
    display?: 'dash' | 'from to' | 'as low as';
    size?: 'small' | 'medium' | 'large';
    specialPrice?: number;
    sale?: boolean;
}
export declare const PriceRange: FunctionComponent<PriceRangeProps>;
//# sourceMappingURL=PriceRange.d.ts.map