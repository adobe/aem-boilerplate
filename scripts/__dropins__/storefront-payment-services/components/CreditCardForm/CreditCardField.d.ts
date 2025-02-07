import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface CreditCardFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    containerId: string;
    error?: string;
    label?: string;
}
export declare const CreditCardField: FunctionComponent<CreditCardFieldProps>;
//# sourceMappingURL=CreditCardField.d.ts.map