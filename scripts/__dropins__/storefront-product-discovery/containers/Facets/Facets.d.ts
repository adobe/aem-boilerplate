import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface FacetsProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        Facet?: SlotProps;
        SelectedFacets?: SlotProps;
        Facets?: SlotProps;
    };
}
export declare const Facets: Container<FacetsProps>;
//# sourceMappingURL=Facets.d.ts.map