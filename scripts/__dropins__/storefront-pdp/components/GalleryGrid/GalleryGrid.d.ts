import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface GalleryGridProps extends HTMLAttributes<HTMLDivElement> {
    children: VNode[] | VNode;
    gap?: 'small' | 'medium' | 'large' | null;
    style?: Record<string, string | number>;
}
export declare const GalleryGrid: FunctionComponent<GalleryGridProps>;
//# sourceMappingURL=GalleryGrid.d.ts.map