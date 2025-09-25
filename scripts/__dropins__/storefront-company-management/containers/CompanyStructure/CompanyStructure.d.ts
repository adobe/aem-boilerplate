import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface CompanyStructureProps extends HTMLAttributes<HTMLDivElement> {
    isAuthenticated?: boolean;
    onRedirectLogin?: () => void;
    onRedirectAccount?: () => void;
}
export declare const CompanyStructure: Container<CompanyStructureProps>;
//# sourceMappingURL=CompanyStructure.d.ts.map