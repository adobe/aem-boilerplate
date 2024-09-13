import { InLineAlertInterface } from './notification.types';

export interface EmailConfirmationFormProps {
    userEmail: string;
    formSize: 'default' | 'small';
    inLineAlertProps: InLineAlertInterface;
    hideCloseBtnOnEmailConfirmation?: boolean;
    handleSetInLineAlertProps: (value: InLineAlertInterface) => void;
    onPrimaryButtonClick: () => void;
}
export interface useEmailConfirmationFormProps extends Omit<EmailConfirmationFormProps, 'formSize' | 'inLineAlertProps' | 'onPrimaryButtonClick'> {
    handleSetInLineAlertProps: (value: InLineAlertInterface) => void;
}
//# sourceMappingURL=emailConfirmationForm.types.d.ts.map