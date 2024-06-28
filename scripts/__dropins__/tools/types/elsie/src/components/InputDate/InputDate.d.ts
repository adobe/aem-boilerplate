import { FunctionComponent } from 'preact';
import { InputProps } from '..';

export interface InputDateProps extends Omit<InputProps, 'error' | 'value'> {
    label?: string;
    name?: string;
    error?: string;
    value?: Date;
}
export declare const InputDate: FunctionComponent<InputDateProps>;
//# sourceMappingURL=InputDate.d.ts.map