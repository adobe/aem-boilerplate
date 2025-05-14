import { AttributesFormModel, OrderDataModel, OrderItemModel } from '../data/models';
import { InLineAlertProps, TaxTypes } from '.';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { RefObject } from 'preact';
import { MutableRefObject } from 'preact/compat';

type options = Record<string, string | number | boolean>;
export type StepsTypes = 'products' | 'attributes' | 'success' | 'error';
type onSuccessTypes = {
    uid: string;
    number: string;
    status: string;
    createdAt: string;
};
export interface CreateReturnProps {
    orderData?: OrderDataModel;
    slots?: {
        ReturnOrderItem: SlotProps;
        ReturnFormActions: SlotProps<{
            handleChangeStep: (value: StepsTypes) => void;
        }>;
        ReturnReasonFormImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    className: string;
    onSuccess?: (response: onSuccessTypes | {}) => void;
    onError?: (message: string) => void;
    routeReturnSuccess?: () => string;
    showConfigurableOptions?: (options: options | {}) => options;
}
export interface ReturnOrderProductListProps {
    placeholderImage: string;
    slots?: {
        ReturnOrderItem: SlotProps;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    itemsEligibleForReturn: OrderItemModel[];
    loading: boolean;
    taxConfig: TaxTypes;
    translations: Record<string, string>;
    selectedProductList: OrderItemModel[] | [];
    handleSelectedProductList: (product: any) => void;
    showConfigurableOptions?: (options: options | {}) => options;
    handleSetQuantity: (value: number, productSku: string) => void;
    handleChangeStep: (value: StepsTypes) => void;
}
export interface ReturnReasonFormProps {
    placeholderImage: string;
    slots?: {
        ReturnFormActions: SlotProps<{
            handleChangeStep: (value: StepsTypes) => void;
        }>;
        ReturnReasonFormImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    formsRef: MutableRefObject<RefObject<HTMLFormElement>[]>;
    loading: boolean;
    translations: Record<string, string>;
    fieldsConfig: AttributesFormModel[] | [];
    selectedProductList: OrderItemModel[] | [];
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface ReturnOrderMessageProps {
    translations: Record<string, string>;
    routeReturnSuccess?: (orderData?: OrderDataModel) => string;
    orderData?: OrderDataModel;
}
export interface UseCreateReturn {
    orderData?: OrderDataModel;
    onSuccess?: (response: onSuccessTypes | {}) => void;
    onError?: (message: string) => void;
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
}
export {};
//# sourceMappingURL=createReturn.types.d.ts.map