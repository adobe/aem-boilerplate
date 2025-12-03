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
/**
 * Switches the company context to the specified company ID
 * Only switches if:
 * 1. The invited customer ID matches the logged-in customer ID
 * 2. There's no company ID already in session
 *
 * This replicates Luma's behavior in AcceptInvitation controller.
 *
 * @param companyId - The company ID to switch to (base64 encoded)
 * @param invitedCustomerId - The customer ID from the invitation (base64 encoded)
 */
export declare function switchCompanyContext(companyId: string, invitedCustomerId: string): Promise<void>;
//# sourceMappingURL=switchCompanyContext.d.ts.map