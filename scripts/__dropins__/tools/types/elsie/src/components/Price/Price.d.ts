import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PriceProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'size'> {
    amount?: number;
    currency?: string | null;
    locale?: string;
    formatOptions?: {
        [key: string]: any;
    };
    variant?: 'default' | 'strikethrough';
    weight?: 'bold' | 'normal';
    sale?: boolean;
    size?: 'small' | 'medium' | 'large';
}
export declare const Price: FunctionComponent<PriceProps>;
//# sourceMappingURL=Price.d.ts.map