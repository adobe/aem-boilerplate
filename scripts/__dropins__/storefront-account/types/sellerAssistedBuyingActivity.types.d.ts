import { HTMLAttributes } from 'preact/compat';
import { AdminAssistanceActions } from '../data/models';

export type { AdminAssistanceAction, AdminAssistanceActions, AdminAssistanceActionsPageInfo, } from '../data/models';
export interface SellerAssistedBuyingActivityProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    pageSize?: number;
    withWrapper?: boolean;
}
export interface SellerAssistedBuyingActivityTableProps {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    tableHeaders: {
        action: string;
        date: string;
        details: string;
    };
    actionTypesMap: Record<string, string>;
    emptyStateMessage: string;
    featureDisabledMessage: string;
    isRemoteShoppingAssistanceAvailable?: boolean;
    errorMessage?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    withWrapper?: boolean;
}
export interface UseSellerAssistedBuyingActivityReturn {
    loading: boolean;
    adminAssistanceActions: AdminAssistanceActions | null;
    error: string | null;
    currentPage: number;
    handlePageChange: (page: number) => void;
}
export interface UseSellerAssistedBuyingActivityProps {
    pageSize?: number;
}
//# sourceMappingURL=sellerAssistedBuyingActivity.types.d.ts.map