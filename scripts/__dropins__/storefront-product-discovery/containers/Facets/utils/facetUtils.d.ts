import { SearchFacet } from '../../../data/models/api';
import { Product } from '../../../data/models/product';

declare const getFilterSelection: (facet: SearchFacet) => {
    attribute: string;
    range: {
        from: number | undefined;
        to: number | undefined;
    };
} | {
    attribute: string;
    in: string[];
} | null | undefined;
declare const getCurrencyType: (items: Product[]) => string;
declare const getBucketLabel: (bucket: any, facet: SearchFacet, currency: string | null) => any;
export { getBucketLabel, getCurrencyType, getFilterSelection };
//# sourceMappingURL=facetUtils.d.ts.map