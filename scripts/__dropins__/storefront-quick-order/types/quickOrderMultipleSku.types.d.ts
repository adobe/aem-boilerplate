import { SlotProps } from '@dropins/tools/types/elsie/src/lib/slot';

export type SubmitSkuValue = Array<{
    sku: string;
    quantity: number;
}>;
type DefaultSlotContext = {
    handleAddToList: (values: SubmitSkuValue) => void;
    loading: boolean;
    textAreaValue: string;
};
export interface QuickOrderMultipleSkuProps {
    className?: string;
    onChange?: (skus: string[]) => void;
    slots?: {
        AddToListButton?: SlotProps<DefaultSlotContext>;
    };
}
export interface SkuListInputProps {
    t: Record<string, string>;
    onChange: (e: Event) => void;
    textAreaValue: string;
    loading: boolean;
    disabled?: boolean;
}
export interface UseQuickOrderMultipleSkuProps extends Omit<QuickOrderMultipleSkuProps, 'className'> {
}
export interface UseQuickOrderMultipleSkuReturn {
    handleChange: (e: Event) => void;
    textAreaValue: string;
    loading: boolean;
    handleAddToList: (values?: SubmitSkuValue) => void;
}
export {};
//# sourceMappingURL=quickOrderMultipleSku.types.d.ts.map