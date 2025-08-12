import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';
import { AddressFormProps } from './api/createCustomerAddress.types';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface inputsDefaultValueSetProps {
    code: string;
    defaultValue: string;
}
type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface SignUpProps {
    requireRetypePassword?: boolean;
    addressesData?: AddressFormProps[];
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
    fieldsConfigForApiVersion1?: any;
    apiVersion2?: boolean;
    isAutoSignInEnabled?: boolean;
    formSize?: 'default' | 'small';
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    slots?: {
        SuccessNotification?: SlotProps<DefaultSlotContext>;
        PrivacyPolicyConsent: SlotProps;
    };
    routeSignIn?: () => string;
    routeRedirectOnSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
    onSuccessCallback?: (value?: {
        userName: string;
        userEmail: string;
        status: boolean;
    }) => Promise<void>;
}
export interface SignUpFormProps extends SignUpProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
    slot?: {
        PrivacyPolicyConsent: SlotProps;
    };
}
export interface UseSingUpFormProps extends Omit<SignUpFormProps, 'formSize' | 'inputsDefaultValueSet' | 'slots'> {
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    isEmailConfirmationRequired?: boolean;
    translations: Record<string, string>;
}
export {};
//# sourceMappingURL=signUp.types.d.ts.map