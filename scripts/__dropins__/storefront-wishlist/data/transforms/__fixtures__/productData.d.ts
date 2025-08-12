import { Product } from '../../models/product';

declare const simpleProduct: Product;
declare const configurableProduct: Product;
declare const configuredProduct: Product;
declare const simpleProductDataCS: {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
    prices: {
        regular: {
            amount: number;
            currency: string;
            variant: string;
        };
        final: {
            amount: number;
            currency: string;
            variant: string;
        };
        visible: boolean;
    };
    attributes: {
        id: string;
        label: string;
        value: string;
    }[];
    url: string;
    urlKey: string;
    externalId: string;
    productType: string;
};
declare const configurableProductDataCS: {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
    prices: {
        final: {
            minimumAmount: number;
            maximumAmount: number;
            currency: string;
        };
        visible: boolean;
    };
    attributes: {
        id: string;
        label: string;
        value: string;
    }[];
    options: {
        id: string;
        type: string;
        typename: string;
        label: string;
        required: boolean;
        multiple: null;
        items: {
            id: string;
            inStock: boolean;
            label: string;
            selected: boolean;
            value: string;
        }[];
    }[];
    url: string;
    urlKey: string;
    externalId: string;
    productType: string;
};
declare const configuredProductDataCS: {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
    prices: {
        regular: {
            amount: number;
            currency: string;
            variant: string;
        };
        final: {
            amount: number;
            currency: string;
            variant: string;
        };
        visible: boolean;
    };
    attributes: {
        id: string;
        label: string;
        value: string;
    }[];
    options: {
        id: string;
        type: string;
        typename: string;
        label: string;
        required: boolean;
        multiple: null;
        items: {
            id: string;
            inStock: boolean;
            label: string;
            selected: boolean;
            value: string;
        }[];
    }[];
    optionUIDs: string[];
    url: string;
    urlKey: string;
    externalId: string;
    variantSku: string;
    productType: string;
};
export { simpleProduct, configurableProduct, configuredProduct, simpleProductDataCS, configurableProductDataCS, configuredProductDataCS, };
//# sourceMappingURL=productData.d.ts.map