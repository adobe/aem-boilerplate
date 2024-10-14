import { AdditionalActionsAlertProps, UseUpdatePasswordFormProps } from '../../types';

export declare const useUpdatePasswordForm: ({ isEmailConfirmationRequired, signInOnSuccess, passwordConfigs, routeRedirectOnSignIn, routeWrongUrlRedirect, onErrorCallback, onSuccessCallback, handleSetInLineAlertProps, routeRedirectOnPasswordUpdate, routeSignInPage, }: UseUpdatePasswordFormProps) => {
    additionalActionsAlert: AdditionalActionsAlertProps;
    passwordError: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    updatePasswordValue: string;
    isClickSubmit: boolean;
    isLoading: boolean;
    submitUpdatePassword: (event: Event) => Promise<void>;
    handleSetUpdatePasswordValue: (value: string) => void;
    setIsClickSubmit: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
};
//# sourceMappingURL=useUpdatePasswordForm.d.ts.map