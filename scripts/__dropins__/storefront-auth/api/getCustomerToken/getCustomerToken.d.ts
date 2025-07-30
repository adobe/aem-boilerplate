import { InLineAlertInterface } from '../../types';

interface getCustomerTokenProps {
    email: string;
    password: string;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    translations: Record<string, string>;
    onErrorCallback?: (value?: unknown) => void;
}
export declare const getCustomerToken: ({ email, password, translations, onErrorCallback, handleSetInLineAlertProps, }: getCustomerTokenProps) => Promise<{
    errorMessage: string;
    userName: string;
    userEmail: string;
}>;
export {};
//# sourceMappingURL=getCustomerToken.d.ts.map