import { Container } from '@dropins/tools/types/elsie/src/lib';

export interface ConditionalProps {
    hideOnEmptyCart?: boolean;
    hideOnVirtualCart?: boolean;
}
export declare const withConditionalRendering: <P extends object>(WrappedContainer: Container<P, {
    [key: string]: any;
}>) => {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: ConditionalProps & P): import("preact").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=withConditionalRendering.d.ts.map