import { CompanyStructureNode } from '../data/models';
import { UseCompanyStructureProps } from '../types/hook.types';

export type StructureNode = CompanyStructureNode;
export declare function useCompanyStructureCard({ handleSetInLineAlert, permissions }?: UseCompanyStructureProps): {
    nodes: CompanyStructureNode[] | null;
    loading: boolean;
    submitLoading: boolean;
    showEditForm: boolean;
    inputChange: Record<string, string | number | boolean>;
    expanded: Set<string>;
    setExpanded: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<Set<string>>>;
    selected: string | null;
    setSelected: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<string | null>>;
    selectedMany: Set<string>;
    setSelectedMany: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<Set<string>>>;
    move: (id: string, newParentId: string) => Promise<boolean>;
    expandAll: () => void;
    collapseAll: () => void;
    insertNode: (node: {
        id: string;
        parentId: string | null;
        label: string;
        type: 'team' | 'user';
        entityId?: string;
        description?: string;
    }) => void;
    renameNodes: (ids: string[], nextLabel: string, nextDescription?: string) => void;
    removeNodes: (ids: string[]) => Promise<void>;
    handleInputChange: (value: Record<string, string | number | boolean>) => void;
    handleShowEditForm: () => void;
    handleHideEditForm: (clearStates?: () => void) => void;
    renderAlertMessage: (type: 'success' | 'error', message: string) => void;
    working: boolean;
};
//# sourceMappingURL=useCompanyStructureCard.d.ts.map