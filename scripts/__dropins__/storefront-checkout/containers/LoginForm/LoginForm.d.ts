import { TitleProps } from '../../types/TitleProps';
import { Container, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends HTMLAttributes<HTMLFormElement>, TitleProps {
    displayHeadingContent?: boolean;
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
    slots?: {
        Heading?: SlotProps<{
            authenticated: boolean;
        }>;
    } & TitleProps['slots'];
}
export declare const LoginForm: Container<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map