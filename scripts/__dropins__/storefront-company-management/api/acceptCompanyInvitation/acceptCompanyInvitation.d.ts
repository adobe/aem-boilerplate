import { AcceptCompanyInvitationInput, AcceptCompanyInvitationResult } from '../../types';

/**
 * Accepts a company invitation using the invitation code and user information
 * @param input - Invitation code, user information (customer_id, company_id, etc.), and optional role_id
 * @returns Promise resolving to result indicating success or failure
 */
export declare function acceptCompanyInvitation(input: AcceptCompanyInvitationInput): Promise<AcceptCompanyInvitationResult | null>;
//# sourceMappingURL=acceptCompanyInvitation.d.ts.map