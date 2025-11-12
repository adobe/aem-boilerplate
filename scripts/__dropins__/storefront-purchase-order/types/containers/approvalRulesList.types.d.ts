import { Column, PageSizeListProps, Row } from '../components';

export interface ApprovalRulesListProps {
    initialPageSize?: PageSizeListProps[];
    routeCreateApprovalRule?: (id: string) => string;
    routeEditApprovalRule?: (id: string) => string;
    routeApprovalRuleDetails?: (id: string) => string;
    setColumns?: (defaultColumns: Column[]) => Column[];
    setRowsData?: (defaultRows: Row[]) => Row[];
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    skeletonRowCount?: number;
}
//# sourceMappingURL=approvalRulesList.types.d.ts.map