import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    success?: string;
    disabled?: boolean;
    children?: VNode;
    size?: 'medium' | 'large';
}
export declare const Field: FunctionComponent<FieldProps>;
//# sourceMappingURL=Field.d.ts.map