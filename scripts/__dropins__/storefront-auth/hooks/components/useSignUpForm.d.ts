import { UseSingUpFormProps } from '../../types';

export declare const useSignUpForm: ({ addressesData, translations, isEmailConfirmationRequired, apiVersion2, passwordConfigs, isAutoSignInEnabled, routeRedirectOnSignIn, routeSignIn, onErrorCallback, onSuccessCallback, setActiveComponent, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, }: UseSingUpFormProps) => {
    isKeepMeLogged: boolean;
    userEmail: string;
    showEmailConfirmationForm: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    isClickSubmit: boolean;
    signUpPasswordValue: string;
    isLoading: boolean;
    onSubmitSignUp: (event: SubmitEvent, isValid: boolean) => Promise<void>;
    signInButton: () => void;
    handleSetSignUpPasswordValue: (value: string) => void;
    onKeepMeLoggedChange: ({ target }: any) => void;
    handleHideEmailConfirmationForm: () => void;
};
//# sourceMappingURL=useSignUpForm.d.ts.map