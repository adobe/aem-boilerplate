/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
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