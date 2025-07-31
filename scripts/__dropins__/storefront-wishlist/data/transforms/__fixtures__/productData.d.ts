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
declare const simpleProductDataAC: {
    __typename: string;
    uid: string;
    sku: string;
    name: string;
    description: {
        html: string;
    };
    meta_description: null;
    meta_keyword: null;
    meta_title: null;
    short_description: {
        html: string;
    };
    thumbnail: {
        url: string;
        label: string;
    };
    url_key: string;
    categories: {
        url_path: string;
        url_key: string;
        name: string;
    }[];
    stock_status: string;
    canonical_url: null;
    custom_attributesV2: {
        items: {
            code: string;
            selected_options: {
                value: string;
                label: string;
            }[];
        }[];
    };
    price_range: {
        minimum_price: {
            regular_price: {
                value: number;
                currency: string;
            };
            final_price: {
                value: number;
                currency: string;
            };
            discount: {
                percent_off: number;
                amount_off: number;
            };
            fixed_product_taxes: never[];
        };
        maximum_price: {
            regular_price: {
                value: number;
                currency: string;
            };
            final_price: {
                value: number;
                currency: string;
            };
            discount: {
                percent_off: number;
                amount_off: number;
            };
            fixed_product_taxes: never[];
        };
    };
    options: null;
};
declare const configurableProductDataAC: Product;
declare const configuredProductDataAC: {};
export { simpleProduct, configurableProduct, configuredProduct, simpleProductDataAC, simpleProductDataCS, configurableProductDataAC, configurableProductDataCS, configuredProductDataCS, configuredProductDataAC, };
//# sourceMappingURL=productData.d.ts.map