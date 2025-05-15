import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ImageCarouselProps extends HTMLAttributes<HTMLDivElement> {
    className: string;
    children: any;
    images: {
        src: string;
        alt: string | undefined;
    }[];
}
export declare const ImageCarousel: FunctionComponent<ImageCarouselProps>;
//# sourceMappingURL=ImageCarousel.d.ts.map