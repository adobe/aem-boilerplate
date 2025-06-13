import { FunctionalComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface SummaryProps extends HTMLAttributes<HTMLDivElement> {
    heading?: VNode;
    onEditClick?: () => void;
}
export declare const Summary: FunctionalComponent<SummaryProps>;
export default Summary;
//# sourceMappingURL=Summary.d.ts.map