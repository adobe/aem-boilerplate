interface PasswordValidationParams {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    translations: Record<string, string>;
}
interface PasswordErrors {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export declare const validationChangePassword: ({ currentPassword, newPassword, confirmPassword, translations, }: PasswordValidationParams) => {
    isValid: boolean;
    errors: PasswordErrors;
};
export {};
//# sourceMappingURL=validationChangePassword.d.ts.map