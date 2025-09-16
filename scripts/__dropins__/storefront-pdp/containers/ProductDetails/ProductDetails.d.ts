import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps, SlotMethod, ResolveImageUrlOptions } from '@dropins/tools/types/elsie/src/lib';
import { ButtonProps } from '@dropins/tools/types/elsie/src/components';
import { ProductModel } from '../../data/models';

type IconType = keyof typeof import('@dropins/tools/types/elsie/src/icons');
/** @deprecated This type is part of the deprecated ProductDetails component. */
export type Values = {
    sku: string;
    quantity: number;
    optionsUIDs?: string[];
    enteredOptions?: Array<{
        uid: string;
        value: string;
    }>;
};
/** @deprecated This type is part of the deprecated ProductDetails component. */
type DefaultSlotContext = {
    data: ProductModel | null;
    values: Values;
    valid: boolean;
};
/** @deprecated This type is part of the deprecated ProductDetails component. */
export type CarouselConfig = {
    controls?: {
        desktop?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
        mobile?: 'dots' | 'thumbnailsRow' | null;
    };
    arrowsOnMainImage?: boolean;
    loopable?: boolean;
    peak?: {
        desktop: boolean;
        mobile: boolean;
    };
    gap?: 'small' | 'medium' | 'large' | null;
    thumbnailsLoadingMode?: 'lazy' | 'eager';
    imageParams?: ResolveImageUrlOptions;
    thumbnailParams?: ResolveImageUrlOptions;
};
/** @deprecated This type is part of the deprecated ProductDetails component. */
export type OptionsConfig = {
    anchorOptions?: string[];
};
/** @deprecated This interface is part of the deprecated ProductDetails component. */
export interface ProductDetailsProps extends HTMLAttributes<HTMLDivElement> {
    sku: string;
    productData?: ProductModel;
    hideSku?: boolean;
    hideQuantity?: boolean;
    hideShortDescription?: boolean;
    hideDescription?: boolean;
    hideAttributes?: boolean;
    hideSelectedOptionValue?: boolean;
    hideURLParams?: boolean;
    slots?: {
        Title?: SlotProps<DefaultSlotContext>;
        SKU?: SlotProps<DefaultSlotContext>;
        RegularPrice?: SlotProps<DefaultSlotContext>;
        SpecialPrice?: SlotProps<DefaultSlotContext>;
        Options?: SlotProps<DefaultSlotContext>;
        Quantity?: SlotProps<DefaultSlotContext>;
        Actions?: SlotProps<DefaultSlotContext & {
            appendButton: SlotMethod<Omit<ButtonProps, 'icon'> & {
                text?: string;
                icon?: IconType;
            }>;
        }>;
        ShortDescription?: SlotProps<DefaultSlotContext>;
        Description?: SlotProps<DefaultSlotContext>;
        Attributes?: SlotProps<DefaultSlotContext>;
        Breadcrumbs?: SlotProps<DefaultSlotContext & {
            setSeparator: SlotMethod<IconType>;
            appendLink: SlotMethod<HTMLAttributes<HTMLAnchorElement> & {
                text?: string;
            }>;
            appendHTMLElement: SlotMethod<HTMLElement>;
        }>;
        GalleryContent?: SlotProps<DefaultSlotContext>;
        InfoContent?: SlotProps<DefaultSlotContext>;
        Content?: SlotProps<DefaultSlotContext>;
    };
    carousel?: CarouselConfig;
    optionsConfig?: OptionsConfig;
    useACDL?: boolean;
    onAddToCart?: (values: Values) => void;
    zoomType?: 'zoom' | 'overlay';
    closeButton?: boolean;
    disableDropdownPreselection?: boolean;
}
/**
 * @deprecated This container has been deprecated and will be removed in a future release.
 * Please use the different composable containers to build your product details page.xs
 */
export declare const ProductDetails: Container<ProductDetailsProps, ProductModel | null>;
export {};
//# sourceMappingURL=ProductDetails.d.ts.map