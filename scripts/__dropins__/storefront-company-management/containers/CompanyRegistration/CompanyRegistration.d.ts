import { Container } from '@dropins/tools/types/elsie/src/lib';
import { CompanyFormSlots } from '../../types/form.types';
import { Company } from '../../data/models/company';

export interface CompanyRegistrationProps {
    isAuthenticated?: boolean;
    onRedirectLogin?: () => void;
    onRedirectAccount?: () => void;
    onSuccess?: (company: Company) => void;
    onError?: (errors: string[]) => void;
    className?: string;
    slots?: CompanyFormSlots;
}
export declare const CompanyRegistration: Container<CompanyRegistrationProps>;
//# sourceMappingURL=CompanyRegistration.d.ts.map