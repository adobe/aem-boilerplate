import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface RequisitionListGridProps extends HTMLAttributes<HTMLDivElement> {
    routeRequisitionListDetails?: (uid: string) => string | void;
    /**
     * Fallback URL to redirect when requisition lists are not enabled.
     * Defaults to '/customer/account'
     */
    fallbackRoute?: string;
    slots?: {
        Header?: SlotProps;
    };
}
export declare const RequisitionListGrid: Container<RequisitionListGridProps>;
//# sourceMappingURL=RequisitionListGrid.d.ts.map