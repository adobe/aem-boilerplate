import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface RadioButtonProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label' | 'icon'> {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    name: string;
    value: string;
    size?: 'medium' | 'large';
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    description?: string;
    busy?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | VNode<HTMLAttributes<HTMLImageElement>>;
}
export declare const RadioButton: FunctionComponent<RadioButtonProps>;
//# sourceMappingURL=RadioButton.d.ts.map