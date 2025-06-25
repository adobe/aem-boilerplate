import { SlotProps } from '../../@adobe-commerce/elsie/src/lib';
import { AttributesFormModel } from '../data/models';
import { InLineAlertProps } from './notification.types';
import { KeysSortOrderProps } from './addresses.types';

type PasswordConfigsProps = {
    minLength: number;
    requiredCharacterClasses: number;
} | null;
export type CustomerDataProps = KeysSortOrderProps & {
    value: string | number | boolean;
};
export interface CustomerDataContext {
    customerData: CustomerDataProps[];
}
export interface CustomerInformationProps {
    className: string;
    withHeader: boolean;
    slots?: {
        CustomerData?: SlotProps<CustomerDataContext>;
    };
}
export interface ChangePasswordProps {
    inLineAlertProps: InLineAlertProps;
    handleHideChangePassword: (clearState?: () => void) => void;
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
}
export interface CustomerInformationCardProps {
    createdAt: string;
    orderedCustomerData: CustomerDataProps[];
    slots?: {
        CustomerData?: SlotProps<CustomerDataContext>;
    };
    showChangePassword: boolean;
    showEditForm: boolean;
    handleShowChangePassword: () => void;
    handleShowEditForm: () => void;
}
export interface EditCustomerInformationProps {
    inLineAlertProps: InLineAlertProps;
    errorPasswordEmpty: boolean;
    passwordValue: string;
    showPasswordOnEmailChange: boolean;
    formFieldsList: AttributesFormModel[] | [];
    submitLoading: boolean;
    handleUpdateCustomerInformation: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    handleHideEditForm: (clearState?: () => void) => void;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    handleSetPassword: (value: string) => void;
    handleOnBlurPassword: (event: Event) => void;
}
export interface UseCustomerInformationProps {
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
}
export interface UseChangePasswordProps {
    passwordConfigs: PasswordConfigsProps;
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
    handleHideChangePassword: (clearState?: () => void) => void;
}
export {};
//# sourceMappingURL=customerInformation.types.d.ts.map