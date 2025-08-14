import { InLineAlertProps } from '../types/companyProfile.types';

export type AlertType = 'success' | 'warning' | 'error';
export interface AlertOptions {
    type: AlertType;
    text: string;
    autoHide?: boolean;
    autoHideDelay?: number;
}
export interface UseInLineAlertReturn {
    inLineAlertProps: InLineAlertProps;
    handleSetInLineAlert: (notification?: AlertOptions) => void;
    clearAlert: () => void;
    showSuccess: (text: string, autoHide?: boolean) => void;
    showWarning: (text: string, autoHide?: boolean) => void;
    showError: (text: string, autoHide?: boolean) => void;
}
export declare const useInLineAlert: () => UseInLineAlertReturn;
export default useInLineAlert;
//# sourceMappingURL=useInLineAlert.d.ts.map