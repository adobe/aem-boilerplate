import { ProductModel } from '../../data/models';

export declare const getProductData: (sku: string, options?: {
    preselectFirstOption?: boolean;
    optionsUIDs?: string[];
}, raw?: boolean) => Promise<ProductModel | null>;
//# sourceMappingURL=getProductData.d.ts.map