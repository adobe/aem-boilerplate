import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { SearchFacet, FacetBucket } from '../../data/models/api';

export interface FacetsProps extends HTMLAttributes<HTMLDivElement> {
    slots?: {
        Facet?: SlotProps<{
            data: SearchFacet;
        }>;
        SelectedFacets?: SlotProps<{
            data: SearchFacet[];
        }>;
        Facets?: SlotProps<{
            data: SearchFacet[];
        }>;
        FacetBucket?: SlotProps<{
            data: FacetBucket;
        }>;
        FacetBucketLabel?: SlotProps<{
            data: FacetBucket;
        }>;
    };
}
export declare const Facets: Container<FacetsProps>;
//# sourceMappingURL=Facets.d.ts.map