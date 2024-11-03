import { AttributesFormModel, OrderDataModel, OrderItemModel } from '../data/models';
import { InLineAlertProps, TaxTypes } from '.';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { RefObject } from 'preact';
import { MutableRefObject } from 'preact/compat';

type options = Record<string, string | number | boolean>;
export type StepsTypes = 'products' | 'attributes' | 'success' | 'error';
export interface CreateReturnProps {
    orderData?: OrderDataModel;
    slots?: {
        ReturnOrderItem: SlotProps;
    };
    className: string;
    onSuccess: () => void;
    onError: (message: string) => void;
    routeReturnSuccess?: () => string;
    showConfigurableOptions?: (options: options | {}) => options;
}
export interface ReturnOrderProductListProps {
    slots?: {
        ReturnOrderItem: SlotProps;
    };
    loading: boolean;
    taxConfig: TaxTypes;
    translations: Record<string, string>;
    selectedProductList: OrderItemModel[] | [];
    handleSelectedProductList: (product: any) => void;
    showConfigurableOptions?: (options: options | {}) => options;
    handleSetQuantity?: (value: number) => void;
    moveToAttributesStep: () => void;
    handleChangeStep: (value: StepsTypes) => void;
}
export interface ReturnReasonFormProps {
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
    routeReturnSuccess?: () => string;
}
export interface UseCreateReturn {
    orderData?: OrderDataModel;
    onSuccess: () => void;
    onError: (message: string) => void;
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
}
export {};
//# sourceMappingURL=createReturn.types.d.ts.map