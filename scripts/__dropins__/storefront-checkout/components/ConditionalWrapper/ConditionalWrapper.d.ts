import { FunctionComponent } from 'preact';

export interface ConditionalProps {
    isInitialized?: boolean;
    isVisible?: boolean;
}
export declare function WithConditionals<P extends object>(Component: FunctionComponent<P>, Skeleton: FunctionComponent): FunctionComponent<P & ConditionalProps>;
//# sourceMappingURL=ConditionalWrapper.d.ts.map