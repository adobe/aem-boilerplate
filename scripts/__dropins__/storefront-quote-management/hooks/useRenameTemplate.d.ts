/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface UseRenameTemplateParams {
    initialTemplateName?: string;
    templateNameRequiredErrorMessage?: string;
}
export interface UseRenameTemplateReturn {
    /**
     * Whether the rename modal is currently open.
     */
    isRenameModalOpen: boolean;
    /**
     * The new template name entered by the user.
     */
    renameTemplateName: string;
    /**
     * The reason for renaming the template.
     */
    renameReason: string;
    /**
     * Error message for rename operation.
     */
    renameError: string;
    /**
     * Error message for template name validation.
     */
    renameTemplateNameError: string;
    /**
     * Success message for rename operation.
     */
    renameSuccess: string;
    /**
     * Opens the rename modal and initializes state with the current template name.
     */
    handleRenameClick: (currentTemplateName?: string) => void;
    /**
     * Closes the rename modal and resets all state.
     */
    handleRenameClose: () => void;
    /**
     * Updates the template name and clears any name-related errors.
     */
    handleRenameTemplateNameChange: (value: string) => void;
    /**
     * Updates the rename reason.
     */
    handleRenameReasonChange: (value: string) => void;
    /**
     * Validates and saves the rename. Closes the modal if validation passes.
     * Does not make an API call - rename is tracked locally and included when submitting for review.
     */
    handleRenameSave: () => boolean;
    /**
     * Resets rename state (useful after successful submission).
     */
    resetRenameState: () => void;
}
/**
 * Custom hook to manage quote template rename functionality.
 * Handles state management for the rename modal, validation, and tracking rename changes.
 * Note: This hook does not make API calls. The rename is tracked locally and should be
 * included when calling sendQuoteTemplateForReview.
 */
export declare const useRenameTemplate: (params?: UseRenameTemplateParams) => UseRenameTemplateReturn;
//# sourceMappingURL=useRenameTemplate.d.ts.map