interface AemAssetsParams {
    quality?: number;
    format?: string;
    crop?: {
        xOrigin?: number;
        yOrigin?: number;
        width?: number;
        height?: number;
    };
    size?: {
        width?: number;
        height?: number;
    };
    width?: number;
    height?: number;
    [key: string]: any;
}
interface AemAssetsImageConfig {
    wrapper?: HTMLElement;
    alias: string;
    params: AemAssetsParams;
    imageProps: {
        src: string;
        width?: number;
        height?: number;
        [key: string]: any;
    };
    src?: string;
}
interface RenderContext {
    replaceWith: (element: HTMLElement) => void;
}
export declare function isAemAssetsEnabled(): boolean;
export declare function getDefaultAemAssetsOptimizationParams(): {
    quality: number;
    format: string;
};
export declare function isAemAssetsUrl(url: string | URL): boolean;
export declare function generateAemAssetsOptimizedUrl(url: string, alias: string, params?: AemAssetsParams): string;
export declare function tryGenerateAemAssetsOptimizedUrl(url: string, alias: string, params?: AemAssetsParams): string;
export declare function makeAemAssetsImageSlot(config: AemAssetsImageConfig): (ctx: RenderContext) => void;
export declare function tryRenderAemAssetsImage(ctx: RenderContext, config: AemAssetsImageConfig): void;
export {};
//# sourceMappingURL=assets.d.ts.map