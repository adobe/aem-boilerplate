import { CompanyModel } from '../../data/models';
import { Country } from '../../data/models/country';

export interface UseCompanyProfileProps {
    handleSetInLineAlert?: (alert?: {
        type: 'success' | 'error';
        text: string;
    }) => void;
}
export declare const useCompanyProfile: ({ handleSetInLineAlert }: UseCompanyProfileProps) => {
    company: CompanyModel | null;
    countries: Country[];
    createdAt: string;
    loading: boolean;
    submitLoading: boolean;
    showEditForm: boolean;
    inputChange: Record<string, string | number | boolean>;
    handleShowEditForm: () => void;
    handleHideEditForm: (clearStates?: () => void) => void;
    handleUpdateCompany: (data: Partial<CompanyModel>) => Promise<void>;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    renderAlertMessage: (type: 'success' | 'error', message?: string) => void;
    saving: boolean;
};
//# sourceMappingURL=useCompanyProfile.d.ts.map