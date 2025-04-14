export declare const MOCK_DATA_BUNDLE: {
    __typename: string;
    id: string;
    sku: string;
    name: string;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    inStock: boolean;
    addToCartAllowed: boolean;
    url: string;
    urlKey: string;
    externalId: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
    options: {
        id: string;
        title: string;
        required: boolean;
        multi: null;
        values: ({
            id: string;
            title: string;
            inStock: boolean;
            __typename: string;
            quantity: number;
            isDefault: boolean;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
                price: {
                    final: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    regular: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    roles: string[];
                };
            };
            enabled?: undefined;
        } | {
            id: string;
            title: string;
            inStock: boolean;
            __typename: string;
            quantity: number;
            isDefault: boolean;
            enabled: boolean;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
                price: {
                    final: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    regular: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    roles: string[];
                };
            };
        })[];
    }[];
    priceRange: {
        maximum: {
            final: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            regular: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            roles: string[];
        };
        minimum: {
            final: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            regular: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            roles: string[];
        };
    };
};
export declare const MOCK_DATA_BUNDLE_TRANSFORMED: {
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
        width: number;
        height: number;
    }[];
    prices: {
        final: {
            amount: number;
            currency: string;
        };
        regular: {
            amount: number;
            currency: string;
        };
        visible: boolean;
    };
    options: {
        id: string;
        type: "text" | "image" | "color" | "dropdown";
        typename: "ProductViewOptionValueProduct" | "ProductViewOptionValueSwatch" | "ProductViewOptionValueConfiguration";
        label: string;
        required: boolean;
        multiple: boolean;
        items: {
            id: string;
            inStock: boolean;
            label: string;
            selected: boolean;
            value: string;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
                price: {
                    final: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    regular: {
                        amount: {
                            value: number;
                            currency: string;
                        };
                    };
                    roles: string[];
                };
            };
        }[];
    }[];
};
//# sourceMappingURL=product-mocks.d.ts.map