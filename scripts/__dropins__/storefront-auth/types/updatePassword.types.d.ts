import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { InLineAlertInterface } from './notification.types';

type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface UpdatePasswordProps {
    signInOnSuccess?: boolean;
    formSize?: 'default' | 'small';
    routeRedirectOnPasswordUpdate?: () => string;
    routeRedirectOnSignIn?: () => string;
    routeSignInPage?: () => string;
    routeWrongUrlRedirect?: () => string;
    onErrorCallback?: (value: unknown) => void;
    onSuccessCallback?: (value?: string) => void;
    slots?: {
        SuccessNotification?: SlotProps<DefaultSlotContext>;
    };
}
export interface UpdatePasswordFormProps extends UpdatePasswordProps {
}
export interface UseUpdatePasswordFormProps extends Omit<UpdatePasswordFormProps, 'formSize' | 'slots'> {
    isEmailConfirmationRequired?: boolean;
    passwordConfigs?: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
}
export {};
//# sourceMappingURL=updatePassword.types.d.ts.map