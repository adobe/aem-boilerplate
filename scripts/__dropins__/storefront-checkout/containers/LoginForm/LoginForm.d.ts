import { HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends HTMLAttributes<HTMLFormElement> {
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
}
export declare const LoginForm: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & LoginFormProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=LoginForm.d.ts.map