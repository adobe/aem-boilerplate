import { CompanyUserModel } from '../data/models';

export type UserStatus = 'ACTIVE' | 'INACTIVE';
export declare function useCompanyUserForm(opts: {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'user';
    }) => void;
}): {
    values: Partial<CompanyUserModel> & {
        roleId: string;
        status: UserStatus;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    loading: boolean;
    setValue: (field: keyof CompanyUserModel | 'roleId' | 'status', value: string) => void;
    onBlur: (field: keyof CompanyUserModel | 'roleId' | 'status') => Promise<void>;
    canSubmit: boolean;
    submit: () => Promise<void>;
    isCompanyAdmin: boolean;
    generalError: string | null;
};
//# sourceMappingURL=useCompanyUserForm.d.ts.map