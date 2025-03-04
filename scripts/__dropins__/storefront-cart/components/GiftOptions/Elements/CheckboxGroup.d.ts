import { FunctionComponent } from 'preact';
import { GiftOptionsViewProps, GiftWrappingConfigProps, GiftFormDataType, ProductGiftOptionsConfig } from '../../../types';
import { CartModel, Item } from '../../../data/models';
import { StateUpdater, Dispatch } from 'preact/hooks';

interface CheckboxGroupProps {
    className: string;
    view: GiftOptionsViewProps;
    item: Item | ProductGiftOptionsConfig;
    giftOptions: GiftFormDataType;
    disabled: boolean;
    cartData: CartModel | null;
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
    areGiftOptionsVisible: Record<string, boolean>;
    setShowModal: Dispatch<StateUpdater<boolean>>;
    onInputChange: (event: Event) => void;
}
export declare const CheckboxGroup: FunctionComponent<CheckboxGroupProps>;
export {};
//# sourceMappingURL=CheckboxGroup.d.ts.map