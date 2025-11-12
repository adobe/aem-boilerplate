import { Column, PageSizeListProps, Row } from '../components';

export interface CompanyPurchaseOrdersProps {
    initialPageSize: PageSizeListProps[];
    routePurchaseOrderDetails?: (poId: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    skeletonRowCount?: number;
}
//# sourceMappingURL=companyPurchaseOrders.types.d.ts.map