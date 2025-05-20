import { HTMLAttributes } from 'preact/compat';
import { Container, ResolveImageUrlOptions, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
import { ImageProps } from '../../../@adobe-commerce/elsie/src/components';
import { ProductModel } from '../../data/models/product-model';

type DefaultSlotContext = {
    data: ProductModel | null;
};
export interface ProductGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    loop?: boolean;
    peak?: boolean;
    gap?: 'small' | 'medium' | 'large' | null;
    arrows?: boolean;
    arrowsOnMainImage?: boolean;
    imageParams?: ResolveImageUrlOptions;
    thumbnailParams?: ResolveImageUrlOptions;
    zoom?: {
        closeButton: boolean;
    } | boolean;
    slots?: {
        CarouselThumbnail?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
        }>;
        CarouselMainImage?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const ProductGallery: Container<ProductGalleryProps, ProductModel | null>;
export {};
//# sourceMappingURL=ProductGallery.d.ts.map