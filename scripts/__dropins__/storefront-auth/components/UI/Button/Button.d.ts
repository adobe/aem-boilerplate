import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ButtonProps {
    type: 'submit' | 'button';
    variant?: 'primary' | 'secondary' | 'tertiary';
    className?: string;
    buttonText: string;
    enableLoader?: boolean;
    onClick?: (event: MouseEvent) => void;
    style?: Record<string, string | number>;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    disabled?: boolean;
}
export declare const Button: FunctionComponent<ButtonProps>;
//# sourceMappingURL=Button.d.ts.map