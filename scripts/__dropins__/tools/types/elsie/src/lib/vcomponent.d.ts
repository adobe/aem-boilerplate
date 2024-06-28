import { VNode, ComponentChildren } from 'preact';

export type VComponentProps = {
    node: VNode | VNode[];
    children?: ComponentChildren;
    [key: string]: any;
};
export declare function VComponent({ node, ...props }: VComponentProps): import("preact").JSX.Element | null;
//# sourceMappingURL=vcomponent.d.ts.map