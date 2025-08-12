import { CartModel } from '../../data/models';

export declare const addProductsToCart: (items: {
    sku: string;
    parentSku?: string;
    quantity: number;
    optionsUIDs?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    customFields?: Record<string, any>;
}[]) => Promise<CartModel | null>;
//# sourceMappingURL=addProductsToCart.d.ts.map