import { FunctionComponent, JSX } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ImageNodeRenderProps } from '../../../@adobe-commerce/elsie/src/components';
import { Item, Product } from '../../data/models';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    item?: Item;
    onCartActionButtonClick?: () => boolean;
    onTrashButtonClick?: () => boolean;
    fixedProductTaxesEnabled: boolean;
    fixedProductTaxesApply: boolean;
    fixedProductTaxesEnabledDisplayInProductLists?: string;
    fixedProductTaxesEnabledDisplayInSalesModules?: string;
    fixedProductTaxesEnabledDisplayInProductView?: string;
    routeProdDetailPage: (product: Product) => string;
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map