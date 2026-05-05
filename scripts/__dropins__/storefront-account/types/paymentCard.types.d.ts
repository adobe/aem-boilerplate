/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export interface PaymentCardProps {
    /** Display name of the card brand (e.g. "Visa", "Mastercard", "American Express") */
    cardBrand: string;
    /** Last four digits of the card number to display (e.g. "1001") */
    lastFourDigits: string;
    /** When true, shows an EXPIRED badge on the card */
    expired?: boolean;
    /** Called when the user clicks Remove. When omitted, the Remove action is not shown. */
    onRemove?: () => void;
    /** Optional variant for the card container */
    variant?: 'secondary' | 'primary';
    /**
     * When true, lays out brand, masked number, expired tag (if any), and Remove on one row.
     */
    minifiedView?: boolean;
}
export interface PaymentModalProps {
    open: boolean;
    submitLoading: boolean;
    onRemoveToken: () => void;
    closeModal: () => void;
    cardBrand?: string;
    lastFourDigits?: string;
    expired?: boolean;
    variant?: 'secondary' | 'primary';
    minifiedView?: boolean;
}
//# sourceMappingURL=paymentCard.types.d.ts.map