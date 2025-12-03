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
export interface InvitationStatus {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    isCompanyDisabled: boolean;
}
export interface AcceptInvitationFormProps {
    routeMyAccount?: () => string;
    routeLogin?: () => string;
    isAuthenticated?: boolean;
    labels?: {
        title?: string;
        loadingText?: string;
        successTitle?: string;
        successMessage?: string;
        errorTitle?: string;
        myAccountButton?: string;
        loginButton?: string;
    };
    className?: string;
}
export interface AcceptInvitationProps extends AcceptInvitationFormProps {
}
//# sourceMappingURL=acceptInvitation.types.d.ts.map