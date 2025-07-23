import { FunctionComponent, JSX } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ImageNodeRenderProps } from '../../../@adobe-commerce/elsie/src/components';

export interface ImageCarouselProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: any;
    images: {
        src: string;
        alt: string | undefined;
    }[];
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const ImageCarousel: FunctionComponent<ImageCarouselProps>;
//# sourceMappingURL=ImageCarousel.d.ts.map