import { Customer } from '../../data/models';
import { FunctionComponent, HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    currentEmail: string | null;
    hint?: string;
    error?: string | null;
    onEmailChange: (e: any) => void;
    onEmailBlur: (e: any) => void;
    onEmailInvalid: (e: any) => void;
    onSignInClick?: (email: string | null) => void;
    onSignOutClick?: () => void;
    customer?: Customer | null;
}
export declare const LoginForm: FunctionComponent<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map