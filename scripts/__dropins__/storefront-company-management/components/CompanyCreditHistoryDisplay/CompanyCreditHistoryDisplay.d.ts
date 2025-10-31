import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CompanyCreditHistoryDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    /**
     * Optional initial parameters for credit history filtering and pagination
     */
    initialParams?: {
        pageSize?: number;
        currentPage?: number;
        filter?: any;
    };
}
export declare const CompanyCreditHistoryDisplay: FunctionComponent<CompanyCreditHistoryDisplayProps>;
//# sourceMappingURL=CompanyCreditHistoryDisplay.d.ts.map