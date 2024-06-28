import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PickerOption {
    value: string | null;
    text?: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    disabled?: boolean;
}
export interface PickerProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'value' | 'size' | 'icon'> {
    id?: string;
    name?: string;
    value?: string | null;
    placeholder?: string;
    variant?: 'primary' | 'secondary';
    size?: 'medium' | 'large';
    floatingLabel?: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    options?: PickerOption[];
    defaultOption?: PickerOption;
    disabled?: boolean;
    error?: boolean;
    handleSelect?: (event: Event) => void;
}
export declare const Picker: FunctionComponent<PickerProps>;
//# sourceMappingURL=Picker.d.ts.map