import { HTMLAttributes } from 'preact/compat';
import { FunctionalComponent } from 'preact';
import { Tier } from '../../data/models';

export interface PriceTiersProps extends HTMLAttributes<HTMLDivElement> {
    locale?: string;
    tiers: Tier[];
    regularPrice?: number;
}
export declare const PriceTiers: FunctionalComponent<PriceTiersProps>;
//# sourceMappingURL=PriceTiers.d.ts.map