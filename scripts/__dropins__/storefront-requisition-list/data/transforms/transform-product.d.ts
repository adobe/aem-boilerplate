import { Product } from '../models/item';

export interface RawProductData {
    __typename: string;
    id: string;
    sku: string;
    name: string;
    shortDescription?: string;
    metaDescription?: string;
    metaKeyword?: string;
    metaTitle?: string;
    description?: string;
    inStock: boolean;
    addToCartAllowed: boolean;
    url?: string;
    urlKey?: string;
    externalId?: string;
    images?: {
        url: string;
        label?: string;
        roles?: string[];
    }[];
    attributes?: {
        name: string;
        label: string;
        value: string;
        roles?: string[];
    }[];
    price?: {
        roles?: string[];
        regular?: {
            amount: {
                value: number;
                currency: string;
            };
        };
        final?: {
            amount: {
                value: number;
                currency: string;
            };
        };
    };
    priceRange?: {
        maximum?: {
            final?: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            regular?: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            roles?: string[];
        };
        minimum?: {
            final?: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            regular?: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            roles?: string[];
        };
    };
    options?: {
        id: string;
        title: string;
        required: boolean;
        multi: boolean;
        values: {
            id: string;
            title: string;
            inStock: boolean;
            __typename: string;
            quantity?: number;
            isDefault?: boolean;
            type?: string;
            value?: string;
            product?: {
                sku: string;
                name: string;
                shortDescription?: string;
                metaDescription?: string;
                metaKeyword?: string;
                metaTitle?: string;
                price?: {
                    final?: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    regular?: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    roles?: string[];
                };
            };
        }[];
    }[];
}
export declare function transformProduct(data: RawProductData): Product;
export declare function transformProducts(products: RawProductData[]): Product[];
//# sourceMappingURL=transform-product.d.ts.map