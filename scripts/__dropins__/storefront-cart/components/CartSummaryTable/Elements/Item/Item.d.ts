import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
    productTitle: VNode;
    sku?: VNode;
    image?: VNode;
    configurations?: VNode;
    alert?: VNode;
    warning?: VNode;
}
export declare const Item: FunctionComponent<ItemProps>;
//# sourceMappingURL=Item.d.ts.map