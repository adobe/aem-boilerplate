import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface RadioButtonProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    name: string;
    value: string;
    size?: 'medium' | 'large';
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    description?: string;
}
export declare const RadioButton: FunctionComponent<RadioButtonProps>;
//# sourceMappingURL=RadioButton.d.ts.map