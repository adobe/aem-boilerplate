import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CarouselConfig } from '../../containers';

interface ProductCarouselConfig extends CarouselConfig {
    thumbnails: VNode[];
}
export interface ProductProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: VNode;
    breadcrumbs?: VNode;
    galleryContent?: VNode;
    infoContent?: VNode;
    productContent?: VNode;
    shortDescription?: VNode;
    description?: VNode;
    attributes?: VNode;
    images: VNode[];
    options?: VNode;
    giftCardOptions?: VNode;
    sku?: VNode;
    price?: VNode;
    specialPrice?: VNode;
    outOfStock: boolean;
    actions?: VNode;
    quantity?: VNode;
    carouselConfig?: ProductCarouselConfig;
    zoomType?: 'zoom' | 'overlay';
    closeButton?: boolean;
}
export declare const Product: FunctionComponent<ProductProps>;
export {};
//# sourceMappingURL=Product.d.ts.map