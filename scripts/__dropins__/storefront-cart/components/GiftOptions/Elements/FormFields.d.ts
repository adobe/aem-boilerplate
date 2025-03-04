import { FunctionComponent } from 'preact';
import { GiftOptionsViewProps, GiftFormDataType } from '../../../types';

interface FormFieldsProps {
    view: GiftOptionsViewProps;
    giftOptions: GiftFormDataType;
    disabled: boolean;
    errorMessage: Record<string, string>;
    onInputChange: (value: Event) => void;
    onBlur: (event: Event) => void;
    isGiftMessageVisible: boolean;
}
export declare const FormFields: FunctionComponent<FormFieldsProps>;
export {};
//# sourceMappingURL=FormFields.d.ts.map