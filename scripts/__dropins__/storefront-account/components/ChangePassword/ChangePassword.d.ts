import { FunctionComponent } from 'preact';
import { ChangePasswordProps, ValidateLengthConfigProps } from '../../types';

export declare const getErrorMessage: (isValidUniqueSymbols: string, defaultLengthMessage: ValidateLengthConfigProps | undefined, isSubmit: boolean, newPassword: string, passwordErrors: {
    newPassword: string;
}) => string | undefined;
export declare const ChangePassword: FunctionComponent<ChangePasswordProps>;
//# sourceMappingURL=ChangePassword.d.ts.map