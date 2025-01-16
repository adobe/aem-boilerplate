import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ContentGridProps extends HTMLAttributes<HTMLDivElement> {
    emptyGridContent: VNode;
    maxColumns?: number;
    columnWidth?: string;
}
export declare const ContentGrid: FunctionComponent<ContentGridProps>;
//# sourceMappingURL=ContentGrid.d.ts.map