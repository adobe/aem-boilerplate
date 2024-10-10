import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    size?: 'medium' | 'large';
    divider?: boolean;
    cta?: VNode;
}
export declare const Header: FunctionComponent<HeaderProps>;
//# sourceMappingURL=Header.d.ts.map