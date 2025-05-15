import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Product } from '../../data/models';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    item?: Product;
    onCartActionButtonClick?: () => boolean;
    onTrashButtonClick?: () => boolean;
    fixedProductTaxesEnabled: boolean;
    fixedProductTaxesApply: boolean;
    fixedProductTaxesEnabledDisplayInProductLists?: string;
    fixedProductTaxesEnabledDisplayInSalesModules?: string;
    fixedProductTaxesEnabledDisplayInProductView?: string;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map