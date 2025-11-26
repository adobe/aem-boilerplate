import { CompanyUserModel } from '../data/models';

export type UserStatus = 'ACTIVE' | 'INACTIVE';
export declare const FIELD_MAX_LENGTHS: {
    readonly firstName: 255;
    readonly lastName: 255;
    readonly email: 254;
    readonly jobTitle: 255;
    readonly telephone: 20;
};
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
    onError?: (error: string) => void;
    onSuccess?: (message: string) => void;
}): {
    values: Partial<CompanyUserModel> & {
        roleId: string;
        status: UserStatus;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    loading: boolean;
    setValue: (field: keyof CompanyUserModel | 'roleId', value: any) => void;
    onBlur: (field: keyof CompanyUserModel | 'roleId', value?: any) => Promise<void>;
    submit: () => Promise<void>;
    isCompanyAdmin: boolean;
    generalError: string | null;
};
//# sourceMappingURL=useCompanyUserForm.d.ts.map