import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TermsAndConditionsProps extends HTMLAttributes<HTMLFormElement> {
    agreements?: VNode;
    error?: string;
}
export declare const TermsAndConditions: FunctionComponent<TermsAndConditionsProps & import('..').ConditionalProps>;
//# sourceMappingURL=TermsAndConditions.d.ts.map