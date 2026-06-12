import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes, JSX } from 'preact/compat';
import { ImageNodeRenderProps } from '@dropins/tools/types/elsie/src/components';
import { ProductOptionSelectionMap } from '../../lib/product-option-selection';

export type { ProductOptionSelectionEntry as SelectionEntry, ProductOptionSelectionMap as Selection, } from '../../lib/product-option-selection';
declare const supportedTypes: string[];
type OptionValue = {
    id: string;
    label: string;
    inStock: boolean;
    value: string;
    selected?: boolean;
};
export type Option = {
    id: string;
    type: (typeof supportedTypes)[number];
    label: string;
    required?: boolean;
    multiple?: boolean;
    items: OptionValue[];
};
export interface SwatchesProps extends HTMLAttributes<HTMLDivElement> {
    options: Array<Option>;
    hideSelectedValue?: boolean;
    disablePreselections?: boolean;
    defaultOptions?: string[];
    selectionsToUpdate?: Option[];
    onValues?: (uids: ProductOptionSelectionMap, current: string) => void;
    onErrors?: (errors: {
        [id: string]: string;
    }) => void;
    selectedUIDs?: string[];
    imageSwatchNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
}
export declare const Swatches: FunctionComponent<SwatchesProps>;
//# sourceMappingURL=Swatches.d.ts.map