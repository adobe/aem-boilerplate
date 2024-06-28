import { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'size' | 'icon'> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'medium' | 'large';
    children?: ComponentChildren;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    disabled?: boolean;
    active?: boolean;
    activeChildren?: ComponentChildren;
    activeIcon?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export declare const Button: FunctionComponent<ButtonProps>;
//# sourceMappingURL=Button.d.ts.map