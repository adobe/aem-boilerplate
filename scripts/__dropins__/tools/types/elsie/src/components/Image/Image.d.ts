import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ResolveImageUrlOptions } from '../../lib';

export interface ImageProps extends HTMLAttributes<HTMLDivElement> {
    params?: ResolveImageUrlOptions;
    src: string;
    onLoad?: (e: any) => void;
}
export declare const Image: FunctionComponent<ImageProps>;
//# sourceMappingURL=Image.d.ts.map