export interface ResolveImageUrlOptions {
    width: number;
    height?: number;
    auto?: string;
    quality?: number;
    crop?: boolean;
    fit?: string;
}
export declare const generateSrcset: (imageURL: string, options: ResolveImageUrlOptions) => string | undefined;
//# sourceMappingURL=resolve-image.d.ts.map