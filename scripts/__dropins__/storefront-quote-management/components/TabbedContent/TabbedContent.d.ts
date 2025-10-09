import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TabbedContentProps extends HTMLAttributes<HTMLDivElement> {
    tabs: Map<string, string>;
    tabsContent: Map<string, VNode>;
    defaultActiveTab?: string;
}
export declare const TabbedContent: FunctionComponent<TabbedContentProps>;
//# sourceMappingURL=TabbedContent.d.ts.map