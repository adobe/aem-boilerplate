import { SearchInputUnit } from './acdl';

export interface Product {
    id: string;
    name: string;
    sku: string;
    shortDescription: string;
    url: string;
    urlKey: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    lowStock: boolean;
    links: any[];
    images: ProductImage[];
    description: string;
    externalId: string;
    inputOptions: any[];
    addToCartAllowed: boolean;
    price?: ProductViewPrice;
    priceRange?: {
        minimum: ProductViewPrice;
        maximum: ProductViewPrice;
    };
    inStock: boolean;
    typename: string;
    initialized?: boolean;
}
export interface ProductViewPrice {
    final: ProductPrice;
    regular: ProductPrice;
    roles?: string[];
}
export interface ProductPrice {
    amount: {
        value: number;
        currency: string;
    };
}
export interface ProductImage {
    label: string;
    roles: string[];
    url: string;
}
export interface SearchInputRequest {
    phrase: SearchInputUnit['phrase'];
}
export interface SearchInputResult {
    result: Product[];
    request: SearchInputRequest;
}
export interface SearchInputError {
    error: Error;
    request: SearchInputRequest;
}
//# sourceMappingURL=product.d.ts.map