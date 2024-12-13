import { FunctionComponent } from 'preact';
import { PasswordStatusIndicatorProps } from './PasswordStatusIndicator';
import { HTMLAttributes } from 'preact/compat';

export interface InputPasswordProps extends PasswordStatusIndicatorProps, Omit<HTMLAttributes<HTMLDivElement>, 'minLength'> {
    placeholder?: string;
    floatingLabel?: string;
    defaultValue?: string;
    className?: string;
    name?: string;
    autoComplete?: string;
    errorMessage?: string | undefined;
    required?: boolean;
    hideStatusIndicator?: boolean;
    onValue?: (value: any) => void;
    onBlur?: (event: Event) => void;
}
export declare const InputPassword: FunctionComponent<InputPasswordProps>;
//# sourceMappingURL=InputPassword.d.ts.map