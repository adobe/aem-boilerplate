import { ProductModel } from '../../data/models';

export interface ProductDataItem {
    sku: string;
    optionsUIDs?: string[];
    preselectFirstOption?: boolean;
}
/**
 * Fetches multiple products by SKUs with optional per-product configuration.
 *
 * @example
 * // Basic usage
 * const products = await getProductsData([
 *   { sku: 'SKU001' },
 *   { sku: 'SKU002' }
 * ]);
 *
 * @example
 * // With options
 * const products = await getProductsData([
 *   { sku: 'SKU001', optionsUIDs: ['option1'], preselectFirstOption: true },
 *   { sku: 'SKU002', optionsUIDs: ['option2'] }
 * ]);
 *
 * @example
 * // Get raw data without transformation
 * const rawProducts = await getProductsData([{ sku: 'SKU001' }], true);
 */
export declare const getProductsData: (items: ProductDataItem[], raw?: boolean) => Promise<ProductModel[] | null>;
//# sourceMappingURL=getProductsData.d.ts.map