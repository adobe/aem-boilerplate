import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    name?: string;
    disabled?: boolean;
    errorMessage?: string;
}
export declare const TextArea: FunctionComponent<TextAreaProps>;
//# sourceMappingURL=TextArea.d.ts.map