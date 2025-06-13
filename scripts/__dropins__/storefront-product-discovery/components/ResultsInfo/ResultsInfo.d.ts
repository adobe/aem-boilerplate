import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ResultsInfoProps extends HTMLAttributes<HTMLDivElement> {
    searchPhrase?: VNode;
    totalCount?: VNode;
}
export declare const ResultsInfo: FunctionComponent<ResultsInfoProps>;
//# sourceMappingURL=ResultsInfo.d.ts.map