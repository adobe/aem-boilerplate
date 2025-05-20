import { StateUpdater, Dispatch } from 'preact/hooks';
import { FunctionComponent, JSX, VNode } from 'preact';
import { ImageNodeRenderProps } from '@dropins/tools/types/elsie/src/components';
import { GiftWrappingConfigProps, GiftOptionsViewProps, GiftFormDataType, GiftOptionsReadOnlyViewProps, ProductGiftOptionsConfig } from '../../types';
import { CartModel, Item } from '../../data/models';

export interface GiftOptionsProps {
    readOnlyFormOrderView: GiftOptionsReadOnlyViewProps;
    cartData: CartModel | null;
    errorsField: Record<string, string>;
    isGiftMessageVisible: boolean;
    fieldsDisabled: boolean;
    loading: boolean;
    showModal: boolean;
    isEditable: boolean;
    isGiftOptionsApplied: boolean;
    updateLoading: boolean;
    areGiftOptionsVisible: Record<string, boolean>;
    view: GiftOptionsViewProps;
    giftOptions: GiftFormDataType;
    imageSwatchImageNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
    item: Item | ProductGiftOptionsConfig;
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
    updateGiftOptions: (name: string, value?: string | boolean | number, extraGiftOptions?: Record<string, string | boolean | number>) => void;
    setShowModal: Dispatch<StateUpdater<boolean>>;
    handleFormMouseLeave: () => void;
    onInputChange: (event: Event) => void;
    onBlur: (event: Event) => void;
}
export declare const GiftOptions: FunctionComponent<GiftOptionsProps>;
//# sourceMappingURL=GiftOptions.d.ts.map