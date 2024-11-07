import { ValidateLengthConfigProps, statusTypes } from '../../types';

interface UsePasswordValidationMessageProps {
    passwordConfigs: {
        minLength: number;
        requiredCharacterClasses: number;
    } | null;
    isClickSubmit: boolean;
    password: string;
}
export declare const usePasswordValidationMessage: ({ passwordConfigs, isClickSubmit, password, }: UsePasswordValidationMessageProps) => {
    isValidUniqueSymbols: statusTypes;
    defaultLengthMessage: ValidateLengthConfigProps | undefined;
};
export {};
//# sourceMappingURL=usePasswordValidationMessage.d.ts.map