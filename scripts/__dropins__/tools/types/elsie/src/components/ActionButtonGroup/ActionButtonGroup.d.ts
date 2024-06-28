import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ActionButtonProps } from '../ActionButton';

export interface ActionButtonGroupOption {
    value: string | null;
    text: string;
    icon?: VNode<SVGElement>;
    disabled?: boolean;
}
export interface ActionButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary';
    activeOption?: string;
    disabled?: boolean;
    dividers?: boolean;
    children: VNode<ActionButtonProps>[] | VNode<ActionButtonProps>;
    handleSelect?(value: string): void;
}
export declare const ActionButtonGroup: FunctionComponent<ActionButtonGroupProps>;
//# sourceMappingURL=ActionButtonGroup.d.ts.map