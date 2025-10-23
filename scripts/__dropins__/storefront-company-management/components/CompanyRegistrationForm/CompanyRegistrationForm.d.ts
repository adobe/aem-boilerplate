import { FunctionComponent } from 'preact';
import { CompanyFormSlots } from '../../types/form.types';
import { Company } from '../../data/models/company';

export interface CompanyRegistrationFormProps {
    onSuccess?: (company: Company) => void;
    onError?: (errors: string[]) => void;
    className?: string;
    slots?: CompanyFormSlots;
    hideActionFormButtons?: boolean;
}
export declare const CompanyRegistrationForm: FunctionComponent<CompanyRegistrationFormProps>;
//# sourceMappingURL=CompanyRegistrationForm.d.ts.map