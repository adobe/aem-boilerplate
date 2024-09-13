import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface StaticSkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    rows: number;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}
export declare const StaticSkeleton: FunctionComponent<StaticSkeletonProps>;
//# sourceMappingURL=StaticSkeleton.d.ts.map