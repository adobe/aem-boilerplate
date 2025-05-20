import { TitleProps } from '../../types/TitleProps';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface LoginFormProps extends HTMLAttributes<HTMLFormElement>, TitleProps {
    displayHeadingContent?: boolean;
    active?: boolean;
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
    autoSync?: boolean;
    slots?: {
        Heading?: SlotProps<{
            authenticated: boolean;
        }>;
    } & TitleProps['slots'];
}
export declare const LoginForm: Container<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map