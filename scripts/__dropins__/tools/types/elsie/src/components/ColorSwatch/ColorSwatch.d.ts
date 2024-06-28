import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ColorSwatchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label' | 'size'> {
    name?: string;
    label?: string;
    groupAriaLabel?: string;
    id?: string;
    size?: 'medium' | 'large';
    color?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    outOfStock?: boolean;
    multi?: boolean;
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const ColorSwatch: FunctionComponent<ColorSwatchProps>;
//# sourceMappingURL=ColorSwatch.d.ts.map