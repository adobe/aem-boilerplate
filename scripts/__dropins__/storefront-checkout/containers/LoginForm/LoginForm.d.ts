import { TitleProps } from '../../types/TitleProps';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

interface ValidationError {
    email: string;
    message: string;
    type: 'missing' | 'invalid';
}
interface CartSyncError {
    email: string;
    error: Error;
}
export interface LoginFormProps extends HTMLAttributes<HTMLFormElement>, TitleProps {
    active?: boolean;
    autoSync?: boolean;
    displayHeadingContent?: boolean;
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
    onCartSyncError?: (error: CartSyncError) => void;
    onValidationError?: (error: ValidationError) => void;
    slots?: {
        Heading?: SlotProps<{
            authenticated: boolean;
        }>;
    } & TitleProps['slots'];
}
export declare const LoginForm: Container<LoginFormProps>;
export {};
//# sourceMappingURL=LoginForm.d.ts.map