import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
    name: string;
    size?: 'medium' | 'large';
    disabled?: boolean;
    error?: boolean;
    label?: string | VNode | VNode[];
    description?: string | VNode | VNode[];
}
export declare const Checkbox: FunctionComponent<CheckboxProps>;
//# sourceMappingURL=Checkbox.d.ts.map