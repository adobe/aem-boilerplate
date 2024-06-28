import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

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
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const ImageSwatch: FunctionComponent<ImageSwatchProps>;
//# sourceMappingURL=ImageSwatch.d.ts.map