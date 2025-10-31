import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { GetCompanyCreditHistoryParams } from '../../types/api/getCompanyCreditHistoryParams.types';

export interface CompanyCreditProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Optional parameters for credit history filtering and pagination
     */
    creditHistoryParams?: GetCompanyCreditHistoryParams;
    /**
     * Whether to show the credit history section
     */
    showCreditHistory?: boolean;
}
export declare const CompanyCredit: Container<CompanyCreditProps>;
//# sourceMappingURL=CompanyCredit.d.ts.map