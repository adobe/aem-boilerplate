import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TermsAndConditionsProps extends HTMLAttributes<HTMLFormElement> {
    agreements?: VNode;
    error?: string;
    isInitialized?: boolean;
}
export declare const TermsAndConditions: FunctionComponent<TermsAndConditionsProps>;
//# sourceMappingURL=TermsAndConditions.d.ts.map