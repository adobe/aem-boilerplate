import { Option } from '../data/models';

/** Single-select option group (one chosen item UID). */
export type ProductOptionSelectionSingle = {
    label: string;
    value: string;
};
/** Multi-select option group (one or more chosen item UIDs). */
export type ProductOptionSelectionMulti = {
    label: string;
    values: string[];
};
export type ProductOptionSelectionEntry = ProductOptionSelectionSingle | ProductOptionSelectionMulti;
export type ProductOptionSelectionMap = {
    [optionId: string]: ProductOptionSelectionEntry;
};
/**
 * Flatten selection map to UID list. When `optionsOrder` is provided (e.g. `data.options`),
 * UIDs are emitted in that order for stable URLs and API payloads.
 */
export declare function selectionMapToOptionUIDs(selections: ProductOptionSelectionMap, optionsOrder?: Option[]): string[];
/**
 * Whether the shopper has satisfied all option groups for add-to-cart.
 * Bundle multi-select may contribute more than one UID while still satisfying one group.
 */
export declare function isProductOptionsSelectionComplete(options: Option[] | undefined, optionUIDs: string[] | undefined, isBundle: boolean | undefined): boolean;
//# sourceMappingURL=product-option-selection.d.ts.map