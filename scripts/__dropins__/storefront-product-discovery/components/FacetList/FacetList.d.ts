import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FacetListProps extends HTMLAttributes<HTMLDivElement> {
    selectedFacets: VNode;
    facets: VNode;
}
export declare const FacetList: FunctionComponent<FacetListProps>;
//# sourceMappingURL=FacetList.d.ts.map