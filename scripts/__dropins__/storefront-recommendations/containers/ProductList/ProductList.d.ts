import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { Item, RecommendationUnitModel } from '../../data/models';
import { CurrentProduct } from '../../api/getRecommendationsByUnitIds/getRecommendationsByUnitIds';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    recId: string;
    initialData?: {
        recommendations?: {
            results: RecommendationUnitModel[];
            totalProducts: number;
        };
    };
    hideHeading?: boolean;
    routeProduct?: (item: Item) => string;
    /** @deprecated Pass `currentProduct` with `sku` instead. Kept for backward compatibility. */
    currentSku?: string;
    /** Current product SKU and optional price for recommendation filtering. */
    currentProduct?: CurrentProduct;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
    pagePlacement?: string | '';
    slots?: {
        Heading?: SlotProps;
        Footer?: SlotProps;
        Title?: SlotProps<{
            item: Item;
            productUrl: string;
        }>;
        Sku?: SlotProps<{
            item: Item;
        }>;
        Price?: SlotProps<{
            item: Item;
        }>;
        Thumbnail?: SlotProps<{
            item: any;
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const ProductList: Container<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map