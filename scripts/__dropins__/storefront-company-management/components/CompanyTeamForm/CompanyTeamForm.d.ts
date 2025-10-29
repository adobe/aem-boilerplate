import { FunctionComponent } from 'preact';
import { CompanyTeamFormProps } from '../../types/companyForm.types';

/**
 * CompanyTeamForm component for creating and editing company teams
 * Provides form fields for team information including name and description
 *
 * @param mode - Whether this is an 'add' or 'edit' operation
 * @param entityId - ID of the team being edited (for edit mode)
 * @param parentStructureId - ID of the parent structure node
 * @param permissions - User permissions for editing teams
 * @param onSaved - Callback when team is successfully saved
 * @param onCancel - Callback when form is cancelled
 */
export declare const CompanyTeamForm: FunctionComponent<CompanyTeamFormProps>;
export default CompanyTeamForm;
//# sourceMappingURL=CompanyTeamForm.d.ts.map