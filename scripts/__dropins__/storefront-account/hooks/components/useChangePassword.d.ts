import { UseChangePasswordProps } from '../../types';

export declare const DEFAULT_ERRORS_STATE: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export declare const useChangePassword: ({ passwordConfigs, handleSetInLineAlert, handleHideChangePassword, }: UseChangePasswordProps) => {
    hideChangePassword: () => void;
    handleOnBlurPassword: (event: Event) => void;
    handleConfirmPasswordChange: (value: string) => void;
    handleNewPasswordChange: (value: string) => void;
    handleCurrentPasswordChange: (value: string) => void;
    mutationChangePassword: (event: Event) => void;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    passwordErrors: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    submitLoading: boolean;
    isClickSubmit: boolean;
};
//# sourceMappingURL=useChangePassword.d.ts.map