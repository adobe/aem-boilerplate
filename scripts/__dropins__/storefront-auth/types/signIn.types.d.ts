import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';

type DefaultSlotContext = {
    isSuccessful: {
        userName: string;
        status: boolean;
    };
};
export interface SignInProps {
    slots?: {
        SuccessNotification?: SlotProps<DefaultSlotContext>;
    };
    labels?: Record<string, string>;
    formSize?: 'default' | 'small';
    renderSignUpLink?: boolean;
    initialEmailValue?: string;
    enableEmailConfirmation?: boolean;
    hideCloseBtnOnEmailConfirmation?: boolean;
    routeRedirectOnEmailConfirmationClose?: () => string;
    routeForgotPassword?: () => string;
    routeSignUp?: () => string;
    routeRedirectOnSignIn?: () => string;
    onSuccessCallback?: (value?: {
        userName: string;
        status: boolean;
    }) => Promise<void>;
    onErrorCallback?: (error?: unknown) => void;
    onSignUpLinkClick?: () => void;
}
export interface SignInFormProps extends SignInProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface useSignInFormProps extends Omit<SignInFormProps, 'formSize' | 'slots'> {
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    emailConfirmationStatusMessage?: {
        text: string;
        status: '' | 'success' | 'error';
    };
    translations: any;
}
export {};
//# sourceMappingURL=signIn.types.d.ts.map