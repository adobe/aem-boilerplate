import { CartModel, Item } from '../data/models';
import { GiftOptionsDataSourcesProps, GiftOptionsViewProps, GiftWrappingConfigProps, GiftFormDataType, ProductGiftOptionsConfig } from '../types';

interface UseGiftOptionsProps {
    item: Item | ProductGiftOptionsConfig;
    view: GiftOptionsViewProps;
    dataSource: GiftOptionsDataSourcesProps;
    initialLoading: boolean;
    handleItemsLoading?: (uid: string, state: boolean) => void;
    handleItemsError?: (uid: string, message?: string) => void;
    onItemUpdate?: ({ item }: {
        item: Item;
    }) => void;
    onGiftOptionsChange?: (data: GiftFormDataType) => void;
}
export declare const useGiftOptions: ({ item, view, dataSource, initialLoading, handleItemsLoading, handleItemsError, onItemUpdate, onGiftOptionsChange, }: UseGiftOptionsProps) => {
    loading: boolean;
    giftOptions: GiftFormDataType;
    showModal: boolean;
    errorsField: {
        recipientName: string;
        senderName: string;
        message: string;
    };
    updateLoading: boolean;
    cartData: CartModel | null;
    fieldsDisabled: boolean;
    isGiftOptionsApplied: boolean;
    giftWrappingConfig: [] | GiftWrappingConfigProps[];
    setFieldsDisabled: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    handleFormMouseLeave: () => Promise<void>;
    onInputChange: (event: Event) => void;
    updateGiftOptions: (name: string, value: string | boolean | number | undefined, extraGiftOptions?: Record<string, string | boolean | number>) => void;
    setShowModal: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    handleBlur: (event: Event) => Promise<void>;
    isGiftMessageVisible: boolean;
    areGiftOptionsVisible: {
        isGiftReceiptVisible: boolean;
        isPrintedCartVisible: boolean;
        isGiftWrappingVisible: boolean;
        isGiftOptionsVisible: boolean;
    };
    isGiftOptionsHidden: boolean;
};
export {};
//# sourceMappingURL=useGiftOptions.d.ts.map