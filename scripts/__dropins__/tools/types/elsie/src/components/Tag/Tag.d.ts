import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TagProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'icon'> {
    label?: string;
    children?: VNode | VNode[];
}
export declare const Tag: FunctionComponent<TagProps>;
//# sourceMappingURL=Tag.d.ts.map