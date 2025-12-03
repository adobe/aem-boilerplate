import { InvitationStatus } from '../types';

/**
 * Hook to handle company invitation acceptance from email link
 * Parses URL parameters, validates company is enabled, and calls the API
 *
 * @param isAuthenticated - Whether the user is currently authenticated
 */
export declare const useAcceptInvitation: (isAuthenticated?: boolean) => InvitationStatus;
//# sourceMappingURL=useAcceptInvitation.d.ts.map