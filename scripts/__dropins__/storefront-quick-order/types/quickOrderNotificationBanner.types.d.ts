/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export interface QuickOrderNotificationBannerProps {
    notification: {
        type: 'validation' | 'partial-success' | 'success' | 'backend-error';
        variant: 'success' | 'warning' | 'neutral' | 'brand';
        message: string;
        details?: string;
        count?: number;
        clickableSkus?: string[];
    } | null;
    onDismiss: () => void;
    onSkuClick?: (sku: string) => void;
    validationErrorText: string;
    backendErrorText: string;
    successText: string;
    partialSuccessText?: string;
}
//# sourceMappingURL=quickOrderNotificationBanner.types.d.ts.map