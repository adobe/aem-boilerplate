import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
    categories: VNode[];
    separator?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export declare const Breadcrumbs: FunctionComponent<BreadcrumbsProps>;
//# sourceMappingURL=Breadcrumbs.d.ts.map