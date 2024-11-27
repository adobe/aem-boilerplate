import { HTMLAttributes } from 'preact/compat';
import { Container, ResolveImageUrlOptions } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models/product-model';

export interface ProductGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    loop?: boolean;
    peak?: boolean;
    gap?: 'small' | 'medium' | 'large' | null;
    arrows?: boolean;
    imageParams?: ResolveImageUrlOptions;
    thumbnailParams?: ResolveImageUrlOptions;
    zoom?: {
        closeButton: boolean;
    } | boolean;
}
export declare const ProductGallery: Container<ProductGalleryProps, ProductModel | null>;
//# sourceMappingURL=ProductGallery.d.ts.map