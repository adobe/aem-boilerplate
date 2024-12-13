import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface LoginEmailProps extends HTMLAttributes<HTMLInputElement> {
    value: string;
    error: string;
    hint: string;
    onChange: (event: Event) => void;
    onBlur: (event: Event) => void;
    onInvalid: (event: Event) => void;
}
export declare const Email: FunctionComponent<LoginEmailProps>;
//# sourceMappingURL=Email.d.ts.map