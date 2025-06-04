import { UseResetPasswordFormProps } from '../../types';

export declare const useResetPasswordForm: ({ routeSignIn, onErrorCallback, onSuccessCallback, setActiveComponent, handleSetInLineAlertProps, }: UseResetPasswordFormProps) => {
    isLoading: boolean;
    submitResetPassword: (event: any) => Promise<void>;
    redirectToSignInPage: () => void;
};
//# sourceMappingURL=useResetPasswordForm.d.ts.map