import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
    name: string;
    size?: 'medium' | 'large';
    disabled?: boolean;
    error?: boolean;
    label?: string;
    description?: string;
}
export declare const Checkbox: FunctionComponent<CheckboxProps>;
//# sourceMappingURL=Checkbox.d.ts.map