import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent } from 'preact';

export interface LoginEmailProps extends HTMLAttributes<HTMLFormElement> {
    value?: string;
    error?: string;
    hint?: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    onInvalid: (e: any) => void;
}
export declare const Email: FunctionComponent<LoginEmailProps>;
//# sourceMappingURL=Email.d.ts.map