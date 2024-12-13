import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface HeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: VNode;
    sku: VNode;
    hideSku?: boolean;
}
export declare const Header: FunctionComponent<HeaderProps>;
//# sourceMappingURL=Header.d.ts.map