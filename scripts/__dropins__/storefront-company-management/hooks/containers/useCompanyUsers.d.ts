import { CompanyUser, CompanyUsersFilter } from '../../types';

export type FilterType = 'all' | 'active' | 'inactive';
export interface UseCompanyUsersProps {
    translations: {
        ariaDataLoaded: string;
        ariaDataError: string;
    };
}
export interface UseCompanyUsersReturn {
    users: CompanyUser[];
    userPermissions: Set<string> | null;
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    filterType: FilterType;
    filter: CompanyUsersFilter | undefined;
    loading: boolean;
    announcement: string;
    canEditUsers: boolean;
    handleFilterChange: (newFilter: FilterType) => void;
    handlePageSizeChange: (event: Event | {
        target?: {
            value: string;
        };
    } | string) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    refreshUsers: () => Promise<void>;
}
export declare const useCompanyUsers: ({ translations }: UseCompanyUsersProps) => UseCompanyUsersReturn;
//# sourceMappingURL=useCompanyUsers.d.ts.map