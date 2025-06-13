import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { Item, RecommendationUnitModel } from '../../data/models';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    footer?: any;
    initialData?: {
        recommendations?: {
            results: RecommendationUnitModel[];
            totalProducts: number;
        };
    };
    hideHeading?: boolean;
    routeProduct?: (item: Item) => string;
    currentSku?: string;
    pageType: string;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
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