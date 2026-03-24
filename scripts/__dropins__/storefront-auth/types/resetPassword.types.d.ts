import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';

type ResetPasswordSlotContext = {
    isLoading: boolean;
};
export interface ResetPasswordProps {
    formSize?: 'default' | 'small';
    routeSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
    onSuccessCallback?: () => void | Promise<void>;
    slots?: {
        Title?: SlotProps<ResetPasswordSlotContext>;
        Form?: SlotProps<ResetPasswordSlotContext>;
        Buttons?: SlotProps<ResetPasswordSlotContext>;
    };
}
export interface ResetPasswordFormProps extends ResetPasswordProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface UseResetPasswordFormProps extends Omit<ResetPasswordFormProps, 'formSize'> {
    handleSetInLineAlertProps?: (value?: InLineAlertInterface) => void;
}
export {};
//# sourceMappingURL=resetPassword.types.d.ts.map