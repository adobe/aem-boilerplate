import { AttributesFormModel, OrderDataModel, OrderItemModel } from '../../data/models';
import { StepsTypes, TaxTypes, UseCreateReturn } from '../../types';
import { RefObject } from 'preact';

export declare const useCreateReturn: ({ onSuccess, onError, handleSetInLineAlert, orderData, }: UseCreateReturn) => {
    order: OrderDataModel | undefined;
    steps: StepsTypes;
    loading: boolean;
    formsRef: import('preact/hooks').MutableRef<RefObject<HTMLFormElement>[]>;
    taxConfig: TaxTypes;
    attributesList: [] | AttributesFormModel[];
    selectedProductList: [] | OrderItemModel[];
    itemsEligibleForReturn: OrderItemModel[];
    handleSelectedProductList: (orderItem: OrderItemModel) => void;
    handleSetQuantity: (value: number, productSku: string) => void;
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit: (_: SubmitEvent, isValid: boolean) => Promise<void | null>;
};
//# sourceMappingURL=useCreateReturn.d.ts.map