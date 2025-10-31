import { CompanyCreditHistoryItem } from '../../data/models';
import { GetCompanyCreditHistoryParams } from '../../types/api/getCompanyCreditHistoryParams.types';

export interface UseCompanyCreditHistoryProps {
    /** Initial parameters for the credit history query */
    initialParams?: GetCompanyCreditHistoryParams;
    /** Translations for accessibility announcements */
    translations: {
        ariaDataLoaded: string;
        ariaDataError: string;
    };
}
export interface UseCompanyCreditHistoryReturn {
    items: CompanyCreditHistoryItem[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    loading: boolean;
    announcement: string;
    handlePageSizeChange: (event: Event | {
        target?: {
            value: string;
        };
    } | string) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handlePageChange: (page: number) => void;
    refreshCreditHistory: () => Promise<void>;
}
export declare const useCompanyCreditHistory: ({ initialParams, translations }: UseCompanyCreditHistoryProps) => UseCompanyCreditHistoryReturn;
//# sourceMappingURL=useCompanyCreditHistory.d.ts.map