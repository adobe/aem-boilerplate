import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface InLineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    variant?: 'primary' | 'secondary';
    heading: string;
    description?: string;
    type?: 'error' | 'warning' | 'success';
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    additionalActions?: Array<{
        label: string;
        onClick: (event: Event) => void;
    }>;
    onDismiss?: (event: Event) => void;
    itemList?: VNode;
    actionButtonPosition?: 'top' | 'bottom';
}
export declare const InLineAlert: FunctionComponent<InLineAlertProps>;
//# sourceMappingURL=InLineAlert.d.ts.map