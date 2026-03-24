import { HTMLAttributes } from 'preact/compat';
import { Container, ResolveImageUrlOptions, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { ProductModel } from '../../data/models/product-model';

type DefaultSlotContext = {
    data: ProductModel | null;
};
export interface ProductGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    scope?: string;
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
    videos?: boolean | {
        position: 'first' | 'last';
    };
    slots?: {
        CarouselThumbnail?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
            mediaType?: 'image' | 'video';
            previewUrl?: string;
        }>;
        CarouselMainImage?: SlotProps<DefaultSlotContext & {
            defaultImageProps: ImageProps;
            mediaType?: 'image' | 'video';
            previewUrl?: string;
        }>;
    };
}
export declare const ProductGallery: Container<ProductGalleryProps, ProductModel | null>;
export {};
//# sourceMappingURL=ProductGallery.d.ts.map