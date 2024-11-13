import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export type AdditionalActionsAlertProps = Array<{
    label: string;
    onClick: (event: Event) => void;
}>;
export interface InLineAlertProps {
    type: 'success' | 'warning' | 'error';
    heading: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export type statusTypes = '' | 'success' | 'error' | 'pending';
//# sourceMappingURL=notification.types.d.ts.map