import { ComponentChildren } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface SellerAssistedBuyingSettingsProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export interface SellerAssistedBuyingSettingsControlProps {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    checkboxLabel: string;
    checkboxTooltip?: string;
    alertMessage: string;
    featureDisabledMessage: string;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
    children?: ComponentChildren;
}
export interface UseSellerAssistedBuyingSettingsReturn {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
}
//# sourceMappingURL=sellerAssistedBuyingSettings.types.d.ts.map