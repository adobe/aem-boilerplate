import { FunctionComponent, HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'loading'> {
    customerDetails?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    email: string;
    error: string;
    hint: string;
    loading?: boolean;
    onEmailBlur: (event: Event) => void;
    onEmailChange: (event: Event) => void;
    onEmailInvalid: (event: Event) => void;
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
}
export declare const LoginForm: FunctionComponent<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map