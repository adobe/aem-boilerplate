import { CompanyTeamModel } from '../data/models';

export declare const TEAM_FIELD_MAX_LENGTHS: {
    readonly name: 40;
    readonly description: 1000;
};
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
    onError?: (error: string) => void;
    onSuccess?: (message: string) => void;
}): {
    values: CompanyTeamModel;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    loading: boolean;
    setValue: (field: keyof CompanyTeamModel, value: string) => void;
    onBlur: (field: keyof CompanyTeamModel, value?: string) => void;
    submit: () => Promise<void>;
    generalError: string | null;
};
//# sourceMappingURL=useCompanyTeamForm.d.ts.map