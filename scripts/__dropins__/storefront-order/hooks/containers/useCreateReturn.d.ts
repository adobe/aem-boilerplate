import { AttributesFormModel, OrderDataModel, OrderItemModel } from '../../data/models';
import { StepsTypes, TaxTypes, UseCreateReturn } from '../../types';
import { RefObject } from 'preact';

export declare const useCreateReturn: ({ onSuccess, onError, handleSetInLineAlert, orderData, }: UseCreateReturn) => {
    orderReturnInfo: {
        orderUid: string;
        contactEmail: string;
    };
    order: OrderDataModel | undefined;
    quantity: number;
    formsRef: import('preact/hooks').MutableRef<RefObject<HTMLFormElement>[]>;
    taxConfig: TaxTypes;
    attributesList: [] | AttributesFormModel[];
    steps: StepsTypes;
    loading: boolean;
    selectedProductList: [] | OrderItemModel[];
    handleSelectedProductList: (orderItem: OrderItemModel) => void;
    handleSetQuantity: (value: number) => void;
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit: (event: SubmitEvent, isValid: boolean) => Promise<void | null>;
    moveToAttributesStep: () => void;
};
//# sourceMappingURL=useCreateReturn.d.ts.map