import { InLineAlertInterface } from '../../types';

interface getCustomerTokenProps {
    email: string;
    password: string;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    translations: Record<string, string>;
    onErrorCallback?: (value?: unknown) => void;
    apiErrorMessageOverride?: string;
}
export declare const getCustomerToken: ({ email, password, translations, onErrorCallback, handleSetInLineAlertProps, apiErrorMessageOverride, }: getCustomerTokenProps) => Promise<{
    errorMessage: string;
    displayErrorMessage: string;
    userName: string;
    userEmail: string;
}>;
export {};
//# sourceMappingURL=getCustomerToken.d.ts.map