/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
export declare enum AgreementMode {
    MANUAL = "manual",
    AUTO = "auto"
}
type AgreementContent = {
    value: string;
    html: boolean;
    height: string | null;
};
export interface CheckoutAgreement {
    content: AgreementContent;
    id: number;
    mode: AgreementMode;
    name: string;
    text: string;
}
export interface CheckoutError {
    /**
     * The primary, user-friendly error message. This should be safe to display
     * directly in the UI.
     * @example "Your card was declined."
     */
    message: string;
    /**
     * An optional, unique error code for programmatic handling. This allows the
     * ServerError component to show specific icons, links, or actions.
     * @example "payment_intent_declined"
     */
    code?: string;
}
export {};
//# sourceMappingURL=checkout.d.ts.map