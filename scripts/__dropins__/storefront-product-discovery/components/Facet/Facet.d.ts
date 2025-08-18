import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FacetProps extends HTMLAttributes<HTMLDivElement> {
    numberOfOptionsConfig?: number;
    header: VNode;
    buckets: VNode[];
    last?: boolean;
}
export declare const Facet: FunctionComponent<FacetProps>;
//# sourceMappingURL=Facet.d.ts.map