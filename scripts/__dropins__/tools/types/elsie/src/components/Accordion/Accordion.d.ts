import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { IconNode } from '..';

export interface AccordionSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    actionIconPosition?: 'left' | 'right';
    iconOpen?: IconNode;
    iconClose?: IconNode;
    iconLeft?: IconNode;
    showIconLeft?: boolean;
    secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
    renderContentWhenClosed?: boolean;
    onStateChange?: (open: boolean) => void;
}
export declare const AccordionSection: FunctionComponent<AccordionSectionProps>;
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    actionIconPosition?: 'left' | 'right';
    iconOpen?: IconNode;
    iconClose?: IconNode;
    iconLeft?: IconNode;
    showIconLeft?: boolean;
    secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
    children: VNode<AccordionSectionProps>[] | VNode<AccordionSectionProps>;
}
export declare const Accordion: FunctionComponent<AccordionProps>;
//# sourceMappingURL=Accordion.d.ts.map