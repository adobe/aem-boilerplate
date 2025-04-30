import { Customer } from '../../data/models';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'title'> {
    customer: Customer | null;
    email: string;
    error: string;
    headingContent?: VNode;
    hint: string | VNode;
    onEmailBlur: (event: Event) => void;
    onEmailChange: (event: Event) => void;
    onEmailInvalid: (event: Event) => void;
    title?: VNode;
}
export declare const LoginForm: FunctionComponent<LoginFormProps & import('..').ConditionalProps>;
//# sourceMappingURL=LoginForm.d.ts.map