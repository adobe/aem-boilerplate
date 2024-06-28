import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps, SlotMethod, ResolveImageUrlOptions } from '@dropins/tools/types/elsie/src/lib';
import { ButtonProps } from '@dropins/tools/types/elsie/src/components';
import { ProductModel } from '../../data/models';

type IconType = keyof typeof import('@dropins/tools/types/elsie/src/icons');
type Values = {
    sku: string;
    quantity: number;
    optionsUIDs?: string[];
};
type DefaultSlotContext = {
    data: ProductModel | null;
    values: Values;
    valid: boolean;
};
export type CarouselConfig = {
    mobile?: boolean;
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    arrowsOnMainImage?: boolean;
    loopable?: boolean;
    peak?: {
        mobile: boolean;
        desktop: boolean;
    };
    gap?: 'small' | 'medium' | 'large' | null;
    thumbnailsLoadingMode?: 'lazy' | 'eager';
    imageParams?: ResolveImageUrlOptions;
    thumbnailParams?: ResolveImageUrlOptions;
};
export type OptionsConfig = {
    anchorOptions?: string[];
};
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
}
export declare const ProductDetails: Container<ProductDetailsProps, ProductModel | null>;
export {};
//# sourceMappingURL=ProductDetails.d.ts.map