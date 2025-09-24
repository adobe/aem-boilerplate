import { CompanyTeamModel } from '../data/models';

export declare function useCompanyTeamForm(opts: {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'team';
        description?: string;
    }) => void;
}): {
    values: Partial<CompanyTeamModel> & {
        title: string;
        description: string;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    loading: boolean;
    setValue: (field: keyof CompanyTeamModel | 'title' | 'description', value: string) => void;
    onBlur: (field: keyof CompanyTeamModel | 'title' | 'description') => void;
    canSubmit: boolean;
    submit: () => Promise<void>;
    generalError: string | null;
};
//# sourceMappingURL=useCompanyTeamForm.d.ts.map