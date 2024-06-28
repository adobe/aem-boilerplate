export interface ProductModel {
    name: string;
    sku: string;
    addToCartAllowed: boolean;
    inStock: boolean | null;
    shortDescription?: string;
    metaDescription?: string;
    metaKeyword?: string;
    metaTitle?: string;
    description?: string;
    images?: Image[];
    prices: Prices;
    attributes?: Attribute[];
    options?: Option[];
    optionUIDs?: string[];
    url?: string;
    urlKey?: string;
    externalId?: string;
    externalParentId?: string;
    variantSku?: string;
}
interface Image {
    url: string;
    label: string;
    width: number;
    height: number;
}
interface Price {
    amount?: number;
    currency?: string;
    maximumAmount?: number;
    minimumAmount?: number;
    variant?: 'default' | 'strikethrough';
}
interface Prices {
    regular: Price;
    final: Price;
    visible: boolean;
}
interface Option {
    id: string;
    type: 'text' | 'image' | 'color';
    typename: 'ProductViewOptionValueProduct' | 'ProductViewOptionValueSwatch' | 'ProductViewOptionValueConfiguration';
    label: string;
    required: boolean;
    multiple: boolean;
    items: OptionValue[];
}
interface OptionValue {
    id: string;
    label: string;
    inStock: boolean;
    value: string;
    selected: boolean;
}
interface Attribute {
    label: string;
    value: string;
}
export {};
//# sourceMappingURL=product-model.d.ts.map