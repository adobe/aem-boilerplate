import { ImageProps } from '../../components';

declare const AEM_ASSETS_FORMATS: readonly ["gif", "jpg", "jpeg", "png", "webp"];
declare const AEM_ASSETS_ALLOWED_ROTATIONS: readonly [90, 180, 270];
declare const AEM_ASSETS_ALLOWED_FLIPS: readonly ["h", "v", "hv"];
/** The allowed formats for the `AEM Assets` image optimization API. */
export type AemAssetsFormat = (typeof AEM_ASSETS_FORMATS)[number];
/** The allowed rotations for the `AEM Assets` image optimization API. */
export type AemAssetsRotation = (typeof AEM_ASSETS_ALLOWED_ROTATIONS)[number];
/** The allowed flips for the `AEM Assets` image optimization API. */
export type AemAssetsFlip = (typeof AEM_ASSETS_ALLOWED_FLIPS)[number];
/**
 * Defines a crop region of an image.
 * @example
 * ```ts
 * // Crop the image to a 80% width and height, starting at 10% from the top and left.
 * const cropSettings: AemAssetsCropSettings = {
 *   xOrigin: 10,
 *   yOrigin: 10,
 *   width: 80,
 *   height: 80,
 * };
 */
export interface AemAssetsCropSettings {
    /** The (relative) x origin of the crop (between 0 and 100) */
    xOrigin?: number;
    /** The (relative) y origin of the crop (between 0 and 100) */
    yOrigin?: number;
    /** The width of the crop (between 0 and 100) */
    width?: number;
    /** The height of the crop (between 0 and 100) */
    height?: number;
}
/**
 * The parameters accepted by the `AEM Assets` image optimization API.
 * @see https://adobe-aem-assets-delivery-experimental.redoc.ly/
 */
export interface AemAssetsParams {
    format: AemAssetsFormat;
    rotate?: AemAssetsRotation;
    flip?: AemAssetsFlip;
    crop?: AemAssetsCropSettings;
    width?: number;
    height?: number;
    quality?: number;
    attachment?: boolean;
    sharpen?: boolean;
    blur?: number;
    dpr?: number;
    smartCrop?: string;
    [key: string]: unknown;
}
type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
/** The parameters to be applied to the asset (known width required when using a slot) */
export type AemAssetsImageSlotConfigParams = WithRequired<Partial<AemAssetsParams>, 'width'>;
/** The configuration for an image slot. */
export interface AemAssetsImageSlotConfig {
    /** The alias (i.e. seoName) of the image */
    alias: string;
    /** The props to be applied to the underlying {@link Image} component */
    imageProps: Partial<Omit<ImageProps, 'params' | 'width' | 'height'>> & {
        src: string;
    };
    /** The parameters to be applied to the asset (known width required when using a slot) */
    params: AemAssetsImageSlotConfigParams;
    /** The element that will contain the image in the slot */
    wrapper?: HTMLElement;
}
interface RenderContext {
    replaceWith: (element: HTMLElement) => void;
}
/** Returns whether AEM Assets is enabled in the Storefront. */
export declare function isAemAssetsEnabled(): boolean;
/** The default optimization parameters used globally, unless overriden (per use). */
export declare function getDefaultAemAssetsOptimizationParams(): AemAssetsParams;
/** Returns true if the given URL is an AEM Assets URL. */
export declare function isAemAssetsUrl(url: string | URL): boolean;
/** Generates an optimized URL for AEM Assets. */
export declare function generateAemAssetsOptimizedUrl(assetUrl: string, alias: string, params?: Partial<AemAssetsParams>): string;
/**
 * Tries to generate an optimized URL for AEM Assets. Returns the given
 * url if AEM Assets is not enabled or is not an AEM Assets URL.
 */
export declare function tryGenerateAemAssetsOptimizedUrl(assetUrl: string, alias: string, params?: Partial<AemAssetsParams>): string;
/** Creates a slot that renders an AEM Assets image. */
export declare function makeAemAssetsImageSlot(config: AemAssetsImageSlotConfig): (ctx: RenderContext) => void;
export declare function tryRenderAemAssetsImage(ctx: RenderContext, config: AemAssetsImageSlotConfig): void;
export {};
//# sourceMappingURL=assets.d.ts.map