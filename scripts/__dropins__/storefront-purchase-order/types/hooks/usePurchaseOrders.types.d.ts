import { PageSizeListProps, PaginationState } from '../components/pagination.types';
import { Column, Row } from '../components/purchaseOrdersTable.types';
import { EnumPurchaseOrdersView } from '../api';
import { CustomerRolePermissionsModel } from '../../data/models';

export type AlertMessageConfigType = {
    heading: string;
    description: string;
    type: 'error' | 'warning' | 'success';
};
export interface UsePurchaseOrdersParams {
    initialPageSize: PageSizeListProps[];
    routePurchaseOrderDetails?: (poId: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    t: Record<string, string>;
    view: EnumPurchaseOrdersView;
    permissions: CustomerRolePermissionsModel;
    loadingPermissions: boolean;
}
export interface UsePurchaseOrdersReturn {
    isRequireApprovalPOsView: boolean;
    isAdmin: boolean;
    totalCount: number;
    loading: boolean;
    tableConfig: {
        columns: Column[];
        rows: Row[];
        expandedRows?: Set<number>;
    };
    paginationConfig: PaginationState;
    pageSizeConfig: {
        pageSizeOptionsList: PageSizeListProps[];
        onChange: (event: Event) => void;
    };
    selectedOrderIds: string[];
    handleRejectSelected: () => void;
    handleApproveSelected: () => void;
    alertMessageConfig: AlertMessageConfigType;
}
//# sourceMappingURL=usePurchaseOrders.types.d.ts.map