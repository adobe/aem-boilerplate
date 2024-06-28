import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

type Show = number;
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    children: VNode[] | VNode;
    thumbnails?: VNode[] | VNode;
    show?: Show | {
        small: Show;
        medium: Show;
        large: Show;
    };
    gap?: 'small' | 'medium' | 'large' | null;
    scrollbar?: boolean;
    peak?: boolean;
    arrows?: boolean;
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    arrowsOnMainImage?: boolean;
    loop?: boolean;
    direction?: 'horizontal';
    style?: Record<string, string | number>;
    width?: string;
    height?: string;
    defaultIndex?: number;
    infinite?: boolean;
    isZoomed?: boolean;
}
export declare const Carousel: FunctionComponent<CarouselProps>;
export {};
//# sourceMappingURL=Carousel.d.ts.map