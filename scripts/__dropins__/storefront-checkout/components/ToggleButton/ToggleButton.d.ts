import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ToggleButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'icon'> {
    label: string;
    name: string;
    value: string;
    selected: boolean;
    onChange: (value: string) => void;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | VNode<HTMLAttributes<HTMLImageElement>>;
    radioButtonProps?: Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label' | 'name' | 'value' | 'checked' | 'disabled'>;
}
export declare const ToggleButton: FunctionComponent<ToggleButtonProps>;
//# sourceMappingURL=ToggleButton.d.ts.map