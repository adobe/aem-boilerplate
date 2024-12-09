import { AttributesFormModel, OrderItemModel } from '../../data/models';
import { StepsTypes, UseCreateReturn } from '../../types';
import { RefObject } from 'preact';

export declare const useCreateReturn: ({ onSuccess, onError, handleSetInLineAlert, orderData, }: UseCreateReturn) => {
    order: {
        placeholderImage?: string | undefined;
        returnNumber?: string | undefined;
        id: string;
        orderStatusChangeDate?: string | undefined;
        number?: string | undefined;
        email: string;
        token?: string | undefined;
        status?: string | undefined;
        isVirtual?: boolean | undefined;
        totalQuantity?: number | undefined;
        shippingMethod?: string | undefined;
        carrier?: string | undefined;
        orderDate?: string | undefined;
        returns?: import('../../data/models').OrdersReturnPropsModel[] | undefined;
        discounts?: {
            amount: import('../../types').MoneyProps;
            label: string;
        }[] | undefined;
        coupons?: {
            code: string;
        }[] | undefined;
        payments?: {
            code: string;
            name: string;
        }[] | undefined;
        shipping?: {
            code: string;
            amount: number;
            currency: string;
        } | undefined;
        shipments?: import('../../data/models').ShipmentsModel[] | undefined;
        items?: OrderItemModel[] | undefined;
        totalGiftcard?: import('../../types').MoneyProps | undefined;
        grandTotal?: import('../../types').MoneyProps | undefined;
        totalShipping?: import('../../types').MoneyProps | undefined;
        subtotalExclTax?: import('../../types').MoneyProps | undefined;
        subtotalInclTax?: import('../../types').MoneyProps | undefined;
        totalTax?: import('../../types').MoneyProps | undefined;
        shippingAddress?: import('../../data/models').OrderAddressModel | undefined;
        billingAddress?: import('../../data/models').OrderAddressModel | undefined;
        availableActions?: import('../../types').AvailableActionsProps[] | undefined;
        taxes?: {
            amount: import('../../types').MoneyProps;
            rate: number;
            title: string;
        }[] | undefined;
    };
    steps: StepsTypes;
    loading: boolean;
    formsRef: import('preact/hooks').MutableRef<RefObject<HTMLFormElement>[]>;
    attributesList: [] | AttributesFormModel[];
    selectedProductList: [] | OrderItemModel[];
    itemsEligibleForReturn: OrderItemModel[];
    handleSelectedProductList: (orderItem: OrderItemModel) => void;
    handleSetQuantity: (value: number, productSku: string) => void;
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit: (_: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
};
//# sourceMappingURL=useCreateReturn.d.ts.map