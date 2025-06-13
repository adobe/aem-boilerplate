import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface LoginFormSummaryProps extends HTMLAttributes<HTMLDivElement> {
    heading?: VNode;
    email: string;
    onEditClick?: () => void;
}
export declare const LoginFormSummary: FunctionComponent<LoginFormSummaryProps>;
//# sourceMappingURL=LoginFormSummary.d.ts.map