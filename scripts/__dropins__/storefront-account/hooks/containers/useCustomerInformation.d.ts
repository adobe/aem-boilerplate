import { UseCustomerInformationProps } from '../../types';

export declare const useCustomerInformation: ({ handleSetInLineAlert, }: UseCustomerInformationProps) => {
    createdAt: string;
    errorPasswordEmpty: boolean;
    passwordValue: string;
    showPasswordOnEmailChange: boolean;
    orderedCustomerData: {
        name: string;
        orderNumber: number | undefined;
        value: any;
        label: string | null | undefined;
    }[];
    loading: boolean;
    normalizeFieldsConfig: {
        defaultValue: any;
        code?: string | undefined;
        name?: string | undefined;
        id?: string | undefined;
        required?: boolean | undefined;
        label?: string | undefined;
        options?: {
            is_default: boolean;
            label: string;
            value: string;
        }[] | undefined;
        entityType?: string | undefined;
        className?: string | undefined;
        fieldType?: import('../../data/models').FieldEnumList | undefined;
        multilineCount?: number | undefined;
        isUnique?: boolean | undefined;
        orderNumber: number;
        isHidden?: boolean | undefined;
        customUpperCode: string;
        validateRules: Record<string, string>[];
    }[];
    submitLoading: boolean;
    showEditForm: boolean;
    showChangePassword: boolean;
    handleShowChangePassword: () => void;
    handleHideChangePassword: (clearStates?: () => void) => void;
    handleShowEditForm: () => void;
    handleHideEditForm: (clearStates?: () => void) => void;
    handleUpdateCustomerInformation: (event: Event, valid: boolean) => Promise<void>;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    handleSetPassword: (value: string) => void;
    handleOnBlurPassword: (event: Event) => void;
    renderAlertMessage: (type: 'success' | 'error', message?: string) => void;
};
//# sourceMappingURL=useCustomerInformation.d.ts.map