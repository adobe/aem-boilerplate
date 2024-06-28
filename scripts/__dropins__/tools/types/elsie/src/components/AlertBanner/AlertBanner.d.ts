import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface AlertBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon' | 'action'> {
    variant: 'brand' | 'neutral' | 'success' | 'warning';
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    message: VNode;
    onDismiss: () => void;
    action?: {
        label: string;
        onClick: (event: Event) => void;
    };
}
export declare const AlertBanner: FunctionComponent<AlertBannerProps>;
//# sourceMappingURL=AlertBanner.d.ts.map