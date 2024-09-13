import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'level'> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
export declare const Heading: FunctionComponent<HeadingProps>;
//# sourceMappingURL=Heading.d.ts.map