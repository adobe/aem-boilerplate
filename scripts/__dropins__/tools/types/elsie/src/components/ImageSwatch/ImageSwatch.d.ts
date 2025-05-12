import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes, JSX } from 'preact/compat';
import { ImageProps } from '../Image';

export interface ImageNodeRenderProps extends ImageProps {
    imageSwatchContext: {
        disabled?: boolean;
        outOfStock?: boolean;
        multi?: boolean;
        selected?: boolean;
        value?: string;
        label?: string;
        groupAriaLabel?: string;
        name?: string;
        id?: string;
    };
}
export interface ImageSwatchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label'> {
    name?: string;
    label?: string;
    groupAriaLabel?: string;
    id?: string;
    src: string;
    alt?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    outOfStock?: boolean;
    multi?: boolean;
    imageNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const ImageSwatch: FunctionComponent<ImageSwatchProps>;
//# sourceMappingURL=ImageSwatch.d.ts.map