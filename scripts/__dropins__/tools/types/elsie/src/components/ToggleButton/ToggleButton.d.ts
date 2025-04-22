import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ToggleButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'icon' | 'label'> {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    name: string;
    value: string;
    busy?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | VNode<HTMLAttributes<HTMLImageElement>>;
    onChange?: (value: string) => void;
    selected?: boolean;
}
export declare const ToggleButton: FunctionComponent<ToggleButtonProps>;
//# sourceMappingURL=ToggleButton.d.ts.map