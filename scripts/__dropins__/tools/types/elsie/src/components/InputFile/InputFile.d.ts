import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface InputFileProps extends Omit<HTMLAttributes<HTMLInputElement>, 'type' | 'icon'> {
    accept?: string;
    onChange?: (event: Event) => void;
    label?: string;
    multiple?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export declare const InputFile: FunctionComponent<InputFileProps>;
//# sourceMappingURL=InputFile.d.ts.map