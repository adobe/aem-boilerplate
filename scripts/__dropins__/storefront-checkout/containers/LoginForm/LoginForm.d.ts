import { HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    email?: string;
    onSignInClick?: (email: string | null) => void;
    onSignOutClick?: () => void;
}
export declare const LoginForm: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & LoginFormProps): import("preact/compat").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=LoginForm.d.ts.map