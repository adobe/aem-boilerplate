import { SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface SuccessNotificationProps {
    slots?: {
        SuccessNotificationActions?: SlotProps;
    };
    formSize?: 'default' | 'small';
    className?: string;
    labels?: {
        headingText: string;
        messageText: string;
    };
}
export interface SuccessNotificationFormProps extends SuccessNotificationProps {
}
//# sourceMappingURL=successNotification.types.d.ts.map