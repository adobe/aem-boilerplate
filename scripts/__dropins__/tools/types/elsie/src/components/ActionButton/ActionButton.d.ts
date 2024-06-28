import { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ActionButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'icon'> {
    children?: ComponentChildren;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    active?: boolean;
    disabled?: boolean;
}
export declare const ActionButton: FunctionComponent<ActionButtonProps>;
//# sourceMappingURL=ActionButton.d.ts.map