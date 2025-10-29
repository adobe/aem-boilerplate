import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CompanyStructureNode } from '../data/models';
import { CompanyPermissionFlags } from './companyPermission.types';

export interface CompanyStructureDataContext {
    structureData: CompanyStructureNode[];
}
export interface CompanyStructureProps {
    className?: string;
    withHeader?: boolean;
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
    isAuthenticated?: boolean;
    onRedirectLogin?: () => void;
    onRedirectAccount?: () => void;
}
export interface CompanyStructureCardProps {
    permissions: CompanyPermissionFlags | null;
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
}
//# sourceMappingURL=companyStructure.types.d.ts.map