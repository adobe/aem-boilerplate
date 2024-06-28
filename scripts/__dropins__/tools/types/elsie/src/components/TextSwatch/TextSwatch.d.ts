import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TextSwatchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label'> {
    name?: string;
    label: string;
    groupAriaLabel?: string;
    value?: string;
    id: string;
    disabled?: boolean;
    selected?: boolean;
    outOfStock?: boolean;
    multi?: boolean;
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const TextSwatch: FunctionComponent<TextSwatchProps>;
//# sourceMappingURL=TextSwatch.d.ts.map