import { FunctionComponent } from 'preact';

export interface TreeItem {
    id: string;
    parentId?: string | null;
    label: string;
}
export interface RenderNodeArgs {
    item: TreeItem;
    level: number;
    expanded: boolean;
    selected: boolean;
    hasChildren: boolean;
    toggle: () => void;
    select: () => void;
    expander?: () => any;
    checkbox?: () => any;
    icon?: () => any;
}
export interface TreeProps {
    items: TreeItem[];
    rootId?: string | null;
    className?: string;
    expandedIds: Set<string>;
    selectedId?: string | null;
    selectedIds?: Set<string>;
    onExpandedChange: (next: Set<string>) => void;
    onSelectedChange?: (id: string | null) => void;
    onSelectedIdsChange?: (ids: Set<string>) => void;
    renderNode: (args: RenderNodeArgs) => any;
    role?: 'tree' | 'list' | 'grid';
    draggable?: (item: TreeItem) => boolean;
    canDrop?: (dragId: string, targetId: string) => boolean;
    onMove?: (args: {
        id: string;
        newParentId: string;
    }) => void;
    isCheckable?: (item: TreeItem) => boolean;
    checkedIds?: Set<string>;
    onCheckedChange?: (next: Set<string>) => void;
    renderExpander?: (args: {
        expanded: boolean;
        hasChildren: boolean;
        toggle: () => void;
    }) => any;
    renderCheckbox?: (args: {
        checked: boolean;
        indeterminate: boolean;
        onCheck: () => void;
    }) => any;
    renderIcon?: (args: {
        item: TreeItem;
        level: number;
        hasChildren: boolean;
        expanded: boolean;
    }) => any;
}
export declare const Tree: FunctionComponent<TreeProps>;
export default Tree;
//# sourceMappingURL=Tree.d.ts.map