import { CompanyModel } from '../../data/models';
import { Country } from '../../data/models/country';
import { UseCompanyProfileProps } from '../../types/hook.types';

export declare const useCompanyProfile: ({ handleSetInLineAlert, editFormRef }: UseCompanyProfileProps) => {
    company: CompanyModel | null;
    countries: Country[];
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