import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface HeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: VNode;
    sku: VNode;
    hideSku?: boolean;
    /** When provided, displayed as variant name (e.g. when all options are selected on a configurable product) */
    variantName?: VNode;
    /** When provided, displayed as variant SKU (e.g. when all options are selected on a configurable product) */
    variantSku?: VNode;
}
export declare const Header: FunctionComponent<HeaderProps>;
//# sourceMappingURL=Header.d.ts.map