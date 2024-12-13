import { ResetPasswordFormProps } from './resetPassword.types';
import { SignInFormProps } from './signIn.types';
import { SignUpFormProps } from './signUp.types';

export type activeComponentType = 'signInForm' | 'signUpForm' | 'resetPasswordForm';
export interface AuthCombineProps {
    defaultView?: activeComponentType;
    signInFormConfig?: SignInFormProps;
    signUpFormConfig?: SignUpFormProps;
    resetPasswordFormConfig?: ResetPasswordFormProps;
}
//# sourceMappingURL=authCombine.types.d.ts.map